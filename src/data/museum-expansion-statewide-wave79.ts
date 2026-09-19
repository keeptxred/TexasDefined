import { DESTINATION_PHOTO_PLACEHOLDER } from "./explore-hero-reconciliation";
import { statewideMuseumExpansionWave80Destinations } from "./museum-expansion-statewide-wave80";
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
 * Seventy-ninth statewide museum wave. This record adds Royse City's current
 * local-history museum in its 1925 landmark civic/Masonic building.
 */
export const statewideMuseumExpansionWave79Destinations: Destination[] = [
  {
    id: "museum-statewide-wave79-zaner-robison-historical-museum",
    brandId: "texasdefined",
    slug: "zaner-robison-historical-museum-royse-city",
    name: "Zaner Robison Historical Museum",
    summary: "Zaner Robison Historical Museum in Royse City interprets Blackland Prairie life from early settlement through the community's twentieth-century boom years inside a 1925 Recorded Texas Historic Landmark and National Register building that also carries a long civic and Masonic history.",
    category: "historic-sites",
    region: "prairies-lakes",
    geography: {
      primaryRegionId: "north-texas",
      subregionIds: ["dallas-fort-worth-metroplex"],
      countySlugs: ["rockwall"],
      travelRegionIds: ["prairies-lakes"],
    },
    nearestTown: "Royse City",
    county: "Rockwall County",
    coordinates: { lat: 32.97489, lng: -96.33088 },
    hero: museumPlaceholder("Zaner Robison Historical Museum"),
    bestSeason: "Year-round during the museum's published Thursday-through-Saturday schedule; verify the current City facility page before making a dedicated trip.",
    entryNote: "The City of Royse City currently lists the museum as open Thursday through Saturday from noon to 4 p.m. Admission is free, and visitors should call ahead for tours.",
    highlights: [
      "Blackland Prairie and Royse City history from early settlement through the mid-twentieth century",
      "1925 landmark building listed by the City as both a Recorded Texas Historic Landmark and a National Register property",
      "Royse City Lodge No. 663 and former municipal-use history preserved in the building itself",
      "Free admission with advance-call tour guidance from the current City facility page",
    ],
    body: [
      "Zaner Robison Historical Museum is Royse City's dedicated local-history museum, with interpretation centered on life on the Blackland Prairie from the area's early settlers through the community's boom years of the 1920s into the 1960s. The current City of Royse City facility page continues to publish the museum as an active public attraction, giving the fast-growing eastern edge of the Dallas-Fort Worth area a small-scale place where the older agricultural and town history remains visible.",
      "The building is part of the story rather than just a container for it. The Texas Historical Commission's in-situ marker record says Royse City Masonic Lodge No. 663 first met in 1888, bought the town lot in 1922 and erected the present structure in 1925. The marker credits designer A. M. Kimzey and builder J. E. Harris, and records that the city acquired the lower floor in 1941 while the lodge continued to use the upper floor. Current downtown property documentation places the museum on the first floor of the same building, linking museum interpretation to a landmark that served Royse City's civic and fraternal life for generations.",
      "For visitors, the museum remains deliberately straightforward: the City currently publishes noon-to-4 p.m. hours Thursday through Saturday, free admission and a request to call ahead for tours. That operating clarity makes it a useful TexasDefined authority stop for Royse City and Rockwall County while keeping its role distinct from county-history institutions in Rockwall itself. The museum also fits the broader Blackland Prairie story already developed in TexasDefined's Rockwall County coverage, where railroads, farming and modern metro growth all meet in a very small geographic area.",
    ],
    officialUrl: "https://www.roysecity.com/facilities/facility/details/Zaner-Robison-Historical-Museum-9",
    managingAuthority: "Zaner Robison Historical Museum",
    address: "124 S Arch St, Royse City, TX 75189",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  ...statewideMuseumExpansionWave80Destinations,
];
