import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import manifest from '../../src/data/high-school-football/google-index-eligibility.generated.json' with { type: 'json' };

const read = (path) => readFileSync(new URL('../../' + path, import.meta.url), 'utf8');
const server = read('src/server.ts');
const football = read('src/data/high-school-football/football-sitemap.server.ts');
const collector = read('scripts/seo/sync-bing-webmaster.mjs');
const robots = read('public/robots.txt');
const index = read('public/sitemap-index.xml');
const googlePolicy = read('src/lib/google-only-indexing.ts');

assert.equal(manifest.teamIndexableSlugs.length + manifest.districtIndexableSlugs.length, 1099);
assert.equal((1292 - manifest.teamIndexableSlugs.length) + (192 - manifest.districtIndexableSlugs.length), 385);
assert(server.includes('/sitemap-bing-football.xml'));
assert(server.includes('bingExcludedFootballSitemapEntries'));
assert(server.includes('"application/xml; charset=utf-8"'));
assert(football.includes('export function bingExcludedFootballSitemapEntries()'));
assert(football.includes('isFootballTeamGoogleIndexReady'));
assert(football.includes('isFootballDistrictGoogleIndexReady'));
assert(football.includes('allTeams.size !== 1292'));
assert(football.includes('districtPaths.size !== 192'));
assert(collector.includes('SubmitFeed'));
assert(collector.includes('sitemap-bing-football.xml'));
assert(!robots.includes('sitemap-bing-football.xml'));
assert(!index.includes('sitemap-bing-football.xml'));
assert(googlePolicy.includes("name: 'googlebot', content: 'noindex, follow'"));
console.log('PASS: Bing discovery remains supplemental; Google-only noindex, original index and robots unchanged.');
