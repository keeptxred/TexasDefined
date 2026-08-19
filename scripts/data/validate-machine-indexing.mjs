import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const files = [
  'src/routes/api.ai.entities.ts',
  'src/routes/api.knowledge-graph.ts',
  'src/routes/llms[.]txt.ts',
];
const errors = [];

for (const file of files) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  if (!source.includes("'x-robots-tag': 'noindex, follow'")) {
    errors.push(`${file} must remain accessible but excluded from search-result indexing.`);
  }
}

const llmsSource = fs.readFileSync(path.join(root, 'src/routes/llms[.]txt.ts'), 'utf8');
const graphApiSource = fs.readFileSync(path.join(root, 'src/routes/api.knowledge-graph.ts'), 'utf8');
const aiApiSource = fs.readFileSync(path.join(root, 'src/routes/api.ai.entities.ts'), 'utf8');
const citationMagnetsSource = fs.readFileSync(path.join(root, 'public/citation-magnets.json'), 'utf8');
const citationGuideSource = fs.readFileSync(path.join(root, 'src/routes/citation-guide.tsx'), 'utf8');
const robotsSource = fs.readFileSync(path.join(root, 'public/robots.txt'), 'utf8');
const rootRouteSource = fs.readFileSync(path.join(root, 'src/routes/__root.tsx'), 'utf8');
const articleRouteSource = fs.readFileSync(path.join(root, 'src/routes/article.$slug.tsx'), 'utf8');
const requiredDiscoveryTargets = [
  '/api/knowledge-graph',
  '/api/ai/entities',
  '/texas-data',
  '/browse/counties',
  '/browse/cities',
  '/decide/financial-tools',
  '/learn/property-taxes',
  '/explore',
  '/explore/lakes-rivers',
  '/explore/state-parks',
  '/explore/national-parks',
  '/explore/major-springs',
  '/explore/caverns',
  '/explore/beaches-coast',
  '/explore/historic-sites',
  '/explore/road-trips',
  '/explore/small-towns',
  '/explore/food-bbq',
  '/explore/outdoors',
  '/explore/region/hill-country',
  '/explore/region/gulf-coast',
  '/explore/region/big-bend',
  '/explore/region/panhandle',
  '/explore/region/piney-woods',
  '/explore/region/prairies-lakes',
  '/explore/region/south-texas',
  '/sports',
  '/sports-venues',
  '/sports-venues/dallas-fort-worth',
  '/sports-venues/houston',
  '/sports-venues/football',
  '/sports-venues/motorsports',
  '/sitemap.xml',
  '/sitemap-explore.xml',
];

for (const target of requiredDiscoveryTargets) {
  if (!llmsSource.includes(`https://texasdefined.com${target}`)) {
    errors.push(`llms.txt must advertise ${target}.`);
  }
}

for (const feature of [
  'Publisher entity: https://texasdefined.com/#organization',
  'Canonical contributor profiles use https://texasdefined.com/authors/{author-id}',
  'sourceConfidence',
  'reviewDueAt',
  'Missing fields are omitted rather than inferred',
  'calculator outputs as illustrative planning estimates',
  'official venue or event sources as controlling for current schedules, parking, ticketing, gate times and entry policies',
]) {
  if (!llmsSource.includes(feature)) errors.push(`llms.txt machine guidance missing: ${feature}`);
}

for (const feature of [
  'canonicalEntityId:',
  'verification: {',
  'confidence: entity.sourceConfidence',
  'checkedAt: entity.sourceCheckedAt ?? null',
  'reviewDueAt: entity.reviewDueAt ?? null',
  'officialSourceUrl: entity.officialUrl ?? null',
  'publisher: `${siteUrl}/#organization`',
]) {
  if (!graphApiSource.includes(feature)) errors.push(`Knowledge graph provenance contract missing: ${feature}`);
}

for (const feature of [
  'publisher: { \'@id\': organizationId }',
  'additionalProperty: provenanceProperties(entity)',
  "name: 'sourceConfidence'",
  "name: 'sourceCheckedAt'",
  "name: 'reviewDueAt'",
  'subjectOf: { \'@type\': \'Dataset\'',
  "url: `${siteUrl}${canonicalEntityPath(item)}`",
  "import { applyCurrentEntityCorrections } from '@/data/knowledge-graph/current-entity-corrections'",
  '(await loadTexasKnowledgeGraph()).map(applyCurrentEntityCorrections)',
  'applyCurrentEntityCorrections(resolved)',
  'searchCorrectedGraph(graph, q, limit)',
  "if (kind === 'sports-venue') return 'SportsActivityLocation'",
  'entity.aliases.some((alias) => alias.toLowerCase() === normalized)',
]) {
  if (!aiApiSource.includes(feature)) errors.push(`AI entity provenance/current-sports contract missing: ${feature}`);
}

if (aiApiSource.includes('searchCompleteTexasKnowledgeGraph')) {
  errors.push('AI entity search must score the corrected graph so current venue names and aliases such as Galaxy Stadium remain searchable.');
}

let citationIndex;
try {
  citationIndex = JSON.parse(citationMagnetsSource);
} catch (error) {
  errors.push(`citation-magnets.json must remain valid JSON: ${error instanceof Error ? error.message : String(error)}`);
}

