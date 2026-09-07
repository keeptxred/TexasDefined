import { DESTINATION_PHOTO_PLACEHOLDER } from "../explore-hero-reconciliation";
import type { Destination, SearchDocument, TexasRegion } from "../types";
import { RV_PARK_RAW_BIG_BEND_WEST_TEXAS } from "./big-bend-west-texas";
import { RV_PARK_RAW_GULF_COAST } from "./gulf-coast";
import { RV_PARK_RAW_HILL_COUNTRY } from "./hill-country";
import { rvParkLicensedImage } from "./images.server";
import { RV_PARK_RAW_PANHANDLE_NORTH_TEXAS } from "./panhandle-north-texas";
import { RV_PARK_RAW_PINEY_WOODS_EAST_TEXAS } from "./piney-woods-east-texas";

export type RvParkSeedGroupId = "hill-country" | "gulf-coast" | "piney-woods-east-texas" | "panhandle-north-texas" | "big-bend-west-texas";
export type RvParkSeedRecord = {
  order: number;
  name: string;
  town: string;
  county: string;
  groupId: RvParkSeedGroupId;
  groupName: string;
  region: TexasRegion;
  slug: string;
  officialUrl?: string;
  sourceCheckedAt?: string;
  address?: string;
  managingAuthority?: string;
  coordinates?: { lat: number; lng: number };
};

type RvParkContentOverride = Pick<Destination, "summary" | "bestSeason" | "entryNote" | "highlights" | "body">;

export const RV_PARK_SEED_IMPORTED_AT = "2026-09-05";
export const RV_PARK_SEED_COUNT = 250;
export const RV_PARK_CURATED_PUBLIC_WAVE1_COUNT = 5;
export const RV_PARK_CURATED_PUBLIC_WAVE2_COUNT = 5;
export const RV_PARK_CURATED_PUBLIC_COUNT = RV_PARK_CURATED_PUBLIC_WAVE1_COUNT + RV_PARK_CURATED_PUBLIC_WAVE2_COUNT;

const CONSERVATIVE_SEED = { coordinates: { lat: 0, lng: 0 } } as const;

const GROUPS = [
  { id: "hill-country", name: "Texas Hill Country", region: "hill-country", parks: RV_PARK_RAW_HILL_COUNTRY },
  { id: "gulf-coast", name: "Gulf Coast", region: "gulf-coast", parks: RV_PARK_RAW_GULF_COAST },
  { id: "piney-woods-east-texas", name: "Piney Woods & East Texas", region: "piney-woods", parks: RV_PARK_RAW_PINEY_WOODS_EAST_TEXAS },
  { id: "panhandle-north-texas", name: "Panhandle Plains & North Texas", region: "prairies-lakes", parks: RV_PARK_RAW_PANHANDLE_NORTH_TEXAS },
  { id: "big-bend-west-texas", name: "Big Bend & West Texas", region: "big-bend", parks: RV_PARK_RAW_BIG_BEND_WEST_TEXAS },
] as const satisfies readonly { id: RvParkSeedGroupId; name: string; region: TexasRegion; parks: readonly (readonly [string, string, string, string, TexasRegion?])[] }[];

