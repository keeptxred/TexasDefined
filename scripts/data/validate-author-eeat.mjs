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
const editorialPolicy = fs.readFileSync('src/routes/editorial-policy.tsx', 'utf8');
const correctionsPolicy = fs.readFileSync('src/routes/corrections-policy.tsx', 'utf8');
const sourcingMethodology = fs.readFileSync('src/routes/sourcing-methodology.tsx', 'utf8');
const rootRoute = fs.readFileSync('src/routes/__root.tsx', 'utf8');
const footer = fs.readFileSync('src/components/layout/Footer.tsx', 'utf8');

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
  'Texas Defined History & Heritage Desk',
  'HOMES_LAND_EDITORIAL_DESK_ID',
  'HISTORY_HERITAGE_EDITORIAL_DESK_ID',
  'official agencies, extension services and other primary sources',
  'primary records and accountable institutional sources',
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
  'HISTORY_HERITAGE_CATEGORIES',
  '"texas-history"',
  'return "a-dell"',
  'return "a-marisol"',
  'return HISTORY_HERITAGE_EDITORIAL_DESK_ID',
  'normalizeArticleEditorialDesk',
  '!LEGACY_EDITORIAL_DESK_IDS.has(article.authorId)',
]) {
  if (!deskRouting.includes(feature)) failures.push(`Institutional desk routing contract missing: ${feature}`);
}

if (deskRouting.includes('"property-taxes"')) {
  failures.push('Editorial desk routing references the non-canonical property-taxes article category.');
}

for (const feature of [
  'normalizeArticleEditorialDesk(article)',
  'normalizedArticle.authorId === article.authorId',
  '{ ...normalizedArticle, hero, body }',
]) {
  if (!delivery.includes(feature)) failures.push(`Central editorial desk delivery normalization missing: ${feature}`);
}
if (delivery.includes('article.category === "property-taxes"') || delivery.includes('HOMES_LAND_EDITORIAL_DESK_ID')) {
  failures.push('Editorial delivery must not duplicate category-to-desk routing or reference non-canonical article categories.');
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

for (const feature of [
  'publishingPrinciples: `${siteUrl}/editorial-policy`',
  'aria-label="Editorial standards"',
  'href="/editorial-policy"',
  'href="/sourcing-methodology"',
  'href="/corrections-policy"',
]) {
  if (!articleRoute.includes(feature)) failures.push(`Article-level provenance signal missing: ${feature}`);
}
if (articleRoute.includes('"property-taxes"')) {
  failures.push('Article presentation logic references the non-canonical property-taxes article category.');
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
  '/editorial-policy',
  '/sourcing-methodology',
  '/corrections-policy',
  'to="/partner-with-us"',
]) {
  if (!about.includes(signal)) failures.push(`About-page editorial accountability signal missing: ${signal}.`);
}

for (const [name, source, required] of [
  ['Editorial Policy', editorialPolicy, [
    'Editorial ownership and independence',
    'Bylines and editorial desks',
    'Sourcing and verification',
    'Dates, updates and review context',
    'Guidance is not official authority',
    'Automated and software-assisted workflows',
    'Commercial relationships',
    '/corrections-policy',
    '/sourcing-methodology',
  ]],
  ['Corrections Policy', correctionsPolicy, [
    'What we correct',
    'Corrections, updates and routine maintenance',
    'Time-sensitive information',
    'How to report an error',
    'What happens after a report',
    'to="/partner-with-us"',
  ]],
  ['Sourcing Methodology', sourcingMethodology, [
    'Source hierarchy',
    'Controlling and official sources',
    'Original and primary records',
    'Texas Defined synthesis and assessment',
    'Verification and date context',
    'Statistics and calculations',
  ]],
]) {
  for (const signal of required) {
    if (!source.includes(signal)) failures.push(`${name} missing required trust signal: ${signal}`);
  }
}

for (const path of ['/editorial-policy', '/sourcing-methodology', '/corrections-policy']) {
  if (!footer.includes(`href="${path}"`)) failures.push(`Global footer must expose trust route: ${path}`);
}

if (!rootRoute.includes('publishingPrinciples: `${siteUrl}/editorial-policy`')) {
  failures.push('Publisher Organization schema must point publishingPrinciples to the first-class Editorial Policy.');
}
if (!rootRoute.includes('contactType: "editorial, corrections and general inquiries"')) {
  failures.push('Publisher Organization contact point must describe editorial and corrections inquiries.');
}

if (articleRoute.includes('"@type": "Person"')) {
  failures.push('Article schema still presents institutional bylines as Person; convert it to Organization before remediation is complete.');
}

if (failures.length) {
  console.error('Editorial authority and byline integrity validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Institutional editorial desks, topic-aware desk routing, centralized delivery normalization, visible byline identity, article-level provenance, first-class trust policies, correction reporting, legacy fixture safety, sitemap author discovery and publisher accountability signals are protected.');
