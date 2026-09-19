import { DESTINATION_PHOTO_PLACEHOLDER } from "./explore-hero-reconciliation";
import { statewideMuseumExpansionWave71Destinations } from "./museum-expansion-statewide-wave71";
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
 * Seventieth statewide museum wave. This record reconciles the audit's Ward
 * County Historical Museum wording to the active Ward County Museum at the
 * Million Barrel complex in Monahans.
 */
export const statewideMuseumExpansionWave70Destinations: Destination[] = [
  {
    id: "museum-statewide-wave70-ward-county-museum-million-barrel",
    brandId: "texasdefined",
    slug: "ward-county-museum-at-the-million-barrel",
    name: "Ward County Museum at the Million Barrel",
    summary: "Ward County Museum at the Million Barrel in Monahans preserves Permian Basin oil-boom history, local railroading, World War II aviation, pioneer life and community artifacts across a multi-building complex centered on the enormous 1928 Million Barrel Tank.",
    category: "historic-sites",
    region: "big-bend",
    geography: {
      primaryRegionId: "west-texas",
      subregionIds: ["permian-basin"],
      countySlugs: ["ward"],
      travelRegionIds: ["big-bend"],
    },
    nearestTown: "Monahans",
    county: "Ward County",
    coordinates: { lat: 31.59472, lng: -102.87833 },
    hero: museumPlaceholder("Ward County Museum at the Million Barrel"),
    bestSeason: "Year-round during museum hours; fall through spring is especially comfortable for walking the outdoor complex and pairing the museum with Monahans Sandhills State Park.",
    entryNote: "The City of Monahans currently lists museum hours Tuesday through Saturday from 10 a.m. to 6 p.m., with Sunday and Monday closed. The city uses 400 Museum Blvd as the visitor address; Monahans Chamber material also references 1500 E. Sealy for the same complex. The complex is large and includes several separate historic buildings and collections, so allow more time than a single-room local museum would require.",
    highlights: [
      "1928 Million Barrel Tank and West Texas oil-boom history",
      "Rattlesnake Bomber Base Museum and World War II aviation exhibits",
      "Historic Monahans jail, Holman House and pioneer structures",
      "Rail car, caboose, Coca-Cola and local-heritage collections",
    ],
    body: [
      "Ward County Museum at the Million Barrel is built around one of the Permian Basin's most audacious oil-boom experiments. In 1928, Shell Oil interests constructed an enormous concrete reservoir intended to hold more than one million barrels of crude when production was outrunning storage and transportation capacity. The structure covered roughly eight acres, but it leaked badly and failed as a practical storage solution. Decades later, the site was preserved and turned into the historical complex visitors see today.",
      "The museum has grown well beyond the giant tank. The grounds include Monahans' original jail, the restored Holman House, a rail car and caboose collection, oilfield and agricultural equipment, a Coca-Cola collection and other buildings that interpret everyday life in Ward County. The Rattlesnake Bomber Base Museum adds a major World War II layer, preserving the story of nearby Pyote Army Air Field and the heavy-bomber crews who trained there before overseas deployment.",
      "That breadth makes the Million Barrel complex the strongest general-history anchor for Ward County. It connects the region's ranching and railroad past to the explosive oil development that transformed Monahans, then extends into wartime aviation and twentieth-century community life. For TexasDefined, the museum complements rather than duplicates the Monahans Sandhills destination: one explains the human and industrial history of the county, while the state park interprets the landscape that surrounds it.",
    ],
    officialUrl: "https://www.cityofmonahans.org/228/Tourism",
    managingAuthority: "Ward County Historical Commission",
    address: "400 Museum Blvd, Monahans, TX 79756",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  ...statewideMuseumExpansionWave71Destinations,
];
