import type { Destination } from "../types";
import { fredericksburgWineryAuthorityDestinations } from "../fredericksburg-winery-authority-destinations";
import { williamChrisVineyardsHyeDestinations } from "../william-chris-vineyards-hye-destination";
import offersJson from "./experience-offers.json";
import independentOperators from "./independent-operators.json";

/**
 * The destination catalog owns the place, address, map point, nearby attractions
 * and accessibility notes. Only operator-specific offer data lives here.
 * Article fixtures must not independently maintain these prices.
 */
export type VerifiedOffer = {
  id: string; destinationSlug: string; label: string; priceUsd: number;
  durationMinutes: number | null; minAge: number | null; maxParty: number | null;
  sourceUrl: string; checkedAt: string; notes: string;
};
export type VisitorRoute = {
  id: string; label: string; duration: string;
  stops: readonly { time: string; activity: string; link?: string }[];
};

const catalog: readonly Destination[] = [
  ...fredericksburgWineryAuthorityDestinations,
  ...williamChrisVineyardsHyeDestinations,
];
export type ExperiencePlace = {
  slug: string; name: string; nearestTown: string; address?: string;
  coordinates?: { lat: number; lng: number } | null;
  officialUrl?: string; reservationUrl?: string; accessibilityNotes?: string;
  visitDuration?: string; guidePath?: string; sourceUrl?: string;
};
const bySlug = new Map<string, ExperiencePlace>(catalog.map((place) => [
  place.slug,
  {
    slug: place.slug, name: place.name, nearestTown: place.nearestTown,
    address: place.address, coordinates: place.coordinates,
    officialUrl: place.officialUrl, reservationUrl: place.reservationUrl,
    accessibilityNotes: place.accessibilityNotes,
    visitDuration: place.authorityGuide?.assessment.recommendedVisit,
    guidePath: "/destination/" + place.slug,
  },
]));
for (const place of independentOperators) {
  if (bySlug.has(place.slug)) throw new Error("Duplicate canonical visitor entity: " + place.slug);
  bySlug.set(place.slug, { ...place, coordinates: null });
}

export const fredericksburgWineExperience = {
  articleSlug: "fredericksburg-texas-wineries-things-to-do-guide",
  primaryDestination: "fredericksburg",
  operatorSlugs: [
    "becker-vineyards",
    "grape-creek-vineyards",
    "pedernales-cellars",
    "signor-vineyards",
    "signor-downtown-fredericksburg",
    "william-chris-vineyards-hye",
    "grape-creek-on-main",
    "becker-on-main",
    "slate-theory-winery",
  ],
  routes: [
    {
      id: "downtown-day", label: "One day: town and a walkable tasting", duration: "One day",
      stops: [
        { time: "9:30 AM", activity: "Park downtown; explore Marktplatz and Main Street", link: "/destination/fredericksburg-historic-district" },
        { time: "11:00 AM", activity: "Choose the Pacific War museum or downtown heritage sites", link: "/destination/national-museum-pacific-war" },
        { time: "1:00 PM", activity: "Lunch and a downtown tasting room if suitable" },
        { time: "3:00 PM", activity: "Browse independent shops; verify closing hours" },
      ],
    },
    {
      id: "two-night", label: "Two nights: focused wine-country weekend", duration: "Friday–Sunday",
      stops: [
        { time: "Friday", activity: "Arrive, park downtown and have dinner" },
        { time: "Saturday morning", activity: "Museum or Main Street; lunch before tasting" },
        { time: "Saturday afternoon", activity: "Two prebooked visits in one Highway 290 cluster; use sober transportation" },
        { time: "Sunday", activity: "Choose Enchanted Rock or a Stonewall history stop", link: "/destination/enchanted-rock-state-natural-area" },
      ],
    },
    {
      id: "three-day", label: "Three days: wine, nature and Hill Country history", duration: "Three days",
      stops: [
        { time: "Day 1", activity: "Fredericksburg historic core and National Museum of the Pacific War", link: "/destination/national-museum-pacific-war" },
        { time: "Day 2", activity: "One reserved winery cluster in Stonewall or Hye", link: "/destination/william-chris-vineyards-hye" },
        { time: "Day 3", activity: "Enchanted Rock day pass and a full hike, or LBJ historic sites", link: "/destination/lyndon-b-johnson-state-park-historic-site" },
      ],
    },
  ] as readonly VisitorRoute[],
} as const;

export function fredericksburgWineryPlaces(): ExperiencePlace[] {
  return fredericksburgWineExperience.operatorSlugs
    .map((slug) => bySlug.get(slug))
    .filter((place): place is ExperiencePlace => Boolean(place));
}

/** Operator offers are suppressed after 45 days; a stale price is never "current". */
export function currentVerifiedOffers(asOfDay = new Date().toISOString().slice(0, 10)): VerifiedOffer[] {
  const today = Date.parse(asOfDay + "T00:00:00Z");
  if (!Number.isFinite(today)) return [];
  return (offersJson as VerifiedOffer[]).filter((offer) => {
    const checked = Date.parse(offer.checkedAt + "T00:00:00Z");
    return Number.isFinite(checked) && checked <= today
      && (today - checked) / 86400000 <= 45
      && bySlug.has(offer.destinationSlug);
  });
}
