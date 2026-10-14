import type { ShowcaseLakePrototype } from "./showcase-lakes-prototype";
import type { StatewideNetworkLakeSlug } from "./showcase-lake-routing";
import type { TexasRegion } from "@/data/types";
import type { FishingLake, FishingQuality, FishingSource, LakeSpeciesProfile, LakeTechniqueProfile } from "./types";

const VERIFIED_AT = "2026-09-29";
const BRAND = "texasdefined" as const;
const TPWD_REGULATIONS = "https://tpwd.texas.gov/regulations/outdoor-annual/fishing/freshwater-fishing/bag-length-limits";
const WATER_DATA_FOR_TEXAS_RESERVOIR_BASE = "https://waterdatafortexas.org/reservoirs/individual";
const LCRA_HYDROMET_CHART_BASE = "https://hydromet.lcra.org/Charts/";

type TechniqueId =
  | "soft-plastics"
  | "crankbaits"
  | "spinnerbaits"
  | "topwater"
  | "trolling"
  | "vertical-jigging"
  | "jigs-and-minnows"
  | "live-bait"
  | "cut-bait";

type FishId =
  | "largemouth-bass"
  | "smallmouth-bass"
  | "spotted-bass"
  | "guadalupe-bass"
  | "crappie"
  | "catfish"
  | "blue-catfish"
  | "channel-catfish"
  | "flathead-catfish"
  | "white-bass"
  | "striped-bass"
  | "hybrid-striped-bass"
  | "alligator-gar"
  | "sunfish"
  | "walleye"
  | "red-drum";

interface FishDefinition {
  id: FishId;
  name: string;
  quality: FishingQuality;
  prominence?: "primary" | "secondary";
  season: "spring" | "summer" | "fall" | "winter" | "year-round";
  summary: string;
  techniques: TechniqueId[];
}

interface StatewideLakeDefinition {
  slug: StatewideNetworkLakeSlug;
  name: string;
  verifiedAt?: string;
  accessReviewedAt?: string;
  tpwdSlug: string;
  waterDataSlug?: string;
  lcraHydrometSiteNumber?: string;
  region: TexasRegion;
  summary: string;
  surfaceAcres: number;
  maxDepthFeet: number;
  impoundedYear: number;
  counties: string[];
  nearestCities: string[];
  waterway: string;
  riverBasin: string;
  authority: string;
  conservationPool: string;
  fluctuation: string;
  clarity: string;
  identity: string;
  habitat: string[];
  fish: FishDefinition[];
  access: string;
  accessPage?: string;
  specialRules?: boolean;
  liveDataNote?: string;
  nearbyLakes: { slug: string; name: string }[];
  nearbyDestinations?: { slug: string; name: string; reason: string }[];
  camping?: { name: string; summary: string };
  campingUrl?: string;
  campingProhibited?: boolean;
  accessPoints?: ShowcaseLakePrototype["access"];
  travelAlerts?: string[];
  consumptionSourceUrl?: string;
  historySourceUrl?: string;
  historyNotes?: string[];
  visitorFAQs?: { question: string; answer: string }[];
  visitorSourceUrl?: string;
  localRegulationsSourceUrl?: string;
}

const fish = (
  id: FishId,
  name: string,
  quality: FishingQuality,
  season: FishDefinition["season"],
  summary: string,
  techniques: TechniqueId[],
  prominence: FishDefinition["prominence"] = "primary",
): FishDefinition => ({ id, name, quality, season, summary, techniques, prominence });

export const statewideNetworkLakeDefinitions: StatewideLakeDefinition[] = [
  {
    slug: "lake-buchanan", name: "Lake Buchanan", accessReviewedAt: "2026-10-12", tpwdSlug: "buchanan", waterDataSlug: "buchanan", region: "hill-country",
    summary: "A large Highland Lakes reservoir on the Colorado River with nationally useful striped- and white-bass patterns plus largemouth bass and catfish.",
    surfaceAcres: 22211, maxDepthFeet: 132, impoundedYear: 1937, counties: ["Burnet", "Llano"], nearestCities: ["Burnet", "Kingsland", "Buchanan Dam"],
    waterway: "Colorado River", riverBasin: "Colorado River Basin", authority: "Lower Colorado River Authority", conservationPool: "Verify current LCRA operating level", fluctuation: "Considerable", clarity: "Clear near the dam; increasingly turbid upstream",
    identity: "Lake Buchanan stands out in the Highland Lakes chain for excellent striped and white bass fishing, spring river runs, deep lower-lake structure and a broad catfish fishery.",
    habitat: ["Rock piles, ledges and chunk-rock banks dominate the lower and eastern reservoir.", "Flatter upper-lake coves can hold flooded brush when water levels are higher.", "TPWD and partners have installed fish-habitat structures that can be located with the state's habitat viewer."],
    fish: [
      fish("striped-bass", "Striped bass", "excellent", "spring", "A signature open-water fishery with strong spring river movement and main-lake structure patterns.", ["live-bait","trolling","topwater","vertical-jigging"]),
      fish("white-bass", "White bass", "excellent", "spring", "Spring spawning runs concentrate fish from Beaver Creek into the Colorado River.", ["jigs-and-minnows","topwater","live-bait"]),
      fish("largemouth-bass", "Largemouth bass", "good", "spring", "Rocky lower-lake banks and flooded shoreline cover support a useful bass fishery.", ["topwater","spinnerbaits","crankbaits","soft-plastics"]),
      fish("catfish", "Catfish", "excellent", "year-round", "Blue, channel and flathead catfish occur throughout the reservoir.", ["cut-bait","live-bait"]),
    ],
    access: "TPWD lists multiple public and private boat ramps around the lake; low-water conditions can change ramp usability.",     historySourceUrl: "https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/buchanan/",
    historyNotes: [
      "An 1850s proposal anticipated a dam near today's Buchanan site, but actual construction began in April 1931 under the private name Hamilton Dam. Financial collapse left the project unfinished, illustrating how fragile early Colorado River power plans were.",
      "State-backed funding led to creation of the Lower Colorado River Authority in 1934. LCRA restarted construction in February 1935, began deliberate storage on May 20, 1937 and completed the dam in 1938; it was named for U.S. Representative J. P. Buchanan, who helped secure funding.",
      "Buchanan became the upper storage cornerstone of the Highland Lakes system, supporting public water supply, flood management, hydroelectric production and recreation. Its role is different from Lake LBJ's more stable lower-chain operating level.",
    ],
    accessPoints: [
      { name: "Burnet County Park", operator: "Burnet County", kind: "park", launch: "Off FM 2341 on the east shore at mid-lake. Two-lane concrete ramp; TPWD notes it is often usable during low water but vulnerable to northwest winds.", fee: "TPWD lists no launch fee", availability: "Listed year-round; check Burnet County and lake elevation before towing." },
      { name: "Buchanan Dam Ramp", operator: "Private operator noted by TPWD", kind: "public-ramp", launch: "East side of Buchanan Dam, accessed via SH 29 and FM 690 from Burnet. Two-lane concrete ramp.", fee: "TPWD lists a fee; check current charge", availability: "TPWD does not confirm same-day usability; confirm directly before travel." },
      { name: "Colorado Bend State Park", operator: "Texas Parks & Wildlife Department", kind: "park", launch: "Upper Colorado River above Buchanan; primitive launch/wade-fishing corridor, NOT a standard improved large-boat ramp.", fee: "State park entrance fee; verify separately", availability: "Check TPWD park alerts, river flow and seasonal river-run conditions before traveling." },
    ],
    nearbyLakes: [{slug:"lake-lbj",name:"Lake LBJ"},{slug:"lake-travis",name:"Lake Travis"}],
    camping: { name: "Lake Buchanan and Colorado Bend corridor", summary: "TPWD points anglers to multiple camping options around the lake and upper Colorado River, including nearby public recreation areas." },
    travelAlerts: ["TPWD reports zebra mussels in Lake Buchanan. Clean, drain and dry boats, trailers, livewells, bait buckets and gear before visiting another water body; draining water is required by Texas law."],
  },
  {
    slug: "lake-lbj", name: "Lake LBJ", accessReviewedAt: "2026-10-12", tpwdSlug: "lbj", waterDataSlug: "lyndon-b-johnson", region: "hill-country",
    summary: "A constant-level Highland Lakes reservoir known for docks, shoreline development, white crappie, white bass and year-round black-bass cover.",
    surfaceAcres: 6449, maxDepthFeet: 90, impoundedYear: 1951, counties: ["Burnet", "Llano"], nearestCities: ["Kingsland", "Granite Shoals", "Marble Falls"],
    waterway: "Colorado River", riverBasin: "Colorado River Basin", authority: "Lower Colorado River Authority", conservationPool: "825 ft msl", fluctuation: "Constant level", clarity: "Clear to slightly stained",
    identity: "Lake LBJ combines a relatively stable water level with thousands of docks, canals, brush piles and shoreline cover. TPWD describes its white crappie population as the strongest in the Highland Lakes chain.",
    habitat: ["Boat houses, bulkheads and docks create extensive man-made cover.", "Water willow, bulrush and spatterdock add shallow vegetation in creeks and canals.", "Rocky lower-lake banks contrast with sandier, more stained upper-lake water."],
    fish: [
      fish("crappie","Crappie","good","year-round","Docks and man-made brush piles create one of the Highland Lakes chain's defining crappie fisheries.",["jigs-and-minnows"]),
      fish("largemouth-bass","Largemouth bass","good","spring","Bass often remain shallow and use water willow, docks, canals and rocky banks.",["soft-plastics","topwater","spinnerbaits","crankbaits"]),
      fish("white-bass","White bass","good","spring","Spring runs move into the Llano and Colorado River arms.",["jigs-and-minnows","topwater","live-bait"]),
      fish("catfish","Catfish","good","year-round","Blue, channel and flathead catfish occur throughout the reservoir.",["cut-bait","live-bait"]),
    ],
    access: "TPWD identifies two main public ramps plus smaller public ramps in Granite Shoals; verify fees and conditions before travel.",     accessPoints: [
      { name: "Wirtz Dam / Cottonwood Ramp", operator: "Lake LBJ Yacht Club and Marina", kind: "public-ramp", launch: "South shore near Wirtz Dam; from Marble Falls use FM 2147, following the signed turn. One-lane concrete ramp; TPWD lists 20–30 vehicle/trailer spaces.", fee: "TPWD lists a launch fee; confirm the amount", availability: "TPWD describes year-round access. Confirm with operator (830) 693-9172 before towing." },
      { name: "Kingsland Lions Park", operator: "Kingsland Chamber of Commerce", kind: "park", launch: "Llano River arm north shore; from Marble Falls take FM 1431 west into Kingsland, then RR 2900. One-lane concrete ramp.", fee: "TPWD lists a launch fee requested; verify amount", availability: "TPWD lists year-round day use only. Check current access with operator (325) 388-6211." },
    ],
    nearbyLakes: [{slug:"lake-buchanan",name:"Lake Buchanan"},{slug:"lake-travis",name:"Lake Travis"}],
    travelAlerts: ["TPWD warns about algae blooms on Lake LBJ and links to LCRA water-quality updates. Check current local advisories before water-contact recreation.", "TPWD reports zebra mussels in Lake LBJ; follow current cleaning, draining and drying requirements. Bowfishing is also subject to LCRA-enforced special rules, so verify those before harvesting fish."],
  },
  {
    slug: "richland-chambers-reservoir", name: "Richland-Chambers Reservoir", accessReviewedAt: "2026-10-12", tpwdSlug: "richland_chambers", waterDataSlug: "richland-chambers", region: "prairies-lakes",
    summary: "A 41,356-acre North Central Texas reservoir with excellent catfish, crappie, white bass and hybrid striped bass fisheries.",
    surfaceAcres: 41356, maxDepthFeet: 75, impoundedYear: 1987, counties: ["Navarro", "Freestone"], nearestCities: ["Corsicana", "Kerens", "Streetman"],
    waterway: "Richland and Chambers creeks", riverBasin: "Trinity River Basin", authority: "Tarrant Regional Water District", conservationPool: "315 ft msl", fluctuation: "About 3 feet", clarity: "Cloudy to moderately clear",
    identity: "Richland-Chambers is a multi-species destination where schooling white and hybrid striped bass, abundant crappie and strong catfish fisheries carry as much weight as largemouth bass.",
    habitat: ["Pondweeds and water stargrass occur in coves and creek arms.", "The old Trinity River levee forms a major underwater structure between the creek arms and dam.", "Upper creek arms contain timber that is especially important to crappie."],
    fish: [
      fish("catfish","Catfish","excellent","year-round","Blue and channel catfish are widespread and support one of the lake's signature fisheries.",["cut-bait","live-bait"]),
      fish("crappie","Crappie","excellent","year-round","Bridge crossings and upper-arm timber support a consistently strong black- and white-crappie fishery.",["jigs-and-minnows"]),
      fish("white-bass","White bass","excellent","year-round","Schooling fish are common from the US 287 bridge toward the dam.",["vertical-jigging","topwater"]),
      fish("hybrid-striped-bass","Hybrid striped bass","excellent","year-round","Hybrids share the open-water shad fishery with white bass.",["vertical-jigging","trolling","live-bait"]),
      fish("largemouth-bass","Largemouth bass","fair","year-round","Bass opportunity improves where anglers find clearer water, vegetation and underwater structure.",["crankbaits","soft-plastics"]),
    ],
    access: "TPWD lists county ramps, marinas and other launch sites around the reservoir; facility fees and conditions vary.", specialRules: true,     accessPoints: [
      { name: "Cedar Creek Ramp", operator: "Navarro County", kind: "public-ramp", launch: "From US 287 south of Corsicana, east on FM 637 and FM 2859, 2.5 miles to CR SE3130; ramp and bank fishing, 30 spaces.", fee: "TPWD lists no fee", availability: "Year-round TPWD listing; verify county conditions." },
      { name: "FM 2859 Crossing Ramp", operator: "Navarro County", kind: "public-ramp", launch: "From SH 31 in Kerens, SH 309 and FM 1393 to FM 2859 just before the bridge; one-lane ramp, 20 spaces.", fee: "TPWD lists no fee", availability: "Year-round TPWD listing; verify county conditions." },
      { name: "Fisherman's Point", operator: "Private operator", kind: "resort", launch: "From US 287/FM 488 or northbound FM 488, west on FM 416 at Winkler to signed campground; bank access and ramp, 40 spaces.", fee: "TPWD lists historical fee; check current pricing", availability: "Year-round TPWD listing; confirm private campground (903) 389-5218." },
    ],
    nearbyLakes: [{slug:"cedar-creek-reservoir",name:"Cedar Creek Reservoir"},{slug:"lake-palestine",name:"Lake Palestine"}],
  },
  {
    slug: "lake-palestine", name: "Lake Palestine", accessReviewedAt: "2026-10-12", tpwdSlug: "palestine", waterDataSlug: "palestine", region: "piney-woods",
    summary: "A 25,560-acre Neches River reservoir southwest of Tyler with tournament bass, spring white-bass runs, hybrids, crappie and abundant catfish.",
    surfaceAcres: 25560, maxDepthFeet: 58, impoundedYear: 1962, counties: ["Anderson", "Cherokee", "Henderson", "Smith"], nearestCities: ["Tyler", "Chandler", "Palestine"],
    waterway: "Neches River", riverBasin: "Neches River Basin", authority: "Upper Neches River Authority", conservationPool: "345 ft msl", fluctuation: "About 2.2 feet", clarity: "Moderately clear",
    identity: "Lake Palestine is a broad East Texas fishery: tournament largemouth bass matter, but spring white-bass runs, hybrid striped bass and abundant blue, channel and flathead catfish broaden the search demand.",
    habitat: ["Hydrilla and native aquatic plants are strongest in the upper lake and creek arms.", "Kickapoo Creek is a particularly vegetation-rich arm.", "River and creek channels, docks and shoreline cover create multiple seasonal patterns."],
    fish: [
      fish("largemouth-bass","Largemouth bass","good","spring","Consistent tournament fishing centers on vegetation, cover and creek-channel transitions.",["soft-plastics","spinnerbaits","crankbaits"]),
      fish("white-bass","White bass","good","spring","Spring runs push fish into the Neches River and Kickapoo Creek.",["jigs-and-minnows","live-bait"]),
      fish("hybrid-striped-bass","Hybrid striped bass","good","year-round","Open-water hybrids add a major schooling-fish opportunity.",["trolling","vertical-jigging","live-bait"]),
      fish("catfish","Catfish","excellent","year-round","Channel and blue catfish are abundant and flatheads provide trophy potential.",["cut-bait","live-bait"]),
      fish("crappie","Crappie","good","spring","Crappie use timber, brush and protected spawning cover.",["jigs-and-minnows"]),
    ],
    access: "TPWD lists five public boat launches plus numerous private marinas, motels and campgrounds with additional ramps and services.", specialRules: true,     accessPoints: [
      { name: "Chandler River Park", operator: "City of Chandler", kind: "park", launch: "Neches River upstream east of Chandler, off SH 31. West bank south of highway bridge; small-boat ramp and bank fishing, with northside parking noted by TPWD.", fee: "No launch fee listed", availability: "TPWD lists year-round, but launch may be unusable at low water. City of Chandler (903) 849-6853." },
      { name: "Kickapoo Public Ramp", operator: "Public facility; operator not specified by TPWD", kind: "public-ramp", launch: "From SH 31 at Chandler turn south on FM 315; left at end of first bridge. Ramp and bank fishing, about 50 parking spaces.", fee: "No fee listed by TPWD", availability: "Operator and current water-depth/ramp status should be confirmed; TPWD does not provide an explicit open-season notice here." },
      { name: "Flat Creek Public Ramp", operator: "Public facility; operator not specified by TPWD", kind: "public-ramp", launch: "From SH 31 at Chandler follow FM 315 south to the third bridge at Flat Creek. Bank access, about 40 spaces.", fee: "No fee listed by TPWD", availability: "TPWD lists year-round; confirm condition before towing." },
      { name: "Westberry Landing", operator: "Private operator listed by TPWD", kind: "marina", launch: "From Tyler on SH 31 west, south on FM 2661 then roughly four miles past railroad tracks. Ramp for varied boat sizes; 15 spaces.", fee: "TPWD lists $5; dated figure, VERIFY before travel", availability: "TPWD lists year-round; operator (903) 509-4400. Fee/operation may change." },
      { name: "Saline Bay", operator: "Public facility; operator not specified by TPWD", kind: "public-ramp", launch: "From SH 155 south of Tyler at Dogwood City, east on CR 189W approximately half a mile. Two-lane ramp accommodates multiple boat sizes.", fee: "No fee listed by TPWD", availability: "TPWD lists year-round; verify water-level operability." },
      { name: "Deep End Public Ramp", operator: "Public facility; operator not specified by TPWD", kind: "public-ramp", launch: "From SH 155 in Frankston take US 175 east 3.5 miles, north on FM 1892 to ramp at west end of dam. Two-lane ramp.", fee: "No fee listed by TPWD", availability: "TPWD lists year-round; verify access/closure notices." },
      { name: "Lake Palestine Campground", operator: "Private campground operator listed by TPWD", kind: "resort", launch: "From SH 155 south of Tyler across lake bridges, right on Boles Road after third crossing. Two single-lane ramps; TPWD lists 40 parking spaces.", fee: "TPWD lists a fee; VERIFY current charge/reservations", availability: "TPWD lists year-round; historic operator (903) 876-2253. Independently confirm campground still operates." },
    ],
    nearbyLakes: [{slug:"cedar-creek-reservoir",name:"Cedar Creek Reservoir"},{slug:"lake-bob-sandlin",name:"Lake Bob Sandlin"},{slug:"lake-tyler",name:"Lake Tyler (East and West)"}],
  },
  {
    slug: "cedar-creek-reservoir", name: "Cedar Creek Reservoir", accessReviewedAt: "2026-10-12", tpwdSlug: "cedar_creek", waterDataSlug: "cedar-creek", region: "prairies-lakes",
    summary: "A large reservoir west of Athens with excellent catfish and white/hybrid striped bass fishing plus good largemouth bass and crappie.",
    surfaceAcres: 32623, maxDepthFeet: 53, impoundedYear: 1965, counties: ["Henderson", "Kaufman"], nearestCities: ["Athens", "Mabank", "Gun Barrel City"],
    waterway: "Cedar Creek", riverBasin: "Trinity River Basin", authority: "Tarrant Regional Water District", conservationPool: "322 ft msl", fluctuation: "About 4 feet", clarity: "Moderately clear lower lake to muddy upper lake",
    identity: "Cedar Creek is a Dallas-side regional workhorse with excellent blue-catfish and white/hybrid bass opportunity and enough lower-lake vegetation to support good largemouth fishing.",
    habitat: ["Submerged vegetation is concentrated in lower-lake coves.", "Shallow upper-lake flats and emergent vegetation create a different fishery from the clearer lower third.", "Submersed islands near the Clear and Caney creek confluence provide offshore structure."],
    fish: [
      fish("catfish","Catfish","excellent","year-round","Blue catfish are especially abundant, with channel and flathead catfish also present.",["cut-bait","live-bait"]),
      fish("white-bass","White bass","excellent","spring","Schooling fish follow shad and are especially active in spring.",["topwater","vertical-jigging"]),
      fish("hybrid-striped-bass","Hybrid striped bass","excellent","spring","Stocked hybrids school with white bass and respond to open-water presentations.",["trolling","vertical-jigging","live-bait"]),
      fish("largemouth-bass","Largemouth bass","good","spring","The clearer lower end and weedy coves provide the strongest bass habitat.",["soft-plastics","spinnerbaits","crankbaits"]),
      fish("crappie","Crappie","good","spring","Crappie use brush, docks and protected cover.",["jigs-and-minnows"]),
    ],
    access: "TPWD lists public ramps and private marinas; low water can affect some private launch sites.",     accessPoints: [
      { name: "Chamber Island Ramp", operator: "Cedar Creek Lake Organization", kind: "public-ramp", launch: "East side of causeway island on SH 334/FM 85, from Seven Points. Two-lane paved ramp and about 75 spaces.", fee: "Free park entry; TPWD says donations requested for launch", availability: "Year-round in TPWD listing; confirm ramp condition." },
      { name: "Sandy Shores Marina", operator: "Private marina", kind: "marina", launch: "Gun Barrel City off SH 334/FM 85 and Big Chief Drive; one-lane ramp, about 70 spaces.", fee: "TPWD historic listing includes a fee, not a current quote", availability: "Year-round in TPWD listing; confirm private operation (903) 887-0535." },
      { name: "Lone Star Marina", operator: "Private marina", kind: "marina", launch: "West shore via SH 274 south of Seven Points at Don's Port corridor; around 50 spaces.", fee: "TPWD lists a launch fee; confirm current price", availability: "TPWD lists Tuesday–Saturday operation, but hours can change; verify (903) 432-2268." },
      { name: "Log Cabin Ramp", operator: "City of Log Cabin", kind: "park", launch: "Four-lane ramp with fishing pier; accessible via city of Log Cabin lake road network.", fee: "TPWD lists a fee; confirm current price", availability: "Year-round in TPWD listing; City of Log Cabin (903) 489-2195." },
      { name: "County Public Ramp (Caney Creek)", operator: "Henderson County", kind: "public-ramp", launch: "From SH 31 in Malakoff, north on FM 198 about three miles, cross Caney Creek; ramp at north end of bridge, two lanes, 40 spaces.", fee: "TPWD lists no fee", availability: "Year-round in TPWD listing; verify county status." },
      { name: "Fisherman's Wharf", operator: "Private marina", kind: "marina", launch: "From Malakoff north on FM 198, west on FM 3062, then north on CR 1703; ramp, about 40 spaces.", fee: "TPWD lists fee; verify current charge", availability: "Year-round in TPWD listing; verify private operation (903) 489-0710." },
    ],
    nearbyLakes: [{slug:"richland-chambers-reservoir",name:"Richland-Chambers Reservoir"},{slug:"lake-palestine",name:"Lake Palestine"},{slug:"bardwell-lake",name:"Bardwell Lake"}],
  },
  {
    slug: "lewisville-lake", name: "Lewisville Lake", accessReviewedAt: "2026-10-12", tpwdSlug: "lewisville", waterDataSlug: "lewisville", region: "prairies-lakes",
    summary: "A major Denton County reservoir with excellent crappie, white bass and catfish plus hybrid striped bass and largemouth fishing inside the DFW metro.",
    surfaceAcres: 29592, maxDepthFeet: 67, impoundedYear: 1954, counties: ["Denton"], nearestCities: ["Lewisville", "Denton", "Little Elm"],
    waterway: "Elm Fork Trinity River", riverBasin: "Trinity River Basin", authority: "U.S. Army Corps of Engineers", conservationPool: "522 ft msl", fluctuation: "About 4–8 feet annually", clarity: "Stained",
    identity: "Lewisville Lake pairs enormous DFW search demand with excellent white bass, crappie and catfish and a meaningful hybrid-striped-bass fishery.",
    habitat: ["Standing timber holds crappie and largemouth bass in several areas.", "Bridges are major crappie structure.", "Main-lake humps and ridges support hybrids and schooling white bass."],
    fish: [
      fish("crappie","Crappie","excellent","year-round","Bridge structure and timber create a high-use crappie fishery.",["jigs-and-minnows"]),
      fish("white-bass","White bass","excellent","summer","White bass school in the main lake and are often located by feeding birds.",["topwater","vertical-jigging"]),
      fish("catfish","Catfish","excellent","year-round","Blue and channel catfish provide excellent opportunity.",["cut-bait","live-bait"]),
      fish("hybrid-striped-bass","Hybrid striped bass","good","year-round","Hybrids use humps and ridges on Hickory Creek and the main lake.",["trolling","vertical-jigging","live-bait"]),
      fish("largemouth-bass","Largemouth bass","good","spring","Bass use shoreline structure and timbered coves.",["soft-plastics","crankbaits"]),
    ],
    access: "USACE and surrounding communities operate major parks and ramps; most charge access or launch fees and closures can change.", specialRules: true,     historySourceUrl: "https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/lewisville/",
    historyNotes: [
      "Today's Lewisville Lake incorporates a much older municipal water project. Dallas finished Garza Dam in 1927 to impound Lake Dallas on the Elm Fork of the Trinity River, but sediment accumulation later reduced its usefulness.",
      "The U.S. Army Corps of Engineers began Lewisville Dam in November 1948 and started deliberate impoundment on November 1, 1954. The project was completed in August 1955. In 1957 the old Lake Dallas dam was breached and its pool became part of the enlarged reservoir.",
      "The modern project supplies the Dallas-Denton area while also controlling floods and providing public recreation. That history explains why older Lake Dallas references and Lewisville Lake refer to connected but not identical stages of the same water-supply landscape.",
    ],
    accessPoints: [
      { name: "Big Sandy Ramp", operator: "U.S. Army Corps of Engineers", kind: "public-ramp", launch: "From I-35E north of Lewisville, east on Shady Shores Road and north on Lake Shore. Two-lane concrete ramp; 24 spaces.", fee: "TPWD lists no launch fee", availability: "TPWD lists year-round; contact USACE (469) 645-9100 for changing ramp conditions." },
      { name: "Lewisville City Park", operator: "City of Lewisville", kind: "park", launch: "North Mill Street to Lake Park Road, east to park. TPWD lists 11 ramp lanes, 108 maximum parking spaces and a separately operated fishing barge.", fee: "TPWD lists fees; verify with city", availability: "Year-round per TPWD; City of Lewisville (972) 219-3550. Fishing barge is separate concession." },
      { name: "Pilot Knoll Park", operator: "Town of Flower Mound", kind: "park", launch: "From FM 407 in Lewisville, follow Chinn Road, Chapel Road and Orchard Hill Lane. Two-lane concrete ramp with 30 parking spaces.", fee: "Launch fee listed by TPWD", availability: "TPWD lists year-round; verify with Flower Mound (972) 874-6000." },
      { name: "Hidden Cove Park", operator: "City of The Colony", kind: "park", launch: "From SH 423 about two miles north of The Colony, head west at park sign. Three-lane concrete ramp with about 50 spaces.", fee: "Fee listed by TPWD", availability: "TPWD lists year-round; verify park status with city (972) 294-1443." },
      { name: "Doe Branch Ramp", operator: "U.S. Army Corps of Engineers", kind: "public-ramp", launch: "Off South Paloma Creek Boulevard south of US 380. One-lane ramp with about 25 parking spaces.", fee: "TPWD lists no fee", availability: "Can close when levels are low; check with USACE (469) 645-9100 before towing." },
      { name: "Little Elm Park", operator: "City of Little Elm", kind: "park", launch: "Off FM 720 in Little Elm, Park Road north northeast of the bridge. Three-lane concrete ramp with about 50 trailer spaces.", fee: "TPWD lists a launch fee", availability: "Year-round in the TPWD inventory; City of Little Elm (972) 731-3296." },
    ],
    nearbyLakes: [{slug:"ray-roberts-lake",name:"Ray Roberts Lake"},{slug:"grapevine-lake",name:"Grapevine Lake"}],
  },
  {
    slug: "ray-roberts-lake", name: "Ray Roberts Lake", accessReviewedAt: "2026-10-12", tpwdSlug: "ray_roberts", waterDataSlug: "ray-roberts", region: "prairies-lakes",
    summary: "A 25,600-acre reservoir north of Denton with excellent largemouth bass, crappie and white bass plus extensive standing timber.",
    surfaceAcres: 25600, maxDepthFeet: 106, impoundedYear: 1987, counties: ["Denton", "Cooke", "Grayson"], nearestCities: ["Denton", "Sanger", "Pilot Point"],
    waterway: "Elm Fork Trinity River", riverBasin: "Trinity River Basin", authority: "U.S. Army Corps of Engineers", conservationPool: "632.5 ft msl", fluctuation: "About 3–5 feet", clarity: "Clear",
    identity: "Ray Roberts combines a high-quality black-bass fishery with excellent crappie and white bass, significant public park access and roughly 2,000 acres of standing timber.",
    habitat: ["Standing timber dominates many upper-arm areas.", "Water willow, cattail, Chara, milfoil and pondweed add seasonally variable vegetation.", "Main-lake points, dam areas and tributaries support white-bass movement."],
    fish: [
      fish("largemouth-bass","Largemouth bass","excellent","spring","A strong black-bass fishery uses timber, vegetation, points and shoreline cover.",["soft-plastics","spinnerbaits","crankbaits"]),
      fish("crappie","Crappie","excellent","year-round","Timber and brush create excellent crappie habitat.",["jigs-and-minnows"]),
      fish("white-bass","White bass","excellent","spring","Spring tributary runs and summer main-lake schools provide two major seasonal windows.",["topwater","vertical-jigging","live-bait"]),
      fish("catfish","Catfish","good","year-round","Blue and channel catfish support year-round fishing.",["cut-bait","live-bait"]),
    ],
    access: "TPWD operates state-park units and satellite parks with ramps around the lake; other facilities are managed by USACE and local operators.",     historySourceUrl: "https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/ray_roberts/index.asp",
    historyNotes: [
      "The Elm Fork Trinity project was first authorized by the 1965 Rivers and Harbors Act under the name Aubrey Lake. The future reservoir was renamed in 1980 to honor U.S. Congressman Ray Roberts.",
      "Corps construction began May 31, 1982 and both the dam completion and first deliberate impoundment occurred June 30, 1987. The project was designed principally to supply the rapidly growing Dallas-Denton area.",
      "TWDB records the conservation-pool acreage from its surveys; that area differs from the larger flood-control pool, and neither is proof that all state park units, boat ramps or trails are accessible today.",
    ],
    accessPoints: [
      { name: "Buck Creek Park", operator: "Texas Parks & Wildlife Department", kind: "park", launch: "West side of US 377 about a mile south of Tioga. Two-lane concrete ramp with boarding pier; TPWD lists up to 75 parking spaces.", fee: "TPWD lists park access fee", availability: "Can close around lake elevation 634.7 ft per TPWD; verify current conditions (940) 686-2148." },
      { name: "Jordan Park", operator: "Texas Parks & Wildlife Department", kind: "park", launch: "About one mile west of Pilot Point on FM 1192. Four-lane concrete ramp with pier and up to 75 spaces.", fee: "TPWD lists fee", availability: "TPWD warns it can close near lake elevation 639.0 ft; confirm before towing (940) 686-2148." },
      { name: "Isle du Bois State Park Unit", operator: "Texas Parks & Wildlife Department", kind: "park", launch: "Southern park unit of Ray Roberts Lake; official TPWD site map lists launch and campground amenities.", fee: "State park entry/launch charges may apply", availability: "Camping and marina/ramp usability depend on current TPWD unit alerts; (940) 686-2148." },
      { name: "Johnson Branch State Park Unit", operator: "Texas Parks & Wildlife Department", kind: "park", launch: "Northern state park unit of Ray Roberts Lake with public launch and camping in TPWD access inventory.", fee: "State park entry/launch charges may apply", availability: "Check current status and park reservations directly with TPWD (940) 637-2294." },
    ],
    nearbyLakes: [{slug:"lewisville-lake",name:"Lewisville Lake"},{slug:"lake-texoma",name:"Lake Texoma"}],
    camping: {name:"Ray Roberts Lake State Park",summary:"State-park units provide established camping and lake access; verify reservations, closures and ramp conditions before travel."},
    travelAlerts: ["TPWD reports zebra mussels in Ray Roberts Lake. Drain and clean boats and equipment under the latest invasive-species rules."],
  },
  {
    slug: "lake-ray-hubbard", name: "Lake Ray Hubbard", accessReviewedAt: "2026-10-12", tpwdSlug: "ray_hubbard", waterDataSlug: "ray-hubbard", region: "prairies-lakes",
    summary: "A Dallas-area reservoir with excellent hybrid striped bass and catfish plus good white bass, crappie and largemouth fishing.",
    surfaceAcres: 21671, maxDepthFeet: 40, impoundedYear: 1968, counties: ["Collin", "Dallas", "Rockwall", "Kaufman"], nearestCities: ["Rockwall", "Garland", "Rowlett"],
    waterway: "East Fork Trinity River", riverBasin: "Trinity River Basin", authority: "City of Dallas", conservationPool: "435.5 ft msl", fluctuation: "About 1–3 feet", clarity: "Stained",
    identity: "Lake Ray Hubbard is one of the highest-value urban fishing searches in Texas: hybrids and blue catfish are signature targets while riprap, timber and vegetation support bass, crappie and white bass.",
    habitat: ["Standing timber is most abundant above Interstate 30.", "Hydrilla occurs in selected areas and attracts largemouth bass.", "Roadway riprap, humps and points create major structure."],
    fish: [
      fish("hybrid-striped-bass","Hybrid striped bass","excellent","year-round","Hybrids use humps, points and open-water shad schools.",["trolling","vertical-jigging","live-bait"]),
      fish("catfish","Catfish","excellent","year-round","Blue catfish are especially abundant, with channel catfish also important.",["cut-bait","live-bait"]),
      fish("white-bass","White bass","good","summer","White bass school in the lower lake during summer.",["topwater","vertical-jigging"]),
      fish("largemouth-bass","Largemouth bass","good","year-round","Vegetation and riprap are core bass habitat.",["soft-plastics","crankbaits","spinnerbaits"]),
      fish("crappie","Crappie","good","year-round","Submerged brush piles and timber hold crappie.",["jigs-and-minnows"]),
    ],
    access: "City parks and private marinas provide boat ramps; Robertson Park is a major day-use and bank-fishing access area.",     historySourceUrl: "https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/ray_hubbard/",
    historyNotes: [
      "Ray Hubbard's dam was not finished the year construction began: work started June 13, 1964, the channel was closed in September 1967, and deliberate impoundment began December 1, 1968. TWDB records final dam completion in January 1969.",
      "Public water supply drove construction of this East Fork Trinity reservoir; industrial infrastructure soon joined the shoreline, with the Ray Hubbard Steam Electric Station's two units commissioned in 1970 and 1973.",
      "The 2015 TWDB survey measured 20,947 acres at conservation pool and roughly 439,559 acre-feet of storage. This survey-based figure is not an instant reading of today's lake surface area; visitors should use current reservoir-level data separately.",
    ],
    accessPoints: [
      { name: "Paddle Point Park (paddle craft only)", operator: "City of Rowlett", kind: "park", launch: "6775 Miller Road, Rowlett; gravel/dirt put-in for non-motorized craft; not a motorboat launch.", fee: "Confirm city parking requirements", availability: "TPWD lists year-round; verify city park status." },
      { name: "Paul Jones Park", operator: "City of Garland", kind: "park", launch: "4099 Zion Road, Garland; four concrete lanes, up to 50 vehicle spaces and picnic access.", fee: "TPWD lists no fee", availability: "Year-round in TPWD listing; check City of Garland (972) 205-2750." },
      { name: "Harbor Bay Marina", operator: "Private marina", kind: "marina", launch: "From I-30 Horizon/Ridge exit follow Horizon and Windjammer Way. Two lanes, up to 50 spaces, fishing barge.", fee: "Launch fee listed", availability: "Year-round per TPWD; verify private operation (972) 771-0071." },
      { name: "SH 66 Ramp", operator: "City of Rockwall", kind: "public-ramp", launch: "North side of Highway 66 causeway east of Dalrock Road; two single-lane ramps and one double-lane ramp, about 40 spaces.", fee: "TPWD lists no fee", availability: "Year-round per TPWD; City of Rockwall (972) 771-7740." },
      { name: "Terry Park", operator: "City of Heath", kind: "park", launch: "Ridge Road/FM 740 to Smirl/FM 1140 and Terry Lane; two-lane ramp, courtesy docks, 30 spaces.", fee: "TPWD lists no fee", availability: "Year-round per TPWD; City of Heath (972) 771-6228." },
      { name: "Chandler's Landing", operator: "Private marina", kind: "marina", launch: "From I-30, south on Ridge Road to Henry M. Chandlers Drive, down toward marina; two-lane concrete ramp.", fee: "Launch fee listed", availability: "Year-round per TPWD; verify private operation (972) 771-8865." },
      { name: "Captain's Cove Marina", operator: "Private marina", kind: "marina", launch: "5965 Marina Drive, Garland; four concrete boat lanes, up to 50 spaces.", fee: "Launch fee listed", availability: "Year-round per TPWD; verify private operator (972) 226-7100." },
      { name: "Sapphire Bay", operator: "Private marina", kind: "marina", launch: "9051 Marina Vista, Rowlett; two-lane concrete ramp, courtesy docks, about 50 spaces.", fee: "TPWD lists no fee", availability: "Year-round per TPWD; verify private operation (972) 412-1977." },
    ],
    campingProhibited: true,
    nearbyLakes: [{slug:"lake-lavon",name:"Lake Lavon"},{slug:"lewisville-lake",name:"Lewisville Lake"}],
  },
  {
    slug: "lake-lavon", name: "Lake Lavon", accessReviewedAt: "2026-10-12", tpwdSlug: "lavon", waterDataSlug: "lavon", region: "prairies-lakes",
    summary: "A Collin County reservoir northeast of Dallas with excellent blue catfish and crappie plus good largemouth, channel catfish and white bass.",
    surfaceAcres: 21400, maxDepthFeet: 59, impoundedYear: 1953, counties: ["Collin"], nearestCities: ["Wylie", "Princeton", "McKinney"],
    waterway: "East Fork Trinity River", riverBasin: "Trinity River Basin", authority: "U.S. Army Corps of Engineers", conservationPool: "492 ft msl", fluctuation: "Moderate", clarity: "Moderate with a greenish tint",
    identity: "Lake Lavon is a crappie-and-catfish anchor for fast-growing Collin County, with extensive timber and a strong spring/fall largemouth pattern.",
    habitat: ["Standing timber is extensive in the East Fork and Sister Grove/Pilot Grove arms.", "Water willow, lotus and cove vegetation add shallow cover.", "Dam riprap and winter power-plant outflow create distinct seasonal structure."],
    fish: [
      fish("blue-catfish","Blue catfish","excellent","winter","Blue catfish are a signature fishery, especially on deep open-water points in winter.",["cut-bait","live-bait"]),
      fish("crappie","Crappie","excellent","spring","Winter deep structure transitions to vulnerable shallow spawning fish in spring.",["jigs-and-minnows"]),
      fish("largemouth-bass","Largemouth bass","good","spring","Spring shallow cover and a second fall feeding peak define the main bass windows.",["soft-plastics","spinnerbaits","crankbaits"]),
      fish("white-bass","White bass","good","spring","Spring tributary flows and summer dam-area schools provide productive patterns.",["topwater","jigs-and-minnows"]),
      fish("channel-catfish","Channel catfish","good","summer","Early summer tributary and riprap patterns support good channel-catfish fishing.",["cut-bait"]),
    ],
    access: "USACE parks and local facilities provide multiple boat ramps and bank-fishing areas; verify closures and fee policies.", specialRules: true,     historySourceUrl: "https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/lavon/index.asp",
    historyNotes: [
      "The Corps-authorized East Fork of the Trinity flood-control project began construction in January 1948. Lavon Lake first held deliberate storage on September 14, 1953, and the original work was completed that same month.",
      "Growing North Texas water needs changed the design after the initial project. Congress approved more water-supply storage in 1962; the major dam modification, which raised the supply and flood-control pools, was completed in December 1975.",
      "That expansion is part of Lavon's identity as both municipal water infrastructure and a public-access lake. The 1975 enlargement should not be confused with the 1953 initial impoundment when interpreting historical photos, shoreline changes or older maps.",
    ],
    accessPoints: [
      { name: "Twin Groves", operator: "U.S. Army Corps of Engineers", kind: "public-ramp", launch: "Upstream Twin Groves Creek; from McKinney take US 380 east about 12 miles to signed north-side park approach before bridge. Two-lane ramp without dock.", fee: "No fee listed by TPWD", availability: "TPWD lists year-round; USACE (972) 442-3141; verify closures after flood events." },
      { name: "Elm Creek", operator: "U.S. Army Corps of Engineers", kind: "public-ramp", launch: "East shore uplake: from US 380 in Farmersville follow SH 78 south about 3.25 miles to west-side park entrance. Two-lane ramp.", fee: "No fee listed by TPWD", availability: "Year-round per TPWD; check USACE (972) 442-3141." },
      { name: "Little Ridge", operator: "U.S. Army Corps of Engineers", kind: "park", launch: "East shore along SH 78 between Lavon and Farmersville. Four-lane ramp with dock.", fee: "No fee listed by TPWD", availability: "Year-round per TPWD; verify USACE closures (972) 442-3141." },
      { name: "Lavonia Park", operator: "U.S. Army Corps of Engineers", kind: "park", launch: "Downlake east shore off FM 6 west from SH 78. Two four-lane ramps, one inside the park and one outside, courtesy dock at inside ramp.", fee: "Launch fee listed; confirm which ramp and season", availability: "TPWD states INSIDE ramp April 1–September 30; OUTSIDE ramp 24 hours year-round. Confirm USACE (972) 442-3141." },
      { name: "Mallard Park", operator: "U.S. Army Corps of Engineers", kind: "park", launch: "Downlake southeast shore west of SH 78 north of Lavon. Four-lane ramp with dock.", fee: "No fee listed by TPWD", availability: "Year-round per TPWD; confirm flood closures with USACE (972) 442-3141." },
      { name: "Tickey Creek", operator: "U.S. Army Corps of Engineers", kind: "park", launch: "West shore east arm: FM 982 south of US 380 at Princeton, east on FM 3364 near Culleoka. Four-lane ramp.", fee: "Fee listed by TPWD", availability: "Year-round in TPWD inventory; call USACE (972) 442-3141 for status." },
    ],
    nearbyLakes: [{slug:"lake-ray-hubbard",name:"Lake Ray Hubbard"},{slug:"ray-roberts-lake",name:"Ray Roberts Lake"}],
    travelAlerts: ["TPWD reports zebra mussels and identifies a lake-specific catfish regulation; check the Outdoor Annual and aquatic-invasive-species requirements before fishing or towing."],
  },
  {
    slug: "grapevine-lake", name: "Grapevine Lake", accessReviewedAt: "2026-10-12", tpwdSlug: "grapevine", waterDataSlug: "grapevine", region: "prairies-lakes",
    summary: "A compact DFW reservoir with excellent largemouth bass, blue catfish and white bass plus smallmouth, spotted bass and crappie.",
    surfaceAcres: 6684, maxDepthFeet: 65, impoundedYear: 1952, counties: ["Tarrant", "Denton"], nearestCities: ["Grapevine", "Flower Mound", "Southlake"],
    waterway: "Denton Creek", riverBasin: "Trinity River Basin", authority: "U.S. Army Corps of Engineers", conservationPool: "535 ft msl", fluctuation: "About 5–10 feet", clarity: "Stained",
    identity: "Grapevine Lake packs unusually diverse bass and catfish opportunity into an urban reservoir next to one of the state's largest visitor and airport corridors.",
    habitat: ["Twin Coves contains substantial flooded timber.", "Rocky shorelines, dropoffs and underwater boulders hold black bass.", "Boathouses in McPherson Slough and the aerated intake near the dam concentrate fish."],
    fish: [
      fish("largemouth-bass","Largemouth bass","excellent","year-round","Rock, flooded timber, dropoffs and boathouses support the lake's most popular sportfish.",["soft-plastics","crankbaits","spinnerbaits"]),
      fish("blue-catfish","Blue catfish","excellent","year-round","Abundant blue catfish respond well to fresh shad and open-water structure.",["cut-bait","live-bait"]),
      fish("white-bass","White bass","excellent","year-round","White bass concentrate around the aerated intake and main-lake forage.",["vertical-jigging","topwater"]),
      fish("smallmouth-bass","Smallmouth bass","good","year-round","Rocky shorelines and boulders provide meaningful smallmouth habitat.",["crankbaits","soft-plastics"]),
      fish("crappie","Crappie","fair","year-round","Boat houses and flooded timber are the primary crappie framework.",["jigs-and-minnows"],"secondary"),
    ],
    access: "USACE and municipal parks provide ramps; access areas can close after flooding or repairs, so verify current status.", specialRules: true,     accessPoints: [
      { name: "Meadowmere Park", operator: "City of Grapevine", kind: "park", launch: "From SH 114 follow Dove Road east, Kimball north, then Meadowmere Lane. Two two-lane ramps with TPWD-listed parking for 30 and 50 vehicles.", fee: "Launch fee; annual pass option listed", availability: "Year-round per TPWD; City of Grapevine (817) 410-3122. Check current USACE closure notices." },
      { name: "Lakeview Park", operator: "City of Grapevine", kind: "park", launch: "From SH 114 via Dove Road and Kimball, then Lakeview Drive. Two one-lane ramps; about 15 spaces at each.", fee: "Launch fee; annual pass option listed", availability: "Year-round per TPWD; City of Grapevine (817) 410-3122; check closures." },
      { name: "Oak Grove Park", operator: "City of Grapevine", kind: "park", launch: "Off Northwest Highway, Dove Road and Dove Loop. Ramps: McPherson Slough (2 lanes), Dove Loop (2), Trawick (1) and Sand Bass Point (2).", fee: "Launch fee; annual pass option listed", availability: "TPWD lists year-round; operator (817) 410-3122. Scotts Landing Marina also located within park." },
      { name: "Vineyards Campgrounds and Cabins", operator: "City of Grapevine", kind: "resort", launch: "From Business SH 114 via Dooley Road and Katie Drive. One two-lane ramp within the campground.", fee: "Fees required; ramp only for registered overnight guests", availability: "TPWD describes year-round access for overnight guests, NOT a general public launch. Operator (817) 329-8993." },
      { name: "Murrell Park / Twin Coves Marina", operator: "U.S. Army Corps of Engineers", kind: "park", launch: "North shore, 880 Simmons Road, Flower Mound; two ramps with four lanes total and 40 spaces.", fee: "Launch fee; annual pass option listed", availability: "TPWD lists year-round but says some lake parks are closed; verify USACE (817) 865-2600 first." },
      { name: "Twin Coves Park", operator: "City of Flower Mound", kind: "park", launch: "North shore via FM 1171, Old Settlers Road, McKamy Road and Simmons Road. Two-lane ramp; 10 spaces and accessible fishing pier.", fee: "Boat launch fee listed", availability: "TPWD lists year-round; confirm current access and ADA details with city (972) 874-6399." },
    ],
    nearbyLakes: [{slug:"lewisville-lake",name:"Lewisville Lake"},{slug:"eagle-mountain-lake",name:"Eagle Mountain Lake"}],
    travelAlerts: ["TPWD reports zebra mussels and warns that some access sites are closed. Check the USACE closure report before launching and follow invasive-species transport rules."],
  },
  {
    slug: "eagle-mountain-lake", name: "Eagle Mountain Lake", accessReviewedAt: "2026-10-12", tpwdSlug: "eagle_mountain", waterDataSlug: "eagle-mountain", region: "prairies-lakes",
    summary: "A Fort Worth-area reservoir with excellent crappie and white bass plus good largemouth, spotted bass and channel catfish.",
    surfaceAcres: 8738, maxDepthFeet: 47, impoundedYear: 1932, counties: ["Tarrant"], nearestCities: ["Fort Worth", "Azle", "Saginaw"],
    waterway: "West Fork Trinity River", riverBasin: "Trinity River Basin", authority: "Tarrant Regional Water District", conservationPool: "649 ft msl", fluctuation: "About 2–9 feet", clarity: "Clear lower lake; stained upper lake",
    identity: "Eagle Mountain Lake is an unusually accessible Fort Worth fishery where boat docks, reed beds, rock and bluffs support strong crappie, white-bass and black-bass searches.",
    habitat: ["Reed beds occur in the upper lake.", "Boat houses and fishing piers provide extensive mid- and lower-lake cover.", "Rocky points and bluffs in the lower lake hold multiple species."],
    fish: [
      fish("crappie","Crappie","excellent","summer","Boat houses and lower-lake cover concentrate crappie.",["jigs-and-minnows"]),
      fish("white-bass","White bass","excellent","summer","Schooling white bass create a popular summer fishery.",["topwater","vertical-jigging"]),
      fish("largemouth-bass","Largemouth bass","good","year-round","Private docks and reed beds are core targets.",["soft-plastics","spinnerbaits"]),
      fish("spotted-bass","Spotted bass","good","year-round","Spotted bass share rocky and developed shoreline habitat.",["crankbaits","soft-plastics"]),
      fish("channel-catfish","Channel catfish","good","year-round","Channel catfish add a reliable bait fishery.",["cut-bait","live-bait"]),
    ],
    access: "TPWD lists three public ramps and several commercial facilities, many with docks, camping or other amenities.",     historySourceUrl: "https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/eagle_mountain/index.asp",
    historyNotes: [
      "Eagle Mountain Lake grew from the West Fork Trinity water-supply planning that preceded modern Fort Worth suburbs. The state authorized the dam May 1, 1928; construction began January 23, 1930, with physical completion on October 24, 1932.",
      "Deliberate storage began February 28, 1934, a separate milestone from the 1932 dam completion. Its Tarrant Regional Water District ownership and operations combine municipal supply, flood management, irrigation and recreation.",
      "The spillway was subsequently modernized, including a new service-spillway installation completed July 31, 1971. TWDB's 2018 survey reports conservation-pool area and capacity, distinct from today's fluctuating surface.",
    ],
    accessPoints: [
      { name: "West Bay Marina", operator: "Private marina", kind: "marina", launch: "From SH 199 and FM 730 north, Timber Road east to Liberty School Road, then marina; two-lane ramp, 50 parking spaces.", fee: "TPWD lists fee", availability: "Year-round in TPWD inventory; confirm operator (817) 444-1622." },
      { name: "Shady Grove Park", operator: "City of Azle", kind: "park", launch: "From FM 730 north of Azle, east on Stribling North; two-lane concrete ramp, about 35 spaces.", fee: "TPWD lists no fee", availability: "Year-round TPWD listing; City of Azle (817) 444-2541." },
      { name: "Pelican Bay Ramp", operator: "City of Pelican Bay", kind: "public-ramp", launch: "East off FM 730 north of Azle on Sandy Beach, south Liberty School Road and Pelican; two-lane ramp, 25 spaces.", fee: "TPWD lists fee", availability: "Year-round per TPWD; confirm City of Pelican Bay (817) 444-1234." },
      { name: "Twin Points Park", operator: "Tarrant Regional Water District", kind: "park", launch: "From SH 199, north on Boat Club Road, west on Ten Mile Bridge Road; two-lane concrete ramp and 60 spaces.", fee: "TPWD lists fee", availability: "Year-round in TPWD inventory; verify TRWD conditions (817) 237-8585." },
    ],
    nearbyLakes: [{slug:"grapevine-lake",name:"Grapevine Lake"},{slug:"lake-bridgeport",name:"Lake Bridgeport"},{slug:"lake-worth",name:"Lake Worth"}],
  },
  {
    slug: "lake-bridgeport", name: "Lake Bridgeport", accessReviewedAt: "2026-10-12", tpwdSlug: "bridgeport", waterDataSlug: "bridgeport", region: "prairies-lakes",
    summary: "A deep North Texas reservoir with excellent crappie and white/hybrid striped bass plus good largemouth and smallmouth bass.",
    surfaceAcres: 11954, maxDepthFeet: 85, impoundedYear: 1932, counties: ["Jack", "Wise"], nearestCities: ["Bridgeport", "Runaway Bay", "Decatur"],
    waterway: "West Fork Trinity River", riverBasin: "Trinity River Basin", authority: "Tarrant Regional Water District", conservationPool: "836 ft msl", fluctuation: "About 12 feet annually", clarity: "Moderately clear",
    identity: "Bridgeport is a structure-rich North Texas reservoir where rocky shoreline, gravel piles and strong open-water forage support both black bass and excellent white/hybrid bass fishing.",
    habitat: ["Miles of riprap, boulders, coves and points create extensive bass habitat.", "Submerged gravel piles around major points and islands hold white and black bass.", "Sparse pondweed and lotus add limited vegetation."],
    fish: [
      fish("crappie","Crappie","excellent","spring","Deep winter structure gives way to shallow spawning cover in spring.",["jigs-and-minnows"]),
      fish("white-bass","White bass","excellent","year-round","Submerged gravel, points and open-water forage support a strong schooling fishery.",["vertical-jigging","topwater"]),
      fish("hybrid-striped-bass","Hybrid striped bass","excellent","year-round","Hybrids share main-lake schooling patterns with white bass.",["trolling","vertical-jigging","live-bait"]),
      fish("largemouth-bass","Largemouth bass","good","year-round","Rock, riprap, points and coves create broad bass habitat.",["crankbaits","soft-plastics"]),
      fish("smallmouth-bass","Smallmouth bass","good","year-round","Clearer rocky water provides meaningful smallmouth opportunity.",["crankbaits","soft-plastics"]),
    ],
    access: "Public and private launch sites are distributed around the reservoir; lake-level swings make current ramp verification important.",     accessPoints: [
      { name: "US 380 Bridge Ramp", operator: "Tarrant Regional Water District", kind: "public-ramp", launch: "West end of US 380 bridge over south arm at Runaway Bay. Single-lane concrete ramp with unpaved parking.", fee: "TPWD lists no fee", availability: "TPWD says unusable at high lake levels; TRWD (940) 683-2349 can confirm access." },
      { name: "Dam Site Ramp", operator: "Tarrant Regional Water District", kind: "public-ramp", launch: "East shore by dam, about five miles west of Bridgeport on FM 1658 then across dam. Single lane with limited parking.", fee: "TPWD lists no fee", availability: "Year-round in TPWD inventory; verify operator and actual water access." },
      { name: "Wise County Park", operator: "Wise County", kind: "park", launch: "North end west of FM 2952. Three two-lane ramps with parking; camping and day use in county park.", fee: "TPWD lists free launch/day use, camping and other services extra", availability: "Year-round in TPWD inventory; Wise County (940) 644-1910; check reservations." },
      { name: "Lakeside Marina", operator: "Private operator in TPWD inventory", kind: "marina", launch: "From Bridgeport west on US 380 past bridge, first driveway on north side. TPWD lists a ramp for various boat sizes.", fee: "TPWD lists no fee; verify current private operations", availability: "Can be out of water at low lake levels; private operator historically (940) 575-2597." },
    ],
    nearbyLakes: [{slug:"eagle-mountain-lake",name:"Eagle Mountain Lake"},{slug:"possum-kingdom-reservoir",name:"Possum Kingdom Reservoir"}],
  },
  {
    slug: "lake-austin", name: "Lake Austin", accessReviewedAt: "2026-10-12", tpwdSlug: "austin", waterDataSlug: "austin", region: "hill-country",
    summary: "A narrow Colorado River reservoir inside Austin with an excellent largemouth bass fishery, clear water and heavily developed shoreline.",
    surfaceAcres: 1599, maxDepthFeet: 75, impoundedYear: 1939, counties: ["Travis"], nearestCities: ["Austin", "West Lake Hills"],
    waterway: "Colorado River", riverBasin: "Colorado River Basin", authority: "Lower Colorado River Authority", conservationPool: "491.95 ft msl", fluctuation: "Normally constant level with release-driven variation", clarity: "Clear to slightly stained",
    identity: "Lake Austin is a high-intent urban bass lake: trophy-capable largemouth fishing sits directly inside the Austin metro, while private shoreline makes launch and bank-access planning especially important.",
    habitat: ["Watermilfoil and pondweed provide aquatic cover.", "Docks, seawalls and other developed shoreline dominate much of the reservoir.", "Clear water and river-current influence create a different pattern from larger Highland Lakes reservoirs."],
    fish: [
      fish("largemouth-bass","Largemouth bass","excellent","year-round","TPWD describes an excellent, trophy-capable largemouth population.",["soft-plastics","topwater","crankbaits"]),
      fish("sunfish","Sunfish","good","summer","Bluegill, redbreast and redear create accessible shoreline and dock fishing.",["jigs-and-minnows"]),
      fish("catfish","Catfish","fair","year-round","Low-density blue and flathead catfish add a secondary bait fishery.",["cut-bait","live-bait"],"secondary"),
    ],
    access: "Public bank access is limited, but TPWD identifies Walsh Boat Landing, Loop 360, Emma Long Park and Mary Quinlan Park among the principal access points.",     accessPoints: [
      { name: "Walsh Boat Landing", operator: "City of Austin", kind: "public-ramp", launch: "Off Lake Austin Boulevard west of Red Bud Trail, lower lake; two-lane concrete ramp.", fee: "TPWD lists no fee", availability: "Year-round in TPWD listing; city (512) 974-6700." },
      { name: "Loop 360 / Pennybacker Bridge Ramp", operator: "Travis County", kind: "public-ramp", launch: "East side of Loop 360 below Pennybacker Bridge south of FM 2222; three-lane concrete ramp.", fee: "Entry and trailer fee required", availability: "Year-round per TPWD; Travis County (512) 854-7275." },
      { name: "Emma Long Metropolitan Park", operator: "City of Austin", kind: "park", launch: "1600 City Park Road off FM 2222, west lake; one-lane concrete ramp and camping.", fee: "Entrance fee required", availability: "Year-round per TPWD; city (512) 346-1831; check park restrictions and campsite booking." },
      { name: "Mary Quinlan Park", operator: "Travis County", kind: "park", launch: "From RR 620/FM 2222 follow Quinlan Park Road about 5.5 miles; one-lane concrete ramp.", fee: "TPWD lists no fee", availability: "TPWD lists sunrise–10 PM; Travis County (512) 854-7275." },
      { name: "Commons Ford Park", operator: "City of Austin", kind: "park", launch: "614 Commons Ford Road North; Bee Caves Road to Cuernavaca, then Commons Ford. Day-use shore recreation; no launch lane documented in TPWD summary.", fee: "TPWD lists no entrance fee", availability: "Year-round per TPWD; verify day-use status (512) 974-6700." },
      { name: "Selma Hughes Park (bank access only)", operator: "Travis County", kind: "park", launch: "Off Quinlan Park Road via Selma Hughes Road; bank fishing and shore access, NO boat ramp.", fee: "TPWD lists no fee", availability: "Sunrise to sunset per TPWD; Travis County (512) 854-7275." },
      { name: "Fritz Hughes Park (bank access only)", operator: "Travis County", kind: "park", launch: "Below Mansfield Dam from RR 620 to Low Water Crossing Road and Fritz Hughes Park Road; bank access, NO ramp.", fee: "TPWD lists no fee", availability: "Sunrise–10 PM per TPWD; Travis County (512) 854-7275." },
    ],
    nearbyLakes: [{slug:"lake-travis",name:"Lake Travis"},{slug:"lake-lbj",name:"Lake LBJ"},{slug:"lake-georgetown",name:"Lake Georgetown"}],
  },
  {
    slug: "fayette-county-reservoir", name: "Fayette County Reservoir", accessReviewedAt: "2026-10-12", tpwdSlug: "fayette", lcraHydrometSiteNumber: "5634", region: "prairies-lakes",
    summary: "A compact LCRA power-plant reservoir east of La Grange built around an excellent largemouth bass fishery and year-round warm-water structure.",
    surfaceAcres: 2400, maxDepthFeet: 70, impoundedYear: 1978, counties: ["Fayette"], nearestCities: ["La Grange", "Fayetteville"],
    waterway: "Power-plant cooling reservoir", riverBasin: "Colorado River Basin", authority: "Lower Colorado River Authority", conservationPool: "390 ft msl", fluctuation: "Stable", clarity: "Slightly to moderately stained",
    identity: "Fayette County Reservoir is a purpose-built warm-water bass destination. TPWD calls it first and foremost a largemouth lake, with year-round activity supported by the power-plant discharge.",
    habitat: ["Standing timber remains in the backs of some coves.", "Submerged tank dams, roadbeds, creek channels and dropoffs provide offshore structure.", "The warm-water discharge canal creates current and concentrates baitfish in cooler months."],
    fish: [
      fish("largemouth-bass","Largemouth bass","excellent","year-round","The lake's defining fishery stays active through much of the year, with a particularly strong late-winter-through-spring window.",["crankbaits","soft-plastics","topwater","live-bait"]),
      fish("catfish","Catfish","good","year-round","Channel, blue and flathead catfish provide a useful secondary fishery.",["cut-bait","live-bait"]),
      fish("sunfish","Sunfish","good","summer","Redear sunfish use shallow bedding areas and weed edges in late spring and summer.",["jigs-and-minnows"],"secondary"),
    ],
    access: "Park Prairie and Oak Thicket parks provide LCRA boat ramps, bank and pier fishing, picnic and camping facilities.", specialRules: true,     accessPoints: [
      { name: "Park Prairie Park", operator: "Lower Colorado River Authority", kind: "park", launch: "North shore about ten miles east of La Grange; from SH 159 take Park Prairie Road. Three-lane ramp and fishing pier.", fee: "Park fee required", availability: "TPWD lists year-round; LCRA (979) 249-3504. Reserve facilities through current LCRA reservation system." },
      { name: "Oak Thicket Park", operator: "Lower Colorado River Authority", kind: "park", launch: "North shore near Park Prairie Park; Oak Thicket Park Road off SH 159 two miles east of Park Prairie Road. Two-lane ramp and fishing pier.", fee: "Park fee required", availability: "Year-round TPWD listing; LCRA (979) 249-3504. Check campsite booking directly." },
    ],
    nearbyLakes: [{slug:"lake-somerville",name:"Lake Somerville"},{slug:"lake-austin",name:"Lake Austin"},{slug:"lake-bastrop",name:"Lake Bastrop"}],
    camping: {name:"Park Prairie and Oak Thicket parks",summary:"LCRA parks provide camping and fishing access; current reservations, fees and operating conditions should be verified before travel."},
  },
  {
    slug: "lake-somerville", name: "Lake Somerville", accessReviewedAt: "2026-10-12", tpwdSlug: "somerville", waterDataSlug: "somerville", region: "prairies-lakes",
    summary: "A Bryan–College Station-area reservoir with excellent largemouth, catfish and white/hybrid striped bass plus state-park access.",
    surfaceAcres: 11456, maxDepthFeet: 38, impoundedYear: 1967, counties: ["Washington", "Burleson", "Lee"], nearestCities: ["Somerville", "Brenham", "Bryan"],
    waterway: "Yegua Creek", riverBasin: "Brazos River Basin", authority: "U.S. Army Corps of Engineers", conservationPool: "238 ft msl", fluctuation: "Low to moderate, roughly 1–6 feet", clarity: "Slightly stained",
    identity: "Lake Somerville combines a high-quality spring white-bass run with strong hybrids, catfish, largemouth and unusually broad public recreation access near Bryan–College Station.",
    habitat: ["TPWD-installed fish habitat structures provide mapped targets.", "American lotus and hydrilla create vegetation where conditions support it.", "Creeks drive the early-spring white and hybrid bass pattern."],
    fish: [
      fish("largemouth-bass","Largemouth bass","excellent","spring","Vegetation and shallow cover support an excellent bass fishery.",["soft-plastics","spinnerbaits","crankbaits"]),
      fish("catfish","Catfish","excellent","year-round","Channel, blue and flathead catfish provide broad year-round opportunity.",["cut-bait","live-bait"]),
      fish("white-bass","White bass","excellent","spring","Early spring creek movement is the lake's signature white-bass pattern.",["jigs-and-minnows","live-bait"]),
      fish("hybrid-striped-bass","Hybrid striped bass","excellent","spring","Hybrids use creeks in early spring and follow open-water shad in summer and fall.",["trolling","vertical-jigging","live-bait"]),
      fish("crappie","Crappie","good","spring","Crappie provide a useful brush and spawning-cover fishery.",["jigs-and-minnows"]),
    ],
    access: "State-park, USACE and private facilities provide a large ramp network; flood conditions can temporarily close some sites.",     accessPoints: [
      { name: "Nails Creek State Park Unit", operator: "Texas Parks & Wildlife Department", kind: "park", launch: "From Giddings, east on US 290 for 7 miles, north on FM 180 about 13 miles; two-lane boat ramp.", fee: "State park fee applies", availability: "Year-round in TPWD listing; unit (979) 289-2392; check flood damage alerts." },
      { name: "Birch Creek State Park Unit", operator: "Texas Parks & Wildlife Department", kind: "park", launch: "From Somerville north on SH 36, then west on FM 60 and Park Road 57; two two-lane ramps and fishing jetty.", fee: "State park fee applies", availability: "Year-round TPWD listing; unit (979) 535-7763, check park alerts." },
      { name: "Rocky Creek Park", operator: "U.S. Army Corps of Engineers", kind: "park", launch: "From Somerville south on SH 36, west on FM 1948 toward Rocky Creek; public ramp.", fee: "TPWD lists a launch fee; verify current amount", availability: "Year-round per TPWD; verify flood/closure status with USACE (979) 596-1622." },
      { name: "Big Creek Park", operator: "Private operator listed by TPWD", kind: "park", launch: "From SH 36/FM 60 follow Recreational Road 4 west to Big Creek Park; boat ramp.", fee: "TPWD lists fee; confirm current amount", availability: "Year-round in TPWD inventory; verify private operator and current status." },
      { name: "Yegua Creek Park", operator: "U.S. Army Corps of Engineers", kind: "park", launch: "South on SH 36 from Somerville then FM 1948; two public ramps.", fee: "TPWD lists fee; verify current amount", availability: "Year-round per TPWD; verify high-water damage and USACE notices." },
      { name: "Overlook Park and Lake Somerville Marina", operator: "USACE park / private marina", kind: "marina", launch: "South on SH 36 from Somerville, FM 1948 west then first right to marina; public park and separately operated marina.", fee: "TPWD lists launch fee; confirm whether park or marina entrance", availability: "Year-round listed; verify Corps closures and marina operation." },
    ],
    nearbyLakes: [{slug:"fayette-county-reservoir",name:"Fayette County Reservoir"},{slug:"lake-conroe",name:"Lake Conroe"},{slug:"lake-bastrop",name:"Lake Bastrop"}],
    camping: {name:"Lake Somerville State Park",summary:"Nails Creek and Birch Creek units provide established camping and lake access; verify park alerts and reservations before travel."},
  },
  {
    slug: "belton-lake", name: "Belton Lake", accessReviewedAt: "2026-10-12", tpwdSlug: "belton", waterDataSlug: "belton", region: "prairies-lakes",
    summary: "A deep Central Texas reservoir with excellent smallmouth and hybrid striped bass plus good largemouth, white bass and catfish.",
    surfaceAcres: 12385, maxDepthFeet: 124, impoundedYear: 1954, counties: ["Bell", "Coryell"], nearestCities: ["Belton", "Temple", "Killeen"],
    waterway: "Leon River", riverBasin: "Brazos River Basin", authority: "U.S. Army Corps of Engineers", conservationPool: "594 ft msl", fluctuation: "About 3–5 feet", clarity: "Moderate",
    identity: "Belton Lake is one of Central Texas' more distinctive mixed fisheries, with excellent smallmouth and hybrid striped bass in addition to largemouth, white bass and catfish.",
    habitat: ["Steep rocky shoreline, tall bluffs and long rocky points dominate the main reservoir.", "Sand and mud flats occur farther up the Leon River and Cowhouse arms.", "TPWD and partners have added mapped fish-habitat structures."],
    fish: [
      fish("smallmouth-bass","Smallmouth bass","excellent","spring","Rocky mid- and lower-lake water supports an excellent smallmouth fishery.",["crankbaits","topwater","soft-plastics"]),
      fish("hybrid-striped-bass","Hybrid striped bass","excellent","year-round","Schooling hybrids are a defining open-water target.",["live-bait","trolling","vertical-jigging"]),
      fish("largemouth-bass","Largemouth bass","good","spring","Protected coves and creek backs are especially important around the spring spawn.",["spinnerbaits","soft-plastics","crankbaits"]),
      fish("white-bass","White bass","good","spring","Spring fish move into the Leon River and upper reservoir.",["jigs-and-minnows","live-bait"]),
      fish("catfish","Catfish","good","year-round","Channel and flathead catfish add year-round bait fishing.",["cut-bait","live-bait"]),
    ],
    access: "USACE parks provide boat ramps, bank-fishing access, camping and courtesy docks; marinas provide additional supplies and fuel.",     accessPoints: [
      { name: "Cedar Ridge Park", operator: "U.S. Army Corps of Engineers", kind: "park", launch: "TPWD lists a Corps-operated Cedar Ridge access area with boat ramp and lakeside camping amenities; verify entrance and launch at the USACE/TPWD map.", fee: "TPWD says many Corps parks charge day-use fees; verify specific facility", availability: "Contact USACE about current ramp, camping and parking availability." },
      { name: "Westcliff Park", operator: "U.S. Army Corps of Engineers", kind: "park", launch: "TPWD identifies Westcliff Park boat access, picnic and camping amenities; confirm official approach on the operator map.", fee: "Check current Corps day-use and launch charges", availability: "USACE access status and campsite booking must be confirmed." },
      { name: "Temple Lake Park", operator: "U.S. Army Corps of Engineers", kind: "park", launch: "TPWD lists Temple Lake Park as a boat-access and picnicking facility on Belton Lake.", fee: "Check current Corps day-use and launch charges", availability: "Confirm current season, park openings and low-water access with the USACE." },
    ],
    nearbyLakes: [{slug:"stillhouse-hollow-reservoir",name:"Stillhouse Hollow Reservoir"},{slug:"lake-whitney",name:"Lake Whitney"}],
  },
  {
    slug: "stillhouse-hollow-reservoir", name: "Stillhouse Hollow Reservoir", accessReviewedAt: "2026-10-12", tpwdSlug: "stillhouse_hollow", waterDataSlug: "stillhouse-hollow", region: "prairies-lakes",
    summary: "A very clear, deep Central Texas reservoir with good largemouth and smallmouth bass, hydrilla and rocky structure.",
    surfaceAcres: 6429, maxDepthFeet: 107, impoundedYear: 1968, counties: ["Bell"], nearestCities: ["Belton", "Temple", "Killeen"],
    waterway: "Lampasas River", riverBasin: "Brazos River Basin", authority: "U.S. Army Corps of Engineers", conservationPool: "622 ft msl", fluctuation: "About 3–4 feet", clarity: "Very clear",
    identity: "Stillhouse Hollow is a clear-water counterpart to nearby Belton Lake, built around rocky shoreline, hydrilla and year-round black-bass structure.",
    habitat: ["Steep rocky main-lake shoreline dominates the reservoir.", "Hydrilla beds are important in the lower lake.", "Upper-lake laydowns, brush and standing timber add stained-water cover.", "TPWD and local partners have installed mapped fish-attractor sites."],
    fish: [
      fish("largemouth-bass","Largemouth bass","good","spring","Spring and fall are strongest around rocky points and hydrilla.",["topwater","soft-plastics","crankbaits"]),
      fish("smallmouth-bass","Smallmouth bass","good","year-round","Rocky points and riprap support year-round smallmouth opportunity.",["topwater","crankbaits","soft-plastics"]),
      fish("catfish","Catfish","fair","year-round","Channel and flathead catfish provide a secondary river and flat fishery.",["cut-bait","live-bait"]),
      fish("crappie","Crappie","poor","year-round","Crappie occur around cedar bushes and submerged brush but are not a primary lake draw.",["jigs-and-minnows"],"secondary"),
    ],
    access: "USACE recreation areas provide ramps and shoreline access; verify current lake level and closures before towing.",     accessPoints: [
      { name: "Stillhouse Park", operator: "U.S. Army Corps of Engineers", kind: "park", launch: "Downlake north shore; from I-35 take US 190 west to park signs. Four-lane ramp next to marina.", fee: "TPWD lists day-use fee", availability: "Year-round TPWD listing; Corps (254) 939-2461; confirm alerts." },
      { name: "Dana Peak Park", operator: "U.S. Army Corps of Engineers", kind: "park", launch: "North shore midlake: US 190 west, south on FM 2410 to park signs. Four-lane ramp and fishing dock.", fee: "TPWD lists fee", availability: "Year-round per TPWD; Corps (254) 939-2461." },
      { name: "Cedar Gap Park", operator: "U.S. Army Corps of Engineers", kind: "park", launch: "Uplake north shore off FM 2410 from US 190. One-lane launch.", fee: "TPWD lists no fee", availability: "Year-round TPWD listing; USACE (254) 939-2461." },
    ],
    nearbyLakes: [{slug:"belton-lake",name:"Belton Lake"},{slug:"lake-whitney",name:"Lake Whitney"}],
  },
  {
    slug: "caddo-lake", name: "Caddo Lake", accessReviewedAt: "2026-10-12", tpwdSlug: "caddo", waterDataSlug: "caddo", region: "piney-woods",
    summary: "A natural East Texas–Louisiana border lake defined by cypress habitat, trophy-capable largemouth bass, crappie, white bass and chain pickerel.",
    surfaceAcres: 26800, maxDepthFeet: 20, impoundedYear: 1914, counties: ["Harrison", "Marion"], nearestCities: ["Karnack", "Marshall", "Jefferson"],
    waterway: "Big Cypress Bayou", riverBasin: "Cypress River Basin", authority: "U.S. Army Corps of Engineers", conservationPool: "168.5 ft msl", fluctuation: "About 4–8 feet", clarity: "Moderately clear to stained",
    identity: "Caddo Lake is unlike almost every other major Texas fishing destination: a shallow cypress-and-bayou natural lake on the Louisiana line with strong bass, crappie, white-bass and chain-pickerel identity.",
    habitat: ["Bald cypress, aquatic vegetation, bayous and backwater channels create a complex shallow-water fishery.", "Navigation routes and marked channels matter because of timber and shallow habitat.", "Texas and Louisiana rules both matter on this border water."],
    fish: [
      fish("largemouth-bass","Largemouth bass","excellent","spring","Trophy-capable bass use cypress, vegetation, channels and shallow cover.",["soft-plastics","spinnerbaits","topwater"]),
      fish("crappie","Crappie","good","spring","Quality crappie use timber, channels and spawning cover.",["jigs-and-minnows"]),
      fish("white-bass","White bass","good","spring","White bass add a seasonal river-and-bayou schooling fishery.",["jigs-and-minnows","topwater"]),
      fish("catfish","Catfish","good","year-round","Channel, blue and flathead catfish provide seasonal and year-round opportunities.",["cut-bait","live-bait"]),
      fish("sunfish","Sunfish","good","summer","Shallow vegetated habitat supports accessible sunfish fishing.",["jigs-and-minnows"]),
    ],
    access: "Caddo Lake State Park, public ramps and private marinas provide boat access, fishing piers and lodging/camping options.", specialRules: true,     accessPoints: [
      { name: "Highway 43 Ramp", operator: "Harrison County", kind: "public-ramp", launch: "South bank of Cypress Bayou upstream of lake, Texas 43 east from Marshall; two-lane concrete ramp.", fee: "TPWD lists no fee", availability: "Year-round per TPWD; Harrison County (903) 935-4808." },
      { name: "Caddo Lake State Park", operator: "Texas Parks & Wildlife Department", kind: "park", launch: "From US 59 north of Marshall, SH 43 east to FM 2198, then one mile to park; two-lane ramp and pier, cabins and camping.", fee: "Park entrance fee", availability: "Year-round TPWD listing; check park reservations and alerts." },
      { name: "Shady Glade Marina", operator: "Private marina", kind: "marina", launch: "West bank near Uncertain, east from Marshall on SH 43 and FM 2198; one-lane concrete ramp, 20 spaces.", fee: "TPWD lists launch fee", availability: "Year-round listing; confirm private operator (903) 789-3295." },
      { name: "Tucker's Hunting and Fishing Camp", operator: "Private resort", kind: "resort", launch: "121 Private Road 2622, Karnack, near FM 9/Tucker Road; two single-lane ramps.", fee: "TPWD lists launch fee", availability: "Year-round listing; confirm private operation (903) 601-4320." },
    ],
    nearbyLakes: [{slug:"lake-o-the-pines",name:"Lake O' the Pines"},{slug:"lake-bob-sandlin",name:"Lake Bob Sandlin"}],
    camping: {name:"Caddo Lake State Park",summary:"The state park provides an improved ramp, fishing pier, cabins, shelters and campsites; verify park alerts and reservations."},
  },
  {
    slug: "lake-o-the-pines", name: "Lake O' the Pines", accessReviewedAt: "2026-10-12", tpwdSlug: "lop", waterDataSlug: "lake-o-the-pines", region: "piney-woods",
    summary: "A heavily vegetated East Texas reservoir with excellent largemouth bass, crappie and channel catfish plus strong white bass.",
    surfaceAcres: 19780, maxDepthFeet: 49.5, impoundedYear: 1958, counties: ["Marion", "Morris", "Upshur", "Camp"], nearestCities: ["Jefferson", "Ore City", "Longview"],
    waterway: "Big Cypress Creek", riverBasin: "Cypress River Basin", authority: "U.S. Army Corps of Engineers", conservationPool: "Seasonal pool around 228.5–230 ft msl", fluctuation: "About 4–5 feet annually", clarity: "Moderately clear",
    identity: "Lake O' the Pines is one of East Texas' most balanced warmwater fisheries, combining heavy aquatic vegetation with excellent bass, crappie and channel-catfish populations.",
    habitat: ["Hydrilla, buttonbush, water primrose and lotus can cover a meaningful share of the reservoir.", "Artificial fish habitat supplements natural vegetation and timber.", "Creek arms and shoreline vegetation create extensive spawning and ambush cover."],
    fish: [
      fish("largemouth-bass","Largemouth bass","excellent","spring","An abundant bass population uses vegetation and creek-oriented cover.",["soft-plastics","spinnerbaits","topwater"]),
      fish("crappie","Crappie","excellent","spring","Black and white crappie are abundant, with black crappie especially important.",["jigs-and-minnows"]),
      fish("channel-catfish","Channel catfish","excellent","year-round","Channel catfish are a major year-round fishery.",["cut-bait","live-bait"]),
      fish("white-bass","White bass","good","spring","Native white bass provide a strong seasonal schooling fishery.",["jigs-and-minnows","topwater"]),
      fish("catfish","Catfish","good","year-round","Blue and flathead catfish broaden the catfish opportunity.",["cut-bait","live-bait"]),
    ],
    access: "USACE, Marion County and private marinas provide ramps; the Corps maintains free ramps in addition to developed parks.", specialRules: true,     historySourceUrl: "https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/otp/index.asp",
    historyNotes: [
      "Lake O' the Pines was built on Big Cypress Bayou near Jefferson as part of a larger regional flood-control strategy for the Red River basin below Denison Dam, authorized by the federal Flood Control Act of 1946.",
      "Construction began in 1955; deliberate impoundment started in August 1957 and the reservoir became operational in 1959. These dates describe separate milestones, which is why some historical records assign different single 'built' years.",
      "The U.S. Army Corps of Engineers remains the dam operator. The reservoir's water-supply, habitat and recreation roles now link multiple Piney Woods counties, marinas, campgrounds and the larger Cypress Bayou watershed.",
    ],
    accessPoints: [
      { name: "Lone Star Landing", operator: "U.S. Army Corps of Engineers", kind: "public-ramp", launch: "From Lone Star south on US 259 and left onto FM 729 before Big Cypress Creek crossing, then signed ramp spur.", fee: "TPWD lists no launch fee", availability: "Year-round TPWD listing; USACE (903) 665-2336." },
      { name: "Cedar Springs Ramp", operator: "U.S. Army Corps of Engineers", kind: "park", launch: "South shore upriver off SH 155 from US 259 near Ore City; follow Cedar Springs ramp signs.", fee: "TPWD lists launch fee", availability: "Year-round TPWD listing; verify USACE conditions and primitive campsite use." },
      { name: "Pine Hill Ramp", operator: "U.S. Army Corps of Engineers", kind: "public-ramp", launch: "South shore midlake, about 12 miles northwest from Harleton on FM 450, signed county road to ramp.", fee: "TPWD lists no fee", availability: "Year-round TPWD listing; USACE (903) 665-2336." },
      { name: "Brushy Creek Campground", operator: "U.S. Army Corps of Engineers", kind: "park", launch: "Lake O' the Pines Corps campground and water-access park; check official USACE entrance map for exact road.", fee: "TPWD lists day-use and camping fees depending on site", availability: "Campsites with water/electric noted by TPWD; check current USACE opening and reservations." },
    ],
    nearbyLakes: [{slug:"caddo-lake",name:"Caddo Lake"},{slug:"lake-bob-sandlin",name:"Lake Bob Sandlin"}],
    camping: {name:"Lake O' the Pines recreation areas",summary:"Developed and primitive USACE camping areas surround the reservoir; verify current ramp and campground conditions."},
    travelAlerts: ["TPWD notes a special live-nongame-fish transport restriction in Big Cypress Bayou below the dam and connected Texas waters of Caddo Lake; check the current rule before collecting or transporting bait."],
  },
  {
    slug: "lake-bob-sandlin", name: "Lake Bob Sandlin", accessReviewedAt: "2026-10-12", tpwdSlug: "bob_sandlin", waterDataSlug: "bob-sandlin", region: "piney-woods",
    summary: "A 9,004-acre East Texas reservoir near Mount Pleasant with good bass, crappie, white bass, catfish and state-park access.",
    surfaceAcres: 9004, maxDepthFeet: 65.6, impoundedYear: 1977, counties: ["Titus", "Camp", "Franklin"], nearestCities: ["Mount Pleasant", "Pittsburg"],
    waterway: "Big Cypress Creek", riverBasin: "Cypress River Basin", authority: "Titus County Freshwater Supply District", conservationPool: "337.5 ft msl", fluctuation: "About 2–3 feet annually", clarity: "Moderate, roughly 2–4 feet visibility",
    identity: "Lake Bob Sandlin is a well-rounded East Texas fishery with enough bass, white bass, catfish and crappie depth to support multi-species trips, plus a state park directly on the shoreline.",
    habitat: ["Inundated timber and aquatic vegetation provide the main natural cover.", "Hydrilla is the dominant aquatic plant where vegetation is present.", "TPWD and partners maintain multiple artificial fish-habitat sites.", "Boat docks and fishing piers add developed structure."],
    fish: [
      fish("largemouth-bass","Largemouth bass","good","year-round","A moderately abundant population uses vegetation, timber and docks.",["soft-plastics","spinnerbaits","crankbaits"]),
      fish("crappie","Crappie","good","spring","Good numbers of legal-size crappie use timber and artificial habitat.",["jigs-and-minnows"]),
      fish("white-bass","White bass","good","spring","White bass are abundant enough to support a popular seasonal fishery.",["jigs-and-minnows","topwater"]),
      fish("catfish","Catfish","good","year-round","Channel catfish provide broad bait-fishing opportunity.",["cut-bait","live-bait"]),
      fish("sunfish","Sunfish","good","summer","Redear and other sunfish create accessible family fishing.",["jigs-and-minnows"]),
    ],
    access: "Public ramps, Lake Bob Sandlin State Park and local facilities provide lake access; verify current operating conditions.",     accessPoints: [
      { name: "Public Ramp 1 / Titus County Supply District", operator: "Titus County Freshwater Supply District", kind: "public-ramp", launch: "NW of dam via FM 3417 and SW 37th Street off US 271 between Mount Pleasant and Pittsburg; concrete ramp.", fee: "TPWD lists no fee", availability: "Year-round listing; district (903) 572-1844." },
      { name: "Highway 21 Bridge South", operator: "Camp County", kind: "public-ramp", launch: "Mid-lake south shore off SH 21, north 3.6 miles from Pittsburg and left before bridge; unimproved ramp.", fee: "TPWD lists no fee", availability: "Year-round listing; Camp County (903) 856-3845." },
      { name: "Lake Bob Sandlin State Park", operator: "Texas Parks & Wildlife Department", kind: "park", launch: "From Pittsburg, SH 11 west to SH 21 north; across bridge to signed park; two-lane ramp, fishing pier and camping.", fee: "State park entrance fee", availability: "Year-round TPWD listing; park (903) 572-5531." },
      { name: "Barefoot Bay Marina", operator: "Private marina", kind: "marina", launch: "Southwest of dam, west from Pittsburg on SH 11 to FM 1520 north, across Barefoot Bay to marina.", fee: "TPWD lists fee", availability: "Year-round listing; confirm private operation (903) 856-3643." },
    ],
    nearbyLakes: [{slug:"lake-o-the-pines",name:"Lake O' the Pines"},{slug:"lake-fork",name:"Lake Fork"},{slug:"lake-tyler",name:"Lake Tyler (East and West)"},{slug:"lake-cypress-springs",name:"Lake Cypress Springs"}],
    camping: {name:"Lake Bob Sandlin State Park",summary:"The state park provides camping and direct lake access; verify reservations, alerts and ramp conditions before travel."},
  },
  {
    slug: "lake-nacogdoches", name: "Lake Nacogdoches", accessReviewedAt: "2026-10-12", tpwdSlug: "nacogdoches", waterDataSlug: "nacogdoches", region: "piney-woods",
    summary: "A compact East Texas trophy-bass reservoir with hydrilla, lotus, docks and an excellent largemouth population.",
    surfaceAcres: 2212, maxDepthFeet: 40, impoundedYear: 1976, counties: ["Nacogdoches"], nearestCities: ["Nacogdoches"],
    waterway: "Loco Bayou", riverBasin: "Angelina-Neches River Basin", authority: "City of Nacogdoches", conservationPool: "279 ft msl", fluctuation: "About 1–3 feet", clarity: "Moderately clear",
    identity: "Lake Nacogdoches earns statewide search value far beyond its size because TPWD describes an excellent largemouth population and the reservoir has a long trophy-bass identity.",
    habitat: ["Hydrilla and American lotus provide the dominant natural cover.", "Boat docks add year-round structure.", "Vegetation edges, points and creek channels define the main bass framework.", "Artificial habitat sites supplement natural cover."],
    fish: [
      fish("largemouth-bass","Largemouth bass","excellent","spring","Bass numbers are high and the lake is known for trophy-size potential.",["crankbaits","spinnerbaits","topwater","soft-plastics"]),
      fish("sunfish","Sunfish","good","summer","Bluegill and redear are abundant and peak around late-spring and summer beds.",["jigs-and-minnows"]),
      fish("crappie","Crappie","fair","spring","Crappie are present but secondary to bass and sunfish.",["jigs-and-minnows"],"secondary"),
    ],
    access: "City-managed lake access serves boat and bank anglers; verify permits, hours and current rules with the City of Nacogdoches.", specialRules: true,     accessPoints: [
      { name: "Eastside Park", operator: "City of Nacogdoches", kind: "park", launch: "Off CR 225 about eight miles west of Nacogdoches Loop 224, north at park signs. One-lane ramp, bank fishing, picnic/swim area.", fee: "TPWD lists no fee", availability: "Year-round; TPWD says park closes at 10 PM; city (936) 559-2960." },
      { name: "Westside Park", operator: "City of Nacogdoches", kind: "park", launch: "Off CR 225 about nine miles west of Nacogdoches Loop 224; north at park sign. Two-lane ramp and a two-thirds-mile nature trail.", fee: "TPWD lists no fee", availability: "Year-round; TPWD says closes at 10 PM; city (936) 559-2960." },
    ],
    nearbyLakes: [{slug:"sam-rayburn-reservoir",name:"Sam Rayburn Reservoir"},{slug:"lake-palestine",name:"Lake Palestine"},{slug:"lake-tyler",name:"Lake Tyler (East and West)"}],
  },
  {
    slug: "calaveras-lake", name: "Calaveras Lake", accessReviewedAt: "2026-10-12", tpwdSlug: "calaveras", region: "south-texas",
    summary: "A San Antonio-area power reservoir with excellent catfish and hybrid striped bass plus largemouth bass and a distinctive stocked red-drum fishery.",
    surfaceAcres: 3624, maxDepthFeet: 45, impoundedYear: 1969, counties: ["Bexar"], nearestCities: ["San Antonio", "Elmendorf"],
    waterway: "Calaveras Creek", riverBasin: "San Antonio River Basin", authority: "CPS Energy", conservationPool: "Seasonal normal level around 484–485 ft msl", fluctuation: "About 1–2 feet", clarity: "Moderately stained",
    identity: "Calaveras is one of Texas' most distinctive urban freshwater destinations: channel catfish and hybrids lead the catch while stocked red drum create a fishery normally associated with the coast.",
    habitat: ["Cattails and bulrush line portions of the shoreline.", "Riprap around the dam, intake canal and developed shoreline creates major structure.", "Power-plant operations influence water temperature and fish distribution."],
    fish: [
      fish("catfish","Catfish","excellent","spring","Channel catfish are the most sought-after species and peak strongly in spring.",["cut-bait","live-bait"]),
      fish("hybrid-striped-bass","Hybrid striped bass","excellent","spring","A long winter-through-summer window centers on baitfish and open-water structure.",["vertical-jigging","trolling","live-bait"]),
      fish("red-drum","Red drum","excellent","spring","Stocked red drum create one of Texas freshwater fishing's most unusual opportunities, with TPWD highlighting a strong March-through-summer window.",["live-bait","crankbaits"]),
      fish("largemouth-bass","Largemouth bass","fair","spring","Spring fish concentrate in bulrush and riprap around the dam and intake.",["soft-plastics","crankbaits","spinnerbaits"],"secondary"),
    ],
    access: "Calaveras Park provides the principal public boat ramps, shoreline access, camping and picnic facilities; entry and use fees apply.", specialRules: true, liveDataNote: "No public real-time pool-elevation feed is currently published for Calaveras Lake. TPWD lists normal water levels of 485.0 ft MSL in summer and 484.0 ft MSL in winter, with typical fluctuation of 1–2 feet. CPS Energy is the controlling authority; use its current lake notices and TPWD updates before travel.",     accessPoints: [
      { name: "Calaveras Park", operator: "CPS Energy recreation area; TPWD lists contract operator", kind: "park", launch: "Off Stuart Road, about 20 miles southeast of San Antonio via Loop 1604 east from US 181. Two four-lane ramps separated by about a quarter mile; shoreline camping and RV sites.", fee: "TPWD lists day-use, ramp and overnight fees", availability: "Gated hours and operator may change; verify current CPS Energy park access and campsites (210) 635-8359." },
    ],
    nearbyLakes: [{slug:"choke-canyon-reservoir",name:"Choke Canyon Reservoir"},{slug:"lake-lbj",name:"Lake LBJ"},{slug:"medina-lake",name:"Medina Lake"}],
    camping: {name:"Calaveras Park",summary:"The lake's public access park provides camping and shoreline facilities; verify current rules, reservations and operating hours."},
  },
  {
    slug: "lake-corpus-christi", name: "Lake Corpus Christi", accessReviewedAt: "2026-10-12", tpwdSlug: "corpus_christi", waterDataSlug: "corpus-christi", region: "gulf-coast",
    summary: "A South Texas reservoir northwest of Corpus Christi with excellent catfish and alligator gar plus good largemouth, white bass and crappie.",
    surfaceAcres: 18256, maxDepthFeet: 60, impoundedYear: 1958, counties: ["San Patricio", "Live Oak", "Jim Wells"], nearestCities: ["Mathis", "Corpus Christi", "George West"],
    waterway: "Nueces River", riverBasin: "Nueces River Basin", authority: "City of Corpus Christi", conservationPool: "94 ft msl", fluctuation: "High and frequent, roughly 5–10 feet", clarity: "Stained to partly clear",
    identity: "Lake Corpus Christi mixes a classic South Texas reservoir fishery with excellent catfish and alligator-gar opportunity, seasonal white bass and direct state-park access.",
    habitat: ["Steep rocky banks, flooded timber, shallow brushy flats and creek channels create varied structure.", "Cattails, rushes, water lettuce and water hyacinth occur in isolated or changing beds.", "The Nueces River channel drives cooler-season white-bass movement."],
    fish: [
      fish("catfish","Catfish","excellent","year-round","Blue catfish dominate a broad channel, blue and flathead fishery.",["cut-bait","live-bait"]),
      fish("alligator-gar","Alligator gar","excellent","year-round","The reservoir supports a notable trophy-capable alligator-gar fishery.",["live-bait"],"primary"),
      fish("largemouth-bass","Largemouth bass","good","spring","Bass use rocky banks, brush, weeds and creek-channel structure.",["spinnerbaits","topwater","crankbaits","soft-plastics"]),
      fish("white-bass","White bass","good","winter","Cooler months concentrate fish in the Nueces River channel before spring movement.",["jigs-and-minnows","vertical-jigging"]),
      fish("crappie","Crappie","good","spring","Crappie use park-area cover, brush and spawning habitat.",["jigs-and-minnows"]),
    ],
    access: "Lake Corpus Christi State Park provides camping, shoreline fishing and boat ramps, with additional private facilities around the reservoir.",     accessPoints: [
      { name: "Lake Corpus Christi State Park", operator: "Texas Parks & Wildlife Department", kind: "park", launch: "TPWD state park provides two boat ramps, campgrounds, day-use recreation and designated swimming shore. Consult park map for exact entrance.", fee: "State park fee", availability: "Check park alerts, ramp status and campground bookings (361) 547-2635." },
      { name: "Sunrise Beach", operator: "Private operator in TPWD inventory", kind: "resort", launch: "TPWD identifies Sunrise Beach on Lake Corpus Christi as ramp and overnight recreation access; follow official access map for entrance.", fee: "Confirm private launch/camping fees", availability: "Verify business currently operates and lake level permits boat launch." },
      { name: "Weber's Landing", operator: "Private operator in TPWD inventory", kind: "marina", launch: "TPWD identifies Weber's Landing as a lake access/camping location. Confirm exact location from the source map before driving.", fee: "Verify charges", availability: "Confirm private operation, shoreline and ramp availability." },
    ],
    nearbyLakes: [{slug:"choke-canyon-reservoir",name:"Choke Canyon Reservoir"},{slug:"falcon-international-reservoir",name:"Falcon International Reservoir"}],
    camping: {name:"Lake Corpus Christi State Park",summary:"The state park provides campgrounds, overnight facilities, shoreline fishing and boat access; verify park alerts and reservations."},
  },
  {
    slug: "alan-henry-reservoir", name: "Alan Henry Reservoir", accessReviewedAt: "2026-10-12", tpwdSlug: "alan_henry", waterDataSlug: "alan-henry", region: "panhandle",
    summary: "A deep reservoir south of Lubbock with trophy-capable largemouth bass, spotted bass, crappie and catfish.",
    surfaceAcres: 2880, maxDepthFeet: 100, impoundedYear: 1993, counties: ["Garza", "Kent"], nearestCities: ["Lubbock", "Justiceburg", "Post"],
    waterway: "Double Mountain Fork Brazos River", riverBasin: "Brazos River Basin", authority: "City of Lubbock", conservationPool: "2,220 ft msl", fluctuation: "Moderate, roughly 2–4 feet per year", clarity: "Murky to clear, roughly 1–4 feet visibility",
    identity: "Alan Henry is one of West Texas' highest-value bass destinations, with a strong trophy largemouth reputation and a distinctive Alabama-spotted-bass component.",
    habitat: ["Flooded trees provide much of the reservoir's primary fish cover.", "Steep shoreline and deep water make electronics and depth control important.", "Upper coves support much of the crappie habitat."],
    fish: [
      fish("largemouth-bass","Largemouth bass","excellent","spring","The lake has a long trophy-bass identity and multiple ShareLunker-class fish.",["soft-plastics","crankbaits","spinnerbaits"]),
      fish("spotted-bass","Spotted bass","good","year-round","Alabama-spotted-bass stockings created a high-catch secondary black-bass fishery.",["crankbaits","soft-plastics"]),
      fish("crappie","Crappie","good","spring","Crappie are most abundant in upper-lake coves and suitable cover.",["jigs-and-minnows"]),
      fish("catfish","Catfish","good","year-round","Channel and flathead catfish round out the reservoir's major targets.",["cut-bait","live-bait"]),
    ],
    access: "Sam Wahl Recreation Area provides the principal public launch, fishing pier and primitive camping access; shoreline access is otherwise limited.", specialRules: true,     accessPoints: [
      { name: "Sam Wahl Recreation Area", operator: "City of Lubbock", kind: "park", launch: "From US 84/FM 2458, east on FM 2458 four miles, then FM 3519 three miles to signed lake entrance; four-lane ramp and about 100 spaces.", fee: "Boat-launch fee required", availability: "Year-round listing; City of Lubbock (806) 629-4259. Restrooms can be a long uphill walk from pier." },
    ],
    nearbyLakes: [{slug:"lake-meredith",name:"Lake Meredith"},{slug:"o-h-ivie-lake",name:"O.H. Ivie Lake"}],
    camping: {name:"Sam Wahl Recreation Area",summary:"Primitive camping and self-contained RV parking are available near the main lake access; verify current city rules and fees."},
    consumptionSourceUrl: "https://tpwd.texas.gov/regulations/outdoor-annual/fishing/general-rules-regulations/fish-consumption-bans-and-advisories",
    travelAlerts: ["A TPWD-listed mercury fish-consumption advisory applies to Lake Alan Henry. Check the current Texas fish-consumption advisory for affected species and vulnerable groups before eating the catch."],
  },
  {
    slug: "lake-meredith", name: "Lake Meredith", accessReviewedAt: "2026-10-12", tpwdSlug: "meredith", waterDataSlug: "meredith", region: "panhandle",
    summary: "A dramatic Canadian River reservoir near Amarillo with Texas' standout walleye fishery plus smallmouth, largemouth, crappie, white bass and catfish.",
    surfaceAcres: 16411, maxDepthFeet: 127, impoundedYear: 1965, counties: ["Hutchinson", "Moore", "Potter"], nearestCities: ["Fritch", "Borger", "Amarillo"],
    waterway: "Canadian River", riverBasin: "Canadian River Basin", authority: "National Park Service", conservationPool: "2,941 ft msl", fluctuation: "Moderate to severe, roughly 4–10 feet per year", clarity: "Turbid upper reservoir; clear lower reservoir",
    identity: "Lake Meredith is the Texas Panhandle's most distinctive large-reservoir fishery. TPWD identifies walleye as the primary sport fish, while rocky habitat supports an emerging smallmouth population and broad warmwater opportunity.",
    habitat: ["Steep rocky banks, rock ledges, piles and dropoffs dominate the reservoir.", "The upper reservoir is much more turbid than the clear lower lake.", "Flooded timber and limited milfoil/cattail beds provide localized cover."],
    fish: [
      fish("walleye","Walleye","excellent","spring","Walleye are Lake Meredith's primary sport fish, with TPWD identifying April through June as the peak period.",["jigs-and-minnows","crankbaits"]),
      fish("smallmouth-bass","Smallmouth bass","fair","spring","Rocky shorelines, large structure and dropoffs fit the lake's growing smallmouth population.",["crankbaits","soft-plastics"]),
      fish("largemouth-bass","Largemouth bass","good","spring","Largemouth bass are less dominant than walleye but use localized cover and structure.",["crankbaits","soft-plastics"]),
      fish("crappie","Crappie","good","spring","Crappie fishing is generally good and can become excellent in strong year classes.",["jigs-and-minnows"]),
      fish("catfish","Catfish","good","year-round","Channel catfish are present in good numbers.",["cut-bait","live-bait"]),
      fish("white-bass","White bass","fair","spring","White bass remain a secondary schooling target as the fishery rebuilds from historic drought impacts.",["vertical-jigging","topwater"],"secondary"),
    ],
    access: "National Park Service access includes multiple ramps when water levels allow, camping/picnic areas and an ADA-accessible fishing pier.",     accessPoints: [
      { name: "Sanford Yake", operator: "National Park Service", kind: "park", launch: "East Fritch: Hwy 136 to Eagle Blvd, Fritch Fortress Road, High Plains Road and Sanford Yake Road. Four-lane ramp and about 50 spaces.", fee: "Verify NPS recreation-area fees", availability: "TPWD lists year-round; call NPS (806) 857-3151 about current level and closure." },
      { name: "Cedar Canyon", operator: "National Park Service", kind: "park", launch: "East Fritch near Sanford Yake corridor, signed turn to Cedar Canyon; four-lane ramp and about 30 spaces.", fee: "Verify NPS fees", availability: "TPWD says launch works above a listed lake-stage threshold; call NPS instead of relying on historic elevation cutoffs." },
      { name: "Fritch Fortress", operator: "National Park Service", kind: "park", launch: "East Fritch via Fritch Fortress Highway about four miles; four-lane ramp and around 30 spaces.", fee: "Verify NPS fees", availability: "Year-round listed but deep-water use depends on lake level; verify with NPS." },
      { name: "Harbor Bay", operator: "National Park Service", kind: "park", launch: "West Fritch, Hwy 136 at Lakeview Drive, then north two miles; two-lane ramp, about 30 spaces.", fee: "Verify NPS fees", availability: "TPWD gives a limited lake-stage operating band; call NPS for current open/closed status." },
      { name: "Blue West", operator: "National Park Service", kind: "park", launch: "About 12 miles south of Dumas via FM 1913 east and Blue West Road. Two-lane ramp, about 10 spaces.", fee: "Verify NPS fees", availability: "TPWD says usable above a level threshold; confirm current conditions with NPS (806) 857-3151." },
      { name: "Spring Canyon fishing pier", operator: "National Park Service", kind: "park", launch: "Near Fritch; TPWD identifies one ADA-accessible fishing pier at Spring Canyon; this is not a general boat launch.", fee: "Verify recreation-area access", availability: "Confirm accessibility and shoreline path with NPS." },
      { name: "Plum Creek", operator: "National Park Service", kind: "park", launch: "From FM 1913/US 287 travel east on FM 1913 to Plum Creek Road; small-boat access in TPWD inventory.", fee: "Verify NPS fees", availability: "Only usable above lake-stage threshold; confirm NPS current level before driving." },
    ],
    nearbyLakes: [{slug:"alan-henry-reservoir",name:"Alan Henry Reservoir"},{slug:"o-h-ivie-lake",name:"O.H. Ivie Lake"},{slug:"lake-sweetwater",name:"Lake Sweetwater"}],
    camping: {name:"Lake Meredith National Recreation Area",summary:"The National Park Service manages developed and primitive camping around the reservoir; ramp availability depends on water level."},
    consumptionSourceUrl: "https://tpwd.texas.gov/regulations/outdoor-annual/fishing/general-rules-regulations/fish-consumption-bans-and-advisories",
    travelAlerts: ["TPWD links to a fish-consumption advisory for Lake Meredith. Consult the current Texas Department of State Health Services notice before eating fish from the reservoir."],
  },
  {
    slug: "lake-houston", name: "Lake Houston", accessReviewedAt: "2026-10-12", tpwdSlug: "houston", waterDataSlug: "houston", region: "gulf-coast",
    summary: "An 11,854-acre San Jacinto River reservoir on Houston's northeast side where blue catfish and spring white-bass runs anchor a metro-accessible multi-species fishery.",
    surfaceAcres: 11854, maxDepthFeet: 45, impoundedYear: 1954, counties: ["Harris"], nearestCities: ["Houston", "Humble", "Kingwood"],
    waterway: "West Fork San Jacinto River", riverBasin: "San Jacinto River Basin", authority: "Coastal Water Authority", conservationPool: "44.1 ft msl", fluctuation: "Low", clarity: "Moderately turbid",
    identity: "Lake Houston is the Houston metro's river-channel fishing lake: TPWD identifies blue catfish as the dominant sportfish, with good spring white-bass runs and additional largemouth, crappie and bluegill opportunity where cover exists.",
    habitat: ["Very little structural cover exists across much of the main reservoir.", "Upper areas of the east and west forks hold more flooded terrestrial and native emergent vegetation.", "Water hyacinth, alligatorweed and water lettuce can add shallow cover, while river channels remain central to catfish and white-bass patterns."],
    fish: [
      fish("blue-catfish","Blue catfish","good","year-round","Blue catfish are the dominant sportfish and are especially important along channels in the east and west forks of the San Jacinto River.",["cut-bait","live-bait"]),
      fish("white-bass","White bass","good","spring","Spring spawning runs concentrate white bass in the east and west forks.",["vertical-jigging","jigs-and-minnows"]),
      fish("largemouth-bass","Largemouth bass","fair","year-round","Bass opportunity is best where anglers find the reservoir's limited cover and upper-river vegetation.",["soft-plastics","spinnerbaits"],"secondary"),
      fish("crappie","Crappie","fair","year-round","Crappie provide a secondary fishery around the reservoir's limited structural and vegetated cover.",["jigs-and-minnows"],"secondary"),
    ],
    access: "TPWD lists commercial access in the upper reservoir, Deussen Park near the dam for boat and bank fishing, and bank access beneath the FM 1960 bridge; verify current facility status before travel.",
        accessPoints: [
      { name: "BJ's Marina", operator: "Private marina", kind: "marina", launch: "Upper lake off FM 2100 and Huffman-Cleveland Road via Magnolia Point/Cheatham/Calvin; one ramp lane.", fee: "TPWD lists a fee", availability: "Year-round TPWD listing; verify private operator (281) 324-9199." },
      { name: "Ponderosa Marina", operator: "Private marina", kind: "marina", launch: "Luce Bayou area via FM 1960, FM 2100 and Huffman-Cleveland Road; one ramp lane.", fee: "TPWD lists self-pay launch fee", availability: "Listed year-round; verify private marina still operating." },
      { name: "Lake Houston Marina", operator: "Private marina", kind: "marina", launch: "Upper lake reached from FM 1960 east of the crossing; two-lane boat ramp, varied boat sizes.", fee: "TPWD lists a fee", availability: "Year-round in TPWD listing; verify private operation (281) 324-1264." },
      { name: "Deussen Park", operator: "Harris County", kind: "park", launch: "Near dam via Mount Houston Road east past Beltway 8; two launch ramps with eight lanes plus a one-lane sailboat ramp.", fee: "TPWD lists no fee", availability: "TPWD lists dawn–dusk day use; Harris County (713) 440-1587." },
    ],
    nearbyLakes: [{slug:"lake-conroe",name:"Lake Conroe"},{slug:"lake-livingston",name:"Lake Livingston"}],
  },
  {
    slug: "joe-pool-lake", name: "Joe Pool Lake", accessReviewedAt: "2026-10-12", tpwdSlug: "joe_pool", waterDataSlug: "joe-pool", verifiedAt: "2026-10-09", region: "prairies-lakes",
    summary: "A 6,469-acre Dallas-Fort Worth reservoir with hydrilla, flooded timber and roadbed structure supporting good largemouth bass, crappie, white bass and channel catfish fishing.",
    surfaceAcres: 6469, maxDepthFeet: 75, impoundedYear: 1986, counties: ["Tarrant", "Ellis", "Dallas"], nearestCities: ["Grand Prairie", "Cedar Hill", "Midlothian"],
    waterway: "Mountain Creek", riverBasin: "Trinity River Basin", authority: "U.S. Army Corps of Engineers", conservationPool: "522 ft msl", fluctuation: "2–4 feet annually", clarity: "Clear near the dam to stained",
    identity: "Joe Pool is a metro-accessible structure lake where hydrilla, pondweed, flooded timber, old roads and bridges give anglers unusually varied cover within the southern DFW corridor.",
    habitat: ["Hydrilla and American pondweed occur around the reservoir, especially near the dam.", "Standing timber remains in the upper thirds of both arms.", "Flooded stock ponds, bridges, roadbeds and marked brush piles add man-made structure."],
    fish: [
      fish("largemouth-bass","Largemouth bass","good","spring","Hydrilla, pondweed and submerged structure anchor the reservoir's most popular sport fishery.",["soft-plastics","spinnerbaits","crankbaits","topwater"]),
      fish("channel-catfish","Channel catfish","good","year-round","Creek channels and deeper structural edges provide a durable catfish pattern.",["cut-bait","live-bait"]),
      fish("crappie","Crappie","good","spring","Bridges and submerged cover are major crappie targets, especially around seasonal movement.",["jigs-and-minnows"]),
      fish("white-bass","White bass","good","summer","Schooling white bass commonly use the lower portion of the lake.",["topwater","vertical-jigging"]),
    ],
    access: "Cedar Hill State Park and City of Grand Prairie facilities provide major ramps, shoreline fishing, camping and day-use access; confirm fees and closures before travel.", specialRules: true,
        accessPoints: [
      { name: "Cedar Hill State Park north ramp", operator: "Texas Parks & Wildlife Department", kind: "park", launch: "From I-20 follow FM 1382 south. TPWD describes a six-lane north ramp with about 175 parking spaces; preferred for larger boats over the silting-prone south ramp.", fee: "State park entrance fee required", availability: "Listed year-round; check TPWD state park alerts (972) 291-3900." },
      { name: "Cedar Hill State Park south ramp", operator: "Texas Parks & Wildlife Department", kind: "park", launch: "Within Cedar Hill State Park on FM 1382. Two-lane ramp with about 150 spaces, but TPWD documents siltation concerns for larger boats.", fee: "State park entrance fee required", availability: "TPWD cautions larger boats to use north ramp; call park for conditions (972) 291-3900." },
      { name: "Loyd Park", operator: "City of Grand Prairie", kind: "park", launch: "From I-20 follow SH 360 south then Ragland Road east. Four-lane ramp with about 35 vehicle spaces.", fee: "Fee listed by TPWD", availability: "TPWD lists year-round; verify city access and lake conditions (817) 467-2104." },
      { name: "Lynn Creek Park", operator: "City of Grand Prairie", kind: "park", launch: "From I-20, Great Southwest Parkway south and Lake Ridge Parkway west. Eight boat lanes and about 100 spaces.", fee: "Fee listed by TPWD", availability: "Day-use only per TPWD; confirm public access (817) 633-6265." },
    ],
    nearbyLakes: [{slug:"lake-ray-hubbard",name:"Lake Ray Hubbard"},{slug:"cedar-creek-reservoir",name:"Cedar Creek Reservoir"},{slug:"benbrook-lake",name:"Benbrook Lake"},{slug:"lake-arlington",name:"Lake Arlington"}],
    camping: {name:"Cedar Hill State Park",summary:"The state park on the east side of Joe Pool Lake combines camping, shoreline recreation and boat access; reserve busy dates and verify current ramp conditions."},
  },
  {
    slug: "lake-granbury", name: "Lake Granbury", accessReviewedAt: "2026-10-12", tpwdSlug: "granbury", waterDataSlug: "granbury", verifiedAt: "2026-10-09", region: "prairies-lakes",
    summary: "An 8,310-acre Brazos River reservoir running through Granbury with extensive docks and piers, good largemouth, catfish and white/striped bass fishing, and large water-level swings.",
    surfaceAcres: 8310, maxDepthFeet: 75, impoundedYear: 1969, counties: ["Hood"], nearestCities: ["Granbury", "Cleburne", "Fort Worth"],
    waterway: "Brazos River", riverBasin: "Brazos River Basin", authority: "Brazos River Authority", conservationPool: "692.7 ft msl", fluctuation: "Up to 30 feet", clarity: "Clear to stained",
    identity: "Lake Granbury is a developed-shoreline fishery where boat houses and piers are the dominant visible cover, while current water level and periodic golden-alga conditions are unusually important trip-planning variables.",
    habitat: ["Boat houses and piers dominate the reservoir's fishable structure.", "Small amounts of timber, cattails, bulrushes and water stargrass add natural cover.", "TPWD and local partners have installed additional fish-habitat structures."],
    fish: [
      fish("largemouth-bass","Largemouth bass","good","spring","Docks, limited vegetation and installed habitat support a good black-bass fishery.",["soft-plastics","crankbaits","spinnerbaits"]),
      fish("catfish","Catfish","good","year-round","Channel and flathead catfish provide a reliable bait fishery along channels and structural edges.",["cut-bait","live-bait"]),
      fish("white-bass","White bass","good","year-round","White bass add a schooling open-water target across the reservoir.",["topwater","vertical-jigging"]),
      fish("striped-bass","Striped bass","good","year-round","Striped bass share the reservoir's shad-based open-water fishery.",["trolling","live-bait","vertical-jigging"]),
      fish("crappie","Crappie","fair","spring","Crappie are a secondary target around docks and submerged structure.",["jigs-and-minnows"],"secondary"),
    ],
    access: "TPWD lists public and private access around Lake Granbury; changing lake levels can affect ramp usability, so verify the specific facility before towing.",
        accessPoints: [
      { name: "Thorp Spring Park", operator: "Brazos River Authority", kind: "park", launch: "West side of lake via Business US 377 and FM 4; boat ramp for varied sizes and parking.", fee: "TPWD lists no fee", availability: "Year-round per TPWD; Brazos River Authority (817) 573-3212." },
      { name: "Hunter Park", operator: "Brazos River Authority", kind: "park", launch: "Uplake east shore, from US 377 take Business 377 north on FM 51; ramp and fishing pier.", fee: "TPWD lists no fee", availability: "Year-round per TPWD; BRA (817) 573-3212." },
      { name: "Granbury City Park", operator: "City of Granbury", kind: "park", launch: "Off Business 377; boat ramp and swimming area. ADA fishing pier is across East Pearl Street in Hewlett Park.", fee: "TPWD lists no fee", availability: "Year-round per TPWD; City of Granbury (817) 573-5548." },
      { name: "Rough Creek Park", operator: "Brazos River Authority", kind: "park", launch: "Off SH 144 south of Granbury; ramp for various boat types.", fee: "TPWD lists no fee", availability: "Year-round per TPWD; BRA (817) 573-3212." },
      { name: "De Cordova Bend", operator: "Brazos River Authority", kind: "park", launch: "Near dam via US 377, FM 4 and Road 167; ramp, fishing pier and tailrace access.", fee: "TPWD lists no fee", availability: "Year-round per TPWD; BRA (817) 573-3212." },
    ],
    nearbyLakes: [{slug:"lake-whitney",name:"Lake Whitney"},{slug:"possum-kingdom-reservoir",name:"Possum Kingdom Reservoir"},{slug:"cedar-lake-cleburne-state-park",name:"Cedar Lake at Cleburne State Park"}],
    travelAlerts: ["TPWD warns that golden-alga blooms can occur on Lake Granbury and may harm fish and change fishing conditions; contact TPWD or check current bloom reports before planning a fishing-specific trip."],
  },
  {
    slug: "lake-waco", name: "Lake Waco", accessReviewedAt: "2026-10-12", tpwdSlug: "waco", waterDataSlug: "waco", verifiedAt: "2026-10-09", region: "prairies-lakes",
    summary: "An 8,465-acre Bosque River reservoir inside Waco with excellent largemouth and channel/blue catfish plus strong crappie, white bass and hybrid striped bass opportunity.",
    surfaceAcres: 8465, maxDepthFeet: 90, impoundedYear: 1965, counties: ["McLennan"], nearestCities: ["Waco", "Woodway", "Bellmead"],
    waterway: "North, Middle and South Bosque rivers", riverBasin: "Brazos River Basin", authority: "U.S. Army Corps of Engineers", conservationPool: "462 ft msl", fluctuation: "2–6 feet", clarity: "Stained to murky most of the year",
    identity: "Lake Waco combines a high-quality urban bass-and-catfish fishery with natural shoreline, submerged timber, old roadbeds, bridges and purpose-built PVC habitat structures.",
    habitat: ["Water willow is the dominant aquatic plant, with lotus, cattails, pondweed and buttonbush also present.", "Submerged timber and flooded terrestrial vegetation add natural cover.", "Old roadbeds, the former dam, docks, bridge pilings and TPWD PVC habitat reefs provide man-made structure."],
    fish: [
      fish("largemouth-bass","Largemouth bass","excellent","spring","TPWD rates the largemouth fishery excellent across the lake's natural and man-made cover.",["soft-plastics","spinnerbaits","crankbaits"]),
      fish("blue-catfish","Blue catfish","excellent","year-round","Blue catfish are part of an excellent channel-and-blue catfish fishery.",["cut-bait","live-bait"]),
      fish("channel-catfish","Channel catfish","excellent","year-round","Channel catfish provide strong year-round opportunity around channels and flats.",["cut-bait","live-bait"]),
      fish("crappie","Crappie","good","spring","Crappie use timber, docks, bridge structure and installed habitat.",["jigs-and-minnows"]),
      fish("white-bass","White bass","good","spring","White bass provide a strong schooling and seasonal river-oriented fishery.",["topwater","vertical-jigging"]),
      fish("hybrid-striped-bass","Hybrid striped bass","good","year-round","Palmetto bass add another open-water shad-oriented target.",["trolling","vertical-jigging","live-bait"]),
    ],
    access: "The U.S. Army Corps of Engineers operates a broad public-access network with ramps, bank fishing and camping around Lake Waco; individual parks have seasonal schedules and fees.", accessPage: "access2.phtml", specialRules: true,
        historySourceUrl: "https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/waco/index.asp",
    historyNotes: [
      "Waco had a lake before its modern Corps reservoir. The City of Waco built the original dam in 1928–1929; the silted old water-supply pool shrank in storage capacity from roughly 39,378 acre-feet to 22,030 by the mid-1940s.",
      "Congress authorized a replacement under the Flood Control Act of September 3, 1954. Corps construction began in 1958, and deliberate storage began in February 1965, when the old lake was integrated into the newer project.",
      "Today's public recreation and water-supply facilities occupy a federal flood-control reservoir, not simply the footprint of the 1929 city lake. The transition matters when using historical maps, shoreline photographs and campground locations.",
    ],
    accessPoints: [
      { name: "Reynolds Creek Park", operator: "U.S. Army Corps of Engineers", kind: "park", launch: "TPWD lists a public ramp, camping and shoreline recreation at Reynolds Creek on Lake Waco. Confirm entrance and ramp coordinates against USACE park map.", fee: "TPWD says most ramps charge launch fees; verify facility price", availability: "Verify USACE park and campground status before booking." },
      { name: "Speegleville Park", operator: "U.S. Army Corps of Engineers", kind: "park", launch: "Official TPWD access inventory lists launch, campground and picnicking facilities at Speegleville.", fee: "TPWD says most ramps charge launch fees; verify", availability: "USACE park status and operator reservations control overnight access." },
      { name: "Midway Park", operator: "U.S. Army Corps of Engineers", kind: "park", launch: "TPWD lists a launch and shoreline recreation park at Midway on Lake Waco.", fee: "TPWD says most ramps charge launch fees; verify", availability: "Check current USACE ramp condition and fee before travel." },
    ],
    nearbyLakes: [{slug:"lake-whitney",name:"Lake Whitney"},{slug:"belton-lake",name:"Belton Lake"},{slug:"aquilla-lake",name:"Aquilla Lake"}],
  },
  {
    slug: "lake-brownwood", name: "Lake Brownwood", accessReviewedAt: "2026-10-12", tpwdSlug: "brownwood", waterDataSlug: "brownwood", verifiedAt: "2026-10-09", region: "hill-country",
    summary: "A 6,490-acre Pecan Bayou reservoir north of Brownwood with excellent white bass, good largemouth and catfish, rocky shoreline, docks, timber and direct state-park access.",
    surfaceAcres: 6490, maxDepthFeet: 95, impoundedYear: 1933, counties: ["Brown"], nearestCities: ["Brownwood", "Early", "Bangs"],
    waterway: "Pecan Bayou and Jim Ned Creek", riverBasin: "Colorado River Basin", authority: "Brown County Water Control and Irrigation District No. 1", conservationPool: "1,425 ft msl", fluctuation: "Moderate and sometimes prone to long declines", clarity: "Clear to stained",
    identity: "Lake Brownwood is a Hill Country transition fishery with an excellent summer-to-early-fall white-bass bite, solid largemouth and catfish opportunity, and a mix of rocky developed shoreline and timbered upper arms.",
    habitat: ["Rocky shoreline and boat docks dominate much of the reservoir.", "Standing timber, black willow and buttonbush are concentrated in the upper Jim Ned and Pecan Bayou arms.", "Water willow and bulrush occur around the lake, with water willow strongest in Sowell Creek."],
    fish: [
      fish("white-bass","White bass","excellent","summer","Summer and early fall are the lake's defining white-bass window, including schooling main-lake fish.",["topwater","vertical-jigging"]),
      fish("largemouth-bass","Largemouth bass","good","fall","Rock, points, docks and vegetation support good bass fishing from fall through spring.",["crankbaits","soft-plastics","spinnerbaits","topwater"]),
      fish("catfish","Catfish","good","year-round","Channel and flathead catfish provide a reliable bait fishery.",["cut-bait","live-bait"]),
      fish("crappie","Crappie","fair","spring","Crappie are a secondary target around timber, docks and brush.",["jigs-and-minnows"],"secondary"),
    ],
    access: "TPWD lists public boating access and Lake Brownwood State Park provides a major recreation base; verify lake level, ramp status and invasive-species guidance before travel.",
        historySourceUrl: "https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/brownwood/index.asp",
    historyNotes: [
      "The Brown County Water Improvement District secured its state water right in December 1929. Construction on the Pecan Bayou and Jim Ned Creek impoundment began in 1930 and finished in 1933, with deliberate impoundment starting in July 1933.",
      "Brownwood Lake became a durable regional municipal-water and recreation resource rather than a recent suburban reservoir. TWDB documents a major 1982 strengthening, enlargement and raising of the original dam.",
      "A 2013 TWDB bathymetric survey measured 6,814 acres at the stated conservation elevation and about 131,530 acre-feet of storage. Different TPWD profile-acreage numbers may reflect reporting date or survey basis rather than a second lake.",
    ],
    accessPoints: [
      { name: "Dam public ramp", operator: "Brown County Water Control and Irrigation District No. 1", kind: "public-ramp", launch: "Across dam on FM 2632. TPWD lists a lighted multilane public ramp, courtesy dock and large parking area.", fee: "TPWD lists no fee", availability: "Year-round per TPWD; check lake condition with district (325) 643-2609." },
      { name: "Flatrock Park", operator: "Brown County Water Control and Irrigation District No. 1", kind: "park", launch: "On FM 2632 just north of FM 3021 junction. Lighted two-lane ramp with parking for under 50 vehicles.", fee: "TPWD lists no fee", availability: "TPWD warns steep ramp needs caution when lake five feet low or more; check district (325) 643-2609." },
      { name: "Lake Brownwood State Park", operator: "Texas Parks & Wildlife Department", kind: "park", launch: "Off Park Road 15 east of SH 279. Lighted multiple-lane ramp with about 20 vehicle spaces, plus fishing pier and camping.", fee: "State park entrance fee", availability: "TPWD says year-round access, though cabins/camping can be seasonal; confirm park (325) 784-5223." },
    ],
    nearbyLakes: [{slug:"o-h-ivie-lake",name:"O.H. Ivie Lake"},{slug:"proctor-lake",name:"Proctor Lake"},{slug:"lake-nasworthy",name:"Lake Nasworthy"}],
    camping: {name:"Lake Brownwood State Park",summary:"The state park provides established camping and lake recreation on the shoreline; check reservations, ramp conditions and current park alerts."},
    travelAlerts: ["TPWD reports zebra mussels in this reservoir. Follow current boat, livewell and equipment cleaning and draining requirements before entering other waters."],
  },
  {
    slug: "proctor-lake", name: "Proctor Lake", accessReviewedAt: "2026-10-12", tpwdSlug: "proctor", waterDataSlug: "proctor", verifiedAt: "2026-10-09", region: "prairies-lakes",
    summary: "A 4,537-acre Leon River system reservoir in Comanche County with excellent crappie, good catfish and white bass, hybrid striped bass, standing timber and multiple Corps ramps.",
    surfaceAcres: 4537, maxDepthFeet: 34, impoundedYear: 1963, counties: ["Comanche"], nearestCities: ["Comanche", "Dublin", "Proctor"],
    waterway: "Sabana and Leon rivers", riverBasin: "Brazos River Basin", authority: "U.S. Army Corps of Engineers", conservationPool: "1,162 ft msl", fluctuation: "Moderate and sometimes prone to long declines", clarity: "Slightly stained to stained, generally up to about 3 feet",
    identity: "Proctor is a compact multi-species reservoir where excellent crappie, good catfish and white bass, and a hybrid-striped-bass fishery share timber, willow, rock and installed habitat.",
    habitat: ["Standing timber and willow trees dominate the upper reservoir.", "Rocky cover appears in selected areas.", "TPWD and local partners have installed brush piles and artificial reefs."],
    fish: [
      fish("crappie","Crappie","excellent","spring","Crappie are Proctor's strongest rated fishery and use timber, brush and spillway-area structure.",["jigs-and-minnows"]),
      fish("catfish","Catfish","good","year-round","Channel, blue and flathead catfish provide good year-round opportunity.",["cut-bait","live-bait"]),
      fish("white-bass","White bass","good","year-round","White bass add a strong schooling component to the reservoir.",["topwater","vertical-jigging"]),
      fish("hybrid-striped-bass","Hybrid striped bass","fair","year-round","Hybrids remain a recognized open-water target even though current TPWD ratings are more modest.",["trolling","vertical-jigging","live-bait"],"secondary"),
      fish("largemouth-bass","Largemouth bass","fair","spring","Bass use timber, willows and rocky structure but are a secondary fishery in current TPWD ratings.",["soft-plastics","crankbaits"],"secondary"),
    ],
    access: "U.S. Army Corps of Engineers parks including Promontory Point, Sowell Creek, the dam area and Copperas Creek provide concrete ramps and day-use access; fees and closures vary.",
        accessPoints: [
      { name: "Promontory Point", operator: "U.S. Army Corps of Engineers", kind: "park", launch: "SH 16 to FM 2318; two two-lane lighted concrete ramps and about 50 parking spaces.", fee: "TPWD lists launch fee", availability: "Year-round TPWD listing; USACE (254) 879-2424; check ramp and campground status." },
      { name: "Sowell Creek", operator: "U.S. Army Corps of Engineers", kind: "park", launch: "Off FM 1476; multi-lane lighted concrete ramp and about 50 spaces.", fee: "TPWD lists launch fee", availability: "Year-round in TPWD listing; contact USACE (254) 879-2424." },
      { name: "Dam Park", operator: "U.S. Army Corps of Engineers", kind: "park", launch: "US 67/377 access road toward dam; single-lane concrete ramp, around 30 spaces.", fee: "TPWD lists launch fee", availability: "Year-round per TPWD; verify Corps status." },
      { name: "Copperas Creek", operator: "U.S. Army Corps of Engineers", kind: "park", launch: "FM 2861 from SH 16 or US 67/377; two concrete ramps, lighted, 50 spaces.", fee: "TPWD lists launch fee", availability: "Year-round per TPWD; USACE (254) 879-2424." },
    ],
    nearbyLakes: [{slug:"lake-brownwood",name:"Lake Brownwood"},{slug:"lake-granbury",name:"Lake Granbury"}],
  },
  {
    slug: "lake-arrowhead", name: "Lake Arrowhead", accessReviewedAt: "2026-10-12", tpwdSlug: "arrowhead", waterDataSlug: "arrowhead", verifiedAt: "2026-10-09", region: "panhandle",
    summary: "A 14,969-acre reservoir southeast of Wichita Falls with excellent catfish, a strong spring white-crappie fishery, white bass, rocky structure, timber and unusual submerged oil-derrick habitat.",
    surfaceAcres: 14969, maxDepthFeet: 45, impoundedYear: 1966, counties: ["Clay"], nearestCities: ["Wichita Falls", "Henrietta", "Scotland"],
    waterway: "Little Wichita River", riverBasin: "Red River Basin", authority: "City of Wichita Falls", conservationPool: "926 ft msl", fluctuation: "4–6 feet", clarity: "Typically 1–2 feet of visibility",
    identity: "Lake Arrowhead is a North Texas catfish-and-crappie anchor with abundant white bass and distinctive fish-holding structure ranging from riprap and timber to old oil derricks.",
    habitat: ["Riprap along the dam and bridges and rocky main-lake shoals provide hard structure.", "Standing timber remains in the upper reservoir and backs of many coves.", "Lotus, pondweed, bulrush and cattails vary with water level, while old capped oil derricks act as unusual fish attractors."],
    fish: [
      fish("catfish","Catfish","excellent","year-round","Channel, blue and flathead catfish are a defining fishery, with blue catfish especially prominent.",["cut-bait","live-bait"]),
      fish("crappie","Crappie","good","spring","Spring is the strongest white-crappie period around shallow shoreline habitat, bridges, piers and derricks.",["jigs-and-minnows"]),
      fish("largemouth-bass","Largemouth bass","fair","summer","Bass quality varies with turbidity and lake elevation and is strongest around shallow rock, vegetation, docks and woody debris.",["topwater","crankbaits","soft-plastics"],"secondary"),
      fish("white-bass","White bass","fair","spring","White bass use rocky points in spring and school over shad in warmer months.",["topwater","vertical-jigging"],"secondary"),
    ],
    access: "Lake Arrowhead State Park and other public access sites provide ramps, fishing and shoreline recreation; check water level and facility status before towing.",
        accessPoints: [
      { name: "Lake Arrowhead State Park", operator: "Texas Parks & Wildlife Department", kind: "park", launch: "From US 281 take FM 1954 toward Park Road 63; TPWD lists an improved public boat ramp for multiple boat sizes and accessible shore fishing facilities.", fee: "TPWD state park entrance fee", availability: "TPWD lists year-round; confirm lake level and park ramp (940) 528-2211." },
      { name: "West Arrowhead Park", operator: "City of Wichita Falls", kind: "park", launch: "From FM 1954 by state park take West Arrowhead Road to signed Boat Ramp Road, and follow to launch. Ramp accommodates varied boat sizes.", fee: "No launch fee listed by TPWD", availability: "Listed year-round; verify current use and reservoir level with City of Wichita Falls (940) 761-7491." },
      { name: "Shoshone Park", operator: "City of Wichita Falls", kind: "park", launch: "At upper end east of US 281 just south of Little Wichita River bridge. Ramp intended for smaller boats.", fee: "No launch fee listed by TPWD", availability: "TPWD warns launch works only when reservoir is near conservation pool; verify with city (940) 761-7491." },
    ],
    nearbyLakes: [{slug:"lake-bridgeport",name:"Lake Bridgeport"},{slug:"lake-stamford",name:"Lake Stamford"}],
    camping: {name:"Lake Arrowhead State Park",summary:"The state park is the clearest overnight and shoreline-access base for the reservoir; verify reservations and current ramp conditions."},
  },
  {
    slug: "lake-casa-blanca", name: "Lake Casa Blanca", accessReviewedAt: "2026-10-12", tpwdSlug: "casa_blanca", verifiedAt: "2026-10-09", region: "south-texas",
    summary: "A 1,680-acre Laredo reservoir with excellent catfish and hybrid striped bass, good largemouth and crappie, riprap, reeds, flooded timber and direct state-park access.",
    surfaceAcres: 1680, maxDepthFeet: 36, impoundedYear: 1951, counties: ["Webb"], nearestCities: ["Laredo", "Rio Bravo", "El Cenizo"],
    waterway: "Chacon Creek", riverBasin: "Rio Grande Basin", authority: "Webb County", conservationPool: "440 ft msl", fluctuation: "Large fluctuations, up to 25 feet", clarity: "Turbid",
    identity: "Lake Casa Blanca is Laredo's principal public reservoir fishery, pairing excellent catfish and hybrid-striped-bass ratings with largemouth, crappie and a compact state-park access network.",
    habitat: ["Rock and concrete riprap line the dam.", "Cattails and bulrushes provide shoreline vegetation when water levels support them.", "Dead trees in the upper lake and points near deeper water add fish-holding structure."],
    fish: [
      fish("catfish","Catfish","excellent","year-round","Blue, channel and flathead catfish make up one of the lake's strongest fisheries.",["cut-bait","live-bait"]),
      fish("hybrid-striped-bass","Hybrid striped bass","excellent","year-round","Stocked hybrids follow shad around points and deeper drop-offs.",["trolling","vertical-jigging","live-bait"]),
      fish("largemouth-bass","Largemouth bass","good","spring","Riprap, flooded timber, reeds, bulrushes and humps provide the main bass framework.",["topwater","spinnerbaits","soft-plastics"]),
      fish("crappie","Crappie","good","spring","Crappie use submerged timber and respond to small jigs and minnows.",["jigs-and-minnows"]),
      fish("sunfish","Sunfish","fair","year-round","Sunfish provide an accessible secondary shoreline target.",["jigs-and-minnows"],"secondary"),
    ],
    access: "Lake Casa Blanca International State Park provides the principal public ramp, fishing pier and recreation access; lake level can vary sharply, so verify conditions with the park office.", specialRules: true,
    liveDataNote: "TPWD directs visitors to the state park office for the current Lake Casa Blanca water level. TexasDefined does not present a live numeric gauge without a public real-time feed.",
        accessPoints: [
      { name: "Lake Casa Blanca International State Park", operator: "Texas Parks & Wildlife Department", kind: "park", launch: "East Laredo: US 59 to Bob Bullock Loop/Loop 20, north to park. Three-lane lighted concrete ramp and accessible fishing pier.", fee: "Park entrance fee", availability: "TPWD lists year-round; verify state-park alerts and entrance." },
    ],
    nearbyLakes: [{slug:"falcon-international-reservoir",name:"Falcon International Reservoir"},{slug:"choke-canyon-reservoir",name:"Choke Canyon Reservoir"}],
    camping: {name:"Lake Casa Blanca International State Park",summary:"The state park provides camping, a public ramp and shoreline recreation inside Laredo; confirm current water level, closures and reservations before travel."},
  },
  {
    slug: "lake-mineral-wells", name: "Lake Mineral Wells", accessReviewedAt: "2026-10-12", tpwdSlug: "mineral_wells", waterDataSlug: "mineral-wells", verifiedAt: "2026-10-09", region: "prairies-lakes",
    summary: "A compact 440-acre state-park lake east of Mineral Wells with excellent crappie and sunfish, good largemouth and channel catfish, shoreline vegetation and purpose-built fish habitat.",
    surfaceAcres: 440, maxDepthFeet: 30, impoundedYear: 1920, counties: ["Palo Pinto"], nearestCities: ["Mineral Wells", "Weatherford", "Graford"],
    waterway: "Rock Creek watershed", riverBasin: "Brazos River Basin", authority: "Texas Parks and Wildlife Department", conservationPool: "863 ft msl", fluctuation: "Very little", clarity: "Stained",
    identity: "Lake Mineral Wells is a small, highly accessible state-park fishery where crappie and sunfish rate excellent and anglers can target water willow, brush, boulders, timber and installed crappie condos without navigating a large reservoir.",
    habitat: ["Water willow and bulrush ring much of the shoreline.", "TPWD-installed crappie condos and submerged brush piles concentrate fish near public fishing areas.", "Submerged boulders, standing timber and deeper holes in Rippy Branch broaden the cover mix."],
    fish: [
      fish("crappie","Crappie","excellent","winter","Crappie school deep around cover in winter and move shallow to spawn in spring.",["jigs-and-minnows"]),
      fish("sunfish","Sunfish","excellent","year-round","Sunfish provide one of the lake's strongest accessible bank-fishing opportunities.",["jigs-and-minnows"]),
      fish("largemouth-bass","Largemouth bass","good","spring","Water-willow edges, the dam, brush and boulders support good bass fishing.",["spinnerbaits","crankbaits","soft-plastics"]),
      fish("channel-catfish","Channel catfish","good","year-round","Channel catfish are available from late winter through fall around deeper holes and cover.",["cut-bait","live-bait"]),
    ],
    access: "The reservoir lies inside Lake Mineral Wells State Park, which provides the principal public access and may close on selected wildlife-management dates; check park alerts before travel.", specialRules: true,
        accessPoints: [
      { name: "Lake Mineral Wells State Park", operator: "Texas Parks & Wildlife Department", kind: "park", launch: "East of Mineral Wells off US 180. Park concession-side boat ramp, swim area, lighted fishing pier, hiking and camping.", fee: "State park entry fee", availability: "Can close for wildlife management; verify state-park closure calendar and overnight bookings." },
    ],
    nearbyLakes: [{slug:"possum-kingdom-reservoir",name:"Possum Kingdom Reservoir"},{slug:"lake-bridgeport",name:"Lake Bridgeport"},{slug:"lake-weatherford",name:"Lake Weatherford"}],
    camping: {name:"Lake Mineral Wells State Park",summary:"State-park camping, fishing piers and shoreline access make this one of the network's easiest lake-and-overnight combinations; verify closure dates and reservations."},
  },
  {
    slug: "lake-colorado-city", name: "Lake Colorado City", accessReviewedAt: "2026-10-12", tpwdSlug: "colorado_city", waterDataSlug: "colorado-city", verifiedAt: "2026-10-09", region: "panhandle",
    summary: "A 1,618-acre West Texas reservoir near Colorado City where the fishery is recovering from drought and recurring cool-season golden-alga blooms, with state-park access and current water-level data.",
    surfaceAcres: 1618, maxDepthFeet: 51, impoundedYear: 1949, counties: ["Mitchell"], nearestCities: ["Colorado City", "Snyder", "Sweetwater"],
    waterway: "Morgan Creek", riverBasin: "Colorado River Basin", authority: "City of Colorado City", conservationPool: "2,070 ft msl", fluctuation: "3–6 feet seasonally", clarity: "Clear near the dam and mid-lake; turbid in the upper reservoir",
    identity: "Lake Colorado City belongs in the network because its current limitations are useful planning information: TPWD says the fishery is recovering from drought and recurring winter golden-alga blooms, so anglers need current conditions rather than inflated destination claims.",
    habitat: ["Steep rocky bluffs dominate near the dam.", "Mud flats shape much of the middle and upper reservoir.", "Bulrushes line many mud-flat shorelines and create the lake's principal shallow vegetation."],
    fish: [
      fish("largemouth-bass","Largemouth bass","poor","spring","TPWD currently rates largemouth bass poor while the reservoir fishery continues to recover.",["soft-plastics","spinnerbaits"],"secondary"),
      fish("channel-catfish","Channel catfish","poor","year-round","Catfish remain present but current TPWD ratings are poor; verify recent reports before making a fishing-specific trip.",["cut-bait","live-bait"],"secondary"),
      fish("sunfish","Sunfish","poor","year-round","Sunfish are present but currently rate poor, making current-condition checks especially important.",["jigs-and-minnows"],"secondary"),
    ],
    access: "Lake Colorado City State Park and Cooper's Cove provide paved ramps, day use and camping; the state park ramp is open year-round while camping availability is seasonal.",
        accessPoints: [
      { name: "Lake Colorado City State Park", operator: "Texas Parks & Wildlife Department", kind: "park", launch: "Southwest shore, five miles south of I-20 on FM 2836; paved multi-lane ramp and parking.", fee: "Park entry/launch fee", availability: "Ramps listed year-round; TPWD notes no camping December–February. Check current park operations and lake level." },
      { name: "Cooper's Cove", operator: "Private operator", kind: "resort", launch: "East side of Lake Colorado City off SH 163; paved boat ramp and camping in TPWD inventory.", fee: "TPWD lists fees", availability: "Year-round ramp in TPWD listing; verify current operator (325) 728-5885." },
    ],
    nearbyLakes: [{slug:"alan-henry-reservoir",name:"Alan Henry Reservoir"},{slug:"o-h-ivie-lake",name:"O.H. Ivie Lake"},{slug:"lake-nasworthy",name:"Lake Nasworthy"},{slug:"lake-abilene",name:"Lake Abilene"},{slug:"e-v-spence-reservoir",name:"E. V. Spence Reservoir"}],
    camping: {name:"Lake Colorado City State Park",summary:"The state park provides camping and reservoir access, but anglers should check golden-alga notices, water level and current fish reports before building a trip around fishing."},
  },

  {
    slug: "lake-stamford", name: "Lake Stamford", tpwdSlug: "stamford", waterDataSlug: "stamford", verifiedAt: "2026-10-12", region: "panhandle",
    summary: "A 5,124-acre city-owned Paint Creek reservoir in Haskell County, with an excellent white-crappie fishery, two TPWD-listed marina ramps, shoreline camping and substantial water-level swings.",
    surfaceAcres: 5124, maxDepthFeet: 36, impoundedYear: 1953, counties: ["Haskell"], nearestCities: ["Stamford", "Haskell", "Rule"],
    waterway: "Paint Creek, tributary of the Clear Fork Brazos River", riverBasin: "Brazos River Basin", authority: "City of Stamford", conservationPool: "1,416.8 ft msl", fluctuation: "Severe; TPWD describes 4–10 feet of annual variation", clarity: "Turbid, generally 1–2 feet of visibility",
    identity: "Built by the City of Stamford for municipal and industrial water supply, the reservoir began impounding Paint Creek in June 1953 after dam construction begun in 1951. TPWD identifies white crappie as the outstanding fishery, with good largemouth bass and catfish. The real visitor-planning issue is the lake's highly variable level: check TWDB's dated gauge and individual ramp operators before traveling.",
    habitat: ["Rocky structure, stumps and drop-offs are important when the water is low.", "Bulrush, cattail, pondweed and lily pads offer shallow fish cover when water is up.", "TPWD's Habitat Structure Viewer includes installed fish habitat with downloadable coordinates."],
    fish: [
      fish("crappie","Crappie","excellent","spring","TPWD rates white crappie excellent; structure such as submerged timber, humps and drop-offs supports vertical jig and minnow fishing.",["jigs-and-minnows","vertical-jigging"]),
      fish("largemouth-bass","Largemouth bass","good","spring","Fish rocky cover and bulrush/cattail points when lake levels permit; spring and summer are TPWD's favored periods.",["soft-plastics","crankbaits","spinnerbaits","topwater"]),
      fish("catfish","Catfish","good","year-round","Channel and blue catfish offer a useful secondary fishery; use local reports and water-level context before a dedicated trip.",["cut-bait","live-bait"]),
      fish("white-bass","White bass","fair","spring","TPWD rates white bass fair; verify recent activity rather than assuming consistent schooling action.",["jigs-and-minnows","live-bait"],"secondary"),
      fish("sunfish","Sunfish","fair","summer","Shallow vegetated areas can support sunfish, but TPWD rates the fishery fair.",["jigs-and-minnows"],"secondary"),
    ],
    access: "Stamford Marina at Stamford Park off FM 2976 has a TPWD-listed two-lane ramp; Anchor Marina at Silo Scott Memorial Park off FM 3495 has a one-lane ramp. Both listings say no launch fee, but verify current operation and usability after low water.",
    accessPoints: [
      { name: "Stamford Marina — Stamford Park", operator: "City of Stamford", kind: "marina", launch: "Off FM 2976; TPWD lists a two-lane ramp, about 20 parking spaces, shoreline access and a crappie house.", fee: "TPWD lists no ramp-launch fee; crappie house fee applies", availability: "Listed year-round; call operator and check lake elevation before towing" },
      { name: "Anchor Marina — Silo Scott Memorial Park", operator: "Haskell County", kind: "marina", launch: "Off FM 3495; TPWD lists a one-lane ramp, about 20 parking spaces and bank-fishing access.", fee: "TPWD lists no ramp-launch fee; verify on arrival", availability: "Listed year-round; confirm campground and low-water ramp status" },
    ],
    historySourceUrl: "https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/stamford/index.asp",
    nearbyLakes: [{slug:"lake-arrowhead",name:"Lake Arrowhead"},{slug:"lake-brownwood",name:"Lake Brownwood"}],
    camping: {name:"Stamford Park and Silo Scott Memorial Park",summary:"TPWD lists camping with hookups at both lakeside parks. Stamford Park additionally lists cabins, picnic sites and a crappie house. Verify prices, availability and access directly with the operator; nearby Fort Griffin State Historic Site provides an additional overnight option."},
  },
  {
    slug: "lake-sweetwater", name: "Lake Sweetwater", tpwdSlug: "sweetwater", waterDataSlug: "sweetwater", verifiedAt: "2026-10-12", region: "panhandle",
    summary: "A small city-owned Nolan County reservoir and historic recreation area, with camping and a municipal golf course; TPWD warns that golden-alga fish kills have severely reduced the fishery and water levels are currently far below conservation pool.",
    surfaceAcres: 630, maxDepthFeet: 45, impoundedYear: 1930, counties: ["Nolan"], nearestCities: ["Sweetwater", "Roscoe", "Colorado City"],
    waterway: "Bitter Creek and Cottonwood Creek", riverBasin: "Brazos River Basin", authority: "City of Sweetwater", conservationPool: "2,116.5 ft msl", fluctuation: "Moderate to prolonged major drawdown", clarity: "Clear to stained, occasionally up to four feet of visibility",
    identity: "The City of Sweetwater completed the dam in 1930 for water supply and recreation; Civilian Conservation Corps work in the 1930s helped shape the historic lakeside park, amphitheater and recreation landscape. Treat this primarily as a park-and-history stop until current conditions improve: TPWD retains an active golden-alga warning and rates bass, catfish, crappie and sunfish poor. TWDB's gauge shows substantial drawdown, which can make published ramp details unreliable on the day of travel.",
    habitat: ["TPWD documents bulrush and pondweed when the lake is near full pool; exposed shoreline and habitat differ markedly in drought.", "Fish populations have been heavily affected by golden-alga kills, so historical catch reports should not be used as current forecasts.", "TPWD's latest surveys and stocking history offer better context than generic claims of abundant fish."],
    fish: [
      fish("largemouth-bass","Largemouth bass","poor","spring","TPWD rates bass poor after repeated golden-alga impacts. Confirm fishery condition before a fishing-specific trip.",["soft-plastics","spinnerbaits"],"secondary"),
      fish("channel-catfish","Channel catfish","poor","year-round","Historically present but currently poor by TPWD's rating; do not assume reliable catches.",["cut-bait","live-bait"],"secondary"),
      fish("crappie","Crappie","poor","spring","White crappie historically occurred here but TPWD currently rates the fishery poor.",["jigs-and-minnows"],"secondary"),
      fish("sunfish","Sunfish","poor","summer","Sunfish have also been affected by golden-alga kills; verify the most recent TPWD report.",["jigs-and-minnows"],"secondary"),
    ],
    access: "TPWD lists a lighted five-lane ramp south of I-20 off FM 2035 with a fee and approximately 50 parking spaces; City of Sweetwater lists lake-park facilities at 200 FM 2015. These are different published approach descriptions: confirm directions and actual ramp operability with the city before towing in low water.",
    accessPoints: [
      { name: "Lake Sweetwater city-operated ramp", operator: "City of Sweetwater", kind: "public-ramp", launch: "TPWD lists a five-lane lighted concrete ramp south of I-20 off FM 2035, with approximately 50 parking spaces.", fee: "Launch fee listed by TPWD; check current charges", availability: "TPWD says year-round, but low water can prevent launches; call City of Sweetwater before traveling" },
      { name: "Lake Sweetwater Recreation Area", operator: "City of Sweetwater", kind: "park", launch: "The city lists 200 FM 2015 for park access, with a beach area, amphitheater, pavilions, play area, restrooms and overnight camping.", fee: "Verify day-use and camping fees with the city", availability: "Confirm swimming suitability, park access and campsite reservations; published amenities do not guarantee water access" },
    ],
    historySourceUrl: "https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/sweetwater/index.asp",
    visitorSourceUrl: "https://www.sweetwatertx.gov/159/Visit-Sweetwater",
    liveDataNote: "Important: TPWD currently warns of a golden-alga bloom and describes poor angling across major sport-fish groups. TWDB shows this reservoir substantially below full pool. Check current TPWD advisories, water elevation and city access status before fishing, launching or swimming; conditions can change.",
    nearbyLakes: [{slug:"lake-colorado-city",name:"Lake Colorado City"},{slug:"lake-stamford",name:"Lake Stamford"},{slug:"lake-abilene",name:"Lake Abilene"}],
    camping: {name:"Lake Sweetwater Recreation Area",summary:"The City of Sweetwater lists overnight camping and trailer facilities, picnic/pavilion space, a beach, playground, amphitheater and proximity to its municipal golf course. The city's reservation information is the authoritative source for current RV/campground booking, fees and open facilities."},
  },
  {
    slug: "lake-georgetown", name: "Lake Georgetown", tpwdSlug: "georgetown", waterDataSlug: "georgetown", verifiedAt: "2026-10-12", region: "hill-country",
    summary: "A 1,297-acre Corps-managed limestone reservoir west of Georgetown with spring North San Gabriel white-bass runs, three named public launch parks, camping, a swimming beach and a long shoreline trail.",
    surfaceAcres: 1297, maxDepthFeet: 85, impoundedYear: 1980, counties: ["Williamson"], nearestCities: ["Georgetown", "Round Rock", "Austin"],
    waterway: "North Fork of the San Gabriel River", riverBasin: "Brazos River Basin", authority: "U.S. Army Corps of Engineers", conservationPool: "791 ft msl", fluctuation: "Often 5–30 feet annually", clarity: "Clear near the dam, slightly stained upriver",
    identity: "Lake Georgetown is a rugged limestone-and-rock reservoir rather than a dock-lined urban lake. Corps-controlled shoreline contains three identifiable four-lane ramps, campground and day-use areas and a 26.5-mile hiking trail. The lake's strongest TPWD-rated target is white bass on spring North Fork San Gabriel River runs, not crappie. Zebra mussels are present; follow cleaning and draining rules before transporting watercraft.",
    habitat: ["Steep limestone banks, gravel, rocky ledges and boulders dominate the shoreline, with little sustained aquatic vegetation because water levels fluctuate.", "Standing timber occurs in coves and upper pockets; TPWD documents installed cedar-tree habitat and an official Habitat Structure Viewer with downloadable coordinates.", "Spring white-bass movement into the North Fork San Gabriel River is a distinct upstream pattern, while bass use rocky banks, wood cover and deep structure through other seasons."],
    fish: [
      fish("largemouth-bass","Largemouth bass","good","spring","TPWD reports good catches from rock banks in spring/fall; in summer, deeper or nighttime fishing may be productive.",["soft-plastics","spinnerbaits","crankbaits","topwater"]),
      fish("smallmouth-bass","Smallmouth bass","fair","spring","Lower-lake clear rocky water holds a less dense smallmouth population; fish boulders and hard structure.",["crankbaits","soft-plastics"],"secondary"),
      fish("white-bass","White bass","excellent","spring","The standout TPWD fishery; white bass move up the North Fork San Gabriel during approximately February–May.",["jigs-and-minnows","topwater","crankbaits"]),
      fish("hybrid-striped-bass","Hybrid striped bass","good","year-round","TPWD rates hybrids good; check recent schooling activity and seasonal open-water structure before targeting.",["trolling","vertical-jigging"],"secondary"),
      fish("catfish","Catfish","good","year-round","Blue, channel and flathead catfish occupy river-channel and lake structure; current rules and river flow matter.",["cut-bait","live-bait"]),
      fish("crappie","Crappie","poor","spring","TPWD describes a low-density white crappie population; this is not an advised crappie-first destination.",["jigs-and-minnows"],"secondary"),
      fish("sunfish","Sunfish","good","summer","TPWD rates sunfish good; smaller tackle near rocky and calmer shoreline cover can be useful.",["jigs-and-minnows"],"secondary"),
    ],
    access: "USACE manages three TPWD-listed four-lane boat ramps: Cedar Breaks on the south shore, Jim Hogg on the north shore and Russell Park on the north shore. TPWD lists launch fees and nominal 6 a.m.–10 p.m. park entry with 24-hour exit; verify current Corps notices and lake elevation.",
    accessPoints: [
      {name:"Cedar Breaks Park",operator:"U.S. Army Corps of Engineers",kind:"park",launch:"South shore near dam. From Georgetown take FM 2338 west, left on Cedar Breaks Park Road, follow road over dam. Four-lane concrete ramp and fishing dock; TPWD lists restrooms and camping.",fee:"USACE launch/park fee listed; verify current price",availability:"TPWD historically lists year-round 6 AM–10 PM entry; call USACE (512) 930-5253 for live park and ramp status."},
      {name:"Jim Hogg Park",operator:"U.S. Army Corps of Engineers",kind:"park",launch:"North shore mid-lake. From Georgetown FM 2338 west to Jim Hogg Park Road. Four-lane concrete launch, fishing dock, camping and picnic access.",fee:"Launch/park fee listed; verify booking and charge",availability:"TPWD lists nominal year-round 6 AM–10 PM entry and 24-hour exit; check USACE (512) 930-5253."},
      {name:"Russell Park",operator:"U.S. Army Corps of Engineers",kind:"park",launch:"North shore mid-lake. FM 2338 to FM 3405 and Russell Park Road / CR 262. Four-lane concrete ramp; TPWD marks day-use picnic facilities.",fee:"Launch fee listed; verify with operator",availability:"TPWD lists nominal year-round 6 AM–10 PM entry; check USACE for closures and water-level access."},
    ],
    camping:{name:"Cedar Breaks Park and Jim Hogg Park",summary:"The TPWD access inventory identifies both Corps parks as developed camping areas; it also describes primitive camping, group shelters, a swimming beach and a 26.5-mile lakeshore trail in the USACE recreation complex. Verify campground-specific reservation, swim-area permission, accessible facilities, entrance fees and current Corps closures."},
    visitorFAQs: [
      {question:"Which public ramps?",answer:"Cedar Breaks, Jim Hogg and Russell parks. Confirm USACE access and fees."},
      {question:"Top fishery?",answer:"TPWD rates white bass excellent; spring river flows affect runs."},
      {question:"Camping?",answer:"USACE manages campsites at Cedar Breaks and Jim Hogg parks."},
    ],
    nearbyLakes: [{slug:"lake-travis",name:"Lake Travis"},{slug:"lake-lbj",name:"Lake LBJ"},{slug:"granger-lake",name:"Granger Lake"}],
    travelAlerts:["TPWD identifies established zebra mussels in Lake Georgetown. Clean, drain and dry boats, trailers, livewells, bait containers and gear before entering another water body; draining water is required by Texas law.","The lake has significant water-level fluctuations. A historically listed 4-lane ramp may be inoperable; verify the Corps' current closure report before towing."],
    historySourceUrl:"https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/georgetown/index.asp",
    historyNotes:["Federal authorization for a San Gabriel flood-control reservoir system including Georgetown came in 1962. The Corps began the Georgetown dam project in the early 1970s, serving water supply, flood management and public recreation rather than building a private-lot resort lake.","The Texas Water Development Board dates the start of deliberate impoundment to March 3, 1980, while dam work was completed in October of that year and associated facilities formally completed in 1982. Different dates in older references therefore describe different stages, not conflicting reservoirs.","Today the Corps-managed shoreline protects a different visitor experience from Lake Austin or Lake LBJ: fewer private docks, three named USACE launch parks and a connected 26.5-mile walking route. The limestone geology and fluctuating water also explain the lack of sustained lake vegetation."],
  },
  {
    slug: "benbrook-lake", name: "Benbrook Lake",tpwdSlug:"benbrook",waterDataSlug:"benbrook",verifiedAt:"2026-10-12",region:"prairies-lakes",
    summary:"A 3,635-acre Corps-managed Clear Fork Trinity reservoir southwest of Fort Worth, notable for excellent hybrid striped bass fishing and several ramps subject to historically documented low-water closures.",
    surfaceAcres:3635,maxDepthFeet:70,impoundedYear:1952,counties:["Tarrant"],nearestCities:["Benbrook","Fort Worth","Crowley"],
    waterway:"Clear Fork of the Trinity River",riverBasin:"Trinity River Basin",authority:"U.S. Army Corps of Engineers",conservationPool:"694 ft msl",fluctuation:"Normally around 4 feet annually; drought can be much more severe",clarity:"Stained",
    identity:"Benbrook Lake offers Fort Worth-area access to a Clear Fork Trinity Corps reservoir where TPWD rates hybrid striped bass excellent, and catfish, white bass and crappie good. Lake levels matter more than generic ramp listings: TPWD's access page dated April 21, 2026 documented multiple closures, restricted launch access for campers, and walk-in-only facilities. This guide documents exactly which are which; visitors must check the current Corps closure report before leaving.",
    habitat:["Aquatic vegetation is sparse; submerged ridges, humps, timber and creek mouths are the dominant fishing features.","Hybrids feed over main-lake contours near the dam in late spring and summer; crappie may concentrate in brush during spawning, then move deeper.","Creek mouths attract largemouth in early spring, while blue catfish occupy deeper river channels in winter."],
    fish:[
      fish("hybrid-striped-bass","Hybrid striped bass","excellent","summer","TPWD rates the lake's stocked hybrid striped bass fishery excellent; target humps and ridges near the dam as fish follow bait.",["trolling","vertical-jigging","live-bait"]),
      fish("largemouth-bass","Largemouth bass","fair","spring","Fair-rated bass fishing centers on creek mouths in early spring and timber or rocky structure in other seasons.",["soft-plastics","spinnerbaits","crankbaits"]),
      fish("catfish","Catfish","good","year-round","TPWD reports abundant blue and channel catfish, with winter blue catfish near river-channel structure.",["cut-bait","live-bait"]),
      fish("crappie","Crappie","good","spring","Good crappie fishery; fish shallow brush during spawning and deeper cover when the season changes.",["jigs-and-minnows","vertical-jigging"]),
      fish("white-bass","White bass","good","summer","Good-rated white bass fishery; summer lake structure and bait schools guide productive open-water fishing.",["trolling","topwater","vertical-jigging"]),
      fish("sunfish","Sunfish","fair","summer","TPWD rates sunfish fair, a secondary rather than signature target.",["jigs-and-minnows"],"secondary"),
    ],
    access:"TPWD's dated April 21, 2026 report listed Mustang Park as a fee-based year-round ramp, but described Holiday North, Longhorn and Rocky Creek as closed or walk-in-only. Holiday Park South and Bear Creek ramps are restricted to campsite occupants. Operator and water-level updates supersede these historical reports.",
    accessPoints:[
      {name:"Mustang Park",operator:"U.S. Army Corps of Engineers",kind:"park",launch:"From US 377 use FM 1187, Winscott Plover Road and Peninsula Road. Two ramps, four lanes total and about 50 trailer spaces.",fee:"Corps access/launch fee required; verify current amount",availability:"TPWD lists 6 AM–9 PM year-round but lake levels can change ramp usability. USACE (817) 292-2400."},
      {name:"Holiday Park North",operator:"U.S. Army Corps of Engineers",kind:"park",launch:"From US 377 southeast on South Lakeview to park. Three ramp sites; north, beach-adjacent and south day-use ramps.",fee:"Fee required for park use where permitted",availability:"All three ramps reported closed on the TPWD April 21, 2026 inventory. Confirm current Corps status; bank fishing may still be available."},
      {name:"Holiday Park South",operator:"U.S. Army Corps of Engineers",kind:"park",launch:"From US 377 south on Pearl Ranch Road to Lakeview Drive. Four ramps, six total lanes; one area permits shore kayak launch.",fee:"Fee and campsite booking required",availability:"Ramps restricted to registered campers. TPWD April 21, 2026 noted one partly open, three others limited/closed. Check current USACE notices."},
      {name:"Bear Creek Park",operator:"U.S. Army Corps of Engineers",kind:"park",launch:"Two ramps with three lanes; one for Bear Creek channel, one for main lake.",fee:"Camping/launch fees listed",availability:"Campers-only ramps; TPWD season April 1–September 30, with park/ramp closure Oct–Mar. Reconfirm USACE operations."},
      {name:"Longhorn Park",operator:"U.S. Army Corps of Engineers",kind:"park",launch:"US 377 to Winscott Road and Lakeside Drive / East County Road 1042. Two-lane ramp and limited 11-vehicle parking.",fee:"No ramp fee in historic TPWD listing",availability:"Reported CLOSED as of April 21, 2026. Not a guaranteed launch; check USACE current closure report."},
      {name:"Rocky Creek Park",operator:"U.S. Army Corps of Engineers",kind:"park",launch:"Old Granbury Road south, west at Rocky Creek signs. Two ramps/three lanes, one Creek channel and one main-lake access.",fee:"Fees listed when open",availability:"TPWD marked walk-in-only April 21, 2026. Typically seasonal Apr–Sep; verify closure and marina access with USACE."},
    ],
    camping:{name:"Holiday Park South, Bear Creek Park, Mustang Park and Rocky Creek Park",summary:"TPWD indicates camping amenities in these Corps-managed facilities, but current water-level closures affect launch and day-use rights; Bear Creek and Rocky Creek are seasonal, and Holiday Park South/Bear Creek ramps are for registered campers. Use the official Corps campground and booking information before traveling."},
    visitorFAQs: [
      {question:"Are all ramps open?",answer:"No. TPWD's April 2026 inventory lists closures; check current USACE updates."},
      {question:"Camper-only ramps?",answer:"Holiday Park South and Bear Creek are restricted to registered campers."},
      {question:"Top fishery?",answer:"TPWD rates hybrid striped bass excellent."},
    ],
    nearbyLakes:[{slug:"joe-pool-lake",name:"Joe Pool Lake"},{slug:"lake-granbury",name:"Lake Granbury"},{slug:"lake-arlington",name:"Lake Arlington"},{slug:"lake-worth",name:"Lake Worth"}],
    travelAlerts:["TPWD warned of major low-water ramp closures and campers-only launch limitations in its April 21, 2026 access inventory. The warning is historical and MUST be checked against current USACE closure reports; do not use this guide to assert a ramp is open today.","No general swim or boat-launch permission is inferred from a park's name. Confirm swimming areas, accessibility and seasonal hours with the Corps.","Clean, drain and dry watercraft and equipment under Texas invasive-species requirements before entering another reservoir."],
    historySourceUrl:"https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/benbrook/index.asp",
    historyNotes:["Congress authorized Benbrook Dam under the River and Harbor Act in March 1945, when growing flood exposure and water needs in the Fort Worth area led to additional Trinity Basin storage.","The U.S. Army Corps of Engineers started construction May 27, 1947 and finished the main project in December 1950; deliberate reservoir impoundment began September 29, 1952. The TWDB makes these separate phases explicit, helping readers distinguish completion of the physical dam from water storage.","Benbrook's earthfill dam spans roughly 9,130 feet including the spillway and remains a Corps flood-management and water-conservation asset, not just a fishing destination. Recreation options depend on operational water levels and park-specific rules, which explains the changing launch landscape."],
  },

  {
    slug: "granger-lake", name: "Granger Lake", tpwdSlug: "granger", waterDataSlug: "granger", verifiedAt: "2026-10-12", region: "prairies-lakes",
    summary: "A 4,009-acre Corps-managed San Gabriel River reservoir near Taylor with outstanding crappie and catfish, five independently named ramp/recreation sites, Corps camping, and documented zebra mussels.",
    surfaceAcres: 4009, maxDepthFeet: 50, impoundedYear: 1980, counties: ["Williamson"], nearestCities: ["Granger", "Taylor", "Georgetown"],
    waterway: "San Gabriel River and Willis Creek", riverBasin: "Brazos River Basin", authority: "U.S. Army Corps of Engineers",
    conservationPool: "504 ft msl", fluctuation: "Moderate; subject to dam operations and flood conditions", clarity: "Turbid to moderately turbid",
    identity: "Granger Lake is not primarily a largemouth-bass destination. TPWD rates crappie and catfish excellent and white bass good, while largemouth bass are poor. The former Laneport Lake flood-control project began impounding in January 1980, and the Corps manages four park areas plus a limited small-craft launch at San Gabriel Wildlife Management Area. The basin has zebra mussels; draining water and cleaning watercraft are required.",
    habitat: [
      "Flooded willows, stumps, downed timber, channel bends and laydowns dominate a shallow, cloudy reservoir, making structure more useful than generic open-water tactics.",
      "In February and early spring, crappie move into shallow timber and creek arms near spawning temperatures. In summer seek main-lake humps, drops and artificial brush, ideally located with the TPWD Habitat Structure Viewer.",
      "Spring white bass runs extend into the San Gabriel River and Willis Creek arm after sufficient inflow; do not promise predictable river runs without checking flows.",
    ],
    fish: [
      fish("crappie", "Crappie", "excellent", "spring", "The signature fishery: TPWD reports large numbers of keeper-sized fish around flooded timber; small tube jigs and minnows are effective around cover.", ["jigs-and-minnows", "vertical-jigging"]),
      fish("catfish", "Catfish", "excellent", "year-round", "Excellent blue, channel and flathead catfish fishing over river-channel cover, timber and snag areas; cut bait for blue/channel, live bait for flathead.", ["cut-bait", "live-bait"]),
      fish("white-bass", "White bass", "good", "spring", "Spring tributary movements depend on inflows; in summer white bass chase bait in the main-lake open-water zones.", ["jigs-and-minnows", "trolling", "topwater"]),
      fish("largemouth-bass", "Largemouth bass", "poor", "spring", "TPWD rates largemouth bass poor because they are less abundant; do not plan a bass-first trip here.", ["spinnerbaits", "soft-plastics"], "secondary"),
    ],
    access: "TPWD lists four Corps recreation areas (Willis Creek, Taylor, Wilson H. Fox and Friendship) and the San Gabriel WMA small-craft launch. The WMA's primitive single lane does NOT accommodate trailered boats. All Corps parks charge fees per TPWD; check active conditions with the USACE.",
    accessPoints: [
      { name:"Willis Creek",operator:"U.S. Army Corps of Engineers",kind:"park",launch:"At the mouth of Willis Creek on County Road 346, three-lane concrete ramp, picnic/day-use and TPWD-listed camping.",fee:"Corps entrance/launch fee required",availability:"TPWD lists year-round; confirm USACE (512) 859-2668 for ramp closures and campground bookings." },
      { name:"San Gabriel Wildlife Management Area launch",operator:"U.S. Army Corps of Engineers",kind:"public-ramp",launch:"From SH 95 north to County Road 347, travel roughly one mile to WMA entrance; primitive single-lane launch for canoes and jon boats ONLY; no boat trailers.",fee:"TPWD lists no fee",availability:"TPWD lists year-round; no trailer ramp. Confirm WMA restrictions and river-level status before small-craft launch." },
      { name:"Taylor Park",operator:"U.S. Army Corps of Engineers",kind:"park",launch:"South shore off FM 1331, four-lane concrete ramp. TPWD also indicates accessible facilities; verify the exact ADA route and access with the operator.",fee:"Corps entrance/launch fee required",availability:"TPWD lists year-round; check USACE (512) 859-2668 for current closure or fee notice." },
      { name:"Wilson H. Fox Park",operator:"U.S. Army Corps of Engineers",kind:"park",launch:"South shore off FM 1331, separate six-lane and two-lane concrete ramps, courtesy dock and Corps-managed recreation.",fee:"Corps entrance/launch fee required",availability:"TPWD lists year-round; confirm actual availability and accessible launch features with USACE (512) 859-2668." },
      { name:"Friendship Park",operator:"U.S. Army Corps of Engineers",kind:"park",launch:"North shore off FM 971, four-lane concrete ramp and picnic area.",fee:"Corps entrance/launch fee required",availability:"TPWD lists year-round; check USACE (512) 859-2668 for current park status." },
    ],
    camping: {name:"Willis Creek, Taylor Park, Wilson H. Fox Park and Friendship Park",summary:"TPWD reports Corps-managed lakeside campgrounds, restrooms and picnic areas around Granger Lake, with the facility chart identifying overnight facilities at Willis Creek and potentially other Corps parks. These are different from the small-craft-only San Gabriel WMA. Verify actual campsite inventory, seasonal operations, reservation availability and ADA amenities directly with USACE/official reservation provider."},
    visitorFAQs: [
      {question:"Top fishery?",answer:"TPWD rates crappie and catfish excellent; largemouth bass poor."},
      {question:"Does San Gabriel WMA accept boat trailers?",answer:"No; TPWD lists a primitive no-trailer launch for canoes and jon boats."},
      {question:"Can I camp?",answer:"Corps parks, including Willis Creek, have listed campgrounds. Confirm reservations."},
    ],
    nearbyLakes:[{slug:"lake-georgetown",name:"Lake Georgetown"},{slug:"lake-austin",name:"Lake Austin"}],
    travelAlerts:["TPWD confirms zebra mussels in Granger Lake. Clean, drain and dry boats, trailers, bait buckets and other gear; draining is legally required before leaving the lake.","The San Gabriel Wildlife Management Area primitive launch is for canoes/jon boats with NO trailers. Do not route large trailered craft to that entrance.","TPWD warns that San Gabriel River bank access on County Road 348 has a steep descent and narrow shoulder parking; assess mobility needs and traffic safety before parking."],
    historySourceUrl:"https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/granger/index.asp",
    historyNotes:[
      "The lake was first planned under the name Laneport Lake. Congress authorized that flood-control project on September 3, 1954; construction did not begin until October 24, 1972. This distinction matters when interpreting references to the reservoir's '1950s origins.'",
      "Deliberate storage began on January 21, 1980, and Corps construction was completed in February 1980. The earthfill dam and spillway are about 16,320 feet long. In addition to reducing lower San Gabriel/Brazos flooding, the lake provides public water supply and recreation.",
      "TWDB's 2013 volumetric survey reported about 4,159 acres at the 504-foot conservation pool, differing from TPWD's conventional fishing profile figure of 4,009 acres. These are survey and reporting differences, not two separate lakes."
    ],
  },
  {
    slug: "aquilla-lake", name: "Aquilla Lake", tpwdSlug: "aquilla", waterDataSlug: "aquilla", verifiedAt: "2026-10-12", region: "prairies-lakes",
    summary: "A 3,020-acre Corps reservoir near Hillsboro with two free official public boat ramps, a separate below-dam fishing pier, good crappie and catfish, timber habitat and no TPWD-listed lakeshore campground in the ramp inventory.",
    surfaceAcres: 3020, maxDepthFeet: 59.5, impoundedYear: 1983, counties: ["Hill"], nearestCities: ["Hillsboro", "Whitney", "Waco"],
    waterway: "Aquilla and Hackberry creeks, tributaries of the Brazos River", riverBasin: "Brazos River Basin", authority: "U.S. Army Corps of Engineers", conservationPool: "537.5 ft msl", fluctuation: "Typically 3–4 feet; flood operations and drought can alter ramp usability", clarity: "Stained",
    identity: "Aquilla Lake is a relatively uncrowded Corps flood-control and water-supply reservoir where public recreation is deliberately limited: TPWD lists Dairy Hill and Old School boat ramps, a separate dam tailrace fishing pier, and NO listed overnight campground in those three public-access areas. Catfish and crappie are TPWD-rated good, largemouth and white bass fair. Official sources use different initial years—TPWD's profile says 1982 impounded, but the TWDB construction record precisely dates deliberate water storage to April 29, 1983. This guide uses the documented TWDB date and explains the difference.",
    habitat:[
      "Aquilla and Hackberry creek arms contain standing timber, brush and submerged fencerows, but much of the upper shallow water is not productive in every season.",
      "TPWD has installed habitat structures at selected mapped points; anglers should use the official Habitat Structure Viewer and avoid navigating through timber at unsafe speed.",
      "Look for crappie around isolated large trees and deep brush, catfish over shallow flats or river channels, and seasonal bass around shore cover rather than inventing a universally productive hotspot.",
    ],
    fish:[
      fish("catfish","Catfish","good","year-round","TPWD rates blue and channel catfish good; drifting flats, fishing shallow brush or using cut bait near channels may be effective.",["cut-bait","live-bait"]),
      fish("crappie","Crappie","good","spring","Look for submerged brush piles, isolated large trees and minnows or small jigs as fish move with temperature.",["jigs-and-minnows","vertical-jigging"]),
      fish("largemouth-bass","Largemouth bass","fair","spring","TPWD rates the catch opportunity fair. Slow soft plastics and spinnerbaits around creek channels, fencerows and trees are lake-specific choices.",["soft-plastics","spinnerbaits","crankbaits"]),
      fish("white-bass","White bass","fair","spring","White bass are a secondary fishery; trolling or small lures over windswept flats can work, but verify current reports.",["trolling","jigs-and-minnows"],"secondary"),
      fish("sunfish","Sunfish","fair","summer","TPWD considers sunfish a secondary fishery here; shoreline fishing is more practical from permitted areas.",["jigs-and-minnows"],"secondary"),
    ],
    access:"TPWD's public access inventory lists two free year-round Corps boat ramps, Dairy Hill and Old School. The third listed facility, Tailrace, is BELOW the dam and offers a free fishing pier but explicitly NO boat ramp. A generic Google lake pin cannot substitute for the ramp entrance maps.",
    accessPoints:[
      {name:"Dairy Hill Ramp",operator:"U.S. Army Corps of Engineers",kind:"public-ramp",launch:"East shore south of Peoria near southeast end of FM 1947 bridge. Boat ramp suitable for different boat types; TPWD lists restrooms and parking.",fee:"TPWD lists NO fee",availability:"Historically year-round; contact USACE (254) 694-3189 about current lake/launch status."},
      {name:"Old School Ramp",operator:"U.S. Army Corps of Engineers",kind:"public-ramp",launch:"West shore off FM 933 between Waco and Whitney. TPWD lists an all-boats ramp, restrooms and parking.",fee:"TPWD lists NO fee",availability:"Historically year-round; verify ramp clearance with USACE (254) 694-3189."},
      {name:"Tailrace public fishing pier",operator:"U.S. Army Corps of Engineers",kind:"park",launch:"Below Aquilla Dam off Highway 310. Public fishing pier; TPWD explicitly states NO boat launch at this site.",fee:"TPWD lists NO fee",availability:"TPWD lists year-round shore access; water releases and Corps operations may change safety or access."}
    ],
    visitorFAQs: [
      {question:"Public boat ramps?",answer:"Dairy Hill and Old School, both historically free Corps ramps."},
      {question:"Can I launch from Tailrace?",answer:"No. It has a fishing pier but no boat ramp."},
      {question:"Can I camp at the listed ramps?",answer:"TPWD's three listed access facilities do not identify campgrounds."},
    ],
    nearbyLakes:[{slug:"lake-whitney",name:"Lake Whitney"},{slug:"lake-waco",name:"Lake Waco"}],
    travelAlerts:["Aquilla Tailrace is a fishing-pier area with NO boat ramp. Do not use tailrace directions when hauling a boat.","TPWD's access table does not list campgrounds at Dairy Hill, Old School or Tailrace. Don't assume on-site camping; use verified neighboring campground sources or ask USACE.","TPWD's listing says impounded in 1982 while the TWDB historical narrative dates the start of deliberate impoundment to April 29, 1983; the latter is used for chronology, not a fabricated reconciliation."],
    historySourceUrl:"https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/aquilla/index.asp",
    historyNotes:[
      "Aquilla Dam and Lake were built on Aquilla and Hackberry creeks as part of a wider Brazos Basin flood-control and public-water supply program. The project remains federally owned and Corps-operated, with water rights involving the Brazos River Authority.",
      "TWDB documents that construction started June 14, 1978; deliberate impoundment began April 29, 1983; and the dam was completed May 16, 1983. TPWD's traditional fishing summary gives 1982 as 'impounded,' a different high-level project designation. When reporting a precise first-storage date, the TWDB's historical account is more specific.",
      "A 2014 TWDB reservoir survey measured about 3,084 surface acres at conservation pool, while TPWD's recreational-lake directory presents 3,020 acres. The changing acreage reflects measurement vintages and stage assumptions; neither should be confused with currently exposed shoreline area."
    ],
  },

  {
    slug: "white-rock-lake", name: "White Rock Lake", tpwdSlug: "white_rock", verifiedAt: "2026-10-12", region: "prairies-lakes",
    summary: "An urban Dallas reservoir and trail park with excellent TPWD-rated largemouth bass and crappie, five named free-access boat ramps, municipal motor restrictions, no camping, and a documented 1910–1912 construction history.",
    surfaceAcres: 1088, maxDepthFeet: 20, impoundedYear: 1912, counties: ["Dallas"], nearestCities: ["Dallas"],
    waterway: "White Rock Creek, a Trinity River tributary", riverBasin: "Trinity River Basin", authority: "City of Dallas Parks and Recreation",
    conservationPool: "approximately 458 ft msl", fluctuation: "Typically about 1–2 ft according to TPWD; flood, drought and sediment affect usable shore", clarity: "Stained",
    identity: "White Rock Lake is Dallas's city-park lake, not a privately developed resort reservoir. The recreation emphasis is public shoreline access, sailing, walking and cycling, birding and fishing piers. TPWD rates largemouth bass and white crappie excellent, while catfish are fair. The surrounding park has free TPWD-listed launches but prohibits overnight camping. Dallas's current city ordinance states a general motor limit of 10.5 horsepower; TPWD's older fishing facts page instead says 9.9 horsepower, so use the current city code rather than treating the older number as controlling.",
    habitat: [
      "The lake has sparse underwater vegetation but beds of bulrush, water willow and reeds, plus creek mouths and fishing piers where bass use accessible structure.",
      "TPWD identifies white crappie movements into White Rock Creek in spring. Anglers should account for pier closures, legal shoreline access and high urban use instead of presenting private club property as public.",
      "The lake's relatively shallow maximum depth and changing sedimentation mean old acreage and water-storage figures differ. Use signed entrances and current City of Dallas water and recreation updates.",
    ],
    fish: [
      fish("largemouth-bass","Largemouth bass","excellent","spring","TPWD rates the lake excellent for largemouth bass; fish the reed beds, creek mouths and structure around Dickson Branch using lures suited to shallow urban water.",["soft-plastics","spinnerbaits","topwater"]),
      fish("crappie","Crappie","excellent","spring","TPWD identifies white crappie as an excellent fishery, particularly up White Rock Creek during the spring movement and around fishing piers.",["jigs-and-minnows","vertical-jigging"]),
      fish("catfish","Catfish","fair","year-round","Channel catfish are present, but TPWD rates the lake fair for catfish; don't market it as a trophy catfish destination.",["cut-bait","live-bait"],"secondary"),
    ],
    access: "TPWD identifies five distinct city-operated, no-fee boat-access locations. West Lawther, Big Thicket, Corinthian Sailing Club, East Lawther and Filter Building have different lanes and parking limitations. Verify the public-entry conditions before towing; parking and club access are not identical at every location.",
    accessPoints: [
      {name:"West Lawther Ramp",operator:"City of Dallas",kind:"public-ramp",launch:"West shore opposite Fisher Road on West Lawther Drive; from I-30 north on East Grand, Winsted, White Rock Road, then West Lawther. One-lane ramp, approximately 30 parking spaces.",fee:"No fee according to TPWD",availability:"TPWD lists year-round; municipal operations, park hours and current access take precedence. Dallas Parks (214) 670-8281."},
      {name:"Big Thicket Boat Ramp",operator:"City of Dallas",kind:"public-ramp",launch:"East shore via Buckner Boulevard, west on Mockingbird Lane, south on East Lawther Drive. Three concrete lanes with up to 30 vehicle spaces.",fee:"No fee according to TPWD",availability:"TPWD lists year-round; verify City of Dallas operator status."},
      {name:"Corinthian Sailing Club Ramp",operator:"City of Dallas / sailing club",kind:"marina",launch:"East Lawther Drive on eastern shore via Mockingbird and Buckner. TPWD lists one ramp lane and 20 spaces.",fee:"TPWD reports no fee, but confirm any membership or shared-facility restrictions",availability:"Year-round in TPWD listing; do not assume unrestricted private-club amenities."},
      {name:"East Lawther Ramp",operator:"City of Dallas",kind:"public-ramp",launch:"East shore off East Lawther Drive; one ramp lane with courtesy dock, NO on-site vehicle parking and limited nearby parking.",fee:"No fee according to TPWD",availability:"TPWD lists year-round but large trailer parking is not provided at the ramp."},
      {name:"Filter Building Ramp",operator:"City of Dallas",kind:"public-ramp",launch:"West shore via East Grand, Winsted and White Rock Road under the bridge, beyond Filter Building Event Venue. One lane and little/no trailer parking.",fee:"No fee according to TPWD",availability:"TPWD lists year-round; verify city parking, event and launch restrictions."},
    ],
    specialRules: true,
    campingProhibited: true,
    nearbyLakes:[{slug:"lake-ray-hubbard",name:"Lake Ray Hubbard"},{slug:"joe-pool-lake",name:"Joe Pool Lake"},{slug:"bachman-lake",name:"Bachman Lake"}],
    nearbyDestinations:[{slug:"dallas-arboretum-and-botanical-garden",name:"Dallas Arboretum and Botanical Garden",reason:"Lakeside garden and seasonal walking destination with views across White Rock Lake; admission and gardens are separately operated."}],
    travelAlerts:[
      "The current Dallas City Code section 32-40 generally prohibits operating a boat with a motor rated more than 10.5 horsepower on White Rock Lake, with defined exceptions. TPWD's older facts summary quotes a different 9.9-HP figure. Consult current City Code before boating; do not rely on an outdated fishing summary to determine the legal limit.",
      "TPWD expressly says NO camping is allowed at White Rock Lake. The City of Dallas designates picnic, sailing, walking, fishing and daytime park uses; do not imply campsite or RV-hookup availability.",
      "Dallas Parks gives its lake area as 1,015 acres, TPWD fishing facts says 1,088 acres, and a TWDB 2015 survey shows 995 acres at the specified conservation stage. These refer to different measurement conventions/vintages, not three distinct water bodies.",
    ],
    historySourceUrl:"https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/white_rock/index.asp",
    visitorSourceUrl:"https://dallasparks.org/235/White-Rock-Lake",
    localRegulationsSourceUrl:"https://codelibrary.amlegal.com/codes/dallas/latest/dallas_tx/0-0-0-115288",
    liveDataNote:"White Rock Lake is a City of Dallas reservoir without a verified compatible TWDB real-time water-level source in this guide. Check the city park's current information, alerts and official maps before travel; an undated reference elevation is not a live level.",
    historyNotes:[
      "Dallas faced worsening shortages in the early twentieth century. Construction on White Rock Dam began in March 1910 and the earthfill dam was completed in September 1911, during a period of municipal water-system expansion.",
      "TWDB records the reservoir as filled in August 1912; TPWD's simple angling facts sheet labels the lake 'impounded 1910,' apparently using the beginning of the project era rather than the detailed fill event. The guide retains the TWDB completion/filling chronology instead of repeating an oversimplified single year.",
      "The reservoir became a public recreational centerpiece as Dallas secured larger drinking-water sources. Today the Bath House Cultural Center, shoreline trails and public fishing access make its urban visitor role very different from a Corps campground reservoir. TWDB's 2015 survey measured roughly 995 surface acres at its stated conservation level, while agency visitor summaries use different acreage figures."
    ],
    visitorFAQs:[
      {question:"Does White Rock Lake allow overnight camping?",answer:"No. TPWD explicitly says camping is not allowed around White Rock Lake. Use separate established accommodations in Dallas."},
      {question:"Can a boat with a large motor use White Rock Lake?",answer:"Dallas City Code 32-40 generally prohibits operation with motors above 10.5 horsepower, with certain official/authorized exceptions. TPWD's older fishing summary says 9.9; check current Dallas ordinances and park rules before launching."},
      {question:"Where are the public ramps?",answer:"TPWD lists West Lawther, Big Thicket, Corinthian Sailing Club, East Lawther and Filter Building ramps. All show no launch fee, but parking and access vary by facility."},
      {question:"Is the lake good for fishing?",answer:"TPWD rates largemouth bass and crappie excellent; catfish fair. The creek mouths, reed beds and fishing piers are important public fishing environments."},
      {question:"Why do sources report 1910 and 1912?",answer:"TWDB dates construction start to March 1910, dam completion to September 1911 and reservoir filling to August 1912. TPWD's angling facts simplifies the history to 'impounded 1910'."},
    ],
  },


  {
    slug: "bardwell-lake", name: "Bardwell Lake", tpwdSlug: "bardwell", waterDataSlug: "bardwell", verifiedAt: "2026-10-13", accessReviewedAt: "2026-10-13", region: "prairies-lakes",
    summary: "A 3,138-acre USACE reservoir on Waxahachie Creek near Ennis with strong white bass, hybrids, camping, and a consequential distinction between free, camper-only and temporarily closed launch facilities.",
    surfaceAcres: 3138, maxDepthFeet: 43, impoundedYear: 1965, counties: ["Ellis"], nearestCities: ["Ennis", "Waxahachie", "Bardwell"],
    waterway: "Waxahachie Creek above Chambers Creek", riverBasin: "Trinity River Basin", authority: "U.S. Army Corps of Engineers", conservationPool: "421 ft msl", fluctuation: "TPWD lists roughly four feet under normal conditions; flooding can change access", clarity: "Moderately clear to milky",
    identity: "Known as both Bardwell Lake and Lake Bardwell, this Corps reservoir was built for flood control and municipal water conservation, not as a private shoreline resort. TPWD's standout fishery is white bass, while the Corps lists public ramps, fee day-use parks and designated reservable campgrounds. Operator park status and older boating text currently disagree on some closures; rely on the most recent Corps park notice and direct operator confirmation before towing.",
    habitat: [
      "Hydrilla is prevalent north of the State Highway 34 bridge, making shallow-water vegetation a viable largemouth pattern. The upper creek reaches are silted and can become too shallow for safe motorboat passage.",
      "Open-water white bass and stocked hybrid striped bass feed over main-lake structure. The dam face, ledges and humps are more reliable than generic shoreline casting advice for those fish.",
      "Use TPWD's white-bass reports and current water levels to choose between main-lake schooling fish, structure-oriented crappie and catfish, and the shallow vegetation fishery."
    ],
    fish: [
      fish("white-bass","White bass","excellent","fall","TPWD rates white bass excellent. Look for schooling activity and bird concentrations during cooler months; avoid unsafe shallow upper reaches.",["topwater","vertical-jigging","trolling"]),
      fish("hybrid-striped-bass","Hybrid striped bass","good","summer","Stocked hybrids use open-water cover and can be pursued with downrigging or other trolling and vertical techniques.",["trolling","vertical-jigging","live-bait"]),
      fish("catfish","Catfish","good","year-round","Good-rated catfish can be targeted with fresh bait near channel edges and structure; choose legal locations away from courtesy docks and ramps.",["cut-bait","live-bait"]),
      fish("crappie","Crappie","good","spring","Good crappie fishing centers on brush and submerged wood, with seasonal movement between shallower spawning cover and deeper structure.",["jigs-and-minnows","vertical-jigging"]),
      fish("largemouth-bass","Largemouth bass","fair","spring","TPWD rates largemouth fair overall despite improved vegetation cover north of the Highway 34 bridge.",["soft-plastics","crankbaits","spinnerbaits"],"secondary"),
      fish("sunfish","Sunfish","poor","summer","TPWD rates sunfish poor; this is not a recommended sunfish-first destination.",["jigs-and-minnows"],"secondary"),
    ],
    access: "The Corps operates designated public launches at Love Park, Little Mustang, High View, Mott and Waxahachie Creek parks. The TPWD State Public Ramp is marked CLOSED. Little Mustang is the Corps-listed free day-use launch; camping and launch permissions differ elsewhere. The Corps home page lists Waxahachie Creek Park closed and its older boating page includes a sweeping flood-closure notice, so current status must be resolved with the lake office (972) 875-5711 immediately before travel.",
    accessPoints: [
      { name: "Love Park", operator: "U.S. Army Corps of Engineers", kind: "public-ramp", launch: "Southeast side near Ennis via SH 34, Lakeview Drive and park entrance; four-lane ramp and day-use shelter. No overnight camping.", fee: "USACE lists a day-use/boat-launch charge; verify current amount", availability: "Operator posts park status separately from the older boating notice. Confirm today's ramp status before towing." },
      { name: "Little Mustang Creek Park", operator: "U.S. Army Corps of Engineers", kind: "public-ramp", launch: "Upper creek area; Corps lists a four-lane ramp, courtesy dock and day-use shoreline access.", fee: "USACE identifies this park as free for day use", availability: "Corps FAQ identifies 24-hour access, subject to flood or maintenance closure; no campground." },
      { name: "High View Park", operator: "U.S. Army Corps of Engineers", kind: "park", launch: "Western shore off SH 34; four-lane ramp, courtesy dock and established campground. The Corps lists water/electric campsite hookups.", fee: "Day-use/launch fee or valid pass; campground reservation separate", availability: "USACE lists year-round camping, but confirm water level, park entrance and reservations directly." },
      { name: "Mott Park", operator: "U.S. Army Corps of Engineers", kind: "park", launch: "West shore via SH 34 and FM 985; Corps campground and bank-fishing areas are separate from open-water boating.", fee: "Campground or day-use fees apply as posted", availability: "Corps treats camping as seasonal; verify park and ramp status for the intended date." },
      { name: "Waxahachie Creek Park", operator: "U.S. Army Corps of Engineers", kind: "park", launch: "Waxahachie Creek arm off SH 34; two four-lane ramps and campground, with potentially shallow upper-creek navigation.", fee: "Fee required when access is open", availability: "USACE's lake status page lists the park and ramp closed; do not assume entry until the Corps confirms reopening." },
    ],
    campingUrl:"https://www.swf-wc.usace.army.mil/bardwell/Recreation/Camping/",
    camping: {name:"High View Park, Mott Park and Waxahachie Creek Park",summary:"USACE requires reservations for designated camping. High View is listed year-round with 39 water/electric campsites; Mott and Waxahachie Creek are seasonal, and the Corps currently lists Waxahachie Creek closed. Love and Little Mustang are day-use facilities, not overnight campgrounds. Check current Recreation.gov inventory and Corps advisories; do not infer access from an old TPWD ramp list."},
    historySourceUrl:"https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/bardwell/index.asp",
    visitorSourceUrl:"https://www.swf-wc.usace.army.mil/bardwell/",
    historyNotes:[
      "Waxahachie Creek's flood-control and water-supply project received federal authorization under the Flood Control Act of March 31, 1960. Construction began in August 1963, after Trinity River Authority coordination established a route for regional water supply.",
      "TWDB records deliberate impoundment on November 20, 1965 and physical dam completion on March 27, 1966. The Corps' shorter historical summary calls the project completed in 1965; those dates describe different stages rather than two separate reservoirs.",
      "Bardwell's water-allocation arrangements helped supply Ennis and Waxahachie while the Corps managed flood storage above conservation pool. The 1965 impoundment date should not be mistaken for 1966 completion, nor should flood-pool elevations be described as normal operating water levels."
    ],
    visitorFAQs:[
      {question:"Which Bardwell Lake boat launch is free?",answer:"USACE identifies Little Mustang Creek Park as the free public day-use ramp. It is not a campsite. Verify same-day opening if flooding or repairs are possible."},
      {question:"Can I camp at Love Park?",answer:"No. The Corps lists Love Park as day-use only. High View, Mott and Waxahachie Creek are the named camping parks, with operator booking requirements and varying seasons."},
      {question:"Are the ramps open after heavy rain?",answer:"Not necessarily. Corps park status and an older boating flood notice differ. Consult the Corps Bardwell status page or call the lake office before towing."},
      {question:"What fish is Bardwell known for?",answer:"TPWD rates white bass excellent, hybrids and catfish good, and largemouth bass fair. Upper-end hydrilla improves cover but does not change the lake-wide published rating."},
      {question:"When was Bardwell Lake built?",answer:"Construction started in 1963, impoundment began November 20, 1965, and TWDB records completion March 27, 1966."}
    ],
    nearbyLakes:[{slug:"joe-pool-lake",name:"Joe Pool Lake"},{slug:"cedar-creek-reservoir",name:"Cedar Creek Reservoir"},{slug:"richland-chambers-reservoir",name:"Richland-Chambers Reservoir"}],
    travelAlerts:["USACE's park-status page and older boating information have conflicting closure language. Do not label an access point open based solely on a published seasonal schedule.","High View Marina is permanently closed according to USACE; it must not be advertised as an operating concession.","Upper Waxahachie Creek can be very shallow even when lower-lake ramps are serviceable."],
  },
  {
    slug: "lake-bastrop", name: "Lake Bastrop", tpwdSlug: "bastrop", verifiedAt: "2026-10-13", accessReviewedAt: "2026-10-13", region: "prairies-lakes",
    summary: "A 906-acre LCRA-managed warm-water cooling reservoir in Bastrop County with excellent largemouth fishing, two separately operated park entrances, reservable lakeside stays, paddling and swimming.",
    surfaceAcres: 906, maxDepthFeet: 60, impoundedYear: 1964, counties: ["Bastrop"], nearestCities: ["Bastrop", "Elgin", "Smithville"],
    waterway: "Spicer Creek, tributary of Piney Creek and the Colorado River", riverBasin: "Colorado River Basin", authority: "Lower Colorado River Authority", conservationPool: "450 ft msl", fluctuation: "Typically 1–2 feet under normal operations", clarity: "Clear to slightly stained",
    identity: "Lake Bastrop was built in 1964 to provide cooling water for LCRA's Sim Gideon power station, a reason its winter fishing differs from deeper Highland Lakes reservoirs. Water can become unusually hot in summer. North Shore and South Shore are distinct LCRA reservation destinations; the smaller Bastrop State Park lake is another waterbody and must never be confused with this reservoir.",
    habitat:["LCRA and TPWD document substantial beds of hydrilla, southern and marine naiad, coontail and pondweed, with creek channels, humps and ledges beneath the vegetation.","TPWD describes above-average winter and spring bass activity related to power-plant warming, but cautions that summer heat can reduce fishing success.","Structure-oriented crappie are sparse, while channel catfish and sunfish provide different expectations from the primary largemouth-bass fishery."],
    fish:[
      fish("largemouth-bass","Largemouth bass","excellent","spring","TPWD rates the bass fishery excellent, particularly February through June along vegetated flats; most fish are not record-sized trophies.",["crankbaits","soft-plastics","topwater","spinnerbaits"]),
      fish("catfish","Catfish","good","spring","Good channel catfish populations are attractive in spring and early summer before dense aquatic vegetation complicates bottom fishing.",["cut-bait","live-bait"]),
      fish("crappie","Crappie","fair","spring","TPWD identifies a low-density crappie fishery. This is not a reliable crappie-first alternative to better-rated area lakes.",["jigs-and-minnows","vertical-jigging"],"secondary"),
      fish("sunfish","Sunfish","fair","summer","TPWD rates sunfish fair; sheltered park shorelines can suit casual outings with suitable tackle.",["jigs-and-minnows"],"secondary"),
    ],
    access:"The LCRA runs two separately ticketed park entrances. North Shore Park is reached via FM 1441 (603 FM 1441); South Shore Park via South Shore Road (375 South Shore Road). TPWD lists one-lane concrete ramps at both, with entrance fees. LCRA publishes park-specific camping, accessibility information, swimming areas, trail maps and reservations. Construction notices at South Shore include restroom work during 2026; confirm facilities before travel.",
    accessPoints:[
      {name:"Lake Bastrop North Shore Park",operator:"Lower Colorado River Authority",kind:"park",launch:"603 FM 1441, Bastrop. One-lane concrete public launch plus trailer parking; LCRA publishes a separate pier, swimming area and day-use facilities.",fee:"LCRA park admission is charged; confirm current launch fee and pass terms",availability:"LCRA lists daily park operations; check low-water status, rentals and admission before arrival."},
      {name:"Lake Bastrop South Shore Park",operator:"Lower Colorado River Authority",kind:"park",launch:"375 South Shore Road, Bastrop, off SH 21. One-lane concrete ramp, fishing piers, paddle launch and designated swimming area.",fee:"LCRA charges park admission; reservations and rentals priced separately",availability:"LCRA's booking site warned of restroom work starting in 2026. Confirm which washrooms, launches and trails are available before arrival."},
    ],
    campingUrl:"https://lcraparks.com/parks/lake-bastrop-south-shore-park",
    camping:{name:"Lake Bastrop North Shore Park and South Shore Park",summary:"LCRA publishes distinct overnight inventories: North Shore includes seven full-hookup RV sites, Airstream units and glamping/cabins; South Shore has both full-hookup and water/electric RV sites, cabins, and other stays. LCRA's dated South Shore park map lists 31 full-hookup and 29 water/electric campsites, while its marketing overview describes different counts; confirm the current live booking inventory rather than claiming every mapped pitch is reservable. Day-use tickets are not overnight permissions."},
    historySourceUrl:"https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/bastrop/index.asp",
    visitorSourceUrl:"https://lcraparks.com/parks/lake-bastrop-south-shore-park",
    historyNotes:[
      "Texas Water Development Board describes the site on Spicer Creek above Piney Creek, a tributary in the Colorado River watershed. A May 6, 1963 water-right permit preceded dam construction by Brown & Root and contractor H. B. Zachry, and the lake began filling upon completion in 1964.",
      "Unlike most Corps flood-control reservoirs, Lake Bastrop was created principally as power-plant cooling storage for LCRA's Sim Gideon generation complex, with additional public recreation. LCRA's own facilities history dates Sim Gideon units to 1965, 1968 and 1972.",
      "The engineered water regime explains both the relatively small normal water-level fluctuations and the unusual temperature profile that TPWD says favors winter and spring bass but can make summer fishing difficult. LCRA's North Shore and South Shore parks later developed as separate public recreation and overnight destinations."
    ],
    visitorFAQs:[
      {question:"Are Lake Bastrop and Bastrop State Park Lake the same?",answer:"No. Lake Bastrop is an LCRA reservoir east of Bastrop; Bastrop State Park's smaller lake is a separate park feature. Use each park's exact entrance address."},
      {question:"Where are the two Lake Bastrop boat ramps?",answer:"TPWD lists one-lane concrete launches at North Shore (603 FM 1441) and South Shore (375 South Shore Road). Both are LCRA fee parks."},
      {question:"Can I swim or camp at Lake Bastrop?",answer:"LCRA lists designated swimming areas and reservable overnight accommodations at its North and South Shore parks. Confirm water conditions, current site types and booking availability at the operator."},
      {question:"What is the best fishing season?",answer:"TPWD rates largemouth bass excellent and highlights February through June. Power-plant cooling can warm winter water, while summer heat can make fishing less productive."},
      {question:"Does the lake have special fishing restrictions?",answer:"Yes. TPWD flags special bass rules and LCRA's ban on bowfishing. Check the current TPWD Outdoor Annual and LCRA rules before harvesting fish."},
    ],
    specialRules:true,
    liveDataNote:"A TWDB real-time numeric lake gauge was not independently confirmed for this reservoir. Use current LCRA park and TPWD notices; a stable historic pool elevation does not verify today's water or launch conditions.",
    nearbyLakes:[{slug:"lake-somerville",name:"Lake Somerville"},{slug:"fayette-county-reservoir",name:"Fayette County Reservoir"},{slug:"lake-austin",name:"Lake Austin"}],
    travelAlerts:["LCRA's South Shore reservation website has a restroom-construction advisory for 2026. Confirm sanitation and accessible facilities before arrival.","TPWD notes special bass regulations and the LCRA prohibition on bowfishing; ordinary statewide bag-limit assumptions are not enough.","Lake Bastrop is not the separate small lake inside Bastrop State Park, and park entry and camping permissions are not interchangeable."],
  },


  {
    slug: "lake-arlington", name: "Lake Arlington", tpwdSlug:"arlington", waterDataSlug:"arlington", region:"prairies-lakes", verifiedAt:"2026-10-13", accessReviewedAt:"2026-10-13",
    summary:"An urban Tarrant County Village Creek reservoir with outstanding largemouth and channel-catfish opportunities, three named municipal boat ramps, city-issued boating permits and a longstanding power-plant cooling-water history.",
    surfaceAcres:1939, maxDepthFeet:51, impoundedYear:1957, counties:["Tarrant"], nearestCities:["Arlington","Fort Worth","Kennedale"],
    waterway:"Village Creek, tributary of the West Fork Trinity River", riverBasin:"Trinity River Basin", authority:"City of Arlington", conservationPool:"550 ft msl", fluctuation:"TPWD lists approximately 12 feet", clarity:"Stained",
    identity:"Lake Arlington is a working water-supply and former power-plant cooling reservoir, not a large park campground. Three city-managed shoreline park ramps are listed by TPWD, with a separate Arlington boat-usage permit applying even when the ramp itself is operating. TPWD rates largemouth bass and channel catfish excellent, white bass and crappie good, and hybrids poor; its fishing narrative contains older hybrid stocking language conflicting with the newer 'stocking discontinued' notice. Verify today's permit prices and local operating rules with Arlington rather than treating archival rates as guaranteed current charges.",
    habitat:[
      "Most of the lake has little aquatic vegetation, despite historic patches of hydrilla; TPWD instead identifies submerged timber and stump fields marked by buoys, as well as isolated water willow and buttonbush.",
      "The historically warm discharge area near the Handley power-plant tailrace concentrated sportfish. Its historical role is useful context, not a guarantee of current plant operation or fish concentrations.",
      "Winter largemouth use warmer areas and submerged cover; spring/summer crappie orient around structure, while open-water white bass and catfish provide different seasonal options."
    ],
    fish:[
      fish("largemouth-bass","Largemouth bass","excellent","winter","TPWD rates largemouth excellent and notes winter often produces the larger fish. Target timber edges, structure and sheltered shoreline vegetation.",["soft-plastics","spinnerbaits","crankbaits","topwater"]),
      fish("channel-catfish","Channel catfish","excellent","summer","TPWD rates channel catfish excellent; creek channels and shaded structure offer different tactics than open-water bass fishing.",["cut-bait","live-bait"]),
      fish("white-bass","White bass","good","summer","TPWD rates white bass good, with warm-season schools using open-water bait concentrations and main-lake structure.",["vertical-jigging","trolling","topwater"]),
      fish("crappie","Crappie","good","spring","TPWD rates white crappie good; fish submerged stump fields and brush without assuming the entire shoreline has vegetation.",["jigs-and-minnows","vertical-jigging"]),
      fish("hybrid-striped-bass","Hybrid striped bass","poor","summer","Despite archival advice on hybrids and a former stocking program, TPWD's displayed quality is poor and stocking is described as discontinued. Do not plan a hybrid-focused trip from old reports.",["trolling","vertical-jigging"],"secondary"),
      fish("sunfish","Sunfish","fair","summer","Sunfish are a fair secondary fishery, particularly along sheltering shoreline plants.",["jigs-and-minnows"],"secondary"),
    ],
    access:"TPWD lists two eight-lane public ramps at Richard Simpson Park and Bowman Springs Park and a separate two-lane Eugene McCray Park ramp. Richard Simpson and Bowman Springs are operated by Arlington; Eugene McCray by Fort Worth. TPWD's published Arlington usage permit schedule lists daily and annual options, but its charges may be stale. Verify actual permit, parking, launch and park status with the cities. None of these three municipal ramps is documented as an overnight campsite.",
    accessPoints:[
      {name:"Richard Simpson Park boat ramp",operator:"City of Arlington",kind:"public-ramp",launch:"From I-20 take Green Oaks Boulevard north to Arkansas Lane; continue west to park. Eight-lane launch with parking, docks and documented accessible park facilities.",fee:"Arlington lake boat permit/day use charge; confirm current city fee",availability:"TPWD lists year-round; verify gate/launch opening and city permit requirements (817) 451-6860."},
      {name:"Bowman Springs Park boat ramp",operator:"City of Arlington",kind:"public-ramp",launch:"From I-20 north on Green Oaks Road, west on Poly Webb Road to lake park. Eight-lane launch with parking and courtesy dock.",fee:"City of Arlington lake use permit/day rate; confirm before travel",availability:"TPWD lists year-round operation; confirm the city's current rules and any water-quality/park alert."},
      {name:"Eugene McCray Park boat ramp",operator:"City of Fort Worth",kind:"public-ramp",launch:"West shore: from Loop 820 east on Ramey Avenue, south on Quail Road to park. Two-lane concrete ramp and documented public parking.",fee:"TPWD lists Arlington boat usage permits on Lake Arlington; confirm Fort Worth park entry and lake permit requirements",availability:"TPWD lists year-round operation, but confirm actual operating status (817) 536-4775."},
    ],
    camping:{name:"No TPWD-listed camping at public boat-launch parks",summary:"TPWD's Arlington lake access matrix lists no camping facilities at Richard Simpson, Bowman Springs or Eugene McCray. Plan a separate established off-site campground or hotel rather than treating any launch ramp, fishing pier or paddle launch as an overnight site."},
    historySourceUrl:"https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/arlington/index.asp",
    visitorSourceUrl:"https://www.arlingtontx.gov/Parks-Places/Parks-Trails/Park-Finder/Richard-Simpson-Park",
    historyNotes:[
      "The City of Arlington developed a Village Creek municipal-industrial storage project serving local water supply and the former Handley electrical-generation cooling system. A 1954 water permit was amended in 1955 to expand storage and allow the electric company additional industrial withdrawals.",
      "The current TWDB reservoir history dates the beginning of construction to May 15, 1956, dam completion to March 31, 1957, and deliberate impoundment to July 19, 1957. A much older 1964 TWDB historical bulletin reverses the two 1957 stage dates; treat the exact chronology as a source-vintage discrepancy rather than silently reciting both as consistent.",
      "TWDB's updated survey description lists 1,926 surface acres at conservation pool, while TPWD's fisheries profile lists 1,939 acres. The difference reflects separate source vintages or measurement conventions; avoid presenting a historic map-based area as today's precise water extent. The earthfill dam and 550-foot conservation level remain important context for modern ramp and shoreline planning."
    ],
    visitorFAQs:[
      {question:"Do I need a permit to launch on Lake Arlington?",answer:"TPWD reports a City of Arlington lake-use boat permit with daily or annual options. Confirm the current amount and rules with the city's Parks and Recreation or lake office; a free-looking park entrance does not waive boat requirements."},
      {question:"How many public boat ramps are on Lake Arlington?",answer:"TPWD names Richard Simpson Park, Bowman Springs Park and Eugene McCray Park, with eight, eight and two lanes respectively. Check current open status and lake level."},
      {question:"Is overnight camping offered at the lake ramps?",answer:"None of the three TPWD public-access entries lists camping. Book established off-site accommodation instead of assuming day-use piers or launch parking allow overnight stays."},
      {question:"What fish should I target?",answer:"TPWD rates largemouth bass and channel catfish excellent, white bass and crappie good, and hybrids poor. Historic hybrid stocking narrative should not override its displayed current quality assessment."},
      {question:"Why do TWDB and TPWD show different lake areas?",answer:"TPWD lists 1,939 acres while TWDB's surveyed conservation-pool table lists 1,926. Such figures come from different source methodologies or vintages, not an exact real-time level."},
      {question:"Is there a public paddling trail?",answer:"TPWD maintains the Lake Arlington Paddling Trail guide; confirm suitable launch sites and conditions separately from motorboat permit and no-wake areas."},
    ],
    travelAlerts:["TPWD's boat-permit prices and ramp open-year-round labels are published reference information, not live city fee or gate certification.","This reservoir has a historical cooling-water discharge, but do not imply the generating station still operates on a given day.","Submerged stumps and structure pose navigation hazards outside established channels."],
    nearbyLakes:[{slug:"benbrook-lake",name:"Benbrook Lake"},{slug:"joe-pool-lake",name:"Joe Pool Lake"},{slug:"grapevine-lake",name:"Grapevine Lake"}],
  },
  {
    slug: "cedar-lake-cleburne-state-park", name: "Cedar Lake at Cleburne State Park", tpwdSlug:"cleburnesp", region:"prairies-lakes", verifiedAt:"2026-10-13", accessReviewedAt:"2026-10-13",
    summary:"The no-wake spring-fed Cedar Lake inside Cleburne State Park, with an accessible covered fishing pier, state-park camping, swimming, a one-lane boat ramp and restored CCC-era park infrastructure.",
    surfaceAcres:107,maxDepthFeet:29,impoundedYear:1934,counties:["Johnson"],nearestCities:["Cleburne","Glen Rose","Joshua"],
    waterway:"Cedar Lake and the Camp Creek watershed",riverBasin:"Brazos River Basin",authority:"Texas Parks and Wildlife Department",conservationPool:"Check TPWD park lake conditions",fluctuation:"TPWD states one to three feet",clarity:"Moderately clear",
    identity:"Cedar Lake at Cleburne State Park is the park's small accessible no-wake lake, NOT the much larger municipal Lake Pat Cleburne southwest of town. TPWD's fisheries profile uses 107 acres, whereas its current park visitor page calls Cedar Lake 116 acres; retain both source-specific measures instead of fabricating a reconciled survey. The park offers a covered accessible fishing pier, shoreline access, park camping, rental paddlecraft and swimming. Motorized boats must obey the whole-lake no-wake rule; personal watercraft are not allowed.",
    habitat:[
      "Shoreline cattails, bulrush, water willow, submerged logs, brush and dam-side flood-control structures create local cover at this small lake.",
      "TPWD's fisheries team and park staff installed an artificial fish habitat reef beneath and near the covered fishing pier around 2016, improving accessible bank-fishing opportunities.",
      "Bass use shallow vegetation and structure, while channel catfish, crappie and sunfish offer different park-visitor fishing options. Do not confuse public piers with boat launches or with campground-specific water access."
    ],
    fish:[
      fish("largemouth-bass","Largemouth bass","good","spring","TPWD rates bass good; spinnerbaits, shallow crankbaits and soft plastics around cattails, water willow and fallen limbs are suggested.",["spinnerbaits","crankbaits","soft-plastics"]),
      fish("catfish","Catfish","good","year-round","Channel catfish are rated good; drift fishing where legal or bank-fishing with cut bait can be productive.",["cut-bait","live-bait"]),
      fish("crappie","Crappie","fair","spring","TPWD rates crappie fair. Use small jigs or live minnows around visible brush and submerged habitat structures.",["jigs-and-minnows"],"secondary"),
      fish("sunfish","Sunfish","good","summer","TPWD rates sunfish good; the accessible fishing pier and grassy shallows provide visitor-oriented fishing locations.",["jigs-and-minnows"]),
    ],
    access:"TPWD lists one single-lane paved boat ramp inside Cleburne State Park, accessed via Park Road 21 from US 67 southwest of Cleburne. The park visitor site lists an accessible covered fishing pier with fishing-gear loans, a swim area, no-wake boats and kayak rentals near the Cedar Lodge day-use area. Park admission is required; Texas residents generally can fish inside the state park without a fishing license, subject to TPWD park-specific and special fish regulations.",
    accessPoints:[
      {name:"Cleburne State Park paved boat ramp",operator:"Texas Parks and Wildlife Department",kind:"public-ramp",launch:"Park entrance at 5800 Park Road 21, Cleburne; follow in-park signs from Cedar Lodge/day-use corridor to the single-lane ramp.",fee:"State park admission; check current vehicle and day-use reservation conditions",availability:"TPWD lists year-round, but confirm park alerts, daylight conditions and no-wake boating rules before towing."},
      {name:"Cedar Lake ADA-accessible covered fishing pier",operator:"Texas Parks and Wildlife Department",kind:"park",launch:"Accessible covered shore-fishing pier, with TPWD-installed fish-attracting habitat structures; NOT a motorboat ramp.",fee:"Park entry fee; fishing within state park does not generally require a license",availability:"Confirm current accessibility or maintenance closure directly with Cleburne State Park."},
      {name:"Cedar Lodge kayak and swimming day-use area",operator:"Texas Parks and Wildlife Department",kind:"park",launch:"Cedar Lodge day-use area with designated swimming and a self-service paddlecraft rental kiosk. This is separate from the trailer ramp.",fee:"Park admission and separate rentals where offered",availability:"Swimming depends on posted park safety notices; do not assume daily kiosk availability."},
    ],
    campingUrl:"https://tpwd.texas.gov/state-parks/cleburne/fees-facilities/campsites",
    camping:{name:"Cleburne State Park designated campgrounds",summary:"The state park manages reserveable developed campsites and group/day-use facilities. Confirm the appropriate electricity/water hookup, accessible site, reservation and park office hours on TPWD's official booking inventory. Lake day use or pier access does not confer an overnight camping reservation."},
    specialRules:true,
    visitorSourceUrl:"https://tpwd.texas.gov/state-parks/cleburne",
    historyNotes:[
      "The Cedar Lake basin and park dam were developed during 1930s conservation-era state park construction. TPWD's fisheries inventory lists first impoundment in 1934, though the modern visitor page primarily describes the CCC-built park landscape rather than an engineering chronology.",
      "The Civilian Conservation Corps shaped the historic park roads, bridges and stonework around Cleburne's forested north-Hill-Country-edge terrain. The historic CCC dam and related trails are park features; do not claim the larger city-owned Lake Pat Cleburne is part of this project.",
      "The park's modern covered fishing pier and TPWD-installed underwater habitat structures date to a 2016 improvement program. They help distinguish the lake's present accessible fishing experience from its 1930s reservoir origins and support fishing without a boat."
    ],
    visitorFAQs:[
      {question:"Is this the same as Lake Pat Cleburne?",answer:"No. Cedar Lake is the small state-park lake; the City of Cleburne's Lake Pat Cleburne is a separate municipal reservoir with different roads, boat ramps, regulations and visitor experience."},
      {question:"Can I swim at Cedar Lake?",answer:"Yes, the TPWD park site lists a designated swimming beach. Follow day-of-use advisories and do not infer the entire shoreline is a supervised swimming area."},
      {question:"Can I use a personal watercraft or high-speed motorboat?",answer:"No. TPWD describes the lake as no wake throughout and explicitly disallows jet skis. Boats must comply with the full-lake rule."},
      {question:"Is there an accessible fishing pier?",answer:"Yes. TPWD lists an ADA-accessible covered pier and special habitat structures for bank-fishing access; check any active closure or maintenance notice."},
      {question:"Do I need a fishing license?",answer:"TPWD says park visitors do not need one to fish from waters within this Texas state park. Rules, size/bag limits, admission and gear restrictions still apply."},
      {question:"Why do official sources disagree on the lake's size?",answer:"The TPWD fishing profile lists 107 acres and the state park visitor page calls it 116 acres. These are separate published estimates; neither states today's exact water extent."},
      {question:"Can I camp by the lake?",answer:"TPWD offers designated reservable campsites in Cleburne State Park, but a day-use pass does not allow overnight stays outside designated campsites."},
    ],
    nearbyDestinations:[{slug:"cleburne-state-park",name:"Cleburne State Park",reason:"State park trail maps, official campsite and swimming information complement the Cedar Lake fishing guide."}],
    nearbyLakes:[{slug:"lake-whitney",name:"Lake Whitney"},{slug:"lake-granbury",name:"Lake Granbury"},{slug:"benbrook-lake",name:"Benbrook Lake"}],
    travelAlerts:["Full-lake no-wake boating rule; no personal watercraft.","The current park page and TPWD fisheries page use different lake-acre figures. Preserve the source-specific values.","Check park alerts before travel; campground booking, swimming, paddle rentals and boat launches may have separate operating conditions."],
  },

  {
    slug: "lake-worth", name: "Lake Worth", tpwdSlug: "worth", waterDataSlug: "worth",
    region: "prairies-lakes", verifiedAt: "2026-10-13", accessReviewedAt: "2026-10-13",
    summary: "Fort Worth's historic West Fork Trinity reservoir, with excellent crappie and catfish fishing, four distinct city-managed access parks, a documented fish-consumption advisory, no camping at lake ramps, and real-time TWDB water levels.",
    surfaceAcres: 3489, maxDepthFeet: 22, impoundedYear: 1914, counties: ["Tarrant"],
    nearestCities: ["Fort Worth", "Lake Worth", "River Oaks", "Azle"],
    waterway: "West Fork of the Trinity River", riverBasin: "Trinity River Basin",
    authority: "City of Fort Worth — Lake Worth Management Office", conservationPool: "594 ft msl",
    fluctuation: "TPWD reports moderate fluctuations; shallow ramps are especially sensitive to water elevation",
    clarity: "Stained",
    identity: "Lake Worth is a Fort Worth municipal water-supply reservoir with a naturally shallow riverine layout, not a private fishing resort or an overnight camping park. Catfish and crappie earn TPWD's excellent ratings, but consumption advice is a separate public-health issue. TPWD's individual lake overview contains an older no-eat warning for blue and channel catfish. The current statewide DSHS advisory posted by TPWD instead prohibits smallmouth buffalo and lists species-specific monthly meal limits for blue and flathead catfish and other fish. Confirm the latest DSHS restrictions BEFORE eating any catch. The West Fork also connects this reservoir to upstream Eagle Mountain Lake and the Fort Worth Nature Center.",
    habitat: [
      "The original river channel, submerged standing timber, small points, boat docks and fishing piers break up Lake Worth's shallow shoreline. TPWD describes cattail flats and other emergent vegetation rather than extensive offshore grass.",
      "Crappie use brush beneath piers, reed beds and nearshore structure; catfish are spread throughout the reservoir and can be located along the creek-channel transition with appropriate tackle.",
      "The lake's shallow arms make navigation and trailer depth uncertain at lower lake elevations. Treat TPWD's historical 'open all year' ramp labels as operator inventories, not live closure confirmations.",
      "The Fort Worth Nature Center has a dedicated kayak/canoe launch and overlooks the lake from the Canyon Ridge/Lone Point corridor. That is not a powered-trailer ramp or a campground."
    ],
    fish: [
      fish("crappie", "White crappie", "excellent", "spring",
        "TPWD calls crappie excellent; work reed edges, docks, shaded brush and fishing piers with small jigs or minnows. Spring movement can shift into the West Fork tributary corridors.",
        ["jigs-and-minnows", "vertical-jigging"]),
      fish("catfish", "Catfish", "excellent", "year-round",
        "Lake Worth is a strong blue and channel-catfish fishery with fish across open-water channels and shoreline structure. CATCHING fish is distinct from safely eating them: a DSHS consumption advisory covers several species.",
        ["cut-bait", "live-bait"]),
      fish("largemouth-bass", "Largemouth bass", "fair", "spring",
        "TPWD rates largemouth fair, not trophy-grade. Rocky banks, dock edges and emerging shoreline cover are a practical starting point.",
        ["soft-plastics", "spinnerbaits", "crankbaits", "topwater"], "secondary"),
      fish("white-bass", "White bass", "fair", "spring",
        "TPWD rates white bass fair; seasonal spawning movement up the West Fork can offer opportunities but fluctuates with flow. Current DSHS consumption limits also include white bass.",
        ["vertical-jigging", "trolling", "jigs-and-minnows"], "secondary")
    ],
    access: "TPWD names four distinct Lake Worth access parks; one is paddlecraft-only, one is shallow small-craft-only, and the others offer concrete trailer ramps. Arrow 'S' Park (two lanes, about 50 parking spaces), Casino Beach Park (one lane, about 20 spaces), Fort Worth Nature Center (kayak/canoe only), and Sunset Park (shallow one lane, small craft only, about 20 spaces) are not interchangeable. TPWD lists a fee at each and NO overnight camping. Fort Worth's current Lake Worth Lease Management page says boat-ramp passes for Arrow Park and Casino Beach are purchased digitally through posted QR signs or city-linked online checkout, with daily, weekly and annual options; physical stickers at Navajo Burgers are discontinued. Confirm current rates, the exact fee for each facility, water level and ramp availability with the city before towing.",
    accessPoints: [
      {
        name: "Arrow 'S' Park launch", operator: "City of Fort Worth", kind: "public-ramp",
        launch: "From Loop 820 use the Cahoba exit and follow the west frontage road. TPWD lists a two-lane concrete boat ramp with roughly 50 parking spaces and accessible facilities.",
        fee: "Fort Worth now offers Arrow Park ramp passes through a posted QR code or its official online permit system (day, week or year); check the live rate",
        availability: "Listed year-round by TPWD, NOT independently certified open today. City Lake Worth Management (817) 392-7148."
      },
      {
        name: "Fort Worth Nature Center canoe and kayak launch", operator: "City of Fort Worth — Nature Center & Refuge", kind: "park",
        launch: "From State Highway 199 take the Buffalo Road / Confederate Road exit and follow Nature Center signs. This is a CANOE/KAYAK-only launch, not a motorboat trailer ramp.",
        fee: "Nature Center admission/launch fee listed by TPWD; confirm current policies",
        availability: "Confirm admission, weather, water access and on-site nature-center rules before traveling."
      },
      {
        name: "Casino Beach Park boat ramp", operator: "City of Fort Worth", kind: "public-ramp",
        launch: "From Highway 199 use Surfside west toward the park. TPWD describes one concrete launch lane and parking for roughly 20 vehicles.",
        fee: "Fort Worth now sells Casino Beach boat-ramp passes by on-site QR code or city-linked online checkout; daily, weekly and annual options, check current rate",
        availability: "Historically listed year-round. Call city lake staff (817) 392-7148 about current use and trailer access."
      },
      {
        name: "Sunset Park small-craft ramp", operator: "City of Fort Worth", kind: "public-ramp",
        launch: "Follow Watercress west from Highway 199. TPWD lists a SHALLOW one-lane ramp, roughly 20 parking spaces, suitable for smaller boats only.",
        fee: "Fee required per TPWD's source inventory; check city policy",
        availability: "Low water can change small-craft usability; verify the current ramp and fee before arrival."
      }
    ],
    campingProhibited: true,
    camping: {
      name: "No camping at Lake Worth public ramp parks",
      summary: "TPWD explicitly states camping is not allowed at the four Lake Worth access parks. Fort Worth Nature Center is a daytime wildlife-refuge visit, not a lakeside campground. Find separately operated established campgrounds or accommodations elsewhere rather than implying lake access includes overnight use."
    },
    specialRules: true,
    historySourceUrl: "https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/worth/index.asp",
    visitorSourceUrl: "https://www.fortworthtexas.gov/departments/property-management/real-estate-division/lake-worth-lease-management-section",
    consumptionSourceUrl: "https://tpwd.texas.gov/regulations/outdoor-annual/fishing/general-rules-regulations/fish-consumption-bans-and-advisories",
    historyNotes: [
      "TWDB dates the start of dam construction to 1912, deliberate water impoundment to June 1914 and dam completion to October 1914. Fort Worth built this West Fork project primarily for municipal water supply. John B. Hawley engineered it, while construction passed from Underground Construction Company to the city during 1913.",
      "The original earthfill dam measured about 3,200 feet long and 50 feet high; its uncontrolled spillway was approximately 700 feet long at a crest elevation of 594.3 feet above mean sea level. Water-supply withdrawals, controlled river passage and recreation remain central to its use.",
      "TWDB documents significant dam/spillway work in 1979 and an embankment-crest increase in 1997. The 2001 hydrographic survey found about 3,458 surface acres and 33,495 acre-feet storage at a defined conservation stage; TPWD's 3,489-acre lake fact box uses a different source vintage/measurement. Neither static acreage describes today's wet shoreline.",
      "The Fort Worth Nature Center preserves surrounding ecosystems and remnants of a never-completed CCC state-park effort, including Lone Point structures. A reused historical photograph from that overlook represents the actual lake but is NOT a live picture of current fishing, ramps or water level."
    ],
    visitorFAQs: [
      { question: "Can I eat fish caught in Lake Worth?", answer: "Check the current Texas DSHS fish-consumption advisory. It prohibits eating smallmouth buffalo from Lake Worth/affected West Fork waters. It lists limited monthly meals for blue and flathead catfish, striped/white bass, common carp and freshwater drum, with stricter rules for women of childbearing age and children under 12. The older TPWD lake fact sheet conflicts on blue-catfish advice; follow the current advisory before eating any catch." },
      { question: "Is camping allowed at Lake Worth?", answer: "No at its four TPWD-listed lake access parks. Camping is not included with day-use boat ramps or Fort Worth Nature Center entry. Stay at an independently operated off-site campground or hotel." },
      { question: "Which ramp is suitable for a motorboat trailer?", answer: "Arrow 'S' Park has two concrete lanes and approximately 50 parking spaces; Casino Beach has one lane and approximately 20 spaces. Sunset Park is shallow and marked small-craft-only. The Fort Worth Nature Center launch is for canoes/kayaks only." },
      { question: "Is boating at Lake Worth free?", answer: "TPWD lists fees at the four access facilities. The City of Fort Worth now sells Arrow Park and Casino Beach boat-ramp passes through on-site QR codes and its official online system with daily, weekly or annual options; it says Navajo Burgers no longer sells stickers. Check the city Lake Worth Lease Management page for current costs and verify other facility admission separately." },
      { question: "What fish are Lake Worth known for?", answer: "TPWD rates crappie and catfish excellent, while largemouth and white bass are fair. Consumption advisories apply to eating some fish regardless of their angling quality." },
      { question: "Does Lake Worth have a real-time level gauge?", answer: "Yes. Water Data for Texas provides measured reservoir level and percent full at the Lake Worth station. The current value belongs in the live-level strip, not as an undated number in an evergreen paragraph. Check the timestamp and ramp-depth status separately." },
      { question: "Are there accessible fishing facilities?", answer: "TPWD's access symbols mark ADA facilities at Arrow 'S' Park; its management survey also identified two accessible fishing piers. Verify current access routes, pier conditions and facilities with the city before relying on a specific accommodation." },
      { question: "Why do lake guides show 3,489 acres and 3,458 acres?", answer: "TPWD lists 3,489 acres in its fisheries profile; TWDB's 2001 surveyed conservation-pool table reports 3,458 acres. They are source-specific reference measurements, not interchangeable current measured surface area." },
      { question: "How old is Lake Worth?", answer: "Construction began in 1912; deliberate impoundment started June 1914 and TWDB dates dam completion to October 1914. The city built it as a water-supply reservoir on the West Fork of the Trinity River." }
    ],
    travelAlerts: [
      "PUBLIC-HEALTH WARNING: Current DSHS restrictions on consuming fish from Lake Worth include a complete smallmouth-buffalo no-eat advisory and species/age-specific meal limits; compare today's official consumption page before keeping fish for food. The older TPWD Lake Worth overview has a different blue-catfish warning.",
      "INVASIVE SPECIES: TPWD reports zebra mussels at Lake Worth. Clean, drain and dry boat, trailer, livewells and equipment; draining water is required under Texas law.",
      "TPWD shows no camping at the four access parks. The Nature Center is canoe/kayak-only and Sunset Park's shallow lane is intended for small craft; do not send large trailers to either.",
      "Fort Worth offers current QR-code/online boat ramp permits at Arrow Park and Casino Beach (day/week/year) and no longer sells physical stickers at Navajo Burgers. Confirm city fee, water level, ramp depth and live opening before launching; TPWD's 'open all year' is not a current operator status."
    ],
    nearbyLakes: [{slug:"eagle-mountain-lake",name:"Eagle Mountain Lake"},{slug:"benbrook-lake",name:"Benbrook Lake"},{slug:"lake-arlington",name:"Lake Arlington"},{slug:"grapevine-lake",name:"Grapevine Lake"},{slug:"lake-weatherford",name:"Lake Weatherford"}],
  },
  {
    slug: "lake-nasworthy", name: "Lake Nasworthy", tpwdSlug: "nasworthy", waterDataSlug: "nasworthy",
    region: "panhandle-plains", verifiedAt: "2026-10-13", accessReviewedAt: "2026-10-13",
    summary: "San Angelo's historic South Concho River recreation lake: good bass, catfish, crappie and white bass fishing, 11 separately named shoreline access areas, permitted camping in just two city parks, and a 2026 boat-ramp reconstruction program with active closures.",
    surfaceAcres: 1380, maxDepthFeet: 29, impoundedYear: 1930,
    counties: ["Tom Green"], nearestCities: ["San Angelo"],
    waterway: "South Concho River, tributary of the Concho and Colorado rivers", riverBasin: "Colorado River Basin",
    authority: "City of San Angelo — Parks & Recreation", conservationPool: "TPWD reference 1,871 ft msl; consult TWDB for vertical-datum-aware live level",
    fluctuation: "TPWD says usually near-constant, regulated by releases from upstream Twin Buttes; level and usable launches still change",
    clarity: "Slightly stained",
    identity: "Lake Nasworthy is a historic city-managed San Angelo reservoir, not San Angelo State Park and not neighboring O.C. Fisher Lake. TPWD's 1,380-acre angling measurement is a historical reference, not today's measured lake acreage. The fishery supports largemouth bass, crappie, catfish and white bass. A critical current-operator difference: TPWD's old access inventory generally marks individual ramps open year-round, while San Angelo's June 12, 2026 construction notice identifies the Knickerbocker Road ramp as closed beginning June 15 for reconstruction, followed by South Concho and Beaty Road in sequence. The city currently lists Knickerbocker Park as closed for construction. Confirm which ramp is actually open before towing a boat; 'open all year' is not a live notice.",
    habitat: [
      "Bulrushes and alligator weed line much of the shallow shoreline; TPWD also documents sago pondweed, coontail and star grass, plus isolated riprap, mud bank, bridge pilings and boat docks.",
      "TPWD and local partners installed PVC habitat structures at selected lake sites; use TPWD's fish-attractor mapping rather than treating all submerged structures as publicly accessible fishing docks.",
      "The shallow littoral margin rewards careful spring and summer presentation. TPWD describes long-rod 'dabbling' with jigs and trailers between bulrush stems for bass; crappie use bridge/dock pilings and catfish distribute more broadly."
    ],
    fish: [
      fish("largemouth-bass", "Largemouth bass", "good", "spring", "TPWD rates largemouth good and describes dabbling a jig-and-trailer on a long rod around bulrushes. Small soft plastics and spinnerbaits can also cover shoreline gaps without trampling bank vegetation.", ["soft-plastics", "jigs-and-minnows", "spinnerbaits", "topwater"]),
      fish("catfish", "Channel and flathead catfish", "good", "summer", "TPWD rates catfish good and notes both live and prepared baits across this shallow reservoir. Confirm fish-specific harvest rules and weather before keeping a catch.", ["cut-bait", "live-bait"]),
      fish("crappie", "White crappie", "good", "spring", "TPWD rates crappie good; jigs and minnows alongside bridge or dock pilings offer a distinct alternative to reed-bed bass fishing.", ["jigs-and-minnows", "vertical-jigging"]),
      fish("white-bass", "White bass", "good", "spring", "TPWD rates white bass good. Schools move with forage and river conditions; monitor fresh reports rather than relying on a fixed spot.", ["vertical-jigging", "trolling", "jigs-and-minnows"]),
      fish("sunfish", "Sunfish", "fair", "summer", "TPWD rates sunfish fair. Small hooks and appropriately sized bait near alligator weed and riprap provide shoreline opportunities.", ["jigs-and-minnows"], "secondary")
    ],
    access: "TPWD inventories 11 named access areas around Lake Nasworthy, with two camping-eligible city parks and a mix of trailer ramps and bank-only access. Most city ramps are listed without a fee, while Middle Concho and Spring Creek have seasonal day-use fees and camping permit requirements. Importantly, San Angelo's official June 2026 boat-ramp replacement schedule conflicts with year-round labels in the TPWD directory: Knickerbocker Road ramp closed starting June 15; when that work completes, South Concho Drive and then Beaty Road are the planned next phases. San Angelo's Knickerbocker Park page currently says closed for construction. Do not publish old year-round labels as real-time availability.",
    accessPoints: [
      {name:"Middle Concho Park ramp",operator:"City of San Angelo",kind:"park",launch:"Off Red Bluff Road via Middle Concho Drive; TPWD lists two single-lane concrete ramps, parking, picnic and designated camping.",fee:"Seasonal city day-use fee and mandatory overnight camping permit; check posted payment method",availability:"Confirm seasonal gate rules; city parks line (325) 277-8766."},
      {name:"Spring Creek Marina / park ramp",operator:"City of San Angelo / Spring Creek Marina",kind:"marina",launch:"From Knickerbocker Road to Fisherman's Road, a one-lane concrete ramp and an operator-managed marina with camping at designated park sites.",fee:"Seasonal day-use fees and separate camping permit/booking; verify current marina operation",availability:"TPWD lists (325) 944-3850; check city and marina before arrival."},
      {name:"Red Bluff Road ramp",operator:"City of San Angelo",kind:"public-ramp",launch:"Public ramp off Red Bluff Road. A separate future reconstruction of this site is mentioned for Phase 2, not a current completed improvement.",fee:"TPWD traditionally lists no fee; verify current city conditions",availability:"City (325) 277-8766; Phase 2 redesign is not proof of an active closure."},
      {name:"Hot Water Slough Park bank access",operator:"City of San Angelo",kind:"park",launch:"North shoreline off Red Bluff Road from Knickerbocker Road; TPWD lists BANK ACCESS ONLY, not a trailer or kayak launch.",fee:"TPWD lists no access fee; verify park rules",availability:"Verify local bank access and posted hours; no boat ramp documented."},
      {name:"Knickerbocker Park ramp — construction closure",operator:"City of San Angelo",kind:"public-ramp",launch:"6402 Knickerbocker Road, west of the power-plant intake canal. Historically a one-lane concrete ramp; city rebuilding underway in 2026.",fee:"Historically no fee; unusable while the construction closure remains",availability:"City lists the park CLOSED FOR CONSTRUCTION and its June 2026 notice closed this ramp starting June 15. Recheck city park status before travel."},
      {name:"Beaty Road Park ramp — planned replacement",operator:"City of San Angelo",kind:"public-ramp",launch:"Knickerbocker Road at Beaty Road; historically a one-lane concrete launch. The city plans replacement after work at South Concho Drive.",fee:"Historically no fee in TPWD inventory; verify current city policy",availability:"Closure may change as construction moves between sites; call (325) 277-8766."},
      {name:"Fisherman's Road ramp",operator:"City of San Angelo",kind:"public-ramp",launch:"From Knickerbocker Road onto Fisherman's Road. Historically one single-lane concrete ramp; a NEW full-service ramp is only proposed for Phase 2.",fee:"TPWD historically lists no fee; verify current city schedule",availability:"Do not imply Phase 2 upgrades already exist; confirm live access."},
      {name:"Mary Lee Park ramp",operator:"City of San Angelo",kind:"public-ramp",launch:"On Knickerbocker Road next to San Angelo Nature Center; historically one concrete lane and parking.",fee:"TPWD lists no fee; confirm recent city fee notices",availability:"Check city park access and possible seasonal events."},
      {name:"Lake Nasworthy Marina city ramp",operator:"City of San Angelo",kind:"public-ramp",launch:"Southern lake shore near Knickerbocker Road. TPWD lists one concrete launch lane and courtesy parking.",fee:"TPWD lists no fee for its specific public launch; nearby private marina services may cost extra",availability:"Call city for current ramp/parking access."},
      {name:"South Concho Drive ramp — construction sequence",operator:"City of San Angelo",kind:"public-ramp",launch:"Access off South Concho Drive; historically a one-lane concrete launch. Scheduled for replacement after Knickerbocker Road ramp.",fee:"TPWD historically lists no fee; verify live city notices",availability:"City's 2026 sequence means this ramp may close once preceding site reopens; check current closure status before towing."},
      {name:"Pecan Creek Park ramp",operator:"City of San Angelo",kind:"public-ramp",launch:"Public ramp off South Concho Drive; one concrete lane documented by TPWD.",fee:"TPWD historically lists no fee; confirm day-of-visit operation",availability:"City (325) 277-8766; don't assume identical accessibility to South Concho Drive ramp."}
    ],
    campingUrl:"https://www.sanangelo.gov/388/Lake-Parks",
    camping: {
      name:"Designated Middle Concho Park and Spring Creek Park campsites ONLY",
      summary:"The City of San Angelo expressly permits camping around Lake Nasworthy only at designated unfenced camping sites in Middle Concho and Spring Creek parks; a camping permit is required year-round. The city's posted lake-park rate at the time of research is $10/day, subject to change; consult current entrance/gate instructions and seasonal card-only day-use payment rules. TPWD also refers to camping at San Angelo State Park, but that park is on a DIFFERENT reservoir, O.C. Fisher, not Lake Nasworthy. Other named boat ramps and picnic/bank areas do not become campsites."
    },
    specialRules:true,
    historySourceUrl:"https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/nasworthy/index.asp",
    visitorSourceUrl:"https://www.sanangelo.gov/388/Lake-Parks",
    historyNotes: [
      "TWDB documents the project on the South Concho River, six miles southwest of central San Angelo. It was initially built by West Texas Utilities Company for industrial/municipal supply and recreation; the lake was named after John R. Nasworthy, who sold the land to the city.",
      "TWDB dates dam construction to January 1929 through June 1930, with deliberate impoundment beginning March 28, 1930. The original concrete-and-earthfill project extended approximately 5,480 feet with a maximum dam height near 50 feet; the original water right was issued April 15, 1929.",
      "The City of San Angelo acquired water rights from West Texas Utilities in May 1950, and TWDB's later hydrographic reports describe further authorized municipal withdrawals. Keep historic 1993 survey capacities and today's TWDB gauge elevation distinct; the TWDB gauge datum changed in August 2023, so its current NAVD88 conservation figure cannot be naively compared with older TPWD MSL values."
    ],
    visitorFAQs: [
      {question:"Is Knickerbocker Park boat ramp open?",answer:"The city currently lists Knickerbocker Park CLOSED FOR CONSTRUCTION, and its June 12, 2026 announcement says boat-ramp reconstruction began June 15. TPWD's older 'open year-round' access inventory does not supersede this current city closure. Check the city park page before towing."},
      {question:"Are South Concho Drive and Beaty Road ramps open?",answer:"The city's June 2026 project plan replaces Knickerbocker first, then South Concho, then Beaty. Only one ramp was planned to close at a time; the active closure changes as the project advances. Verify today's posted schedule with city parks rather than relying on a static construction sequence."},
      {question:"Where is lakefront camping legal?",answer:"The city permits camping only in designated areas at Middle Concho Park and Spring Creek Park, with year-round permits and possible seasonal day-entry fees. Other listed ramps and shoreline picnic sites are not established camping facilities."},
      {question:"How many public-access areas are around Lake Nasworthy?",answer:"TPWD lists 11 distinct named access sites. Hot Water Slough is bank-only and not a boat launch. Sites have different lanes, operators, charges and construction status."},
      {question:"What species offer the best fishing?",answer:"TPWD rates largemouth, catfish, crappie and white bass good, while sunfish are fair. Fish bulrushes and alligator weed for bass, pilings for crappie, and appropriate open-water structure for catfish/white bass."},
      {question:"Does Lake Nasworthy have zebra mussels?",answer:"Yes. TPWD labels the lake invaded: clean, drain and dry boats and equipment and follow mandatory draining requirements before traveling to another water body."},
      {question:"Why do TPWD and TWDB show different lake elevations?",answer:"TPWD's reference conservation elevation is rounded and older. TWDB distinguishes gauges and vertical datums, with a documented change in August 2023. Use the current timestamped TWDB gauge's own conservation datum, not a comparison of two old nominal elevations."},
      {question:"Is San Angelo State Park on Lake Nasworthy?",answer:"No. San Angelo State Park's shore is on O.C. Fisher Lake. Lake Nasworthy city park camping is in designated Middle Concho and Spring Creek areas."},
      {question:"When was Lake Nasworthy built?",answer:"TWDB gives January 1929 for construction start, March 28, 1930 for deliberate impoundment and June 1930 for dam completion. The city acquired the water rights in 1950."},
      {question:"Is the proposed new Fisherman's Road boat ramp complete?",answer:"No completion is verified. The city describes a full-service replacement ramp as part of a separately designed Phase 2 tentatively planned for 2027 and dependent on funding. Use only existing operating facilities confirmed by the city."}
    ],
    travelAlerts: [
      "ACTIVE ACCESS ALERT: San Angelo's June 2026 reconstruction began with Knickerbocker ramp CLOSED; its live facility page still says closed for construction. The planned next ramps are South Concho and then Beaty, which may change without an older TPWD directory update.",
      "CAMPING RULE: City camping is limited to designated, permitted sites at Middle Concho and Spring Creek parks. No other TPWD-listed shoreline launch implies an overnight camping right.",
      "ZEBRA MUSSELS: TPWD confirms Lake Nasworthy is invaded. Clean, drain and dry equipment; obey mandatory drain rules.",
      "Live TWDB Nasworthy water levels have their own source timestamp and NAVD88 datum; avoid mixing old TPWD conservation figures with modern gauge units.",
      "City Phase 2 construction concept for Fisherman's Road and kayak launches is not an existing amenity or an authorized future completion date."
    ],
    nearbyLakes:[{slug:"o-h-ivie-lake",name:"O. H. Ivie Lake"},{slug:"lake-colorado-city",name:"Lake Colorado City"},{slug:"lake-brownwood",name:"Lake Brownwood"},{slug:"e-v-spence-reservoir",name:"E. V. Spence Reservoir"}],
  },
  {
    slug: "fort-parker-state-park-lake", name: "Fort Parker State Park Lake", tpwdSlug: "fort_parker",
    region: "prairies-lakes", verifiedAt: "2026-10-13", accessReviewedAt: "2026-10-13",
    summary: "A historic CCC-built Navasota River lake within Fort Parker State Park, where good catfish and crappie opportunities, dedicated park camping and paddling coexist with severe shallow-water sedimentation and distinctly different lake and river boat ramps.",
    surfaceAcres: 725, maxDepthFeet: 6, impoundedYear: 1935,
    counties: ["Limestone"], nearestCities: ["Mexia", "Groesbeck", "Waco"],
    waterway: "Navasota River", riverBasin: "Brazos River Basin",
    authority: "Texas Parks and Wildlife Department — Fort Parker State Park",
    conservationPool: "Ask the state park for current level; there is no verified public lake gauge",
    fluctuation: "TPWD fishing profile estimates 1–2 feet; recent fisheries surveys report considerable fluctuations in some years",
    clarity: "Very turbid",
    identity: "Fort Parker Lake is the roughly 725–750-acre impoundment inside Fort Parker State Park between Mexia and Groesbeck. It is not the three-acre spring-fed Lake Springfield in the same park, and it is not the larger municipal Lake Mexia upstream on the Navasota. TPWD's angling profile gives 725 acres and an 'impounded 1935' date, while the visitor park reports 750 acres and its CCC history describes the park's African-American CCC crews completing the Navasota dam in 1939. These figures describe different official reporting contexts, not a reason to invent a new survey or silently overwrite one of them. Extensive siltation makes the upper two-thirds of Fort Parker Lake generally unnavigable by boat. TPWD's September 25, 2026 alert advises against motorized launches because of low ramp water, both fishing piers have been closed since a January 7, 2025 alert, and a July 28 burn ban plus October 2026–May 2027 roadworks affect visitor planning. This is a managed state-park fishing, paddling, nature and camping visit, not a deep-water bass reservoir.",
    habitat: [
      "The reservoir's upper two-thirds are extremely shallow, with silt, dense lotus and emergent vegetation. TPWD's 2022 fisheries survey describes an average depth of about four feet and a maximum near eight feet, despite the angling facts page listing a nominal six-foot maximum and its notes documenting 1990s dredging near nine feet.",
      "The lower, more navigable third has lotus, bulrush, cutgrass and nearshore brush, with fewer artificial offshore features than many Texas bass lakes. A 2016 TPWD-volunteer project placed fish-attracting crappie condos; fish habitat maps help locate them without assuming all spots are accessible.",
      "TPWD describes strong channel- and blue-catfish potential near shoreline and campground approaches, crappie movement between the river and lower lake, and a small largemouth population despite occasional quality-sized fish. Fish the lower basin and public bank locations, not the shallow upper river marsh as if it were a trailer-safe boating channel.",
      "The Navasota River and the separate Lake Springfield each have their own visitor, licensing and boat-access context; the park provides a second ramp on the river as well as its Fort Parker Lake ramp."
    ],
    fish: [
      fish("catfish","Blue and channel catfish","good","year-round","TPWD rates catfish good and reports good catches along public lake banks, with occasional large blue catfish. The park falls under Community Fishing Lake rules; check current pole-and-line, size and daily-bag restrictions before keeping a catch.",["cut-bait","live-bait"]),
      fish("crappie","White crappie","good","spring","TPWD rates crappie good but says fish move between the Navasota and reservoir. Use small jigs and live minnows around legally accessible brush, crappie-condo habitat and the lower navigable basin.",["jigs-and-minnows","vertical-jigging"]),
      fish("largemouth-bass","Largemouth bass","fair","spring","TPWD calls largemouth fair and recent surveys found low numbers despite good body condition among some remaining fish. Concentrate on lower-lake brush and vegetation, and do not claim a trophy-bass destination.",["soft-plastics","spinnerbaits","crankbaits","topwater"],"secondary"),
      fish("white-bass","White bass","fair","spring","TPWD rates white bass fair and reports shore fishing downstream of the dam during a suitable spring run. Do not encourage fishing or boating in restricted spillway/dam areas; check posted rules and flows.",["jigs-and-minnows","vertical-jigging"],"secondary"),
      fish("sunfish","Sunfish","poor","summer","TPWD rates sunfish poor in the fishing profile. Small fish may be present, but this is not the primary species to plan a fishing-focused visit around.",["jigs-and-minnows"],"secondary")
    ],
    access: "TPWD's Fort Parker Lake public-access inventory lists ONE lake-specific state-park boat ramp with a dock, park entrance fees, parking and camping elsewhere in the park. The state park also describes a separate ramp on the NAVASOTA RIVER, which is not an alternative deep-water launch onto Fort Parker Lake. Severe sedimentation makes the upper two-thirds of the lake unnavigable most of the time. Ask park headquarters at (254) 562-5751 about current navigable depth, ramp and dock conditions, day-use reservations and active park alerts before towing a boat.",
    accessPoints: [
      {name:"Fort Parker State Park lake boat ramp and dock",operator:"Texas Parks and Wildlife Department",kind:"park",launch:"Enter Fort Parker State Park at 194 Park Road 28, Mexia via Texas Highway 14. Follow the park's current facility map to the ramp and dock on Fort Parker Lake, not the Navasota River ramp. The navigable lower third is not a guarantee of same-day trailer clearance.",fee:"State park daily entrance/admission and any applicable reservation requirement; check current rates",availability:"TPWD's September 25, 2026 alert says motorized launching is NOT recommended due to low water. The historic year-round label does not override it; call (254) 562-5751."},
      {name:"Navasota River ramp — different water access",operator:"Texas Parks and Wildlife Department",kind:"park",launch:"The same state park operates a separate ramp on the Navasota River, supporting the Limestone Bluffs Paddling Trail. It is not a deep-water alternative lake ramp; consult park signage and river flow.",fee:"State park day-use admission; confirm boat and paddling restrictions",availability:"Call park staff about flow, hazards and launch conditions before a river trip."},
      {name:"Park lake shoreline / campground bank fishing",operator:"Texas Parks and Wildlife Department",kind:"park",launch:"Public state-park shoreline and campsite-area access where posted; bank anglers often target blue or channel catfish around the accessible lower lake. Shore fishing is not a trailer launch.",fee:"State park day-use fee or a valid overnight reservation",availability:"TPWD reports BOTH fishing piers CLOSED since a January 7, 2025 alert. Check other signed shoreline fishing access and current park restrictions."}
    ],
    campingUrl:"https://tpwd.texas.gov/state-parks/fort-parker/fees-facilities/campsites",
    camping: {
      name:"Fort Parker State Park developed campsites, shelters and cabins",
      summary:"The current TPWD campsite inventory distinguishes 24 developed water-and-electric sites, one water/electric tent-only site, ten water-only tent sites and other reserveable overnight shelter/cabin and group facilities. A park entry fee is separate from overnight reservations; check electrical hookups, pull-through locations, accessible inventory, pet restrictions and actual campsite availability directly with TPWD. Cabins are rustic and do not offer beds or bathrooms. TPWD construction alerts warn park road resurfacing October 2026–May 2027 may temporarily close campsites and trails; Nature Center renovations create noise and other impacts into spring 2027. A July 28, 2026 burn ban prohibits ash-producing fires, with appropriate containerized propane stoves permitted for cooking. Confirm these alerts before traveling. Never label a river launch or unnumbered shore as a camping facility."
    },
    specialRules:true,
    visitorSourceUrl:"https://tpwd.texas.gov/state-parks/fort-parker",
    liveDataNote:"No reliable public real-time Fort Parker Lake water-level source has been verified. Its upper basin is shallow and subject to sedimentation and fluctuating conditions. Contact Fort Parker State Park at (254) 562-5751 for current water and boat-ramp status; reference surface acres and depths are not live measurements.",
    historyNotes: [
      "Fort Parker State Park occupies historic Springfield settlement grounds in Limestone County. Springfield was Limestone County's original seat beginning in 1847 before the railroad bypassed the town and Groesbeck became county seat in 1873. The Springfield Cemetery and related trails are nearby cultural resources; do not confuse the former town with the park's separate Lake Springfield.",
      "TPWD's park-history account traces the creation of Fort Parker State Park to land donations in 1935. African-American Civilian Conservation Corps workers developed the park from 1935 through 1942 and completed the dam forming Fort Parker Lake in 1939. The park opened to the public May 1, 1941. The TPWD fishing-profile 'impounded 1935' label is inconsistent with the history account and should be presented as an agency chronology discrepancy rather than uncritically repeated as dam completion.",
      "TPWD reservoir surveys document decades of Navasota River sedimentation: the upper two-thirds have become too shallow for ordinary boating much of the time; dredging in the 1990s increased depth near the lower dam, and 2016 volunteers added artificial crappie habitat. Those management interventions explain why access and productivity vary sharply across a lake that can look inviting at full pool.",
      "The associated Old Fort Parker historic fort reconstruction is a separate heritage site; the present state-park fishing lake and its Springfield trails are not themselves the 1830s Parker family fort. The park's CCC history documents historic building and lake works and should be cross-linked to its local attraction and county authority pages."
    ],
    visitorFAQs: [
      {question:"Can you safely launch a boat across all of Fort Parker Lake?",answer:"No. TPWD's latest reservoir survey describes severe sedimentation and generally unnavigable water across the upper two-thirds. On September 25, 2026 TPWD posted that motorized launching at the lake ramp is not recommended because of low water. Check the latest park alert and call before towing; even the lower basin is not guaranteed navigable."},
      {question:"Is the lake 725 or 750 acres?",answer:"TPWD's fishing profile gives 725 acres, while the visitor-facing state-park description gives about 750 acres. These are published reference figures with different vintages, not a current gauge-derived surface-area measurement."},
      {question:"Was Fort Parker Lake built in 1935 or 1939?",answer:"The fisheries facts box lists 'impounded 1935' but TPWD's park history says African-American CCC workers completed the lake dam in 1939; land for the park was donated in 1935. The chronology is inconsistent across official TPWD pages, so the guide preserves each source's context instead of falsely reconciling them."},
      {question:"Is this Lake Springfield?",answer:"No. Fort Parker Lake is the roughly 725–750-acre Navasota impoundment; Lake Springfield is a separate three-acre spring-fed park water body on the Springfield Trail."},
      {question:"Can I fish without a fishing license?",answer:"TPWD states a fishing license is not needed to fish from shore on its park lakes and Navasota River or from a boat on the lake; a license is needed if you fish from a boat on the river. All park fishing remains subject to applicable gear, harvest and park-specific rules."},
      {question:"Can I camp at the lake?",answer:"Yes, in booked developed campsites, shelters, cabins or authorized group areas inside Fort Parker State Park. The official inventory includes 24 water-and-electric campsites, one electric tent-only site and ten water-only tent sites; reservations, entry charges and site availability are separate from day-use admission. TPWD's October 2026–May 2027 road construction may temporarily close campsites; its July 2026 burn ban prohibits open ash-producing fires."},
      {question:"How many boat ramps are there?",answer:"The park describes two: one on Fort Parker Lake and a separate one on the Navasota River. TPWD's lake-access directory lists the lake ramp, not two distinct ramps on the reservoir."},
      {question:"Where are the best fishing opportunities?",answer:"TPWD rates blue/channel catfish and crappie good, bass and white bass fair, and sunfish poor. Bank fishing for catfish near the accessible lower lake and crappie structure can be more realistic than trying to traverse the silted upper basin."},
      {question:"Is there a live lake-level gauge?",answer:"A dependable public real-time lake-level gauge has not been verified. TPWD asks visitors to contact Fort Parker State Park directly; the park's daily conditions and sedimented lake depth are more useful for towing plans than a stale reservoir area figure."},
      {question:"Does Fort Parker State Park have swimming and paddling?",answer:"Yes. TPWD lists a designated swimming area and canoe/kayak rentals when weather permits, plus the Limestone Bluffs Paddling Trail on the river. Rentals, swimming and river flow require same-day safety and operator checks."}
    ],
    travelAlerts: [
      "BOATER WARNING: TPWD's 2022 reservoir survey states the upper two-thirds of Fort Parker Lake are generally unnavigable due to sedimentation. TPWD's September 25, 2026 alert says motorized launching is NOT recommended due to low ramp water. Check park notices and confirm with park staff before towing.",
      "BOTH FISHING PIERS CLOSED: TPWD alert dated January 7, 2025 reports both piers closed. No guide text should imply they are currently usable.",
      "PARK BURN BAN: July 28, 2026 TPWD alert prohibits open ash-producing wood/charcoal fires; appropriate containerized propane fuel stoves are allowed for cooking.",
      "CONSTRUCTION: road resurfacing October 2026–May 2027 may temporarily close campsites and trails, with Nature Center renovation impacts expected through spring 2027.",
      "LICENSE DISTINCTION: TPWD's park license exemption for fishing from boats on the LAKE does not apply to fishing from a boat on the NAVASOTA RIVER. Confirm latest regulations.",
      "TPWD fishing facts show 725 acres and 'impounded 1935'; the state park lists 750 acres and the CCC-history page dates dam completion to 1939. These are source-specific descriptions, not exact current figures.",
      "Current TPWD alerts include low-water motorized ramp warning, both fishing piers closed, a burn ban, and extended 2026–27 park road/facility construction. Verify the active-alert page and campsite booking conditions before visiting.",
      "Community Fishing Lake rules apply, including gear and potentially special catfish limits. Verify the current TPWD outdoor annual rather than relying on old map images or static bag limits."
    ],
    nearbyDestinations:[{slug:"fort-parker-state-park",name:"Fort Parker State Park",reason:"Park map, camping inventory, CCC/Springfield history, accessible amenities and current state-park alerts complement the fishing and lake visitor guide."}],
    nearbyLakes:[{slug:"lake-waco",name:"Lake Waco"},{slug:"lake-whitney",name:"Lake Whitney"},{slug:"lake-somerville",name:"Lake Somerville"}],
  },
  {
    slug: "lake-tyler", name: "Lake Tyler (East and West)",
    tpwdSlug: "tyler", waterDataSlug: "tyler", region: "piney-woods",
    verifiedAt: "2026-10-13", accessReviewedAt: "2026-10-13",
    summary: "A source-researched guide to connected Lake Tyler East and West near Whitehouse: eight different public-access locations, a bridge-and-canal orientation, city park camping rules, bass/crappie fishing, historic twin-dam engineering and a monitored TWDB water gauge.",
    surfaceAcres: 4500, maxDepthFeet: 40, impoundedYear: 1949, counties: ["Smith"],
    nearestCities: ["Tyler", "Whitehouse", "Troup"], waterway: "Prairie and Mud creeks above the Angelina River",
    riverBasin: "Neches River Basin", authority: "City of Tyler Water Utilities",
    conservationPool: "375.38 feet in TWDB gauge NGVD29 datum",
    fluctuation: "TPWD historically lists about two feet; latest gauge and ramp depth must be checked separately",
    clarity: "Moderately clear",
    identity: "Lake Tyler is a TWO-reservoir water system southeast of Tyler: the older West basin behind Whitehouse Dam on Prairie Creek and Lake Tyler East behind Mud Creek Dam. The two basins were joined by a canal on May 29, 1968; boat access, shoreline vegetation and ramps differ between shores. TPWD's fisheries sheet estimates 2,224 acres West plus 2,276 acres East, 4,500 acres combined. TWDB's later 2013 hydrographic survey reports 4,714 acres at a specified conservation elevation. These are different source surveys, not live lake area figures. City of Tyler Water Utility owns/operates the connected system. The City prohibits bowfishing on these waters according to TPWD. Never confuse the nearby Texas Freshwater Fisheries Center in ATHENS with Lake Tyler.",
    habitat: [
      "Upper arms of both lakes hold abundant emergent and submergent native vegetation; TPWD identifies hydrilla in Lake Tyler East and less of it in Lake Tyler West, with submerged timber and dock structure elsewhere.",
      "The shallow upper creek reaches and bridge causeways create spring fishing options different from open lower-basin points. Near boat docks, avoid private shoreline and do not assume every fishing pier is a public ramp.",
      "A connecting canal joins the east/west water bodies; their different dams and creek origins explain why routes and exact boat access must specify EAST or WEST. A low water level can particularly affect Highway 64 upper-lake ramp.",
      "TPWD's city/park access directory describes primitive camping in municipal shoreline parks, but this is NOT a reservation for private concession sites, commercial fishing barge or marina. Confirm current Tyler Water Utility park rules and fires/overnight restrictions."
    ],
    fish: [
      fish("largemouth-bass", "Largemouth bass", "excellent", "spring",
        "TPWD rates largemouth bass excellent across the connected lakes, with bass using creek vegetation, docks, and points. Work native grass edges or hydrilla and adapt presentations to clarity, seasons and heavy summer boat traffic.",
        ["soft-plastics","spinnerbaits","crankbaits","topwater"]),
      fish("spotted-bass", "Spotted bass", "good", "spring",
        "Spotted bass have a TPWD good rating. Target creek-channel edges and hard cover with smaller moving lures instead of assuming every black bass landed is a largemouth.",
        ["crankbaits","spinnerbaits","soft-plastics"]),
      fish("crappie", "White and black crappie", "good", "spring",
        "TPWD rates crappie good; fish bridge areas and submerged structure with minnows and jigs. East-basin creel surveys documented white and black crappie, though abundance fluctuates.",
        ["jigs-and-minnows","vertical-jigging"]),
      fish("sunfish", "Bluegill, redear and redbreast sunfish", "excellent", "summer",
        "TPWD rates sunfish excellent; vegetated shoreline areas are strong family and light-tackle destinations, provided shoreline access is legal and conditions safe.",
        ["jigs-and-minnows","live-bait"]),
      fish("catfish", "Catfish", "fair", "summer",
        "TPWD's combined angling assessment is fair for catfish. Channel catfish are present, but do not market the whole reservoir as a premier catfish fishery.",
        ["cut-bait","live-bait"],"secondary"),
      fish("white-bass", "White bass", "fair", "spring",
        "White bass occur in the combined lake and follow creek-inflow and seasonal bait movements. TPWD's fair rating is lower than the core bass/sunfish fisheries.",
        ["vertical-jigging","trolling"],"secondary")
    ],
    access: "Eight named TPWD visitor facilities cover different sections of Lake Tyler East/West: Concession #1/Lake Tyler Marina, Hill Creek Park, Old #2/Chapman Park, Fritz & Opal's Barge, East Side Park #4, Old Omen West, Old Omen East, and Highway 64 Ramp. Marina is privately operated, its TPWD fee may be outdated, and the fishing barge is a PAID SHORE ANGLING site rather than a boat launch. Tyler Water Utility operates most city ramps, with a county-operated East ramp; the published 2026 status of each is not confirmed by a historical 'open all year' TPWD entry. Primitive camping is listed for CITY PARKS, not every concession/facility.",
    accessPoints: [
      {name:"Concession #1 / Lake Tyler Marina (WEST)",operator:"Private concession on Lake Tyler West",kind:"marina",launch:"From SH 110 in Whitehouse east on FM 346 about two miles; left on Tyler West Dam Road. TPWD lists two separate two-lane concrete launches, approximately 50 trailer spaces, store and bait facilities.",fee:"Historic TPWD launch fee was $3/day or $40/year; confirm operator's current rates before towing",availability:"Historically year-round. TPWD-listed (903) 839-2650; verify current concession, access and fees."},
      {name:"Hill Creek Park (WEST)",operator:"City of Tyler Water Utilities",kind:"park",launch:"From SH 64 east of Tyler, south on FM 848, east on South Hill Creek Road about two miles; two-lane concrete ramp, loading piers, approximately 25 trailer spaces.",fee:"TPWD lists no boat-launch fee; confirm actual city rules",availability:"TPWD historically lists year-round; call Tyler Water Utility (903) 939-2724 about current gate/park rules."},
      {name:"Old #2 / Chapman Park (WEST)",operator:"City of Tyler Water Utilities",kind:"park",launch:"From SH 64 east, south on FM 848, east on CR 2127. Broad single-lane concrete ramp and adjacent public parking.",fee:"TPWD lists no ramp fee; check city notices",availability:"Verify road, ramp water level and parking before travel."},
      {name:"Fritz & Opal's Barge (WEST fishing ONLY)",operator:"Private angling concession",kind:"marina",launch:"At the north end of Old #2/Chapman Park via FM 848 and CR 2127. PAID fishing barge/shore access; TPWD does not list a motorboat ramp at this specific facility.",fee:"Historic TPWD barge angling charges $4 daytime and $5 overnight; operator current fees and operation not verified",availability:"Confirm the privately operated facility before planning a barge visit; it is NOT the Chapman Park launch."},
      {name:"East Side Park #4 (WEST bank access)",operator:"City of Tyler Water Utilities",kind:"park",launch:"East shore of Lake Tyler West via FM 346 and FM 3341 (East Dam Road). TPWD marks bank angling and day-use parking; no trailer launch at this particular site.",fee:"TPWD lists free access; confirm park gate",availability:"Historically year-round in TPWD directory; bank-fishing only unless operator has made documented upgrades."},
      {name:"Old Omen Road Ramp — WEST",operator:"City of Tyler Water Utilities",kind:"public-ramp",launch:"From SH 64 east of Tyler south on FM 848, east onto CR 285/Old Omen Road. Two multi-lane ramps (older is steep), about 20 parking spaces.",fee:"No launch fee in TPWD directory; confirm city access",availability:"Check ramp gradient, trailer suitability and gate before travel; older lane is steep."},
      {name:"Old Omen Road Ramp — EAST",operator:"Smith County",kind:"public-ramp",launch:"From SH 64 east cross the upper lake bridge, south on FM 2607 about 1.8 miles, west on CR 285. One-lane launch with small UNPAVED parking lot.",fee:"TPWD lists no fee",availability:"County-maintained site; check current low-water and road conditions, not the same as Old Omen WEST."},
      {name:"Highway 64 Ramp — EAST",operator:"City of Tyler Water Utilities",kind:"public-ramp",launch:"Upper end of Lake Tyler East just beyond first SH 64 lake bridge traveling from Tyler. One concrete lane, approximately 60 parking spaces.",fee:"TPWD lists no fee; confirm city use",availability:"TPWD warns this ramp is NOT useful at low lake levels. Check gauge and city closure notices before towing."}
    ],
    camping: {
      name:"Primitive camping at designated City of Tyler lake parks",
      summary:"TPWD's public-access introduction says primitive camping is permitted at city-operated Lake Tyler shoreline parks on a first-come basis. That is a historical operator summary, NOT a current reservation guarantee, guaranteed toilet/water service, or an invitation to camp on private marina, barge, roadside or dock land. Confirm designated legal spots, current restrictions, fires and overnight hours directly with City of Tyler Water Utilities (903) 939-2724. Nearby Tyler State Park is a SEPARATE state-park destination, not an on-water campground on Lake Tyler."
    },
    specialRules:true,
    historySourceUrl:"https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/tyler/index.asp",
    visitorSourceUrl:"https://tpwd.texas.gov/fishboat/fish/recreational/lakes/tyler/access.phtml",
    localRegulationsSourceUrl:"https://tpwd.texas.gov/fishboat/fish/recreational/lakes/tyler/",
    historyNotes: [
      "TWDB records the west Whitehouse Dam project under a March 25, 1945 water permit and construction beginning April 30, 1948. Deliberate west impoundment began January 8, 1949; the dam was completed May 13, 1949. These are distinct engineering dates, not one interchangeable reservoir birthday.",
      "The separate east Mud Creek Dam permit was issued October 1, 1956, and East construction began February 11, 1966. Impoundment began November 22, 1966 and the east dam was completed January 1967. A CANAL connected the two on May 29, 1968. The historic reservoir figures therefore must identify the correct part of Lake Tyler.",
      "TWDB's 2013 volumetric survey lists the combined reservoir system at 4,714 acres and 77,284 acre-feet at elevation 375.38 feet; the TPWD angling page separately quotes 2,224 West and 2,276 East acres. Both source conventions are retained with attribution instead of treating any static area as today's exact level. Modern TWDB gauge readings have timestamps and water levels separate from these conservation-stage survey figures.",
      "TWDB identifies the lake owner as City of Tyler. Public ramp maintenance is split among municipal facilities, Smith County and privately operated concessions, which explains differing entrance fees, access and overnight rules."
    ],
    visitorFAQs: [
      {question:"Are Lake Tyler and Lake Tyler East different lakes?",answer:"They were built behind different dams on Prairie Creek and Mud Creek, but a canal linked them on May 29, 1968. TPWD maintains a joint angling profile while distinguishing ramp sites and banks. A Lake Tyler EAST photograph cannot be advertised as showing every West ramp."},
      {question:"How many public launching locations are listed?",answer:"TPWD's eight named access FACILITIES include four bank/shore/marina categories and multiple boat ramps. Specifically, Fritz & Opal's Barge is paid fishing access, East Side #4 is bank access, and the East and West Old Omen ramps have different operators and parking. Use the detailed list rather than treating all eight as boat launches."},
      {question:"Can I camp overnight at Lake Tyler?",answer:"TPWD lists primitive first-come camping in city lake parks. Confirm which city parks currently permit overnight stays; the private marina, paid fishing barge and separate Tyler State Park have different rules and booking requirements."},
      {question:"Is the Highway 64 ramp safe for large trailers at low water?",answer:"The TPWD public-access page specifically warns Highway 64 ramp usability falls at low levels. Check the live TWDB Lake Tyler timestamp and ask the city for actual ramp status before towing. Water-level data alone cannot certify a ramp is open."},
      {question:"Is bowfishing legal?",answer:"TPWD's Lake Tyler profile says a City of Tyler ordinance prohibits bowfishing on this connected water system. Check current municipal ordinances and applicable TPWD rules before using special gear; statewide rules alone are not sufficient."},
      {question:"Which lake is best for bass, crappie or bank fishing?",answer:"TPWD rates largemouth and sunfish excellent, spotted bass and crappie good, and catfish/white bass fair. The marina, barge and city park banks have different public-access requirements; choose a legal site before selecting a species or fishing method."},
      {question:"Why is TWDB's area higher than TPWD's?",answer:"TPWD uses 2,224 acres West plus 2,276 East. TWDB's 2013 survey calculates 4,714 combined acres at a defined 375.38-foot conservation stage. Measurement sources/dates differ; neither describes a live shoreline area."},
      {question:"When did the East and West lakes become one reservoir?",answer:"The east dam impounded water starting November 22, 1966; the separate reservoirs were joined by canal on May 29, 1968. The original west reservoir impounded in January 1949."},
      {question:"Is the Texas Freshwater Fisheries Center on Lake Tyler?",answer:"No. The Texas Freshwater Fisheries Center is in Athens, near Lake Athens. Tyler State Park is another separate destination. Neither should be used as an on-lake fishing dock or campsite in a Lake Tyler route."}
    ],
    travelAlerts:[
      "The upper SH 64 ramp is specifically identified by TPWD as unsuitable at low levels; consult the TWDB timestamp and city lake office before trailering.",
      "TPWD lists a CITY ordinance prohibiting bowfishing on both connected basins. Statewide bag/size rules do not cancel separate municipal prohibitions.",
      "Some lake access facilities are paid private concessions and one is a FISHING BARGE, not a boat ramp. Do not use historic fee schedules or year-round labels as live booking confirmations.",
      "Primitive camping reported by TPWD applies to designated city parks, not all private shorelines; verify current municipal rules and fire bans before camping.",
      "Tyler East has documented hydrilla and invasive vegetation management. Clean, drain and dry gear; avoid spreading invasive plants to another reservoir."
    ],
    nearbyLakes:[{slug:"lake-palestine",name:"Lake Palestine"},{slug:"lake-bob-sandlin",name:"Lake Bob Sandlin"},{slug:"lake-nacogdoches",name:"Lake Nacogdoches"}],
  },
  {
    slug: "medina-lake", name: "Medina Lake", tpwdSlug:"medina", waterDataSlug:"medina",
    region:"hill-country", verifiedAt:"2026-10-13", accessReviewedAt:"2026-10-13",
    summary:"A historic 1913 Medina River reservoir northwest of San Antonio with drought-sensitive ramps, invasive zebra mussels, two TPWD-listed launch facilities, striped-bass and catfish fishing, and a dramatic gap between full-pool and today's water extent.",
    surfaceAcres:5426, maxDepthFeet:152, impoundedYear:1913,
    counties:["Bandera","Medina"], nearestCities:["Lakehills","Mico","Bandera","San Antonio"],
    waterway:"Medina River, tributary of the San Antonio River", riverBasin:"San Antonio River Basin",
    authority:"Bexar-Medina-Atascosa Water Control and Improvement District No. 1 (BMA); Bandera County ramp operator",
    conservationPool:"1,064.20 feet NGVD29 (TWDB monitored conservation level)",
    fluctuation:"Large drought/rainfall swings; 40-plus feet below conservation is possible",
    clarity:"Normally clear when water levels and runoff permit",
    identity:"Medina Lake is the Medina River impoundment reaching Bandera and Medina counties, NOT nearby Medina Diversion Lake below the main dam. Two actual public access entries appear in TPWD's source inventory: the privately operated Red Cove Camp launch and Bandera County's Park Road 37 launch. Both are water-elevation-sensitive. In its October 13, 2026 snapshot, TWDB showed only 28.6% of conservation storage and an elevation 43.64 feet BELOW the full-pool reference; this is historical date-stamped context, never a static claim about today's level. Lake level and ramp operability must be checked separately before towing a boat. TPWD also designates Medina as invaded by zebra mussels, triggering clean/drain/dry obligations.",
    habitat:[
      "The reservoir covers coves, steep rocky outcrops, channel bends and feeder-creek beds. Native aquatic vegetation is sparse according to TPWD; old high-water shoreline photographs should not be mistaken for today's shoreline or ramp accessibility.",
      "Largemouth and smallmouth bass occupy different cover: largemouth near channel breaks, creek arms and points, with smallmouth using harder rock and steep banks. Dropping levels may change where both species can be reached safely.",
      "Hybrid stripers tend to concentrate near deep open-water points, humps and the dam; white bass schools move with forage. Catfish also use the deeper feeder coves and creek channels."
    ],
    fish:[
      fish("largemouth-bass","Largemouth bass","fair","spring","TPWD rates largemouth fair. Try points and deeper breaks with soft plastics, crankbaits and shad-shaped lures; inspect boat accessibility and legal shoreline permissions first.",["soft-plastics","crankbaits","spinnerbaits"],"primary"),
      fish("smallmouth-bass","Smallmouth bass","fair","spring","Smallmouth bass are a fair secondary target around rocky outcrops and ledges. Crawfish-colored crankbaits and jigs suit hard-bottom structure.",["crankbaits","soft-plastics"],"secondary"),
      fish("catfish","Blue and channel catfish","good","summer","TPWD rates catfish good, including blue and channel fish. Its tactics emphasize bait near deep coves and tributary creek beds.",["cut-bait","live-bait"]),
      fish("hybrid-striped-bass","Hybrid striped bass","good","summer","TPWD currently rates hybrid striped bass good. Fish deep open-water points and humps with trolling spoons or vertical presentations, adjusting to oxygen/temperature and water level.",["trolling","vertical-jigging"]),
      fish("white-bass","White bass","fair","spring","White bass are present in smaller numbers. Watch for schooling forage and seasonal movements at open-water points, using small spoons or shad-like jigs.",["vertical-jigging","trolling"],"secondary"),
      fish("crappie","Crappie","poor","spring","TPWD rates crappie poor; do not promise a reliable high-yield crappie trip just because the species exists in the reservoir.",["jigs-and-minnows"],"secondary")
    ],
    access:"TPWD documents two named launch facilities, not a universally accessible shoreline. Red Cove Camp in Mico off FM 1283 has a two-lane concrete ramp that TPWD says depends on lake level, with possible gravel-bank launching under some conditions. Park Road 37, operated by Bandera County at Plum Creek Cove, has a concrete ramp and TPWD describes a gravel-bank fallback if below ramp end. Neither fallback is a guarantee that vehicle access, launch depth, bank strength or safe navigation is available today. Both require fees; the private ramp and county park have different hours. Call the operator and check timestamped TWDB elevations before trailering.",
    accessPoints:[
      {name:"Red Cove Camp private launch",operator:"Private concession at Red Cove Camp",kind:"marina",launch:"Mico, reached from FM 1283. Two-lane concrete ramp. TPWD says its ramp is usable at sufficient lake level and mentions conditional gravel-bank launching in low water; do not interpret the old threshold as today's open/closed signal.",fee:"Fee required; verify directly with concession",availability:"TPWD lists year-round, but drought and gravel-bank suitability can override that historic directory label. Call (830) 612-2715."},
      {name:"Bandera County Park Road 37 launch",operator:"Bandera County",kind:"public-ramp",launch:"At the end of Park Road 37 in Plum Creek Cove. Concrete ramp with potential gravel-bank launch when below ramp end; verify gate, water depth and tow-vehicle safety.",fee:"County launch/park fees apply; check current amount and payment method",availability:"TPWD lists launch access 24 hours but park day-use 7 a.m.–8 p.m. Confirm current county policies, lake levels and possible closures before arrival."}
    ],
    camping:{
      name:"Separate campground bookings, not automatic with ramp entry",
      summary:"Neither of the two TPWD Lake Medina public-access records establishes a public campground at its ramp. Red Cove's name does not itself prove campsite inventory or current rentals. Search individual licensed concession/campground operators and verify legal camping, reservation terms, restroom access and water-level impacts directly; boat-launch day fees do not include overnight rights."
    },
    historySourceUrl:"https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/medina/index.asp",
    visitorSourceUrl:"https://tpwd.texas.gov/fishboat/fish/recreational/lakes/medina/access.phtml",
    specialRules:true,
    historyNotes:[
      "TWDB dates the first construction at Medina Dam to November 1911, completion to 1913 and the deliberate start of impoundment to May 7, 1913. The project began with Medina Valley Irrigation Company water rights filed November 16, 1910, and was subsequently operated by the Bexar-Medina-Atascosa water district.",
      "The 1,580-foot-long concrete gravity dam reaches about 164 feet high and was a major early twentieth-century Texas engineering undertaking. The separate Medina Diversion Dam, about four miles downstream, directs irrigation water to canals and should not be confused with the main Medina Lake fishing waters.",
      "TWDB's 1995 survey describes 6,066 acres at its defined 1,064.2-foot conservation pool, whereas TPWD's fishing profile lists 5,426 acres. The agencies rely on differing survey vintages/reference conventions; these numbers are not today's water surface. The modern TWDB gauge reports live storage and surface area, with provisional timestamps.",
      "The reservoir is chiefly an irrigation and water-supply asset, and severe multiyear droughts can put boat ramps well above the water. Exact photographic evidence matters: the attributed 2010 shore photograph documents the true Medina Lake location but CANNOT demonstrate contemporary levels, marina operations or access."
    ],
    visitorFAQs:[
      {question:"Are Medina Lake boat ramps open right now?",answer:"An online lake directory cannot confirm this. TWDB publishes a recent elevation and TPWD lists two ramps, Red Cove Camp and Park Road 37. Water depth, operator access, bank stability and fee/gate rules are separate; call each operator before towing."},
      {question:"How low was Medina Lake in October 2026?",answer:"TWDB's October 13, 2026 historical snapshot reported 28.6% conservation storage and 43.64 feet below conservation pool. This is NOT the live level for future visitors; follow the source's current timestamp instead."},
      {question:"Does Park Road 37 stay open after the concrete ramp dries up?",answer:"TPWD describes a potential gravel-bank fallback below the ramp end and different listed hours for the launch versus the park. That does not certify today's gravel quality, access permission or usable depth; verify with Bandera County."},
      {question:"Can I launch a large boat at Red Cove Camp during drought?",answer:"TPWD identifies a two-lane concrete ramp with water-level sensitivity, plus a conditional gravel-bank option. Do not equate a fee-paying concession or year-round label with safe present launching. Contact (830) 612-2715 with the boat and trailer details."},
      {question:"Is Medina Lake the same as Medina Diversion Lake?",answer:"No. Medina Lake is upstream of Medina Dam. Medina Diversion Lake is a smaller downstream structure feeding the irrigation canal system, so its water measurements and access are not interchangeable."},
      {question:"Which fish offer the best prospects?",answer:"TPWD currently rates catfish and hybrid striped bass good; largemouth, smallmouth and white bass fair; crappie poor. Conditions can change with water levels, recent stocking and fish surveys."},
      {question:"Are zebra mussels present?",answer:"Yes. TPWD lists Medina Lake as invaded. Clean, drain and dry gear, and follow Texas mandatory water-draining rules to prevent spreading zebra mussels."},
      {question:"Why do TPWD and TWDB list different acreage figures?",answer:"TPWD's lake facts report 5,426 acres; TWDB's historical 1995 survey reports 6,066 acres at its conservation elevation. They are source-era measurements, not competing real-time surface estimates."},
      {question:"Can I camp at the public boat launches?",answer:"Do not assume so. TPWD's two launch entries do not affirm a public campsite at either ramp. Obtain a confirmed reservation or explicit permission from an actual camping concession before overnight stays."},
      {question:"When was Medina Dam built?",answer:"Construction began in November 1911, first deliberate impoundment began May 7, 1913 and the dam was completed in 1913, according to TWDB's reservoir history."}
    ],
    travelAlerts:[
      "LOW-WATER RAMP SAFETY: Only two TPWD-listed launch sites; both have level-dependent concrete ramps and conditional gravel-bank references. A TWDB elevation does not by itself certify that towing, launch or recovery is safe today.",
      "ZEBRA MUSSELS: TPWD specifically identifies Medina Lake as invaded; clean, drain and dry boats and equipment and follow mandatory drain-water rules.",
      "The TPWD 5,426-acre facts box and TWDB 6,066-acre 1995 surveyed area reflect differing vintages. Do not publish either number as today's measured surface extent.",
      "The Commons 2010 historical Medina Lake photograph does not depict current drought conditions or facility opening status. No original field photographs or operator day-of-visit certification have been claimed."
    ],
    nearbyLakes:[{slug:"canyon-lake",name:"Canyon Lake"},{slug:"calaveras-lake",name:"Calaveras Lake"},{slug:"choke-canyon-reservoir",name:"Choke Canyon Reservoir"}],
  },
  {
    slug: "lake-weatherford", name: "Lake Weatherford", tpwdSlug:"weatherford", waterDataSlug:"weatherford", region:"prairies-lakes", verifiedAt:"2026-10-13", accessReviewedAt:"2026-10-13",
    summary:"A City of Weatherford drinking-water reservoir with good largemouth bass, catfish and crappie, excellent sunfish, one documented full-size marina launch, two unimproved small-craft-only upper-lake ramps and a 4,313-foot floating boardwalk for on-foot lake access. Overnight camping is prohibited throughout the lake.",
    surfaceAcres:1158,maxDepthFeet:39,impoundedYear:1957,counties:["Parker"],nearestCities:["Weatherford"],
    waterway:"Clear Fork Trinity River",riverBasin:"Trinity River Basin",authority:"City of Weatherford",conservationPool:"896 ft above NGVD29",fluctuation:"TPWD describes annual fluctuations of 2–8 feet; launch depth and accessible shoreline depend on current elevation",clarity:"Moderately clear to stained",
    identity:"Lake Weatherford is a municipal water-supply reservoir east of Weatherford, not Lake Mineral Wells or a state-park campground. TPWD's angling guide lists 1,158 acres while TWDB's conservation-pool 2008 survey reports 1,112 acres; these are separate source-specific reference measurements, not today's lake acreage. TPWD names Weatherford Marina as the only improved launch with a full-size boat ramp, a fee and private concession operator. Two unimproved upper-lake ramps exist but are suitable only for small aluminum boats; TPWD does not give independent named addresses for them. The City of Weatherford's 4,313-foot floating boardwalk is for walking, birdwatching, sightseeing and fishing, NOT a powered boat ramp or overnight camping destination.",
    habitat:[
      "TPWD identifies cattails and American lotus in the upper lake, but comparatively little aquatic vegetation in deeper lower water. Structure from piers, boathouses, the dam's riprap and submerged man-made brush piles gives bass and crappie usable cover.",
      "The marina's enclosed fishing dock provides a distinct bank-access option, with live minnows and small jigs for crappie. Do not confuse the boardwalk's pedestrian fishing opportunities with a commercial marina launch or with access to private boathouses.",
      "Twelve aeration diffusers are installed near the dam; when operating, bubbles can draw forage and feeding fish. Their operation is seasonal and should not be presented as a guaranteed fishing location or an instruction to enter a restricted area.",
      "TWDB's timestamped live lake gauge is important to boat-trailer decisions. A reference conservation elevation of 896 feet is not today's depth at a particular ramp."
    ],
    fish:[
      fish("largemouth-bass","Largemouth bass","good","spring","TPWD rates largemouth good. Fish vegetation transitions, riprap and shaded dock edges with spinnerbaits or soft-plastic worms in spring/fall and crankbaits in summer.",["spinnerbaits","soft-plastics","crankbaits","topwater"]),
      fish("channel-catfish","Channel catfish","good","year-round","TPWD rates the catfish fishery good and identifies year-round opportunities. Work creek-channel edges and practical bank access with cut bait or legal prepared baits, subject to changing conditions.",["cut-bait","live-bait"]),
      fish("crappie","Crappie","good","winter","TPWD rates crappie good, highlighting the marina's enclosed fishing dock and lower-lake brush piles during winter and spring. Minnows and small jigs are recommended.",["jigs-and-minnows","vertical-jigging"]),
      fish("white-bass","White bass","fair","summer","TPWD rates white bass fair and notes summer surface-feeding off the dam at times; trolling shad-like crankbaits is an alternative. Do not promise a predictable schooling location.",["trolling","vertical-jigging"],"secondary"),
      fish("sunfish","Sunfish","excellent","summer","TPWD rates sunfish excellent; light spinning or fly tackle with small hooks near shoreline cover can be productive during warmer months.",["jigs-and-minnows"])
    ],
    access:"TPWD lists Weatherford Marina, reached by FM 5 then West Lake Drive, as an improved fee-required launch suitable for different sizes of boats; the historic concession telephone is (817) 597-0418, but a directory phone does not guarantee today's operator or hours. TPWD also documents two UNNAMED unimproved ramps in the lake's upper reaches, suitable only for small aluminum boats; it does not publish precise individual entrance locations, so do not route a larger boat trailer to them. The City of Weatherford's public floating boardwalk has two exact trailhead addresses, 2864 East Lake Drive and 1198 West Lake Drive, plus a pavilion at 2801 East Lake Drive. Its posted hours are 6 a.m.–10 p.m., subject to current city updates. The pedestrian boardwalk is not a boat launch.",
    accessPoints:[
      {name:"Weatherford Marina improved trailer ramp",operator:"Private concession listed by TPWD",kind:"marina",launch:"From US 80/180 travel north on FM 5, west onto West Lake Drive. Improved marina ramp just under a mile ahead on the right, with convenience store, tackle, bait, courtesy docks and boat gas in TPWD's facility table.",fee:"TPWD lists a launch fee; confirm current concession charges, parking, fuel and operating hours",availability:"Historically year-round per TPWD. Call (817) 597-0418 or City of Weatherford for current ramp status, level and access."},
      {name:"Floating Boardwalk — East Lake Drive trailhead",operator:"City of Weatherford Parks & Recreation",kind:"park",launch:"2864 East Lake Drive, Weatherford, TX 76087. PEDESTRIAN boardwalk access for fishing, birding and lakeside walks; NOT a boat trailer ramp.",fee:"City lists an optional pavilion rental separately; no boardwalk admission fee specified on the current page",availability:"City posts 6 a.m.–10 p.m. operating hours; check weather, trail closures and accessibility updates, parks (817) 598-4124."},
      {name:"Floating Boardwalk — West Lake Drive trailhead",operator:"City of Weatherford Parks & Recreation",kind:"park",launch:"1198 West Lake Drive, Weatherford, TX 76087. West-side PEDESTRIAN entry to the 4,313-foot floating boardwalk; no boat launch documented at this trailhead.",fee:"Boardwalk park access; optional pavilion use is a separate rental at 2801 East Lake Drive",availability:"City posts 6 a.m.–10 p.m. hours, which can change for severe weather and maintenance; call (817) 598-4124."}
    ],
    campingProhibited:true,camping:{name:"No overnight camping anywhere on Lake Weatherford",summary:"TPWD expressly prohibits overnight camping ANYWHERE on Lake Weatherford. The marina, upper-lake unimproved ramps, floating boardwalk and pavilion are lake day-use locations, not RV camping or lakeside overnight sites. Book an independent established campground or lodging outside the restricted lake area."},
    historySourceUrl:"https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/weatherford/index.asp",
    visitorSourceUrl:"https://www.weatherfordtx.gov/3223/The-Boardwalk-at-Lake-Weatherford",
    historyNotes:[
      "TWDB dates construction beginning June 1956 and both deliberate impoundment and dam completion to March 1957. The City of Weatherford owns and operates the Clear Fork Trinity River dam for municipal and industrial water supply, with recreation as a compatible use.",
      "After flood damage, engineers modified the service spillway in 1993 and increased spillway capacity. The reconstruction connected a four-fingered radial labyrinth inlet to the existing nine-foot-square discharge conduit. The dam crest was raised three feet to an elevation of approximately 917 ft above mean sea level.",
      "TWDB's August 2008 conservation-pool survey reports 1,112 acres and about 17,812 acre-feet at elevation 896 ft, while TPWD's angling fact sheet uses 1,158 acres. Those figures describe different survey methods or reporting vintages, not the precise water surface today.",
      "The city installed the floating boardwalk to make the shoreline accessible to visitors during periods of low water. Its official park page lists 4,313 feet of pedestrian boardwalk between public trailheads on East and West Lake drives, with benches and a separately reservable pavilion."
    ],
    visitorFAQs:[
      {question:"Can I camp on Lake Weatherford?",answer:"No. TPWD states that overnight camping is prohibited anywhere on Lake Weatherford, including at marina and upper-lake ramps. Arrange separate off-lake lodging or camping."},
      {question:"Where can I launch a larger motorboat?",answer:"TPWD lists Weatherford Marina on West Lake Drive as the lake's improved trailer launch suitable for different boat sizes. A fee is required. The two unnamed upper-lake ramps are unimproved and intended only for small aluminum boats. Verify live ramp conditions and water level."},
      {question:"Is the 4,313-foot boardwalk also a boat ramp?",answer:"No. The city identifies the floating boardwalk as a walking, fishing, birdwatching and nature-viewing feature. Its East and West Lake Drive trailheads are pedestrian entrances, not marinas or trailer launches."},
      {question:"Where are the boardwalk entrances and what are the hours?",answer:"The city lists 2864 East Lake Drive and 1198 West Lake Drive as boardwalk trailheads, with a pavilion at 2801 East Lake Drive. Published hours are 6 a.m.–10 p.m.; confirm current park notices for closures or changes."},
      {question:"Which fish are Lake Weatherford best for?",answer:"TPWD rates sunfish excellent and largemouth bass, channel catfish and crappie good. White bass are rated fair. Marina docks, upper-lake reeds, the dam's riprap and underwater brush each suit different targets."},
      {question:"How deep is Lake Weatherford?",answer:"TPWD lists a maximum depth of 39 feet, but launch depth changes with reservoir elevation. The latest TWDB gauge is a separate timestamped current measurement and may not indicate whether a particular boat ramp is passable."},
      {question:"What happened to Lake Weatherford Dam in 1993?",answer:"TWDB records service-spillway reconstruction after flood damage, including a radial labyrinth inlet and added spillway capacity; the dam crest was raised. These engineering facts are historical, not current flood warnings."},
      {question:"Why do TWDB and TPWD give 1,112 and 1,158 acres?",answer:"TWDB's 2008 conservation-pool survey and TPWD's fishing facts use different vintages/measurement bases. Neither describes the current exposed shoreline during low water; use the live gauge for water conditions."},
      {question:"Does the city charge to use the boardwalk pavilion?",answer:"The city currently lists $20 per hour with a two-hour minimum to reserve the separate pavilion. This is not a launch or general boardwalk entry charge, and rates may change. Use the city's booking system or parks phone for confirmation."}
    ],
    travelAlerts:[
      "TPWD PROHIBITS OVERNIGHT CAMPING ANYWHERE on Lake Weatherford; do not interpret marina facilities, the boardwalk or upper-lake ramps as RV/campground access.",
      "The two upper-lake boat ramps are unimproved and suitable for SMALL ALUMINUM BOATS only; TPWD does not publish names/precise entrances for safe larger-boat routing.",
      "Water level changes by several feet annually. Read timestamped TWDB lake conditions and verify the marina's actual depth and operator status before towing a large boat.",
      "The city's floating boardwalk is a PEDESTRIAN attraction with posted hours 6 a.m.–10 p.m., not a boat ramp or state-park camping area.",
      "The 2024 actual-location Commons photo documents the lake's boardwalk, not the current marina launch or real-time reservoir water level."
    ],
    nearbyLakes:[{slug:"lake-mineral-wells",name:"Lake Mineral Wells"},{slug:"lake-worth",name:"Lake Worth"},{slug:"benbrook-lake",name:"Benbrook Lake"}],
  },
  {
    slug: "lake-abilene", name: "Lake Abilene", tpwdSlug: "abilene", waterDataSlug: "abilene",
    region: "panhandle-plains", verifiedAt: "2026-10-14", accessReviewedAt: "2026-10-14",
    summary: "A 1921 City of Abilene reservoir reached through the separate Lake Abilene unit of Abilene State Park; the operator's active drought alert prohibits lake fishing and swimming and closes both boat ramps. Historical fishery, precise ramp locations, 1921 dam chronology, park camping distinctions and an actual-lake licensed image are documented without pretending the lake is open.",
    surfaceAcres: 595, maxDepthFeet: 25, impoundedYear: 1921, counties: ["Taylor"],
    nearestCities: ["Tuscola", "Buffalo Gap", "Abilene"],
    waterway: "Elm Creek, a tributary of the Clear Fork Brazos River", riverBasin: "Brazos River Basin",
    authority: "City of Abilene (reservoir owner); Texas Parks and Wildlife Department (park access operator)",
    conservationPool: "2,012.3 ft msl, reference datum used in the TWDB reservoir history",
    fluctuation: "Long drought drawdowns; TPWD says lake ramps become largely unusable about seven feet below spillway level", clarity: "Very muddy",
    identity: "Lake Abilene is the City of Abilene-owned Elm Creek reservoir in Taylor County, NOT Kirby Lake in Abilene or the smaller Buffalo Wallow Pond on Abilene State Park's main campus. The public lake unit and its Dam and Creek ramps lie across FM 89 from the main state-park campground. TPWD's CURRENT PARK ALERT, originally dated October 20, 2025 and still posted when reviewed in October 2026, expressly says BOTH LAKE RAMPS ARE CLOSED, no kayak rentals, and NO FISHING OR SWIMMING at Lake Abilene due to low water. Historic fishing guides and year-round ramp inventory listings do not supersede this operator notice. The historic park swimming pool is a separate facility and also has a renovation closure. Review the latest park alert or call (325) 572-3204 before travel; treat all fishery tips here as historical descriptions while fishing is prohibited.",
    habitat: [
      "When at conservation pool, the historically muddy reservoir had black willow, buttonbush, rocky banks and flooded dead terrestrial vegetation. TPWD explicitly lists no established aquatic vegetation; this is not a grassy high-clarity bass lake.",
      "Following major water loss and a refill in 2016, TPWD restocked gamefish and installed Fishiding artificial habitat structures. Cover remaining during low-water periods is primarily brush piles and rock; former shoreline features may be exposed.",
      "The historical location of submerged cover does not confer a right to fish during a TPWD drought closure. Use TPWD's fish habitat viewer only as an archival reference while the lake's fishing prohibition remains posted."
    ],
    fish: [
      fish("largemouth-bass", "Largemouth bass", "poor", "spring", "TPWD currently rates bass POOR. Historically anglers flipped lures around flooded willow, buttonbush and brush piles during normal lake elevations; there is no legal lake fishing while the operator's low-water closure remains in force.", ["soft-plastics", "spinnerbaits"], "secondary"),
      fish("channel-catfish", "Channel catfish", "poor", "summer", "TPWD currently rates catfish POOR. Historically bank anglers used live or cut bait where accessible. The official state-park alert currently prohibits all Lake Abilene fishing; these are historical context rather than a recommendation to fish now.", ["cut-bait", "live-bait"], "secondary"),
      fish("crappie", "White crappie", "poor", "spring", "TPWD currently rates crappie POOR. When open and at higher levels, crappie traditionally related to flooded terrestrial brush and artificial cover. The state park's current lake-fishing prohibition overrides all those tactics.", ["jigs-and-minnows", "vertical-jigging"], "secondary"),
      fish("sunfish", "Sunfish", "poor", "summer", "TPWD lists sunfish as POOR. Historically small fish inhabited shallow rocky and brushy structure; there is no lake angling permitted under the posted operator closure.", ["jigs-and-minnows"], "secondary")
    ],
    access: "TPWD's access inventory identifies exactly TWO distinct, single-lane ramps, Dam and Creek, both on the Lake Abilene unit west of FM 89. From Abilene, take FM 89 south and turn west on the paved lake road about one mile southwest of Abilene State Park's main entrance; pay at state-park headquarters and obtain a code for the lake gate when public access is permitted. Each ramp has an approximately 10-vehicle lot and is normally closed sunset-to-sunrise. At low water, TPWD says four-wheel-drive vehicles are required for launching and the ramps become unusable about seven feet below spillway; HOWEVER, do not attempt either site now: TPWD's October 2025 park alert, still posted during this 2026 review, CLOSES BOTH RAMPS and prohibits fishing/swimming. Wildly different main-campus campground and Buffalo Wallow Pond rules should not be merged into lake-ramp rules. Call the park (325) 572-3204 and confirm the latest official alert.",
    accessPoints: [
      {name:"Lake Abilene Dam ramp — closed under drought alert",operator:"Texas Parks and Wildlife Department, Abilene State Park",kind:"public-ramp",launch:"FM 89 south from Abilene to the paved lake-unit road approximately one mile southwest of the state-park headquarters entrance; follow lake signs to the Dam ramp. One concrete lane with about 10 parking spaces; separate coded gate from the park office.",fee:"Park admission required before gate code; verify current admission rather than assuming historic posted rate",availability:"CLOSED under TPWD's posted October 20, 2025 low-water alert. No fishing or swimming at lake. Do not use the older TPWD 'open all year' statement."},
      {name:"Lake Abilene Creek ramp — closed under drought alert",operator:"Texas Parks and Wildlife Department, Abilene State Park",kind:"public-ramp",launch:"Same separate Lake Abilene unit entrance from FM 89, then the signed Creek ramp. One concrete lane with roughly 10 parking spaces; not the Buffalo Wallow Pond or main camping campus.",fee:"Park admission and gate code normally required; operator-day fee and access must be reconfirmed",availability:"CLOSED under current posted low-water lake alert. Historically closed sunset-to-sunrise; the drought closure overrides that normal schedule."}
    ],
    campingUrl: "https://tpwd.texas.gov/state-parks/abilene/fees-facilities/campsites",
    camping: {
      name:"Abilene State Park main-campus designated campgrounds across FM 89",
      summary:"TPWD's Lake Abilene access matrix lists camping across FM 89 on the main Abilene State Park campus, NOT as a campsite at the Dam or Creek ramps. The main campus offers separately bookable tent, RV, shelter and yurt sites; check reservation availability, park burn bans and the separate pool-renovation closure. Staying overnight at the main campground does not give permission to fish, swim or launch at the closed lake. The lake-unit land can also close for managed hunts while main-campus reservations remain usable."
    },
    specialRules: true,
    historySourceUrl: "https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/abilene/index.asp",
    visitorSourceUrl: "https://tpwd.texas.gov/state-parks/abilene/alert/",
    historyNotes: [
      "TWDB locates Abilene Dam on Elm Creek about six miles northwest of Tuscola in Taylor County. The City of Abilene owns this historically municipal emergency-water-supply and recreational reservoir, while TPWD operates visitor access through its adjacent state park.",
      "A state water permit on September 7, 1918 authorized construction; work began in 1919. TWDB's detailed dam plate gives completion in May 1921 and deliberate impoundment beginning August 1, 1921, while its overview summarizes completion in 1921. This chronology is different from the much younger Kirby Lake on Cedar Creek.",
      "After its 1921 construction, Lake Abilene Dam underwent substantial repairs in 1941 and 1957. TWDB's historical survey records a 5,040-foot earthfill embankment, a maximum height of about 64 feet and a historic conservation-pool reference elevation of 2,012.3 feet above mean sea level.",
      "TPWD lists 595 surface acres at the old reference pool. TWDB's storage figures are tied to the conservation-stage curve, not a claim that 595 acres of water are present today. Drought can strand launch ramps, restrict fish survival and change every aspect of a visitor trip.",
      "The 2011 Wikimedia Commons photograph of the actual Lake Abilene shoreline predates the present drought closure. Its creator released it as CC BY-SA 2.0. It is documentary evidence of the named lake's setting, not a live water-level, fishing-permission or boat-ramp-status image."
    ],
    visitorFAQs: [
      {question:"Is Lake Abilene open for fishing right now?",answer:"NO under the park's currently posted low-water alert (dated October 20, 2025): TPWD prohibits fishing and swimming at Lake Abilene and has closed both ramps. Check https://tpwd.texas.gov/state-parks/abilene/alert/ or call (325) 572-3204 for any newer operator decision before travel."},
      {question:"Can I launch a boat at the Dam or Creek ramp?",answer:"Both are closed under the currently posted state-park drought alert. TPWD's older access directory describes two single-lane ramps as open year-round and normally closed overnight, but that is superseded by the dated park closure notice."},
      {question:"Does Abilene State Park still offer camping?",answer:"Yes, the main state-park campus across FM 89 offers reservable campsites and other lodging separately from the Lake Abilene unit. Campground access does NOT mean lake swimming, fishing, paddling rentals or ramps are open."},
      {question:"Is Buffalo Wallow Pond the same as Lake Abilene?",answer:"No. Buffalo Wallow is a smaller spring-fed pond on Abilene State Park's main campus. The Lake Abilene drought prohibition concerns the separate City of Abilene reservoir reached by the Lake Abilene unit entrance. Read any independent pond notices before fishing there."},
      {question:"What is the difference between Lake Abilene and Kirby Lake?",answer:"Lake Abilene is the 1921 Elm Creek reservoir near Tuscola. Kirby Lake is another City of Abilene water body on Cedar Creek much nearer the city, with a different dam, access rules and fishing conditions."},
      {question:"Which fish are found in Lake Abilene?",answer:"TPWD names largemouth bass, channel catfish and white crappie, and also rates sunfish. Its displayed present fishing-quality ratings are POOR for bass, catfish, crappie and sunfish. Even when fish exist, the state-park no-fishing closure remains binding."},
      {question:"Why are the ramps unsuitable even without a closure?",answer:"TPWD warns that the two launches become largely unusable around seven feet below spillway level and can need four-wheel-drive launching at low levels. The currently posted blanket closure is stricter: do not launch or attempt shoreline fishing."},
      {question:"Do lake and campground closures coincide?",answer:"Not necessarily. TPWD sometimes closes the entire Lake Abilene unit for managed wildlife hunts while the main campground across FM 89 remains open. Separate lake drought, burn-ban and historic swimming-pool renovation alerts may coexist."},
      {question:"Is the historic park swimming pool available?",answer:"The pool is on the main state-park campus, not Lake Abilene. Its June 3, 2026 reservation alert says the CCC-era pool remains closed for renovations until further notice; check an updated park notice."},
      {question:"When was Lake Abilene constructed?",answer:"TWDB records authorization in 1918, dam construction starting in 1919, dam completion May 1921 and deliberate impoundment August 1, 1921. Major dam repairs occurred in 1941 and 1957."}
    ],
    travelAlerts: [
      "CURRENT OPERATOR SAFETY CLOSURE — TPWD Abilene State Park alert dated October 20, 2025 and still posted at this review says Lake Abilene's two boat ramps are CLOSED; swimming, fishing and kayak rental at the lake are PROHIBITED. Don't plan a fishing or swimming trip based on TPWD's older generic lake page.",
      "STATE PARK HUNTS — Some posted managed-hunt dates close the lake unit to everyone other than permitted hunters; the main campground across FM 89 can operate separately. Recheck the dated closures before travel.",
      "CAMPGROUND, POND AND POOL ARE DIFFERENT — Main-campus campground reservations, Buffalo Wallow Pond activities and CCC swimming-pool renovations are NOT a statement that the closed Lake Abilene reservoir is available for fishing or swimming.",
      "NO PRESENT-DAY FISHING FORECAST — TPWD currently rates bass, catfish, crappie and sunfish poor; there is no valid access while the lake's operator prohibits fishing. Live lake elevation cannot override park authorization.",
      "Historical photograph is of the exact Lake Abilene shoreline in June 2011 and carries a CC BY-SA 2.0 reuse license; it is not first-party current-water photographic evidence."
    ],
    nearbyLakes:[{slug:"lake-sweetwater",name:"Lake Sweetwater"},{slug:"lake-colorado-city",name:"Lake Colorado City"},{slug:"lake-brownwood",name:"Lake Brownwood"}],
    nearbyDestinations:[{slug:"abilene-state-park",name:"Abilene State Park",reason:"Separate main-campus campsite and nature-trail visitor guide, distinguished from the Lake Abilene drought closure."}]
  },
  {
    slug: "lake-cypress-springs", name: "Lake Cypress Springs", tpwdSlug:"cypress_springs", waterDataSlug:"cypress-springs",
    verifiedAt:"2026-10-14", accessReviewedAt:"2026-10-14", region:"piney-woods",
    summary:"Franklin County's Big Cypress Creek water-supply and fishing lake: five real FCWD ramps and designated campgrounds, a licensed bathymetric map, excellent crappie/white bass/spotted bass opportunities, and essential 2026 owner boating and flood-closure rules.",
    surfaceAcres:3461,maxDepthFeet:56,impoundedYear:1970,counties:["Franklin"],nearestCities:["Mount Vernon","Winnsboro","Pittsburg"],
    waterway:"Big Cypress Creek",riverBasin:"Cypress River Basin",authority:"Franklin County Water District",
    conservationPool:"378.00 ft NGVD29",fluctuation:"TPWD reference 2–3 feet; FCWD can close ramps when high water or other hazards make boating unsafe",clarity:"Clear",
    identity:"Lake Cypress Springs is Franklin County Water District's water-supply and recreation reservoir on Big Cypress Creek, not adjacent Lake Bob Sandlin. TPWD's historical reference surface area is 3,461 acres. All five TPWD-listed public ramps belong to FCWD, which can close lake access in hazardous conditions. FCWD's rules amended August 5, 2026 generally cap recreational boats at 26 feet long and 12 feet wide, require idle speed within 200 feet of shore and prohibit boating within 200 feet of spillway/intake structures. Consult the owner instead of repeating older $2-per-person and year-round labels as guaranteed current prices and openings. The lake's heritage, fish habitat and 2007 bathymetric map are separate from live TWDB water elevations.",
    habitat:[
      "TPWD and local partners document installed fish-attractor structures, brush and timber, dock pilings, dam riprap and shallow native vegetation; aquatic vegetation covers under 10% of the total water.",
      "The 2007 TWDB bathymetric survey underpins a genuine licensed lake-specific depth map. This historical graphic is not an official navigation chart, current depth sounding or lake photograph; check today's gauge, posted hazards and marked no-go areas.",
      "Crappie hold around brush and docks; spotted and largemouth bass use rocky edges, vegetated points and shoreline cover. Open water offers seasonal white bass schools while channel catfish use bottom contour and bait availability."
    ],
    fish:[
      fish("spotted-bass","Spotted bass","excellent","spring","TPWD rates spotted bass excellent. Work structured rocky points, shoreline brush and drops with small soft plastics and crankbaits without violating the district's 200-foot shoreline idle zone.",["soft-plastics","crankbaits","spinnerbaits"]),
      fish("largemouth-bass","Largemouth bass","good","spring","TPWD rates largemouth good; target shade, boathouse structure and scattered aquatic plants with spinnerbaits, plastics and topwater where publicly accessible.",["soft-plastics","spinnerbaits","topwater"]),
      fish("crappie","White and black crappie","excellent","spring","TPWD reports excellent crappie fishing around brush, timber and dock cover. Jigs and minnows permit a different approach from open-water bass fishing.",["jigs-and-minnows","vertical-jigging"]),
      fish("white-bass","White bass","excellent","summer","TPWD ranks white bass excellent. Locate suspended baitfish and schooling fish while keeping out of the 200-foot intake and spillway exclusion zones.",["trolling","vertical-jigging"]),
      fish("sunfish","Bluegill and redear sunfish","excellent","summer","TPWD ranks sunfish excellent; use light tackle at legal public shore access rather than private boathouses.",["jigs-and-minnows"]),
      fish("channel-catfish","Channel catfish","good","summer","TPWD rates channel catfish good. Baits fished along creek-channel transitions and permitted shoreline offer options beyond sport-bass tactics.",["cut-bait","live-bait"])
    ],
    access:"TPWD independently names Guthrie, Dogwood, Mary King, Overlook and Walleye parks, each with a public boat ramp and camping symbols. All are Franklin County Water District sites. The old TPWD description lists $2 per person and year-round access, but FCWD's current fees, launch restrictions and closure notices control. FCWD's flood rule permits a lake or ramp closure at 380.50 feet msl (2.5 ft above its 378-ft conservation pool) or earlier for safety. Boat length/width, no-wake shoreline approach and prohibited intake/spillway zones apply regardless of the old TPWD listing.",
    accessPoints:[
      {name:"Guthrie Park boat ramp",operator:"Franklin County Water District",kind:"park",launch:"North end of dam. From I-30 Exit 146 at Mount Vernon take SH 37 south, FM 21 east roughly six miles, FM 3007 south 1.8 miles to park signs; concrete ramp and designated camping.",fee:"TPWD formerly listed $2/person; check present FCWD day-use and campground fees",availability:"TPWD describes year-round operation, but owner high-water/safety closures override. FCWD (903) 537-4536."},
      {name:"Dogwood Park boat ramp",operator:"Franklin County Water District",kind:"park",launch:"South end of dam via FM 21 and FM 3007, continuing about 2.8 miles across the dam to signed Dogwood Park; concrete boat ramp and camping.",fee:"Archival TPWD $2/person is not confirmed as today's owner charge",availability:"Check flood status, boat-size limits, campground booking and current park access."},
      {name:"Mary King Park boat ramp",operator:"Franklin County Water District",kind:"park",launch:"South shoreline midway down the lake. Follow FM 3007 beyond the dam as road swings west, entering Turkey Cove at park signs.",fee:"TPWD archive lists a day-use fee; reserve any paid campsite separately",availability:"FCWD restricts vehicles on designated park greenbelts; verify accessible parking and ramp gates."},
      {name:"Overlook Park boat ramp",operator:"Franklin County Water District",kind:"park",launch:"North-shore midlake from SH 37 south of Mount Vernon, FM 21 east 3.2 miles then FM 2723 south approximately 4.6 miles.",fee:"Check actual day-use and overnight reservation prices with district",availability:"Year-round is a historical TPWD label only; verify owner flood/maintenance alerts."},
      {name:"Walleye Park boat ramp",operator:"Franklin County Water District",kind:"park",launch:"Near north side of dam, FM 21 to FM 2723 south, left onto FM 3122, then SE 4220 about 1.5 miles. TPWD lists fish-cleaning station.",fee:"Historical TPWD $2/person; district's current published tariff governs",availability:"Ask FCWD about fish-cleaning station, ramp status and permitted campsite inventory."}
    ],
    campingUrl:"https://www.fcwd.com/content/lake/parks.php",
    camping:{name:"Franklin County Water District designated camping parks",summary:"TPWD lists camping symbols at all five public access parks, but FCWD only allows camping in designated paid sites and requires written payment confirmation. RV bookings are offered up to 60 days in advance; stays of 14 or more consecutive days require special consent. Check each specific park's current electrical/water service, restrooms, campsite conditions, accessibility and fees before booking. Launch parking and an ordinary day-use ticket do not authorize overnight camping."},
    specialRules:true,
    historySourceUrl:"https://www.twdb.texas.gov/surfacewater/surveys/completed/files/CypressSprings/2007-07/CypressSprings2007_FinalReport.pdf",
    visitorSourceUrl:"https://www.fcwd.com/content/lake/parks.php",
    localRegulationsSourceUrl:"https://www.fcwd.com/content/rules.php",
    historyNotes:[
      "Franklin County Water District was established in 1965, with a November 10, 1966 authorization to develop the Big Cypress Creek project for water supply and recreation.",
      "TWDB reports dam construction began July 1968, deliberate impoundment started July 7, 1970 and formal project completion was February 15, 1971. The construction-completion date and first water storage should not be confused.",
      "Franklin County Dam has an earthfill structure and morning-glory service spillway. Its normal pool elevation is 378 ft (NGVD29). Historical TWDB measured surface/volume data and the CC BY-SA bathymetric map have their own 2007 vintage, unlike the dynamic water-level feed.",
      "The owner can close ramps/lake at elevation 380.50 ft msl or whenever public safety requires. Do not infer that the live stage reading alone proves a given ramp is open."
    ],
    visitorFAQs:[
      {question:"Which public parks have Lake Cypress Springs boat ramps?",answer:"Guthrie, Dogwood, Mary King, Overlook and Walleye, each operated by Franklin County Water District. Confirm present launch status and owner fees rather than relying on the older TPWD year-round and $2 figures."},
      {question:"Can I bring a 30-foot motorboat?",answer:"Not ordinarily. FCWD's current recreational boat rule generally caps length at 26 feet and width at 12 feet, except authorized work barges. Check the complete owner rule before towing."},
      {question:"How fast may I travel near shore?",answer:"FCWD requires careful idle speed within 200 feet of shoreline. Boats are also restricted within 200 feet of water intakes and spillway structures."},
      {question:"When might Lake Cypress Springs boat ramps close?",answer:"The water district's flood-closure policy sets 380.50 feet msl as a trigger, 2.5 feet above its 378-foot pool, and permits earlier closure when conditions are unsafe. Consult current FCWD alerts."},
      {question:"Can I camp at any of the public parks?",answer:"TPWD lists campsite facilities at all five parks, but paid designated camping with written confirmation is required. RV reservations may be made up to 60 days ahead; 14-day stays need district permission."},
      {question:"Does the lake have a free depth map?",answer:"Yes: a 1,500-by-757-pixel bathymetric map based on public 2007 TWDB survey data, independently produced by maxup10 and licensed CC BY-SA 4.0. It is a historic depth map, not a navigation chart or a current photograph."},
      {question:"May I keep triploid grass carp?",answer:"No. TPWD's permit and FCWD rules require harmless immediate release of triploid grass carp."},
      {question:"Is swimming permitted near boat ramps?",answer:"FCWD prohibits swimming within 50 feet of ramps; swimmers beyond 100 feet offshore must be accompanied by a boat and wear a personal flotation device. Observe designated swimming restrictions."},
      {question:"When was Lake Cypress Springs completed?",answer:"Construction started in July 1968, deliberate impoundment began July 7, 1970 and final construction completion occurred February 15, 1971 according to TWDB."}
    ],
    nearbyLakes:[{slug:"lake-bob-sandlin",name:"Lake Bob Sandlin"},{slug:"lake-o-the-pines",name:"Lake O' the Pines"},{slug:"lake-fork",name:"Lake Fork"}],
    travelAlerts:[
      "District recreational vessel limits: 26 feet length and 12 feet width; operate at idle speed within 200 feet of any shoreline and stay clear of intake/spillway exclusion zones.",
      "FCWD may close the lake or ramps above 380.50 feet or at lower levels for safety. The older TPWD 'open year-round' inventory is not a live operator status.",
      "Triploid grass carp must be released unharmed; keep to designated public fishing locations and current TPWD limits.",
      "Only district-designated paid campsites permit overnight stays. FCWD rules on reservation confirmation, vehicle access, pet restraint and dump station use apply.",
      "The featured image is an exact-lake historic BATHYMETRIC MAP, not a photograph. Check current TWDB level and the owner before making depth or navigation assumptions."
    ],
  },
  {
    slug: "bachman-lake", name: "Bachman Lake", tpwdSlug: "bachman",
    verifiedAt: "2026-10-14", accessReviewedAt: "2026-10-14", region: "prairies-lakes",
    summary: "Historic 1903 urban fishing reservoir beside Dallas Love Field: one tight-parking Shorecrest ramp, abundant shore fishing, excellent TPWD-rated crappie, city boating limits, a recently rehabilitated dam and a separate 205-acre metropolitan park.",
    surfaceAcres: 132, maxDepthFeet: 14, impoundedYear: 1903, counties: ["Dallas"], nearestCities: ["Dallas"],
    waterway: "Bachman Branch (also called Bachman Creek), tributary to the Trinity River", riverBasin: "Trinity River Basin",
    authority: "City of Dallas Parks and Recreation / Dallas Water Utilities",
    conservationPool: "No verified current public lake gauge; consult Dallas Parks for lake and facility notices",
    fluctuation: "TPWD historical overview reports approximately one foot; construction and weather can change shoreline access",
    clarity: "Stained",
    identity: "Bachman Lake is the shallow 132-acre reservoir inside Dallas's separately measured approximately 205-acre Bachman Lake Park. Those two acreage figures describe different footprints, not contradictory estimates of the same water surface. The reservoir was built in 1903 as municipal water storage and later became recreation-only. The City of Dallas completed a major reservoir dredging phase in 2023 and announced a March 31, 2026 ribbon cutting for dam and spillway rehabilitation; the old TPWD fish survey projected earlier completion and is not a reliable current construction-status notice. The lake is an urban bank-fishing and rowing setting, not a swimming or camping destination.",
    habitat: [
      "Most fish-holding natural cover is in limited emergent shoreline vegetation, rock-gabion banks, sparse brush along the dam and the south-shore riprap opposite Love Field. TPWD's 132-acre profile rates white crappie excellent and bass good, but its latest management assessment reuses older 2018–2019 fish sampling because major dredging restricted survey operations.",
      "For crappie, work deeper water at the west end and the dam with jigs or minnows. Bass concentrate along rock and brush, while sunfish hold around sparse shoreline emergent vegetation; accessible shore positions depend on maintained walkways and safe legal access.",
      "The upper lake historically became very shallow from accumulated sediment. A city dredging project removed silt from part of the basin in 2023. Neither an older fishery-survey map nor the lake's old 14-foot maximum depth should be used to promise today's navigation clearance."
    ],
    fish: [
      fish("crappie","White crappie","excellent","spring","TPWD rates white crappie excellent in its angling table. Try small jigs or minnows at the dam, shaded brush and western deeper water; historical sampling predates the recent dam project.",["jigs-and-minnows","vertical-jigging"]),
      fish("largemouth-bass","Largemouth bass","good","spring","TPWD rates largemouth bass good. Work riprap on the southern bank, sparse emergent weeds and brush against the dam using light tackle and compact lures.",["soft-plastics","spinnerbaits","crankbaits","topwater"]),
      fish("catfish","Catfish","fair","summer","TPWD rates catfish fair rather than abundant. Fish legal shoreline points with cut bait; do not infer today's catch rate from pre-rehabilitation surveys.",["cut-bait","live-bait"],"secondary"),
      fish("sunfish","Sunfish","fair","summer","Sunfish including warmouth occur along vegetation and park shorelines. Light jigs and small baits are suitable where bank access is permitted.",["jigs-and-minnows"],"secondary")
    ],
    access: "TPWD documents ONE public boat-launch location at Shorecrest Drive, south of the lake immediately north of Dallas Love Field. Its access directory describes a two-lane paved ramp but parking for only five trailers, while an older management report calls it one lane: confirm actual marked ramp and usable trailer clearance on site. TPWD lists no ramp fee, but 'open all year' is a historical directory description, not live closure verification. Most of the shore is available for public bank fishing from the surrounding park; fishing is NOT the same as swimming, which Dallas ordinances prohibit in Bachman Lake.",
    accessPoints: [
      {name:"Shorecrest Drive municipal boat ramp",operator:"City of Dallas Park and Recreation",kind:"public-ramp",launch:"South shore off Shorecrest Drive north of Dallas Love Field; TPWD provides coordinates 32.849544, -96.865733. Its public list says two paved lanes but only FIVE trailer parking spaces; an older TPWD management report describes a single lane.",fee:"TPWD historically lists no fee; verify latest Dallas Parks permit and launch rules",availability:"TPWD says year-round, but opening, trailer spaces, construction works and local boat restrictions must be verified with Dallas Parks (214) 670-8281."},
      {name:"Bachman Lake public bank-fishing shoreline",operator:"City of Dallas Park and Recreation",kind:"park",launch:"Use legal paved trails and lake-edge openings from Bachman Lake Park at 3500 W. Northwest Highway. This is WALK-IN SHORE FISHING and not an additional trailer ramp.",fee:"No separate shoreline access fee identified in TPWD listing; recreation center and aquatics programs may charge separately",availability:"Dallas Parks displays park hours 6 a.m.–11 p.m.; boat operation is separately prohibited from sundown to sunup. Check posted area closures and ADA accessibility before travel."}
    ],
    campingProhibited: true,
    camping: {name:"No designated overnight camping at Bachman Lake Park",
      summary:"Dallas Parks lists day-use park features, recreation centers, trails, boating and fishing, but no campsite reservation or campground. Do not treat an urban boat ramp, pavilion, picnic area or parking lot as a permitted overnight site. Book lodging or a verified campground elsewhere."},
    specialRules: true,
    visitorSourceUrl:"https://www.dallasparks.org/754/Bachman-Lake-Park",
    localRegulationsSourceUrl:"https://codelibrary.amlegal.com/codes/dallas/latest/dallas_tx/0-0-0-115288",
    historySourceUrl:"https://tpwd.texas.gov/publications/pwdpubs/lake_survey/pwd_rp_t3200_1438/",
    liveDataNote:"TPWD reports NO available lake-level gauge for this city-managed reservoir. A past average fluctuation is not a current reading. Consult City of Dallas Parks and dam-project notices for current shore access or water conditions rather than inventing a live level.",
    historyNotes:[
      "Dallas built Bachman Reservoir in 1903 on Bachman Branch for municipal water supply. It no longer supplies the city and is managed for recreation; Bachman Lake Park was established in the 1930s as a larger roughly 205-acre public landscape around the smaller water body.",
      "TPWD records substantial dredging in 2003 and another city hydraulic dredging program beginning 2022, with upper-basin dredging completed in 2023. Fishery monitoring was disrupted, so the latest published TPWD fish assessment contains older sampling and should not be treated as a post-rehabilitation population survey.",
      "Dallas's 2026 project announcement advertised a March 31 ribbon cutting at the southwest dam and spillway. The city capital-project directory can continue to list work even after a ceremony, so the guide describes documented project milestones without assuming every launch or path is unobstructed on a specific date.",
      "A 2005 historic exact-lake photograph, now on Wikimedia Commons under CC BY-SA 3.0, establishes the real location but does not depict post-2023 dredging or post-2026 dam conditions."
    ],
    visitorFAQs:[
      {question:"Is the lake or the park 205 acres?",answer:"Dallas Parks describes Bachman Lake Park as about 205 acres, including its trails and amenities. TPWD measures the fishing reservoir itself at 132 surface acres. Do not interchange parkland and lake-water acreage."},
      {question:"Where can I launch a boat?",answer:"TPWD identifies only the Shorecrest Drive south-shore ramp; the access directory says two lanes with room for five trailers, while an older fisheries report describes one lane. Confirm live status and parking with Dallas Parks before towing."},
      {question:"Is the motor limit 5 or 10.5 horsepower?",answer:"TPWD's general Bachman Lake page says 5 HP. However Dallas City Code §32-40 as published in July 2026 generally prohibits operating a boat with a motor rating ABOVE 10.5 HP on Bachman and White Rock, with specified exceptions. Those sources disagree. Consult current Dallas rules and on-site signs or call park operations before choosing a motor; do not assume a boat with a stronger installed engine may legally operate it."},
      {question:"Can I swim in Bachman Lake?",answer:"No. Dallas City Code Chapter 32 prohibits swimming in Bachman Lake; nearby recreation-center pools and the separate aquatic center are not part of the reservoir."},
      {question:"Can I fish from shore?",answer:"Yes. TPWD describes most of the shoreline as publicly available for bank fishing. The park has paved paths, but accessible fishing spots, temporary construction boundaries and shoreline grades require an on-site check."},
      {question:"Is boat use allowed at night?",answer:"Dallas City Code §32-47 prohibits boating from sundown to sunup on Bachman Lake, a separate rule from posted park hours of 6 a.m.–11 p.m."},
      {question:"What fish are worth targeting?",answer:"TPWD rates white crappie excellent and largemouth good, with catfish and sunfish fair. Much of the published biological sampling predates the dredging and dam work, so check any newer TPWD survey."},
      {question:"Did dredging and dam work finish?",answer:"TPWD records completion of upper-basin hydraulic dredging in 2023. Dallas publicized a March 31, 2026 dam/spillway project ribbon cutting. Neither source certifies every launch or public trail open right now."},
      {question:"Can I camp beside the lake?",answer:"No designated campsite or overnight campground is documented in the public park and ramp inventories. Use a separately authorized campground or hotel; do not assume a picnic pavilion allows overnight camping."},
      {question:"Does Bachman Lake have live water levels?",answer:"TPWD states no public gauge is available for the reservoir. Older reference fluctuation and maximum-depth figures are not today's lake level."}
    ],
    travelAlerts:[
      "City of Dallas §32-40 (July 2026) states a general 10.5-horsepower operational ceiling with exceptions for authorized activities, while TPWD's general fishing page still says 5 horsepower; confirm current municipal rules and signage before launching.",
      "Dallas Chapter 32 prohibits swimming in the lake and boating from sundown to sunup. The park recreation pools are distinct facilities.",
      "TPWD's Shorecrest launch directory has only five trailer-parking spaces; its access listing and an older fisheries report disagree on the number of usable ramp lanes.",
      "The 2023 dredging and March 2026 dam rehabilitation ceremony do not establish same-day opening of every park area. Consult Dallas Parks for trail, ramp or construction restrictions.",
      "The exact-lake photo is from 2005 and must not be used as evidence of 2026 lake depth, shoreline, construction or access conditions."
    ],
    nearbyLakes:[{slug:"white-rock-lake",name:"White Rock Lake"},{slug:"lake-ray-hubbard",name:"Lake Ray Hubbard"},{slug:"joe-pool-lake",name:"Joe Pool Lake"}]
  },
  {
    slug: "e-v-spence-reservoir", name: "E. V. Spence Reservoir", tpwdSlug: "spence", waterDataSlug: "e-v-spence",
    region: "panhandle-plains", verifiedAt: "2026-10-14", accessReviewedAt: "2026-10-14",
    summary: "Historic Colorado River water-supply reservoir at Robert Lee, with unusually severe low-water access risk, five named recreation sites including closed Rough Creek, older fish-kill history, timestamped TWDB levels and a public-domain actual-reservoir photograph.",
    surfaceAcres: 14640, maxDepthFeet: 108, impoundedYear: 1969, counties: ["Coke"], nearestCities: ["Robert Lee", "San Angelo"],
    waterway: "Upper Colorado River near Robert Lee", riverBasin: "Colorado River Basin",
    authority: "Colorado River Municipal Water District (CRMWD)",
    conservationPool: "1,898 feet NGVD29 on current TWDB gauge; old TPWD reference also shows 1,898 ft msl",
    fluctuation: "Long multiyear drought drawdowns can far exceed TPWD's older six-to-ten-foot annual reference range",
    clarity: "Clear near dam in normal lake conditions, increasingly stained upstream; extreme low water changes shoreline",
    identity: "E. V. Spence Reservoir lies on the Colorado River west of Robert Lee in Coke County; it is not nearby Lake Colorado City, Lake Nasworthy or O. H. Ivie. The Colorado River Municipal Water District operates Robert Lee Dam primarily for water supply. TPWD's 14,640-acre surface area represents an historical full-pool condition, NOT a live lake footprint. A historical TWDB snapshot dated September 28, 2026 recorded 9.4 percent of storage capacity filled and a roughly 3,233-acre surface, making old recreation brochures especially risky. The current water level must be read directly from TWDB with its timestamp; no historic photo or 'year-round' ramp listing proves a launch is usable. TPWD explicitly identifies Rough Creek recreation area as CLOSED, and lists access fees and other facilities which must be confirmed with CRMWD.",
    habitat: [
      "TPWD describes steep rocky banks and bluffs, side creeks, an irregular Colorado River channel and broad mud flats. The reservoir has no significant aquatic vegetation in the old TPWD profile.",
      "As water declines, shoreline cover, fixed marina docks and concrete launch ramps may strand well above the water. Survey maps and old fishing spots should never be interpreted as current legal or safe trailer access.",
      "TPWD documents severe golden-alga fish kills in the early 2000s and an altered fishery thereafter. Its fishing-quality ratings are modest, with an older narrative that may not describe present low-water populations. Treat angling advice as historically sourced until new survey and access data are confirmed."
    ],
    fish: [
      fish("largemouth-bass", "Largemouth bass", "fair", "spring", "TPWD historically rated largemouth bass fair and described crankbaits, spinnerbaits, soft plastics and topwater near rocky structure and drop-offs. Present fishability and launching are not verified at the very low reservoir elevation.", ["crankbaits","spinnerbaits","soft-plastics","topwater"], "secondary"),
      fish("catfish", "Catfish", "fair", "summer", "TPWD listed legal-size channel catfish rebuilding after golden-alga losses and rated catfish fair; historically live or cut bait was used along rocky and channel structure. Check access and current stocking/survey information before a trip.", ["cut-bait","live-bait"], "secondary"),
      fish("white-bass", "White bass", "poor", "spring", "TPWD's posted fishery table rates white bass poor. Do not use old photographs or stocking lists to market an active white-bass run; confirm current reports and water access.", ["vertical-jigging","trolling"], "secondary"),
      fish("striped-bass", "Striped bass", "poor", "summer", "The TPWD fishing profile includes striped bass historically but rates opportunities poor after fishery damage; current trophy expectations are unsupported. Validate fresh survey results before promising an offshore fishery.", ["trolling","vertical-jigging"], "secondary"),
      fish("crappie", "Crappie", "poor", "spring", "TPWD describes crappie opportunities as poor. Historical structure near creek arms may be exposed during prolonged drawdown; no current site-specific catching recommendation is supported.", ["jigs-and-minnows","vertical-jigging"], "secondary")
    ],
    access: "TPWD lists five named recreation/access areas but they are NOT five boat ramps. Wildcat and Paint Creek each have a historic concrete ramp; Rough Creek is explicitly CLOSED; South End and North End of Dam are BANK ACCESS ONLY. TPWD also describes historically three paved ramps without a consistently named third currently usable ramp, so do not invent one. The source's $5 vehicle day pass, $60 annual permit and senior discount are old posted reference prices, not verified current charges. Extreme drought makes ramp reachability the overriding issue: call CRMWD (432) 267-6341 or the relevant on-site operator and use the timestamped TWDB level before towing a boat.",
    accessPoints: [
      {name:"Wildcat Recreation Area historic concrete ramp",operator:"CRMWD / Wildcat Marina",kind:"public-ramp",launch:"Approximately three miles west of Robert Lee on Texas Highway 158. TPWD historically lists a concrete ramp, camping, parking, picnic and marina services.",fee:"TPWD older inventory lists $5 vehicle day pass; verify current charges and actual marina operation",availability:"TPWD says year-round in its older inventory; very low lake water can render the ramp unusable. Confirm with CRMWD (432) 267-6341 and site (325) 453-2801 before towing."},
      {name:"Paint Creek Recreation Area historic concrete ramp",operator:"CRMWD / Paint Creek Marina",kind:"public-ramp",launch:"Approximately five miles west of Robert Lee on Texas Highway 158. Historic concrete launch, picnic, camping and marina area.",fee:"TPWD older inventory lists $5 vehicle day pass; current price unknown",availability:"Not certified usable at present low reservoir levels; confirm current operator conditions (325) 453-2982 or CRMWD."},
      {name:"Rough Creek Recreation Area — closed",operator:"Colorado River Municipal Water District",kind:"park",launch:"Named in TPWD's historic recreation inventory, but TPWD explicitly labels the area CLOSED AT PRESENT. Do not use as a launch or campground.",fee:"No admission or launch right implied by an inventory map",availability:"CLOSED on TPWD's currently displayed lake access page. Do not travel here for a ramp unless the operator posts a reopening."},
      {name:"South End of Robert Lee Dam bank access",operator:"Colorado River Municipal Water District",kind:"park",launch:"Approximately one mile west of Robert Lee off Texas Highway 158; TPWD identifies BANK ACCESS ONLY, without a trailer boat ramp.",fee:"Old TPWD listing includes vehicle day-pass fee; verify operator current charge",availability:"Do not mistake shoreline fishing/picnic use for an operational ramp. Confirm park access with CRMWD (432) 267-6341."},
      {name:"North End of Robert Lee Dam bank access",operator:"Colorado River Municipal Water District",kind:"park",launch:"Approximately one mile west of Robert Lee from FM 1904; BANK ACCESS ONLY in TPWD's inventory.",fee:"Old TPWD listing includes vehicle day-pass fee; confirm",availability:"Check operator status and safe legal shoreline access; no boat ramp documented at this entry."}
    ],
    camping:{name:"Historically designated Wildcat and Paint Creek CRMWD recreation campgrounds",summary:"TPWD lists camp/picnic facilities at Wildcat and Paint Creek and identifies dam-end day-use areas separately. Rough Creek is CLOSED. Historical campground icons do not guarantee functioning hookups, water, safe shoreline or 2026 reservations. Call the CRMWD or camp operator and verify usable sites, overnight permits, restrooms, burn restrictions and low-water access before booking."},
    specialRules:true,
    historySourceUrl:"https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/ev_spence/index.asp",
    visitorSourceUrl:"https://www.crmwd.org/",
    historyNotes:[
      "The reservoir is named for E. V. Spence, the Colorado River Municipal Water District's first general manager, who advocated for the water-supply permit. Texas issued permit No. 2179 on September 1, 1965.",
      "TWDB records December 16, 1966 for the start of Robert Lee Dam construction, December 15, 1968 for deliberate impoundment and November 21, 1969 for dam completion. A separate historical summary may simplify the project to '1969 impounded'; use the detailed chronology rather than assuming completion and first water storage occurred together.",
      "The 21,500-foot earthfill embankment has a maximum height of about 140 feet, with a distinct emergency spillway and twelve-gate service structure. TWDB's 1999 survey gave about 14,640 acres and 512,272 acre-feet at conservation elevation 1,898 feet; the current TWDB reservoir page uses an updated capacity convention of 517,272 acre-feet. These are survey-vintage differences, not live measurements.",
      "The lake's Colorado River water-supply role and subsequent drought are fundamental to understanding recreation limits. Low-water aerial imagery from January 2009 demonstrates the real site but does not establish today's usable ramp depth or extent."
    ],
    visitorFAQs:[
      {question:"Can I launch a boat at E. V. Spence Reservoir right now?",answer:"Not confirmed. TPWD's historic inventory lists Wildcat and Paint Creek concrete ramps as open year-round, but extreme low water can strand either. Verify the current TWDB gauge and obtain a specific CRMWD or marina confirmation before towing; never infer usable ramps from the access directory alone."},
      {question:"Is Rough Creek open?",answer:"No according to TPWD's currently displayed access inventory, which explicitly labels Rough Creek CLOSED AT PRESENT. Contact CRMWD to learn about a future change before traveling."},
      {question:"Can I launch from the north or south end of Robert Lee Dam?",answer:"No motorboat ramp is listed at those two sites. TPWD calls them BANK ACCESS ONLY, with shoreline, picnic and historic day-use facilities, subject to operator confirmation."},
      {question:"How much does lake access cost?",answer:"TPWD's access page historically lists a $5 vehicle day pass, $60 annual pass and special senior rate. Those are dated reference charges, not a verified current permit quote. Contact CRMWD or the current recreation operator for actual prices."},
      {question:"How full is E. V. Spence Reservoir?",answer:"Read the timestamped Water Data for Texas E. V. Spence station directly. The agency's September 28, 2026 snapshot showed roughly 9.4% full, but that is historical evidence of severe drawdown, not today's exact level. The guide keeps live gauge measurements separate from evergreen body text."},
      {question:"Is the lake good for striped bass?",answer:"TPWD includes striped bass historically, but its fishery table rates striped and white bass poor following golden-alga fish kills. Do not plan a trophy trip from old fisheries descriptions; check current TPWD stocking, survey and operator access."},
      {question:"Where can I camp?",answer:"TPWD historically lists designated camping at Wildcat and Paint Creek recreation areas. Rough Creek is closed, while the north/south dam-bank entries are not automatically campgrounds. Confirm actual operating sites and overnight charges directly."},
      {question:"Why does TPWD list 14,640 acres while the lake appears much smaller?",answer:"TPWD gives a full conservation-pool surface area, not today's water extent. TWDB's measurements at current low elevation can be dramatically less; time-specific area, volume and percent full require the live gauge's source timestamp."},
      {question:"What is the difference between the 1968 and 1969 dates?",answer:"TWDB documents deliberate water impoundment beginning December 15, 1968, and dam completion November 21, 1969. The simplified TPWD fact panel labels the reservoir impounded 1969."},
      {question:"Who owns E. V. Spence Reservoir?",answer:"The Colorado River Municipal Water District owns and operates the water-supply reservoir and Robert Lee Dam, serving district water needs and the City of San Angelo. CRMWD, not a Texas state park, is the source for same-day recreation access."}
    ],
    travelAlerts:[
      "SEVERE LOW-WATER ACCESS RISK — the September 28, 2026 TWDB snapshot showed about 9.4% capacity and large shoreline drawdown. This dated figure must NOT be shown as current; read the live TWDB value and confirm any usable boat ramp with CRMWD before driving.",
      "CLOSED AREA — TPWD's current public-access directory calls Rough Creek CLOSED. Do not promise camping, bank fishing or launching there based on old recreation maps.",
      "BANK ACCESS IS NOT A BOAT RAMP — the north and south ends of Robert Lee Dam are shoreline day-use locations only in TPWD's inventory.",
      "OUTDATED FEES AND OPEN-ALL-YEAR LANGUAGE — TPWD's historical $5 day pass and annual permits and year-round labels are not proof of current prices or low-water ramp functionality.",
      "The exact-reservoir public-domain aerial photo was taken January 21, 2009 and is not evidence of current reservoir extent, water safety, active camping or launch conditions."
    ],
    nearbyLakes:[{slug:"lake-colorado-city",name:"Lake Colorado City"},{slug:"o-h-ivie-lake",name:"O. H. Ivie Lake"},{slug:"lake-nasworthy",name:"Lake Nasworthy"}],
  },
  {
    slug: "brady-creek-reservoir", name: "Brady Creek Reservoir", tpwdSlug: "brady_creek", waterDataSlug: "brady-creek",
    region: "hill-country", verifiedAt: "2026-10-14", accessReviewedAt: "2026-10-14",
    summary: "The City of Brady's San Saba–Colorado basin water-supply reservoir with a single documented public launch, water-sensitive ramp usability, recovering bass fishery, official cabins, RV hookups and tent camping, USGS gauging evidence and a source-verified 1961–1963 dam history.",
    surfaceAcres: 2020, maxDepthFeet: 48, impoundedYear: 1963, counties: ["McCulloch"], nearestCities: ["Brady"],
    waterway: "Brady Creek, tributary to the San Saba River", riverBasin: "Colorado River Basin",
    authority: "City of Brady", conservationPool: "1,743 feet above mean sea level (TPWD reference)",
    fluctuation: "TPWD describes 3–5 feet as typical; severe drought can make the dam-side ramp unusable even when the park is open",
    clarity: "Moderately stained",
    identity: "Brady Creek Reservoir, locally called Brady Lake, lies west of Brady in McCulloch County; it is not Lake Brownwood, O. H. Ivie Reservoir or an amenity of a state park. The City of Brady owns and operates the reservoir for water supply, industrial use and recreation. TPWD rates bass, catfish, crappie and white bass FAIR, explaining a slow recovery from a major 2012 golden-alga bloom and low-water years. The 2,020 acres reported in the lake fact sheet are a reference full-pool area, not a measurement of current shoreline or ramp usability. TPWD's one named public access site is the city park near the dam. It labels the park year-round while expressly warning the single ramp works best only at high water: call the city and check the timestamped TWDB reservoir level before towing.",
    habitat: [
      "Submerged and shoreline cover is sparse in normal conditions. TPWD identifies a rocky bluff on Brady Creek, riprap, gravel banks, boulders, dead trees and an old submerged railroad bed as the most distinctive fish-holding structure.",
      "Drought changes how much of the old channel, shallow brush or railroad bed is under water, so archived fishing coordinates are not proof that a particular spot is safe or accessible at the lake's present elevation.",
      "Golden-alga blooms and drought harmed the fishery in the 2010s. TPWD subsequently stocked largemouth bass fingerlings as a fishery-recovery measure; stocking does not guarantee a trophy fishery or change today's displayed FAIR quality assessments.",
      "Seasonal runoff can temporarily color the water and alter fish positioning; use the latest official fishing report rather than treating the static tactics below as today's bite."
    ],
    fish: [
      fish("largemouth-bass", "Largemouth bass", "fair", "spring",
        "TPWD rates bass FAIR after historic fish kills and low-water periods. Search rocky bluff transitions, riprap and submerged wood with small soft plastics, spinnerbaits or crankbaits; do not market the lake as a consistently outstanding trophy-bass destination.",
        ["soft-plastics", "spinnerbaits", "crankbaits", "topwater"]),
      fish("channel-catfish", "Channel catfish", "fair", "summer",
        "TPWD rates catfish FAIR. Creek-channel changes, rock edges and deeper shoreline transitions are useful exploratory structures; confirm fish-consumption advisories and fishing rules before keeping a catch.",
        ["cut-bait", "live-bait"]),
      fish("crappie", "White crappie", "fair", "spring",
        "TPWD rates crappie FAIR. Cover near submerged trees and the old railroad bed offers more specific habitat than vegetation-starved open banks; check whether those structures are underwater and legally reachable.",
        ["jigs-and-minnows", "vertical-jigging"]),
      fish("white-bass", "White bass", "fair", "spring",
        "TPWD's angling table also rates white bass FAIR. Look for seasonal schooling and forage along open points and former creek-channel edges; avoid treating an old report's location as a reliable live pattern.",
        ["trolling", "vertical-jigging"])
    ],
    access: "TPWD documents ONE public entry, City Park at Dam, reached by FM 2028 and FM 3022 just west of Brady. Its older inventory says no ramp fee, year-round park access, picnic and camping symbols, but directly cautions the boat ramp is good only at high water levels. This is a critical distinction: an open park does not imply an operable launch. Verify gate hours, overnight camping rules, ramp depth and any required reservations directly with the City of Brady at (325) 597-2152. No second named public boat ramp is established by the official TPWD access page, so do not confuse private ranch tracks, shoreline fishing or the USGS gauge installation with a public launch.",
    accessPoints: [
      {
        name: "City Park at Dam public boat ramp",
        operator: "City of Brady",
        kind: "park",
        launch: "Drive west from Brady on FM 2028 to FM 3022 at the Brady Creek dam. TPWD labels the park as the single named public launch but explicitly says the RAMP WORKS WELL ONLY AT HIGH WATER; check actual usable depth with the City of Brady before bringing a trailer.",
        fee: "TPWD older access inventory lists no boat-launch fee; current city day-use, camping or permit charges may differ",
        availability: "TPWD historic year-round park label is not proof of a usable ramp. Call Brady city offices (325) 597-2152 and check timestamped water level immediately before a fishing or boating trip."
      }
    ],
    campingUrl: "https://www.bradytx.us/881/Brady-Lake",
    camping: {
      name: "Brady Lake City Park and Marina — cabins, RV hookups and tent sites",
      summary: "Unlike TPWD's sparse lake-ramp inventory, Brady's official municipal Brady Lake page details a developed overnight facility: eight cabanas and 12 rental cabins at Brady Lake Marina, 23 RV hookups in the park area plus additional pavilion-area RV hookups, 15 tent sites and three primitive campsites. The city also advertises showers/restrooms and publishes seasonal marina hours. These are operator-advertised counts rather than same-day vacant inventory: book or verify by phone at (325) 597-1823 or through the city's linked CampSpot reservation system. Do not confuse Brady Lake marina with separate Richards Park RV sites in downtown Brady."
    },
    historySourceUrl: "https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/brady_creek/index.asp",
    visitorSourceUrl: "https://www.bradytx.us/881/Brady-Lake",
    historyNotes: [
      "TWDB describes Brady Creek Reservoir approximately three miles west of Brady, where Brady Creek drains toward the San Saba River and ultimately the Colorado. The City of Brady received Water Right Permit 1953 on May 2, 1960, authorizing a municipal/industrial water-supply project with recreational use.",
      "Construction began December 27, 1961. TWDB dates dam completion to May 14, 1963, followed by the start of deliberate impoundment on May 22, 1963. These are separate engineering and filling milestones; an undated 'built 1963' statement loses the distinction.",
      "TWDB documents an earthfill dam about 8,400 feet long and 104 feet high, with 30,430 acre-feet of conservation storage at a stated 1,743-foot conservation pool. These are engineering reference figures, not the lake's current water volume. USGS documents a genuine reservoir gaging station, 08144900; its photograph shows monitoring structures and should not be confused with the public park boat ramp.",
      "A publicly documented golden-alga fish-kill event in 2012 and prolonged low water changed the fishery. TPWD's present lake overview continues to describe slow recovery and assigns only FAIR ratings to bass, catfish, crappie and white bass. Treat older fish catches and stocking numbers as dated historical events, not fresh predictions."
    ],
    visitorFAQs: [
      {question:"Where is the public boat ramp?",answer:"TPWD identifies one public launch: City Park at Dam, west of Brady via FM 2028 and FM 3022. It specifically says that the ramp works well only at HIGH WATER. Call the city before towing rather than relying on a 'year-round' park label."},
      {question:"Can I camp overnight at Brady Creek Reservoir?",answer:"Yes. The City of Brady explicitly lists RV hookups, 15 tent sites, three primitive campsites and marina cabin/cabana rentals at Brady Lake. Call (325) 597-1823 or follow the municipal Brady Lake Campspot reservation link to confirm live availability, site type and price; separate downtown Richards Park RV sites are not at this lake."},
      {question:"Is the Brady Creek boat ramp usable at low lake levels?",answer:"It may not be. TPWD states that the ramp is good at high water levels; shallow trailer launching may be unsafe or impossible under drought conditions. Use the current TWDB level, then verify actual ramp access with the operator."},
      {question:"Is this a good trophy bass lake?",answer:"TPWD currently rates largemouth bass FAIR, not excellent. The fishery has been rebuilding after golden-alga impacts and prolonged drought; stocker releases and isolated catches do not override the official lake-wide quality classification."},
      {question:"What other fish can I catch?",answer:"TPWD identifies channel catfish, white crappie and white bass among its main fish species. It rates all of those FAIR; seek submerged rocky banks, timber, creek channels and the old railroad bed according to lake elevation."},
      {question:"Does the lake have a measured level?",answer:"Yes. TWDB's Water Data for Texas Brady Creek reservoir station publishes dated surface elevation and storage information. A live reading needs its collection timestamp; TPWD's 2,020-acre reference area does not describe today's waterline."},
      {question:"Why did fish numbers decline?",answer:"TPWD reports a major golden-alga bloom beginning in 2012 and subsequent water shortages; recovery stocking and monitoring occurred later. Those reports explain long-term fishery conditions but do not establish the next day's fishing quality."},
      {question:"When was Brady Creek Reservoir built?",answer:"TWDB documents construction beginning December 27, 1961, completion May 14, 1963 and the start of deliberate impoundment May 22, 1963. It was developed for the City of Brady's municipal/industrial water supply and recreation."},
      {question:"Can visitors use the USGS water gauge as a boat launch?",answer:"No. USGS gaging station 08144900 is an engineered monitoring structure. Its official photographs document the lake's water-level infrastructure; the public launch is the separate City Park at Dam."}
    ],
    travelAlerts: [
      "RAMP DEPTH ALERT: The sole TPWD-named city-park ramp is described as good only at HIGH WATER. 'Open all year' describes a historic park listing, NOT current trailer launchability.",
      "FISHERY RECOVERY: TPWD describes a slow comeback from a 2012 golden-alga bloom and drought. All four rated fisheries remain FAIR in its public angling table; do not infer recent stocking guarantees success.",
      "CAMPING: The City of Brady posts 23 park-area RV hookups, additional pavilion RV sites, 15 tent sites, three primitive campsites, eight cabanas and 12 cabins; reserve through the official municipal CampSpot handoff or (325) 597-1823. Advertised capacity is not vacancy confirmation.",
      "PHOTO CONTEXT: The actual Brady Lake photograph was captured May 26, 2021 and is not a visual representation of current reservoir levels, access ramps or recent construction.",
      "Boaters must comply with statewide drain/clean requirements to prevent the spread of invasive aquatic species, and should check live weather, TPWD rules and city notices."
    ],
    nearbyLakes: [{slug:"lake-brownwood",name:"Lake Brownwood"},{slug:"o-h-ivie-lake",name:"O. H. Ivie Lake"},{slug:"lake-colorado-city",name:"Lake Colorado City"}],
  },
];

const techniqueLabels: Record<TechniqueId, string> = {
  "soft-plastics": "Soft plastics",
  crankbaits: "Crankbaits",
  spinnerbaits: "Spinnerbaits",
  topwater: "Topwater",
  trolling: "Trolling",
  "vertical-jigging": "Vertical jigging",
  "jigs-and-minnows": "Jigs and minnows",
  "live-bait": "Live bait",
  "cut-bait": "Cut bait",
};

function sourceVerifiedAt(def: StatewideLakeDefinition) {
  return def.verifiedAt ?? VERIFIED_AT;
}

function tpwdSource(def: StatewideLakeDefinition): FishingSource {
  return {
    id: `tpwd-${def.slug}`,
    name: `Texas Parks & Wildlife Department — ${def.name}`,
    url: `https://tpwd.texas.gov/fishboat/fish/recreational/lakes/${def.tpwdSlug}/`,
    checkedAt: sourceVerifiedAt(def),
    sourceType: "state",
  };
}

function accessSource(def: StatewideLakeDefinition): FishingSource {
  return {
    id: `tpwd-${def.slug}-access`,
    name: `Texas Parks & Wildlife Department — ${def.name} public access`,
    url: `https://tpwd.texas.gov/fishboat/fish/recreational/lakes/${def.tpwdSlug}/${def.accessPage ?? "access.phtml"}`,
    checkedAt: def.accessReviewedAt ?? sourceVerifiedAt(def),
    sourceType: "state",
  };
}

export const statewideNetworkFishingLakes: FishingLake[] = statewideNetworkLakeDefinitions.map((def) => ({
  id: def.slug,
  brandId: BRAND,
  slug: def.slug,
  status: "published",
  verifiedAt: sourceVerifiedAt(def),
  sources: [tpwdSource(def), accessSource(def)],
  name: def.name,
  summary: def.summary,
  region: def.region,
  waterType: def.slug === "caddo-lake" ? "natural-lake" : "reservoir",
  waterClass: "freshwater",
  counties: def.counties,
  nearestCities: def.nearestCities,
  surfaceAcres: def.surfaceAcres,
  maxDepthFeet: def.maxDepthFeet,
  impoundedYear: def.impoundedYear,
  riverBasin: def.riverBasin,
  primaryWaterway: def.waterway,
  controllingAuthorities: [def.authority],
  featured: true,
}));

export const statewideNetworkLakeSpeciesProfiles: LakeSpeciesProfile[] = statewideNetworkLakeDefinitions.flatMap((def) => {
  const source = tpwdSource(def);
  return def.fish.map((target, index) => ({
    id: `${def.slug}-${target.id}-network-${index + 1}`,
    lakeId: def.slug,
    speciesId: target.id,
    prominence: target.prominence ?? "primary",
    quality: target.quality,
    seasonalPatterns: [{ season: target.season, summary: target.summary }],
    verifiedAt: sourceVerifiedAt(def),
    sources: [source],
  }));
});

export const statewideNetworkLakeTechniqueProfiles: LakeTechniqueProfile[] = statewideNetworkLakeDefinitions.flatMap((def) => {
  const source = tpwdSource(def);
  const byTechnique = new Map<TechniqueId, Set<string>>();
  for (const target of def.fish) {
    for (const technique of target.techniques) {
      const speciesIds = byTechnique.get(technique) ?? new Set<string>();
      speciesIds.add(target.id);
      byTechnique.set(technique, speciesIds);
    }
  }
  return [...byTechnique.entries()].map(([techniqueId, speciesIds]) => ({
    id: `${def.slug}-${techniqueId}-network`,
    lakeId: def.slug,
    techniqueId,
    speciesIds: [...speciesIds],
    seasons: ["year-round"],
    summary: `${techniqueLabels[techniqueId]} is included in TPWD-backed fishing guidance for ${def.name}; use the lake's fish section for species and seasonal context.`,
    verifiedAt: sourceVerifiedAt(def),
    sources: [source],
  }));
});

const countySlug = (county: string) => county.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function prototype(def: StatewideLakeDefinition): ShowcaseLakePrototype {
  const lakeSource = tpwdSource(def);
  const publicAccess = accessSource(def);
  const liveLevelSource = def.waterDataSlug
    ? { label: `Water Data for Texas — ${def.name}`, url: `${WATER_DATA_FOR_TEXAS_RESERVOIR_BASE}/${def.waterDataSlug}` }
    : def.lcraHydrometSiteNumber
      ? { label: `LCRA Hydromet — ${def.name}`, url: `${LCRA_HYDROMET_CHART_BASE}?agency=LCRA&siteNumber=${def.lcraHydrometSiteNumber}&siteType=lakelevel` }
      : { label: `TPWD — official ${def.name} lake information`, url: lakeSource.url };
  return {
    slug: def.slug,
    verifiedAt: sourceVerifiedAt(def),
    accessReviewedAt: def.accessReviewedAt ?? (def.accessPoints ? "2026-10-12" : undefined),
    overview: {
      name: def.name,
      summary: def.summary,
      region: def.region.replaceAll("-", " ").replace(/\b\w/g, (value) => value.toUpperCase()),
      surfaceAcres: def.surfaceAcres,
      maxDepthFeet: def.maxDepthFeet,
      impoundedYear: def.impoundedYear,
      counties: def.counties,
      nearestCommunities: def.nearestCities,
      riverBasin: def.riverBasin,
      waterway: def.waterway,
      conservationPool: def.conservationPool,
      normalFluctuation: def.fluctuation,
      normalClarity: def.clarity,
      controllingAuthority: def.authority,
      mapQuery: `${def.name}, Texas`,
    },
    identityAngle: [def.identity, ...(def.travelAlerts ?? [])].join(" "),
    historyNotes: def.historyNotes,
    visitorFAQs: def.visitorFAQs,
    campingProhibited: def.campingProhibited,
    habitat: def.habitat,
    fish: def.fish.map((target) => ({
      id: target.id,
      name: target.name,
      prominence: target.prominence === "secondary" ? "Secondary target" : "Primary target",
      quality: target.quality.charAt(0).toUpperCase() + target.quality.slice(1),
      summary: target.summary,
      seasons: [{ label: target.season === "year-round" ? "Year-round" : target.season.charAt(0).toUpperCase() + target.season.slice(1), text: target.summary }],
      techniques: target.techniques.map((id) => techniqueLabels[id]),
    })),
    access: def.accessPoints ?? [{
      name: `${def.name} public access inventory`,
      operator: "TPWD-listed public and private facilities",
      kind: "public-ramp",
      launch: def.access,
      fee: "Varies by facility; verify before travel",
      availability: "Check current closures, water level and ramp usability before towing",
    }],
    boatingNotes: [
      `${def.fluctuation} is the normal lake-level context published by TPWD; actual conditions can change quickly.`,
      `${def.clarity} is the normal clarity pattern, not a same-day water-condition report.`,
      "Check official ramp and managing-agency notices immediately before travel, especially after drought, flooding or storm damage.",
      "Drain boats, livewells and bait containers as required by Texas aquatic-invasive-species rules before moving between public fresh waters.",
      ...(def.travelAlerts ?? []),
    ],
    regulations: [
      { label: "Current rules", text: def.specialRules ? "TPWD identifies special regulations for one or more fishes on this lake. Use the current Outdoor Annual before harvesting fish." : "Use the current TPWD Outdoor Annual before harvesting fish; this page intentionally avoids freezing bag or length limits into evergreen copy." },
      { label: "Freshness", text: "Regulations, access restrictions and invasive-species requirements can change after this guide's source-review date." },
      ...(def.travelAlerts ?? []).map((text) => ({ label: "Lake-specific notice", text })),
    ],
    camping: [{
      name: def.camping?.name ?? `${def.name} trip-planning options`,
      type: def.camping ? "Source-listed recreation option" : "Camping and lodging planning",
      summary: def.camping?.summary ?? "Use TPWD's public-access inventory and the managing agency to confirm current camping, lodging and overnight-use options near the lake.",
      href: def.campingUrl ?? publicAccess.url,
    }],
    nearby: [
      ...def.counties.map((county) => ({ label: `${county} County`, description: `${def.name} is tied to ${county} County trip planning, access and nearby destinations.`, href: `/county/${countySlug(county)}`, external: false })),
      ...def.nearbyLakes.map((lake) => ({ label: lake.name, description: `Compare ${def.name} with another nearby or regionally related Texas fishing destination.`, href: `/fishing/lakes/${lake.slug}`, external: false })),
      ...(def.nearbyDestinations ?? []).map((place) => ({label:place.name,description:place.reason,href:`/destination/${place.slug}`,external:false})),
    ],
    businessCategories: ["Fishing guides", "Marinas & fuel", "Bait & tackle", "Boat rentals & repair", "Campgrounds & lodging", "Restaurants"],
    reportSnapshot: { checkedAt: sourceVerifiedAt(def), summary: `TexasDefined does not convert durable ${def.name} patterns into a fake live report. Use a dated TexasDefined report when available and TPWD's current fishing report link for current conditions.` },
    liveDataNote: def.liveDataNote,
    sources: {
      tpwdLake: { label: lakeSource.name, url: lakeSource.url },
      tpwdAccess: { label: publicAccess.name, url: publicAccess.url },
      tpwdRegulations: { label: "TPWD — current freshwater fishing regulations", url: TPWD_REGULATIONS },
      liveLevel: liveLevelSource,
      ...(def.historySourceUrl ? { reservoirHistory: { label: "Texas Water Development Board — reservoir history", url: def.historySourceUrl } } : {}),
      ...(def.consumptionSourceUrl ? { fishConsumption: { label: "TPWD — current fish-consumption advisories", url: def.consumptionSourceUrl } } : {}),
      ...(def.visitorSourceUrl ? { cityRecreation: { label: `Official ${def.name} managing-agency visitor information`, url: def.visitorSourceUrl } } : {}),
      ...(def.localRegulationsSourceUrl ? { cityBoatRules: { label: "City code — local lake watercraft restrictions", url: def.localRegulationsSourceUrl } } : {}),
    },
  };
}

export const statewideNetworkShowcaseLakePrototypes = Object.fromEntries(
  statewideNetworkLakeDefinitions.map((def) => [def.slug, prototype(def)]),
) as Record<StatewideNetworkLakeSlug, ShowcaseLakePrototype>;

export const STATEWIDE_NETWORK_VERIFIED_AT = "2026-10-09";
