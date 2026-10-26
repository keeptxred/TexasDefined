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

if (failures.length) {
  console.error("Reader-facing copy validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Reader-facing copy validation passed across ${targets.length} Texas Talent, museum and Texas Music source files.`);
