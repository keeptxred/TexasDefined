/**
 * Read-only production contract test for Van Zandt county dynamic data.
 * Does not depend on an interactive browser or any private account.
 */
import assert from 'node:assert/strict';

const origin = (process.env.PRODUCTION_ORIGIN || 'https://texasdefined.com').replace(/\/$/, '');
const requestTimeoutMs = 25_000;

async function getJson(path) {
  const target = new URL(path, origin);
  const response = await fetch(target, {
    signal: AbortSignal.timeout(requestTimeoutMs),
    headers: {
      accept: 'application/json',
      'user-agent': 'TexasDefinedVanZandtProductionSmoke/1.0',
      'cache-control': 'no-cache',
    },
  });
  const body = await response.text();
  assert.equal(response.status, 200, `${target.pathname}: HTTP ${response.status}; ${body.slice(0, 300)}`);
  let json;
  try { json = JSON.parse(body); }
  catch { throw new Error(`${target.pathname}: expected valid JSON; got ${body.slice(0, 180)}`); }
  return { url: target.toString(), json };
}

async function getHtml(path) {
  const target = new URL(path, origin);
  const response = await fetch(target, {
    signal: AbortSignal.timeout(requestTimeoutMs),
    headers: {
      accept: 'text/html',
      'user-agent': 'TexasDefinedVanZandtProductionSmoke/1.0',
      'cache-control': 'no-cache',
    },
  });
  const html = await response.text();
  assert.equal(response.status, 200, `${target.pathname}: HTTP ${response.status}`);
  assert.match(response.headers.get('content-type') || '', /text\/html/i, 'County guide must be HTML');
  return { url: target.toString(), html };
}

const results = await Promise.allSettled([
  getJson('/api/property-tax-rates?county=van-zandt'),
  getJson('/api/high-school-football?county=Van%20Zandt%20County&limit=100'),
  getHtml('/county/van-zandt'),
]);

let failed = false;
for (let i = 0; i < results.length; i++) {
  const kind = ['property-tax-rates', 'high-school-football', 'county-guide-html'][i];
  const result = results[i];
  try {
    if (result.status === 'rejected') throw result.reason;
    const { url } = result.value;
    if (i === 2) {
      const { html } = result.value;
      const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      for (const required of [
        'Van Zandt County essentials',
        'County registry checked',
        'Guide updated',
        'October 26, 2026',
        'August 4, 2026',
        'Salt Palace Museum',
        '2025 population (estimate)',
        '66,130',
        'does not collect property taxes',
        'Historical background:',
      ]) assert.ok(text.includes(required), `County HTML missing: ${required}`);
      assert.ok(html.includes('grandsalinesaltpalace.com/'), 'County HTML missing Salt Palace museum link');
      assert.ok(html.includes('atlas.thc.texas.gov/Details/4302000092'), 'County HTML missing verified courthouse link');
      console.log(`PASS ${kind}: distinct registry and guide dates, practical places, sources and correct tax routing; ${url}`);
    } else if (i === 0) {
      const { json } = result.value;
      assert.equal(json.ready, true, 'Tax rate API must report ready=true');
      assert.equal(json.summary?.countySlug, 'van-zandt', 'Rate API must return the requested county');
      assert.ok(Number.isInteger(json.summary?.year) && json.summary.year >= 2021, 'Tax year must be present');
      for (const key of ['county', 'cities', 'schoolDistricts', 'specialDistricts']) {
        assert.ok(Array.isArray(json.summary?.[key]), `Tax summary missing ${key}`);
      }
      const count = ['county', 'cities', 'schoolDistricts', 'specialDistricts']
        .reduce((sum, key) => sum + json.summary[key].length, 0);
      assert.ok(count > 0, 'Tax source returned zero taxing units; check Supabase tax import');
      console.log(`PASS ${kind}: ${json.summary.year} year; ${count} taxing units; ${url}`);
    } else {
      const { json } = result.value;
      assert.equal(json.ok, true, 'Football API must report ok=true');
      assert.equal(json.alignmentCycle, '2026-28', 'Unexpected UIL alignment cycle');
      assert.ok(Array.isArray(json.programs), 'Football programs must be an array');
      assert.equal(json.directoryAvailable, true, 'TEA county enrichment is unavailable');
      assert.ok(json.programs.length > 0, 'No UIL school programs returned for Van Zandt County');
      assert.ok(json.programs.every(row => typeof row.schoolName === 'string' && row.profilePath?.startsWith('/texas-high-school-football-teams/')), 'Football directory returned invalid team profiles');
      console.log(`PASS ${kind}: ${json.programs.length} linked programs; ${url}`);
    }
  } catch (err) {
    failed = true;
    console.error(`FAIL ${kind}: ${err instanceof Error ? err.message : String(err)}`);
  }
}
if (failed) process.exitCode = 1;
