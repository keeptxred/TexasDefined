import { readFile, readdir } from "node:fs/promises";
import { extname, join, relative } from "node:path";

const ROOTS = ["src", "public"];
const TEXT_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".json",
  ".md",
  ".html",
  ".txt",
  ".xml",
  ".css",
]);

const FORBIDDEN = [
  { label: "KeepTXRed domain", pattern: /(?:https?:\/\/)?(?:www\.)?keeptxred\.com/gi },
  { label: "KeepTXRed brand", pattern: /\bkeep\s*tx\s*red\b/gi },
  { label: "legacy repository", pattern: /texas-heartland-hub/gi },
  { label: "legacy Lovable preview", pattern: /texas-common-core\.lovable\.app/gi },
];

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(fullPath)));
    } else if (TEXT_EXTENSIONS.has(extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }

  return files;
}

const files = (await Promise.all(ROOTS.map(collectFiles))).flat();
const failures = [];

for (const file of files) {
  const content = await readFile(file, "utf8");
  const lines = content.split(/\r?\n/);

  for (const { label, pattern } of FORBIDDEN) {
    pattern.lastIndex = 0;
    for (let index = 0; index < lines.length; index += 1) {
      pattern.lastIndex = 0;
      if (pattern.test(lines[index])) {
        failures.push({
          file: relative(process.cwd(), file),
          line: index + 1,
          label,
          excerpt: lines[index].trim().slice(0, 180),
        });
      }
    }
  }
}

if (failures.length > 0) {
  console.error("Legacy KeepTXRed references were found in TexasDefined content or application files:\n");
  for (const failure of failures) {
    console.error(`${failure.file}:${failure.line} [${failure.label}] ${failure.excerpt}`);
  }
  process.exit(1);
}

console.log(`Legacy-link validation passed across ${files.length} TexasDefined text files.`);
