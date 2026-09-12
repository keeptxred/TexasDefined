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
export const RV_PARK_CURATED_PUBLIC_WAVE3_COUNT = 9;

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
  "balmorhea-state-park-rv-area": {
    officialUrl: "https://tpwd.texas.gov/state-parks/balmorhea",
    sourceCheckedAt: "2026-09-07",
    address: "9207 TX-17, Toyahvale, TX 79786",
    managingAuthority: "Texas Parks and Wildlife Department",
    coordinates: { lat: 30.945036, lng: -103.786663 },
  },
  "davis-mountains-state-park-rv-loop": {
    officialUrl: "https://tpwd.texas.gov/state-parks/davis-mountains",
    sourceCheckedAt: "2026-09-07",
    address: "TX-118 N., Park Rd. 3, Fort Davis, TX 79734",
    managingAuthority: "Texas Parks and Wildlife Department",
    coordinates: { lat: 30.599103, lng: -103.92945 },
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
    sourceCheckedAt: "2026-09-12",
    address: "100 Park Road 71, Mineral Wells, TX 76067",
    managingAuthority: "Texas Parks and Wildlife Department",
    coordinates: { lat: 32.812655, lng: -98.043368 },
  },
  "eisenhower-state-park-rv-loop": {
    officialUrl: "https://tpwd.texas.gov/state-parks/eisenhower",
    sourceCheckedAt: "2026-09-12",
    address: "50 Park Road 20, Denison, TX 75020-4878",
    managingAuthority: "Texas Parks and Wildlife Department",
    coordinates: { lat: 33.810339, lng: -96.599971 },
  },
  "monahans-sandhills-state-park-rv-area": {
    officialUrl: "https://tpwd.texas.gov/state-parks/monahans-sandhills",
    sourceCheckedAt: "2026-09-12",
    address: "101 Park Road 41, Monahans, TX 79756",
    managingAuthority: "Texas Parks and Wildlife Department",
    coordinates: { lat: 31.618795, lng: -102.812112 },
  },
  "bonham-state-park-rv-loop": {
    officialUrl: "https://tpwd.texas.gov/state-parks/bonham",
    sourceCheckedAt: "2026-09-12",
    address: "1363 State Park 24, Bonham, TX 75418-9285",
    managingAuthority: "Texas Parks and Wildlife Department",
    coordinates: { lat: 33.546727, lng: -96.144758 },
  },
  "lake-whitney-state-park-rv-loop": {
    officialUrl: "https://tpwd.texas.gov/state-parks/lake-whitney",
    sourceCheckedAt: "2026-09-12",
    address: "433 FM 1244, Whitney, TX 76692",
    managingAuthority: "Texas Parks and Wildlife Department",
    coordinates: { lat: 31.931234, lng: -97.356833 },
  },
  "martin-dies-jr-state-park-rv-loop": {
    officialUrl: "https://tpwd.texas.gov/state-parks/martin-dies-jr",
    sourceCheckedAt: "2026-09-12",
    address: "634 Park Road 48 South, Jasper, TX 75951",
    managingAuthority: "Texas Parks and Wildlife Department",
    coordinates: { lat: 30.846627, lng: -94.165869 },
  },
  "lake-livingston-state-park-rv-loops": {
    officialUrl: "https://tpwd.texas.gov/state-parks/lake-livingston",
    sourceCheckedAt: "2026-09-12",
    address: "300 Park Road 65, Livingston, TX 77351",
    managingAuthority: "Texas Parks and Wildlife Department",
    coordinates: { lat: 30.656897, lng: -95.001093 },
  },
  "lake-arrowhead-state-park-rv-loop": {
    officialUrl: "https://tpwd.texas.gov/state-parks/lake-arrowhead",
    sourceCheckedAt: "2026-09-12",
    address: "229 Park Road 63, Wichita Falls, TX 76310",
    managingAuthority: "Texas Parks and Wildlife Department",
    coordinates: { lat: 33.758578, lng: -98.395201 },
  },
  "lake-tawakoni-state-park-rv-area": {
    officialUrl: "https://tpwd.texas.gov/state-parks/lake-tawakoni",
    sourceCheckedAt: "2026-09-12",
    address: "10822 FM 2475, Wills Point, TX 75169",
    managingAuthority: "Texas Parks and Wildlife Department",
    coordinates: { lat: 32.841871, lng: -95.993667 },
  },
  "caddo-lake-state-park-rv-area": {
    officialUrl: "https://tpwd.texas.gov/state-parks/caddo-lake",
    sourceCheckedAt: "2026-09-05",
    address: "245 Park Road 2, Karnack, TX 75661",
    managingAuthority: "Texas Parks and Wildlife Department",
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
  "tyler-state-park-rv-loop": {
    summary: "Tyler State Park RV Loop gives Pineywoods travelers full-hookup and electric campsite options around a 64-acre spring-fed lake, with boating, fishing, swimming and more than 13 miles of park trails.",
    bestSeason: "TPWD lists March through Thanksgiving as the busy season and says the park often reaches capacity. Reserve camping and entry ahead of time, especially for weekends and holiday periods.",
    entryNote: "Enter at 789 Park Road 16 north of Tyler. TPWD lists 18 Lakeview and 39 Big Pine full-hookup sites plus 12 Cedar Point electric sites; confirm the exact reserved loop, utility package and current alerts before towing in.",
    highlights: ["57 full-hookup campsites across Lakeview and Big Pine", "64-acre spring-fed lake for fishing, swimming and boating", "More than 13 miles of Pineywoods trails"],
    body: [
      "Tyler State Park is an unusually flexible state-park RV base because TPWD currently lists two full-hookup camping areas. Lakeview has 18 sites with water, sewer and 30/50-amp electricity, while the RV-only Big Pine area has 39 full-hookup sites with the same core utility types. Cedar Point adds 12 water-and-electric sites with 30/50-amp service. Individual reservation records should still control site fit, restrictions and current availability.",
      "The campground surrounds a 64-acre spring-fed lake in the East Texas Pineywoods. TPWD lists boating, fishing and swimming along with more than 13 miles of hiking and mountain-biking trails. The historic Whispering Pines Nature Trail dates to Civilian Conservation Corps development, giving campers an easy way to combine lake time with the park's forest and built history.",
      "Tyler State Park is at 789 Park Road 16, north of Tyler and Interstate 20. TPWD identifies March through Thanksgiving as the busy season and recommends advance reservations because the park can reach capacity. RV travelers should confirm the exact loop, current electrical needs, jack-pad requirements where applicable, vehicle limits and active park alerts before departure.",
    ],
  },
  "huntsville-state-park-rv-loop": {
    summary: "Huntsville State Park RV Loop combines 23 full-hookup and 77 electric campsites with 210-acre Lake Raven, 21 miles of Pineywoods trails and a convenient I-45 location north of Houston.",
    bestSeason: "TPWD lists mid-February through Thanksgiving as the busy season and warns that the park often reaches capacity. Reserve camping and entry before travel and check current lake and park alerts.",
    entryNote: "Enter at 565 Park Road 40 W southwest of Huntsville. Full-hookup Raven Hill sites are designed for RVs and offer 20/30/50-amp service; verify the specific site's drive length and vehicle limit before arrival.",
    highlights: ["23 full-hookup RV sites plus 77 electric campsites", "210-acre Lake Raven for fishing, swimming and paddling", "21 miles of Pineywoods trails"],
    body: [
      "Huntsville State Park has substantial developed RV capacity within the East Texas Pineywoods. TPWD lists 23 full-hookup sites in Raven Hill with water, sewer and 20/30/50-amp electricity; the mostly paved area is designed for motorhomes and other recreational vehicles. Another 77 sites in Coloneh and Prairie Branch provide water and 20/30/50-amp electricity. Drive and vehicle lengths vary, so the exact reservation record matters for larger rigs.",
      "Lake Raven anchors the park experience. TPWD describes the 210-acre lake as a place to fish, swim and paddle, with a boat ramp, fishing piers and kayak rentals. Away from the water, 21 miles of trails cross pine and hardwood habitat, including the Chinquapin Trail around the lake and shorter routes near wetlands, bird habitat and Civilian Conservation Corps features.",
      "The park is six miles southwest of Huntsville off Interstate 45, making it practical for both Houston-area weekends and longer East Texas trips. TPWD says the park often reaches capacity and lists mid-February through Thanksgiving as the busy season. Reserve ahead, confirm the specific site's length and utility needs, and review current alerts plus alligator and water-safety guidance before arrival.",
    ],
  },
  "balmorhea-state-park-rv-area": {
    summary: "Balmorhea State Park RV Area pairs electric RV camping in Toyahvale with San Solomon Springs and the park's large spring-fed swimming pool, a distinctive West Texas stop between I-10 and the Davis Mountains.",
    bestSeason: "TPWD lists Memorial Day through Labor Day and holidays as the busy season and says the park frequently reaches capacity. The spring-fed pool operates year-round except for scheduled maintenance, so reserve before a long drive.",
    entryNote: "Enter at 9207 TX-17 in Toyahvale. TPWD lists 15 pull-through electric sites with 20/30/50-amp service and additional back-in electric sites; overnight check-in is 2 p.m. and early entry is not allowed.",
    highlights: ["15 pull-through sites with 20/30/50-amp service", "San Solomon Springs spring-fed swimming pool", "West Texas base near the Davis Mountains"],
    body: [
      "Balmorhea State Park gives RV travelers a developed West Texas campsite beside one of the state's most unusual water attractions. TPWD lists 15 pull-through electric campsites with water and 20/30/50-amp service. The park also has back-in electric sites, though several in that category are tent-only and the RV-capable back-ins do not support 50-amp conversion. Travelers should reserve the correct site type rather than treating every numbered campsite as equivalent.",
      "San Solomon Springs feeds the park's 1.3-acre swimming pool, where TPWD says water remains about 72 to 76 degrees year-round. The pool is open through the year aside from scheduled annual cleaning and can reach capacity during busy periods. The spring system also supports restored desert wetlands, birding and wildlife habitat, giving an overnight stay more context than a simple swim stop.",
      "The park is at 9207 TX-17 in Toyahvale, four miles southwest of Balmorhea. TPWD does not allow early overnight entry before the reservation's 2 p.m. check-in time and strongly recommends reservations, particularly from Memorial Day through Labor Day and on holidays. Verify pool notices, campsite electrical needs, current alerts and arrival timing before crossing long West Texas distances.",
    ],
  },
  "davis-mountains-state-park-rv-loop": {
    summary: "Davis Mountains State Park RV Loop provides full-hookup and electric camping at roughly 5,000 to 6,000 feet in West Texas, with mountain trails, scenic drives, stargazing and historic CCC features near Fort Davis.",
    bestSeason: "TPWD lists March through Labor Day as the busy season. Mountain nights can be cool even after hot days, while winter can bring freezing temperatures or snow; reserve ahead and check current weather and park alerts.",
    entryNote: "Use the park entrance on TX-118 N. at Park Road 3 near Fort Davis. TPWD lists 26 full-hookup sites with 30/50-amp service and 34 water-and-electric sites with 20/30-amp service; confirm the exact reservation before towing in.",
    highlights: ["26 full-hookup campsites with 30/50-amp service", "High-desert mountain hiking and biking", "Night skies, CCC history and scenic Skyline Drive"],
    body: [
      "Davis Mountains State Park is a high-elevation RV base in a part of Texas where distances between services and attractions matter. TPWD currently lists 26 full-hookup campsites with water, sewer and 30/50-amp electricity, plus 34 campsites with water and 20/30-amp electricity. Those developed sites let travelers stay inside the mountain landscape while using the exact reservation record to confirm current site dimensions and utility needs.",
      "The park's appeal extends well beyond the campground. Visitors can hike, mountain bike, ride horses, take a scenic drive, watch wildlife and stay out for the night sky. Trails climb through high-desert grasslands and oak-juniper habitat, while Skyline Drive and Civilian Conservation Corps structures provide accessible viewpoints and historic context. TPWD notes that cell service is limited in the park and mountains.",
      "Davis Mountains State Park sits on TX-118 north of Fort Davis at elevations TPWD lists between about 5,000 and 6,000 feet. March through Labor Day is the identified busy season, but temperatures can shift sharply after sunset and winter conditions can include freezing weather or snow. Reserve ahead, check weather and active alerts, and confirm the assigned campsite before towing into the mountains.",
    ],
  },
  "copper-breaks-state-park-rv-area": {
    summary: "Copper Breaks State Park RV Area offers 24 water-and-electric campsites in the Comanche Camping Area, backed by Rolling Plains trails, Lake Copper Breaks and one of Texas's designated dark-sky state parks.",
    bestSeason: "TPWD lists spring and summer as the busy season. Hot summer days and exposed Rolling Plains terrain make weather, water and heat planning important; reserve ahead because the park can reach capacity.",
    entryNote: "Enter at 777 Park Road 62 between Quanah and Crowell. The 24 Comanche electric campsites have water and 30/50-amp service; TPWD's water-only Kiowa sites are tent-only, so reserve the correct RV-capable area.",
    highlights: ["24 Comanche sites with water and 30/50-amp electricity", "International Dark Sky Park stargazing", "Lake Copper Breaks and 10 miles of trails"],
    body: [
      "Copper Breaks State Park has a clearly defined RV-capable campground rather than uniform vehicle access across every overnight area. TPWD lists 24 sites with water and 30/50-amp electricity in the Comanche Camping Area. The park's water-only Kiowa campsites are tent-only, so RV travelers should select the Comanche inventory or another specifically compatible reservation instead of inferring access from the broader campground list.",
      "The surrounding Rolling Plains landscape supports a varied stay. TPWD lists about 10 miles of trails for hiking and biking, fishing and swimming at park waters, and paddling or small-boat use on 60-acre Lake Copper Breaks, which is a no-wake lake. The park is also designated an International Dark Sky Park and hosts seasonal star parties, making clear-night conditions a meaningful part of trip planning.",
      "Copper Breaks is at 777 Park Road 62 between Quanah and Crowell. TPWD lists spring and summer as the busy season and says the park often reaches capacity. Before towing in, reserve the exact RV-capable campsite, confirm current alerts and fire or weather conditions, and plan for heat and limited shade on exposed trails during warmer periods.",
    ],
  },
  "lake-mineral-wells-state-park-rv-loop": {
    summary: "Lake Mineral Wells State Park RV Loop gives North Texas travelers 77 developed electric campsites beside a 640-acre lake, with hiking, biking, equestrian access and the Penitentiary Hollow climbing area west of Fort Worth.",
    bestSeason: "TPWD lists mid-March through mid-November as the busy season. Summer heat can be intense, and climbing or trail areas can close temporarily, so check current alerts before travel.",
    entryNote: "Enter at 100 Park Road 71 in Mineral Wells. TPWD lists 47 50-amp sites in Live Oak and 30 30-amp sites in Plateau; reserve the exact site and review current fire, trail and climbing alerts before arrival.",
    highlights: ["77 water-and-electric campsites", "640-acre Lake Mineral Wells", "Hiking, biking, equestrian trails and Penitentiary Hollow climbing"],
    body: [
      "Lake Mineral Wells State Park & Trailway is a developed RV base about 45 minutes west of Fort Worth. TPWD currently lists 47 campsites with water and 50-amp electricity in the Live Oak Camping Area plus 30 campsites with water and 30-amp electricity in the Plateau Camping Area. That gives RV travelers two clearly documented electrical service levels without assuming that every overnight site is configured the same way.",
      "The park combines a 640-acre lake with hiking, biking, horseback riding, fishing, boating and swimming. Penitentiary Hollow is one of the relatively uncommon natural rock-climbing areas in North Texas, but climbing and individual trail areas can close because of weather, fire conditions or maintenance. Current park alerts should therefore be part of trip planning rather than treated as static background information.",
      "TPWD lists mid-March through mid-November as the busy season and says the park can reach capacity. Before towing in, reserve the specific campsite, verify the required electrical connection and current vehicle limits, and check active burn bans, trail status and climbing access. The exact-location image on this Texas Defined profile shows Lake Mineral Wells State Park property and carries reusable-license attribution.",
    ],
  },
  "eisenhower-state-park-rv-loop": {
    summary: "Eisenhower State Park RV Loop offers 50 full-hookup and 45 electric campsites on Lake Texoma near Denison, pairing large-RV camping with swimming, fishing, bluff trails and a dedicated OHV trail system.",
    bestSeason: "TPWD lists spring, summer and fall as the busy seasons. Reserve ahead during warm-weather weekends and check current lake, trail and OHV alerts before arrival.",
    entryNote: "Enter at 50 Park Road 20 in Denison. TPWD lists 50 full-hookup campsites plus 45 water-and-electric campsites; confirm the exact reserved pad, utility configuration and any OHV permit requirements before travel.",
    highlights: ["50 full-hookup campsites", "Lake Texoma swimming, boating and fishing", "Hiking, biking and a permit-required OHV trail"],
    body: [
      "Eisenhower State Park is one of the stronger developed state-park RV options on the Texas side of Lake Texoma. TPWD currently lists 50 full-hookup campsites with water, sewer and electricity plus 45 additional campsites with water and electricity. The park also describes camping choices that include pull-through sites for large RVs, but the individual reservation record should control fit and utility assumptions for a specific rig.",
      "Lake Texoma is central to the stay. Visitors can swim at the park's sandy cove, fish from shore or piers, use the boat ramp, and explore more than four miles of hiking and biking trails along wooded bluffs and shoreline. Eisenhower also maintains an OHV trail, which has separate safety rules and permit requirements, so off-highway riding should be planned through the current TPWD guidance rather than inferred from general park access.",
      "The park is reached from Park Road 20 in Denison and TPWD says it often reaches capacity, especially across its spring, summer and fall busy seasons. Reserve camping and entry ahead of time, check current trail and lake conditions, and confirm the assigned site's dimensions and service before towing in. The Texas Defined hero is an exact-location, rights-cleared Lake Texoma view from Eisenhower State Park.",
    ],
  },
  "monahans-sandhills-state-park-rv-area": {
    summary: "Monahans Sandhills State Park RV Area provides 25 water-and-electric campsites beside a shifting West Texas dune field, with sand-disk sledding, open dune exploration and an 800-acre equestrian area near Interstate 20.",
    bestSeason: "TPWD lists September through March as the busy season. Summer dune surfaces heat quickly, so cooler-season camping is especially practical; check current weather and park alerts before crossing West Texas.",
    entryNote: "Enter from Interstate 20 at Park Road 41 near Monahans. TPWD lists 25 campsites with water and electricity; reserve ahead and confirm the assigned site's electrical service and current heat or wind conditions.",
    highlights: ["25 water-and-electric campsites", "Open exploration of wind-shaped sand dunes", "Sand-disk rentals and an 800-acre equestrian area"],
    body: [
      "Monahans Sandhills State Park offers a very different RV stop from Texas's lake and forest campgrounds. TPWD currently lists 25 developed campsites with water and electricity, with restrooms and showers nearby. The park sits just off Interstate 20, making it a practical overnight base for West Texas travel while still providing a destination experience rather than only a roadside place to park.",
      "The dunes are the attraction. TPWD allows visitors to explore the sand without marked hiking trails and rents sand disks for sliding the slopes. The agency warns that dune surfaces heat quickly in summer and that visitors need to keep track of their route because the wind-shaped landscape lacks conventional trail markers. An 800-acre equestrian area adds another use, with separate horse-entry requirements that should be checked before arrival.",
      "TPWD identifies September through March as the busy season and recommends reservations because the park can reach capacity. Before towing in, verify the assigned campsite, current electrical details, weather and wind, and any active park alerts. The profile image depicts Monahans Sandhills State Park itself and is retained with its open-license source and creator attribution.",
    ],
  },
  "bonham-state-park-rv-loop": {
    summary: "Bonham State Park RV Loop is a small Northeast Texas campground with two full-hookup RV sites and 12 additional electric sites beside a 65-acre lake, CCC history and nearly nine miles of hike-and-bike trails.",
    bestSeason: "The park is open daily and TPWD says it often reaches capacity. Because the RV inventory is small, reserve ahead in any season and check current lake, weather and park alerts before travel.",
    entryNote: "Enter at 1363 State Park 24 southeast of Bonham. TPWD lists two full-hookup RV sites and 12 additional RV-capable electric sites; reserve the exact campsite before towing in.",
    highlights: ["Two full-hookup RV sites plus 12 electric RV-capable sites", "65-acre Bonham State Park Lake", "CCC-built features and 8.75 miles of trails"],
    body: [
      "Bonham State Park is a deliberately small campground, which makes exact campsite selection more important than at larger state parks. TPWD currently lists two full-hookup campsites with water, sewer and 30/50-amp electricity, plus 12 additional campsites where RVs are allowed with water and 20/30/50-amp electrical hookups. The limited inventory means advance reservations are especially important for RV travelers.",
      "The park centers on a 65-acre lake used for fishing, paddling and swimming. TPWD also lists 8.75 miles of hiking and biking trails through woods and prairie, with Civilian Conservation Corps features woven into the landscape. That combination makes Bonham more than an overnight utility stop even though its RV campground is comparatively compact.",
      "The entrance is on State Park 24 southeast of Bonham, and TPWD says the park often reaches capacity. Confirm the exact reservation, site fit, electrical needs and current water or weather conditions before arrival. Texas Defined uses a rights-cleared image of Bonham State Park property rather than a generic RV-resort photograph.",
    ],
  },
  "lake-whitney-state-park-rv-loop": {
    summary: "Lake Whitney State Park RV Loop offers 43 full-hookup and 31 electric campsites on a 23,500-acre reservoir between DFW and Waco, with swimming, boating, fishing and short prairie-and-woodland trails.",
    bestSeason: "TPWD lists March through October as the busy season. Reserve ahead for warm-weather weekends and check lake, storm and park conditions before towing to the shoreline campground.",
    entryNote: "Enter at 433 FM 1244 west of Whitney. TPWD lists 43 full-hookup 50-amp sites and 31 water-and-electric 50-amp sites; confirm the exact loop and site dimensions before arrival.",
    highlights: ["43 full-hookup 50-amp campsites", "31 additional water-and-electric 50-amp campsites", "Lake Whitney fishing, swimming, boating and shoreline trails"],
    body: [
      "Lake Whitney State Park has a substantial developed RV campground on the shore of the 23,500-acre Lake Whitney. TPWD currently lists 43 full-hookup campsites in the Horseshoe Camping Loop with water, sewer and 50-amp electricity, plus 31 campsites with water and 50-amp electricity across the Blue Bird, Road Runner and Sunset Ridge loops. The exact reservation should still control site fit and current restrictions.",
      "The lake supports fishing, swimming, boating and water skiing, while the land side of the park adds hiking, stargazing and wildlife watching. The Two Bridges and Towash Forest trails provide approachable hiking and biking through post oak woodland, prairie remnants and shoreline habitat. Those activities give an RV stay value beyond simply using the campground as a base between Dallas-Fort Worth and Waco.",
      "TPWD lists March through October as the busy season and recommends reservations because the park can reach capacity. Before towing in, confirm the assigned loop, electrical needs and campsite dimensions, then review current lake conditions, storms, fire restrictions and active park alerts. The profile's Lake Whitney State Park image is exact-location media with reusable-license attribution.",
    ],
  },
  "martin-dies-jr-state-park-rv-loop": {
    summary: "Martin Dies Jr. State Park RV Loop gives East Texas campers 118 electric sites beside the B.A. Steinhagen Reservoir, with paddling routes, fishing, swimming and forest trails near the edge of the Big Thicket.",
    bestSeason: "TPWD lists March through Independence Day and September through Thanksgiving as busy periods. Check heat, water, weather and wildlife alerts before planning paddling or campsite time.",
    entryNote: "Enter at 634 Park Road 48 South near Jasper. TPWD lists 85 water-and-50-amp sites plus 33 water-and-30-amp sites; reserve the exact unit and confirm current access before arrival.",
    highlights: ["118 water-and-electric campsites", "B.A. Steinhagen Reservoir paddling and fishing", "Seven miles of hiking and biking plus extensive paddling trails"],
    body: [
      "Martin Dies, Jr. State Park is a large East Texas camping base on the B.A. Steinhagen Reservoir. TPWD currently lists 85 campsites with water and 50-amp electricity plus 33 campsites with water and 30-amp electricity, spread primarily across the Hen House and Walnut Ridge areas. With more than 100 developed electric sites, it offers considerably more RV capacity than many smaller state parks.",
      "Water and forest define the experience. TPWD lists fishing, swimming, canoeing and kayaking, with nearly 14 miles of marked paddling routes through the lake, sloughs and river connections. On land, visitors can hike and bike through mixed pine and hardwood habitat. Alligators live in the park, so current wildlife and water-safety guidance is part of responsible trip planning.",
      "The park is reached from Park Road 48 off U.S. 190 between Woodville and Jasper. TPWD says it often reaches capacity and identifies spring through early July and early fall through Thanksgiving as busy periods. Reserve the exact campground area, confirm electrical needs and current access, and review alerts before towing in. Texas Defined retains an open-license image of Martin Dies, Jr. State Park property with full attribution.",
    ],
  },
  "lake-livingston-state-park-rv-loops": {
    summary: "Lake Livingston State Park RV Loops provide more than 70 full-hookup campsites plus electric-only loops on one of Texas's largest lakes, with boating, fishing, swimming and Pineywoods trails north of Houston.",
    bestSeason: "TPWD lists spring, summer and fall as the busy seasons. Reserve ahead for weekends and check lake, storm, heat and alligator-safety information before arrival.",
    entryNote: "Enter at 300 Park Road 65 near Livingston. TPWD lists multiple full-hookup loops, including Piney Shores, Red Oak, Yaupon and Pin Oak, plus electric loops; reserve the exact site and verify its utility package.",
    highlights: ["Multiple full-hookup RV loops", "Lake Livingston boating, fishing and swimming", "Pineywoods hiking, biking and wildlife watching"],
    body: [
      "Lake Livingston State Park has one of the more extensive developed state-park RV inventories in East Texas. TPWD currently lists full-hookup camping in several loops, including 22 sites at Piney Shores, 12 at Red Oak, 37 at Yaupon and four at Pin Oak, with water, sewer and electric service documented by loop. Additional Hercules and Pin Oak campsites provide electricity without being presented as equivalent to the full-hookup inventory.",
      "The campground sits on one of the state's largest lakes, where TPWD highlights fishing, boating and swimming along with hiking, mountain biking, birding and geocaching. The park provides boat ramps, fishing access and wooded Pineywoods surroundings. Alligators occur in the area, so visitors should review current wildlife and water-safety guidance rather than treating the shoreline like a conventional swimming resort.",
      "Lake Livingston State Park is about an hour north of Houston and TPWD lists spring, summer and fall as busy seasons. Some weekend reservations in full-hookup loops have minimum-stay rules, so the current reservation record should control timing and site details. Confirm the assigned loop, electrical service, rig fit and active alerts before towing in; the profile image is rights-cleared media from the named park property.",
    ],
  },
  "lake-arrowhead-state-park-rv-loop": {
    summary: "Lake Arrowhead State Park RV Loop offers 48 water-and-50-amp campsites south of Wichita Falls, with fishing, swimming, paddling, boating, disc golf and more than five miles of multiuse prairie trails.",
    bestSeason: "TPWD lists spring and summer as the busy seasons. North Texas heat can be severe in summer, so reserve ahead and check current lake, weather and park alerts before travel.",
    entryNote: "Enter at 229 Park Road 63 south of Wichita Falls. TPWD lists 48 campsites with water and 50-amp electricity; reserve the exact site and verify current lake and campground conditions before arrival.",
    highlights: ["48 water-and-50-amp campsites", "16,200-acre Lake Arrowhead", "Fishing, paddling, disc golf and five-plus miles of multiuse trails"],
    body: [
      "Lake Arrowhead State Park provides a straightforward developed RV campground in the Rolling Plains south of Wichita Falls. TPWD currently lists 48 campsites with water and 50-amp electrical hookups, with restrooms and showers nearby. The park also has lower-service camping, so RV travelers should reserve the documented electric category rather than assuming every overnight site supports a recreational vehicle.",
      "The 16,200-acre lake is the main draw, supporting fishing, swimming, paddling, boating and water skiing. On land, TPWD lists more than five miles of multiuse trails for hiking, biking and horseback riding, along with disc golf and nature watching. Nine boat ramps, a lighted fishing pier and a fish-cleaning station make the park particularly useful for travelers towing both an RV and watercraft.",
      "TPWD lists spring and summer as the busy seasons and says the park can reach capacity. Before arrival, reserve the exact campsite, verify utility needs and rig fit, and review current heat, storm and lake conditions. The Texas Defined image comes from Lake Arrowhead State Park itself and retains its open-license creator and source metadata.",
    ],
  },
  "lake-tawakoni-state-park-rv-area": {
    summary: "Lake Tawakoni State Park RV Area combines 16 full-hookup sites with more than 60 additional electric campsites on a nearly 38,000-acre reservoir east of Dallas, backed by swimming, paddling and trails.",
    bestSeason: "TPWD lists spring and summer as the busy seasons. Reserve ahead during warm-weather weekends and review current lake, heat, storm and park alerts before travel.",
    entryNote: "Enter at 10822 FM 2475 near Wills Point. TPWD lists 16 full-hookup 30/50-amp sites, 16 additional 30/50-amp electric sites and 44 30-amp electric sites; reserve the exact loop for the needed service.",
    highlights: ["16 full-hookup campsites", "More than 60 additional electric campsites", "Lake Tawakoni fishing, swimming, paddling and nearly five miles of trails"],
    body: [
      "Lake Tawakoni State Park gives RV travelers a range of developed campsite service levels on a reservoir east of Dallas. TPWD currently lists 16 full-hookup sites in the Spring Point Camping Loop with 30/50-amp electricity, plus 16 additional Spring Point sites with water and 30/50-amp electricity and 44 electric sites in White Deer Reach. That mix makes it important to reserve the exact category rather than infer hookups from the park name.",
      "Lake Tawakoni covers 37,879 acres, and TPWD highlights boating, fishing, swimming and paddling from the park. On land, nearly five miles of trails support hiking and mountain biking through oak forest and lakeshore habitat. The combination works well for travelers who want a water-focused campground within roughly 50 miles of Dallas without giving up a state-park setting.",
      "TPWD identifies spring and summer as busy seasons and recommends reservations because the park can reach capacity. Before towing in, confirm the exact loop, electrical service, sewer availability where needed, vehicle limits and current lake or weather alerts. Texas Defined uses an exact-location Lake Tawakoni State Park image with reusable-license attribution rather than generic campground photography.",
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