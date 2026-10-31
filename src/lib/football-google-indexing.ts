// Temporary Google Search-only isolation experiment. Checkpoint: GitHub issue #6473.
// All visitors and search engines receive the same header: no UA-based HTML variation.
// Google must still be allowed to crawl these URLs to discover the indexing directive.
const GOOGLE_FOOTBALL_INDEXING_PATHS = [
  '/texas-high-school-football-teams',
  '/texas-high-school-football-districts',
  '/texas-high-school-football-isds',
  '/texas-high-school-football-matchups',
  '/texas-high-school-football-playoff-brackets',
  '/texas-high-school-football-championship-history',
] as const;

export function isGoogleFootballIsolationPath(pathname: string): boolean {
  return GOOGLE_FOOTBALL_INDEXING_PATHS.some(
    (prefix) => pathname === prefix || pathname === `${prefix}/` || pathname.startsWith(`${prefix}/`),
  );
}

export function applyGoogleFootballIsolation(request: Request, response: Response): Response {
  if (request.method !== 'GET' && request.method !== 'HEAD') return response;
  if (response.status !== 200) return response;
  if (!isGoogleFootballIsolationPath(new URL(request.url).pathname)) return response;
  if (!/^text\/html(?:\s*;|\s*$)/i.test(response.headers.get('content-type') ?? '')) return response;

  const headers = new Headers(response.headers);
  // Named X-Robots-Tag affects Googlebot indexing only; Bing and other crawlers
  // are NOT restricted. Leave canonical, robots.txt, sitemap and link following intact.
  headers.append('X-Robots-Tag', 'googlebot: noindex');
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
