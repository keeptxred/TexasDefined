// Historical GSC aliases consolidate into existing, independently verified live pages.
// Curation lookup keys are not necessarily the published destination slug.
const destinationAliases: Record<string, string> = {
  "lipantitlan-state-historic-site": "lipantitlan",
  "choke-canyon-south-shore-unit-state-park": "choke-canyon-state-park",
  // Legacy North Shore naming is not a separate TPWD visitor unit.
  "choke-canyon-north-shore-unit-state-park": "choke-canyon-state-park",
  // Estelline Trailway access belongs to the Caprock Canyons visitor guide.
  "caprock-canyons-trailway-estelline-terminal-state-park": "caprock-canyons-state-park",
  "san-jacinto-monument-state-historic-site": "san-jacinto-battleground",
  "seminole-canyon-state-park-and-historic-site": "seminole-canyon-state-park",
  "seminole-canyon-state-park-state-historic-site": "seminole-canyon-state-park",
  "goliad-state-park-state-historic-site": "goliad-state-park",
  "goliad-state-park-and-historic-site": "goliad-state-park",
  "barrington-farm-site": "barrington-living-history-farm",
  "fanthorp-inn-state-historic-site": "fanthorp-inn",
  "battleship-texas-state-historic-site": "battleship-texas",
  // Two published Edinburg museum records describe the same physical museum.
  // Preserve the researched wave47 authority guide and 301 the older wave2 alias.
  "museum-south-texas-history-edinburg": "museum-of-south-texas-history-edinburg",
  "port-isabel-lighthouse-state-park": "port-isabel-lighthouse",
  "port-isabel-lighthouse-state-historic-site": "port-isabel-lighthouse",
  "monument-hill-kreische-brewery-state-historic-site": "monument-hill",
  "monument-hill-and-kreische-brewery-state-historic-sites": "monument-hill",
};

export const LEGACY_EDITORIAL_REDIRECTS: Record<string, string> = Object.fromEntries(
  Object.entries(destinationAliases).flatMap(([alias, primary]) =>
    ["destination", "historic-site", "state-park"].map((family) => [`/${family}/${alias}`, `/destination/${primary}`]),
  ),
);
LEGACY_EDITORIAL_REDIRECTS["/museum/barrington-farm-site"] = "/destination/barrington-living-history-farm";
// Historical San Antonio links: the city guide is /city/, not a destination.
LEGACY_EDITORIAL_REDIRECTS["/destination/san-antonio"] = "/city/san-antonio";
// El Paso's researched city authority lives at /city/el-paso, not a second
// destination slug. Preserve old destination referrals without duplicate SEO.
LEGACY_EDITORIAL_REDIRECTS["/destination/el-paso"] = "/city/el-paso";
// County feature was published with a -texas suffix; retain old inbound links.
LEGACY_EDITORIAL_REDIRECTS["/article/bexar-county-san-antonio-missions-river"] = "/article/bexar-county-san-antonio-missions-river-texas";

// Exact historical GSC aliases: all targets were confirmed HTTP 200 and
// self-canonical in production on 2026-11-13. The source URL alone is not a
// reason to create a duplicate authority page or relax any target noindex gate.
LEGACY_EDITORIAL_REDIRECTS["/attraction/dr-pepper-museum"] = "/destination/dr-pepper-museum-waco";
LEGACY_EDITORIAL_REDIRECTS["/destination/dr-pepper-museum"] = "/destination/dr-pepper-museum-waco";
LEGACY_EDITORIAL_REDIRECTS["/attraction/hill-country-louise-merrick-unit-state-natural-area"] = "/destination/hill-country-state-natural-area";
LEGACY_EDITORIAL_REDIRECTS["/destination/hill-country-louise-merrick-unit-state-natural-area"] = "/destination/hill-country-state-natural-area";
LEGACY_EDITORIAL_REDIRECTS["/state-park/indian-lodge-state-park-lodge"] = "/destination/indian-lodge";
LEGACY_EDITORIAL_REDIRECTS["/destination/indian-lodge-state-park-lodge"] = "/destination/indian-lodge";
// Seminole Canyon's 200 canonical remains editorially noindex today.
LEGACY_EDITORIAL_REDIRECTS["/destination/seminole-canyon-state-park-historic-site"] = "/destination/seminole-canyon-state-park";

