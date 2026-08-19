import fs from 'node:fs';
import path from 'node:path';

const routeTree = fs.readFileSync('src/routeTree.gen.ts', 'utf8');
const registry = fs.readFileSync('src/lib/public-routes.ts', 'utf8');
const failures = [];

const extractArray = (name) => {
  const match = registry.match(new RegExp(`export const ${name} = \\[([\\s\\S]*?)\\] as const;`));
  if (!match) {
    failures.push(`Public-route registry is missing ${name}.`);
    return [];
  }
  return [...match[1].matchAll(/["'](\/[^"']*)["']/g)].map((entry) => entry[1]);
};

const indexable = extractArray('INDEXABLE_STATIC_PATHS');
const conditional = extractArray('CONDITIONAL_INDEXABLE_PUBLIC_PATHS');
const explicitRedirects = extractArray('REDIRECT_ONLY_PATHS');
const nonIndexable = extractArray('NON_INDEXABLE_PUBLIC_PATHS');
const nestedAdminChildPaths = new Set([
  '/platform-health', '/knowledge-graph-behavior', '/internal-link-tests', '/internal-link-rollback', '/governance-health', '/entity-maintenance', '/entity-import-review',
]);
const nestedShopChildPaths = new Set(['/cart', '/checkout-return']);
const normalize = (value) => value === '/' ? value : value.replace(/\/$/, '');
const shouldCountPublicRoute = (routePath) => routePath.startsWith('/') && !routePath.includes('$') && !routePath.startsWith('/api/') && !routePath.startsWith('/admin') && !nestedAdminChildPaths.has(routePath) && !nestedShopChildPaths.has(routePath) && !routePath.endsWith('.xml') && !routePath.endsWith('.txt');
const routePatternMatches = (concretePath, routePattern) => {
  const concreteSegments = normalize(concretePath).split('/').filter(Boolean);
  const patternSegments = normalize(routePattern).split('/').filter(Boolean);
  if (concreteSegments.length !== patternSegments.length) return false;
  return patternSegments.every((segment, index) => segment.startsWith('$') ? concreteSegments[index].length > 0 : segment === concreteSegments[index]);
};
const sourceRoots = ['src/routes', 'src/components', 'src/data'];
const sourceFiles = [];
const collect = (directory) => { for (const entry of fs.readdirSync(directory, { withFileTypes: true })) { const fullPath = path.join(directory, entry.name); if (entry.isDirectory()) collect(fullPath); else if (/\.(?:ts|tsx)$/.test(entry.name)) sourceFiles.push(fullPath); } };
for (const root of sourceRoots) collect(root);
const sourceByFile = new Map(sourceFiles.map((file) => [file, fs.readFileSync(file, 'utf8')]));
const sourceRouteEntries = [...sourceByFile.entries()].flatMap(([file, source]) => {
  const entries = [...source.matchAll(/createFileRoute\(["']([^"']+)["']\)/g)].map((match) => ({ file, source, path: normalize(match[1]) }));
  const canonicalPath = source.match(/\bconst\s+canonicalPath\s*=\s*["']([^"']+)["']/)?.[1];
  if (canonicalPath && /createFileRoute\(canonicalPath\)/.test(source)) entries.push({ file, source, path: normalize(canonicalPath) });
  return entries;
});

