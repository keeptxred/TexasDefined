import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.cwd(), "src/data");
const files = fs.readdirSync(root)
  .filter((name) => /^museum-expansion-statewide-wave\d+\.ts$/.test(name))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

const forbidden = [
  ["TexasDefined", /TexasDefined/],
  ["canonical", /\bcanonical\b/i],
  ["internal linking", /internal linking/i],
  ["cross-link", /cross-?link(?:ing)?/i],
  ["discovery graph", /discovery graph/i],
  ["authority destination", /authority destination/i],
  ["authority node", /authority node/i],
  ["authority cluster", /authority cluster/i],
  ["authority context", /authority context/i],
  ["audit list", /audit(?:'s)? (?:older )?(?:list|wording)|audit lists?|raw audit/i],
  ["duplicate page", /duplicate pages?/i],
  ["content lane", /content lane/i],
  ["search intent", /search intent/i],
];

const failures = [];

for (const file of files) {
  const fullPath = path.join(root, file);
  const lines = fs.readFileSync(fullPath, "utf8").split("\n");
  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("//") || trimmed.startsWith("*") || trimmed.startsWith("/*")) return;

    // Public museum copy is stored in quoted object values / array entries.
    // Avoid policing implementation comments and identifier names.
    const looksLikePublicString = /^["'`]/.test(trimmed) || /:\s*["'`]/.test(trimmed);
    if (!looksLikePublicString) return;

    for (const [label, pattern] of forbidden) {
      if (pattern.test(line)) {
        failures.push(`${file}:${index + 1} exposes internal publishing language (${label}): ${trimmed}`);
      }
    }
  });
}

if (failures.length) {
  console.error("Museum reader-facing copy validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Museum reader-facing copy safeguards passed across ${files.length} statewide expansion files.`);
