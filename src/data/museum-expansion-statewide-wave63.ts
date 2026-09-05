import { DESTINATION_PHOTO_PLACEHOLDER } from "./explore-hero-reconciliation";
import type { Destination, ImageRef } from "./types";

const SOURCE_CHECKED_AT = "2026-09-05";

function museumPlaceholder(name: string): ImageRef {
  return {
    src: DESTINATION_PHOTO_PLACEHOLDER,
    alt: `${name} — destination-specific photograph not yet available`,
    width: 1600,
    height: 1067,
  };
}

/**
 * Sixty-third statewide museum wave. This Mount Pleasant record reconciles
 * the audit's older Titus County Historical Museum wording to the current
 * Titus County Museum inside Mount Pleasant Public Library.
 */
export const statewideMuseumExpansionWave63Destinations: Destination[] = [
  {
    id: "museum-statewide-wave63-titus-county-museum",
    brandId: "texasdefined",
    slug: "titus-county-museum-mount-pleasant",
    name: "Titus County Museum",
    summary: "Titus County Museum inside Mount Pleasant Public Library interprets the city and county through artifacts and interactive environments spanning Caddo history, settlement, the Civil War and later community life in Northeast Texas.",
    category: "historic-sites",
    region: "piney-woods",
    nearestTown: "Mount Pleasant",
    county: "Titus County",
    coordinates: { lat: 33.16115, lng: -94.96978 },
    hero: museumPlaceholder("Titus County Museum"),
    bestSeason: "Year-round indoor museum; spring and fall are especially comfortable for combining the museum with downtown Mount Pleasant, nearby lakes and other Northeast Texas stops.",
    entryNote: "The City of Mount Pleasant currently publishes museum hours Monday through Friday from 9 a.m. to 5:30 p.m., excluding City holidays. Library and museum tours for schools, scouts, clubs and other groups can be scheduled in advance. Confirm current hours before a dedicated trip.",
    highlights: [
      "Walk-in Caddo grass-hut interpretation",
      "Civil War camp and Titus County service history",
      "Log-cabin environment and settlement context",
      "Mount Pleasant and Titus County artifacts and displays",
    ],
    body: [
      "Titus County Museum gives Mount Pleasant a dedicated local-history space inside the city's public library, making county history accessible during ordinary weekday visits rather than limiting it to an appointment-only archive. The current museum opened with the modern library facility in January 2013 and uses displays, artifacts and reconstructed environments to introduce both Mount Pleasant and the wider county.",
      "Its most distinctive interpretive features move visitors across several eras. A Caddo grass hut places Indigenous history at the beginning of the story, while a Civil War camp and log-cabin setting add nineteenth-century military and settlement context. Tourism and city sources specifically highlight these interactive elements, which help turn a relatively compact museum into a useful orientation to the people and events that shaped this part of Northeast Texas.",
      "Because the museum operates within Mount Pleasant Public Library, it has unusually regular weekday access for a small county-history collection and can support scheduled school, scout, club and other group tours. For TexasDefined, using the current Titus County Museum identity reconciles the audit's older Titus County Historical Museum wording without creating a duplicate institution, while giving the Titus County guide a clear heritage anchor that can connect downtown Mount Pleasant with the broader Piney Woods discovery graph.",
    ],
    officialUrl: "https://mpcity.net/library",
    managingAuthority: "City of Mount Pleasant / Mount Pleasant Public Library",
    address: "601 N Madison Ave, Mount Pleasant, TX 75455",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
