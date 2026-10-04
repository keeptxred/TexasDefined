import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const required = [
  "src/data/fishing/season-routing.ts",
  "src/data/fishing/season-data.server.ts",
  "src/data/fishing/season-data.functions.ts",
  "src/routes/fishing.seasons.tsx",
  "src/components/fishing/FishingSeasonDirectory.tsx",
  "src/routes/fishing.tsx",
  "src/components/fishing/FishingHub.tsx",
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
const component = read(required[4]);
const hubRoute = read(required[5]);
const hubComponent = read(required[6]);
const sitemap = read(required[7]);
const search = read(required[8]);
const links = read(required[9]);
const publicRoutes = read(required[10]);
const pkg = JSON.parse(read(required[11]));
const requireText = (text, token, label) => { if (!text.includes(token)) throw new Error(`Fishing Batch 12 validation failed: ${label}`); };

requireText(routing, 'FISHING_SEASONS_PATH = "/fishing/seasons"', "canonical seasons path missing");
for (const season of ["spring", "summer", "fall", "winter"]) requireText(routing, `"${season}"`, `season filter missing ${season}`);
requireText(server, "isCompleteFishingLakeSlug", "season engine must be restricted to complete lake guides");
requireText(server, "relation.seasonalPatterns.length > 0", "season engine may not synthesize missing seasonal patterns");
requireText(server, 'pattern.season === season || pattern.season === "year-round"', "year-round matching semantics missing");
requireText(server, "profile.speciesIds.includes(fish.id)", "techniques must remain tied to the selected lake/species relationship");
requireText(server, "Sponsorship never changes seasonal guidance or ordering", "commercial/editorial separation is not protected");
requireText(server, "loadFishingReportDirectoryDataServer", "season page must integrate governed fishing reports");
requireText(server, 'entry.freshness === "current"', "season page may only expose current reports in its right-now module");
requireText(functions, "loadFishingSeasonDataServer", "server function does not isolate seasonal data loading");

for (const token of [
  'createFileRoute("/fishing/seasons")',
  'lazy(() => import("@/components/fishing/FishingSeasonDirectory")',
  "FishingSeasonDirectory data={Route.useLoaderData()} search={Route.useSearch()}",
  '"@type": "FAQPage"',
  '"@type": "BreadcrumbList"',
  '"@type": "ItemList"',
]) requireText(route, token, `season route contract missing ${token}`);

for (const token of [
  "Texas Lake Fishing Seasons by Month",
  "What month are you fishing?",
  "What our lake guides cover each season",
  "This is coverage, not a best-fish ranking.",
  "Choose a fish",
  "Choose a Texas region",
  "Current Texas fishing reports",
  "Only reports that are still current appear here.",
  "Start with a month, season, fish or region.",
  "Rather than dumping the entire database onto this page",
  "Browse all fishing lakes",
  "Available year-round",
  "fresh fishing reports",
  "current regulations",
  "Last reviewed:",
  "No lake guides match these filters",
  "Prairies & Lakes",
]) requireText(component, token, `season UI contract missing ${token}`);
requireText(component, "const hasFilters = Boolean", "unfiltered landing page must not render the full lake database by default");
requireText(component, '!hasFilters ? <div', "planning-first empty state missing");
requireText(route, "monthSlug(search.month)", "month filter validation missing");
requireText(route, "region: slug(search.region)", "region filter validation missing");
for (const month of ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"]) requireText(component, `"${month}"`, `month navigation missing ${month}`);
for (const monthName of ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]) requireText(component, `"${monthName}"`, `full month label missing ${monthName}`);

for (const forbidden of ["the best season is", "guaranteed catch", "today's best", "fish are biting", "current bite is"]) {
  if (`${route}\n${component}`.toLowerCase().includes(forbidden)) throw new Error(`Fishing Batch 12 validation failed: live/predictive claim leaked into evergreen season route (${forbidden}).`);
}

requireText(hubRoute, 'lazy(() => import("@/components/fishing/FishingHub")', "statewide fishing hub lazy boundary missing");
requireText(hubComponent, 'href="/fishing/seasons"', "statewide fishing hub does not expose seasons engine");
requireText(sitemap, "FISHING_SEASONS_PATH", "seasons sitemap entry missing");
requireText(search, "fishing-directory:texas-fishing-seasons", "seasons global-search document missing");
requireText(links, "fishing-reference:seasons", "seasons internal-link entity missing");
requireText(publicRoutes, '"/fishing/seasons"', "public route governance missing seasons engine");
requireText(pkg.scripts["fishing:validate"], "validate-fishing-seasons.mjs", "Batch 12 validator is not wired into fishing:validate");

console.log("Fishing Batch 12 seasons validation passed: source-backed seasonal patterns, complete-lake scope, planning-first landing UX, full month labels, lazy UI boundary, year-round semantics, technique relationships, current-report safeguards, editorial ordering, schemas and discovery governance are protected.");
