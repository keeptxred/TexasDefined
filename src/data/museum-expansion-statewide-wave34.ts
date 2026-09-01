import { DESTINATION_PHOTO_PLACEHOLDER } from "./explore-hero-reconciliation";
import type { Destination, ImageRef } from "./types";

const SOURCE_CHECKED_AT = "2026-09-01";

function museumPlaceholder(name: string): ImageRef {
  return {
    src: DESTINATION_PHOTO_PLACEHOLDER,
    alt: `${name} — destination-specific photograph not yet available`,
    width: 1600,
    height: 1067,
  };
}

/**
 * Thirty-fourth statewide museum wave. This Plains-region record adds Snyder's
 * county museum using its current official visitor information and institutional
 * history, with Texas Time Travel supporting the regional classification.
 */
export const statewideMuseumExpansionWave34Destinations: Destination[] = [
  {
    id: "museum-statewide-wave34-scurry-county-museum",
    brandId: "texasdefined",
    slug: "scurry-county-museum",
    name: "Scurry County Museum",
    summary: "Scurry County Museum preserves the history and material culture of Snyder, Scurry County and the surrounding West Texas region through permanent and rotating galleries, more than 16,000 artifacts and community-centered educational and research programs.",
    category: "historic-sites",
    region: "panhandle",
    nearestTown: "Snyder",
    county: "Scurry County",
    coordinates: { lat: 32.74233, lng: -100.91873 },
    hero: museumPlaceholder("Scurry County Museum"),
    bestSeason: "Year-round indoor history stop; fall through spring is especially comfortable for pairing the museum with Snyder and other Plains-region heritage sites.",
    entryNote: "The museum currently publishes Tuesday-Friday hours from 10 a.m. to 5 p.m. Verify holiday, exhibit-changeover or special-event schedules before making a dedicated trip.",
    highlights: [
      "More than 16,000 preserved artifacts",
      "Scurry, Texas and rotating gallery exhibits",
      "White Buffalo rifle and 1878 chuckwagon",
      "Scurry County ranching, oil and community history",
    ],
    body: [
      "Scurry County Museum interprets the county and the wider West Texas region through three gallery spaces combining artifacts, films, narratives and rotating exhibitions. Its mission centers on serving as an educational and research resource while making Scurry County's diverse history and culture accessible to residents, students and travelers.",
      "The institution grew from a local preservation effort organized in 1970, when community members formed the Scurry County Museum Association to plan a museum and oversee its operation. County residents approved bond funding for the building, which opened in 1974 on the Western Texas College campus. The museum still highlights milestone objects from the county's past, including the rifle associated with the White Buffalo story, an 1878 chuckwagon and an artifact tied to the millionth barrel of local oil production.",
      "The museum now cares for more than 16,000 artifacts and is developing its role as a research center alongside its public exhibits and educational programs. Texas Time Travel places the museum in the Plains Trail Region, supporting its role as a TexasDefined authority anchor for Snyder, Scurry County and nearby Panhandle-Plains heritage destinations rather than as a thin standalone directory listing.",
    ],
    officialUrl: "https://www.scurrycountymuseum.com/",
    managingAuthority: "Scurry County Museum Association",
    address: "6200 College Avenue, Snyder, TX 79549",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
