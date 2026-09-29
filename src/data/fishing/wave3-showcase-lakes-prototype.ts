import type { ShowcaseLakeFish, ShowcaseLakePrototype } from "./showcase-lakes-prototype";
import type { Wave3ShowcaseLakeSlug } from "./showcase-lake-routing";

const VERIFIED_AT = "2026-09-28";
const regs = "https://tpwd.texas.gov/regulations/outdoor-annual/fishing/freshwater-fishing";
const businessCategories = ["Fishing guides", "Marinas & fuel", "Bait & tackle", "Boat rentals & repair", "Campgrounds & lodging", "Restaurants"];

type Wave3Seed = {
  slug: Wave3ShowcaseLakeSlug;
  overview: ShowcaseLakePrototype["overview"];
  identityAngle: string;
  habitat: string[];
  fish: ShowcaseLakeFish[];
  accessUrl: string;
  lakeUrl: string;
  liveLevelUrl: string;
  accessSummary: string;
  boatingNotes: string[];
  regulations: ShowcaseLakePrototype["regulations"];
  camping?: ShowcaseLakePrototype["camping"];
  nearby: ShowcaseLakePrototype["nearby"];
  reportSummary: string;
  authority?: { label: string; url: string };
};

function prototype(seed: Wave3Seed): ShowcaseLakePrototype {
  return {
    slug: seed.slug,
    verifiedAt: VERIFIED_AT,
    overview: seed.overview,
    identityAngle: seed.identityAngle,
    habitat: seed.habitat,
    fish: seed.fish,
    access: [{
      name: "Official public-access inventory",
      operator: "See TPWD access directory",
      kind: "public-ramp",
      launch: seed.accessSummary,
      fee: "Verify before travel",
      availability: "Verify current ramp, gate, water-level and closure status before towing",
    }],
    boatingNotes: seed.boatingNotes,
    regulations: seed.regulations,
    camping: seed.camping ?? [],
    nearby: seed.nearby,
    businessCategories,
    reportSnapshot: { checkedAt: VERIFIED_AT, summary: seed.reportSummary },
    sources: {
      tpwdLake: { label: `TPWD — ${seed.overview.name} fishing`, url: seed.lakeUrl },
      tpwdAccess: { label: `TPWD — ${seed.overview.name} public access`, url: seed.accessUrl },
      tpwdRegulations: { label: "TPWD — current freshwater fishing regulations", url: regs },
      liveLevel: { label: `Water Data for Texas — ${seed.overview.name}`, url: seed.liveLevelUrl },
      ...(seed.authority ? { authority: seed.authority } : {}),
    },
  };
}

const buchanan = prototype({
  slug: "lake-buchanan",
  overview: { name: "Lake Buchanan", summary: "A 22,211-acre Highland Lakes reservoir where rocky lower-lake structure, flooded upper-lake brush and the Colorado River support excellent striped bass, white bass and catfish plus a strong largemouth fishery.", region: "Hill Country", surfaceAcres: 22211, maxDepthFeet: 132, impoundedYear: 1937, counties: ["Burnet", "Llano"], nearestCommunities: ["Burnet", "Llano", "Buchanan Dam"], riverBasin: "Colorado River Basin", waterway: "Colorado River", conservationPool: "Use the current LCRA/TWDB reservoir reading", normalFluctuation: "Considerable", normalClarity: "Clear near the dam, increasingly turbid upstream", controllingAuthority: "Lower Colorado River Authority", mapQuery: "Lake Buchanan Texas" },
  identityAngle: "Buchanan is the big-water, temperate-bass anchor of the Highland Lakes. TPWD rates striped and white bass excellent, catfish excellent and largemouth good, while the reservoir changes from rocky highland-style lower water to flatter coves and flooded brush upstream.",
  habitat: ["Rock piles, ledges and chunk-rock banks dominate the clearer lower reservoir.", "Flat coves and flooded brush become more important upstream when water levels cover terrestrial vegetation.", "TPWD and local partners have installed fish-attracting habitat structures with public GPS coordinates.", "The Colorado River arm is the key spring corridor for white and striped bass movement."],
  fish: [
    { id: "striped-bass", name: "Striped bass", prominence: "Primary target", quality: "Excellent", summary: "A signature stocked fishery with major spring movement toward the upper reservoir and Colorado River.", seasons: [{ label: "Spring", text: "River-oriented movement creates the strongest seasonal window." }, { label: "Summer", text: "Open-water depth and forage become increasingly important." }], techniques: ["Live bait", "Trolling", "Vertical jigging"] },
    { id: "white-bass", name: "White bass", prominence: "Primary target", quality: "Excellent", summary: "An excellent fishery with a pronounced spring spawning run.", seasons: [{ label: "Spring", text: "Follow the Colorado River arm and upper-lake staging areas." }], techniques: ["Live bait", "Vertical jigging", "Topwater"] },
    { id: "largemouth-bass", name: "Largemouth bass", prominence: "Primary target", quality: "Good", summary: "A productive bass fishery split between rocky lower-lake banks and stained upper-lake cover.", seasons: [{ label: "Spring & fall", text: "These are TPWD's strongest largemouth periods." }], techniques: ["Topwater", "Spinnerbaits", "Crankbaits", "Soft plastics"] },
    { id: "catfish", name: "Catfish", prominence: "Primary target", quality: "Excellent", summary: "Blue, channel and flathead catfish occur throughout the reservoir.", seasons: [{ label: "Year-round", text: "Use channel, flat and forage-oriented water as conditions dictate." }], techniques: ["Cut bait", "Live bait"] },
  ],
  accessUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/buchanan/access.phtml",
  lakeUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/buchanan/",
  liveLevelUrl: "https://waterdatafortexas.org/reservoirs/individual/buchanan",
  accessSummary: "TPWD lists multiple public and park ramps around this large reservoir, including lower-lake and upper-lake options.",
  boatingNotes: ["Buchanan is large enough that wind and route selection matter; choose a launch for the section you actually intend to fish.", "Rock, ledges and changing upper-lake brush exposure make current lake level relevant to both navigation and fishing.", "Zebra-mussel prevention rules require clean, drain and dry practices before moving equipment between waters.", "Use the official access directory rather than assuming a ramp that worked on a prior trip is currently usable."],
  regulations: [{ label: "Current harvest rules", text: "TPWD currently identifies statewide fish rules plus separate LCRA bow-fishing requirements. Check both current sources before harvest." }, { label: "Invasive species", text: "Drain-water and zebra-mussel transport rules apply; clean, drain and dry boats and gear." }],
  camping: [{ name: "Inks Lake State Park", type: "Nearby state park", summary: "A TPWD state-park camping base on the Highland Lakes corridor south of Buchanan.", href: "https://tpwd.texas.gov/state-parks/inks-lake" }],
  nearby: [{ label: "Burnet County", description: "Buchanan Dam, Burnet and much of the eastern reservoir connect to Burnet County.", href: "/county/burnet", external: false }, { label: "Llano County", description: "The western and upper reservoir reaches Llano County and the Colorado River corridor.", href: "/county/llano", external: false }],
  reportSummary: "Striped-bass depth, river-run timing, wind, water level and ramp usability change. Use dated reports and the live reservoir source for trip-day decisions.",
  authority: { label: "Lower Colorado River Authority", url: "https://www.lcra.org/" },
});

