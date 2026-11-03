import assert from 'node:assert/strict';

const origin = process.env.TEXASDEFINED_ORIGIN || 'https://texasdefined.com';
const pages = [
  {
    path: '/property-tax/taxing-unit/edna',
    required: ['Edna property tax rate', '0.2263', 'Historical rates requiring reconciliation', 'Jackson County Tax Assessor-Collector'],
  },
  {
    path: '/property-tax/taxing-unit/jackson-county-esd-1',
    required: ['Jackson County ESD #1 property tax rate', 'An emergency-services district levy', '0.062000'],
  },
  {
    path: '/county/collin',
    required: ['Collin County', 'Taxing units in Collin County', 'School districts', 'Cities / municipalities', 'Full county property-tax guide'],
    forbidden: ['Checking finalized local tax rates…'],
  },
  {
    path: '/events',
    required: ['What’s happening across Texas', 'How this calendar works', 'Upcoming events across Texas', 'Official event site'],
  },
];

for (const page of pages) {
  const url = new URL(page.path, origin);
  url.searchParams.set('authority_probe', String(Date.now()));
  const response = await fetch(url, {
    headers: { 'cache-control': 'no-cache', 'user-agent': 'TexasDefined-Authority-Smoke/1.0' },
    signal: AbortSignal.timeout(15_000),
    redirect: 'follow',
  });
  assert.equal(response.status, 200, page.path + ' returned HTTP ' + response.status);
  assert.notEqual(response.headers.get('cf-mitigated'), 'challenge', page.path + ' challenged by Cloudflare');
  const html = await response.text();
  assert.ok(!/<meta[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html), page.path + ' unexpectedly noindex');
  assert.ok(html.includes('https://texasdefined.com' + page.path), page.path + ' missing canonical URL');
  for (const required of page.required) {
    assert.ok(html.includes(required), page.path + ' missing server-rendered: ' + required);
  }
  for (const forbidden of page.forbidden ?? []) {
    assert.ok(!html.includes(forbidden), page.path + ' has old client-only placeholder: ' + forbidden);
  }
  console.log('PASS', page.path, '200; crawlable content and canonical verified');
}
