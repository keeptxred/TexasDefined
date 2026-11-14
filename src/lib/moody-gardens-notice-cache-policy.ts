/**
 * The Moody Gardens Nov. 16, 2026 early-closing advisory is rendered by SSR
 * from a time-window guard. Do not cache its HTML across the expiration instant:
 * a stale 200 response could incorrectly warn families after the outage is over.
 *
 * Only the canonical destination route is affected; JS/CSS/image assets and
 * the rest of the site's HTML cache policy remain unchanged.
 */
export const MOODY_GARDENS_NOTICE_CACHE_WINDOW = {
  startsAt: "2026-11-13T00:00:00Z",
  expiresAt: "2026-11-18T06:00:00Z", // 24h grace after CST midnight for delayed scheduled acceptance
} as const;

export function shouldPreventMoodyGardensNoticeCaching(
  pathname: string,
  now = Date.now(),
): boolean {
  return pathname === "/destination/moody-gardens"
    && Number.isFinite(now)
    && now >= Date.parse(MOODY_GARDENS_NOTICE_CACHE_WINDOW.startsAt)
    && now < Date.parse(MOODY_GARDENS_NOTICE_CACHE_WINDOW.expiresAt);
}

export function applyMoodyGardensNoticeCachePolicy(
  request: Request,
  response: Response,
  now = Date.now(),
): Response {
  if (request.method !== "GET" && request.method !== "HEAD") return response;
  if (!shouldPreventMoodyGardensNoticeCaching(new URL(request.url).pathname, now)) return response;
  if (response.status !== 200 || !response.headers.get("content-type")?.toLowerCase().includes("text/html")) {
    return response;
  }

  const headers = new Headers(response.headers);
  headers.set("Cache-Control", "no-store, max-age=0");
  headers.set("CDN-Cache-Control", "no-store");
  headers.set("Cloudflare-CDN-Cache-Control", "no-store");
  headers.delete("age");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