const lbj = prototype({
  slug: "lake-lbj",
  overview: { name: "Lake LBJ", summary: "A 6,449-acre constant-level Highland Lakes reservoir where docks, bulkheads, rock, creeks and shallow vegetation support bass, crappie, white bass and catfish.", region: "Hill Country", surfaceAcres: 6449, maxDepthFeet: 90, impoundedYear: 1951, counties: ["Burnet", "Llano"], nearestCommunities: ["Marble Falls", "Kingsland", "Granite Shoals"], riverBasin: "Colorado River Basin", waterway: "Colorado and Llano Rivers", conservationPool: "825 ft msl", normalFluctuation: "Constant-level reservoir", normalClarity: "Clear to slightly stained", controllingAuthority: "Lower Colorado River Authority", mapQuery: "Lake LBJ Texas" },
  identityAngle: "LBJ is a developed-shoreline fishing lake: miles of docks, bulkheads and canals create fishable cover, while its white crappie fishery stands out within the Highland Lakes and spring white bass move into the Llano and Colorado arms.",
  habitat: ["Thousands of docks and bulkheads create year-round man-made bass and crappie cover.", "Water willow, bulrush and spatterdock add shallow vegetation in creek arms.", "The lower lake is rockier and clearer, while upper water becomes sandier and more stained.", "Submerged brush piles create additional offshore cover that rewards sonar work."],
  fish: [
    { id: "largemouth-bass", name: "Largemouth bass", prominence: "Primary target", quality: "Good", summary: "A shallow-oriented fishery that makes heavy use of docks, vegetation, canals and rocky banks.", seasons: [{ label: "Spring & fall", text: "The strongest bass windows; docks, canals and vegetation are central." }, { label: "Year-round", text: "Shallow cover can remain relevant outside peak seasons." }], techniques: ["Soft plastics", "Topwater", "Spinnerbaits", "Crankbaits"] },
    { id: "crappie", name: "Crappie", prominence: "Primary target", quality: "Good", summary: "TPWD describes LBJ's white-crappie population as the strongest in the Highland Lakes chain.", seasons: [{ label: "Spring", text: "Protected cover and brush become increasingly important as fish move shallow." }], techniques: ["Jigs", "Live minnows"] },
    { id: "white-bass", name: "White bass", prominence: "Primary target", quality: "Good", summary: "A spring-run fishery focused on the Llano and Colorado river arms.", seasons: [{ label: "Late winter & spring", text: "The river arms become the core search area during the spawning migration." }], techniques: ["Vertical jigging", "Small crankbaits", "Topwater", "Live bait"] },
    { id: "catfish", name: "Catfish", prominence: "Primary target", quality: "Good", summary: "Blue, channel and flathead catfish are abundant throughout the reservoir.", seasons: [{ label: "Year-round", text: "Channels, docks and river-oriented structure all provide options." }], techniques: ["Cut bait", "Live bait"] },
  ],
  accessUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/lbj/access.phtml",
  lakeUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/lbj/",
  liveLevelUrl: "https://waterdatafortexas.org/reservoirs/individual/lyndon-b-johnson",
  accessSummary: "TPWD maintains the official ramp directory; select a launch close to the river arm, creek or shoreline section you plan to fish.",
  boatingNotes: ["Dense shoreline development means docks, wakes and recreational traffic are part of trip planning.", "Use LCRA algae and water-condition notices before entering or handling water during an active advisory.", "Zebra-mussel prevention rules apply to boats, trailers and water-holding equipment.", "Constant-level operation does not eliminate temporary ramp, gate or safety changes; verify the selected access point."],
  regulations: [{ label: "Fishing rules", text: "TPWD currently applies statewide fishing rules, while LCRA maintains separate bow-fishing rules. Verify the current rule before harvest." }, { label: "Aquatic invasives", text: "Zebra mussels are present; follow current clean, drain and dry requirements." }],
  camping: [{ name: "Inks Lake State Park", type: "Nearby state park", summary: "A nearby Highland Lakes camping base with another public lake and Hill Country recreation.", href: "https://tpwd.texas.gov/state-parks/inks-lake" }],
  nearby: [{ label: "Burnet County", description: "Marble Falls, Granite Shoals and much of the reservoir's visitor infrastructure connect to Burnet County.", href: "/county/burnet", external: false }, { label: "Llano County", description: "Kingsland and the Llano River arm connect the lake to Llano County.", href: "/county/llano", external: false }],
  reportSummary: "White-bass movement, dock patterns and algae notices are time-sensitive. Use dated reports and current LCRA/TPWD notices rather than treating seasonal guidance as today's bite.",
  authority: { label: "Lower Colorado River Authority", url: "https://www.lcra.org/" },
});

