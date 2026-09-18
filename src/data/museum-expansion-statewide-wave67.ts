import { DESTINATION_PHOTO_PLACEHOLDER } from "./explore-hero-reconciliation";
import { statewideMuseumExpansionWave68Destinations } from "./museum-expansion-statewide-wave68";
import type { Destination, ImageRef } from "./types";

const SOURCE_CHECKED_AT = "2026-09-17";

function museumPlaceholder(name: string): ImageRef {
  return {
    src: DESTINATION_PHOTO_PLACEHOLDER,
    alt: `${name} — destination-specific photograph not yet available`,
    width: 1600,
    height: 1067,
  };
}

/**
 * Sixty-seventh statewide museum wave. This Georgetown record reconciles the
 * audit's older Williamson County Museum wording to the active institution's
 * current public name, The Williamson Museum.
 * Wave 68 is chained here so later museum expansion remains conflict-light.
 */
export const statewideMuseumExpansionWave67Destinations: Destination[] = [
  {
    id: "museum-statewide-wave67-williamson-museum",
    brandId: "texasdefined",
    slug: "williamson-museum-georgetown",
    name: "The Williamson Museum",
    summary: "The Williamson Museum on Georgetown's historic courthouse square preserves and interprets Williamson County history through permanent and rotating exhibitions, archives, public programs, walking tours and courthouse interpretation.",
    category: "historic-sites",
    region: "hill-country",
    geography: {
      primaryRegionId: "central-texas",
      subregionIds: ["austin-area"],
      gatewaySubregionIds: ["texas-hill-country"],
      metroId: "austin",
      countySlugs: ["williamson"],
      travelRegionIds: ["hill-country", "prairies-lakes"],
    },
    nearestTown: "Georgetown",
    county: "Williamson County",
    coordinates: { lat: 30.63683, lng: -97.67821 },
    hero: museumPlaceholder("The Williamson Museum"),
    bestSeason: "Year-round for the indoor galleries; spring and fall are especially comfortable for pairing the museum with Georgetown's courthouse square, architecture tours and other downtown walking.",
    entryNote: "The museum currently lists free general admission, Wednesday-Friday hours from noon to 5 p.m. and Saturday hours from 10 a.m. to 5 p.m. First-Friday and special-event hours can differ, and courthouse or docent tours depend on the published program schedule.",
    highlights: [
      "Williamson County founding and community-history exhibits",
      "Historic Georgetown courthouse-square setting",
      "Former Farmers State Bank building",
      "Museum, courthouse and downtown walking-tour programs",
    ],
    body: [
      "The Williamson Museum is the current public identity of the county-history institution that began as the Williamson County Historical Museum in 1997. Williamson County's own museum directory traces the organization to work by the county historical commission and explains that the museum later adopted its broader current name. Today the museum gives Georgetown's courthouse square a dedicated place for preserving and interpreting stories from communities across Williamson County rather than limiting the narrative to the county seat alone.",
      "The setting reinforces that mission. The museum occupies the former Farmers State Bank building at 716 South Austin Avenue, directly on Georgetown's historic square and across from the county courthouse. Current exhibits include county-founding material and rotating subjects drawn from local writing, military history, development and community memory. The museum also extends interpretation beyond its galleries through courthouse tours, architecture walks, educational programming and seasonal events.",
      "For TexasDefined, The Williamson Museum is the clean canonical authority behind the audit's older Williamson County Museum wording. It complements rather than duplicates Georgetown's courthouse, historic-district and Inner Space Cavern coverage: the museum is the local-history anchor, while the wider downtown and county pages provide the geographic context. Its free general admission and central location make it practical as the first interpretive stop before exploring the square or building a larger Williamson County itinerary.",
    ],
    officialUrl: "https://williamsonmuseum.org/how-to-visit/",
    managingAuthority: "The Williamson Museum",
    address: "716 S Austin Ave, Georgetown, TX 78626",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  ...statewideMuseumExpansionWave68Destinations,
];
