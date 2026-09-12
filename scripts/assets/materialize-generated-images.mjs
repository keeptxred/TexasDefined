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
    expectedSha256: "ace7c10c27e319b9bb9e601e096a67af993ae00b6297f10c1f4a9ed9c0e5983f",
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
