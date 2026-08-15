import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const paths = {
  slugs: "src/data/fishing/slugs.ts",
  routing: "src/data/fishing/species-routing.ts",
  server: "src/data/fishing/species-guide-data.server.ts",
  functions: "src/data/fishing/species-guide-data.functions.ts",
  profileRoute: "src/routes/fishing.species.$slug.tsx",
  profileLazy: "src/routes/fishing.species.$slug.lazy.tsx",
  profileComponent: "src/components/fishing/FishingSpeciesProfile.tsx",
  directoryServer: "src/data/fishing/species-directory-data.server.ts",
  directoryComponent: "src/components/fishing/FishSpeciesDirectory.tsx",
  bassServer: "src/data/fishing/largemouth-bass-page-data.server.ts",
  bassRoute: "src/routes/fishing.species.largemouth-bass.tsx",
  bassLazy: "src/routes/fishing.species.largemouth-bass.lazy.tsx",
  sitemap: "src/data/fishing/sitemap.ts",
  search: "src/data/fishing/search.ts",
  links: "src/data/fishing/internal-links.ts",
  package: "package.json",
};
for (const path of Object.values(paths)) if (!fs.existsSync(path)) throw new Error(`Fishing Batch 14 missing required file: ${path}`);
const files = Object.fromEntries(Object.entries(paths).map(([key, path]) => [key, read(path)]));
const pkg = JSON.parse(files.package);
const requireText = (text, token, label) => { if (!text.includes(token)) throw new Error(`Fishing Batch 14 validation failed: ${label}`); };
const completeSpecies = [
  "largemouth-bass",
  "smallmouth-bass",
  "crappie",
  "catfish",
  "blue-catfish",
  "channel-catfish",
  "white-bass",
  "striped-bass",
  "hybrid-striped-bass",
];

requireText(files.slugs, "COMPLETE_FISHING_SPECIES_SLUGS", "complete species allowlist missing");
for (const slug of completeSpecies) requireText(files.slugs, `"${slug}"`, `complete species slug missing ${slug}`);
requireText(files.routing, 'FISHING_SPECIES_DIRECTORY_PATH = "/fishing/species"', "canonical species directory path missing");
requireText(files.routing, 'FISHING_SPECIES_VERIFIED_AT = "2026-08-15"', "Batch 14 verification date missing");
requireText(files.routing, "type CompleteFishingSpeciesSlug", "species canonical path must use shared slug type");
if (files.routing.includes("export const COMPLETE_FISHING_SPECIES_SLUGS") || files.routing.includes("export function isCompleteFishingSpeciesSlug")) {
  throw new Error("Fishing Batch 14 validation failed: duplicate complete-species routing source of truth reintroduced.");
}

for (const token of [
  "isCompleteFishingSpeciesSlug(slug)",
  "isCompleteFishingLakeSlug",
  "Boolean(relation.verifiedAt) && relation.sources.length > 0",
  "!species.verifiedAt || !species.sources.length",
  "profile.speciesIds.includes(species.id)",
  "PUBLISHED_FISHING_TECHNIQUE_SLUGS",
  "Lake order is alphabetical",
  "not a live bite report",
  "Sponsorship, affiliate value, product price and advertiser status",
]) requireText(files.server, token, `source/publication/editorial gate missing ${token}`);
for (const token of ["buildFishingSpeciesProfileHead", '"@type": "WebPage"', '"@type": "Thing"', '"@type": "ItemList"', '"@type": "BreadcrumbList"', "citation:"]) requireText(files.server, token, `server-side species head contract missing ${token}`);
requireText(files.functions, "loadFishingSpeciesProfileServer", "species profile server-function boundary missing");

for (const token of ['createFileRoute("/fishing/species/$slug")', "throw notFound()", 'content: "noindex, nofollow"', "head: ({ loaderData }) => loaderData?.head"]) requireText(files.profileRoute, token, `dynamic species critical route contract missing ${token}`);
for (const token of ['createLazyFileRoute("/fishing/species/$slug")', "FishingSpeciesProfile data={Route.useLoaderData()}"]) requireText(files.profileLazy, token, `dynamic species native lazy route missing ${token}`);
for (const token of ["Complete-lake relationships, not a statewide popularity ranking", "Techniques only where the lake dataset supports them", "rather than inventing a generic recommendation", "Durable planning context, not today's bite", 'target="_blank"', 'rel="noopener noreferrer"']) requireText(files.profileComponent, token, `species profile UI integrity contract missing ${token}`);
if (files.profileRoute.includes("@/components/fishing/FishingSpeciesProfile") || /\bcomponent\s*:/.test(files.profileRoute)) throw new Error("Fishing Batch 14 validation failed: species page component leaked back into critical dynamic route.");
if (files.profileRoute.includes('from "@/data/fishing/species-guide-data.server"')) throw new Error("Fishing Batch 14 validation failed: dynamic client route imports species server module directly.");
for (const eagerHeadToken of ["buildMeta", "canonicalLink", "texasDefinedBrand", '"@type":']) if (files.profileRoute.includes(eagerHeadToken)) throw new Error(`Fishing Batch 14 validation failed: eager SEO/schema payload leaked into dynamic species route (${eagerHeadToken}).`);

requireText(files.directoryServer, "isCompleteFishingSpeciesSlug(row.slug)", "directory full-guide badges must use shared completion gate");
requireText(files.directoryComponent, "Cards marked “Full guide”", "directory expanded-guide explanation missing");
requireText(files.directoryComponent, "Batch 14 expands standalone coverage", "directory Batch 14 growth policy missing");

for (const token of ["buildLargemouthBassHead", '"@type": "WebPage"', '"@type": "BreadcrumbList"', "canonicalPath"]) requireText(files.bassServer, token, `flagship server-head optimization missing ${token}`);
for (const token of ['createFileRoute("/fishing/species/largemouth-bass")', "head: ({ loaderData }) => loaderData?.head"]) requireText(files.bassRoute, token, `flagship critical route contract missing ${token}`);
for (const token of ['createLazyFileRoute("/fishing/species/largemouth-bass")', "FishSpeciesGuide pageData={Route.useLoaderData()}"]) requireText(files.bassLazy, token, `flagship native lazy route missing ${token}`);
if (files.bassRoute.includes("@/components/fishing/FishSpeciesGuide") || files.bassRoute.includes("buildMeta") || files.bassRoute.includes('"@type":')) throw new Error("Fishing Batch 14 validation failed: flagship UI or SEO payload leaked back into the critical route.");

requireText(files.sitemap, "COMPLETE_FISHING_SPECIES_SLUGS.map", "complete species sitemap expansion missing");
requireText(files.search, 'fishingFoundationAnchor("species", row.slug)', "global search does not follow complete species routing");
requireText(files.links, 'fishingFoundationAnchor("species", row.slug)', "internal-link graph does not follow complete species routing");
requireText(pkg.scripts["fishing:validate"], "validate-fishing-species-depth.mjs", "Batch 14 validator not wired into fishing:validate");

for (const forbidden of ["guaranteed catch", "today's best lake", "sponsored ranking", "affiliate pick", "buy this lure"]) {
  if (`${files.server}\n${files.profileComponent}`.toLowerCase().includes(forbidden)) throw new Error(`Fishing Batch 14 validation failed: unsupported species claim leaked (${forbidden}).`);
}

console.log("Fishing Batch 14 species-depth validation passed: nine complete species/group routes, verified complete-lake publication gates, source-backed season/technique relationships, native lazy routes, server-side SEO head payloads, transparent missing coverage and fixed editorial/commercial separation are protected.");
