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
  '/sitemap.xml',
  '/sitemap-explore.xml',
];

for (const target of requiredDiscoveryTargets) {
  if (!llmsSource.includes(`https://texasdefined.com${target}`)) {
    errors.push(`llms.txt must advertise ${target}.`);
  }
}

const adminBlocks = robotsSource.match(/^Disallow: \/admin$/gm) ?? [];
if (adminBlocks.length !== 5) {
  errors.push('robots.txt must block the admin root for every declared crawler group.');
}
for (const sitemap of ['https://texasdefined.com/sitemap.xml', 'https://texasdefined.com/sitemap-explore.xml']) {
  if (!robotsSource.includes(`Sitemap: ${sitemap}`)) errors.push(`robots.txt must advertise ${sitemap}.`);
}

if (!llmsSource.includes('calculator outputs as illustrative planning estimates')) {
  errors.push('llms.txt must preserve calculator retrieval guidance.');
}

for (const feature of [
  '"@type": "Organization"',
  '"@id": `${siteUrl}/#organization`',
  'alternateName: "TexasDefined"',
  '"@type": "ImageObject"',
  '"@id": `${siteUrl}/#logo`',
  'knowsAbout:',
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
  'affiliation: { "@id": `${siteUrl}/#organization` }',
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

console.log('TexasDefined machine endpoints, robots policy, AI discovery guidance, and core Organization/WebSite/Article schema contracts are protected.');
