import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const stubs = read('src/data/fixtures/texas-explained-river-profile-stubs.ts');
const articles = read('src/data/fixtures/texas-explained-river-profiles.ts');
const pillar = read('src/data/fixtures/texas-rivers-explained.ts');
const lazy = read('src/data/fixtures/lazy-evergreen.ts');
const authority = read('src/components/content/TexasRiversAuthorityHub.tsx');
const citationTrust = read('src/components/content/TexasRiversCitationTrust.tsx');
const basinReference = read('src/components/content/TexasRiverBasinReference.tsx');
const articleRoute = read('src/routes/article.$slug.tsx');
const hub = `${read('src/routes/texas-explained.tsx')}\n${read('src/components/editorial/TexasExplainedPage.tsx')}`;
const topology = read('src/data/fixtures/newest-evergreen.ts');
const errors = [];

const profiles = [
  ['texas-brazos-river-guide', 'https://www.twdb.texas.gov/surfacewater/rivers/river_basins/brazos/index.asp'],
  ['texas-colorado-river-guide', 'https://www.twdb.texas.gov/surfacewater/rivers/river_basins/colorado/'],
  ['texas-guadalupe-river-guide', 'https://www.twdb.texas.gov/surfacewater/rivers/river_basins/guadalupe/index.asp'],
  ['texas-trinity-river-guide', 'https://www.twdb.texas.gov/surfacewater/rivers/river_basins/trinity/index.asp'],
  ['texas-rio-grande-river-guide', 'https://www.twdb.texas.gov/surfacewater/rivers/river_basins/riogrande/'],
];

for (const marker of [
  'title: "Texas Rivers Explained: Major Rivers, Basins & Map"',
  'major rivers and river basins of Texas',
  'href: "/article/texas-river-basins-guide"',
  'href: "/article/texas-lakes-reservoirs-explained"',
]) if (!pillar.includes(marker)) errors.push(`GSC river-intent contract missing: ${marker}`);

for (const forbiddenMarker of [
  'h("Where Texas\'s Major Rivers Flow")',
  '"West Texas and the mountains: Rio Grande, Pecos and Devils River systems move through high desert, basins and canyon country."',
  '"Central Texas and the plains: Brazos and Colorado systems cross large portions of the state and feed major reservoirs."',
]) if (pillar.includes(forbiddenMarker)) errors.push(`Texas rivers pillar must not restore duplicate regional rundown: ${forbiddenMarker}`);

for (const marker of [
  '/images/state-parks/garner-state-park.jpg',
  '/images/editorial/moving/san-antonio.jpg',
  '/images/explore/lakes-rivers/village-creek-state-park.jpg',
]) if (!pillar.includes(marker)) errors.push(`Texas rivers section image contract missing: ${marker}`);

for (const marker of [
  'Start with the map',
  'Texas Rivers, Region by Region',
  'const riverRegions = [',
  'See all river basins →',
  'Explore All 15 Major Texas River Basins',
  'Texas River Basins Explained →',
  'Explore Texas Lakes & Rivers →',
  '<TexasRiversCitationTrust />',
]) if (!authority.includes(marker)) errors.push(`Texas rivers map-first authority contract missing: ${marker}`);

for (const forbiddenMarker of [
  'river-profile-rail',
  'Dedicated river profiles',
  'See Texas\'s Major Rivers on the Map',
]) if (authority.includes(forbiddenMarker)) errors.push(`Texas rivers authority must not restore retired duplicate module: ${forbiddenMarker}`);

for (const marker of [
  'CitationTrustPanel',
  'Texas Water Development Board — River Basins',
  'Texas Water Development Board — Major River Basins Map',
  'Sources, methodology and verification',
  'lastVerified="October 9, 2026"',
  'Recommended citation',
  'https://texasdefined.com/article/texas-rivers-explained',
]) if (!citationTrust.includes(marker)) errors.push(`Texas rivers citation trust contract missing: ${marker}`);

for (const marker of [
  'const sourceUrl = "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/index.asp";',
  'const lastVerified = "2026-10-09";',
  'const canonicalPage = "https://texasdefined.com/article/texas-rivers-explained";',
  'const majorBasins = [',
  'const coastalBasins = [',
  'const basinHighlights = [',
  'Largest basin in Texas',
  'Longest Texas reach',
  'Highest average flow',
  'const csvHeaders = [',
  '"basin_type"',
  'const csvDownloadHref = `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`;',
  'const jsonDownloadHref = `data:application/json;charset=utf-8,${encodeURIComponent(jsonContent)}`;',
  'methodology: "Texas Defined transcribes TWDB statewide basin statistics into normalized numeric fields for comparison.',
  'download="texasdefined-texas-river-basins.csv"',
  'Download CSV ↓',
  'download="texasdefined-texas-river-basins.json"',
  'Download JSON ↓',
  '<details className="mt-5',
  'Open the full 15-basin comparison',
  'Eight coastal basins drain directly toward bays and the Gulf',
]) if (!basinReference.includes(marker)) errors.push(`Texas river basin reference/download contract missing: ${marker}`);

