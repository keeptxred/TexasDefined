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
  camping?: { name: string; summary: string };
  accessPoints?: ShowcaseLakePrototype["access"];
  travelAlerts?: string[];
  consumptionSourceUrl?: string;
  historySourceUrl?: string;
  historyNotes?: string[];
  visitorSourceUrl?: string;
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
    nearbyLakes: [{slug:"cedar-creek-reservoir",name:"Cedar Creek Reservoir"},{slug:"lake-bob-sandlin",name:"Lake Bob Sandlin"}],
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
    nearbyLakes: [{slug:"richland-chambers-reservoir",name:"Richland-Chambers Reservoir"},{slug:"lake-palestine",name:"Lake Palestine"}],
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
    access: "TPWD operates state-park units and satellite parks with ramps around the lake; other facilities are managed by USACE and local operators.",     accessPoints: [
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
    access: "City parks and private marinas provide boat ramps; Robertson Park is a major day-use and bank-fishing access area.",     accessPoints: [
      { name: "Paddle Point Park (paddle craft only)", operator: "City of Rowlett", kind: "park", launch: "6775 Miller Road, Rowlett; gravel/dirt put-in for non-motorized craft; not a motorboat launch.", fee: "Confirm city parking requirements", availability: "TPWD lists year-round; verify city park status." },
      { name: "Paul Jones Park", operator: "City of Garland", kind: "park", launch: "4099 Zion Road, Garland; four concrete lanes, up to 50 vehicle spaces and picnic access.", fee: "TPWD lists no fee", availability: "Year-round in TPWD listing; check City of Garland (972) 205-2750." },
      { name: "Harbor Bay Marina", operator: "Private marina", kind: "marina", launch: "From I-30 Horizon/Ridge exit follow Horizon and Windjammer Way. Two lanes, up to 50 spaces, fishing barge.", fee: "Launch fee listed", availability: "Year-round per TPWD; verify private operation (972) 771-0071." },
      { name: "SH 66 Ramp", operator: "City of Rockwall", kind: "public-ramp", launch: "North side of Highway 66 causeway east of Dalrock Road; two single-lane ramps and one double-lane ramp, about 40 spaces.", fee: "TPWD lists no fee", availability: "Year-round per TPWD; City of Rockwall (972) 771-7740." },
      { name: "Terry Park", operator: "City of Heath", kind: "park", launch: "Ridge Road/FM 740 to Smirl/FM 1140 and Terry Lane; two-lane ramp, courtesy docks, 30 spaces.", fee: "TPWD lists no fee", availability: "Year-round per TPWD; City of Heath (972) 771-6228." },
      { name: "Chandler's Landing", operator: "Private marina", kind: "marina", launch: "From I-30, south on Ridge Road to Henry M. Chandlers Drive, down toward marina; two-lane concrete ramp.", fee: "Launch fee listed", availability: "Year-round per TPWD; verify private operation (972) 771-8865." },
      { name: "Captain's Cove Marina", operator: "Private marina", kind: "marina", launch: "5965 Marina Drive, Garland; four concrete boat lanes, up to 50 spaces.", fee: "Launch fee listed", availability: "Year-round per TPWD; verify private operator (972) 226-7100." },
      { name: "Sapphire Bay", operator: "Private marina", kind: "marina", launch: "9051 Marina Vista, Rowlett; two-lane concrete ramp, courtesy docks, about 50 spaces.", fee: "TPWD lists no fee", availability: "Year-round per TPWD; verify private operation (972) 412-1977." },
    ],
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
    access: "TPWD lists three public ramps and several commercial facilities, many with docks, camping or other amenities.",     accessPoints: [
      { name: "West Bay Marina", operator: "Private marina", kind: "marina", launch: "From SH 199 and FM 730 north, Timber Road east to Liberty School Road, then marina; two-lane ramp, 50 parking spaces.", fee: "TPWD lists fee", availability: "Year-round in TPWD inventory; confirm operator (817) 444-1622." },
      { name: "Shady Grove Park", operator: "City of Azle", kind: "park", launch: "From FM 730 north of Azle, east on Stribling North; two-lane concrete ramp, about 35 spaces.", fee: "TPWD lists no fee", availability: "Year-round TPWD listing; City of Azle (817) 444-2541." },
      { name: "Pelican Bay Ramp", operator: "City of Pelican Bay", kind: "public-ramp", launch: "East off FM 730 north of Azle on Sandy Beach, south Liberty School Road and Pelican; two-lane ramp, 25 spaces.", fee: "TPWD lists fee", availability: "Year-round per TPWD; confirm City of Pelican Bay (817) 444-1234." },
      { name: "Twin Points Park", operator: "Tarrant Regional Water District", kind: "park", launch: "From SH 199, north on Boat Club Road, west on Ten Mile Bridge Road; two-lane concrete ramp and 60 spaces.", fee: "TPWD lists fee", availability: "Year-round in TPWD inventory; verify TRWD conditions (817) 237-8585." },
    ],
    nearbyLakes: [{slug:"grapevine-lake",name:"Grapevine Lake"},{slug:"lake-bridgeport",name:"Lake Bridgeport"}],
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
    nearbyLakes: [{slug:"lake-somerville",name:"Lake Somerville"},{slug:"lake-austin",name:"Lake Austin"}],
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
    nearbyLakes: [{slug:"fayette-county-reservoir",name:"Fayette County Reservoir"},{slug:"lake-conroe",name:"Lake Conroe"}],
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
    nearbyLakes: [{slug:"lake-o-the-pines",name:"Lake O' the Pines"},{slug:"lake-fork",name:"Lake Fork"}],
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
    nearbyLakes: [{slug:"sam-rayburn-reservoir",name:"Sam Rayburn Reservoir"},{slug:"lake-palestine",name:"Lake Palestine"}],
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
    nearbyLakes: [{slug:"choke-canyon-reservoir",name:"Choke Canyon Reservoir"},{slug:"lake-lbj",name:"Lake LBJ"}],
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
    nearbyLakes: [{slug:"lake-ray-hubbard",name:"Lake Ray Hubbard"},{slug:"cedar-creek-reservoir",name:"Cedar Creek Reservoir"},{slug:"benbrook-lake",name:"Benbrook Lake"}],
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
    nearbyLakes: [{slug:"lake-whitney",name:"Lake Whitney"},{slug:"possum-kingdom-reservoir",name:"Possum Kingdom Reservoir"}],
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
        accessPoints: [
      { name: "Reynolds Creek Park", operator: "U.S. Army Corps of Engineers", kind: "park", launch: "TPWD lists a public ramp, camping and shoreline recreation at Reynolds Creek on Lake Waco. Confirm entrance and ramp coordinates against USACE park map.", fee: "TPWD says most ramps charge launch fees; verify facility price", availability: "Verify USACE park and campground status before booking." },
      { name: "Speegleville Park", operator: "U.S. Army Corps of Engineers", kind: "park", launch: "Official TPWD access inventory lists launch, campground and picnicking facilities at Speegleville.", fee: "TPWD says most ramps charge launch fees; verify", availability: "USACE park status and operator reservations control overnight access." },
      { name: "Midway Park", operator: "U.S. Army Corps of Engineers", kind: "park", launch: "TPWD lists a launch and shoreline recreation park at Midway on Lake Waco.", fee: "TPWD says most ramps charge launch fees; verify", availability: "Check current USACE ramp condition and fee before travel." },
    ],
    nearbyLakes: [{slug:"lake-whitney",name:"Lake Whitney"},{slug:"belton-lake",name:"Belton Lake"}],
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
        accessPoints: [
      { name: "Dam public ramp", operator: "Brown County Water Control and Irrigation District No. 1", kind: "public-ramp", launch: "Across dam on FM 2632. TPWD lists a lighted multilane public ramp, courtesy dock and large parking area.", fee: "TPWD lists no fee", availability: "Year-round per TPWD; check lake condition with district (325) 643-2609." },
      { name: "Flatrock Park", operator: "Brown County Water Control and Irrigation District No. 1", kind: "park", launch: "On FM 2632 just north of FM 3021 junction. Lighted two-lane ramp with parking for under 50 vehicles.", fee: "TPWD lists no fee", availability: "TPWD warns steep ramp needs caution when lake five feet low or more; check district (325) 643-2609." },
      { name: "Lake Brownwood State Park", operator: "Texas Parks & Wildlife Department", kind: "park", launch: "Off Park Road 15 east of SH 279. Lighted multiple-lane ramp with about 20 vehicle spaces, plus fishing pier and camping.", fee: "State park entrance fee", availability: "TPWD says year-round access, though cabins/camping can be seasonal; confirm park (325) 784-5223." },
    ],
    nearbyLakes: [{slug:"o-h-ivie-lake",name:"O.H. Ivie Lake"},{slug:"proctor-lake",name:"Proctor Lake"}],
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
    nearbyLakes: [{slug:"possum-kingdom-reservoir",name:"Possum Kingdom Reservoir"},{slug:"lake-bridgeport",name:"Lake Bridgeport"}],
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
    nearbyLakes: [{slug:"alan-henry-reservoir",name:"Alan Henry Reservoir"},{slug:"o-h-ivie-lake",name:"O.H. Ivie Lake"}],
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
    nearbyLakes: [{slug:"lake-colorado-city",name:"Lake Colorado City"},{slug:"lake-stamford",name:"Lake Stamford"}],
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
    nearbyLakes:[{slug:"lake-travis",name:"Lake Travis"},{slug:"lake-lbj",name:"Lake LBJ"}],
    travelAlerts:["TPWD identifies established zebra mussels in Lake Georgetown. Clean, drain and dry boats, trailers, livewells, bait containers and gear before entering another water body; draining water is required by Texas law.","The lake has significant water-level fluctuations. A historically listed 4-lane ramp may be inoperable; verify the Corps' current closure report before towing."],
    historySourceUrl:"https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/georgetown/index.asp",
    historyNotes:["Federal authorization for a San Gabriel flood-control reservoir system including Georgetown came in 1962. The Corps began the Georgetown dam project in the early 1970s, serving water supply, flood management and public recreation rather than building a private-lot resort lake.","The Texas Water Development Board dates the start of deliberate impoundment to March 3, 1980, while dam work was completed in October of that year and associated facilities formally completed in 1982. Different dates in older references therefore describe different stages, not conflicting reservoirs.","Today the Corps-managed shoreline protects a different visitor experience from Lake Austin or Lake LBJ: fewer private docks, three named USACE launch parks and a connected 26.5-mile walking route. The limestone geology and fluctuating water also explain the lack of sustained lake vegetation."],
  },
  {
    slug:"benbrook-lake",name:"Benbrook Lake",tpwdSlug:"benbrook",waterDataSlug:"benbrook",verifiedAt:"2026-10-12",region:"prairies-lakes",
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
    nearbyLakes:[{slug:"joe-pool-lake",name:"Joe Pool Lake"},{slug:"lake-granbury",name:"Lake Granbury"}],
    travelAlerts:["TPWD warned of major low-water ramp closures and campers-only launch limitations in its April 21, 2026 access inventory. The warning is historical and MUST be checked against current USACE closure reports; do not use this guide to assert a ramp is open today.","No general swim or boat-launch permission is inferred from a park's name. Confirm swimming areas, accessibility and seasonal hours with the Corps.","Clean, drain and dry watercraft and equipment under Texas invasive-species requirements before entering another reservoir."],
    historySourceUrl:"https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/benbrook/index.asp",
    historyNotes:["Congress authorized Benbrook Dam under the River and Harbor Act in March 1945, when growing flood exposure and water needs in the Fort Worth area led to additional Trinity Basin storage.","The U.S. Army Corps of Engineers started construction May 27, 1947 and finished the main project in December 1950; deliberate reservoir impoundment began September 29, 1952. The TWDB makes these separate phases explicit, helping readers distinguish completion of the physical dam from water storage.","Benbrook's earthfill dam spans roughly 9,130 feet including the spillway and remains a Corps flood-management and water-conservation asset, not just a fishing destination. Recreation options depend on operational water levels and park-specific rules, which explains the changing launch landscape."],
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
      type: def.camping ? "Verified public recreation option" : "Camping and lodging planning",
      summary: def.camping?.summary ?? "Use TPWD's public-access inventory and the managing agency to confirm current camping, lodging and overnight-use options near the lake.",
      href: publicAccess.url,
    }],
    nearby: [
      ...def.counties.map((county) => ({ label: `${county} County`, description: `${def.name} is tied to ${county} County trip planning, access and nearby destinations.`, href: `/county/${countySlug(county)}`, external: false })),
      ...def.nearbyLakes.map((lake) => ({ label: lake.name, description: `Compare ${def.name} with another nearby or regionally related Texas fishing destination.`, href: `/fishing/lakes/${lake.slug}`, external: false })),
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
      ...(def.visitorSourceUrl ? { cityRecreation: { label: "City of Sweetwater — official visitor information", url: def.visitorSourceUrl } } : {}),
    },
  };
}

export const statewideNetworkShowcaseLakePrototypes = Object.fromEntries(
  statewideNetworkLakeDefinitions.map((def) => [def.slug, prototype(def)]),
) as Record<StatewideNetworkLakeSlug, ShowcaseLakePrototype>;

export const STATEWIDE_NETWORK_VERIFIED_AT = "2026-10-09";
