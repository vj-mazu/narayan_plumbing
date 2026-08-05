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
} catch (err) {
  console.error('Failed to copy ceiling-light icon:', err);
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['.monkeycode-ai.live'],
    host: true,
  },
})

