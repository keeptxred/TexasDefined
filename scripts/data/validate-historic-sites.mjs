import fs from 'node:fs';

const readRouteSurface = (file) => {
  const eagerSource = fs.readFileSync(file, 'utf8');
  const lazyFile = file.replace(/\.tsx$/, '.lazy.tsx');
  return fs.existsSync(lazyFile) ? `${eagerSource}\n${fs.readFileSync(lazyFile, 'utf8')}` : eagerSource;
};

const seeds = fs.readFileSync('src/data/historic-sites.ts', 'utf8');
const primary = fs.readFileSync('src/data/historic-site-enrichment.ts', 'utf8');
const extra = fs.readFileSync('src/data/historic-site-area-guides-extra.ts', 'utf8');
const nationalCemeteries = fs.readFileSync('src/data/national-cemetery-enrichment.ts', 'utf8');
const remoteHeroes = fs.readFileSync('src/data/historic-site-remote-heroes.ts', 'utf8');
const clusters = fs.readFileSync('src/data/historic-site-clusters.ts', 'utf8');
const corrections = fs.readFileSync('src/data/historic-site-fact-corrections.ts', 'utf8');
const visitorPolicy = fs.readFileSync('src/data/destination-availability.ts', 'utf8');
const authorityExpansion = fs.readFileSync('src/data/historic-site-authority-2026.ts', 'utf8');
const runtime = fs.readFileSync('src/data/destination-query-runtime.ts', 'utf8');
const preserved = fs.readFileSync('src/data/destination-preserved-catalog.ts', 'utf8');
const history = readRouteSurface('src/routes/texas-history.tsx');
const county = fs.readFileSync('src/components/content/CountyHistoricSites.tsx', 'utf8');
const maybornData = fs.readFileSync('src/data/museum-expansion-waco.ts', 'utf8');
const maybornAuthority = fs.readFileSync('src/components/editorial/MaybornMuseumAuthority.tsx', 'utf8');
const destinationRoute = fs.readFileSync('src/routes/destination.$slug.tsx', 'utf8');
const cachePurge = fs.readFileSync('scripts/ci/purge-cloudflare-cache.mjs', 'utf8');
const failures = [];

// Prevent a verified, time-sensitive visitor fact from regressing to generic
// "check the operator" prose or losing its controlling Texas Historical Commission source.
const visitDepth = fs.readFileSync('src/data/historic-site-depth-all.ts', 'utf8');
const fullCatalog = fs.readFileSync('src/data/historic-site-authority-full-catalog.ts', 'utf8');
const fultonVisitorRecord = visitDepth.split('  "fulton-mansion": {')[1]?.split('  "goodnight-ranch": {')[0] || '';
for (const marker of [
  'last ticket 3:15 p.m.', 'ages 6–17 $4', 'walk-in only',
  'at least two weeks in advance', 'wheelchair lift',
  'full flight of stairs', 'notebook of images',
]) if (!fultonVisitorRecord.includes(marker)) failures.push('Fulton Mansion visitor facts or accessible alternative missing: ' + marker);
for (const marker of [
  'fulton-mansion/plan-your-visit-fulton-mansion',
  'The public self-guided visit',
]) {
  // The exact official-tour URL is required; prose may differ between pages.
  if (marker.includes('plan-your-visit-') && !fullCatalog.includes(marker)) failures.push('Fulton Mansion primary operator tour citation missing');
}
if (!fullCatalog.includes('last ticket at 3:15 p.m.')) failures.push('Fulton Mansion opening/last-ticket planning detail missing from authority assessment');
if (!visitDepth.includes('destination.slug === "fulton-mansion" ? "2026-10-14"')) failures.push('Fulton Mansion verified visitor date missing');


