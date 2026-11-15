import { HUNTING_REGULATION_FRESHNESS } from "./freshness";
import { TEXAS_DEER_AUTHORITY_TOPIC } from "./authority-deer";

// Production contract: these canonical hunting routes must render the current
// TPWD freshness and official-source signals. The post-deploy hunting verifier
// checks representative entries so a stale Worker cannot silently own them.
export const HUNTING_AUTHORITY_PATHS = [
  "/hunting",
  "/hunting/texas-hunting-license",
  "/hunting/hunter-education",
  "/hunting/public-hunting",
  "/hunting/annual-public-hunting-permit",
  "/hunting/drawn-hunts",
  "/hunting/hunting-seasons",
  "/hunting/bag-limits",
  "/hunting/archery-hunting",
  "/hunting/youth-hunting",
  "/hunting/texas-deer-hunting",
  "/hunting/mule-deer",
  "/hunting/dove-hunting",
  "/hunting/turkey-hunting",
  "/hunting/quail-hunting",
  "/hunting/waterfowl-hunting",
  "/hunting/javelina-hunting",
  "/hunting/feral-hogs",
  "/hunting/exotic-game",
  "/hunting/squirrel-hunting",
  "/hunting/rabbit-hare-hunting",
  "/hunting/pheasant-hunting",
  "/hunting/chachalaca-hunting",
  "/hunting/pronghorn-hunting",
  "/hunting/alligator-hunting",
  "/hunting/migratory-game-birds",
  "/hunting/goose-hunting",
  "/hunting/teal-hunting",
  "/hunting/sandhill-crane-hunting",
  "/hunting/other-migratory-game-birds",
  "/hunting/trapping-furbearers",
] as const;

export const HUNTING_SITEMAP_ENTRIES = HUNTING_AUTHORITY_PATHS.map((path) => ({
  path,
  // Sitemap <lastmod> tracks meaningful edits, not source-reachability checks.
  // Keep the deer guide tied directly to the actual editorial reviewedOn.
  lastmod: path === "/hunting/texas-deer-hunting"
    ? TEXAS_DEER_AUTHORITY_TOPIC.reviewedOn
    : HUNTING_REGULATION_FRESHNESS.lastVerified,
}));