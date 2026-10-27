import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const component = readFileSync(new URL('../../src/components/content/VanZandtCommunityMap.tsx', import.meta.url), 'utf8');
const countyGuide = readFileSync(new URL('../../src/components/content/CountyGuideSections.tsx', import.meta.url), 'utf8');
const coordinates = [...component.matchAll(/\{ name: '([^']+)', latitude: (-?\d+\.\d+), longitude: (-?\d+\.\d+) \}/g)]
  .map(([, name, latitude, longitude]) => ({ name, latitude: Number(latitude), longitude: Number(longitude) }));
const expected = ['Canton', 'Wills Point', 'Grand Saline', 'Van', 'Edgewood', 'Fruitvale', 'Ben Wheeler', 'Martins Mill', 'Edom'];

test('Van Zandt community map uses exactly the nine source-verified county communities', () => {
  assert.deepEqual(coordinates.map(place => place.name), expected);
  assert.equal(new Set(coordinates.map(place => place.name)).size, expected.length);
  for (const place of coordinates) {
    assert.ok(place.latitude >= 32.32 && place.latitude <= 32.78, 'Latitude not in mapped county area: ' + place.name);
    assert.ok(place.longitude >= -96.10 && place.longitude <= -95.53, 'Longitude not in mapped county area: ' + place.name);
  }
  assert.match(component, /https:\/\/www\.txgenweb\.org\/research\/landmarks\/vanzandt\.htm/);
});

test('map has no tile fetches or dependencies, has geographic markers and link access', () => {
  assert.match(component, /<svg /);
  assert.match(component, /data-van-zandt-community-map/);
  assert.match(component, /data-van-zandt-community-point=\{place\.name\}/);
  assert.match(component, /openstreetmap\.org\/search\?query=/);
  assert.match(component, /overflow-x-auto/);
  assert.doesNotMatch(component, /<iframe|<img|fetch\(|import\s/);
});

test('map is limited to Van Zandt and original community/visitor links remain', () => {
  assert.match(countyGuide, /entity\.slug === 'van-zandt' \? <VanZandtCommunityMap \/>/);
  for (const link of ['openstreetmap.org/search?query=', '/destination/canton', '/destination/wills-point-depot-museum', 'grandsalinesaltpalace.com']) {
    assert.ok(countyGuide.includes(link), 'Preserve visitor map and guide link: ' + link);
  }
});
