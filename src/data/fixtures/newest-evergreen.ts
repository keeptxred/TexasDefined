import { articleInternalLinks } from "../article-internal-links";
import { texasFlagEtiquetteArticle } from "./texas-flag-etiquette";
import { texasFlagHistoryArticle } from "./texas-flag-history";
import { winklerCountyArticleStub } from "./winkler-county-article-stub";

// Texas Explained support bodies formerly registered here via ...texasExplainedSupportArticles
// now live behind lazyEvergreenArticleStubs/loadLazyEvergreenArticle; this file only owns lightweight pillar topology.
const supportLinksByPillar: Record<string, Array<{ href: string; label: string; description: string }>> = {
  "texas-rivers-explained": [
    { href: "/article/texas-river-basins-guide", label: "Texas river basins explained", description: "Go from individual rivers to the watersheds that connect tributaries, reservoirs, cities and the Gulf." },
    { href: "/article/texas-aquifers-springs-explained", label: "Texas aquifers and springs", description: "Add the groundwater systems and springs that feed many Texas rivers and communities." },
    { href: "/article/texas-brazos-river-guide", label: "The Brazos River explained", description: "Follow Texas' highest-average-flow river from its upper-basin water pressures to the Gulf." },
    { href: "/article/texas-colorado-river-guide", label: "The Texas Colorado River explained", description: "Connect West Texas, Hill Country tributaries, Austin and the Highland Lakes inside one basin." },
    { href: "/article/texas-guadalupe-river-guide", label: "The Guadalupe River explained", description: "See how springs, aquifers, Canyon Lake and Hill Country growth interact in one river system." },
    { href: "/article/texas-trinity-river-guide", label: "The Trinity River explained", description: "Read the river-and-reservoir network behind Dallas-Fort Worth and downstream water demand." },
    { href: "/article/texas-rio-grande-river-guide", label: "The Rio Grande explained", description: "Trace Texas' largest basin through interstate, international and arid-region water constraints." },
  ],
  "texas-lakes-reservoirs-explained": [
    { href: "/article/texas-river-basins-guide", label: "See the basin behind the reservoir", description: "Understand the upstream watershed that feeds each reservoir and the downstream system it belongs to." },
    { href: "/article/texas-aquifers-springs-explained", label: "See the groundwater beneath the water map", description: "Compare visible reservoirs with aquifers, recharge and spring-fed surface water." },
    { href: "/article/lake-buchanan-water-system-guide", label: "Lake Buchanan as a water system", description: "See how upper Colorado River storage anchors the Highland Lakes system." },
    { href: "/article/lake-travis-water-system-guide", label: "Lake Travis as a water system", description: "Understand flood-control space, water storage and Mansfield Dam upstream from Austin." },
    { href: "/article/lake-whitney-water-system-guide", label: "Lake Whitney as a water system", description: "See how one federal Brazos reservoir combines flood control, supply, hydropower and recreation." },
    { href: "/article/possum-kingdom-water-system-guide", label: "Possum Kingdom as a water system", description: "Trace one of the Brazos basin's early multipurpose reservoir projects." },
    { href: "/article/toledo-bend-water-system-guide", label: "Toledo Bend as a two-state water system", description: "See how Texas and Louisiana share a huge Sabine River reservoir for water and power." },
  ],
  "texas-farm-to-market-roads-explained": [
    { href: "/article/texas-highway-designations-explained", label: "Texas highway designations explained", description: "Decode FM, RM, SH, Loop, Spur, business routes, Park Roads and the rest of the state highway alphabet." },
    { href: "/article/texas-settlement-patterns-explained", label: "How transportation reshaped Texas settlement", description: "See how rural roads layered onto rivers, county seats, railroads and older settlement corridors." },
    { href: "/article/texas-railroads-town-growth-explained", label: "How railroads remade the Texas map", description: "See the transportation network that reshaped towns before the highway era." },
    { href: "/article/texas-ranch-to-market-roads-explained", label: "Ranch-to-Market roads explained", description: "Understand what an RM designation actually means and why Ranch Road 1 is a separate exception." },
    { href: "/article/texas-loops-spurs-explained", label: "Texas Loops and Spurs explained", description: "Read the bypasses and branch connectors that organize traffic around and off the main corridor." },
    { href: "/article/texas-business-routes-explained", label: "Texas Business Routes explained", description: "See why an older highway alignment often keeps running through the center of town after a bypass opens." },
    { href: "/article/texas-park-recreational-roads-explained", label: "Park and Recreational Roads explained", description: "Decode the PR and RE systems that connect parks and recreation areas to the state highway network." },
    { href: "/article/texas-historic-memorial-highways-explained", label: "Historic routes and memorial highways", description: "Separate the numbered highway designation from historic-route signs and honorary highway names." },
  ],
  "texas-courthouses-town-square": [
    { href: "/article/texas-courthouse-architecture-guide", label: "Texas courthouse architecture", description: "Read the towers, domes, masonry and civic styles that make county seats look so different." },
    { href: "/article/texas-settlement-patterns-explained", label: "Why towns formed where they did", description: "Connect courthouse squares with water, farming, ranching, railroads and highway-era growth." },
    { href: "/article/texas-main-street-downtowns-guide", label: "Texas Main Streets explained", description: "Follow courthouse commerce into storefront blocks, depots and traditional downtowns." },
  ],
  "texas-wildflowers-guide": [
    { href: "/article/texas-ecoregions-habitats-guide", label: "Texas ecoregions explained", description: "See how rainfall, soils and habitat regions change the wildflower calendar across the state." },
    { href: "/article/texas-prairies-grasslands-guide", label: "Texas prairies and grasslands", description: "Understand the open native habitats behind many of the state's best-known wildflowers." },
    { href: "/things-unique-to-texas/wildlife-landscape", label: "Texas wildlife, plants & geography", description: "Connect wildflowers with the broader collection of Texas animals, trees, landscapes and regional natural icons." },
  ],
  "texas-trees-guide": [
    { href: "/article/texas-ecoregions-habitats-guide", label: "The habitat map behind Texas trees", description: "Connect pine, oak, mesquite and juniper communities to the state's major natural regions." },
    { href: "/article/texas-prairies-grasslands-guide", label: "Where Texas is naturally open", description: "Compare wooded regions with prairie systems and the forces that keep grasslands open." },
    { href: "/things-unique-to-texas/wildlife-landscape", label: "Texas wildlife, plants & geography", description: "Move from individual tree species into the larger set of landscapes, animals and plants that define Texas." },
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
    { href: "/things-unique-to-texas/wildlife-landscape", label: "Texas wildlife, plants & geography", description: "Browse the statewide icon collection that connects horned lizards, cranes, ocelots, javelinas and other species to Texas identity." },
  ],
  "texas-cultural-regions-explained": [
    { href: "/article/texas-settlement-patterns-explained", label: "Texas settlement patterns explained", description: "Trace how water, farming, ranching, county seats, railroads and highways created the communities behind regional culture." },
    { href: "/article/texas-railroads-town-growth-explained", label: "Railroads and the growth of Texas towns", description: "See how transportation redirected migration, commerce and regional development." },
    { href: "/article/texas-main-street-downtowns-guide", label: "Historic downtowns as cultural records", description: "Read migration, commerce and civic identity in the surviving fabric of Texas Main Streets." },
    { href: "/san-antonio-puffy-taco-history", label: "San Antonio puffy tacos", description: "See how one West Side food tradition became a citywide symbol through Mexican American and Tex-Mex culture." },
    { href: "/barbacoa-big-red-san-antonio", label: "Barbacoa & Big Red in San Antonio", description: "Follow a Sunday family ritual where an older barbacoa tradition met a later Waco-born soda and became local shorthand." },
    { href: "/texas-ranch-water-guide", label: "Texas Ranch Water", description: "Use the disputed cocktail origin story to see how regional folklore, Austin restaurant culture and Texas adoption overlap." },
    { href: "/things-unique-to-texas/culture-music", label: "Texas cultural traditions & music", description: "Connect regional settlement and migration history to music, dance halls, school rituals, Juneteenth and other living traditions." },
  ],
  "texas-barbecue-styles-explained": [
    { href: "/texas-food-history", label: "Texas Food History", description: "Place barbecue inside the larger story of cattle, migration, border foodways, immigrant communities and Texas-born brands." },
    { href: "/texas-food-trail", label: "The Texas Food Trail", description: "Turn regional barbecue styles into a broader road trip through the foods that define different parts of Texas." },
  ],
  "kolache-or-klobasnek-texas-story": [
    { href: "/texas-food-history", label: "Texas Food History", description: "Connect Czech-Texan pastries with the wider history of migration, adaptation and regional food identity." },
    { href: "/german-czech-texas-towns", label: "German & Czech Texas towns", description: "Follow the pastry tradition back to the communities, churches, dance halls and festivals that kept it visible." },
  ],
  "caddo-lake-cypress-morning": [
    { href: "/things-unique-to-texas/natural-wonders", label: "Texas natural wonders & parks", description: "Put Caddo Lake's cypress-and-bayou landscape beside the desert mountains, canyons, springs, coast and other places that define the state's geography." },
    { href: "/texas-natural-wonders-bucket-list", label: "Texas Natural Wonders Bucket List", description: "Compare Caddo Lake with eleven other landscapes chosen to show the range of Texas terrain and ecosystems." },
  ],
  "galveston-county-island-port-juneteenth-texas": [
    { href: "/things-unique-to-texas/culture-music", label: "Texas cultural traditions & music", description: "Connect Galveston's Juneteenth history with the broader collection of Texas traditions, celebrations, music and community rituals." },
    { href: "/texas-history", label: "Texas history", description: "Continue from Juneteenth into the people, places and turning points that shaped the state." },
  ],
};

