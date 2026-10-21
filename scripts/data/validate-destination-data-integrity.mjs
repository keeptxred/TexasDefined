import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const root = process.cwd();
const destinationRoute = fs.readFileSync(path.join(root, 'src/routes/destination.$slug.tsx'), 'utf8');
const destinationPlanner = fs.readFileSync(path.join(root, 'src/components/editorial/DestinationVisitPlanner.tsx'), 'utf8');
const authoritySections = fs.readFileSync(path.join(root, 'src/components/editorial/DestinationAuthoritySections.tsx'), 'utf8');
const authorityRelationships = fs.readFileSync(path.join(root, 'src/components/editorial/DestinationRelationships.tsx'), 'utf8');
const authorityPresentation = fs.readFileSync(path.join(root, 'src/data/destination-authority-presentation.ts'), 'utf8');
const destinationViator = fs.readFileSync(path.join(root, 'src/components/editorial/DestinationViatorBooking.tsx'), 'utf8');
const destinationCurationBatch20 = fs.readFileSync(path.join(root, 'src/data/destination-curation-batch20.ts'), 'utf8');
const destinationAudit = fs.readFileSync(path.join(root, 'src/data/destination-audit.ts'), 'utf8');
const destinationQuality = fs.readFileSync(path.join(root, 'src/data/destination-quality.ts'), 'utf8');
const queries = fs.readFileSync(path.join(root, 'src/data/queries.ts'), 'utf8');
const destinationRuntime = fs.readFileSync(path.join(root, 'src/data/destination-query-runtime.ts'), 'utf8');
const queryImplementation = `${queries}\n${destinationRuntime}`;
const articleRoute = fs.readFileSync(path.join(root, 'src/routes/article.$slug.tsx'), 'utf8');
const map = fs.readFileSync(path.join(root, 'src/components/editorial/MapPreview.tsx'), 'utf8');
const remote = fs.readFileSync(path.join(root, 'src/data/explore-remote.ts'), 'utf8');
// Destination layout regressions belong in this existing integrity gate so spacing fixes cannot silently drift.

 // Rendering a complete authority guide twice repeats the same research,
 // itineraries and sources, and makes real visitor answers harder to find.
 // Both existing and future destinations must share one routing decision.
 for (const [name, source, required] of [
   ['full-guide policy', authorityPresentation, [
     'export function shouldRenderFullDestinationAuthorityGuide(destination: Destination)',
     'AUTHORITY_GUIDE_DESTINATION_SLUGS.has(destination.slug)',
     'topTexasAttractionRank(destination.slug)',
     'destination.slug === "chamizal-national-memorial"',
     'destination.slug === "moody-gardens"',
   ]],
   ['relationship full-guide slot', authorityRelationships, [
     'const hasExtendedAuthorityGuide = shouldRenderFullDestinationAuthorityGuide(destination)',
     '<DestinationAuthorityGuide destination={destination}',
   ]],
   ['inline guide sections', authoritySections, [
     'const hasSeparateAuthorityGuide = shouldRenderFullDestinationAuthorityGuide(destination)',
     '{guide && !hasSeparateAuthorityGuide && <section aria-labelledby="destination-authority-assessment"',
     '{guide && !hasSeparateAuthorityGuide && destination.slug !== "chamizal-national-memorial"',
     'destination.visitorFaqs.map(',
     'Photograph attribution',
   ]],
 ]) {
   for (const marker of required) {
     if (!source.includes(marker)) errors.push('Duplicate-guide prevention missing from ' + name + ': ' + marker);
   }
 }


const errors = [];

for (const feature of [
  'function hasValidCoordinates',
  '...(validGeo',
  'DestinationVisitPlanner',
  'relatedPlaces.length > 0',
  'categoriesQuery()',
  '"@type": "WebPage"',
  'mainEntity: { "@id": `${url}#attraction` }',
  'mainEntityOfPage: { "@id": url }',
  'breadcrumb: { "@id": `${url}#breadcrumbs` }',
  '"@id": `${url}#primaryimage`',
  'categories.find((category) => category.slug === destination.category)?.name',
  'const audit = auditDestination(destination)',
  'const indexable = audit.readyForIndexing && (isPrimaryTripPlannerDestination(destination) || isHistoricalMuseumReference)',
  'const isHistoricalMuseumReference = ',
  'robots: indexable ? undefined : "noindex, follow"',
]) {
  if (!destinationRoute.includes(feature)) errors.push(`Destination integrity feature missing: ${feature}.`);
}