const richlandChambers = prototype({
  slug: "richland-chambers-reservoir",
  overview: { name: "Richland-Chambers Reservoir", summary: "A 41,356-acre Trinity Basin reservoir where open-water schools, upper-arm timber, bridge crossings and the submerged old Trinity River levee support excellent catfish, crappie, white-bass and hybrid fisheries.", region: "Prairies & Lakes", surfaceAcres: 41356, maxDepthFeet: 75, impoundedYear: 1987, counties: ["Navarro", "Freestone"], nearestCommunities: ["Corsicana", "Streetman", "Kerens"], riverBasin: "Trinity River Basin", waterway: "Richland and Chambers Creeks", conservationPool: "315 ft msl", normalFluctuation: "About 3 feet", normalClarity: "Cloudy to moderately clear", controllingAuthority: "Tarrant Regional Water District", mapQuery: "Richland Chambers Reservoir Texas" },
  identityAngle: "Richland-Chambers is an open-water and crappie lake first: TPWD rates catfish, crappie, white bass and hybrid striped bass excellent, while largemouth success depends more heavily on finding the reservoir's limited clearer vegetation.",
  habitat: ["Pondweed and other vegetation concentrate in selected coves and creek-arm shorelines rather than covering the whole reservoir.", "Upper Richland and Chambers arms contain abundant timber that is especially important to crappie.", "The old Trinity River levee forms a long submerged structural feature near the creek-arm confluence.", "Bridge crossings and open-water shad schools create reliable temperate-bass search zones."],
  fish: [
    { id: "catfish", name: "Catfish", prominence: "Primary target", quality: "Excellent", summary: "Blue and channel catfish are a defining year-round fishery.", seasons: [{ label: "Year-round", text: "Channels, flats and forage concentrations provide broad opportunity." }], techniques: ["Cut bait", "Live bait"] },
    { id: "crappie", name: "Crappie", prominence: "Primary target", quality: "Excellent", summary: "One of the area's most consistent crappie fisheries around timber and bridges.", seasons: [{ label: "Year-round", text: "Adjust depth while keeping bridge and timber structure central." }], techniques: ["Jigs", "Live minnows"] },
    { id: "white-bass", name: "White bass", prominence: "Primary target", quality: "Excellent", summary: "An open-water schooling fishery extending from the US 287 bridge toward the dam.", seasons: [{ label: "Year-round", text: "Birds, shad and electronics help reveal moving schools." }], techniques: ["Vertical jigging", "Topwater"] },
    { id: "hybrid-striped-bass", name: "Hybrid striped bass", prominence: "Primary target", quality: "Excellent", summary: "Hybrids share the reservoir's shad-driven open-water pattern.", seasons: [{ label: "Year-round", text: "Search for forage schools and fish vertically when they hold deep." }], techniques: ["Vertical jigging", "Trolling"] },
    { id: "largemouth-bass", name: "Largemouth bass", prominence: "Secondary target", quality: "Fair", summary: "Can be productive where vegetation and clearer water concentrate fish.", seasons: [{ label: "Year-round", text: "Prioritize vegetation edges and underwater structure rather than featureless open water." }], techniques: ["Crankbaits", "Soft plastics"] },
  ],
  accessUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/richland_chambers/access2.phtml",
  lakeUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/richland_chambers/",
  liveLevelUrl: "https://waterdatafortexas.org/reservoirs/individual/richland-chambers",
  accessSummary: "TPWD lists county and private ramps around both major creek arms; choose access based on the arm you plan to fish.",
  boatingNotes: ["Open water makes wind and long runs important considerations on this large reservoir.", "Upper-arm timber and the submerged levee reward chart and sonar awareness.", "Zebra-mussel prevention requirements apply when moving boats and gear.", "Verify the selected county or private ramp before towing; access conditions and fees can change."],
  regulations: [{ label: "Lake-specific rules", text: "TPWD identifies special regulations on some fish at Richland-Chambers. Open the current lake rule before harvest." }, { label: "Invasive species", text: "Follow current clean, drain and dry requirements before moving equipment to another water body." }],
  nearby: [{ label: "Navarro County", description: "Corsicana and much of the western reservoir planning base connect to Navarro County.", href: "/county/navarro", external: false }, { label: "Freestone County", description: "The eastern reservoir and Streetman corridor connect to Freestone County.", href: "/county/freestone", external: false }],
  reportSummary: "Schooling locations, crappie depth, wind and ramp conditions move quickly. Use dated reports for the live bite and this guide for durable structure and access planning.",
  authority: { label: "Tarrant Regional Water District", url: "https://www.trwd.com/" },
});

