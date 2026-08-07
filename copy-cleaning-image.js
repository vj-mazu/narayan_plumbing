const fs = require('fs');
const path = require('path');

const source = `C:\\Users\\maju\\Downloads\\ChatGPT Image Aug 7, 2026, 10_13_12 AM.png`;
const target = `c:\\Users\\maju\\Downloads\\narayan_plumbing-main\\narayan_plumbing-main\\public\\service-card-cleaning.png`;

try {
  const targetDir = path.dirname(target);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  if (!fs.existsSync(source)) {
    throw new Error(`Source file does not exist: ${source}`);
  }

  fs.copyFileSync(source, target);
  console.log(`Successfully copied ${source} to ${target}`);

  // Delete script after running
  fs.unlinkSync(__filename);
  console.log(`Script ${__filename} deleted successfully.`);
} catch (err) {
  console.error(`Error copying image:`, err);
  process.exit(1);
}
