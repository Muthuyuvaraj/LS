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
// Logo, favicons and the social share image (public/img/og-image.jpg) come from the
// CST Survey logo kit and are copied as-is – they are intentionally not regenerated here.
console.log(`Images: ${(before / 1e6).toFixed(1)} MB -> ${(after / 1e6).toFixed(1)} MB`);
