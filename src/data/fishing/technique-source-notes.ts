import type { PublishedFishingTechniqueSlug } from "./technique-routing";

/**
 * TPWD-specific editorial interpretation. Source observations are paraphrases
 * of evergreen TPWD reservoir guidance, not field-tested claims or bite reports.
 */
export type FishingTechniqueSourceNote = {
  lake: string;
  officialUrl: string;
  officialFinding: string;
  interpretation: string;
  limitation: string;
};
export const fishingTechniqueSourceNotes: Partial<Record<PublishedFishingTechniqueSlug, FishingTechniqueSourceNote>> = {
  "soft-plastics": {
    lake: "Sam Rayburn Reservoir",
    officialUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/sam_rayburn/",
    officialFinding: "TPWD describes summer bass concentrating near vegetation edges, brush and deep ledges, where plastic worms and Carolina rigs are established options.",
    interpretation: "That changes the first question from 'Which color?' to 'Can this rig reach the cover without fouling?' A weedless Texas rig makes sense around vegetation; a Carolina rig can search a broader ledge.",
    limitation: "This is a seasonal habitat example, not evidence that a particular rig is producing fish there today.",
  },
  "crankbaits": {
    lake: "Lake Texoma",
    officialUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/texoma/index.phtml",
    officialFinding: "TPWD describes crankbaits along rocky shorelines in fall and deeper-diving crankbaits around offshore structure when bass move away from shore.",
    interpretation: "A shallow-running lure and a deep diver are not interchangeable just because both are called crankbaits. Choose a running range that reaches the structure without constantly hanging up.",
    limitation: "Lure labels give approximate running depth, not a measurement of where fish are on a specific trip.",
  },
  spinnerbaits: {
    lake: "Lake Fork",
    officialUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/fork/index.phtml",
    officialFinding: "TPWD identifies spinnerbaits among common spring bass lures along shoreline spawning areas at Lake Fork.",
    interpretation: "Use that as a cover-and-season clue, not an instruction to throw the same spinnerbait everywhere. Adjust blade lift and weight so the bait travels beside the cover without rising out of the strike zone.",
    limitation: "The TPWD example supports a general largemouth-bass use; it does not verify smallmouth or Guadalupe bass associations for every lake.",
  },
  topwater: {
    lake: "Canyon Lake",
    officialUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/canyon/index.phtml",
    officialFinding: "TPWD lists early morning and evening topwater opportunities for largemouth bass and notes that cloudy conditions can extend surface activity.",
    interpretation: "Start with light, shade and surface activity. A walking bait can cover open water; a popper lets you slow down beside a point or target. If fish stop rising, switch depth rather than extending a dead surface pattern.",
    limitation: "Cloud cover and time of day are clues, not guarantees; check wind, water conditions and actual fish activity.",
  },
  trolling: {
    lake: "Lake Conroe",
    officialUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/conroe/index.phtml",
    officialFinding: "TPWD describes open-water trolling as a common way Lake Conroe anglers catch hybrid striped bass.",
    interpretation: "Locate the fish and bait before selecting lure depth. A consistent line length and boat speed make repeated passes comparable; adding lines before controlling the first lure makes diagnosis harder.",
    limitation: "The documented Conroe example is for hybrid striped bass. It does not establish black-bass trolling for every reservoir or promise a current bite.",
  },
};
