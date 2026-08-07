import fs from 'fs';
import sharp from 'sharp';

const source = 'C:/Users/maju/Downloads/ChatGPT Image Aug 7, 2026, 10_13_12 AM.png';
const target = 'c:/Users/maju/Downloads/narayan_plumbing-main/narayan_plumbing-main/public/service-card-cleaning.webp';

async function convert() {
  try {
    if (fs.existsSync(source)) {
      console.log('Compresing cleaning image to WebP...');
      await sharp(source)
        .webp({ quality: 80 })
        .toFile(target);
      console.log('Successfully compressed and saved to:', target);
    } else {
      console.log('Source PNG file not found at:', source);
    }
  } catch (err) {
    console.error('Error compressing image:', err);
  }
}

convert();