const SOURCE_OVERRIDES: Record<string, Pick<RvParkSeedRecord, "officialUrl" | "sourceCheckedAt" | "address" | "managingAuthority" | "coordinates">> = {
  "blanco-state-park-rv-area": {
    officialUrl: "https://tpwd.texas.gov/state-parks/blanco",
    sourceCheckedAt: "2026-09-07",
    address: "101 Park Road 23, Blanco, TX 78606",
    managingAuthority: "Texas Parks and Wildlife Department",
    coordinates: { lat: 30.093082, lng: -98.423845 },
  },
  "garner-state-park-rv-loops": {
    officialUrl: "https://tpwd.texas.gov/state-parks/garner",
    sourceCheckedAt: "2026-09-07",
    address: "234 RR 1050, Concan, TX 78838",
    managingAuthority: "Texas Parks and Wildlife Department",
    coordinates: { lat: 29.598887, lng: -99.743981 },
  },
  "pedernales-falls-state-park-rv-sites": {
    officialUrl: "https://tpwd.texas.gov/state-parks/pedernales-falls",
    sourceCheckedAt: "2026-09-07",
    address: "2585 Park Road 6026, Johnson City, TX 78636",
    managingAuthority: "Texas Parks and Wildlife Department",
    coordinates: { lat: 30.308054, lng: -98.257649 },
  },
  "galveston-island-state-park-rv-area": {
    officialUrl: "https://tpwd.texas.gov/state-parks/galveston-island",
    sourceCheckedAt: "2026-09-07",
    address: "14901 FM 3005, Galveston, TX 77554",
    managingAuthority: "Texas Parks and Wildlife Department",
    coordinates: { lat: 29.198755, lng: -94.956212 },
  },
  "palo-duro-canyon-state-park-rv-loop": {
    officialUrl: "https://tpwd.texas.gov/state-parks/palo-duro-canyon",
    sourceCheckedAt: "2026-09-07",
    address: "11450 Park Road 5, Canyon, TX 79015",
    managingAuthority: "Texas Parks and Wildlife Department",
    coordinates: { lat: 34.984709, lng: -101.701867 },
  },
  "caddo-lake-state-park-rv-area": {
    officialUrl: "https://tpwd.texas.gov/state-parks/caddo-lake",
    sourceCheckedAt: "2026-09-07",
    address: "245 Park Road 2, Karnack, TX 75661",
    managingAuthority: "Texas Parks and Wildlife Department",
    coordinates: { lat: 32.680233, lng: -94.176361 },
  },
  "tyler-state-park-rv-loop": {
    officialUrl: "https://tpwd.texas.gov/state-parks/tyler",
    sourceCheckedAt: "2026-09-07",
    address: "789 Park Road 16, Tyler, TX 75706-9141",
    managingAuthority: "Texas Parks and Wildlife Department",
    coordinates: { lat: 32.481414, lng: -95.289441 },
  },
  "huntsville-state-park-rv-loop": {
    officialUrl: "https://tpwd.texas.gov/state-parks/huntsville",
    sourceCheckedAt: "2026-09-07",
    address: "565 Park Road 40 W, Huntsville, TX 77340",
    managingAuthority: "Texas Parks and Wildlife Department",
    coordinates: { lat: 30.628404, lng: -95.525921 },
  },
  "copper-breaks-state-park-rv-area": {
    officialUrl: "https://tpwd.texas.gov/state-parks/copper-breaks",
    sourceCheckedAt: "2026-09-07",
    address: "777 Park Road 62, Quanah, TX 79252-7679",
    managingAuthority: "Texas Parks and Wildlife Department",
    coordinates: { lat: 34.112176, lng: -99.743296 },
  },
  "lake-mineral-wells-state-park-rv-loop": {
    officialUrl: "https://tpwd.texas.gov/state-parks/lake-mineral-wells",
    sourceCheckedAt: "2026-09-07",
    address: "100 Park Road 71, Mineral Wells, TX 76067",
    managingAuthority: "Texas Parks and Wildlife Department",
    coordinates: { lat: 32.812655, lng: -98.043368 },
  },
  "powell-park-resort-and-marina": {
    officialUrl: "https://www.powellpark.com/",
    sourceCheckedAt: "2026-09-05",
    address: "971 County Rd 459, Broaddus, TX 75929",
    managingAuthority: "Powell Park Marina",
  },
};