const palestine = prototype({
  slug: "lake-palestine",
  overview: { name: "Lake Palestine", summary: "A 25,560-acre Neches River reservoir southwest of Tyler where upper-lake vegetation and timber, Highway 155 bridge structure and open-water schooling fish support a broad multi-species fishery.", region: "Piney Woods", surfaceAcres: 25560, maxDepthFeet: 58, impoundedYear: 1962, counties: ["Anderson", "Cherokee", "Henderson", "Smith"], nearestCommunities: ["Tyler", "Palestine", "Chandler"], riverBasin: "Neches River Basin", waterway: "Neches River", conservationPool: "345 ft msl", normalFluctuation: "Usually modest but conditions vary", normalClarity: "Moderately clear", controllingAuthority: "Upper Neches River Authority", mapQuery: "Lake Palestine Texas" },
  identityAngle: "Palestine is one of East Texas' most balanced fisheries: largemouth and spotted bass, strong crappie, excellent catfish and excellent white/hybrid striped bass all have distinct habitat, while the Highway 155 bridge divides the more vegetated upper reservoir from deeper lower-lake water.",
  habitat: ["Hydrilla and native aquatic plants are concentrated in the upper reservoir and creek arms.", "Inundated timber is common above Highway 155 and in several creek and river arms.", "Brush piles between the dam and bridge add artificial structure.", "The Highway 155 bridge itself creates major fish-holding structure across multiple arms."],
  fish: [
    { id: "largemouth-bass", name: "Largemouth bass", prominence: "Primary target", quality: "Good", summary: "A tournament-oriented fishery centered on upper-lake vegetation, creeks, timber and brush.", seasons: [{ label: "Year-round", text: "Use available cover and adjust depth with seasonal movement." }], techniques: ["Soft plastics", "Spinnerbaits", "Crankbaits"] },
    { id: "catfish", name: "Catfish", prominence: "Primary target", quality: "Excellent", summary: "Abundant blue and channel catfish plus flathead trophy potential.", seasons: [{ label: "Year-round", text: "Drifting and channel-oriented natural-bait approaches are central." }], techniques: ["Live bait", "Cut bait"] },
    { id: "crappie", name: "Crappie", prominence: "Primary target", quality: "Good", summary: "Bridge and brush structure support productive crappie fishing.", seasons: [{ label: "Spring", text: "Shallower water around Highway 155 and cover becomes especially relevant." }], techniques: ["Jigs", "Live minnows"] },
    { id: "white-bass", name: "White bass", prominence: "Primary target", quality: "Excellent", summary: "The Neches River and Kickapoo Creek runs define the spring fishery.", seasons: [{ label: "Spring", text: "Follow upstream migration into tributary water." }], techniques: ["Vertical jigging", "Live bait"] },
    { id: "hybrid-striped-bass", name: "Hybrid striped bass", prominence: "Primary target", quality: "Excellent", summary: "A strong open-water fishery from the dam toward the Highway 155 corridor.", seasons: [{ label: "Winter into spring", text: "The lower and middle reservoir becomes especially important." }], techniques: ["Vertical jigging", "Live bait", "Trolling"] },
  ],
  accessUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/palestine/access.phtml",
  lakeUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/palestine/",
  liveLevelUrl: "https://waterdatafortexas.org/reservoirs/individual/palestine",
  accessSummary: "TPWD lists multiple public launches plus private marinas and campgrounds; access spans both upper and lower reservoir sections.",
  boatingNotes: ["Highway 155, timber and upper-lake vegetation create different navigation conditions from the more open lower reservoir.", "Water level can affect smaller river and upper-lake ramps before deep-water facilities.", "Use the official access list because public and private facility status can change.", "Keep current invasive-species rules in the pre-trip checklist when moving boats between East Texas reservoirs."],
  regulations: [{ label: "Special fish rules", text: "TPWD identifies special regulations on some fish. Check the current Lake Palestine rule before harvest." }, { label: "Current conditions", text: "Fishing reports describe a dated bite; do not substitute an older report for current access, weather or regulations." }],
  camping: [{ name: "Purtis Creek State Park", type: "Nearby state park", summary: "A nearby TPWD camping and fishing destination in the Cedar Creek/Lake Palestine travel region.", href: "https://tpwd.texas.gov/state-parks/purtis-creek" }, { name: "Tyler State Park", type: "Nearby state park", summary: "A Piney Woods camping base north of Lake Palestine near Tyler.", href: "https://tpwd.texas.gov/state-parks/tyler" }],
  nearby: [{ label: "Smith County", description: "Tyler is the major visitor base on the north side of the Lake Palestine trip.", href: "/county/smith", external: false }, { label: "Henderson County", description: "Chandler and the western/northern lake corridor connect to Henderson County.", href: "/county/henderson", external: false }, { label: "Anderson County", description: "The reservoir extends south toward Anderson County and Palestine.", href: "/county/anderson", external: false }],
  reportSummary: "Bridge, tributary and open-water patterns are seasonal. Use dated reports for depth and activity, then verify the selected access point before travel.",
  authority: { label: "Upper Neches River Authority", url: "https://www.unra.org/" },
});

const rayRoberts = prototype({
  slug: "ray-roberts-lake",
  overview: { name: "Ray Roberts Lake", summary: "A major North Texas reservoir north of Denton where standing timber, creek arms, main-lake points and extensive state-park access support excellent largemouth, crappie and white-bass fishing.", region: "Prairies & Lakes", surfaceAcres: 25600, maxDepthFeet: 106, impoundedYear: 1987, counties: ["Cooke", "Denton", "Grayson"], nearestCommunities: ["Denton", "Sanger", "Pilot Point"], riverBasin: "Trinity River Basin", waterway: "Elm Fork Trinity River", conservationPool: "Use the current USACE/TWDB lake reading", normalFluctuation: "Variable with flood-control operations", normalClarity: "Varies by arm and runoff", controllingAuthority: "U.S. Army Corps of Engineers", mapQuery: "Ray Roberts Lake Texas" },
  identityAngle: "Ray Roberts combines a serious trophy-oriented largemouth fishery with excellent crappie and white bass, year-round catfish and unusually strong public recreation infrastructure through state-park units and satellite access areas.",
  habitat: ["Roughly 2,000 acres of standing timber create extensive upper-arm cover.", "Creek channels, points and the dam area support deeper seasonal patterns.", "Brush, riprap and man-made habitat supplement natural timber.", "Tributaries become especially important during spring white-bass movement."],
  fish: [
    { id: "largemouth-bass", name: "Largemouth bass", prominence: "Primary target", quality: "Excellent", summary: "A high-quality bass fishery with strong spring trophy potential.", seasons: [{ label: "Spring", text: "Shallow cover and spawning areas create the strongest trophy-oriented window." }, { label: "Fall", text: "Timber, points and creek structure become productive again." }], techniques: ["Soft plastics", "Crankbaits", "Spinnerbaits", "Topwater"] },
    { id: "crappie", name: "Crappie", prominence: "Primary target", quality: "Excellent", summary: "An abundant and popular fishery closely tied to timber and brush.", seasons: [{ label: "Year-round", text: "Depth changes, but woody structure remains central." }], techniques: ["Jigs", "Live minnows"] },
    { id: "white-bass", name: "White bass", prominence: "Primary target", quality: "Excellent", summary: "Strong spring tributary runs and summer main-pool schooling create two major seasonal patterns.", seasons: [{ label: "Spring", text: "Follow spawning movement into tributaries." }, { label: "Summer", text: "Search the dam and main-lake points for schools." }], techniques: ["Vertical jigging", "Topwater"] },
    { id: "catfish", name: "Catfish", prominence: "Primary target", quality: "Good", summary: "Year-round catfish fishing includes an improving blue-catfish population.", seasons: [{ label: "Year-round", text: "Channels, flats and bait-rich structure remain useful." }], techniques: ["Cut bait", "Live bait"] },
  ],
  accessUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/ray_roberts/access.phtml",
  lakeUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/ray_roberts/",
  liveLevelUrl: "https://waterdatafortexas.org/reservoirs/individual/ray-roberts",
  accessSummary: "TPWD operates major state-park units and satellite areas around the reservoir, with ramps, marina services and bank-fishing options.",
  boatingNotes: ["Upper-arm standing timber demands conservative navigation outside established travel lanes.", "Flood-control operations can change levels and park/ramp status, so verify both lake level and the chosen access unit.", "Main-lake wind can become a material safety issue on long runs.", "Zebra-mussel prevention rules apply when moving boats and gear."],
  regulations: [{ label: "Current lake rules", text: "Use the current TPWD lake-specific and statewide regulations before keeping fish." }, { label: "Invasive species", text: "Follow current clean, drain and dry requirements for boats, trailers and water-holding gear." }],
  camping: [{ name: "Ray Roberts Lake State Park", type: "State park camping + lake access", summary: "Multiple state-park units provide camping, ramps, shoreline access and marina connections around the reservoir.", href: "https://tpwd.texas.gov/state-parks/ray-roberts-lake" }],
  nearby: [{ label: "Denton County", description: "Denton, Sanger and the southern reservoir make Denton County the main metro-facing base.", href: "/county/denton", external: false }, { label: "Cooke County", description: "The reservoir reaches north into Cooke County.", href: "/county/cooke", external: false }, { label: "Grayson County", description: "The northeastern reservoir connects to Grayson County.", href: "/county/grayson", external: false }],
  reportSummary: "Spring tributary movement, summer white-bass schools, flood-control levels and ramp status change. Use dated fishing reports and current park/USACE notices.",
  authority: { label: "U.S. Army Corps of Engineers", url: "https://www.swf.usace.army.mil/" },
});

