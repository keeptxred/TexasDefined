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
  // Exact canonical URL may appear inside the head in either attribute order.
  const canonicalTag = html.match(/<link\b[^>]*\brel=["']canonical["'][^>]*>/i)?.[0]
    ?? html.match(/<link\b[^>]*\bhref=["'][^"']+["'][^>]*\brel=["']canonical["'][^>]*>/i)?.[0];
  const expectedCanonical = origin + path;
  if (!canonicalTag || !canonicalTag.includes(expectedCanonical)) failures.push(path + ': incorrect or missing canonical');
  if (path.startsWith('/sports-venues/') && path !== '/sports-venues/compare' && !html.includes('Which outing fits your plans?')) {
    failures.push(path + ': original destination-specific choices not in SSR');
  }
  if (path === '/sports-venues/compare' && !html.includes('Venue or location')) failures.push(path + ': comparison filters missing from SSR');
  if (path === '/events' && /Photo:\s*(?:<[^>]+>\s*)*Photo:/i.test(html)) failures.push(path + ': doubled visible photo attribution label');
  results.push(path + ' HTTP 200');
}
for (let start = 0; start < urls.length; start += 3) {
  await Promise.all(urls.slice(start, start + 3).map((url) => check(url)));
}
console.log('Fresh production checks completed: ' + results.length + '/' + urls.length + ' URLs');
if (failures.length) {
  console.error('Production authority audit failed:\n' + failures.map((line) => '- ' + line).join('\n'));
  process.exit(1);
}
console.log('All 21 sports and events URLs are reachable and retain their canonical, indexable visitor content.');
