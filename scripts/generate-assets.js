import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';

const inputPath = path.resolve('public/logo.png');
const fileBuffer = fs.readFileSync(inputPath);
const src = PNG.sync.read(fileBuffer);

// Helper function to crop and pad a bounding box to a target PNG
function cropImage(src, { x1, y1, x2, y2, pad = 20, makeSquare = true }) {
  let w = x2 - x1 + 1;
  let h = y2 - y1 + 1;

  let targetW = w + pad * 2;
  let targetH = h + pad * 2;

  if (makeSquare) {
    const size = Math.max(targetW, targetH);
    targetW = size;
    targetH = size;
  }

  const out = new PNG({ width: targetW, height: targetH });
  // Initialize to transparent
  out.data.fill(0);

  const offsetX = Math.round((targetW - w) / 2);
  const offsetY = Math.round((targetH - h) / 2);

  for (let dy = 0; dy < h; dy++) {
    const sy = y1 + dy;
    for (let dx = 0; dx < w; dx++) {
      const sx = x1 + dx;
      const srcIdx = (src.width * sy + sx) << 2;
      const dstIdx = (targetW * (offsetY + dy) + (offsetX + dx)) << 2;

      out.data[dstIdx] = src.data[srcIdx];
      out.data[dstIdx + 1] = src.data[srcIdx + 1];
      out.data[dstIdx + 2] = src.data[srcIdx + 2];
      out.data[dstIdx + 3] = src.data[srcIdx + 3];
    }
  }

  return out;
}

// 1. Generate crisp Shield Icon (square)
const shieldIcon = cropImage(src, {
  x1: 247,
  y1: 131,
  x2: 773,
  y2: 746,
  pad: 25,
  makeSquare: true,
});
fs.writeFileSync('public/logo-icon.png', PNG.sync.write(shieldIcon));
console.log(`Generated public/logo-icon.png (${shieldIcon.width}x${shieldIcon.height})`);

// 2. Generate Full Logo (shield + text)
const fullLogo = cropImage(src, {
  x1: 140,
  y1: 131,
  x2: 894,
  y2: 896,
  pad: 30,
  makeSquare: false,
});
fs.writeFileSync('public/logo-full.png', PNG.sync.write(fullLogo));
console.log(`Generated public/logo-full.png (${fullLogo.width}x${fullLogo.height})`);
