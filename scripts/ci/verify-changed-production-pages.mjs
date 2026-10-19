import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
export async function verifyChangedPages({ plan, head, fetchImpl = fetch }) {
const redirectChecks = plan.redirectChecks ?? [];
const downloadButtonPages = plan.downloadButtonPages ?? [];
const regionGuidePages = plan.regionGuidePages ?? [];
const footballGameNightPages = plan.footballGameNightPages ?? [];
if (!Array.isArray(footballGameNightPages) || footballGameNightPages.length > 2 || footballGameNightPages.some(p => !['/texas-high-school-football-teams/aledo', '/texas-high-school-football-teams/southlake-carroll'].includes(p) || !plan.selectedPaths?.includes(p))) throw new Error('Invalid bounded football team smoke contract');
if (!Array.isArray(regionGuidePages) || regionGuidePages.length > 1 || regionGuidePages.some(p => p !== '/article/texas-regions-explained' || !plan.selectedPaths?.includes(p))) throw new Error('Invalid Texas regions guide smoke contract');
if (!Array.isArray(downloadButtonPages) || downloadButtonPages.length > 1 || downloadButtonPages.some(p => p !== '/texas-data/texas-population-and-migration-2025' || !plan.selectedPaths?.includes(p))) throw new Error('Invalid data-brief smoke contract');
if (plan.head !== head || !Array.isArray(plan.selectedPaths) || !Array.isArray(redirectChecks) || redirectChecks.length > 3 || plan.selectedPaths.length + redirectChecks.length > 40) throw new Error('Missing, stale or oversized production change plan');
const origin = 'https://texasdefined.com';
const results = [];
for (const path of plan.selectedPaths) {
  const canonical = new URL(path, origin);
  if (canonical.origin !== origin || canonical.pathname !== path) throw new Error('Invalid planned public page');
  let failure;
  for (let attempt = 1; attempt <= 3; attempt++) {
    const url = new URL(canonical); url.searchParams.set('deploy_smoke', `${plan.head}-${attempt}`);
    try {
      const r = await fetchImpl(url, { redirect: 'follow', headers: { 'cache-control': 'no-cache', 'user-agent': 'TexasDefined-Changed-Page-Smoke' }, signal: AbortSignal.timeout(30000) });
      const html = await r.text();
      if (!r.ok || r.headers.get('cf-mitigated') === 'challenge') throw new Error(`HTTP ${r.status} or edge challenge`);
      if (!/<html\b/i.test(html) || !/<\/html>/i.test(html) || !/<title>[^<]+<\/title>/i.test(html)) throw new Error('Incomplete HTML/title');
      const links = [...html.matchAll(/<link\b[^>]*>/gi)].filter(m => /\brel=["']canonical["']/i.test(m[0]));
      const actual = links[0]?.[0].match(/\bhref=["']([^"']+)["']/i)?.[1];
      const finalPage = new URL(r.url || canonical.href);
      if (finalPage.origin !== origin) throw new Error('Redirect left the production origin');
      const expectedCanonical = finalPage.origin + finalPage.pathname;
      if (links.length !== 1 || actual !== expectedCanonical) throw new Error(`Unexpected canonical: ${actual || 'missing'}`);
      const expectedHrefs = plan.expectedHrefsByPage?.[path] ?? [];
      if (!Array.isArray(expectedHrefs) || expectedHrefs.length > 40) throw new Error('Invalid expected outbound link contract');
      if (expectedHrefs.length) {
        const anchors = new Set([...html.matchAll(/<a\b[^>]*>/gi)]
          .map(match => match[0].match(/\bhref=["']([^"']+)["']/i)?.[1])
          .filter(Boolean)
          .map(href => href.replace(/&amp;/g, '&')));
        for (const href of expectedHrefs) {
          if (!/^\/(?!\/)/.test(href) || !anchors.has(href)) throw new Error('Expected changed internal link is missing from SSR anchors: '+href);
        }
      }
      if (regionGuidePages.includes(path) && !/<h[2-4]\b[^>]*>\s*How to use the seven regions when planning a trip\s*<\/h[2-4]>/i.test(html)) {
        throw new Error('Texas regions guide is missing its reader-facing SSR heading');
      }
      if (downloadButtonPages.includes(path) && !/<button\b[^>]*>\s*Download CSV\s*<\/button>/i.test(html)) {
        throw new Error('Generic Texas Data brief is missing the server-rendered CSV download button');
      }
      if (footballGameNightPages.includes(path)) {
        const guide = html.indexOf('Game-night essentials');
        const season = html.indexOf('id="football-current-season"');
        const overview = html.indexOf('Program overview');
        if (guide < 0 || season <= guide || overview <= season) throw new Error('Football game-night or current-season SSR hierarchy missing');
        if (!html.includes('href="#football-current-season"')) throw new Error('Football schedule jump link missing from SSR');
        if (!html.includes('Browse the TexasDefined shop')) throw new Error('Football commerce link absent from SSR');
      }
      results.push({ path, passed: true, attempt }); failure = null; break;
    } catch (error) { failure = error.message; }
  }
  if (failure) results.push({ path, passed: false, error: failure });
}
// These are explicit, governed 301 aliases, not ordinary indexable HTML pages.
// Do not follow the redirect or a 200 landing page would mask a broken 301.
for (const check of redirectChecks) {
  const allowed = {
    '/texas-vs/california': '/article/texas-vs-california-differences',
    '/texas-vs/florida': '/article/texas-vs-florida-differences',
    '/destination/museum-south-texas-history-edinburg': '/destination/museum-of-south-texas-history-edinburg',
  };
  if (allowed[check.path] !== check.target) {
    throw new Error('Unexpected canonical redirect check');
  }
  let failure;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const url = new URL(check.path, origin);
      url.searchParams.set('deploy_smoke', plan.head + '-' + attempt);
      const response = await fetchImpl(url, {
        redirect: 'manual', cache: 'no-store',
        headers: { 'cache-control': 'no-cache', 'user-agent': 'TexasDefined-Canonical-Redirect-Smoke' },
        signal: AbortSignal.timeout(20000),
      });
      if (response.status !== 301 || response.headers.get('cf-mitigated') === 'challenge') {
        throw new Error('Expected HTTP 301, received ' + response.status);
      }
      const location = response.headers.get('location');
      if (!location) throw new Error('Missing Location on 301 response');
      const target = new URL(location, origin);
      if (target.origin !== origin || target.pathname !== check.target) {
        throw new Error('Incorrect redirect target: ' + target.href);
      }
      results.push({ path: check.path, passed: true, attempt, redirectTo: check.target, status: 301 });
      failure = null;
      break;
    } catch (error) { failure = error instanceof Error ? error.message : String(error); }
  }
  if (failure) results.push({ path: check.path, passed: false, error: failure });
}
return results;
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
const plan = JSON.parse(readFileSync('.artifacts/production-change-plan.json', 'utf8'));
const results = await verifyChangedPages({ plan, head: process.env.GITHUB_SHA });
writeFileSync('.artifacts/changed-production-pages.json', JSON.stringify({ ...plan, results }, null, 2));
for (const r of results) console.log(`${r.passed ? 'PASS' : 'FAIL'} ${r.path}${r.error ? ': ' + r.error : ''}`);
if (results.some(r => !r.passed)) throw new Error('Changed-page production smoke failed');
console.log(`Changed-page smoke passed for ${results.length} selected pages. Full audits run weekly locally.`);

}
