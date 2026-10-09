export type CityAuthoritySystem = {
  title: string;
  summary: string;
  links: ReadonlyArray<{ label: string; href: string }>;
};

export type CityAuthorityFeature = {
  title: string;
  summary: string;
  href: string;
  eyebrow?: string;
  image?: {
    src: string;
    alt: string;
  };
};

export type CityAuthorityProfile = {
  population2020: number;
  censusUrl: string;
  populationEstimate?: {
    value: number;
    year: number;
    asOf: string;
  };
  jurisdiction?: {
    primaryCounty: string;
    counties: ReadonlyArray<string>;
    note: string;
    sourceUrl?: string;
  };
  hero?: {
    src: string;
    alt: string;
    sourceUrl?: string;
    credit?: string;
  };
  districts?: ReadonlyArray<{
    name: string;
    summary: string;
  }>;
  featured?: ReadonlyArray<CityAuthorityFeature>;
  tripPlanning?: {
    firstTime: ReadonlyArray<{ title: string; summary: string; href?: string }>;
    stayAreas: ReadonlyArray<{ title: string; summary: string }>;
    freeThings: ReadonlyArray<{ title: string; summary: string; href?: string }>;
  };
  systems: ReadonlyArray<CityAuthoritySystem>;
};

const profiles: Record<string, CityAuthorityProfile> = {
  houston: {
    population2020: 2_304_580,
    censusUrl: 'https://www.census.gov/quickfacts/fact/table/houstoncitytexas/PST045225',
    populationEstimate: { value: 2_397_315, year: 2025, asOf: 'July 1, 2025' },
    jurisdiction: {
      primaryCounty: 'Harris County',
      counties: ['Harris County', 'Fort Bend County', 'Montgomery County', 'Waller County'],
      note: 'Most of Houston is in Harris County, with incorporated city limits also reaching into Fort Bend, Montgomery and Waller counties. Verify the exact address before using county appraisal, election, school, court or other local-service records.',
      sourceUrl: 'https://mycity2.houstontx.gov/gisweb01/rest/services/HoustonMap/Administrative_Boundary/MapServer',
    },
    hero: {
      src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Houston_texas_usa_skyline.jpg?width=1600',
      alt: 'Houston skyline viewed across the city',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Houston_texas_usa_skyline.jpg',
      credit: 'Wikimedia Commons',
    },
    districts: [
      { name: 'Downtown', summary: 'The convention, theater, sports and central-business core, connected to surrounding districts by METRORail and a walkable street grid.' },
      { name: 'Museum District & Hermann Park', summary: 'A dense cultural and family-visitor cluster around major museums, Houston Zoo, Rice University and one of the city’s signature urban parks.' },
      { name: 'Montrose', summary: 'A close-in neighborhood known for restaurants, galleries, historic homes and an independent cultural identity west of downtown.' },
      { name: 'The Heights', summary: 'An older northwest inner-loop district where bungalow neighborhoods, trails and commercial streets create a different pace from downtown.' },
      { name: 'EaDo & East End', summary: 'Stadium access, murals, restaurants, light rail and historic East End neighborhoods make the east side useful for event and culture itineraries.' },
      { name: 'Uptown & the Galleria', summary: 'A major shopping, hotel and employment center west of the Loop with its own traffic and trip-planning logic.' },
      { name: 'Texas Medical Center', summary: 'A major employment and institutional district beside the Museum District whose hospitals, research campuses and transit patterns shape nearby housing and commuting.' },
    ],
    featured: [
      { eyebrow: 'Space & science', title: 'Space Center Houston', summary: 'Plan a visit to the official visitor center for NASA Johnson Space Center and connect the city trip to Houston’s human-spaceflight history.', href: '/destination/space-center-houston' },
      { eyebrow: 'Family', title: 'Houston Zoo', summary: 'Use the dedicated Hermann Park zoo guide for one of the strongest family anchors in the Museum District.', href: '/destination/houston-zoo' },
      { eyebrow: 'Nearby trips', title: 'Explore near Houston', summary: 'Build lake, small-town, state-park and weekend-trip ideas around the Gulf Coast metro.', href: '/explore/near/houston' },
      { eyebrow: 'Moving', title: 'Houston address checklist', summary: 'Compare flood exposure, taxing units, utilities, insurance and commute at the address level before choosing a home.', href: '/article/moving-to-houston-address-checklist' },
    ],
    tripPlanning: {
      firstTime: [
        { title: 'Museum District + Hermann Park', summary: 'Keep a first day compact by pairing one or two museums with the zoo, park or nearby Rice campus instead of crossing the metro repeatedly.', href: '/destination/houston-zoo' },
        { title: 'Downtown + Buffalo Bayou', summary: 'Use downtown as an urban-history and architecture stop, then add the bayou trail system for outdoor time close to the core.' },
        { title: 'NASA day', summary: 'Treat Space Center Houston as a dedicated half- or full-day anchor because it sits well southeast of central Houston.', href: '/destination/space-center-houston' },
      ],
      stayAreas: [
        { title: 'Downtown', summary: 'Best when conventions, theater, stadium events or METRORail access are the trip anchors.' },
        { title: 'Museum District / Medical Center', summary: 'Useful for museums, Hermann Park, Rice University and medical-center visits with less cross-town driving.' },
        { title: 'Uptown / Galleria', summary: 'Practical for west-side shopping, business travel and access to the Loop, but less convenient for some east-side attractions.' },
      ],
      freeThings: [
        { title: 'Hermann Park', summary: 'Walk the public park, gardens and reflection spaces around the Museum District; individual attractions inside the district may charge admission.' },
        { title: 'Buffalo Bayou Park', summary: 'Use the trails, skyline views and public green space along Buffalo Bayou for a no-ticket urban outing.' },
        { title: 'Discovery Green', summary: 'Downtown public space offers lawns, public art and changing free programming; verify the calendar for event-specific details.' },
      ],
    },
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
    populationEstimate: { value: 1_329_491, year: 2025, asOf: 'July 1, 2025' },
    jurisdiction: {
      primaryCounty: 'Dallas County',
      counties: ['Dallas County', 'Collin County', 'Denton County', 'Kaufman County', 'Rockwall County'],
      note: 'Dallas is primarily in Dallas County, but official city information identifies portions of the municipality in Collin, Denton, Kaufman and Rockwall counties. Address-level county verification matters for elections, appraisal districts, courts, schools and records.',
      sourceUrl: 'https://dallascityhall.com/government/citysecretary/elections/Pages/elections.aspx',
    },
    hero: {
      src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Dallas_Texas_Skyline.jpg?width=1600',
      alt: 'Dallas skyline viewed across the Trinity River corridor',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Dallas_Texas_Skyline.jpg',
      credit: 'Wikimedia Commons',
    },
    districts: [
      { name: 'Downtown & Arts District', summary: 'The civic, museum, performing-arts and office core, with rail access and several major visitor stops within a relatively compact area.' },
      { name: 'Deep Ellum', summary: 'An east-of-downtown music, nightlife and mural district with a long entertainment history and direct rail access.' },
      { name: 'Bishop Arts & Oak Cliff', summary: 'A walkable restaurant, retail and neighborhood destination southwest of downtown with a strong local identity.' },
      { name: 'Uptown', summary: 'A dense residential, dining and hotel district north of downtown that works well for visitors who want an urban base.' },
      { name: 'Design District', summary: 'Galleries, showrooms, restaurants and newer development sit northwest of downtown along the Trinity corridor.' },
      { name: 'Lower Greenville', summary: 'A restaurant, neighborhood and nightlife corridor northeast of downtown that feels distinct from the central business district.' },
    ],
    featured: [
      { eyebrow: 'History', title: 'The Sixth Floor Museum at Dealey Plaza', summary: 'Use the dedicated destination guide to place the Kennedy assassination site within downtown Dallas history.', href: '/destination/sixth-floor-museum-at-dealey-plaza' },
      { eyebrow: 'Family', title: 'Dallas World Aquarium', summary: 'Plan the downtown aquarium-and-rainforest experience as an indoor anchor that can pair with nearby central-city stops.', href: '/destination/dallas-world-aquarium' },
      { eyebrow: 'Seasonal', title: 'State Fair of Texas', summary: 'Use the current State Fair guide for dates, planning, Fair Park context and event-specific details.', href: '/texas-state-fair' },
      { eyebrow: 'Nearby trips', title: 'Explore near Dallas', summary: 'Build small-town, lake, park and weekend-trip ideas around North Texas.', href: '/explore/near/dallas' },
      { eyebrow: 'Moving', title: 'Moving to Dallas–Fort Worth', summary: 'Choose the work corridor first, then compare tolls, local jurisdictions, schools, utilities and housing costs.', href: '/article/moving-to-dallas-fort-worth-guide' },
    ],
    tripPlanning: {
      firstTime: [
        { title: 'Downtown + Arts District', summary: 'Combine Dealey Plaza with one museum or arts stop and keep the first day geographically tight.', href: '/destination/sixth-floor-museum-at-dealey-plaza' },
        { title: 'Fair Park or White Rock Lake', summary: 'Use a second day for east-side architecture, museums, lake trails or the State Fair when it is in season.', href: '/texas-state-fair' },
        { title: 'Choose one evening district', summary: 'Deep Ellum, Bishop Arts and Lower Greenville are separate destinations; pick one rather than turning dinner into a cross-city driving tour.' },
      ],
      stayAreas: [
        { title: 'Downtown / Arts District', summary: 'Best for central museums, events, rail access and a first visit focused on the urban core.' },
        { title: 'Uptown', summary: 'A restaurant- and hotel-rich base with easy access to downtown and the Katy Trail.' },
        { title: 'Market Center / Design District', summary: 'Useful for business travel, convention access and trips split between central Dallas and North Texas highways.' },
      ],
      freeThings: [
        { title: 'Klyde Warren Park', summary: 'Use the public deck park between downtown and Uptown for lawns, skyline views and changing programming.' },
        { title: 'Dallas Arts District walk', summary: 'Architecture, public space and outdoor art can be explored without buying a museum ticket.' },
        { title: 'White Rock Lake trails', summary: 'The lake and surrounding trail system provide a large public outdoor escape inside the city.' },
      ],
    },
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
    populationEstimate: {
      value: 1_028_117,
      year: 2025,
      asOf: 'July 1, 2025',
    },
    jurisdiction: {
      primaryCounty: 'Tarrant County',
      counties: ['Tarrant County', 'Denton County', 'Parker County', 'Johnson County', 'Wise County'],
      note: 'Most of Fort Worth is in Tarrant County, but the incorporated city also extends into Denton, Parker, Johnson and Wise counties. Property taxes, appraisal districts, schools, records and some services therefore depend on the exact address rather than the city name alone.',
      sourceUrl: 'https://www.fortworthtexas.gov/files/assets/public/v/1/the-fwlab/documents/planning/comprehensive-planning/adopted/25-intergovernmental-cooperation-final-2023.pdf',
    },
    hero: {
      src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Fort_Worth_Stock_Yards_Entrance_Wiki_(1_of_1).jpg?width=1600',
      alt: 'Entrance sign and historic buildings in the Fort Worth Stockyards',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Fort_Worth_Stock_Yards_Entrance_Wiki_(1_of_1).jpg',
      credit: 'Wikimedia Commons',
    },
    districts: [
      { name: 'Fort Worth Stockyards', summary: 'The city’s best-known Western-heritage district, built around livestock history, the cattle-drive tradition, museums, music, rodeo culture and visitor attractions.' },
      { name: 'Downtown & Sundance Square', summary: 'The central business, hotel, theater and dining district, useful as a city-center base between the Stockyards and the Cultural District.' },
      { name: 'Cultural District', summary: 'A museum-rich district anchored by the Kimbell Art Museum, Amon Carter Museum of American Art, Modern Art Museum of Fort Worth and nearby family attractions.' },
      { name: 'Near Southside', summary: 'A close-in district south of downtown known for independent restaurants, creative businesses, neighborhood nightlife and the Magnolia Avenue corridor.' },
      { name: 'TCU, Zoo & Clearfork', summary: 'Southwest Fort Worth combines Texas Christian University, the Fort Worth Zoo, Trinity River access, shopping and residential districts that feel distinct from downtown.' },
      { name: 'West 7th', summary: 'A dense corridor between downtown and the Cultural District where restaurants, nightlife and mixed-use development create a bridge between two major visitor zones.' },
      { name: 'Camp Bowie', summary: 'A long west-side boulevard lined with established neighborhoods, local businesses and historic commercial nodes extending toward Ridglea.' },
      { name: 'Panther Island & Trinity River', summary: 'River trails, event space and long-term redevelopment north of downtown connect the central city to the Trinity’s recreation network.' },
    ],
    featured: [
      { eyebrow: 'Western heritage', title: 'Fort Worth Stockyards', summary: 'Start with the city’s signature cattle, rail and Western-history district, then use the destination guide for current planning details.', href: '/destination/fort-worth-stockyards', image: { src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Fort_Worth_Stock_Yards_Entrance_Wiki_(1_of_1).jpg?width=1200', alt: 'Fort Worth Stockyards entrance and historic district' } },
      { eyebrow: 'Art & architecture', title: 'Kimbell Art Museum', summary: 'Connect the city page directly to one of the Cultural District’s nationally significant museums and architectural landmarks.', href: '/destination/kimbell-art-museum', image: { src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Kimbell_Art_Museum_Fort_Worth_01.jpg?width=1200', alt: 'Kimbell Art Museum in Fort Worth' } },
      { eyebrow: 'Family', title: 'Fort Worth Zoo', summary: 'Use the dedicated zoo guide for a major family attraction south of downtown.', href: '/destination/fort-worth-zoo', image: { src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Museum%20of%20Living%20Art%20Fort%20Worth%20Zoo%2C%20March%202026.jpg?width=1200', alt: 'Fort Worth Zoo habitat complex' } },
      { eyebrow: 'Events & sports', title: 'Dickies Arena', summary: 'Plan around rodeos, concerts, sports and major touring events in the Cultural District.', href: '/sports-venue/dickies-arena', image: { src: '/api/sports-venue-hero?slug=dickies-arena', alt: 'Dickies Arena in Fort Worth' } },
      { eyebrow: 'Nearby trips', title: 'Explore near Fort Worth', summary: 'Continue into lakes, small towns, road trips and other day-trip ideas around the western side of the Metroplex.', href: '/explore/near/fort-worth' },
    ],
    tripPlanning: {
      firstTime: [
        { title: 'Stockyards + Western heritage', summary: 'Give the Stockyards a dedicated block rather than squeezing it between downtown museums and a night event.', href: '/destination/fort-worth-stockyards' },
        { title: 'Cultural District + zoo or gardens', summary: 'Use a second day for museums, Dickies Arena-area attractions and the zoo without repeatedly crossing downtown.', href: '/destination/kimbell-art-museum' },
        { title: 'Downtown + Trinity', summary: 'Pair Sundance Square and central architecture with river trails or Panther Island for a compact urban-and-outdoor day.' },
      ],
      stayAreas: [
        { title: 'Downtown / Sundance Square', summary: 'Best for a first visit centered on central dining, rail access and easy trips north to the Stockyards or west to museums.' },
        { title: 'Stockyards', summary: 'Best when Western heritage, rodeo, music and nightlife are the primary reasons for the trip.' },
        { title: 'Cultural District / West 7th', summary: 'Useful for museums, Dickies Arena, restaurants and west-side access while staying close to downtown.' },
      ],
      freeThings: [
        { title: 'Fort Worth Water Gardens', summary: 'Explore the downtown public architectural landscape and water features without an admission ticket.' },
        { title: 'Trinity Trails', summary: 'Walk or bike the public river trail system for skyline, park and neighborhood connections.' },
        { title: 'Sundance Square & downtown walk', summary: 'Use central plazas, architecture and public spaces as a no-ticket orientation to the city center.' },
      ],
    },
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
        title: 'Airports & regional connections',
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
    populationEstimate: { value: 1_002_632, year: 2025, asOf: 'July 1, 2025' },
    jurisdiction: {
      primaryCounty: 'Travis County',
      counties: ['Travis County', 'Williamson County', 'Hays County'],
      note: 'Austin lies primarily in Travis County, with incorporated city limits extending into Williamson and Hays counties. County, school, appraisal and utility boundaries should be verified for the exact address.',
      sourceUrl: 'https://www.austintexas.gov/ready-central-texas/news/city-austin-become-ipaws-alerting-authority',
    },
    hero: {
      src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Austin%2C_TX_skyline_2026.jpg?width=1600',
      alt: 'Austin skyline in 2026',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Austin,_TX_skyline_2026.jpg',
      credit: 'Wikimedia Commons',
    },
    districts: [
      { name: 'Downtown & Capitol', summary: 'The state-government, convention, entertainment and central business core, with the Capitol and several museums within a compact area.' },
      { name: 'South Congress', summary: 'A walkable retail, restaurant and live-music corridor south of Lady Bird Lake with postcard views back toward downtown.' },
      { name: 'East Austin', summary: 'Historic neighborhoods, restaurants, music venues and newer development create one of the city’s most rapidly changing close-in areas.' },
      { name: 'Mueller', summary: 'A mixed-use district on the former airport site with parks, housing, retail and family attractions north of the central core.' },
      { name: 'The Domain & North Burnet', summary: 'A major north-Austin employment, shopping, dining and hotel cluster that operates almost like a second urban center.' },
      { name: 'West Austin & Hill Country edge', summary: 'Lake, greenbelt and limestone-hill landscapes begin to dominate west of the core, changing both recreation and commute patterns.' },
    ],
    featured: [
      { eyebrow: 'Texas history', title: 'Texas State Capitol', summary: 'Start with the Capitol and nearby state-history corridor for the clearest introduction to Austin’s civic role.', href: '/destination/texas-state-capitol' },
      { eyebrow: 'Art', title: 'Blanton Museum of Art', summary: 'Use the UT campus museum as part of a compact Capitol-and-university cultural day.', href: '/destination/blanton-museum-of-art-austin' },
      { eyebrow: 'Nearby trips', title: 'Explore near Austin', summary: 'Continue into swimming holes, state parks, Hill Country towns and day trips.', href: '/explore/near/austin' },
      { eyebrow: 'Moving', title: 'Moving to Austin & Central Texas', summary: 'Compare total monthly cost, municipal limits, utility territories, schools and real commute patterns.', href: '/article/moving-to-austin-guide' },
    ],
    tripPlanning: {
      firstTime: [
        { title: 'Capitol + UT museum corridor', summary: 'Walk the Capitol, Bullock and Blanton area rather than moving the car between central-city stops.', href: '/destination/texas-state-capitol' },
        { title: 'Lady Bird Lake + South Congress', summary: 'Pair the trail or waterfront with South Congress for a compact outdoor-and-neighborhood half day.' },
        { title: 'Choose one Hill Country extension', summary: 'Use a separate day for a swimming hole, state park or small town instead of squeezing a long regional drive into a downtown itinerary.', href: '/explore/near/austin' },
      ],
      stayAreas: [
        { title: 'Downtown', summary: 'Strong for first-time sightseeing, conferences, nightlife and walking access to the lake and Capitol.' },
        { title: 'South Congress / South Central', summary: 'Good for neighborhood character, restaurants and quick access across the river to downtown.' },
        { title: 'The Domain / North Austin', summary: 'Makes sense when north-side employment, events or suburban access matter more than walking to central attractions.' },
      ],
      freeThings: [
        { title: 'Texas State Capitol grounds', summary: 'Explore the grounds and public civic setting; confirm current tour and building-access procedures before visiting.', href: '/destination/texas-state-capitol' },
        { title: 'Ann and Roy Butler Hike-and-Bike Trail', summary: 'Walk or bike the public Lady Bird Lake trail for skyline and waterfront views.' },
        { title: 'Mount Bonnell overlook', summary: 'A short climb reaches a classic public overlook above the Colorado River and west Austin.' },
      ],
    },
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
    populationEstimate: { value: 1_548_422, year: 2025, asOf: 'July 1, 2025' },
    jurisdiction: {
      primaryCounty: 'Bexar County',
      counties: ['Bexar County', 'Comal County', 'Medina County'],
      note: 'San Antonio is primarily in Bexar County, with incorporated portions reaching into Comal and Medina counties. Verify the exact address before relying on county, school, appraisal, election or service boundaries.',
      sourceUrl: 'https://www.sa.gov/files/assets/main/v/1/planning/documents/adopted-plans/utsa-area-regional-center-plan-2019.pdf',
    },
    hero: {
      src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/San_Antonio_Skyline_2026.jpg?width=1600',
      alt: 'San Antonio skyline in 2026',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:San_Antonio_Skyline_2026.jpg',
      credit: 'Wikimedia Commons',
    },
    districts: [
      { name: 'Downtown & River Walk', summary: 'The Alamo, river, convention district, historic plazas and central visitor infrastructure form the city’s most concentrated first-time destination.' },
      { name: 'Pearl & Museum Reach', summary: 'Restaurants, public space and the northern River Walk connect the Pearl area with museums and downtown.' },
      { name: 'King William & Southtown', summary: 'Historic homes, galleries, restaurants and walkable streets sit just south of downtown along the river.' },
      { name: 'Alamo Heights & Broadway', summary: 'Museums, parks, established neighborhoods and the Broadway corridor create a cultural district north of downtown.' },
      { name: 'Mission Reach & Southside', summary: 'The river trail links restored habitat and the Spanish colonial mission landscape south of the urban core.' },
      { name: 'Northwest & Medical Center', summary: 'Major health-care, university and suburban employment districts make northwest San Antonio a practical but car-oriented base.' },
    ],
    featured: [
      { eyebrow: 'Texas history', title: 'The Alamo', summary: 'Start with the former mission and battle site, then connect it to the wider Spanish colonial mission story.', href: '/destination/the-alamo' },
      { eyebrow: 'City icon', title: 'San Antonio River Walk', summary: 'Use the river corridor to connect downtown, Museum Reach, Pearl and the Mission Reach landscape.', href: '/destination/san-antonio-river-walk' },
      { eyebrow: 'Nearby trips', title: 'Explore near San Antonio', summary: 'Build Hill Country, river, cavern and small-town extensions around the city.', href: '/explore/near/san-antonio' },
      { eyebrow: 'Moving', title: 'Moving to San Antonio', summary: 'Compare Bexar-area commutes, city boundaries, school districts and utility systems before choosing an address.', href: '/article/moving-to-san-antonio-guide' },
    ],
    tripPlanning: {
      firstTime: [
        { title: 'Alamo + downtown River Walk', summary: 'Start with the historic core and river level on the same day rather than driving between distant attractions.', href: '/destination/the-alamo' },
        { title: 'Pearl + Museum Reach', summary: 'Follow the river north for food, public space and museums without treating Pearl as a separate cross-town trip.', href: '/destination/san-antonio-river-walk' },
        { title: 'Missions day', summary: 'Reserve a separate block for the southern mission corridor and Mission Reach so the World Heritage landscape is not reduced to a quick drive-by.' },
      ],
      stayAreas: [
        { title: 'Downtown / River Walk', summary: 'Best for a first leisure visit centered on historic sites, river walks, conventions and central dining.' },
        { title: 'Pearl / Broadway', summary: 'Useful for restaurants, Museum Reach and north-central cultural attractions while staying close to downtown.' },
        { title: 'Northwest / Medical Center', summary: 'Practical for medical, university and north-side trips where highway access matters more than walking tourism.' },
      ],
      freeThings: [
        { title: 'River Walk public paths', summary: 'Walking the public river corridor costs nothing; cruises, attractions and dining are separate purchases.', href: '/destination/san-antonio-river-walk' },
        { title: 'San Antonio Missions landscape', summary: 'The national historical park’s mission grounds and river corridor can anchor a low-cost history day; confirm current NPS access details.' },
        { title: 'Historic plazas & Market Square area', summary: 'Explore downtown plazas, public art and the market district without requiring a ticketed attraction.' },
      ],
    },
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
    populationEstimate: { value: 683_012, year: 2025, asOf: 'July 1, 2025' },
    jurisdiction: {
      primaryCounty: 'El Paso County',
      counties: ['El Paso County'],
      note: 'El Paso is an El Paso County municipality. City, school, utility and special-district boundaries still differ, so use the exact address for local-service and property decisions.',
      sourceUrl: 'https://www.elpasotexas.gov/planning-and-inspections/gis/',
    },
    hero: {
      src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/El_Paso_skyline.jpg?width=1600',
      alt: 'El Paso skyline beneath the Franklin Mountains',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:El_Paso_skyline.jpg',
      credit: 'Wikimedia Commons',
    },
    districts: [
      { name: 'Downtown', summary: 'Historic architecture, civic spaces, museums and the border-city commercial core sit beneath the Franklin Mountains.' },
      { name: 'Segundo Barrio & Chihuahuita', summary: 'Historic border neighborhoods south of downtown preserve layers of Mexican American, immigration and railroad history.' },
      { name: 'UTEP & Kern Place', summary: 'The university, restaurants and west-central neighborhoods sit between downtown and the mountain foothills.' },
      { name: 'Northeast & Fort Bliss', summary: 'Military activity and residential districts north and east of the mountains shape a large share of daily travel.' },
      { name: 'East Side', summary: 'Fast-growing residential, retail and employment corridors stretch east from central El Paso toward the county line.' },
      { name: 'Upper Valley', summary: 'The Rio Grande, irrigated land and lower-density neighborhoods give northwest El Paso a different landscape from the desert east side.' },
    ],
    featured: [
      { eyebrow: 'Outdoors', title: 'Franklin Mountains State Park', summary: 'Use the mountain park to understand the geography that physically divides and defines El Paso.', href: '/destination/franklin-mountains-state-park' },
      { eyebrow: 'Nearby trips', title: 'Explore near El Paso', summary: 'Build desert, mountain, history and weekend-trip ideas around Far West Texas.', href: '/explore/near/el-paso' },
      { eyebrow: 'Road trips', title: 'Road trips from El Paso', summary: 'Build longer Far West Texas drives around desert scenery, mountain corridors, historic stops and realistic distances from El Paso.', href: '/explore/near/el-paso/road-trips' },
      { eyebrow: 'Moving', title: 'Moving to El Paso', summary: 'Compare mountain crossings, military access, desert utilities and address-level local systems before choosing a home.', href: '/article/moving-to-el-paso-guide' },
    ],
    tripPlanning: {
      firstTime: [
        { title: 'Downtown + border history', summary: 'Start with downtown museums and historic streets to understand the city before driving to the mountain or outer neighborhoods.' },
        { title: 'Franklin Mountains', summary: 'Give the state park and mountain overlooks their own weather-aware block rather than treating them as a roadside photo stop.', href: '/destination/franklin-mountains-state-park' },
        { title: 'West Side or Mission Valley extension', summary: 'Choose one corridor for a second day; the mountain makes cross-city driving more consequential than the map first suggests.' },
      ],
      stayAreas: [
        { title: 'Downtown', summary: 'Best for museums, historic architecture and a walkable introduction to the city center.' },
        { title: 'West Side / UTEP', summary: 'Useful for university visits, mountain access and west-side restaurants while remaining close to downtown.' },
        { title: 'East Side / airport corridor', summary: 'Practical for highway access, airport trips and east-side business or family travel.' },
      ],
      freeThings: [
        { title: 'Scenic Drive overlook', summary: 'Use the public overlook for a broad view of El Paso, the Rio Grande valley and Ciudad Juárez; check road access before departure.' },
        { title: 'Downtown public art & architecture', summary: 'Walk central streets and plazas for murals, historic buildings and civic spaces without a ticket.' },
        { title: 'UTEP campus architecture', summary: 'The university’s distinctive Bhutanese-influenced architecture creates a free self-guided walking stop when campus access permits.' },
      ],
    },
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
    populationEstimate: { value: 402_134, year: 2025, asOf: 'July 1, 2025' },
    jurisdiction: {
      primaryCounty: 'Tarrant County',
      counties: ['Tarrant County'],
      note: 'Arlington is in Tarrant County. School districts, utilities and special districts still have their own boundaries, so city residency does not replace address-level verification.',
      sourceUrl: 'https://www.tarrantcountytx.gov/en/elections/interactive-maps.html',
    },
    hero: {
      src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Arlington_Texas_Entertainment_District.jpg?width=1600',
      alt: 'Arlington entertainment district in Texas',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Arlington_Texas_Entertainment_District.jpg',
      credit: 'City of Arlington via Wikimedia Commons',
    },
    districts: [
      { name: 'Entertainment District', summary: 'AT&T Stadium, Globe Life Field, Texas Live! and major attractions create a high-traffic visitor district with event-driven planning needs.' },
      { name: 'Downtown & UTA', summary: 'The civic core and University of Texas at Arlington bring restaurants, arts, college activity and a more walkable local center.' },
      { name: 'North Arlington', summary: 'Mature neighborhoods, parks and easy access to the entertainment district define the northern part of the city.' },
      { name: 'South Arlington', summary: 'Large residential areas, retail corridors and highway access make the south side important for everyday living rather than stadium tourism.' },
      { name: 'Viridian & River Legacy', summary: 'Master-planned neighborhoods and the Trinity River greenbelt connect northeast Arlington with trails and nature-oriented recreation.' },
    ],
    featured: [
      { eyebrow: 'NFL & events', title: 'AT&T Stadium', summary: 'Plan parking, event-day timing and the wider Arlington entertainment district around the Cowboys’ home venue.', href: '/sports-venue/att-stadium' },
      { eyebrow: 'Baseball', title: 'Globe Life Field', summary: 'Use the Rangers ballpark guide for event planning and nearby entertainment-district context.', href: '/sports-venue/globe-life-field' },
      { eyebrow: 'DFW trips', title: 'Explore near Fort Worth', summary: 'Use the western Metroplex hub for lakes, towns, parks and side trips that pair naturally with Arlington.', href: '/explore/near/fort-worth' },
      { eyebrow: 'Moving', title: 'Moving to Texas', summary: 'Use the statewide moving tools, then verify Arlington-specific schools, utilities, property taxes and commute corridors.', href: '/moving-to-texas' },
    ],
    tripPlanning: {
      firstTime: [
        { title: 'Build around the event calendar', summary: 'Stadium and theme-park traffic can dominate the area, so choose the main event first and add nearby stops rather than crossing DFW repeatedly.', href: '/sports-venue/att-stadium' },
        { title: 'Pair the two stadiums', summary: 'AT&T Stadium and Globe Life Field sit in the same entertainment district, making them easier to combine than most major DFW venues.', href: '/sports-venue/globe-life-field' },
        { title: 'Add River Legacy for contrast', summary: 'Use park and Trinity River time when the trip needs a quieter outdoor block away from event crowds.' },
      ],
      stayAreas: [
        { title: 'Entertainment District', summary: 'Best for games, concerts and attractions when minimizing event-day driving is the priority.' },
        { title: 'Downtown / UTA', summary: 'Useful for university trips, local restaurants and a more civic/neighborhood-focused Arlington stay.' },
        { title: 'I-20 / South Arlington', summary: 'Practical for road trips and trips split between Arlington, Fort Worth and southern Metroplex destinations.' },
      ],
      freeThings: [
        { title: 'River Legacy Parks', summary: 'Use the Trinity River greenbelt, trails and public park space for a no-ticket outdoor outing.' },
        { title: 'Downtown public art walk', summary: 'Explore civic spaces, murals and the UTA-area streets without buying an attraction ticket.' },
        { title: 'Entertainment District exterior walk', summary: 'On non-event days, the public streetscape around the stadiums offers architecture and photo stops; respect event-day access controls.' },
      ],
    },
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
  hurst: {
    population2020: 40_413,
    censusUrl: 'https://www.census.gov/quickfacts/fact/table/hurstcitytexas/PST045225',
    populationEstimate: { value: 38_974, year: 2025, asOf: 'July 1, 2025' },
    jurisdiction: {
      primaryCounty: 'Tarrant County',
      counties: ['Tarrant County'],
      note: 'Hurst is in Tarrant County. School-district, utility and service boundaries still need to be checked at the exact address, especially in the tightly connected Mid-Cities area.',
      sourceUrl: 'https://www.tarrantcountytx.gov/en/elections/interactive-maps.html',
    },
    hero: {
      src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Cityhallathurst.jpg?width=1600',
      alt: 'Hurst City Hall in Hurst, Texas',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Cityhallathurst.jpg',
      credit: 'Wikimedia Commons',
    },
    districts: [
      { name: 'Hurst Town Center', summary: 'City Hall, library and civic facilities form the municipal center and a useful orientation point for the community.' },
      { name: 'Bell Station & Loop 820', summary: 'Regional rail and highway access make the western side of Hurst especially useful for Metroplex commuters and visitors.' },
      { name: 'North East Mall & SH 121', summary: 'Retail and major-road access shape the northeast side and connect Hurst directly to the broader Mid-Cities corridor.' },
      { name: 'Chisholm Park & north Hurst', summary: 'Parks, schools and established residential neighborhoods give the northern part of Hurst a family-recreation focus.' },
      { name: 'Mid-Cities corridor', summary: 'Hurst blends directly into Bedford, Euless and neighboring communities, so many practical trips work at a multi-city scale even when local services remain separate.' },
    ],
    featured: [
      { eyebrow: 'Indoor activity', title: 'WhirlyBall Hurst', summary: 'Use the dedicated guide for the unusual bumper-car team sport and indoor family/group activity.', href: '/destination/whirlyball-hurst' },
      { eyebrow: 'Nearby trips', title: 'Explore near Fort Worth', summary: 'Build western Metroplex day trips, lakes, towns and attractions around a Hurst base.', href: '/explore/near/fort-worth' },
      { eyebrow: 'Moving', title: 'Moving to Texas', summary: 'Use statewide relocation tools, then confirm Hurst-specific school, utility, tax and commute details by address.', href: '/moving-to-texas' },
    ],
    tripPlanning: {
      firstTime: [
        { title: 'Use Hurst as a Mid-Cities base', summary: 'The city is compact; its value is easy access to Fort Worth, Arlington, DFW Airport and neighboring Mid-Cities rather than a long checklist of tourist landmarks.' },
        { title: 'Add one local activity', summary: 'Pair a Metroplex day with WhirlyBall, Chisholm Park or another Hurst stop so the city is more than a hotel or highway exit.', href: '/destination/whirlyball-hurst' },
        { title: 'Use rail when it fits', summary: 'Bell Station can simplify selected regional trips; check live TRE schedules before building the day around rail.' },
      ],
      stayAreas: [
        { title: 'Loop 820 / Bell area', summary: 'Useful for Fort Worth access and regional rail connections.' },
        { title: 'SH 121 / North East Mall area', summary: 'Practical for DFW Airport, Grapevine and Mid-Cities driving.' },
        { title: 'Central Hurst', summary: 'A quieter residential/civic base when local family visits matter more than immediate highway access.' },
      ],
      freeThings: [
        { title: 'Chisholm Park', summary: 'Use the city’s largest park for trails, playgrounds, open space and the fishing pond.' },
        { title: 'Hurst public parks', summary: 'The municipal park system gives families several no-ticket recreation options; check city rules for specific facilities.' },
        { title: 'Bell Station rail-watching / orientation', summary: 'The station area is a useful public orientation point for understanding Hurst’s place on the regional rail corridor; fares apply to train rides.' },
      ],
    },
    systems: [
      {
        title: 'Water & city services',
        summary: 'The City of Hurst Public Works system operates municipal water distribution and wastewater collection, while Utility Billing handles city water accounts. Electric service should still be verified for the exact address rather than inferred from the Hurst mailing label.',
        links: [{ label: 'Hurst water & sewer', href: 'https://www.hursttx.gov/residents/city-services/water-and-sewer' }],
      },
      {
        title: 'Regional rail & airport access',
        summary: 'Bell Station on the Trinity Railway Express is in Hurst and provides regional rail connections across the Dallas-Fort Worth corridor. DFW International is the principal commercial airport for the Mid-Cities area; check live rail and airport information before travel.',
        links: [{ label: 'Trinity Metro stations', href: 'https://ridetrinitymetro.org/stations/' }, { label: 'DFW International', href: 'https://www.dfwairport.com/' }],
      },
      {
        title: 'Schools',
        summary: 'Hurst-Euless-Bedford ISD serves much of Hurst, while Birdville ISD also serves part of the city. School-district and attendance boundaries do not simply follow municipal lines, so verify the district for the exact address.',
        links: [{ label: 'HEB ISD', href: 'https://www.hebisd.edu/' }, { label: 'Birdville ISD', href: 'https://www.birdvilleschools.net/' }, { label: 'TexasDefined district lookup', href: '/find-my-school-district' }],
      },
      {
        title: 'Parks & recreation',
        summary: 'Hurst Parks & Recreation manages the city park system, recreation programs, aquatics and athletic facilities. Chisholm Park is the city’s largest park and includes trails, playgrounds, a fishing pond, athletic fields and other family recreation.',
        links: [{ label: 'Hurst Parks & Recreation', href: 'https://www.hursttx.gov/about-us/departments/parks-recreation' }, { label: 'Chisholm Park', href: 'https://www.hursttx.gov/Home/Components/FacilityDirectory/FacilityDirectory/32/2514' }],
      },
      {
        title: 'Local trip planning',
        summary: 'Use Hurst as a Mid-Cities base for indoor family recreation and broader Tarrant County travel. TexasDefined connects the city directly to WhirlyBall Hurst, the county guide and nearby DFW attractions instead of treating every Metroplex stop as either Dallas or Fort Worth.',
        links: [{ label: 'WhirlyBall Hurst guide', href: '/destination/whirlyball-hurst' }, { label: 'Tarrant County guide', href: '/county/tarrant' }, { label: 'Texas Sports', href: '/sports' }],
      },
    ],
  },
  'corpus-christi': {
    population2020: 317_863,
    censusUrl: 'https://www.census.gov/quickfacts/fact/table/corpuschristicitytexas/PST045225',
    populationEstimate: { value: 317_247, year: 2025, asOf: 'July 1, 2025' },
    jurisdiction: {
      primaryCounty: 'Nueces County',
      counties: ['Nueces County', 'San Patricio County', 'Kleberg County', 'Aransas County'],
      note: 'Corpus Christi is centered in Nueces County, while current municipal and Census place geography includes smaller portions across San Patricio, Kleberg and Aransas counties. Coastal and barrier-island boundaries make exact-address and parcel verification especially important.',
      sourceUrl: 'https://www.corpuschristitx.gov/media/k4rg0ztp/2025gmp_withappendices_final.pdf',
    },
    hero: {
      src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Corpus_Christi_skyline.jpg?width=1600',
      alt: 'Corpus Christi skyline and waterfront',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Corpus_Christi_skyline.jpg',
      credit: 'Wikimedia Commons',
    },
    districts: [
      { name: 'Downtown & Bayfront', summary: 'The seawall, marina, museums, civic buildings and waterfront parks create the most concentrated urban visitor district.' },
      { name: 'North Beach', summary: 'USS Lexington, Texas State Aquarium and bayfront beach access make this a distinct family and maritime destination across the harbor.' },
      { name: 'Southside', summary: 'Large residential, shopping and health-care corridors make the south side central to daily life and many relocation decisions.' },
      { name: 'Padre Island', summary: 'Barrier-island neighborhoods and beach access shift the city from urban bayfront to Gulf-oriented recreation and storm-aware planning.' },
      { name: 'Flour Bluff', summary: 'A mainland-to-island gateway shaped by naval aviation, Laguna Madre access and residential communities.' },
      { name: 'Calallen & northwest Corpus Christi', summary: 'Highway access, schools and lower-density development give northwest Corpus Christi a distinct suburban and regional-gateway role.' },
    ],
    featured: [
      { eyebrow: 'Maritime history', title: 'USS Lexington Museum', summary: 'Walk the preserved aircraft carrier on North Beach and connect Corpus Christi to Texas military and naval-aviation history.', href: '/destination/uss-lexington-museum-corpus-christi' },
      { eyebrow: 'Gulf wildlife', title: 'Texas State Aquarium', summary: 'Use the North Beach aquarium as a family anchor for Gulf Coast wildlife and conservation.', href: '/destination/texas-state-aquarium' },
      { eyebrow: 'Nearby trips', title: 'Explore near Corpus Christi', summary: 'Build beaches, wildlife, state parks and Coastal Bend day trips around the city.', href: '/explore/near/corpus-christi' },
      { eyebrow: 'Moving', title: 'Moving to Texas', summary: 'Use statewide relocation tools, then check coastal insurance, storm exposure, utilities, schools and taxes for the exact Corpus Christi address.', href: '/moving-to-texas' },
    ],
    tripPlanning: {
      firstTime: [
        { title: 'North Beach day', summary: 'Pair USS Lexington and the Texas State Aquarium so the two major attractions share one parking-and-driving block.', href: '/destination/uss-lexington-museum-corpus-christi' },
        { title: 'Downtown + Bayfront', summary: 'Use the seawall, marina and central museums for a separate half day close to the urban core.' },
        { title: 'Choose bay or Gulf beach time', summary: 'North Beach, city bayfront beaches and Padre Island offer different water experiences; check surf, weather and current access before driving.' },
      ],
      stayAreas: [
        { title: 'Downtown / Bayfront', summary: 'Best for urban waterfront walks, museums, marina views and central dining.' },
        { title: 'North Beach', summary: 'Useful for families centering the aquarium and USS Lexington, with a distinct bayfront setting.' },
        { title: 'Padre Island', summary: 'Best when Gulf beach access, fishing and island time matter more than quick downtown access.' },
      ],
      freeThings: [
        { title: 'Bayfront seawall', summary: 'Walk the waterfront, marina and public bayfront spaces without an attraction ticket.' },
        { title: 'Cole Park', summary: 'Use the public bayfront park, trail and open space for a low-cost outdoor stop.' },
        { title: 'McGee Beach', summary: 'Central bayfront beach access offers an easy public shoreline stop; confirm current swimming and safety conditions.' },
      ],
    },
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
    populationEstimate: { value: 293_028, year: 2025, asOf: 'July 1, 2025' },
    jurisdiction: {
      primaryCounty: 'Collin County',
      counties: ['Collin County', 'Denton County'],
      note: 'Most of Plano is in Collin County, with part of the city in Denton County. The city’s own tax tools distinguish the two county contexts, so property, school and appraisal records should be checked against the exact address.',
      sourceUrl: 'https://ecop.plano.gov/MyTaxDollar/MyTaxDollar.aspx',
    },
    hero: {
      src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Hdr_plano.jpg?width=1600',
      alt: 'Historic downtown Plano streetscape',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Hdr_plano.jpg',
      credit: 'Wikimedia Commons',
    },
    districts: [
      { name: 'Downtown Plano', summary: 'Historic commercial buildings, restaurants, rail access and public spaces give the old town center a walkable identity distinct from newer corporate districts.' },
      { name: 'Legacy & Legacy West', summary: 'Corporate campuses, hotels, restaurants, retail and dense mixed-use development form a major employment and visitor cluster in west Plano.' },
      { name: 'Granite Park', summary: 'Office, dining and hotel development near the Dallas North Tollway creates another west-side business and entertainment center.' },
      { name: 'Willow Bend', summary: 'Established west-Plano neighborhoods and retail corridors sit between the Tollway and the city’s residential interior.' },
      { name: 'East Plano & Oak Point', summary: 'Older neighborhoods, large parkland and trails give east Plano a more open-space-oriented identity.' },
    ],
    featured: [
      { eyebrow: 'North Texas trips', title: 'Explore near Dallas', summary: 'Use the Dallas-area hub for museums, lakes, towns and day trips that pair naturally with a Plano base.', href: '/explore/near/dallas' },
      { eyebrow: 'Moving', title: 'Moving to Texas', summary: 'Compare county, school, utility, commute and housing systems for the exact Plano address.', href: '/moving-to-texas' },
      { eyebrow: 'Schools', title: 'Find my school district', summary: 'Verify the serving district by address rather than assuming Plano ISD from the city name.', href: '/find-my-school-district' },
    ],
    tripPlanning: {
      firstTime: [
        { title: 'Downtown Plano', summary: 'Start with the historic core and rail-connected commercial streets for the city’s most walkable local identity.' },
        { title: 'Legacy / Legacy West', summary: 'Use west Plano for restaurants, corporate-campus context and a contrasting modern mixed-use district.' },
        { title: 'Add a park block', summary: 'Oak Point or Arbor Hills provides the outdoor counterpoint to Plano’s office and residential corridors.' },
      ],
      stayAreas: [
        { title: 'Legacy / Dallas North Tollway', summary: 'Best for business travel, restaurants and trips split among Plano, Frisco and north Dallas.' },
        { title: 'Downtown / US 75 corridor', summary: 'Useful for DART access and trips focused on the historic core or east-central Plano.' },
        { title: 'West Plano', summary: 'Practical for Tollway access, shopping and visits that extend into neighboring North Texas employment centers.' },
      ],
      freeThings: [
        { title: 'Historic Downtown Plano walk', summary: 'Explore the old commercial district, public art and streetscape without a ticket.' },
        { title: 'Oak Point Park & Nature Preserve', summary: 'Use the large public park and trail network for walking, cycling and open-space time.' },
        { title: 'Arbor Hills Nature Preserve', summary: 'Trails and natural areas provide a free outdoor stop on Plano’s western side.' },
      ],
    },
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
    populationEstimate: { value: 273_071, year: 2025, asOf: 'July 1, 2025' },
    jurisdiction: {
      primaryCounty: 'Lubbock County',
      counties: ['Lubbock County'],
      note: 'Lubbock is in Lubbock County. Municipal, school, utility and special-district boundaries still differ, so use the exact address for household and property decisions.',
      sourceUrl: 'https://ci.lubbock.tx.us/pages/city-government/city-charter',
    },
    hero: {
      src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Lubbock%2C_Texas_skyline.jpg?width=1600',
      alt: 'Lubbock skyline on the South Plains',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Lubbock,_Texas_skyline.jpg',
      credit: 'Wikimedia Commons',
    },
    districts: [
      { name: 'Downtown & Depot District', summary: 'Civic buildings, live music, the Buddy Holly story and entertainment venues anchor the historic center.' },
      { name: 'Texas Tech & Overton', summary: 'The university, student-oriented housing, restaurants and athletics create a major activity center west of downtown.' },
      { name: 'Medical District', summary: 'Hospitals, clinics and health-related employment form an important central-western economic corridor.' },
      { name: 'South Lubbock', summary: 'Fast-growing residential, retail and restaurant corridors define much of the city’s newer suburban expansion.' },
      { name: 'Mackenzie Park & Canyon Lakes', summary: 'Parks, lakes and the Yellow House Draw corridor provide a greener recreational landscape near the urban core.' },
      { name: 'West Lubbock', summary: 'New housing, retail and Loop 289 access make the west side central to current growth and commuting patterns.' },
    ],
    featured: [
      { eyebrow: 'Military history', title: 'Silent Wings Museum', summary: 'See Lubbock’s World War II glider-pilot history at the former South Plains Army Air Field.', href: '/destination/silent-wings-museum-lubbock' },
      { eyebrow: 'Nearby trips', title: 'Explore near Lubbock', summary: 'Build canyon, small-town, state-park and South Plains road trips around the Hub City.', href: '/explore/near/lubbock' },
      { eyebrow: 'Moving', title: 'Moving to Texas', summary: 'Use statewide relocation tools, then verify Lubbock-specific schools, utilities, taxes and commute patterns.', href: '/moving-to-texas' },
    ],
    tripPlanning: {
      firstTime: [
        { title: 'Downtown + Buddy Holly corridor', summary: 'Start in the historic core and Depot District to understand the music and railroad-era city before heading to the university.' },
        { title: 'Texas Tech + ranching history', summary: 'Use the campus area for university, museum and regional-history context rather than treating Tech only as a football stop.' },
        { title: 'Aviation or outdoor extension', summary: 'Choose Silent Wings Museum or the Canyon Lakes/Mackenzie Park system for a focused second half-day.', href: '/destination/silent-wings-museum-lubbock' },
      ],
      stayAreas: [
        { title: 'Downtown / Depot District', summary: 'Best for music, civic events and a more urban introduction to Lubbock.' },
        { title: 'Texas Tech / Overton', summary: 'Useful for university visits, games and access to central restaurants and museums.' },
        { title: 'South or west Lubbock', summary: 'Practical for newer hotels, retail and road-trip access around Loop 289.' },
      ],
      freeThings: [
        { title: 'West Texas Walk of Fame & Buddy Holly Plaza area', summary: 'Explore the outdoor music-history markers and Depot District streets without buying a museum ticket.' },
        { title: 'Mackenzie Park', summary: 'Use public parkland and the Canyon Lakes system for outdoor time close to the city center.' },
        { title: 'Texas Tech public art & campus walk', summary: 'The campus offers architecture and outdoor art that can be explored on foot when public access allows.' },
      ],
    },
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

const TEXAS_LIFE_CITY_CONTEXT: CityAuthoritySystem = {
  title: 'Texas context',
  summary: 'Compare the city with other Texas metros and regions, then put jobs, schools, family logistics and everyday living conditions around the local systems above.',
  links: [
    { label: 'Texas cities & regions', href: '/article/texas-major-cities-regional-differences' },
    { label: 'Texas industry guide', href: '/texas-industries' },
    { label: 'Texas jobs & industries overview', href: '/article/texas-jobs-economy-industries' },
    { label: 'Texas schools & family life', href: '/article/texas-schools-family-life' },
    { label: 'Texas health & daily safety', href: '/article/texas-health-safety-daily-living' },
  ],
};

export function getCityAuthorityProfile(slug: string) {
  const profile = profiles[slug];
  if (!profile) return undefined;
  return { ...profile, systems: [...profile.systems, TEXAS_LIFE_CITY_CONTEXT] };
}
