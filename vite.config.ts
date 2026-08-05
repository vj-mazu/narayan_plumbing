import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import fs from 'fs'
import path from 'path'

// Copy the ceiling light icon from user's downloads folder to public/service-icons/ceiling-light.png
const srcIcon = "C:\\Users\\maju\\Downloads\\Icons8\\icons8-ceiling-light-50-2.png";
const destIcon = path.resolve(__dirname, 'public/service-icons/ceiling-light.png');

try {
  if (fs.existsSync(srcIcon)) {
    fs.mkdirSync(path.dirname(destIcon), { recursive: true });
    fs.copyFileSync(srcIcon, destIcon);
    console.log('Successfully copied ceiling-light icon from downloads folder!');
  } else {
    console.warn(`Source icon not found at: ${srcIcon}`);
  }

  // Copy generated service background images
  const artifactDir = "C:\\Users\\maju\\.gemini\\antigravity\\brain\\59a1c82e-c3c9-4145-bf8d-5b03b8e36a11";
  const servicesDestDir = path.resolve(__dirname, 'public/services');
  if (fs.existsSync(artifactDir)) {
    fs.mkdirSync(servicesDestDir, { recursive: true });
    const files = fs.readdirSync(artifactDir);
    files.forEach(file => {
      if (file.includes('_bg_') && file.endsWith('.jpg')) {
        const srcPath = path.join(artifactDir, file);
        const serviceName = file.split('_bg_')[0];
        const destPath = path.join(servicesDestDir, `${serviceName}.jpg`);
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied generated image: ${file} -> public/services/${serviceName}.jpg`);
      }
    });
  }
  // Copy user's local service images from Downloads to public/services
  const servicesDestDir2 = path.resolve(__dirname, 'public/services');
  fs.mkdirSync(servicesDestDir2, { recursive: true });

  const userImages = [
    {
      src: "C:\\Users\\maju\\Downloads\\A carpenter creates a unique wooden chair in a cozy workshop, putting his heart into eve.jpg",
      dest: path.join(servicesDestDir2, 'carpenter.jpg'),
      label: 'carpenter',
    },
    {
      src: "C:\\Users\\maju\\Downloads\\download.jpg",
      dest: path.join(servicesDestDir2, 'ceiling.jpg'),
      label: 'false-ceiling',
    },
    {
      src: "C:\\Users\\maju\\Downloads\\Do It Right… Even When No One Sees.jpg",
      dest: path.join(servicesDestDir2, 'electrical.jpg'),
      label: 'electrical',
    },
  ];

  userImages.forEach(({ src, dest, label }) => {
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      console.log(`✅ Copied ${label} image -> ${dest}`);
    } else {
      console.warn(`⚠️  ${label} image not found at: ${src}`);
    }
  });

  // Copy brand logo if it exists in downloads
  const srcLogo = "C:\\Users\\maju\\Downloads\\download.png"; // Or whichever name it has
  const destLogo = path.resolve(__dirname, 'public/logo.png');
  if (fs.existsSync(srcLogo)) {
    fs.copyFileSync(srcLogo, destLogo);
    console.log('✅ Copied brand logo to public/logo.png');
  }

  // Copy custom hero carousel images
  const heroDestDir = path.resolve(__dirname, 'public/hero');
  fs.mkdirSync(heroDestDir, { recursive: true });
  
  const customHeroImages = [
    { src: "C:\\Users\\maju\\Downloads\\ChatGPT Image Aug 5, 2026, 04_26_41 PM.png", dest: path.join(heroDestDir, 'banner-1.png'), label: 'hero-banner-1' },
    { src: "C:\\Users\\maju\\Downloads\\ChatGPT Image Aug 5, 2026, 04_33_59 PM.png", dest: path.join(heroDestDir, 'banner-2.png'), label: 'hero-banner-2' },
    { src: "C:\\Users\\maju\\Downloads\\ChatGPT Image Aug 5, 2026, 04_38_20 PM.png", dest: path.join(heroDestDir, 'banner-3.png'), label: 'hero-banner-3' },
  ];

  customHeroImages.forEach(({ src, dest, label }) => {
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      console.log(`✅ Copied custom hero image: ${label} -> ${dest}`);
    } else {
      console.warn(`⚠️  Custom hero image not found: ${src}`);
    }
  });

} catch (err) {
  console.error('Failed to copy assets:', err);
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['.monkeycode-ai.live'],
    host: true,
  },
})