const lewisville = prototype({
  slug: "lewisville-lake",
  overview: { name: "Lewisville Lake", summary: "A 29,592-acre DFW reservoir where white bass and crappie produce much of the fishing activity, with excellent catfish, productive black bass and stocked hybrid striped bass.", region: "Prairies & Lakes", surfaceAcres: 29592, maxDepthFeet: 67, impoundedYear: 1954, counties: ["Denton"], nearestCommunities: ["Lewisville", "Denton", "The Colony"], riverBasin: "Trinity River Basin", waterway: "Elm Fork Trinity River", conservationPool: "522 ft msl", normalFluctuation: "About 4–8 feet annually", normalClarity: "Stained", controllingAuthority: "U.S. Army Corps of Engineers", mapQuery: "Lewisville Lake Texas" },
  identityAngle: "Lewisville is a metro-accessible schooling-fish and crappie lake: TPWD identifies white bass and white crappie as the biggest sources of angling activity, with excellent catfish and additional largemouth, spotted and hybrid-striped-bass opportunity.",
  habitat: ["Standing timber in selected coves holds both crappie and largemouth bass.", "Bridge crossings create major crappie structure.", "Humps and ridges in Hickory Creek and the main lake concentrate hybrids.", "Open-water white-bass schools track shad and can be revealed by gull activity."],
  fish: [
    { id: "crappie", name: "Crappie", prominence: "Primary target", quality: "Excellent", summary: "One of the reservoir's most heavily used fisheries, especially around bridge structure.", seasons: [{ label: "Year-round", text: "Bridge depth and cover remain important as fish move seasonally." }], techniques: ["Jigs", "Live minnows"] },
    { id: "white-bass", name: "White bass", prominence: "Primary target", quality: "Excellent", summary: "A major schooling fishery across the main lake.", seasons: [{ label: "Summer", text: "Surface schools and gull activity can reveal feeding fish." }], techniques: ["Vertical jigging", "Topwater"] },
    { id: "catfish", name: "Catfish", prominence: "Primary target", quality: "Excellent", summary: "Blue and channel catfish are rated excellent by TPWD.", seasons: [{ label: "Year-round", text: "The old Lake Dallas area and channel-oriented water are useful starting points." }], techniques: ["Cut bait", "Live bait"] },
    { id: "hybrid-striped-bass", name: "Hybrid striped bass", prominence: "Primary target", quality: "Good", summary: "A stocked open-water fishery associated with humps and ridges.", seasons: [{ label: "Year-round", text: "Track forage and use electronics around open-water structure." }], techniques: ["Vertical jigging", "Trolling", "Live bait"] },
    { id: "largemouth-bass", name: "Largemouth bass", prominence: "Primary target", quality: "Good", summary: "A productive DFW bass fishery around timber, coves and shoreline cover.", seasons: [{ label: "Year-round", text: "Available structure matters more than broad vegetation patterns." }], techniques: ["Soft plastics", "Crankbaits", "Spinnerbaits"] },
  ],
  accessUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/lewisville/access.phtml",
  lakeUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/lewisville/",
  liveLevelUrl: "https://waterdatafortexas.org/reservoirs/individual/lewisville",
  accessSummary: "The official access directory covers numerous metro-area parks, ramps and marina facilities around the reservoir.",
  boatingNotes: ["Heavy recreational boating and metro traffic make time-of-day and launch selection important.", "Flood-control level changes can affect shorelines, ramps and exposed structure.", "Standing timber remains a navigation consideration in selected areas.", "Verify park, marina and ramp operations directly before towing."],
  regulations: [{ label: "Special fish rules", text: "TPWD identifies special regulations on some fish at Lewisville. Check the current lake rule before harvest." }, { label: "Current reports", text: "Use dated reports for the bite; old reports do not establish current water, access or fish activity." }],
  nearby: [{ label: "Denton County", description: "Lewisville, Denton, The Colony and the entire reservoir sit within Denton County.", href: "/county/denton", external: false }],
  reportSummary: "White-bass schools, hybrid depth, bridge crappie patterns and flood-control conditions move. Use dated reports and current USACE/access notices.",
  authority: { label: "U.S. Army Corps of Engineers", url: "https://www.swf.usace.army.mil/" },
});

