import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { assertHuntingHubPlanner } from './verify-changed-production-pages.mjs';

const source = fs.readFileSync('src/components/hunting/HuntingSeasonPlanner.tsx', 'utf8');
const json = JSON.parse(fs.readFileSync('src/data/hunting/species-season-calendar.json','utf8'));
const marks = [
  'Texas hunting season planner',
  'Species or game category',
  'Official calendar checked',
  'Editorial hub updated',
  'Source review',
  'Four decisions before choosing a hunting spot',
  '2026–27 regulation changes',
];
const options = ['deer','turkey','species:Goose','species:Snipe','species:Woodcock'];
function mockHub(include = marks, opts = options) {
  return '<!DOCTYPE html><html><main><select id="hunting-species-select">'
    + opts.map(x => '<option value="' + x + '">' + x + '</option>').join('')
    + '</select>' + include.map(m=>'<p>' + m + '</p>').join('')
    + '</main></html>';
}

test('production hub contract accepts actual SSR select and editorial markers', () => {
  assert.doesNotThrow(() => assertHuntingHubPlanner(mockHub(),'canonical visitor'));
});
test('production hub contract rejects stale hub even when scripted hydration mentions planner', () => {
  const body = '<!DOCTYPE html><html><script>Texas hunting season planner</script><p>old hub</p></html>';
  assert.throws(() => assertHuntingHubPlanner(body,'cache-busted release'), /missing planner\/source marker/);
});
test('production hub contract rejects missing independently selectable Snipe', () => {
  assert.throws(()=>assertHuntingHubPlanner(mockHub(marks,options.filter(x=>x!=='species:Snipe')),'canonical visitor'),/species:Snipe/);
});
test('selector identity separates distinct species that share a related guide', () => {
  const ids=['deer','turkey',...json.sections.map(section=>'species:'+section.heading)];
  assert.equal(ids.length,19);
  assert.equal(new Set(ids).size,19);
  assert.ok(json.sections.filter(section=>section.slugs[0]==='other-migratory-game-birds').length>=2,'must keep regression fixture for shared guide slug');
  for (const fragment of ['id: "species:" + section.heading','value={entry.id}','entry.id === selected','key={entry.id}']) {
    assert.ok(source.includes(fragment), 'picker must use distinct key: '+fragment);
  }
  assert.ok(source.includes('section.heading === "Goose" ? "goose-hunting"'), 'Goose must lead to species-specific guide');
});
