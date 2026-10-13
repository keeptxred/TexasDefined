import { TEXAS_CITIES } from "./texas-places";
import { TOWN_AUTHORITY_LINK_PLACES } from "./town-authority-link-index";
import type { Destination } from "./types";

export type TownLink = { href: string; label: string; description: string };
const townLink = (slug: string, label: string, description: string): TownLink => ({
  href: "/destination/" + slug, label, description,
});

/** Only compact place identity data is loaded into browser components. */
const townBySlug = new Map(TOWN_AUTHORITY_LINK_PLACES.map((town) => [town.slug, town] as const));
export const TOWN_AUTHORITY_SLUGS = [...townBySlug.keys()] as readonly string[];

const pairedTowns: Record<string, TownLink[]> = {
  "fredericksburg": [
    townLink("boerne", "Boerne's Hill Country Main Street", "Contrast Fredericksburg's German-Texan and winery mix with Boerne's historic downtown and Cibolo nature." ),
    townLink("marble-falls", "Marble Falls and the Highland Lakes", "Build a separate lakeside Hill Country weekend west of Austin." ),
  ],
  "wimberley": [
    townLink("gruene-historic-district", "Gruene Historic District", "Compare Wimberley's village-and-spring setting with New Braunfels' historic Guadalupe River district." ),
    townLink("boerne", "Boerne", "For another walkable Hill Country center, pair downtown shops with nature and nearby parks." ),
  ],
  "gruene-historic-district": [
    townLink("wimberley", "Wimberley", "Add a different Hill Country village centered on Cypress Creek, Blue Hole and local art." ),
    townLink("fredericksburg", "Fredericksburg", "Compare Gruene's dance-hall and river district with a wine-country museum weekend." ),
  ],
  "boerne": [
    townLink("bandera", "Bandera", "Continue west toward Medina River country and working-ranch heritage." ),
    townLink("fredericksburg", "Fredericksburg", "Add a separate historic-town and winery itinerary farther north." ),
  ],
  "marble-falls": [
    townLink("fredericksburg", "Fredericksburg", "Compare the Highland Lakes with Fredericksburg's downtown history and wine corridor." ),
    townLink("boerne", "Boerne", "Another Hill Country town-and-nature pairing for a longer road trip." ),
  ],
  "bandera": [
    townLink("boerne", "Boerne", "Connect ranch-country travel to Boerne's historic core and parks." ),
    townLink("fredericksburg", "Fredericksburg", "Add a separate German-Texan heritage and museum itinerary." ),
  ],
  "port-aransas": [
    townLink("rockport", "Rockport", "Compare open Gulf surf and Mustang Island with calmer Aransas Bay and birding." ),
  ],
  "rockport": [
    townLink("port-aransas", "Port Aransas", "Compare Rockport's bayfront and arts setting with Gulf beach and ferry travel." ),
  ],
  "jefferson": [
    { href: "/county/marion", label: "Marion County", description: "Connect Jefferson's riverport history with county geography, waterways and surrounding communities." },
  ],
  "salado": [
    { href: "/county/bell", label: "Bell County", description: "Connect Salado's creekside heritage with Belton, Temple and the wider county." },
  ],
  "granbury": [
    townLink("glen-rose", "Glen Rose", "Combine Lake Granbury and the courthouse square with a separate dinosaur-track and Paluxy River day." ),
  ],
  "glen-rose": [
    townLink("granbury", "Granbury", "Connect Glen Rose's fossil and river sights with a historic square and lakefront town." ),
  ],
  "alpine": [
    townLink("marfa", "Marfa", "Compare Alpine's university and museum base with Marfa's contemporary art institutions." ),
    townLink("fort-davis", "Fort Davis", "Plan a separate mountain, observatory and frontier-history outing." ),
  ],
  "marfa": [
    townLink("alpine", "Alpine", "Find a practical university-town base and the Museum of the Big Bend." ),
    townLink("fort-davis", "Fort Davis", "Add frontier history and Davis Mountains dark-sky travel without underestimating drive times." ),
  ],
  "fort-davis": [
    townLink("alpine", "Alpine", "A neighboring West Texas base with museums and services." ),
    townLink("marfa", "Marfa", "Add contemporary art and separate gallery reservations to a West Texas loop." ),
  ],
};

