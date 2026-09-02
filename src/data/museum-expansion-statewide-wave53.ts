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
 * Fifty-third statewide museum wave. This record reconciles the older
 * Central Texas Oil Patch Museum wording to the institution's current
 * Luling Oil Museum identity.
 */
export const statewideMuseumExpansionWave53Destinations: Destination[] = [
  {
    id: "museum-statewide-wave53-luling-oil-museum",
    brandId: "texasdefined",
    slug: "luling-oil-museum",
    name: "Luling Oil Museum",
    summary: "Luling Oil Museum preserves the story of the 1922 oil discovery that transformed Luling, with historic oilfield tools, machinery, photographs, a two-story derrick exhibit and interpretation of wildcatter and philanthropist Edgar B. Davis.",
    category: "historic-sites",
    region: "prairies-lakes",
    nearestTown: "Luling",
    county: "Caldwell County",
    coordinates: { lat: 29.68193, lng: -97.65057 },
    hero: museumPlaceholder("Luling Oil Museum"),
    bestSeason: "Year-round indoor museum; spring and fall are especially comfortable for combining downtown Luling, the San Marcos River corridor and other Central Texas heritage stops.",
    entryNote: "The museum currently publishes Monday-Friday hours from 10 a.m. to 4 p.m., with Saturday visits by appointment. Confirm holiday or event-related changes before making a dedicated trip.",
    highlights: [
      "Luling's 1922 oil-boom history",
      "Edgar B. Davis and the Rafael Rios No. 1 discovery",
      "Two-story indoor oil derrick exhibit",
      "Historic oilfield machinery and outdoor derrick",
    ],
    body: [
      "Luling Oil Museum is the current identity for the institution long listed in heritage directories as the Central Texas Oil Patch Museum. It occupies 421 East Davis Street in downtown Luling and preserves the oil-boom history that abruptly changed the community after Edgar B. Davis's Rafael Rios No. 1 well struck oil in August 1922. The museum's collections connect that discovery to the workers, equipment and businesses that reshaped Luling during the boom years.",
      "The visitor experience goes beyond photographs and documents. Current museum material highlights a full-scale two-story replica of a 1920s wooden derrick, a large outdoor steel derrick, vintage engines and a Donovan oil-field boiler from the steam-powered drilling era. Interpretation of Davis gives the local story a human center, explaining both his persistence as a wildcatter and his later civic philanthropy in Luling.",
      "Texas Time Travel still catalogs the destination under the older Central Texas Oil Patch Museum name and places it in the Independence Trail Region, while the museum's active first-party site now brands the institution as Luling Oil Museum. TexasDefined uses the current public-facing name while retaining the older identity in its authority context, giving Luling and Caldwell County one canonical destination for oil history, downtown discovery and county-level internal linking.",
    ],
    officialUrl: "https://www.lulingtxoilmuseum.com/",
    managingAuthority: "Luling Area Oil Museum, Inc.",
    address: "421 E Davis St, Luling, TX 78648",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