const expandedHistoricSlugs = [
  'fort-davis-national-historic-site',
  'san-jacinto-battleground',
  'the-alamo',
  'goliad-state-park',
  'fort-lancaster',
  'fort-griffin',
  'fort-mckavett',
  'washington-on-the-brazos',
  'presidio-la-bahia',
  'palo-alto-battlefield-national-historical-park',
];
for (const slug of expandedHistoricSlugs) {
  if (!authorityExpansion.includes(`"${slug}": {`)) failures.push(`Historical authority expansion missing ${slug}.`);
  if (!destinationRoute.includes(`"${slug}"`) && !fs.readFileSync('src/components/editorial/DestinationRelationships.tsx', 'utf8').includes(`"${slug}"`)) {
    failures.push(`Historic-site authority component not enabled for ${slug}.`);
  }
}
if ((authorityExpansion.match(/"authorityGuide": \{/g) ?? []).length !== 9) {
  failures.push('Expected nine new historic-site authority guides; Alamo reuses its existing Top-25 authority layer.');
}
if (!runtime.includes('enrichTexasHistoricSiteAuthority(enriched)') || !runtime.includes('.map(enrichTexasHistoricSiteAuthority)')) {
  failures.push('Historic-site authority enrichment is not connected to both destination resolution paths.');
}
if (!authorityExpansion.includes('sourceCheckedAt: "2026-10-12"')) {
  failures.push('Historic-site authority source review date missing.');
}
for (const marker of [
  'export const historicAuthorityCanonicalSlugs = Object.keys(historicAuthority);',
  'const detail = historicAuthority[sourceSlug];',
  'if (!detail) return destination;',
]) if (!authorityExpansion.includes(marker)) failures.push(`Live historic destination authority must not be blocked by a non-historic category: ${marker}`);
for (const liveSlug of ["goliad-state-park", "san-jacinto-battleground", "washington-on-the-brazos"]) {
  if (!expandedHistoricSlugs.includes(liveSlug) || !authorityExpansion.includes(`"${liveSlug}": {`)) failures.push(`Live historic route must retain its researched authority: ${liveSlug}`);
}



const historicTimeline = fs.readFileSync('src/data/historic-site-authority-timelines.ts', 'utf8');
const crosslinksText = fs.readFileSync('src/data/destination-editorial-links.ts', 'utf8');
const authorityLiteral = authorityExpansion.split(/const historicAuthority: Record<[^\n]+> = /)[1]?.split(/;\s*export const historicAuthoritySlugs/)[0];
const crosslinksLiteral = crosslinksText.split('const HISTORIC_SITE_CROSS_LINKS: Record<string, DestinationEditorialLink[]> = ')[1]?.split(';\n\nexport function destinationEditorialLinks')[0];
let authorityData = {}, crosslinksData = {};
try { authorityData = JSON.parse(authorityLiteral); } catch { failures.push('Historic site authority data failed JSON structural validation.'); }
try { crosslinksData = JSON.parse(crosslinksLiteral); } catch { failures.push('Historic site crosslink data failed JSON structural validation.'); }

for (const slug of expandedHistoricSlugs) {
  const content = authorityData[slug];
  if (!content || content.extraBody?.length < 2) failures.push(`Historic authority narrative is thin or missing: ${slug}.`);
  const guide = content?.authorityGuide;
  if (slug !== 'the-alamo') {
    if (!guide?.whyItMatters || guide.whyItMatters.length < 130) failures.push(`Historical significance missing depth: ${slug}.`);
    if (guide?.itineraries?.length !== 3 || guide.itineraries.some((x) => x.steps?.length < 3)) failures.push(`Historic guide needs 3 usable itineraries: ${slug}.`);
    if (guide?.sources?.length < 2 || guide.sources.some((x) => !/^https:\/\//.test(x.url))) failures.push(`Historic guide must cite operator source pages: ${slug}.`);
    if (!historicTimeline.includes(`"${slug}": [`) || (historicTimeline.split(`"${slug}": [`)[1]?.split('  ],')[0]?.match(/sourceUrl: /g) ?? []).length < 2) failures.push(`Historic guide requires source-linked chronology: ${slug}.`);
  }
  const outward = crosslinksData[slug] ?? [];
  if (outward.length < 2 || outward.some((x) => !x.href || !x.description || x.description.length < 35)) failures.push(`Site is missing meaningful outward editorial crosslinks: ${slug}.`);
  const primarySlug = slug;
  const inward = Object.entries(crosslinksData).filter(([origin, entries]) => origin !== slug && entries.some((x) => x.href === `/destination/${primarySlug}`));
  if (inward.length < 2) failures.push(`Site needs two or more curated inbound related-destination links: ${slug}.`);
}

const allLinkItems = Object.values(crosslinksData).flat();
for (const link of allLinkItems) {
  if (!/^\/(?:destination|article|county)\/[a-z0-9-]+$/.test(link.href)) failures.push(`Invalid editorial historic link route: ${link.href}.`);
}
if (!fs.readFileSync('src/components/editorial/DestinationAuthorityGuide.tsx', 'utf8').includes('historicSiteAuthorityTimeline(destination.slug)')) {
  failures.push('Historic authority chronological source panel is not connected.');
}
if (!crosslinksText.includes('combined.filter(') || !crosslinksText.includes('combined.findIndex(') || !crosslinksText.includes('href ===')) {
  failures.push('Historic links need href-based cross-list duplicate handling.');
}



// Legacy catalog coverage is not allowed to stop at the original 10-site expansion.
const fullAuthorityFile = fs.readFileSync('src/data/historic-site-authority-full-catalog.ts', 'utf8');
const currentVisitNotes = fs.readFileSync('src/data/historic-site-depth-all.ts', 'utf8');
for (const slug of ['old-socorro-mission', 'caddo-mounds-state-historic-site', 'fanthorp-inn', 'landmark-inn', 'fort-griffin', 'barrington-living-history-farm', 'fort-mckavett', 'fort-lancaster', 'mission-dolores', 'acton-state-historic-site', 'goodnight-ranch', 'french-legation', 'fannin-battleground', 'kreische-brewery', 'confederate-reunion-grounds']) {
  if (!currentVisitNotes.includes(`"${slug}": {`)) failures.push(`Missing site-specific current visitor/access guidance: ${slug}`);
}
if (!fullAuthorityFile.includes('oldSocorroHistoryItineraries') || !fullAuthorityFile.includes('closedSiteItineraries')) {
  failures.push('Closed First Capitol and Old Socorro must not receive ordinary public-access itineraries.');
}
for (const requiredUrl of [
  'https://thc.texas.gov/state-historic-sites/caddo-mounds/plan-your-visit-caddo-mounds',
  'https://thc.texas.gov/state-historic-sites/fanthorp-inn/plan-your-visit-fanthorp-inn',
  'https://thc.texas.gov/state-historic-sites/landmark-inn/overnight-accommodations-landmark-inn',
  'https://thc.texas.gov/state-historic-sites/fort-mckavett/plan-your-visit-fort-mckavett',
  'https://thc.texas.gov/state-historic-sites/fort-lancaster/plan-your-visit-fort-lancaster',
  'https://thc.texas.gov/state-historic-sites/mission-dolores/mission-dolores-history',
  'https://thc.texas.gov/historic-sites/barrington-living-history-farm',
  'https://thc.texas.gov/state-historic-sites/goodnight-ranch/plan-your-visit-goodnight-ranch',
  'https://thc.texas.gov/state-historic-sites/french-legation/plan-your-visit-french-legation',
  'https://thc.texas.gov/state-historic-sites/fannin-battleground/plan-your-visit-fannin-battleground',
  'https://thc.texas.gov/state-historic-sites/kreische-brewery/plan-your-visit-kreische-brewery',
  'https://thc.texas.gov/state-historic-sites/confederate-reunion-grounds/plan-your-visit-confederate-reunion-grounds',
]) if (!fullAuthorityFile.includes(requiredUrl)) failures.push(`Operator visitor evidence source missing: ${requiredUrl}`);

const fullCrosslinkFile = fs.readFileSync('src/data/historic-site-crosslinks-all.ts', 'utf8');
const relationshipsComponent = fs.readFileSync('src/components/editorial/DestinationRelationships.tsx', 'utf8');
const sourceRoute = fs.readFileSync('src/routes/destination.$slug.tsx', 'utf8');
if (!runtime.includes('enrichFullHistoricSiteAuthority(enrichTexasHistoricSiteAuthority(enriched))') ||
    !runtime.includes('.map(enrichFullHistoricSiteAuthority)')) failures.push('Full historic authority must apply in both resolution paths.');
if (!fullAuthorityFile.includes('historicSiteSeeds.map') || !fullAuthorityFile.includes('const seeds = new Map(historicSiteSeeds')) failures.push('All historic seeds must share the complete-catalog authority adapter.');
if (!relationshipsComponent.includes('destination.category === "historic-sites"')) failures.push('Historic authority template must render all eligible historic destination pages.');
if (!crosslinksText.includes('fullHistoricSiteCrosslinks(slug)') || !fullCrosslinkFile.includes('degrees.set(pair.left.slug')) failures.push('Statewide reciprocal county and thematic crosslink graph missing.');
for (const [duplicate, primary] of Object.entries({
  "goliad-state-park-and-historic-site": "goliad-state-park",
  "san-jacinto-battleground-state-historic-site": "san-jacinto-battleground",
  "washington-on-the-brazos-state-historic-site": "washington-on-the-brazos",
})) {
  if (!sourceRoute.includes(`"${duplicate}": "${primary}"`)) failures.push(`Missing safe 301 redirect from duplicate ${duplicate} to live destination ${primary}.`);
  if (sourceRoute.includes(`"${primary}": "`)) failures.push(`Live historic site incorrectly redirects away from ${primary}.`);
}
const destinationAvailability = fs.readFileSync('src/data/destination-availability.ts', 'utf8');
const nonPrimaryList = destinationAvailability.split('const NON_PRIMARY_TRIP_PLANNER_SLUGS = new Set([')[1]?.split(']);')[0] || '';
for (const primary of ['goliad-state-park', 'san-jacinto-battleground', 'washington-on-the-brazos']) {
  if (nonPrimaryList.includes(`"${primary}",`)) failures.push(`Published canonical historic destination excluded from search and sitemap: ${primary}`);
}


// A template introduction with repeated generic prose is not independent
// site-level research. Preserve the distinct seed facts and let editorial
// authority/depth overlays supply the additional narrative and visitor advice.
const seedBodyContract = seeds.match(/function historicBody\(site: HistoricSiteSeed\): string\[\] \{([\s\S]*?)\n\}/)?.[1] ?? "";
if (!seedBodyContract.includes("site.significance") || !seedBodyContract.includes("site.visitAngle")) {
  failures.push("Historic-site introduction must use place-specific significance and trip-planning facts.");
}
for (const forbidden of [
  "belongs on a Texas history itinerary because",
  "The value of the stop is not just the surviving building",
  "the threads are also the best way to connect this stop",
  "hours, tours, restoration work, special programs and access can change",
]) {
  if (seeds.includes(forbidden)) failures.push(`Remove interchangeable historic-site intro boilerplate: ${forbidden}`);
}
if (!visitDepth.includes("const SITE_DEPTH") || !runtime.includes("enrichResearchedHistoricSiteDepth")) {
  failures.push("Removing template filler requires retaining original researched site depth in the published resolver.");
}

if (fullCatalog.includes("The historic significance comes from the surviving place and the people whose stories it holds") ||
    !fullCatalog.includes("whyItMatters: [")) {
  failures.push("Historic authority-guide significance must use actual site facts, not an interchangeable filler sentence.");
}

// Closure notices must agree across the quick facts, experience assessment,
// family guidance and itineraries. A contradictory 'best season' is dangerous.
for (const marker of [
  'bestSeason: "Not currently open to visitors.',
  'bestSeason: "Closed archaeological site:',
]) if (!visitDepth.includes(marker)) failures.push(`Missing closed-site visitor-season policy: ${marker}`);
for (const marker of [
  '"physicalEffort": "Not applicable — site closed"',
  'familyFit: firstCapitolIsClosed',
  'firstTimeValue: firstCapitolIsClosed',
  'oldSocorroHistoryItineraries',
]) if (!fullCatalog.includes(marker)) failures.push(`Closed historic-site guide still implies public entry: ${marker}`);

const seedBlock = seeds.match(/export const historicSiteSeeds:[\s\S]*?= \[([\s\S]*?)\n\];/);
if (!seedBlock) failures.push('Could not parse historicSiteSeeds.');
const seedSlugs = seedBlock ? [...seedBlock[1].matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]) : [];
if (seedSlugs.length < 46) failures.push(`Expected at least 46 protected existing historic-site seeds; found ${seedSlugs.length}.`);
const legacyHistoricSeeds = new Set([
  'acton-state-historic-site',
  'barrington-living-history-farm',
  'bush-family-home',
  'caddo-mounds-state-historic-site',
  'casa-navarro',
  'confederate-reunion-grounds',
  'eisenhower-birthplace',
  'fannin-battleground',
  'fanthorp-inn',
  'first-capitol-of-texas',
  'fort-griffin',
  'fort-lancaster',
  'fort-martin-scott',
  'fort-mckavett',
  'french-legation',
  'fulton-mansion',
  'goodnight-ranch',
  'iwo-jima-museum-monument',
  'kreische-brewery',
  'landmark-inn',
  'levi-jordan-plantation',
  'lipantitlan',
  'magoffin-home',
  'mission-dolores',
  'monument-hill',
  'national-museum-pacific-war',
  'official-texas-longhorn-herd',
  'old-socorro-mission',
  'palmito-ranch-battlefield',
  'port-isabel-lighthouse',
  'presidio-la-bahia',
  'sabine-pass-battleground',
  'sam-bell-maxey-house',
  'sam-rayburn-house',
  'san-felipe-de-austin',
  'san-jacinto-battleground',
  'slaton-harvey-house',
  'star-of-the-republic-museum',
  'starr-family-home',
  'stephen-f-austin-memorial',
  'varner-hogg-plantation',
  'washington-on-the-brazos',
  'zaragoza-birthplace',
  'fort-sam-houston-national-cemetery',
  'houston-national-cemetery',
  'dallas-fort-worth-national-cemetery',
]);
for (const historicSlug of seedSlugs) {
  if (legacyHistoricSeeds.has(historicSlug)) continue;
  const guide = authorityData[historicSlug]?.authorityGuide;
  if (!guide || guide.sources?.length < 2 || guide.itineraries?.length !== 3) {
    failures.push(`New historic site ${historicSlug} needs operator sources and three usable itineraries before indexation.`);
  }
  if (!historicTimeline.includes(`"${historicSlug}": [`)) failures.push(`New historic site ${historicSlug} needs a cited timeline.`);
  const outward = crosslinksData[historicSlug] ?? [];
  const inbound = Object.entries(crosslinksData).filter(([origin, links]) => origin !== historicSlug && links.some((x) => x.href === `/destination/${historicSlug}`));
  if (outward.length < 2 || inbound.length < 2) failures.push(`New historic site ${historicSlug} needs bidirectional editorial links.`);
}

if (new Set(seedSlugs).size !== seedSlugs.length) failures.push('Historic-site seed slugs must be unique.');

const allDepthText = fs.readFileSync('src/data/historic-site-depth-all.ts', 'utf8');
const depthLiteral = allDepthText.split('const SITE_DEPTH: Record<string, string[]> = ')[1]?.split(/;\s*export const researchedHistoricSiteDepthSlugs/)[0];
let depthData = {};
try { depthData = JSON.parse(depthLiteral); } catch { failures.push('Statewide historic-site original research file is not valid structured data.'); }
for (const slug of seedSlugs) {
  const firstPass = authorityData[slug]?.extraBody;
  const statewide = depthData[slug];
  if (!firstPass && !statewide) failures.push(`No unique historic-site research enrichment for protected seed: ${slug}`);
  if (firstPass && statewide) failures.push(`Duplicate historic-site editorial layering for seed: ${slug}`);
  if (statewide && (statewide.length < 2 || statewide.some((paragraph) => paragraph.length < 120))) {
    failures.push(`Historic-site research needs two substantive original paragraphs: ${slug}`);
  }
}
const fullProfilesLiteral = fullAuthorityFile.split('const SITE_VISIT_PROFILES: Record<string, Pick<DestinationEditorialAssessment, "physicalEffort" | "weatherExposure" | "planningLevel" | "recommendedVisit">> = ')[1]?.split(/;\s*function authoritySources/)[0];
let fullProfiles = {};
try { fullProfiles = JSON.parse(fullProfilesLiteral); } catch { failures.push('Historic-site visitor profile map is not valid structured data.'); }
for (const slug of Object.keys(depthData)) {
  const visitor = fullProfiles[slug];
  if (!visitor || !visitor.recommendedVisit || !visitor.physicalEffort || !visitor.weatherExposure || !visitor.planningLevel) failures.push(`Individual visitor assessment missing: ${slug}.`);
}

const allResearched = Object.keys(depthData);
if (allResearched.length < 40) failures.push(`Statewide research rollout incomplete: ${allResearched.length}/40 additional researched historic sites.`);
if (!runtime.includes('.map(enrichResearchedHistoricSiteDepth)') ||
    !runtime.includes('enrichResearchedHistoricSiteDepth(enrichFullHistoricSiteAuthority')) {
  failures.push('All independently researched historic-site additions must be applied to both resolution paths.');
}
for (const existingSlug of ['goliad-state-park', 'san-jacinto-battleground', 'washington-on-the-brazos']) {
  if (!authorityExpansion.includes(`"${existingSlug}": {`)) failures.push(`Established public historic-site route is missing its authority content: ${existingSlug}`);
}


const primaryGuideBlock = primary.match(/const areaSeeds:[\s\S]*?= \{([\s\S]*?)\n\};\n\nfunction areaGuide/);
const extraGuideBlock = extra.match(/const guides:[\s\S]*?= \{([\s\S]*?)\n\};\n\nexport function/);
const nationalGuideBlock = nationalCemeteries.match(/const nationalCemeteryDetails:[\s\S]*?= \{([\s\S]*?)\n\};\n\nexport function/);
if (!primaryGuideBlock) failures.push('Could not parse primary historic-site area-guide map.');
if (!extraGuideBlock) failures.push('Could not parse supplemental historic-site area-guide map.');
if (!nationalGuideBlock) failures.push('Could not parse national-cemetery area-guide map.');
const primaryGuideSlugs = primaryGuideBlock ? [...primaryGuideBlock[1].matchAll(/^\s{2}"([^"]+)":\s*\{/gm)].map((match) => match[1]) : [];
const extraGuideSlugs = extraGuideBlock ? [...extraGuideBlock[1].matchAll(/^\s{2}"([^"]+)":\s*\{/gm)].map((match) => match[1]) : [];
const nationalGuideSlugs = nationalGuideBlock ? [...nationalGuideBlock[1].matchAll(/^\s{2}"([^"]+)":\s*\{/gm)].map((match) => match[1]) : [];
const guideSlugs = new Set([...primaryGuideSlugs, ...extraGuideSlugs, ...nationalGuideSlugs]);
for (const slug of seedSlugs) if (!guideSlugs.has(slug)) failures.push(`Historic site is missing destination-specific area-guide coverage: ${slug}.`);
for (const slug of guideSlugs) if (!seedSlugs.includes(slug)) failures.push(`Historic area-guide key does not match a statewide historic-site seed: ${slug}.`);

const protectedNationalCemeteries = [
  'fort-sam-houston-national-cemetery',
  'houston-national-cemetery',
  'dallas-fort-worth-national-cemetery',
];
for (const slug of protectedNationalCemeteries) {
  if (!seedSlugs.includes(slug)) failures.push(`Protected national cemetery is missing from statewide historic-site seeds: ${slug}.`);
  if (!nationalGuideSlugs.includes(slug)) failures.push(`Protected national cemetery is missing its dedicated visitor enrichment: ${slug}.`);
}
for (const marker of ['areaGuide:', 'sourceCheckedAt: "2026-08-29"', 'U.S. Department of Veterans Affairs — National Cemetery Administration']) {
  if (!nationalCemeteries.includes(marker)) failures.push(`National-cemetery enrichment contract missing: ${marker}`);
}

const clusterIds = [...clusters.matchAll(/\{ id: "([^"]+)"[\s\S]*?slugs: \[([^\]]+)\] \}/g)].map((match) => ({
  id: match[1],
  slugs: [...match[2].matchAll(/"([^"]+)"/g)].map((slugMatch) => slugMatch[1]),
}));
if (!clusterIds.length) failures.push('Could not parse historic-site thematic clusters.');
if (new Set(clusterIds.map((cluster) => cluster.id)).size !== clusterIds.length) failures.push('Historic-site thematic cluster ids must be unique.');
for (const cluster of clusterIds) {
  if (!cluster.slugs.length) failures.push(`Historic-site thematic cluster is empty: ${cluster.id}.`);
  if (new Set(cluster.slugs).size !== cluster.slugs.length) failures.push(`Historic-site thematic cluster repeats a destination: ${cluster.id}.`);
  for (const slug of cluster.slugs) if (!seedSlugs.includes(slug) && !expandedHistoricSlugs.includes(slug) && !["goliad-state-park-and-historic-site", "san-jacinto-battleground-state-historic-site", "washington-on-the-brazos-state-historic-site"].includes(slug)) failures.push(`Historic-site thematic cluster ${cluster.id} links an unregistered authority slug: ${slug}.`);
}

