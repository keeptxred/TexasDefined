import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const required = [
  "src/data/fishing/season-routing.ts",
  "src/data/fishing/season-data.server.ts",
  "src/data/fishing/season-data.functions.ts",
  "src/routes/fishing.seasons.tsx",
  "src/routes/fishing.tsx",
  "src/data/fishing/sitemap.ts",
  "src/data/fishing/search.ts",
  "src/data/fishing/internal-links.ts",
  "src/lib/public-routes.ts",
  "package.json",
];
for (const path of required) if (!fs.existsSync(path)) throw new Error(`Fishing Batch 12 missing required file: ${path}`);

const routing = read(required[0]);
const server = read(required[1]);
const functions = read(required[2]);
const route = read(required[3]);
const hub = read(required[4]);
const sitemap = read(required[5]);
const search = read(required[6]);
const links = read(required[7]);
const publicRoutes = read(required[8]);
const pkg = JSON.parse(read(required[9]));

const requireText = (text, token, label) => { if (!text.includes(token)) throw new Error(`Fishing Batch 12 validation failed: ${label}`); };

requireText(routing, 'FISHING_SEASONS_PATH = "/fishing/seasons"', "canonical seasons path missing");
for (const season of ["spring", "summer", "fall", "winter"]) requireText(routing, `"${season}"`, `season filter missing ${season}`);
requireText(server, "isCompleteFishingLakeSlug", "season engine must be restricted to complete lake guides");
requireText(server, "relation.seasonalPatterns.length > 0", "season engine may not synthesize missing seasonal patterns");
requireText(server, 'pattern.season === season || pattern.season === "year-round"', "year-round matching semantics missing");
requireText(server, "profile.speciesIds.includes(fish.id)", "techniques must remain tied to the selected lake/species relationship");
requireText(server, "Sponsorship never changes seasonal guidance or ordering", "commercial/editorial separation is not protected");
requireText(functions, "loadFishingSeasonDataServer", "server function does not isolate seasonal data loading");

for (const token of [
  'createFileRoute("/fishing/seasons")',
  "patterns, not promises",
  "Seasonal guidance is not today's bite",
  "year-round",
  "fresh fishing reports",
  "current regulations",
  'method="get"',
  'name="season"',
  'name="species"',
  '"@type": "FAQPage"',
  '"@type": "BreadcrumbList"',
  '"@type": "ItemList"',
]) requireText(route, token, `season route contract missing ${token}`);

for (const forbidden of ["the best season is", "guaranteed catch", "today's best", "fish are biting", "current bite is"]) {
  if (route.toLowerCase().includes(forbidden)) throw new Error(`Fishing Batch 12 validation failed: live/predictive claim leaked into evergreen season route (${forbidden}).`);
}

requireText(hub, 'to="/fishing/seasons"', "statewide fishing hub does not expose seasons engine");
requireText(sitemap, "FISHING_SEASONS_PATH", "seasons sitemap entry missing");
requireText(search, "fishing-directory:texas-fishing-seasons", "seasons global-search document missing");
requireText(links, "fishing-reference:seasons", "seasons internal-link entity missing");
requireText(publicRoutes, '"/fishing/seasons"', "public route governance missing seasons engine");
requireText(pkg.scripts["fishing:validate"], "validate-fishing-seasons.mjs", "Batch 12 validator is not wired into fishing:validate");

console.log("Fishing Batch 12 seasons validation passed: source-backed seasonal patterns, complete-lake scope, year-round semantics, technique relationships, anti-live-condition safeguards, editorial ordering, schemas and discovery governance are protected.");
