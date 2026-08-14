import type { FishingGuide, FishingReport } from "./types";

export const LAKE_CONROE_SLUG = "lake-conroe" as const;
export const LAKE_CONROE_VERIFIED_AT = "2026-08-13" as const;

export const LAKE_CONROE_SECTION_SLUGS = [
  "fish",
  "access",
  "boating",
  "regulations",
  "camping",
  "nearby",
  "reports",
  "guides",
] as const;

export type LakeConroeSection = (typeof LAKE_CONROE_SECTION_SLUGS)[number];

export const lakeConroeCanonicalPath = (section?: LakeConroeSection) =>
  `/fishing/lakes/${LAKE_CONROE_SLUG}${section ? `/${section}` : ""}`;

export const lakeConroeSectionMeta: Record<LakeConroeSection, { label: string; title: string; description: string }> = {
  fish: {
    label: "Fish",
    title: "Lake Conroe Fish Species & Seasonal Fishing",
    description: "See Lake Conroe's primary fish species, seasonal patterns, habitat and practical techniques for bass, catfish, crappie, hybrids and bluegill.",
  },
  access: {
    label: "Access",
    title: "Lake Conroe Boat Ramps & Public Access",
    description: "Plan Lake Conroe access with verified boat ramps, launch types, fees and operating notes sourced from TPWD and the U.S. Forest Service.",
  },
  boating: {
    label: "Boating",
    title: "Boating Lake Conroe: Water, Navigation & Safety",
    description: "Understand Lake Conroe's water conditions, standing-timber navigation hazards, live lake-level resources and boating preparation.",
  },
  regulations: {
    label: "Regulations",
    title: "Lake Conroe Fishing Regulations",
    description: "Review the Lake Conroe fishing limits verified from Texas Parks & Wildlife Department and jump to the official rules before fishing.",
  },
  camping: {
    label: "Camping",
    title: "Camping Near Lake Conroe",
    description: "Compare verified U.S. Forest Service camping and day-use options around Lake Conroe, including Cagle and Stubblefield recreation areas.",
  },
  nearby: {
    label: "Nearby",
    title: "Things to Do Near Lake Conroe",
    description: "Connect a Lake Conroe fishing trip with Sam Houston National Forest, nearby Texas parks, counties and other regional planning resources.",
  },
  reports: {
    label: "Reports",
    title: "Lake Conroe Fishing Reports",
    description: "Find verified Lake Conroe fishing reports when available, with clear freshness dates and no invented current-bite claims.",
  },
  guides: {
    label: "Guides",
    title: "Lake Conroe Fishing Guides",
    description: "Browse verified Lake Conroe fishing-guide profiles when available and learn how local guides can claim or submit a listing.",
  },
};

export const lakeConroeSources = {
  tpwdLake: {
    label: "Texas Parks & Wildlife Department — Lake Conroe",
    url: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/conroe/index.phtml",
  },
  tpwdAccess: {
    label: "Texas Parks & Wildlife Department — Lake Conroe public access",
    url: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/conroe/access.phtml",
  },
  tpwdRegulations: {
    label: "Texas Parks & Wildlife Department — Lake Conroe regulations",
    url: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/conroe/regulations.phtml",
  },
  tpwdReport: {
    label: "Texas Parks & Wildlife Department — current fishing report",
    url: "https://tpwd.texas.gov/fishboat/fish/action/reptform2.php?lake=CONROE",
  },
  tpwdHabitat: {
    label: "Texas Parks & Wildlife Department — habitat structures",
    url: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/fish_attractors.phtml",
  },
  twdb: {
    label: "Texas Water Development Board — Lake Conroe",
    url: "https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/conroe/index.asp",
  },
  liveLevel: {
    label: "Water Data for Texas — Lake Conroe live level",
    url: "https://www.waterdatafortexas.org/reservoirs/individual/conroe",
  },
  sjra: {
    label: "San Jacinto River Authority — Lake Conroe",
    url: "https://www.sjra.net/lake-conroe/",
  },
  usfsCagle: {
    label: "U.S. Forest Service — Cagle Recreation Area",
    url: "https://www.fs.usda.gov/r08/texas/recreation/cagle-recreation-area",
  },
  usfsScottsRidge: {
    label: "U.S. Forest Service — Scott's Ridge",
    url: "https://www.fs.usda.gov/r08/texas/recreation/scotts-ridge",
  },
  usfsStubblefield: {
    label: "U.S. Forest Service — Stubblefield Recreation Area",
    url: "https://www.fs.usda.gov/r08/texas/recreation/stubblefield-recreation-area",
  },
} as const;

