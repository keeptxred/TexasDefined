import assert from 'node:assert/strict';
import { test } from 'node:test';
import { assertGscImageRights } from './verify-changed-production-pages.mjs';
import { buildChangePlan, PAGE_BUDGET } from './production-change-scope.mjs';

const CC = 'https://creativecommons.org/licenses/by-sa/4.0/';
const entries = [
  ['/article/unusual-texas-businesses-services', 'Dustin Moore', 'Person', '© Dustin Moore',
    'https://creativecommons.org/licenses/by/2.0/', 'Britten_USA.jpg'],
  ['/article/blue-bell-ice-cream-brenham-texas-history', 'Larry D. Moore', 'Person', '© 2008 Larry D. Moore',
    'https://creativecommons.org/licenses/by/4.0/', 'Modern_Blue_Bell_Creameries_factory_located_in_Brenham,_Texas.jpg'],
  ['/article/texas-high-school-football-playoffs-explained', 'Heidi Knapp', 'Person', '© Heidi Knapp', CC, 'Celina_High_School,_Friday_Night_Football.jpg'],
  ['/article/texas-six-man-football-rules-explained', 'Fortguy', 'Person', '© Fortguy', CC, 'Bart_Coan_Field_from_west.jpg'],
  ['/article/texas-cultural-regions-explained', 'Renelibrary', 'Person', '© Renelibrary', CC, 'Panna_Maria_(1_of_1).jpg'],
  ['/article/texas-major-cities-regional-differences', 'Leeannoneal', 'Person', '© Leeannoneal', CC, 'Houston_texas_usa_skyline.jpg'],
  ['/article/texas-lakes-reservoirs-explained', 'U.S. Army Corps of Engineers', 'Organization',
    'Public domain — official U.S. Army Corps of Engineers federal government work; no copyright claim',
    'https://commons.wikimedia.org/wiki/File:USACE_Ray_Roberts_Lake_and_Dam.jpg', 'USACE_Ray_Roberts_Lake_and_Dam.jpg'],
  ['/destination/south-padre-island', 'Spheroidite', 'Person', '© Spheroidite', CC, 'South_Padre_Island_beach_panorama.jpg'],
];
function mockHtml(path, creator, type, copyright, license, file, edits = {}) {
  const url = 'https://texasdefined.com' + path;
  const image = {
    '@type': 'ImageObject', '@id': url + '#primaryimage',
    url: url + '/image.jpg', contentUrl: url + '/image.jpg', creditText: creator + ' · photo credit',
    creator: { '@type': type, name: creator },
    copyrightNotice: copyright, license,
    acquireLicensePage: 'https://commons.wikimedia.org/wiki/File:' + file,
    ...edits,
  };
  const node = path.startsWith('/destination/')
    ? { '@type': 'TouristAttraction', '@id': url + '#attraction', image: [image] }
    : image;
  return '<html><head><script type="application/ld+json">'
    + JSON.stringify({ '@context': 'https://schema.org', '@graph': [node] })
    + '</script></head><body><p>Photo: ' + creator + '</p></body></html>';
}

test('release and canonical image-rights acceptance selects exactly eight URLs within existing 40-page budget', () => {
  const plan = buildChangePlan({
    baseline: 'a'.repeat(40), head: 'b'.repeat(40),
    changedFiles: ['src/data/image-rights.ts'],
  });
  assert.deepEqual(new Set(plan.imageRightsPages), new Set(entries.map(entry => entry[0])));
  assert.ok(plan.imageRightsPages.every(path => plan.selectedPaths.includes(path)));
  assert.ok(plan.selectedPaths.length + plan.redirectChecks.length <= PAGE_BUDGET);
  const unrelated = buildChangePlan({
    baseline: 'a'.repeat(40), head: 'b'.repeat(40),
    changedFiles: ['src/data/fixtures/texas-life-split-source.ts'],
  });
  assert.deepEqual(unrelated.imageRightsPages, [], 'No permanent eight-page crawl for unrelated changes');
});

test('actual ImageObject parsing accepts all eight source-authenticated article/destination SSR structures', () => {
  for (const fields of entries) assert.doesNotThrow(() => assertGscImageRights(mockHtml(...fields), fields[0]), fields[0]);
});

test('fail closed on missing provenance, misleading copyright, wrong creator, and nonvisible credit', () => {
  for (const fields of entries) {
    const [path, creator] = fields;
    assert.throws(() => assertGscImageRights(mockHtml(...fields, { copyrightNotice: undefined }), path), /ImageObject/);
    assert.throws(() => assertGscImageRights(mockHtml(...fields, { creator: { '@type': 'Person', name: 'Texas Defined' } }), path), /ImageObject/);
    assert.throws(() => assertGscImageRights(mockHtml(...fields, { acquireLicensePage: 'https://example.com/license' }), path), /ImageObject/);
    assert.throws(() => assertGscImageRights(mockHtml(...fields, { license: 'https://example.com/terms' }), path), /ImageObject/);
    assert.throws(() => assertGscImageRights(mockHtml(...fields, { contentUrl: 'https://example.com/wrong.jpg' }), path), /ImageObject/);
    const hidden = mockHtml(...fields).replace('<p>Photo: ' + creator + '</p>', '');
    assert.throws(() => assertGscImageRights(hidden, path), /Visible creator/);
  }
});
