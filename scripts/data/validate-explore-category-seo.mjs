import './validate-editorial-collection-seo.mjs';
import './validate-events-seo.mjs';
import './validate-explore-landing-seo.mjs';
import './validate-moving-checklist-seo.mjs';
import './validate-practical-guides-seo.mjs';
import './validate-property-tax-guide-seo.mjs';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const route = fs.readFileSync(path.join(root, 'src/routes/explore.$category.tsx'), 'utf8');
const lazyRoute = fs.readFileSync(path.join(root, 'src/routes/explore.$category.lazy.tsx'), 'utf8');
const landing = fs.readFileSync(path.join(root, 'src/routes/explore.index.tsx'), 'utf8');
const categoryPage = fs.readFileSync(path.join(root, 'src/components/editorial/CategoryPage.tsx'), 'utf8');
const categoryAuthorityComponent = fs.readFileSync(path.join(root, 'src/components/editorial/ExploreCategoryAuthority.tsx'), 'utf8');
const categoryAuthorityClient = fs.readFileSync(path.join(root, 'src/data/explore-category-authority.ts'), 'utf8');
const categoryAuthorityServer = fs.readFileSync(path.join(root, 'src/data/explore-category-authority.server.ts'), 'utf8');
const categoryIndexability = fs.readFileSync(path.join(root, 'src/data/explore-category-indexability.ts'), 'utf8');
const collectionGrid = fs.readFileSync(path.join(root, 'src/components/editorial/DestinationCollectionGrid.tsx'), 'utf8');
const discovery = fs.readFileSync(path.join(root, 'src/components/editorial/ExploreDiscovery.tsx'), 'utf8');
const types = fs.readFileSync(path.join(root, 'src/data/types.ts'), 'utf8');
const fixtures = fs.readFileSync(path.join(root, 'src/data/fixtures/texas.ts'), 'utf8');
const supplemental = fs.readFileSync(path.join(root, 'src/data/explore-categories.ts'), 'utf8');
const queries = fs.readFileSync(path.join(root, 'src/data/queries.ts'), 'utf8');
const remote = fs.readFileSync(path.join(root, 'src/data/explore-remote.ts'), 'utf8');
const sitemap = fs.readFileSync(path.join(root, 'src/routes/sitemap-explore[.]xml.ts'), 'utf8');
const brand = fs.readFileSync(path.join(root, 'src/brand/texasdefined.ts'), 'utf8');
const exploreFeatureStubs = fs.readFileSync(path.join(root, 'src/data/fixtures/lazy-explore-feature-articles.ts'), 'utf8');
const errors = [];

for (const feature of [
  '"@type": "CollectionPage"',
  '"@type": "ItemList"',
  '"@type": "BreadcrumbList"',
  'numberOfItems: itemListElement.length',
  'articlesQuery({ category: category.slug })',
  'destinationsQuery({ category: category.slug })',
  'getExploreCategoryAuthority(category.slug)',
  'authorityGuide',
  '`${siteUrl}/article/${article.slug}`',
  '`${siteUrl}/destination/${destination.slug}`',
  'absoluteUrl(texasDefinedBrand, article.hero.src)',
  'absoluteUrl(texasDefinedBrand, destination.hero.src)',
  'isPartOf: { "@id": `${siteUrl}/#website` }',
]) {
  if (!route.includes(feature)) errors.push(`Explore category SEO feature missing: ${feature}.`);
}

for (const feature of [
  'authorityGuide',
  'authorityGuide={authorityGuide}',
  '<CategoryPage',
]) {
  if (!lazyRoute.includes(feature)) errors.push(`Explore category loader-to-view authority handoff missing: ${feature}.`);
}

