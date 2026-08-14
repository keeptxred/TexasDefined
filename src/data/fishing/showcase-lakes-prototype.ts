import type { ShowcaseLakeSlug } from "./showcase-lake-routing";

export interface ShowcaseLakeSource { label: string; url: string }
export interface ShowcaseLakeFish {
  id: string;
  name: string;
  prominence: string;
  quality: string;
  summary: string;
  seasons: { label: string; text: string }[];
  techniques: string[];
}
export interface ShowcaseLakeAccess {
  name: string;
  operator: string;
  kind: "public-ramp" | "marina" | "park" | "resort";
  launch: string;
  fee: string;
  availability: string;
}
export interface ShowcaseLakePrototype {
  slug: ShowcaseLakeSlug;
  verifiedAt: string;
  overview: {
    name: string;
    summary: string;
    region: string;
    surfaceAcres: number;
    maxDepthFeet: number;
    impoundedYear: number;
    counties: string[];
    nearestCommunities: string[];
    riverBasin: string;
    waterway: string;
    conservationPool: string;
    normalFluctuation: string;
    normalClarity: string;
    controllingAuthority: string;
    stateBorder?: string[];
    mapQuery: string;
  };
  identityAngle: string;
  habitat: string[];
  fish: ShowcaseLakeFish[];
  access: ShowcaseLakeAccess[];
  boatingNotes: string[];
  regulations: { label: string; text: string }[];
  camping: { name: string; type: string; summary: string; href: string }[];
  nearby: { label: string; description: string; href: string; external: boolean }[];
  businessCategories: string[];
  reportSnapshot: { checkedAt: string; summary: string };
  sources: Record<string, ShowcaseLakeSource>;
}

const VERIFIED_AT = "2026-08-13";

const commonBusinessCategories = ["Fishing guides", "Marinas & fuel", "Bait & tackle", "Boat rentals & repair", "Campgrounds & lodging", "Restaurants"];

