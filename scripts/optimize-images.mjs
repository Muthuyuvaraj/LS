// Converts the original (very large) photos in /assets into web-ready WebP files in /public/img.
// Originals stay in /assets (never deployed). Run: npm run images
import { readdir, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC_DIRS = ['assets/icons', 'assets/images'];
const OUT = 'public/img';
const MAX_W = 1600;

await mkdir(OUT, { recursive: true });
let before = 0, after = 0;
for (const dir of SRC_DIRS) {
  for (const file of await readdir(dir)) {
    if (!/\.(jpe?g|png|webp|avif)$/i.test(file)) continue;
    const src = path.join(dir, file);
    const base = path.parse(file).name;
    const isLogo = /^logo/i.test(base);
    const out = path.join(OUT, `${base}.${isLogo ? 'png' : 'webp'}`);
    let img = sharp(src).rotate().resize({ width: isLogo ? 400 : MAX_W, withoutEnlargement: true });
    img = isLogo ? img.png({ compressionLevel: 9, palette: true }) : img.webp({ quality: 72 });
    await img.toFile(out);
    before += (await stat(src)).size;
    after += (await stat(out)).size;
  }
}
// Social share image (1200x630)
await sharp('assets/icons/drone.jpg').rotate().resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 78 }).toFile(path.join(OUT, 'og-image.jpg'));
// Favicons from the logo
await sharp('assets/icons/logo.png').resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile('public/favicon.png');
await sharp('assets/icons/logo.png').resize(180, 180, { fit: 'contain', background: '#ffffff' }).png().toFile('public/apple-touch-icon.png');
console.log(`Images: ${(before / 1e6).toFixed(1)} MB -> ${(after / 1e6).toFixed(1)} MB`);
