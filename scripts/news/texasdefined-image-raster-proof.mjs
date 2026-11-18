/**
 * Distinguish actual raster image bytes from provider errors, HTML, XML, SVG
 * and spoofed Content-Type labels before storing or linking a hero image.
 */
const SIGNATURES = [
  {
    mime: "image/png", ext: "png",
    match: bytes => bytes.length >= 8 &&
      [137, 80, 78, 71, 13, 10, 26, 10].every((v, i) => bytes[i] === v),
  },
  {
    mime: "image/jpeg", ext: "jpg",
    match: bytes => bytes.length >= 4 &&
      bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255,
  },
  {
    mime: "image/webp", ext: "webp",
    match: bytes => bytes.length >= 12 &&
      String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" &&
      String.fromCharCode(...bytes.slice(8, 12)) === "WEBP",
  },
];

export function verifyTexasDefinedIllustrationBytes(bytes, claimedMime = "") {
  if (!(bytes instanceof Uint8Array) || bytes.length < 10_000 || bytes.length > 12_000_000) {
    throw new Error("AI editorial hero must be a bounded complete raster image");
  }
  const found = SIGNATURES.find(entry => entry.match(bytes));
  if (!found) throw new Error("AI editorial hero is not a real PNG, JPEG or WebP raster image");
  const declared = String(claimedMime).toLowerCase().split(";")[0].trim();
  if (declared && declared !== "application/octet-stream" && declared !== found.mime) {
    throw new Error("AI image declared content type does not match its raster signature");
  }
  return { mime: found.mime, extension: found.ext };
}