const isVerifiedPermanentRedirectEntry = (entry) => shouldCountPublicRoute(entry.path)
  && /\bredirect\s*\(/.test(entry.source)
  && entry.source.includes('statusCode: 301');
const derivedRedirects = sourceRouteEntries.filter(isVerifiedPermanentRedirectEntry).map((entry) => entry.path);
for (const routePath of derivedRedirects) {
  if (!explicitRedirects.includes(routePath)) failures.push(`Permanent public redirect must be explicitly registered in REDIRECT_ONLY_PATHS so sitemap policy can exclude it: ${routePath}.`);
}
const redirects = [...new Set([...explicitRedirects, ...derivedRedirects])];
const classified = new Set([...indexable, ...conditional, ...redirects, ...nonIndexable]);

const registeredStaticPublicPaths = new Set([...routeTree.matchAll(/\bpath:\s*'([^']+)'/g)].map((match) => normalize(match[1])).filter(shouldCountPublicRoute));
for (const entry of sourceRouteEntries) if (shouldCountPublicRoute(entry.path)) registeredStaticPublicPaths.add(entry.path);
for (const path of ['/', '/explore', '/shop', '/shop/cart', '/shop/checkout-return']) registeredStaticPublicPaths.add(path);
for (const routePath of registeredStaticPublicPaths) if (!classified.has(routePath)) failures.push(`Registered static public route is unclassified: ${routePath}.`);
for (const routePath of classified) {
  const backedByExactSource = sourceRouteEntries.some((entry) => entry.path === routePath);
  const backedByDynamicRoute = sourceRouteEntries.some((entry) => entry.path.includes('$') && routePatternMatches(routePath, entry.path));
  if (!registeredStaticPublicPaths.has(routePath) && !backedByExactSource && !backedByDynamicRoute) failures.push(`Governed public route is missing from the generated route tree or route sources: ${routePath}.`);
}
for (const routePath of indexable) {
  if (conditional.includes(routePath)) failures.push(`Route is both always-indexable and conditional: ${routePath}.`);
  if (redirects.includes(routePath)) failures.push(`Route is both indexable and redirect-only: ${routePath}.`);
  if (nonIndexable.includes(routePath)) failures.push(`Route is both indexable and non-indexable: ${routePath}.`);
}
for (const routePath of conditional) {
  if (redirects.includes(routePath) || nonIndexable.includes(routePath)) failures.push(`Conditional route has conflicting crawl classification: ${routePath}.`);
}
for (const routePath of redirects) if (nonIndexable.includes(routePath)) failures.push(`Route is both redirect-only and non-indexable: ${routePath}.`);

const linkedRouteLiteral = (source, routePath) => [
  `href="${routePath}"`, `href='${routePath}'`,
  `to="${routePath}"`, `to='${routePath}'`,
  `href: "${routePath}"`, `href: '${routePath}'`,
  `to: "${routePath}"`, `to: '${routePath}'`,
].some((literal) => source.includes(literal));

for (const routePath of redirects) {
  const routeEntry = sourceRouteEntries.find((entry) => entry.path === routePath);
  if (!routeEntry) {
    failures.push(`Redirect-only route needs an exact route source: ${routePath}.`);
    continue;
  }
  if (!/\bredirect\s*\(/.test(routeEntry.source)) failures.push(`Redirect-only route does not call redirect(): ${routePath} (${routeEntry.file}).`);
  if (!routeEntry.source.includes('statusCode: 301')) failures.push(`Redirect-only route must use permanent status 301: ${routePath} (${routeEntry.file}).`);
  for (const [file, source] of sourceByFile.entries()) {
    if (file === routeEntry.file) continue;
    if (linkedRouteLiteral(source, routePath)) failures.push(`Normal site content links to redirect-only route ${routePath}: ${file}. Link directly to its canonical target instead.`);
  }
}

const redirectContracts = [
  ['/tools', 'src/routes/tools.tsx', '/decide/financial-tools'],
  ['/mortgage-calculator', 'src/routes/mortgage-calculator.tsx', '/texas-mortgage-calculator'],
  ['/calculators/texas-home-affordability', 'src/routes/calculators.texas-home-affordability.tsx', '/texas-home-affordability-calculator'],
  ['/calculators/texas-property-tax', 'src/routes/calculators.texas-property-tax.tsx', '/property-tax-calculators'],
];
for (const [legacyPath, routeFile, targetPath] of redirectContracts) {
  const source = sourceByFile.get(routeFile) ?? '';
  if (!explicitRedirects.includes(legacyPath)) failures.push(`Legacy ${legacyPath} route must remain explicitly redirect-only.`);
  if (!source.includes(`createFileRoute('${legacyPath}')`) && !source.includes(`createFileRoute("${legacyPath}")`)) failures.push(`Legacy redirect route source is missing: ${legacyPath} (${routeFile}).`);
  if (!source.includes(targetPath)) failures.push(`Legacy ${legacyPath} must redirect to ${targetPath}.`);
  if (!source.includes('statusCode: 301')) failures.push(`Legacy ${legacyPath} redirect must remain permanent (301).`);
}

const hasRouteLiteral = (source, routePath) => [`"${routePath}"`, `'${routePath}'`, `\`${routePath}\``].some((literal) => source.includes(literal));
const hasDynamicChapterDiscovery = (routePath) => routePath.startsWith('/things-unique-to-texas/')
  && [...sourceByFile.values()].some((source) => source.includes('/things-unique-to-texas/${category.slug}'));
for (const routePath of [...indexable, ...conditional]) {
  if (routePath !== '/') {
    const inboundFiles = [...sourceByFile.entries()].filter(([, source]) => hasRouteLiteral(source, routePath)).filter(([, source]) => !source.includes(`createFileRoute('${routePath}')`)).filter(([, source]) => !source.includes(`createFileRoute("${routePath}")`)).map(([file]) => file);
    if (!inboundFiles.length && !hasDynamicChapterDiscovery(routePath)) failures.push(`Indexable public route has no discoverable internal-link reference: ${routePath}.`);
  }
  const exactRouteEntry = sourceRouteEntries.find((entry) => entry.path === routePath && entry.source.includes('head:')) ?? sourceRouteEntries.find((entry) => entry.path === routePath);
  const dynamicRouteEntry = sourceRouteEntries.find((entry) => entry.path.includes('$') && routePatternMatches(routePath, entry.path) && entry.source.includes('head:'))
    ?? sourceRouteEntries.find((entry) => entry.path.includes('$') && routePatternMatches(routePath, entry.path));
  const routeEntry = exactRouteEntry ?? dynamicRouteEntry;
  if (!routeEntry) { failures.push(`Indexable public route has no route source for metadata validation: ${routePath}.`); continue; }
  const { file: routeFile, source: routeSource } = routeEntry;
  if (!routeSource.includes('head:')) failures.push(`Indexable route is missing a head definition: ${routePath} (${routeFile}).`);
  if (!routeSource.includes('canonicalPath')) failures.push(`Indexable route is missing canonical metadata: ${routePath} (${routeFile}).`);
  if (!/\btitle\s*:/.test(routeSource)) failures.push(`Indexable route is missing a search title: ${routePath} (${routeFile}).`);
  if (!/\bdescription\b/.test(routeSource)) failures.push(`Indexable route is missing a meta description: ${routePath} (${routeFile}).`);
  if (indexable.includes(routePath) && (/robots\s*:\s*["']noindex/i.test(routeSource) || /content=["'][^"']*noindex/i.test(routeSource))) failures.push(`Always-indexable route contains a noindex directive: ${routePath} (${routeFile}).`);
  if (conditional.includes(routePath) && !/noindex/i.test(routeSource)) failures.push(`Conditional route does not expose an explicit noindex state: ${routePath} (${routeFile}).`);
}
if (failures.length) { console.error('Public-route governance validation failed:'); for (const failure of failures) console.error(`- ${failure}`); process.exit(1); }
console.log(`Public-route governance passed for ${registeredStaticPublicPaths.size} static routes, ${indexable.length} always-indexable routes, ${conditional.length} conditional routes, and ${redirects.length} verified permanent redirect-only routes (${explicitRedirects.length} explicitly registered, ${derivedRedirects.length} source-derived before de-duplication); every permanent redirect is explicitly crawl-governed and normal site content does not link back into redirect-only URLs.`);
