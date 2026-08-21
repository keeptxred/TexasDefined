export const EXPLICIT_CANONICAL_PATHS: Readonly<Record<string, string>> = {
  'lake:caddo-lake': '/destination/caddo-lake',
  'state-park:palo-duro-canyon-state-park': '/destination/palo-duro-canyon-state-park',
  'state-park:enchanted-rock-state-natural-area': '/destination/enchanted-rock-state-natural-area',
  'national-park:big-bend-national-park': '/destination/big-bend-national-park',
  'cavern:natural-bridge-caverns': '/destination/natural-bridge-caverns',
  'beach:padre-island-national-seashore': '/destination/padre-island-national-seashore',
  'historic-site:the-alamo': '/destination/the-alamo',
};

const EXPLICIT_ALIAS_REDIRECTS: Readonly<Record<string, string>> = {
  '/sports-venue/nrg-stadium': '/sports-venue/reliant-stadium',
};

export function explicitCanonicalPath(kind: string, slug: string) {
  return EXPLICIT_CANONICAL_PATHS[`${kind}:${slug}`];
}

export function explicitEntityRedirectPath(pathname: string) {
  const normalizedPath = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  const aliasOwner = EXPLICIT_ALIAS_REDIRECTS[normalizedPath.toLowerCase()];
  if (aliasOwner) return aliasOwner;

  const match = normalizedPath.match(/^\/([^/]+)\/([^/]+)$/);
  if (!match) return undefined;

  let kind: string;
  let slug: string;
  try {
    kind = decodeURIComponent(match[1]).toLowerCase();
    slug = decodeURIComponent(match[2]).toLowerCase();
  } catch {
    return undefined;
  }
  return explicitCanonicalPath(kind, slug);
}
