import { articleInternalLinks } from "../article-internal-links";
import { winklerCountyArticleStub } from "./lazy-county-series";

// Texas Explained support bodies formerly registered here via ...texasExplainedSupportArticles
// now live behind lazyEvergreenArticleStubs/loadLazyEvergreenArticle; this file only owns lightweight pillar topology.
const supportLinksByPillar: Record<string, Array<{ href: string; label: string; description: string }>> = {
  "texas-rivers-explained": [
    { href: "/article/texas-river-basins-guide", label: "Texas river basins explained", description: "Go from individual rivers to the watersheds that connect tributaries, reservoirs, cities and the Gulf." },
    { href: "/article/texas-aquifers-springs-explained", label: "Texas aquifers and springs", description: "Add the groundwater systems and springs that feed many Texas rivers and communities." },
  ],
  "texas-lakes-reservoirs-explained": [
    { href: "/article/texas-river-basins-guide", label: "See the basin behind the reservoir", description: "Understand the upstream watershed that feeds each reservoir and the downstream system it belongs to." },
    { href: "/article/texas-aquifers-springs-explained", label: "See the groundwater beneath the water map", description: "Compare visible reservoirs with aquifers, recharge and spring-fed surface water." },
  ],
  "texas-farm-to-market-roads-explained": [
    { href: "/article/texas-highway-designations-explained", label: "Texas highway designations explained", description: "Decode FM, RM, SH, Loop, Spur, business routes, Park Roads and the rest of the state highway alphabet." },
    { href: "/article/texas-settlement-patterns-explained", label: "How transportation reshaped Texas settlement", description: "See how rural roads layered onto rivers, county seats, railroads and older settlement corridors." },
    { href: "/article/texas-railroads-town-growth-explained", label: "How railroads remade the Texas map", description: "See the transportation network that reshaped towns before the highway era." },
  ],
  "texas-courthouses-town-square": [
    { href: "/article/texas-courthouse-architecture-guide", label: "Texas courthouse architecture", description: "Read the towers, domes, masonry and civic styles that make county seats look so different." },
    { href: "/article/texas-settlement-patterns-explained", label: "Why towns formed where they did", description: "Connect courthouse squares with water, farming, ranching, railroads and highway-era growth." },
    { href: "/article/texas-main-street-downtowns-guide", label: "Texas Main Streets explained", description: "Follow courthouse commerce into storefront blocks, depots and traditional downtowns." },
  ],
  "texas-wildflowers-guide": [
    { href: "/article/texas-ecoregions-habitats-guide", label: "Texas ecoregions explained", description: "See how rainfall, soils and habitat regions change the wildflower calendar across the state." },
    { href: "/article/texas-prairies-grasslands-guide", label: "Texas prairies and grasslands", description: "Understand the open native habitats behind many of the state's best-known wildflowers." },
  ],
  "texas-trees-guide": [
    { href: "/article/texas-ecoregions-habitats-guide", label: "The habitat map behind Texas trees", description: "Connect pine, oak, mesquite and juniper communities to the state's major natural regions." },
    { href: "/article/texas-prairies-grasslands-guide", label: "Where Texas is naturally open", description: "Compare wooded regions with prairie systems and the forces that keep grasslands open." },
  ],
  "texas-home-architecture-regions": [
    { href: "/article/texas-courthouse-architecture-guide", label: "Compare Texas civic architecture", description: "See how public buildings reflect era, materials and regional identity alongside residential architecture." },
    { href: "/article/texas-settlement-patterns-explained", label: "The settlement map behind regional homes", description: "Connect migration, town growth and transportation history with the built landscape." },
    { href: "/article/texas-main-street-downtowns-guide", label: "Read the architecture of Texas downtowns", description: "Compare regional homes with storefronts and civic buildings in historic commercial centers." },
  ],
  "buying-land-in-texas-guide": [
    { href: "/article/texas-ecoregions-habitats-guide", label: "Know the ecoregion before the parcel", description: "Use rainfall, soils, vegetation and regional habitat as context before evaluating tract-level conditions." },
    { href: "/article/texas-rural-wells-water-guide", label: "Private wells in Texas", description: "Add well records, aquifers, water quality and local groundwater rules to rural due diligence." },
    { href: "/article/texas-aquifers-springs-explained", label: "Understand the aquifer beneath the parcel", description: "Put a prospective well inside the larger groundwater system that supplies it." },
  ],
  "texas-wildlife-guide": [
    { href: "/article/texas-ecoregions-habitats-guide", label: "Why Texas wildlife changes by region", description: "Use the ecoregion map to understand the habitat systems behind the state's wildlife distribution." },
    { href: "/article/texas-prairies-grasslands-guide", label: "Wildlife of open Texas", description: "See why native grassland structure matters to birds, pollinators and grazing wildlife." },
  ],
  "texas-cultural-regions-explained": [
    { href: "/article/texas-settlement-patterns-explained", label: "Texas settlement patterns explained", description: "Trace how water, farming, ranching, county seats, railroads and highways created the communities behind regional culture." },
    { href: "/article/texas-railroads-town-growth-explained", label: "Railroads and the growth of Texas towns", description: "See how transportation redirected migration, commerce and regional development." },
    { href: "/article/texas-main-street-downtowns-guide", label: "Historic downtowns as cultural records", description: "Read migration, commerce and civic identity in the surviving fabric of Texas Main Streets." },
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
  winklerCountyArticleStub,
];
