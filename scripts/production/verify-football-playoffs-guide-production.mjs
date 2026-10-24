import assert from 'node:assert/strict';

const slug = '/article/texas-high-school-football-playoffs-explained';
const endpoints = [
  { label: 'direct-worker', origin: 'https://texasdefined-site.freddy-coppola.workers.dev' },
  { label: 'canonical', origin: 'https://texasdefined.com' },
];
const checks = [
  ['Celina football hero alt text', 'Celina High School football field at night'],
  ['2026 official bracket navigation', 'View all 2026 playoff brackets'],
  ['updated article date', 'October 20, 2026'],
  ['image author credit', 'Heidi Knapp'],
  ['five-round six-man path', '1A six-man · five rounds'],
  ['six-round eleven-man path', '2A–6A · six rounds'],
  ['playoff travel planning', 'Plan your Texas playoff trip'],
  ['confirmed finals venue and dates', '2026 state finals: Arlington, December 16–19'],
  ['official UIL championship tickets', 'Official UIL championship schedule and ticket information'],
  ['affiliate disclosure', 'Affiliate disclosure: TexasDefined may earn a commission'],
  ['approved Hotels.com booking option', 'Compare hotels on Hotels.com'],
  ['approved RVshare option', 'Compare RV rentals on RVshare'],
];
const oldContent = ['Farrington Field, a historic high school football stadium'];
const results = [];
let failures = 0;
for (const { label, origin } of endpoints) {
  const url = origin + slug;
  try {
    const response = await fetch(url, {
      headers: { Accept: 'text/html', 'Cache-Control': 'no-cache' },
      cache: 'no-store',
      redirect: 'follow',
      signal: AbortSignal.timeout(30_000),
    });
    const html = await response.text();
    const missing = checks.filter(([, marker]) => !html.includes(marker)).map(([name]) => name);
    const oldMarkers = oldContent.filter((marker) => html.includes(marker));
    const affiliateContracts = ['hotels.com', 'rvshare'].map((partner) => {
      const tag = (html.match(/<a\b[^>]*>/gi) ?? []).find((value) => value.includes(`data-commercial-partner="${partner}"`));
      return { partner, valid: Boolean(tag && /rel="sponsored nofollow noopener noreferrer"/.test(tag) && tag.includes('anrdoezrs.net/links/101876465/type/dlg/')) };
    });
    const noStore = /\bno-store\b/i.test(response.headers.get('cache-control') ?? '');
    const pass = response.status === 200 && missing.length === 0 && oldMarkers.length === 0 && affiliateContracts.every((link) => link.valid) && noStore;
    results.push({
      label, url, status: response.status,
      cacheControl: response.headers.get('cache-control'),
      cfCacheStatus: response.headers.get('cf-cache-status'),
      age: response.headers.get('age'),
      missing, oldMarkers, affiliateContracts, noStore, pass,
    });
    if (!pass) failures += 1;
  } catch (error) {
    failures += 1;
    results.push({ label, url, pass: false, error: String(error) });
  }
}
console.log('Playoff guide 2026 exact release verification:', JSON.stringify(results, null, 2));
assert.equal(failures, 0, 'Deployed playoff article differs from source: reject stale content, missing approved affiliate offers or disclosures, or edge-cached HTML');