for (const marker of ['historicSiteDestinations', 'export const preservedExploreDestinations = mergePreservedDestinations(']) if (!preserved.includes(marker)) failures.push(`Preserved historic-site catalog contract missing: ${marker}`);
for (const marker of [
  'enrichHistoricSiteCatalog',
  'enrichHistoricSiteDestination',
  'enrichRemainingHistoricSiteAreaGuide',
  'enrichHistoricSiteRemoteHero',
  'enrichHistoricSiteEvergreenLinks',
  'applyHistoricSiteFactCorrections',
  'enrichNationalCemeteryDestination',
  'enrichHistoricSiteCatalog(curated)\n    .map(enrichRemainingHistoricSiteAreaGuide)\n    .map(enrichHistoricSiteRemoteHero)\n    .map(enrichHistoricSiteEvergreenLinks)',
  '.map(applyHistoricSiteFactCorrections)',
  '.map(enrichNationalCemeteryDestination)',
]) if (!runtime.includes(marker)) failures.push(`Historic-site runtime enrichment contract missing: ${marker}`);
for (const marker of ['destinationsQuery({ category: "historic-sites" })','historicSiteClusters','/explore/$category']) if (!history.includes(marker)) failures.push(`Texas History historic-site discovery contract missing: ${marker}`);
for (const marker of ["destinationsQuery({ category: 'historic-sites' })",'Historic places in this county','/explore/historic-sites','/texas-history']) if (!county.includes(marker)) failures.push(`County historic-site discovery contract missing: ${marker}`);

