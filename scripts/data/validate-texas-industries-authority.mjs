import fs from 'node:fs';
import path from 'node:path';

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
const countyGuide = read('src/components/content/CountyGuideSections.tsx');
const texasDataRoute = read('src/routes/texas-data.tsx');
const movingRoute = read('src/routes/moving-to-texas.lazy.tsx');
const resourcesRoute = read('src/routes/texas-resources.lazy.tsx');
const businessData = read('src/data/priority-search-pages-public-services.ts');
const madeInTexasRoute = read('src/routes/made-in-texas.lazy.tsx');
const economyArticle = read('src/data/fixtures/texas-life-split-source.ts');
const seoOverrides = read('src/lib/seo.ts');

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
const industryToCountyPairs = new Set();
for (const slug of expectedSlugs) {
  const block = sectorBlocks.get(slug) ?? '';
  const expectedHref = `/texas-industries/${slug}`;
  if (!block.includes(`href: "${expectedHref}"`)) failures.push(`${slug} is missing its canonical sector href.`);

  const hubMatches = [...block.matchAll(/\{ name: "([^"]+)", description: "([^"]+)", places: \[([\s\S]*?)\] \}/g)];
  if (!hubMatches.length) failures.push(`${slug} must define at least one regional hub.`);
  hubCount += hubMatches.length;
  for (const hubMatch of hubMatches) {
    const hubName = hubMatch[1];
    const hrefs = [...hubMatch[3].matchAll(/href: "\/county\/([^"]+)"/g)].map((match) => match[1]);
    if (!hrefs.length) failures.push(`${slug} / ${hubName} must contain at least one county place pathway.`);
    if (new Set(hrefs).size !== hrefs.length) failures.push(`${slug} / ${hubName} contains duplicate county links.`);
    for (const countySlug of hrefs) {
      placeLinkCount += 1;
      industryToCountyPairs.add(`${countySlug}|${slug}`);
      if (!countySlugs.has(countySlug)) failures.push(`${slug} / ${hubName} points to unknown county slug: ${countySlug}.`);
    }
  }

  const evolutionMatch = block.match(/evolution: \{ period: "([^"]+)", title: "([^"]+)", detail: "([^"]+)", sourceLabel: "([^"]+)", sourceUrl: "([^"]+)" \}/);
  if (!evolutionMatch) failures.push(`${slug} must define one sourced evolution milestone.`);
  if (evolutionMatch && !evolutionMatch[5].startsWith('https://')) failures.push(`${slug} evolution source must use HTTPS.`);

  const relatedMatch = block.match(/relatedSectorSlugs: \[([^\]]+)\]/);
  const related = relatedMatch ? [...relatedMatch[1].matchAll(/"([^"]+)"/g)].map((match) => match[1]) : [];
  if (related.length < 2) failures.push(`${slug} needs at least two meaningful related-sector pathways.`);
  if (new Set(related).size !== related.length) failures.push(`${slug} contains duplicate related-sector pathways.`);
  if (related.includes(slug)) failures.push(`${slug} cannot relate to itself.`);
  for (const relatedSlug of related) if (!expectedSlugs.includes(relatedSlug)) failures.push(`${slug} references unknown related sector ${relatedSlug}.`);

  const workforceBlock = block.match(/workforce: \{([\s\S]*?)\n    \},\n    relatedSectorSlugs:/)?.[1] ?? '';
  const roles = workforceBlock.match(/roles: \[([^\]]+)\]/)?.[1] ?? '';
  const pathways = workforceBlock.match(/pathways: \[([^\]]+)\]/)?.[1] ?? '';
  if ((roles.match(/"/g) ?? []).length / 2 < 4) failures.push(`${slug} needs at least four representative workforce roles.`);
  if ((pathways.match(/"/g) ?? []).length / 2 < 4) failures.push(`${slug} needs at least four training pathways.`);

  const factCount = (block.match(/\{ value: /g) ?? []).length;
  const sourceSection = block.split('\n    sources: [')[1]?.split('\n    ],')[0] ?? '';
  const sourceCount = (sourceSection.match(/\{ label: /g) ?? []).length;
  if (factCount < 2) failures.push(`${slug} needs at least two dated/contextual sector indicators.`);
  if (sourceCount < 3) failures.push(`${slug} needs at least three authoritative sources.`);
  for (const url of [...block.matchAll(/(?:sourceUrl|url): "(https?:[^"]+)"/g)].map((match) => match[1])) {
    if (!url.startsWith('https://')) failures.push(`${slug} contains a non-HTTPS authority source: ${url}.`);
  }
}

if (hubCount !== 44) failures.push(`Expected the protected 44 regional industry hubs; found ${hubCount}.`);
if (placeLinkCount !== 71) failures.push(`Expected 71 rendered industry-to-county links; found ${placeLinkCount}.`);
if (industryToCountyPairs.size !== 69) failures.push(`Expected 69 unique industry-to-county pairs; found ${industryToCountyPairs.size}.`);

const countyMapMatch = countyGuide.match(/const COUNTY_INDUSTRY_PATHWAYS:[\s\S]*?= \{([\s\S]*?)\n\};/);
if (!countyMapMatch) failures.push('Unable to read the county-to-industry pathway registry.');
const countyToIndustryPairs = new Set();
for (const line of (countyMapMatch?.[1] ?? '').split('\n')) {
  const keyMatch = line.match(/^  (?:"([^"]+)"|([a-z0-9-]+)): \[(.*)\],?$/);
  if (!keyMatch) continue;
  const countySlug = keyMatch[1] ?? keyMatch[2];
  const body = keyMatch[3];
  if (!countySlugs.has(countySlug)) failures.push(`County-industry registry uses unknown county slug: ${countySlug}.`);
  const sectorSlugs = [...body.matchAll(/href: "\/texas-industries\/([^"]+)"/g)].map((match) => match[1]);
  if (new Set(sectorSlugs).size !== sectorSlugs.length) failures.push(`County-industry registry duplicates a sector for ${countySlug}.`);
  for (const sectorSlug of sectorSlugs) {
    if (!expectedSlugs.includes(sectorSlug)) failures.push(`County-industry registry points ${countySlug} to unknown sector ${sectorSlug}.`);
    countyToIndustryPairs.add(`${countySlug}|${sectorSlug}`);
  }
}
if (countyToIndustryPairs.size !== 36) failures.push(`Expected 36 protected county-to-industry mappings; found ${countyToIndustryPairs.size}.`);

const reciprocalPairs = [...industryToCountyPairs].filter((pair) => countyToIndustryPairs.has(pair));
if (reciprocalPairs.length !== 14) failures.push(`Expected 14 protected reciprocal county/industry mappings; found ${reciprocalPairs.length}.`);
for (const pair of [
  'harris|energy-power',
  'webb|trade-transportation-logistics',
  'grayson|technology-semiconductors',
  'midland|energy-power',
  'bexar|aerospace-aviation-defense',
  'dallam|agriculture-livestock',
]) {
  if (!reciprocalPairs.includes(pair)) failures.push(`Representative reciprocal mapping missing: ${pair}.`);
}

for (const path of expectedPaths) {
  if (!publicRoutes.includes(JSON.stringify(path))) failures.push(`Public-route governance missing ${path}.`);
  if (!llms.includes(`https://texasdefined.com${path}`)) failures.push(`llms.txt discovery missing ${path}.`);
}
if (!hub.includes('TEXAS_INDUSTRIES.map')) failures.push('Industry hub must render all sector records for crawlable discovery.');
if (!hub.includes('href={industry.href}')) failures.push('Industry hub must use normal crawlable sector links.');
if (!detail.includes('hub.places.map')) failures.push('Industry detail pages must render regional place links.');
if (!detail.includes('href={place.href}')) failures.push('Industry place pathways must use normal HTML href links.');
if (!detail.includes('industry.relatedSectorSlugs.includes(item.slug)')) failures.push('Industry detail pages must use the curated related-sector graph.');
if (detail.includes('.filter((item) => item.slug !== industry.slug).slice(')) failures.push('Generic related-sector slicing must not return.');
if (!detail.includes('industry.workforce.roles.map') || !detail.includes('industry.workforce.pathways.map')) failures.push('Industry detail pages must render workforce roles and training pathways.');
if (!detail.includes('industry.evolution.period') || !detail.includes('industry.evolution.sourceUrl')) failures.push('Industry detail pages must render sourced sector-evolution context.');

for (const [label, source] of [
  ['Texas Data', texasDataRoute],
  ['Moving to Texas', movingRoute],
  ['Texas Resources', resourcesRoute],
  ['Start a Business', businessData],
  ['Made in Texas', madeInTexasRoute],
]) {
  if (!source.includes('/texas-industries')) failures.push(`${label} must surface the Texas industries authority hub.`);
}

if (!economyArticle.includes('{ href: "/texas-industries", label: "Texas industries"')) failures.push('Jobs/economy overview must link to the structured industries hub.');
if (!hub.includes('href="/article/texas-jobs-economy-industries"')) failures.push('Industries hub must link back to the jobs/economy overview.');
if (!seoOverrides.includes('"/article/texas-jobs-economy-industries":')) failures.push('Jobs/economy overview must retain its separate SEO override.');
if (!seoOverrides.includes('title: "Texas Economy & Jobs: Major Industries, Regions & Growth"')) failures.push('Jobs/economy overview SEO title must retain its jobs/economy intent.');
if (!hubMeta.includes('title: "Texas Industries — Economy, Major Sectors & Regional Hubs"')) failures.push('Industries hub SEO title must retain its structured sector intent.');

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

const scopedIndustrySources = [data, detail, detailMeta, hub, hubMeta].join('\n');
if (/\\b(?:TODO|FIXME)\\b/i.test(scopedIndustrySources)) failures.push('Texas industries source contains an unfinished TODO/FIXME marker.');

const scanIndustryLinks = (root) => {
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.git') continue;
    const fullPath = path.join(root, entry.name);
    if (entry.isDirectory()) {
      scanIndustryLinks(fullPath);
      continue;
    }
    if (!/\\.(?:ts|tsx|js|mjs|md|csv)$/.test(entry.name)) continue;
    const source = read(fullPath);
    for (const match of source.matchAll(/\/texas-industries\/([a-z0-9-]+)/g)) {
      if (!expectedSlugs.includes(match[1])) failures.push(`Unknown Texas-industries link slug "${match[1]}" in ${fullPath}.`);
    }
  }
};
for (const root of ['src', 'scripts', 'ops', 'docs']) if (fs.existsSync(root)) scanIndustryLinks(root);

const staleDraftSlug = 'major-industries-driving-the-texas-economy';
const supersededDraftPath = `ops/editorial/texas-themed-content-backlog/drafts/${staleDraftSlug}.md`;
if (!read(supersededDraftPath).includes('SUPERSEDED AUTHORITY NOTE')) failures.push('The old industries backlog draft must remain explicitly marked superseded.');
for (const entry of fs.readdirSync('ops/editorial/texas-themed-content-backlog/drafts')) {
  if (!entry.endsWith('.md') || entry === `${staleDraftSlug}.md`) continue;
  const draft = read(path.join('ops/editorial/texas-themed-content-backlog/drafts', entry));
  if (draft.includes(`/article/${staleDraftSlug}`)) failures.push(`Stale duplicate-industries draft link remains in ${entry}.`);
}

if (failures.length) {
  console.error('Texas industries authority validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Texas industries authority validation passed: 12 indexable industry URLs, 11 sectors, ${hubCount} regional hubs, 71 rendered industry→county links / 69 unique pairs, 36 county→industry mappings, 14 reciprocal county/industry pairs, curated related-sector navigation, workforce pathways, sourced sector-evolution context, canonical/structured-data governance, article-intent separation, repository link hygiene and machine discovery are protected.`);
