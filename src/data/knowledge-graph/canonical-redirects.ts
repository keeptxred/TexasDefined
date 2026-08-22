const DESTINATION_OWNERS = '|lake:caddo-lake|state-park:palo-duro-canyon-state-park|state-park:enchanted-rock-state-natural-area|national-park:big-bend-national-park|cavern:natural-bridge-caverns|beach:padre-island-national-seashore|historic-site:the-alamo|';

export function explicitCanonicalPath(kind: string, slug: string) {
  return DESTINATION_OWNERS.includes(`|${kind}:${slug}|`) ? `/destination/${slug}` : undefined;
}

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
