/** Fail closed if either exact-source WebP copy is absent or too small for Discover. */
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import sharp from "sharp";

const paths = [
  "public/images/editorial/optimized/freedmens-town-tenth-street-1200.webp",
  "public/images/editorial/optimized/dallas-holocaust-human-rights-museum-1200.webp",
];
for (const filename of paths) {
  const bytes = await fs.readFile(filename);
  assert.ok(bytes.length > 20_000 && bytes.length <= 1_250_000,
    filename + " must be a real optimized image within 1.25 MB");
  const metadata = await sharp(bytes).metadata();
  assert.equal(metadata.format, "webp", filename + " must be WebP");
  assert.ok(metadata.width >= 1200 && metadata.height >= 300,
    filename + " must preserve Discover-eligible 1200px photo dimensions");
  console.log("PASS pinned photo " + filename + " " + metadata.width + "x" +
    metadata.height + " " + bytes.length + " bytes");
}
