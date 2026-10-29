import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dataDir = path.join(root, "src", "data");
const loaderPath = path.join(dataDir, "major-event-page.server.ts");
const registryPath = path.join(dataDir, "major-event-supplemental-registry.server.ts");
const ledgerPath = path.join(root, "ops", "editorial", "major-events-source-disposition.md");
const collectionsPath = path.join(dataDir, "event-collections.ts");
const temporalCollectionsPath = path.join(dataDir, "event-temporal-collections.server.ts");
const temporalSitemapPath = path.join(dataDir, "event-temporal-sitemap.server.ts");
const collectionLoaderPath = path.join(dataDir, "event-collection-page.server.ts");
const directoryPath = path.join(dataDir, "major-event-directory.server.ts");
const collectionRoutePath = path.join(root, "src", "routes", "events.$collection.tsx");
const collectionLazyRoutePath = path.join(root, "src", "routes", "events.$collection.lazy.tsx");
const eventsLayoutRoutePath = path.join(root, "src", "routes", "events.tsx");
const eventsLayoutLazyRoutePath = path.join(root, "src", "routes", "events.lazy.tsx");
const eventsRoutePath = path.join(root, "src", "routes", "events.index.tsx");
const eventsLazyRoutePath = path.join(root, "src", "routes", "events.index.lazy.tsx");
const entityRoutePath = path.join(root, "src", "routes", "$kind.$slug.lazy.tsx");
const publicRoutesPath = path.join(root, "src", "lib", "public-routes.ts");
const sitemapPath = path.join(root, "src", "routes", "sitemap[.]xml.ts");

const read = (file) => fs.readFileSync(file, "utf8");
const fail = (message) => {
  console.error(`Major-event authority validation failed: ${message}`);
  process.exitCode = 1;
};

