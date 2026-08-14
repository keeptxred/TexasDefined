import type { FishingSeason, FishingSource } from "./types";

export interface FishSpeciesSeasonalGuide {
  season: Exclude<FishingSeason, "year-round">;
  heading: string;
  summary: string;
  habitats: string[];
  approaches: string[];
}

export interface FishSpeciesTackleGuide {
  heading: string;
  summary: string;
}

export interface FishSpeciesBaitGuide {
  name: string;
  summary: string;
}

export interface FishSpeciesArticleLink {
  title: string;
  href: string;
  summary: string;
}

export interface FishSpeciesEditorialProfile {
  slug: string;
  verifiedAt: string;
  overview: string;
  texasDistribution: string;
  habitat: string;
  seasonalBehavior: FishSpeciesSeasonalGuide[];
  techniqueIds: string[];
  tackle: FishSpeciesTackleGuide[];
  baitsAndLures: FishSpeciesBaitGuide[];
  relatedSpeciesSlugs: string[];
  articleLinks: FishSpeciesArticleLink[];
  rankingMethod: string;
  regulationNote: string;
  regulationSource: FishingSource;
  sources: FishingSource[];
}

const verifiedAt = "2026-08-13";
const source = (id: string, name: string, url: string): FishingSource => ({ id, name, url, checkedAt: verifiedAt, sourceType: "state" });

const largemouthFactSheet = source(
  "tpwd-largemouth-bass-fact-sheet",
  "Texas Parks & Wildlife Department — Largemouth Bass",
  "https://tpwd.texas.gov/huntwild/wild/species/lmb/",
);
const freshwaterLimits = source(
  "tpwd-freshwater-bag-length-limits",
  "Texas Parks & Wildlife Department — Freshwater Bag and Length Limits",
  "https://tpwd.texas.gov/regulations/outdoor-annual/fishing/freshwater-fishing/bag-length-limits",
);
const lakeFinder = source(
  "tpwd-texas-lake-finder",
  "Texas Parks & Wildlife Department — Texas Lake Finder",
  "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/",
);

export const largemouthBassEditorialProfile: FishSpeciesEditorialProfile = {
  slug: "largemouth-bass",
  verifiedAt,
  overview: "Largemouth bass are Texas' defining freshwater sportfish. They thrive in reservoirs, lakes, ponds and slower river habitat, using vegetation, timber, docks, rock, points, creek channels and other cover as seasonal conditions change.",
  texasDistribution: "Largemouth bass occur broadly across Texas in public reservoirs and smaller waters. The statewide fishery includes native largemouth bass and Florida largemouth genetics introduced into many Texas lakes for fisheries management.",
  habitat: "Protective cover is the common thread: aquatic vegetation, flooded timber, brush, docks, rock ledges and man-made structure all matter. Clear, quiet water is classic largemouth habitat, but Texas fisheries span a wide range of clarity, depth and reservoir types.",
  seasonalBehavior: [
    { season: "spring", heading: "Spring — move shallow", summary: "Warming water pulls bass toward protected spawning areas and shoreline cover. Texas lake pages often show their strongest shallow-water patterns from late winter through spring.", habitats: ["protected coves", "vegetation", "docks", "shallow timber", "spawning flats"], approaches: ["soft plastics", "spinnerbaits", "crankbaits", "targeted shallow presentations"] },
    { season: "summer", heading: "Summer — fish the windows and edges", summary: "As heat builds, low-light periods become more valuable and many fish shift toward vegetation edges, shade, channels and deeper structure while some remain in shallow cover.", habitats: ["vegetation edges", "docks and shade", "points", "creek channels", "deep structure"], approaches: ["early topwater", "soft plastics", "deep-running crankbaits", "slow presentations around cover"] },
    { season: "fall", heading: "Fall — follow forage and moving fish", summary: "Cooling water can reactivate shallow and mid-depth fish. Creek arms, points and cover near forage become important as bass feed more aggressively ahead of winter.", habitats: ["creek arms", "points", "shoreline cover", "vegetation", "channel transitions"], approaches: ["crankbaits", "spinnerbaits", "topwater in low light", "soft plastics"] },
    { season: "winter", heading: "Winter — slow down and use structure", summary: "Cold periods often concentrate bass around deeper structure, channels and stable cover, although warm spells can briefly improve shallower activity.", habitats: ["deep points", "channel edges", "timber", "rock", "stable cover"], approaches: ["slow soft plastics", "jigs where appropriate", "crankbaits during active windows", "patient structure fishing"] },
  ],
  techniqueIds: ["soft-plastics", "crankbaits", "spinnerbaits", "topwater"],
  tackle: [
    { heading: "General-purpose setup", summary: "A medium to medium-heavy spinning or casting outfit covers most Texas largemouth work. Match line strength and lure weight to the amount of cover rather than using one statewide setup for every lake." },
    { heading: "Heavy cover", summary: "Vegetation, timber and dock structure call for tackle with enough power and abrasion resistance to control fish quickly and keep presentations out of snag-prone cover." },
    { heading: "Clear or pressured water", summary: "Lighter presentations and longer casts can matter when visibility is high or fishing pressure is heavy. Let the lake's clarity, cover and depth drive the final choice." },
  ],
  baitsAndLures: [
    { name: "Soft plastics", summary: "A flexible year-round category for shoreline cover, docks, vegetation, points and deeper structure." },
    { name: "Crankbaits", summary: "Useful for covering water and contacting points, rock, vegetation edges and seasonal depth changes." },
    { name: "Spinnerbaits", summary: "A strong choice around shallow cover, vegetation, timber and stained water when bass are willing to chase." },
    { name: "Topwater", summary: "Best treated as a timing tool for low light, schooling activity and seasonally shallow fish rather than an all-day guarantee." },
  ],
  relatedSpeciesSlugs: ["guadalupe-bass", "smallmouth-bass", "spotted-bass"],
  articleLinks: [
    { title: "Why Almost All Texas Lakes Are Man-Made", href: "/article/texas-lakes-reservoirs-explained", summary: "Understand the reservoir system behind many of Texas' most important bass fisheries." },
  ],
  rankingMethod: "Lake rankings are generated from TexasDefined's source-backed lake-species relationships. Fishery quality is scored first, then primary-vs-secondary prominence, then stable lake identity — not paid placement.",
  regulationNote: "Texas freshwater limits and waterbody-specific exceptions can change. Check TPWD's current statewide rules and the individual lake's exceptions before fishing; TexasDefined does not freeze a bag or length limit into an evergreen species page.",
  regulationSource: freshwaterLimits,
  sources: [largemouthFactSheet, freshwaterLimits, lakeFinder],
};

export const fishSpeciesEditorialProfiles: Record<string, FishSpeciesEditorialProfile> = {
  [largemouthBassEditorialProfile.slug]: largemouthBassEditorialProfile,
};
