import type { ArticleInternalLink } from "./types";

const texasExplainedLink: ArticleInternalLink = {
  href: "/texas-explained",
  label: "Explore the full Texas Explained collection",
  description: "Connect this guide with the rivers, roads, towns, landscapes, wildlife, homes, land and cultural patterns that explain how Texas fits together.",
};

export const articleInternalLinks: Record<string, ArticleInternalLink[]> = {
  "texas-rivers-explained": [
    texasExplainedLink,
    {
      href: "/article/texas-lakes-reservoirs-explained",
      label: "Why almost all Texas lakes are man-made",
      description: "Follow the river system into the reservoirs Texas built for water supply, flood control, power and recreation.",
    },
    {
      href: "/article/texas-regions-explained",
      label: "Texas regions explained",
      description: "See how rainfall, elevation and drainage help separate East Texas, the Hill Country, the Plains, the coast and West Texas.",
    },
    {
      href: "/article/texas-wildlife-guide",
      label: "Texas wildlife by region",
      description: "Connect river corridors and watersheds with the deer, birds, bats, alligators and other wildlife Texans actually encounter.",
    },
    {
      href: "/article/texas-wildflowers-guide",
      label: "Texas wildflowers through the seasons",
      description: "See how rainfall, soils and geography shape the roadside and prairie blooms that change across the state.",
    },
  ],
  "texas-lakes-reservoirs-explained": [
    texasExplainedLink,
    {
      href: "/article/texas-rivers-explained",
      label: "The rivers that built Texas",
      description: "Start upstream with the major river basins that feed reservoirs, cities, farms, bays and ecosystems across Texas.",
    },
    {
      href: "/article/texas-wildlife-guide",
      label: "Texas wildlife: what lives around the water",
      description: "Move from reservoirs to the animals found along shorelines, wetlands, river corridors and the regions around them.",
    },
    {
      href: "/article/texas-regions-explained",
      label: "How Texas geography changes the water story",
      description: "Compare humid East Texas, limestone country, the High Plains, the coast and the arid Trans-Pecos through one statewide map.",
    },
    {
      href: "/article/buying-land-in-texas-guide",
      label: "Buying land in Texas",
      description: "Turn the water question practical with due diligence on wells, floodplain, access, septic, utilities, restrictions and rural property.",
    },
  ],
  "texas-farm-to-market-roads-explained": [
    texasExplainedLink,
    {
      href: "/article/texas-courthouses-town-square",
      label: "Why Texas towns grew around courthouse squares",
      description: "Follow the rural road network into the county seats and town centers that organized local government and commerce.",
    },
    {
      href: "/article/why-texas-has-254-counties",
      label: "Why Texas has 254 counties",
      description: "See why local government had to stay geographically close in a state this large—and why so many roads lead to county seats.",
    },
    {
      href: "/article/texas-cultural-regions-explained",
      label: "How migration created different Texases",
      description: "See how settlement routes, farming districts, ranch country and later transportation networks reinforced different regional cultures.",
    },
    {
      href: "/article/texas-regions-explained",
      label: "Texas regions explained",
      description: "Put FM and RM roads back onto the landscapes they cross, from Blackland Prairie farm country to the Hill Country and West Texas.",
    },
  ],
  "texas-courthouses-town-square": [
    texasExplainedLink,
    {
      href: "/article/why-texas-has-254-counties",
      label: "Why Texas has 254 counties",
      description: "Understand why county government became so geographically dense and why the county seat mattered so much to everyday Texans.",
    },
    {
      href: "/article/texas-farm-to-market-roads-explained",
      label: "Farm-to-market roads explained",
      description: "See how the state road network tied farms, ranches and smaller communities back to market towns and county seats.",
    },
    {
      href: "/article/texas-home-architecture-regions",
      label: "Why Texas buildings look different across the state",
      description: "Move from civic architecture to the climate, materials and settlement traditions that shaped ordinary Texas homes.",
    },
    {
      href: "/article/texas-cultural-regions-explained",
      label: "The cultural regions of Texas",
      description: "Layer migration, language, religion, farming, ranching and industry onto the town patterns visible around courthouse squares.",
    },
  ],
  "texas-wildflowers-guide": [
    texasExplainedLink,
    {
      href: "/article/texas-trees-guide",
      label: "Texas trees explained",
      description: "Pair the seasonal bloom calendar with the live oaks, pecans, mesquite, junipers and pines that define each region.",
    },
    {
      href: "/article/texas-wildlife-guide",
      label: "Texas wildlife: a practical field guide",
      description: "Connect native plant communities with the animals Texans encounter in neighborhoods, parks, ranch country and wild landscapes.",
    },
    {
      href: "/article/best-native-plants-texas-yard",
      label: "Best native plants for a Texas yard",
      description: "Turn statewide wildflower knowledge into practical choices for a yard that fits Texas heat, rainfall and local soils.",
    },
    {
      href: "/article/texas-regions-explained",
      label: "Texas regions explained",
      description: "See why the wildflower calendar and species mix change so sharply from the Piney Woods to the Plains, coast and desert.",
    },
  ],
  "buying-land-in-texas-guide": [
    texasExplainedLink,
    {
      href: "/article/texas-regions-explained",
      label: "Know the Texas region before the parcel",
      description: "Start with rainfall, soils, terrain and regional geography before narrowing rural-property due diligence to one tract.",
    },
    {
      href: "/article/texas-home-architecture-regions",
      label: "Why Texas homes look different across the state",
      description: "See how climate, local materials, foundations and settlement history affect what eventually gets built on Texas land.",
    },
    {
      href: "/article/muds-pids-hoas-special-districts-texas",
      label: "MUDs, PIDs, HOAs and special districts explained",
      description: "Compare acreage due diligence with the overlapping local entities and assessments that can shape suburban Texas property.",
    },
    {
      href: "/article/texas-lakes-reservoirs-explained",
      label: "Understand the state's reservoir system",
      description: "Put wells, surface water and floodplain questions into the larger system Texas built to store and move water.",
    },
  ],
  "texas-wildlife-guide": [
    texasExplainedLink,
    {
      href: "/article/texas-trees-guide",
      label: "Read the habitat by its trees",
      description: "Use pines, live oaks, junipers, pecans and mesquite as clues to the habitats and regions where different Texas wildlife appears.",
    },
    {
      href: "/article/texas-wildflowers-guide",
      label: "Texas wildflowers through the seasons",
      description: "Pair animal encounters with the changing plant communities, rainfall and flowering seasons around them.",
    },
    {
      href: "/article/texas-regions-explained",
      label: "Texas regions explained",
      description: "Understand why alligators, black bears, javelinas, prairie wildlife and desert species occupy very different parts of one state.",
    },
    {
      href: "/explore/outdoors",
      label: "Explore Texas outdoors",
      description: "Find parks and landscapes where wildlife can be observed responsibly in the habitats described in this guide.",
    },
  ],
  "texas-cultural-regions-explained": [
    texasExplainedLink,
    {
      href: "/article/texas-regions-explained",
      label: "Start with the physical regions of Texas",
      description: "Put settlement and migration onto the underlying map of forests, prairies, coast, limestone country, plains and desert.",
    },
    {
      href: "/article/texas-towns-german-czech-mexican-roots",
      label: "Texas towns with German, Czech and Mexican roots",
      description: "Zoom from statewide cultural regions into individual communities where settlement history remains especially visible.",
    },
    {
      href: "/article/texas-home-architecture-regions",
      label: "How migration shows up in Texas homes",
      description: "See cultural history expressed through building forms, materials, porches, masonry, ranch houses and regional residential traditions.",
    },
    {
      href: "/article/texas-courthouses-town-square",
      label: "The Texas courthouse square",
      description: "See how settlement, county government, commerce and architecture gave many Texas communities a recognizable civic center.",
    },
    {
      href: "/article/texas-barbecue-styles-explained",
      label: "Texas barbecue styles explained",
      description: "Follow migration and regional history into one of the clearest surviving maps of Texas food traditions.",
    },
  ],
  "texas-barbecue-styles-explained": [
    texasExplainedLink,
    {
      href: "/explore/food-bbq",
      label: "Explore Texas food & barbecue",
      description: "Keep going through the food, barbecue and regional traditions that shape the Texas table.",
    },
    {
      href: "/texas-history",
      label: "Dig into Texas history",
      description: "See how migration, ranching, communities and local traditions shaped the state beyond the pit.",
    },
    {
      href: "/explore",
      label: "Keep exploring Texas",
      description: "Find destinations, small towns, parks, lakes and other places worth knowing across the state.",
    },
  ],
  "best-native-plants-texas-yard": [
    texasExplainedLink,
    {
      href: "/home-garden",
      label: "More from Home & Garden",
      description: "Practical ideas for living well with Texas heat, weather, yards and homes.",
    },
    {
      href: "/article/texas-wildflowers-guide",
      label: "Texas wildflowers: what blooms, where and when",
      description: "Follow the statewide wildflower calendar from bluebonnet season through summer prairie color and fall blooms.",
    },
    {
      href: "/article/texas-trees-guide",
      label: "Texas trees explained",
      description: "Learn the live oaks, pecans, mesquite, junipers, pines and other trees that define different parts of Texas.",
    },
    {
      href: "/explore",
      label: "Explore the Texas landscape",
      description: "Discover the regions, parks, rivers and natural places that help explain why native plants vary so much across the state.",
    },
  ],
  "texas-regions-explained": [
    texasExplainedLink,
    {
      href: "/article/texas-trees-guide",
      label: "Read Texas by its trees",
      description: "See how pine, live oak, pecan, mesquite, juniper and other tree communities track the state's changing geography.",
    },
    {
      href: "/article/texas-home-architecture-regions",
      label: "Why Texas homes look different across the state",
      description: "See how climate, local materials and migration turned each Texas region into a different residential landscape.",
    },
    {
      href: "/article/buying-land-in-texas-guide",
      label: "Buying land in Texas",
      description: "Turn regional geography into a practical due-diligence checklist for access, water, septic, minerals, floodplain and taxes.",
    },
    {
      href: "/article/texas-cultural-regions-explained",
      label: "The cultural regions of Texas",
      description: "Layer migration, settlement, language, food, religion, ranching and industry onto the physical map of Texas.",
    },
  ],
  "why-texas-has-254-counties": [
    texasExplainedLink,
    {
      href: "/article/texas-courthouses-town-square",
      label: "Why the courthouse square mattered",
      description: "Follow the county map into the civic centers where local government, records, commerce and community life came together.",
    },
    {
      href: "/article/texas-farm-to-market-roads-explained",
      label: "How rural Texas roads fit the county map",
      description: "See how the state highway system connected farms and ranches with county seats, markets and larger transportation networks.",
    },
    {
      href: "/article/texas-cultural-regions-explained",
      label: "How settlement created different Texases",
      description: "Layer migration and regional culture onto the dense county structure that still organizes much of Texas government.",
    },
  ],
  "texas-hill-country-what-makes-it": [
    texasExplainedLink,
    {
      href: "/article/texas-rivers-explained",
      label: "The rivers that shape the Hill Country",
      description: "Connect limestone terrain and spring-fed landscapes to the wider river basins that drain central Texas.",
    },
    {
      href: "/article/texas-trees-guide",
      label: "Live oak, juniper and the Texas tree map",
      description: "See why the Hill Country's familiar tree communities look different from East Texas pine country, the Plains and the desert west.",
    },
    {
      href: "/article/texas-cultural-regions-explained",
      label: "The cultural regions layered onto the landscape",
      description: "Trace how migration, ranching and settlement history turned a physical region into a cultural one too.",
    },
  ],
  "texas-trees-guide": [
    texasExplainedLink,
    {
      href: "/article/texas-regions-explained",
      label: "Texas regions explained",
      description: "Connect the state's tree communities to the landscapes, weather and travel regions they help define.",
    },
    {
      href: "/article/best-native-plants-texas-yard",
      label: "Best native plants for a Texas yard",
      description: "Move from statewide tree identification to practical native planting at home.",
    },
    {
      href: "/article/texas-wildflowers-guide",
      label: "Texas wildflowers through the seasons",
      description: "Pair the canopy with the flowers and roadside color that change across Texas through the year.",
    },
    {
      href: "/article/texas-hill-country-what-makes-it",
      label: "What makes the Hill Country the Hill Country?",
      description: "See how limestone, live oak, juniper, rivers and ranch roads combine into one of Texas's most recognizable landscapes.",
    },
    {
      href: "/explore/outdoors",
      label: "Explore Texas outdoors",
      description: "Find parks and landscapes where the state's major tree communities are easy to see in person.",
    },
  ],
  "texas-home-architecture-regions": [
    texasExplainedLink,
    {
      href: "/article/buying-land-in-texas-guide",
      label: "Buying land before you build",
      description: "Check access, water, septic, utilities, minerals, restrictions, floodplain and taxes before choosing the future house site.",
    },
    {
      href: "/article/texas-cultural-regions-explained",
      label: "How migration created different Texases",
      description: "Connect regional house forms to the Indigenous, Tejano, Southern, African American, European immigrant and modern migration histories behind them.",
    },
    {
      href: "/article/texas-regions-explained",
      label: "Texas regions explained",
      description: "Connect residential design to the rainfall, soils, temperature, wind and landscapes that change across the state.",
    },
    {
      href: "/article/texas-courthouses-town-square",
      label: "The Texas courthouse square",
      description: "Compare everyday residential architecture with the civic buildings and town plans that anchored many county seats.",
    },
  ],
  "texas-foundation-care-clay-soil-drought": [
    {
      href: "/article/texas-home-architecture-regions",
      label: "Why Texas homes look different across the state",
      description: "Put foundation design into the larger regional story of Texas soils, materials, climate and building traditions.",
    },
  ],
  "texas-roofs-hail-wind-heat": [
    {
      href: "/article/texas-home-architecture-regions",
      label: "How Texas climate shaped the house",
      description: "See how roofs, porches, wall materials and house forms change from the coast to the Hill Country and West Texas.",
    },
  ],
  "texas-home-maintenance-calendar": [
    {
      href: "/article/texas-home-architecture-regions",
      label: "Understand the Texas house by region",
      description: "Learn why different Texas homes inherit different maintenance needs from climate, construction and local materials.",
    },
  ],
  "muds-pids-hoas-special-districts-texas": [
    {
      href: "/article/buying-land-in-texas-guide",
      label: "What changes when you buy acreage",
      description: "Compare subdivision-focused due diligence with the access, water, septic, mineral and land-use questions that matter on rural Texas property.",
    },
  ],
};
