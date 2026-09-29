export interface FishingLakeExpansionCandidate {
  slug: string;
  name: string;
  tier: 1 | 2 | 3;
  region: string;
  demandSignals: string[];
  rationale: string;
}

/**
 * Editorial/research queue only. Entries in this registry MUST NOT become public
 * lake routes, sitemap entries or "complete" guides until their own TPWD/source,
 * fish-relationship, access, live-level and evergreen-content gates are satisfied.
 */
export const FISHING_LAKE_EXPANSION_PRIORITY: FishingLakeExpansionCandidate[] = [
  { slug: "lake-ray-hubbard", name: "Lake Ray Hubbard", tier: 1, region: "Dallas-Fort Worth", demandSignals: ["major-metro", "bass", "catfish", "boating"], rationale: "Large Dallas-area reservoir with strong metro-near fishing intent." },
  { slug: "grapevine-lake", name: "Grapevine Lake", tier: 1, region: "Dallas-Fort Worth", demandSignals: ["major-metro", "airport-corridor", "bass", "family"], rationale: "High-access DFW lake with broad recreational search demand." },
  { slug: "joe-pool-lake", name: "Joe Pool Lake", tier: 1, region: "Dallas-Fort Worth", demandSignals: ["major-metro", "state-park", "bank-fishing", "family"], rationale: "Metro lake tied to Cedar Hill State Park and dense south-DFW population." },
  { slug: "lavon-lake", name: "Lavon Lake", tier: 1, region: "Dallas-Fort Worth", demandSignals: ["major-metro", "crappie", "catfish", "access"], rationale: "Large Collin County reservoir serving one of Texas' fastest-growing population centers." },
  { slug: "lake-bridgeport", name: "Lake Bridgeport", tier: 1, region: "North Texas", demandSignals: ["DFW-drive-market", "bass", "hybrid-striped-bass"], rationale: "Established North Texas fishing destination within the DFW weekend radius." },
  { slug: "lake-granbury", name: "Lake Granbury", tier: 1, region: "North Texas", demandSignals: ["DFW-drive-market", "tourism-town", "striped-bass"], rationale: "Combines a strong visitor town with reservoir and fishing intent." },
  { slug: "lake-waco", name: "Lake Waco", tier: 1, region: "Central Texas", demandSignals: ["Waco-metro", "bass", "catfish", "public-access"], rationale: "Directly expands Waco-area search and Central Texas lake coverage." },
  { slug: "lake-somerville", name: "Lake Somerville", tier: 1, region: "Central Texas", demandSignals: ["Houston-Austin-corridor", "state-park", "white-bass", "camping"], rationale: "Strong camping and fishing lake between Houston and Austin." },
  { slug: "fayette-county-reservoir", name: "Fayette County Reservoir", tier: 1, region: "Central Texas", demandSignals: ["bass", "Houston-Austin-corridor", "trophy-reputation"], rationale: "Well-known bass reservoir with unusually strong angler-specific demand." },
  { slug: "lake-austin", name: "Lake Austin", tier: 1, region: "Austin", demandSignals: ["major-metro", "bass", "urban-fishing"], rationale: "Direct Austin fishing intent and strong internal-link potential with city guides." },
  { slug: "lady-bird-lake", name: "Lady Bird Lake", tier: 1, region: "Austin", demandSignals: ["major-metro", "shore-fishing", "kayak", "urban"], rationale: "Central Austin water body with high recreation and local-search relevance." },
  { slug: "lake-georgetown", name: "Lake Georgetown", tier: 1, region: "Austin", demandSignals: ["fast-growth-metro", "camping", "bass", "hiking"], rationale: "Williamson County growth and USACE recreation make it a strong metro-near target." },
  { slug: "medina-lake", name: "Medina Lake", tier: 1, region: "San Antonio", demandSignals: ["major-metro", "Hill-Country", "bass"], rationale: "One of the clearest lake intents tied to the San Antonio weekend market." },
  { slug: "calaveras-lake", name: "Calaveras Lake", tier: 1, region: "San Antonio", demandSignals: ["major-metro", "red-drum", "hybrid-striped-bass", "catfish"], rationale: "Distinctive freshwater red-drum and hybrid fishery just south of San Antonio." },
  { slug: "braunig-lake", name: "Braunig Lake", tier: 1, region: "San Antonio", demandSignals: ["major-metro", "red-drum", "catfish"], rationale: "Pairs naturally with Calaveras for a San Antonio local-fishing cluster." },
  { slug: "lake-corpus-christi", name: "Lake Corpus Christi", tier: 1, region: "Coastal Bend", demandSignals: ["Corpus-Christi-market", "state-park", "bass", "catfish"], rationale: "Major inland freshwater resource for the Coastal Bend audience." },
  { slug: "caddo-lake", name: "Caddo Lake", tier: 1, region: "East Texas", demandSignals: ["iconic-destination", "state-park", "bass", "paddling"], rationale: "Nationally distinctive cypress-lake destination with fishing and travel intent." },
  { slug: "lake-o-the-pines", name: "Lake O' the Pines", tier: 1, region: "East Texas", demandSignals: ["bass", "crappie", "catfish", "camping"], rationale: "Major Piney Woods reservoir with broad multi-species demand." },
  { slug: "lake-bob-sandlin", name: "Lake Bob Sandlin", tier: 1, region: "East Texas", demandSignals: ["state-park", "bass", "crappie", "camping"], rationale: "Strong fit with existing state-park and northeast-Texas destination content." },
  { slug: "lake-cypress-springs", name: "Lake Cypress Springs", tier: 1, region: "East Texas", demandSignals: ["DFW-drive-market", "bass", "weekend-travel"], rationale: "Popular northeast-Texas recreation lake with DFW drive-market relevance." },

  { slug: "lake-bastrop", name: "Lake Bastrop", tier: 2, region: "Austin", demandSignals: ["Austin-drive-market", "bass", "camping"], rationale: "Small but high-utility Austin-area fishing and camping destination." },
  { slug: "inks-lake", name: "Inks Lake", tier: 2, region: "Hill Country", demandSignals: ["state-park", "family", "Hill-Country"], rationale: "Excellent cross-linking between state-park, Highland Lakes and family recreation content." },
  { slug: "lake-marble-falls", name: "Lake Marble Falls", tier: 2, region: "Hill Country", demandSignals: ["Highland-Lakes", "Marble-Falls", "bass"], rationale: "Completes the Highland Lakes chain and strengthens Marble Falls trip planning." },
  { slug: "granger-lake", name: "Granger Lake", tier: 2, region: "Austin", demandSignals: ["Austin-drive-market", "crappie", "catfish"], rationale: "Useful east-Williamson County option for Austin-area fishing searches." },
  { slug: "lake-limestone", name: "Lake Limestone", tier: 2, region: "Central Texas", demandSignals: ["catfish", "bass", "rural-weekend"], rationale: "Fills a geographic gap between Waco, Bryan-College Station and East Texas." },
  { slug: "coleto-creek-reservoir", name: "Coleto Creek Reservoir", tier: 2, region: "South Texas", demandSignals: ["Victoria-market", "bass", "catfish"], rationale: "Strong regional fishing resource for Victoria and the mid-coast interior." },
  { slug: "lake-texana", name: "Lake Texana", tier: 2, region: "Gulf Coast", demandSignals: ["Houston-Corpus-corridor", "bass", "catfish", "camping"], rationale: "Natural fit for Gulf Coast road-trip and outdoor coverage." },
  { slug: "lake-casa-blanca", name: "Lake Casa Blanca", tier: 2, region: "South Texas", demandSignals: ["Laredo-market", "state-park", "bank-fishing"], rationale: "Core local freshwater destination for Laredo." },
  { slug: "alan-henry-reservoir", name: "Alan Henry Reservoir", tier: 2, region: "West Texas", demandSignals: ["Lubbock-market", "bass", "trophy-reputation"], rationale: "High-value bass destination and a major West Texas coverage gap." },
  { slug: "lake-brownwood", name: "Lake Brownwood", tier: 2, region: "West-Central Texas", demandSignals: ["state-park", "bass", "crappie", "camping"], rationale: "Strong state-park and regional outdoors cluster." },
  { slug: "hubbard-creek-reservoir", name: "Hubbard Creek Reservoir", tier: 2, region: "West-Central Texas", demandSignals: ["Abilene-drive-market", "bass", "catfish"], rationale: "Important regional reservoir west of Fort Worth." },
  { slug: "lake-proctor", name: "Proctor Lake", tier: 2, region: "West-Central Texas", demandSignals: ["USACE", "hybrid-striped-bass", "camping"], rationale: "Builds a useful west-central cluster with Brownwood and Leon." },
  { slug: "lake-leon", name: "Lake Leon", tier: 2, region: "West-Central Texas", demandSignals: ["bass", "catfish", "I-20-corridor"], rationale: "Regional fishing resource with straightforward county/corridor connections." },
  { slug: "lake-palo-pinto", name: "Lake Palo Pinto", tier: 2, region: "North-Central Texas", demandSignals: ["DFW-drive-market", "bass", "catfish"], rationale: "Supports the western DFW lake network alongside Possum Kingdom and Bridgeport." },
  { slug: "lake-nacogdoches", name: "Lake Nacogdoches", tier: 2, region: "East Texas", demandSignals: ["bass", "college-market", "Piney-Woods"], rationale: "Known East Texas bass water tied to Nacogdoches destination content." },
  { slug: "lake-jacksonville", name: "Lake Jacksonville", tier: 2, region: "East Texas", demandSignals: ["bass", "clear-water", "Tyler-market"], rationale: "Compact, established East Texas fishery with Tyler-area relevance." },
  { slug: "lake-athens", name: "Lake Athens", tier: 2, region: "East Texas", demandSignals: ["bass", "Texas-Freshwater-Fisheries-Center", "DFW-drive-market"], rationale: "Pairs with Athens and the Texas Freshwater Fisheries Center for a strong cluster." },
  { slug: "lake-murvaul", name: "Lake Murvaul", tier: 2, region: "East Texas", demandSignals: ["bass", "crappie", "rural-weekend"], rationale: "Longstanding East Texas fishing lake that deepens Panola County coverage." },
  { slug: "martin-creek-lake", name: "Martin Creek Lake", tier: 2, region: "East Texas", demandSignals: ["state-park", "bass", "camping"], rationale: "Strong state-park/fishing pairing near Longview." },
  { slug: "houston-county-lake", name: "Houston County Lake", tier: 2, region: "East Texas", demandSignals: ["bass", "Crockett", "Piney-Woods"], rationale: "High-quality smaller bass lake that supports Crockett and Houston County content." },

  { slug: "lake-worth", name: "Lake Worth", tier: 3, region: "Fort Worth", demandSignals: ["major-metro", "urban-fishing"], rationale: "Direct Fort Worth local intent, best after higher-volume DFW reservoirs." },
  { slug: "lake-mineral-wells", name: "Lake Mineral Wells", tier: 3, region: "North Texas", demandSignals: ["state-park", "DFW-drive-market"], rationale: "Useful state-park and weekend-trip crossover despite smaller fishing scale." },
  { slug: "lake-stamford", name: "Lake Stamford", tier: 3, region: "West-Central Texas", demandSignals: ["regional", "catfish", "bass"], rationale: "Fills a sparse west-central geographic gap." },
  { slug: "lake-kemp", name: "Lake Kemp", tier: 3, region: "Northwest Texas", demandSignals: ["regional", "catfish", "white-bass"], rationale: "Important northwest-Texas reservoir for statewide completeness." },
  { slug: "lake-kickapoo", name: "Lake Kickapoo", tier: 3, region: "Northwest Texas", demandSignals: ["Wichita-Falls-market", "regional"], rationale: "Supports Wichita Falls-area local fishing discovery." },
  { slug: "lake-arrowhead", name: "Lake Arrowhead", tier: 3, region: "Northwest Texas", demandSignals: ["state-park", "Wichita-Falls-market", "catfish"], rationale: "Strongest park/fishing crossover in the Wichita Falls cluster." },
  { slug: "lake-meredith", name: "Lake Meredith", tier: 3, region: "Panhandle", demandSignals: ["national-recreation-area", "Amarillo-market", "walleye"], rationale: "Major Panhandle water body with distinctive species and federal recreation context." },
  { slug: "greenbelt-reservoir", name: "Greenbelt Reservoir", tier: 3, region: "Panhandle", demandSignals: ["Amarillo-drive-market", "regional"], rationale: "Adds practical Panhandle fishing coverage beyond Lake Meredith." },
  { slug: "lake-nasworthy", name: "Lake Nasworthy", tier: 3, region: "San Angelo", demandSignals: ["San-Angelo-market", "urban-fishing"], rationale: "Core local fishing lake for San Angelo." },
  { slug: "ev-spence-reservoir", name: "E.V. Spence Reservoir", tier: 3, region: "West Texas", demandSignals: ["regional", "bass", "catfish"], rationale: "Fills a major western reservoir gap between San Angelo and the Permian Basin." },
];

export const FISHING_LAKE_EXPANSION_PRIORITY_COUNT = FISHING_LAKE_EXPANSION_PRIORITY.length;
