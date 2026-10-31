// Prevent HTML from outliving the JS/CSS module hashes it references.
// Applies to bounded public SSR sections where verified Googlebot requested
// stale main/Container/lazy-route bundles. No UA sniffing, no index directive,
// no changes to hashed asset caching, APIs, redirects or error responses.
export function applyHashedModuleDocumentCachePolicy(request: Request, response: Response): Response {
  if (request.method !== "GET" && request.method !== "HEAD") return response;
  if (response.status !== 200) return response;
  if (!(response.headers.get("content-type") || "").toLowerCase().includes("text/html")) return response;
  const path = new URL(request.url).pathname;
  if (!(path.startsWith("/property-tax/") || path.startsWith("/texas-high-school-football-teams/"))) {
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
