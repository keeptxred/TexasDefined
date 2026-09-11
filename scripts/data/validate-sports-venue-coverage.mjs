import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFile(path.join(root, file), 'utf8');

const [
  major,
  tier2,
  seed,
  directory,
  guide,
  galaxyGuide,
  quickAnswers,
  enrichmentAll,
  editorialDescriptions,
  remediationInitial,
  remediationWave2,
  remediationWave3,
  remediationWave4,
  remediationWave5,
  gscTriage,
  currentCorrections,
  partnerRouteEager,
  partnerRouteLazy,
  partnerFunctions,
  partnerServer,
  partnerMigration,
] = await Promise.all([
  read('src/data/knowledge-graph/major-sports-venues.ts'),
  read('src/data/knowledge-graph/sports-venues-tier2.ts'),
  read('src/data/knowledge-graph/seed.ts'),
  read('src/routes/sports-venues.tsx'),
  read('src/routes/sports-venue.$slug.tsx'),
  read('src/routes/sports-venue.jones-att-stadium.tsx'),
  read('src/components/sports/SportsVenueQuickAnswers.tsx'),
  read('src/data/sports-venue-enrichment-all.ts'),
  read('src/data/sports-venue-editorial.server.ts'),
  read('src/data/sports-venue-content-remediation.ts'),
  read('src/data/sports-venue-content-remediation-wave2.ts'),
  read('src/data/sports-venue-content-remediation-wave3.ts'),
  read('src/data/sports-venue-content-remediation-wave4.ts'),
  read('src/data/sports-venue-content-remediation-wave5.ts'),
  read('ops/seo/gsc-discovered-2026-09-05-urls.tsv'),
  read('src/data/knowledge-graph/current-entity-corrections.ts'),
  read('src/routes/partner-with-us.tsx'),
  read('src/routes/partner-with-us.lazy.tsx'),
  read('src/data/partner-inquiry.functions.ts'),
  read('src/data/partner-inquiry.server.ts'),
  read('supabase/migrations/20260814034617_allow_sports_travel_partner_inquiries.sql'),
]);

