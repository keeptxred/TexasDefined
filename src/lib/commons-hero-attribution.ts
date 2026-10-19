/**
 * Attribution metadata for an exact Wikimedia Commons image in a Destination hero.
 *
 * Only links to original file descriptions and license terms when the source is
 * a Commons file path. No image rights are inferred from a URL alone: the
 * displayed credit must explicitly name the Commons license. This helper
 * never overrides the source's actual copyright/usage restrictions.
 */
export function commonsHeroAttribution(src: string, credit?: string | null): {
  sourceUrl: string;
  licenseUrl: string | null;
  licenseCode: string | null;
} | null {
  try {
    const delivered = new URL(src, "https://texasdefined.com");
    const originalUrl = delivered.pathname === "/media/remote"
      ? delivered.searchParams.get("url") || src
      : src;
    const original = new URL(originalUrl);
    if (original.hostname !== "commons.wikimedia.org") return null;
    const match = original.pathname.match(/^\/wiki\/Special:Redirect\/file\/(.+)$/);
    if (!match) return null;
    const sourceUrl = "https://commons.wikimedia.org/wiki/File:" + match[1];
    const licenseCode = credit?.match(/\bCC BY(?:-SA)? [0-9]+(?:\.[0-9]+)?\b/i)?.[0] ?? null;
    const licenseUrl = licenseCode
      ? "https://creativecommons.org/licenses/" +
        (licenseCode.toUpperCase().includes("BY-SA") ? "by-sa/" : "by/") +
        (licenseCode.match(/[0-9]+(?:\.[0-9]+)?/)?.[0] ?? "") + "/"
      : null;
    return { sourceUrl, licenseCode, licenseUrl };
  } catch {
    return null;
  }
}
