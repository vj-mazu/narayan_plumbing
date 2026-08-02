import fs from 'fs';

try {
  fs.copyFileSync('C:\\Users\\maju\\Downloads\\ChatGPT Image Aug 2, 2026, 03_03_03 PM.png', 'public/all-icons.png');
  console.log('Copied successfully!');
} catch (err) {
  console.error('Failed to copy:', err.message);
}
