import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const publicRoutesPath = path.join(root, 'src', 'lib', 'public-routes.ts');
const publicRoutesSource = fs.readFileSync(publicRoutesPath, 'utf8');
const staticBlock = publicRoutesSource.match(/export const INDEXABLE_STATIC_PATHS = \[([\s\S]*?)\] as const;/)?.[1] ?? '';
const staticPaths = [...staticBlock.matchAll(/"(\/[^"]*)"/g)].map((match) => match[1]);

if (!staticPaths.length) {
  console.error('Static orphan audit failed: could not parse INDEXABLE_STATIC_PATHS.');
  process.exit(1);
}

const ignoredFiles = new Set([
  'src/lib/public-routes.ts',
  'src/routeTree.gen.ts',
]);

const sourceFiles = walk(path.join(root, 'src'))
  .filter((file) => /\.(?:ts|tsx)$/.test(file))
  .map((file) => ({
    absolute: file,
    relative: path.relative(root, file).replaceAll('\\', '/'),
    source: fs.readFileSync(file, 'utf8'),
  }))
  .filter((file) => !ignoredFiles.has(file.relative))
  .filter((file) => !/src\/routes\/sitemap.*\.tsx$/.test(file.relative));

const dynamicInbound = resolveKnownDynamicInboundPaths();
const results = staticPaths
  .filter((routePath) => routePath !== '/')
  .map((routePath) => auditPath(routePath));

const orphans = results.filter((item) => item.literalInboundFiles.length === 0 && item.directInboundFiles.length === 0);
const weak = results.filter((item) => item.literalInboundFiles.length > 0 && item.directInboundFiles.length === 0);
const healthy = results.filter((item) => item.directInboundFiles.length > 0);

console.log(`Indexable static inbound-link audit: ${results.length} routes checked; ${healthy.length} with direct/resolved-dynamic inbound links; ${weak.length} literal-only discovery candidates; ${orphans.length} zero-inbound orphan candidates.`);

if (orphans.length) {
  console.log('\nZero-inbound orphan candidates:');
  for (const item of orphans.slice(0, 100)) console.log(`- ${item.path}`);
  if (orphans.length > 100) console.log(`- … ${orphans.length - 100} more`);
}

if (weak.length) {
  console.log('\nLiteral-only / weak inbound candidates:');
  for (const item of weak.slice(0, 100)) {
    console.log(`- ${item.path} <- ${item.literalInboundFiles.slice(0, 4).join(', ')}`);
  }
  if (weak.length > 100) console.log(`- … ${weak.length - 100} more`);
}

if (process.argv.includes('--strict') && orphans.length) {
  console.error(`\nStrict orphan audit failed: ${orphans.length} indexable static routes have no resolved inbound discovery edge outside their own route surface.`);
  process.exit(1);
}

function auditPath(routePath) {
  const directInboundFiles = [...(dynamicInbound.get(routePath) ?? [])];
  const literalInboundFiles = [];
  const escaped = escapeRegExp(routePath);
  const directPattern = new RegExp(`(?:to|href)\\s*(?:=|:)\\s*[\\"'\\{]?[\\"']${escaped}(?:[?#][^\\"']*)?[\\"']`, 'm');
  const literalPattern = new RegExp(`[\\"']${escaped}(?:[?#][^\\"']*)?[\\"']`, 'm');

  for (const file of sourceFiles) {
    if (ownsRoute(file.source, routePath)) continue;
    if (directPattern.test(file.source)) directInboundFiles.push(file.relative);
    if (literalPattern.test(file.source)) literalInboundFiles.push(file.relative);
  }

  return {
    path: routePath,
    directInboundFiles: [...new Set(directInboundFiles)],
    literalInboundFiles: [...new Set(literalInboundFiles)],
  };
}

function resolveKnownDynamicInboundPaths() {
  const inbound = new Map();
  resolveTexasIconCategoryLinks(inbound);
  resolveFishingTechniqueLinks(inbound);
  resolveSportsVenueLandingLinks(inbound);
  resolveTexasResourcesTupleLinks(inbound);
  resolvePropertyTaxCalculatorTupleLinks(inbound);
  resolveTexasDataNextStopLinks(inbound);
  return inbound;
}

function resolveTexasIconCategoryLinks(inbound) {
  const hub = readOptional('src/routes/things-unique-to-texas.lazy.tsx');
  const data = readOptional('src/data/things-unique-to-texas.ts');
  const categoryType = data.match(/export type TexasIconCategorySlug =([\s\S]*?);/)?.[1] ?? '';
  const slugs = [...categoryType.matchAll(/"([a-z0-9-]+)"/g)].map((match) => match[1]);
  const rendersDynamicLinks = hub.includes('to="/things-unique-to-texas/$category"')
    && hub.includes('params={{ category: category.slug }}');

  if (!rendersDynamicLinks) return;
  for (const slug of slugs) {
    addDynamicInbound(inbound, `/things-unique-to-texas/${slug}`, 'src/routes/things-unique-to-texas.lazy.tsx (resolved dynamic category link)');
  }
}

