/**
 * Shippori Mincho B1 を自前ホストする。
 *
 * next/font で日本語フォントを読むと、unicode-range ごとの @font-face が
 * ページのCSSに全部入り（130KB超・レンダリングブロック）になり、
 * モバイルの FCP / LCP が壊れる。
 *
 * そこで Google Fonts の分割CSSと woff2 を public/fonts へ取り込み、
 * 非同期で読み込む別ファイルにする。ダウンロードされるのは
 * 実際に使われる文字を含む数チャンクだけ。
 *
 * 実行: node scripts/fetch-fonts.mjs
 */

import fs from 'node:fs';
import path from 'node:path';

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

const FAMILY = 'Shippori+Mincho+B1:wght@400';
const CSS_URL = `https://fonts.googleapis.com/css2?family=${FAMILY}&display=swap`;

const OUT_DIR = path.join(process.cwd(), 'public', 'fonts');
const FILE_DIR = path.join(OUT_DIR, 'shippori-mincho-b1');
const CSS_OUT = path.join(OUT_DIR, 'shippori-mincho-b1.css');

fs.mkdirSync(FILE_DIR, { recursive: true });

const css = await fetch(CSS_URL, { headers: { 'User-Agent': UA } }).then((r) => {
  if (!r.ok) throw new Error(`Google Fonts CSS の取得に失敗: ${r.status}`);
  return r.text();
});

const urls = [...new Set([...css.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g)].map((m) => m[1]))];
console.log(`woff2 ${urls.length} 個を取得します`);

let rewritten = css;
let bytes = 0;

for (const url of urls) {
  const name = url.split('/').pop().replace(/[^\w.-]/g, '_');
  const dest = path.join(FILE_DIR, name);
  if (!fs.existsSync(dest)) {
    const buf = Buffer.from(await fetch(url, { headers: { 'User-Agent': UA } }).then((r) => r.arrayBuffer()));
    fs.writeFileSync(dest, buf);
  }
  bytes += fs.statSync(dest).size;
  rewritten = rewritten.replaceAll(url, `/fonts/shippori-mincho-b1/${name}`);
}

// 余白を落として軽くする
const minified = rewritten
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\s*([{}:;,])\s*/g, '$1')
  .replace(/\s+/g, ' ')
  .trim();

fs.writeFileSync(CSS_OUT, `${minified}\n`, 'utf8');

console.log(`public/fonts/shippori-mincho-b1.css を書き出しました (${(minified.length / 1024).toFixed(1)} KB)`);
console.log(`woff2 合計 ${(bytes / 1024 / 1024).toFixed(2)} MB（実際に配信されるのは数チャンクのみ）`);
