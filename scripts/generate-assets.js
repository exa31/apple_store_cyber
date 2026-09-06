const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function run() {
  const rootDir = path.resolve(__dirname, '..');
  const logoPath = path.join(rootDir, 'public', 'logo.png');

  if (!fs.existsSync(logoPath)) {
    console.error('logo.png not found at:', logoPath);
    process.exit(1);
  }

  console.log('Using logo from:', logoPath);

  // 1. Generate src/app/icon.png (Next.js automatically discovers this as the main favicon)
  await sharp(logoPath)
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(rootDir, 'src', 'app', 'icon.png'));
  console.log('✓ Created src/app/icon.png (512x512)');

  // 2. Generate src/app/apple-icon.png (Next.js auto discovers as apple-touch-icon)
  await sharp(logoPath)
    .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(rootDir, 'src', 'app', 'apple-icon.png'));
  console.log('✓ Created src/app/apple-icon.png (180x180)');

  // 3. Update public/apple-touch-icon.png
  await sharp(logoPath)
    .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(rootDir, 'public', 'apple-touch-icon.png'));
  console.log('✓ Updated public/apple-touch-icon.png');

  // 4. Generate public/icon-192.png and public/icon-512.png for PWA manifest
  await sharp(logoPath)
    .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(rootDir, 'public', 'icon-192.png'));
  console.log('✓ Created public/icon-192.png');

  await sharp(logoPath)
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(rootDir, 'public', 'icon-512.png'));
  console.log('✓ Created public/icon-512.png');

  // 5. Generate a proper multi-size ICO file for favicon.ico
  // Modern ICO files can contain PNG data
  const sizes = [16, 32, 48];
  const pngBuffers = await Promise.all(
    sizes.map((s) =>
      sharp(logoPath)
        .resize(s, s, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toBuffer()
    )
  );

  // Build standard ICO file format binary
  // ICO header: 6 bytes (0, 1, count of images)
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = icon
  header.writeUInt16LE(sizes.length, 4); // count of images

  let offset = 6 + sizes.length * 16;
  const dirEntries = [];
  for (let i = 0; i < sizes.length; i++) {
    const size = sizes[i];
    const buf = pngBuffers[i];
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // color palette count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(buf.length, 8); // size of image data
    entry.writeUInt32LE(offset, 12); // offset
    offset += buf.length;
    dirEntries.push(entry);
  }

  const icoBuffer = Buffer.concat([header, ...dirEntries, ...pngBuffers]);
  fs.writeFileSync(path.join(rootDir, 'public', 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(rootDir, 'src', 'app', 'favicon.ico'), icoBuffer);
  console.log('✓ Generated proper multi-resolution favicon.ico for public and src/app');

  // 6. Generate rich OG-Image (1200x630) for social sharing
  const logoForOg = await sharp(logoPath)
    .resize(240, 240, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const svgOgBanner = Buffer.from(`
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#080b11" />
          <stop offset="50%" stop-color="#0e1524" />
          <stop offset="100%" stop-color="#05070a" />
        </linearGradient>
        <radialGradient id="cyanGlow" cx="50%" cy="30%" r="50%">
          <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#000000" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#bg)" />
      <rect width="1200" height="630" fill="url(#cyanGlow)" />
      <g transform="translate(600, 395)" text-anchor="middle">
        <rect x="-170" y="-30" width="340" height="34" rx="17" fill="rgba(6,182,212,0.15)" stroke="#06b6d4" stroke-width="1.5" />
        <text x="0" y="-8" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#22d3ee" letter-spacing="2">AUTHORIZED APPLE RESELLER</text>
        <text x="0" y="55" font-family="system-ui, -apple-system, sans-serif" font-size="46" font-weight="900" fill="#ffffff" letter-spacing="-1">Cyber Apple Store Indonesia</text>
        <text x="0" y="105" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="400" fill="#94a3b8">Beli iPhone, Mac, iPad Resmi Bergaransi 1 Tahun • Cicilan 0%</text>
      </g>
    </svg>
  `);

  await sharp(svgOgBanner)
    .composite([{ input: logoForOg, top: 85, left: 480 }])
    .jpeg({ quality: 95 })
    .toFile(path.join(rootDir, 'public', 'og-image.jpg'));
  console.log('✓ Created public/og-image.jpg (1200x630)');

  // Clean up default Next.js icons if they exist in public
  const nextSvg = path.join(rootDir, 'public', 'next.svg');
  if (fs.existsSync(nextSvg)) {
    fs.unlinkSync(nextSvg);
    console.log('✓ Removed default next.svg');
  }
  const vercelSvg = path.join(rootDir, 'public', 'vercel.svg');
  if (fs.existsSync(vercelSvg)) {
    fs.unlinkSync(vercelSvg);
    console.log('✓ Removed default vercel.svg');
  }

  console.log('\nAll SEO and branding icon assets generated successfully!');
}

run().catch((err) => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
