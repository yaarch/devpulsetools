const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generateIcons() {
  const svgPath = path.join(__dirname, '../public/favicon.svg');
  const svgBuffer = fs.readFileSync(svgPath);

  console.log('Generating PWA icons from favicon.svg...');

  // 1. 192x192 (purpose: any)
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(__dirname, '../public/pwa-192x192.png'));
  console.log('✓ Created pwa-192x192.png');

  // 2. 512x512 (purpose: any)
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(__dirname, '../public/pwa-512x512.png'));
  console.log('✓ Created pwa-512x512.png');

  // 3. apple-touch-icon.png (180x180 for iOS Safari)
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(__dirname, '../public/apple-touch-icon.png'));
  console.log('✓ Created apple-touch-icon.png');

  // 4. Maskable 512x512 with 15% safe padding and full-bleed background (#4F46E5)
  // Essential content fits into 80% circle (center 410x410)
  const innerIcon = await sharp(svgBuffer)
    .resize(400, 400)
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 79, g: 70, b: 229, alpha: 1 } // #4F46E5 brand primary
    }
  })
    .composite([
      {
        input: innerIcon,
        top: 56,
        left: 56
      }
    ])
    .png()
    .toFile(path.join(__dirname, '../public/pwa-maskable-512x512.png'));
  console.log('✓ Created pwa-maskable-512x512.png with safe-zone margin');

  console.log('All PWA icons generated successfully!');
}

generateIcons().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