if (destinationRoute.includes('...(!indexable ? [{ name: "robots", content: "noindex, follow" }] : [])')) {
  errors.push('Destination metadata must not emit conflicting default-index and appended-noindex robots directives.');
}

for (const stale of [
  'min-h-[64vh]',
  'belongs on our {categoryName.toLowerCase()} list',
  'eyebrow="Planning your visit"',
]) {
  if (destinationRoute.includes(stale)) errors.push(`Destination layout/copy regression detected: ${stale}.`);
}
for (const required of [
  'function countyDisplayName(value: string)',
  'function countyRouteSlug(value?: string)',
  'eyebrow="Quick trip facts"',
  '<DestinationVerifiedVisitorFacts destination={destination} />',
  'minHeight: "clamp(24rem, 52vw, 32rem)"',
]) {
  if (!destinationRoute.includes(required)) errors.push(`Destination compact-layout safeguard missing: ${required}.`);
}
if (destinationPlanner.includes('data-stay-nearby-slot\n        className=')) {
  errors.push('Empty Stay Nearby placeholders must not reserve vertical margin before content is injected.');
}
if (destinationViator.includes('"Browse current Texas experiences"')) {
  errors.push('Destination pages must not fall back to irrelevant statewide Viator inventory.');
}
for (const required of [
  'if (!hasDedicatedInventory) return huntingLinks;',
  'county:"Hidalgo"',
  '/images/state-parks/world-birding-center-bentsen-rio-grande-valley-state-park.jpg',
  'sourceCheckedAt:"2026-09-20"',
]) {
  const source = required === 'if (!hasDedicatedInventory) return huntingLinks;' ? destinationViator : destinationCurationBatch20;
  if (!source.includes(required)) errors.push(`Destination regression safeguard missing: ${required}.`);
}

for (const feature of [
  'const GENERATED_COPY_MARKERS = [',
  'function containsGeneratedFallbackCopy(summary: string, bodyText: string)',
  'code: "generic-fallback-copy"',
  'severity: "error"',
  'must be hand-curated before indexing',
  'readyForIndexing: errors === 0 && score >= 76',
]) {
  if (!destinationAudit.includes(feature)) errors.push(`Destination indexing quality gate missing: ${feature}.`);
}

for (const marker of [
  ' is a texas destination',
  'those details make it easier to decide whether this stop fits a quick outing',
  'works best as part of a trip built around the surrounding region',
  'use the official visitor-information link on this page for the latest details',
]) {
  if (!destinationAudit.includes(marker)) errors.push(`Destination fallback-copy audit marker missing: ${marker}.`);
}

// The indexing audit still detects legacy synthetic copy, but the catalog
// transformer must not manufacture any of that copy for new or existing pages.
for (const staleCopy of [
  'is a Texas destination',
  'Those details make it easier to decide whether this stop fits a quick outing',
  'works best as part of a trip built around the surrounding region',
  'Use the official visitor-information link on this page for the latest details',
]) {
  if (destinationQuality.includes(staleCopy)) errors.push(`Synthetic destination filler must not be generated: ${staleCopy}.`);
}

for (const feature of [
  'function reconcileExploreCatalog',
]) {
  if (!queryImplementation.includes(feature)) errors.push(`Destination catalog quality filter missing: ${feature}.`);
}
const exactPlaceParkPublicationGuard = "filterSeoReadyDestinations(filterCurrentlyVisitableDestinations(improved.map((destination)=>applyStateParkHeroAsset(correctDestinationTravelRegion(destination)))))";
if (!queryImplementation.replace(/\s+/g, "").replace(/,\)/g, ")").includes(exactPlaceParkPublicationGuard)) {
  errors.push("Destination publication must retain final exact-place park photo selection within both SEO-readiness and visitor-availability filters.");
}
if (!queries.includes('await import("./destination-query-runtime")')) errors.push('Destination query resolution must remain behind the dynamic runtime boundary.');