/** Explicitly relevant attraction-to-town links, not generic countywide link spam. */
const attractionToTowns: Record<string, string[]> = {
  "lake-marble-falls": ["marble-falls"],
  "inks-lake-state-park": ["marble-falls"],
  "longhorn-cavern-state-park": ["marble-falls"],
  "lakeside-park-marble-falls": ["marble-falls"],
  "port-aransas-beach": ["port-aransas"],
  "ib-magee-beach-park": ["port-aransas"],
  "mustang-island-state-park": ["port-aransas"],
  "rockport-beach": ["rockport"],
  "goose-island-state-park": ["rockport"],
  "blue-hole-regional-park-wimberley": ["wimberley"],
  "jacobs-well-natural-area": ["wimberley"],
  "gruene-hall": ["gruene-historic-district"],
  "guadalupe-river": ["gruene-historic-district"],
  "national-museum-pacific-war": ["fredericksburg"],
  "fredericksburg-historic-district": ["fredericksburg"],
  "enchanted-rock-state-natural-area": ["fredericksburg"],
  "dinosaur-valley-state-park": ["glen-rose"],
  "fossil-rim-wildlife-center": ["glen-rose"],
  "lake-granbury": ["granbury"],
  "fort-davis-national-historic-site": ["fort-davis"],
  "davis-mountains-state-park": ["fort-davis"],
  "museum-of-the-big-bend": ["alpine"],
  "chinati-foundation": ["marfa"],
};


const townNames: Record<string, string> = Object.fromEntries(
  TOWN_AUTHORITY_LINK_PLACES.map((place) => [place.slug, place.name]),
);
const countyKey = (value: string) => value
  .replace(/\s+county$/i, "")
  .trim().toLowerCase()
  .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const countyTowns: Record<string, string[]> = {};
for (const place of TOWN_AUTHORITY_LINK_PLACES) {
  if (!place.county || /[,;/&]/.test(place.county)) continue;
  (countyTowns[countyKey(place.county)] ??= []).push(place.slug);
}
for (const slugs of Object.values(countyTowns)) {
  slugs.sort((left, right) => townNames[left].localeCompare(townNames[right]));
}
const near = (a: {lat:number;lng:number}, b: {lat:number;lng:number}) => {
  const radians = (n: number) => n * Math.PI / 180;
  const dLat = radians(b.lat - a.lat), dLng = radians(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(radians(a.lat)) * Math.cos(radians(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 3958.8 * 2 * Math.asin(Math.sqrt(Math.min(1, h)));
};

export function townAuthorityCountyLinks(countySlug: string): TownLink[] {
  return (countyTowns[countySlug] ?? []).map((slug) =>
    townLink(slug, townNames[slug], "Locally researched history, travel logistics, attractions, itineraries and primary visitor sources."));
}
export function townAuthorityCityLinks(citySlug: string): TownLink[] {
  const actual = citySlug === "gruene" || citySlug === "new-braunfels" ? "gruene-historic-district" : citySlug;
  if (townBySlug.has(actual)) {
    return [townLink(actual, townNames[actual], "Explore the independently researched local visitor guide and its attractions.")];
  }
  const city = TEXAS_CITIES.find((entry) => entry.slug === citySlug);
  if (!city) return [];
  return (countyTowns[countyKey(city.county)] ?? []).slice(0, 3)
    .map((slug) => townLink(slug, townNames[slug], "Explore a separately researched town in the same county."));
}

export function townAuthorityContextualLinks(
  destination: Pick<Destination, "slug" | "nearestTown" | "county" | "coordinates" | "region">,
): TownLink[] {
  const curated = pairedTowns[destination.slug] ?? [];
  const explicit = attractionToTowns[destination.slug] ?? [];
  const town = townBySlug.get(destination.slug);
  const sameTown = TOWN_AUTHORITY_LINK_PLACES
    .filter((candidate) => candidate.slug !== destination.slug &&
      candidate.name.toLowerCase() === destination.nearestTown.toLowerCase())
    .map((candidate) => candidate.slug);
  const sameCounty = destination.county && !/[,;/&]/.test(destination.county)
    ? (countyTowns[countyKey(destination.county)] ?? []).filter((slug) => {
      const candidate = townBySlug.get(slug);
      return Boolean(candidate && destination.coordinates &&
        near(destination.coordinates, { lat: candidate.lat, lng: candidate.lng }) <= 60);
    }) : [];
  const nearby = town
    ? TOWN_AUTHORITY_LINK_PLACES
      .filter((candidate) => candidate.slug !== destination.slug && candidate.region === destination.region)
      .map((candidate) => ({ slug: candidate.slug,
        miles: near(destination.coordinates, { lat: candidate.lat, lng: candidate.lng }) }))
      .filter(({ miles }) => miles <= 55)
      .sort((a, b) => a.miles - b.miles)
      .slice(0, 2).map((item) => item.slug)
    : [];
  const hrefs = [...curated.map((link) => link.href),
    ...explicit.map((slug) => "/destination/" + slug),
    ...sameTown.map((slug) => "/destination/" + slug),
    ...sameCounty.map((slug) => "/destination/" + slug),
    ...nearby.map((slug) => "/destination/" + slug),
  ];
  return [...new Set(hrefs)]
    .filter((href) => href !== "/destination/" + destination.slug)
    .filter((href) => href.startsWith("/county/") || townBySlug.has(href.slice("/destination/".length)))
    .slice(0, 4)
    .map((href) => curated.find((item) => item.href === href) ?? {
      href, label: townNames[href.split("/").pop() ?? ""] ?? "Town guide",
      description: "Explore independently researched local history, visitor planning and nearby attractions.",
    });
}
