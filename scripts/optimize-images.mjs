/**
 * Generate responsive, downscaled WebP variants for every image PageSpeed
 * flagged as "larger than needed". Each original keeps its name; a "-W<w>"
 * suffix is added for the smaller variants, e.g. hero-bathroom-320.webp.
 * Components then use srcSet/sizes so mobile downloads only ~320px wide.
 *
 * Run: node scripts/optimize-images.mjs
 */
import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.resolve(__dirname, '../public');

// [file, [{widthSuffix, width}]...]
const JOBS = [
  // Hero slides (900w originals, displayed ~148px mobile / ~570px desktop)
  ['hero-bathroom.webp', [320, 640]],
  ['hero-painting.webp', [320, 640]],
  ['hero-plumbing.webp', [320, 640]],
  ['hero-cleaning.webp', [320, 640]],
  ['hero-interior.webp', [320, 640]],
  // Service cards (700w, displayed ~215px mobile / ~380px desktop)
  ['service-card-bathroom.webp', [240, 480]],
  ['service-card-carpenter.webp', [240, 480]],
  ['service-card-ceiling.webp', [240, 480]],
  ['service-card-civil.webp', [240, 480]],
  ['service-card-cleaning.webp', [240, 480]],
  ['service-card-construction.webp', [240, 480]],
  ['service-card-electrical.webp', [240, 480]],
  ['service-card-home-maintenance.webp', [240, 480]],
  ['service-card-home-renovation.webp', [240, 480]],
  ['service-card-interior.webp', [240, 480]],
  ['service-card-painting.webp', [240, 480]],
  ['service-card-plumbing.webp', [240, 480]],
  ['service-card-tiles.webp', [240, 480]],
  // Quick help (480w, displayed ~68px mobile / ~195px desktop)
  ['quick-help/bathroom.webp', [160, 240]],
  ['quick-help/carpenter.webp', [160, 240]],
  ['quick-help/ceiling.webp', [160, 240]],
  ['quick-help/civil.webp', [160, 240]],
  ['quick-help/cleaning.webp', [160, 240]],
  ['quick-help/construction.webp', [160, 240]],
  ['quick-help/electrical.webp', [160, 240]],
  ['quick-help/home-maintenance.webp', [160, 240]],
  ['quick-help/home-renovation.webp', [160, 240]],
  ['quick-help/interior.webp', [160, 240]],
  ['quick-help/painting.webp', [160, 240]],
  ['quick-help/plumbing.webp', [160, 240]],
  ['quick-help/tiles.webp', [160, 240]],
  // Trending (1100w, displayed ~669px)
  ['trending/trending-1.webp', [700]],
  ['trending/trending-2.webp', [700]],
  ['trending/water-tank.webp', [700]],
  ['trending/geyser.webp', [700]],
  // Why choose banners (900w, displayed ~655px)
  ['why-choose/why-choose-banner.webp', [700]],
  ['why-choose/brands-banner.webp', [700]],
  // Logo (480w, displayed ~54-74px)
  ['logo-emblem-new.webp', [96, 144]],
  // Footer logo (900w)
  ['logo.webp', [360]],
  // Recently completed work (900w, displayed ~300px)
  ['work-ceiling-cove.webp', [360]],
  ['work-bathroom-blue.webp', [360]],
  ['work-civil.webp', [360]],
  ['work-interior-living.webp', [360]],
];

const QUALITY = 80;

async function main() {
  let totalBefore = 0;
  let totalAfter = 0;
  const report = [];

  for (const [rel, widths] of JOBS) {
    const src = path.join(PUBLIC, rel);
    let meta;
    try {
      meta = await sharp(src).metadata();
    } catch (e) {
      console.log(`SKIP ${rel}: ${e.message}`);
      continue;
    }
    const base = rel.replace(/\.webp$/, '');
    for (const w of widths) {
      const outRel = `${base}-${w}.webp`;
      const outPath = path.join(PUBLIC, outRel);
      const buf = await sharp(src)
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 6 })
        .toBuffer();
      await fs.writeFile(outPath, buf);
      const size = buf.length;
      totalAfter += size;
      const orig = await fs.stat(src).then((s) => s.size);
      totalBefore += orig;
      report.push(`${rel} -> ${outRel}: ${(orig / 1024).toFixed(0)}KiB -> ${(size / 1024).toFixed(0)}KiB`);
    }
  }

  console.log('\n=== Generated variants ===');
  console.log(report.join('\n'));
  console.log(`\nSum of originals for these images: ${(totalBefore / 1024).toFixed(0)} KiB`);
  console.log(`Sum of generated variants:          ${(totalAfter / 1024).toFixed(0)} KiB`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
