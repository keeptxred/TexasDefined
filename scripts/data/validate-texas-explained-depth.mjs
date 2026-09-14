import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const firstLayerArticles = read('src/data/fixtures/texas-explained-support-articles.ts');
const stubs = read('src/data/fixtures/texas-explained-support-stubs-2.ts');
const articles = read('src/data/fixtures/texas-explained-support-articles-2.ts');
const lazy = read('src/data/fixtures/lazy-evergreen.ts');
const topology = read('src/data/fixtures/newest-evergreen.ts');
const hub = `${read('src/routes/texas-explained.tsx')}\n${read('src/components/editorial/TexasExplainedPage.tsx')}`;
const articleRoute = read('src/routes/article.$slug.tsx');
const errors = [];

const firstLayerChildren = [
  'texas-river-basins-guide',
  'texas-highway-designations-explained',
  'texas-courthouse-architecture-guide',
  'texas-ecoregions-habitats-guide',
  'texas-settlement-patterns-explained',
];

const children = [
  'texas-aquifers-springs-explained',
  'texas-prairies-grasslands-guide',
  'texas-main-street-downtowns-guide',
  'texas-railroads-town-growth-explained',
  'texas-rural-wells-water-guide',
];

const expectedSources = [
  'Texas Water Development Board',
  'Texas Parks and Wildlife Department',
  'Texas Historical Commission',
  'Texas Department of Transportation',
];

for (const slug of children) {
  if (!stubs.includes(`slug: "${slug}"`)) errors.push(`Missing lightweight Texas Explained depth stub: ${slug}`);
  if (!articles.includes(`slug: "${slug}"`)) errors.push(`Missing full Texas Explained depth article: ${slug}`);
  if (!articles.includes('href: "/texas-explained"')) errors.push(`Depth articles must retain Texas Explained collection backlink: ${slug}`);
  if (!topology.includes(`/article/${slug}`)) errors.push(`No core pillar links to Texas Explained depth article: ${slug}`);
}

for (const slug of [...firstLayerChildren, ...children]) {
  if (!hub.includes(`"${slug}"`)) errors.push(`Texas Explained hub must surface depth article: ${slug}`);
  if (!articleRoute.includes(`"${slug}"`)) errors.push(`Texas Explained shared article context must recognize depth article: ${slug}`);
}

for (const source of expectedSources) {
  if (!articles.includes(`sourceName: "${source}"`) && !stubs.includes(`sourceName: "${source}"`)) {
    errors.push(`Missing authoritative source family in Texas Explained depth batch: ${source}`);
  }
}

for (const marker of [
  '...texasExplainedSupportStubs2',
  'texasExplainedSupportStubs2.some((article) => article.slug === slug)',
  'await import("./texas-explained-support-articles-2")',
]) {
  if (!lazy.includes(marker)) errors.push(`Texas Explained depth lazy-registration contract missing: ${marker}`);
}

for (const marker of [
  'const childSupportSlugs = [',
  'const depthSlugs = [',
  'const riverProfileSlugs = [',
  'const reservoirProfileSlugs = [',
  'const roadSystemSlugs = [',
  'const collectionSlugs = [...pillarSlugs, ...childSupportSlugs, ...depthSlugs, ...riverProfileSlugs, ...reservoirProfileSlugs, ...roadSystemSlugs]',
  'supportArticles: orderedArticles(catalog, childSupportSlugs)',
  'depthArticles: orderedArticles(catalog, depthSlugs)',
  'riverProfiles: orderedArticles(catalog, riverProfileSlugs)',
  'reservoirProfiles: orderedArticles(catalog, reservoirProfileSlugs)',
  'roadSystems: orderedArticles(catalog, roadSystemSlugs)',
  '<DepthGrid articles={supportArticles} label="Supporting explainers" />',
  '<DepthGrid articles={depthArticles} label="Deeper guides" />',
  '<DepthGrid articles={riverProfiles} label="Major river profiles" />',
  '<DepthGrid articles={reservoirProfiles} label="Reservoir water systems" />',
  '<DepthGrid articles={roadSystems} label="Texas road systems" />',
  '10 core guides · 25 deeper explainers',
  'Twenty-five focused explainers behind the core guides',
]) {
  if (!hub.includes(marker)) errors.push(`Texas Explained 35-article hub discovery contract missing: ${marker}`);
}

for (const marker of [
  'const texasExplainedSupportOrder = [',
  'const texasExplainedSupportSlugs = new Set<string>(texasExplainedSupportOrder)',
  'const texasExplainedCollectionSlugs = new Set<string>',
  'const isTexasExplainedCollectionArticle = isTexasExplainedPillar || isTexasExplainedSupport',
  'to="/texas-explained"',
  'Texas Explained · Supporting explainer',
  'aria-label="Texas Explained supporting explainer"',
  'grid grid-cols-2 gap-3',
  'sm:grid-cols-[1fr_auto_1fr]',
  'min-h-[52vh]',
  '!isTexasExplainedPillar && <p',
]) {
  if (!articleRoute.includes(marker)) errors.push(`Texas Explained shared article UX contract missing: ${marker}`);
}

