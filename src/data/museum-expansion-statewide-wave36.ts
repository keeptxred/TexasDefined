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
 * Thirty-sixth statewide museum wave. This Panhandle record adds Wheeler's
 * current historical museum, with its Alan Bean and Red River War collections.
 */
export const statewideMuseumExpansionWave36Destinations: Destination[] = [
  {
    id: "museum-statewide-wave36-wheeler-historical-museum",
    brandId: "texasdefined",
    slug: "wheeler-historical-museum",
    name: "Wheeler Historical Museum",
    summary: "Wheeler Historical Museum preserves Wheeler County history from the Red River War and pioneer era through the twentieth century, with a major collection devoted to Wheeler-born Apollo 12 astronaut and artist Alan L. Bean.",
    category: "historic-sites",
    region: "panhandle",
    nearestTown: "Wheeler",
    county: "Wheeler County",
    coordinates: { lat: 35.447856, lng: -100.271821 },
    hero: museumPlaceholder("Wheeler Historical Museum"),
    bestSeason: "Year-round indoor history stop; spring and fall are especially comfortable for combining the museum with Wheeler, Mobeetie and other Plains Trail heritage sites.",
    entryNote: "The museum's current official site and Wheeler visitor guide publish its address and phone but do not consistently publish regular visitor hours. Call the museum at 806-826-2251 before making a dedicated trip.",
    highlights: [
      "Alan L. Bean Apollo 12 artifacts and art",
      "Red River War interpretation",
      "Wheeler County pioneer and community history",
      "Military-service and twentieth-century exhibits",
    ],
    body: [
      "Wheeler Historical Museum tells the story of a county that became the first organized county in the Texas Panhandle, connecting Native American history, frontier settlement, ranching, military conflict and later community life. Its interpretation includes the Red River War of 1874-1875 and the hardships faced by settlers through events such as the Dust Bowl and Great Depression.",
      "The museum's most distinctive collection centers on Captain Alan L. Bean, who was born in Wheeler in 1932 and became the fourth person to walk on the Moon as Apollo 12 lunar module pilot. The museum displays personal artifacts connected to Bean's life and NASA career, including Apollo-era material, and a prominent bronze statue of Bean in a spacesuit stands outside the museum along Alan L. Bean Boulevard.",
      "Texas Time Travel places Wheeler Historical Museum in the Plains Trail Region and describes the present museum as an institution established in 2018 after years of local work to adapt the former American Legion building. Wheeler County continues to recognize the museum institution through county support and an interlocal agreement, making it a useful TexasDefined authority anchor for Wheeler, nearby Mobeetie, the county courthouse and the wider eastern Panhandle heritage corridor.",
    ],
    officialUrl: "https://www.wheelerhistory.org/",
    managingAuthority: "Wheeler Historical Museum Inc.",
    address: "105 N. Alan L. Bean Blvd., Wheeler, TX 79096",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
