import { additionalTownAuthorityDestinations } from "./small-town-authority-wave16";
import { smallTownWave1Destinations } from "./small-town-destinations-wave1";
import { smallTownWave2Destinations } from "./small-town-destinations-wave2";
import { smallTownWave3Destinations } from "./small-town-destinations-wave3";
import { smallTownWave4Destinations } from "./small-town-destinations-wave4";
import { smallTownWave8Destinations } from "./small-town-destinations-wave8";
import { smallTownWave9Destinations } from "./small-town-destinations-wave9";
import { smallTownWave5Destinations } from "./small-town-destinations-wave5";
import { smallTownWave6Destinations } from "./small-town-destinations-wave6";
import { smallTownWave7Destinations } from "./small-town-destinations-wave7";
import { smallTownWave10Destinations } from "./small-town-destinations-wave10";
import { smallTownWave11Destinations } from "./small-town-destinations-wave11";
import { smallTownWave12Destinations } from "./small-town-destinations-wave12";
import { smallTownWave13Destinations } from "./small-town-destinations-wave13";
import { smallTownWave14Destinations } from "./small-town-destinations-wave14";
import { smallTownWave15Destinations } from "./small-town-destinations-wave15";
import { TEXAS_CITIES } from "./texas-places";
import type { Destination } from "./types";

/** All existing researched town destinations are in scope, not a fixed shortlist.
 * Gruene is the historic district of New Braunfels rather than an independent municipality. */
export const TOWN_AUTHORITY_DIRECTORY: Destination[] = [
  ...smallTownWave1Destinations, ...smallTownWave2Destinations, ...smallTownWave3Destinations,
  ...smallTownWave4Destinations, ...smallTownWave5Destinations, ...smallTownWave6Destinations,
  ...smallTownWave7Destinations, ...smallTownWave8Destinations, ...smallTownWave9Destinations,
  ...smallTownWave10Destinations, ...smallTownWave11Destinations, ...smallTownWave12Destinations,
  ...smallTownWave13Destinations, ...smallTownWave14Destinations, ...smallTownWave15Destinations,
  ...additionalTownAuthorityDestinations,
];

type TownLink = { href: string; label: string; description: string };
const townLink = (slug: string, label: string, description: string): TownLink => ({
  href: "/destination/" + slug, label, description,
});
const canonicalAuthority = new Map<string, Destination>();
// Earlier batches contain fuller original entries for Jefferson, Wimberley and Marfa.
// Do not let their later duplicated records overwrite their researched master records.
for (const destination of TOWN_AUTHORITY_DIRECTORY) {
  if (!canonicalAuthority.has(destination.slug)) canonicalAuthority.set(destination.slug, destination);
}
export const TOWN_AUTHORITY_SLUGS: readonly string[] = [
  ...canonicalAuthority.keys(),
  "gruene-historic-district",
];

/**
 * Enriched Supabase Explore records can be shorter than our checked-in editorial pages.
 * The locally verified guide is the editorial source of truth for these towns on
 * live detail, sitemap/search discovery and outage fallback paths.
 */
export function applyTownAuthority(destination: Destination): Destination {
  const checkedGuide = canonicalAuthority.get(destination.slug);
  return checkedGuide ? { ...destination, ...checkedGuide } : destination;
}

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
  [...canonicalAuthority.values()].map((destination) => [destination.slug, destination.name]),
);
townNames["gruene-historic-district"] = "Gruene Historic District";

const countyKey = (value: string) => value
  .replace(/\s+county$/i, "")
  .trim()
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");

// All existing verified town guides are linked from their actual county, not
// the historic 15-town list. Ambiguous multi-county records are not guessed.
const countyTowns: Record<string, string[]> = {};
for (const destination of canonicalAuthority.values()) {
  if (!destination.county || /[,;/&]/.test(destination.county)) continue;
  const slug = countyKey(destination.county);
  if (!slug) continue;
  (countyTowns[slug] ??= []).push(destination.slug);
}
(countyTowns.comal ??= []).push("gruene-historic-district");
for (const slugs of Object.values(countyTowns)) slugs.sort((a, b) => townNames[a].localeCompare(townNames[b]));

