import sharp from 'sharp';
import fs from 'fs';

// Order matches the 13 services in src/data.ts:
// plumbing, civil, bathroom, cleaning, painting, tiles, electrical, ceiling,
// construction, interior, home-renovation, carpenter, home-maintenance
const MAP = [
  ['C:\\Users\\maju\\Downloads\\ChatGPT Image Aug 8, 2026, 01_04_04 PM.png', 'plumbing'],
  ['C:\\Users\\maju\\Downloads\\ChatGPT Image Aug 8, 2026, 01_04_08 PM.png', 'civil'],
  ['C:\\Users\\maju\\Downloads\\ChatGPT Image Aug 8, 2026, 01_04_11 PM.png', 'bathroom'],
  ['C:\\Users\\maju\\Downloads\\ChatGPT Image Aug 8, 2026, 01_04_14 PM.png', 'cleaning'],
  ['C:\\Users\\maju\\Downloads\\ChatGPT Image Aug 8, 2026, 01_04_18 PM.png', 'painting'],
  ['C:\\Users\\maju\\Downloads\\ChatGPT Image Aug 8, 2026, 01_04_22 PM.png', 'tiles'],
  ['C:\\Users\\maju\\Downloads\\ChatGPT Image Aug 8, 2026, 01_05_26 PM.png', 'electrical'],
  ['C:\\Users\\maju\\Downloads\\ChatGPT Image Aug 8, 2026, 01_08_41 PM.png', 'ceiling'],
  ['C:\\Users\\maju\\Downloads\\ChatGPT Image Aug 8, 2026, 01_08_51 PM.png', 'construction'],
  ['C:\\Users\\maju\\Downloads\\ChatGPT Image Aug 8, 2026, 01_14_35 PM.png', 'interior'],
  ['C:\\Users\\maju\\Downloads\\ChatGPT Image Aug 8, 2026, 01_15_44 PM.png', 'home-renovation'],
  ['C:\\Users\\maju\\Downloads\\ChatGPT Image Aug 8, 2026, 01_17_32 PM.png', 'carpenter'],
  ['C:\\Users\\maju\\Downloads\\ChatGPT Image Aug 8, 2026, 01_20_01 PM.png', 'home-maintenance'],
];

// Target display size (retina-friendly for ~384px card / 195px quick-help)
const WIDTH = 700;
const HEIGHT = 997; // matches ~7:10 portrait ratio of source images
const QUALITY = 72;

for (const [src, name] of MAP) {
  const out = `public/service-card-${name}.webp`;
  if (!fs.existsSync(src)) {
    console.log('MISSING INPUT:', src);
    continue;
  }
  const inSize = fs.statSync(src).size;
  try {
    await sharp(src)
      .resize(WIDTH, HEIGHT, { fit: 'cover' })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(out);
    const outSize = fs.statSync(out).size;
    console.log(
      `${name.padEnd(16)} ${(inSize / 1024).toFixed(0).padStart(5)}KB -> ${(outSize / 1024).toFixed(1).padStart(6)}KB  ${out}`
    );
  } catch (e) {
    console.log('ERROR', name, e.message);
  }
}