const cedarCreek = prototype({
  slug: "cedar-creek-reservoir",
  overview: { name: "Cedar Creek Reservoir", summary: "A 32,623-acre reservoir west of Athens where lower-lake vegetation, open-water shad schools and abundant catfish support excellent catfish and temperate-bass fishing plus good largemouth and crappie.", region: "Prairies & Lakes", surfaceAcres: 32623, maxDepthFeet: 53, impoundedYear: 1965, counties: ["Henderson", "Kaufman"], nearestCommunities: ["Athens", "Gun Barrel City", "Mabank"], riverBasin: "Trinity River Basin", waterway: "Cedar Creek", conservationPool: "322 ft msl", normalFluctuation: "About 4 feet", normalClarity: "Moderately clear lower lake to muddy upper lake", controllingAuthority: "Tarrant Regional Water District", mapQuery: "Cedar Creek Reservoir Texas" },
  identityAngle: "Cedar Creek is a catfish and open-water schooling-fish lake with a useful split personality: the clearer lower reservoir supports better largemouth habitat while white bass and stocked hybrids roam open water and respond to shad and feeding birds.",
  habitat: ["Submerged vegetation is concentrated in lower-lake coves.", "Emergent vegetation occurs in the shallow upper reservoir.", "Submerged islands and creek-confluence structure provide offshore targets.", "Open-water shad schools drive white and hybrid striped bass movement."],
  fish: [
    { id: "catfish", name: "Catfish", prominence: "Primary target", quality: "Excellent", summary: "Abundant blue, channel and flathead catfish make this one of Cedar Creek's signature fisheries.", seasons: [{ label: "Year-round", text: "Use forage, channels and flats to narrow the search." }], techniques: ["Cut bait", "Live bait"] },
    { id: "white-bass", name: "White bass", prominence: "Primary target", quality: "Excellent", summary: "A strong open-water schooling fishery.", seasons: [{ label: "Spring", text: "Fishing becomes particularly strong as activity increases." }, { label: "Year-round", text: "Follow shad and bird activity when schools are visible." }], techniques: ["Vertical jigging", "Topwater"] },
    { id: "hybrid-striped-bass", name: "Hybrid striped bass", prominence: "Primary target", quality: "Excellent", summary: "Stocked hybrids share the reservoir's open-water forage pattern.", seasons: [{ label: "Year-round", text: "Birds, sonar and shad concentrations are the key location clues." }], techniques: ["Vertical jigging", "Trolling"] },
    { id: "largemouth-bass", name: "Largemouth bass", prominence: "Primary target", quality: "Good", summary: "The clearer lower lake and vegetated cove backs offer the strongest bass habitat.", seasons: [{ label: "Year-round", text: "Prioritize lower-lake vegetation and available shallow cover." }], techniques: ["Soft plastics", "Spinnerbaits", "Crankbaits"] },
    { id: "crappie", name: "Crappie", prominence: "Primary target", quality: "Good", summary: "A useful secondary fishery around brush, docks and creek structure.", seasons: [{ label: "Year-round", text: "Adjust depth while staying close to cover." }], techniques: ["Jigs", "Live minnows"] },
  ],
  accessUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/cedar_creek/access.phtml",
  lakeUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/cedar_creek/",
  liveLevelUrl: "https://waterdatafortexas.org/reservoirs/individual/cedar-creek",
  accessSummary: "Use TPWD's current access directory to compare public and private launch options around this long north-south reservoir.",
  boatingNotes: ["A long reservoir footprint makes launch selection important if wind is up or the target zone is far from the ramp.", "Shallow upper-lake water and vegetation create different navigation considerations from the deeper lower lake.", "Water level affects shoreline cover and the usability of some facilities.", "Verify the exact ramp or marina before travel."],
  regulations: [{ label: "Fishing rules", text: "TPWD currently lists statewide regulations for Cedar Creek; verify the current Outdoor Annual before harvest." }, { label: "Live conditions", text: "Current water level and dated fishing reports belong in trip-day planning, not frozen evergreen copy." }],
  camping: [{ name: "Purtis Creek State Park", type: "Nearby state park", summary: "A nearby TPWD camping and fishing destination west of Athens.", href: "https://tpwd.texas.gov/state-parks/purtis-creek" }],
  nearby: [{ label: "Henderson County", description: "Athens, Gun Barrel City and much of the reservoir connect to Henderson County.", href: "/county/henderson", external: false }, { label: "Kaufman County", description: "The northern lake corridor reaches Kaufman County.", href: "/county/kaufman", external: false }],
  reportSummary: "Open-water schools and catfish location respond to forage, weather and level changes. Use dated reports plus the current TWDB reservoir reading.",
  authority: { label: "Tarrant Regional Water District", url: "https://www.trwd.com/" },
});

