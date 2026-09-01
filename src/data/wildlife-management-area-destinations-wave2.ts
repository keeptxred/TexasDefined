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
 * Second statewide Texas Wildlife Management Area authority wave.
 * These records remain staged behind the shared destination-photo readiness
 * safeguard until destination-specific licensed imagery is attached.
 */
export const wildlifeManagementAreaWave2Destinations: Destination[] = [
  wma({
    slug: "richland-creek-wildlife-management-area",
    name: "Richland Creek Wildlife Management Area",
    summary: "Richland Creek WMA protects Trinity River floodplain habitat created in part to offset wildlife losses associated with Richland-Chambers Reservoir and supports both resident and migratory wildlife.",
    region: "prairies-lakes",
    nearestTown: "Streetman",
    county: "Freestone and Navarro counties",
    coordinates: { lat: 31.95, lng: -96.19 },
    address: "1670 FM 488, Streetman, TX 75859",
    bestSeason: "Fall through spring for cooler temperatures, waterfowl and wetland wildlife viewing.",
    entryNote: "Portions of the WMA close for hunting activities. Adult visitors should verify current permit, registration and unit-closure rules before entering either the Carl Frentress or Trinity unit.",
    highlights: ["Trinity River floodplain", "Bottomland hardwood habitat", "Waterfowl and migratory wildlife", "Carl Frentress and Trinity units"],
    body: [
      "Richland Creek WMA was established to compensate for habitat losses tied to construction of Richland-Chambers Reservoir and is managed for indigenous and migratory wildlife along the Trinity River system.",
      "The landscape includes wetlands, floodplain forest and other lowland habitat that support waterfowl, deer and a broad mix of resident wildlife while also serving as a public hunting and wildlife-viewing area.",
      "Access changes with hunting schedules, so visitors should use TPWD's current public-hunting search and WMA notices before choosing a unit or travel date."
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=23"
  }),
  wma({
    slug: "jd-murphree-wildlife-management-area",
    name: "J.D. Murphree Wildlife Management Area",
    summary: "J.D. Murphree WMA is a coastal-marsh complex near Port Arthur and Sabine Lake where freshwater and brackish wetlands support waterfowl, alligators, marsh birds and regulated public recreation.",
    region: "gulf-coast",
    nearestTown: "Port Arthur",
    county: "Jefferson County",
    coordinates: { lat: 29.84, lng: -94.05 },
    address: "10 Parks & Wildlife Dr, Port Arthur, TX 77640",
    bestSeason: "Late spring and summer for marsh-bird viewing; fishing and wildlife-viewing windows vary around public hunts.",
    entryNote: "Wildlife viewing, fishing and other non-consumptive uses are seasonal and can be restricted during teal, waterfowl, feral-hog and alligator hunts. A Limited Public Use permit is available for non-consumptive visits.",
    highlights: ["Coastal marsh wildlife", "Great Texas Coastal Birding Trail site", "Freshwater and coastal fishing", "Alligators and marsh birds"],
    body: [
      "J.D. Murphree WMA sits near Port Arthur along the Louisiana border and includes the Big Hill, Hillebrandt and Salt Bayou units within a broad coastal wetland landscape.",
      "Wildlife viewing can include least bitterns, waterfowl, alligators, otters, bobcats and other marsh species. Some viewing access must be arranged, and small-boat access opens additional parts of the wetland system.",
      "Because public use is interwoven with seasonal hunts, visitors should confirm the current TPWD calendar, permit requirements and unit-specific access before arrival."
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=40"
  }),
  wma({
    slug: "guadalupe-delta-wildlife-management-area",
    name: "Guadalupe Delta Wildlife Management Area",
    summary: "Guadalupe Delta WMA protects a multi-unit coastal wetland complex around the Guadalupe River delta, preserving marsh, river and bay habitat important to waterfowl and other Gulf Coast wildlife.",
    region: "gulf-coast",
    nearestTown: "Port Lavaca",
    county: "Calhoun County",
    coordinates: { lat: 28.56, lng: -96.67 },
    address: "13815 S Hwy 35, Port Lavaca, TX 77979",
    bestSeason: "Fall through spring for waterfowl, cooler hiking and wetland wildlife viewing.",
    entryNote: "Some units are open daily for fishing, biking, hiking and wildlife viewing, but adults generally need an APH or Limited Public Use permit. The San Antonio Unit is closed to unescorted public access.",
    highlights: ["Guadalupe River delta wetlands", "Mission Lake and Hynes Bay units", "Waterfowl habitat", "Fishing and wildlife viewing"],
    body: [
      "Guadalupe Delta WMA was assembled to protect an ecologically important wetland complex identified for preservation by state and federal wildlife agencies in the late 1970s.",
      "The WMA includes Mission Lake, Hynes Bay, Guadalupe River and San Antonio units, each with different access patterns and a mix of marsh, river and bay-edge habitat.",
      "Visitors should plan by unit rather than assuming the entire WMA is open. Permit requirements, weather-sensitive road access and hunt schedules can all affect a trip."
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=37"
  }),
  wma({
    slug: "mad-island-wildlife-management-area",
    name: "Mad Island Wildlife Management Area",
    summary: "Mad Island WMA preserves 7,714 acres of coastal prairie and fresh-to-saline marsh near Matagorda Bay for wintering waterfowl, shorebirds, wading birds and other Gulf Coast wildlife.",
    region: "gulf-coast",
    nearestTown: "Collegeport",
    county: "Matagorda County",
    coordinates: { lat: 28.69, lng: -95.98 },
    address: "1102 CR 374, Collegeport, TX 77465",
    bestSeason: "Fall through spring for waterfowl, cranes, shorebirds and cooler coastal conditions.",
    entryNote: "Routine public access is limited. The WMA opens on specified hunting dates and for scheduled conservation tours, so confirm an authorized access opportunity before making the drive.",
    highlights: ["7,714 acres of coastal wetlands", "Wintering waterfowl", "Shorebirds and wading birds", "Scheduled conservation tours"],
    body: [
      "Mad Island WMA was purchased with waterfowl-stamp funds in 1987 to conserve coastal wetland habitat along the middle Texas coast.",
      "Its mix of fresh, intermediate, brackish and saline marsh with flat coastal prairie supports ducks, geese, sandhill cranes, alligators, deer and large numbers of migratory birds.",
      "Unlike a state park, Mad Island is not continuously open for casual visitation. Public access is tied to specific hunts and scheduled conservation tours."
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=39"
  }),
  wma({
    slug: "matador-wildlife-management-area",
    name: "Matador Wildlife Management Area",
    summary: "Matador WMA protects 28,183 acres of Rolling Plains habitat in Cottle County, including mesquite uplands, shinnery oak, juniper hills and bottomlands used for wildlife research and public use.",
    region: "panhandle",
    nearestTown: "Paducah",
    county: "Cottle County",
    coordinates: { lat: 34.12, lng: -100.3 },
    address: "3036 FM 3256, Paducah, TX 79248",
    bestSeason: "Fall through spring for moderate temperatures and open-country wildlife viewing outside hunt closures.",
    entryNote: "The WMA is generally open year-round but the entire area closes for special-permit hunts. Registration is required, and hunting access follows TPWD public-hunting rules.",
    highlights: ["28,183-acre Rolling Plains landscape", "Shinnery oak and mesquite habitat", "Wildlife research", "Public hunting and wildlife use"],
    body: [
      "Texas Parks and Wildlife acquired Matador WMA in 1959 with Pittman-Robertson funds for wildlife research, wildlife management and compatible public use.",
      "The property represents several Rolling Plains habitat types, from mesquite uplands and shinnery-oak rangeland to gravelly juniper hills and bottomlands.",
      "Special-permit hunts can close the entire WMA, so visitors should confirm current closures and registration requirements before traveling to this remote part of Cottle County."
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=15"
  }),
  wma({
    slug: "mason-mountain-wildlife-management-area",
    name: "Mason Mountain Wildlife Management Area",
    summary: "Mason Mountain WMA is a Hill Country wildlife research and demonstration property north of Mason where most public visitation is supervised or tied to education, research and regulated hunting.",
    region: "hill-country",
    nearestTown: "Mason",
    county: "Mason County",
    coordinates: { lat: 30.81, lng: -99.23 },
    bestSeason: "Spring and fall for scheduled educational visits and mild weather; dove-season access applies only to designated areas.",
    entryNote: "The WMA is not open to unsupervised general visitation. Most access is limited to research, education, scheduled tours and drawn hunts; the South Dove Unit has separate dove-season public-hunting access.",
    highlights: ["Hill Country wildlife research", "200-acre demonstration site", "Habitat-management education", "Controlled public hunting"],
    body: [
      "Mason Mountain WMA functions primarily as a research, education and wildlife-management demonstration landscape rather than a conventional recreation site.",
      "The property's demonstration work includes native plantings, brush management, prescribed fire and structures that support cavity-nesting birds, giving scheduled visitors a practical view of habitat-management techniques.",
      "General access is deliberately restricted. Travelers should arrange or verify an authorized activity through TPWD instead of arriving for unsupervised sightseeing."
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=14"
  })
];