for (const marker of [
  'destination.slug === "lipantitlan"',
  'county: "Nueces"',
  'coordinates: { lat: 27.96445, lng: -97.81838 }',
]) if (!corrections.includes(marker)) failures.push(`Lipantitlan source-backed fact correction missing: ${marker}`);

// Factual subject identity and file-level reuse rights take precedence over
// superficial indexable-photo coverage. Both named subjects in La Grange must
// have different exact-site photographs, and the two unresolved places must
// not borrow generic/nearby photographs while awaiting licensing.
for (const mark of [
  'destination.slug === "kreische-brewery"',
  'Kreische%20Brewery%20Ruins%20Lower%20View.jpg',
  'destination.slug === "monument-hill"',
  'Monument%20hill%20monument.jpg',
  'Larry D. Moore · CC BY 4.0',
  'destination.slug === "old-socorro-mission"',
  'hero: missingDestinationHero(destination)',
]) if (!corrections.includes(mark)) failures.push(`Named historic image rights/identity correction missing: ${mark}`);
if (remoteHeroes.includes('"old-socorro-mission": {')) failures.push("Closed original Socorro archaeological site still borrows an image of the operating mission church.");
for (const slug of ['first-capitol-of-texas', 'old-socorro-mission']) if (!visitorPolicy.includes('"'+slug+'"')) failures.push("THC-closed original site erroneously recommended in Trip Planner: "+slug);
// Check exact curated historical-reference allowlists, not the position of a specific
// member: new, explicitly reviewed sites may be added after First Capitol.
const historicalRouteList = destinationRoute.split('const isHistoricalMuseumReference = [')[1]?.split('].includes(destination.slug)')[0] ?? "";
const historicalSitemapSource = fs.readFileSync('src/routes/sitemap-explore[.]xml.ts', 'utf8');
const historicalSitemapList = historicalSitemapSource.split('isPrimaryTripPlannerDestination(destination) || [')[1]?.split('].includes(destination.slug)')[0] ?? "";
for (const [slug, label] of [
  ["first-capitol-of-texas", "First Capitol"],
  ["battleship-texas", "Battleship Texas"],
]) {
  if (!historicalRouteList.includes('"' + slug + '"')) failures.push("Indexed, researched " + label + " historical reference exception was lost after trip-planner closure.");
  if (!historicalSitemapList.includes('"' + slug + '"')) failures.push(label + " historical reference is indexable in HTML but missing from Explore sitemap exception list.");
}