for (const [slug, additions] of Object.entries(supportLinksByPillar)) {
  const existing = articleInternalLinks[slug] ?? [];
  articleInternalLinks[slug] = [
    ...existing,
    ...additions.filter((addition) => !existing.some((link) => link.href === addition.href)),
  ];
}

const flagHistoryLink = {
  href: "/article/history-of-the-texas-flag",
  label: "The history of the Texas flag",
  description: "Follow the Lone Star from revolution-era proposals and the Burnet flag to the Republic's 1839 design and today's state flag.",
};

for (const slug of [
  "six-flags-over-texas-meaning",
  "texas-revolution-historic-sites-road-trip",
]) {
  const existing = articleInternalLinks[slug] ?? [];
  articleInternalLinks[slug] = existing.some((link) => link.href === flagHistoryLink.href)
    ? existing
    : [...existing, flagHistoryLink];
}

const flagArticleLinks = articleInternalLinks["history-of-the-texas-flag"] ?? [];
const flagArticleAdditions = [
  {
    href: "/article/texas-flag-etiquette-display-guide",
    label: "Texas flag display & etiquette",
    description: "Use the Texas Flag Code for position with the U.S. flag, vertical display, half-staff, folding, the pledge and retirement.",
  },
  {
    href: "/texas-symbols",
    label: "Official Texas symbols",
    description: "See the legislatively designated birds, plants, foods, wildlife and cultural symbols Texas recognizes today.",
  },
  {
    href: "/things-unique-to-texas/slang-folklore",
    label: "Texas symbols, sayings & folklore",
    description: "Put the Lone Star flag beside the sayings, traditions and identity markers Texans recognize instantly.",
  },
];
articleInternalLinks["history-of-the-texas-flag"] = [
  ...flagArticleLinks,
  ...flagArticleAdditions.filter((addition) => !flagArticleLinks.some((link) => link.href === addition.href)),
];

export const newestEvergreenArticles = [
  winklerCountyArticleStub,
  texasFlagHistoryArticle,
  texasFlagEtiquetteArticle,
];