/**
 * Five source-checked, lake-specific contrasts for the highest-intent fishing
 * technique guides. TPWD reports the reservoir facts; decisions and "don't
 * infer" cautions are Texas Defined editorial analysis, not firsthand tests
 * or reports of today's fishing. Keep source titles and slugs exact.
 */
export const TECHNIQUE_RESEARCH_REVIEWED_AT = "2026-11-13" as const;

export type ReservoirComparison = {
  headline: string;
  intro: string;
  first: { lake: string; lakePath: string; sourceUrl: string; fact: string; implication: string };
  second: { lake: string; lakePath: string; sourceUrl: string; fact: string; implication: string };
  choice: string;
  limit: string;
};
export const techniqueReservoirComparisons: Record<string, ReservoirComparison> = {
  "soft-plastics": {
    headline: "A worm on Rayburn is not the same job as a worm on Canyon",
    intro: "Both reservoirs support soft-plastic presentations, but the structure and water clarity lead to different first casts.",
    first: {
      lake: "Sam Rayburn Reservoir",
      lakePath: "/fishing/lakes/sam-rayburn-reservoir",
      sourceUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/sam_rayburn/",
      fact: "TPWD places many summer bass around vegetation edges, man-made brush, deeper ledges and creek channels. It lists plastic worms and Carolina rigs among the usual tactics.",
      implication: "Start with a protected-hook worm around vegetation or brush; consider a Carolina rig to cover an open ledge after locating fish.",
    },
    second: {
      lake: "Canyon Lake",
      lakePath: "/fishing/lakes/canyon-lake",
      sourceUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/canyon/",
      fact: "TPWD describes a mostly rocky, clear-to-slightly-stained highland reservoir with no aquatic vegetation listed. Soft-plastic worms, grubs and soft jerkbaits are popular; light spinning tackle is suggested for clear main-lake water.",
      implication: "Consider a smaller, more controlled finesse presentation around a point or rocky drop instead of automatically using a heavy grass rig.",
    },
    choice: "Ask which cover you need to pass through, and whether the fish are near the bottom or suspended. Rig choice follows that answer—not the brand or color of the plastic.",
    limit: "Neither TPWD lake profile verifies a present-day bite, an exact lure weight or the success of any particular cast.",
  },
  crankbaits: {
    headline: "Rocky shoreline or offshore structure? Change the running depth",
    intro: "The same lure category serves two different parts of a reservoir. The depth you can repeatedly reach matters more than a one-size-fits-all crankbait.",
    first: {
      lake: "Lake Texoma",
      lakePath: "/fishing/lakes/lake-texoma",
      sourceUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/texoma/",
      fact: "TPWD recommends working crankbaits near brush and rocky shorelines in fall for largemouth and spotted bass. When bass move offshore as water warms, deeper-diving crankbaits are one option near submerged structure.",
      implication: "Start shallower when contacting a rocky bank in fall, then select a suitable deeper runner only after identifying an offshore target.",
    },
    second: {
      lake: "Canyon Lake",
      lakePath: "/fishing/lakes/canyon-lake",
      sourceUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/canyon/",
      fact: "TPWD names main-lake points, rocky shores and flooded timber as places where anglers work crankbaits on Canyon Lake.",
      implication: "Cast along a point or rock transition, but change line angle or choose another presentation before a deep-diving bait repeatedly hangs in timber.",
    },
    choice: "Match the lure's actual running zone to the target; note where it first contacts cover and whether that contact is useful or only fouling the hooks.",
    limit: "TPWD does not supply a universal diving-depth chart. Cast length, line and lure design alter the depth you actually reach.",
  },
  spinnerbaits: {
    headline: "Lake Fork and Sam Rayburn: two reasons to cover shallow water",
    intro: "The fishing window is more specific than the name of the bait. Cover position and season determine whether a moving spinnerbait is a sensible first search lure.",
    first: {
      lake: "Lake Fork",
      lakePath: "/fishing/lakes/lake-fork",
      sourceUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/fork/",
      fact: "TPWD includes spinnerbaits with shoreline lures used for largemouth bass during the spring spawning period, approximately mid-February through April.",
      implication: "Work identifiable shoreline cover with a lure that runs cleanly beside it; a wider, slow-turning blade can help keep track of the bait in stained water.",
    },
    second: {
      lake: "Sam Rayburn Reservoir",
      lakePath: "/fishing/lakes/sam-rayburn-reservoir",
      sourceUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/sam_rayburn/",
      fact: "TPWD says bass are generally more active for longer periods and nearer shallow water during fall, winter and spring, with spinnerbaits and crankbaits common choices.",
      implication: "Use the bait to test a shallow cover line, then switch position or presentation when fish retreat to vegetation, brush or deeper edges.",
    },
    choice: "Change one variable—blade lift, overall weight or retrieve speed—so the spinnerbait stays close to the cover you intended to fish.",
    limit: "These TPWD lake examples are not proof that every spinnerbait species listed elsewhere occurs in either reservoir or that bass are actively chasing today.",
  },
  topwater: {
    headline: "Canyon's open rock and Rayburn's cover change the surface plan",
    intro: "A surface strike is an opportunity, not a year-round guarantee. Start with light, cover and visible feeding rather than a fixed topwater schedule.",
    first: {
      lake: "Canyon Lake",
      lakePath: "/fishing/lakes/canyon-lake",
      sourceUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/canyon/",
      fact: "TPWD describes early-morning and evening topwater fishing for largemouth bass, with the possibility of longer surface activity on cloudy days. The lake has no aquatic vegetation listed.",
      implication: "Try a walking bait along a rocky point or a popper held near an isolated target when fish can see the surface presentation.",
    },
    second: {
      lake: "Sam Rayburn Reservoir",
      lakePath: "/fishing/lakes/sam-rayburn-reservoir",
      sourceUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/sam_rayburn/",
      fact: "TPWD highlights summer low-light topwater opportunities; after sunrise, bass often move toward vegetation edges, brush piles, deeper ledges and channels.",
      implication: "Fish a reachable edge at first light, then change depth or use a weedless presentation instead of continuing a surface retrieve over inactive water.",
    },
    choice: "When fish miss the bait, pause and try a changed cadence once. When surface feeding stops, inspect the next depth band before swapping colors.",
    limit: "Cloud cover and low light are habitat clues, not current conditions. Canyon Lake's TPWD profile also carries a fish-consumption advisory and zebra-mussel warning: check those notices separately.",
  },
  trolling: {
    headline: "Conroe hybrids and Texoma stripers require different searches",
    intro: "Open-water trolling works only when the target species and the lure's actual running depth agree. These two fisheries illustrate why the target comes first.",
    first: {
      lake: "Lake Conroe",
      lakePath: "/fishing/lakes/lake-conroe",
      sourceUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/conroe/",
      fact: "TPWD identifies trolling open water as a common way anglers target hybrid striped bass; the upper river has standing timber that can become a navigation hazard.",
      implication: "Look for open-water bait and fish before setting a repeatable, modest lure spread. Avoid treating an upper-river timber route as a normal open-water trolling lane.",
    },
    second: {
      lake: "Lake Texoma",
      lakePath: "/fishing/lakes/lake-texoma",
      sourceUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/texoma/",
      fact: "TPWD notes that striped bass can be caught by trolling deep-running lures near main-lake river-channel flats after their spring spawning run.",
      implication: "Use channel proximity and marked fish to choose a pass, then change one variable at a time: speed, line length or lure depth.",
    },
    choice: "Write down the first successful or unsuccessful pass as boat speed, line length, approximate target depth and location. Repeat it before changing several variables together.",
    limit: "Hybrid striped bass at Conroe and striped bass at Texoma are different targets. This is not a live fish location or permission to ignore boating, gear or water-specific restrictions.",
  },
};