for (const feature of [
  'aria-label="Breadcrumb"',
  '<Link to="/"',
  '<Link to="/explore"',
  'aria-current="page"',
  'ExploreDiscovery',
  'DestinationCollectionGrid',
  'ExploreCategoryAuthority',
  'authorityGuide?: ExploreAuthorityGuide | null',
  '<ExploreCategoryAuthority category={category} guide={authorityGuide} />',
  'categoriesQuery()',
  'destinations.length.toLocaleString',
]) {
  if (!categoryPage.includes(feature)) errors.push(`Visible Explore category feature missing: ${feature}.`);
}

for (const feature of [
  'guide: ExploreAuthorityGuide | null',
  'Texas field guide',
  'Official sources',
  'Keep exploring',
  'target="_blank"',
  '<Link to={item.href}',
]) {
  if (!categoryAuthorityComponent.includes(feature)) errors.push(`Explore category authority rendering missing: ${feature}.`);
}

for (const feature of [
  'createServerFn({ method: "GET" })',
  'await import("./explore-category-authority.server")',
  'getExploreCategoryAuthorityServer(data.category)',
]) {
  if (!categoryAuthorityClient.includes(feature)) errors.push(`Explore authority server boundary missing: ${feature}.`);
}
if (categoryAuthorityClient.includes('title: "How to explore wild Texas"') || categoryAuthorityClient.includes('title: "A practical guide to caves and caverns in Texas"')) {
  errors.push('Long-form Explore authority copy must remain server-only and out of the protected client bundle.');
}

const authorityBlock = (slug) => {
  const start = categoryAuthorityServer.indexOf(`  ${slug}: {`);
  if (start < 0) return '';
  const nextCandidates = ['\n  outdoors: {', '\n  caverns: {']
    .map((marker) => categoryAuthorityServer.indexOf(marker, start + 1))
    .filter((index) => index > start);
  const next = nextCandidates.length ? Math.min(...nextCandidates) : categoryAuthorityServer.lastIndexOf('\n};');
  return categoryAuthorityServer.slice(start, next > start ? next : categoryAuthorityServer.length);
};

