import './validate-explore-category-authority.mjs';
import './validate-editorial-collection-seo.mjs';
import './validate-events-seo.mjs';
import './validate-explore-landing-seo.mjs';
import './validate-moving-checklist-seo.mjs';
import './validate-practical-guides-seo.mjs';
import './validate-property-tax-guide-seo.mjs';
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const root = process.cwd();
const route = fs.readFileSync(path.join(root, 'src/routes/explore.$category.tsx'), 'utf8');
const landing = fs.readFileSync(path.join(root, 'src/routes/explore.index.tsx'), 'utf8');
const categoryPage = fs.readFileSync(path.join(root, 'src/components/editorial/CategoryPage.tsx'), 'utf8');
const collectionGrid = fs.readFileSync(path.join(root, 'src/components/editorial/DestinationCollectionGrid.tsx'), 'utf8');
const discovery = fs.readFileSync(path.join(root, 'src/components/editorial/ExploreDiscovery.tsx'), 'utf8');
const indexability = fs.readFileSync(path.join(root, 'src/data/explore-category-indexability.ts'), 'utf8');
const types = fs.readFileSync(path.join(root, 'src/data/types.ts'), 'utf8');
const fixtures = fs.readFileSync(path.join(root, 'src/data/fixtures/texas.ts'), 'utf8');
const supplemental = fs.readFileSync(path.join(root, 'src/data/explore-categories.ts'), 'utf8');
const queries = fs.readFileSync(path.join(root, 'src/data/queries.ts'), 'utf8');
const remote = fs.readFileSync(path.join(root, 'src/data/explore-remote.ts'), 'utf8');
const sitemap = fs.readFileSync(path.join(root, 'src/routes/sitemap-explore[.]xml.ts'), 'utf8');
const brand = fs.readFileSync(path.join(root, 'src/brand/texasdefined.ts'), 'utf8');
const exploreFeatureStubs = fs.readFileSync(path.join(root, 'src/data/fixtures/lazy-explore-feature-articles.ts'), 'utf8');
const routeFiles = fs.readdirSync(path.join(root, 'src/routes'));
const errors = [];

const EXPLORE_CATEGORY_SLUGS = [
  'lakes-rivers', 'major-springs', 'state-parks', 'national-parks', 'caverns',
  'beaches-coast', 'historic-sites', 'road-trips', 'small-towns', 'food-bbq', 'outdoors',
];
const EXPLORE_CATEGORY_SET = new Set(EXPLORE_CATEGORY_SLUGS);
const ARTICLE_COUNT_CAP = 3;

function resolveLocalModule(fromFile, specifier) {
  if (!specifier.startsWith('.')) return null;
  const base = path.resolve(path.dirname(fromFile), specifier);
  for (const candidate of [base, `${base}.ts`, `${base}.tsx`, path.join(base, 'index.ts'), path.join(base, 'index.tsx')]) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate;
  }
  return null;
}

function parseSourceFile(filename) {
  return ts.createSourceFile(filename, fs.readFileSync(filename, 'utf8'), ts.ScriptTarget.Latest, true, filename.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
}

function unwrapExpression(expression) {
  let current = expression;
  while (ts.isParenthesizedExpression(current) || ts.isAsExpression(current) || ts.isTypeAssertionExpression(current) || ts.isSatisfiesExpression(current)) current = current.expression;
  return current;
}

function propertyNameText(name) {
  return ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNoSubstitutionTemplateLiteral(name) ? name.text : null;
}

function objectStringProperty(object, name) {
  for (const property of object.properties) {
    if (!ts.isPropertyAssignment(property) || propertyNameText(property.name) !== name) continue;
    const initializer = unwrapExpression(property.initializer);
    if (ts.isStringLiteral(initializer) || ts.isNoSubstitutionTemplateLiteral(initializer)) return initializer.text;
  }
  return null;
}

function importedModules(filename) {
  const sourceFile = parseSourceFile(filename);
  const modules = new Set();
  const walk = (node) => {
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
      const resolved = resolveLocalModule(filename, node.moduleSpecifier.text);
      if (resolved) modules.add(resolved);
    }
    if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword && node.arguments.length === 1 && ts.isStringLiteral(node.arguments[0])) {
      const resolved = resolveLocalModule(filename, node.arguments[0].text);
      if (resolved) modules.add(resolved);
    }
    ts.forEachChild(node, walk);
  };
  walk(sourceFile);
  return [...modules];
}

function canonicalArticleRoots() {
  const filename = path.join(root, 'src/data/fixtures/repositories.ts');
  const sourceFile = parseSourceFile(filename);
  const roots = new Set();
  const walk = (node) => {
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier) && node.importClause?.namedBindings && ts.isNamedImports(node.importClause.namedBindings)) {
      const importsArticleStubs = node.importClause.namedBindings.elements.some((element) => element.name.text.endsWith('Stubs'));
      if (importsArticleStubs) {
        const resolved = resolveLocalModule(filename, node.moduleSpecifier.text);
        if (resolved) roots.add(resolved);
      }
    }
    if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword && node.arguments.length === 1 && ts.isStringLiteral(node.arguments[0])) {
      const resolved = resolveLocalModule(filename, node.arguments[0].text);
      if (resolved) roots.add(resolved);
    }
    ts.forEachChild(node, walk);
  };
  walk(sourceFile);
  return [...roots];
}

