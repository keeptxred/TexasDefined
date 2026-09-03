const VIATOR_TEXAS_URL = "https://www.viator.com/Texas/d296";

/**
 * Destination pages verified against live Viator inventory on 2026-09-03.
 * Keep this deliberately conservative: a market without a verified destination
 * URL falls back to the live statewide Texas catalog rather than an invented
 * search path.
 */
export const VERIFIED_VIATOR_TEXAS_DESTINATION_URLS: Readonly<Record<string, string>> = {
  austin: "https://www.viator.com/Austin/d5021",
  "san-antonio": "https://www.viator.com/San-Antonio/d910",
  dallas: "https://www.viator.com/Dallas/d918",
  "fort-worth": "https://www.viator.com/Fort-Worth/d33749",
  houston: "https://www.viator.com/Houston/d5186",
  galveston: "https://www.viator.com/Galveston/d4385",
  fredericksburg: "https://www.viator.com/Fredericksburg/d50796",
  waco: "https://www.viator.com/Waco/d50076",
  "corpus-christi": "https://www.viator.com/Corpus-Christi/d28078",
  "port-aransas": "https://www.viator.com/Port-Aransas/d50797-ttd",
  "south-padre-island": "https://www.viator.com/South-Padre-Island/d22446-ttd",
  "el-paso": "https://www.viator.com/El-Paso/d50135",
};

export function verifiedViatorMarketUrl(slug: string, declaredUrl?: string) {
  return VERIFIED_VIATOR_TEXAS_DESTINATION_URLS[slug] ?? declaredUrl ?? VIATOR_TEXAS_URL;
}

export function hasVerifiedViatorMarketUrl(slug: string, declaredUrl?: string) {
  return Boolean(VERIFIED_VIATOR_TEXAS_DESTINATION_URLS[slug] ?? declaredUrl);
}

export function viatorTexasUrl() {
  return VIATOR_TEXAS_URL;
}
