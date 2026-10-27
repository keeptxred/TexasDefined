import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

const read = (path) => readFileSync(new URL('../../' + path, import.meta.url), 'utf8');
const sharedCountyTemplate = read('src/components/content/CountyGuideSections.tsx');
const spotlight = read('src/components/content/VanZandtCountySpotlight.tsx');
const browserAcceptance = read('scripts/ci/verify-van-zandt-browser.mjs');

test('no county renders the retired Places on the map section or map link grid', () => {
  for (const removed of [
    'Places on the map',
    'County seat & communities',
    'VanZandtCommunityMap',
    'data-van-zandt-community-map',
    'openstreetmap.org/search?query=',
    'hasCommunities',
  ]) {
    assert.ok(!sharedCountyTemplate.includes(removed), 'County map section regressed: ' + removed);
  }
  assert.equal(existsSync(new URL('../../src/components/content/VanZandtCommunityMap.tsx', import.meta.url)), false);
  const importantDestinations = browserAcceptance.match(/for \(const href of \[([\s\S]*?)\]\) assert\.ok/)?.[1] ?? '';
  assert.ok(!importantDestinations.includes('openstreetmap.org/search?query='), 'Browser acceptance cannot require the retired OSM map grid');
  assert.ok(importantDestinations.includes('google.com/maps/search/?api=1&query='), 'Browser acceptance must retain the current Open in maps destination');
});

test('removing county map does not remove essential county facts or useful destinations', () => {
  for (const feature of [
    'The county in numbers',
    'County seat',
    'profile.majorCommunities',
    'Quick answers about {entity.name}',
    'County property-tax resources',
  ]) assert.ok(sharedCountyTemplate.includes(feature), 'County information lost: ' + feature);
  for (const destination of [
    '/destination/wills-point-depot-museum',
    'grandsalinesaltpalace.com',
    'firstmondaycanton.com',
    'tpwd.texas.gov/state-parks/lake-tawakoni',
  ]) assert.ok(spotlight.includes(destination), 'Van Zandt visitor guide lost: ' + destination);
});
