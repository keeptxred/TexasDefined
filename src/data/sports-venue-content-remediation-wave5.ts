import type { SportsVenueEnrichment, SportsVenuePlanningLink } from './sports-venue-enrichment';

const reviewedAt = '2026-09-10';

type SportsVenueVisitorFacts = {
  address?: string;
  capacity?: string;
  opened?: string;
  homeTeams: readonly string[];
  playingSurface?: string;
  leagueOrConference?: string;
  accessibility?: string;
  bagAndEntry?: string;
};

type SportsVenueSourceReview = {
  reviewedAt: string;
  authoritativeSources: readonly SportsVenuePlanningLink[];
};

export type SportsVenueQualityProfileWave5 = {
  visitorFacts: SportsVenueVisitorFacts;
  editorialStory: string;
  sourceReview: SportsVenueSourceReview;
};

const sources = {
  cottonBowl: [
    { label: 'Cotton Bowl Stadium at Fair Park', url: 'https://www.fairparkdallas.com/cotton-bowl-stadium' },
    { label: 'Fair Park visitor planning', url: 'https://www.fairparkdallas.com/visit/plan-your-visit' },
    { label: 'Fair Park history', url: 'https://www.fairparkdallas.com/about-fair-park' },
  ],
  choctaw: [
    { label: 'Choctaw Stadium history and current use', url: 'https://globelifefield.com/choctaw-stadium-former-rangers-home/' },
    { label: 'Globe Life Field and Choctaw Stadium tours', url: 'https://globelifefield.com/tours-experiences/' },
    { label: 'Choctaw Stadium', url: 'https://globelifefield.com/choctaw-stadium/' },
  ],
  fordCenter: [
    { label: 'Ford Center at The Star', url: 'https://www.thestarinfrisco.com/ford-center/' },
    { label: 'Ford Center guest information', url: 'https://www.thestarinfrisco.com/ford-center/guest-information/' },
  ],
  datcu: [
    { label: 'DATCU Stadium facility page', url: 'https://meangreensports.com/facilities/apogee-stadium/4' },
    { label: 'DATCU Stadium parking', url: 'https://meangreensports.com/sports/2025/5/13/datcu-stadium-parking' },
    { label: 'UNT clear-bag and facility entry policy', url: 'https://meangreensports.com/sports/2018/8/15/clearbagpolicy' },
    { label: '2026 DATCU Stadium updates', url: 'https://meangreensports.com/news/2026/9/4/datcu-stadium-whats-new-at-datcu-2026' },
  ],
  riders: [
    { label: 'Riders Field fast facts', url: 'https://www.milb.com/frisco/ballpark/ballpark' },
    { label: 'Riders Field parking and directions', url: 'https://www.milb.com/frisco/ballpark/parking' },
    { label: 'Riders Field policies', url: 'https://www.milb.com/frisco/ballpark/policies' },
  ],
  loneStar: [
    { label: 'Lone Star Park facility and grounds', url: 'https://www.lonestarpark.com/facility-and-grounds/' },
    { label: 'Lone Star Park getting here', url: 'https://www.lonestarpark.com/getting-here/' },
    { label: 'Lone Star Park FAQ', url: 'https://www.lonestarpark.com/faqs/' },
  ],
  tdecu: [
    { label: 'TDECU Stadium quick facts', url: 'https://uhcougars.com/sports/2018/6/12/TDECU-Stadium-Info-html' },
    { label: 'TDECU Stadium gameday guide', url: 'https://uhcougars.com/news/2023/7/13/football-tdecu-stadium-gameday-guide' },
    { label: 'Houston Athletics clear-bag policy', url: 'https://uhcougars.com/sports/2019/2/24/fertitta-center-clear-bag-policy' },
  ],
  fertitta: [
    { label: 'Fertitta Center facility page', url: 'https://uhcougars.com/facilities/fertitta-center/10' },
    { label: 'Fertitta Center gameday guide', url: 'https://uhcougars.com/sports/2025/11/3/Fertitta-Center-Gameday-Guide' },
    { label: 'Houston Athletics clear-bag policy', url: 'https://uhcougars.com/sports/2019/2/24/fertitta-center-clear-bag-policy' },
  ],
  hebCenter: [
    { label: 'H-E-B Center arena facts', url: 'https://www.hebcenter.com/arena-info/about-the-arena' },
    { label: 'H-E-B Center event-space capacities', url: 'https://www.hebcenter.com/book-an-event/event-spaces-options' },
    { label: 'H-E-B Center teams', url: 'https://www.hebcenter.com/teams' },
    { label: 'H-E-B Center A-Z guide', url: 'https://www.hebcenter.com/plan-your-visit/a-to-z-fan-guide-arena-policies' },
  ],
  alamodome: [
    { label: 'Alamodome official site', url: 'https://www.alamodome.com/' },
    { label: 'Alamodome configuration maps', url: 'https://www.alamodome.com/book-your-event/configuration-maps' },
    { label: 'Alamodome parking and tailgating', url: 'https://www.alamodome.com/plan-your-visit/parking-tailgating' },
    { label: 'Alamodome accessibility', url: 'https://www.alamodome.com/plan-your-visit/accessibility-ada-services' },
    { label: 'Alamodome clear-bag policy', url: 'https://www.alamodome.com/p/plan-your-visit/clear-bag-policy' },
  ],
} as const;

