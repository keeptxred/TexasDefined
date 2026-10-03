export type FishingTechniqueTackleVisual = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export const fishingTechniqueTackleVisuals: Record<string, FishingTechniqueTackleVisual> = {
  "soft-plastics": {
    src: "/images/fishing/tackle/soft-plastics-setup.svg",
    alt: "Soft plastics tackle setup with medium-heavy rod, reel, line, bullet weight, offset hook and soft plastic bait",
    caption: "Simplified tackle layout. Match rod power, line, hook and weight to the cover, depth and bait you are fishing.",
    width: 640,
    height: 260,
  },
  crankbaits: {
    src: "/images/fishing/tackle/crankbaits-setup.svg",
    alt: "Crankbait tackle setup with moderate-action rod, reel, line and diving crankbait with treble hooks",
    caption: "Simplified tackle layout. Rod action, line diameter and hook condition all affect how a crankbait fishes.",
    width: 640,
    height: 260,
  },
  spinnerbaits: {
    src: "/images/fishing/tackle/spinnerbaits-setup.svg",
    alt: "Spinnerbait tackle setup with medium-heavy casting rod, reel, line and spinnerbait with blades and skirt",
    caption: "Simplified tackle layout. Use enough rod and line for the cover while keeping the spinnerbait balanced and running correctly.",
    width: 640,
    height: 260,
  },
  topwater: {
    src: "/images/fishing/tackle/topwater-setup.svg",
    alt: "Topwater tackle setup with rod, reel, floating line choice and surface lure with hooks",
    caption: "Simplified tackle layout. Line type and rod action should match the lure style and the amount of cover around the fish.",
    width: 640,
    height: 260,
  },
  trolling: {
    src: "/images/fishing/tackle/trolling-setup.svg",
    alt: "Trolling setup with rod holder, trolling rod, reel, controlled line length and depth-running lure",
    caption: "Simplified tackle layout. Repeatable rod position, line length, speed and lure depth make trolling passes easier to reproduce.",
    width: 640,
    height: 260,
  },
  "vertical-jigging": {
    src: "/images/fishing/tackle/vertical-jigging-setup.svg",
    alt: "Vertical jigging setup with short responsive rod, reel, low-stretch line and weighted jig below the boat",
    caption: "Simplified tackle layout. Use enough lure weight and line control to keep the presentation nearly vertical at the fish's depth.",
    width: 640,
    height: 260,
  },
  "jigs-and-minnows": {
    src: "/images/fishing/tackle/jigs-and-minnows-setup.svg",
    alt: "Jigs and minnows setup with light rod, reel, depth-controlled line, small jig or hook and minnow",
    caption: "Simplified tackle layout. Precise depth control matters more than oversized tackle for most crappie jig-and-minnow presentations.",
    width: 640,
    height: 260,
  },
  "live-bait": {
    src: "/images/fishing/tackle/live-bait-setup.svg",
    alt: "Live-bait tackle setup with rod, reel, line, controlled weight, leader, hook and live bait",
    caption: "Simplified tackle layout. Use enough weight to control position without unnecessarily restricting healthy live bait.",
    width: 640,
    height: 260,
  },
  "cut-bait": {
    src: "/images/fishing/tackle/cut-bait-setup.svg",
    alt: "Cut-bait tackle setup with heavy catfish rod, reel, strong line, sinker, swivel, leader, circle hook and cut bait",
    caption: "Simplified tackle layout. Scale line, sinker, leader and hook to current, cover, bait size and the catfish you are targeting.",
    width: 640,
    height: 260,
  },
};
