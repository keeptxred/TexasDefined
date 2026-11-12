import type { PublishedFishingTechniqueSlug } from "./technique-routing";

/**
 * Editorial decision guide. These are general fishing starting points, not
 * source-backed lake/species relationships or real-time fishing reports.
 */
export type FishingTechniqueDecision = {
  slug: PublishedFishingTechniqueSlug;
  method: string;
  bestWhen: string;
  depthAndCover: string;
  target: string;
  tryFirst: string;
  switchWhen: string;
};

export const fishingTechniqueDecisionGuide: FishingTechniqueDecision[] = [
  {
    slug: "soft-plastics",
    method: "Soft plastics",
    bestWhen: "Fish are holding tight to cover or need a slower presentation",
    depthAndCover: "Grass, wood, docks, points and deeper bottom structure",
    target: "Largemouth and other black bass",
    tryFirst: "Texas rig through thick cover; finesse rig for clear or pressured water",
    switchWhen: "Fish are spread out and a faster search bait will cover more water",
  },
  {
    slug: "crankbaits",
    method: "Crankbaits",
    bestWhen: "You can reach the fish with a lure that contacts rock or runs beside structure",
    depthAndCover: "Riprap, points, ledges and sparse vegetation; depth depends on lure",
    target: "Bass and other fish chasing moving bait",
    tryFirst: "Choose the diving range for the target, then test cast angle and contact",
    switchWhen: "Dense grass or timber makes treble hooks repeatedly snag",
  },
  {
    slug: "spinnerbaits",
    method: "Spinnerbaits",
    bestWhen: "Wind, stained water or shallow cover favors a moving single-hook lure",
    depthAndCover: "Brush edges, timber, wind-blown banks and vegetation lanes",
    target: "Primarily largemouth bass",
    tryFirst: "Keep the blades turning near cover; slow down before upsizing",
    switchWhen: "Clear, calm conditions call for a smaller or slower bait",
  },
  {
    slug: "topwater",
    method: "Topwater",
    bestWhen: "Fish are feeding toward the surface, especially in low light or shade",
    depthAndCover: "Surface over points, vegetation edges, grass mats or schooling fish",
    target: "Bass and surface-feeding white, striped or hybrid bass",
    tryFirst: "Use a walking bait in open water, frog over mats, or popper near cover",
    switchWhen: "Fish stop rising; follow them deeper rather than forcing a surface lure",
  },
  {
    slug: "trolling",
    method: "Trolling",
    bestWhen: "Fish and forage are spread along offshore routes at a trackable depth",
    depthAndCover: "Open water, channel edges and suspended schools with a safe boat route",
    target: "Striped, hybrid and white bass in documented fisheries",
    tryFirst: "Set a repeatable pass; change lure depth before changing several variables",
    switchWhen: "Traffic, shallow hazards or restricted water make the pass unsafe",
  },
  {
    slug: "vertical-jigging",
    method: "Vertical jigging",
    bestWhen: "Electronics or a known target show fish stacked beneath the boat",
    depthAndCover: "Deep schools, bridge structure, humps and channel drops",
    target: "White, striped and hybrid bass or crappie where documented",
    tryFirst: "Keep the lure close to fish depth and lift it only as far as fish respond",
    switchWhen: "Fish roam too quickly to keep the lure in their strike zone",
  },
  {
    slug: "jigs-and-minnows",
    method: "Jigs and minnows",
    bestWhen: "Crappie are holding near defined cover at a repeatable depth",
    depthAndCover: "Brush piles, bridge columns, timber and shallow spawning cover",
    target: "Crappie",
    tryFirst: "Hold a small jig or legal minnow just above the school",
    switchWhen: "Fish relocate or bait transport rules rule out the planned live bait",
  },
  {
    slug: "live-bait",
    method: "Live bait",
    bestWhen: "A legal natural presentation can be held close to fish without racing past",
    depthAndCover: "Suspended schools, brush edges or bottom structure",
    target: "Crappie, striped/hybrid bass and some catfish",
    tryFirst: "Match bait and hook size to the fish; check collection and transport rules",
    switchWhen: "The bait cannot legally be carried, collected or used on that water",
  },
  {
    slug: "cut-bait",
    method: "Cut bait",
    bestWhen: "Catfish are following forage near bottom or along a drifting route",
    depthAndCover: "Channel edges, flats, current seams and selected open-water drifts",
    target: "Blue and channel catfish",
    tryFirst: "Use legally sourced nongame bait and a rig that holds the desired depth",
    switchWhen: "Your bait source is prohibited or the setup repeatedly snags",
  },
];
