import test from 'node:test';
import assert from 'node:assert/strict';
import { verifySchoolSitemapCoverage } from './verify-football-b011-sitemap-eligibility.mjs';
const origin = 'https://texasdefined.com/texas-high-school-football-teams/';
const xml = (slugs) => '<urlset>' + slugs.map(s => '<url><loc>' + origin + s + '</loc></url>').join('') + '</urlset>';
const fetcher = (google, bing) => async (url) => ({status:200,text:async()=>xml(url.endsWith('/sitemap.xml')?google:bing)});
test('staged Colorado City stays off Google and in Bing while protected Jarrell stays on Google', async () => {
  assert.deepEqual(await verifySchoolSitemapCoverage(['colorado-city-colorado','jarrell'],fetcher(['jarrell'],['colorado-city-colorado'])),[]);
});
test('missing Bing discovery fails closed', async () => {
  assert.match((await verifySchoolSitemapCoverage(['colorado-city-colorado'],fetcher([],[]))).join(' '),/absent from Bing-only sitemap/);
});
test('staged Google leakage fails closed', async () => {
  assert.match((await verifySchoolSitemapCoverage(['colorado-city-colorado'],fetcher(['colorado-city-colorado'],['colorado-city-colorado']))).join(' '),/leaked into Google sitemap/);
});
test('protected school missing from primary fails closed', async () => {
  assert.match((await verifySchoolSitemapCoverage(['jarrell'],fetcher([],[]))).join(' '),/absent from Google sitemap/);
});