const pillarDepth = {
  'texas-rivers-explained': ['texas-river-basins-guide', 'texas-aquifers-springs-explained'],
  'texas-lakes-reservoirs-explained': ['texas-river-basins-guide', 'texas-aquifers-springs-explained'],
  'texas-farm-to-market-roads-explained': ['texas-highway-designations-explained', 'texas-railroads-town-growth-explained'],
  'texas-courthouses-town-square': ['texas-courthouse-architecture-guide', 'texas-main-street-downtowns-guide'],
  'texas-wildflowers-guide': ['texas-ecoregions-habitats-guide', 'texas-prairies-grasslands-guide'],
  'texas-trees-guide': ['texas-ecoregions-habitats-guide', 'texas-prairies-grasslands-guide'],
  'texas-home-architecture-regions': ['texas-courthouse-architecture-guide', 'texas-main-street-downtowns-guide'],
  'buying-land-in-texas-guide': ['texas-ecoregions-habitats-guide', 'texas-rural-wells-water-guide'],
  'texas-wildlife-guide': ['texas-ecoregions-habitats-guide', 'texas-prairies-grasslands-guide'],
  'texas-cultural-regions-explained': ['texas-settlement-patterns-explained', 'texas-railroads-town-growth-explained'],
};

for (const [pillar, supportSlugs] of Object.entries(pillarDepth)) {
  const start = topology.indexOf(`"${pillar}": [`);
  const end = start >= 0 ? topology.indexOf('\n  ],', start) : -1;
  const block = start >= 0 && end > start ? topology.slice(start, end) : '';
  for (const slug of supportSlugs) {
    if (!block.includes(`/article/${slug}`)) errors.push(`${pillar} must retain deeper support path to ${slug}`);
  }
}

// Protect the source-backed explainers that increasingly land directly from
// search. Paragraph count alone is not a depth signal: seven one-sentence
// paragraphs can still be a thin page. Keep both structural and real narrative
// word-depth thresholds so reading-time metadata cannot mask a collapsed body.
const paragraphCount = (block) => (block.match(/\bp\("/g) || []).length;
const articleBlock = (source, slug) => {
  const start = source.indexOf(`slug: "${slug}"`);
  if (start < 0) return '';
  const next = source.indexOf('\nexport const ', start + 1);
  return source.slice(start, next > start ? next : source.length);
};

const bodyWordCount = (block) => {
  const start = block.indexOf('body: [');
  if (start < 0) return 0;
  const end = block.indexOf('\n  ],', start);
  if (end < 0) return 0;
  const body = block.slice(start, end);
  const literals = body.match(/"(?:\\.|[^"\\])*"/g) ?? [];
  const text = literals.map((literal) => {
    try { return JSON.parse(literal); } catch { return ''; }
  }).join(' ');
  return (text.match(/[A-Za-z0-9]+(?:['’][A-Za-z0-9]+)*/g) ?? []).length;
};

const FIRST_LAYER_MIN_WORDS = 650;
const DEPTH_MIN_WORDS = 850;

for (const slug of firstLayerChildren) {
  const block = articleBlock(firstLayerArticles, slug);
  const count = paragraphCount(block);
  const words = bodyWordCount(block);
  if (count < 7) errors.push(`First-layer Texas Explained article too shallow (${count} paragraphs): ${slug}`);
  if (words < FIRST_LAYER_MIN_WORDS) errors.push(`First-layer Texas Explained article too thin (${words} body words; minimum ${FIRST_LAYER_MIN_WORDS}): ${slug}`);
  if (!block.includes('sourceName:') || !block.includes('sourceUrl:')) errors.push(`First-layer Texas Explained article missing source authority: ${slug}`);
  if (!block.includes('internalLinks:')) errors.push(`First-layer Texas Explained article missing internal discovery links: ${slug}`);
}

for (const slug of children) {
  const block = articleBlock(articles, slug);
  const count = paragraphCount(block);
  const words = bodyWordCount(block);
  if (count < 7) errors.push(`Texas Explained depth article too shallow (${count} paragraphs): ${slug}`);
  if (words < DEPTH_MIN_WORDS) errors.push(`Texas Explained depth article too thin (${words} body words; minimum ${DEPTH_MIN_WORDS}): ${slug}`);
  if (!block.includes('sourceName:') || !block.includes('sourceUrl:')) errors.push(`Texas Explained depth article missing source authority: ${slug}`);
  if (!block.includes('internalLinks:')) errors.push(`Texas Explained depth article missing internal discovery links: ${slug}`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Texas Explained depth validation passed: ten source-backed support/depth articles remain substantive, hub-visible, lazy registered, collection-oriented and mobile-safe; first-layer guides retain at least ${FIRST_LAYER_MIN_WORDS} body words and deeper guides retain at least ${DEPTH_MIN_WORDS} body words.`);