const CONTENT_OVERRIDES: Readonly<Record<string, RvParkContentOverride>> = {
  "blanco-state-park-rv-area": {
    summary: "Blanco State Park RV Area is a compact Hill Country camping base on the spring-fed Blanco River, with TPWD-verified full-hookup sites plus water-and-electric camping just south of Blanco's town square.",
    bestSeason: "The park is open year-round. Summer centers on river swimming and paddling, while winter brings TPWD trout stocking; check current river conditions and park alerts before travel.",
    entryNote: "Enter at 101 Park Road 23 in Blanco. TPWD lists full-hookup and water-and-electric campsites; reserve camping and day-use access in advance and recheck current alerts before departure.",
    highlights: ["Full-hookup RV campsites", "Blanco River swimming, paddling and fishing", "Hill Country base near Blanco town square"],
    body: [
      "Blanco State Park is one of the more compact RV-friendly state-park bases in the Hill Country. Texas Parks and Wildlife currently lists both full-hookup campsites and sites with water and electricity, so RV travelers can choose a service level rather than assuming every site has the same utilities. The park sits along a one-mile stretch of the Blanco River and is only a short distance south of the town square.",
      "The river is the center of a stay here. TPWD lists swimming, fishing, paddling and boating among the park's activities, and electric motors are the only motors allowed for boats. Anglers can fish from shore in the park without a fishing license, and TPWD stocks rainbow trout in winter. Those seasonal and water-based uses make current river conditions worth checking before an RV trip.",
      "Blanco also works well as a small-footprint Hill Country base rather than a resort-style campground. Civilian Conservation Corps features remain part of the park, and Johnson City and other Hill Country stops are within an easy drive. Use the official TPWD page for the latest campsite availability, entrance requirements, alerts and facility details because reservations and operating conditions can change.",
    ],
  },
  "garner-state-park-rv-loops": {
    summary: "Garner State Park RV Loops provide a Frio River camping base near Concan, combining overnight campsites with swimming, paddling, fishing, 16 miles of trails and the park's long-running summer dance tradition.",
    bestSeason: "Garner is open year-round, but TPWD identifies Memorial Day weekend through Labor Day and holidays as the busy season. Reserve early for summer and check Frio River conditions before travel.",
    entryNote: "Use the park entrance at 234 RR 1050 in Concan. TPWD warns that Garner often reaches capacity, so reserve both camping and entry before travel and verify current alerts and river conditions.",
    highlights: ["Frio River swimming and paddling", "16 miles of Hill Country trails", "Historic summer dance tradition"],
    body: [
      "Garner State Park is a destination campground built around 2.9 miles of the Frio River in Uvalde County. RV travelers share the park with cabin, screened-shelter and other overnight guests, so the experience is broader than a standalone RV resort. The river supports swimming, floating, paddling and fishing, while the surrounding Hill Country terrain gives campers a substantial trail system to explore between time on the water.",
      "TPWD lists 16 miles of scenic trails and describes summer as the park's busiest period. Garner's evening jukebox dances, a tradition dating to the 1940s, remain one of its distinctive visitor experiences. Peak-season parking can fill and gates can close, which makes advance reservations and an early-arrival plan especially important for larger RVs and families traveling on weekends or holidays.",
      "The park entrance is north of Concan on RR 1050, with Leakey and the Frio Canyon nearby for food, supplies and additional Hill Country stops. Before towing in, confirm the exact campsite assigned to the rig, current site dimensions and utilities, any park alerts, and river conditions through TPWD. Texas Defined does not infer hookup service or rig length from the campground name when the official campsite record should control that decision.",
    ],
  },
  "pedernales-falls-state-park-rv-sites": {
    summary: "Pedernales Falls State Park RV Sites offer water-and-electric camping west of Austin, with TPWD listing 69 electric campsites alongside Hill Country hiking and river access away from the protected falls area.",
    bestSeason: "TPWD lists spring, summer and fall as busy seasons. Check weather and river conditions in every season because flash flooding can change the Pedernales quickly.",
    entryNote: "Enter at 2585 Park Road 6026 near Johnson City. Reserve before travel, check current alerts, and note that park gates close overnight; late-arriving campers should follow TPWD's current arrival instructions.",
    highlights: ["69 water-and-electric campsites", "Pedernales Falls overlooks and Hill Country trails", "River swimming and paddling outside the falls area"],
    body: [
      "Pedernales Falls State Park gives RV travelers a developed Hill Country campground about 30 miles west of Austin. TPWD currently lists 69 campsites with electricity, including water hookups and 30-amp service, with restrooms and showers nearby. That makes the park useful for travelers who want a serviced state-park base while still spending most of the day on trails and along the river.",
      "The Pedernales River is both the attraction and the main safety consideration. Visitors can swim, wade, tube, fish and paddle in allowed areas, but TPWD prohibits swimming and wading in the falls area itself. The agency also warns that the river can rise rapidly during flash-flood conditions, so weather, water clarity and current park alerts should be part of the arrival check rather than an afterthought.",
      "Trail options range from the short Twin Falls Nature Trail to longer and more technical Hill Country routes, and the park also supports mountain biking and horseback riding. RV campers should reserve before travel, confirm the current campsite and electrical needs, and follow the park's overnight gate and late-arrival instructions. Johnson City is the nearest practical supply and dining base for combining the campground with a broader Hill Country trip.",
    ],
  },
  "galveston-island-state-park-rv-area": {
    summary: "Galveston Island State Park RV Area places campers between Gulf beach and bay habitats, with TPWD-verified electric campsites, shore fishing, paddling trails, birding and direct access to a protected stretch of Galveston Island.",
    bestSeason: "The park is open year-round, and TPWD identifies March through October, especially weekends, as the busiest period. Check coastal weather, surf and storm conditions before towing onto the island.",
    entryNote: "The park entrance is at 14901 FM 3005 in Galveston. TPWD says the park often reaches capacity, so reserve camping and entry ahead of time and recheck coastal alerts before departure.",
    highlights: ["Beachside and bay-side camping", "20/30/50-amp electric campsite options", "Paddling, shore fishing and coastal birding"],
    body: [
      "Galveston Island State Park is an RV camping base with both Gulf-side and bay-side experiences rather than a conventional inland campground. TPWD lists electric campsites on the beach side with 20-, 30- and 50-amp service among the available configurations. The park also offers bay-side camping, lodges and day-use facilities, so travelers should confirm the exact site type and location before assuming a beach view or a particular hookup package.",
      "The surrounding landscape is the reason to stay here. Campers can fish from shore, paddle protected bay waters, walk beach and marsh habitats, bird, hike and bike. TPWD maintains paddling trails and canoe or kayak launch access, while the beach side gives direct Gulf access. Salt air, wind, heat, thunderstorms and tropical weather can all affect an RV stay, so the current forecast and park alerts matter more here than at many inland stops.",
      "The park is west of central Galveston on FM 3005, making it possible to pair a campground stay with island attractions without giving up a quieter coastal base. TPWD identifies March through October as the busiest season and recommends reservations because the park can reach capacity. Recheck campsite availability, electrical needs, vehicle limits, beach conditions and any storm-related restrictions before towing onto the island.",
    ],
  },
  "palo-duro-canyon-state-park-rv-loop": {
    summary: "Palo Duro Canyon State Park RV Loop represents the park's RV-capable canyon campgrounds near Canyon, where TPWD lists multiple electric-and-water campsite areas, some accommodating RVs up to 60 feet.",
    bestSeason: "The park is open daily. Summer brings the TEXAS Outdoor Musical and peak heat; cooler-season trips can be more comfortable for hiking, but travelers should always check trail, weather and canyon-road conditions.",
    entryNote: "Enter at 11450 Park Road 5 east of Canyon. Reserve the exact campsite before towing in, verify rig-length fit and electrical service, and check TPWD alerts for heat, wet-weather trail closures and canyon conditions.",
    highlights: ["Multiple electric-and-water RV campground areas", "More than 30 miles of canyon trails", "Lighthouse formation and summer TEXAS Outdoor Musical"],
    body: [
      "Palo Duro Canyon State Park has several developed camping areas suitable for RV travelers on the canyon floor. TPWD currently lists electric campsites in Juniper, Mesquite, Sagebrush and Hackberry areas, with water hookups and combinations of 20-, 30- and 50-amp electrical service depending on the campground. Some Mesquite, Sagebrush and Hackberry sites can accommodate RVs up to 60 feet, so the reserved site rather than the directory label should determine whether a particular rig fits.",
      "The campground is surrounded by one of Texas's most distinctive landscapes. More than 30 miles of hiking, biking and equestrian trails cross the park, including the popular Lighthouse Trail. TPWD repeatedly warns visitors to carry plenty of water and to take heat seriously; trails can also close after wet weather or during poor conditions. Summer visitors can add the TEXAS Outdoor Musical at the Pioneer Amphitheater to an overnight canyon stay.",
      "Palo Duro is about 12 miles east of Canyon, with the park road descending from the rim to the campground areas. RV travelers should reserve before arrival, confirm their assigned site's electrical service and length limits, and account for canyon driving before towing a long combination into the park. The exact-location Texas Defined campground image is rights-cleared, while operating details remain tied to the current TPWD campsite and park pages.",
    ],
  },
  "caddo-lake-state-park-rv-area": {
    summary: "Caddo Lake State Park RV Area gives East Texas campers a bald-cypress-and-bayou base near Karnack, with TPWD listing eight 50-amp full-hookup RV sites plus 18 water-and-electric sites in two additional camping areas.",
    bestSeason: "TPWD identifies March through November as the busy season. Spring and fall are especially attractive for paddling and hiking, while every visit should account for humidity, storms, insects and current lake conditions.",
    entryNote: "Enter at 245 Park Road 2 near Karnack. RVs should use the appropriate Woodpecker Hollow, Armadillo Run or Squirrel Haven site; the Mill Pond water-only area does not permit motor homes or trailers. Reserve ahead and check current alerts.",
    highlights: ["Eight 50-amp full-hookup RV sites", "18 additional water-and-electric campsites", "Caddo Lake paddling beneath bald cypress and Spanish moss"],
    body: [
      "Caddo Lake State Park is an unusually distinctive RV base because the campground sits beside Big Cypress Bayou and the maze of wetlands associated with Caddo Lake. TPWD currently lists eight full-hookup campsites in Woodpecker Hollow with water, sewer and 50-amp electric service, plus 18 water-and-electric campsites in Armadillo Run and Squirrel Haven with 30-amp hookups. That mix gives RV travelers both full-service and simpler electric options inside the state park.",
      "The landscape is the main reason to stay. Campers can paddle Saw Mill Pond and Big Cypress Bayou, fish, launch a boat, hike roughly 2.5 miles of park trails and explore Civilian Conservation Corps features under mature bald cypress and Spanish moss. Alligators live in the park, and Harrison County is under an emerald ash borer quarantine, so visitors should follow TPWD wildlife guidance and avoid moving firewood in ways that could spread pests.",
      "Not every Caddo Lake campsite is suitable for an RV. TPWD specifically says motor homes and trailers are not permitted in the Mill Pond water-only camping area, while the named RV-capable areas have their own service levels and site layouts. Reserve the exact site before towing in, verify vehicle fit and hookup needs, and recheck capacity notices, weather, lake conditions and park alerts before leaving for Karnack.",
    ],
  },
  "tyler-state-park-rv-loop": {
    summary: "Tyler State Park RV Loop is a Pineywoods camping base north of Tyler with TPWD-listed full-hookup and electric RV options beside a 64-acre spring-fed lake and more than 13 miles of forest trails.",
    bestSeason: "TPWD lists March through Thanksgiving as the busy season. Spring and fall are comfortable for trails, while summer favors lake time; reservations are strongly recommended because the park often reaches capacity.",
    entryNote: "Enter at 789 Park Road 16 north of Tyler. Reserve the exact Lakeview, Big Pine or Cedar Point site before travel, confirm hookup needs, and note TPWD's jack-pad requirement for RV campers in Lakeview and Cedar Point.",
    highlights: ["57 full-hookup campsites across Lakeview and Big Pine", "30/50-amp electric camping at Cedar Point", "64-acre spring-fed lake and 13-plus miles of trails"],
    body: [
      "Tyler State Park offers one of the broader state-park RV mixes in East Texas. TPWD lists 18 full-hookup campsites in Lakeview and 39 more in the RV-only Big Pine area, all with water, sewer and 30/50-amp electric service. Cedar Point adds 12 water-and-electric campsites with 30/50-amp hookups. RV campers in Lakeview and Cedar Point are instructed to bring and use jack pads, so the reserved loop matters before a rig ever reaches the gate.",
      "The campground surrounds a 64-acre spring-fed lake in the Pineywoods. Visitors can swim, fish, boat, hike, mountain bike, bird and explore more than 13 miles of trails, including the historic Whispering Pines Nature Trail laid out by the Civilian Conservation Corps. The lake has a fishing pier and boat ramp, and the park's mix of water recreation and shaded forest makes it useful as more than an overnight stop between Dallas and East Texas.",
      "Tyler State Park sits two miles north of Interstate 20 on FM 14 and Park Road 16, making it accessible while still feeling wooded once inside. TPWD says the park often reaches capacity and identifies March through Thanksgiving as the busy season. Reserve camping and entry in advance, confirm the assigned site's service and size, and recheck active alerts and seasonal operating details before towing in.",
    ],
  },
  "huntsville-state-park-rv-loop": {
    summary: "Huntsville State Park RV Loop combines full-hookup and electric RV camping near Lake Raven, with TPWD listing 23 full-hookup sites and 77 additional electric campsites six miles southwest of Huntsville.",
    bestSeason: "The park is open year-round. Cooler months are comfortable for hiking and biking, while warmer weather supports lake recreation; weekends can be busy, so reserve ahead and check current park alerts.",
    entryNote: "Enter at 565 Park Road 40 W off Interstate 45. Reserve the exact Raven Hill, Coloneh or Prairie Branch campsite and verify vehicle length, because TPWD lists site and drive lengths that vary substantially across the campground.",
    highlights: ["23 full-hookup RV sites in Raven Hill", "77 water-and-electric campsites", "Lake Raven fishing, paddling and Pineywoods trails"],
    body: [
      "Huntsville State Park has enough developed camping inventory to work for a wide range of RV trips. TPWD lists 23 full-hookup sites in Raven Hill with water, sewer and 20/30/50-amp electrical service, including pull-through configurations. The park also lists 77 water-and-electric campsites in Coloneh and Prairie Branch with 20/30/50-amp service. Vehicle and drive lengths vary by site, so campers should use the reservation record rather than the campground name to judge fit.",
      "Lake Raven and the surrounding Pineywoods turn the campground into a destination rather than a roadside overnight. Visitors can fish, paddle, hike, bike, swim in designated conditions, watch wildlife and connect with the broader Sam Houston National Forest landscape. The licensed Texas Defined image shows Lake Raven inside the park property; it is not presented as a photograph of a particular numbered RV site.",
      "The park entrance is about six miles southwest of Huntsville off Interstate 45 on Park Road 40, which makes grocery, fuel and other services relatively close. TPWD requires a minimum two-night stay for overnight facilities on Friday and Saturday nights and warns that the park can reach capacity. Confirm the assigned site's length, hookups and access, then check current alerts and reservation details before departure.",
    ],
  },
  "copper-breaks-state-park-rv-area": {
    summary: "Copper Breaks State Park RV Area offers 24 TPWD-listed water-and-electric campsites in the Comanche Camping Area, pairing 30/50-amp service with dark skies, rugged trails and the Texas longhorn herd near Quanah.",
    bestSeason: "TPWD identifies spring and summer as the busy season. Cooler fall and winter nights can be excellent for stargazing, but travelers should plan for exposed High Plains weather and check current burn bans and alerts.",
    entryNote: "Enter at 777 Park Road 62 between Quanah and Crowell. Reserve a Comanche Camping Area site for RV electric service; the Kiowa water-only campsites are tent-only. Verify current hookups, weather and park alerts before towing in.",
    highlights: ["24 water-and-electric campsites", "30/50-amp hookups in Comanche Camping Area", "Internationally known dark-sky setting and Texas longhorn herd"],
    body: [
      "Copper Breaks State Park gives RV travelers a developed campground in a much more remote-feeling North Texas landscape. TPWD lists 24 campsites with electricity in the Comanche Camping Area, each with a water hookup and 30/50-amp electrical service. The park also has water-only camping in Kiowa, but TPWD marks those sites as tent-only, so RV travelers should not treat every camping area on the property as interchangeable.",
      "The park's draw extends well beyond the hookups. Visitors can hike, mountain bike, fish, swim when conditions allow, ride horses and spend evenings under notably dark skies. The official State of Texas Longhorn Herd also lives in the park, and overlooks along the rugged red-rock terrain make sunrise and sunset part of the experience. That combination makes Copper Breaks especially useful for travelers seeking a quieter state-park stay rather than resort amenities.",
      "Copper Breaks sits between Quanah and Crowell off State Highway 6, with the campground reached through the park entrance at 777 Park Road 62. TPWD says the park often reaches capacity and identifies spring and summer as busy seasons. Reserve the exact Comanche site, confirm the rig's electrical needs and current park conditions, and recheck burn bans, weather and access alerts before arrival.",
    ],
  },
  "lake-mineral-wells-state-park-rv-loop": {
    summary: "Lake Mineral Wells State Park RV Loop provides 77 TPWD-listed electric campsites west of Fort Worth, split between 50-amp Live Oak sites and 30-amp Plateau sites near the lake, trails and climbing area.",
    bestSeason: "TPWD lists mid-March through mid-November as the busy season. Spring and fall are favorable for trails and climbing, while summer adds swimming and paddling; check heat, burn bans and current park alerts.",
    entryNote: "Enter at 100 Park Road 71 east of Mineral Wells. Choose the reserved Live Oak or Plateau site according to electrical needs, confirm current availability, and review park alerts before towing in from U.S. Highway 180.",
    highlights: ["47 50-amp sites in Live Oak", "30 30-amp sites in Plateau", "Lake recreation, rock climbing and a 20-mile trailway"],
    body: [
      "Lake Mineral Wells State Park & Trailway has a large developed RV inventory close enough to Fort Worth for a weekend but far enough west to feel like a separate outdoor trip. TPWD lists 47 water-and-electric campsites with 50-amp hookups in the Live Oak Camping Area and 30 more with 30-amp hookups in Plateau. Restrooms and showers are nearby, and the two campground types let travelers choose service based on the rig rather than assuming one electrical standard across the park.",
      "Beyond the campground, the park combines lake recreation with a unusually varied trail system. Visitors can swim, fish, boat, hike, bike, ride horses, geocache and use the park's rock-climbing area when open. The attached trailway extends roughly 20 miles through the surrounding countryside. Current conditions matter: TPWD posts operational notices for the climbing area, primitive camping, trails and burn restrictions, so those should be checked close to departure.",
      "The park entrance is at 100 Park Road 71, about four miles east of Mineral Wells on U.S. Highway 180. TPWD recommends reservations because the park can reach capacity and identifies mid-March through mid-November as the busy season. Confirm the exact Live Oak or Plateau site, electrical service, vehicle fit and current alerts before towing in, especially during hot or high-demand weekends.",
    ],
  },
};