const exploreSitemapSource = fs.readFileSync('src/routes/sitemap-explore[.]xml.ts', 'utf8');
if (!exploreSitemapSource.includes(').map(applyHistoricSiteFactCorrections)') || !exploreSitemapSource.includes('import("@/data/historic-site-fact-corrections")')) failures.push("Explore sitemap does not apply resolved historic-site photo and closure corrections before indexability gating.");
if (!destinationRoute.includes('isPrimaryTripPlannerDestination(destination) && <div className="mt-10"><DestinationVisitPlanner')) failures.push("Destination visit planner still promotes inaccessible historic sites as ordinary visitor stops.");
if (!fullAuthorityFile.includes('File:Kreische_Brewery_Ruins_Lower_View.jpg') || !fullAuthorityFile.includes('File:Monument_hill_monument.jpg')) failures.push("Original licensed file-level photo attribution links missing from public historic authority guide sources.");

const exactHeroAliases = ['barrington-living-history-farm','fanthorp-inn','kreische-brewery','monument-hill','san-jacinto-battleground','washington-on-the-brazos'];
for (const slug of exactHeroAliases) {
  if (!seedSlugs.includes(slug)) failures.push(`Exact historic hero alias does not match a statewide seed: ${slug}.`);
  if (!primary.includes(`"${slug}"`)) failures.push(`Expected exact historic hero alias is missing: ${slug}.`);
}

