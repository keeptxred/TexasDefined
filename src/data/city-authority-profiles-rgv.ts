import type { CityAuthorityProfile, CityAuthoritySystem } from './city-authority-profiles';

const TEXAS_LIFE_CITY_CONTEXT: CityAuthoritySystem = {
  title: 'TexasDefined city context',
  summary: 'Use the statewide guides to compare the city with other Texas metros and regions, then put jobs, schools, family logistics and everyday living conditions around the local systems above.',
  links: [
    { label: 'Texas cities & regions', href: '/article/texas-major-cities-regional-differences' },
    { label: 'Texas jobs & industries', href: '/article/texas-jobs-economy-industries' },
    { label: 'Texas schools & family life', href: '/article/texas-schools-family-life' },
    { label: 'Texas health & daily safety', href: '/article/texas-health-safety-daily-living' },
  ],
};

const profiles: Record<string, CityAuthorityProfile> = {
  mcallen: {
    population2020: 142_210,
    censusUrl: 'https://www.census.gov/quickfacts/fact/table/mcallencitytexas/PST045225',
    systems: [
      {
        title: 'Water & city utilities',
        summary: 'McAllen Public Utility is the city utility organization associated with municipal water and wastewater services. Electric service is address-specific, so verify the actual provider and service territory for a home or business rather than inferring it from the McAllen mailing address.',
        links: [{ label: 'City of McAllen departments', href: 'https://www.mcallen.net/departments/home' }],
      },
      {
        title: 'Public transportation',
        summary: 'Metro McAllen operates the city public-transit network, including fixed bus routes, Micro McAllen and paratransit. It also connects with other Rio Grande Valley transportation systems, so use the live network for current routes and service changes.',
        links: [{ label: 'Metro McAllen', href: 'https://www.mcallen.net/metro/' }],
      },
      {
        title: 'Airport',
        summary: 'McAllen International Airport (MFE) is the city’s commercial airport and a major Rio Grande Valley air gateway. The City of McAllen operates the official airport information for airlines, parking, terminal services and ground transportation.',
        links: [{ label: 'McAllen International Airport', href: 'https://www.mcallen.net/departments/airport' }],
      },
      {
        title: 'Schools',
        summary: 'McAllen ISD is the principal public-school district associated with the city, but district boundaries and open-enrollment options should be checked for the exact address and student situation rather than assumed from the city name.',
        links: [{ label: 'McAllen ISD', href: 'https://www.mcallenisd.org/' }, { label: 'TexasDefined district lookup', href: '/find-my-school-district' }],
      },
    ],
  },
  edinburg: {
    population2020: 100_243,
    censusUrl: 'https://www.census.gov/quickfacts/fact/table/edinburgcitytexas/PST045225',
    systems: [
      {
        title: 'Water & city utilities',
        summary: 'The City of Edinburg Utilities Department operates municipal water production and treatment, distribution, wastewater collection and wastewater treatment. Other utilities can depend on the exact service territory, so verify the address before comparing providers or costs.',
        links: [{ label: 'Edinburg Utilities', href: 'https://www.cityofedinburg.com/departments/utilities/index.php' }],
      },
      {
        title: 'Regional transportation',
        summary: 'Valley Metro provides regional transit connections serving Edinburg, including Edinburg–McAllen and local Edinburg routes documented by the Lower Rio Grande Valley Development Council. Use current Valley Metro information for schedules and route changes.',
        links: [{ label: 'Lower Rio Grande Valley Development Council', href: 'https://www.lrgvdc.org/' }],
      },
      {
        title: 'Airport',
        summary: 'South Texas International Airport at Edinburg (EBG/KEBG) is the city-owned airport. It supports general aviation, charter, law-enforcement, military, medevac and international operations with on-site U.S. Customs; scheduled commercial airline travel in the Valley uses other regional airports.',
        links: [{ label: 'South Texas International Airport at Edinburg', href: 'https://www.cityofedinburg.com/departments/aviation/index.php' }],
      },
      {
        title: 'Schools',
        summary: 'Edinburg Consolidated ISD is the major public-school district associated with the city. Verify the serving campus and district for the exact address through the district’s current zoning resources rather than relying on a mailing-city label alone.',
        links: [{ label: 'Edinburg CISD', href: 'https://www.ecisd.us/' }, { label: 'TexasDefined district lookup', href: '/find-my-school-district' }],
      },
    ],
  },
};

export function getRgvCityAuthorityProfile(slug: string) {
  const profile = profiles[slug];
  if (!profile) return undefined;
  return { ...profile, systems: [...profile.systems, TEXAS_LIFE_CITY_CONTEXT] };
}