let order = 0;
const RV_PARK_SEEDS: readonly RvParkSeedRecord[] = GROUPS.flatMap((group) =>
  group.parks.map(([name, town, county, slug, region]) => {
    order += 1;
    return {
      order,
      name,
      town,
      county,
      slug,
      groupId: group.id,
      groupName: group.name,
      region: region ?? group.region,
      ...SOURCE_OVERRIDES[slug],
    };
  }),
);

function destinationFromSeed(seed: RvParkSeedRecord): Destination {
  const licensedImage = rvParkLicensedImage(seed.slug);
  const content = CONTENT_OVERRIDES[seed.slug];
  const hero = licensedImage ? {
    src: licensedImage.src,
    alt: licensedImage.alt,
    width: licensedImage.width,
    height: licensedImage.height,
    credit: `${licensedImage.creator} · ${licensedImage.license} · Wikimedia Commons · ${licensedImage.sourceUrl}`,
  } : {
    src: DESTINATION_PHOTO_PLACEHOLDER,
    alt: `${seed.name} RV park or campground profile awaiting a destination-specific photograph`,
    width: 1600,
    height: 1067,
  };

  return {
    id: `rv-park-${seed.slug}`,
    brandId: "texasdefined",
    slug: seed.slug,
    name: seed.name,
    category: "rv-parks",
    region: seed.region,
    nearestTown: seed.town,
    county: seed.county,
    coordinates: seed.coordinates ?? CONSERVATIVE_SEED.coordinates,
    hero,
    summary: content?.summary ?? `${seed.name} is listed in ${seed.town}, ${seed.county} County, in the Texas Defined RV parks and campgrounds directory. This seed profile supports trip discovery while park-specific operating details are being verified from the operator or managing agency.`,
    bestSeason: content?.bestSeason ?? "Varies by location and weather; verify the current operating season before travel.",
    entryNote: content?.entryNote ?? "Confirm current RV-site availability, hookup types, rig-length limits, rates, check-in rules, pet policies and reservation requirements with the park operator or managing agency before travel.",
    highlights: content?.highlights ?? [`RV camping near ${seed.town}`, `${seed.county} County`, seed.groupName],
    body: content?.body ?? [
      `Texas Defined currently tracks ${seed.name} as an RV park or campground option around ${seed.town}. The record entered the statewide directory through the ${seed.groupName} expansion and is being reconciled with park-specific official sources before the individual profile is eligible for search indexing.`,
      licensedImage?.subjectScope === "park-property"
        ? "The published photograph depicts the named public park property itself; it is not presented as a photograph of a specific numbered RV pad or loop unless the image record explicitly says campground."
        : "Before routing a motorhome, travel trailer or fifth wheel here, verify the current site type, electrical service, water and sewer availability, maximum rig length, check-in procedures, generator rules, pet rules and any seasonal operating restrictions directly with the operator or managing agency.",
      `Use this profile to connect the park to ${seed.county} County and the broader ${seed.groupName} travel map. Rates, availability, reservation policies and amenity claims can change, so Texas Defined does not infer those details from the directory name alone.`,
    ],
    officialUrl: seed.officialUrl,
    sourceCheckedAt: seed.sourceCheckedAt ?? licensedImage?.verifiedAt,
    address: seed.address,
    managingAuthority: seed.managingAuthority,
  };
}