const lakeFork: ShowcaseLakePrototype = {
  slug: "lake-fork",
  verifiedAt: VERIFIED_AT,
  overview: {
    name: "Lake Fork",
    summary: "East Texas' trophy-bass benchmark: a 27,264-acre Sabine River reservoir where abundant cover, restrictive harvest rules and decades of fisheries management created one of the country's best-known largemouth bass destinations.",
    region: "Piney Woods",
    surfaceAcres: 27264,
    maxDepthFeet: 70,
    impoundedYear: 1980,
    counties: ["Hopkins", "Rains", "Wood"],
    nearestCommunities: ["Quitman", "Emory", "Sulphur Springs"],
    riverBasin: "Sabine River Basin",
    waterway: "Sabine River",
    conservationPool: "403 ft msl",
    normalFluctuation: "Moderate, 2–4 feet",
    normalClarity: "Moderately clear",
    controllingAuthority: "Sabine River Authority of Texas",
    mapQuery: "Lake Fork Texas",
  },
  identityAngle: "Lake Fork is not a generic East Texas reservoir. TPWD identifies largemouth bass as its defining sportfish and ties the trophy fishery to management, Florida-strain stockings and abundant habitat. The same lake also supports excellent channel catfish plus useful crappie, white-bass and sunfish fisheries.",
  habitat: [
    "Hydrilla, Eurasian milfoil, coontail, lotus and other aquatic plants create a large menu of vegetation patterns.",
    "Submerged timber is both fish habitat and a navigation hazard; buoyed boat lanes help, but they do not remove the need for caution.",
    "Boat houses, docks and lake points are long-standing largemouth targets.",
    "Bridge pilings and artificial brush piles add dependable crappie and bass structure outside shoreline cover.",
  ],
  fish: [
    { id: "largemouth-bass", name: "Largemouth bass", prominence: "Primary target", quality: "Excellent", summary: "The lake's signature fishery and the reason Lake Fork has national trophy-bass recognition.", seasons: [{ label: "Spring", text: "Shoreline spawning patterns build from late winter through spring; plastics, spinnerbaits, jigs and lipless crankbaits are core tools." }, { label: "Summer", text: "Night fishing becomes especially useful in hot weather; plastics, spinnerbaits, crankbaits and topwaters remain practical choices." }, { label: "Fall", text: "Schooling activity can make crankbaits and topwater productive." }, { label: "Winter", text: "Jigging spoons, jigs and crankbaits become important." }], techniques: ["Soft plastics", "Spinnerbaits", "Crankbaits", "Topwater", "Jigs"] },
    { id: "channel-catfish", name: "Channel catfish", prominence: "Primary target", quality: "Excellent", summary: "An excellent fishery that TPWD notes has grown in popularity.", seasons: [{ label: "Year-round", text: "Stinkbait and cut bait are standard channel-catfish starting points." }], techniques: ["Cut bait", "Prepared bait"] },
    { id: "crappie", name: "Crappie", prominence: "Primary target", quality: "Good", summary: "White and black crappie use standing timber, deep water and Lake Fork's many bridges.", seasons: [{ label: "Winter", text: "Deep water near the dam receives heavy attention." }, { label: "Late spring & early fall", text: "Bridge patterns become particularly important." }], techniques: ["Jigs", "Live minnows"] },
    { id: "white-bass", name: "White bass", prominence: "Additional target", quality: "Fair", summary: "A secondary schooling fishery that can produce large individual fish when forage is abundant.", seasons: [{ label: "Schooling periods", text: "Jigging spoons, live baitfish, small crankbaits and topwater can all fit active schools." }], techniques: ["Vertical jigging", "Live bait", "Topwater"] },
    { id: "sunfish", name: "Sunfish", prominence: "Accessible target", quality: "Good", summary: "Bluegill and redear add family-friendly fishing around shallow cover, piers and submerged humps.", seasons: [{ label: "Spring & summer", text: "Natural baits and small spinners work in shallow water and around shoreline structure." }], techniques: ["Natural bait", "Small spinners"] },
  ],
  access: [
    { name: "Rains County Ramp & Marina", operator: "Public/local facility", kind: "marina", launch: "TPWD-listed boat access", fee: "Verify before travel", availability: "Verify current ramp conditions" },
    { name: "FM 17 Ramp", operator: "Sabine River Authority area", kind: "public-ramp", launch: "TPWD-listed boat access", fee: "Verify before travel", availability: "Verify current ramp conditions" },
    { name: "Lake Fork Resort", operator: "Private", kind: "resort", launch: "TPWD-listed ramp with lodging/services", fee: "Private facility; verify", availability: "Verify with operator" },
    { name: "Lake Fork Marina", operator: "Private", kind: "marina", launch: "TPWD-listed marina/ramp", fee: "Private facility; verify", availability: "Verify with operator" },
  ],
  boatingNotes: [
    "Submerged timber is a substantial navigation hazard even though buoyed boat lanes provide primary travel corridors.",
    "Check the live reservoir level before towing; ramp usability and shallow timber exposure change with water level.",
    "Vegetation, bridge traffic and heavy tournament/recreational use can change how efficiently anglers move between spots.",
    "Drain boats, livewells and bait containers as required by Texas aquatic-invasive-species rules before leaving public fresh water.",
  ],
  regulations: [
    { label: "Special lake rules", text: "TPWD identifies Lake Fork as a reservoir with special fish regulations. Use the current Outdoor Annual before keeping fish." },
    { label: "Trophy-bass management", text: "Lake Fork's bass fishery has long been shaped by restrictive harvest rules; this page intentionally does not freeze a bag or length limit that may later change." },
    { label: "Crappie", text: "Seasonal and lake-specific crappie rules may apply. Verify the current rule before a winter or spring trip." },
  ],
  camping: [
    { name: "Lake Fork access corridor", type: "RV, cabin and tent options", summary: "TPWD notes numerous privately operated access and accommodation facilities around the lake, including motels, cabins, RV sites and tent camping. Treat availability as operator-confirmed rather than static.", href: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/fork/access.phtml" },
    { name: "Lake Bob Sandlin State Park", type: "Nearby state park", summary: "A verified Texas state-park option for camping and another reservoir experience northeast of Lake Fork.", href: "https://tpwd.texas.gov/state-parks/lake-bob-sandlin" },
  ],
  nearby: [
    { label: "Wood County", description: "Lake Fork's eastern and southern shoreline is tied closely to Wood County and Quitman.", href: "/county/wood", external: false },
    { label: "Rains County", description: "Emory and the western side of the reservoir make Rains County a major trip-planning base.", href: "/county/rains", external: false },
    { label: "Hopkins County", description: "The lake reaches into Hopkins County on its northern side.", href: "/county/hopkins", external: false },
    { label: "Lake Bob Sandlin State Park", description: "A nearby TexasDefined destination for camping and another Piney Woods lake stop.", href: "/destination/lake-bob-sandlin-state-park", external: false },
  ],
  businessCategories: commonBusinessCategories,
  reportSnapshot: { checkedAt: VERIFIED_AT, summary: "TexasDefined does not copy a bite report into evergreen copy. Use a dated TexasDefined report when one exists or follow TPWD's current-report link from the official Lake Fork page." },
  sources: {
    tpwdLake: { label: "TPWD — Lake Fork fishing", url: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/fork/" },
    tpwdAccess: { label: "TPWD — Lake Fork public access", url: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/fork/access.phtml" },
    tpwdRegulations: { label: "TPWD — freshwater bag and length limits", url: "https://tpwd.texas.gov/regulations/outdoor-annual/fishing/freshwater-fishing/bag-length-limits" },
    liveLevel: { label: "Water Data for Texas — Lake Fork", url: "https://waterdatafortexas.org/reservoirs/individual/fork" },
    authority: { label: "Sabine River Authority of Texas", url: "https://www.sratx.org/" },
    nearbyPark: { label: "TPWD — Lake Bob Sandlin State Park", url: "https://tpwd.texas.gov/state-parks/lake-bob-sandlin" },
  },
};

const samRayburn: ShowcaseLakePrototype = {
  slug: "sam-rayburn-reservoir",
  verifiedAt: VERIFIED_AT,
  overview: {
    name: "Sam Rayburn Reservoir",
    summary: "A 114,500-acre Angelina River reservoir in the East Texas Piney Woods where enormous scale, vegetation, timber, creek channels and public access support excellent year-round largemouth bass, crappie and catfish fisheries.",
    region: "Piney Woods",
    surfaceAcres: 114500,
    maxDepthFeet: 80,
    impoundedYear: 1965,
    counties: ["Angelina", "Jasper", "Nacogdoches", "Sabine", "San Augustine"],
    nearestCommunities: ["Jasper", "Brookeland", "Lufkin"],
    riverBasin: "Neches River Basin",
    waterway: "Angelina River",
    conservationPool: "164.4 ft msl",
    normalFluctuation: "About 7 feet annually",
    normalClarity: "Clearer lower lake; more off-color upper lake",
    controllingAuthority: "U.S. Army Corps of Engineers",
    mapQuery: "Sam Rayburn Reservoir Texas",
  },
  identityAngle: "Sam Rayburn is a scale-and-habitat lake. TPWD rates largemouth bass, crappie and catfish excellent, while the Corps and multiple public-land managers create a much broader access footprint than a typical developed reservoir.",
  habitat: [
    "Submerged aquatic vegetation, standing timber and flooded terrestrial vegetation form the core habitat system.",
    "Hydrilla is prominent, with coontail, pondweed and other native plants adding diversity.",
    "Lower-lake fish often relate to vegetation edges, flats, humps and creek channels in comparatively clear water.",
    "Upper-lake timber, brush, laydowns and channels become more important as vegetation thins; water-level swings can substantially change habitat availability.",
  ],
  fish: [
    { id: "largemouth-bass", name: "Largemouth bass", prominence: "Primary target", quality: "Excellent", summary: "Sam Rayburn's most popular gamefish and a true year-round fishery.", seasons: [{ label: "Fall, winter & spring", text: "Bass stay active longer and are commonly shallower; crankbaits and spinnerbaits are strong starting tools." }, { label: "Summer", text: "Focus on early, late and night windows, then vegetation edges, brush, ledges and channels as the sun rises." }], techniques: ["Crankbaits", "Spinnerbaits", "Topwater", "Soft plastics", "Jigs", "Carolina rigs"] },
    { id: "crappie", name: "Crappie", prominence: "Primary target", quality: "Excellent", summary: "An excellent year-round fishery built around vegetation, brush and creek-channel transitions.", seasons: [{ label: "Spring", text: "Fish move shallow around vegetation during the spawn." }, { label: "Rest of year", text: "Deeper brush piles and creek channels become the main framework." }], techniques: ["Jigs", "Minnows"] },
    { id: "catfish", name: "Catfish", prominence: "Primary target", quality: "Excellent", summary: "TPWD rates the reservoir's catfish opportunity excellent and year-round.", seasons: [{ label: "Year-round", text: "Use channel, flat and current-related structure as conditions dictate." }], techniques: ["Natural bait", "Cut bait"] },
    { id: "white-bass", name: "White bass", prominence: "Seasonal target", quality: "Fair", summary: "Numbers are more limited than the reservoir's primary fisheries, but spring can still produce good opportunities.", seasons: [{ label: "Spring", text: "Seasonal movements create the reservoir's best white-bass window." }], techniques: ["Small moving baits", "Vertical presentations"] },
    { id: "sunfish", name: "Sunfish", prominence: "Accessible target", quality: "Good", summary: "Bluegill and redear are abundant enough to create a strong youth and beginning-angler option.", seasons: [{ label: "Warm season", text: "Target shoreline and shallow cover with simple natural bait or small lures." }], techniques: ["Natural bait", "Small lures"] },
  ],
  access: [
    { name: "Shirley Creek", operator: "Public recreation area", kind: "park", launch: "Maintained access area with boat ramp", fee: "Verify with operator", availability: "Water level can affect ramp usability" },
    { name: "Ewing Park", operator: "Public recreation area", kind: "park", launch: "Maintained access area with boat ramp", fee: "Verify with operator", availability: "Water level can affect ramp usability" },
    { name: "McAllister Park", operator: "Public recreation area", kind: "park", launch: "Maintained access area with boat ramp", fee: "Verify with operator", availability: "Water level can affect ramp usability" },
    { name: "Townsend Park", operator: "Public recreation area", kind: "park", launch: "Maintained access area with boat ramp", fee: "Verify with operator", availability: "Water level can affect ramp usability" },
  ],
  boatingNotes: [
    "TPWD lists 22 maintained access areas around the reservoir, and some ramps become unusable when water is low.",
    "The lake averages roughly seven feet of annual fluctuation, so a ramp that worked on a previous trip is not a guarantee today.",
    "Standing timber, vegetation and a very large surface area reward conservative navigation and pre-trip route planning.",
    "Check both current lake level and the operating agency before towing to a specific access area.",
  ],
  regulations: [
    { label: "Special fish rules", text: "TPWD identifies Sam Rayburn as a reservoir with special regulations on some fishes. Confirm the current Outdoor Annual before harvesting fish." },
    { label: "Consumption advisory", text: "TPWD flags a fish-consumption advisory for the reservoir. Follow the current state advisory rather than relying on an evergreen summary." },
    { label: "Aquatic invasives", text: "Drain requirements and other statewide invasive-species rules still apply when moving boats and equipment between Texas waters." },
  ],
  camping: [
    { name: "U.S. Army Corps recreation areas", type: "Public camping + boat access", summary: "TPWD lists thirteen Corps-operated parks around Sam Rayburn, with additional access managed by the Forest Service, TPWD and counties. Amenities vary by site and water level.", href: "https://www.swf-wc.usace.army.mil/samray/" },
    { name: "Martin Dies, Jr. State Park", type: "Nearby state park", summary: "A Texas state-park base south of the reservoir with camping and a strong Piney Woods/Big Thicket setting.", href: "https://tpwd.texas.gov/state-parks/martin-dies-jr" },
  ],
  nearby: [
    { label: "Jasper County", description: "The dam and southern end of the reservoir are centered in Jasper County.", href: "/county/jasper", external: false },
    { label: "Angelina County", description: "The western and northwestern lake corridor reaches into Angelina County toward Lufkin.", href: "/county/angelina", external: false },
    { label: "San Augustine County", description: "The reservoir's upper reaches connect to San Augustine County fishing and access corridors.", href: "/county/san-augustine", external: false },
    { label: "Martin Dies, Jr. State Park", description: "A nearby TexasDefined destination for camping, paddling and another East Texas water stop.", href: "/destination/martin-dies-jr-state-park", external: false },
  ],
  businessCategories: commonBusinessCategories,
  reportSnapshot: { checkedAt: VERIFIED_AT, summary: "Current-bite claims belong in dated reports. TexasDefined keeps this evergreen lake guide focused on durable habitat and seasonal patterns, with TPWD as the fallback current-report source." },
  sources: {
    tpwdLake: { label: "TPWD — Sam Rayburn Reservoir fishing", url: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/sam_rayburn/" },
    tpwdAccess: { label: "TPWD — Sam Rayburn public access", url: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/sam_rayburn/access.phtml" },
    tpwdRegulations: { label: "TPWD — freshwater bag and length limits", url: "https://tpwd.texas.gov/regulations/outdoor-annual/fishing/freshwater-fishing/bag-length-limits" },
    liveLevel: { label: "Water Data for Texas — Sam Rayburn", url: "https://waterdatafortexas.org/reservoirs/individual/sam-rayburn" },
    authority: { label: "U.S. Army Corps of Engineers — Sam Rayburn", url: "https://www.swf-wc.usace.army.mil/samray/" },
    twdb: { label: "Texas Water Development Board — Sam Rayburn", url: "https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/sam_rayburn/index.asp" },
  },
};

const livingston: ShowcaseLakePrototype = {
  slug: "lake-livingston",
  verifiedAt: VERIFIED_AT,
  overview: {
    name: "Lake Livingston",
    summary: "A 90,000-acre Trinity River reservoir north of Houston where white bass and blue-catfish strength matter more than trophy-bass reputation, with broad public access and Lake Livingston State Park on the shoreline.",
    region: "Piney Woods",
    surfaceAcres: 90000,
    maxDepthFeet: 77,
    impoundedYear: 1969,
    counties: ["Polk", "San Jacinto", "Trinity", "Walker"],
    nearestCommunities: ["Livingston", "Onalaska", "Coldspring"],
    riverBasin: "Trinity River Basin",
    waterway: "Trinity River",
    conservationPool: "131 ft msl",
    normalFluctuation: "1–2 feet annually",
    normalClarity: "Moderately to highly turbid",
    controllingAuthority: "Trinity River Authority",
    mapQuery: "Lake Livingston Texas",
  },
  identityAngle: "Lake Livingston is a white-bass and catfish lake first. TPWD rates both excellent, notes blue catfish dominance in the catfish fishery, and rates largemouth bass and crappie much lower. The page should reflect that reality instead of forcing a bass-lake template onto every reservoir.",
  habitat: [
    "Native emergent vegetation is limited mainly to upper-reservoir areas and the backs of coves and embayments.",
    "Water hyacinth occurs around the reservoir and can change local access and cover conditions.",
    "PVC fish-habitat structures provide additional targetable cover and TPWD publishes GPS-enabled habitat tools.",
    "The Trinity River channel, tributaries and creek systems are central to white-bass and catfish patterns.",
  ],
  fish: [
    { id: "white-bass", name: "White bass", prominence: "Primary target", quality: "Excellent", summary: "Lake Livingston's signature fishery; TPWD says white bass are plentiful and grow to large sizes.", seasons: [{ label: "Early spring", text: "Creeks feeding the reservoir become especially important during the spawning run." }, { label: "Open-water periods", text: "Track schooling fish and forage away from the tributary run." }], techniques: ["Small moving baits", "Vertical jigging", "Live bait"] },
    { id: "catfish", name: "Catfish", prominence: "Primary target", quality: "Excellent", summary: "A major fishery dominated by blue catfish, with channel and flathead catfish also present.", seasons: [{ label: "Year-round", text: "Main river channel, tributaries and creek mouths support consistent catfish approaches." }], techniques: ["Cut bait", "Natural bait", "Live bait"] },
    { id: "striped-bass", name: "Striped bass", prominence: "Secondary target", quality: "Fair", summary: "A stocked fishery that is less abundant than white bass or catfish but remains a real open-water target.", seasons: [{ label: "Spring through fall", text: "The US 190 bridge area and open-water channel structure are established trolling and vertical-jigging zones." }], techniques: ["Trolling", "Vertical jigging", "Live shad"] },
    { id: "largemouth-bass", name: "Largemouth bass", prominence: "Additional target", quality: "Poor", summary: "Good catches remain possible in habitat-rich portions of the reservoir, but TPWD does not rate Livingston as a primary largemouth destination.", seasons: [{ label: "Spring & fall", text: "Bays and creeks from the Kickapoo/Penwaugh area northward offer the strongest seasonal opportunity." }], techniques: ["Soft plastics", "Moving baits"] },
    { id: "crappie", name: "Crappie", prominence: "Additional target", quality: "Poor", summary: "A secondary fishery that improves around suitable structure and seasonal shallow cover.", seasons: [{ label: "Spring", text: "Shallower cover becomes more relevant as fish move toward spawning habitat." }], techniques: ["Jigs", "Minnows"] },
    { id: "sunfish", name: "Sunfish", prominence: "Accessible target", quality: "Good", summary: "Bluegill and related sunfish add shoreline and family-fishing options.", seasons: [{ label: "Warm season", text: "Target shoreline cover and park fishing areas with natural bait or small lures." }], techniques: ["Natural bait", "Small lures"] },
  ],
  access: [
    { name: "Patrick's Ferry", operator: "Public", kind: "public-ramp", launch: "Two-lane ramp; all boat types", fee: "No fee listed by TPWD", availability: "Open all year" },
    { name: "Blanchard Public Ramp", operator: "Public", kind: "public-ramp", launch: "Two-lane ramp; all boat types", fee: "No fee listed by TPWD", availability: "Open all year" },
    { name: "Tigerville Park", operator: "Trinity River Authority", kind: "park", launch: "One-lane ramp; all boat types", fee: "No fee listed by TPWD", availability: "Open all year" },
    { name: "Beacon Bay Marina", operator: "Private", kind: "marina", launch: "Three-lane ramp; all boat types", fee: "Fee required", availability: "Open all year" },
    { name: "Lake Livingston State Park", operator: "Texas Parks & Wildlife Department", kind: "park", launch: "Three two-lane ramps; all boat types", fee: "Park/launch fees apply", availability: "Open all year" },
    { name: "Point Blank Public Ramp", operator: "Public", kind: "public-ramp", launch: "Two-lane ramp; all boat types", fee: "No fee listed by TPWD", availability: "Open all year" },
  ],
  boatingNotes: [
    "Zebra mussels have invaded Lake Livingston; clean, drain and dry requirements matter when moving boats or gear to another water body.",
    "The reservoir's normal clarity is moderately to highly turbid, which affects both navigation visibility and lure/presentation choices.",
    "A consumption advisory is in effect; anglers keeping fish should consult the current state advisory.",
    "Check current lake level and ramp status before travel even though many listed access points operate year-round.",
  ],
  regulations: [
    { label: "Special fish rules", text: "TPWD identifies Lake Livingston as a reservoir with special regulations on some fishes. Verify current bag and size limits before harvest." },
    { label: "Consumption advisory", text: "A fish-consumption advisory is in effect. Use the current state advisory for species-specific guidance." },
    { label: "Zebra mussels", text: "Drain water from boats and onboard receptacles as required by state law before leaving the area." },
  ],
  camping: [
    { name: "Lake Livingston State Park", type: "State park campground + boat access", summary: "The park offers tent through full-hookup camping, shoreline fishing, a pier and multiple boat ramps, making it the clearest verified public overnight base on the lake.", href: "https://tpwd.texas.gov/state-parks/lake-livingston" },
    { name: "Wolf Creek Park", type: "Public lake park", summary: "A Trinity River Authority access/camping area on the west side of the lake; seasonal closures and fees should be confirmed before travel.", href: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/livingston/access2.phtml" },
  ],
  nearby: [
    { label: "Polk County", description: "Livingston and much of the eastern lakeshore sit in Polk County.", href: "/county/polk", external: false },
    { label: "San Jacinto County", description: "The dam and southwestern lake corridor connect directly to San Jacinto County.", href: "/county/san-jacinto", external: false },
    { label: "Trinity County", description: "Northern and northeastern lake travel reaches Trinity County communities and access.", href: "/county/trinity", external: false },
    { label: "Lake Livingston State Park", description: "TexasDefined's destination page adds the park context around camping, trails and shoreline recreation.", href: "/destination/lake-livingston-state-park", external: false },
  ],
  businessCategories: commonBusinessCategories,
  reportSnapshot: { checkedAt: VERIFIED_AT, summary: "Fishing activity changes too quickly for this evergreen page to present an undated 'current bite.' TexasDefined reports must be dated and attributable; otherwise anglers are sent to TPWD's current report." },
  sources: {
    tpwdLake: { label: "TPWD — Lake Livingston fishing", url: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/livingston/" },
    tpwdAccess: { label: "TPWD — Lake Livingston public access", url: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/livingston/access2.phtml" },
    tpwdRegulations: { label: "TPWD — freshwater bag and length limits", url: "https://tpwd.texas.gov/regulations/outdoor-annual/fishing/freshwater-fishing/bag-length-limits" },
    liveLevel: { label: "Water Data for Texas — Lake Livingston", url: "https://www.waterdatafortexas.org/reservoirs/individual/livingston" },
    authority: { label: "Trinity River Authority", url: "https://www.trinityra.org/" },
    statePark: { label: "TPWD — Lake Livingston State Park", url: "https://tpwd.texas.gov/state-parks/lake-livingston" },
  },
};

const texoma: ShowcaseLakePrototype = {
  slug: "lake-texoma",
  verifiedAt: VERIFIED_AT,
  overview: {
    name: "Lake Texoma",
    summary: "A 74,686-acre Red River reservoir straddling Texas and Oklahoma, defined by one of the country's unusual self-sustaining landlocked striped-bass populations plus strong black-bass, catfish and crappie opportunities.",
    region: "Prairies & Lakes",
    surfaceAcres: 74686,
    maxDepthFeet: 100,
    impoundedYear: 1944,
    counties: ["Cooke", "Grayson"],
    nearestCommunities: ["Denison", "Pottsboro", "Sherman"],
    riverBasin: "Red River Basin",
    waterway: "Red River",
    conservationPool: "615–619 ft msl",
    normalFluctuation: "5–8 feet annually",
    normalClarity: "Moderate to clear",
    controllingAuthority: "U.S. Army Corps of Engineers",
    stateBorder: ["Texas", "Oklahoma"],
    mapQuery: "Lake Texoma Texas Oklahoma",
  },
  identityAngle: "Texoma is a border lake and a striped-bass lake. TPWD specifically notes its self-sustaining landlocked striper population, year-round guide activity and the fact that two-thirds of the reservoir lies in Oklahoma. Licensing and regulations therefore belong near the top of trip planning, not buried at the bottom.",
  habitat: [
    "Aquatic vegetation is not abundant, so anglers depend more heavily on rock, channels, boathouses, timber and open-water forage than on grass-dominated patterns.",
    "Some water willow, American lotus, floating heart and bushy pondweed occur around the reservoir.",
    "Blue-green algae blooms can occur; current USACE advisories should be checked before recreation.",
    "The Red and Washita river inflows are fundamental to the striped-bass system and broader seasonal fish movement.",
  ],
  fish: [
    { id: "striped-bass", name: "Striped bass", prominence: "Primary target", quality: "Excellent", summary: "Texoma's defining fishery: a self-sustaining landlocked striped-bass population that supports year-round guided fishing.", seasons: [{ label: "Year-round", text: "Follow bait and open-water schools; conditions determine whether fish are roaming, suspended or relating to river/channel structure." }], techniques: ["Live bait", "Trolling", "Vertical jigging", "Casting to schools"] },
    { id: "smallmouth-bass", name: "Smallmouth bass", prominence: "Primary target", quality: "Excellent", summary: "A nationally notable black-bass opportunity built around hard structure and clear-water sections of the lake.", seasons: [{ label: "Year-round", text: "Rock, bluffs, points and channel-oriented hard structure are the core framework." }], techniques: ["Soft plastics", "Crankbaits", "Jigs"] },
    { id: "largemouth-bass", name: "Largemouth bass", prominence: "Additional target", quality: "Good", summary: "Part of Texoma's mixed black-bass fishery alongside smallmouth and spotted bass.", seasons: [{ label: "Spring & fall", text: "Use coves, points, available vegetation and shoreline cover during productive shallow transitions." }], techniques: ["Soft plastics", "Crankbaits", "Spinnerbaits"] },
    { id: "blue-catfish", name: "Blue catfish", prominence: "Primary target", quality: "Excellent", summary: "A strong trophy-capable fishery with seasonal movement between main-pool and upstream areas.", seasons: [{ label: "Winter", text: "Blue catfish move into main-pool areas." }, { label: "Spring", text: "Seasonal movement shifts fish upstream." }], techniques: ["Cut bait", "Live bait"] },
    { id: "crappie", name: "Crappie", prominence: "Secondary target", quality: "Good", summary: "Black and white crappie use boathouses, timber, channels and brush around the reservoir.", seasons: [{ label: "Fall & winter", text: "Fish school more tightly around cover and channel structure." }, { label: "Spring", text: "Spawning movement creates another shallow-water opportunity." }], techniques: ["Jigs", "Minnows"] },
    { id: "white-bass", name: "White bass", prominence: "Secondary target", quality: "Good", summary: "A schooling open-water fishery that complements the lake's striped-bass focus.", seasons: [{ label: "Spring", text: "River influence and seasonal schooling create strong opportunities." }], techniques: ["Slabs", "Small crankbaits", "Live bait"] },
  ],
  access: [
    { name: "Texoma Marina & Resort", operator: "Private", kind: "marina", launch: "TPWD-listed marina/resort access", fee: "Private facility; verify", availability: "Verify with operator" },
    { name: "Juniper Point West", operator: "Public recreation area", kind: "park", launch: "TPWD-listed boat access", fee: "Verify before travel", availability: "Verify current ramp conditions" },
    { name: "Juniper Point East", operator: "Public recreation area", kind: "park", launch: "TPWD-listed boat access", fee: "Verify before travel", availability: "Verify current ramp conditions" },
    { name: "Cedar Mills Resort", operator: "Private", kind: "resort", launch: "TPWD-listed resort access", fee: "Private facility; verify", availability: "Verify with operator" },
    { name: "Walnut Creek Marina", operator: "Private", kind: "marina", launch: "TPWD-listed marina access", fee: "Private facility; verify", availability: "Verify with operator" },
  ],
  boatingNotes: [
    "Zebra mussels have invaded Lake Texoma, so clean-drain-dry practices and Texas drain requirements are part of every trailer trip.",
    "The lake fluctuates 5–8 feet annually; verify ramp conditions and lake level rather than relying on a previous visit.",
    "Blue-green algae blooms can occur. Check current U.S. Army Corps advisories before swimming or other water-contact recreation.",
    "Because the reservoir crosses a state line, boating and fishing plans should account for where you are operating, not merely where you launched.",
  ],
  regulations: [
    { label: "Texas vs. whole-lake license", text: "TPWD says a Texas fishing license covers the Texas portion of Lake Texoma; anglers who want to fish the entire reservoir can purchase the Lake Texoma license." },
    { label: "Special fish limits", text: "Special bag and size limits apply to multiple species. Check the current Outdoor Annual before keeping striped bass, catfish, crappie or black bass." },
    { label: "Invasive species", text: "Boats, livewells and bait buckets must be drained before leaving the area, and special bait-transport rules apply downstream in the Red River." },
  ],
  camping: [
    { name: "Eisenhower State Park", type: "State park campground + lake access", summary: "A major public overnight base on the Texas side near Denison, with camping and direct Lake Texoma recreation access.", href: "https://tpwd.texas.gov/state-parks/eisenhower" },
    { name: "Public parks and private marinas", type: "Lakewide access network", summary: "TPWD points anglers to Eisenhower State Park, five other public parks and numerous private marinas/resorts. Verify site-specific ramp, camping and reservation status before travel.", href: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/texoma/access.phtml" },
  ],
  nearby: [
    { label: "Grayson County", description: "Denison, Pottsboro and much of the Texas-side access network sit in Grayson County.", href: "/county/grayson", external: false },
    { label: "Cooke County", description: "The western Texas arm of Lake Texoma reaches into Cooke County.", href: "/county/cooke", external: false },
    { label: "Eisenhower State Park", description: "TexasDefined's destination page covers the state-park side of a Texoma trip.", href: "/destination/eisenhower-state-park", external: false },
    { label: "Texas–Oklahoma border planning", description: "Two-thirds of the lake lies in Oklahoma, making whole-lake licensing an essential trip-planning question.", href: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/texoma/", external: true },
  ],
  businessCategories: commonBusinessCategories,
  reportSnapshot: { checkedAt: VERIFIED_AT, summary: "A Texoma bite report ages quickly because open-water striped-bass location changes with forage, flow and weather. TexasDefined only presents current conditions when a dated, attributable report exists." },
  sources: {
    tpwdLake: { label: "TPWD — Lake Texoma fishing", url: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/texoma/" },
    tpwdAccess: { label: "TPWD — Lake Texoma public access", url: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/texoma/access.phtml" },
    tpwdRegulations: { label: "TPWD — Lake Texoma rules", url: "https://tpwd.texas.gov/regulations/outdoor-annual/fishing/freshwater-fishing/bag-length-limits" },
    liveLevel: { label: "Water Data for Texas — Lake Texoma", url: "https://waterdatafortexas.org/reservoirs/individual/texoma" },
    twdb: { label: "Texas Water Development Board — Lake Texoma", url: "https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/texoma/index.asp" },
    statePark: { label: "TPWD — Eisenhower State Park", url: "https://tpwd.texas.gov/state-parks/eisenhower" },
  },
};

export const showcaseLakePrototypes: Record<ShowcaseLakeSlug, ShowcaseLakePrototype> = {
  "lake-fork": lakeFork,
  "sam-rayburn-reservoir": samRayburn,
  "lake-livingston": livingston,
  "lake-texoma": texoma,
};
