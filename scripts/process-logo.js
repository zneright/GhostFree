import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';

const inputPath = path.resolve('public/logo.png');
const outFullPath = path.resolve('public/logo-transparent.png');
const outIconPath = path.resolve('public/logo-icon.png');

const fileBuffer = fs.readFileSync(inputPath);
const png = PNG.sync.read(fileBuffer);
const { width, height, data } = png;

console.log(`Loaded logo.png: ${width}x${height}`);

// 1. Process full transparent logo
const fullPng = new PNG({ width, height });

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = (width * y + x) << 2;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    const a = data[idx + 3];

    // Background is white. Calculate brightness
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    if (r > 248 && g > 248 && b > 248) {
      // Completely transparent
      fullPng.data[idx] = 0;
      fullPng.data[idx + 1] = 0;
      fullPng.data[idx + 2] = 0;
      fullPng.data[idx + 3] = 0;
    } else if (brightness > 220) {
      // Smooth anti-aliased edge
      const alphaFactor = Math.max(0, Math.min(1, (255 - brightness) / 35));
      fullPng.data[idx] = r;
      fullPng.data[idx + 1] = g;
      fullPng.data[idx + 2] = b;
      fullPng.data[idx + 3] = Math.round(alphaFactor * 255);
    } else {
      fullPng.data[idx] = r;
      fullPng.data[idx + 1] = g;
      fullPng.data[idx + 2] = b;
      fullPng.data[idx + 3] = a;
    }
  }
}

const fullBuffer = PNG.sync.write(fullPng);
fs.writeFileSync(outFullPath, fullBuffer);
console.log(`Saved transparent full logo to: ${outFullPath}`);

// 2. Crop the icon portion (shield & merkle tree, excluding bottom "GhostFree" text)
// Text starts around y = 740. Let's find bounds of the shield
// Shield typically spans y = 50 to y = 730
const iconHeight = Math.round(height * 0.76);
const iconPng = new PNG({ width, height: iconHeight });

for (let y = 0; y < iconHeight; y++) {
  for (let x = 0; x < width; x++) {
    const srcIdx = (width * y + x) << 2;
    const dstIdx = (width * y + x) << 2;
    iconPng.data[dstIdx] = fullPng.data[srcIdx];
    iconPng.data[dstIdx + 1] = fullPng.data[srcIdx + 1];
    iconPng.data[dstIdx + 2] = fullPng.data[srcIdx + 2];
    iconPng.data[dstIdx + 3] = fullPng.data[srcIdx + 3];
  }
}

const iconBuffer = PNG.sync.write(iconPng);
fs.writeFileSync(outIconPath, iconBuffer);
console.log(`Saved transparent icon logo to: ${outIconPath}`);
