import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

export const FISHING_STRUCTURE_PATH = "/fishing/structure";
export const FISHING_VEGETATION_PATH = "/fishing/vegetation";
export const FISHING_HABITAT_VERIFIED_AT = "2026-09-28";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export type FishingHabitatGuide = {
  path: string;
  eyebrow: string;
  title: string;
  metaTitle: string;
  description: string;
  lede: string;
  quickAnswer: string;
  sections: Array<{
    title: string;
    paragraphs: string[];
    bullets?: string[];
  }>;
  decisions: Array<{ situation: string; read: string; technique: string; href: string }>;
  sources: Array<{ name: string; note: string; url: string }>;
  faq: Array<{ question: string; answer: string }>;
  related: Array<{ label: string; href: string; description: string }>;
};

export const fishingHabitatGuides: Record<"structure" | "vegetation", FishingHabitatGuide> = {
  structure: {
    path: FISHING_STRUCTURE_PATH,
    eyebrow: "Read the water",
    title: "Fishing Structure and Cover in Texas Lakes",
    metaTitle: "Texas Fishing Structure & Cover — Points, Ledges, Channels, Brush",
    description: "Learn the difference between fishing structure and cover, then use points, ledges, creek channels, roadbeds, timber, brush and habitat reefs to choose better Texas fishing targets.",
    lede: "Structure tells you how the lake is shaped. Cover tells you what fish can use on that shape. Read both together and a huge reservoir becomes a smaller set of repeatable targets.",
    quickAnswer: "In practical fishing language, structure is the shape or contour of the lake bottom — points, humps, ledges, channel bends, drop-offs, roadbeds and similar features. Cover is the object or habitat on or near that structure — vegetation, standing timber, brush, docks, riprap or installed habitat. Anglers often use the words loosely, but separating them makes map reading and lure selection much easier.",
    sections: [
      {
        title: "Start With the Shape of the Lake",
        paragraphs: [
          "A point is a piece of shoreline or underwater terrain that projects into deeper water. A hump is an offshore high spot. A ledge or drop is a faster depth change. A creek channel is the submerged path of the drainage that existed before a reservoir filled. Roadbeds and old foundations can create additional hard edges and depth changes.",
          "The useful question is not whether one feature is always better than another. It is where depth, travel routes, forage and usable cover intersect on the lake you are fishing."
        ],
        bullets: [
          "Points connect shallow and deep water and can give fish several depth choices without moving far.",
          "Channel bends and swings can place deeper water close to a bank, flat or piece of cover.",
          "Humps and roadbeds create offshore edges that can concentrate fish when they are not shoreline-oriented.",
          "Ledges and drop-offs are most useful when they connect to another feature rather than existing as an isolated contour line."
        ]
      },
      {
        title: "Then Add Cover",
        paragraphs: [
          "A bare point and a point with brush, rock or vegetation are not the same target. Cover can provide shade, ambush positions, protection for prey and a physical edge to cast toward.",
          "Some of the highest-value targets are combinations: a vegetation edge crossing a point, brush on a ledge, timber beside a creek channel, riprap beside deeper water or a dock positioned near a break."
        ]
      },
      {
        title: "Water Level Can Change the Same Spot",
        paragraphs: [
          "The underlying point, channel or roadbed does not disappear when lake level changes, but its fishing value can shift. Higher water can flood terrestrial vegetation and move usable cover shallower. Falling water can expose shoreline cover, reduce vegetation or move the productive edge farther from the bank.",
          "Use the current lake level, recent reports and the lake's own cover-and-structure description before assuming an old waypoint still fishes the same way."
        ]
      },
      {
        title: "Fish Habitat Reefs Are Cover, Not a Replacement for Map Reading",
        paragraphs: [
          "Texas Parks & Wildlife Department publishes locations for installed fish habitat structures in reservoirs across the state. Those reefs and attractors can create useful cover and foraging areas, but their best context still comes from surrounding depth, contour and seasonal fish position.",
          "Use TPWD's Habitat Structure Viewer for official coordinates and installation details instead of relying on copied waypoint lists."
        ]
      }
    ],
    decisions: [
      { situation: "Rocky point, roadbed or hard bottom", read: "Trace the feature into deeper water and look for the first major depth change.", technique: "Crankbaits", href: "/fishing/techniques/crankbaits" },
      { situation: "Brush or timber sitting on a break", read: "Treat the contour as the travel route and the cover as the precise target.", technique: "Soft Plastics", href: "/fishing/techniques/soft-plastics" },
      { situation: "Fish marked directly under the boat", read: "Depth and boat position matter more than shoreline appearance.", technique: "Vertical Jigging", href: "/fishing/techniques/vertical-jigging" },
      { situation: "Open-water channel edge or contour", read: "Follow a repeatable depth or contour instead of wandering across open water.", technique: "Trolling", href: "/fishing/techniques/trolling" },
      { situation: "Brush pile holding crappie", read: "Keep the bait at or just above the level of the fish rather than automatically on bottom.", technique: "Jigs and Minnows", href: "/fishing/techniques/jigs-and-minnows" },
      { situation: "Channel or flat used by catfish", read: "Use the contour to identify travel water, then position bait where scent can move through it.", technique: "Cut Bait", href: "/fishing/techniques/cut-bait" }
    ],
    sources: [
      { name: "TPWD — Locations of Fish Habitat Structures", note: "Official statewide habitat-structure viewer and downloadable coordinates for installed habitat in Texas reservoirs.", url: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/fish_attractors.phtml" },
      { name: "TPWD — Types of Fish Habitat Structure", note: "Explains brush reefs and other habitat structures used by TPWD and partners.", url: "https://tpwd.texas.gov/fishboat/fish/management/habitat/fish_attractor_types.phtml" },
      { name: "TPWD — Sam Rayburn Reservoir", note: "A useful Texas example showing vegetation edges, flats, humps, creek channels, timber, brush and installed attractors in one lake profile.", url: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/sam_rayburn/" }
    ],
    faq: [
      { question: "What is the difference between fishing structure and cover?", answer: "Structure is the shape or contour of the waterbody, such as a point, channel, hump or ledge. Cover is a physical object or habitat fish can use, such as vegetation, timber, brush, docks or riprap." },
      { question: "Are fish attractors the same thing as structure?", answer: "They are better treated as cover or habitat placed on a location. The surrounding contour and depth still matter when deciding how to fish them." },
      { question: "Do old waypoints stay productive when a lake rises or falls?", answer: "Not necessarily. The underlying contour remains, but depth, vegetation, shoreline cover and fish position can change with water level and season." }
    ],
    related: [
      { label: "Aquatic vegetation", href: FISHING_VEGETATION_PATH, description: "Read grass lines, hydrilla, reeds, flooded plants and vegetation edges as fishing habitat." },
      { label: "Fishing techniques", href: "/fishing/techniques", description: "Match the location you found to a presentation built for that depth and cover." },
      { label: "Fishing reports", href: "/fishing/reports", description: "Pair durable structure knowledge with current conditions and recent observations." }
    ]
  },
  vegetation: {
    path: FISHING_VEGETATION_PATH,
    eyebrow: "Fish the habitat",
    title: "Fishing Aquatic Vegetation in Texas",
    metaTitle: "Texas Aquatic Vegetation Fishing Guide — Grass, Hydrilla, Reeds & Edges",
    description: "Learn how submerged, emergent, floating and flooded vegetation creates Texas fish habitat, how water levels change it, and which fishing techniques fit different plant edges and cover.",
    lede: "Vegetation is not one target. Submerged grass, reeds, lily pads and newly flooded terrestrial plants create different edges, depths and openings. The useful skill is learning which part of the vegetation connects fish to depth, forage and movement.",
    quickAnswer: "Aquatic vegetation is cover and habitat, not merely something to cast at. Submerged plants can create outside edges and holes; emergent plants define shallow shoreline cover; floating plants create shade and overhead cover; rising water can flood terrestrial plants that become temporary habitat. The productive part is often the edge, opening, point or depth change where vegetation meets another feature.",
    sections: [
      {
        title: "Know What Kind of Vegetation You Are Looking At",
        paragraphs: [
          "Submerged vegetation grows below the surface and can form broad beds with visible or sonar-defined inside and outside edges. Emergent vegetation grows from shallow water above the surface. Floating or floating-leaved plants create overhead shade and mat-like cover. Flooded terrestrial vegetation appears when rising water covers shoreline bushes, grass or trees.",
          "Texas reservoirs vary widely. Some hold extensive submerged vegetation; others are dominated by timber, rock or artificial habitat. Check the current lake page instead of assuming every reservoir has the same plant community."
        ],
        bullets: [
          "Submerged beds: focus on outside edges, points, holes, drains and places where the bed meets deeper water.",
          "Emergent plants: look for cuts, points, isolated clumps and depth changes close to the plant line.",
          "Floating cover: shade and openings can matter more than the middle of an unbroken mat.",
          "Flooded terrestrial vegetation: newly inundated bushes and grass can create temporary shallow cover when water rises."
        ]
      },
      {
        title: "Fish the Edge Before You Fish the Entire Bed",
        paragraphs: [
          "A long grass line becomes more manageable when you identify irregularities. Turns, points, holes, isolated clumps and transitions from one plant type to another create edges fish can use.",
          "An outside vegetation edge that intersects a point, channel or drop can be especially useful because fish can move between cover and deeper water without traveling far."
        ]
      },
      {
        title: "Let the Plant Density Choose the Presentation",
        paragraphs: [
          "Open vegetation allows moving baits to run above, beside or through the plants. Denser cover favors weedless or single-hook presentations that can enter small openings. When fish are beneath floating cover or buried in thick vegetation, tackle strength and hook position matter more than finesse.",
          "Do not force one lure through every plant type. A technique that works over sparse submerged grass may be frustrating in thick reeds or matted cover."
        ]
      },
      {
        title: "Vegetation Is Dynamic",
        paragraphs: [
          "Plant abundance can change with lake level, water clarity, season, management and weather. TPWD notes on multiple reservoirs that water-level changes can alter available vegetation and flooded shoreline habitat.",
          "Native aquatic plants can provide fish and wildlife habitat, improve water quality and help reduce shoreline erosion. Some non-native plants can become nuisance species, so habitat value and management status are not the same thing. Use current TPWD lake and invasive-species information when moving boats, bait or aquatic material between waters."
        ]
      }
    ],
    decisions: [
      { situation: "Thick grass, reeds, brushy flooded plants", read: "Use a weedless presentation and target holes, edges or isolated pieces instead of dragging through everything.", technique: "Soft Plastics", href: "/fishing/techniques/soft-plastics" },
      { situation: "Windy or stained-water vegetation edge", read: "Run a single-hook moving bait beside or through sparse cover.", technique: "Spinnerbaits", href: "/fishing/techniques/spinnerbaits" },
      { situation: "Low-light surface activity over grass", read: "Work openings, lanes and outside edges where fish can feed upward.", technique: "Topwater", href: "/fishing/techniques/topwater" },
      { situation: "Sparse submerged vegetation with clean lanes", read: "Use a bait that can contact or narrowly clear the vegetation without staying buried in it.", technique: "Crankbaits", href: "/fishing/techniques/crankbaits" },
      { situation: "Crappie using deeper vegetation or nearby brush", read: "Control depth precisely and keep the bait above fish when they are suspended.", technique: "Jigs and Minnows", href: "/fishing/techniques/jigs-and-minnows" }
    ],
    sources: [
      { name: "TPWD — Native Aquatic Vegetation", note: "Describes TPWD and partner work establishing beneficial native aquatic plant communities in Texas reservoirs.", url: "https://tpwd.texas.gov/fishboat/fish/management/habitat/native-aquatic-plants.phtml" },
      { name: "TPWD — Sam Rayburn Reservoir", note: "Documents submerged aquatic vegetation, hydrilla, native plants, vegetation edges and water-level-driven habitat changes.", url: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/sam_rayburn/" },
      { name: "TPWD — Choke Canyon Reservoir", note: "A Texas example combining native aquatic vegetation, hydrilla, flooded cover, humps, roadbeds and points.", url: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/choke_canyon/" }
    ],
    faq: [
      { question: "Is hydrilla always bad for fishing?", answer: "Hydrilla can provide fish habitat, but it is also a non-native invasive plant that can create management problems. Fishing value and ecosystem-management status are different questions." },
      { question: "What part of a grass bed should I fish first?", answer: "Start with irregularities — outside edges, points, holes, drains, isolated clumps and places where vegetation meets deeper water or another piece of cover." },
      { question: "Why does vegetation disappear from a spot that used to have it?", answer: "Vegetation can change with lake level, water clarity, season, weather and management. Use the current lake profile and recent conditions instead of assuming an old grass line still exists." }
    ],
    related: [
      { label: "Structure and cover", href: FISHING_STRUCTURE_PATH, description: "Connect vegetation edges to points, channels, ledges, brush and depth changes." },
      { label: "Fishing techniques", href: "/fishing/techniques", description: "Choose a presentation that matches plant density, depth and fish position." },
      { label: "Fishing regulations", href: "/fishing/regulations", description: "Check current TPWD rules, including aquatic-invasive-species requirements, before moving between waters." }
    ]
  }
};

export function buildFishingHabitatHead(guide: FishingHabitatGuide) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", url: `${siteUrl}${guide.path}`, name: guide.title, description: guide.description, dateModified: FISHING_HABITAT_VERIFIED_AT },
      { "@type": "FAQPage", mainEntity: guide.faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Front page", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Fishing", item: `${siteUrl}/fishing` },
        { "@type": "ListItem", position: 3, name: guide.title, item: `${siteUrl}${guide.path}` }
      ] }
    ]
  };

  return {
    meta: buildMeta(texasDefinedBrand, { title: guide.metaTitle, description: guide.description, canonicalPath: guide.path }),
    links: [canonicalLink(texasDefinedBrand, guide.path)],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }]
  };
}
