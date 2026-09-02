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
 * Fifty-fifth statewide museum wave. This Bonham record adds the Sam Rayburn
 * Museum as a distinct destination from the nearby Sam Rayburn House State
 * Historic Site.
 */
export const statewideMuseumExpansionWave55Destinations: Destination[] = [
  {
    id: "museum-statewide-wave55-sam-rayburn-museum",
    brandId: "texasdefined",
    slug: "sam-rayburn-museum-bonham",
    name: "Sam Rayburn Museum",
    summary: "Sam Rayburn Museum in Bonham preserves the public career and personal legacy of longtime U.S. House Speaker Sam Rayburn through his papers, furnishings, political memorabilia and an exact replica of his Speaker's office.",
    category: "historic-sites",
    region: "prairies-lakes",
    nearestTown: "Bonham",
    county: "Fannin County",
    coordinates: { lat: 33.57829, lng: -96.1877 },
    hero: museumPlaceholder("Sam Rayburn Museum"),
    bestSeason: "Year-round indoor museum; spring and fall are especially comfortable for pairing the museum with Bonham's historic district, nearby heritage sites and other Fannin County stops.",
    entryNote: "The museum currently publishes Monday-Friday hours of 9 a.m.-4:30 p.m. and Saturday hours of 10 a.m.-2 p.m. Admission is free. University holiday closures can affect access, and groups of 10 or more should arrange visits in advance.",
    highlights: [
      "Exact replica of Sam Rayburn's Speaker's office",
      "Photographs, letters, political cartoons and memorabilia",
      "Rayburn's personal library and historic furnishings",
      "1957 Classical Revival museum building",
    ],
    body: [
      "Sam Rayburn Museum documents the life and career of Samuel Taliaferro Rayburn, the Fannin County politician who represented North Texas in Congress from 1913 until his death in 1961 and became the longest-serving Speaker of the U.S. House of Representatives. Rayburn helped establish the museum himself, using funds from a distinguished-service gift to create a permanent home for the records, books and objects associated with his public life.",
      "The museum's best-known feature is an exact replica of Rayburn's Speaker's office, surrounded by photographs, letters, political cartoons, artwork, furniture, memorabilia and books that connect national political history to Bonham. The building was completed in 1957 in a Classical Revival style deliberately recalling federal architecture in Washington, D.C., and it is itself a Recorded Texas Historic Landmark.",
      "Today the museum operates as a division of the Dolph Briscoe Center for American History at The University of Texas at Austin. Its Bonham location remains a free public museum with regular weekday and Saturday hours, on-site parking and accessible public spaces. TexasDefined treats it separately from the nearby Sam Rayburn House State Historic Site so visitors can distinguish Rayburn's political archive and institutional legacy from the preserved home and farm where he lived.",
    ],
    officialUrl: "https://briscoecenter.org/visit/sam-rayburn-museum/",
    managingAuthority: "Dolph Briscoe Center for American History, The University of Texas at Austin",
    address: "800 W Sam Rayburn Dr, Bonham, TX 75418",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
