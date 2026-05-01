// scripts/compress-images.mjs
// Run once (or before build) to compress large images in public/img/.
// Usage: npm run compress-images
// Requires: npm install -D sharp
//
// What it does:
//   - Finds all JPEG/PNG images > 150KB in public/img/
//   - Resizes to max 1920px wide (preserves aspect ratio)
//   - Re-encodes JPEG at quality 82, PNG at quality 85
//   - Saves originals to scripts/image-originals/ (gitignored backup)
//   - Reports before/after sizes and total savings

import sharp from "sharp";
import { readdir, stat, mkdir, copyFile, writeFile, rename } from "fs/promises";
import { join, extname, basename } from "path";
import { fileURLToPath } from "url";
import { existsSync } from "fs";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = join(__dirname, "..");
const IMAGE_DIRS = ["public/img"];
const BACKUP_DIR = join(__dirname, "image-originals");
const MIN_BYTES = 150 * 1024;   // only process files > 150KB
const MAX_WIDTH = 1920;
const JPEG_QUALITY = 82;
const PNG_QUALITY = { quality: 85, compressionLevel: 9 };

const EXTS = new Set([".jpg", ".jpeg", ".png"]);

async function walk(dir, results = []) {
  const entries = await readdir(dir, { withFileTypes: true }).catch(() => []);
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) await walk(full, results);
    else if (EXTS.has(extname(e.name).toLowerCase())) results.push(full);
  }
  return results;
}

async function ensureBackup(filePath) {
  await mkdir(BACKUP_DIR, { recursive: true });
  const dest = join(BACKUP_DIR, basename(filePath));
  if (!existsSync(dest)) await copyFile(filePath, dest);
}

async function compress(filePath) {
  const s = await stat(filePath);
  if (s.size < MIN_BYTES) return null;

  await ensureBackup(filePath);

  const ext = extname(filePath).toLowerCase();
  const meta = await sharp(filePath).metadata();
  const needsResize = (meta.width ?? 0) > MAX_WIDTH;

  let pipeline = sharp(filePath);
  if (needsResize) pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });

  if (ext === ".png") {
    pipeline = pipeline.png(PNG_QUALITY);
  } else {
    pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
  }

  const buf = await pipeline.toBuffer();
  if (buf.length >= s.size) return null; // already optimal

  const tmp = filePath + ".tmp";
  await writeFile(tmp, buf);
  await rename(tmp, filePath);
  return { before: s.size, after: buf.length, saved: s.size - buf.length };
}

async function main() {
  console.log("🖼️  PAI Lab — image compression\n");
  let totalSaved = 0;
  let count = 0;

  for (const dir of IMAGE_DIRS) {
    const abs = join(ROOT, dir);
    const files = await walk(abs);
    for (const f of files) {
      const result = await compress(f);
      if (!result) continue;
      const pct = Math.round((result.saved / result.before) * 100);
      const rel = f.replace(ROOT + "/", "");
      console.log(`  ✓ ${rel}`);
      console.log(`    ${kb(result.before)} → ${kb(result.after)}  (−${pct}%)`);
      totalSaved += result.saved;
      count++;
    }
  }

  if (count === 0) {
    console.log("  All images already optimized (none exceeded 150KB threshold).");
  } else {
    console.log(`\n  ${count} image${count !== 1 ? "s" : ""} compressed.`);
    console.log(`  Total saved: ${kb(totalSaved)}`);
    console.log(`  Originals backed up to scripts/image-originals/`);
  }
}

const kb = (b) => `${(b / 1024).toFixed(1)} KB`;

main().catch(console.error);