if (citationIndex) {
  if (citationIndex.asOf !== '2026-08-19') errors.push('citation-magnets.json must carry the current 2026-08-19 asOf date.');
  const citationUrls = new Set((citationIndex.resources ?? []).map((resource) => resource.url));
  for (const url of [
    'https://texasdefined.com/sports-venues',
    'https://texasdefined.com/sports-venues/dallas-fort-worth',
    'https://texasdefined.com/sports-venues/houston',
    'https://texasdefined.com/sports-venues/football',
    'https://texasdefined.com/sports-venues/motorsports',
    'https://texasdefined.com/sports-venues/high-school-football',
  ]) {
    if (!citationUrls.has(url)) errors.push(`Machine-readable citation index is missing sports resource ${url}.`);
  }
  for (const url of [
    'https://texasdefined.com/things-unique-to-texas',
    'https://texasdefined.com/things-unique-to-texas/methodology',
    'https://texasdefined.com/texas-food-trail',
    'https://texasdefined.com/texas-roadside-oddities',
    'https://texasdefined.com/texas-slang-explained',
    'https://texasdefined.com/texas-dance-halls-honky-tonks',
    'https://texasdefined.com/texas-homecoming-mums',
    'https://texasdefined.com/texas-natural-wonders-bucket-list',
    'https://texasdefined.com/german-czech-texas-towns',
  ]) {
    if (!citationUrls.has(url)) errors.push(`Machine-readable citation index is missing Texas culture resource ${url}.`);
  }
  const sportsResources = (citationIndex.resources ?? []).filter((resource) => resource.url.includes('/sports-venues'));
  for (const resource of sportsResources) {
    for (const trustMarker of ['official-sources', 'answer-layer', 'event-day-caveat']) {
      if (!resource.trust?.includes(trustMarker)) errors.push(`${resource.url} citation resource is missing ${trustMarker} trust guidance.`);
    }
  }
}

for (const feature of [
  'travel and sports reference pages',
  "title: 'Sports & game-day travel'",
  "['Texas sports venues', '/sports-venues']",
  "['Dallas–Fort Worth sports venues', '/sports-venues/dallas-fort-worth']",
  "['Texas football stadiums', '/sports-venues/football']",
  "['Texas motorsports venues', '/sports-venues/motorsports']",
  'venue, event organizer or public dataset',
  'event schedules, ticketing, parking, gate times or venue-entry rules',
  '<Link to="/sports-venues"',
]) {
  if (!citationGuideSource.includes(feature)) errors.push(`Human citation guide is missing sports source-precedence/discovery contract: ${feature}`);
}

const adminBlocks = robotsSource.match(/^Disallow: \/admin$/gm) ?? [];
if (adminBlocks.length !== 5) {
  errors.push('robots.txt must block the admin root for every declared crawler group.');
}

for (const crawler of [
  'Googlebot',
  'Googlebot-Image',
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
]) {
  if (!robotsSource.includes(`User-agent: ${crawler}`)) {
    errors.push(`robots.txt must explicitly allow discovery crawler ${crawler}.`);
  }
}

for (const sitemap of ['https://texasdefined.com/sitemap.xml', 'https://texasdefined.com/sitemap-explore.xml']) {
  if (!robotsSource.includes(`Sitemap: ${sitemap}`)) errors.push(`robots.txt must advertise ${sitemap}.`);
}

for (const feature of [
  '"@type": "Organization"',
  '"@id": `${siteUrl}/#organization`',
  'alternateName: "TexasDefined"',
  '"@type": "ImageObject"',
  '"@id": `${siteUrl}/#logo`',
  'knowsAbout:',
  '"Texas sports"',
  '"Texas sports venues"',
  '"@type": "WebSite"',
  'inLanguage: texasDefinedBrand.identity.locale',
  'publisher: { "@id": `${siteUrl}/#organization` }',
  '"@type": "EntryPoint"',
  'urlTemplate: `${siteUrl}/search?q={search_term_string}`',
]) {
  if (!rootRouteSource.includes(feature)) errors.push(`Root structured data contract missing: ${feature}`);
}

for (const feature of [
  '"@type": "Article"',
  '"@type": "WebPage"',
  '"@type": "BreadcrumbList"',
  'representativeOfPage: true',
  'contentUrl: imageUrl',
  'wordCount: wordCount(fullText)',
  'thumbnailUrl: imageUrl',
  'inLanguage: texasDefinedBrand.identity.locale',
  'parentOrganization: { "@id": `${siteUrl}/#organization` }',
  'publisher: { "@id": `${siteUrl}/#organization` }',
  'about: mentions.slice(0, 8)',
  'mentions: mentions.map',
]) {
  if (!articleRouteSource.includes(feature)) errors.push(`Article structured data contract missing: ${feature}`);
}

if (articleRouteSource.includes('dateModified: article.publishedAt')) {
  errors.push('Article schema must not fabricate dateModified from datePublished.');
}

if (errors.length) {
  console.error('TexasDefined machine-indexing validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('TexasDefined machine endpoints, provenance, current sports identity/schema, human and machine citation resources, robots policy, AI discovery guidance, and core Organization/WebSite/Article schema contracts are protected.');
