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

for (const feature of [
  'Publisher entity: https://texasdefined.com/#organization',
  'Canonical contributor profiles use https://texasdefined.com/authors/{author-id}',
  'sourceConfidence',
  'reviewDueAt',
  'Missing fields are omitted rather than inferred',
  'calculator outputs as illustrative planning estimates',
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
]) {
  if (!aiApiSource.includes(feature)) errors.push(`AI entity provenance contract missing: ${feature}`);
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

console.log('TexasDefined machine endpoints, provenance, canonical identity, robots policy, AI discovery guidance, and core Organization/WebSite/Article schema contracts are protected.');
