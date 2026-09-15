import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

/**
 * 元写真を public/photos へ最適化して書き出す。
 * PHOTO_SRC に元フォルダを指定する。フォルダに無いファイルは飛ばすので、
 * 追加分だけ入ったフォルダを渡してもよい（例 PHOTO_SRC=photo-originals/2026-09-15）。
 */
const SRC = process.env.PHOTO_SRC;
const OUT = path.join(process.cwd(), 'public', 'photos');

if (!SRC) {
  console.error('PHOTO_SRC に元写真のフォルダを指定してください');
  process.exit(1);
}

const MAP = {
  // 2026-09-02 LINEアルバム「ホームページ素材」
  'LINE_ALBUM_ホームページ素材_260902_7.jpg':  'storefront.jpg',
  'LINE_ALBUM_ホームページ素材_260902_1.jpg':  'exterior-night.jpg',
  'LINE_ALBUM_ホームページ素材_260902_2.jpg':  'exterior-wide.jpg',
  'LINE_ALBUM_ホームページ素材_260902_3.jpg':  'takoyaki-sauce.jpg',
  'LINE_ALBUM_ホームページ素材_260902_4.jpg':  'takoyaki-mayo.jpg',
  'LINE_ALBUM_ホームページ素材_260902_5.jpg':  'takoyaki-mayo-2.jpg',
  'LINE_ALBUM_ホームページ素材_260902_6.jpg':  'takoyaki-salt.jpg',
  'LINE_ALBUM_ホームページ素材_260902_11.jpg': 'takoyaki-wasabi.jpg',
  'LINE_ALBUM_ホームページ素材_260902_10.jpg': 'staff-counter.jpg',
  'LINE_ALBUM_ホームページ素材_260902_12.jpg': 'kitchen.jpg',

  // 2026-09-15 追加分（料理写真と、店側で作ったメニュー表・セットのポスター）
  'S__55500820_0.jpg': 'takoyaki-wasabi-highball.jpg',
  'S__55500821_0.jpg': 'peach-melba.jpg',
  'S__55500822_0.jpg': 'takoyaki-pepper-lift.jpg',
  'S__55500823_0.jpg': 'takoyaki-sauce-mayo.jpg',
  'S__55500824_0.jpg': 'takoyaki-pepper.jpg',
  '291541_0.jpg': 'otsumami-set.jpg',
  '291546_0.jpg': 'takoyaki-sanshu.jpg',
  'ChatGPT Image 2026年9月15日 09_05_17.png': 'yorimichi-set-poster.jpg',
  'ChatGPT Image 2026年9月15日 09_04_25.png': 'menu-takoyaki.jpg',
  'ChatGPT Image 2026年9月15日 09_03_58.png': 'menu-drink.jpg',

  // 2026-09-15 追加分その2（昔の理髪店・テレビ・ロゴ）
  // 文字だけのたこ焼きメニュー表（S__17891334/35）は味の名前がポスターと違うため使わない（店主判断）
  // S__17891336 は menu-takoyaki と同じポスター、S__17891342 は 338 と同じ写真なので使わない
  'S__17891337_0.jpg': 'logo-dai.jpg',
  'S__17891338_0.jpg': 'takoyaki-mix.jpg',
  // 白いスキャン余白を落とす
  'S__17891339_0.jpg': { dest: 'barber-old-exterior.jpg', extract: { left: 72, top: 68, width: 936, height: 1352 } },
  'S__17891340_0.jpg': 'old-tram.jpg',
  'S__17891341_0.jpg': 'barber-old-interior.jpg',
  // 右下の黒板に旧価格（300円／500円）が写っているので上側だけ使う
  'S__17891343_0.jpg': { dest: 'counter-tv.jpg', extract: { left: 0, top: 0, width: 1477, height: 660 } },
};

fs.mkdirSync(OUT, { recursive: true });
for (const [src, entry] of Object.entries(MAP)) {
  const from = path.join(SRC, src);
  if (!fs.existsSync(from)) continue;
  const { dest, extract } = typeof entry === 'string' ? { dest: entry } : entry;
  let img = sharp(from).rotate();
  if (extract) img = img.extract(extract);
  await img
    .resize({ width: 1800, height: 1800, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toFile(path.join(OUT, dest));
  const m = await sharp(path.join(OUT, dest)).metadata();
  const kb = Math.round(fs.statSync(path.join(OUT, dest)).size / 1024);
  console.log(dest.padEnd(30), `${m.width}x${m.height}`, `${kb}KB`);
}
