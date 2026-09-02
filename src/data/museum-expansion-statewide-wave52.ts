import { DESTINATION_PHOTO_PLACEHOLDER } from "./explore-hero-reconciliation";
import type { Destination, ImageRef } from "./types";

const SOURCE_CHECKED_AT = "2026-09-02";

function museumPlaceholder(name: string): ImageRef {
  return {
    src: DESTINATION_PHOTO_PLACEHOLDER,
    alt: `${name} — destination-specific photograph not yet available`,
    width: 1600,
    height: 1067,
  };
}

/**
 * Fifty-second statewide museum wave. This Nacogdoches record adds SFA's
 * Stone Fort Museum, a Texas Centennial reconstruction interpreting early
 * East Texas and the long history of Antonio Gil Y'Barbo's stone house.
 */
export const statewideMuseumExpansionWave52Destinations: Destination[] = [
  {
    id: "museum-statewide-wave52-stone-fort-museum",
    brandId: "texasdefined",
    slug: "stone-fort-museum-nacogdoches",
    name: "Stone Fort Museum",
    summary: "Stone Fort Museum on the Stephen F. Austin State University campus in Nacogdoches interprets early East Texas history inside the 1936 Texas Centennial reconstruction of Antonio Gil Y'Barbo's eighteenth-century stone house.",
    category: "historic-sites",
    region: "piney-woods",
    nearestTown: "Nacogdoches",
    county: "Nacogdoches County",
    coordinates: { lat: 31.61937, lng: -94.64879 },
    hero: museumPlaceholder("Stone Fort Museum"),
    bestSeason: "Year-round for the indoor museum; fall through spring is especially comfortable for pairing a visit with Nacogdoches historic sites and the SFA campus.",
    entryNote: "Admission is free. The museum publishes Tuesday-Saturday 9 a.m.-5 p.m. and Sunday 1-5 p.m. hours. University schedules and holidays can affect access, so confirm current visitor information before a dedicated trip.",
    highlights: [
      "1936 Texas Centennial reconstruction of the Old Stone Fort",
      "Antonio Gil Y'Barbo and Spanish Colonial Nacogdoches history",
      "Early East Texas cultural and material history",
      "Stephen F. Austin State University museum and educational resource",
    ],
    body: [
      "Stone Fort Museum preserves the story of one of Nacogdoches' most recognizable historic landmarks even though the structure visitors see today is a reconstruction. Antonio Gil Y'Barbo built the original stone house in the late eighteenth century along the Camino Real. Over its long life the building served several roles and became known locally as the Old Stone Fort before the original structure was demolished in 1902.",
      "The present museum was reconstructed in 1936 as a Texas Centennial project and placed on the Stephen F. Austin State University campus. Rather than presenting the building simply as a fort, the museum uses it to explore the people, objects, places and conflicts that shaped early East Texas and Nacogdoches. SFA describes the institution as a resource for regional history, university learning, research, exhibitions and public educational programs.",
      "The museum's setting makes it a useful anchor for a broader Nacogdoches history itinerary. Visitors can connect its Spanish Colonial and early East Texas interpretation with the city's historic houses, downtown heritage and other SFA resources. Free admission and a regular six-day public schedule support treating Stone Fort Museum as a current standalone TexasDefined authority destination rather than only as a campus landmark.",
    ],
    officialUrl: "https://www.sfasu.edu/stonefortmuseum",
    managingAuthority: "Stephen F. Austin State University",
    address: "1808 Alumni Drive, Nacogdoches, TX 75962",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
