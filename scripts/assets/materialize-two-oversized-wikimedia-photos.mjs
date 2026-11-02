/**
 * One-time, exact-source image materialization for the two remaining
 * oversized Wikimedia photographs. Preserve the source identity and page
 * attribution; this workflow converts format but does not replace subjects.
 *
 * Output assets are committed as immutable, locally served WebP files, so
 * normal production builds never depend on Wikimedia uptime or paid transforms.
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const IMAGES = [
  {
    label: "Tenth Street Historic District / Freedmen's Town",
    original: "https://upload.wikimedia.org/wikipedia/commons/4/40/Tenth_Street_Historic_District_Freedmen%27s_Town_TxHM_%2829573143580%29.jpg",
    source: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Tenth_Street_Historic_District_Freedmen%27s_Town_TxHM_%2829573143580%29.jpg?width=1200",
    output: "public/images/editorial/optimized/freedmens-town-tenth-street-1200.webp",
  },
  {
    label: "Dallas Holocaust & Human Rights Museum",
    original: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Dallas_Holocaust_%26_Human_Rights_Museum_Photo.png?width=1600",
    source: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Dallas_Holocaust_%26_Human_Rights_Museum_Photo.png?width=1200",
    output: "public/images/editorial/optimized/dallas-holocaust-human-rights-museum-1200.webp",
  },
];
const MAX_FETCH_BYTES = 8_000_000;
const MAX_RESULT_BYTES = 1_250_000;

async function fetchBounded(source) {
  const response = await fetch(source, {
    signal: AbortSignal.timeout(35_000),
    redirect: "follow",
    headers: { "User-Agent": "TexasDefinedImageAssetMaterializer/1.0 (https://texasdefined.com/about)",
      Accept: "image/jpeg,image/png,image/webp,image/*;q=0.8" },
  });
  if (!response.ok || !response.headers.get("content-type")?.startsWith("image/")) {
    throw new Error("Wikimedia photo unavailable; HTTP " + response.status + " / " + response.headers.get("content-type"));
  }
  const buffers = [];
  let length = 0;
  for await (const chunk of response.body) {
    length += chunk.byteLength;
    if (length > MAX_FETCH_BYTES) throw new Error("Wikimedia source exceeds bounded 8 MB fetch");
    buffers.push(chunk);
  }
  return Buffer.concat(buffers);
}

for (const image of IMAGES) {
  const filename = path.resolve(image.output);
  const existing = await fs.readFile(filename).catch(() => null);
  if (existing?.length) {
    const meta = await sharp(existing).metadata();
    if (meta.width >= 1200 && meta.format === "webp" && existing.length <= MAX_RESULT_BYTES) {
      console.log("PRESERVE existing governed photo " + image.output + " (" + existing.length + " bytes)");
      continue;
    }
    throw new Error("Existing source image must be reviewed; refusing to replace " + image.output);
  }

  const bytes = await fetchBounded(image.source);
  const meta = await sharp(bytes).metadata();
  if (!meta.width || meta.width < 1200 || !meta.height || meta.height < 300) {
    throw new Error("Source does not meet governed 1200px photographic standard: " + image.label);
  }
  const optimized = await sharp(bytes).rotate()
    .webp({ quality: 77, effort: 6 })
    .toBuffer();
  const outputMeta = await sharp(optimized).metadata();
  if (outputMeta.width < 1200 || optimized.byteLength > MAX_RESULT_BYTES) {
    throw new Error("Output did not meet 1200px / 1.25 MB budget for " + image.label +
      " (" + outputMeta.width + "px, " + optimized.byteLength + " bytes)");
  }
  await fs.mkdir(path.dirname(filename), { recursive: true });
  await fs.writeFile(filename, optimized);
  console.log("GENERATED " + image.label + " " + bytes.length + " -> " +
    optimized.length + " bytes, " + outputMeta.width + "x" + outputMeta.height);
}
