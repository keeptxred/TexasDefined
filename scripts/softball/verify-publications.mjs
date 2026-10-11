#!/usr/bin/env node
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { validatePublishedManifest } from './authority-contract.mjs';

const root = resolve(import.meta.dirname, '../..');
const read = (p) => readFileSync(resolve(root,p),'utf8');
const manifest = JSON.parse(read('src/data/softball/published-team-profiles.json'));
const registry = JSON.parse(read('src/data/softball/uil-2026-27-registry.json'));
const approvedIndex = JSON.parse(read('src/data/softball/published-team-index.json'));
if (approvedIndex.version !== 1 || !Array.isArray(approvedIndex.pages)) throw new Error('Invalid approved softball directory index');
const errors = validatePublishedManifest(manifest, registry);
const staticRoutes = read('src/lib/public-routes.ts');
const head = read('src/routes/sports.softball.{-$team}.tsx');
const body = read('src/routes/sports.softball.{-$team}.lazy.tsx');
const teamComponent = read('src/components/softball/SoftballPublishedTeamAuthorityPage.tsx');
const directory = read('src/components/softball/SoftballSchoolsDirectory.tsx');
const serverLookup = read('src/data/softball/softball-published-team.server.ts');
const loader = read('src/data/softball/softball-published-team.functions.ts');
const sourceFiles = readdirSync(resolve(root,'src/routes')).filter((p)=>p.includes('softball'));
const published = new Set(manifest.pages.map(p=>p.slug));
// A large verified directory never grants permission for mass page creation.
// Per-school publication permission comes ONLY after first-release research passes.
if (process.env.GITHUB_BASE_REF) {
  let previous;
  try {
    const base = execFileSync('git', ['show','origin/' + process.env.GITHUB_BASE_REF + ':src/data/softball/published-team-profiles.json'], {cwd:root,encoding:'utf8'});
    previous = JSON.parse(base).pages;
  } catch (e) {
    // The first gated release creates the manifest. Other errors must be fixed.
    if (manifest.pages.length) errors.push('Missing trusted main publication manifest for the batch-size comparison');
    previous = [];
  }
  const prior = new Set(previous.map(p=>p.slug));
  const newlyPublished = [...published].filter(slug=>!prior.has(slug));
  // Publication is gated by complete research for *every* proposed page, not
  // an arbitrary number of schools. Large batches still require full CI,
  // full page-specific verification and signoff; never publish thin placeholders.
  if (newlyPublished.length) console.log('Validating ' + newlyPublished.length + ' newly researched softball pages for first-release completeness.');
  const removed = [...prior].filter(slug=>!published.has(slug));
  if (removed.length) errors.push('Unreviewed deletion of already-published softball pages: ' + removed.join(', '));
}
// A tiny exact-school approved index is the ONLY way the directory/sitemap
// gains links. The full 1,050+ word manifest remains a server-only import.
const indexedSlugs = new Set();
for (const item of approvedIndex.pages) {
  if (!item || typeof item.slug !== 'string' || indexedSlugs.has(item.slug)) {
    errors.push('Duplicate or invalid published softball index slug: ' + String(item?.slug));
    continue;
  }
  indexedSlugs.add(item.slug);
  const original = manifest.pages.find(p => p.slug === item.slug);
  if (!original) {
    errors.push(item.slug + ': forbidden published index link without complete first-release manifest record');
    continue;
  }
  const id = original.identity;
  if (item.uilName !== id.uilName || item.conference !== id.conference || item.district !== id.district || item.region !== id.region) {
    errors.push(item.slug + ': approved index school/district identity diverges from source-verified softball team');
  }
}
for (const record of manifest.pages) {
  if (!indexedSlugs.has(record.slug)) errors.push(record.slug + ': researched published page missing from exact approved index');
}
if (!staticRoutes.includes('publishedSoftballIndex') || !staticRoutes.includes('`/sports/softball/${entry.slug}`')) errors.push('Sitemap must derive team URLs solely from approved slim index');
if (!head.includes('getPublishedSoftballTeamPage') || !head.includes('if (!approved) throw notFound()')) errors.push('Individual team routes must load approved server records and reject unknown slugs');
if (!head.includes('loaderData') || !head.includes('SportsTeam') || !head.includes('jsonLd')) errors.push('Each approved team needs school-specific canonicals and structured data');
if (!body.includes('approvedProfile') || !body.includes('SoftballPublishedTeamAuthorityPage')) errors.push('Approved school pages need a shared lazy authority renderer');
if (!serverLookup.includes('published-team-profiles.json') || !loader.includes("import('./softball-published-team.server')")) errors.push('Full researched profile manifest must remain server-only');
if (!directory.includes('approvedTeamByIdentity') || !directory.includes('Read complete, independently verified team guide')) errors.push('Directory may only link exact-season independently approved teams');
for (const marker of ['profile.uniqueThesis', 'profile.sections', 'profile.claims', 'profile.sources', 'profile.media', 'profile.correctionsPolicy', 'profile.relatedPaths']) {
  if (!teamComponent.includes(marker)) errors.push('Complete team renderer omitted required evidence material: '+marker);
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