const verifiedRemoteHeroes = [
  ['acton-state-historic-site', 'CC BY-SA 2.0'],
  ['bush-family-home', 'CC BY-SA 3.0'],
  ['caddo-mounds-state-historic-site', 'CC BY-SA 3.0'],
  ['casa-navarro', 'CC BY-SA 3.0'],
  ['confederate-reunion-grounds', 'CC BY-SA 3.0'],
  ['eisenhower-birthplace', 'CC BY 2.0'],
  ['fannin-battleground', 'Public domain'],
  ['first-capitol-of-texas', 'no known copyright restrictions'],
  ['fort-griffin', 'CC BY-SA 3.0'],
  ['fort-lancaster', 'Public domain'],
  ['fort-martin-scott', 'CC BY 4.0'],
  ['fort-mckavett', 'CC0'],
  ['french-legation', 'CC BY 4.0'],
  ['fulton-mansion', 'CC BY 4.0'],
  ['goodnight-ranch', 'CC BY-SA 4.0'],
  ['iwo-jima-museum-monument', 'CC BY-SA 4.0'],
  ['landmark-inn', 'CC BY 4.0'],
  ['levi-jordan-plantation', 'CC BY 4.0'],
  ['magoffin-home', 'CC BY 4.0'],
  ['mission-dolores', 'CC BY-SA 4.0'],
  ['national-museum-pacific-war', 'CC BY-SA 4.0'],
  ['official-texas-longhorn-herd', 'Public domain'],
  ['palmito-ranch-battlefield', 'CC BY-SA 3.0'],
  ['port-isabel-lighthouse', 'CC BY-SA 4.0'],
  ['presidio-la-bahia', 'CC BY-SA 4.0'],
  ['sabine-pass-battleground', 'CC BY-SA 3.0'],
  ['sam-bell-maxey-house', 'CC BY-SA 3.0'],
  ['sam-rayburn-house', 'CC BY 2.0'],
  ['san-felipe-de-austin', 'CC BY 4.0'],
  ['slaton-harvey-house', 'CC0'],
  ['star-of-the-republic-museum', 'CC BY-SA 4.0'],
  ['starr-family-home', 'CC BY 2.0'],
  ['stephen-f-austin-memorial', 'CC0'],
  ['varner-hogg-plantation', 'CC BY 2.0'],
  ['zaragoza-birthplace', 'CC BY-SA 2.0'],
];