const partnerRoute = `${partnerRouteEager}\n${partnerRouteLazy}`;
const errors = [];
const assert = (condition, message) => { if (!condition) errors.push(message); };
const countSeedRows = (source) => [...source.matchAll(/^\s{2}\[(?:'|")/gm)].length;

const majorCount = countSeedRows(major);
const tier2Count = countSeedRows(tier2);
const inventory = `${major}\n${tier2}`;

assert(majorCount >= 50, `Expected at least 50 major sports venue seeds; found ${majorCount}.`);
assert(tier2Count === 29, `Expected 29 second-tier sports-tourism seeds; found ${tier2Count}.`);
assert(seed.includes("import { MAJOR_TEXAS_SPORTS_VENUES } from './major-sports-venues';"), 'Major sports venues are not imported into the knowledge graph seed.');
assert(seed.includes("import { TEXAS_SPORTS_VENUE_TIER2_ENTITIES } from './sports-venues-tier2';"), 'Second-tier sports venues are not imported into the knowledge graph seed.');
assert(seed.includes('...MAJOR_TEXAS_SPORTS_VENUES'), 'Major sports venues are not spread into the curated knowledge graph.');
assert(seed.includes('...TEXAS_SPORTS_VENUE_TIER2_ENTITIES'), 'Second-tier sports venues are not spread into the curated knowledge graph.');
assert(seed.includes("slug:'reliant-stadium'"), 'Core Reliant Stadium record is missing from the curated knowledge graph.');

const anchors = [
  ['professional sports', 'att-stadium'],
  ['major-league baseball', 'globe-life-field'],
  ['minor-league baseball', 'riders-field'],
  ['motorsports', 'circuit-of-the-americas'],
  ['stock-car racing', 'texas-motor-speedway'],
  ['drag racing', 'texas-motorplex'],
  ['regional drag racing', 'xtreme-raceway-park'],
  ['college football', 'kyle-field'],
  ['championship golf', 'pga-frisco-fields-ranch'],
  ['high-school football', 'eagle-stadium-allen'],
  ['college baseball', 'ufcu-disch-falk-field'],
  ['Western sports', 'will-rogers-memorial-center'],
  ['shooting sports', 'national-shooting-complex'],
  ['action sports', 'waco-surf'],
  ['aquatics', 'jamail-texas-swimming-center'],
  ['tournament complex', 'round-rock-multipurpose-complex'],
];
for (const [category, slug] of anchors) {
  assert(inventory.includes(`'${slug}'`), `Missing representative ${category} destination: ${slug}.`);
}

for (const marker of [
  "key: 'professional'",
  "key: 'college'",
  "key: 'high-school'",
  "key: 'motorsports'",
  "key: 'golf'",
  "key: 'western'",
  "key: 'regional'",
  "entitiesByKind('sports-venue')",
  'Every curated venue guide includes verified trip details',
  'Verified trip details',
  'Business partnerships',
  'type=sports-travel&source=%2Fsports-venues',
  'Paid relationships do not change editorial rankings or factual recommendations',
  'applyCurrentEntityCorrections',
]) {
  assert(directory.includes(marker), `Sports venue directory is missing category, static-inventory, visitor-detail, partnership, or attribution marker ${marker}.`);
}
assert(!directory.includes('getSportsVenueEnrichmentAll'), 'Sports venue directory must not load the full enrichment payload merely to render badges or sorting.');
assert(!directory.includes('loadTexasKnowledgeGraph'), 'Sports venue directory must use the governed static sports inventory rather than the remote-capable graph loader.');

for (const marker of [
  "createFileRoute('/sports-venue/$slug')",
  "'@type': 'SportsActivityLocation'",
  'sportsVenueSearchTitle',
  'sportsVenueSearchDescription',
  'mainEntityOfPage: canonicalUrl',
  'image: venueHeroUrl',
  'Event-day essentials',
  '{entity.name} parking, arrival and event planning',
  'parking={enrichment?.parking}',
  'arrival={enrichment?.arrival}',
  'Parking at ${entity.name}',
  'When to arrive',
  'Main sports and events',
  'Capacity and configuration',
  'Venue context',
  'Build the rest of the {entity.name} trip',
  'Official planning links',
  'sportsVenueMapUrl',
  'getSportsVenueEnrichmentAll',
  'visitorKindPriority',
  'countyVisitorPlaces',
  'candidate.countySlug === venue.countySlug',
  'isIndexableEntityPage(candidate)',
  'Visitor places to pair with the event',
  'Same-county does not necessarily mean walkable or immediately adjacent',
  'this list is not a sponsored placement',
  'Local business partnerships',
  'type=sports-travel&source=${encodeURIComponent(canonicalPath)}',
  'Paid relationships do not change editorial rankings, factual conclusions or which venues we cover',
  '/sports-venues',
]) {
  assert(guide.includes(marker), `Dedicated sports venue guide is missing required search-intent, visitor, partnership, attribution, or county-trip marker: ${marker}.`);
}
for (const marker of [
  'Plan the trip',
  'Make the venue part of the weekend',
  'Why people travel',
  'Best trip pattern',
  'Before you go',
  'profile.whyTravel',
  'profile.tripPattern',
  'profile.beforeYouGo',
]) {
  assert(!guide.includes(marker), `Dedicated sports venue guide must not regress to generic trip-template filler: ${marker}.`);
}
assert(!guide.includes('`${entity.name}: Texas Sports Venue & Visitor Guide`'), 'Sports venue search titles must not regress to the long generic boilerplate title.');
assert(!guide.includes('const nearbyPlaces = related.filter'), 'Sports venue guide must not describe generic related entities as nearby when the seed lacks reliable distance data.');

for (const marker of [
  'parking?: string;',
  'arrival?: string;',
  'What should I know about parking at ${venueName}?',
  'When should I arrive at ${venueName}?',
  'firstSentence(parking)',
  'firstSentence(arrival)',
  'answers.slice(0, 5)',
]) {
  assert(quickAnswers.includes(marker), `Sports venue quick-answer layer is missing venue-specific parking/arrival quality marker: ${marker}.`);
}
const faqBuilderMatch = quickAnswers.match(/function buildAnswers[\s\S]*?function firstSentence/);
assert(Boolean(faqBuilderMatch), 'Sports venue quick answers must retain an inspectable buildAnswers FAQ builder.');
const faqBuilder = faqBuilderMatch?.[0] ?? '';
assert(!faqBuilder.includes('verifiedAt'), 'Sports venue quick answers must keep source-review metadata out of consumer FAQ copy.');
assert(!faqBuilder.includes('How current is this ${venueName} visitor guide?'), 'Sports venue quick answers must keep source-review metadata out of consumer FAQ copy.');
assert(!faqBuilder.includes('formatDate(verifiedAt)'), 'Sports venue quick answers must not transform verification metadata into a consumer FAQ answer.');

for (const getter of [
  'getSportsVenueContentRemediation(lookupSlug)',
  'getSportsVenueContentRemediationWave2(lookupSlug)',
  'getSportsVenueContentRemediationWave3(lookupSlug)',
  'getSportsVenueContentRemediationWave4(lookupSlug)',
  'getSportsVenueContentRemediationWave5(lookupSlug)',
  'getSportsVenueEnrichment(lookupSlug)',
  'getSportsVenueEnrichmentBatch2(lookupSlug)',
  'getSportsVenueEnrichmentBatch3(lookupSlug)',
  'getSportsVenueEnrichmentBatch4Racing(lookupSlug)',
  'getSportsVenueEnrichmentBatch5(lookupSlug)',
  'getSportsVenueEnrichmentBatch6(lookupSlug)',
  'getSportsVenueEnrichmentBatch7MajorCompletion(lookupSlug)',
  'getSportsVenueEnrichmentBatch8ACompletion(lookupSlug)',
  'getSportsVenueEnrichmentBatch8BCompletion(lookupSlug)',
]) {
  assert(enrichmentAll.includes(getter), `Combined sports venue enrichment lookup is missing ${getter}.`);
}

const gscSportsImproveSlugs = [...gscTriage.matchAll(/^IMPROVE\t\/sports-venue\/([a-z0-9-]+)$/gm)].map((match) => match[1]);
assert(gscSportsImproveSlugs.length === 17, `Expected 17 sports-venue IMPROVE targets in the 2026-09-05 GSC triage; found ${gscSportsImproveSlugs.length}.`);
assert(new Set(gscSportsImproveSlugs).size === gscSportsImproveSlugs.length, 'GSC sports-venue IMPROVE targets must be unique.');
const phase1dRemediationSources = `${remediationInitial}\n${remediationWave2}\n${remediationWave3}\n${remediationWave4}\n${remediationWave5}`;
for (const slug of gscSportsImproveSlugs) {
  assert(phase1dRemediationSources.includes(`'${slug}': {`), `GSC sports IMPROVE target ${slug} is missing a Phase 1D remediation profile.`);
}

const wave5Slugs = [
  'cotton-bowl-stadium',
  'choctaw-stadium',
  'ford-center-at-the-star',
  'datcu-stadium',
  'riders-field',
  'lone-star-park',
  'tdecu-stadium',
  'fertitta-center',
  'heb-center-at-cedar-park',
  'alamodome',
];
for (const slug of wave5Slugs) {
  const occurrences = [...remediationWave5.matchAll(new RegExp(`'${slug}': \\{`, 'g'))].length;
  assert(occurrences >= 2, `Phase 1D wave 5 must keep both quality and runtime remediation records for ${slug}.`);
  assert(editorialDescriptions.includes(`'sports-venue:${slug}':`), `Phase 1D wave 5 venue ${slug} is missing its explicit server editorial description.`);
}

const editorialWave6Slugs = [
  'reliant-stadium',
  'comerica-center',
  'moody-coliseum-smu',
  'unt-coliseum',
  'rice-stadium',
  'constellation-field',
];
for (const slug of editorialWave6Slugs) {
  assert(editorialDescriptions.includes(`'sports-venue:${slug}':`), `Editorial wave 6 venue ${slug} is missing its explicit server editorial description.`);
}

const editorialWave7Slugs = [
  'nelson-wolff-stadium',
  'momentum-bank-ballpark',
  'bowers-stadium',
  'lupton-stadium',
  'reckling-park',
  'xtreme-raceway-park',
  'jamail-texas-swimming-center',
];
for (const slug of editorialWave7Slugs) {
  assert(editorialDescriptions.includes(`'sports-venue:${slug}':`), `Editorial wave 7 venue ${slug} is missing its explicit server editorial description.`);
}
const editorialDescriptionCount = [...editorialDescriptions.matchAll(/^\s{2}'sports-venue:[^']+':/gm)].length;
assert(editorialDescriptionCount >= 54, `Expected at least 54 explicit sports-venue editorial descriptions after editorial wave 7; found ${editorialDescriptionCount}.`);

for (const [sourceName, source] of [
  ['partner page', partnerRoute],
  ['partner server function', partnerFunctions],
  ['partner storage type', partnerServer],
  ['partner database migration', partnerMigration],
]) {
  assert(source.includes('sports-travel'), `Sports-travel partnership type is missing from ${sourceName}.`);
}
for (const marker of [
  'validateSearch:',
  'sanitizePartnerSource',
  "value === '/sports-venues'",
  '/^\\/sports-venue\\/[a-z0-9-]+$/',
  'Route.useSearch()',
  'sourcePath: search.sourcePath',
  "search.partnershipType === 'sports-travel'",
  "defaultValue={search.partnershipType ?? 'other'}",
]) {
  assert(partnerRoute.includes(marker), `Partner page is missing safe sports lead-attribution marker: ${marker}.`);
}
assert(partnerFunctions.includes("regex(/^\\/(?:partner-with-us|sports-venues|sports-venue\\/[a-z0-9-]+)$/)"), 'Partner server function must independently restrict source attribution to supported internal paths.');
assert(partnerRoute.includes('Sports travel / local visitor business'), 'Partner form must expose a human-readable sports-travel option.');
assert(partnerRoute.includes('Paid relationships do not buy editorial coverage, favorable rankings or changes to factual conclusions.'), 'Partner page must preserve the editorial-independence disclosure.');
assert(partnerMigration.includes('texasdefined_partner_inquiries_partnership_type_check'), 'Sports-travel database migration must update the partner inquiry type constraint.');

assert(currentCorrections.includes("name: 'Galaxy Stadium'"), 'Current venue corrections must rename the Texas Tech football venue to Galaxy Stadium.');
assert(currentCorrections.includes("'Jones AT&T Stadium'"), 'Galaxy Stadium correction must preserve the former venue name as an alias.');
assert(currentCorrections.includes("'Galaxy Stadium'"), 'Galaxy Stadium correction must preserve the current venue name as a searchable alias.');
assert(!currentCorrections.includes("slug: 'galaxy-stadium'"), 'Galaxy Stadium correction must keep the established route stable until a repository-wide redirect migration is implemented.');
assert(galaxyGuide.includes("createFileRoute('/sports-venue/jones-att-stadium')"), 'Galaxy Stadium must have a static route override at the established Texas Tech venue URL.');
assert(galaxyGuide.includes("venueName = 'Galaxy Stadium'"), 'Galaxy Stadium static route must display the current venue name.');
assert(galaxyGuide.includes('Former name'), 'Galaxy Stadium guide must explain its former venue name.');
assert(galaxyGuide.includes("title: 'Galaxy Stadium | Lubbock, TX'"), 'Galaxy Stadium must use the concise localized sports-venue title pattern.');
assert(galaxyGuide.includes('parking={enrichment?.parking}'), 'Galaxy Stadium quick answers must receive verified parking context.');
assert(galaxyGuide.includes('arrival={enrichment?.arrival}'), 'Galaxy Stadium quick answers must receive verified arrival context.');
assert(galaxyGuide.includes('mainEntityOfPage: canonicalUrl'), 'Galaxy Stadium structured data must identify its canonical main entity page.');

assert(tier2.includes("sourceConfidence: 'official'"), 'Second-tier venue seeds must remain official-source records.');
assert(tier2.includes("sourceCheckedAt: checkedAt"), 'Second-tier venue seeds must retain source review dates.');
assert(tier2.includes("status: 'active'"), 'Second-tier venue seeds must remain explicitly active.');
assert(tier2.includes("sourceId: 'official-destination-sites'"), 'Second-tier venue seeds must use the governed official destination source id.');

if (errors.length) {
  console.error('Sports venue coverage validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Sports venue coverage contracts validated: ${majorCount} major seeds + ${tier2Count} second-tier rows, all ${gscSportsImproveSlugs.length} GSC sports IMPROVE targets have Phase 1D remediation profiles, ${wave5Slugs.length} additional major-draw venues retain wave 5 quality/runtime/editorial coverage, ${editorialWave6Slugs.length} editorial wave 6 venues and ${editorialWave7Slugs.length} editorial wave 7 venues are protected, ${editorialDescriptionCount} explicit venue descriptions are protected, core Reliant record, lightweight static directory, statewide category anchors, concise localized search titles, source-backed event-day essentials and FAQ answers with source-review metadata kept separate, richer venue structured data, venue-specific visitor planning without generic trip-template filler, county-level editorial trip ideas, venue-level sports-travel partnership funnel with safe source attribution, current-name correction and all enrichment/remediation batches are wired. Exact seeded-to-deep-profile completeness is enforced separately.`);
