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
 * Fifteenth statewide museum wave. This group reconciles current Panhandle
 * institution names against older shorthand in the original museum inventory.
 */
export const statewideMuseumExpansionWave15Destinations: Destination[] = [
  {
    id: "museum-statewide-wave15-window-on-the-plains",
    brandId: "texasdefined",
    slug: "window-on-the-plains-museum-dumas",
    name: "Window on the Plains Museum",
    summary: "Window on the Plains Museum in Dumas preserves Moore County and northern Panhandle history through ranching, farming, business, industry, family-life and regional-history exhibits at a free museum beside The Art Center.",
    category: "historic-sites",
    region: "panhandle",
    nearestTown: "Dumas",
    county: "Moore County",
    coordinates: { lat: 35.8434, lng: -101.974 },
    hero: museumPlaceholder("Window on the Plains Museum"),
    bestSeason: "Year-round indoor museum; spring and fall are especially comfortable for pairing Dumas with broader Panhandle road trips.",
    entryNote: "The museum currently lists Monday-Saturday hours from 10 a.m. to 5 p.m. and free admission. It was founded as the Moore County Historical Museum and now operates under the Window on the Plains Museum name; verify current holiday hours before a special trip.",
    highlights: ["Moore County and Panhandle history", "Ranching and farming exhibits", "Family-life and business collections", "Adjacent Art Center"],
    body: [
      "Window on the Plains Museum is the current institutional identity behind older references to the Moore County Historical Museum. Founded in 1976, the museum later moved to its present South Dumas Avenue home and adopted the name visitors see today, so TexasDefined uses one current canonical page rather than preserving a stale duplicate.",
      "The collections tell Moore County's story through farming, ranching, business, industry, family life and the wider High Plains environment. That breadth makes the museum useful as both a local-history stop and a regional orientation point for travelers crossing the northern Panhandle.",
      "For TexasDefined, this destination strengthens Dumas and Moore County coverage while linking naturally to Panhandle road trips, Route 287 travel, agricultural history and the neighboring Art Center without fragmenting the same institution across old and new names."
    ],
    officialUrl: "https://www.dumasmuseumandartcenter.org/",
    managingAuthority: "Window on the Plains Museum",
    address: "1820 S Dumas Ave, Dumas, TX 79029",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave15-museum-of-the-plains",
    brandId: "texasdefined",
    slug: "museum-of-the-plains-perryton",
    name: "Museum of the Plains",
    summary: "Museum of the Plains in Perryton is a large Ochiltree County heritage campus with more than 10,000 artifacts, nearly 30,000 square feet of exhibit space, five historic buildings and collections spanning archaeology, ranching, community life and High Plains culture.",
    category: "historic-sites",
    region: "panhandle",
    nearestTown: "Perryton",
    county: "Ochiltree County",
    coordinates: { lat: 36.41025, lng: -100.80239 },
    hero: museumPlaceholder("Museum of the Plains"),
    bestSeason: "Year-round indoor and campus museum; spring through fall is best for exploring the outdoor historic buildings as well.",
    entryNote: "The museum currently lists Monday-Friday 9 a.m.-5 p.m. and Saturday 10 a.m.-5 p.m., with free admission and accessible parking. Check its official calendar for holiday closures and special programs.",
    highlights: ["More than 10,000 artifacts", "Five historic buildings", "1899 railroad depot", "High Plains archaeology and community history"],
    body: [
      "Museum of the Plains is the current Perryton institution that resolves older inventory shorthand such as 'Ochiltree County Museum.' The museum began in the Ochiltree County Courthouse in 1975, moved to its current property in 1978 and opened its main building in 1981.",
      "Today the campus combines a substantial indoor collection with historic structures, including an 1899 depot. Permanent and educational exhibits range from archaeology and Texas history to regional material culture, giving visitors a broader picture of life in the far northern Panhandle than a single-topic museum could provide.",
      "For TexasDefined, the museum creates a canonical Ochiltree County history anchor that can cross-link Perryton, northern Panhandle road trips, railroad history, archaeology and county content while avoiding a second page under an obsolete county-museum label."
    ],
    officialUrl: "https://www.museumoftheplains.com/",
    managingAuthority: "Museum of the Plains",
    address: "1200 N Main St, Perryton, TX 79070",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave15-swisher-county",
    brandId: "texasdefined",
    slug: "swisher-county-museum-tulia",
    name: "Swisher County Museum",
    summary: "Swisher County Museum in Tulia preserves local archives, artifacts and historic structures tied to settlement and life on the central High Plains, including the JA Ranch cabin associated with the museum grounds.",
    category: "historic-sites",
    region: "panhandle",
    nearestTown: "Tulia",
    county: "Swisher County",
    coordinates: { lat: 34.53555, lng: -101.76555 },
    hero: museumPlaceholder("Swisher County Museum"),
    bestSeason: "Year-round local-history stop; spring and fall are comfortable for combining Tulia with Panhandle and High Plains drives.",
    entryNote: "The Texas Historical Commission Atlas lists the museum at 127 SW 2nd Street with Tuesday-Thursday hours. Because volunteer-museum schedules can change, call or verify locally before making a special trip.",
    highlights: ["Swisher County archives", "Local pioneer collections", "JA Ranch cabin", "Central High Plains history"],
    body: [
      "Swisher County Museum gives Tulia a focused local-history collection that complements larger Panhandle institutions. Its archives and artifacts preserve the people, businesses and settlement patterns that shaped a county positioned between Amarillo and Lubbock on the High Plains.",
      "The museum grounds also connect visitors to physical history, including the JA Ranch cabin associated with a Recorded Texas Historic Landmark. Those structures help move the story beyond documents and display cases into buildings tied to regional ranching and settlement.",
      "For TexasDefined, this page becomes the canonical Swisher County museum destination and a useful cross-link for Tulia, ranching history, High Plains road trips, county reference pages and nearby historic-site coverage."
    ],
    officialUrl: "https://atlas.thc.texas.gov/Details/4200000423/print",
    managingAuthority: "Swisher County Archives and Museum Association",
    address: "127 SW 2nd St, Tulia, TX 79088",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
  {
    id: "museum-statewide-wave15-pioneer-west",
    brandId: "texasdefined",
    slug: "pioneer-west-museum-shamrock",
    name: "Pioneer West Museum",
    summary: "Pioneer West Museum in Shamrock occupies the former Reynolds Hotel and anchors a local-history complex that includes the restored Magnolia Station, Zeigler House and Old Barn near Texas Route 66.",
    category: "historic-sites",
    region: "panhandle",
    nearestTown: "Shamrock",
    county: "Wheeler County",
    coordinates: { lat: 35.215905, lng: -100.247594 },
    hero: museumPlaceholder("Pioneer West Museum"),
    bestSeason: "Year-round museum; spring and fall are ideal for a Route 66 stop and walking Shamrock's historic core.",
    entryNote: "The City of Shamrock currently lists Pioneer West Museum at 204 N. Madden and identifies its restored Magnolia Station, Zeigler House and Old Barn as part of the museum complex. Check current hours before visiting because published schedules vary by source and season.",
    highlights: ["Former Reynolds Hotel", "Restored Magnolia Station", "Zeigler House", "Route 66 and Wheeler County history"],
    body: [
      "Pioneer West Museum provides the local-history counterpart to Shamrock's better-known Route 66 landmarks. Its home in the former Reynolds Hotel ties the collection directly to the era when traveling salespeople and highway travelers passed through the growing Panhandle town.",
      "The wider museum complex adds the restored Magnolia Station, Zeigler House and Old Barn, allowing visitors to see transportation, domestic and community history together rather than treating Route 66 as the town's only historical layer.",
      "For TexasDefined, the museum creates a dedicated Wheeler County authority page that can cross-link the U-Drop Inn, Route 66 itineraries, Shamrock city content and Panhandle history without duplicating the separate landmark pages used for the highway corridor."
    ],
    officialUrl: "https://www.shamrocktexas.net/historic-route-66",
    managingAuthority: "Pioneer West Museum",
    address: "204 N Madden St, Shamrock, TX 79079",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  },
];
