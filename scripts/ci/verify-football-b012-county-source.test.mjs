import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const route = readFileSync('src/routes/$kind.$slug.lazy.tsx','utf8');
const roster = JSON.parse(readFileSync('docs/football-authority/REGISTRY.json','utf8'));
test('Batch012 exactly 25 independently researched canonical reciprocal county links exist in initial HTML', () => {
  assert.equal(roster.batch.number,12);
  assert.equal(roster.batch.slugs.length,25);
  const match=route.match(/const batch012FootballCountyLinks:[\\s\\S]*?\\n};/);
  assert.ok(match,'Static Batch012 county link map missing');
  const slugs=[...match[0].matchAll(/slug: \"([^\"]+)\"/g)].map(m=>m[1]);
  assert.equal(slugs.length,25);
  assert.equal(new Set(slugs).size,25);
  assert.deepEqual(new Set(slugs),new Set(roster.batch.slugs));
  assert.ok(route.includes('...(batch012FootballCountyLinks[entity.slug] ?? [])'), 'Links must render from county initial HTML');
  for(const slug of slugs)assert.ok(route.includes('href={`/texas-high-school-football-teams/${school.slug}`}'));
});
