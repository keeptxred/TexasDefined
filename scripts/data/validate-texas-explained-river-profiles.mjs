import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const stubs = read('src/data/fixtures/texas-explained-river-profile-stubs.ts');
const articles = read('src/data/fixtures/texas-explained-river-profiles.ts');
const pillar = read('src/data/fixtures/texas-rivers-explained.ts');
const lazy = read('src/data/fixtures/lazy-evergreen.ts');
const authority = read('src/components/content/TexasRiversAuthorityHub.tsx');
const citationTrust = read('src/components/content/TexasRiversCitationTrust.tsx');
const basinReference = read('src/components/content/TexasRiverBasinReference.tsx');
const basinData = read('src/data/texas-river-basin-reference.ts');
const basinCsv = read('src/routes/texas-river-basins[.]csv.ts');
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
  'title: "Major Rivers of Texas: Basins, Regions & Waterways Explained"',
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
  'Go Deeper on Five Major Texas Rivers',
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
  'lastVerified="October 3, 2026"',
  'Recommended citation',
  'https://texasdefined.com/article/texas-rivers-explained',
]) if (!citationTrust.includes(marker)) errors.push(`Texas rivers citation trust contract missing: ${marker}`);

for (const marker of [
  'texasRiverBasinHighlights',
  'Largest basin in Texas',
  'Longest Texas reach',
  'Highest average flow',
]) if (!basinData.includes(marker)) errors.push(`Texas river basin data contract missing: ${marker}`);

for (const marker of [
  'texasMajorRiverBasins',
  'texasCoastalRiverBasins',
  '<details className="mt-5',
  'Open the full 15-basin comparison',
  'Eight coastal basins drain directly toward bays and the Gulf',
  'href="/texas-river-basins.csv"',
  'Download CSV ↓',
]) if (!basinReference.includes(marker)) errors.push(`Texas river basin reference presentation contract missing: ${marker}`);

for (const marker of [
  "createFileRoute('/texas-river-basins.csv')",
  'texasMajorRiverBasins',
  'texasCoastalRiverBasins',
  "'basin_type'",
  "'content-type': 'text/csv; charset=utf-8'",
  "'content-disposition': 'attachment; filename=\"texasdefined-texas-river-basins.csv\"'",
  "'x-robots-tag': 'noindex, follow'",
]) if (!basinCsv.includes(marker)) errors.push(`Texas river basin CSV contract missing: ${marker}`);

for (const marker of [
  'const articleDisplayTitle = isTexasRiversArticle ? "Texas Rivers Explained" : article.title;',
  'const waterTopic = article.slug === "texas-river-basins-guide" ? "basins" : null;',
  'texasExplainedQuickAnswer && !isTexasRiversArticle',
  '!isTexasRiversArticle && internalLinks.length > 0',
  '!isTexasRiversArticle && article.tags.length > 0',
  '!isTexasRiversArticle && <Section tone="surface">',
]) if (!articleRoute.includes(marker)) errors.push(`Texas rivers simplified presentation contract missing: ${marker}`);

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

if (errors.length) {
  console.error('Texas Explained river profile validation failed:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log('Texas Explained river authority passed: the GSC-focused statewide river title, map-first regional orientation, progressive basin reference, citation trust layer, downloadable basin data, focused flagship presentation, non-duplicative regional flow and river-section imagery are protected alongside five TWDB-backed, lazy-loaded, hub-visible, substantive river profiles.');