export const SPORTS_VENUE_QUALITY_PROFILES_WAVE5: Record<string, SportsVenueQualityProfileWave5> = {
  'cotton-bowl-stadium': {
    visitorFacts: {
      address: '3809 Grand Avenue, Dallas, TX 75210',
      capacity: '92,100 seats',
      opened: '1930',
      homeTeams: [],
      playingSurface: 'Natural grass',
      leagueOrConference: 'Red River Rivalry, State Fair Classic and other football, soccer and special events',
      accessibility: 'Fair Park publishes accessible-parking and venue-accessibility guidance. Event-specific parking and access instructions should control because the stadium operates inside the larger Fair Park campus.',
      bagAndEntry: 'Cotton Bowl Stadium events use Fair Park’s clear-bag policy, with current size limits and medical-bag exceptions published by the venue. Event pages can impose additional or revised screening rules.',
    },
    editorialStory: 'Cotton Bowl Stadium opened in 1930 as the 46,000-seat Fair Park Stadium and expanded over generations into today’s 92,100-seat historic venue. Its identity is inseparable from Fair Park, the Red River Rivalry and decades of Texas football history; those facts are more useful than treating it as a generic Dallas sports stop.',
    sourceReview: { reviewedAt, authoritativeSources: sources.cottonBowl },
  },
  'choctaw-stadium': {
    visitorFacts: {
      address: '1000 Ballpark Way, Arlington, TX 76011',
      opened: '1994 as The Ballpark in Arlington; converted for multipurpose use after the Rangers moved in 2019',
      homeTeams: [],
      leagueOrConference: 'Soccer, football and special events in the former Texas Rangers ballpark',
    },
    editorialStory: 'Choctaw Stadium opened in 1994 as The Ballpark in Arlington and served as the Texas Rangers’ home through 2019. The building was reworked for football, soccer and other uses after Globe Life Field opened across the street, giving visitors an unusually visible old-home/new-home comparison inside the Arlington Entertainment District.',
    sourceReview: { reviewedAt, authoritativeSources: sources.choctaw },
  },
  'ford-center-at-the-star': {
    visitorFacts: {
      address: '9 Cowboys Way, Frisco, TX 75034',
      capacity: '12,000 seats',
      homeTeams: ['Frisco ISD football programs share the venue for district games'],
      leagueOrConference: 'Dallas Cowboys practices and events, Frisco ISD football and other indoor sports/events',
      accessibility: 'Ford Center publishes accessible parking, drop-off, power-assisted doors, seating, restrooms and guest-service accommodations throughout the facility.',
      bagAndEntry: 'Ford Center uses event-specific entry rules. Frisco ISD games currently open doors about one hour before kickoff, while other events can set different opening times and re-entry policies.',
    },
    editorialStory: 'Ford Center is the 12,000-seat indoor stadium connected to the Dallas Cowboys’ headquarters at The Star. It is shared by the Cowboys, City of Frisco and Frisco ISD, so its defining feature is the overlap between professional-team operations, high-school football and a mixed-use visitor district—not generic Metroplex sports language.',
    sourceReview: { reviewedAt, authoritativeSources: sources.fordCenter },
  },
  'datcu-stadium': {
    visitorFacts: {
      address: '1251 S. Bonnie Brae St., Denton, TX',
      capacity: '30,100 seats',
      opened: '2011',
      homeTeams: ['North Texas Mean Green football'],
      leagueOrConference: 'NCAA Division I FBS — American Conference',
      accessibility: 'UNT publishes ADA seating, accessible parking in designated football lots and game-day shuttle information. Those locations and routes can change with construction and season operations.',
      bagAndEntry: 'UNT’s current clear-bag policy permits specified clear totes, one-gallon clear bags, small clutches and limited exceptions. For 2026, construction changes the normal path from the Blue Lots and directs those fans to Gate 4.',
    },
    editorialStory: 'DATCU Stadium opened in 2011 as North Texas football’s on-campus home and was the first newly constructed college football stadium to earn LEED Platinum certification. Its official capacity is now 30,100 after west-side chairback work reduced the original seating count, making the current facility page more reliable than older 30,850-seat references.',
    sourceReview: { reviewedAt, authoritativeSources: sources.datcu },
  },
  'riders-field': {
    visitorFacts: {
      address: '7300 RoughRiders Trail, Frisco, TX 75034',
      capacity: '10,216 total, including 7,748 fixed seats',
      opened: '2003',
      homeTeams: ['Frisco RoughRiders'],
      leagueOrConference: 'Double-A Texas League — Texas Rangers affiliate',
      accessibility: 'Riders Field provides accessible parking in Lot B and publishes accessible-entry and seating information through the club’s ballpark guidance.',
      bagAndEntry: 'The current ballpark policy permits bags and purses up to 16 by 16 by 8 inches, one-gallon clear bags and medical/childcare exceptions. Parking lots normally open two hours before first pitch and gates about one hour before.',
    },
    editorialStory: 'Riders Field opened in 2003 as the Frisco RoughRiders’ home and was designed as a “park within a park,” with architecture inspired by places including Galveston and Seaside. Its 10,216 capacity, 2016 Lazy River and long-running Double-A Texas Rangers affiliation give the ballpark a specific identity that generic Frisco weekend copy does not.',
    sourceReview: { reviewedAt, authoritativeSources: sources.riders },
  },
  'lone-star-park': {
    visitorFacts: {
      address: '1000 Lone Star Parkway, Grand Prairie, TX 75050',
      capacity: 'Approximately 6,000 grandstand seats, with additional seating elsewhere on the property',
      homeTeams: [],
      leagueOrConference: 'Seasonal Thoroughbred and Quarter Horse racing plus year-round simulcast wagering',
      accessibility: 'Lone Star Park says the facility is wheelchair accessible, provides accessible seating and routes handicap parking through Gate 4.',
    },
    editorialStory: 'Lone Star Park occupies roughly 315 acres in Grand Prairie between Dallas and Fort Worth. Its glass-enclosed 280,000-square-foot grandstand seats about 6,000, the property has roughly 6,000 paved parking spaces, and the adjacent Bar & Book supports year-round simulcast wagering even when live racing is out of season.',
    sourceReview: { reviewedAt, authoritativeSources: sources.loneStar },
  },
  'tdecu-stadium': {
    visitorFacts: {
      address: '3874 Holman St., Houston, TX 77004',
      capacity: '40,000',
      opened: 'August 29, 2014',
      homeTeams: ['Houston Cougars football'],
      playingSurface: 'Synthetic turf',
      leagueOrConference: 'NCAA Division I FBS — Big 12 Conference',
      bagAndEntry: 'Houston Athletics applies its clear-bag policy to TDECU Stadium, limiting standard entry to specified clear bags, one-gallon clear bags and small clutches, with medically necessary exceptions after inspection.',
    },
    editorialStory: 'TDECU Stadium opened in 2014 on the University of Houston campus on the footprint of the former Robertson Stadium. The 40,000-seat, synthetic-turf venue is the Cougars’ football home and now sits beside the Memorial Hermann Football Operations Center, making campus access and UH game-day operations the useful planning context.',
    sourceReview: { reviewedAt, authoritativeSources: sources.tdecu },
  },
  'fertitta-center': {
    visitorFacts: {
      address: '3422 Cullen Blvd., Houston, TX 77004',
      capacity: '7,035 for basketball in the current UH fact sheet',
      opened: 'December 1, 2018 after the Hofheinz Pavilion renovation',
      homeTeams: ['Houston Cougars men’s basketball', 'Houston Cougars women’s basketball', 'Houston Cougars volleyball'],
      leagueOrConference: 'NCAA Division I — Big 12 Conference',
      bagAndEntry: 'Houston Athletics enforces a clear-bag policy at Fertitta Center and uses security screening at entry. Current sport-specific gameday guides should control door timing, parking and any event-specific procedures.',
    },
    editorialStory: 'Fertitta Center opened in December 2018 after a $60 million transformation of historic Hofheinz Pavilion. The current UH basketball fact sheet lists 7,035 seats, and the arena now serves Houston basketball and volleyball with a reconfigured bowl that brings seating closer to the court while preserving the site’s long campus-arena lineage.',
    sourceReview: { reviewedAt, authoritativeSources: sources.fertitta },
  },
  'heb-center-at-cedar-park': {
    visitorFacts: {
      address: '2100 Avenue of the Stars, Cedar Park, TX 78613',
      capacity: '6,800 for hockey; 7,200 for other sporting events; up to 8,000 for concerts',
      opened: 'September 25, 2009',
      homeTeams: ['Texas Stars', 'Austin Spurs'],
      leagueOrConference: 'AHL hockey, NBA G League basketball and touring sports/entertainment',
      accessibility: 'The arena provides accessible parking and venue accommodations; current event pages identify accessible lots and event-specific operating details.',
      bagAndEntry: 'H-E-B Center currently limits clear bags to 16 by 8 by 16 inches and non-clear bags to 5 by 9 by 2 inches, with medical/childcare exceptions. The building uses security screening and a no-re-entry policy, while event-specific restrictions can be stricter.',
    },
    editorialStory: 'H-E-B Center opened in 2009 as Cedar Park’s city-owned multipurpose arena and remains home to the Texas Stars and Austin Spurs. Its configuration changes materially by event—6,800 for hockey, 7,200 for many sporting events and up to 8,000 for concerts—so configuration-specific facts are more useful than a single generic arena capacity.',
    sourceReview: { reviewedAt, authoritativeSources: sources.hebCenter },
  },
  'alamodome': {
    visitorFacts: {
      address: '100 Montana St., San Antonio, TX 78203',
      capacity: '62,834 for football and soccer; larger concert configurations vary',
      opened: 'May 15, 1993',
      homeTeams: ['UTSA Roadrunners football'],
      leagueOrConference: 'NCAA Division I FBS — American Conference; major neutral-site sports and entertainment events',
      accessibility: 'The Alamodome publishes accessible seating, Lot A accessible parking, wheelchair-transport service, assistive-listening devices, elevators and interpretation/transcription procedures.',
      bagAndEntry: 'The Alamodome uses a clear-bag policy for most events, but exact dimensions, exceptions and door times should be checked on the event page because promoter and event requirements can vary.',
    },
    editorialStory: 'The Alamodome opened in 1993 as a publicly owned San Antonio multipurpose stadium built for flexible sports and entertainment configurations. Its standard football and soccer setup seats 62,834, while concert and arena layouts can differ substantially; that configuration flexibility and downtown-edge location are more durable than one event’s attendance or door schedule.',
    sourceReview: { reviewedAt, authoritativeSources: sources.alamodome },
  },
};

