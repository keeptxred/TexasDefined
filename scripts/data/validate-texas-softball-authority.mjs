#!/usr/bin/env node
/** Protection against thin, unsourced or unroutable Texas softball pages. */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../..');
const read = (file) => readFileSync(resolve(root, file), 'utf8');
const head = read('src/routes/sports.softball.{-$team}.tsx');
const shell = read('src/routes/sports.softball.{-$team}.lazy.tsx');
const hub = read('src/components/softball/SoftballHubPage.tsx');
const paris = read('src/components/softball/ParisJuniorCollegePage.tsx');
const volts = read('src/components/softball/TexasVoltsPage.tsx');
const sports = read('src/routes/sports.lazy.tsx');
const index = read('src/lib/public-routes.ts');

assert.ok(head.includes("createFileRoute('/sports/softball/{-$team}')"), 'One optional route must serve the hub and team profiles');
assert.ok(shell.includes("createLazyFileRoute('/sports/softball/{-$team}')"), 'Team pages must live in lazy router chunk');
assert.ok(head.includes('beforeLoad') && head.includes('notFound()'), 'Unknown team slugs must return 404');
assert.ok(head.includes('canonicalPath') && head.includes('title:') && head.includes('description'), 'All variants need unique SEO');
for (const [slug, body] of [['', hub], ['paris-junior-college', paris], ['texas-volts', volts]]) {
  const url = slug ? '/sports/softball/' + slug : '/sports/softball';
  assert.ok(index.includes('"' + url + '"'), 'Indexable registry missing ' + url);
  assert.ok(sports.includes('/sports/softball'), 'Sports homepage must link to hub');
  assert.ok(body.includes('application/ld+json'), url + ' must include SSR structured data');
  assert.ok(body.includes('Breadcrumb'), url + ' must show accessible breadcrumbs');
  assert.ok(body.includes('2026-10-11'), url + ' must carry reviewed source date');
  if (slug) {
    assert.ok(shell.includes("team === '" + slug + "'"), 'Dispatch missing team profile ' + slug);
    assert.ok(head.includes("'" + slug + "':"), 'Head route missing source-specific metadata for ' + slug);
  }
}
assert.ok(hub.includes('/sports/softball/paris-junior-college'), 'Hub must link PJC');
assert.ok(hub.includes('/sports/softball/texas-volts'), 'Hub must link professional softball');
assert.ok(paris.includes('/sports/softball'), 'PJC must link back to hub');
assert.ok(volts.includes('/sports/softball'), 'Volts must link back to hub');

for (const winner of ['Jonesboro', 'Ganado', 'Shiner', 'Grandview', 'Santa Gertrudis Academy',
  'Bullard', 'Liberty', 'Mont Belvieu Barbers Hill', 'Montgomery Lake Creek', 'Pearland', 'Katy']) {
  assert.ok(hub.includes(winner), 'Missing verified 2026 UIL champion: ' + winner);
}
for (const original of ['https://www.uiltexas.org/softball/archives', 'https://www.uiltexas.org/softball/alignments',
  'https://theausl.com/volts/about/', 'https://www.njcaa.org/', 'https://ascsports.org/standings.aspx?path=softball']) {
  assert.ok(hub.includes(original), 'Missing original governing-body reference: ' + original);
}
assert.ok(paris.includes('https://nfca.org/'), 'Paris award requires original NFCA source');
assert.ok(paris.includes('July 6, 2026'), 'Coach transition needs exact date');
assert.ok(paris.includes('2002'), 'Butler historical starting year must be stated');
assert.ok(paris.includes('regional staff honor'), 'Award may not be mislabeled as national or individual');
assert.ok(paris.includes('excluded here until'), 'Unverified biography must remain excluded');
assert.ok(volts.includes('AUSL') && volts.includes('Dell Diamond'), 'Professional softball profile incomplete');

for (const body of [hub, paris, volts]) {
  for (const match of body.matchAll(/https:\/\/[^\s'"<>]+/g)) {
    const link = match[0].replace(/[),.;]+$/, '');
    if (link.includes('${')) continue;
    try { new URL(link); } catch { throw new Error('Invalid softball source URL: ' + match[0]); }
  }
}
console.log('PASS: scalable optional route, three source-backed softball pages, official 2026 UIL champions and SEO safeguards');