const belton = prototype({
  slug: "belton-lake",
  overview: { name: "Belton Lake", summary: "A 12,385-acre Leon River reservoir where steep rocky shoreline and long points support excellent smallmouth and hybrid striped bass plus good largemouth, white-bass and catfish opportunity.", region: "Prairies & Lakes", surfaceAcres: 12385, maxDepthFeet: 124, impoundedYear: 1954, counties: ["Bell", "Coryell"], nearestCommunities: ["Belton", "Temple", "Killeen"], riverBasin: "Brazos River Basin", waterway: "Leon River", conservationPool: "594 ft msl", normalFluctuation: "About 3–5 feet", normalClarity: "Moderate", controllingAuthority: "U.S. Army Corps of Engineers", mapQuery: "Belton Lake Texas" },
  identityAngle: "Belton is a rock-and-open-water lake: steep shorelines and points make it one of Central Texas' stronger smallmouth destinations, while stocked hybrid striped bass provide a separate schooling main-lake fishery.",
  habitat: ["Steep rocky shoreline, bluffs and long points dominate the main lake.", "Sand and mud flats become more common in the Leon River and Cowhouse arms.", "Aquatic vegetation and standing timber are limited.", "Installed fish-habitat structures provide additional targetable cover."],
  fish: [
    { id: "smallmouth-bass", name: "Smallmouth bass", prominence: "Primary target", quality: "Excellent", summary: "Belton's standout black-bass fishery, concentrated around rock, riprap and long points.", seasons: [{ label: "Early spring & late fall", text: "Cooler water makes rocky structure especially productive." }, { label: "Summer", text: "Long gently sloping rocky points remain important." }], techniques: ["Crankbaits", "Soft plastics", "Topwater"] },
    { id: "hybrid-striped-bass", name: "Hybrid striped bass", prominence: "Primary target", quality: "Excellent", summary: "A popular stocked fishery that roams the main lake in schools.", seasons: [{ label: "Year-round", text: "Track forage and open-water schools with electronics." }], techniques: ["Live bait", "Trolling", "Vertical jigging"] },
    { id: "largemouth-bass", name: "Largemouth bass", prominence: "Primary target", quality: "Good", summary: "Productive during the spring and around main-lake points later in the year.", seasons: [{ label: "Late winter & spring", text: "Protected coves and creek backs warm first." }, { label: "Summer & fall", text: "Shift toward points and flats beside creek channels." }], techniques: ["Spinnerbaits", "Soft plastics", "Crankbaits", "Topwater"] },
    { id: "white-bass", name: "White bass", prominence: "Primary target", quality: "Good", summary: "A spring-run fishery that moves toward the Leon River.", seasons: [{ label: "Spring", text: "River movement creates the strongest window." }], techniques: ["Vertical jigging", "Small lures"] },
    { id: "catfish", name: "Catfish", prominence: "Primary target", quality: "Good", summary: "Channel and flathead catfish provide year-round opportunity.", seasons: [{ label: "Year-round", text: "Use channel, flat and river-arm structure." }], techniques: ["Cut bait", "Live bait"] },
  ],
  accessUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/belton/access.phtml",
  lakeUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/belton/",
  liveLevelUrl: "https://waterdatafortexas.org/reservoirs/individual/belton",
  accessSummary: "USACE and local recreation areas provide multiple launch options; verify current park and ramp status before towing.",
  boatingNotes: ["Steep banks and deep water can put productive structure close to shore while leaving large areas of open water exposed to wind.", "Rocky points and bluffs make chart and depth awareness useful.", "Zebra-mussel prevention rules apply to boats and water-holding equipment.", "Flood-control operations can alter access conditions; verify the selected USACE recreation area."],
  regulations: [{ label: "Fishing rules", text: "TPWD currently manages game fish under statewide rules at Belton. Verify the current Outdoor Annual before harvest." }, { label: "Invasive species", text: "Zebra mussels are present; follow clean, drain and dry requirements." }],
  camping: [{ name: "USACE Belton Lake recreation areas", type: "Public lake camping", summary: "Corps recreation areas around Belton provide lake access and camping; verify the selected park's current operating status.", href: "https://www.swf-wc.usace.army.mil/belton/" }],
  nearby: [{ label: "Bell County", description: "Belton, Temple and much of the reservoir's visitor access sit in Bell County.", href: "/county/bell", external: false }, { label: "Coryell County", description: "The northwestern reservoir reaches Coryell County toward the Leon River corridor.", href: "/county/coryell", external: false }],
  reportSummary: "Hybrid schools, bass depth and flood-control levels change. Use dated reports for live fish activity and USACE/TWDB sources for current water and access.",
  authority: { label: "U.S. Army Corps of Engineers", url: "https://www.swf.usace.army.mil/" },
});

const stillhouse = prototype({
  slug: "stillhouse-hollow-reservoir",
  overview: { name: "Stillhouse Hollow Reservoir", summary: "A 6,429-acre clear, deep Lampasas River reservoir west of Belton where rocky points, bluffs, hydrilla and limited timber support good largemouth and smallmouth bass fishing.", region: "Prairies & Lakes", surfaceAcres: 6429, maxDepthFeet: 107, impoundedYear: 1968, counties: ["Bell"], nearestCommunities: ["Belton", "Killeen", "Harker Heights"], riverBasin: "Brazos River Basin", waterway: "Lampasas River", conservationPool: "622 ft msl", normalFluctuation: "About 3–4 feet", normalClarity: "Very clear", controllingAuthority: "U.S. Army Corps of Engineers", mapQuery: "Stillhouse Hollow Reservoir Texas" },
  identityAngle: "Stillhouse is a clear-water bass lake with two distinct frameworks: steep rock and lower-lake hydrilla for black bass, then slightly more stained upper-river water with laydowns, brush and timber.",
  habitat: ["Steep rocky shoreline dominates the clear main lake.", "Hydrilla beds in the lower reservoir provide important vegetation cover.", "Upper-lake and river water includes laydowns, brush piles and standing timber.", "TPWD and local partners have installed fish-attracting structures at multiple sites."],
  fish: [
    { id: "largemouth-bass", name: "Largemouth bass", prominence: "Primary target", quality: "Good", summary: "The reservoir's most abundant sportfish, using rocky points and hydrilla.", seasons: [{ label: "Spring & fall", text: "Cooler water produces the strongest bass windows." }], techniques: ["Topwater", "Soft plastics", "Crankbaits"] },
    { id: "smallmouth-bass", name: "Smallmouth bass", prominence: "Primary target", quality: "Good", summary: "A useful year-round fishery tied to rocky points and riprap.", seasons: [{ label: "Year-round", text: "Rock and riprap remain the core habitat." }], techniques: ["Topwater", "Crankbaits", "Soft plastics"] },
    { id: "catfish", name: "Catfish", prominence: "Secondary target", quality: "Fair", summary: "Channel and flathead catfish provide additional year-round opportunity.", seasons: [{ label: "Year-round", text: "Drifting and upper-lake channel patterns are useful starting points." }], techniques: ["Live bait", "Cut bait"] },
    { id: "white-bass", name: "White bass", prominence: "Seasonal target", quality: "Poor", summary: "A limited fishery with its best opportunity during the spring river run.", seasons: [{ label: "Early spring", text: "The spawning run occurs upriver from the reservoir." }], techniques: ["Vertical jigging", "Small lures"] },
  ],
  accessUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/stillhouse_hollow/access.phtml",
  lakeUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/stillhouse_hollow/",
  liveLevelUrl: "https://waterdatafortexas.org/reservoirs/individual/stillhouse-hollow",
  accessSummary: "The U.S. Army Corps of Engineers operates several parks with launch and camping access; verify current park and ramp status.",
  boatingNotes: ["Very clear water makes submerged rock, vegetation edges and depth changes visible to fish long before they are obvious from the surface.", "Hydrilla and upper-lake timber create different navigation conditions within one reservoir.", "Zebra-mussel prevention requirements apply when moving boats and gear.", "Use current USACE access notices because flood or maintenance work can affect individual parks."],
  regulations: [{ label: "Fishing rules", text: "TPWD currently manages species under statewide fishing rules. Verify the current Outdoor Annual before harvest." }, { label: "Invasive species", text: "Zebra mussels are present; current clean, drain and dry requirements apply." }],
  camping: [{ name: "USACE Stillhouse Hollow recreation areas", type: "Public lake camping", summary: "Corps parks provide tent/RV camping and launch access around the reservoir; verify current operations directly.", href: "https://www.swf-wc.usace.army.mil/stillhouse/" }],
  nearby: [{ label: "Bell County", description: "Stillhouse Hollow sits entirely within the Belton-Killeen travel corridor in Bell County.", href: "/county/bell", external: false }],
  reportSummary: "Clear-water bass depth, hydrilla edges, river-run timing and Corps access can all change. Use dated reports and current lake/access readings.",
  authority: { label: "U.S. Army Corps of Engineers", url: "https://www.swf.usace.army.mil/" },
});

