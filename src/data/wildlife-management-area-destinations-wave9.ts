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
 * Ninth statewide Texas Wildlife Management Area authority wave.
 *
 * Adds four current Prairies & Lakes WMAs verified against TPWD's current
 * directory. These records retain the shared photo placeholder so the existing
 * destination-readiness gate keeps them staged until licensed imagery exists.
 */
export const wildlifeManagementAreaWave9Destinations: Destination[] = [
  wma({
    slug: "caddo-national-grasslands-wildlife-management-area",
    name: "Caddo National Grasslands Wildlife Management Area",
    summary: "Caddo National Grasslands Wildlife Management Area covers more than 16,000 acres of federally administered public land in Fannin County, with Bois d'Arc Creek and Ladonia units managed cooperatively by the U.S. Forest Service and Texas Parks and Wildlife Department.",
    region: "prairies-lakes",
    nearestTown: "Ladonia",
    county: "Fannin County",
    coordinates: { lat: 33.4146, lng: -96.0213 },
    bestSeason: "Spring for Blackland Prairie wildflowers and migrant birds, and fall for cooler hiking, camping and wildlife viewing.",
    entryNote: "Open year-round. The WMA is split among multiple tracts, so the map point is a representative public-access location in the Ladonia Unit rather than a single headquarters. Non-consumptive visitors do not currently need an Annual Public Hunting permit, while hunters age 17 and older need the applicable license and public-hunting permit. Follow current Forest Service and TPWD road, fire and hunting restrictions.",
    highlights: ["Bois d'Arc Creek and Ladonia units", "Blackland Prairie restoration", "Camping, hiking and equestrian use", "Birding and public hunting"],
    body: [
      "Caddo National Grasslands WMA is unusual in the Texas WMA system because the land is administered by the U.S. Forest Service and managed cooperatively with TPWD. Its two major units are further divided into separate tracts across Fannin County.",
      "The Ladonia Unit includes restoration work on native Blackland tallgrass prairie, while other tracts mix grassland, woodland and water features that support deer, turkey, quail, waterfowl, songbirds and other wildlife.",
      "Because access is distributed rather than centered on one visitor complex, travelers should choose a specific unit and entrance before departure and verify current Forest Service and TPWD rules for roads, camping, hunting and seasonal conditions.",
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=4",
  }),
  wma({
    slug: "cooper-wildlife-management-area",
    name: "Cooper Wildlife Management Area",
    summary: "Cooper Wildlife Management Area protects 14,480 acres around Jim Chapman Lake and Cooper Dam in Delta and Hopkins counties, providing wetlands, fields and wooded habitat for year-round fishing, hiking, biking, wildlife viewing and regulated hunting.",
    region: "prairies-lakes",
    nearestTown: "Sulphur Springs",
    county: "Delta and Hopkins counties",
    coordinates: { lat: 33.254, lng: -95.795 },
    address: "829 CR 4795, Sulphur Springs, TX 75482-0402",
    bestSeason: "Fall through spring for cooler hiking, birding and wildlife viewing; wet-weather access should be checked after heavy rain.",
    entryNote: "Open year-round. No permit is currently required for non-consumptive use; hunters age 17 and older need an Annual Public Hunting permit and valid hunting license. The WMA has multiple entrances, flooding can make roads impassable, restrooms are limited to Johns Creek Boat Ramp, and visitors should bring drinking water.",
    highlights: ["14,480 acres around Jim Chapman Lake", "Wetlands and lake-edge habitat", "Year-round hiking, biking and wildlife viewing", "Public fishing and regulated hunting"],
    body: [
      "Cooper WMA wraps a broad public-land landscape around Jim Chapman Lake and Cooper Dam under a management agreement involving TPWD and the U.S. Army Corps of Engineers.",
      "The mix of wetlands, open land and wooded cover supports waterfowl, deer and other wildlife while also allowing fishing, hiking, biking and public hunting across designated portions of the property.",
      "The map point represents a documented WMA location within the larger multi-entrance complex. Visitors should use TPWD's current directions to choose an access point and avoid assuming every county road remains passable after heavy rain.",
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=6",
  }),
  wma({
    slug: "mo-neasloney-wildlife-management-area",
    name: "M.O. Neasloney Wildlife Management Area",
    summary: "M.O. Neasloney Wildlife Management Area is a 100-acre Gonzales County wildlife education center between Luling and Gonzales, used primarily for school ecology field tours, interpretive programs, hiking and wildlife viewing.",
    region: "prairies-lakes",
    nearestTown: "Gonzales",
    county: "Gonzales County",
    coordinates: { lat: 29.5566, lng: -97.6838 },
    address: "20700 SH 80 North, Gonzales, TX 78629",
    bestSeason: "Fall through spring for scheduled educational visits, nature-trail walks and comfortable wildlife viewing.",
    entryNote: "Access is reservation- and schedule-based rather than ordinary daily walk-in recreation. Contact the WMA office for current reservation information or scheduled events. Registration is required. Restrooms, an indoor classroom and picnic area are available, but visitors should bring drinking water.",
    highlights: ["Wildlife education center", "One-mile interpretive nature trail", "School ecology field tours", "Accessible classroom, restroom and picnic facilities"],
    body: [
      "M.O. Neasloney donated this property to the Wildlife Division for development as a wildlife education center, and the 100-acre site remains focused on teaching rather than high-volume recreation.",
      "A small pond, native cover and an undeveloped interpretive trail allow school groups and scheduled visitors to see practical wildlife-management projects and the habitats they support.",
      "The WMA is also Neasloney's burial place. Because public access is organized around reservations, classes and events, visitors should contact TPWD before making a special trip rather than assuming an open gate or staffed visitor center.",
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=13",
  }),
  wma({
    slug: "pat-mayse-wildlife-management-area",
    name: "Pat Mayse Wildlife Management Area",
    summary: "Pat Mayse Wildlife Management Area covers 8,925 acres along the western edge of Pat Mayse Reservoir northwest of Paris, combining reservoir water, abandoned fields, upland hardwoods and stream bottomlands used for wildlife habitat and public hunting.",
    region: "prairies-lakes",
    nearestTown: "Paris",
    county: "Lamar County",
    coordinates: { lat: 33.84538, lng: -95.56024 },
    bestSeason: "Fall through spring for comfortable hiking, fishing and wildlife viewing, except when the entire WMA closes for Special Permit hunts.",
    entryNote: "Open year-round except when the entire area closes for Special Permit hunts. No on-site registration or APH/LPU permit is currently required for fishing and non-hunting activities; hunters age 17 and older need the applicable public-hunting permit and license. Interior logging roads can require four-wheel drive, ATVs are prohibited, restrooms and drinking water are unavailable, and visitors must pack out trash.",
    highlights: ["8,925 acres beside Pat Mayse Reservoir", "Hardwood uplands and stream bottomlands", "Fishing, hiking and wildlife viewing", "Public hunting and primitive hunter camping"],
    body: [
      "Pat Mayse WMA occupies a large Post Oak Savannah landscape on the west side of the reservoir, with approximately 1,500 surface acres of water plus abandoned fields, hardwood timber, bottomlands and uplands.",
      "White-tailed deer, wild turkey, woodcock, waterfowl, raptors, songbirds and a range of mammals use the property. A public boat ramp and small-craft launch expand access beyond the road and trail network.",
      "This remains a working public-hunting landscape rather than a developed park. Special hunts can close the entire WMA, interior roads may be rough or wet, and visitors should arrive self-sufficient with water, navigation and a plan to pack out everything they bring in.",
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=18",
  }),
];