const remoteHeroBlock = remoteHeroes.match(/export const historicSiteRemoteHeroes:[\s\S]*?= \{([\s\S]*?)\n\};\n\nexport function/);
if (!remoteHeroBlock) failures.push('Could not parse verified historic remote-hero map.');
const remoteHeroSlugs = remoteHeroBlock ? [...remoteHeroBlock[1].matchAll(/^\s{2}"([^"]+)":\s*\{/gm)].map((match) => match[1]) : [];
if (new Set(remoteHeroSlugs).size !== remoteHeroSlugs.length) failures.push('Verified historic remote-hero slugs must be unique.');
for (const slug of remoteHeroSlugs) if (!seedSlugs.includes(slug)) failures.push(`Verified historic remote hero does not match a statewide historic-site seed: ${slug}.`);
if (remoteHeroSlugs.length !== verifiedRemoteHeroes.length) failures.push(`Historic remote-hero registry/validator count mismatch: registry ${remoteHeroSlugs.length}, validator ${verifiedRemoteHeroes.length}.`);
for (const slug of exactHeroAliases) if (remoteHeroSlugs.includes(slug)) failures.push(`Historic site has competing exact hero alias and remote hero mappings: ${slug}.`);

for (const [slug, license] of verifiedRemoteHeroes) {
  if (!seedSlugs.includes(slug)) failures.push(`Protected historic remote hero does not match a statewide seed: ${slug}.`);
  if (!remoteHeroSlugs.includes(slug)) failures.push(`Verified historic remote hero is missing: ${slug}.`);
  if (!remoteHeroes.includes(license)) failures.push(`Verified historic remote hero license marker is missing: ${slug} (${license}).`);
}
if (!remoteHeroes.includes('enrichHistoricSiteRemoteHero')) failures.push('Verified historic remote heroes are not exposed through the runtime enrichment function.');

