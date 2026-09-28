import type { PublishedFishingTechniqueSlug } from "./technique-routing";

type RelatedTechnique = { slug: PublishedFishingTechniqueSlug; label: string; reason: string };

export const relatedFishingTechniques: Record<PublishedFishingTechniqueSlug, RelatedTechnique[]> = {
  "soft-plastics": [
    { slug: "spinnerbaits", label: "Spinnerbaits", reason: "A moving single-hook option for vegetation, timber, wind and stained water." },
    { slug: "crankbaits", label: "Crankbaits", reason: "A faster search presentation for points, rock, vegetation edges and depth breaks." },
    { slug: "topwater", label: "Topwater", reason: "A surface option for low light, schooling fish and vegetation openings." }
  ],
  "crankbaits": [
    { slug: "spinnerbaits", label: "Spinnerbaits", reason: "Another reaction presentation that handles shallow cover and stained water well." },
    { slug: "soft-plastics", label: "Soft Plastics", reason: "Slow down around the same cover after a moving-bait pass." },
    { slug: "topwater", label: "Topwater", reason: "Shift to the surface when fish are feeding upward or light levels are low." }
  ],
  "spinnerbaits": [
    { slug: "crankbaits", label: "Crankbaits", reason: "Cover water along points, rock and vegetation edges at controlled depths." },
    { slug: "soft-plastics", label: "Soft Plastics", reason: "Follow up precise pieces of cover with a slower weedless presentation." },
    { slug: "topwater", label: "Topwater", reason: "Work the same shallow zones when fish are willing to feed at the surface." }
  ],
  "topwater": [
    { slug: "spinnerbaits", label: "Spinnerbaits", reason: "Stay shallow with a subsurface moving bait when fish stop committing on top." },
    { slug: "crankbaits", label: "Crankbaits", reason: "Reach the same points and edges deeper in the water column." },
    { slug: "soft-plastics", label: "Soft Plastics", reason: "Slow down around shade, grass and isolated cover after the surface bite fades." }
  ],
  "trolling": [
    { slug: "vertical-jigging", label: "Vertical Jigging", reason: "Switch from covering water to fishing directly below the boat once fish are located." },
    { slug: "live-bait", label: "Live Bait", reason: "Present natural forage at controlled depth around open-water schools." },
    { slug: "crankbaits", label: "Crankbaits", reason: "Use diving hard baits when depth and speed remain the core problem." }
  ],
  "vertical-jigging": [
    { slug: "trolling", label: "Trolling", reason: "Cover more water when fish are scattered rather than concentrated below the boat." },
    { slug: "live-bait", label: "Live Bait", reason: "Hold natural bait at a precise depth when fish are visible on sonar." },
    { slug: "jigs-and-minnows", label: "Jigs and Minnows", reason: "A closely related depth-control approach for crappie and cover-oriented fish." }
  ],
  "jigs-and-minnows": [
    { slug: "vertical-jigging", label: "Vertical Jigging", reason: "Use the same depth-control discipline with spoons, slabs and other vertical lures." },
    { slug: "live-bait", label: "Live Bait", reason: "Keep natural bait at the exact depth fish are using around cover or open water." },
    { slug: "trolling", label: "Trolling", reason: "Cover water when schools are roaming rather than fixed to one brush pile or bridge target." }
  ],
  "live-bait": [
    { slug: "trolling", label: "Trolling", reason: "Move through open water when fish and forage are spread across a broad zone." },
    { slug: "vertical-jigging", label: "Vertical Jigging", reason: "Stay directly over marked fish when precision matters more than coverage." },
    { slug: "jigs-and-minnows", label: "Jigs and Minnows", reason: "A crappie-focused alternative for brush, timber, bridges and suspended fish." }
  ],
  "cut-bait": [
    { slug: "live-bait", label: "Live Bait", reason: "Use natural movement instead of scent-driven cut bait where legal and appropriate." },
    { slug: "trolling", label: "Trolling", reason: "A contrasting open-water search method when fish are roaming rather than holding to channels or current." },
    { slug: "vertical-jigging", label: "Vertical Jigging", reason: "A precise alternative when fish are concentrated below the boat instead of moving through a scent line." }
  ]
};
