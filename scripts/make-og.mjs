import sharp from 'sharp';
import path from 'node:path';

const OUT = path.join(process.cwd(), 'public', 'og-image.jpg');
const SRC = path.join(process.cwd(), 'public', 'photos', 'exterior-night.jpg');

const W = 1200;
const H = 630;

const overlay = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#201b17" stop-opacity="0.94"/>
      <stop offset="52%" stop-color="#201b17" stop-opacity="0.78"/>
      <stop offset="100%" stop-color="#201b17" stop-opacity="0.12"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <text x="72" y="150" font-family="Yu Mincho, Hiragino Mincho ProN, MS PMincho, serif"
        font-size="26" fill="#c2624a" letter-spacing="9">SANGENJAYA / TOKYO</text>
  <text x="72" y="268" font-family="Yu Mincho, Hiragino Mincho ProN, MS PMincho, serif"
        font-size="76" fill="#fbf6ee" letter-spacing="6">たこ焼きと一杯。</text>
  <text x="72" y="372" font-family="Yu Mincho, Hiragino Mincho ProN, MS PMincho, serif"
        font-size="76" fill="#fbf6ee" letter-spacing="6">三軒茶屋の寄り道処。</text>
  <rect x="72" y="424" width="64" height="2" fill="#9a341e"/>
  <text x="72" y="492" font-family="Yu Gothic, Hiragino Sans, Meiryo, sans-serif"
        font-size="28" fill="#fbf6ee" fill-opacity="0.8" letter-spacing="4">おいしい寄り道 ヤング軒</text>
  <text x="72" y="544" font-family="Yu Gothic, Hiragino Sans, Meiryo, sans-serif"
        font-size="22" fill="#fbf6ee" fill-opacity="0.6" letter-spacing="3">三軒茶屋駅 徒歩4分 ／ 16:00-22:00 ／ 定休 水・日</text>
</svg>`);

await sharp(SRC)
  .resize(W, H, { fit: 'cover', position: 'right top' })
  .modulate({ brightness: 1.12 })
  .composite([{ input: overlay, top: 0, left: 0 }])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(OUT);

console.log('wrote', OUT);