const rvParkDestinations: Destination[] = RV_PARK_SEEDS.map(destinationFromSeed);
const rvParkBySlug = new Map(rvParkDestinations.map((item) => [item.slug, item]));

function normalizeCountySlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+county$/i, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function loadRvParkDestinationsServer(): Destination[] {
  return rvParkDestinations;
}

export function getRvParkDestinationServer(slug: string): Destination | undefined {
  return rvParkBySlug.get(slug);
}

export function loadRvParksForCountyServer(countySlug: string): Destination[] {
  const normalized = normalizeCountySlug(countySlug);
  return rvParkDestinations
    .filter((item) => Boolean(item.county) && normalizeCountySlug(item.county!) === normalized)
    .sort((a, b) => a.nearestTown.localeCompare(b.nearestTown) || a.name.localeCompare(b.name));
}

export function buildRvParkSearchDocumentsServer(): SearchDocument[] {
  const collection: SearchDocument = {
    id: "collection:rv-parks",
    brandId: "texasdefined",
    kind: "collection",
    title: "Texas RV Parks & Campgrounds",
    summary: "Browse 250 Texas RV parks, campgrounds and public RV camping areas by region, town and county.",
    keywords: ["Texas RV parks", "Texas campgrounds", "RV camping Texas", "RV parks by county", "RV parks by region"],
    href: "/explore/rv-parks",
  };
  return [
    collection,
    ...RV_PARK_SEEDS.map((seed): SearchDocument => ({
      id: `rv-park:${seed.slug}`,
      brandId: "texasdefined",
      kind: "guide",
      title: seed.name,
      summary: CONTENT_OVERRIDES[seed.slug]?.summary ?? `RV park or campground directory profile near ${seed.town}, ${seed.county} County.`,
      keywords: [seed.name, seed.town, `${seed.county} County`, seed.groupName, "RV park", "campground", "Texas RV camping"],
      href: `/destination/${seed.slug}`,
    })),
  ];
}
