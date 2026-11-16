/**
 * Read-only, bounded live HTML acceptance for exact source-verified GSC
 * ImageObject rights. Not Google URL Inspection and not a validation request.
 * Reuses the canonical deployment's source-identity/visible-credit contract.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { assertGscImageRights } from '../ci/verify-changed-production-pages.mjs';

const ORIGIN = 'https://texasdefined.com';
const WORKER = 'https://texasdefined-site.freddy-coppola.workers.dev';
const OUT = '.artifacts/seo/gsc-priority-pages/image-rights-report.json';
const DIRECT_CANARIES = Object.freeze([
  '/article/blue-bell-ice-cream-brenham-texas-history',
  '/article/state-fair-texas-2026-new-foods-guide',
  '/article/texas-borderlands-historic-sites-guide',
  '/article/texas-before-united-states-how-texas-began',
  '/article/texas-german-belt',
]);

const EXACT_RIGHTS_PATHS = Object.freeze([
  '/article/blue-bell-ice-cream-brenham-texas-history',
  '/article/state-fair-texas-2026-new-foods-guide',
  '/article/texas-borderlands-historic-sites-guide',
  '/article/texas-before-united-states-how-texas-began',
  '/article/texas-german-belt',
  '/article/texas-restaurants-for-out-of-town-visitors',
  '/article/unusual-texas-businesses-services',
  '/article/texas-high-school-football-playoffs-explained',
  '/article/texas-six-man-football-rules-explained',
  '/article/texas-cultural-regions-explained',
  '/article/texas-major-cities-regional-differences',
  '/article/texas-lakes-reservoirs-explained',
  '/destination/south-padre-island',
  '/destination/big-bend-ranch-state-park',
]);

export function imageRightsReviewPaths() {
  const paths = [...EXACT_RIGHTS_PATHS].sort();
  if (paths.length !== 14 ||
      new Set(paths).size !== 14 ||
      !paths.includes('/destination/big-bend-ranch-state-park') ||
      !paths.includes('/article/blue-bell-ice-cream-brenham-texas-history') ||
      DIRECT_CANARIES.some(p => !paths.includes(p))) {
    throw new Error('Source-verified ImageObject review must cover exactly fourteen known page owners');
  }
  return paths;
}

const extractAttr = (tag, name) => {
  const match = tag.match(new RegExp('\\b' + name + '\\s*=\\s*(["\'])(.*?)\\1', 'i'));
  return match?.[2]?.replaceAll('&amp;', '&') || '';
};
export function assertPublishedImageRights(html, path, xRobots = '', surface = 'public') {
  if (!/<html\b/i.test(html) || html.length < 500) throw new Error('Incomplete HTML');
  const expected = ORIGIN + path;
  const tags = html.match(/<link\b[^>]*>/gi) || [];
  const canonicals = tags.filter(tag => extractAttr(tag, 'rel').toLowerCase().split(/\s+/).includes('canonical'));
  if (canonicals.length !== 1 || extractAttr(canonicals[0], 'href') !== expected) {
    throw new Error('Missing or mismatched exact canonical for ' + path);
  }
  const metas = html.match(/<meta\b[^>]*>/gi) || [];
  for (const tag of metas) {
    if (['robots', 'googlebot', 'googlebot-news'].includes(extractAttr(tag, 'name').toLowerCase()) &&
        /\bnoindex\b/i.test(extractAttr(tag, 'content'))) {
      throw new Error('Unexpected robots noindex on ' + path);
    }
  }
  if (/\bnoindex\b/i.test(xRobots)) throw new Error('Unexpected X-Robots-Tag noindex on ' + path);
  assertGscImageRights(html, path, surface);
}

async function fetchAndVerify(host, target, surface, revision) {
  const origin = new URL(host).origin;
  const url = new URL(target, origin);
  if (surface === 'cache-busted') {
    url.searchParams.set('gsc_image_rights_release', revision);
  }
  let error;
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const response = await fetch(url, {
        redirect: 'manual',
        headers: {
          accept: 'text/html',
          'cache-control': 'no-cache',
          'user-agent': 'TexasDefined-SourceVerified-ImageRights/1.0',
        },
        signal: AbortSignal.timeout(25_000),
      });
      const html = await response.text();
      if (response.status !== 200 || response.headers.get('cf-mitigated') === 'challenge' ||
          !/text\/html/i.test(response.headers.get('content-type') || '')) {
        throw new Error('HTTP ' + response.status + ', type ' + response.headers.get('content-type'));
      }
      assertPublishedImageRights(html, target, response.headers.get('x-robots-tag') || '', host + ' / ' + surface);
      return { origin, path: target, surface, status: 200, passed: true, htmlBytes: html.length, attempt };
    } catch (caught) {
      error = caught instanceof Error ? caught.message : String(caught);
    }
  }
  return { origin, path: target, surface, passed: false, error };
}

export async function runImageRightsReview() {
  const paths = imageRightsReviewPaths();
  const revision = [process.env.GITHUB_SHA || 'local', process.env.GITHUB_RUN_ID || 'manual'].join('-');
  const results = [];
  for (const target of paths) {
    results.push(await fetchAndVerify(ORIGIN, target, 'ordinary-visitor', revision));
    results.push(await fetchAndVerify(ORIGIN, target, 'cache-busted', revision));
    if (DIRECT_CANARIES.includes(target)) {
      results.push(await fetchAndVerify(WORKER, target, 'ordinary-worker', revision));
    }
  }
  const failures = results.filter(result => !result.passed);
  const report = {
    checkedAt: new Date().toISOString(),
    repositorySha: process.env.GITHUB_SHA || null,
    canonicalOrigin: ORIGIN,
    directWorkerOrigin: WORKER,
    distinctRightsPages: paths.length,
    checks: results.length,
    passed: results.length - failures.length,
    failed: failures.length,
    results,
    caveat: 'This checks actual source-verified live SSR on bounded public pages. Only Google Search Console can report Google crawl time, Rich Results detection, or enhancement validation states.',
  };
  await fs.mkdir(path.dirname(OUT), { recursive: true });
  await fs.writeFile(OUT, JSON.stringify(report, null, 2) + '\n');
  console.log('GSC live ImageObject rights: ' + report.passed + '/' + report.checks +
    ' checks across ' + report.distinctRightsPages + ' canonical pages.');
  for (const result of failures) console.error('FAIL ' + result.origin + result.path + ' [' + result.surface + '] ' + result.error);
  if (failures.length) throw new Error('Source-verified image-rights production acceptance failed');
  return report;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await runImageRightsReview();
}
