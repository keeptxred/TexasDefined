import { exploreHeroMap } from "./explore-hero-map";

/**
 * Structured data must never advertise a generic placeholder as an attraction's
 * photograph. If a relationship snapshot is stale, prefer the already-licensed,
 * exact-slug Explore photo inventory; otherwise omit the optional image field.
 */
export function relatedDestinationHeroSrc(slug: string, currentSrc: string | null | undefined): string | null {
  const existing = currentSrc?.trim() ?? "";
  if (existing && !/placeholder/i.test(existing)) return existing;

  const exactHero = exploreHeroMap[slug]?.src ?? "";
  return exactHero && !/placeholder/i.test(exactHero) ? exactHero : null;
}
