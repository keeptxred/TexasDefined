export type CityIndustryPath = {
  label: string;
  href: string;
  context: string;
};

const CITY_INDUSTRY_PATHS: Record<string, ReadonlyArray<CityIndustryPath>> = {
  houston: [
    { label: 'Energy & Power', href: '/texas-industries/energy-power', context: 'Houston and the Gulf Coast anchor corporate energy, engineering, refining, petrochemicals, pipelines and global trade.' },
    { label: 'Healthcare & Life Sciences', href: '/texas-industries/healthcare-life-sciences', context: 'The Texas Medical Center makes healthcare, research and life sciences a major part of the Houston economy.' },
    { label: 'Trade, Transportation & Logistics', href: '/texas-industries/trade-transportation-logistics', context: 'Port, rail, highway and warehouse networks tie the Houston region to national and global freight.' },
    { label: 'Aerospace, Aviation & Defense', href: '/texas-industries/aerospace-aviation-defense', context: 'Johnson Space Center and its contractor network connect Houston directly to human spaceflight and aerospace engineering.' },
  ],
  dallas: [
    { label: 'Financial Services', href: '/texas-industries/financial-services', context: 'Dallas is one of the state’s major centers for banking, investment, insurance and corporate finance.' },
    { label: 'Corporate & Professional Services', href: '/texas-industries/corporate-professional-services', context: 'The wider Dallas-Fort Worth region has a dense headquarters and professional-services base.' },
    { label: 'Technology & Semiconductors', href: '/texas-industries/technology-semiconductors', context: 'North Texas combines telecommunications, enterprise technology, electronics and semiconductor activity.' },
    { label: 'Trade, Transportation & Logistics', href: '/texas-industries/trade-transportation-logistics', context: 'Air cargo, highways, rail and distribution make the Metroplex a national logistics hub.' },
  ],
  'fort-worth': [
    { label: 'Aerospace, Aviation & Defense', href: '/texas-industries/aerospace-aviation-defense', context: 'Fort Worth is a major aircraft, defense, engineering and aerospace-supplier center.' },
    { label: 'Advanced Manufacturing', href: '/texas-industries/advanced-manufacturing', context: 'North Texas manufacturing includes aerospace systems, electronics, machinery and specialized suppliers.' },
    { label: 'Trade, Transportation & Logistics', href: '/texas-industries/trade-transportation-logistics', context: 'Fort Worth is part of the Metroplex freight, rail, airport and distribution network.' },
  ],
  austin: [
    { label: 'Technology & Semiconductors', href: '/texas-industries/technology-semiconductors', context: 'Austin is a major software, semiconductor, startup and research center.' },
    { label: 'Advanced Manufacturing', href: '/texas-industries/advanced-manufacturing', context: 'Central Texas manufacturing includes semiconductors, electronics, electric vehicles and advanced production.' },
    { label: 'Corporate & Professional Services', href: '/texas-industries/corporate-professional-services', context: 'Technology companies, startups and corporate operations support a large professional-services workforce.' },
  ],
  'san-antonio': [
    { label: 'Aerospace, Aviation & Defense', href: '/texas-industries/aerospace-aviation-defense', context: 'Military aviation, maintenance, cyber and defense are longstanding parts of the San Antonio economy.' },
    { label: 'Advanced Manufacturing', href: '/texas-industries/advanced-manufacturing', context: 'Automotive production and its supplier network make manufacturing a major regional industry.' },
    { label: 'Healthcare & Life Sciences', href: '/texas-industries/healthcare-life-sciences', context: 'Academic medicine, military medicine and biomedical research support a large regional healthcare cluster.' },
    { label: 'Hospitality, Tourism & Culture', href: '/texas-industries/hospitality-tourism-culture', context: 'The River Walk, missions, conventions, attractions and cultural tourism support a major visitor economy.' },
  ],
  'el-paso': [
    { label: 'Trade, Transportation & Logistics', href: '/texas-industries/trade-transportation-logistics', context: 'El Paso’s border location connects the city to cross-border manufacturing, trucking, rail and distribution.' },
    { label: 'Advanced Manufacturing', href: '/texas-industries/advanced-manufacturing', context: 'Border supply chains and regional industrial production connect El Paso to the wider Texas manufacturing system.' },
  ],
  arlington: [
    { label: 'Hospitality, Tourism & Culture', href: '/texas-industries/hospitality-tourism-culture', context: 'Major sports, entertainment and visitor destinations make tourism and hospitality especially visible in Arlington.' },
    { label: 'Trade, Transportation & Logistics', href: '/texas-industries/trade-transportation-logistics', context: 'Arlington sits inside the larger Metroplex freight, airport and distribution network.' },
  ],
  'corpus-christi': [
    { label: 'Energy & Power', href: '/texas-industries/energy-power', context: 'Refining, petrochemicals and export infrastructure connect Corpus Christi to the Gulf Coast energy system.' },
    { label: 'Trade, Transportation & Logistics', href: '/texas-industries/trade-transportation-logistics', context: 'Port activity and Gulf shipping make trade and freight central to the Coastal Bend economy.' },
    { label: 'Hospitality, Tourism & Culture', href: '/texas-industries/hospitality-tourism-culture', context: 'Beaches, attractions and coastal travel support the region’s visitor economy.' },
  ],
  plano: [
    { label: 'Technology & Semiconductors', href: '/texas-industries/technology-semiconductors', context: 'Plano is part of the North Texas technology, telecommunications and enterprise-operations corridor.' },
    { label: 'Financial Services', href: '/texas-industries/financial-services', context: 'The city sits inside the Dallas-Fort Worth financial-services and corporate-finance market.' },
    { label: 'Corporate & Professional Services', href: '/texas-industries/corporate-professional-services', context: 'Corporate offices and professional services are major parts of the broader North Texas economy.' },
  ],
  lubbock: [
    { label: 'Agriculture & Livestock', href: '/texas-industries/agriculture-livestock', context: 'Lubbock and the South Plains sit at the center of a major cotton, grain, cattle and agricultural-services region.' },
    { label: 'Healthcare & Life Sciences', href: '/texas-industries/healthcare-life-sciences', context: 'Regional medical systems and university-linked healthcare make Lubbock an important West Texas medical center.' },
  ],
  midland: [
    { label: 'Energy & Power', href: '/texas-industries/energy-power', context: 'Midland is one of the principal business and services centers of the Permian Basin oil-and-gas economy.' },
    { label: 'Corporate & Professional Services', href: '/texas-industries/corporate-professional-services', context: 'Energy companies, engineering firms and professional services give Midland a large corporate-support economy tied to the Permian Basin.' },
  ],
  odessa: [
    { label: 'Energy & Power', href: '/texas-industries/energy-power', context: 'Odessa sits inside the Permian Basin production and oilfield-services network.' },
    { label: 'Advanced Manufacturing', href: '/texas-industries/advanced-manufacturing', context: 'Oilfield equipment, industrial suppliers and specialized production connect Odessa to Texas manufacturing.' },
  ],
  laredo: [
    { label: 'Trade, Transportation & Logistics', href: '/texas-industries/trade-transportation-logistics', context: 'International bridges, trucking, rail, customs services and warehousing make Laredo one of the state’s defining freight hubs.' },
  ],
  sherman: [
    { label: 'Technology & Semiconductors', href: '/texas-industries/technology-semiconductors', context: 'Sherman is a major North Texas semiconductor-manufacturing center tied to large-scale 300mm fabrication investment.' },
    { label: 'Advanced Manufacturing', href: '/texas-industries/advanced-manufacturing', context: 'Semiconductor fabrication and its supplier ecosystem connect Sherman directly to advanced manufacturing.' },
  ],
  galveston: [
    { label: 'Hospitality, Tourism & Culture', href: '/texas-industries/hospitality-tourism-culture', context: 'Beaches, cruise activity, historic districts and attractions make tourism and hospitality central to Galveston’s economy.' },
    { label: 'Healthcare & Life Sciences', href: '/texas-industries/healthcare-life-sciences', context: 'Academic medicine and research centered on UTMB connect Galveston to the statewide healthcare and life-sciences system.' },
    { label: 'Trade, Transportation & Logistics', href: '/texas-industries/trade-transportation-logistics', context: 'Port activity and Gulf shipping connect Galveston to statewide and international trade.' },
  ],
  beaumont: [
    { label: 'Energy & Power', href: '/texas-industries/energy-power', context: 'Beaumont is part of the Upper Gulf Coast refining, petrochemical and energy corridor.' },
    { label: 'Advanced Manufacturing', href: '/texas-industries/advanced-manufacturing', context: 'Chemical, industrial and fabricated production connect the Beaumont area to Texas manufacturing.' },
    { label: 'Trade, Transportation & Logistics', href: '/texas-industries/trade-transportation-logistics', context: 'The Sabine-Neches waterway, rail and highway freight tie Beaumont to Gulf Coast logistics.' },
  ],
  'port-arthur': [
    { label: 'Energy & Power', href: '/texas-industries/energy-power', context: 'Port Arthur is one of the state’s major refining and petrochemical centers.' },
    { label: 'Advanced Manufacturing', href: '/texas-industries/advanced-manufacturing', context: 'Large industrial and chemical facilities make advanced production a defining part of the local economy.' },
    { label: 'Trade, Transportation & Logistics', href: '/texas-industries/trade-transportation-logistics', context: 'Deepwater shipping and the Sabine-Neches waterway connect Port Arthur to global trade.' },
  ],
  amarillo: [
    { label: 'Agriculture & Livestock', href: '/texas-industries/agriculture-livestock', context: 'Amarillo serves a broad High Plains cattle, grain, dairy and food-processing region.' },
    { label: 'Trade, Transportation & Logistics', href: '/texas-industries/trade-transportation-logistics', context: 'Interstate highways, rail and regional distribution make Amarillo a major freight crossroads in the Panhandle.' },
  ],
  mcallen: [
    { label: 'Trade, Transportation & Logistics', href: '/texas-industries/trade-transportation-logistics', context: 'McAllen is part of the Rio Grande Valley’s cross-border trade, trucking, warehousing and distribution system.' },
    { label: 'Healthcare & Life Sciences', href: '/texas-industries/healthcare-life-sciences', context: 'Regional hospitals and medical services make healthcare a major employment and service sector in the McAllen area.' },
  ],
  brownsville: [
    { label: 'Trade, Transportation & Logistics', href: '/texas-industries/trade-transportation-logistics', context: 'The Port of Brownsville and cross-border freight connect Brownsville to Gulf and Mexico trade corridors.' },
    { label: 'Aerospace, Aviation & Defense', href: '/texas-industries/aerospace-aviation-defense', context: 'Commercial space activity in Cameron County connects the Brownsville area to Texas’s growing spaceflight economy.' },
  ],
  waco: [
    { label: 'Hospitality, Tourism & Culture', href: '/texas-industries/hospitality-tourism-culture', context: 'Major attractions, sports, museums and visitor traffic make tourism an important part of Waco’s economy.' },
  ],
  bryan: [
    { label: 'Agriculture & Livestock', href: '/texas-industries/agriculture-livestock', context: 'Bryan sits in the Brazos Valley, where agriculture, livestock, food systems and Texas A&M-linked research shape the regional economy.' },
    { label: 'Healthcare & Life Sciences', href: '/texas-industries/healthcare-life-sciences', context: 'Regional healthcare systems and university-linked research connect Bryan to the statewide health and life-sciences sector.' },
  ],
  'college-station': [
    { label: 'Agriculture & Livestock', href: '/texas-industries/agriculture-livestock', context: 'Texas A&M research, extension and agricultural programs connect College Station deeply to the statewide agriculture system.' },
    { label: 'Healthcare & Life Sciences', href: '/texas-industries/healthcare-life-sciences', context: 'Academic health programs, research and regional medical services connect College Station to healthcare and life sciences.' },
  ],
  fredericksburg: [
    { label: 'Hospitality, Tourism & Culture', href: '/texas-industries/hospitality-tourism-culture', context: 'Lodging, wineries, food, historic sites and Hill Country travel make tourism and hospitality central to Fredericksburg.' },
  ],
  'new-braunfels': [
    { label: 'Hospitality, Tourism & Culture', href: '/texas-industries/hospitality-tourism-culture', context: 'River recreation, Schlitterbahn, music, events and Hill Country travel make tourism and hospitality especially important in New Braunfels.' },
  ],
  'round-rock': [
    { label: 'Technology & Semiconductors', href: '/texas-industries/technology-semiconductors', context: 'Round Rock is part of the Austin-area technology corridor and a major center for computer and enterprise-technology operations.' },
    { label: 'Corporate & Professional Services', href: '/texas-industries/corporate-professional-services', context: 'Corporate offices and technology-linked professional services are major parts of the Round Rock economy.' },
  ],
  killeen: [
    { label: 'Aerospace, Aviation & Defense', href: '/texas-industries/aerospace-aviation-defense', context: 'Fort Cavazos and its military-support economy connect Killeen directly to the broader Texas defense sector.' },
  ],
  tyler: [
    { label: 'Healthcare & Life Sciences', href: '/texas-industries/healthcare-life-sciences', context: 'Large regional medical systems make Tyler an important healthcare center for East Texas.' },
  ],
  'san-angelo': [
    { label: 'Agriculture & Livestock', href: '/texas-industries/agriculture-livestock', context: 'Ranching, livestock, wool and agricultural services remain important parts of the San Angelo and Concho Valley economy.' },
  ],
};

export function getCityIndustryPaths(slug: string) {
  return CITY_INDUSTRY_PATHS[slug] ?? [];
}
