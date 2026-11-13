/**
 * Fresh, read-only production smoke test for the entire sports venues + events cluster.
 * No snapshots are read; every request bypasses normal browser/proxy caches.
 */
const origin = 'https://texasdefined.com';
const slugs = [
  'dallas-fort-worth', 'houston', 'austin-central-texas', 'san-antonio', 'waco',
  'college-station', 'el-paso', 'lubbock', 'football', 'baseball', 'basketball',
  'motorsports', 'college-sports', 'high-school-football', 'rodeo-western',
  'golf', 'soccer',
];
const urls = [
  '/sports-venues', '/sports-venues/compare',
  ...slugs.map((slug) => '/sports-venues/' + slug),
  '/sports-venue/jones-att-stadium', '/events',
];
const results = [];
const failures = [];
const observed = new Map();
function visibleText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(?:nbsp|#160);/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function check(path, attempt = 1) {
  const url = new URL(path, origin);
  url.searchParams.set('_authority_audit', String(Date.now()) + '-' + attempt);
  let response;
  let html = '';
  try {
    response = await fetch(url, {
      cache: 'no-store',
      signal: AbortSignal.timeout(20000),
      headers: {
        'cache-control': 'no-cache, no-store',
        pragma: 'no-cache',
        'user-agent': 'TexasDefinedAuthorityAudit/1.0 (+https://texasdefined.com)',
      },
    });
    html = await response.text();
  } catch (error) {
    if (attempt === 1) return check(path, 2);
    failures.push(path + ': network error ' + String(error));
    return;
  }
  if (response.status >= 500 && attempt === 1) return check(path, 2);
  if (response.status !== 200) {
    failures.push(path + ': HTTP ' + response.status);
    return;
  }
  if (!/<h1(?:\s|>)/i.test(html)) failures.push(path + ': missing rendered H1');
  const robotsHeader = response.headers.get('x-robots-tag') ?? '';
  if (/\bnoindex\b/i.test(robotsHeader)) failures.push(path + ': X-Robots-Tag unexpectedly blocks indexing');
  for (const metaTag of html.match(/<meta\b[^>]*>/gi) ?? []) {
    if (/name=["']robots["']/i.test(metaTag) && /\bnoindex\b/i.test(metaTag)) {
      failures.push(path + ': meta robots unexpectedly contains noindex');
    }
  }
  // Exact canonical URL may appear inside the head in either attribute order.
  const canonicalTag = html.match(/<link\b[^>]*\brel=["']canonical["'][^>]*>/i)?.[0]
    ?? html.match(/<link\b[^>]*\bhref=["'][^"']+["'][^>]*\brel=["']canonical["'][^>]*>/i)?.[0];
  const expectedCanonical = origin + path;
  if (!canonicalTag || !canonicalTag.includes(expectedCanonical)) failures.push(path + ': incorrect or missing canonical');
  if (path.startsWith('/sports-venues/') && path !== '/sports-venues/compare') {
    const choices = html.match(/<section\b[^>]*aria-labelledby="trip-choices-heading"[\s\S]*?<\/section>/i)?.[0];
    if (!choices || (choices.match(/<h3\b/gi) ?? []).length !== 3) {
      failures.push(path + ': expected three original destination-specific trip decisions in SSR');
    }
  }
  if (path === '/sports-venues/compare' && !html.includes('Venue or location')) failures.push(path + ': comparison filters missing from SSR');
  if (path === '/events' && /Photo:\s*(?:<[^>]+>\s*)*Photo:/i.test(html)) failures.push(path + ': doubled visible photo attribution label');
  observed.set(path, { html, text: visibleText(html) });
  results.push(path + ' HTTP 200');
}
for (let start = 0; start < urls.length; start += 3) {
  await Promise.all(urls.slice(start, start + 3).map((url) => check(url)));
}
// The two directory counters must be backed by exactly the same inventory,
// not a different graph count or an outdated client hydration snapshot.
const homepage = observed.get('/sports-venues')?.text ?? '';
const comparison = observed.get('/sports-venues/compare')?.text ?? '';
const directoryCount = homepage.match(/full comparison has\s+(\d+)\s+source-reviewed records/i)?.[1];
const tableCount = comparison.match(/Venue guides\s+(\d+)/i)?.[1];
if (!directoryCount || !tableCount || Number(directoryCount) !== Number(tableCount)) {
  failures.push('/sports-venues: comparison count drift (directory ' + (directoryCount ?? 'missing') + '; table ' + (tableCount ?? 'missing') + ')');
}
const western = observed.get('/sports-venues/rodeo-western')?.html ?? '';
const listing = western.match(/<section\b[^>]*aria-labelledby="venue-list-heading"[\s\S]*?<\/section>/i)?.[0] ?? '';
const repeatedWillRogers = (listing.match(/href=["']\/sports-venue\/will-rogers-memorial-center["']/gi) ?? []).length;
if (repeatedWillRogers !== 1) failures.push('/sports-venues/rodeo-western: Will Rogers must appear exactly once in the venue list (found ' + repeatedWillRogers + ')');
const galaxy = observed.get('/sports-venue/jones-att-stadium')?.html ?? '';
if (!galaxy.includes('60,229')) failures.push('/sports-venue/jones-att-stadium: source-reviewed capacity missing');
if (!galaxy.includes('texastech.com/facilities/galaxy-stadium/2')) failures.push('/sports-venue/jones-att-stadium: current official facility URL missing');
if (!galaxy.includes('texastech.com/sports/football/schedule')) failures.push('/sports-venue/jones-att-stadium: official football schedule missing');
if (galaxy.includes('route retained under the former Jones')) failures.push('/sports-venue/jones-att-stadium: internal SEO-maintenance prose exposed');
console.log('Fresh production checks completed: ' + results.length + '/' + urls.length + ' URLs');
if (failures.length) {
  console.error('Production authority audit failed:\n' + failures.map((line) => '- ' + line).join('\n'));
  process.exit(1);
}
console.log('All 21 sports and events URLs are reachable and retain their canonical, indexable visitor content.');