function deriveCanonicalExploreArticleCounts() {
  const visited = new Set();
  const articles = new Map();
  const dataRoot = `${path.join(root, 'src/data')}${path.sep}`;

  const visit = (filename) => {
    if (visited.has(filename) || !filename.startsWith(dataRoot)) return;
    visited.add(filename);
    const sourceFile = parseSourceFile(filename);
    const walk = (node) => {
      if (ts.isObjectLiteralExpression(node)) {
        const brandId = objectStringProperty(node, 'brandId');
        const slug = objectStringProperty(node, 'slug');
        const category = objectStringProperty(node, 'category');
        const title = objectStringProperty(node, 'title');
        if (brandId === 'texasdefined' && slug && category && title) {
          const prior = articles.get(slug);
          if (prior && prior !== category) errors.push(`Canonical article ${slug} has conflicting categories: ${prior} and ${category}.`);
          articles.set(slug, category);
        }
      }
      ts.forEachChild(node, walk);
    };
    walk(sourceFile);
    for (const imported of importedModules(filename)) visit(imported);
  };

  const roots = canonicalArticleRoots();
  if (roots.length < 8) errors.push(`Canonical fixture repository exposed only ${roots.length} article source roots; expected the editorial article graph.`);
  for (const filename of roots) visit(filename);

  const counts = new Map(EXPLORE_CATEGORY_SLUGS.map((slug) => [slug, 0]));
  for (const category of articles.values()) {
    if (EXPLORE_CATEGORY_SET.has(category)) counts.set(category, (counts.get(category) ?? 0) + 1);
  }
  return counts;
}

function sitemapArticleCounts() {
  const block = sitemap.match(/const EXPLORE_CATEGORY_ARTICLE_COUNTS = \{([\s\S]*?)\}\s+as const;/)?.[1] ?? '';
  const counts = new Map();
  for (const match of block.matchAll(/^\s*"([^"]+)":\s*(\d+),?\s*$/gm)) counts.set(match[1], Number(match[2]));
  return counts;
}

for (const feature of [
  '"@type": "CollectionPage"',
  '"@type": "ItemList"',
  '"@type": "BreadcrumbList"',
  'numberOfItems: itemListElement.length',
  'articlesQuery({ category: category.slug })',
  'destinationsQuery({ category: category.slug })',
  '`${siteUrl}/article/${article.slug}`',
  '`${siteUrl}/destination/${destination.slug}`',
  'absoluteUrl(texasDefinedBrand, article.hero.src)',
  'absoluteUrl(texasDefinedBrand, destination.hero.src)',
  'isPartOf: { "@id": `${siteUrl}/#website` }',
  'isExploreCategoryIndexReady(',
  'loaderData.articles.length + loaderData.destinations.length + featuredCollectionItems.length',
  '"noindex, follow, max-image-preview:large"',
]) {
  if (!route.includes(feature)) errors.push(`Explore category SEO feature missing: ${feature}.`);
}

for (const feature of [
  'MIN_EXPLORE_CATEGORY_INDEX_ITEMS = 3',
  'itemCount: number',
  'itemCount >= MIN_EXPLORE_CATEGORY_INDEX_ITEMS',
  'STAGED_EXPLORE_CATEGORY_SLUGS.has(category)',
]) {
  if (!indexability.includes(feature)) errors.push(`Explore category indexability guard missing: ${feature}.`);
}

const derivedCounts = deriveCanonicalExploreArticleCounts();
const checkedInCounts = sitemapArticleCounts();
for (const slug of EXPLORE_CATEGORY_SLUGS) {
  const actual = derivedCounts.get(slug) ?? 0;
  const expected = Math.min(actual, ARTICLE_COUNT_CAP);
  const checkedIn = checkedInCounts.get(slug);
  if (checkedIn !== expected) errors.push(`Explore sitemap article-count drift for ${slug}: checked in ${checkedIn ?? 'missing'}, expected ${expected} (canonical inventory has ${actual}).`);
}
for (const slug of checkedInCounts.keys()) {
  if (!EXPLORE_CATEGORY_SET.has(slug)) errors.push(`Explore sitemap article-count table contains non-Explore category: ${slug}.`);
}

