import { DESTINATION_PHOTO_PLACEHOLDER } from "./explore-hero-reconciliation";
import type { Destination, ImageRef } from "./types";

const SOURCE_CHECKED_AT = "2026-09-19";

function museumPlaceholder(name: string): ImageRef {
  return {
    src: DESTINATION_PHOTO_PLACEHOLDER,
    alt: `${name} — destination-specific photograph not yet available`,
    width: 1600,
    height: 1067,
  };
}

/**
 * Eighty-third statewide museum wave. This record adds Ozona's active
 * county-history museum in its long-serving stone courthouse-annex building.
 */
export const statewideMuseumExpansionWave83Destinations: Destination[] = [
  {
    id: "museum-statewide-wave83-crockett-county-museum",
    brandId: "texasdefined",
    slug: "crockett-county-museum-ozona",
    name: "Crockett County Museum",
    summary: "Crockett County Museum in Ozona interprets West Texas ranching, settlement and community history across three floors of period rooms and collections that range from fossils and Native American artifacts to saddles, household objects, school material and working-cowboy tools.",
    category: "historic-sites",
    region: "hill-country",
    geography: {
      primaryRegionId: "west-texas",
      subregionIds: [],
      countySlugs: ["crockett"],
      travelRegionIds: ["hill-country"],
    },
    nearestTown: "Ozona",
    county: "Crockett County",
    coordinates: { lat: 30.71006, lng: -101.20082 },
    hero: museumPlaceholder("Crockett County Museum"),
    bestSeason: "Fall through spring is especially comfortable for combining the museum with Ozona's courthouse square and West Texas driving; the indoor collections remain a useful year-round stop when the museum is open.",
    entryNote: "The museum's current site lists Monday-Thursday 9 a.m.-5 p.m., Friday 8:30 a.m.-4:30 p.m. and Saturday 9 a.m.-1 p.m., with Sundays closed. The current Ozona Chamber directory agrees on weekday hours but lists weekends closed, so call ahead before relying on Saturday access, especially around holidays. Admission is currently $3 for visitors older than five.",
    highlights: [
      "Three floors of Crockett County and Ozona history",
      "Ranching, saddles and working-cowboy collections",
      "Fossils, arrowheads and Native American artifacts",
      "Period general-store, bank, school and household rooms",
    ],
    body: [
      "Crockett County Museum has preserved Ozona and county history since 1939, but its present home adds another layer to the visit. The museum's own history says the stone building began as Ozona's Methodist church in 1926. After a 1942 fire left the rock structure, it was rebuilt for hospital use, later became the courthouse annex and received the museum in 1958. A restoration begun in 1998 eventually allowed the museum to occupy the three-story building as its own historical center.",
      "The collections range well beyond one era. Current museum and Ozona visitor material describes fossils and arrowheads, Native American artifacts, ranching equipment, saddles, household furnishings and rooms arranged around subjects such as a general store, bank and school. The result is a county-history museum that connects the Edwards Plateau landscape with the people who ran ranches, built institutions, raised families and supplied a remote community along what became the Interstate 10 corridor.",
      "For TexasDefined, Crockett County Museum provides the indoor historical anchor already referenced by the site's broader Crockett County guide. It complements rather than duplicates Fort Lancaster: the state historic site interprets a remote military post and overland route, while the Ozona museum centers county settlement, ranching and everyday community life. The museum is active and maintains current visitor information, but its own site and the current Ozona Chamber directory disagree about Saturday opening, so weekend travelers should confirm access before making a dedicated trip.",
    ],
    officialUrl: "https://ozonamuseum.com/",
    managingAuthority: "Crockett County Museum",
    address: "408 11th St, Ozona, TX 76943",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
