// Bounded post-deploy acceptance for the owner-approved Google-only isolation test.
// This script reads public HTML headers; it does not write to Cloudflare or crawl the site.
import { appendFileSync } from 'node:fs';

const origins = [
  'https://texasdefined-site.freddy-coppola.workers.dev',
  'https://texasdefined.com',
];
const positive = [
  '/texas-high-school-football-teams',
  '/texas-high-school-football-teams/frisco-lone-star',
  '/texas-high-school-football-districts/6a-district-22',
  '/texas-high-school-football-isds/katy-isd',
];
const negative = [
  '/',
  '/events/november-events',
  '/article/texas-high-school-football-playoffs-explained',
];
const run = process.env.GITHUB_RUN_ID || 'manual';
const sha = process.env.GITHUB_SHA || 'unknown';
const failures = [];

for (const origin of origins) {
  for (const [expected, paths] of [[true, positive], [false, negative]]) {
    for (const path of paths) {
      const url = new URL(path, origin);
      url.searchParams.set('google_football_index_test', `${run}-${sha.slice(0, 10)}`);
      try {
        const response = await fetch(url, {
          method: 'GET',
          redirect: 'follow',
          cache: 'no-store',
          headers: {
            'user-agent': 'TexasDefined-Google-Indexing-Acceptance/1.0',
            'cache-control': 'no-cache, no-store, max-age=0',
          },
          signal: AbortSignal.timeout(15000),
        });
        const directive = response.headers.get('x-robots-tag') || '';
        const matched = /(?:^|,)\s*googlebot\s*:\s*noindex\s*(?:,|$)/i.test(directive);
        const pageOk = response.status === 200 && (response.headers.get('content-type') || '').toLowerCase().includes('text/html');
        if (!pageOk || matched !== expected) {
          failures.push(`${origin}${path}: status=${response.status}, html=${pageOk}, googlebot-noindex=${matched}, expected=${expected}, directive=${directive || '(none)'}`);
        } else {
          console.log(`PASS ${origin}${path}: Googlebot noindex ${expected ? 'present' : 'absent'}, HTTP 200 HTML`);
        }
        await response.body?.cancel();
      } catch (error) {
        failures.push(`${origin}${path}: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  }
}

if (failures.length) {
  for (const item of failures) console.error('FAIL ' + item);
  if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, `| ❌ FAIL | Google-only football indexing headers | ${failures.length} issues |\n`);
  process.exit(1);
}

if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, `| ✅ pass | Google-only football indexing headers | ${origins.length * (positive.length + negative.length)} targeted requests |\n`);
console.log('PASS: Google-only indexing headers present on football HTML and absent on non-football controls at both production origins.');
