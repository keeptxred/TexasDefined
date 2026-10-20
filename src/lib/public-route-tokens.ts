/** Reject serialized TanStack Router template segments from public crawl URLs. */
export function hasUnresolvedPublicRouteToken(path: string): boolean {
  // Search engines sometimes preserve escaped or double-escaped "$slug" route
  // parameters from historical links. Validate without rewriting real paths.
  let decoded = path;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    let next: string;
    try {
      next = decodeURIComponent(decoded);
    } catch {
      return true;
    }
    if (next === decoded) break;
    decoded = next;
  }
  return decoded.split("/").some((segment) =>
    segment.startsWith("$") || /^\{[-+]?\$[^}]+\}$/.test(segment),
  );
}
