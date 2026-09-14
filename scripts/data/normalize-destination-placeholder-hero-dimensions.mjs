import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const ROOT = process.cwd();
const REPORT_PATH = path.join(ROOT, "scripts/data/destination-placeholder-hero-report.json");
const OVERRIDES_PATH = path.join(ROOT, "src/data/destination-hero-overrides.ts");
const WIDTH = 1800;
const HEIGHT = 1013;

async function normalizeImage(src) {
  const absolute = path.join(ROOT, "public", src.replace(/^\/+/, ""));
  const temporary = `${absolute}.normalized.jpg`;
  await execFileAsync("convert", [
    absolute,
    "-auto-orient",
    "-strip",
    "-resize", `${WIDTH}x${HEIGHT}^`,
    "-gravity", "center",
    "-extent", `${WIDTH}x${HEIGHT}`,
    "-quality", "88",
    temporary,
  ]);
  await fs.rename(temporary, absolute);
}

function normalizeOverrideBlock(source, slug) {
  const escaped = slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`(["']${escaped}["']\\s*:\\s*\\{[\\s\\S]*?\\bwidth\\s*:\\s*)\\d+([\\s\\S]*?\\bheight\\s*:\\s*)\\d+`, "m");
  if (!pattern.test(source)) throw new Error(`Override block not found for ${slug}`);
  return source.replace(pattern, `$1${WIDTH}$2${HEIGHT}`);
}

async function main() {
  const report = JSON.parse(await fs.readFile(REPORT_PATH, "utf8"));
  let overrides = await fs.readFile(OVERRIDES_PATH, "utf8");
  const normalized = [];
  for (const image of report.images || []) {
    await normalizeImage(image.src);
    overrides = normalizeOverrideBlock(overrides, image.slug);
    normalized.push({ slug: image.slug, src: image.src, width: WIDTH, height: HEIGHT });
  }
  await fs.writeFile(OVERRIDES_PATH, overrides, "utf8");
  report.dimensionNormalization = { width: WIDTH, height: HEIGHT, normalized };
  await fs.writeFile(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  console.log(JSON.stringify({ normalized: normalized.length, width: WIDTH, height: HEIGHT }, null, 2));
}

await main();
