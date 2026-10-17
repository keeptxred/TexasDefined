/** Lightweight detection for ten already-canonical Top 50 guide upgrades.
 * Full editorial guide content is loaded on demand, never on listing pages.
 */
export const TOP50_AUTHORITY_WAVE1_SLUGS = [
  "dinosaur-valley-state-park",
  "garner-state-park",
  "south-padre-island-beaches",
  "port-aransas-beach",
  "texas-state-aquarium",
  "fort-worth-zoo",
  "san-antonio-zoo",
  "reunion-tower-dallas",
  "magnolia-market-at-the-silos",
  "mcdonald-observatory"
] as const;
export type Top50AuthorityWave1Slug = typeof TOP50_AUTHORITY_WAVE1_SLUGS[number];
const TOP50_WAVE1_SET = new Set<string>(TOP50_AUTHORITY_WAVE1_SLUGS);
export function isTop50AuthorityWave1(slug: string): slug is Top50AuthorityWave1Slug {
  return TOP50_WAVE1_SET.has(slug);
}

/** Four separate newly registered canonical park destinations from Top 50. */
const TOP50_THEME_PARK_SLUGS = new Set<string>([
  "schlitterbahn-new-braunfels",
  "six-flags-over-texas",
  "seaworld-san-antonio",
  "six-flags-fiesta-texas",
]);
export function isTop50ThemeParkDestination(slug: string): boolean {
  return TOP50_THEME_PARK_SLUGS.has(slug);
}

/** Route a single new wildlife guide without loading its substantial prose in indexes. */
export function isTop50BatColonyDestination(slug: string): boolean {
  return slug === "congress-avenue-bridge-bat-colony";
}
