export const OFFICIAL_SOURCE_CATEGORIES = [
  {
    id: 'outdoors-parks',
    label: 'Texas outdoors and parks',
    keywords: ['park', 'parks', 'camp', 'camping', 'hike', 'hiking', 'hunt', 'hunting', 'fish', 'fishing', 'wildlife', 'beach', 'beaches', 'trail', 'trails', 'rv'],
    sources: [
      { name: 'Texas Parks & Wildlife Department', url: 'https://tpwd.texas.gov/' },
      { name: 'National Park Service — Texas', url: 'https://www.nps.gov/state/tx/index.htm' },
    ],
  },
  {
    id: 'roads-transportation',
    label: 'Texas roads and transportation',
    keywords: ['road', 'roads', 'highway', 'highways', 'traffic', 'txdot', 'fm', 'rm', 'frontage', 'toll', 'bridge', 'transportation', 'transit'],
    sources: [
      { name: 'Texas Department of Transportation', url: 'https://www.txdot.gov/' },
      { name: 'DriveTexas', url: 'https://drivetexas.org/' },
    ],
  },
  {
    id: 'education-schools',
    label: 'Texas schools and education',
    keywords: ['school', 'schools', 'district', 'isd', 'teacher', 'student', 'college', 'university', 'education', 'tea'],
    sources: [
      { name: 'Texas Education Agency', url: 'https://tea.texas.gov/' },
      { name: 'Texas Higher Education Coordinating Board', url: 'https://www.highered.texas.gov/' },
    ],
  },
  {
    id: 'property-tax',
    label: 'Texas property tax and appraisal',
    keywords: ['property', 'tax', 'taxes', 'appraisal', 'appraisal district', 'homestead', 'mud', 'pid', 'cad', 'exemption'],
    sources: [
      { name: 'Texas Comptroller — Property Tax Assistance', url: 'https://comptroller.texas.gov/taxes/property-tax/' },
    ],
  },
  {
    id: 'laws-government',
    label: 'Texas laws and government',
    keywords: ['law', 'laws', 'legal', 'statute', 'rule', 'rules', 'legislature', 'county government', 'city government', 'permit', 'license', 'deadline'],
    sources: [
      { name: 'Texas Legislature Online', url: 'https://capitol.texas.gov/' },
      { name: 'Texas Constitution and Statutes', url: 'https://statutes.capitol.texas.gov/' },
      { name: 'Texas.gov', url: 'https://www.texas.gov/' },
    ],
  },
  {
    id: 'weather-emergency',
    label: 'Texas weather and emergency conditions',
    keywords: ['weather', 'forecast', 'storm', 'hurricane', 'tornado', 'freeze', 'heat', 'flood', 'warning', 'closure', 'closed'],
    sources: [
      { name: 'National Weather Service', url: 'https://www.weather.gov/' },
      { name: 'Texas Division of Emergency Management', url: 'https://www.tdem.texas.gov/' },
    ],
  },
  {
    id: 'water-environment',
    label: 'Texas water and environment',
    keywords: ['water', 'lake', 'lakes', 'river', 'rivers', 'reservoir', 'drought', 'aquifer', 'tceq', 'twdb', 'environment', 'quality'],
    sources: [
      { name: 'Texas Water Development Board', url: 'https://www.twdb.texas.gov/' },
      { name: 'Texas Commission on Environmental Quality', url: 'https://www.tceq.texas.gov/' },
    ],
  },
  {
    id: 'health-safety',
    label: 'Texas health and public safety',
    keywords: ['health', 'hospital', 'clinic', 'disease', 'vaccine', 'safety', 'emergency', 'dshs'],
    sources: [
      { name: 'Texas Department of State Health Services', url: 'https://www.dshs.texas.gov/' },
    ],
  },
  {
    id: 'travel-lodging',
    label: 'Texas travel and lodging',
    keywords: ['hotel', 'hotels', 'stay', 'lodging', 'resort', 'trip', 'travel', 'vacation', 'weekend', 'itinerary', 'kemah', 'fredericksburg'],
    sources: [
      { name: 'Travel Texas', url: 'https://www.traveltexas.com/' },
      { name: 'Official destination or property website', url: null },
    ],
  },
  {
    id: 'events-entertainment',
    label: 'Texas events and entertainment',
    keywords: ['event', 'events', 'festival', 'festivals', 'concert', 'rodeo', 'fair', 'ticket', 'tickets', 'tonight', 'weekend'],
    sources: [
      { name: 'Official event, venue, city, or organizer website', url: null },
    ],
  },
  {
    id: 'housing-moving',
    label: 'Moving and living in Texas',
    keywords: ['move', 'moving', 'live', 'living', 'home', 'house', 'housing', 'retire', 'retirement', 'commute', 'neighborhood', 'relocation'],
    sources: [
      { name: 'U.S. Census Bureau', url: 'https://www.census.gov/' },
      { name: 'Texas Real Estate Research Center', url: 'https://trerc.tamu.edu/' },
      { name: 'Relevant city, county, school district, and appraisal district websites', url: null },
    ],
  },
  {
    id: 'food-culture',
    label: 'Texas food and culture',
    keywords: ['food', 'restaurant', 'restaurants', 'barbecue', 'bbq', 'kolache', 'klobasnek', 'culture', 'tradition', 'traditions'],
    sources: [
      { name: 'Official business, museum, historical, or cultural organization website', url: null },
    ],
  },
  {
    id: 'history-geography',
    label: 'Texas history and geography',
    keywords: ['history', 'historic', 'county', 'counties', 'city', 'cities', 'region', 'regions', 'geography', 'population', 'county seat'],
    sources: [
      { name: 'Texas State Historical Association', url: 'https://www.tshaonline.org/' },
      { name: 'Texas State Library and Archives Commission', url: 'https://www.tsl.texas.gov/' },
      { name: 'U.S. Census Bureau', url: 'https://www.census.gov/' },
    ],
  },
];

export function classifyOfficialSources(tokens) {
  const tokenSet = new Set(tokens);
  let best = null;
  let bestScore = 0;

  for (const category of OFFICIAL_SOURCE_CATEGORIES) {
    let score = 0;
    for (const keyword of category.keywords) {
      const parts = keyword.split(/\s+/);
      if (parts.every((part) => tokenSet.has(part))) score += parts.length;
    }
    if (score > bestScore) {
      best = category;
      bestScore = score;
    }
  }

  return best ?? {
    id: 'general-texas',
    label: 'General Texas information',
    keywords: [],
    sources: [
      { name: 'Texas.gov', url: 'https://www.texas.gov/' },
      { name: 'Relevant state, county, city, agency, institution, or official business website', url: null },
    ],
  };
}
