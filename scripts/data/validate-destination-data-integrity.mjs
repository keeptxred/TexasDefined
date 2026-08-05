import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const destinationRoute = fs.readFileSync(path.join(root, 'src/routes/destination.$slug.tsx'), 'utf8');
const destinationPlanner = fs.readFileSync(path.join(root, 'src/components/editorial/DestinationVisitPlanner.tsx'), 'utf8');
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
]) {
  if (!destinationRoute.includes(feature)) errors.push(`Destination integrity feature missing: ${feature}.`);
}

for (const feature of [
  'function unique(values: string[])',
  'activityPattern.test(item)',
  'facilityPattern.test(item)',
  '!activities.includes(item)',
  '!facilities.includes(item)',
  'if (!activities.length && !facilities.length && !otherHighlights.length && !practicalTips.length) return null',
  'Confirm changing conditions, closures, fees, and availability before traveling.',
  'destination.reservationUrl ? "Check reservation availability before making the drive."',
  'destination.accessibilityNotes ? `Accessibility: ${destination.accessibilityNotes}`',
  'destination.directions ? `Arrival guidance: ${destination.directions}`',
  'aria-labelledby="plan-your-visit"',
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

console.log('Article and destination data, visit-planner, relationship, breadcrumb, and entity graph integrity validation passed.');
