import fs from "node:fs";
import path from "node:path";

const roots = ["src/data", "src/routes", "src/components"];

const explicitFiles = new Set([
  "src/routes/texas-music.lazy.tsx",
  "src/routes/explore.wildlife.lazy.tsx",
  "src/data/gaming.ts",
  "src/components/content/EntityDepthSections.tsx",
  "src/data/william-chris-vineyards-hye-destination.ts",
  "src/data/whirlyball-hurst-destination.ts",
  "src/data/small-town-destinations-wave10.ts",
  "src/data/small-town-destinations-wave11.ts",
  "src/data/small-town-destinations-wave13.ts",
  "src/data/small-town-destinations-wave14.ts",
  "src/data/small-town-destinations-wave15.ts",
  "src/data/museum-expansion-statewide-wave32.ts",
  "src/data/museum-expansion-statewide-wave42.ts",
  "src/data/museum-expansion-statewide-wave44.ts",
  "src/data/museum-expansion-statewide-wave47.ts",
  "src/data/museum-expansion-statewide-wave51.ts",
  "src/data/museum-expansion-statewide-wave53.ts",
  "src/data/museum-expansion-statewide-wave77.ts",
  "src/data/museum-expansion-statewide-wave79.ts",
  "src/data/museum-expansion-statewide-wave50.ts",
  "src/data/museum-expansion-statewide-wave52.ts",
  "src/data/museum-expansion-statewide-wave54.ts",
  "src/data/museum-expansion-statewide-wave66.ts",
  "src/data/museum-expansion-statewide-wave85.ts",
  "src/data/museum-expansion-statewide-wave83.ts",
]);

const familyPatterns = [
  /^src\/data\/texas-talent-launch-depth-wave\d+\.ts$/,
  /^src\/data\/small-town-destinations-wave\d+\.ts$/,
  /^src\/data\/museum-expansion-statewide-wave\d+\.ts$/,
];

const universalForbidden = [
  { label: "publisher-first biography framing", pattern: /\bFor Texas Defined,/i },
  { label: "publisher-first destination framing", pattern: /\bFor TexasDefined\b/i },
  { label: "indexing implementation detail", pattern: /\bindexing-readiness safeguards\b/i },
  { label: "internal-link review workflow", pattern: /\binternal-link reviews?\b/i },
  { label: "event-system implementation detail", pattern: /\bevent system handles\b/i },
  { label: "talent-pillar implementation language", pattern: /\bthe Talent pillar\b/i },
  { label: "editorial-model implementation language", pattern: /\beditorial model\b/i },
  { label: "page-construction instruction", pattern: /\bThe page should\b/i },
  { label: "page-construction result", pattern: /\bThe resulting page\b/i },
  { label: "editorial-system publication workflow", pattern: /\bresearch records in the editorial system\b/i },
];

const explicitArchitectureForbidden = [
  { label: "internal authority architecture", pattern: /TexasDefined(?:’s|'s)?\s+[^"'\n]{0,80}\bauthority\b/i },
  { label: "internal discovery graph", pattern: /\bdiscovery graph\b/i },
  { label: "canonical site architecture", pattern: /\bcanonical TexasDefined destination\b/i },
  { label: "internal linking architecture", pattern: /\bcounty-level internal linking\b/i },
];

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else files.push(full.split(path.sep).join("/"));
  }
  return files;
}

function quotedStrings(source) {
  return source.match(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\`(?:\\.|[^\`\\])*\`/gs) ?? [];
}

const candidates = roots
  .flatMap((root) => walk(root))
  .filter((file) => explicitFiles.has(file) || familyPatterns.some((pattern) => pattern.test(file)));

const failures = [];
for (const file of candidates) {
  const source = fs.readFileSync(file, "utf8");
  const publicText = quotedStrings(source).join("\n");
  const rules = explicitFiles.has(file)
    ? [...universalForbidden, ...explicitArchitectureForbidden]
    : universalForbidden;

  for (const { label, pattern } of rules) {
    const match = publicText.match(pattern);
    if (!match) continue;
    failures.push({ file, label, match: match[0] });
  }
}

if (failures.length) {
  console.error("Reader-facing content architecture validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure.file} [${failure.label}] "${failure.match}"`);
  }
  process.exit(1);
}

console.log(`Reader-facing content architecture validation passed across ${candidates.length} public-content files.`);
