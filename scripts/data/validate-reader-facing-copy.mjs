import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const families = [
  /^src\/data\/city-metro-authority\.ts$/,
  /^src\/data\/museum-expansion-statewide-wave\d+\.ts$/,
  /^src\/data\/texas-talent-launch-depth-wave[^/]*\.ts$/,
  /^src\/data\/small-town-destinations-wave\d+\.ts$/,
  /^src\/data\/fixtures\/.*\.ts$/,
];

const forbidden = [
  /\bFor Texas Defined,/i,
  /\bFor TexasDefined,/i,
  /\bgeographic authority layer\b/i,
  /\bTalent pillar\b/i,
  /\bthe (?:strongest )?page should\b/i,
  /\bdiscovery graph\b/i,
  /\binternal-link(?:ing)? (?:cluster|logic|strategy)\b/i,
  /\bcanonical (?:destination|page|authority node)\b/i,
  /\boriginal audit\b/i,
  /\bthe audit['’]s\b/i,
  /\braw list\b/i,
  /\bthin standalone duplicate\b/i,
  /\bnew content lane\b/i,
  /\bunusual-business experiment\b/i,
  /\bbusiness experiment\b/i,
  /\bstill being completed\b/i,
  /\bstill building this guide\b/i,
  /\bGuide In Progress\b/i,
  /\bPhoto unavailable\b/i,
  /\bTexasDefined['’]s[^\n]{0,120}\bauthority (?:hub|node)\b/i,
];

function walk(dir, output = []) {
  if (!fs.existsSync(dir)) return output;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, output);
    else if (/\.(?:ts|tsx)$/.test(entry.name)) output.push(full);
  }
  return output;
}

const failures = [];
for (const full of walk(path.join(root, "src", "data"))) {
  const rel = path.relative(root, full).replaceAll("\\", "/");
  if (!families.some((pattern) => pattern.test(rel))) continue;
  const lines = fs.readFileSync(full, "utf8").split(/\r?\n/);
  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("//") || trimmed.startsWith("*")) return;
    for (const pattern of forbidden) {
      const match = line.match(pattern);
      if (match) failures.push(`${rel}:${index + 1} exposes internal/editorial copy: ${match[0]}`);
    }
  });
}

if (failures.length) {
  console.error("Reader-facing copy validation failed:");
  failures.slice(0, 250).forEach((failure) => console.error(`- ${failure}`));
  if (failures.length > 250) console.error(`- ...and ${failures.length - 250} more`);
  process.exit(1);
}

console.log("Reader-facing copy validation passed: audited public data families contain no high-confidence internal publishing/process language.");
