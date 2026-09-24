import fs from 'node:fs';

const failures = [];
const read = (path) => fs.readFileSync(path, 'utf8');
const data = read('src/data/texas-industries.ts');
const detail = read('src/routes/texas-industries_.$slug.lazy.tsx');
const detailMeta = read('src/routes/texas-industries_.$slug.tsx');
const hub = read('src/routes/texas-industries.lazy.tsx');
const hubMeta = read('src/routes/texas-industries.tsx');
const publicRoutes = read('src/lib/public-routes.ts');
const llms = read('src/routes/llms[.]txt.ts');
const places = read('src/data/texas-places.ts');

const expectedSlugs = [
  'energy-power',
  'technology-semiconductors',
  'advanced-manufacturing',
  'trade-transportation-logistics',
  'aerospace-aviation-defense',
  'healthcare-life-sciences',
  'agriculture-livestock',
  'financial-services',
  'construction-real-estate',
  'corporate-professional-services',
  'hospitality-tourism-culture',
];
const expectedPaths = ['/texas-industries', ...expectedSlugs.map((slug) => `/texas-industries/${slug}`)];

const countyNamesMatch = places.match(/const COUNTY_NAMES = `([\s\S]*?)`\.split\('\|'\);/);
if (!countyNamesMatch) failures.push('Unable to read the canonical Texas county list.');
const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const countySlugs = new Set((countyNamesMatch?.[1] ?? '').split('|').filter(Boolean).map(slugify));
if (countySlugs.size !== 254) failures.push(`Expected 254 canonical county slugs; found ${countySlugs.size}.`);

