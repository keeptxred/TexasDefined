import fs from 'node:fs';

const failures = [];
const authorRoute = fs.readFileSync('src/routes/authors.$author.tsx', 'utf8');
const articleRoute = fs.readFileSync('src/routes/article.$slug.tsx', 'utf8');
const articleBody = fs.readFileSync('src/components/editorial/ArticleBody.tsx', 'utf8');
const sitemap = fs.readFileSync('src/routes/sitemap[.]xml.ts', 'utf8');
const aboutEager = fs.readFileSync('src/routes/about.tsx', 'utf8');
const aboutLazy = fs.existsSync('src/routes/about.lazy.tsx') ? fs.readFileSync('src/routes/about.lazy.tsx', 'utf8') : '';
const about = `${aboutEager}\n${aboutLazy}`;
const desks = fs.readFileSync('src/data/editorial-desks.ts', 'utf8');
const deskRouting = fs.readFileSync('src/data/editorial-desk-routing.ts', 'utf8');
const delivery = fs.readFileSync('src/lib/editorial-image-delivery.ts', 'utf8');
const legacyFixture = fs.readFileSync('src/data/fixtures/texas.ts', 'utf8');

for (const feature of [
  'createFileRoute("/authors/$author")',
  '"@type": "ProfilePage"',
  '"@type": "Organization"',
  'parentOrganization: { "@id": `${siteUrl}/#organization` }',
  'articles.filter((article) => article.authorId === author.id)',
  'Stories from ${author.name}',
  'ArticleCard article={article}',
]) {
  if (!authorRoute.includes(feature)) failures.push(`Editorial desk profile contract missing: ${feature}`);
}

for (const forbidden of [
  '"@type": "Person"',
  'worksFor: { "@id": `${siteUrl}/#organization` }',
  'affiliation: { "@id": `${siteUrl}/#organization` }',
]) {
  if (authorRoute.includes(forbidden)) failures.push(`Editorial desk page must not present a desk as a person: ${forbidden}`);
}

for (const feature of [
  'Texas Defined Editorial Desk',
  'Texas Defined Food & Culture Desk',
  'Texas Defined Travel & Outdoors Desk',
  'Texas Defined Homes & Land Desk',
  'HOMES_LAND_EDITORIAL_DESK_ID',
  'official agencies, extension services and other primary sources',
  'not a substitute for licensed legal, insurance, engineering or trade advice',
  'DEFAULT_EDITORIAL_DESK_ID',
]) {
  if (!desks.includes(feature)) failures.push(`Institutional byline registry missing: ${feature}`);
}

for (const feature of [
  'LEGACY_EDITORIAL_DESK_IDS',
  'HOMES_LAND_CATEGORIES',
  'TRAVEL_OUTDOORS_CATEGORIES',
  'FOOD_CULTURE_CATEGORIES',
  '"property-taxes"',
  'return "a-dell"',
  'return "a-marisol"',
  'normalizeArticleEditorialDesk',
  '!LEGACY_EDITORIAL_DESK_IDS.has(article.authorId)',
]) {
  if (!deskRouting.includes(feature)) failures.push(`Institutional desk routing contract missing: ${feature}`);
}

for (const feature of [
  'HOMES_LAND_EDITORIAL_DESK_ID',
  'article.category === "home-garden"',
  'article.category === "real-estate"',
  'article.category === "property-taxes"',
  'normalizeArticleEditorialDesk(article)',
  '{ ...article, authorId, hero, body }',
]) {
  if (!delivery.includes(feature)) failures.push(`Editorial desk delivery assignment missing: ${feature}`);
}

for (const forbiddenName of ['Hollis Rains', 'Marisol Vega', 'Dell Whitaker']) {
  if (desks.includes(forbiddenName)) failures.push(`Fictional contributor must not be present in the live desk registry: ${forbiddenName}`);
  if (legacyFixture.includes(forbiddenName)) failures.push(`Fictional contributor must not remain in legacy fixture data: ${forbiddenName}`);
}

for (const requiredDeskName of [
  'Texas Defined Editorial Desk',
  'Texas Defined Food & Culture Desk',
  'Texas Defined Travel & Outdoors Desk',
]) {
  if (!legacyFixture.includes(requiredDeskName)) failures.push(`Legacy fixture must resolve legacy byline IDs to an institutional desk: ${requiredDeskName}`);
}

for (const feature of [
  'to="/authors/$author"',
  'params={{ author: author.id }}',
]) {
  if (!articleBody.includes(feature)) failures.push(`Byline profile link missing: ${feature}`);
}

if (!sitemap.includes('platform.taxonomy.authors(scope)')) failures.push('Primary sitemap must load editorial bylines.');
if (!sitemap.includes('...authors.map((author) => ({ path: `/authors/${author.id}` }))')) failures.push('Primary sitemap must publish editorial desk profiles.');

for (const signal of [
  'Visible bylines',
  'institutional desk names are not presented as fictional people',
  'Sources and official records',
  'Corrections and updates',
  'Clear separation of guidance',
  'To report a factual error or request a correction',
  'to="/partner-with-us"',
]) {
  if (!about.includes(signal)) failures.push(`About-page editorial accountability signal missing: ${signal}.`);
}

if (articleRoute.includes('"@type": "Person"')) {
  failures.push('Article schema still presents institutional bylines as Person; convert it to Organization before remediation is complete.');
}

if (failures.length) {
  console.error('Editorial byline integrity validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Institutional editorial desks, topic-aware desk routing, visible byline identity, correction reporting, legacy fixture safety, sitemap discovery and editorial accountability signals are protected.');
