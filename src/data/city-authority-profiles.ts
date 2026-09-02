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
  'el-paso': {
    population2020: 678_815,
    censusUrl: 'https://www.census.gov/quickfacts/fact/table/elpasocitytexas/PST045225',
    systems: [
      {
        title: 'Water & city utilities',
        summary: 'El Paso Water is a municipally owned water utility serving the city. Electric and other utility arrangements still need to be verified for the exact address rather than inferred from the city name.',
        links: [{ label: 'El Paso Water', href: 'https://www.epwater.org/' }],
      },
      {
        title: 'Public transportation',
        summary: 'Sun Metro is El Paso’s public-transit system. Use its live trip-planning, route and alert tools for current service rather than relying on static schedules in a city guide.',
        links: [{ label: 'Sun Metro', href: 'https://sunmetro.net/' }],
      },
      {
        title: 'Airport',
        summary: 'El Paso International Airport (ELP) is the city’s primary commercial airport and a regional gateway for West Texas, southern New Mexico and northern Mexico.',
        links: [{ label: 'El Paso International', href: 'https://www.elpasointernationalairport.com/' }],
      },
      {
        title: 'Schools',
        summary: 'El Paso ISD is a major district serving the city and Fort Bliss area, but El Paso includes multiple school-district jurisdictions. Verify the district for the exact address.',
        links: [{ label: 'El Paso ISD', href: 'https://www.episd.org/' }, { label: 'TexasDefined district lookup', href: '/find-my-school-district' }],
      },
    ],
  },
  arlington: {
    population2020: 394_266,
    censusUrl: 'https://www.census.gov/quickfacts/fact/table/arlingtoncitytexas/PST045225',
    systems: [
      {
        title: 'Water & city utilities',
        summary: 'Arlington Water Utilities manages municipal water and sewer accounts. Electric service and other utility territories should be verified for the property itself, especially in the wider Metroplex.',
        links: [{ label: 'Arlington Water Utilities', href: 'https://waterbilling.arlingtontx.gov/' }],
      },
      {
        title: 'Public transportation',
        summary: 'Arlington uses a citywide on-demand rideshare transit model rather than a traditional fixed-route city bus network. The service also connects riders with the TRE CentrePort area for regional connections.',
        links: [{ label: 'Arlington On-Demand', href: 'https://www.arlingtontx.gov/City-Services/Transportation-Streets-Traffic/Arlington-On-Demand' }],
      },
      {
        title: 'Airports & regional connections',
        summary: 'Dallas Fort Worth International Airport is the principal commercial airport for the Mid-Cities area. Arlington’s transportation planning also connects into regional rail and transit through nearby transfer points.',
        links: [{ label: 'DFW International', href: 'https://www.dfwairport.com/' }, { label: 'Arlington Transportation', href: 'https://www.arlingtontx.gov/Government/Departments/Department-Directory/Transportation' }],
      },
      {
        title: 'Schools',
        summary: 'Arlington ISD is the city’s major school district, but district and municipal boundaries are not identical. Verify the serving district and attendance zone for the exact address.',
        links: [{ label: 'Arlington ISD', href: 'https://www.aisd.net/' }, { label: 'TexasDefined district lookup', href: '/find-my-school-district' }],
      },
    ],
  },
  'corpus-christi': {
    population2020: 317_863,
    censusUrl: 'https://www.census.gov/quickfacts/fact/table/corpuschristicitytexas/PST045225',
    systems: [
      {
        title: 'Water & city utilities',
        summary: 'Corpus Christi municipal services include water and wastewater systems. Use the city’s current service portal for account, conservation, outage and utility information, and verify other service territories for the exact address.',
        links: [{ label: 'City of Corpus Christi', href: 'https://www.corpuschristitx.gov/' }],
      },
      {
        title: 'Public transportation',
        summary: 'Corpus Christi Regional Transportation Authority is the regional public-transit operator for Corpus Christi, Nueces County and parts of San Patricio County.',
        links: [{ label: 'CCRTA', href: 'https://www.ccrta.org/' }],
      },
      {
        title: 'Airport',
        summary: 'Corpus Christi International Airport (CRP) is the city’s primary commercial airport. Use the airport’s live site for airline, parking and ground-transportation details.',
        links: [{ label: 'Corpus Christi International', href: 'https://www.corpuschristiairport.com/' }],
      },
      {
        title: 'Schools',
        summary: 'Corpus Christi ISD serves much of the city, but school-district boundaries should be verified for the exact address rather than assumed from the Corpus Christi mailing label.',
        links: [{ label: 'Corpus Christi ISD', href: 'https://www.ccisd.us/' }, { label: 'TexasDefined district lookup', href: '/find-my-school-district' }],
      },
    ],
  },
  plano: {
    population2020: 285_494,
    censusUrl: 'https://www.census.gov/quickfacts/fact/table/planocitytexas/PST045225',
    systems: [
      {
        title: 'Water & city utilities',
        summary: 'Plano Customer & Utility Services manages water, sewer and trash service accounts. Electric service remains address-specific and should be verified separately from the city utility account.',
        links: [{ label: 'Plano Customer & Utility Services', href: 'https://cus.plano.gov/' }],
      },
      {
        title: 'Public transportation',
        summary: 'Plano is connected to the wider North Texas transit network through DART. Use DART’s current maps and trip-planning tools for rail, bus and other service information.',
        links: [{ label: 'DART', href: 'https://www.dart.org/' }],
      },
      {
        title: 'Airports',
        summary: 'Plano has no large commercial airport of its own; DFW International and Dallas Love Field are the major commercial airports used across the North Texas region.',
        links: [{ label: 'DFW International', href: 'https://www.dfwairport.com/' }, { label: 'Dallas Love Field', href: 'https://www.dallas-lovefield.com/' }],
      },
      {
        title: 'Schools',
        summary: 'Plano ISD is the primary district associated with Plano, but attendance boundaries and nearby municipal lines still require address-level verification.',
        links: [{ label: 'Plano ISD', href: 'https://www.pisd.edu/' }, { label: 'TexasDefined district lookup', href: '/find-my-school-district' }],
      },
    ],
  },
  lubbock: {
    population2020: 257_141,
    censusUrl: 'https://www.census.gov/quickfacts/fact/table/lubbockcitytexas/PST045225',
    systems: [
      {
        title: 'City utilities',
        summary: 'Lubbock’s city government provides local utility and public-service information, while specific electric arrangements and service territories can change over time. Verify the exact property before comparing costs or providers.',
        links: [{ label: 'City of Lubbock', href: 'https://www.mylubbock.us/' }],
      },
      {
        title: 'Public transportation',
        summary: 'Citibus provides public transportation in Lubbock, including fixed-route and accessible services. Use its live route and trip-planning tools for current service.',
        links: [{ label: 'Citibus', href: 'https://citibus.com/' }],
      },
      {
        title: 'Airport',
        summary: 'Lubbock Preston Smith International Airport (LBB) is the South Plains city’s primary commercial airport. Check current airline and passenger information directly with the airport.',
        links: [{ label: 'Lubbock airport', href: 'https://flylbb.com/' }],
      },
      {
        title: 'Schools',
        summary: 'Lubbock ISD is the largest district serving the city, but school-district boundaries still need to be checked for the specific address being considered.',
        links: [{ label: 'Lubbock ISD', href: 'https://www.lubbockisd.org/' }, { label: 'TexasDefined district lookup', href: '/find-my-school-district' }],
      },
    ],
  },
};

export function getCityAuthorityProfile(slug: string) {
  return profiles[slug];
}