const near = (a: NonNullable<Destination["coordinates"]>, b: NonNullable<Destination["coordinates"]>) => {
  const radians = (n: number) => n * Math.PI / 180;
  const deltaLat = radians(b.lat - a.lat);
  const deltaLon = radians(b.lng - a.lng);
  const h = Math.sin(deltaLat / 2) ** 2 + Math.cos(radians(a.lat)) * Math.cos(radians(b.lat)) * Math.sin(deltaLon / 2) ** 2;
  return 3958.8 * 2 * Math.asin(Math.sqrt(Math.min(1, h)));
};

export function townAuthorityCountyLinks(countySlug: string): TownLink[] {
  return (countyTowns[countySlug] ?? []).map((slug) => townLink(
    slug, townNames[slug], "Independent travel, history, attractions, maps, practical itineraries and source-checked visitor information.",
  ));
}
export function townAuthorityCityLinks(citySlug: string): TownLink[] {
  const actual = citySlug === "gruene" || citySlug === "new-braunfels" ? "gruene-historic-district" : citySlug;
  if (TOWN_AUTHORITY_SLUGS.includes(actual)) {
    return [townLink(actual, townNames[actual], "Explore the independently researched travel guide, local attractions and visitor logistics.")];
  }
  const city = TEXAS_CITIES.find((entry) => entry.slug === citySlug);
  if (!city) return [];
  const otherTowns = countyTowns[countyKey(city.county)] ?? [];
  return otherTowns.slice(0, 3).map((slug) =>
    townLink(slug, townNames[slug], "Explore a separately researched town in the same county, with its own history, attractions and visitor guidance."));
}
export function townAuthorityContextualLinks(destination: Pick<Destination, "slug" | "nearestTown" | "county" | "coordinates" | "region">): TownLink[] {
  const curated = pairedTowns[destination.slug] ?? [];
  const explicit = attractionToTowns[destination.slug] ?? [];
  const town = canonicalAuthority.get(destination.slug);
  const sameTown = [...canonicalAuthority.values()]
    .filter((candidate) => candidate.slug !== destination.slug &&
      candidate.name.toLowerCase() === destination.nearestTown.toLowerCase())
    .map((candidate) => candidate.slug);
  const locationCounty = destination.county && !/[,;/&]/.test(destination.county)
    ? countyTowns[countyKey(destination.county)] ?? []
    : [];
  // Nearby is calculated from actual source coordinates; geographic-region
  // equality alone would make unrelated 300-mile "nearby town" recommendations.
  const nearby = town && destination.coordinates
    ? [...canonicalAuthority.values()]
      .filter((candidate) => candidate.slug !== destination.slug && candidate.region === destination.region)
      .map((candidate) => ({ slug: candidate.slug, miles: near(destination.coordinates, candidate.coordinates) }))
      .filter((item) => item.miles <= 55)
      .sort((a, b) => a.miles - b.miles)
      .slice(0, 2)
      .map((item) => item.slug)
    : [];
  const candidates = [...curated.map((item) => item.href),
    ...explicit.map((slug) => "/destination/" + slug),
    ...sameTown.map((slug) => "/destination/" + slug),
    ...locationCounty.map((slug) => "/destination/" + slug),
    ...nearby.map((slug) => "/destination/" + slug)];
  return [...new Set(candidates)]
    .filter((href) => href !== "/destination/" + destination.slug)
    .filter((href) => canonicalAuthority.has(href.slice("/destination/".length)) || href === "/destination/gruene-historic-district" || href.startsWith("/county/"))
    .slice(0, 4)
    .map((href) => curated.find((item) => item.href === href) ??
      townLink(href.split("/").pop() ?? "", townNames[href.split("/").pop() ?? ""] ?? "Town guide",
        "Explore local history, visitor planning, attractions and independently sourced details."));
}
