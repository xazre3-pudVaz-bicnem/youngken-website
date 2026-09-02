import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const SRC = process.env.PHOTO_SRC;
const OUT = path.join(process.cwd(), 'public', 'photos');

const MAP = {
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
  'LINE_ALBUM_ホームページ素材_260902_13.jpg': 'signboard-set.jpg',
};

fs.mkdirSync(OUT, { recursive: true });
for (const [src, dest] of Object.entries(MAP)) {
  const from = path.join(SRC, src);
  await sharp(from)
    .rotate()
    .resize({ width: 1800, height: 1800, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toFile(path.join(OUT, dest));
  const m = await sharp(path.join(OUT, dest)).metadata();
  console.log(dest.padEnd(24), m.width + 'x' + m.height);
}