export const texasFishingTechniqueScenarios = [
  {
    water: "Sam Rayburn Reservoir",
    sourceUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/sam_rayburn/",
    condition: "Summer: surface activity fades after daylight",
    firstMethod: "Topwater",
    firstHref: "/fishing/techniques/topwater",
    nextMethod: "Soft plastics",
    nextHref: "/fishing/techniques/soft-plastics",
    why: "TPWD describes low-light topwater opportunities, then bass using vegetation, brush and deeper ledges after sunrise.",
  },
  {
    water: "Lake Fork",
    sourceUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/fork/",
    condition: "Spring: largemouth along spawning shorelines",
    firstMethod: "Spinnerbaits",
    firstHref: "/fishing/techniques/spinnerbaits",
    nextMethod: "Soft plastics",
    nextHref: "/fishing/techniques/soft-plastics",
    why: "Both presentations appear in TPWD's spring tactics; use the moving lure to check reachable cover, then slow down if fish are not chasing.",
  },
  {
    water: "Canyon Lake",
    sourceUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/canyon/",
    condition: "Rocky point: early surface window ends",
    firstMethod: "Topwater",
    firstHref: "/fishing/techniques/topwater",
    nextMethod: "Crankbaits",
    nextHref: "/fishing/techniques/crankbaits",
    why: "TPWD identifies early/late surface opportunities as well as crankbait use along rocky main-lake points.",
  },
  {
    water: "Lake Texoma",
    sourceUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/texoma/",
    condition: "Switching from shoreline bass to open-water stripers",
    firstMethod: "Crankbaits",
    firstHref: "/fishing/techniques/crankbaits",
    nextMethod: "Trolling",
    nextHref: "/fishing/techniques/trolling",
    why: "TPWD separates shoreline/structure tactics for black bass from deep-lure trolling possibilities for striped bass after the spring run.",
  },
  {
    water: "Lake Conroe",
    sourceUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/conroe/",
    condition: "Choosing between dock bass and open-water hybrids",
    firstMethod: "Soft plastics",
    firstHref: "/fishing/techniques/soft-plastics",
    nextMethod: "Trolling",
    nextHref: "/fishing/techniques/trolling",
    why: "TPWD describes dock-oriented bass tactics separately from trolling for hybrid striped bass in open water.",
  },
] as const;
