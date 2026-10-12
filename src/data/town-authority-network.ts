import { additionalTownAuthorityDestinations } from "./small-town-authority-wave16";
import { smallTownWave1Destinations } from "./small-town-destinations-wave1";
import { smallTownWave2Destinations } from "./small-town-destinations-wave2";
import { smallTownWave3Destinations } from "./small-town-destinations-wave3";
import { smallTownWave4Destinations } from "./small-town-destinations-wave4";
import { smallTownWave8Destinations } from "./small-town-destinations-wave8";
import { smallTownWave9Destinations } from "./small-town-destinations-wave9";
import type { Destination } from "./types";

/** Gruene is a neighborhood/historic district of New Braunfels, NOT a separate incorporated town. */
export const TOWN_AUTHORITY_SLUGS = [
  "fredericksburg", "wimberley", "gruene-historic-district", "boerne",
  "marble-falls", "bandera", "port-aransas", "rockport", "jefferson",
  "salado", "granbury", "glen-rose", "alpine", "marfa", "fort-davis",
] as const;

type TownLink = { href: string; label: string; description: string };
const townLink = (slug: string, label: string, description: string): TownLink => ({
  href: "/destination/" + slug, label, description,
});
const canonicalAuthority = new Map([
  ...smallTownWave1Destinations,
  ...smallTownWave2Destinations,
  ...smallTownWave3Destinations,
  ...smallTownWave4Destinations,
  ...smallTownWave8Destinations,
  ...smallTownWave9Destinations,
  ...additionalTownAuthorityDestinations,
].filter((destination) => TOWN_AUTHORITY_SLUGS.some((slug) => slug === destination.slug))
  .map((destination) => [destination.slug, destination] as const));

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

const townNames: Record<string, string> = {
  "fredericksburg": "Fredericksburg", "wimberley": "Wimberley", "gruene-historic-district": "Gruene Historic District",
  "boerne": "Boerne", "marble-falls": "Marble Falls", "bandera": "Bandera",
  "port-aransas": "Port Aransas", "rockport": "Rockport", "jefferson": "Jefferson",
  "salado": "Salado", "granbury": "Granbury", "glen-rose": "Glen Rose",
  "alpine": "Alpine", "marfa": "Marfa", "fort-davis": "Fort Davis",
};

const countyTowns: Record<string, string[]> = {
  "gillespie": ["fredericksburg"], "hays": ["wimberley"], "comal": ["gruene-historic-district"],
  "kendall": ["boerne"], "burnet": ["marble-falls"], "bandera": ["bandera"],
  "nueces": ["port-aransas"], "aransas": ["rockport"], "marion": ["jefferson"],
  "bell": ["salado"], "hood": ["granbury"], "somervell": ["glen-rose"],
  "brewster": ["alpine"], "presidio": ["marfa"], "jeff-davis": ["fort-davis"],
};

export function townAuthorityCountyLinks(countySlug: string): TownLink[] {
  return (countyTowns[countySlug] ?? []).map((slug) => townLink(
    slug, townNames[slug], "Independent travel, history, attractions, maps, practical itineraries and source-checked visitor information.",
  ));
}
export function townAuthorityCityLinks(citySlug: string): TownLink[] {
  const actual = citySlug === "gruene" || citySlug === "new-braunfels" ? "gruene-historic-district" : citySlug;
  return TOWN_AUTHORITY_SLUGS.includes(actual as (typeof TOWN_AUTHORITY_SLUGS)[number])
    ? [townLink(actual, townNames[actual], "Explore the independently researched town travel guide and linked local attractions.")]
    : [];
}
export function townAuthorityContextualLinks(destination: Pick<Destination, "slug" | "nearestTown">): TownLink[] {
  const pairs = pairedTowns[destination.slug] ?? [];
  const keyed = attractionToTowns[destination.slug] ?? [];
  const sameTown = Object.entries(townNames)
    .filter(([slug, name]) => slug !== destination.slug && name.toLowerCase() === destination.nearestTown.toLowerCase())
    .map(([slug]) => slug);
  return [...new Set([...pairs.map((item) => item.href), ...keyed.map((slug) => "/destination/" + slug), ...sameTown.map((slug) => "/destination/" + slug)])]
    .map((href) => pairs.find((item) => item.href === href) ??
      townLink(href.split("/").pop() ?? "", townNames[href.split("/").pop() ?? ""] ?? "Town guide", "Explore the nearby town and practical visitor-planning details."))
    .filter((item) => item.href !== "/destination/" + destination.slug)
    .slice(0, 4);
}
