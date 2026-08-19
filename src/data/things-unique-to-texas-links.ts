import type { TexasIconItem } from "./things-unique-to-texas";

/**
 * Canonical TexasDefined guides for magazine entries whose editorial record
 * intentionally stays lightweight. Keep this mapping limited to direct,
 * high-confidence matches; an existing href on the editorial item always wins.
 */
const CANONICAL_ICON_LINKS: Readonly<Record<number, string>> = {
  56: "/destination/big-bend-national-park",
  57: "/destination/hamilton-pool-preserve",
  58: "/destination/palo-duro-canyon-state-park",
  61: "/destination/guadalupe-mountains-national-park",
  62: "/destination/natural-bridge-caverns",
  66: "/destination/padre-island-national-seashore",
  68: "/destination/inner-space-cavern",
  90: "/destination/san-antonio-river-walk",
  91: "/destination/the-alamo",
  92: "/destination/texas-state-capitol",
  93: "/destination/space-center-houston",
  94: "/destination/sixth-floor-museum-at-dealey-plaza",
  95: "/destination/san-antonio-missions-national-historical-park",
  96: "/destination/fort-worth-stockyards",
  113: "/destination/moody-gardens",
  128: "/destination/cadillac-ranch",
  165: "/destination/palo-duro-canyon-state-park",
};

export function texasIconCanonicalHref(entry: TexasIconItem): string | undefined {
  return entry.href ?? CANONICAL_ICON_LINKS[entry.id];
}

export const TEXAS_ICON_CANONICAL_LINK_COUNT = Object.keys(CANONICAL_ICON_LINKS).length;
