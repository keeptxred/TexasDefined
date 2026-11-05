// Verify real public SSR HTML, not a search tool's cached preview or a build artifact.
// A new query key, no-cache headers, canonical + direct origins, and a bounded
// second attempt expose stale Worker/CDN HTML before calling a release healthy.
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const HOMEPAGE_ORIGINS = [
  'https://texasdefined.com',
  'https://texasdefined-site.freddy-coppola.workers.dev',
];
const REPORT_PATH = '.artifacts/homepage-live-parity.json';

export function checkHomepageHtml(html, contentType = 'text/html') {
  const text = typeof html === 'string' ? html : '';
  const checks = {
    htmlDocument: /<html\b/i.test(text) && /<h1\b/i.test(text),
    htmlMime: /text\/html/i.test(contentType),
    expectedHomepageTitle: text.includes('The places, stories &amp; life of Texas') ||
      text.includes('The places, stories & life of Texas'),
    editorialContact: text.includes('Share a correction or firsthand Texas tip'),
    compactDisclosure: text.includes('Explore more outdoor, river, city and regional guides'),
    noDuplicateBand: !text.includes('Need a Texas answer, not another destination?'),
    canonical: [...text.matchAll(/<link\b[^>]*>/gi)].some(([tag]) =>
      /rel=["']canonical["']/i.test(tag) && /href=["']https:\/\/texasdefined\.com\/?["']/i.test(tag)),
    indexable: ![...text.matchAll(/<meta\b[^>]*>/gi)].some(([tag]) =>
      /name=["']robots["']/i.test(tag) && /(?:noindex|none)/i.test(tag)),
    noUnfixedCasi: !text.includes('CASI Terlingua International Chili Championship') ||
      (!text.includes('Major annual event in Terlingua') && text.includes('Rancho CASI de los Chisos')),
  };
  return { checks, failures: Object.entries(checks).filter(([, value]) => !value).map(([name]) => name) };
}

export async function verifyHomepageProduction({
  fetchImpl = fetch,
  origins = HOMEPAGE_ORIGINS,
  probe = (process.env.GITHUB_SHA || 'local').slice(0, 12) + '-' + (process.env.GITHUB_RUN_ID || 'local'),
  attempts = 2,
  reportPath = REPORT_PATH,
} = {}) {
  const result = { version: 1, observedAt: new Date().toISOString(), revision: probe,
    checks: [], state: 'not-verified' };
  for (const origin of origins) {
    let verified = false;
    for (let attempt = 1; attempt <= attempts; attempt++) {
      const url = new URL('/', origin);
      url.searchParams.set('_td_homepage_fresh', probe + '-' + attempt);
      const entry = { origin, attempt, url: url.href, status: null, checks: {}, failures: [] };
      try {
        const response = await fetchImpl(url, {
          method: 'GET',
          redirect: 'manual',
          cache: 'no-store',
          signal: AbortSignal.timeout(20000),
          headers: {
            'User-Agent': 'TexasDefined-Homepage-Live-Parity/1.0',
            'Cache-Control': 'no-cache, no-store',
            Pragma: 'no-cache',
            Accept: 'text/html',
          },
        });
        entry.status = response.status;
        if (response.status !== 200 || response.headers.get('cf-mitigated') === 'challenge') {
          entry.failures.push('http-200-no-challenge');
        } else {
          const html = await response.text();
          const observed = checkHomepageHtml(html, response.headers.get('content-type') ?? '');
          entry.checks = observed.checks;
          entry.failures.push(...observed.failures);
          entry.bytes = Buffer.byteLength(html, 'utf8');
          entry.cacheStatus = response.headers.get('cf-cache-status') || null;
        }
      } catch (error) {
        entry.failures.push('request-failed');
        entry.error = String(error);
      }
      result.checks.push(entry);
      if (entry.failures.length === 0) { verified = true; break; }
    }
    if (!verified) result.state = 'failed';
  }
  if (result.state !== 'failed') result.state = 'verified';
  await mkdir(dirname(reportPath), { recursive: true });
  await writeFile(reportPath, JSON.stringify(result, null, 2) + '\n');
  if (result.state !== 'verified') {
    throw new Error('Live homepage parity failed: ' + result.checks.filter(x => x.failures.length)
      .map(x => x.origin + ' attempt ' + x.attempt + ': ' + x.failures.join(', ')).join('; '));
  }
  console.log('[homepage-live] fresh SSR content, canonical, editorial corrections and events verified on ' +
    [...new Set(result.checks.map(x => x.origin))].length + ' public origins');
  return result;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await verifyHomepageProduction();
}
