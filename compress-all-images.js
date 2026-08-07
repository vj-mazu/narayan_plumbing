import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PUBLIC_DIR = './public';

async function compressAllWebpImages() {
  console.log('Scanning public directory for WebP images...');
  
  const files = [
    // Service cards
    'service-card-civil.webp',
    'service-card-construction.webp',
    'service-card-carpenter.webp',
    'service-card-home-renovation.webp',
    'service-card-tiles.webp',
    'service-card-home-maintenance.webp',
    'service-card-painting.webp',
    'service-card-electrical.webp',
    'service-card-bathroom.webp',
    'service-card-interior.webp',
    'service-card-ceiling.webp',
    'service-card-plumbing.webp',
    // Hero slider
    'hero-interior.webp',
    'hero-bathroom.webp',
    'hero-painting.webp',
    'hero-cleaning.webp',
    'hero-plumbing.webp',
    // Logo
    'logo-emblem-new.webp'
  ];

  for (const file of files) {
    const filePath = path.join(PUBLIC_DIR, file);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      // Skip if already small/optimized (under 40KB)
      if (stats.size < 40000) {
        console.log(`Skipping already optimized image: ${file} (${(stats.size/1024).toFixed(1)} KB)`);
        continue;
      }
      
      console.log(`Compressing ${file} (${(stats.size/1024).toFixed(1)} KB)...`);
      const tempPath = filePath + '.tmp';
      
      try {
        let width = 360;
        let height = 360;
        
        // Define appropriate dimensions for banner sliders
        if (file.startsWith('hero-')) {
          width = 450;
          height = 675;
        } else if (file.startsWith('logo-')) {
          width = 96;
          height = 96;
        }

        await sharp(filePath)
          .resize(width, height, { fit: 'cover' })
          .webp({ quality: 75 })
          .toFile(tempPath);

        fs.unlinkSync(filePath);
        fs.renameSync(tempPath, filePath);
        
        const newStats = fs.statSync(filePath);
        console.log(`Optimized ${file}: ${(stats.size/1024).toFixed(1)} KB -> ${(newStats.size/1024).toFixed(1)} KB`);
      } catch (err) {
        console.error(`Failed optimizing ${file}:`, err);
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
      }
    }
  }
}

compressAllWebpImages();
