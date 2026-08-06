/**
 * optimize-images.mjs
 * --------------------
 * Converts every PNG / JPG inside `public/` into an optimized `.webp` version
 * placed alongside the original (e.g. service-card-plumbing.png ->
 * service-card-plumbing.webp). This keeps the deployed site fast — the old
 * AI-generated PNGs were 1.8–2.9 MB each (~25 MB total page weight).
 *
 * Usage:
 *   node scripts/optimize-images.mjs            # convert only
 *   node scripts/optimize-images.mjs --clean    # convert AND delete original PNG/JPGs
 */
import { readdirSync, statSync, existsSync, unlinkSync } from 'fs';
import { join, basename, extname } from 'path';
import sharp from 'sharp';

const PUBLIC_DIR = join(process.cwd(), 'public');
const CLEAN = process.argv.includes('--clean');

// Larger images get a bigger cap; everything else is capped for display sizes.
const sizeCaps = {
  'og-image.jpg': 1200,
  'og-logo.jpg': 900,
  'why-choose-banner.jpg': 1100,
  'why-choose-banner.png': 1200,
  'brands-banner.png': 1200,
};
const DEFAULT_CAP = 900;

const RASTER_EXT = new Set(['.png', '.jpg', '.jpeg']);

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      out.push(...walk(full));
    } else if (RASTER_EXT.has(extname(name).toLowerCase())) {
      out.push(full);
    }
  }
  return out;
}

async function main() {
  const images = walk(PUBLIC_DIR);
  let converted = 0;
  let skipped = 0;

  for (const file of images) {
    const name = basename(file);
    const outFile = file.replace(/\.[^.]+$/, '.webp');

    // Already converted in a previous run — skip.
    if (existsSync(outFile) && extname(file) !== '.webp') {
      skipped++;
      continue;
    }

    const cap = sizeCaps[name] ?? DEFAULT_CAP;

    try {
      const image = sharp(file, { failOn: 'none' }).rotate(); // honour EXIF orientation
      const meta = await image.metadata();

      // Only shrink if the source is actually bigger than the cap.
      let pipeline = image;
      if (meta.width && meta.width > cap) {
        pipeline = image.resize({ width: cap, withoutEnlargement: true });
      }

      await pipeline
        .webp({ quality: 82, effort: 4 })
        .toFile(outFile);

      const before = statSync(file).size;
      const after = statSync(outFile).size;
      console.log(
        `✅ ${name} → ${basename(outFile)}  ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB  (${Math.round((1 - after / before) * 100)}% smaller)`
      );
      converted++;

      if (CLEAN) {
        unlinkSync(file);
        console.log(`   🗑  deleted original ${name}`);
      }
    } catch (err) {
      console.error(`❌ failed on ${name}: ${err.message}`);
    }
  }

  console.log(`\nDone — ${converted} converted, ${skipped} already optimized.`);
}

main();
