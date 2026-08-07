import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const source = 'C:/Users/maju/Downloads/ChatGPT Image Aug 7, 2026, 10_13_12 AM.png';
const targetWebp = './public/service-card-cleaning.webp';

async function copyAndConvert() {
  try {
    if (fs.existsSync(source)) {
      console.log('Found source image in Downloads. Converting and saving directly to public/service-card-cleaning.webp...');
      
      await sharp(source)
        .resize(360, 360, { fit: 'cover' })
        .webp({ quality: 80 })
        .toFile(targetWebp);
        
      console.log('Successfully saved optimized WebP to:', targetWebp);
    } else {
      console.log('Source file not found in Downloads. Make sure the file exists at:', source);
    }
  } catch (err) {
    console.error('Error during copy and conversion:', err);
  }
}

copyAndConvert();
