export type CityAuthoritySystem = {
  title: string;
  summary: string;
  links: ReadonlyArray<{ label: string; href: string }>;
};

export type CityAuthorityProfile = {
  population2020: number;
  censusUrl: string;
  systems: ReadonlyArray<CityAuthoritySystem>;
};

const profiles: Record<string, CityAuthorityProfile> = {
  houston: {
    population2020: 2_304_580,
    censusUrl: 'https://www.census.gov/quickfacts/fact/table/houstoncitytexas/PST045225',
    systems: [
      {
        title: 'Water & city utilities',
        summary: 'Houston Public Works operates core municipal infrastructure, including drinking-water and wastewater services. Electricity arrangements can vary by address, so verify the actual service territory and account rather than assuming the city is the electric utility.',
        links: [{ label: 'Houston Public Works', href: 'https://www.houstonpublicworks.org/' }],
      },
      {
        title: 'Public transportation',
        summary: 'METRO is the regional public-transit system serving Houston-area riders through bus, rail, Park & Ride and other mobility services. Use the live agency site for routes, schedules and service changes.',
        links: [{ label: 'METRO', href: 'https://www.ridemetro.org/' }],
      },
      {
        title: 'Airports',
        summary: 'Houston Airports is the City of Houston aviation department. Its system includes George Bush Intercontinental Airport (IAH), William P. Hobby Airport (HOU) and Ellington Airport (EFD).',
        links: [{ label: 'Houston Airports', href: 'https://www.fly2houston.com/' }],
      },
      {
        title: 'Schools',
        summary: 'Houston ISD is a major public-school district serving the city, but a Houston mailing address does not guarantee Houston ISD. Confirm the district for the exact address before making a school or home decision.',
        links: [{ label: 'Houston ISD', href: 'https://www.houstonisd.org/' }, { label: 'TexasDefined district lookup', href: '/find-my-school-district' }],
      },
    ],
  },
  dallas: {
    population2020: 1_304_379,
    censusUrl: 'https://www.census.gov/quickfacts/fact/table/dallascitytexas/PST045225',
    systems: [
      {
        title: 'Water & city utilities',
        summary: 'Dallas Water Utilities provides city and regional water, wastewater, stormwater and flood-control services. Electric service is not a one-size-fits-all city utility arrangement, so verify the provider and service territory for the property itself.',
        links: [{ label: 'Dallas Water Utilities', href: 'https://dallascityhall.com/departments/waterutilities/Pages/default.aspx' }],
      },
      {
        title: 'Public transportation',
        summary: 'Dallas Area Rapid Transit (DART) provides bus, rail, GoLink, streetcar and paratransit services across Dallas and other member cities in North Texas.',
        links: [{ label: 'DART', href: 'https://www.dart.org/' }],
      },
      {
        title: 'Airports',
        summary: 'Dallas Love Field (DAL) is the city airport closest to central Dallas, while Dallas Fort Worth International Airport (DFW) is the region’s major international airport. Check the specific airport before planning ground transportation.',
        links: [{ label: 'Dallas Love Field', href: 'https://www.dallas-lovefield.com/' }, { label: 'DFW International', href: 'https://www.dfwairport.com/' }],
      },
      {
        title: 'Schools',
        summary: 'Dallas ISD is the primary large district associated with Dallas, but school-district boundaries do not simply follow the city line. Verify the district and attendance zone for the exact address.',
        links: [{ label: 'Dallas ISD', href: 'https://www.dallasisd.org/' }, { label: 'TexasDefined district lookup', href: '/find-my-school-district' }],
      },
    ],
  },
  'fort-worth': {
    population2020: 918_915,
    censusUrl: 'https://www.census.gov/quickfacts/fact/table/fortworthcitytexas/PST045225',
    systems: [
      {
        title: 'Water & city utilities',
        summary: 'Fort Worth Water provides water, wastewater and reclaimed-water services in Fort Worth and to surrounding communities. For electricity, verify the service territory and retail arrangement tied to the exact property.',
        links: [{ label: 'Fort Worth Water', href: 'https://www.fortworthtexas.gov/departments/water' }],
      },
      {
        title: 'Public transportation',
        summary: 'Trinity Metro is a regional transportation authority rather than a Fort Worth city department. Its services include buses, TEXRail, on-demand service, paratransit and connections with Trinity Railway Express.',
        links: [{ label: 'Trinity Metro', href: 'https://ridetrinitymetro.org/' }],
      },
      {
        title: 'Airports',
        summary: 'Dallas Fort Worth International Airport is the region’s principal international airport and is linked to Fort Worth by TEXRail. Local general-aviation airports serve additional aviation needs.',
        links: [{ label: 'DFW International', href: 'https://www.dfwairport.com/' }, { label: 'Fort Worth aviation', href: 'https://www.fortworthtexas.gov/departments/aviation' }],
      },
      {
        title: 'Schools',
        summary: 'Fort Worth ISD serves a large share of the city, but multiple school districts cross the broader Fort Worth area. Confirm the district for the property address rather than relying on the city name.',
        links: [{ label: 'Fort Worth ISD', href: 'https://www.fwisd.org/' }, { label: 'TexasDefined district lookup', href: '/find-my-school-district' }],
      },
    ],
  },
  austin: {
    population2020: 961_855,
    censusUrl: 'https://www.census.gov/quickfacts/fact/table/austincitytexas/PST045225',
    systems: [
      {
        title: 'Water & electric utilities',
        summary: 'Austin Water provides municipal water and wastewater services, while Austin Energy is the City of Austin’s electric utility. Service boundaries can extend beyond or stop short of a mailing-city label, so verify the actual address.',
        links: [{ label: 'Austin Water', href: 'https://www.austintexas.gov/water' }, { label: 'Austin Energy', href: 'https://austinenergy.com/' }],
      },
      {
        title: 'Public transportation',
        summary: 'CapMetro is the public-transit agency for Austin and Central Texas, operating bus, rail and other mobility services. Use live system information for routes and schedules.',
        links: [{ label: 'CapMetro', href: 'https://www.capmetro.org/' }],
      },
      {
        title: 'Airport',
        summary: 'Austin-Bergstrom International Airport (AUS) is Austin’s primary commercial airport. The City of Austin maintains the official airport information and travel notices.',
        links: [{ label: 'Austin-Bergstrom International', href: 'https://www.austintexas.gov/airport' }],
      },
      {
        title: 'Schools',
        summary: 'Austin ISD is the central city’s major school district, but the Austin area includes several districts and boundaries do not match city or mailing-address lines. Verify the district for the exact address.',
        links: [{ label: 'Austin ISD', href: 'https://www.austinisd.org/' }, { label: 'TexasDefined district lookup', href: '/find-my-school-district' }],
      },
    ],
  },
  'san-antonio': {
    population2020: 1_434_625,
    censusUrl: 'https://www.census.gov/quickfacts/fact/table/sanantoniocitytexas/PST045225',
    systems: [
      {
        title: 'Water, electric & gas utilities',
        summary: 'The City of San Antonio owns its electric and gas utilities through CPS Energy and its water and sewer utilities through San Antonio Water System (SAWS). Verify service availability for the exact address, especially near municipal boundaries.',
        links: [{ label: 'City utility overview', href: 'https://www.sa.gov/Directory/Departments/Finance/About/Divisions/Public-Utilities' }, { label: 'CPS Energy', href: 'https://www.cpsenergy.com/' }, { label: 'SAWS', href: 'https://www.saws.org/' }],
      },
      {
        title: 'Public transportation',
        summary: 'VIA Metropolitan Transit is the regional public-transportation provider for the San Antonio area. Consult VIA directly for current routes, service levels and trip planning.',
        links: [{ label: 'VIA Metropolitan Transit', href: 'https://www.viainfo.net/' }],
      },
      {
        title: 'Airport',
        summary: 'San Antonio International Airport (SAT) is the city’s primary commercial airport. Use the official airport site for airline, parking, terminal and ground-transportation information.',
        links: [{ label: 'San Antonio International', href: 'https://flysanantonio.com/' }],
      },
      {
        title: 'Schools',
        summary: 'San Antonio ISD serves the urban core, but the city and metro contain numerous independent school districts. Always verify the district and attendance zone for the exact address.',
        links: [{ label: 'San Antonio ISD', href: 'https://schools.saisd.net/' }, { label: 'TexasDefined district lookup', href: '/find-my-school-district' }],
      },
    ],
  },
};

export function getCityAuthorityProfile(slug: string) {
  return profiles[slug];
}