// Historical GSC article aliases; preserve the original published authority page.
LEGACY_EDITORIAL_REDIRECTS["/news/stephen-f-austin-father-of-texas"] = "/article/stephen-f-austin-father-of-texas";
LEGACY_EDITORIAL_REDIRECTS["/news/juan-seguin-tejano-texas-revolution"] = "/article/juan-seguin-tejano-texas-revolution";
LEGACY_EDITORIAL_REDIRECTS["/news/san-antonio-spurs-texas-basketball-culture"] = "/article/san-antonio-spurs-texas-basketball-culture";
LEGACY_EDITORIAL_REDIRECTS["/news/texas-oil-boom-wichita-falls-west-texas-rigs"] = "/article/texas-oil-boom-wichita-falls-west-texas-rigs";
LEGACY_EDITORIAL_REDIRECTS["/news/dr-pepper-waco-texas-history"] = "/dr-pepper-texas-history";
LEGACY_EDITORIAL_REDIRECTS["/news/davy-crockett-texas-alamo-legend"] = "/article/davy-crockett-texas-alamo-legend";
LEGACY_EDITORIAL_REDIRECTS["/news/san-antonio-stock-show-rodeo-history-guide"] = "/article/san-antonio-stock-show-rodeo-history-guide";
// The published Ray Roberts State Park guide independently covers both units
// and their separate actual addresses, campground facilities and access notes.
LEGACY_EDITORIAL_REDIRECTS["/destination/ray-roberts-lake-isle-du-bois-unit-state-park"] = "/destination/ray-roberts-lake-state-park";
LEGACY_EDITORIAL_REDIRECTS["/state-park/ray-roberts-lake-isle-du-bois-unit-state-park"] = "/destination/ray-roberts-lake-state-park";
LEGACY_EDITORIAL_REDIRECTS["/destination/ray-roberts-lake-johnson-branch-unit-state-park"] = "/destination/ray-roberts-lake-state-park";
LEGACY_EDITORIAL_REDIRECTS["/state-park/ray-roberts-lake-johnson-branch-unit-state-park"] = "/destination/ray-roberts-lake-state-park";
LEGACY_EDITORIAL_REDIRECTS["/destination/fredericksburg-texas-wineries-things-to-do-guide"] = "/article/fredericksburg-texas-wineries-things-to-do-guide";

// Old Search Console links for two genuine, already published Texas homeowner
// research guides. Never send visitors to an unrelated calculator or generic hub.
LEGACY_EDITORIAL_REDIRECTS["/article/texas-home-insurance-guide"] = "/article/texas-homeowners-insurance-guide";
LEGACY_EDITORIAL_REDIRECTS["/article/texas-hurricane-preparation-guide"] = "/article/texas-hurricane-preparation-homeowners-renters";
// Long-form Cameron County series was consolidated to its canonical county profile.
LEGACY_EDITORIAL_REDIRECTS["/article/cameron-county-brownsville-harlingen-south-padre-rio-grande"] = "/county/cameron";

const historicalArticleSlugs = [
  "audie-murphy-texas-war-hero-actor",
  "fort-worth-stockyards-history-cattle-culture",
  "mirabeau-b-lamar-president-republic-texas",
  "blue-bell-ice-cream-brenham-texas-history",
  "bucees-texas-road-trip-history",
  "james-bowie-texas-alamo-life-legend",
  "william-barret-travis-alamo-commander",
  "chester-nimitz-texas-fleet-admiral",
];
for (const slug of historicalArticleSlugs) {
  LEGACY_EDITORIAL_REDIRECTS[`/news/${slug}`] = `/article/${slug}`;
}

/** Point editorial collection links directly at the published canonical
 * destination, while preserving separate 301s for incoming historical URLs.
 */
export function canonicalDestinationSlug(slug: string): string {
  const target = LEGACY_EDITORIAL_REDIRECTS[`/destination/${slug}`];
  return target?.startsWith("/destination/") ? target.slice("/destination/".length) : slug;
}
