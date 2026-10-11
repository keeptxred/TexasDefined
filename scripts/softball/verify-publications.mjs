#!/usr/bin/env node
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { validatePublishedManifest } from './authority-contract.mjs';

const root = resolve(import.meta.dirname, '../..');
const read = (p) => readFileSync(resolve(root,p),'utf8');
const manifest = JSON.parse(read('src/data/softball/published-team-profiles.json'));
const registry = JSON.parse(read('src/data/softball/uil-2026-27-registry.json'));
const errors = validatePublishedManifest(manifest, registry);
const staticRoutes = read('src/lib/public-routes.ts');
const head = read('src/routes/sports.softball.{-$team}.tsx');
const body = read('src/routes/sports.softball.{-$team}.lazy.tsx');
const sourceFiles = readdirSync(resolve(root,'src/routes')).filter((p)=>p.includes('softball'));
const published = new Set(manifest.pages.map(p=>p.slug));
for (const record of manifest.pages) {
  const url = '/sports/softball/' + record.slug;
  if (!staticRoutes.includes('"' + url + '"')) errors.push(record.slug + ': missing static canonical sitemap registration');
  if (!head.includes("'" + record.slug + "'")) errors.push(record.slug + ': missing exact head-route slug recognition');
  if (!body.includes("'" + record.slug + "'")) errors.push(record.slug + ': missing content-rendering route recognition');
  if (!body.includes('SoftballAuthority')) errors.push(record.slug + ': lazy render should use a shared published-profile authority component');
}
// Catch indexable/bogus team pages not declared in the signed publication file.
// Existing curated resources remain explicitly exempt.
const existing = new Set(['', 'schools', 'colleges', 'paris-junior-college','texas-volts']);
for (const [,slug] of staticRoutes.matchAll(/["']\/sports\/softball\/([a-z0-9-]+)["']/g)) {
  if (!existing.has(slug) && !published.has(slug)) errors.push(slug + ': unapproved softball route added to public sitemap');
}
for (const route of sourceFiles) {
  if (/^sports\.softball\.[^.]+\.tsx$/.test(route) && !route.includes('{-$team}')) errors.push(route + ': unexpected individual eager route; use shared guarded router');
}
if (manifest.pages.length === 0) {
  assert.ok(!staticRoutes.includes('"/sports/softball/teams/"'), 'Mass placeholder routes are disallowed');
}
if (errors.length) {
  console.error('SOFTBALL AUTHORITY PUBLICATION BLOCKED:\n' + errors.map((e)=>' - '+e).join('\n'));
  process.exit(1);
}
console.log('PASS: UIL source registry is independent of publication; ' + manifest.pages.length + ' individually researched profiles approved; no unreviewed team pages indexable.');
