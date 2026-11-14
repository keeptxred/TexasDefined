#!/usr/bin/env node
// Proof that the preinstalled dependency can rasterize governed SVG sources.
// No system apt mirrors or permission escalation needed; fail on decode errors.
import assert from "node:assert/strict";
import sharp from "sharp";
const source = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="18"><rect width="32" height="18" fill="#234"/></svg>');
const bytes = await sharp(source, { failOn: "error" })
  .resize(1600, 900, { fit: "cover", position: "centre" })
  .webp({ quality: 82 }).toBuffer();
const metadata = await sharp(bytes, { failOn: "error" }).metadata();
assert.equal(metadata.format, "webp", "must encode actual WebP");
assert.equal(metadata.width, 1600, "must output governed width");
assert.equal(metadata.height, 900, "must output governed height");
assert.equal(bytes.toString("ascii", 0, 4), "RIFF", "must have valid RIFF header");
assert.equal(bytes.toString("ascii", 8, 12), "WEBP", "must have valid WebP header");
console.log("Governed SVG→WebP image runtime verified: real SVG decode, centre crop, 1600x900 WebP.");
