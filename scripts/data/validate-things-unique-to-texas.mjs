import fs from 'node:fs';

const source = fs.readFileSync('src/data/things-unique-to-texas.ts', 'utf8');
const linksSource = fs.readFileSync('src/data/things-unique-to-texas-links.ts', 'utf8');
const rootRoute = fs.readFileSync('src/routes/things-unique-to-texas.tsx', 'utf8');
const rootLazy = fs.readFileSync('src/routes/things-unique-to-texas.lazy.tsx', 'utf8');
const categoryRoute = fs.readFileSync('src/routes/things-unique-to-texas.$category.tsx', 'utf8');
const lazyRoute = fs.readFileSync('src/routes/things-unique-to-texas.$category.lazy.tsx', 'utf8');
const methodologyRoute = fs.readFileSync('src/routes/things-unique-to-texas.methodology.tsx', 'utf8');
const publicRoutes = fs.readFileSync('src/lib/public-routes.ts', 'utf8');
const failures = [];

const ids = [...source.matchAll(/\bitem\((\d+),/g)].map((match) => Number(match[1]));
const categorySlugs = [...source.matchAll(/^\s{4}slug:\s*"([a-z0-9-]+)",/gm)].map((match) => match[1]);
const hrefs = [...source.matchAll(/\bhref:\s*"([^"]+)"/g)].map((match) => match[1]);
const canonicalIds = [...linksSource.matchAll(/^\s{2}(\d+):\s*"\/destination\/[^"]+",/gm)].map((match) => Number(match[1]));

if (ids.length !== 250) failures.push(`Expected 250 magazine entries; found ${ids.length}.`);
if (new Set(ids).size !== ids.length) failures.push('Magazine entry IDs must be unique.');
for (let id = 1; id <= 250; id += 1) {
  if (!ids.includes(id)) failures.push(`Missing magazine entry ID ${id}.`);
}

if (categorySlugs.length !== 8) failures.push(`Expected 8 magazine categories; found ${categorySlugs.length}.`);
if (new Set(categorySlugs).size !== categorySlugs.length) failures.push('Magazine category slugs must be unique.');

for (const href of hrefs) {
  if (!href.startsWith('/')) failures.push(`Magazine internal href must be root-relative: ${href}`);
  if (href.startsWith('//')) failures.push(`Protocol-relative magazine href is not allowed: ${href}`);
}

if (canonicalIds.length < 24) failures.push(`Expected at least 24 canonical destination cross-links; found ${canonicalIds.length}.`);
if (new Set(canonicalIds).size !== canonicalIds.length) failures.push('Canonical cross-link IDs must be unique.');
for (const id of canonicalIds) {
  if (!ids.includes(id)) failures.push(`Canonical cross-link refers to unknown magazine entry ID ${id}.`);
}

for (const [name, routeSource] of [['schema route', categoryRoute], ['lazy route', lazyRoute]]) {
  if (!routeSource.includes('texasIconCanonicalHref')) failures.push(`${name} must resolve canonical magazine links through texasIconCanonicalHref.`);
}
if (!categoryRoute.includes('...(href ? { url: `${origin}${href}` } : {})')) failures.push('Category JSON-LD must expose canonical URLs for linked magazine entries.');

if (!methodologyRoute.includes('createFileRoute("/things-unique-to-texas/methodology")')) failures.push('Magazine methodology route must remain canonical.');
for (const token of ['Inclusion standard', 'Official fact versus Texas folklore', 'Cross-link policy', 'Changing information', 'Corrections and maintenance']) {
  if (!methodologyRoute.includes(token)) failures.push(`Magazine methodology must retain section: ${token}.`);
}
if (!publicRoutes.includes('"/things-unique-to-texas/methodology"')) failures.push('Magazine methodology must remain governed as an indexable static path.');
if (!rootLazy.includes('to="/things-unique-to-texas/methodology"')) failures.push('Magazine collection must visibly link its methodology.');
if (!rootRoute.includes('isBasedOn: methodologyUrl')) failures.push('Magazine CollectionPage schema must identify the methodology as its basis.');
if (!rootRoute.includes('dateModified: "2026-08-19"')) failures.push('Magazine collection schema must retain an explicit reviewed modification date.');
if (!rootRoute.includes('Texas Defined Editorial Desk')) failures.push('Magazine collection schema must retain editorial authorship.');

if (failures.length) {
  console.error('Things That Define Texas validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Things That Define Texas validation passed: ${ids.length} entries, ${categorySlugs.length} categories, ${hrefs.length} editorial links, ${canonicalIds.length} canonical destination cross-links, and methodology/provenance contracts intact.`);
