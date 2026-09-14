import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const ROOT = process.cwd();
const REPORT_PATH = path.join(ROOT, "scripts/data/direct-svg-hero-report.json");

function declaredDimensions(text, replacement) {
  const index = text.indexOf(replacement);
  if (index < 0) return null;
  const window = text.slice(index, Math.min(text.length, index + 1200));
  const width = Number(window.match(/\bwidth\s*:\s*(\d{2,5})/)?.[1] || 0);
  const height = Number(window.match(/\bheight\s*:\s*(\d{2,5})/)?.[1] || 0);
  if (!Number.isFinite(width) || !Number.isFinite(height) || width < 320 || height < 180) return null;
  return { width, height };
}

async function normalizeImage(output, dimensions) {
  const absolute = path.join(ROOT, output);
  const temporary = `${absolute}.normalized.jpg`;
  await execFileAsync("convert", [
    absolute,
    "-auto-orient",
    "-strip",
    "-resize", `${dimensions.width}x${dimensions.height}^`,
    "-gravity", "center",
    "-extent", `${dimensions.width}x${dimensions.height}`,
    "-quality", "88",
    temporary,
  ]);
  await fs.rename(temporary, absolute);
}

async function main() {
  const report = JSON.parse(await fs.readFile(REPORT_PATH, "utf8"));
  const normalized = [];
  const skipped = [];
  for (const image of report.images || []) {
    let dimensions = null;
    for (const relativeFile of image.files || []) {
      const text = await fs.readFile(path.join(ROOT, relativeFile), "utf8");
      dimensions = declaredDimensions(text, image.replacement);
      if (dimensions) break;
    }
    if (!dimensions) {
      skipped.push({ key: image.key, output: image.output, reason: "declared dimensions not found" });
      continue;
    }
    await normalizeImage(image.output, dimensions);
    normalized.push({ key: image.key, output: image.output, ...dimensions });
  }
  report.dimensionNormalization = { normalized, skipped };
  await fs.writeFile(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify({ normalized: normalized.length, skipped: skipped.length }, null, 2));
}

await main();