function resolveFishingTechniqueLinks(inbound) {
  const routing = readOptional('src/data/fishing/technique-routing.ts');
  const directory = readOptional('src/components/fishing/FishingTechniqueDirectory.tsx');
  const publishedBlock = routing.match(/export const PUBLISHED_FISHING_TECHNIQUE_PATHS = \[([\s\S]*?)\] as const/)?.[1] ?? '';
  const paths = [...publishedBlock.matchAll(/["'](\/fishing\/techniques\/[a-z0-9-]+)["']/g)].map((match) => match[1]);
  const rendersCanonicalPaths = directory.includes('href={entry.canonicalPath}');

  if (!rendersCanonicalPaths) return;
  for (const routePath of paths) {
    addDynamicInbound(inbound, routePath, 'src/components/fishing/FishingTechniqueDirectory.tsx (resolved entry.canonicalPath link)');
  }
}

function resolveSportsVenueLandingLinks(inbound) {
  const route = readOptional('src/routes/sports-venues.$landing.tsx');
  const data = readOptional('src/data/sports-venue-landings.ts');
  const slugs = [...data.matchAll(/\bslug:\s*["']([a-z0-9-]+)["']/g)].map((match) => match[1]);
  const rendersSiblingLinks = route.includes('items.map((item)')
    && route.includes('href={`/sports-venues/${item.slug}`}');

  if (!rendersSiblingLinks) return;
  for (const slug of slugs) {
    addDynamicInbound(inbound, `/sports-venues/${slug}`, 'src/routes/sports-venues.$landing.tsx (resolved sibling landing link)');
  }
}

function resolveTexasResourcesTupleLinks(inbound) {
  const route = readOptional('src/routes/texas-resources.lazy.tsx');
  const block = route.match(/const groups:[\s\S]*?= \[([\s\S]*?)\n\];/)?.[1] ?? '';
  const rendersTupleLinks = route.includes('group.links.map(([label, to])') && route.includes('to={to}');
  if (!rendersTupleLinks) return;
  addQuotedPaths(inbound, block, 'src/routes/texas-resources.lazy.tsx (resolved group.links tuple link)');
}

function resolvePropertyTaxCalculatorTupleLinks(inbound) {
  const route = readOptional('src/routes/property-tax-calculators.tsx');
  const block = route.match(/const tools = \[([\s\S]*?)\] as const;/)?.[1] ?? '';
  const rendersTupleLinks = route.includes('tools.map(([title, copy, to])') && route.includes('to={to}');
  if (!rendersTupleLinks) return;
  addQuotedPaths(inbound, block, 'src/routes/property-tax-calculators.tsx (resolved tools tuple link)');
}

function resolveTexasDataNextStopLinks(inbound) {
  const data = readOptional('src/routes/texas-data.tsx');
  const renderer = readOptional('src/routes/texas-data.lazy.tsx');
  const block = data.match(/export const nextStops = \[([\s\S]*?)\] as const;/)?.[1] ?? '';
  const rendersTupleLinks = renderer.includes('nextStops.map(([title, to, copy])') && renderer.includes('to={to}');
  if (!rendersTupleLinks) return;
  addQuotedPaths(inbound, block, 'src/routes/texas-data.lazy.tsx (resolved nextStops tuple link)');
}

function addQuotedPaths(inbound, sourceBlock, sourceLabel) {
  const paths = [...sourceBlock.matchAll(/["'](\/[a-z0-9][a-z0-9./-]*)["']/gi)].map((match) => match[1]);
  for (const routePath of paths) addDynamicInbound(inbound, routePath, sourceLabel);
}

function addDynamicInbound(inbound, routePath, source) {
  const sources = inbound.get(routePath) ?? [];
  sources.push(source);
  inbound.set(routePath, sources);
}

function ownsRoute(source, routePath) {
  const doubleQuotedLiteral = `createFileRoute("${routePath}")`;
  const singleQuotedLiteral = `createFileRoute('${routePath}')`;
  const doubleQuotedLazyLiteral = `createLazyFileRoute("${routePath}")`;
  const singleQuotedLazyLiteral = `createLazyFileRoute('${routePath}')`;
  const canonicalDoubleQuoted = `const canonicalPath = "${routePath}"`;
  const canonicalSingleQuoted = `const canonicalPath = '${routePath}'`;
  const canonicalVariableDeclaration = (source.includes(canonicalDoubleQuoted) || source.includes(canonicalSingleQuoted))
    && (source.includes('createFileRoute(canonicalPath)') || source.includes('createLazyFileRoute(canonicalPath)'));

  return source.includes(doubleQuotedLiteral)
    || source.includes(singleQuotedLiteral)
    || source.includes(doubleQuotedLazyLiteral)
    || source.includes(singleQuotedLazyLiteral)
    || canonicalVariableDeclaration;
}

function readOptional(relative) {
  const absolute = path.join(root, relative);
  return fs.existsSync(absolute) ? fs.readFileSync(absolute, 'utf8') : '';
}

function walk(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(absolute) : [absolute];
  });
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
