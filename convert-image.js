import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  console.log('Checking for installed image compression libraries...');
  
  // Check package.json for image libraries
  const pkgPath = path.join(__dirname, 'package.json');
  let pkgObj = {};
  if (fs.existsSync(pkgPath)) {
    pkgObj = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  }
  const allDeps = { ...pkgObj.dependencies, ...pkgObj.devDependencies };
  const targetLibs = ['sharp', 'imagemin', 'jimp', 'canvas', 'squoosh'];
  const installedInPkg = targetLibs.filter(lib => allDeps[lib]);
  
  console.log('Image libraries declared in package.json:', installedInPkg.length > 0 ? installedInPkg.join(', ') : 'None');

  let sharp;
  try {
    const sharpModule = await import('sharp');
    sharp = sharpModule.default || sharpModule;
    console.log('sharp library is available and loaded successfully.');
  } catch (err) {
    console.log('sharp library could not be loaded in runtime:', err.message);
  }

  if (sharp) {
    const inputPath = path.join(__dirname, 'public', 'service-card-cleaning.png');
    const outputPath = path.join(__dirname, 'public', 'service-card-cleaning.webp');
    
    if (fs.existsSync(inputPath)) {
      const inputStats = fs.statSync(inputPath);
      console.log(`Input image: ${inputPath} (${(inputStats.size / (1024 * 1024)).toFixed(2)} MB)`);
      
      try {
        await sharp(inputPath)
          .webp({ quality: 80, effort: 4 })
          .toFile(outputPath);
          
        const outputStats = fs.statSync(outputPath);
        console.log(`Successfully converted image to WebP: ${outputPath}`);
        console.log(`Compressed image size: ${(outputStats.size / 1024).toFixed(2)} KB (reduced from ${(inputStats.size / (1024 * 1024)).toFixed(2)} MB)`);
      } catch (convErr) {
        console.error('Error converting image using sharp:', convErr);
      }
    } else {
      console.log(`Input file not found at ${inputPath}`);
    }
  } else {
    console.log('\n--- Image Library Status & Instructions ---');
    console.log('sharp is listed in package.json devDependencies but may not be installed in node_modules yet.');
    console.log('To compress /public/service-card-cleaning.png to WebP (~60KB):');
    console.log('1. Run `npm install` or `npm install -D sharp`');
    console.log('2. Run `node convert-image.js`');
  }
}

main();