const loader = read(loaderPath);
if (!loader.includes('slug === "big-12-football-championship"') || !loader.includes('SeatGeek as its official primary public ticketing channel')) fail("Big 12 primary ticket seller disclosure missing");
const registry = read(registryPath);
const ledger = read(ledgerPath);
const collections = read(collectionsPath);
const temporalCollections = read(temporalCollectionsPath);
const temporalSitemap = read(temporalSitemapPath);
const collectionLoader = read(collectionLoaderPath);
const directory = read(directoryPath);
const evergreenSitemap = read(path.join(dataDir, "event-evergreen-sitemap.server.ts"));
const collectionCriticalRoute = read(collectionRoutePath);
const collectionLazyRoute = read(collectionLazyRoutePath);
const collectionRoute = `${collectionCriticalRoute}\n${collectionLazyRoute}`;
if (collectionCriticalRoute.includes("component: EventCollectionPage")) fail("event collection UI must stay behind the lazy route boundary");
if (!collectionLazyRoute.includes('createLazyFileRoute("/events/$collection")') || !collectionLazyRoute.includes("component: EventCollectionPage")) fail("event collection lazy route boundary is missing");
const eventsLayoutRoute = read(eventsLayoutRoutePath);
const eventsLayoutLazyRoute = read(eventsLayoutLazyRoutePath);
const eventsRoute = read(eventsRoutePath);
const eventsLazyRoute = read(eventsLazyRoutePath);
const eventsVisibleRoute = `${eventsRoute}\n${eventsLazyRoute}`;
if (!eventsLayoutRoute.includes('createFileRoute("/events")')) fail('Texas Events parent route must remain the /events layout');
if (!eventsLayoutLazyRoute.includes('<Outlet />') || eventsLayoutLazyRoute.includes('useRouterState')) fail('Texas Events parent layout must unconditionally yield child routes without pathname-dependent rendering');
if (!eventsRoute.includes('createFileRoute("/events/")') || !eventsLazyRoute.includes('createLazyFileRoute("/events/")')) fail('Texas Events landing must remain an explicit index child under the /events layout');
const entityRoute = read(entityRoutePath);
const publicRoutes = read(publicRoutesPath);
const sitemap = read(sitemapPath);
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
  "/events/dia-de-los-muertos",
  "/events/texas-independence",
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
const requiredTemporalPaths = [
  "/events/this-weekend",
  "/events/this-month",
  "/events/september-events",
  "/events/october-events",
  "/events/november-events",
  "/events/december-events",
  "/events/fall-festivals",
  "/events/christmas-events",
  "/events/county-fairs",
  "/events/houston-area-events",
  "/events/dallas-fort-worth-events",
  "/events/austin-area-events",
  "/events/san-antonio-area-events",
  "/events/houston-this-weekend",
  "/events/dallas-this-weekend",
  "/events/austin-this-weekend",
  "/events/san-antonio-this-weekend",
];
const alwaysNoindexTemporalPaths = ["/events/this-month"];
const qualifiedTemporalPaths = requiredTemporalPaths.filter((routePath) => !alwaysNoindexTemporalPaths.includes(routePath));
const collectionPaths = [...collections.matchAll(/\bpath:\s*"(\/events\/[a-z0-9-]+)"/g)].map((match) => match[1]);
const temporalPaths = [...temporalCollections.matchAll(/\bpath:\s*"(\/events\/[a-z0-9-]+)"/g)].map((match) => match[1]);
if (collectionPaths.length !== requiredCollectionPaths.length) {
  fail(`expected ${requiredCollectionPaths.length} event authority collections, found ${collectionPaths.length}`);
}
if (new Set(collectionPaths).size !== collectionPaths.length) fail("event authority collection paths must be unique");
if (!collections.includes('kind: "topic"') || !collections.includes("EVENT_TOPIC_SLUGS") || !collectionLoader.includes("EVENT_TOPIC_SLUGS[evergreen!.value]") || !evergreenSitemap.includes("EVENT_TOPIC_SLUGS[collection.value]")) {
  fail("reviewed statewide topic collections must filter by named verified event-guide slugs");
}
for (const routePath of requiredCollectionPaths) {
  if (!collectionPaths.includes(routePath)) fail(`event collection registry is missing ${routePath}`);
  if (!directory.includes(`href: "${routePath}"`)) fail(`Texas Events server discovery directory does not expose ${routePath}`);
  if (!publicRoutes.includes(`"${routePath}"`)) fail(`public route governance does not classify ${routePath} as indexable`);
}
if (temporalPaths.length !== requiredTemporalPaths.length) {
  fail(`expected ${requiredTemporalPaths.length} finite temporal event collections, found ${temporalPaths.length}`);
}
if (new Set(temporalPaths).size !== temporalPaths.length) fail("temporal event collection paths must be unique");
for (const routePath of requiredTemporalPaths) {
  if (!temporalPaths.includes(routePath)) fail(`temporal event collection registry is missing ${routePath}`);
  if (!directory.includes(`href: "${routePath}"`)) fail(`Texas Events timing/region discovery does not expose ${routePath}`);
}
for (const marker of [
  'indexPolicy: "always-noindex"',
  'indexPolicy: "qualified"',
  'timeZone: "America/Chicago"',
  "minimumIndexableItems",
  "shouldIndex",
]) {
  if (!temporalCollections.includes(marker)) fail(`temporal event collection engine is missing protected marker: ${marker}`);
}

for (const marker of [
  "loadMajorEventGuideDirectoryServer",
  "TEMPORAL_EVENT_COLLECTIONS",
  "resolveTemporalEventCollectionServer",
  'definition.indexPolicy === "qualified"',
  "collection?.shouldIndex",
  "latestVerifiedDate",
  "item.sourceCheckedAt",
]) {
  if (!temporalSitemap.includes(marker)) fail(`temporal event sitemap resolver is missing protected marker: ${marker}`);
}
for (const routePath of alwaysNoindexTemporalPaths) {
  if (sitemap.includes(`path: "${routePath}"`) || sitemap.includes(`{ path: "${routePath}"`)) {
    fail(`always-noindex temporal route must never be hard-coded into the sitemap: ${routePath}`);
  }
}
if (qualifiedTemporalPaths.length !== 16) fail("expected exactly sixteen threshold-qualified temporal event collections");
for (const marker of [
  'loadTemporalEventSitemapEntriesServer',
  'const temporalEventSitemapEntries = loadTemporalEventSitemapEntriesServer()',
  '...temporalEventSitemapEntries',
]) {
  if (!sitemap.includes(marker)) fail(`primary sitemap is missing temporal event qualification marker: ${marker}`);
}
if (!directory.includes('timeZone: "America/Chicago"') || !directory.includes("texasTodayIso")) {
  fail("major-event directory must classify past/current events using the Texas calendar date");
}
if (directory.includes("new Date().toISOString().slice(0, 10)")) {
  fail("major-event directory must not use UTC midnight as the Texas event freshness cutoff");
}

