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

function curationFiles() {
  return fs.readdirSync(dataDir)
    .filter((name) => /^destination-curation(?:-batch\d+)?\.ts$/.test(name))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

function stringSetFromBlock(source, constantName) {
  const block = source.match(new RegExp(`const ${constantName} = new Set\\(\\[([\\s\\S]*?)\\]\\);`))?.[1] ?? "";
  return new Set([...block.matchAll(/"([a-z0-9][a-z0-9-]*)"/g)].map((match) => match[1]));
}

const curated = new Set();
for (const file of curationFiles()) {
  for (const slug of quotedObjectKeys(read(path.join("src", "data", file)))) curated.add(slug);
}

const aliasesSource = read("src/data/destination-curation-all.ts");
const aliases = new Map(
  [...aliasesSource.matchAll(/"([a-z0-9][a-z0-9-]*)"\s*:\s*"([a-z0-9][a-z0-9-]*)"/g)]
    .map((match) => [match[1], match[2]]),
);

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
  const active = slugs.filter((slug) => !excludedFromPlanner(slug));
  return {
    active,
    covered: active.filter(covered),
    remaining: active.filter((slug) => !covered(slug)),
    excluded: slugs.filter(excludedFromPlanner),
  };
}

const stateParkHeroSource = read("src/data/state-park-hero-map.ts");
const stateParkImageSlugs = quotedObjectKeys(stateParkHeroSource);
const stateParkCoverage = activeCoverage(stateParkImageSlugs);

const exploreHeroSource = read("src/data/explore-hero-map.ts");
const exploreHeroSlugs = quotedObjectKeys(exploreHeroSource);
const exploreCoverage = activeCoverage(exploreHeroSlugs);

const result = {
  curationFiles: curationFiles().length,
  curatedSlugs: curated.size,
  aliases: aliases.size,
  unavailableDestinations: unavailable.size,
  nonPrimaryTripPlannerDestinations: nonPrimary.size,
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
  remainingStateParks: stateParkCoverage.remaining,
  remainingExploreHeroes: exploreCoverage.remaining,
};

console.log(JSON.stringify(result, null, 2));

if (process.argv.includes("--strict") && (stateParkCoverage.remaining.length || exploreCoverage.remaining.length)) {
  console.error(`\n${stateParkCoverage.remaining.length} active mapped state-park destinations and ${exploreCoverage.remaining.length} active mapped Explore destinations still need hand curation.`);
  process.exitCode = 1;
}
