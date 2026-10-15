import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
export async function verifyChangedPages({ plan, head, fetchImpl = fetch }) {
if (plan.head !== head || !Array.isArray(plan.selectedPaths) || plan.selectedPaths.length > 40) throw new Error('Missing, stale or oversized production change plan');
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
      results.push({ path, passed: true, attempt }); failure = null; break;
    } catch (error) { failure = error.message; }
  }
  if (failure) results.push({ path, passed: false, error: failure });
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
