import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';

const inputPath = path.resolve('public/logo.png');
const fileBuffer = fs.readFileSync(inputPath);
const png = PNG.sync.read(fileBuffer);
const { width, height, data } = png;

// Check row by row for non-white pixels
const rowCounts = [];
for (let y = 0; y < height; y++) {
  let count = 0;
  for (let x = 0; x < width; x++) {
    const idx = (width * y + x) << 2;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    if (r < 240 || g < 240 || b < 240) {
      count++;
    }
  }
  rowCounts.push({ y, count });
}

// Find gap between shield and text
let inShield = false;
let shieldStartY = 0;
let shieldEndY = 0;
let textStartY = 0;
let textEndY = 0;

for (let y = 0; y < height; y++) {
  const c = rowCounts[y].count;
  if (!inShield && c > 10) {
    inShield = true;
    shieldStartY = y;
  } else if (inShield && c === 0 && y > 500) {
    inShield = false;
    shieldEndY = y;
  }
}

// Search for text start
for (let y = shieldEndY; y < height; y++) {
  if (rowCounts[y].count > 5) {
    textStartY = y;
    break;
  }
}

for (let y = height - 1; y >= textStartY; y--) {
  if (rowCounts[y].count > 5) {
    textEndY = y;
    break;
  }
}

console.log({ shieldStartY, shieldEndY, textStartY, textEndY });
