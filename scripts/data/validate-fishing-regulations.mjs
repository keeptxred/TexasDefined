import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const required = [
  "src/data/fishing/regulations-routing.ts",
  "src/routes/fishing.regulations.tsx",
  "src/routes/fishing.lakes.tsx",
  "src/data/fishing/sitemap.ts",
  "src/data/fishing/search.ts",
  "src/data/fishing/internal-links.ts",
  "src/lib/public-routes.ts",
  "package.json",
];
for (const path of required) if (!fs.existsSync(path)) throw new Error(`Fishing Batch 11 missing required file: ${path}`);

const routing = read(required[0]);
const route = read(required[1]);
const lakeDirectory = read(required[2]);
const sitemap = read(required[3]);
const search = read(required[4]);
const links = read(required[5]);
const publicRoutes = read(required[6]);
const pkg = JSON.parse(read(required[7]));

const requireText = (text, token, label) => { if (!text.includes(token)) throw new Error(`Fishing Batch 11 validation failed: ${label}`); };

requireText(routing, 'FISHING_REGULATIONS_PATH = "/fishing/regulations"', "canonical regulations route missing");
for (const token of [
  "TPWD_FISHING_REGULATIONS_URL",
  "TPWD_FISHING_LICENSES_URL",
  "TPWD_FISHING_LICENSE_PACKAGES_URL",
  "TPWD_FRESHWATER_LIMITS_URL",
  "TPWD_FRESHWATER_EXCEPTIONS_URL",
  "TPWD_FISHING_METHODS_URL",
  "TPWD_AQUATIC_INVASIVE_RULES_URL",
]) requireText(routing, token, `official source registry missing ${token}`);

for (const token of [
  'createFileRoute("/fishing/regulations")',
  "Texas fishing rules without stale rule tables.",
  "does not replace the current Outdoor Annual",
  "does not freeze the rule text",
  "License eligibility, fees, endorsements, bag limits, length limits",
  'target="_blank"',
  'rel="noopener noreferrer"',
  '"@type": "FAQPage"',
  '"@type": "BreadcrumbList"',
]) requireText(route, token, `regulations page contract missing ${token}`);

for (const forbidden of ["$30", "$58", "Daily Bag:", "Minimum Length:", "Valid Sep."]) {
  if (route.includes(forbidden)) throw new Error(`Fishing Batch 11 validation failed: volatile rule detail leaked into evergreen route (${forbidden}).`);
}

requireText(lakeDirectory, 'to="/fishing/regulations"', "complete-lake directory does not expose regulations hub");
requireText(lakeDirectory, "Use the Texas fishing regulations checklist", "lake planning context does not explain regulations handoff");
requireText(sitemap, "FISHING_REGULATIONS_PATH", "regulations sitemap entry missing");
requireText(search, "fishing-directory:texas-fishing-regulations", "regulations search document missing");
requireText(links, "fishing-reference:regulations", "regulations internal-link entity missing");
requireText(publicRoutes, '"/fishing/regulations"', "public route governance missing regulations hub");
requireText(pkg.scripts["fishing:validate"], "validate-fishing-regulations.mjs", "Batch 11 validator is not wired into fishing:validate");

console.log("Fishing Batch 11 regulations validation passed: official-source licensing/rules guidance, anti-staleness policy, structured data, lake-directory discovery, sitemap/search/internal-link discovery and public-route governance are protected.");