export const SPORTS_VENUE_CONTENT_REMEDIATION_WAVE5: Record<string, SportsVenueEnrichment> = {
  'cotton-bowl-stadium': {
    city: 'Dallas',
    capacity: '92,100',
    opened: '1930',
    primaryEvents: ['Red River Rivalry', 'State Fair Classic', 'Football, soccer and special stadium events'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE5['cotton-bowl-stadium'].editorialStory,
    parking: 'Cotton Bowl Stadium sits inside Fair Park, which publishes event-specific parking instructions and notes that ordinary daily parking rules do not necessarily apply to stadium events. Use the current Fair Park event page rather than assuming one fixed lot or price.',
    arrival: 'The stadium is part of a 277-acre Fair Park campus, so arrival includes entering the grounds, clearing event security and walking to the stadium. For major rivalry or State Fair dates, use the event-specific gate and transit guidance.',
    stayAndEat: 'The relevant geography is Fair Park and east-central Dallas. Downtown or other Dallas districts can be part of a broader trip, but the venue page should not imply that every city attraction is adjacent to the stadium.',
    nearby: 'Fair Park’s museums, Art Deco landmarks and other on-site venues are the strongest editorially defensible connections because they share the same campus.',
    planningLinks: [...sources.cottonBowl],
    imageBrief: 'Historic Cotton Bowl Stadium at Fair Park in Dallas, showing the football bowl and Art Deco fairgrounds context without added text or logos.',
    verifiedAt: reviewedAt,
  },
  'choctaw-stadium': {
    city: 'Arlington',
    opened: '1994; converted for multipurpose use after 2019',
    primaryEvents: ['Soccer', 'Football', 'Special events and venue tours'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE5['choctaw-stadium'].editorialStory,
    parking: 'Choctaw Stadium shares the Arlington Entertainment District with Globe Life Field and AT&T Stadium. Parking availability and traffic patterns can change when neighboring venues are active, so the specific event instructions should control.',
    arrival: 'Choose the event entrance and parking plan before entering the stadium district. The venue’s adjacency to Globe Life Field makes walking within the district practical, but simultaneous events can create heavy shared traffic.',
    stayAndEat: 'The useful context is the immediate Arlington Entertainment District rather than generic DFW sightseeing. Hotels and restaurants in the district can reduce the need to move a car between nearby venues.',
    nearby: 'Globe Life Field and Texas Live! are direct, defensible connections. AT&T Stadium is in the same entertainment district but should still be treated as a separate venue visit.',
    planningLinks: [...sources.choctaw],
    imageBrief: 'Choctaw Stadium in Arlington with its former-baseball-ballpark form and adjacent entertainment-district context visible, no added text or logos.',
    verifiedAt: reviewedAt,
  },
  'ford-center-at-the-star': {
    city: 'Frisco',
    capacity: '12,000',
    primaryEvents: ['Dallas Cowboys practices and events', 'Frisco ISD football', 'Indoor sports and special events'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE5['ford-center-at-the-star'].editorialStory,
    parking: 'Ford Center is embedded in The Star rather than a stand-alone parking field. Parking, passenger drop-off and rideshare locations can vary by event, so use the event page and Ford Center guest guide before entering the district.',
    arrival: 'The venue has one principal guest entrance on the south side through the plaza. Frisco ISD games generally open about one hour before kickoff, while other event door times can differ.',
    stayAndEat: 'The Star’s hotels, restaurants and public spaces are genuinely integrated with Ford Center and can be reached within the same mixed-use campus. Broader Frisco attractions should not be implied to be equally close.',
    nearby: 'The Dallas Cowboys headquarters, practice fields and Championship Plaza are immediate parts of The Star. Toyota Stadium, Riders Field and Comerica Center are separate Frisco sports destinations.',
    planningLinks: [...sources.fordCenter],
    imageBrief: 'Ford Center at The Star in Frisco, showing the indoor stadium and connected Cowboys headquarters district without added text or logos.',
    verifiedAt: reviewedAt,
  },
  'datcu-stadium': {
    city: 'Denton',
    capacity: '30,100',
    opened: '2011',
    primaryEvents: ['North Texas Mean Green football', 'American Conference college-football games', 'University and special events'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE5['datcu-stadium'].editorialStory,
    parking: 'UNT operates color-coded game-day lots around DATCU Stadium, with paid and pass-only areas plus ADA parking and shuttles. Prices and construction access change, so use the current season parking page instead of preserving a fixed price table in evergreen copy.',
    arrival: 'For 2026, construction prevents Blue Lot access to Gate 1 and directs those fans to Gate 4. Treat that as season-specific guidance and recheck the current DATCU Stadium game-day page before travel.',
    stayAndEat: 'DATCU Stadium is on UNT’s athletic campus south of central Denton. Downtown Denton can be part of a longer game weekend, but it is not the same walk-up environment as the stadium campus itself.',
    nearby: 'UNT athletic facilities and campus are the strongest immediate connections. The Denton Square is a separate city stop rather than an adjacent stadium amenity.',
    planningLinks: [...sources.datcu],
    imageBrief: 'DATCU Stadium in Denton showing its horseshoe bowl, modern green-design features and UNT athletics-campus setting without added text or logos.',
    verifiedAt: reviewedAt,
  },
  'riders-field': {
    city: 'Frisco',
    capacity: '10,216 total; 7,748 fixed seats',
    opened: '2003',
    primaryEvents: ['Frisco RoughRiders Double-A baseball', 'Texas League games', 'College baseball and special events'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE5['riders-field'].editorialStory,
    parking: 'Riders Field sells game parking and recommends advance purchase. Lots generally open two hours before the scheduled game, and accessible parking is in Lot B.',
    arrival: 'Ballpark gates normally open about one hour before first pitch. Follow the current game page for promotional dates or special events because gate and parking procedures can change.',
    stayAndEat: 'The ballpark sits within Frisco’s sports-and-entertainment district, where nearby lodging and dining can support a compact baseball trip. That context is more useful than generic Dallas-area recommendations.',
    nearby: 'Comerica Center and The Star are defensible nearby sports connections. Toyota Stadium is also in Frisco but should be treated as a separate stop rather than part of Riders Field.',
    planningLinks: [...sources.riders],
    imageBrief: 'Riders Field in Frisco during a baseball evening, showing its distinctive architecture and outfield Lazy River without added text or logos.',
    verifiedAt: reviewedAt,
  },
  'lone-star-park': {
    city: 'Grand Prairie',
    capacity: 'Approximately 6,000 grandstand seats',
    primaryEvents: ['Live Thoroughbred racing', 'Live Quarter Horse racing', 'Year-round simulcast wagering'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE5['lone-star-park'].editorialStory,
    parking: 'Lone Star Park has roughly 6,000 paved spaces. General parking is ordinarily free, while preferred, valet and special-event pricing can vary; use the current event or getting-here page rather than an evergreen dollar amount.',
    arrival: 'Gate and first-post times vary by racing season and special event. Confirm the live-racing calendar before driving to Grand Prairie, especially because the year-round Bar & Book operates even when the live track schedule differs.',
    stayAndEat: 'The track is on a large Grand Prairie property near I-30 rather than in a walkable downtown. Lodging should be chosen around the race schedule and the broader Arlington/Grand Prairie trip, not implied to be on-site.',
    nearby: 'The racetrack, paddock and Bar & Book are the immediate experience. Other Metroplex attractions require a separate drive and should be presented only when they fit the itinerary.',
    planningLinks: [...sources.loneStar],
    imageBrief: 'Lone Star Park in Grand Prairie with live horse racing, the glass-enclosed grandstand and broad racetrack grounds visible, no added text or logos.',
    verifiedAt: reviewedAt,
  },
  'tdecu-stadium': {
    city: 'Houston',
    capacity: '40,000',
    opened: '2014',
    primaryEvents: ['Houston Cougars football', 'Big 12 college-football games', 'University and special stadium events'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE5['tdecu-stadium'].editorialStory,
    parking: 'University of Houston football parking is campus-based and event-specific. Use the current season parking map and assigned lot rather than treating ordinary campus parking as stadium parking.',
    arrival: 'TDECU Stadium is at 3874 Holman Street on the UH campus. Clear-bag screening and game-day traffic make early arrival more reliable, and event-specific gate information should override general guidance.',
    stayAndEat: 'The stadium’s meaningful context is the University of Houston campus and nearby central-Houston neighborhoods. Downtown, EaDo and other districts are separate choices rather than automatic stadium-adjacent recommendations.',
    nearby: 'Fertitta Center and other UH athletics facilities are direct campus relationships. Shell Energy Stadium and Daikin Park belong to a separate downtown/EaDo sports cluster.',
    planningLinks: [...sources.tdecu],
    imageBrief: 'TDECU Stadium on the University of Houston campus with the football bowl and surrounding campus facilities visible, no added text or logos.',
    verifiedAt: reviewedAt,
  },
  'fertitta-center': {
    city: 'Houston',
    capacity: '7,035 for basketball',
    opened: '2018',
    primaryEvents: ['Houston Cougars men’s basketball', 'Houston Cougars women’s basketball', 'Houston Cougars volleyball'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE5['fertitta-center'].editorialStory,
    parking: 'Fertitta Center parking follows University of Houston event and campus operations. Visitors should use the current gameday guide for the sport or event because lots, permit requirements and traffic patterns can change.',
    arrival: 'The arena is at 3422 Cullen Boulevard at Holman Street. Houston Athletics uses clear-bag screening, so build in enough time for parking and entry rather than relying on a fixed universal doors-open time.',
    stayAndEat: 'The arena is an on-campus venue, not a downtown tourist district. Central Houston lodging and dining can work well for a broader trip, but the UH campus is the correct immediate visitor geography.',
    nearby: 'TDECU Stadium and other Cougar athletics facilities are the strongest same-campus links. Downtown and EaDo venues are separate city trips.',
    planningLinks: [...sources.fertitta],
    imageBrief: 'Fertitta Center on the University of Houston campus during a basketball or volleyball event, modern arena and campus context visible without added text or logos.',
    verifiedAt: reviewedAt,
  },
  'heb-center-at-cedar-park': {
    city: 'Cedar Park',
    capacity: '6,800 hockey; 7,200 many sporting events; up to 8,000 concerts',
    opened: '2009',
    primaryEvents: ['Texas Stars AHL hockey', 'Austin Spurs NBA G League basketball', 'Concerts and touring sports/entertainment'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE5['heb-center-at-cedar-park'].editorialStory,
    parking: 'The arena has more than 2,600 on-site spaces, including accessible parking, but prices and lot availability vary by event. Current event pages should control parking cost and specific lot instructions.',
    arrival: 'H-E-B Center uses security screening, a current bag-size policy and no re-entry. Arrive early enough for screening and check the specific event page because promoter rules can be stricter than the arena baseline.',
    stayAndEat: 'Cedar Park and north Austin lodging are practical for arena-focused trips, but the page should distinguish the Cedar Park venue from central Austin rather than presenting them as one walkable district.',
    nearby: 'The arena’s immediate Cedar Park commercial district is the relevant context. Central Austin sports venues require a separate drive and should not be labeled nearby without distance evidence.',
    planningLinks: [...sources.hebCenter],
    imageBrief: 'H-E-B Center at Cedar Park during a hockey or basketball event with the arena exterior and Cedar Park setting visible, no added text or logos.',
    verifiedAt: reviewedAt,
  },
  'alamodome': {
    city: 'San Antonio',
    capacity: '62,834 for football and soccer',
    opened: '1993',
    primaryEvents: ['UTSA Roadrunners football', 'Major football and soccer events', 'Concerts and large special events'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE5['alamodome'].editorialStory,
    parking: 'The Alamodome generally uses Lots A, B and C, but availability and prices are event-specific. Accessible parking is in Lot A, while rideshare/taxi/limo operations use Lot D under the venue’s current plan.',
    arrival: 'The stadium is at 100 Montana Street near downtown San Antonio. Clear-bag screening, event-specific door times and changing downtown street conditions mean the current event guide should control the arrival plan.',
    stayAndEat: 'Downtown lodging can make the Alamodome practical without a long cross-city transfer, but River Walk and Hemisfair activities should still be planned as distinct itinerary choices rather than generic filler.',
    nearby: 'Hemisfair and the downtown convention/visitor district are geographically defensible connections. Other San Antonio attractions should be included only when they fit the actual event schedule.',
    planningLinks: [...sources.alamodome],
    imageBrief: 'Alamodome in San Antonio showing the stadium exterior and downtown-edge setting on a major event day, no added text or logos.',
    verifiedAt: reviewedAt,
  },
};

export function getSportsVenueContentRemediationWave5(slug: string) {
  return SPORTS_VENUE_CONTENT_REMEDIATION_WAVE5[slug];
}

export function getSportsVenueQualityProfileWave5(slug: string) {
  return SPORTS_VENUE_QUALITY_PROFILES_WAVE5[slug];
}