for (const marker of [
  'const articleDisplayTitle = isTexasRiversArticle ? "Texas Rivers Explained" : article.title;',
  'const waterTopic = article.slug === "texas-river-basins-guide" ? "basins" : null;',
  'texasExplainedQuickAnswer && !isTexasRiversArticle',
  '!isTexasRiversArticle && internalLinks.length > 0',
  '!isTexasRiversArticle && article.tags.length > 0',
]) if (!articleRoute.includes(marker)) errors.push(`Texas rivers simplified presentation contract missing: ${marker}`);

if (!articleRoute.includes('!isTexasRiversArticle && <Section tone="surface">')
  && !articleRoute.includes('!isTexasRiversArticle && !hideGenericRelatedRail && <Section tone="surface">')) {
  errors.push('Texas rivers simplified presentation contract missing: rivers must remain excluded from the generic related-story rail.');
}

for (const marker of [
  'const riversLink = { href: "/article/texas-rivers-explained"',
  'const basinsLink = { href: "/article/texas-river-basins-guide"',
  'const collectionLink = { href: "/texas-explained"',
]) if (!articles.includes(marker)) errors.push(`Shared river profile navigation contract missing: ${marker}`);

for (const [slug, sourceUrl] of profiles) {
  if (!stubs.includes(`"${slug}"`)) errors.push(`Missing river profile stub: ${slug}`);
  if (!articles.includes(`slug: "${slug}"`)) errors.push(`Missing full river profile: ${slug}`);
  if (!articles.includes(sourceUrl)) errors.push(`Missing TWDB source URL for ${slug}`);
  if (!hub.includes(`"${slug}"`)) errors.push(`Texas Explained hub must surface river profile: ${slug}`);
  if (!topology.includes(`/article/${slug}`)) errors.push(`Texas rivers pillar must link to river profile: ${slug}`);
}

for (const marker of [
  'import { texasExplainedRiverProfileStubs }',
  '...texasExplainedRiverProfileStubs',
  'texasExplainedRiverProfileStubs.some((article) => article.slug === slug)',
  'await import("./texas-explained-river-profiles")',
  'texasExplainedRiverProfileArticles.find',
]) if (!lazy.includes(marker)) errors.push(`River profile lazy-registration contract missing: ${marker}`);

for (const marker of [
  'const riverProfileSlugs = [',
  '...riverProfileSlugs',
  'riverProfiles: orderedArticles(catalog, riverProfileSlugs)',
  '<DepthGrid articles={riverProfiles} label="Major river profiles" />',
  '10 core guides · 25 deeper explainers',
  'Twenty-five focused explainers behind the core guides',
]) if (!hub.includes(marker)) errors.push(`River profile hub contract missing: ${marker}`);

for (const marker of [
  'Brazos River explained',
  'Texas Colorado River explained',
  'Guadalupe River explained',
  'Trinity River explained',
  'Rio Grande explained',
]) if (!topology.includes(marker)) errors.push(`Texas rivers reciprocal navigation missing: ${marker}`);

