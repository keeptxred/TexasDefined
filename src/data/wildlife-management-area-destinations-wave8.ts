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
 * Eighth statewide Texas Wildlife Management Area authority wave.
 *
 * Adds four current TPWD research-and-demonstration WMAs from the Trans-Pecos,
 * Panhandle Plains, Post Oak Savannah and Hill Country. Subject-specific images
 * are intentionally deferred to the normal destination-readiness gate.
 */
export const wildlifeManagementAreaWave8Destinations: Destination[] = [
  wma({
    slug: "elephant-mountain-wildlife-management-area",
    name: "Elephant Mountain Wildlife Management Area",
    summary: "Elephant Mountain Wildlife Management Area protects 23,147 acres of rugged Trans-Pecos habitat south of Alpine, centered on a 6,225-foot flat-topped mountain managed for desert bighorn sheep, large-game conservation, research and compatible public use.",
    region: "big-bend-country",
    nearestTown: "Alpine",
    county: "Brewster County",
    coordinates: { lat: 30.02039, lng: -103.50736 },
    bestSeason: "Late fall through spring for milder desert temperatures; the designated driving tour operates seasonally and the entire WMA closes during special hunts.",
    entryNote: "The WMA is generally open year-round except for special-hunt closures, with self-registration required. The current TPWD driving tour is seasonal, and the top of Elephant Mountain is closed to public access to protect desert bighorn habitat. Bring drinking water and verify current closure notices before the long drive south of Alpine.",
    highlights: ["23,147 acres of Trans-Pecos habitat", "Desert bighorn sheep conservation", "Seasonal driving tour", "Mountain and desert wildlife viewing"],
    body: [
      "Elephant Mountain WMA occupies one of the most dramatic research landscapes in the Trans-Pecos. The mountain rises nearly 2,000 feet above the surrounding tableland and anchors habitat used by desert bighorn sheep, mule deer, pronghorn, scaled quail and other desert wildlife.",
      "TPWD acquired the property in 1985 to support desert bighorn restoration, large-game conservation and wildlife research. Public hiking, camping, driving and wildlife viewing are secondary to those conservation goals and are managed around research and special-hunt needs.",
      "Visitors should not interpret the WMA as an unrestricted mountain climb: the summit plateau is closed to protect bighorn habitat, all users must register, and access can change around hunts or wildlife-management operations.",
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=7",
  }),
  wma({
    slug: "gene-howe-wildlife-management-area",
    name: "Gene Howe Wildlife Management Area",
    summary: "Gene Howe Wildlife Management Area protects 5,394 acres along the Canadian River north of Canadian, blending sand-sagebrush and midgrass uplands with cottonwood and tallgrass bottomlands in the northeastern Texas Panhandle.",
    region: "panhandle-plains",
    nearestTown: "Canadian",
    county: "Hemphill County",
    coordinates: { lat: 35.92115, lng: -100.27652 },
    bestSeason: "Spring and fall for birding and comfortable hiking; winter high water can make Canadian River bottomlands inaccessible even to four-wheel-drive vehicles.",
    entryNote: "Open year-round except when the entire area closes for special hunts. Registration is required. Adult non-hunting visitors generally need a Limited Public Use permit; some interior roads require or strongly favor four-wheel drive, and winter river conditions can close bottomland access.",
    highlights: ["Canadian River bottomlands", "Sand-sagebrush and midgrass prairie", "Cottonwood wildlife habitat", "Birding, hiking and primitive public-land recreation"],
    body: [
      "Gene Howe WMA was assembled beginning in 1950 as a wildlife-management, public-use and research property along the Canadian River. Roughly two-thirds of the landscape is sand-sagebrush and midgrass range, while the remainder is cottonwood and tallgrass bottomland.",
      "That habitat contrast supports a wide mix of Panhandle wildlife and makes the WMA useful for birding, hiking, fishing, camping and wildlife observation in addition to regulated hunting.",
      "Access is intentionally primitive. Visitors must register, adults need the appropriate TPWD public-use permit, and high water can isolate river-bottom areas even when four-wheel-drive vehicles are available.",
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=8",
  }),
  wma({
    slug: "gus-engeling-wildlife-management-area",
    name: "Gus Engeling Wildlife Management Area",
    summary: "Gus Engeling Wildlife Management Area protects 11,095 acres northwest of Palestine as a Post Oak Savannah research and demonstration landscape of upland oak woods, bottomland hardwoods, natural springs, wetlands, pitcher-plant bogs and relict pine communities.",
    region: "prairies-and-lakes",
    nearestTown: "Tennessee Colony",
    county: "Anderson County",
    coordinates: { lat: 31.94377, lng: -95.88913 },
    address: "16149 North US Hwy 287, Tennessee Colony, TX 75861",
    bestSeason: "Spring for wildflowers, bog plants and bird activity; fall and winter visits require extra attention to drawn-hunt closures.",
    entryNote: "General public access is during daylight hours through designated legal entry points, with daily on-site registration required. Adult visitors need an Annual Public Hunting or Limited Public Use permit as appropriate. The WMA closes for drawn hunts in fall and winter, so call or check TPWD before visiting during hunting season.",
    highlights: ["Post Oak Savannah research landscape", "Pitcher-plant and sphagnum bogs", "Bottomland hardwood forests", "Nine-stop self-guided habitat-management driving tour"],
    body: [
      "Gus Engeling WMA is one of Texas's long-running wildlife research and demonstration areas, preserving a comparatively intact section of Post Oak Savannah amid a heavily altered regional landscape.",
      "Its ecological variety is unusually high: rolling post-oak uplands transition into mature bottomland forest, springs, sloughs, marshes, sphagnum bogs and relict pine communities. TPWD uses prescribed fire, grazing, brush management and regulated hunting to demonstrate habitat-management practices.",
      "Public use is substantial but structured. Visitors must register, carry the correct TPWD permit, remain out of protected bog areas, bring drinking water and account for seasonal whole-area closures during drawn hunts.",
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=10",
  }),
  wma({
    slug: "kerr-wildlife-management-area",
    name: "Kerr Wildlife Management Area",
    summary: "Kerr Wildlife Management Area protects 6,459 acres near Hunt at the headwaters of the North Fork Guadalupe River, serving as TPWD's Edwards Plateau research and demonstration site for white-tailed deer, Hill Country habitat and wildlife management.",
    region: "hill-country",
    nearestTown: "Hunt",
    county: "Kerr County",
    coordinates: { lat: 30.0621, lng: -99.504 },
    address: "2625 FM 1340, Hunt, TX 78024",
    bestSeason: "Fall through spring for mild Hill Country wildlife viewing; public access is suspended during special-permit hunts.",
    entryNote: "Public access is available year-round in designated areas except during special-permit hunts, but hours vary by entrance. The main entrance is generally open weekdays, while Schumacher Road provides daylight wildlife-viewing access daily. Registration is required, camping is not permitted, and hunting is only through TPWD drawn hunts.",
    highlights: ["North Fork Guadalupe River headwaters", "White-tailed deer research", "Four-mile educational driving tour", "Hill Country birding and wildlife viewing"],
    body: [
      "Kerr WMA has served for decades as TPWD's Edwards Plateau laboratory for habitat management and wildlife research. The Donnie E. Harmel White-tailed Deer Research Facility is closely associated with the area's long-running deer studies.",
      "For non-hunters, the most accessible experiences include a paved four-mile educational auto tour on weekdays and daily daylight wildlife viewing from the Schumacher entrance. The WMA also protects river frontage and habitat used by a broad Hill Country bird community.",
      "Access remains subordinate to research and wildlife management. Visitors must register, should verify hunt closures before arrival, cannot camp on the WMA, and should pay attention to the different operating hours for the main and Schumacher entrances.",
    ],
    officialUrl: "https://tpwd.texas.gov/huntwild/hunt/wma/find_a_wma/list/?id=12",
  }),
];
