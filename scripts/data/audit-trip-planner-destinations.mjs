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

const curated = new Set();
for (const file of curationFiles()) {
  for (const slug of quotedObjectKeys(read(path.join("src", "data", file)))) curated.add(slug);
}

const aliasesSource = read("src/data/destination-curation-all.ts");
const aliases = new Map(
  [...aliasesSource.matchAll(/"([a-z0-9][a-z0-9-]*)"\s*:\s*"([a-z0-9][a-z0-9-]*)"/g)]
    .map((match) => [match[1], match[2]]),
);

const stateParkHeroSource = read("src/data/state-park-hero-map.ts");
const stateParkImageSlugs = quotedObjectKeys(stateParkHeroSource);

function covered(slug) {
  return curated.has(slug) || curated.has(aliases.get(slug));
}

const coveredStateParks = stateParkImageSlugs.filter(covered);
const remainingStateParks = stateParkImageSlugs.filter((slug) => !covered(slug));

const placeholderMarkers = ["texasdefined-destination-placeholder", "texasdefined-placeholder"];
const heroMapSource = read("src/data/explore-hero-map.ts");
const mappedExploreHeroes = new Set(quotedObjectKeys(heroMapSource));

const result = {
  curationFiles: curationFiles().length,
  curatedSlugs: curated.size,
  aliases: aliases.size,
  stateParkHeroSlugs: stateParkImageSlugs.length,
  curatedStateParkHeroSlugs: coveredStateParks.length,
  remainingStateParkHeroSlugs: remainingStateParks.length,
  mappedExploreHeroes: mappedExploreHeroes.size,
  placeholderMarkers,
  remainingStateParks,
};

console.log(JSON.stringify(result, null, 2));

if (process.argv.includes("--strict") && remainingStateParks.length) {
  console.error(`\n${remainingStateParks.length} state-park destinations with dedicated images still need hand curation.`);
  process.exitCode = 1;
}
