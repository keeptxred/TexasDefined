function decodePath(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function normalizeCommonsFilename(value: string) {
  return value
    .replace(/^File:/i, "")
    .replace(/_/g, " ")
    .normalize("NFKC")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function commonsFileIdentity(url: URL) {
  const path = decodePath(url.pathname);
  const redirectMatch = path.match(/^\/wiki\/Special:Redirect\/file\/(.+)$/i);
  if (redirectMatch?.[1]) return `commons:${normalizeCommonsFilename(redirectMatch[1])}`;

  const pageMatch = path.match(/^\/wiki\/(File:.+)$/i);
  if (pageMatch?.[1]) return `commons:${normalizeCommonsFilename(pageMatch[1])}`;

  if (url.hostname.toLowerCase() === "upload.wikimedia.org") {
    const filename = path.split("/").filter(Boolean).at(-1);
    if (filename) return `commons:${normalizeCommonsFilename(filename)}`;
  }

  return undefined;
}

export function canonicalImageReference(value: string | undefined) {
  const raw = value?.trim();
  if (!raw) return undefined;

  try {
    const url = new URL(raw);
    const hostname = url.hostname.toLowerCase();
    if (hostname === "commons.wikimedia.org" || hostname === "upload.wikimedia.org") {
      const commonsIdentity = commonsFileIdentity(url);
      if (commonsIdentity) return commonsIdentity;
    }

    const pathname = decodePath(url.pathname).replace(/\/$/, "") || "/";
    return `url:${hostname}${pathname}`;
  } catch {
    return `raw:${raw.normalize("NFKC").trim().toLowerCase()}`;
  }
}

export function imageReferencesMatch(
  left: readonly (string | undefined)[],
  right: readonly (string | undefined)[],
) {
  const leftKeys = new Set(left.map(canonicalImageReference).filter((value): value is string => Boolean(value)));
  if (!leftKeys.size) return false;
  return right.some((value) => {
    const key = canonicalImageReference(value);
    return Boolean(key && leftKeys.has(key));
  });
}
