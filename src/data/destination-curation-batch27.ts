import type { Destination } from "./types";

const curated: Record<string, Partial<Destination>> = {
  "port-isabel-lighthouse-state-park": {
    summary: "Texas' only lighthouse open to the public, an 1852 brick tower in Port Isabel where 75 winding stairs and short ladders lead to coastal views toward South Padre Island and a restored third-order Fresnel lens.",
    nearestTown: "Port Isabel",
    coordinates: { lat: 26.0764, lng: -97.2086 },
    bestSeason: "Fall through spring for mild coastal weather; summer offers extended hours but greater heat and storm risk",
    entryNote: "The lighthouse climb is weather permitting and involves 75 winding stairs plus three short ladders. Children must be at least five years old and cannot be carried during the climb. Check current hours before arrival.",
    highlights: ["Climb Texas' only publicly accessible lighthouse", "Third-order Fresnel lens illuminated again since 2022", "Views toward South Padre Island and Laguna Madre", "Keeper's Cottage visitor center and maritime exhibits"],
    body: [
      "Port Isabel Lighthouse was built in 1852 as shipping increased near the mouth of the Rio Grande and vessels needed a reliable coastal landmark. The brick tower became one of the defining structures of the lower Texas coast and served mariners until it was decommissioned in 1905.",
      "Today visitors can climb the narrow tower to the lantern room and exterior viewing area when weather permits. A reproduction third-order Fresnel lens installed in 2022 restored the lighthouse's nighttime glow, although it does not operate as a navigational beacon.",
      "The climb is the centerpiece, but the Keeper's Cottage visitor center adds the maritime and regional history needed to understand why the tower is here. Check weather and current hours before driving over, since wind or storms can close tower access even when the grounds remain open."
    ],
    managingAuthority: "Texas Historical Commission",
    officialUrl: "https://thc.texas.gov/historic-sites/port-isabel-lighthouse",
    sourceCheckedAt: "2026-08-07",
    address: "421 E. Queen Isabella Blvd, Port Isabel, TX 78578",
  },
};

export function applyCuratedDestinationBatch27(destination: Destination): Destination {
  const override = curated[destination.slug];
  return override ? { ...destination, ...override, hero: override.hero ? { ...destination.hero, ...override.hero } : destination.hero } : destination;
}

export function applyCuratedDestinationsBatch27(destinations: Destination[]): Destination[] {
  return destinations.map(applyCuratedDestinationBatch27);
}
