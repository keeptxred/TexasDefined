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
];
const oldContent = ['Farrington Field, a historic high school football stadium', 'Compare RV rentals on RVshare', 'Compare hotels on Hotels.com'];
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
    const noStore = /\bno-store\b/i.test(response.headers.get('cache-control') ?? '');
    const pass = response.status === 200 && missing.length === 0 && oldMarkers.length === 0 && noStore;
    results.push({
      label, url, status: response.status,
      cacheControl: response.headers.get('cache-control'),
      cfCacheStatus: response.headers.get('cf-cache-status'),
      age: response.headers.get('age'),
      missing, oldMarkers, noStore, pass,
    });
    if (!pass) failures += 1;
  } catch (error) {
    failures += 1;
    results.push({ label, url, pass: false, error: String(error) });
  }
}
console.log('Playoff guide 2026 exact release verification:', JSON.stringify(results, null, 2));
assert.equal(failures, 0, 'Deployed playoff article differs from source: reject stale hero, stale article date, missing bracket CTA, or edge-cached HTML');
