import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

const assets = [
  {
    sourceDir: path.join(root, "assets/generated/chappell-hill-bluebonnet-festival"),
    prefix: "chappell-hill-bluebonnet-festival.webp.b64.",
    expectedParts: 7,
    expectedSha256: "460aef1e567bcd4135ae1c4e16c30e713e1ee44989c4700c3b86506d625aa834",
    outputPath: path.join(root, "public/images/events/chappell-hill-bluebonnet-festival.webp"),
  },
];

for (const asset of assets) {
  const parts = fs
    .readdirSync(asset.sourceDir)
    .filter((name) => name.startsWith(asset.prefix))
    .sort();

  if (parts.length !== asset.expectedParts) {
    throw new Error(`Expected ${asset.expectedParts} generated image parts, found ${parts.length}.`);
  }

  const encoded = parts
    .map((name) => fs.readFileSync(path.join(asset.sourceDir, name), "utf8").trim())
    .join("");

  const bytes = Buffer.from(encoded, "base64");
  const actualSha256 = crypto.createHash("sha256").update(bytes).digest("hex");

  if (actualSha256 !== asset.expectedSha256) {
    throw new Error(`Generated image checksum mismatch: ${actualSha256}`);
  }

  fs.mkdirSync(path.dirname(asset.outputPath), { recursive: true });
  fs.writeFileSync(asset.outputPath, bytes);
  console.log(`Materialized ${path.relative(root, asset.outputPath)} (${bytes.length} bytes).`);
}
