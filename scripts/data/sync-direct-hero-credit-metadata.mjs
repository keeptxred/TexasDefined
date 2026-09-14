import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const REPORT_PATH = path.join(ROOT, "scripts/data/direct-svg-hero-report.json");

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function quotedStringPattern() {
  return `(?:"(?:\\\\.|[^"\\\\])*"|'(?:\\\\.|[^'\\\\])*')`;
}

function syncHeroCredit(text, image, sourceFile) {
  const escapedSrc = escapeRegExp(image.replacement);
  const objectPattern = new RegExp(
    `\\{([^{}]*?\\bsrc\\s*:\\s*["']${escapedSrc}["'][^{}]*?)\\}`,
    "g",
  );
  const creditPattern = new RegExp(`\\bcredit\\s*:\\s*${quotedStringPattern()}`);
  const creditLiteral = JSON.stringify(String(image.credit || ""));
  let matches = 0;

  const updated = text.replace(objectPattern, (_full, body) => {
    matches += 1;
    if (creditPattern.test(body)) {
      return `{${body.replace(creditPattern, `credit: ${creditLiteral}`)}}`;
    }

    const trailingWhitespace = body.match(/\s*$/)?.[0] || "";
    const core = trailingWhitespace ? body.slice(0, -trailingWhitespace.length) : body;
    const separator = core.trimEnd().endsWith(",") ? " " : ", ";
    return `{${core}${separator}credit: ${creditLiteral}${trailingWhitespace}}`;
  });

  if (matches === 0) {
    throw new Error(`No hero object using ${image.replacement} found in ${sourceFile}. Refusing to leave provenance unsynchronized.`);
  }
  return { text: updated, matches };
}

async function main() {
  const report = JSON.parse(await fs.readFile(REPORT_PATH, "utf8"));
  if (!Array.isArray(report.images) || report.images.length === 0) {
    throw new Error("Direct SVG hero report has no resolved image rows.");
  }

  const sourceFiles = new Map();
  const synced = [];

  for (const image of report.images) {
    if (!image?.replacement || !image?.credit || !Array.isArray(image.files) || image.files.length === 0) {
      throw new Error(`Direct hero report row is missing replacement, credit, or source files: ${JSON.stringify(image)}`);
    }

    for (const sourceFile of image.files) {
      const absolute = path.join(ROOT, sourceFile);
      const current = sourceFiles.has(sourceFile)
        ? sourceFiles.get(sourceFile)
        : await fs.readFile(absolute, "utf8");
      const result = syncHeroCredit(current, image, sourceFile);
      sourceFiles.set(sourceFile, result.text);
      synced.push({ replacement: image.replacement, sourceFile, matches: result.matches, credit: image.credit });
    }
  }

  for (const [sourceFile, text] of sourceFiles) {
    await fs.writeFile(path.join(ROOT, sourceFile), text);
  }

  report.creditMetadataSync = {
    policy: "Every raster hero replacement must carry attribution matching the resolved source recorded in this report; stale attribution from the replaced SVG is forbidden.",
    syncedReferences: synced.length,
    filesTouched: [...sourceFiles.keys()].sort(),
  };
  await fs.writeFile(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`);

  console.log(`Direct hero credit metadata synchronized across ${synced.length} source references in ${sourceFiles.size} files.`);
}

await main();
