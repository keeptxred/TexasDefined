#!/usr/bin/env node
/**
 * Contract guard for the first TexasDefined women's softball authority release.
 * Deliberately no network: authoritative outbound references and dated claims
 * are verified in the editorial source ledger; build/SSR CI verifies routing.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../..');
const read = (path) => readFileSync(resolve(root, path), 'utf8');
const hub = read('src/routes/sports.softball.tsx');
const paris = read('src/routes/sports.softball.paris-junior-college.tsx');
const volts = read('src/routes/sports.softball.texas-volts.tsx');
const sport = read('src/routes/sports.lazy.tsx');
const routes = read('src/lib/public-routes.ts');

const pages = [
  { path: '/sports/softball', file: hub, label: 'Texas women's softball hub' },
  { path: '/sports/softball/paris-junior-college', file: paris, label: 'Paris JC Lady Dragons' },
  { path: '/sports/softball/texas-volts', file: volts, label: 'Texas Volts' },
];

for (const { path, file, label } of pages) {
  assert.ok(routes.includes('"' + path + '"'), label + ' must be indexable');
  assert.ok(file.includes("createFileRoute('" + path + "')"), label + ' must have a file route');
  assert.ok(file.includes('rel: \'canonical\''), label + ' must have canonical SEO');
  assert.ok(file.includes('application/ld+json'), label + ' must expose schema');
  assert.ok(file.includes('2026-10-11'), label + ' must carry a real review date');
  assert.ok(file.includes('Breadcrumb'), label + ' must include visible navigation');
  assert.ok(file.includes('Sources') || file.includes('sources') || file.includes('officialResources'), label + ' must cite original sources');
}

assert.ok(hub.includes('return <Outlet />'), 'Nested team pages require parent Outlet');
assert.ok(sport.includes('/sports/softball'), 'Sports landing must link to hub');
assert.ok(hub.includes('/sports/softball/paris-junior-college'), 'Hub must link to PJC');
assert.ok(hub.includes('/sports/softball/texas-volts'), 'Hub must link to professional Volts guide');
assert.ok(paris.includes('/sports/softball'), 'PJC must link back to hub');
assert.ok(volts.includes('/sports/softball'), 'Volts must link back to hub');

for (const phrase of ['Jonesboro', 'Ganado', 'Shiner', 'Grandview', 'Santa Gertrudis Academy', 'Bullard',
  'Liberty', 'Mont Belvieu Barbers Hill', 'Montgomery Lake Creek', 'Pearland', 'Katy']) {
  assert.ok(hub.includes(phrase), 'Missing 2026 official UIL champion: ' + phrase);
}
assert.ok(hub.includes('https://www.uiltexas.org/softball/archives'), 'UIL historical source missing');
assert.ok(hub.includes('https://www.uiltexas.org/softball/alignments'), 'Current alignments source missing');
assert.ok(hub.includes('https://theausl.com/volts/about/'), 'Pro-softball official source missing');
assert.ok(hub.includes('https://www.njcaa.org/'), 'NJCAA original source missing');
assert.ok(hub.includes('https://ascsports.org/standings.aspx?path=softball'), 'Division III original source missing');
assert.ok(paris.includes('https://nfca.org/'), 'NFCA award source missing');
assert.ok(paris.includes('July 6, 2026'), 'Head-coach appointment must be dated');
assert.ok(paris.includes('2002'), 'Butler historical starting year must be stated');
assert.ok(paris.includes('regional staff honor') || paris.includes('regional staff award'), 'NFCA award scope must be clear');
assert.ok(paris.includes('excluded here until'), 'Unconfirmed biographical details must not be published as fact');
assert.ok(volts.includes('AUSL'), 'Professional league must be correctly named');

const links = [...hub.matchAll(/https:\/\/[^\s'"<>]+/g), ...paris.matchAll(/https:\/\/[^\s'"<>]+/g),
  ...volts.matchAll(/https:\/\/[^\s'"<>]+/g)].map((match) => match[0]);
for (const link of links) {
  if (link.includes('${')) continue;
  const normalized = link.replace(/[),.;]+$/, '');
  try { new URL(normalized); } catch { throw new Error('Invalid source URL in softball authority: ' + link); }
}
console.log('PASS: 3 softball authority routes, original sources, 2026 UIL record, nested routing, and internal links');