for (const marker of [
  'createFileRoute("/events/$collection")',
  'getEventCollectionPage',
  'head: ({ loaderData }) => loaderData?.page.head ?? {}',
  'sourcePolicyTitle',
  'href={event.href}',
]) {
  if (!collectionRoute.includes(marker)) fail(`event collection route is missing protected marker: ${marker}`);
}
for (const marker of [
  'loadMajorEventGuideDirectoryServer',
  'resolveTemporalEventCollectionServer',
  'event.category === evergreen!.value',
  'event.region === evergreen!.value',
  'latestSourceCheck',
  'canonicalPath',
  'buildMeta',
  'canonicalLink',
  'robots: shouldIndex ? undefined : "noindex, follow, max-image-preview:large"',
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
  "eventTimingLinks",
  "eventTopicLinks",
  "eventRegionLinks",
  'href: "/texas-state-fair"',
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
  "head: ({ loaderData }) => loaderData?.head ?? {}",
]) {
  if (!eventsRoute.includes(marker)) fail(`Texas Events eager route is missing server-backed discovery/head marker: ${marker}`);
}
for (const marker of [
  "eventTimingLinks.map",
  "eventTopicLinks.map",
  "eventRegionLinks.map",
]) {
  if (!eventsVisibleRoute.includes(marker)) fail(`Texas Events eager/lazy UI is missing server-backed discovery marker: ${marker}`);
}
for (const marker of [
  '"@type": "Event"',
  'description: event.whyItMatters',
  'startDate: occurrenceWindows.length === 1 && event.startDateTime?.startsWith(window.startDate)',
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

// Protect source-backed visitor essentials, without requiring generic facts on other event guides.
const crossroads = read(path.join(dataDir, "major-event-expanded-authority-tranche41.server.ts"));
const crossroadsSchema = read(path.join(dataDir, "major-event-schema-enrichment-batch12.server.ts"));
for (const marker of [
  'slug: "crossroads-of-texas-country-festival"',
  'startDateTime: "2026-10-24T09:00:00-05:00"',
  'endDateTime: "2026-10-24T19:30:00-05:00"',
  'sourceCheckedAt: "2026-10-29"',
  'quickFacts: [',
  'Jake Worthington',
  'Kenny Whitmire',
  '200+ downtown booths',
  'official downtown parking map',
  'Crossroads Festival & Parking Maps',
  '6–7:30 p.m.',
  '4–5 p.m.',
  'Whataburger Kids Zone',
  'Ethan Pacheco',
  'Jade Flores',
  'Java Llamas',
  '2026 downtown music after the main-stage finale',
  'CROSSROADS26',
  '/destination/waxahachie',
  '/texas-music',
]) if (!crossroads.includes(marker)) fail(`Crossroads authority guide regressed: ${marker}`);
for (const marker of [
  'usdOffer("Festival general admission", 0',
  'person("Jake Worthington")',
  'person("Kenny Whitmire")',
  'sourceType: "wikimedia"',
  'Ellis_County_Courthouse_%281_of_1%29.jpg',
  'approvedForCommercialUse: true',
  'exactLocation: true',
]) if (!crossroadsSchema.includes(marker)) fail(`Crossroads Event enrichment regressed: ${marker}`);
if (!loader.includes('data-major-event-quick-facts') || !loader.includes('event.seoTitle ??')) {
  fail("major-event visitor essentials and metadata overrides must remain available");
}


const palestineAuthority = read(path.join(dataDir, "major-event-expanded-authority-tranche58.server.ts"));
const stayClient = read(path.join(root, "public", "stay-affiliate-options.js"));
// A season window is not daily service or a ticket-availability guarantee.
// Keep publisher links first-party or via the existing approved CJ deep-link path.
for (const marker of [
  'slug: "polar-express-palestine"',
  'startDate: "2026-11-13"',
  'endDate: "2026-12-28"',
  'sourceCheckedAt: "2026-10-26"',
  'officialUrl: "https://texasstaterailroad.net/the-polar-express/"',
  'Texas State Railroad’s own November and December 2026',
  'November 13–15, 19–24 and 27–29',
  'December 18',
  'November 13 has 5:30 and 7:00 PM',
  'December 28 has 3:00, 4:30, 6:00 and 7:30 PM',
  'a posted departure does NOT imply that tickets remain unsold',
  'cancellations at least 30 days ahead incur a $20 fee',
  'diesel locomotive',
  'https://www.visitpalestine.com/events/2026/httpstexasstaterailroadnetevents2332',
  'href: "/events/christmas-events"',
]) if (!palestineAuthority.includes(marker)) fail("Palestine Polar Express booking authority missing " + marker);
for (const marker of [
  'data-polar-express-editorial-intro="true"',
  'data-polar-express-editorial-essentials="true"',
  'isPalestinePolarExpress ? "" : `<section data-major-event-snapshot',
  'Where to board',
  'Allow enough time',
  'Accessibility and seating',
  'data-polar-express-2026-schedule="true"',
  'data-event-official-ticket-cta="true"',
  'Dec 3–6, 9–13, 15–16, 18–23, 26–28',
  'Official railroad calendar:',
  'PALESTINE_HOTELS_AFFILIATE_URL',
  'de1634643/hotels-palestine-texas/',
  'buildHotelsComEvergreenClick',
  'PALESTINE_HOTELS_SID',
  'hotelsComPageSid',
  'event.slug === "polar-express-palestine"',
]) if (!loader.includes(marker)) fail("Palestine Polar Express SSR booking UI missing " + marker);
for (const marker of [
  'PALESTINE_HOTELS_DESTINATION',
  'Compare Palestine hotels on Hotels.com',
  'click-101876465-15734399',
  'td_polar_palestine',
  'isPalestinePolarExpress',
]) if (!stayClient.includes(marker)) fail("Palestine Polar Express client booking UI missing " + marker);

// Event guide slugs and canonical URLs must survive annual schedule updates.
for (const forbidden of [
  'polar-express-palestine-2026',
  'polar-express-palestine-2027',
  '/event/2026/polar-express-palestine',
  '/event/2027/polar-express-palestine',
]) if (loader.includes('canonicalUrl = `${siteUrl}/event/${forbidden}`')) fail("Year-specific Palestine canonical regression");
if (!loader.includes('canonicalUrl = `${siteUrl}/event/${event.slug}`')) fail("Permanent yearless major-event canonical missing");

const evergreenHelper = read(path.join(root, "src/lib/cj-hotels-evergreen.ts"));
for (const required of [
  'click-101876465-15734399',
  'td_polar_palestine',
  'parsed.hostname !== "www.hotels.com"',
  'url.searchParams.set("sid", sid)',
  'url.searchParams.set("url", parsed.toString())',
]) if (!evergreenHelper.includes(required)) fail("CJ Hotels.com Evergreen approved-link safety contract missing " + required);
if (loader.includes('links/101876465/type/dlg/https://www.hotels.com/')) {
  fail("Palestine server-rendered referral still uses old untracked CJ Hotels.com link");
}

const palestineImageEnrichment = read(path.join(dataDir, "major-event-schema-enrichment-batch32.server.ts"));
for (const marker of [
  'slug: "polar-express-palestine"',
  'Southern_Pine_Lumber_Co._No._28_pulling_the_Polar_Express',
  'Historical 2015 Texas State Railroad Polar Express',
  'Photo: Michael Gras, M.Ed.',
  'not the 2026 diesel locomotive',
  'licenseName: "CC BY 2.0"',
  'licenseUrl: "https://creativecommons.org/licenses/by/2.0/"',
  'approvedForCommercialUse: true',
]) if (!palestineImageEnrichment.includes(marker)) fail("Palestine Polar Express licensed historical image missing " + marker);

const palestineLiveVerifier = read(path.join(root, "scripts/ci/verify-palestine-polar-express-production.mjs"));
const protectedDeployWorkflow = read(path.join(root, ".github/workflows/deploy-production.yml"));
for (const marker of [
  'data-polar-express-2026-schedule="true"',
  'data-event-official-ticket-cta="true"',
  'de1634643/hotels-palestine-texas/',
  'Southern_Pine_Lumber_Co._No._28',
  'Michael Gras',
  'verify-polar-express=',
  'cache: "no-store"',
]) if (!palestineLiveVerifier.includes(marker)) fail("Palestine production verification guard missing " + marker);
if (!protectedDeployWorkflow.includes("id: live_palestine_polar_express") ||
    !protectedDeployWorkflow.includes("node scripts/ci/verify-palestine-polar-express-production.mjs")) {
  fail("Protected deploy must verify the 2026 Palestine Polar Express live booking page");
}

// Ended-edition content must not keep advertising October 10, 2026 as a
// future kickoff. The event remains a useful evergreen guide and historical
// archive until the organizer publishes a new occurrence.
const redRiverIndex = read(path.join(dataDir, "major-event-index.ts"));
const redRiverGuide = read(path.join(dataDir, "major-event-expanded-authority-tranche9.server.ts"));
for (const token of [
  "The October 10, 2026 game is complete",
  "Oklahoma defeated Texas 27–24",
  'sourceCheckedAt: "2026-10-29"',
]) if (!redRiverIndex.includes(token)) fail("Red River expired-edition search freshness missing: " + token);
for (const token of [
  "has already been played",
  "For the next edition, first confirm its date",
  "https://soonersports.com/game-center/15626",
]) if (!redRiverGuide.includes(token)) fail("Red River evergreen visitor guidance missing: " + token);
if (redRiverGuide.includes("Texas lists the 2026 game for 2:30 p.m.")) fail("Red River guide restored an expired game-day planning claim");

// The 2026 Heart O' Texas Fair & Rodeo has ended. The raw 2026 search
// experiment is already retired by the runtime event-snippet lifecycle;
 // keep the body from advertising stale hours, prices or tickets as current.
const completedHotFair = read(path.join(dataDir, "major-event-expanded-authority-tranche39.server.ts"));
for (const marker of [
  "concluded October 18",
  "The completed 2026 fair schedule",
  "those were 2026 prices",
  "Do not use these historical performance times",
]) if (!completedHotFair.toLowerCase().includes(marker.toLowerCase())) fail("Expired Heart O' Texas search freshness missing: " + marker);
if (completedHotFair.includes("The fair runs October 8-18, 2026.") ||
    completedHotFair.includes("The current official ticket page lists advance general fair admission at $18")) {
  fail("Historical Heart O' Texas edition must not imply its 2026 admission and dates are current");
}

// Expired 2026 state-fair and festival editions must not remain actionable 2026 trip instructions.
// Keep the source-backed historical results and do not guess an unconfirmed future edition.
for (const [file, mustContain, mustNotContain] of [
  ["major-event-expanded-authority-tranche47.server.ts", ["Prairie View A&M defeated Grambling State 21–14", "2026 State Fair Classic: final score and date", "Grambling State Athletics — September 26, 2026 final score"], ["The 2026 State Fair Classic is scheduled for Saturday", "Kickoff is 6 p.m. in 2026"]],
  ["major-event-expanded-authority-tranche41.server.ts", ["2026 Floresville Peanut Festival concluded October 10", "2026 Grand Parade was October 10", "next edition requires a new organizer announcement"], ["Use Saturday for the Grand Parade and full downtown day"]],
  ["major-event-expanded-authority-tranche39.server.ts", ["East Texas State Fair 2026 edition concluded October 4", "2026 East Texas State Fair: completed", "Historical 2026 grounds and arena ticket rules"], ["Use September 25-October 4 as the confirmed 2026 fair run"]],
]) {
  const contents = read(path.join(dataDir, file));
  for (const marker of mustContain) if (!contents.includes(marker)) fail("Expired event guide freshness marker missing: " + file + " " + marker);
  for (const marker of mustNotContain) if (contents.includes(marker)) fail("Expired event guide restored upcoming edition claim: " + file + " " + marker);
}

// October 24 Crossroads Festival is a completed edition. Preserve its
// well-performing existing SEO title and the organizer's detailed historical
// schedule while rejecting forward-looking 2026 booking instructions.
const completedCrossroads = read(path.join(dataDir, "major-event-expanded-authority-tranche41.server.ts"));
for (const marker of [
  "The October 24, 2026 Crossroads of Texas GO TEXAN Country Festival has concluded",
  "2026 music archive: Jake Worthington",
  "2026 downtown music after the main-stage finale",
  "CBS Texas — October 25, 2026 post-event report",
  'seoTitle: "Crossroads of Texas Country Festival 2026 | Free Music & Parking Guide"',
]) if (!completedCrossroads.includes(marker)) fail("Crossroads completed-edition contract missing: " + marker);
for (const stale of [
  "Check the festival\\'s current schedule shortly before traveling.",
  "The organizer now publishes a full 2026 main-stage running order",
  "The main-stage headline show is scheduled to end at 7:30 p.m.",
]) if (completedCrossroads.includes(stale)) fail("Crossroads historical program advertised as upcoming: " + stale);

const duplicateDefinitions = [...slugOwners.values()].filter((owners) => owners.length > 1).length;
if (!process.exitCode) {
  console.log(`Major-event authority validation passed (${trancheFiles.length} tranche files, ${slugOwners.size} authority slugs, ${ledgerSlugs.size} ledger event destinations, ${collectionPaths.length} crawlable event authority collections, ${temporalPaths.length} finite temporal collections; ${duplicateDefinitions} historical duplicate definitions retained under first-match resolution).`);
}