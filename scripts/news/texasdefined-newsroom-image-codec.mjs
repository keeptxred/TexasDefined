/**
 * Cloudflare Workers AI FLUX.1-schnell documents base64 JPEG output; never
 * pretend that JPEG bytes are PNG, nor attach false hero dimensions in JSON-LD.
 * This converts ONLY a legitimate new image model result into the exact 1600x900
 * nonphotographic editorial PNG that TexasDefined's Article schema describes.
 * Runs ONLY after the owner and editorial publication gates have passed.
 */
export const HERO_WIDTH = 1600;
export const HERO_HEIGHT = 900;
const PNG_MAGIC = [137, 80, 78, 71, 13, 10, 26, 10];

export function actualPngHeroDimensions(bytes) {
  if (!(bytes instanceof Uint8Array) || bytes.length < 33
    || !PNG_MAGIC.every((byte, i) => bytes[i] === byte)
    || String.fromCharCode(...bytes.slice(12, 16)) !== 'IHDR') return null;
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  return { width: view.getUint32(16), height: view.getUint32(20) };
}

export function certifiedPngHero(bytes) {
  const dimensions = actualPngHeroDimensions(bytes);
  return Boolean(dimensions && dimensions.width === HERO_WIDTH && dimensions.height === HERO_HEIGHT);
}

/**
 * sharp is already a pinned repository dependency but is lazy-loaded because
 * dry runs/source-only hydration should run without dependency installation.
 */
export async function normalizeAiIllustrationToPng(originalBytes, suppliedSharp) {
  if (!(originalBytes instanceof Uint8Array)
      || originalBytes.byteLength < 10_000 || originalBytes.byteLength > 15_000_000) {
    throw new Error('Illustration model returned an invalid or unreasonable image byte count.');
  }
  const sharp = suppliedSharp || (await import('sharp')).default;
  const input = sharp(Buffer.from(originalBytes), { failOn: 'error', limitInputPixels: 12_000_000 });
  const source = await input.metadata();
  if (!['jpeg', 'png'].includes(source?.format)
      || !Number.isInteger(source.width) || !Number.isInteger(source.height)
      || source.width < 512 || source.height < 512
      || source.width > 4096 || source.height > 4096) {
    throw new Error('Illustration source must be a real, sufficiently large JPEG or PNG image.');
  }
  const bytes = new Uint8Array(await input
    .resize(HERO_WIDTH, HERO_HEIGHT, { fit: 'cover', position: sharp.strategy?.attention || 'centre' })
    .png({ compressionLevel: 8 })
    .toBuffer());
  if (!certifiedPngHero(bytes)) throw new Error('Illustration encoder failed to produce the actual 1600x900 PNG required by the Article schema.');
  if (bytes.length < 15_000 || bytes.length > 20_000_000) throw new Error('Encoded editorial PNG size is outside the publication bounds.');
  return bytes;
}
