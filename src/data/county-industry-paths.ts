export type CountyIndustryPath = {
  label: string;
  href: string;
  context: string;
};

export const COUNTY_INDUSTRY_PATHS: Record<string, ReadonlyArray<CountyIndustryPath>> = {
  harris: [
    { label: 'Energy & Power', href: '/texas-industries/energy-power', context: 'Harris County sits at the center of the Houston energy system, including corporate operations, refining, petrochemicals, pipelines, engineering and global trade.' },
    { label: 'Healthcare & Life Sciences', href: '/texas-industries/healthcare-life-sciences', context: 'The Texas Medical Center and surrounding health systems make healthcare, research and life sciences a major county-scale industry.' },
    { label: 'Trade, Transportation & Logistics', href: '/texas-industries/trade-transportation-logistics', context: 'Port Houston, rail, highways, airports and distribution infrastructure connect Harris County to national and global freight.' },
    { label: 'Aerospace, Aviation & Defense', href: '/texas-industries/aerospace-aviation-defense', context: 'Johnson Space Center and the Houston aerospace contractor network connect the county to human spaceflight and engineering.' },
  ],
  dallas: [
    { label: 'Financial Services', href: '/texas-industries/financial-services', context: 'Dallas County is part of the state’s largest concentration of banking, investment, insurance and corporate finance activity.' },
    { label: 'Corporate & Professional Services', href: '/texas-industries/corporate-professional-services', context: 'Headquarters, consulting, legal, accounting and corporate operations are major parts of the Dallas County economy.' },
    { label: 'Technology & Semiconductors', href: '/texas-industries/technology-semiconductors', context: 'Dallas County sits inside the North Texas technology, telecommunications, data and semiconductor ecosystem.' },
    { label: 'Trade, Transportation & Logistics', href: '/texas-industries/trade-transportation-logistics', context: 'Highways, airports, rail and distribution infrastructure tie Dallas County into the broader Metroplex logistics network.' },
  ],
  tarrant: [
    { label: 'Aerospace, Aviation & Defense', href: '/texas-industries/aerospace-aviation-defense', context: 'Fort Worth and Tarrant County anchor aircraft manufacturing, defense, aviation engineering and supplier activity in North Texas.' },
    { label: 'Advanced Manufacturing', href: '/texas-industries/advanced-manufacturing', context: 'Aerospace systems, electronics, machinery and other advanced manufacturing are important parts of the county’s industrial base.' },
    { label: 'Trade, Transportation & Logistics', href: '/texas-industries/trade-transportation-logistics', context: 'Tarrant County is integrated with DFW freight, air cargo, rail, warehouse and interstate distribution networks.' },
  ],
  travis: [
    { label: 'Technology & Semiconductors', href: '/texas-industries/technology-semiconductors', context: 'Travis County is the core of the Austin software, AI, semiconductor, startup and research economy.' },
    { label: 'Advanced Manufacturing', href: '/texas-industries/advanced-manufacturing', context: 'Central Texas advanced production includes semiconductors, electronics, electric vehicles and specialized suppliers.' },
    { label: 'Corporate & Professional Services', href: '/texas-industries/corporate-professional-services', context: 'Technology companies, startups and state-capital activity support a large professional-services workforce.' },
  ],
  williamson: [
    { label: 'Technology & Semiconductors', href: '/texas-industries/technology-semiconductors', context: 'Williamson County is directly tied to the north Austin technology corridor and major semiconductor manufacturing investment around Taylor.' },
    { label: 'Advanced Manufacturing', href: '/texas-industries/advanced-manufacturing', context: 'Semiconductor fabrication, suppliers, construction and production infrastructure make advanced manufacturing especially important here.' },
    { label: 'Construction & Real Estate', href: '/texas-industries/construction-real-estate', context: 'Rapid population and industrial growth have made residential, commercial and infrastructure construction highly visible across the county.' },
  ],
  grayson: [
    { label: 'Technology & Semiconductors', href: '/texas-industries/technology-semiconductors', context: 'Sherman anchors one of Texas’s most important semiconductor manufacturing expansions, linking Grayson County directly to the chip industry.' },
    { label: 'Advanced Manufacturing', href: '/texas-industries/advanced-manufacturing', context: 'Semiconductor fabs and their suppliers make advanced manufacturing a defining growth sector for the Sherman-Denison area.' },
  ],
  collin: [
    { label: 'Technology & Semiconductors', href: '/texas-industries/technology-semiconductors', context: 'Plano, Richardson-area employers and the wider North Texas technology corridor connect Collin County to enterprise technology, telecom and semiconductor activity.' },
    { label: 'Financial Services', href: '/texas-industries/financial-services', context: 'Corporate finance, banking and insurance operations are major parts of the broader North Dallas employment market.' },
    { label: 'Corporate & Professional Services', href: '/texas-industries/corporate-professional-services', context: 'Corporate offices and professional services are central to the county’s large white-collar employment base.' },
  ],
  bexar: [
    { label: 'Aerospace, Aviation & Defense', href: '/texas-industries/aerospace-aviation-defense', context: 'Military aviation, maintenance, cyber and defense activity make aerospace and defense a longstanding Bexar County industry.' },
    { label: 'Advanced Manufacturing', href: '/texas-industries/advanced-manufacturing', context: 'Automotive production and suppliers connect Bexar County to the statewide advanced-manufacturing system.' },
    { label: 'Healthcare & Life Sciences', href: '/texas-industries/healthcare-life-sciences', context: 'Academic medicine, military medicine, biomedical research and regional health systems make healthcare a major county employer.' },
    { label: 'Hospitality, Tourism & Culture', href: '/texas-industries/hospitality-tourism-culture', context: 'San Antonio attractions, conventions, heritage tourism and hotels give Bexar County a major visitor economy.' },
  ],
  nueces: [
    { label: 'Energy & Power', href: '/texas-industries/energy-power', context: 'Refining, petrochemicals and export infrastructure connect Nueces County directly to the Gulf Coast energy system.' },
    { label: 'Trade, Transportation & Logistics', href: '/texas-industries/trade-transportation-logistics', context: 'Port of Corpus Christi activity and Gulf shipping make freight and global trade central to the county economy.' },
    { label: 'Hospitality, Tourism & Culture', href: '/texas-industries/hospitality-tourism-culture', context: 'Beaches, attractions, events and coastal travel support a large hospitality and visitor sector.' },
  ],
  webb: [
    { label: 'Trade, Transportation & Logistics', href: '/texas-industries/trade-transportation-logistics', context: 'Laredo is one of the most important U.S.-Mexico land-port gateways, making trucking, rail, customs, warehousing and cross-border trade central to Webb County.' },
    { label: 'Advanced Manufacturing', href: '/texas-industries/advanced-manufacturing', context: 'Cross-border supply chains tie Webb County to the manufacturing networks of Texas, Mexico and the wider North American market.' },
  ],
  'el-paso': [
    { label: 'Trade, Transportation & Logistics', href: '/texas-industries/trade-transportation-logistics', context: 'Border crossings, trucking, rail and distribution connect El Paso County to one of the state’s largest cross-border trade systems.' },
    { label: 'Advanced Manufacturing', href: '/texas-industries/advanced-manufacturing', context: 'El Paso’s binational supply chains connect the county to electronics, components and other manufacturing activity across the border region.' },
    { label: 'Aerospace, Aviation & Defense', href: '/texas-industries/aerospace-aviation-defense', context: 'Fort Bliss and the regional military economy connect El Paso County to defense, aviation, logistics and technical services.' },
  ],
  cameron: [
    { label: 'Trade, Transportation & Logistics', href: '/texas-industries/trade-transportation-logistics', context: 'Border crossings, Port of Brownsville activity and regional freight connect Cameron County to international trade and logistics.' },
    { label: 'Aerospace, Aviation & Defense', href: '/texas-industries/aerospace-aviation-defense', context: 'Commercial launch activity in South Texas adds a distinctive aerospace layer to the county economy.' },
    { label: 'Hospitality, Tourism & Culture', href: '/texas-industries/hospitality-tourism-culture', context: 'South Padre Island, Gulf beaches and regional attractions support a major visitor economy.' },
  ],
  hidalgo: [
    { label: 'Trade, Transportation & Logistics', href: '/texas-industries/trade-transportation-logistics', context: 'Border trade, trucking, warehousing and produce distribution connect Hidalgo County to the Texas-Mexico supply chain.' },
    { label: 'Agriculture & Livestock', href: '/texas-industries/agriculture-livestock', context: 'The Rio Grande Valley remains an important specialty-crop and agricultural region with strong food-distribution links.' },
    { label: 'Healthcare & Life Sciences', href: '/texas-industries/healthcare-life-sciences', context: 'Fast population growth and regional medical systems make healthcare a major and expanding employment sector.' },
  ],
  midland: [
    { label: 'Energy & Power', href: '/texas-industries/energy-power', context: 'Midland County is at the core of the Permian Basin oil and gas economy, including production, field services, engineering and corporate operations.' },
    { label: 'Construction & Real Estate', href: '/texas-industries/construction-real-estate', context: 'Energy cycles and population growth drive recurring demand for housing, commercial development and industrial construction.' },
  ],
  ector: [
    { label: 'Energy & Power', href: '/texas-industries/energy-power', context: 'Odessa and Ector County are central to Permian Basin production, oilfield services, equipment and energy infrastructure.' },
    { label: 'Advanced Manufacturing', href: '/texas-industries/advanced-manufacturing', context: 'Energy equipment, machinery, fabrication and industrial services give the county a strong manufacturing connection.' },
  ],
  reeves: [
    { label: 'Energy & Power', href: '/texas-industries/energy-power', context: 'Reeves County is part of the Delaware Basin oil and gas system, with production, gathering, pipelines and field infrastructure shaping the local economy.' },
  ],
  glasscock: [
    { label: 'Energy & Power', href: '/texas-industries/energy-power', context: 'Oil and gas production in the Permian Basin is a defining economic system for Glasscock County.' },
    { label: 'Agriculture & Livestock', href: '/texas-industries/agriculture-livestock', context: 'Ranching and agricultural land use remain part of the county’s economy alongside energy production.' },
  ],
  howard: [
    { label: 'Energy & Power', href: '/texas-industries/energy-power', context: 'Big Spring and Howard County sit inside the Permian Basin energy system, with oil, gas, refining and field services shaping the regional economy.' },
  ],
  lubbock: [
    { label: 'Agriculture & Livestock', href: '/texas-industries/agriculture-livestock', context: 'Lubbock County is a major South Plains center for cotton, grains, cattle, agricultural services and food-related commerce.' },
    { label: 'Healthcare & Life Sciences', href: '/texas-industries/healthcare-life-sciences', context: 'Regional medical systems and university-linked healthcare make Lubbock a major West Texas medical center.' },
  ],
  hale: [
    { label: 'Agriculture & Livestock', href: '/texas-industries/agriculture-livestock', context: 'Irrigated farming, cotton, grains, livestock and food production are longstanding parts of the Hale County economy.' },
  ],
  'deaf-smith': [
    { label: 'Agriculture & Livestock', href: '/texas-industries/agriculture-livestock', context: 'Cattle feeding, dairy, grains and irrigated agriculture make Deaf Smith County part of the High Plains agricultural system.' },
  ],
  potter: [
    { label: 'Agriculture & Livestock', href: '/texas-industries/agriculture-livestock', context: 'Amarillo serves as a regional center for cattle, grains, agricultural services and food processing across the High Plains.' },
    { label: 'Trade, Transportation & Logistics', href: '/texas-industries/trade-transportation-logistics', context: 'Interstate highways, rail and regional distribution connect Potter County to freight movement across the Panhandle.' },
  ],
  randall: [
    { label: 'Agriculture & Livestock', href: '/texas-industries/agriculture-livestock', context: 'Randall County sits in the High Plains farm-and-ranch economy surrounding Amarillo.' },
    { label: 'Construction & Real Estate', href: '/texas-industries/construction-real-estate', context: 'Amarillo-area growth supports residential, commercial and infrastructure development in the county.' },
  ],
  brazoria: [
    { label: 'Energy & Power', href: '/texas-industries/energy-power', context: 'Petrochemicals, refining, industrial plants and Gulf Coast energy infrastructure make energy a major Brazoria County industry.' },
    { label: 'Advanced Manufacturing', href: '/texas-industries/advanced-manufacturing', context: 'Chemical production, fabricated products and industrial processing tie the county to advanced manufacturing.' },
  ],
  jefferson: [
    { label: 'Energy & Power', href: '/texas-industries/energy-power', context: 'Beaumont-Port Arthur refining, petrochemicals and export infrastructure make Jefferson County a core Gulf Coast energy center.' },
    { label: 'Trade, Transportation & Logistics', href: '/texas-industries/trade-transportation-logistics', context: 'Ports, rail and Gulf shipping connect the county’s industrial base to national and international markets.' },
    { label: 'Advanced Manufacturing', href: '/texas-industries/advanced-manufacturing', context: 'Refining, chemicals and industrial production create a substantial manufacturing footprint.' },
  ],
  galveston: [
    { label: 'Healthcare & Life Sciences', href: '/texas-industries/healthcare-life-sciences', context: 'Academic medicine and research give Galveston County an important healthcare and life-sciences presence.' },
    { label: 'Trade, Transportation & Logistics', href: '/texas-industries/trade-transportation-logistics', context: 'Port activity and Gulf shipping connect the county to the broader Houston-Galveston trade system.' },
    { label: 'Hospitality, Tourism & Culture', href: '/texas-industries/hospitality-tourism-culture', context: 'Beaches, cruises, historic districts, attractions and events make tourism one of the county’s most visible industries.' },
  ],
  'fort-bend': [
    { label: 'Energy & Power', href: '/texas-industries/energy-power', context: 'Fort Bend County is closely tied to the Houston energy headquarters, engineering and services economy.' },
    { label: 'Healthcare & Life Sciences', href: '/texas-industries/healthcare-life-sciences', context: 'Population growth and proximity to Houston support major hospital, clinic and health-services expansion.' },
    { label: 'Corporate & Professional Services', href: '/texas-industries/corporate-professional-services', context: 'Corporate offices, engineering and professional services are major parts of the suburban Houston employment base.' },
  ],
  montgomery: [
    { label: 'Energy & Power', href: '/texas-industries/energy-power', context: 'The Woodlands and southern Montgomery County are tied to the Houston energy, engineering and corporate-services economy.' },
    { label: 'Corporate & Professional Services', href: '/texas-industries/corporate-professional-services', context: 'Corporate offices and professional services are important parts of the county’s fast-growing employment base.' },
    { label: 'Construction & Real Estate', href: '/texas-industries/construction-real-estate', context: 'Rapid residential and commercial growth makes construction and development especially visible across the county.' },
  ],
  mclennan: [
    { label: 'Advanced Manufacturing', href: '/texas-industries/advanced-manufacturing', context: 'Waco and McLennan County support manufacturing, food production, machinery and a broad regional supplier base.' },
    { label: 'Healthcare & Life Sciences', href: '/texas-industries/healthcare-life-sciences', context: 'Regional hospital systems make healthcare one of the area’s major employment sectors.' },
    { label: 'Hospitality, Tourism & Culture', href: '/texas-industries/hospitality-tourism-culture', context: 'Waco attractions, events and visitor traffic create a substantial hospitality economy.' },
  ],
  bell: [
    { label: 'Aerospace, Aviation & Defense', href: '/texas-industries/aerospace-aviation-defense', context: 'Fort Hood and the surrounding military ecosystem connect Bell County to defense, logistics, aviation and technical services.' },
    { label: 'Healthcare & Life Sciences', href: '/texas-industries/healthcare-life-sciences', context: 'Large regional health systems and military-connected care make healthcare a major local employer.' },
  ],
  guadalupe: [
    { label: 'Advanced Manufacturing', href: '/texas-industries/advanced-manufacturing', context: 'The Seguin area and the I-35 corridor connect Guadalupe County to automotive, machinery and supplier manufacturing.' },
    { label: 'Construction & Real Estate', href: '/texas-industries/construction-real-estate', context: 'Fast growth between San Antonio and Austin drives housing, commercial and infrastructure construction.' },
  ],
  comal: [
    { label: 'Construction & Real Estate', href: '/texas-industries/construction-real-estate', context: 'Rapid growth around New Braunfels and the I-35 corridor supports major residential, commercial and infrastructure development.' },
    { label: 'Hospitality, Tourism & Culture', href: '/texas-industries/hospitality-tourism-culture', context: 'River recreation, Gruene, events and Hill Country travel give Comal County a large visitor economy.' },
  ],
};

export function getCountyIndustryPaths(slug: string) {
  return COUNTY_INDUSTRY_PATHS[slug] ?? [];
}
