import fs from "node:fs";
import path from "node:path";

const failures = [];
const targets = [];

for (const entry of fs.readdirSync("src/data")) {
  if (/^texas-talent-launch-depth-wave\d+\.ts$/.test(entry) || /^museum-expansion-statewide-wave\d+\.ts$/.test(entry)) {
    targets.push(path.join("src/data", entry));
  }
}
targets.push("src/routes/texas-music.lazy.tsx");

const forbidden = [
  /For Texas Defined,/i,
  /Texas Defined is building source-reviewed profiles/i,
  /canonical authority destination/i,
  /TexasDefined authority stop/i,
  /discovery graph/i,
  /internal-link reviews/i,
  /the editorial system/i,
  /the Talent pillar/i,
];

for (const file of targets) {
  if (!fs.existsSync(file)) {
    failures.push(`Missing reader-facing copy target: ${file}`);
    continue;
  }
  const source = fs.readFileSync(file, "utf8");
  for (const pattern of forbidden) {
    if (pattern.test(source)) failures.push(`${file} contains public-facing internal workflow language matching ${pattern}`);
  }
}

// Preserve visitor-useful language in expanded public authorities. Scoping
// exact phrases avoids rejecting factual source/legal disclosures elsewhere.
const visitorFirst = [
  ["src/data/william-chris-vineyards-hye-destination.ts",
   "William Chris gives TexasDefined a source-rich winery destination",
   "visitors can connect a working Hill Country winery"],
  ["src/data/whirlyball-hurst-destination.ts",
   "For TexasDefined trip planning",
   "For a North Texas trip, WhirlyBall Hurst"],
  ["src/routes/explore.wildlife.lazy.tsx",
   "TexasDefined ties refuge records into county and regional discovery",
   "Use the county and regional guides to pair a wildlife refuge visit"],
  ["src/components/content/EntityDepthSections.tsx",
   "part of TexasDefined's sports-travel reference collection",
   "Check its official venue or team information"],
  ["src/components/content/EntityDepthSections.tsx",
   "belongs in TexasDefined's outdoor and trip-planning guide",
   "Check official access, weather, water conditions"],
  ["src/components/content/EntityDepthSections.tsx",
   "is a TexasDefined event reference",
   "Confirm current dates, admission, parking and entry rules"],
];
for (const [file, prohibited, expected] of visitorFirst) {
  if (!fs.existsSync(file)) {
    failures.push('Missing visitor-first authority target: ' + file);
    continue;
  }
  const source = fs.readFileSync(file, 'utf8');
  if (source.includes(prohibited)) failures.push(file + ': internal publisher workflow still appears in public copy');
  if (!source.includes(expected)) failures.push(file + ': practical visitor guidance is missing');
}

if (failures.length) {
  console.error("Reader-facing copy validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Reader-facing copy validation passed across ${targets.length} Texas Talent, museum and Texas Music source files.`);