const houston = prototype({
  slug: "lake-houston",
  overview: { name: "Lake Houston", summary: "An 11,854-acre San Jacinto River reservoir northeast of central Houston where blue catfish dominate and spring white-bass runs create the clearest seasonal draw.", region: "Gulf Coast", surfaceAcres: 11854, maxDepthFeet: 45, impoundedYear: 1954, counties: ["Harris"], nearestCommunities: ["Houston", "Humble", "Kingwood"], riverBasin: "San Jacinto River Basin", waterway: "West Fork San Jacinto River", conservationPool: "44.1 ft msl", normalFluctuation: "Low", normalClarity: "Moderately turbid", controllingAuthority: "Coastal Water Authority", mapQuery: "Lake Houston Texas" },
  identityAngle: "Lake Houston is the metro-near catfish and spring white-bass lake. TPWD identifies blue catfish as the dominant sportfish, while most structural cover is concentrated in the upper east and west forks rather than across the broad main reservoir.",
  habitat: ["Very little structural cover exists across much of the main reservoir.", "Upper east and west forks contain more flooded terrestrial and emergent vegetation.", "Water hyacinth, alligatorweed and water lettuce can add shallow cover but are condition-dependent.", "River channels are central to both blue-catfish patterns and spring white-bass movement."],
  fish: [
    { id: "blue-catfish", name: "Blue catfish", prominence: "Primary target", quality: "Good", summary: "The reservoir's dominant sportfish, especially along channels of the east and west San Jacinto forks.", seasons: [{ label: "Year-round", text: "Channel-oriented natural-bait fishing is the core pattern." }], techniques: ["Live bait", "Cut bait"] },
    { id: "white-bass", name: "White bass", prominence: "Primary target", quality: "Good", summary: "A spring-run fishery focused on the east and west forks.", seasons: [{ label: "Spring", text: "Spawning movement concentrates fish in river channels." }], techniques: ["Vertical jigging", "Small lures"] },
    { id: "largemouth-bass", name: "Largemouth bass", prominence: "Secondary target", quality: "Fair", summary: "Bass opportunity depends on locating the reservoir's limited usable cover.", seasons: [{ label: "Year-round", text: "Upper-river vegetation and flooded cover are the most logical starting points." }], techniques: ["Soft plastics", "Spinnerbaits"] },
    { id: "crappie", name: "Crappie", prominence: "Secondary target", quality: "Fair", summary: "A modest fishery tied closely to available cover.", seasons: [{ label: "Year-round", text: "Focus on upper-river and flooded-cover zones rather than open featureless water." }], techniques: ["Jigs", "Live minnows"] },
  ],
  accessUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/houston/access.phtml",
  lakeUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/houston/",
  liveLevelUrl: "https://waterdatafortexas.org/reservoirs/individual/houston",
  accessSummary: "Use TPWD's official access directory for current boat and bank-fishing options around the reservoir and river arms.",
  boatingNotes: ["Moderately turbid water and river-channel structure make charts and conservative navigation useful.", "Flooding and heavy rain can change current, debris and access conditions quickly in the San Jacinto system.", "Aquatic vegetation can shift within upper-river areas; do not treat an old map as a live vegetation survey.", "Verify current access and lake-patrol notices before launching."],
  regulations: [{ label: "Fishing rules", text: "TPWD currently lists statewide fishing regulations for Lake Houston; verify the current Outdoor Annual before harvest." }, { label: "Bow fishing", text: "A City of Houston ordinance prohibits bow fishing on Lake Houston; verify current local rules before using specialized methods." }],
  nearby: [{ label: "Harris County", description: "Lake Houston lies within Harris County on the northeast side of the Houston metro.", href: "/county/harris", external: false }],
  reportSummary: "San Jacinto flow, debris, white-bass movement and blue-catfish location can change after weather events. Use dated reports and current water/access sources.",
  authority: { label: "Coastal Water Authority", url: "https://www.coastalwaterauthority.org/" },
});

export const wave3ShowcaseLakePrototypes: Record<Wave3ShowcaseLakeSlug, ShowcaseLakePrototype> = {
  "lake-buchanan": buchanan,
  "lake-lbj": lbj,
  "richland-chambers-reservoir": richlandChambers,
  "lake-palestine": palestine,
  "ray-roberts-lake": rayRoberts,
  "lewisville-lake": lewisville,
  "cedar-creek-reservoir": cedarCreek,
  "belton-lake": belton,
  "stillhouse-hollow-reservoir": stillhouse,
  "lake-houston": houston,
};