const literalWordCount = (source) => {
  const literals = source.match(/"(?:\\.|[^"\\])*"/g) ?? [];
  const text = literals.map((literal) => {
    try { return JSON.parse(literal); } catch { return ''; }
  }).join(' ');
  return (text.match(/[A-Za-z0-9]+(?:['’][A-Za-z0-9]+)*/g) ?? []).length;
};

for (const slug of ['outdoors', 'caverns']) {
  const block = authorityBlock(slug);
  if (!block) {
    errors.push(`Low-value Explore remediation authority block missing: ${slug}.`);
    continue;
  }
  const words = literalWordCount(block);
  const sections = (block.match(/heading:/g) ?? []).length;
  const sources = (block.match(/url: "https:\/\//g) ?? []).length;
  const relatedLinks = (block.match(/href: "\//g) ?? []).length;
  if (words < 700) errors.push(`Explore authority guide too thin (${words} literal words; minimum 700): ${slug}.`);
  if (sections < 5) errors.push(`Explore authority guide needs at least five substantive sections (${sections}): ${slug}.`);
  if (sources < 4) errors.push(`Explore authority guide needs at least four authoritative external sources (${sources}): ${slug}.`);
  if (relatedLinks < 3) errors.push(`Explore authority guide needs at least three internal discovery links (${relatedLinks}): ${slug}.`);
}

const stagedMatch = categoryIndexability.match(/STAGED_EXPLORE_CATEGORY_SLUGS\s*=\s*new Set<CategorySlug>\(\[([\s\S]*?)\]\)/);
const stagedBody = stagedMatch?.[1] ?? '';
for (const remediated of ['outdoors', 'caverns']) {
  if (new RegExp(`["']${remediated}["']`).test(stagedBody)) {
    errors.push(`Remediated Explore category remains staged noindex after authority expansion: ${remediated}.`);
  }
}

for (const feature of [
  'const PAGE_SIZE = 24',
  'const filtered = useMemo',
  'const visible = filtered.slice(0, visibleCount)',
  'const remaining = Math.max(0, filtered.length - visible.length)',
  'onClick={() => setVisibleCount((count) => Math.min(count + PAGE_SIZE, filtered.length))}',
  'remaining > 0',
  'visible.length.toLocaleString("en-US")',
  'filtered.length.toLocaleString("en-US")',
  '<DestinationCard',
  'value={query}',
  'value={region}',
  'value={activity}',
  'value={sort}',
]) {
  if (!collectionGrid.includes(feature)) errors.push(`Destination collection rendering feature missing: ${feature}.`);
}

for (const feature of [
  'const EXPLORE_DEPARTMENTS = new Set<CategorySlug>',
  'item.slug !== currentCategory',
  'EXPLORE_DEPARTMENTS.has(item.slug)',
  'aria-label="More ways to explore Texas"',
  'aria-label="Choose a part of Texas"',
  'relatedCategories.map',
  'regions.map',
  'to="/explore/$category"',
  'to="/explore/region/$region"',
]) {
  if (!discovery.includes(feature)) errors.push(`Explore discovery feature missing: ${feature}.`);
}

const migratedCategories = ['major-springs', 'national-parks', 'caverns', 'beaches-coast', 'historic-sites'];
for (const category of migratedCategories) {
  if (!types.includes(`| "${category}"`)) errors.push(`Category type missing: ${category}.`);
  if (!supplemental.includes(`slug: "${category}"`) && !fixtures.includes(`slug: "${category}"`)) {
    errors.push(`Category metadata missing: ${category}.`);
  }
  if (!landing.includes(`"${category}"`)) errors.push(`Explore landing category missing: ${category}.`);
  if (!brand.includes(`/explore/${category}`)) errors.push(`Explore navigation link missing: ${category}.`);
}

for (const feature of [
  'supplementalExploreCategories',
  'const merged = new Map',
  'return [...merged.values()]',
]) {
  if (!queries.includes(feature)) errors.push(`Merged Explore taxonomy feature missing: ${feature}.`);
}

for (const feature of [
  'supplementalExploreCategories',
  'categorySlugs.map((slug)',
  'new Map(destinations.filter((item) => item.slug)',
  'isPrimaryTripPlannerDestination(destination)',
  'auditDestination(destination).readyForIndexing',
  '.map((item) => entry(`/destination/${item.slug}`',
]) {
  if (!sitemap.includes(feature)) errors.push(`Explore sitemap feature missing: ${feature}.`);
}

for (const feature of [
  'return "major-springs"',
  'return "national-parks"',
  'return "caverns"',
  'return "beaches-coast"',
  'return "historic-sites"',
  '"lighthouse"',
  '"wildlife_refuge"',
  '"wildlife_management_area"',
  'return "outdoors"',
  'explore_entity_types(key,name)',
  'MAX_REMOTE_DESTINATIONS',
]) {
  if (!remote.includes(feature)) errors.push(`Migrated Explore catalog feature missing: ${feature}.`);
}

for (const feature of [
  'readingMinutes: 4',
  'function estimateReadingMinutes(article: Article): number',
  'Math.max(3, Math.ceil(words / 200))',
  'readingMinutes: estimateReadingMinutes(article)',
]) {
  if (!exploreFeatureStubs.includes(feature)) errors.push(`Explore feature reading-time contract missing: ${feature}.`);
}
if (exploreFeatureStubs.includes('readingMinutes: 1,')) {
  errors.push('Explore feature catalog must not advertise substantive feature guides as one-minute reads.');
}

if (errors.length) {
  console.error('Explore category SEO validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Explore categories, including server-delivered remediated Outdoors and Caverns authority guides, retain substantive source-backed depth, internal discovery, classification, filterable collections, taxonomy, navigation, dedicated quality-gated sitemap, regions, structured data, breadcrumbs, body-derived feature reading times and the protected client-bundle boundary.');
