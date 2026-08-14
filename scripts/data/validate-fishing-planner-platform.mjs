import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const requiredFiles = [
  "src/data/fishing/planner-routing.ts",
  "src/data/fishing/planner-data.server.ts",
  "src/data/fishing/planner-data.functions.ts",
  "src/routes/fishing.plan.tsx",
  "src/routes/fishing.compare.tsx",
];
for (const path of requiredFiles) {
  if (!fs.existsSync(path)) throw new Error(`Fishing Batch 9 missing required file: ${path}`);
}

const routing = read("src/data/fishing/planner-routing.ts");
const server = read("src/data/fishing/planner-data.server.ts");
const planner = read("src/routes/fishing.plan.tsx");
const compare = read("src/routes/fishing.compare.tsx");
const search = read("src/data/fishing/search.ts");
const links = read("src/data/fishing/internal-links.ts");
const sitemap = read("src/data/fishing/sitemap.ts");
const publicRoutes = read("src/lib/public-routes.ts");
const hub = read("src/routes/fishing.tsx");
const pkg = JSON.parse(read("package.json"));

const requireText = (text, needle, label) => { if (!text.includes(needle)) throw new Error(`Fishing Batch 9 validation failed: ${label}`); };

requireText(routing, '"/fishing/plan"', "trip planner canonical route missing");
requireText(routing, '"/fishing/compare"', "lake comparison canonical route missing");
requireText(server, "isCompleteFishingLakeSlug", "planner must be limited to complete lake guides");
requireText(server, "verifiedListing: true", "planner guide inventory must enforce verified listings");
requireText(server, "filter(isFishingRecordVerified)", "planner local inventory must enforce source verification");
requireText(server, 'freshness === "current"', "planner must explicitly gate current reports by freshness");
requireText(server, "staleReports", "planner must preserve older reports separately from current conditions");
requireText(server, "Sponsorship never changes planner order", "planner editorial independence policy missing");
requireText(server, "Zero means no verified listing is currently published", "planner zero-inventory language must avoid false absence claims");

requireText(planner, "Target species", "planner species filter missing");
requireText(planner, "Region", "planner region filter missing");
requireText(planner, "Current report context", "planner current-condition layer missing");
requireText(planner, "does not infer today's bite", "planner stale-condition safeguard missing");
requireText(planner, "None published", "planner verified-coverage empty state missing");
requireText(planner, '"@type": "ItemList"', "planner ItemList schema missing");
requireText(planner, '"@type": "BreadcrumbList"', "planner breadcrumb schema missing");
requireText(planner, "canonicalPath: FISHING_TRIP_PLANNER_PATH", "planner canonical metadata missing");

requireText(compare, "Choose up to three", "comparison selection control missing");
requireText(compare, "Top verified targets", "comparison fishery-strength row missing");
requireText(compare, "Verified guides", "comparison guide coverage row missing");
requireText(compare, "Verified access", "comparison access coverage row missing");
requireText(compare, "Verified services", "comparison service coverage row missing");
requireText(compare, "Coverage is not a quality score", "comparison anti-ranking safeguard missing");
requireText(compare, "does not create an editorial ranking", "comparison must explicitly reject selection-as-ranking");
requireText(compare, "does not accept paid weighting", "comparison sponsorship independence missing");
requireText(compare, "canonicalPath: FISHING_LAKE_COMPARE_PATH", "comparison canonical metadata missing");
requireText(compare, '"@type": "ItemList"', "comparison ItemList schema missing");

for (const path of ["/fishing/plan", "/fishing/compare"]) {
  requireText(publicRoutes, `"${path}"`, `public route governance missing ${path}`);
  requireText(sitemap, path === "/fishing/plan" ? "FISHING_TRIP_PLANNER_PATH" : "FISHING_LAKE_COMPARE_PATH", `sitemap missing ${path}`);
  requireText(hub, `to="${path}"`, `fishing hub discovery missing ${path}`);
}
requireText(search, "fishing-directory:texas-fishing-trip-planner", "global search planner destination missing");
requireText(search, "fishing-directory:texas-fishing-lake-compare", "global search comparison destination missing");
requireText(links, "fishing-planner:trip", "internal-link planner target missing");
requireText(links, "fishing-planner:compare", "internal-link comparison target missing");
requireText(pkg.scripts["fishing:validate"], "validate-fishing-planner-platform.mjs", "Batch 9 validator is not wired into npm run fishing:validate");

console.log("Fishing Batch 9 planner/comparison validation passed.");