for (const feature of [
  'data-stay-nearby-slot',
  'StateParkVisitorEssentials',
  'DestinationAuthoritySections',
  'destinationEditorialLinks(destination.slug)',
  'townAuthorityContextualLinks(destination)',
  'BookingCarRentalCard',
  'destination.category === "road-trips"',
  'showRentalCarOption',
]) {
  if (!destinationPlanner.includes(feature)) errors.push(`Destination planner lacks visitor-led feature: ${feature}.`);
}
for (const stale of ['Things to do and see', 'Visitor facilities', 'groups.map((group, index)']) {
  if (destinationPlanner.includes(stale)) errors.push(`Redundant visitor-planner content must not return: ${stale}.`);
}
for (const stale of [
  'const practicalTips = unique([',
  'What to know before you go',
  '{ title: "Good to know", items: practicalTips }',
  'Keep exploring',
  '<AnswerSummary',
]) {
  if (destinationPlanner.includes(stale)) errors.push(`Destination visit planner must not duplicate route-level visitor planning content: ${stale}.`);
}

if (destinationRoute.includes('isAccessibleForFree:')) {
  errors.push('Destination schema must not infer free accessibility from unstructured entry notes.');
}
if (destinationRoute.includes('name: destination.category.replace(/-/g, " ")')) {
  errors.push('Destination breadcrumbs must use authoritative taxonomy labels instead of slug-derived labels.');
}

for (const feature of [
  'categoriesQuery()',
  '"@type": "WebPage"',
  'mainEntity: { "@id": `${articleUrl}#article` }',
  'mainEntityOfPage: { "@id": articleUrl }',
  '"@id": `${articleUrl}#primaryimage`',
  '"@id": authorId',
  '"@type": "Organization"',
  'description: author.bio',
  'parentOrganization: { "@id": `${siteUrl}/#organization` }',
  'articleSection: categoryName',
  'publisher: { "@id": `${siteUrl}/#organization` }',
  'categories.find((category) => category.slug === article.category)?.name',
]) {
  if (!articleRoute.includes(feature)) errors.push(`Article entity graph feature missing: ${feature}.`);
}

if (articleRoute.includes('author: author ? { "@type": "Person", name: author.name }')) {
  errors.push('Article authors must use stable graph identifiers instead of anonymous Person nodes.');
}
if (articleRoute.includes('articleSection: article.category')) {
  errors.push('Article section must use an authoritative taxonomy label instead of a slug.');
}

for (const feature of [
  '!(primary.lat === 0 && primary.lng === 0)',
  'primary.lat >= -90',
  'primary.lng >= -180',
]) {
  if (!map.includes(feature)) errors.push(`Map coordinate guard missing: ${feature}.`);
}

if (!remote.includes('/images/texasdefined-destination-placeholder.svg')) {
  errors.push('Remote destination fallback image is not connected.');
}

// Historical and temporarily-closed museum guides may remain discoverable as
// factual references, but these exact institutions must NOT re-enter trip planning.
const referenceSource = destinationRoute.match(/const isHistoricalMuseumReference = \[([^\]]+)\]\.includes\(destination\.slug\)/);
const historicalMuseumReferences = referenceSource ? [...referenceSource[1].matchAll(/"([a-z0-9-]+)"/g)].map((match) => match[1]) : [];
if (!referenceSource) errors.push('Historical museum exception must be an explicit slug allowlist, never an open-ended indexability bypass.');
for (const requiredSlug of ['1940-air-terminal-museum-houston', 'elisabet-ney-museum-austin', 'buffalo-soldiers-national-museum-houston']) {
  if (!historicalMuseumReferences.includes(requiredSlug)) errors.push('Required historical museum exception missing: ' + requiredSlug);
}
for (const slug of historicalMuseumReferences) {
  if (!fs.readFileSync(path.join(root, 'src/data/destination-availability.ts'), 'utf8').includes('"' + slug + '"')) errors.push('Closed museum missing from unavailable trip-planner set: ' + slug);
}

if (errors.length) {
  console.error('Editorial content integrity validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

execFileSync(process.execPath, ['scripts/data/validate-dallas-black-history.mjs'], { stdio: 'inherit' });
console.log('Article and destination data, single robots policy, indexing quality gate, lazy destination query resolution, visit-planner, relationship, breadcrumb, and entity graph integrity validation passed.');
