import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

async function generate() {
  const url = 'https://images.unsplash.com/photo-1617761141732-d481912af1a9?auto=format&fit=crop&w=1600&q=80';
  console.log('Downloading stepped glass image...');
  const res = await fetch(url);
  const buffer = Buffer.from(await res.arrayBuffer());

  const svgGrad = (w, h) => Buffer.from(`
    <svg width="${w}" height="${h}">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1852b0" stop-opacity="0.72" />
          <stop offset="55%" stop-color="#134290" stop-opacity="0.80" />
          <stop offset="100%" stop-color="#09204f" stop-opacity="0.88" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="url(#g)" />
    </svg>
  `);

  const out1280 = path.resolve('public/images/clinic/page-header.webp');
  const out768 = path.resolve('public/images/clinic/page-header-768.webp');
  const out480 = path.resolve('public/images/clinic/page-header-480.webp');

  await sharp(buffer)
    .resize(1280, 520, { fit: 'cover', position: 'bottom' })
    .composite([{ input: svgGrad(1280, 520), blend: 'multiply' }])
    .webp({ quality: 80 })
    .toFile(out1280);

  await sharp(buffer)
    .resize(768, 360, { fit: 'cover', position: 'bottom' })
    .composite([{ input: svgGrad(768, 360), blend: 'multiply' }])
    .webp({ quality: 78 })
    .toFile(out768);

  await sharp(buffer)
    .resize(480, 240, { fit: 'cover', position: 'bottom' })
    .composite([{ input: svgGrad(480, 240), blend: 'multiply' }])
    .webp({ quality: 75 })
    .toFile(out480);

  console.log('Done:');
  console.log('1280:', fs.statSync(out1280).size);
  console.log('768:', fs.statSync(out768).size);
  console.log('480:', fs.statSync(out480).size);
}

generate().catch(console.error);
