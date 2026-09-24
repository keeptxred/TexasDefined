export type TexasIndustryHub = {
  name: string;
  description: string;
};

export type TexasIndustryFact = {
  value: string;
  label: string;
  context: string;
  sourceLabel: string;
  sourceUrl: string;
};

export type TexasIndustrySource = {
  label: string;
  url: string;
};

export type TexasIndustryConnection = {
  label: string;
  href: string;
  description: string;
};

export type TexasIndustrySector = {
  slug: string;
  shortTitle: string;
  title: string;
  description: string;
  summary: string;
  overview: string[];
  clusters: string[];
  hubs: TexasIndustryHub[];
  facts: TexasIndustryFact[];
  sources: TexasIndustrySource[];
  connections: TexasIndustryConnection[];
};

export const TEXAS_INDUSTRIES_VERIFIED_AT = "September 23, 2026";

export const TEXAS_INDUSTRIES: TexasIndustrySector[] = [
  {
    slug: "energy-power",
    shortTitle: "Energy & Power",
    title: "Texas Energy & Power Industry",
    description: "A practical guide to Texas oil and gas, electric power, wind, solar, transmission, pipelines, LNG and the regions that anchor the state's energy economy.",
    summary: "Texas energy is not one industry. It is a connected system spanning oil and gas production, refining and petrochemicals, electric generation, transmission, renewables, storage, pipelines, export terminals and a deep engineering and services workforce.",
    overview: [
      "The Texas energy story starts with petroleum, but it no longer ends there. The Permian Basin remains one of the world's most important oil-producing regions, the Gulf Coast concentrates refining, petrochemicals, LNG and export infrastructure, and Houston remains a major headquarters and services center.",
      "At the same time, Texas has built the nation's largest electricity market by generation. Wind, utility-scale solar, natural gas, battery storage and long-distance transmission now operate alongside a large industrial power load and fast-growing metropolitan demand.",
      "For residents, businesses and communities, the useful way to understand the sector is geographically: West Texas production and renewables, Gulf Coast processing and exports, Houston corporate and engineering functions, and statewide generation and transmission assets all play different roles."
    ],
    clusters: ["Oil and gas extraction", "Pipelines and midstream", "Refining and petrochemicals", "LNG and Gulf export infrastructure", "Electric power generation", "Wind and utility-scale solar", "Battery storage", "Transmission and grid services", "Energy engineering and field services"],
    hubs: [
      { name: "Houston & Gulf Coast", description: "Corporate headquarters, engineering, refining, petrochemicals, pipelines, LNG, ports and global energy trade." },
      { name: "Permian Basin", description: "Midland-Odessa and surrounding West Texas counties anchor oil and gas production, field services and related infrastructure." },
      { name: "West Texas & Panhandle", description: "Large wind and solar resources, transmission infrastructure and energy-intensive industrial development." },
      { name: "Corpus Christi & Coastal Bend", description: "Refining, petrochemicals, crude and LNG export infrastructure connect inland production with global markets." }
    ],
    facts: [
      { value: "No. 1", label: "U.S. net electricity generation", context: "EIA's 2024 state electricity profile ranks Texas first in net generation and net summer capacity.", sourceLabel: "U.S. Energy Information Administration", sourceUrl: "https://www.eia.gov/electricity/state/texas/" },
      { value: "Oil + gas + renewables", label: "State target-sector scope", context: "The Texas economic-development strategy treats electric power, oil and gas, and renewables as connected Energy Evolution clusters.", sourceLabel: "Texas Economic Development & Tourism Office", sourceUrl: "https://gov.texas.gov/business/page/target-industries" }
    ],
    sources: [
      { label: "U.S. Energy Information Administration — Texas Electricity Profile", url: "https://www.eia.gov/electricity/state/texas/" },
      { label: "Texas Economic Development & Tourism Office — Target Industry Sectors", url: "https://gov.texas.gov/business/page/target-industries" },
      { label: "ERCOT — Texas grid and market information", url: "https://www.ercot.com/" }
    ],
    connections: [
      { label: "Made in Texas", href: "/made-in-texas", description: "Find Texas energy and industrial companies tied to specific cities and counties." },
      { label: "Browse Texas counties", href: "/browse/counties", description: "Connect producing regions, Gulf Coast industrial counties and growth corridors to local profiles." },
      { label: "Texas utility cost calculator", href: "/texas-utility-cost-calculator", description: "Translate the statewide energy story into a household planning tool." }
    ]
  },
  {
    slug: "technology-semiconductors",
    shortTitle: "Technology & Semiconductors",
    title: "Texas Technology, AI & Semiconductor Industry",
    description: "Explore Texas technology, AI, software, data centers, electronics and semiconductor manufacturing from Austin and Dallas-Fort Worth to Sherman and Taylor.",
    summary: "Texas technology combines software and corporate technology operations with one of the country's most important electronics and semiconductor manufacturing bases. Austin, Dallas-Fort Worth, Sherman, Taylor and other communities play distinct roles in the statewide ecosystem.",
    overview: [
      "Austin is the state's best-known technology hub, but the industry is much broader than one metro. Dallas-Fort Worth has a deep telecommunications, electronics, enterprise technology and semiconductor base, while Central Texas and North Texas are seeing major chip-fabrication investment.",
      "The semiconductor layer matters because it links Texas software and engineering talent to physical manufacturing. Chip fabs, equipment suppliers, clean-room construction, power and water infrastructure, logistics and university research all become part of the same economic network.",
      "TexasDefined treats AI and data centers as part of the technology story while keeping their infrastructure footprint visible: electricity demand, land, transmission, fiber, water needs and workforce requirements can make technology growth a local planning issue as well as a statewide business story."
    ],
    clusters: ["Software and cloud services", "Artificial intelligence", "Semiconductor fabrication", "Analog and embedded processing", "Electronics manufacturing", "Telecommunications", "Data centers", "Cybersecurity", "University research and commercialization"],
    hubs: [
      { name: "Austin & Central Texas", description: "Software, major technology employers, semiconductor manufacturing, startups and research universities." },
      { name: "Dallas-Fort Worth", description: "Telecommunications, enterprise technology, semiconductor design and manufacturing, financial technology and corporate operations." },
      { name: "Sherman", description: "A major North Texas semiconductor-manufacturing center anchored by Texas Instruments' expanding 300mm fab campus." },
      { name: "Taylor", description: "Central Texas semiconductor manufacturing tied to Samsung's advanced fab investment and the wider Austin technology corridor." }
    ],
    facts: [
      { value: "$40B potential", label: "TI Sherman fab plan", context: "Texas Instruments says its Sherman site could include four connected 300mm fabs; the first fab is now in production.", sourceLabel: "Texas Instruments", sourceUrl: "https://www.ti.com/about-ti/manufacturing/sherman.html" },
      { value: "IT + AI", label: "State target cluster", context: "Texas identifies Information Technology and Artificial Intelligence as a statewide target cluster and connects it to innovation across other industries.", sourceLabel: "Texas Economic Development & Tourism Office", sourceUrl: "https://gov.texas.gov/business/page/target-industries" }
    ],
    sources: [
      { label: "Texas Economic Development & Tourism Office — Target Industry Sectors", url: "https://gov.texas.gov/business/page/target-industries" },
      { label: "Texas Instruments — Sherman 300mm wafer fabs", url: "https://www.ti.com/about-ti/manufacturing/sherman.html" },
      { label: "Samsung Semiconductor — U.S. manufacturing", url: "https://semiconductor.samsung.com/us/sas/" }
    ],
    connections: [
      { label: "Made in Texas", href: "/made-in-texas", description: "Browse technology and manufacturing companies tied to Texas places." },
      { label: "Texas science, space & industry", href: "/texas-science-technology-industry", description: "Connect modern technology to museums, engineering history and visitor experiences." },
      { label: "Compare Texas cities", href: "/compare-texas-cities", description: "Compare communities when technology jobs are part of a relocation decision." }
    ]
  },
  {
    slug: "advanced-manufacturing",
    shortTitle: "Advanced Manufacturing",
    title: "Texas Advanced Manufacturing Industry",
    description: "Understand Texas advanced manufacturing across automotive, electronics, machinery, aerospace, chemicals, vehicles and high-tech production.",
    summary: "Texas manufacturing ranges from giant vehicle and electronics plants to specialized machinery, fabricated products, aerospace systems and industrial suppliers. Its strength comes from the combination of production capacity, energy, logistics and access to large domestic and international markets.",
    overview: [
      "Advanced manufacturing is where several Texas advantages intersect: a large workforce, ports and border crossings, interstate and rail networks, energy supply, large industrial sites, engineering talent and a growing base of suppliers.",
      "The sector is geographically diverse. North Texas combines aerospace, electronics and machinery; Central Texas has semiconductor and vehicle manufacturing; San Antonio has automotive and heavy-industry operations; the Gulf Coast adds chemicals, fabricated products and export infrastructure.",
      "A useful manufacturing page should distinguish headquarters from actual production. TexasDefined's Made in Texas directory uses explicit relationship labels so a company with a Texas headquarters is not automatically described as manufacturing every product in the state."
    ],
    clusters: ["Automotive and electric vehicles", "Computers, electronics and semiconductors", "Aerospace vehicles and aircraft", "Defense manufacturing", "Heavy machinery and production technology", "Chemical products", "Fabricated metals", "Industrial equipment and components"],
    hubs: [
      { name: "Dallas-Fort Worth", description: "Aerospace and defense, electronics, machinery, corporate operations and a broad supplier network." },
      { name: "Austin-Central Texas", description: "Semiconductors, electronics, electric vehicles and advanced production tied to the technology corridor." },
      { name: "San Antonio", description: "Automotive production, suppliers, aviation maintenance and a large logistics and military ecosystem." },
      { name: "Houston-Gulf Coast", description: "Chemicals, energy equipment, fabricated products, machinery, ship-channel industry and exports." }
    ],
    facts: [
      { value: "11%", label: "Share of U.S. manufactured goods", context: "The Governor's economic-development office states that Texas produces about 11% of all U.S. manufactured goods.", sourceLabel: "Office of the Texas Governor", sourceUrl: "https://gov.texas.gov/top-texas-touts-industry" },
      { value: "4 clusters", label: "Advanced-manufacturing targets", context: "Texas groups aerospace/defense, automotive, computers/electronics/semiconductors, and production technology/heavy machinery under Advanced Manufacturing.", sourceLabel: "Texas Economic Development & Tourism Office", sourceUrl: "https://gov.texas.gov/business/page/advanced-manufacturing" }
    ],
    sources: [
      { label: "Texas Economic Development & Tourism Office — Advanced Manufacturing", url: "https://gov.texas.gov/business/page/advanced-manufacturing" },
      { label: "Office of the Texas Governor — Industry overview", url: "https://gov.texas.gov/top-texas-touts-industry" },
      { label: "Made in Texas directory", url: "https://texasdefined.com/made-in-texas" }
    ],
    connections: [
      { label: "Made in Texas", href: "/made-in-texas", description: "See manufacturers, products and company relationships by city and county." },
      { label: "Start a business in Texas", href: "/start-a-business-in-texas", description: "Use TexasDefined's practical business-startup guide alongside the industry context." },
      { label: "Browse Texas cities", href: "/browse/cities", description: "Explore the communities where plants, suppliers and workers are concentrated." }
    ]
  },
  {
    slug: "trade-transportation-logistics",
    shortTitle: "Trade, Transportation & Logistics",
    title: "Texas Trade, Transportation & Logistics Industry",
    description: "Explore how Texas ports, the Mexico border, highways, railroads, airports, warehouses and distribution hubs connect the state to U.S. and global trade.",
    summary: "Texas logistics is a geographic advantage turned into an industry: Gulf ports, border crossings with Mexico, major freight railroads, interstate corridors, cargo airports, warehouses and distribution centers move goods through and beyond the state.",
    overview: [
      "The Texas-Mexico border and Gulf Coast make international trade central to the state's economy. Laredo is a critical land-port gateway, while Houston, Corpus Christi, Beaumont-Port Arthur and other Gulf ports connect Texas production to global shipping.",
      "Inland logistics matters just as much. Dallas-Fort Worth functions as a national distribution center because of highway, rail and air connectivity, while San Antonio sits on major north-south corridors linking Mexico with the rest of the United States.",
      "This sector overlaps almost every other industry on the site: agriculture needs cold chain and rail, manufacturing needs suppliers and freight, energy relies on ports and pipelines, and e-commerce depends on warehouses and last-mile networks."
    ],
    clusters: ["Ports and marine cargo", "Texas-Mexico border trade", "Trucking and highway freight", "Freight rail", "Air cargo", "Warehousing and distribution", "E-commerce fulfillment", "Customs and trade services", "Cold chain and specialized logistics"],
    hubs: [
      { name: "Laredo & South Texas border", description: "Truck and rail trade with Mexico, customs services, warehousing and cross-border supply chains." },
      { name: "Houston & Gulf Coast", description: "Port activity, petrochemical and container cargo, rail and highway links, warehousing and global shipping." },
      { name: "Dallas-Fort Worth", description: "National-scale distribution, air cargo, intermodal rail, highways, warehouses and e-commerce fulfillment." },
      { name: "San Antonio & I-35 corridor", description: "Manufacturing logistics and a strategic north-south connection between Mexico, Central Texas and DFW." }
    ],
    facts: [
      { value: "Multimodal", label: "Texas-Mexico border planning", context: "TxDOT's binational border transportation plan covers the movement of people and goods across the border and beyond by multiple modes.", sourceLabel: "Texas Department of Transportation", sourceUrl: "https://www.txdot.gov/projects/planning/international-trade-border-planning/btmp.html" },
      { value: "24 years", label: "Top U.S. exporting state", context: "Texas economic-development materials state that Texas has ranked as the nation's top exporting state for 24 consecutive years.", sourceLabel: "Texas Economic Development & Tourism Office", sourceUrl: "https://gov.texas.gov/business/page/advanced-manufacturing" }
    ],
    sources: [
      { label: "TxDOT — Texas-Mexico Border Transportation Master Plan", url: "https://www.txdot.gov/projects/planning/international-trade-border-planning/btmp.html" },
      { label: "Texas Economic Development & Tourism Office — Transportation and Logistics", url: "https://gov.texas.gov/business/page/target-industries" },
      { label: "Port Houston", url: "https://porthouston.com/" }
    ],
    connections: [
      { label: "Browse counties", href: "/browse/counties", description: "Follow border, port and inland freight corridors through county profiles." },
      { label: "Made in Texas", href: "/made-in-texas", description: "See the products and companies whose supply chains depend on Texas logistics." },
      { label: "Moving to Texas", href: "/moving-to-texas", description: "Connect employment geography with relocation research." }
    ]
  },
  {
    slug: "aerospace-aviation-defense",
    shortTitle: "Aerospace, Aviation & Defense",
    title: "Texas Aerospace, Aviation & Defense Industry",
    description: "Explore Texas aerospace, aviation, spaceflight and defense from NASA Johnson Space Center and SpaceX to Fort Worth aircraft manufacturing and military aviation.",
    summary: "Texas aerospace spans human spaceflight, commercial launch activity, aircraft and rotorcraft manufacturing, defense systems, military aviation, maintenance, research and a large network of suppliers.",
    overview: [
      "Houston's Johnson Space Center anchors human spaceflight and mission operations. The Gulf Coast and South Texas also connect the state to commercial space activity, while North Texas remains one of the country's most important aircraft and defense-manufacturing regions.",
      "Fort Worth and the wider Metroplex combine aircraft production, defense contracting, avionics, engineering and suppliers. San Antonio adds military aviation, maintenance and cybersecurity activity, while Central Texas contributes engineering, electronics and emerging space companies.",
      "The sector is both industrial and visitor-facing. TexasDefined already covers space, aviation and military heritage; this page separates that travel/history layer from the present-day economic system."
    ],
    clusters: ["Human spaceflight and mission operations", "Commercial spaceflight", "Aircraft manufacturing", "Rotorcraft", "Defense systems", "Avionics and electronics", "Maintenance, repair and overhaul", "Military aviation", "Aerospace engineering and suppliers"],
    hubs: [
      { name: "Houston", description: "NASA Johnson Space Center, human spaceflight, engineering, contractors and a growing commercial space ecosystem." },
      { name: "Dallas-Fort Worth", description: "Aircraft and defense manufacturing, engineering, avionics and a dense supplier network." },
      { name: "San Antonio", description: "Military aviation, maintenance, cyber and defense activity built around major installations and private contractors." },
      { name: "South Texas & Gulf Coast", description: "Commercial launch and space infrastructure adds a newer layer to the state's long aerospace history." }
    ],
    facts: [
      { value: "12,000+", label: "People at Johnson Space Center", context: "NASA lists more than 12,000 people associated with Johnson Space Center in Houston.", sourceLabel: "NASA Johnson Space Center", sourceUrl: "https://www.nasa.gov/johnson/" },
      { value: "$9B", label: "NASA economic output in Texas", context: "NASA's Texas in Space page reports about $9 billion in economic output and 39,000 jobs supported.", sourceLabel: "NASA — Texas in Space", sourceUrl: "https://www.nasa.gov/johnson/texas-in-space/" }
    ],
    sources: [
      { label: "NASA — Johnson Space Center", url: "https://www.nasa.gov/johnson/" },
      { label: "NASA — Texas in Space", url: "https://www.nasa.gov/johnson/texas-in-space/" },
      { label: "Texas Economic Development & Tourism Office — Advanced Manufacturing", url: "https://gov.texas.gov/business/page/advanced-manufacturing" }
    ],
    connections: [
      { label: "Texas science, space & industry", href: "/texas-science-technology-industry", description: "Plan visitor experiences around the history and science behind the sector." },
      { label: "Made in Texas", href: "/made-in-texas", description: "Find aerospace and transportation companies tied to Texas communities." },
      { label: "Texas military aviation history", href: "/article/san-antonio-military-aviation-history", description: "Add historical context to San Antonio's present-day aerospace and defense role." }
    ]
  },
  {
    slug: "healthcare-life-sciences",
    shortTitle: "Healthcare & Life Sciences",
    title: "Texas Healthcare & Life Sciences Industry",
    description: "Explore the Texas healthcare, biotechnology, pharmaceutical, medical-device and research economy, including Houston's Texas Medical Center and regional medical hubs.",
    summary: "Texas healthcare is a statewide employment engine, while its life-sciences sector links hospitals and medical schools to biotechnology, pharmaceuticals, medical devices, research, clinical trials and commercialization.",
    overview: [
      "Houston's Texas Medical Center is the state's most visible healthcare and life-sciences cluster, but Dallas-Fort Worth, Austin, San Antonio, Galveston and other university-centered regions also support major health systems, research institutions and specialized companies.",
      "The life-sciences economy depends on more than hospitals. It includes laboratories, university research, startups, pharmaceutical and device development, clinical testing, manufacturing, data systems and specialized real estate.",
      "For people considering a move, healthcare is also a local-services question. TexasDefined's city and county pages can connect statewide industry context to nearby hospitals, universities and regional employment centers."
    ],
    clusters: ["Hospital systems", "Academic medicine", "Biotechnology", "Pharmaceuticals", "Medical devices", "Clinical research and trials", "Health technology", "Laboratory services", "Life-sciences real estate and manufacturing"],
    hubs: [
      { name: "Houston", description: "Texas Medical Center, academic medicine, cancer care, children's health, research, biotech and commercialization." },
      { name: "Dallas-Fort Worth", description: "Large hospital systems, medical schools, specialty care, health technology and corporate healthcare operations." },
      { name: "San Antonio", description: "Academic medicine, military medicine, biomedical research and a growing bioscience ecosystem." },
      { name: "Austin-Central Texas", description: "Health technology, university research, Dell Medical School and fast-growing regional healthcare demand." }
    ],
    facts: [
      { value: "120,000+", label: "Texas Medical Center employees", context: "TMC reports more than 120,000 total employees across the world's largest medical complex.", sourceLabel: "Texas Medical Center", sourceUrl: "https://www.tmc.edu/about-tmc/" },
      { value: "10M", label: "TMC patient encounters per year", context: "Texas Medical Center reports roughly 10 million patient encounters annually across its member institutions.", sourceLabel: "Texas Medical Center", sourceUrl: "https://www.tmc.edu/about-tmc/" }
    ],
    sources: [
      { label: "Texas Medical Center — About TMC", url: "https://www.tmc.edu/about-tmc/" },
      { label: "Texas Economic Development & Tourism Office — Life Sciences and Biotechnology", url: "https://gov.texas.gov/business/page/target-industries" },
      { label: "Texas Medical Center — Campus", url: "https://www.tmc.edu/operations/tmc-campus/" }
    ],
    connections: [
      { label: "Compare Texas cities", href: "/compare-texas-cities", description: "Compare communities when healthcare employment and access matter to a move." },
      { label: "Browse cities", href: "/browse/cities", description: "Move from the statewide industry to local medical and university centers." },
      { label: "Moving to Texas", href: "/moving-to-texas", description: "Connect jobs, housing and community research." }
    ]
  },
  {
    slug: "agriculture-livestock",
    shortTitle: "Agriculture & Livestock",
    title: "Texas Agriculture & Livestock Industry",
    description: "Explore Texas cattle, cotton, poultry, dairy, grains, ranching, farming, food processing and the regions that make agriculture a statewide economic system.",
    summary: "Texas agriculture is a land-based industry with global supply chains. Cattle and ranching remain central to the state's identity, while cotton, poultry, dairy, grains, specialty crops, food processing and agricultural technology vary sharply by region.",
    overview: [
      "Agriculture in Texas is best understood through geography. The Panhandle and High Plains combine cattle feeding, dairy, cotton and grains; South Texas and the Rio Grande Valley add citrus and vegetables; East Texas has poultry and timber-linked rural economies; Central and West Texas retain major ranching and livestock activity.",
      "The farm gate is only one part of the industry. Meat processing, cotton ginning, feed, cold storage, equipment, veterinary services, trucking, rail, food manufacturing and agricultural research extend the economic footprint into towns and cities.",
      "TexasDefined already has 254 county profiles, which makes agriculture especially useful for cross-linking. A statewide sector page can explain the system while county pages show how land use, crops, livestock and local history differ."
    ],
    clusters: ["Cattle and ranching", "Cotton", "Poultry", "Dairy", "Corn, sorghum and wheat", "Hay and forage", "Citrus and specialty crops", "Food and livestock processing", "Agricultural technology and equipment"],
    hubs: [
      { name: "Panhandle & High Plains", description: "Cattle feeding, dairy, cotton, grains, food processing and large-scale agricultural operations." },
      { name: "South Plains", description: "Cotton, grains, cattle and agricultural services centered around Lubbock and surrounding counties." },
      { name: "Rio Grande Valley & South Texas", description: "Citrus, vegetables, livestock and cross-border food and agricultural trade." },
      { name: "Central, West & East Texas", description: "Ranching, poultry, hay, specialty agriculture and diverse county-level farming systems." }
    ],
    facts: [
      { value: "229,000", label: "Farm operations", context: "USDA NASS lists 229,000 Texas farm operations in its 2025 state agriculture overview.", sourceLabel: "USDA National Agricultural Statistics Service", sourceUrl: "https://www.nass.usda.gov/Quick_Stats/Ag_Overview/stateOverview.php?state=Texas&year=2025" },
      { value: "125M acres", label: "Land in farms", context: "USDA NASS reports about 125 million acres operated by Texas farms in the 2025 overview.", sourceLabel: "USDA National Agricultural Statistics Service", sourceUrl: "https://www.nass.usda.gov/Quick_Stats/Ag_Overview/stateOverview.php?state=Texas&year=2025" },
      { value: "12.1M", label: "Cattle and calves", context: "The 2025 state overview lists 12.1 million cattle and calves as of January 2026.", sourceLabel: "USDA National Agricultural Statistics Service", sourceUrl: "https://www.nass.usda.gov/Quick_Stats/Ag_Overview/stateOverview.php?state=Texas&year=2025" }
    ],
    sources: [
      { label: "USDA NASS — Texas State Agriculture Overview", url: "https://www.nass.usda.gov/Quick_Stats/Ag_Overview/stateOverview.php?state=Texas&year=2025" },
      { label: "Texas Economic Development & Tourism Office — Food and Livestock Products", url: "https://gov.texas.gov/business/page/target-industries" },
      { label: "Texas Department of Agriculture", url: "https://texasagriculture.gov/" }
    ],
    connections: [
      { label: "Browse all Texas counties", href: "/browse/counties", description: "See agriculture, land and local identity at county scale." },
      { label: "Agricultural valuation guide", href: "/learn/agricultural-valuation", description: "Understand the property-tax side of agricultural land use." },
      { label: "Agricultural valuation calculator", href: "/texas-agricultural-valuation-calculator", description: "Use the site's planning tool for qualifying agricultural land scenarios." }
    ]
  },
  {
    slug: "financial-services",
    shortTitle: "Financial Services",
    title: "Texas Financial Services Industry",
    description: "Explore Texas banking, insurance, investment, fintech and corporate finance, with Dallas-Fort Worth, Houston, Austin and San Antonio as major centers.",
    summary: "Texas financial services spans banking, insurance, securities, investment management, consumer finance, mortgage and real-estate lending, fintech and the financial operations of major corporations.",
    overview: [
      "Dallas-Fort Worth is the state's largest concentration for many financial activities, supported by the Federal Reserve Bank of Dallas and large banking, brokerage, insurance and corporate operations. Houston adds energy finance and corporate banking, while Austin and San Antonio contribute fintech, insurance, banking and military-connected financial services.",
      "The sector increasingly overlaps technology. Payments, cybersecurity, data infrastructure, cloud systems and AI are part of modern financial operations, which links this page naturally to Texas technology and corporate-services coverage.",
      "Financial services also connects directly to TexasDefined's consumer tools: mortgages, affordability, closing costs, insurance, salaries, property taxes and homeownership costs are all downstream of the financial system."
    ],
    clusters: ["Commercial banking", "Insurance", "Investment management", "Securities and brokerage", "Consumer finance", "Mortgage and real-estate lending", "Fintech and payments", "Corporate treasury and finance", "Accounting and financial operations"],
    hubs: [
      { name: "Dallas-Fort Worth", description: "Banking, investment, insurance, fintech and major corporate financial operations." },
      { name: "Houston", description: "Corporate banking, energy finance, insurance and investment activity tied to a large headquarters base." },
      { name: "Austin", description: "Fintech, venture capital, technology-linked finance and a growing professional-services workforce." },
      { name: "San Antonio", description: "Banking, insurance and financial operations with strong military and consumer-finance connections." }
    ],
    facts: [
      { value: "No. 1", label: "Financial-services employment", context: "The Texas economic-development office describes Texas as first in total U.S. financial-services employment.", sourceLabel: "Texas Economic Development & Tourism Office", sourceUrl: "https://gov.texas.gov/business/page/corporate-services" },
      { value: "Dallas", label: "Federal Reserve district headquarters", context: "Dallas has served as headquarters of the Federal Reserve's Eleventh District for more than a century.", sourceLabel: "Texas Economic Development & Tourism Office", sourceUrl: "https://gov.texas.gov/uploads/files/business/Financial_Services_Snapshot.pdf" }
    ],
    sources: [
      { label: "Texas Economic Development & Tourism Office — Professional Services & Corporate Operations", url: "https://gov.texas.gov/business/page/corporate-services" },
      { label: "Texas Financial Services Industry snapshot", url: "https://gov.texas.gov/uploads/files/business/Financial_Services_Snapshot.pdf" },
      { label: "Federal Reserve Bank of Dallas", url: "https://www.dallasfed.org/" }
    ],
    connections: [
      { label: "Texas financial calculators", href: "/decide/financial-tools", description: "Use the site's mortgage, affordability, tax and household-finance tools." },
      { label: "Texas salary calculator", href: "/texas-salary-calculator", description: "Estimate take-home pay for Texas employment scenarios." },
      { label: "Real estate", href: "/real-estate", description: "Connect finance to the housing and homeownership side of the Texas economy." }
    ]
  },
  {
    slug: "construction-real-estate",
    shortTitle: "Construction & Real Estate",
    title: "Texas Construction & Real Estate Industry",
    description: "Explore Texas residential and commercial construction, infrastructure, development, real estate and the growth corridors reshaping major metros and smaller communities.",
    summary: "Rapid population and business growth make construction and real estate unusually visible in Texas. The sector spans homebuilding, commercial development, industrial projects, infrastructure, engineering, specialty trades, brokerage and property services.",
    overview: [
      "Texas growth shows up physically in subdivisions, apartment projects, industrial parks, warehouses, hospitals, schools, roads, utility systems and major commercial districts. That means construction connects directly to population growth, land availability, financing and local infrastructure.",
      "Houston, Dallas-Fort Worth, Austin and San Antonio account for a large share of development, but high-growth suburban counties and regional centers also support substantial residential and commercial construction.",
      "For TexasDefined, this industry is especially important because it links the economic story to practical homeowner questions: property taxes, insurance, mortgages, closing costs, utility costs and the total cost of owning a home."
    ],
    clusters: ["Residential construction", "Commercial construction", "Industrial construction", "Civil and infrastructure", "Engineering and specialty trades", "Homebuilding and land development", "Commercial real estate", "Brokerage and property services", "Building materials"],
    hubs: [
      { name: "Dallas-Fort Worth", description: "Large-scale residential growth, industrial and logistics development, corporate real estate and major infrastructure." },
      { name: "Houston", description: "Homebuilding, commercial development, industrial construction, energy projects and a large engineering workforce." },
      { name: "Austin-Central Texas", description: "Fast-growth housing, technology and semiconductor facilities, offices, data centers and infrastructure." },
      { name: "San Antonio", description: "Residential growth, military-related development, manufacturing facilities and regional commercial construction." }
    ],
    facts: [
      { value: "$110.2B", label: "Texas construction GDP in 2022", context: "The Texas Comptroller reported $110.2 billion in construction GDP for 2022 in its statewide regional report.", sourceLabel: "Texas Comptroller of Public Accounts", sourceUrl: "https://comptroller.texas.gov/economy/economic-data/regions/2024/statewide.php" },
      { value: "4.6%", label: "Share of Texas GDP in 2022", context: "The same Comptroller report put construction at 4.6% of state GDP in 2022.", sourceLabel: "Texas Comptroller of Public Accounts", sourceUrl: "https://comptroller.texas.gov/economy/economic-data/regions/2024/statewide.php" }
    ],
    sources: [
      { label: "Texas Comptroller — Statewide Report", url: "https://comptroller.texas.gov/economy/economic-data/regions/2024/statewide.php" },
      { label: "Texas Comptroller — Construction Overview", url: "https://comptroller.texas.gov/economy/economic-data/women/construction-overview.php" },
      { label: "Texas Department of Licensing and Regulation", url: "https://www.tdlr.texas.gov/" }
    ],
    connections: [
      { label: "Texas real estate", href: "/real-estate", description: "Move from industry context into buying, owning and researching property." },
      { label: "Buying a home in Texas", href: "/buying-a-home-in-texas", description: "Use TexasDefined's homebuyer journey and practical planning resources." },
      { label: "Homeownership cost calculator", href: "/texas-homeownership-cost-calculator", description: "Estimate the recurring costs behind a Texas home purchase." }
    ]
  },
  {
    slug: "corporate-professional-services",
    shortTitle: "Corporate & Professional Services",
    title: "Texas Corporate & Professional Services Industry",
    description: "Explore Texas headquarters, business services, consulting, engineering, accounting, legal operations and corporate support centers across major metros.",
    summary: "Texas has become a major corporate-operations center as companies place headquarters, regional offices and large support teams in Dallas-Fort Worth, Houston, Austin and San Antonio. Professional services then grow around those employers.",
    overview: [
      "Corporate services include headquarters functions, shared-service centers, accounting, consulting, engineering, legal support, human resources, data services and other operations that keep large organizations running.",
      "The sector is closely tied to Texas growth because corporate relocations and expansions create demand for office space, housing, professional talent, airports, schools and local services. Dallas-Fort Worth has the deepest headquarters concentration, but Houston, Austin and San Antonio each have distinct strengths.",
      "Professional services also make Texas industry networks more interconnected: engineers support energy and construction, consultants support technology and finance, and corporate operations rely on the same logistics and digital infrastructure described elsewhere in this industry collection."
    ],
    clusters: ["Corporate headquarters", "Business services", "Engineering and design", "Accounting", "Consulting", "Legal and compliance operations", "Human resources and shared services", "Data and back-office operations", "Corporate support centers"],
    hubs: [
      { name: "Dallas-Fort Worth", description: "Headquarters, financial and professional services, telecommunications and a large corporate workforce." },
      { name: "Houston", description: "Energy, engineering, construction, healthcare and global-business headquarters and professional services." },
      { name: "Austin", description: "Technology companies, startups, professional services and state-government-adjacent corporate operations." },
      { name: "San Antonio", description: "Financial, insurance, cybersecurity, military-connected and regional corporate operations." }
    ],
    facts: [
      { value: "57", label: "Fortune 500 headquarters", context: "Texas economic-development materials list 57 Fortune 500 headquarters in the state.", sourceLabel: "Texas Economic Development & Tourism Office", sourceUrl: "https://gov.texas.gov/business/page/corporate-services" },
      { value: "1.6M+", label: "Sector workforce", context: "The state's Professional Services and Corporate Operations page reports an industry workforce of more than 1.6 million.", sourceLabel: "Texas Economic Development & Tourism Office", sourceUrl: "https://gov.texas.gov/business/page/corporate-services" }
    ],
    sources: [
      { label: "Texas Economic Development & Tourism Office — Professional Services & Corporate Operations", url: "https://gov.texas.gov/business/page/corporate-services" },
      { label: "Texas Comptroller — Headquarters of Headquarters", url: "https://comptroller.texas.gov/economy/economic-data/hq/2025/statewide.php" },
      { label: "Texas Economic Development Strategic Plan", url: "https://gov.texas.gov/business/page/bigger-better-texas-strategic-plan" }
    ],
    connections: [
      { label: "Start a business in Texas", href: "/start-a-business-in-texas", description: "Use the business-startup guide alongside the statewide corporate landscape." },
      { label: "Compare Texas cities", href: "/compare-texas-cities", description: "Compare major employment centers for a relocation or expansion decision." },
      { label: "Texas salary comparison", href: "/texas-salary-comparison-by-city", description: "Compare salaries across Texas metros and cities." }
    ]
  },
  {
    slug: "hospitality-tourism-culture",
    shortTitle: "Hospitality, Tourism & Culture",
    title: "Texas Hospitality, Tourism & Culture Industry",
    description: "Explore the Texas visitor economy across hotels, attractions, restaurants, events, film, music and cultural destinations from major metros to parks and small towns.",
    summary: "Tourism is both an industry and the part of the Texas economy TexasDefined covers most directly. Hotels, restaurants, attractions, parks, festivals, sports, music, film and cultural institutions create visitor spending and local employment across the state.",
    overview: [
      "The Texas visitor economy is unusually diverse because there is no single tourism geography. Major-city conventions and sports, Gulf Coast beaches, Hill Country weekends, national and state parks, border culture, music destinations, rodeos, food traditions and small-town events all attract different trips.",
      "Hospitality also touches many other sectors. Airlines and highways move visitors, construction supplies hotels and venues, agriculture feeds restaurants, technology powers booking and ticketing, and local history gives destinations their identity.",
      "TexasDefined's travel platform already contains destinations, events, sports venues, outdoor guides and trip-planning tools. This industry page makes that content useful as an economic system instead of only a list of places to visit."
    ],
    clusters: ["Hotels and lodging", "Restaurants and food tourism", "Attractions and museums", "Outdoor recreation", "Festivals and events", "Sports tourism", "Music and live entertainment", "Film and television", "Convention and business travel"],
    hubs: [
      { name: "Dallas-Fort Worth", description: "Sports, conventions, major attractions, arts, hotels, shopping and a large airport-connected visitor market." },
      { name: "Houston & Gulf Coast", description: "Museums, professional sports, conventions, food, cruises, beaches and coastal attractions." },
      { name: "Austin & Hill Country", description: "Music, festivals, food, outdoor recreation, wineries, small towns and weekend travel." },
      { name: "San Antonio & South Texas", description: "The River Walk, missions, conventions, theme parks, cultural tourism and gateway travel into South Texas." }
    ],
    facts: [
      { value: "$97.5B", label: "2024 visitor spending", context: "Texas economic-development materials report $97.5 billion in visitor spending in 2024.", sourceLabel: "Texas Economic Development & Tourism Office", sourceUrl: "https://gov.texas.gov/business/page/creative-industry" },
      { value: "62M", label: "Non-Texan travelers in 2024", context: "The state's hospitality and tourism page reports a record 62 million non-Texan travelers in 2024.", sourceLabel: "Texas Economic Development & Tourism Office", sourceUrl: "https://gov.texas.gov/business/page/creative-industry" }
    ],
    sources: [
      { label: "Texas Economic Development & Tourism Office — Hospitality, Tourism & Culture", url: "https://gov.texas.gov/business/page/creative-industry" },
      { label: "Travel Texas", url: "https://www.traveltexas.com/" },
      { label: "Texas Parks & Wildlife Department", url: "https://tpwd.texas.gov/" }
    ],
    connections: [
      { label: "Explore Texas", href: "/explore", description: "Browse destinations, parks, towns, road trips and statewide travel collections." },
      { label: "Texas events", href: "/events", description: "Use the statewide calendar and annual-event authority pages." },
      { label: "Texas sports venues", href: "/sports-venues", description: "Explore stadiums, arenas, tracks and sports-travel destinations." }
    ]
  }
];

export function getTexasIndustry(slug: string) {
  return TEXAS_INDUSTRIES.find((industry) => industry.slug === slug);
}
