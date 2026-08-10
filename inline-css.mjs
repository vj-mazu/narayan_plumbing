import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Inlines the built CSS into index.html so no render-blocking stylesheet
// request is needed on the critical path (saves ~150ms on mobile).
const dist = path.join(path.dirname(fileURLToPath(import.meta.url)), 'dist');
const htmlPath = path.join(dist, 'index.html');

let html = fs.readFileSync(htmlPath, 'utf8');
const assets = path.join(dist, 'assets');
const cssFiles = fs.existsSync(assets)
  ? fs.readdirSync(assets).filter((f) => f.endsWith('.css'))
  : [];

for (const f of cssFiles) {
  const css = fs.readFileSync(path.join(assets, f), 'utf8');
  const linkRe = new RegExp(`<link rel="stylesheet"[^>]*href="/assets/${f}"[^>]*>`);
  if (linkRe.test(html)) {
    html = html.replace(linkRe, `<style>${css}</style>`);
    console.log(`Inlined ${f} (${Math.round(css.length / 1024)} KB) into index.html`);
  }
}

fs.writeFileSync(htmlPath, html);
console.log('CSS inlining complete.');
