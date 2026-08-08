import sharp from 'sharp';
import fs from 'fs';

const OUT_DIR = 'public/quick-help';
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// CORRECT mapping — must match CORE_SERVICES order in src/data.ts (same as “Our Services” grid)
// 1 Plumbing → 10_30_29 AM | 2 Civil → 09_54_17 AM | 3 Bathroom → 09_50_59 AM
// 4 Cleaning → Aug 7 10_13_12 AM (USER-CHOSEN) | 5 Painting → 09_18_22 AM | 6 Tiles → 10_32_40 AM
// 7 Electrical → 09_48_56 AM | 8 Fall Ceiling → 09_30_36 PM | 9 Construction → 09_55_53 AM
// 10 Interior → 10_26_42 PM | 11 Home Renovation → 09_24_00 PM | 12 Carpenter → 09_53_15 AM
// 13 Home Maintenance → Aug 8 03_12_15 PM (USER-CHOSEN)
const MAP = [
  ['C:\\Users\\maju\\Downloads\\ChatGPT Image Aug 6, 2026, 10_30_29 AM.png', 'plumbing'],
  ['C:\\Users\\maju\\Downloads\\ChatGPT Image Aug 6, 2026, 09_54_17 AM.png', 'civil'],
  ['C:\\Users\\maju\\Downloads\\ChatGPT Image Aug 6, 2026, 09_50_59 AM.png', 'bathroom'],
  ['C:\\Users\\maju\\Downloads\\ChatGPT Image Aug 7, 2026, 10_13_12 AM.png', 'cleaning'],
  ['C:\\Users\\maju\\Downloads\\ChatGPT Image Aug 6, 2026, 09_18_22 AM.png', 'painting'],
  ['C:\\Users\\maju\\Downloads\\ChatGPT Image Aug 6, 2026, 10_32_40 AM.png', 'tiles'],
  ['C:\\Users\\maju\\Downloads\\ChatGPT Image Aug 6, 2026, 09_48_56 AM.png', 'electrical'],
  ['C:\\Users\\maju\\Downloads\\ChatGPT Image Aug 6, 2026, 09_30_36 PM.png', 'ceiling'],
  ['C:\\Users\\maju\\Downloads\\ChatGPT Image Aug 6, 2026, 09_55_53 AM.png', 'construction'],
  ['C:\\Users\\maju\\Downloads\\ChatGPT Image Aug 6, 2026, 10_26_42 PM.png', 'interior'],
  ['C:\\Users\\maju\\Downloads\\ChatGPT Image Aug 6, 2026, 09_24_00 PM.png', 'home-renovation'],
  ['C:\\Users\\maju\\Downloads\\ChatGPT Image Aug 6, 2026, 09_53_15 AM.png', 'carpenter'],
  ['C:\\Users\\maju\\Downloads\\ChatGPT Image Aug 8, 2026, 03_12_15 PM.png', 'home-maintenance'],
];

const WIDTH = 480; // square images, retina-friendly
const QUALITY = 72; // low KB

for (const [src, name] of MAP) {
  const out = `${OUT_DIR}/${name}.webp`;
  if (!fs.existsSync(src)) { console.log('MISSING INPUT:', src); continue; }
  const inSize = fs.statSync(src).size;
  try {
    await sharp(src)
      .resize(WIDTH, WIDTH, { fit: 'cover' })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(out);
    const outSize = fs.statSync(out).size;
    console.log(`${name.padEnd(16)} ${(inSize/1024).toFixed(0).padStart(5)}KB -> ${(outSize/1024).toFixed(1).padStart(6)}KB  ${out}`);
  } catch (e) { console.log('ERROR', name, e.message); }
}
