// Historical GSC aliases consolidate into existing, independently verified live pages.
// Curation lookup keys are not necessarily the published destination slug.
const destinationAliases: Record<string, string> = {
  "lipantitlan-state-historic-site": "lipantitlan",
  "choke-canyon-south-shore-unit-state-park": "choke-canyon-state-park",
  "san-jacinto-monument-state-historic-site": "san-jacinto-battleground",
  "seminole-canyon-state-park-and-historic-site": "seminole-canyon-state-park",
  "seminole-canyon-state-park-state-historic-site": "seminole-canyon-state-park",
  "goliad-state-park-state-historic-site": "goliad-state-park",
  "goliad-state-park-and-historic-site": "goliad-state-park",
  "barrington-farm-site": "barrington-living-history-farm",
  "fanthorp-inn-state-historic-site": "fanthorp-inn",
  "battleship-texas-state-historic-site": "battleship-texas",
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
