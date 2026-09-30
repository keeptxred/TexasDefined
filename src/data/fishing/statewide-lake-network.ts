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
  specialRules?: boolean;
  liveDataNote?: string;
  nearbyLakes: { slug: string; name: string }[];
  camping?: { name: string; summary: string };
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
    slug: "lake-buchanan", name: "Lake Buchanan", tpwdSlug: "buchanan", waterDataSlug: "buchanan", region: "hill-country",
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
    access: "TPWD lists multiple public and private boat ramps around the lake; low-water conditions can change ramp usability.", nearbyLakes: [{slug:"lake-lbj",name:"Lake LBJ"},{slug:"lake-travis",name:"Lake Travis"}],
    camping: { name: "Lake Buchanan and Colorado Bend corridor", summary: "TPWD points anglers to multiple camping options around the lake and upper Colorado River, including nearby public recreation areas." },
  },
  {
    slug: "lake-lbj", name: "Lake LBJ", tpwdSlug: "lbj", waterDataSlug: "lyndon-b-johnson", region: "hill-country",
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
    access: "TPWD identifies two main public ramps plus smaller public ramps in Granite Shoals; verify fees and conditions before travel.", nearbyLakes: [{slug:"lake-buchanan",name:"Lake Buchanan"},{slug:"lake-travis",name:"Lake Travis"}],
  },
  {
    slug: "richland-chambers-reservoir", name: "Richland-Chambers Reservoir", tpwdSlug: "richland_chambers", waterDataSlug: "richland-chambers", region: "prairies-lakes",
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
    access: "TPWD lists county ramps, marinas and other launch sites around the reservoir; facility fees and conditions vary.", specialRules: true, nearbyLakes: [{slug:"cedar-creek-reservoir",name:"Cedar Creek Reservoir"},{slug:"lake-palestine",name:"Lake Palestine"}],
  },
  {
    slug: "lake-palestine", name: "Lake Palestine", tpwdSlug: "palestine", waterDataSlug: "palestine", region: "piney-woods",
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
    access: "TPWD lists five public boat launches plus numerous private marinas, motels and campgrounds with additional ramps and services.", specialRules: true, nearbyLakes: [{slug:"cedar-creek-reservoir",name:"Cedar Creek Reservoir"},{slug:"lake-bob-sandlin",name:"Lake Bob Sandlin"}],
  },
  {
    slug: "cedar-creek-reservoir", name: "Cedar Creek Reservoir", tpwdSlug: "cedar_creek", waterDataSlug: "cedar-creek", region: "prairies-lakes",
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
    access: "TPWD lists public ramps and private marinas; low water can affect some private launch sites.", nearbyLakes: [{slug:"richland-chambers-reservoir",name:"Richland-Chambers Reservoir"},{slug:"lake-palestine",name:"Lake Palestine"}],
  },
  {
    slug: "lewisville-lake", name: "Lewisville Lake", tpwdSlug: "lewisville", waterDataSlug: "lewisville", region: "prairies-lakes",
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
    access: "USACE and surrounding communities operate major parks and ramps; most charge access or launch fees and closures can change.", specialRules: true, nearbyLakes: [{slug:"ray-roberts-lake",name:"Ray Roberts Lake"},{slug:"grapevine-lake",name:"Grapevine Lake"}],
  },
  {
    slug: "ray-roberts-lake", name: "Ray Roberts Lake", tpwdSlug: "ray_roberts", waterDataSlug: "ray-roberts", region: "prairies-lakes",
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
    access: "TPWD operates state-park units and satellite parks with ramps around the lake; other facilities are managed by USACE and local operators.", nearbyLakes: [{slug:"lewisville-lake",name:"Lewisville Lake"},{slug:"lake-texoma",name:"Lake Texoma"}],
    camping: {name:"Ray Roberts Lake State Park",summary:"State-park units provide established camping and lake access; verify reservations, closures and ramp conditions before travel."},
  },
  {
    slug: "lake-ray-hubbard", name: "Lake Ray Hubbard", tpwdSlug: "ray_hubbard", waterDataSlug: "ray-hubbard", region: "prairies-lakes",
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
    access: "City parks and private marinas provide boat ramps; Robertson Park is a major day-use and bank-fishing access area.", nearbyLakes: [{slug:"lake-lavon",name:"Lake Lavon"},{slug:"lewisville-lake",name:"Lewisville Lake"}],
  },
  {
    slug: "lake-lavon", name: "Lake Lavon", tpwdSlug: "lavon", waterDataSlug: "lavon", region: "prairies-lakes",
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
    access: "USACE parks and local facilities provide multiple boat ramps and bank-fishing areas; verify closures and fee policies.", specialRules: true, nearbyLakes: [{slug:"lake-ray-hubbard",name:"Lake Ray Hubbard"},{slug:"ray-roberts-lake",name:"Ray Roberts Lake"}],
  },
  {
    slug: "grapevine-lake", name: "Grapevine Lake", tpwdSlug: "grapevine", waterDataSlug: "grapevine", region: "prairies-lakes",
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
    access: "USACE and municipal parks provide ramps; access areas can close after flooding or repairs, so verify current status.", specialRules: true, nearbyLakes: [{slug:"lewisville-lake",name:"Lewisville Lake"},{slug:"eagle-mountain-lake",name:"Eagle Mountain Lake"}],
  },
  {
    slug: "eagle-mountain-lake", name: "Eagle Mountain Lake", tpwdSlug: "eagle_mountain", waterDataSlug: "eagle-mountain", region: "prairies-lakes",
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
    access: "TPWD lists three public ramps and several commercial facilities, many with docks, camping or other amenities.", nearbyLakes: [{slug:"grapevine-lake",name:"Grapevine Lake"},{slug:"lake-bridgeport",name:"Lake Bridgeport"}],
  },
  {
    slug: "lake-bridgeport", name: "Lake Bridgeport", tpwdSlug: "bridgeport", waterDataSlug: "bridgeport", region: "prairies-lakes",
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
    access: "Public and private launch sites are distributed around the reservoir; lake-level swings make current ramp verification important.", nearbyLakes: [{slug:"eagle-mountain-lake",name:"Eagle Mountain Lake"},{slug:"possum-kingdom-reservoir",name:"Possum Kingdom Reservoir"}],
  },
  {
    slug: "lake-austin", name: "Lake Austin", tpwdSlug: "austin", waterDataSlug: "austin", region: "hill-country",
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
    access: "Public bank access is limited, but TPWD identifies Walsh Boat Landing, Loop 360, Emma Long Park and Mary Quinlan Park among the principal access points.", nearbyLakes: [{slug:"lake-travis",name:"Lake Travis"},{slug:"lake-lbj",name:"Lake LBJ"}],
  },
  {
    slug: "fayette-county-reservoir", name: "Fayette County Reservoir", tpwdSlug: "fayette", lcraHydrometSiteNumber: "5634", region: "prairies-lakes",
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
    access: "Park Prairie and Oak Thicket parks provide LCRA boat ramps, bank and pier fishing, picnic and camping facilities.", specialRules: true, nearbyLakes: [{slug:"lake-somerville",name:"Lake Somerville"},{slug:"lake-austin",name:"Lake Austin"}],
    camping: {name:"Park Prairie and Oak Thicket parks",summary:"LCRA parks provide camping and fishing access; current reservations, fees and operating conditions should be verified before travel."},
  },
  {
    slug: "lake-somerville", name: "Lake Somerville", tpwdSlug: "somerville", waterDataSlug: "somerville", region: "prairies-lakes",
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
    access: "State-park, USACE and private facilities provide a large ramp network; flood conditions can temporarily close some sites.", nearbyLakes: [{slug:"fayette-county-reservoir",name:"Fayette County Reservoir"},{slug:"lake-conroe",name:"Lake Conroe"}],
    camping: {name:"Lake Somerville State Park",summary:"Nails Creek and Birch Creek units provide established camping and lake access; verify park alerts and reservations before travel."},
  },
  {
    slug: "belton-lake", name: "Belton Lake", tpwdSlug: "belton", waterDataSlug: "belton", region: "prairies-lakes",
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
    access: "USACE parks provide boat ramps, bank-fishing access, camping and courtesy docks; marinas provide additional supplies and fuel.", nearbyLakes: [{slug:"stillhouse-hollow-reservoir",name:"Stillhouse Hollow Reservoir"},{slug:"lake-whitney",name:"Lake Whitney"}],
  },
  {
    slug: "stillhouse-hollow-reservoir", name: "Stillhouse Hollow Reservoir", tpwdSlug: "stillhouse_hollow", waterDataSlug: "stillhouse-hollow", region: "prairies-lakes",
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
    access: "USACE recreation areas provide ramps and shoreline access; verify current lake level and closures before towing.", nearbyLakes: [{slug:"belton-lake",name:"Belton Lake"},{slug:"lake-whitney",name:"Lake Whitney"}],
  },
  {
    slug: "caddo-lake", name: "Caddo Lake", tpwdSlug: "caddo", waterDataSlug: "caddo", region: "piney-woods",
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
    access: "Caddo Lake State Park, public ramps and private marinas provide boat access, fishing piers and lodging/camping options.", specialRules: true, nearbyLakes: [{slug:"lake-o-the-pines",name:"Lake O' the Pines"},{slug:"lake-bob-sandlin",name:"Lake Bob Sandlin"}],
    camping: {name:"Caddo Lake State Park",summary:"The state park provides an improved ramp, fishing pier, cabins, shelters and campsites; verify park alerts and reservations."},
  },
  {
    slug: "lake-o-the-pines", name: "Lake O' the Pines", tpwdSlug: "lop", waterDataSlug: "lake-o-the-pines", region: "piney-woods",
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
    access: "USACE, Marion County and private marinas provide ramps; the Corps maintains free ramps in addition to developed parks.", specialRules: true, nearbyLakes: [{slug:"caddo-lake",name:"Caddo Lake"},{slug:"lake-bob-sandlin",name:"Lake Bob Sandlin"}],
    camping: {name:"Lake O' the Pines recreation areas",summary:"Developed and primitive USACE camping areas surround the reservoir; verify current ramp and campground conditions."},
  },
  {
    slug: "lake-bob-sandlin", name: "Lake Bob Sandlin", tpwdSlug: "bob_sandlin", waterDataSlug: "bob-sandlin", region: "piney-woods",
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
    access: "Public ramps, Lake Bob Sandlin State Park and local facilities provide lake access; verify current operating conditions.", nearbyLakes: [{slug:"lake-o-the-pines",name:"Lake O' the Pines"},{slug:"lake-fork",name:"Lake Fork"}],
    camping: {name:"Lake Bob Sandlin State Park",summary:"The state park provides camping and direct lake access; verify reservations, alerts and ramp conditions before travel."},
  },
  {
    slug: "lake-nacogdoches", name: "Lake Nacogdoches", tpwdSlug: "nacogdoches", waterDataSlug: "nacogdoches", region: "piney-woods",
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
    access: "City-managed lake access serves boat and bank anglers; verify permits, hours and current rules with the City of Nacogdoches.", specialRules: true, nearbyLakes: [{slug:"sam-rayburn-reservoir",name:"Sam Rayburn Reservoir"},{slug:"lake-palestine",name:"Lake Palestine"}],
  },
  {
    slug: "calaveras-lake", name: "Calaveras Lake", tpwdSlug: "calaveras", region: "south-texas",
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
    access: "Calaveras Park provides the principal public boat ramps, shoreline access, camping and picnic facilities; entry and use fees apply.", specialRules: true, liveDataNote: "No public real-time pool-elevation feed is currently published for Calaveras Lake. TPWD lists normal water levels of 485.0 ft MSL in summer and 484.0 ft MSL in winter, with typical fluctuation of 1–2 feet. CPS Energy is the controlling authority; use its current lake notices and TPWD updates before travel.", nearbyLakes: [{slug:"choke-canyon-reservoir",name:"Choke Canyon Reservoir"},{slug:"lake-lbj",name:"Lake LBJ"}],
    camping: {name:"Calaveras Park",summary:"The lake's public access park provides camping and shoreline facilities; verify current rules, reservations and operating hours."},
  },
  {
    slug: "lake-corpus-christi", name: "Lake Corpus Christi", tpwdSlug: "corpus_christi", waterDataSlug: "corpus-christi", region: "gulf-coast",
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
    access: "Lake Corpus Christi State Park provides camping, shoreline fishing and boat ramps, with additional private facilities around the reservoir.", nearbyLakes: [{slug:"choke-canyon-reservoir",name:"Choke Canyon Reservoir"},{slug:"falcon-international-reservoir",name:"Falcon International Reservoir"}],
    camping: {name:"Lake Corpus Christi State Park",summary:"The state park provides campgrounds, overnight facilities, shoreline fishing and boat access; verify park alerts and reservations."},
  },
  {
    slug: "alan-henry-reservoir", name: "Alan Henry Reservoir", tpwdSlug: "alan_henry", waterDataSlug: "alan-henry", region: "panhandle",
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
    access: "Sam Wahl Recreation Area provides the principal public launch, fishing pier and primitive camping access; shoreline access is otherwise limited.", specialRules: true, nearbyLakes: [{slug:"lake-meredith",name:"Lake Meredith"},{slug:"o-h-ivie-lake",name:"O.H. Ivie Lake"}],
    camping: {name:"Sam Wahl Recreation Area",summary:"Primitive camping and self-contained RV parking are available near the main lake access; verify current city rules and fees."},
  },
  {
    slug: "lake-meredith", name: "Lake Meredith", tpwdSlug: "meredith", waterDataSlug: "meredith", region: "panhandle",
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
    access: "National Park Service access includes multiple ramps when water levels allow, camping/picnic areas and an ADA-accessible fishing pier.", nearbyLakes: [{slug:"alan-henry-reservoir",name:"Alan Henry Reservoir"},{slug:"o-h-ivie-lake",name:"O.H. Ivie Lake"}],
    camping: {name:"Lake Meredith National Recreation Area",summary:"The National Park Service manages developed and primitive camping around the reservoir; ramp availability depends on water level."},
  },
  {
    slug: "lake-houston", name: "Lake Houston", tpwdSlug: "houston", waterDataSlug: "houston", region: "gulf-coast",
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
    nearbyLakes: [{slug:"lake-conroe",name:"Lake Conroe"},{slug:"lake-livingston",name:"Lake Livingston"}],
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

function tpwdSource(def: StatewideLakeDefinition): FishingSource {
  return {
    id: `tpwd-${def.slug}`,
    name: `Texas Parks & Wildlife Department — ${def.name}`,
    url: `https://tpwd.texas.gov/fishboat/fish/recreational/lakes/${def.tpwdSlug}/`,
    checkedAt: VERIFIED_AT,
    sourceType: "state",
  };
}

function accessSource(def: StatewideLakeDefinition): FishingSource {
  return {
    id: `tpwd-${def.slug}-access`,
    name: `Texas Parks & Wildlife Department — ${def.name} public access`,
    url: `https://tpwd.texas.gov/fishboat/fish/recreational/lakes/${def.tpwdSlug}/access.phtml`,
    checkedAt: VERIFIED_AT,
    sourceType: "state",
  };
}

export const statewideNetworkFishingLakes: FishingLake[] = statewideNetworkLakeDefinitions.map((def) => ({
  id: def.slug,
  brandId: BRAND,
  slug: def.slug,
  status: "published",
  verifiedAt: VERIFIED_AT,
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
    verifiedAt: VERIFIED_AT,
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
    verifiedAt: VERIFIED_AT,
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
    verifiedAt: VERIFIED_AT,
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
    identityAngle: def.identity,
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
    access: [{
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
    ],
    regulations: [
      { label: "Current rules", text: def.specialRules ? "TPWD identifies special regulations for one or more fishes on this lake. Use the current Outdoor Annual before harvesting fish." : "Use the current TPWD Outdoor Annual before harvesting fish; this page intentionally avoids freezing bag or length limits into evergreen copy." },
      { label: "Freshness", text: "Regulations, access restrictions and invasive-species requirements can change after this guide's source-review date." },
    ],
    camping: [{
      name: def.camping?.name ?? `${def.name} trip-planning options`,
      type: def.camping ? "Verified public recreation option" : "Camping and lodging planning",
      summary: def.camping?.summary ?? "Use TPWD's public-access inventory and the managing agency to confirm current camping, lodging and overnight-use options near the lake.",
      href: publicAccess.url,
    }],
    nearby: [
      ...def.counties.slice(0, 2).map((county) => ({ label: `${county} County`, description: `${def.name} is tied to ${county} County trip planning, access and nearby destinations.`, href: `/county/${countySlug(county)}`, external: false })),
      ...def.nearbyLakes.map((lake) => ({ label: lake.name, description: `Compare ${def.name} with another nearby or regionally related Texas fishing destination.`, href: `/fishing/lakes/${lake.slug}`, external: false })),
    ],
    businessCategories: ["Fishing guides", "Marinas & fuel", "Bait & tackle", "Boat rentals & repair", "Campgrounds & lodging", "Restaurants"],
    reportSnapshot: { checkedAt: VERIFIED_AT, summary: `TexasDefined does not convert durable ${def.name} patterns into a fake live report. Use a dated TexasDefined report when available and TPWD's current fishing report link for current conditions.` },
    liveDataNote: def.liveDataNote,
    sources: {
      tpwdLake: { label: lakeSource.name, url: lakeSource.url },
      tpwdAccess: { label: publicAccess.name, url: publicAccess.url },
      tpwdRegulations: { label: "TPWD — current freshwater fishing regulations", url: TPWD_REGULATIONS },
      liveLevel: liveLevelSource,
    },
  };
}

export const statewideNetworkShowcaseLakePrototypes = Object.fromEntries(
  statewideNetworkLakeDefinitions.map((def) => [def.slug, prototype(def)]),
) as Record<StatewideNetworkLakeSlug, ShowcaseLakePrototype>;

export const STATEWIDE_NETWORK_VERIFIED_AT = VERIFIED_AT;