export const lakeConroeOverview = {
  name: "Lake Conroe",
  summary: "A major reservoir north of Houston where strong largemouth bass, channel catfish, hybrid striped bass, crappie and bluegill fisheries meet a shoreline of docks, marinas, national-forest access and upper-lake timber.",
  surfaceAcres: 20118,
  impoundedYear: 1973,
  counties: ["Montgomery", "Walker"],
  nearestCommunities: ["Conroe", "Montgomery", "Willis"],
  region: "Piney Woods",
  riverBasin: "San Jacinto River Basin",
  waterway: "West Fork of the San Jacinto River",
  conservationPoolFeetMsl: 201,
  normalFluctuation: "1–3 feet",
  normalClarity: "Slight to moderate algal staining",
  averageDepthFeet: 20,
  shorelineMilesApprox: 150,
  managingAuthorities: ["San Jacinto River Authority", "City of Houston water-rights interest"],
  maximumDepthNote: "The primary TPWD/TWDB/SJRA sources verified for this prototype do not publish a single maximum-depth figure, so TexasDefined does not invent one.",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Lake+Conroe+Texas",
} as const;

export const lakeConroeHabitat = [
  "The lower two-thirds of the reservoir is comparatively open, with bulkheads, boat docks and marina structure dominating much of the shoreline.",
  "The upper reservoir includes submerged standing timber around the old river channel; TPWD specifically warns that this can create a navigation hazard near conservation pool.",
  "Aquatic vegetation is currently low-density rather than a lake-wide dominant feature.",
  "TPWD and partners have installed four man-made fish-habitat reefs that anglers can locate with the agency's habitat tools and GPS data.",
] as const;

export const lakeConroeFish = [
  {
    id: "largemouth-bass",
    name: "Largemouth bass",
    prominence: "Primary target",
    quality: "Excellent",
    summary: "Lake Conroe's signature sportfish. TPWD notes strong catch rates and trophy potential.",
    seasons: [
      { label: "Early spring", text: "Work shallower water around marinas, docks and shoreline cover." },
      { label: "Summer", text: "Expect more deeper-water and structure-oriented fishing outside low-light periods." },
      { label: "Mid- to late fall", text: "Shallow fishing improves again as seasonal conditions change." },
      { label: "Core approaches", text: "Shad-imitation baits and soft plastics fit the lake's dock, cover and structure patterns." },
    ],
  },
  {
    id: "channel-catfish",
    name: "Channel catfish",
    prominence: "Primary target",
    quality: "Excellent",
    summary: "TPWD describes channel catfish as the lake's most abundant sportfish and a dependable year-round option.",
    seasons: [{ label: "Year-round", text: "Natural and prepared baits, including cut shad, can produce across the lake's catfish water." }],
  },
  {
    id: "hybrid-striped-bass",
    name: "Hybrid striped bass",
    prominence: "Primary target",
    quality: "Excellent",
    summary: "A stocked open-water fishery that rewards anglers who locate moving schools rather than fish one piece of shoreline cover.",
    seasons: [
      { label: "Open water", text: "Trolling and vertical presentations are core ways to find and stay with fish." },
      { label: "Spring", text: "Seasonal movement can bring hybrids toward river-channel areas." },
      { label: "Summer", text: "Fish can hold beneath schooling white bass; vertical spoons or live shad can be effective once located." },
    ],
  },
  {
    id: "crappie",
    name: "Crappie",
    prominence: "Secondary target",
    quality: "Good",
    summary: "A useful seasonal target around cover, docks, timber and brush-oriented structure.",
    seasons: [
      { label: "Spring", text: "Shallower seasonal movement improves access to fish around cover." },
      { label: "Fall", text: "Crappie opportunity improves again as fish regroup around structure." },
    ],
  },
  {
    id: "bluegill",
    name: "Bluegill",
    prominence: "Accessible target",
    quality: "Excellent",
    summary: "An approachable option for bank, dock and family fishing where riprap and shoreline structure are available.",
    seasons: [{ label: "Core approach", text: "TPWD recommends simple natural baits such as worms and crickets around riprap and deeper edges." }],
  },
  {
    id: "white-bass",
    name: "White bass",
    prominence: "Additional target",
    quality: "Present",
    summary: "Schooling white bass share open-water habitat with hybrids and can create visible feeding activity.",
    seasons: [{ label: "Schooling periods", text: "Watch for open-water surface activity and use moving or vertical presentations around active schools." }],
  },
] as const;

