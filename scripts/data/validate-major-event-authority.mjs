import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dataDir = path.join(root, "src", "data");
const loaderPath = path.join(dataDir, "major-event-page.server.ts");
const registryPath = path.join(dataDir, "major-event-supplemental-registry.server.ts");
const ledgerPath = path.join(root, "ops", "editorial", "major-events-source-disposition.md");
const collectionsPath = path.join(dataDir, "event-collections.ts");
const collectionLoaderPath = path.join(dataDir, "event-collection-page.server.ts");
const directoryPath = path.join(dataDir, "major-event-directory.server.ts");
const collectionRoutePath = path.join(root, "src", "routes", "events.$collection.tsx");
const eventsRoutePath = path.join(root, "src", "routes", "events.tsx");
const entityRoutePath = path.join(root, "src", "routes", "$kind.$slug.lazy.tsx");
const publicRoutesPath = path.join(root, "src", "lib", "public-routes.ts");

const read = (file) => fs.readFileSync(file, "utf8");
const fail = (message) => {
  console.error(`Major-event authority validation failed: ${message}`);
  process.exitCode = 1;
};

const loader = read(loaderPath);
const registry = read(registryPath);
const ledger = read(ledgerPath);
const collections = read(collectionsPath);
const collectionLoader = read(collectionLoaderPath);
const directory = read(directoryPath);
const collectionRoute = read(collectionRoutePath);
const eventsRoute = read(eventsRoutePath);
const entityRoute = read(entityRoutePath);
const publicRoutes = read(publicRoutesPath);
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

const requiredCollectionPaths = [
  "/events/rodeos",
  "/events/food-festivals",
  "/events/music-festivals",
  "/events/arts-culture",
  "/events/seasonal-events",
  "/events/sports-events",
  "/events/hill-country-events",
  "/events/gulf-coast-events",
  "/events/north-texas-events",
  "/events/south-texas-events",
  "/events/piney-woods-events",
  "/events/big-bend-events",
  "/events/panhandle-events",
];
const collectionPaths = [...collections.matchAll(/\bpath:\s*"(\/events\/[a-z0-9-]+)"/g)].map((match) => match[1]);
if (collectionPaths.length !== requiredCollectionPaths.length) {
  fail(`expected ${requiredCollectionPaths.length} event authority collections, found ${collectionPaths.length}`);
}
if (new Set(collectionPaths).size !== collectionPaths.length) fail("event authority collection paths must be unique");
for (const routePath of requiredCollectionPaths) {
  if (!collectionPaths.includes(routePath)) fail(`event collection registry is missing ${routePath}`);
  if (!directory.includes(`href: "${routePath}"`)) fail(`Texas Events server discovery directory does not expose ${routePath}`);
  if (!publicRoutes.includes(`"${routePath}"`)) fail(`public route governance does not classify ${routePath} as indexable`);
}

for (const marker of [
  'createFileRoute("/events/$collection")',
  'getEventCollectionPage',
  'head: ({ loaderData }) => loaderData?.page.head ?? {}',
  'sourcePolicyTitle',
  'href={`/event/${event.slug}`}',
]) {
  if (!collectionRoute.includes(marker)) fail(`event collection route is missing protected marker: ${marker}`);
}
for (const marker of [
  'loadMajorEventGuideDirectoryServer',
  'collection.kind === "category"',
  'event.category === collection.value',
  'event.region === collection.value',
  'latestSourceCheck',
  'canonicalPath',
  'buildMeta',
  'canonicalLink',
  '"@type": "CollectionPage"',
  '"@type": "ItemList"',
  '"@type": "WebPage"',
  '"@type": "BreadcrumbList"',
  'Verified occurrence first, evergreen planning second',
]) {
  if (!collectionLoader.includes(marker)) fail(`event collection server loader is missing protected marker: ${marker}`);
}
for (const marker of [
  "city: string",
  "region: TexasRegion",
  'category: TexasEvent["category"]',
  "sourceCheckedAt?: string",
  "loadMajorEventLandingDirectoryServer",
  "eventTopicLinks",
  "eventRegionLinks",
  "buildEventsPageHeadServer",
  '"@type": "CollectionPage"',
  '"@type": "ItemList"',
  '"@type": "BreadcrumbList"',
  '"@type": "WebPage"',
]) {
  if (!directory.includes(marker)) fail(`major-event directory is missing collection/discovery/head metadata marker: ${marker}`);
}
for (const marker of [
  "getMajorEventLandingDirectory",
  "getEventsPageHead",
  "eventTopicLinks.map",
  "eventRegionLinks.map",
  "head: ({ loaderData }) => loaderData?.head ?? {}",
]) {
  if (!eventsRoute.includes(marker)) fail(`Texas Events hub is missing server-backed discovery/head marker: ${marker}`);
}
for (const marker of [
  '"@type": "Event"',
  'description: event.whyItMatters',
  'startDate: window.startDate',
  'eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode"',
  'const defaultLocation = {',
  '"@type": "Place"',
  'const location = venueGuide',
  'location,',
]) {
  if (!loader.includes(marker)) fail(`dedicated event occurrence schema is missing protected marker: ${marker}`);
}

if (/major-event-expanded-authority(?:-tranche\d+)?\.server/.test(collections) || /major-event-expanded-authority(?:-tranche\d+)?\.server/.test(collectionRoute)) {
  fail("crawlable event collection definitions/routes must not import server-only long-form event authority tranches into the client surface");
}
if (collectionRoute.includes("buildMeta") || collectionRoute.includes("canonicalLink") || collectionRoute.includes('"@type": "CollectionPage"')) {
  fail("event collection SEO/schema assembly must stay server-side to protect the client bundle budget");
}
if (eventsRoute.includes("const EVENT_TOPIC_LINKS") || eventsRoute.includes("const EVENT_REGION_LINKS") || requiredCollectionPaths.some((routePath) => eventsRoute.includes(`href: "${routePath}"`))) {
  fail("event discovery catalog copy must stay server-side to protect the client bundle budget");
}
if (eventsRoute.includes("buildMeta") || eventsRoute.includes("canonicalLink") || eventsRoute.includes('"@type": "CollectionPage"') || eventsRoute.includes('"@type": "ItemList"') || eventsRoute.includes('"@type": "BreadcrumbList"')) {
  fail("Texas Events hub SEO/schema assembly must stay server-side to protect the client bundle budget");
}
if (directory.includes('"@type": "Event"')) {
  fail("Texas Events hub must not emit Event rich-result entities from a collection/listing page; link to dedicated event guides as WebPage items instead");
}
if (collectionLoader.includes('"@type": "Event"')) {
  fail("event collection pages must not emit Event rich-result entities; dedicated /event/:slug pages own occurrence markup");
}
const genericEventKinds = "['fair','rodeo','festival','holiday-event','sporting-event'].includes(kind)";
if (entityRoute.includes(`${genericEventKinds}) return 'Event'`) || !entityRoute.includes(`${genericEventKinds}) return 'Thing'`)) {
  fail("generic knowledge-graph event-like records must stay neutral until verified occurrence data exists on a dedicated event page");
}

const duplicateDefinitions = [...slugOwners.values()].filter((owners) => owners.length > 1).length;
if (!process.exitCode) {
  console.log(`Major-event authority validation passed (${trancheFiles.length} tranche files, ${slugOwners.size} authority slugs, ${ledgerSlugs.size} ledger event destinations, ${collectionPaths.length} crawlable event authority collections; ${duplicateDefinitions} historical duplicate definitions retained under first-match resolution).`);
}
