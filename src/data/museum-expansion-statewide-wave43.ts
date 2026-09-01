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
 * Forty-third statewide museum wave. This Sweetwater record reconciles the
 * audit's legacy Nolan County museum wording to the active Pioneer City County
 * Museum in the 1906 Ragland House.
 */
export const statewideMuseumExpansionWave43Destinations: Destination[] = [
  {
    id: "museum-statewide-wave43-pioneer-city-county-museum",
    brandId: "texasdefined",
    slug: "pioneer-city-county-museum-sweetwater",
    name: "Pioneer City County Museum",
    summary: "Pioneer City County Museum preserves Sweetwater and Nolan County history inside the restored 1906 Ragland House, combining period rooms, local artifacts, photographs, art and community interpretation in one of the city's best-known historic buildings.",
    category: "historic-sites",
    region: "panhandle",
    nearestTown: "Sweetwater",
    county: "Nolan County",
    coordinates: { lat: 32.4741, lng: -100.40275 },
    hero: museumPlaceholder("Pioneer City County Museum"),
    bestSeason: "Year-round indoor history stop; fall through spring is especially comfortable for combining the museum with downtown Sweetwater, nearby historic sites and other West Texas heritage stops.",
    entryNote: "The museum currently publishes Tuesday-Friday hours from 1 to 4 p.m. and Saturday hours from 11 a.m. to 3 p.m. Full guided tours are included; allow about 60-90 minutes and verify holiday or special-event changes before making a dedicated trip.",
    highlights: [
      "Restored 1906 R. A. Ragland House",
      "Sweetwater and Nolan County history collections",
      "Period rooms, permanent collections and art gallery",
      "Guided tours included with a regular visit",
    ],
    body: [
      "Pioneer City County Museum is Sweetwater's principal local-history museum and a strong anchor for understanding Nolan County beyond a quick roadside stop. The museum occupies the R. A. Ragland House, built in 1906, and interprets the area's settlement, ranching, civic and community history through period rooms, photographs, artifacts and rotating displays.",
      "The building is part of the story. The Ragland House later served as a funeral home, and a funeral chapel added during that period now contains permanent collections and an art gallery. The Texas Historical Commission lists the museum at 610 East 3rd Street and identifies the property as a Recorded Texas Historic Landmark, while the museum's current visitor page confirms its active public schedule and guided-tour program.",
      "Current City of Sweetwater tourism material identifies the attraction as the Pioneer City-County Museum and describes it as a place to explore Nolan County history from pioneer settlement through later economic eras. Using that current identity instead of the audit's older Nolan County museum wording prevents a duplicate authority page and gives TexasDefined one canonical destination that can support Sweetwater, Nolan County and broader West Texas internal-linking and discovery paths.",
    ],
    officialUrl: "https://www.pioneermuseumtx.org/visitors",
    managingAuthority: "Pioneer City County Museum",
    address: "610 E 3rd St, Sweetwater, TX 79556",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