export const lakeConroeAccess = [
  { name: "Stubblefield Lake", operator: "U.S. Forest Service", launch: "Dirt ramp for small boats", fee: "No launch fee; recreation-area fees may apply", availability: "Open all year", source: "tpwdAccess" },
  { name: "Cagle Recreation Area", operator: "U.S. Forest Service", launch: "Two-lane concrete ramp; all boat types", fee: "Fee required", availability: "Open all year", source: "usfsCagle" },
  { name: "Stow-A-Way Marina", operator: "Private", launch: "Three-lane concrete ramp; all boat types", fee: "Fee required", availability: "Open all year", source: "tpwdAccess" },
  { name: "Scott's Ridge", operator: "U.S. Forest Service", launch: "Two-lane concrete ramp; all boat types", fee: "Day-use fee", availability: "Open all year", source: "usfsScottsRidge" },
  { name: "FM 830 Ramp", operator: "Texas Parks & Wildlife Department", launch: "Two concrete ramps; all boat types", fee: "No fee", availability: "Open all year", source: "tpwdAccess" },
  { name: "April Plaza Marina", operator: "Private", launch: "Three-lane concrete ramp; all boat types", fee: "Fee required", availability: "Open all year", source: "tpwdAccess" },
  { name: "Pier 105", operator: "Private", launch: "Three-lane concrete ramp; all boat types", fee: "Fee required", availability: "Open all year", source: "tpwdAccess" },
  { name: "Lakeview Marina", operator: "Private", launch: "Two two-lane concrete ramps", fee: "Fee required", availability: "Open all year", source: "tpwdAccess" },
] as const;

export const lakeConroeRegulations = [
  { species: "Largemouth bass", limit: "16-inch minimum; 5 black bass per day in combination" },
  { species: "Blue + channel catfish", limit: "25 per day in combination; no minimum length; no more than 5 may be 20 inches or longer, and no more than 1 of those may be 30 inches or longer" },
  { species: "Flathead catfish", limit: "18-inch minimum; 5 per day" },
  { species: "Crappie", limit: "10-inch minimum; 25 per day" },
  { species: "Bluegill and other sunfish", limit: "No minimum length and no daily bag limit listed for this reservoir" },
  { species: "White bass", limit: "10-inch minimum; 25 per day" },
  { species: "Striped + hybrid striped bass", limit: "18-inch minimum; 5 per day in combination" },
] as const;

export const lakeConroeBoatingNotes = [
  "Check the live Water Data for Texas lake-level page before launching instead of relying on a stale level copied into a guide.",
  "Use extra caution in the upper reservoir: submerged standing timber along the old river channel can be hazardous, particularly near conservation pool.",
  "Texas law requires boaters to drain water from vessels and onboard receptacles when approaching or leaving public fresh water to help limit zebra-mussel movement.",
  "Conditions, closures and ramp usability can change after storms, drought or maintenance. Confirm the operating source before towing to a launch.",
] as const;

export const lakeConroeCamping = [
  {
    name: "Cagle Recreation Area",
    type: "Campground + boat access",
    summary: "A U.S. Forest Service recreation area on Lake Conroe with a boat ramp and camping loops, including full-service RV sites. Confirm reservations, fees and site availability with the Forest Service before travel.",
    source: "usfsCagle",
  },
  {
    name: "Stubblefield Recreation Area",
    type: "Camping + small-boat access",
    summary: "A national-forest recreation area with camping, fishing, canoeing, hiking and picnicking, plus a small-boat dirt ramp listed by TPWD.",
    source: "usfsStubblefield",
  },
  {
    name: "Scott's Ridge",
    type: "Day use only",
    summary: "Useful for lake access, picnicking and launching, but the Forest Service lists Scott's Ridge as day use rather than overnight camping.",
    source: "usfsScottsRidge",
  },
] as const;

export const lakeConroeNearby = [
  { label: "Sam Houston National Forest", description: "The upper end of Lake Conroe meets national-forest land, creating a natural pairing for hiking, camping and quieter shoreline access.", href: "https://www.fs.usda.gov/r08/texas/recreation/sam-houston-national-forest", external: true },
  { label: "Montgomery County", description: "Use the TexasDefined county guide for local government, property and regional reference information.", href: "/county/montgomery", external: false },
  { label: "Walker County", description: "The lake also extends into Walker County on its northern side.", href: "/county/walker", external: false },
  { label: "Huntsville State Park", description: "A nearby Piney Woods state-park option for hiking, camping and outdoor time away from the reservoir.", href: "/destination/huntsville-state-park", external: false },
  { label: "Lake Livingston State Park", description: "Pair the trip with another major East Texas reservoir and state-park stop farther northeast.", href: "/destination/lake-livingston-state-park", external: false },
] as const;

export const lakeConroeReportSnapshot = {
  checkedAt: LAKE_CONROE_VERIFIED_AT,
  summary: "At the August 13, 2026 verification, TPWD's current fishing-report page indicated a brief pause in weekly reports and did not return a qualifying current Lake Conroe report. TexasDefined therefore does not manufacture a current bite, water temperature or lure recommendation.",
} as const;

export function isLakeConroeSection(value: string): value is LakeConroeSection {
  return (LAKE_CONROE_SECTION_SLUGS as readonly string[]).includes(value);
}

export function newestPublishedReport(reports: FishingReport[]) {
  return [...reports].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))[0] ?? null;
}

export function verifiedGuides(guides: FishingGuide[]) {
  return guides.filter((guide) => guide.verifiedListing);
}
