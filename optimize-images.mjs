import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PUBLIC = './public';

// Per-file-type quality: logos need crispness, photos can be compressed harder.
function qualityFor(file) {
  const base = path.basename(file);
  if (base.startsWith('logo')) return 82;
  if (base.startsWith('og-')) return 78;
  return 62;
}

async function run() {
  const files = [];
  const walk = (dir) => {
    for (const e of fs.readdirSync(dir)) {
      const p = path.join(dir, e);
      const st = fs.statSync(p);
      if (st.isDirectory()) walk(p);
      else if (p.endsWith('.webp')) files.push(p);
    }
  };
  walk(PUBLIC);

  let totalBefore = 0;
  let totalAfter = 0;
  let skipped = 0;

  for (const f of files.sort()) {
    const before = fs.statSync(f).size;
    totalBefore += before;
    const q = qualityFor(f);
    try {
      // Read into memory first so no file handle stays open (avoids EBUSY on Windows).
      const input = fs.readFileSync(f);
      const out = await sharp(input)
        .webp({ quality: q, effort: 5 })
        .toBuffer();
      if (out.length >= before) {
        skipped++;
        console.log(`${f}: kept original (${(before / 1024).toFixed(1)} KB)`);
        totalAfter += before;
        continue;
      }
      fs.writeFileSync(f, out);
      totalAfter += out.length;
      console.log(`${f}: ${(before / 1024).toFixed(1)} -> ${(out.length / 1024).toFixed(1)} KB (${Math.round((1 - out.length / before) * 100)}% smaller)`);
    } catch (err) {
      console.error(`FAILED ${f}:`, err.message);
      totalAfter += before;
    }
  }

  console.log(`\n=== SUMMARY ===`);
  console.log(`Files processed: ${files.length} (${skipped} kept as-is)`);
  console.log(`TOTAL: ${(totalBefore / 1024).toFixed(1)} KB -> ${(totalAfter / 1024).toFixed(1)} KB (saved ${((totalBefore - totalAfter) / 1024).toFixed(1)} KB)`);
}

run();
