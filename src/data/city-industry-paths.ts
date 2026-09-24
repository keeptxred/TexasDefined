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
};

export function getCityIndustryPaths(slug: string) {
  return CITY_INDUSTRY_PATHS[slug] ?? [];
}
