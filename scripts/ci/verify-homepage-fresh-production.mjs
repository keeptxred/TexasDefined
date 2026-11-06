// Verify real public SSR HTML, not a search tool's cached preview or a build artifact.
// A new query key, no-cache headers, canonical + direct origins, and a bounded
// second attempt expose stale Worker/CDN HTML before calling a release healthy.
import { mkdir, writeFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const HOMEPAGE_ORIGINS = [
  'https://texasdefined.com',
  'https://texasdefined-site.freddy-coppola.workers.dev',
];
const REPORT_PATH = '.artifacts/homepage-live-parity.json';
const LEXINGTON_SLUG = 'uss-lexington-cv16-history-visitor-guide';
const generatedReadingMinutes = readFileSync(
  new URL('../../src/data/fixtures/uss-lexington-reading-time.generated.ts', import.meta.url),
  'utf8',
).match(/USS_LEXINGTON_CV16_READING_MINUTES\s*=\s*(\d+)\s*;/);
if (!generatedReadingMinutes) throw new Error('Missing USS Lexington generated reading-time contract');
export const EXPECTED_LEXINGTON_READING_MINUTES = Number(generatedReadingMinutes[1]);

// Anchor to the actual featured story heading, not arbitrary minutes in page JSON-LD,
// another article card, or the footer. Read visible text only up to the next heading.
function findLexingtonHeading(html) {
  return String(html).match(/<h[12]\b[^>]*>[\s\S]{0,1500}?USS Lexington \(CV-16\)[\s\S]{0,1500}?<\/h[12]>/i);
}

export function extractLexingtonReadingMinutes(html) {
  const heading = findLexingtonHeading(html);
  if (!heading) return null;
  const start = (heading.index ?? 0) + heading[0].length;
  const following = String(html).slice(start, start + 12000).split(/<h[12]\b/i)[0];
  const visibleText = following
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const minutes = visibleText.slice(0, 1200).match(/\bAbout\s+(\d+)\s+minutes?\b/i);
  return minutes ? Number(minutes[1]) : null;
}

export function checkHomepageHtml(html, contentType = 'text/html') {
  const text = typeof html === 'string' ? html : '';
  const checks = {
    htmlDocument: /<html\b/i.test(text) && /<h1\b/i.test(text),
    htmlMime: /text\/html/i.test(contentType),
    // An editorially rotated homepage may feature another story. Only require
    // Lexington parity while its heading is actually rendered here.
    lexingtonHomepageReadTime: !findLexingtonHeading(text) ||
      extractLexingtonReadingMinutes(text) === EXPECTED_LEXINGTON_READING_MINUTES,
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
  const result = { version: 2, observedAt: new Date().toISOString(), revision: probe,
    expectedLexingtonReadingMinutes: EXPECTED_LEXINGTON_READING_MINUTES,
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
          entry.lexingtonFeatured = Boolean(findLexingtonHeading(html));
          entry.homepageLexingtonReadingMinutes = extractLexingtonReadingMinutes(html);
          entry.bytes = Buffer.byteLength(html, 'utf8');
          entry.cacheStatus = response.headers.get('cf-cache-status') || null;
          if (entry.failures.length === 0 && entry.lexingtonFeatured) {
            // A homepage-only smoke test cannot catch a disagreement with its
            // linked article. Probe both normal production routes per origin.
            const articleUrl = new URL('/article/' + LEXINGTON_SLUG, origin);
            articleUrl.searchParams.set('_td_lexington_fresh', probe + '-' + attempt);
            const article = { url: articleUrl.href, status: null, readingMinutes: null, failures: [] };
            try {
              const articleResponse = await fetchImpl(articleUrl, {
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
              article.status = articleResponse.status;
              if (articleResponse.status !== 200 ||
                  articleResponse.headers.get('cf-mitigated') === 'challenge' ||
                  !/text\/html/i.test(articleResponse.headers.get('content-type') ?? '')) {
                article.failures.push('article-http-200-html-no-challenge');
              } else {
                const articleHtml = await articleResponse.text();
                article.readingMinutes = extractLexingtonReadingMinutes(articleHtml);
                if (article.readingMinutes !== EXPECTED_LEXINGTON_READING_MINUTES) {
                  article.failures.push('lexington-article-reading-time');
                }
                if (article.readingMinutes !== entry.homepageLexingtonReadingMinutes) {
                  article.failures.push('lexington-reading-time-disagreement');
                }
                article.cacheStatus = articleResponse.headers.get('cf-cache-status') || null;
              }
            } catch (error) {
              article.failures.push('article-request-failed');
              article.error = String(error);
            }
            entry.article = article;
            entry.failures.push(...article.failures);
          }
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
  console.log('[homepage-live] fresh SSR content, canonical, editorial corrections, events and USS Lexington ' +
    EXPECTED_LEXINGTON_READING_MINUTES + '-minute homepage/article parity verified on ' +
    [...new Set(result.checks.map(x => x.origin))].length + ' public origins');
  return result;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await verifyHomepageProduction();
}
