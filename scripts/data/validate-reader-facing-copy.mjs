import fs from "node:fs";
import path from "node:path";

const roots = [
  "src/routes/texas-music.lazy.tsx",
  ...Array.from({ length: 7 }, (_, index) => `src/data/texas-talent-launch-depth-wave${index + 1}.ts`),
];

for (const entry of fs.readdirSync("src/data")) {
  if (/^museum-expansion-statewide-wave\d+\.ts$/.test(entry)) roots.push(path.join("src/data", entry));
  if (/^small-town-destinations-wave\d+\.ts$/.test(entry)) roots.push(path.join("src/data", entry));
}

const forbidden = [
  ["brand-first editorial framing", /\bFor Texas\s*Defined\b|\bFor TexasDefined\b/i],
  ["internal publication workflow", /research records in the editorial system|profiles? remain unpublished|review gates?|image-rights and internal-link reviews?/i],
  ["internal graph/site architecture", /\b(?:discovery graph|knowledge graph|internal linking|cross-link opportunities|canonical authority destination|authority node|authority hub|authority stop|authority anchor)\b|\bTexasDefined\s+(?:treats|maps|uses|groups)\b|\bTexasDefined\s+anchor\b/i],
  ["audit reconciliation language", /\b(?:the|raw) audit(?:'s)?\b/i],
  ["page/profile/pillar mechanics", /\b(?:the|this)\s+(?:page|profile|pillar)\b.{0,120}\b(?:should|must|can|eligib|editorial|network|route|support|connect|useful)\b/i],
];

function stripComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:])\/\/.*$/gm, "$1");
}

function publicStrings(source) {
  const clean = stripComments(source);
  const values = [];
  const re = /(["'`])((?:\\.|(?!\1)[\s\S])*?)\1/g;
  for (const match of clean.matchAll(re)) values.push(match[2]);
  return values;
}

const failures = [];
for (const file of roots) {
  if (!fs.existsSync(file)) continue;
  for (const value of publicStrings(fs.readFileSync(file, "utf8"))) {
    for (const [label, pattern] of forbidden) {
      if (pattern.test(value)) {
        const excerpt = value.replace(/\s+/g, " ").trim().slice(0, 220);
        failures.push(`${file}: ${label}: "${excerpt}"`);
      }
    }
  }
}

if (failures.length) {
  console.error("Reader-facing copy validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Reader-facing copy validation passed across ${roots.length} public content files.`);