const sectorMatches = [...data.matchAll(/\n  \{\n    slug: "([^"]+)"/g)];
const actualSlugs = sectorMatches.map((match) => match[1]);
if (actualSlugs.length !== 11) failures.push(`Expected 11 industry sectors; found ${actualSlugs.length}.`);
if (new Set(actualSlugs).size !== actualSlugs.length) failures.push('Industry slugs must be unique.');
for (const slug of expectedSlugs) if (!actualSlugs.includes(slug)) failures.push(`Missing required industry sector: ${slug}.`);
for (const slug of actualSlugs) if (!expectedSlugs.includes(slug)) failures.push(`Unexpected industry sector slug: ${slug}.`);

const sectorBlocks = new Map();
for (let index = 0; index < sectorMatches.length; index += 1) {
  const match = sectorMatches[index];
  const start = match.index;
  const end = index + 1 < sectorMatches.length ? sectorMatches[index + 1].index : data.indexOf('\n];', start);
  sectorBlocks.set(match[1], data.slice(start, end));
}

let hubCount = 0;
let placeLinkCount = 0;
for (const slug of expectedSlugs) {
  const block = sectorBlocks.get(slug) ?? '';
  const expectedHref = `/texas-industries/${slug}`;
  if (!block.includes(`href: "${expectedHref}"`)) failures.push(`${slug} is missing its canonical sector href.`);

  const hubMatches = [...block.matchAll(/\{ name: "([^"]+)", description: "([^"]+)", places: \[([\s\S]*?)\] \}/g)];
  if (!hubMatches.length) failures.push(`${slug} must define at least one regional hub.`);
  hubCount += hubMatches.length;
  for (const hubMatch of hubMatches) {
    const hubName = hubMatch[1];
    const placeBody = hubMatch[3];
    const hrefs = [...placeBody.matchAll(/href: "\/county\/([^"]+)"/g)].map((match) => match[1]);
    if (!hrefs.length) failures.push(`${slug} / ${hubName} must contain at least one county place pathway.`);
    if (new Set(hrefs).size !== hrefs.length) failures.push(`${slug} / ${hubName} contains duplicate county links.`);
    for (const countySlug of hrefs) {
      placeLinkCount += 1;
      if (!countySlugs.has(countySlug)) failures.push(`${slug} / ${hubName} points to unknown county slug: ${countySlug}.`);
    }
  }

  const relatedMatch = block.match(/relatedSectorSlugs: \[([^\]]+)\]/);
  const related = relatedMatch ? [...relatedMatch[1].matchAll(/"([^"]+)"/g)].map((match) => match[1]) : [];
  if (related.length < 2) failures.push(`${slug} needs at least two meaningful related-sector pathways.`);
  if (new Set(related).size !== related.length) failures.push(`${slug} contains duplicate related-sector pathways.`);
  if (related.includes(slug)) failures.push(`${slug} cannot relate to itself.`);
  for (const relatedSlug of related) if (!expectedSlugs.includes(relatedSlug)) failures.push(`${slug} references unknown related sector ${relatedSlug}.`);

  const workforceBlock = block.match(/workforce: \{([\s\S]*?)\n    \},\n    relatedSectorSlugs:/)?.[1] ?? '';
  const roles = workforceBlock.match(/roles: \[([^\]]+)\]/)?.[1] ?? '';
  const pathways = workforceBlock.match(/pathways: \[([^\]]+)\]/)?.[1] ?? '';
  const roleCount = (roles.match(/"/g) ?? []).length / 2;
  const pathwayCount = (pathways.match(/"/g) ?? []).length / 2;
  if (roleCount < 4) failures.push(`${slug} needs at least four representative workforce roles.`);
  if (pathwayCount < 4) failures.push(`${slug} needs at least four training pathways.`);

  const factCount = (block.match(/\{ value: /g) ?? []).length;
  const sourceSection = block.split('\n    sources: [')[1]?.split('\n    ],')[0] ?? '';
  const sourceCount = (sourceSection.match(/\{ label: /g) ?? []).length;
  if (factCount < 2) failures.push(`${slug} needs at least two dated/contextual sector indicators.`);
  if (sourceCount < 3) failures.push(`${slug} needs at least three authoritative sources.`);
}

if (hubCount !== 44) failures.push(`Expected the protected 44 regional industry hubs; found ${hubCount}.`);
if (placeLinkCount < 70) failures.push(`Industry-to-county graph unexpectedly shrank to ${placeLinkCount} links.`);

for (const path of expectedPaths) {
  const routeLiteral = JSON.stringify(path);
  if (!publicRoutes.includes(routeLiteral)) failures.push(`Public-route governance missing ${path}.`);
  if (!llms.includes(`https://texasdefined.com${path}`)) failures.push(`llms.txt discovery missing ${path}.`);
}
if (!hub.includes('TEXAS_INDUSTRIES.map')) failures.push('Industry hub must render all sector records for crawlable discovery.');
if (!hub.includes('href={industry.href}')) failures.push('Industry hub must use normal crawlable sector links.');
if (!detail.includes('hub.places.map')) failures.push('Industry detail pages must render regional place links.');
if (!detail.includes('href={place.href}')) failures.push('Industry place pathways must use normal HTML href links.');
if (!detail.includes('industry.relatedSectorSlugs.includes(item.slug)')) failures.push('Industry detail pages must use the curated related-sector graph.');
if (detail.includes('.filter((item) => item.slug !== industry.slug).slice(')) failures.push('Generic related-sector slicing must not return.');
if (!detail.includes('industry.workforce.roles.map') || !detail.includes('industry.workforce.pathways.map')) failures.push('Industry detail pages must render workforce roles and training pathways.');

for (const source of [hubMeta, detailMeta]) {
  if (!source.includes('canonicalLink(')) failures.push('Industry metadata routes must retain canonical tags.');
  if (!source.includes('buildMeta(')) failures.push('Industry metadata routes must retain title/description metadata.');
  if (!source.includes('jsonLd(')) failures.push('Industry metadata routes must retain structured data.');
}
for (const schemaType of ['CollectionPage', 'ItemList', 'BreadcrumbList']) {
  if (!hubMeta.includes(`"@type": "${schemaType}"`)) failures.push(`Industry hub must retain ${schemaType} structured data.`);
}
if (!detailMeta.includes('"@type": "BreadcrumbList"')) failures.push('Industry detail pages must retain BreadcrumbList structured data.');
if (!data.includes('export const TEXAS_INDUSTRIES_VERIFIED_AT = "September 24, 2026";')) failures.push('Industry source-review date must remain explicit and current for this authority release.');

if (failures.length) {
  console.error('Texas industries authority validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Texas industries authority validation passed: 12 indexable industry URLs, 11 sectors, ${hubCount} regional hubs, ${placeLinkCount} industry→county links, curated related-sector navigation, workforce pathways, canonical/structured-data governance and machine discovery are protected.`);
