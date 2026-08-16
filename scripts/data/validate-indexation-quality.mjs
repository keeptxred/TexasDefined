import fs from 'node:fs';

const registry = fs.readFileSync('src/lib/public-routes.ts', 'utf8');
const sitemap = fs.readFileSync('src/routes/sitemap[.]xml.ts', 'utf8');
const exploreSitemap = fs.readFileSync('src/routes/sitemap-explore[.]xml.ts', 'utf8');
const newsLayout = fs.readFileSync('src/routes/news.tsx', 'utf8');
const newsIndex = fs.readFileSync('src/routes/news.index.tsx', 'utf8');
const newsStory = fs.readFileSync('src/routes/news.$slug.tsx', 'utf8');
const entityRoute = fs.readFileSync('src/routes/$kind.$slug.tsx', 'utf8');
const countyRoute = fs.readFileSync('src/routes/property-tax.county.$county.tsx', 'utf8');
const failures = [];

const section = (name) => registry.match(new RegExp(`export const ${name} = \\[([\\s\\S]*?)\\] as const;`))?.[1] ?? '';
const always = section('INDEXABLE_STATIC_PATHS');
const conditional = section('CONDITIONAL_INDEXABLE_PUBLIC_PATHS');
const nonIndexable = section('NON_INDEXABLE_PUBLIC_PATHS');
const redirects = section('REDIRECT_ONLY_PATHS');

if (always.includes('"/news"')) failures.push('/news must not be unconditionally indexable.');
if (!conditional.includes('"/news"')) failures.push('/news must be registered as conditionally indexable.');
if (!newsIndex.includes('robots: hasStories ? undefined : "noindex, follow"')) failures.push('/news index must noindex its empty state.');
if (!newsIndex.includes('canonicalPath: "/news"') || !newsIndex.includes('canonicalLink(texasDefinedBrand, "/news")')) failures.push('/news exact index route must own the /news canonical.');
if (newsLayout.includes('canonicalPath') || newsLayout.includes('canonicalLink(') || newsLayout.includes('head:')) failures.push('/news parent layout must remain canonical-neutral so story children cannot inherit a second canonical.');
if (!newsLayout.includes('Outlet')) failures.push('/news parent route must render its exact index or story child through Outlet.');
if (!newsStory.includes('const canonicalPath = `/news/${params.slug}`') || !newsStory.includes('links: [canonicalLink(texasDefinedBrand, canonicalPath)]')) failures.push('Routed news stories must own a self-canonical.');
if (!sitemap.includes('...(articles.length ? [{ path: "/news" }] : [])')) failures.push('Primary sitemap must publish /news only when live articles exist.');

for (const path of ['/search', '/explore/search', '/shop/cart', '/shop/checkout-return']) {
  if (!nonIndexable.includes(`"${path}"`)) failures.push(`${path} must remain explicitly non-indexable.`);
  if (always.includes(`"${path}"`)) failures.push(`${path} must not be in the always-indexable registry.`);
}

for (const path of ['/tax-calculator', '/texas-financial-tools', '/texas-property-tax-increase-calculator', '/texas-property-tax-protest-guide']) {
  if (!redirects.includes(`"${path}"`)) failures.push(`${path} must remain redirect-only.`);
  if (always.includes(`"${path}"`) || conditional.includes(`"${path}"`)) failures.push(`${path} must not be indexable.`);
}

if (!entityRoute.includes('isIndexableEntityPage')) failures.push('Generic entity indexation gate missing: isIndexableEntityPage.');
if (!entityRoute.includes('robots: indexable ? undefined :') || !entityRoute.includes('noindex, follow')) {
  failures.push('Generic entity pages must emit a noindex directive when the quality gate fails.');
}
if (!countyRoute.includes('isCountyPropertyIndexReady')) failures.push('County indexation gate missing: isCountyPropertyIndexReady.');
if (!countyRoute.includes('robots: indexReady ? undefined :') || !countyRoute.includes('noindex, follow')) {
  failures.push('County pages must emit a noindex directive when the quality gate fails.');
}
for (const feature of ['graph.filter(isIndexableEntityPage)', 'COUNTY_PROPERTY_RECORDS.filter(isCountyPropertyIndexReady)']) {
  if (!sitemap.includes(feature)) failures.push(`Primary sitemap quality gate missing: ${feature}`);
}
for (const feature of ['isPrimaryTripPlannerDestination(destination)', 'auditDestination(destination).readyForIndexing']) {
  if (!exploreSitemap.includes(feature)) failures.push(`Explore sitemap destination quality gate missing: ${feature}`);
}
if (!sitemap.includes('.filter((path) => !isExploreSitemapOwnedPath(path))')) {
  failures.push('Primary sitemap must exclude Explore-owned static paths.');
}
if (!exploreSitemap.includes('!isExploreSitemapOwnedPath(normalized)')) {
  failures.push('Explore sitemap must reject paths outside its owned crawl namespace.');
}

if (failures.length) {
  console.error('Indexation quality validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log('Indexation quality validation passed: conditional hubs, routed-news canonical isolation, noindex utilities, redirects, generated-page quality gates, and sitemap ownership are aligned.');
