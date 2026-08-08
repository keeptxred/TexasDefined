import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const dataDir = path.join(root, "src", "data");

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function quotedObjectKeys(source) {
  return [...source.matchAll(/^\s*"([a-z0-9][a-z0-9-]*)"\s*:\s*\{/gm)].map((match) => match[1]);
}

function recordSlugs(source) {
  const block = source.match(/const records\s*=\s*`([\s\S]*?)`\s*\.trim\(\)\.split/)?.[1] ?? "";
  return block.split("\n").map((line) => line.trim()).filter(Boolean).map((line) => line.split("|")[0]).filter((slug) => /^[a-z0-9][a-z0-9-]*$/.test(slug));
}

function curationFiles() {
  return fs.readdirSync(dataDir)
    .filter((name) => /^destination-curation(?:-batch\d+)?\.ts$/.test(name))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

function stringSetFromBlock(source, constantName) {
  const block = source.match(new RegExp(`const ${constantName} = new Set\\(\\[([\\s\\S]*?)\\]\\);`))?.[1] ?? "";
  return new Set([...block.matchAll(/"([a-z0-9][a-z0-9-]*)"/g)].map((match) => match[1]));
}

const curationFileNames = curationFiles();
const curated = new Set();
const curationOwners = new Map();
const curationSlugsByFile = new Map();
const curationSourceByFile = new Map();
for (const file of curationFileNames) {
  const source = read(path.join("src", "data", file));
  const slugs = quotedObjectKeys(source);
  curationSourceByFile.set(file, source);
  curationSlugsByFile.set(file, slugs);
  for (const slug of slugs) {
    curated.add(slug);
    const owners = curationOwners.get(slug) ?? [];
    owners.push(file);
    curationOwners.set(slug, owners);
  }
}
const duplicateCurations = [...curationOwners.entries()]
  .filter(([, files]) => files.length > 1)
  .map(([slug, files]) => ({ slug, files }));

const layeredDuplicateFiles = [...curationSlugsByFile.entries()]
  .filter(([, slugs]) => slugs.length > 0 && slugs.every((slug) => (curationOwners.get(slug)?.length ?? 0) > 1))
  .map(([file, slugs]) => {
    const source = curationSourceByFile.get(file) ?? "";
    return {
      file,
      slugCount: slugs.length,
      containsHeroOverrides: /\bhero\s*:\s*\{/.test(source),
      containsCoordinates: /\bcoordinates\s*:\s*\{/.test(source),
      containsSourceCheckedAt: /\bsourceCheckedAt\s*:/.test(source),
      note: "Layered duplicate; inspect field-level contributions before consolidation.",
    };
  });
const emptyCurationFiles = [...curationSlugsByFile.entries()]
  .filter(([, slugs]) => slugs.length === 0)
  .map(([file]) => file);

const aliasesSource = read("src/data/destination-curation-all.ts");
const activeCurationFiles = new Set(
  [...aliasesSource.matchAll(/from\s+"\.\/(destination-curation(?:-batch\d+)?)"/g)]
    .map((match) => `${match[1]}.ts`),
);
const inactiveCurationFiles = curationFileNames.filter((file) => !activeCurationFiles.has(file));
const activeEmptyCurationFiles = emptyCurationFiles.filter((file) => activeCurationFiles.has(file));

const aliases = new Map(
  [...aliasesSource.matchAll(/"([a-z0-9][a-z0-9-]*)"\s*:\s*"([a-z0-9][a-z0-9-]*)"/g)]
    .map((match) => [match[1], match[2]]),
);
const brokenAliasTargets = [...aliases.entries()]
  .filter(([, target]) => !curated.has(target))
  .map(([slug, target]) => ({ slug, target }));
const aliasShadowedCurations = [...aliases.entries()]
  .filter(([slug]) => curated.has(slug))
  .map(([slug, target]) => ({ slug, target, files: curationOwners.get(slug) ?? [] }));

const availabilitySource = read("src/data/destination-availability.ts");
const unavailable = stringSetFromBlock(availabilitySource, "UNAVAILABLE_DESTINATION_SLUGS");
const nonPrimary = stringSetFromBlock(availabilitySource, "NON_PRIMARY_TRIP_PLANNER_SLUGS");

function excludedFromPlanner(slug) {
  return unavailable.has(slug) || nonPrimary.has(slug);
}

function covered(slug) {
  return curated.has(slug) || curated.has(aliases.get(slug));
}

function activeCoverage(slugs) {
  const unique = [...new Set(slugs)];
  const active = unique.filter((slug) => !excludedFromPlanner(slug));
  return {
    all: unique,
    active,
    covered: active.filter(covered),
    remaining: active.filter((slug) => !covered(slug)),
    excluded: unique.filter(excludedFromPlanner),
  };
}

const stateParkHeroSource = read("src/data/state-park-hero-map.ts");
const stateParkImageSlugs = quotedObjectKeys(stateParkHeroSource);
const stateParkCoverage = activeCoverage(stateParkImageSlugs);

const exploreHeroSource = read("src/data/explore-hero-map.ts");
const exploreHeroSlugs = quotedObjectKeys(exploreHeroSource);
const exploreCoverage = activeCoverage(exploreHeroSlugs);

const preservedCatalogSlugs = [
  ...recordSlugs(read("src/data/fixtures/legacy-explore.ts")),
  ...recordSlugs(read("src/data/fixtures/legacy-lakes.ts")),
];
const preservedCoverage = activeCoverage(preservedCatalogSlugs);

const result = {
  curationFiles: curationFileNames.length,
  activeCurationFiles: activeCurationFiles.size,
  inactiveCurationFiles: inactiveCurationFiles.length,
  curatedSlugs: curated.size,
  aliases: aliases.size,
  duplicateCurationSlugs: duplicateCurations.length,
  layeredDuplicateFiles: layeredDuplicateFiles.length,
  aliasShadowedCurationSlugs: aliasShadowedCurations.length,
  emptyCurationFiles: emptyCurationFiles.length,
  activeEmptyCurationFiles: activeEmptyCurationFiles.length,
  brokenAliasTargets: brokenAliasTargets.length,
  unavailableDestinations: unavailable.size,
  nonPrimaryTripPlannerDestinations: nonPrimary.size,
  preservedCatalogSlugs: preservedCoverage.all.length,
  activePreservedCatalogSlugs: preservedCoverage.active.length,
  curatedPreservedCatalogSlugs: preservedCoverage.covered.length,
  remainingPreservedCatalogSlugs: preservedCoverage.remaining.length,
  excludedPreservedCatalogSlugs: preservedCoverage.excluded.length,
  stateParkHeroSlugs: stateParkImageSlugs.length,
  activeStateParkHeroSlugs: stateParkCoverage.active.length,
  curatedStateParkHeroSlugs: stateParkCoverage.covered.length,
  remainingStateParkHeroSlugs: stateParkCoverage.remaining.length,
  excludedStateParkHeroSlugs: stateParkCoverage.excluded.length,
  exploreHeroSlugs: exploreHeroSlugs.length,
  activeExploreHeroSlugs: exploreCoverage.active.length,
  curatedExploreHeroSlugs: exploreCoverage.covered.length,
  remainingExploreHeroSlugs: exploreCoverage.remaining.length,
  excludedExploreHeroSlugs: exploreCoverage.excluded.length,
  activeFiles: [...activeCurationFiles].sort((a, b) => a.localeCompare(b, undefined, { numeric: true })),
  inactiveFiles: inactiveCurationFiles,
  activeEmptyFiles: activeEmptyCurationFiles,
  layeredFiles: layeredDuplicateFiles,
  emptyFiles: emptyCurationFiles,
  duplicateCurations,
  aliasShadowedCurations,
  brokenAliases: brokenAliasTargets,
  remainingPreservedCatalog: preservedCoverage.remaining,
  remainingStateParks: stateParkCoverage.remaining,
  remainingExploreHeroes: exploreCoverage.remaining,
};

console.log(JSON.stringify(result, null, 2));

const integrityIssues = duplicateCurations.length || brokenAliasTargets.length || activeEmptyCurationFiles.length || aliasShadowedCurations.length || inactiveCurationFiles.length;
if (process.argv.includes("--integrity") && integrityIssues) {
  console.error(`\n${duplicateCurations.length} duplicate destination curation records; ${brokenAliasTargets.length} destination aliases point to missing curation targets; ${activeEmptyCurationFiles.length} empty modules are active in the resolver; ${aliasShadowedCurations.length} curation records are keyed by alias-source slugs and can never execute; ${inactiveCurationFiles.length} orphan curation modules exist outside the active resolver.`);
  process.exitCode = 1;
} else if (
  process.argv.includes("--strict") &&
  (preservedCoverage.remaining.length || stateParkCoverage.remaining.length || exploreCoverage.remaining.length || integrityIssues)
) {
  console.error(`\n${preservedCoverage.remaining.length} active preserved Trip Planner destinations, ${stateParkCoverage.remaining.length} active mapped state-park destinations and ${exploreCoverage.remaining.length} active mapped Explore destinations still need hand curation; ${duplicateCurations.length} duplicate destination curation records; ${brokenAliasTargets.length} aliases point to missing curation targets; ${activeEmptyCurationFiles.length} empty modules are active in the resolver; ${aliasShadowedCurations.length} curation records are keyed by alias-source slugs and can never execute; ${inactiveCurationFiles.length} orphan curation modules exist outside the active resolver.`);
  process.exitCode = 1;
}
