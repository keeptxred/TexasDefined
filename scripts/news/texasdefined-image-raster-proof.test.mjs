import assert from 'node:assert/strict';
import { test } from 'node:test';
import { verifyTexasDefinedIllustrationBytes } from './texasdefined-image-raster-proof.mjs';

const png = new Uint8Array(10_001);
png.set([137,80,78,71,13,10,26,10]);
const jpeg = new Uint8Array(10_001);
jpeg.set([255,216,255,224]);
const webp = new Uint8Array(10_001);
webp.set([82,73,70,70,0,0,0,0,87,69,66,80]);

test('supports signed-proxy-generated real PNG, JPEG and WebP images without lying about MIME type', () => {
  assert.deepEqual(verifyTexasDefinedIllustrationBytes(png, 'image/png'), {mime:'image/png',extension:'png'});
  assert.deepEqual(verifyTexasDefinedIllustrationBytes(jpeg,'image/jpeg'), {mime:'image/jpeg',extension:'jpg'});
  assert.deepEqual(verifyTexasDefinedIllustrationBytes(webp,'image/webp'), {mime:'image/webp',extension:'webp'});
  assert.deepEqual(verifyTexasDefinedIllustrationBytes(webp,'application/octet-stream'), {mime:'image/webp',extension:'webp'});
});

test('refuses HTML, SVG, JSON, truncated raster bytes and MIME-signature spoofing', () => {
  for (const bytes of [
    Buffer.from('<svg xmlns="http://www.w3.org/2000/svg">'+'x'.repeat(10_500)),
    Buffer.from('<html>'+'error'.repeat(2_000)+'</html>'),
    new Uint8Array(11_000),new Uint8Array(9_999),new Uint8Array(12_000_001),
  ]) assert.throws(()=>verifyTexasDefinedIllustrationBytes(bytes),/image|raster/);
  assert.throws(()=>verifyTexasDefinedIllustrationBytes(png,'image/jpeg'),/content type/);
  assert.throws(()=>verifyTexasDefinedIllustrationBytes(webp,'image/png'),/content type/);
});
