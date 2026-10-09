import fs from 'node:fs/promises';

const places = await fs.readFile('src/data/texas-places.ts', 'utf8');
const names = /const COUNTY_NAMES\s*=\s*\x60([^\x60]+)\x60/.exec(places)?.[1]?.split('|');
if (!names || names.length !== 254) throw new Error('Expected the canonical list of 254 Texas counties.');
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const counties = names.map((name) => ({ name: name + ' County', slug: slugify(name) }));

async function checkHandbook(county) {
  const url = 'https://www.tshaonline.org/handbook/entries/' + county.slug + '-county';
  try {
    const response = await fetch(url, {
      redirect: 'follow',
      signal: AbortSignal.timeout(12000),
      headers: { 'user-agent': 'TexasDefinedCountyAuthorityAudit/1.0', accept: 'text/html' },
    });
    const html = await response.text();
    const matchesName = html.toLowerCase().includes(county.name.toLowerCase());
    const sameEntry = new URL(response.url).pathname === new URL(url).pathname;
    return {
      county: county.slug, url, http: response.status,
      state: response.status === 429 ? 'rate-limited-inconclusive'
        : response.ok && matchesName && sameEntry ? 'found-county-entry'
        : response.status === 404 ? 'not-found' : 'needs-review',
      reason: !response.ok ? 'HTTP ' + response.status
        : !sameEntry ? 'redirected to ' + response.url
        : !matchesName ? 'county name absent in returned HTML' : '',
    };
  } catch (error) {
    return { county: county.slug, url, http: null, state: 'network-inconclusive', reason: String(error).slice(0, 220) };
  }
}

const results = [];
const concurrency = 12;
for (let offset = 0; offset < counties.length; offset += concurrency) {
  const batch = await Promise.all(counties.slice(offset, offset + concurrency).map(checkHandbook));
  results.push(...batch);
  // Respect the publisher's 429 response: do not keep sending requests to a
  // rate-limited service, and do not confuse untested entries with 404s.
  if (batch.some((row) => row.http === 429)) {
    for (const county of counties.slice(offset + concurrency)) {
      results.push({
        county: county.slug,
        url: 'https://www.tshaonline.org/handbook/entries/' + county.slug + '-county',
        http: null,
        state: 'rate-limited-not-tested',
        reason: 'Skipped after publisher returned HTTP 429',
      });
    }
    break;
  }
}
const totals = {};
for (const row of results) totals[row.state] = (totals[row.state] ?? 0) + 1;
const output = '/tmp/county-history-reference-audit';
await fs.writeFile(output + '.json', JSON.stringify({
  generatedAt: new Date().toISOString(),
  publisher: 'Texas State Historical Association — Handbook of Texas',
  total: results.length,
  totals,
  warning: 'A matching county reference does not validate all claims on a TexasDefined county guide.',
  rows: results,
}, null, 2) + '\n');
await fs.writeFile(output + '.tsv',
  ['county', 'state', 'http', 'url', 'reason'].join('\t') + '\n' +
    results.map(r => [r.county,r.state,r.http ?? '',r.url,r.reason.replace(/[\t\r\n]/g,' ')].join('\t')).join('\n') + '\n');
console.log('HISTORY REFERENCES AUDITED: ' + JSON.stringify({total: results.length, ...totals}));
for (const row of results.filter(r => r.state !== 'found-county-entry')) {
  console.log('REVIEW ' + JSON.stringify(row));
}
