/**
 * Read only the primary destination hero from server-rendered HTML.
 * Related-place cards, recommendation images and editorial body media may
 * legitimately use a placeholder without invalidating this destination's
 * independently licensed, indexable primary photograph.
 *
 * The public destination template renders a marker immediately before its
 * primary <img>. If that markup changes, fail closed: don't silently accept
 * an og:image or another page's unrelated thumbnail as proof of a hero.
 */
export function primaryDestinationHeroSrc(html) {
  const leadingHero = html.match(/<div\b[^>]*\bdata-image-fallback-label\b[^>]*>\s*<\/div>\s*<img\b[^>]*>/i)?.[0] ?? "";
  const imgTag = leadingHero.match(/<img\b[^>]*>/i)?.[0] ?? "";
  return (imgTag.match(/\bsrc=["']([^"']+)["']/i)?.[1] ?? "")
    .replace(/&amp;/gi, "&");
}

export function isMissingPrimaryDestinationHero(html) {
  const src = primaryDestinationHeroSrc(html);
  return !src || /(?:^|\/)texasdefined-destination-placeholder\.svg(?:[?#]|$)/i.test(src);
}
