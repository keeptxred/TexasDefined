/** Request-time canonical consolidation for the three published, owner-approved attraction guides.
 * This occurs before the TanStack SSR handler and never rewrites other destinations or non-navigation methods.
 * Tracking parameters are not separate crawlable documents; the clean page keeps its SEO metadata.
 */
export const REVIEWED_ATTRACTION_CANONICAL_PATHS = [
  "/destination/san-antonio-japanese-tea-garden",
  "/destination/fort-worth-water-gardens",
  "/destination/houston-botanic-garden"
] as const;
const canonicalPaths = new Set<string>(REVIEWED_ATTRACTION_CANONICAL_PATHS);

export function reviewedAttractionCanonicalRedirect(request: Request): Response | null {
  if (request.method !== "GET" && request.method !== "HEAD") return null;
  const url = new URL(request.url);
  if (url.hostname.toLowerCase() !== "texasdefined.com" &&
      url.hostname.toLowerCase() !== "www.texasdefined.com") return null;
  const path = url.pathname.replace(/\/+$/, "").toLowerCase();
  if (!canonicalPaths.has(path)) return null;
  const canonical = "https://texasdefined.com" + path;
  if (url.toString() === canonical) return null;
  return Response.redirect(canonical, 301);
}
