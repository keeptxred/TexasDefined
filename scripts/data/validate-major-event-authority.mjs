import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dataDir = path.join(root, "src", "data");
const loaderPath = path.join(dataDir, "major-event-page.server.ts");
const registryPath = path.join(dataDir, "major-event-supplemental-registry.server.ts");
const ledgerPath = path.join(root, "ops", "editorial", "major-events-source-disposition.md");

const read = (file) => fs.readFileSync(file, "utf8");
const fail = (message) => {
  console.error(`Major-event authority validation failed: ${message}`);
  process.exitCode = 1;
};

const loader = read(loaderPath);
const registry = read(registryPath);
const ledger = read(ledgerPath);
const trancheFiles = fs
  .readdirSync(dataDir)
  .filter((name) => /^major-event-expanded-authority-tranche\d+\.server\.ts$/.test(name))
  .sort((a, b) => Number(a.match(/tranche(\d+)/)[1]) - Number(b.match(/tranche(\d+)/)[1]));

for (const file of trancheFiles) {
  const tranche = file.match(/tranche(\d+)/)[1];
  const fn = `getExpandedMajorEventAuthorityTranche${tranche}Server`;
  if (!loader.includes(`from "./${file.replace(/\.ts$/, "")}"`)) {
    fail(`${file} exists but is not imported by major-event-page.server.ts`);
  }
  if (!loader.includes(`${fn}(slug)`)) {
    fail(`${file} exists but ${fn}(slug) is not in the major-event resolution chain`);
  }
}

const authorityFiles = [
  "major-event-authority.server.ts",
  "major-event-expanded-authority.server.ts",
  ...trancheFiles,
].map((name) => path.join(dataDir, name));

// Historical tranches contain several intentionally tolerated duplicate definitions.
// The runtime has always used first-match resolution, so this validator records those
// duplicates for visibility without retroactively changing their precedence. New safety
// checks focus on the failure modes that can make published event destinations disappear.
const slugOwners = new Map();
for (const file of authorityFiles) {
  const source = read(file);
  for (const match of source.matchAll(/\bslug:\s*"([a-z0-9-]+)"/g)) {
    const slug = match[1];
    const owners = slugOwners.get(slug) ?? [];
    owners.push(path.basename(file));
    slugOwners.set(slug, owners);
  }
}

const registryBlock = registry.match(/supplementalMajorEventSlugs\s*=\s*\[([\s\S]*?)\]\s*as const/);
if (!registryBlock) {
  fail("could not parse supplementalMajorEventSlugs");
} else {
  const supplemental = [...registryBlock[1].matchAll(/"([a-z0-9-]+)"/g)].map((match) => match[1]);
  const seen = new Set();
  for (const slug of supplemental) {
    if (seen.has(slug)) fail(`supplemental registry contains duplicate slug ${slug}`);
    seen.add(slug);
    if (!slugOwners.has(slug)) fail(`supplemental registry slug ${slug} has no authority record`);
  }
}

const ledgerSlugs = new Set([...ledger.matchAll(/`\/event\/([a-z0-9-]+)`/g)].map((match) => match[1]));
for (const slug of ledgerSlugs) {
  if (!slugOwners.has(slug)) fail(`source-disposition ledger points to /event/${slug}, but no authority record exists`);
}

const duplicateDefinitions = [...slugOwners.values()].filter((owners) => owners.length > 1).length;
if (!process.exitCode) {
  console.log(`Major-event authority validation passed (${trancheFiles.length} tranche files, ${slugOwners.size} authority slugs, ${ledgerSlugs.size} ledger event destinations; ${duplicateDefinitions} historical duplicate definitions retained under first-match resolution).`);
}