const paragraphCount = (block) => (block.match(/p\("/g) || []).length;
const articleBodyWordCount = (block) => {
  const bodyStart = block.indexOf('body: [');
  if (bodyStart < 0) return 0;
  const body = block.slice(bodyStart);
  const text = [...body.matchAll(/(?:p|h)\("([^"]*)"\)|list\(([\s\S]*?)\n\s*\)/g)]
    .flatMap((match) => match[1] ? [match[1]] : [...(match[2] || '').matchAll(/"([^"]*)"/g)].map((item) => item[1]))
    .join(' ');
  return text.trim().split(/\s+/).filter(Boolean).length;
};
for (const [slug] of profiles) {
  const start = articles.indexOf(`slug: "${slug}"`);
  const next = start >= 0 ? articles.indexOf('\nexport const ', start + 1) : -1;
  const block = start >= 0 ? articles.slice(start, next > start ? next : articles.length) : '';
  if (paragraphCount(block) < 7) errors.push(`River profile is too shallow (${paragraphCount(block)} paragraphs): ${slug}`);
  const bodyWords = articleBodyWordCount(block);
  if (bodyWords < 600) errors.push(`River profile is below the 600-word article index floor (${bodyWords} words): ${slug}`);
  if (!block.includes('riversLink') || !block.includes('basinsLink') || !block.includes('collectionLink')) {
    errors.push(`River profile must use statewide rivers, basin and collection backlinks: ${slug}`);
  }
}

// The second tranche closes all remaining TWDB major basin coverage without duplicating the original five.
const additionalStubs = read('src/data/fixtures/texas-explained-river-profiles-remaining-stubs.ts');
const additionalGuides = read('src/data/fixtures/texas-explained-river-profiles-remaining.ts');
const interactiveMap = read('src/components/content/TexasRiverBasinInteractiveMap.tsx');
const additionalBasins = [
  ['Canadian', 'texas-canadian-river-guide', 'canadian/index.asp'],
  ['Cypress', 'texas-cypress-river-basin-guide', 'cypress/index.asp'],
  ['Lavaca', 'texas-lavaca-river-guide', 'lavaca/index.asp'],
  ['Neches', 'texas-neches-river-guide', 'neches/index.asp'],
  ['Nueces', 'texas-nueces-river-guide', 'nueces/index.asp'],
  ['Red', 'texas-red-river-guide', 'red/index.asp'],
  ['Sabine', 'texas-sabine-river-guide', 'sabine/index.asp'],
  ['San Antonio', 'texas-san-antonio-river-guide', 'sanantonio/index.asp'],
  ['San Jacinto', 'texas-san-jacinto-river-guide', 'sanjacinto/index.asp'],
  ['Sulphur', 'texas-sulphur-river-guide', 'sulphur/index.asp'],
];
for (const [name, slug, twdbPath] of additionalBasins) {
  if (!additionalStubs.includes(`slug: "${slug}"`)) errors.push(`Missing new river stub ${slug}`);
  const begin = additionalGuides.indexOf(`slug: "${slug}"`);
  const next = begin < 0 ? -1 : additionalGuides.indexOf('\nexport const ', begin);
  const body = begin < 0 ? '' : additionalGuides.slice(begin, next > begin ? next : additionalGuides.length);
  const wordCount = body.slice(body.indexOf('body: [')).split(/\s+/).length;
  if (wordCount < 600) errors.push(`New river guide below 600-word floor: ${name}, ${wordCount}`);
  if (!body.includes(`/river_basins/${twdbPath}`)) errors.push(`Missing official TWDB source: ${name}`);
  if (!body.includes('/article/texas-rivers-explained') || !body.includes('/article/texas-river-basins-guide') || !body.includes('/texas-explained')) errors.push(`Missing profile backlinks: ${slug}`);
  if (!authority.includes(`/article/${slug}`)) errors.push(`Missing flagship atlas link: ${slug}`);
  if (!basinReference.includes(`/article/${slug}`)) errors.push(`Missing TWDB table link: ${slug}`);
  if (!topology.includes(`/article/${slug}`)) errors.push(`Missing reciprocal topology link: ${slug}`);
  if (!hub.includes(`"${slug}"`)) errors.push(`Missing Texas Explained collection entry: ${slug}`);
}
// Prevent the new basin articles from drifting back into cloned generic prose.
for (const duplicated of [
  'Watershed area describes the land within Texas',
  'A basin is a network, not a blue line',
  'The official TWDB August 2023 GIS layer traces watershed boundaries',
  'Flooding can originate upstream even when the sky is clear locally',
  'Texas public river-navigation law does not give everyone',
]) {
  if (additionalGuides.includes(duplicated)) errors.push(`Duplicated generic river guide paragraph: ${duplicated}`);
}
for (const marker of [
  '15 major river basins',
  '8 coastal basins',
  'Selected watershed',
  'Read the {displayName(active)} guide',
  'basinGuidePaths[normalize(active)]',
]) {
  if (!interactiveMap.includes(marker)) errors.push(`Map legend or guide navigation missing: ${marker}`);
}

for (const marker of [
  '...texasExplainedRemainingRiverProfileStubs',
  'texasExplainedRemainingRiverProfileStubs.some((article) => article.slug === slug)',
  'await import("./texas-explained-river-profiles-remaining")',
  'texasExplainedRemainingRiverProfileArticles.find((candidate) => candidate.slug === slug)',
]) if (!lazy.includes(marker)) errors.push(`Additional river guide lazy loading missing: ${marker}`);
for (const marker of [
  'GM_Admin_Boundaries/MapServer/0',
  'Basin%2CBAYS',
  'maxAllowableOffset=0.025',
  'Load interactive basin map',
  'Zoom to selection',
  'showCoastal',
  'showBays',
  'TWDB',
]) if (!interactiveMap.includes(marker)) errors.push(`TWDB interactive map source/control missing: ${marker}`);
if (!authority.includes('<TexasRiverBasinInteractiveMap />')) errors.push('Official interactive basin atlas not mounted on rivers hub');

if (errors.length) {
  console.error('Texas Explained river profile validation failed:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log('Texas Explained river authority passed: official basin mapping, 15 source-backed river guides, progressive TWDB basin statistics, 2023 GIS references and citations are protected.');