if (sitemap.includes('@/data/index') || sitemap.includes('platform.articles') || sitemap.includes('explore-category-inventory') || sitemap.includes('createServerFn')) {
  errors.push('Explore sitemap must not pull the article platform or server-function inventory into its route graph.');
}
const genericTagArchiveRoute = routeFiles.find((file) => /(^|\.)tags?\.\$[^.]+/.test(file));
if (genericTagArchiveRoute) errors.push(`Generic tag archive route must not be introduced without an explicit indexability policy: ${genericTagArchiveRoute}.`);

for (const feature of [
  'aria-label="Breadcrumb"', '<Link to="/"', '<Link to="/explore"', 'aria-current="page"', 'ExploreDiscovery', 'DestinationCollectionGrid', 'categoriesQuery()', 'destinations.length.toLocaleString',
]) {
  if (!categoryPage.includes(feature)) errors.push(`Visible Explore category feature missing: ${feature}.`);
}

for (const feature of [
  'const PAGE_SIZE = 24', 'const filtered = useMemo', 'const visible = filtered.slice(0, visibleCount)', 'const remaining = Math.max(0, filtered.length - visible.length)',
  'onClick={() => setVisibleCount((count) => Math.min(count + PAGE_SIZE, filtered.length))}', 'remaining > 0', 'visible.length.toLocaleString("en-US")', 'filtered.length.toLocaleString("en-US")', '<DestinationCard',
  'value={query}', 'value={region}', 'value={activity}', 'value={sort}',
]) {
  if (!collectionGrid.includes(feature)) errors.push(`Destination collection rendering feature missing: ${feature}.`);
}

for (const feature of [
  'const EXPLORE_DEPARTMENTS = new Set<CategorySlug>', 'item.slug !== currentCategory', 'EXPLORE_DEPARTMENTS.has(item.slug)', 'aria-label="More ways to explore Texas"',
  'aria-label="Choose a part of Texas"', 'relatedCategories.map', 'regions.map', 'to="/explore/$category"', 'to="/explore/region/$region"',
]) {
  if (!discovery.includes(feature)) errors.push(`Explore discovery feature missing: ${feature}.`);
}

const migratedCategories = ['major-springs', 'national-parks', 'caverns', 'beaches-coast', 'historic-sites'];
for (const category of migratedCategories) {
  if (!types.includes(`| "${category}"`)) errors.push(`Category type missing: ${category}.`);
  if (!supplemental.includes(`slug: "${category}"`) && !fixtures.includes(`slug: "${category}"`)) errors.push(`Category metadata missing: ${category}.`);
  if (!landing.includes(`"${category}"`)) errors.push(`Explore landing category missing: ${category}.`);
  if (!brand.includes(`/explore/${category}`)) errors.push(`Explore navigation link missing: ${category}.`);
}

for (const feature of ['supplementalExploreCategories', 'const merged = new Map', 'return [...merged.values()]']) {
  if (!queries.includes(feature)) errors.push(`Merged Explore taxonomy feature missing: ${feature}.`);
}

for (const feature of [
  'supplementalExploreCategories', 'EXPLORE_CATEGORY_ARTICLE_COUNTS', 'isExploreCategoryIndexReady(',
  'EXPLORE_CATEGORY_ARTICLE_COUNTS[slug as keyof typeof EXPLORE_CATEGORY_ARTICLE_COUNTS]',
  'destinations.filter((destination) => destination.category === slug).length', '(slug === "food-bbq" ? 1 : 0)',
  'categorySlugs.map((slug)', 'new Map(destinations.filter((item) => item.slug)', 'isPrimaryTripPlannerDestination(destination)',
  'auditDestination(destination).readyForIndexing', '.map((item) => entry(`/destination/${item.slug}`',
]) {
  if (!sitemap.includes(feature)) errors.push(`Explore sitemap feature missing: ${feature}.`);
}

for (const feature of [
  'return "major-springs"', 'return "national-parks"', 'return "caverns"', 'return "beaches-coast"', 'return "historic-sites"', '"lighthouse"', '"wildlife_refuge"',
  '"wildlife_management_area"', 'return "outdoors"', 'explore_entity_types(key,name)', 'MAX_REMOTE_DESTINATIONS',
]) {
  if (!remote.includes(feature)) errors.push(`Migrated Explore catalog feature missing: ${feature}.`);
}

for (const feature of ['readingMinutes: 4', 'function estimateReadingMinutes(article: Article): number', 'Math.max(3, Math.ceil(words / 200))', 'readingMinutes: estimateReadingMinutes(article)']) {
  if (!exploreFeatureStubs.includes(feature)) errors.push(`Explore feature reading-time contract missing: ${feature}.`);
}
if (exploreFeatureStubs.includes('readingMinutes: 1,')) errors.push('Explore feature catalog must not advertise substantive feature guides as one-minute reads.');

if (errors.length) {
  console.error('Explore category SEO validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Explore categories, sparse-archive indexability, tag-archive governance, canonical article-count drift protection, classification, filterable collections, taxonomy, navigation, dedicated quality-gated sitemap, related links, regions, structured data, breadcrumbs, and body-derived feature reading times passed validation.');
