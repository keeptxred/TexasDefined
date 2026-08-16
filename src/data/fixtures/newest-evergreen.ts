import { articleInternalLinks } from "../article-internal-links";
import { winklerCountyKermitWinkOilArticle } from "./winkler-county-kermit-wink-oil";

const supportLinksByPillar: Record<string, Array<{ href: string; label: string; description: string }>> = {
  "texas-rivers-explained": [
    { href: "/article/texas-river-basins-guide", label: "Texas river basins explained", description: "Go from individual rivers to the watersheds that connect tributaries, reservoirs, cities and the Gulf." },
  ],
  "texas-lakes-reservoirs-explained": [
    { href: "/article/texas-river-basins-guide", label: "See the basin behind the reservoir", description: "Understand the upstream watershed that feeds each reservoir and the downstream system it belongs to." },
  ],
  "texas-farm-to-market-roads-explained": [
    { href: "/article/texas-highway-designations-explained", label: "Texas highway designations explained", description: "Decode FM, RM, SH, Loop, Spur, business routes, Park Roads and the rest of the state highway alphabet." },
    { href: "/article/texas-settlement-patterns-explained", label: "How transportation reshaped Texas settlement", description: "See how rural roads layered onto rivers, county seats, railroads and older settlement corridors." },
  ],
  "texas-courthouses-town-square": [
    { href: "/article/texas-courthouse-architecture-guide", label: "Texas courthouse architecture", description: "Read the towers, domes, masonry and civic styles that make county seats look so different." },
    { href: "/article/texas-settlement-patterns-explained", label: "Why towns formed where they did", description: "Connect courthouse squares with water, farming, ranching, railroads and highway-era growth." },
  ],
  "texas-wildflowers-guide": [
    { href: "/article/texas-ecoregions-habitats-guide", label: "Texas ecoregions explained", description: "See how rainfall, soils and habitat regions change the wildflower calendar across the state." },
  ],
  "texas-trees-guide": [
    { href: "/article/texas-ecoregions-habitats-guide", label: "The habitat map behind Texas trees", description: "Connect pine, oak, mesquite and juniper communities to the state's major natural regions." },
  ],
  "texas-home-architecture-regions": [
    { href: "/article/texas-courthouse-architecture-guide", label: "Compare Texas civic architecture", description: "See how public buildings reflect era, materials and regional identity alongside residential architecture." },
    { href: "/article/texas-settlement-patterns-explained", label: "The settlement map behind regional homes", description: "Connect migration, town growth and transportation history with the built landscape." },
  ],
  "buying-land-in-texas-guide": [
    { href: "/article/texas-ecoregions-habitats-guide", label: "Know the ecoregion before the parcel", description: "Use rainfall, soils, vegetation and regional habitat as context before evaluating tract-level conditions." },
  ],
  "texas-wildlife-guide": [
    { href: "/article/texas-ecoregions-habitats-guide", label: "Why Texas wildlife changes by region", description: "Use the ecoregion map to understand the habitat systems behind the state's wildlife distribution." },
  ],
  "texas-cultural-regions-explained": [
    { href: "/article/texas-settlement-patterns-explained", label: "Texas settlement patterns explained", description: "Trace how water, farming, ranching, county seats, railroads and highways created the communities behind regional culture." },
  ],
};

for (const [slug, additions] of Object.entries(supportLinksByPillar)) {
  const existing = articleInternalLinks[slug] ?? [];
  articleInternalLinks[slug] = [
    ...existing,
    ...additions.filter((addition) => !existing.some((link) => link.href === addition.href)),
  ];
}

export const newestEvergreenArticles = [
  winklerCountyKermitWinkOilArticle,
];