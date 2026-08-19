import type { TexasIconItem } from "./things-unique-to-texas";

/**
 * Purpose-built evergreen guides take precedence over broad editorial links on
 * the 250-item source record. This lets an icon graduate into a substantial
 * canonical guide without rewriting or duplicating the original magazine data.
 */
const DEEP_DIVE_ICON_LINKS: Readonly<Record<number, string>> = {
  2: "/texas-chicken-fried-steak-guide",
  3: "/texas-chili-con-carne-history",
  4: "/texas-breakfast-taco-guide",
  7: "/dr-pepper-texas-history",
};

/**
 * Canonical TexasDefined destination guides for magazine entries whose editorial
 * record intentionally stays lightweight. Keep this mapping limited to direct,
 * high-confidence matches.
 */
const CANONICAL_ICON_LINKS: Readonly<Record<number, string>> = {
  56: "/destination/big-bend-national-park",
  57: "/destination/hamilton-pool-preserve",
  58: "/destination/palo-duro-canyon-state-park",
  59: "/destination/enchanted-rock-state-natural-area",
  61: "/destination/guadalupe-mountains-national-park",
  62: "/destination/natural-bridge-caverns",
  63: "/destination/barton-springs-pool",
  64: "/destination/jacobs-well-natural-area",
  65: "/destination/seminole-canyon-state-park-and-historic-site",
  66: "/destination/padre-island-national-seashore",
  67: "/destination/lost-maples-state-natural-area",
  68: "/destination/inner-space-cavern",
  71: "/destination/hueco-tanks-state-park-and-historic-site",
  72: "/destination/monahans-sandhills-state-park",
  74: "/destination/caprock-canyons-state-park",
  77: "/destination/balmorhea-state-park",
  79: "/destination/pedernales-falls-state-park",
  81: "/destination/south-padre-island",
  82: "/destination/franklin-mountains-state-park",
  88: "/destination/caddo-mounds-state-historic-site",
  90: "/destination/san-antonio-river-walk",
  91: "/destination/the-alamo",
  92: "/destination/texas-state-capitol",
  93: "/destination/space-center-houston",
  94: "/destination/sixth-floor-museum-at-dealey-plaza",
  95: "/destination/san-antonio-missions-national-historical-park",
  96: "/destination/fort-worth-stockyards",
  104: "/destination/washington-on-the-brazos-state-historic-site",
  105: "/destination/presidio-la-bahia",
  106: "/destination/goliad-state-park-and-historic-site",
  109: "/destination/kimbell-art-museum",
  112: "/destination/uss-lexington",
  113: "/destination/moody-gardens",
  116: "/destination/eisenhower-birthplace",
  117: "/destination/lyndon-b-johnson-national-historical-park",
  123: "/destination/confederate-reunion-grounds",
  128: "/destination/cadillac-ranch",
  132: "/destination/dr-pepper-museum",
  135: "/destination/luckenbach",
  140: "/destination/blue-hole-regional-park",
  165: "/destination/palo-duro-canyon-state-park",
};

export function texasIconCanonicalHref(entry: TexasIconItem): string | undefined {
  return DEEP_DIVE_ICON_LINKS[entry.id] ?? entry.href ?? CANONICAL_ICON_LINKS[entry.id];
}

export const TEXAS_ICON_CANONICAL_LINK_COUNT = Object.keys(CANONICAL_ICON_LINKS).length + Object.keys(DEEP_DIVE_ICON_LINKS).length;
