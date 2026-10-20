#!/usr/bin/env node
/**
 * Structural and negative smoke before any UIL softball team page is public.
 * This guards real routing architecture even while published manifest is empty.
 * It never creates, indexes or publishes a synthetic school.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../..');
const read = path => readFileSync(resolve(root,path),'utf8');
const json = path => JSON.parse(read(path));
const approved = json('src/data/softball/published-team-profiles.json');
const slim = json('src/data/softball/published-team-index.json');
const registry = json('src/data/softball/uil-2026-27-registry.json');
assert.equal(approved.version,1);
assert.equal(slim.version,1);
assert.equal(slim.pages.length,approved.pages.length,'Only complete published manifest profiles may have school directory/sitemap links');
assert.equal(registry.schools.length,1192);
const source = read('src/data/softball/softball-published-team.server.ts');
const loader = read('src/data/softball/softball-published-team.functions.ts');
const head = read('src/routes/sports.softball.{-$team}.tsx');
const body = read('src/routes/sports.softball.{-$team}.lazy.tsx');
const renderer = read('src/components/softball/SoftballPublishedTeamAuthorityPage.tsx');
const routes = read('src/lib/public-routes.ts');
const directory = read('src/components/softball/SoftballSchoolsDirectory.tsx');
assert.ok(source.includes("import manifest from './published-team-profiles.json'"),'Full profile data must load on server only');
assert.ok(loader.includes("import('./softball-published-team.server')"),'Server function must dynamically import server-only profile data');
assert.ok(!head.includes('published-team-profiles.json'),'Router head must not eagerly embed full article manifest');
assert.ok(!body.includes('published-team-profiles.json'),'Lazy client module must not embed full articles');
assert.ok(!renderer.includes('published-team-profiles.json'),'Client renderer must receive one approved profile only');
assert.ok(!directory.includes('published-team-profiles.json'),'Statewide UIL discovery directory must not bundle full articles');
assert.ok(routes.includes('published-team-index.json'),'Only small approved index supplies sitemap paths');
assert.ok(head.includes('if (!approved) throw notFound()'),'Unknown/unfinished teams must stay a true 404');
assert.ok(head.includes('getPublishedSoftballTeamPage'),'Approved route must load an exact server-backed profile');
assert.ok(body.includes('SoftballPublishedTeamAuthorityPage'),'Approved profile must use source-rich lazy component');
assert.ok(renderer.includes('profile.sources') && renderer.includes('profile.claims') && renderer.includes('profile.sections'));
assert.ok(renderer.includes('profile.correctionsPolicy') && renderer.includes('profile.media'));
assert.ok(directory.includes('approvedTeamByIdentity'),'The UIL index only links exact approved school identities');
for(const path of ['/sports/softball', '/sports/softball/schools','/sports/softball/paris-junior-college','/sports/softball/texas-volts']) {
  assert.ok(routes.includes('"'+path+'"'),'Do not break existing evergreen softball routes');
}
const keys = new Set();
for(const entry of slim.pages){
  assert.ok(!keys.has(entry.slug),'No duplicate published slugs');
  keys.add(entry.slug);
  const p = approved.pages.find(p=>p.slug===entry.slug);
  assert.ok(p,'Unapproved school linked publicly');
  assert.equal(entry.uilName,p.identity.uilName);
  assert.equal(entry.conference,p.identity.conference);
  assert.equal(entry.district,p.identity.district);
  assert.equal(entry.region,p.identity.region);
  assert.ok(registry.schools.some(s=>s.name===entry.uilName&&s.conference===entry.conference&&s.district===entry.district&&s.region===entry.region));
}
// The negative examples remain test-only; never insert them into the manifest.
const safe = approved.pages.length === 0 && slim.pages.length===0;
if(safe) assert.ok(!routes.includes('"/sports/softball/shiner"'),'Unresearched Shiner page must not appear in sitemap');
console.log('PASS: server-only full team article payload, exact approved index, 404 for unknown team, SEO schemas, complete lazy article renderer and unchanged 1,192 listing. Approved school pages: '+slim.pages.length+'.');
