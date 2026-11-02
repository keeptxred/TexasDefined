/**
 * Build-time compression of the eight oversized locally hosted photos identified
 * in the November 2, 2026 image audit. This modifies build artifacts only, never
 * the repo originals or the public URLs (so existing references do not change).
 *
 * Do not turn this into a per-commit full-site image scan. The audit remains
 * a separate scheduled/offline workflow.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const affected = [
  "images/explore/historic-sites/goliad-state-park.jpg",
  "images/state-parks/old-tunnel-state-park.jpg",
  "images/state-parks/mother-neff-state-park.jpg",
  "images/explore/lakes-rivers/lake-meredith-national-recreation-area.jpg",
  "images/explore/historic-sites/alibates-flint-quarries-national-monument.jpg",
  "images/state-parks/world-birding-center-bentsen-rio-grande-valley-state-park.jpg",
  "images/explore/beaches-coast/mustang-island-state-park.jpg",
  "images/state-parks/tyler-state-park.jpg",
];

let savedBytes = 0;
for (const imagePath of affected) {
  const localPath = path.join(root, "public", imagePath);
  const original = await fs.readFile(localPath);
  const metadata = await sharp(original).metadata();
  if (metadata.format !== "jpeg") {
    throw new Error("Audited JPEG is not JPEG: " + imagePath);
  }
  let optimized = await sharp(original)
    .rotate()
    .resize({ width: 1440, withoutEnlargement: true })
    .jpeg({ quality: 76, mozjpeg: true, progressive: true })
    .toBuffer();
  if (optimized.byteLength > 750_000) {
    optimized = await sharp(original)
      .rotate()
      .resize({ width: 1200, withoutEnlargement: true })
      .jpeg({ quality: 70, mozjpeg: true, progressive: true })
      .toBuffer();
  }
  if (optimized.byteLength > 900_000) {
    throw new Error("Audited image remains over 900 KB after optimization: " + imagePath);
  }
  if (optimized.byteLength < original.byteLength) {
    await fs.writeFile(localPath, optimized);
    savedBytes += original.byteLength - optimized.byteLength;
  }
  console.log(
    "Image audit " + imagePath + ": " +
    original.byteLength + " -> " + Math.min(optimized.byteLength, original.byteLength) + " bytes",
  );
}
console.log("Optimized 8 audited local images; saved " + savedBytes + " bytes in build assets.");
