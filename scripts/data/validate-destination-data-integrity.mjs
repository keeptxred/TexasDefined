import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const destinationRoute = fs.readFileSync(path.join(root, 'src/routes/destination.$slug.tsx'), 'utf8');
const destinationPlanner = fs.readFileSync(path.join(root, 'src/components/editorial/DestinationVisitPlanner.tsx'), 'utf8');
const destinationAudit = fs.readFileSync(path.join(root, 'src/data/destination-audit.ts'), 'utf8');
const destinationQuality = fs.readFileSync(path.join(root, 'src/data/destination-quality.ts'), 'utf8');
const queries = fs.readFileSync(path.join(root, 'src/data/queries.ts'), 'utf8');
const articleRoute = fs.readFileSync(path.join(root, 'src/routes/article.$slug.tsx'), 'utf8');
const map = fs.readFileSync(path.join(root, 'src/components/editorial/MapPreview.tsx'), 'utf8');
const remote = fs.readFileSync(path.join(root, 'src/data/explore-remote.ts'), 'utf8');
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
  'const indexable = audit.readyForIndexing && isPrimaryTripPlannerDestination(destination)',
  '{ name: "robots", content: "noindex, follow" }',
]) {
  if (!destinationRoute.includes(feature)) errors.push(`Destination integrity feature missing: ${feature}.`);
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

for (const sourceMarker of [
  'is a Texas destination',
  'Those details make it easier to decide whether this stop fits a quick outing',
  'works best as part of a trip built around the surrounding region',
  'Use the official visitor-information link on this page for the latest details',
]) {
  if (!destinationQuality.includes(sourceMarker)) errors.push(`Destination quality fallback source marker changed without updating the indexing audit: ${sourceMarker}.`);
}

for (const feature of [
  'filterSeoReadyDestinations(filterCurrentlyVisitableDestinations(improved))',
  'const destinations = reconcileExploreCatalog',
]) {
  if (!queries.includes(feature)) errors.push(`Destination catalog quality filter missing: ${feature}.`);
}

for (const feature of [
  'function unique(values: string[])',
  'activityPattern.test(item)',
  'facilityPattern.test(item)',
  '!activities.includes(item)',
  '!facilities.includes(item)',
  'const practicalTips = unique([',
  'destination.bestSeason ?',
  'destination.entryNote',
  'destination.reservationUrl ?',
  'destination.accessibilityNotes ?',
  'destination.directions ?',
  'if (!activities.length && !facilities.length && !otherHighlights.length && !practicalTips.length) return null',
  'Conditions, closures, fees and availability can change',
  'aria-labelledby="plan-your-visit"',
  '{ title: "Things to do", items: activities }',
  '{ title: "What you’ll find", items: facilities }',
  '{ title: "Don’t miss", items: otherHighlights }',
  '{ title: "Good to know", items: practicalTips }',
  'groups.map((group, index)',
  'group.items.map((item)',
]) {
  if (!destinationPlanner.includes(feature)) errors.push(`Destination visit-planner integrity feature missing: ${feature}.`);
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
  'jobTitle: author.role',
  'description: author.bio',
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

if (errors.length) {
  console.error('Editorial content integrity validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Article and destination data, indexing quality gate, visit-planner, relationship, breadcrumb, and entity graph integrity validation passed.');