const maybornDataMarkers = [
  'slug: "mayborn-museum-waco"',
  'sourceCheckedAt: "2026-10-05"',
  'Museums for All',
  'Hall of Natural History',
  'Jeanes Discovery Center',
  'Cultural Crossroads',
  'SpaceX and hands-on science',
  'https://mayborn.web.baylor.edu/visit',
];
for (const marker of maybornDataMarkers) if (!maybornData.includes(marker)) failures.push(`Mayborn destination data contract missing: ${marker}`);

const maybornAuthorityMarkers = [
  'Play Waco',
  'Simple Machines',
  'SpaceX',
  'Backyard Ecology',
  'Cretaceous Sea',
  'Attack of the Bloodsuckers!',
  'Monday Storytime',
  'Village Wednesday',
  'Fossil Friday',
  'Accessibility & sensory planning',
  'Museums for All',
  'https://mayborn.web.baylor.edu/visit/accessibility',
  'https://mayborn.web.baylor.edu/visit/discounts',
  'https://mayborn.web.baylor.edu/events',
  'Verified October 5, 2026',
];
for (const marker of maybornAuthorityMarkers) if (!maybornAuthority.includes(marker)) failures.push(`Mayborn authority-page contract missing: ${marker}`);

for (const marker of [
  'const MaybornMuseumAuthority = lazy(() =>',
  'destination.slug === "mayborn-museum-waco"',
  'Mayborn Museum Waco: Hours, Tickets & Exhibits',
]) if (!destinationRoute.includes(marker)) failures.push(`Mayborn dedicated destination-route contract missing: ${marker}`);

for (const marker of [
  'maybornAuthorityUrl',
  'Mayborn Museum in Waco',
  'Attack of the Bloodsuckers!',
  'Tours and experiences near Mayborn Museum',
  'Mayborn Museum | Texas Historic Site Guide',
  'Mayborn authority verification passed after targeted purge',
]) if (!cachePurge.includes(marker)) failures.push(`Mayborn production cache-verification contract missing: ${marker}`);

// Fort McKavett must keep individually verified visitor access, history and
// file-level hero provenance after generic historic-site catalog updates.
const fortDepth = visitDepth.split('  "fort-mckavett": {')[1]?.split('  "fort-lancaster": {')[0] || '';
const fortAuthority = authorityExpansion.split('  "fort-mckavett": {')[1]?.split('  "washington-on-the-brazos": {')[0] || '';
const fortTimeline = fs.readFileSync('src/data/historic-site-authority-timelines.ts', 'utf8');
const fortImageProvenance = fs.readFileSync('docs/historic-sites/IMAGE_PROVENANCE.md', 'utf8');
for (const [area, input, markers] of [
  ['visitor depth', fortDepth, ['8 a.m.–5 p.m.', '8 a.m.–4 p.m.', 'family admission $8', '$5 golf-cart']],
  ['resolved destination details', visitDepth, ['7066 FM 864', 'sourceCheckedAt: destination.slug === "fort-mckavett" ? "2026-10-17"']],
  ['historical interpretation', fortAuthority, ['Sgt. Emanuel Stance', 'laundresses', '1973', 'fort-mckavett-history']],
  ['historical timeline', fortTimeline, ['1859–April 1862', '1968–1973', 'fort-mckavett-history']],
  ['image provenance', fortImageProvenance, ['## 7. Fort McKavett', 'SimpleeRandom', 'CC0 1.0', 'File:Fort_McKavett,_Texas.jpg']],
]) {
  for (const marker of markers) if (!input.includes(marker)) failures.push(`Fort McKavett ${area} missing ${marker}`);
}

if (failures.length) { console.error('Historic-sites validation failed:'); for (const failure of failures) console.error(`- ${failure}`); process.exit(1); }
console.log(`Historic-sites validation passed: ${seedSlugs.length} statewide seeds, ${guideSlugs.size} destination-specific area guides, ${clusterIds.length} thematic clusters with valid seed links, ${exactHeroAliases.length + verifiedRemoteHeroes.length} exact verified hero mappings plus ${protectedNationalCemeteries.length} dedicated national-cemetery heroes, every protected hero matches a real seed, Lipantitlan geography is source-corrected, shared preserved-catalog publication, runtime enrichment, Texas History discovery and county cross-links are protected across eager and lazy route surfaces, and the Mayborn Museum dedicated authority route/data/current visitor guidance/post-purge regression contract is protected.`);
