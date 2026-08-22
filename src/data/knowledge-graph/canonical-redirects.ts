import { explicitCanonicalPath } from './canonical-ownership';

export function explicitEntityRedirectPath(pathname: string) {
  const normalizedPath = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  if (normalizedPath.toLowerCase() === '/sports-venue/nrg-stadium') return '/sports-venue/reliant-stadium';

  const match = normalizedPath.match(/^\/([^/]+)\/([^/]+)$/);
  if (!match) return undefined;

  try {
    return explicitCanonicalPath(decodeURIComponent(match[1]).toLowerCase(), decodeURIComponent(match[2]).toLowerCase());
  } catch {
    return undefined;
  }
}
