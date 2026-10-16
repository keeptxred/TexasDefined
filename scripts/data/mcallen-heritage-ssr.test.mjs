import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const shell = readFileSync('src/routes/explore.near.$metro.$collection.tsx', 'utf8');
const rich = readFileSync('src/routes/explore.near.$metro.$collection.lazy.tsx', 'utf8');

test('McAllen page SSR shell links to the actual local museum destination before lazy content', () => {
  assert.ok(shell.includes('isMcAllenDayTrips && <section'), 'history content must render in the lightweight server shell');
  assert.ok(shell.includes('data-mcallen-heritage-link'), 'SSR heritage block missing');
  assert.ok(shell.includes('to="/destination/$slug" params={{ slug: "museum-south-texas-history-edinburg" }}'), 'exact canonical Edinburg museum link missing');
  assert.ok(shell.indexOf('data-mcallen-heritage-link') < shell.indexOf('{townReferences.length > 0'), 'heritage link should be before the lazy/optional collection content');
  assert.ok(rich.includes('slug: "museum-south-texas-history-edinburg"'), 'keep substantive researched day-trip card');
  assert.ok(!shell.includes('museum-south-texas-history-edinburg" className="hidden"'), 'do not substitute a hidden SEO-only link');
});

test('McAllen links never become a blanket requirement for all metro pages', () => {
  assert.ok(shell.includes('const isMcAllenDayTrips = metro.slug === "mcallen" && collection.slug === "day-trips"'));
  assert.ok(shell.includes('{isMcAllenDayTrips && <section'));
});
