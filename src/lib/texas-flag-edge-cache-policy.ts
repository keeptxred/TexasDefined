// Prevent a stale shared edge HTML response from hiding a protected release
// on the two Texas flag authority canonicals. A client/cache-busting query
// must not be required to see the same researched edition.
export const TEXAS_FLAG_CANONICAL_PATHS = new Set([
  "/texas-flag",
  "/article/history-of-the-texas-flag",
]);

export function applyTexasFlagEdgeCachePolicy(request: Request, response: Response): Response {
  if (request.method !== "GET" && request.method !== "HEAD") return response;
  if (!TEXAS_FLAG_CANONICAL_PATHS.has(new URL(request.url).pathname)) return response;
  if (!(response.headers.get("content-type") || "").toLowerCase().includes("text/html")) return response;

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
