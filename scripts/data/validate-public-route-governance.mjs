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
const redirects = extractArray('REDIRECT_ONLY_PATHS');
const nonIndexable = extractArray('NON_INDEXABLE_PUBLIC_PATHS');
const classified = new Set([...indexable, ...redirects, ...nonIndexable]);
const nestedAdminChildPaths = new Set([
  '/platform-health',
  '/knowledge-graph-behavior',
  '/internal-link-tests',
  '/internal-link-rollback',
  '/governance-health',
  '/entity-maintenance',
  '/entity-import-review',
]);
const nestedShopChildPaths = new Set(['/cart', '/checkout-return']);

const normalize = (value) => value === '/' ? value : value.replace(/\/$/, '');
const shouldCountPublicRoute = (routePath) =>
  routePath.startsWith('/')
  && !routePath.includes('$')
  && !routePath.startsWith('/api/')
  && !routePath.startsWith('/admin')
  && !nestedAdminChildPaths.has(routePath)
  && !nestedShopChildPaths.has(routePath)
  && !routePath.endsWith('.xml')
  && !routePath.endsWith('.txt');

const sourceRoots = ['src/routes', 'src/components', 'src/data'];
const sourceFiles = [];
const collect = (directory) => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) collect(fullPath);
    else if (/\.(?:ts|tsx)$/.test(entry.name)) sourceFiles.push(fullPath);
  }
};
for (const root of sourceRoots) collect(root);

const sourceByFile = new Map(sourceFiles.map((file) => [file, fs.readFileSync(file, 'utf8')]));
const sourceRouteEntries = [...sourceByFile.entries()].flatMap(([file, source]) =>
  [...source.matchAll(/createFileRoute\(["']([^"']+)["']\)/g)].map((match) => ({
    file,
    source,
    rawPath: match[1],
    path: normalize(match[1]),
  })),
);

const registeredStaticPublicPaths = new Set(
  [...routeTree.matchAll(/\bpath:\s*'([^']+)'/g)]
    .map((match) => normalize(match[1]))
    .filter(shouldCountPublicRoute),
);
for (const entry of sourceRouteEntries) {
  if (shouldCountPublicRoute(entry.path)) registeredStaticPublicPaths.add(entry.path);
}
registeredStaticPublicPaths.add('/');
registeredStaticPublicPaths.add('/explore');
registeredStaticPublicPaths.add('/shop');
registeredStaticPublicPaths.add('/shop/cart');
registeredStaticPublicPaths.add('/shop/checkout-return');

for (const routePath of registeredStaticPublicPaths) {
  if (!classified.has(routePath)) failures.push(`Registered static public route is unclassified: ${routePath}.`);
}

for (const routePath of classified) {
  if (!registeredStaticPublicPaths.has(routePath)) failures.push(`Governed public route is missing from the generated route tree or route sources: ${routePath}.`);
}

for (const routePath of indexable) {
  if (redirects.includes(routePath)) failures.push(`Route is both indexable and redirect-only: ${routePath}.`);
  if (nonIndexable.includes(routePath)) failures.push(`Route is both indexable and non-indexable: ${routePath}.`);
}

for (const routePath of redirects) {
  if (nonIndexable.includes(routePath)) failures.push(`Route is both redirect-only and non-indexable: ${routePath}.`);
}

const hasRouteLiteral = (source, routePath) =>
  [`"${routePath}"`, `'${routePath}'`, `\`${routePath}\``].some((literal) => source.includes(literal));

for (const routePath of indexable) {
  if (routePath !== '/') {
    const inboundFiles = [...sourceByFile.entries()]
      .filter(([, source]) => hasRouteLiteral(source, routePath))
      .filter(([, source]) => !source.includes(`createFileRoute('${routePath}')`))
      .filter(([, source]) => !source.includes(`createFileRoute("${routePath}")`))
      .map(([file]) => file);
    if (!inboundFiles.length) failures.push(`Indexable static route has no discoverable internal-link reference: ${routePath}.`);
  }

  const routeCandidates = sourceRouteEntries.filter((entry) => entry.path === routePath);
  const routeEntry = routeCandidates.find((entry) => entry.source.includes('head:')) ?? routeCandidates[0];
  if (!routeEntry) {
    failures.push(`Indexable static route has no route source for metadata validation: ${routePath}.`);
    continue;
  }

  const { file: routeFile, source: routeSource } = routeEntry;
  if (!routeSource.includes('head:')) failures.push(`Indexable route is missing a head definition: ${routePath} (${routeFile}).`);
  if (!routeSource.includes('canonicalPath')) failures.push(`Indexable route is missing canonical metadata: ${routePath} (${routeFile}).`);
  if (!/\btitle\s*:/.test(routeSource)) failures.push(`Indexable route is missing a search title: ${routePath} (${routeFile}).`);
  if (!/\bdescription\b/.test(routeSource)) failures.push(`Indexable route is missing a meta description: ${routePath} (${routeFile}).`);
  if (/robots\s*:\s*["']noindex/i.test(routeSource) || /content=["'][^"']*noindex/i.test(routeSource)) {
    failures.push(`Indexable route contains a noindex directive: ${routePath} (${routeFile}).`);
  }
}

if (failures.length) {
  console.error('Public-route governance validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Public-route governance and metadata validation passed for ${registeredStaticPublicPaths.size} registered static routes and ${indexable.length} indexable routes.`);
