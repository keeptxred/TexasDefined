import { DESTINATION_PHOTO_PLACEHOLDER } from "./explore-hero-reconciliation";
import type { Destination, ImageRef } from "./types";

const SOURCE_CHECKED_AT = "2026-09-01";

function wmaPlaceholder(name: string): ImageRef {
  return {
    src: DESTINATION_PHOTO_PLACEHOLDER,
    alt: `${name} — destination-specific photograph not yet available`,
    width: 1600,
    height: 1067,
  };
}

function wma(input: Omit<Destination, "id" | "brandId" | "category" | "hero" | "sourceCheckedAt" | "managingAuthority">): Destination {
  return {
    ...input,
    id: `texas-wma-${input.slug}`,
    brandId: "texasdefined",
    category: "outdoors",
    hero: wmaPlaceholder(input.name),
    managingAuthority: "Texas Parks and Wildlife Department",
    sourceCheckedAt: SOURCE_CHECKED_AT,
  };
}

/**
 * Fourth statewide Texas Wildlife Management Area authority wave.
 *
 * This wave covers the current South Texas Plains regional WMA inventory.
 * Records retain the shared destination-photo placeholder so the existing
 * destination-readiness gate keeps them staged until subject-specific licensed
 * imagery is attached.
 */
export const wildlifeManagementAreaWave4Destinations: Destination[] = [
  wma({
    slug: "chaparral-wildlife-management-area",
    name: "Chaparral Wildlife Management Area",
    summary: "Chaparral Wildlife Management Area protects 15,200 acres of South Texas brush country in La Salle and Dimmit counties and serves as a major TPWD research, demonstration and public-education landscape for native wildlife and habitat management.",
    region: "south-texas",
    nearestTown: "Cotulla",
    county: "La Salle and Dimmit counties",
    coordinates: { lat: 28.31, lng: -99.42 },
    address: "64 Chaparral WMA Dr, Cotulla, TX 78014",
    bestSeason: "April through August for general non-consumptive public use; cooler spring mornings are especially comfortable for the driving route, nature trails and wildlife viewing.",
    entryNote: "General non-consumptive public use is normally available April 1 through August 31 because public hunts dominate much of September through March. Registration is required. Visitors age 17 and older generally need an Annual Public Hunting or Limited Public Use permit for WMA use, with current TPWD exceptions for the driving tour and designated nature trails. Confirm current hunt closures and access rules before traveling.",
    highlights: ["South Texas thornscrub", "Wildlife research and habitat demonstrations", "Driving tour and nature trails", "Wheelchair-accessible wildlife viewing tower"],
    body: [
      "Chaparral WMA is one of TPWD's best-known South Texas research landscapes, preserving a large block of Tamaulipan brush country while supporting long-running studies of white-tailed deer, quail, javelina, predators, vegetation and land-management practices.",
      "For non-hunting visitors, the public experience is concentrated in the warmer half of the year. A driving route and nature trails open roughly 1,200 acres to vehicle, foot and bicycle exploration, and a wheelchair-accessible observation tower adds a practical wildlife-viewing stop.",
      "The WMA is not operated like a conventional state park. Hunt schedules, permits and registration shape access, so visitors should check current TPWD notices before departure and avoid assuming that every tract or road is open on a given day."
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=7",
  }),
  wma({
    slug: "james-e-daughtrey-wildlife-management-area",
    name: "James E. Daughtrey Wildlife Management Area",
    summary: "James E. Daughtrey Wildlife Management Area protects South Texas brush, shoreline and wildlife habitat around Choke Canyon Reservoir in Live Oak and McMullen counties, with access centered on managed hunting, wildlife research and reservoir recreation.",
    region: "south-texas",
    nearestTown: "Tilden",
    county: "Live Oak and McMullen counties",
    coordinates: { lat: 28.47, lng: -98.45 },
    address: "198 Wildlife Ranch Rd, Tilden, TX 78072",
    bestSeason: "April through midsummer for general non-hunting access, with spring offering the most comfortable temperatures for wildlife viewing and reservoir-area recreation.",
    entryNote: "Public access is limited and permit-oriented. TPWD generally allows non-hunting public use from April 1 through August 1 and closes general access during scheduled hunts. Choke Canyon Reservoir facilities, including the San Miguel boat ramp, can also be affected by hunt dates and water levels. Verify current WMA and reservoir notices before traveling.",
    highlights: ["Choke Canyon Reservoir habitat", "South Texas brush-country wildlife", "Wildlife research and management", "Seasonal public access and hunting"],
    body: [
      "James E. Daughtrey WMA links South Texas brush-country management with the much larger Choke Canyon Reservoir landscape. TPWD describes the WMA and reservoir together as an important wildlife complex, while the managed WMA land itself is only part of that broader acreage.",
      "The area supports white-tailed deer, turkey, quail, javelina, waterfowl and other brush-country species, and it functions as both a research site and a public-hunting destination. Reservoir shorelines add another ecological layer, but water access and WMA land access follow different rules.",
      "Travelers should plan around current permit and hunt calendars rather than treating the site as an always-open recreation area. Low reservoir levels can also change boat-ramp availability and shoreline access."
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=8",
  }),
  wma({
    slug: "las-palomas-wildlife-management-area",
    name: "Las Palomas Wildlife Management Area",
    summary: "Las Palomas Wildlife Management Area is a network of 18 Lower Rio Grande Valley units protecting Tamaulipan thornscrub, grassland, farmland and wetlands across Starr, Hidalgo, Cameron and Willacy counties.",
    region: "south-texas",
    nearestTown: "Weslaco",
    county: "Starr, Hidalgo, Cameron and Willacy counties",
    coordinates: { lat: 26.16, lng: -97.99 },
    address: "154-B Lakeview Dr, Weslaco, TX 78596",
    bestSeason: "Fall through spring for comfortable hiking, birding and Lower Rio Grande Valley wildlife viewing; unit-level hunt schedules can temporarily close non-hunting access.",
    entryNote: "Selected public-use units are generally available during daylight hours for hiking, bicycling and wildlife viewing, but non-hunting activities close during public hunts. Visitors age 17 and older generally need an Annual Public Hunting or Limited Public Use permit, and daily entry and exit registration is required through TPWD's current on-site registration process. Choose a specific unit and verify its current rules before traveling.",
    highlights: ["18 Lower Rio Grande Valley units", "Tamaulipan thornscrub", "White-winged dove conservation history", "Birding, hiking and wildlife viewing"],
    body: [
      "Las Palomas is not one contiguous preserve. Its 18 units are scattered across the Lower Rio Grande Valley, where TPWD has protected and restored tracts of thornscrub, grassland, agricultural edge and wetland habitat in a region transformed by intensive development and farming.",
      "The WMA was historically associated with protection of white-winged dove nesting habitat, but its units now support a broader South Texas wildlife community and provide strategically placed public lands within one of the country's most distinctive birding regions.",
      "Public access is unit-specific. Anacua, Arroyo Colorado, Baird, Carricitos, Chapote, Ebony, Longoria, Taormina and Tucker are among the units TPWD identifies for public use, so a successful visit starts by selecting a unit, reviewing its map and checking hunt closures before departure."
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=12",
  }),
];
