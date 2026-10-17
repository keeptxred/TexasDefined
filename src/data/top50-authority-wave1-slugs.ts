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
