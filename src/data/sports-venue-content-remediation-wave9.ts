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

export type SportsVenueQualityProfileWave9 = {
  visitorFacts: SportsVenueVisitorFacts;
  editorialStory: string;
  sourceReview: SportsVenueSourceReview;
};

const sources = {
  amarillo: [
    { label: 'Amarillo National Center venue information', url: 'https://www.tristatefair.com/p/rentals/amarillo-national-center' },
    { label: 'Amarillo National Center event schedule', url: 'https://www.tristatefair.com/location/amarillo-national-center' },
  ],
  extraco: [
    { label: 'Extraco Events Center about', url: 'https://www.extracoeventscenter.com/about.aspx' },
    { label: 'Extraco Events Center venues', url: 'https://www.extracoeventscenter.com/p/explorewaco/venues' },
    { label: 'Extraco Events Center events', url: 'https://www.extracoeventscenter.com/events' },
  ],
  taylorExpo: [
    { label: 'Expo Center venue information', url: 'https://www.taylorcountyexpocenter.com/p/venue-info' },
    { label: 'Expo Center facilities and schedule', url: 'https://www.taylorcountyexpocenter.com/location/all-facilities' },
    { label: 'Expo Center tickets and seating maps', url: 'https://www.taylorcountyexpocenter.com/p/tickets--deals' },
  ],
  msrHouston: [
    { label: 'MSR Houston facility', url: 'https://msrhouston.com/about/facility/' },
    { label: 'MSR Houston about', url: 'https://msrhouston.com/about/' },
    { label: 'MSR Houston events', url: 'https://msrhouston.com/events/' },
  ],
  eaglesCanyon: [
    { label: 'Eagles Canyon Raceway campus', url: 'https://eaglescanyon.com/campus-page/' },
    { label: 'Eagles Canyon Raceway contact', url: 'https://eaglescanyon.com/contact-us/' },
    { label: 'Eagles Canyon Raceway calendar', url: 'https://eaglescanyon.com/calendar/' },
  ],
  xtreme: [
    { label: 'Xtreme Raceway Park', url: 'https://www.xtremeracewaypark.com/' },
    { label: 'Xtreme Raceway Park track information', url: 'https://www.xtremeracewaypark.com/track-info/' },
    { label: 'Xtreme Raceway Park events', url: 'https://www.xtremeracewaypark.com/events/' },
  ],
  houstonMotorsports: [
    { label: 'Houston Motorsports Park', url: 'https://www.houstonmotorsportspark.com/' },
    { label: 'Houston Motorsports Park current posts', url: 'https://www.houstonmotorsportspark.com/wp/' },
  ],
  nationalShooting: [
    { label: 'National Shooting Complex official site', url: 'https://nsc.nssa-nsca.org/' },
    { label: 'National Shooting Complex map and directions', url: 'https://nsc.nssa-nsca.org/map-directions/' },
    { label: 'National Shooting Complex events', url: 'https://nsc.nssa-nsca.org/events/' },
  ],
  wacoSurf: [
    { label: 'Waco Surf official site', url: 'https://wacosurf.com/' },
    { label: 'Waco Surf activities', url: 'https://wacosurf.com/activities/' },
    { label: 'Waco Surf sessions and lessons', url: 'https://wacosurf.com/surf/' },
    { label: 'Waco Surf cable park', url: 'https://wacosurf.com/the-cable-park/' },
  ],
  jamail: [
    { label: 'Texas Athletics Jamail Swimming Center facility page', url: 'https://texaslonghorns.com/facilities/lee-and-joe-jamail-texas-swimming-center/15' },
    { label: 'Texas Athletics detailed Jamail facility guide', url: 'https://texaslonghorns.com/sports/2013/7/25/facilities_0725134223' },
  ],
} as const;

export const SPORTS_VENUE_QUALITY_PROFILES_WAVE9: Record<string, SportsVenueQualityProfileWave9> = {
  'amarillo-national-center': {
    visitorFacts: {
      address: '3301 SE 10th Ave., Amarillo, TX 79104',
      capacity: '5,000 permanent seats plus up to 5,000 floor seats',
      homeTeams: [],
      leagueOrConference: 'Rodeo, equestrian, livestock and motorsports events at the Tri-State Fairgrounds',
      accessibility: 'The arena is heated and cooled and configured for a wide range of livestock and spectator events. Event-specific accessible seating and gate instructions should be confirmed on the current event page.',
    },
    editorialStory: 'Amarillo National Center is the Tri-State Fairgrounds’ climate-controlled multipurpose arena, with 5,000 permanent seats, up to 5,000 floor seats, six bucking chutes, a timed-event chute and livestock holding pens. Its recurring rodeo, ranch-horse, mounted-shooting and motorsports calendar makes it a genuine Panhandle Western-sports destination rather than a generic event hall.',
    sourceReview: { reviewedAt, authoritativeSources: sources.amarillo },
  },
  'extraco-events-center': {
    visitorFacts: {
      address: '4601 Bosque Blvd., Waco, TX 76710',
      opened: 'Original Coliseum and grounds constructed in 1953',
      homeTeams: [],
      leagueOrConference: 'Heart O’ Texas Fair & Rodeo, equestrian, livestock, motorsports and community events',
      accessibility: 'The complex contains multiple rentable/ticketed facilities rather than one public-use arena. Accessibility and entrance instructions should be checked for the specific Coliseum, Show Pavilion or BASE event.',
    },
    editorialStory: 'Extraco Events Center traces its Waco grounds to the 1953 Coliseum and now operates a three-facility campus that includes the Coliseum, Show Pavilion and 55,000-square-foot BASE opened in 2021. The complex reports more than 300 events annually and remains home to the Heart O’ Texas Fair & Rodeo, so building-level event guidance matters more than one generic arena profile.',
    sourceReview: { reviewedAt, authoritativeSources: sources.extraco },
  },
  'expo-center-taylor-county': {
    visitorFacts: {
      address: '1700 Hwy 36, Abilene, TX 79602',
      capacity: 'Taylor Telecom Arena has more than 5,600 permanent seats; other buildings use different configurations',
      homeTeams: [],
      leagueOrConference: 'West Texas Fair & Rodeo, Western Heritage Classic, equine and livestock events',
      accessibility: 'The 117-acre campus contains multiple arenas, halls and pavilions with handicap-accessible facilities. Visitors should confirm the specific building and seating map for the event.',
    },
    editorialStory: 'The Expo Center of Taylor County is a 117-acre Abilene event campus built for fairs, rodeos, concerts and major horse and livestock events. Its Taylor Telecom Arena has more than 5,600 permanent seats, the campus offers roughly 5,000 parking spaces, and recurring anchors such as the West Texas Fair & Rodeo and Western Heritage Classic make it a West Texas Western-sports destination rather than a single generic arena.',
    sourceReview: { reviewedAt, authoritativeSources: sources.taylorExpo },
  },
  'msr-houston': {
    visitorFacts: {
      address: '1 Performance Drive, Angleton, TX 77515',
      homeTeams: [],
      playingSurface: '2.38-mile, 17-turn, 40-foot-wide FIA-approved road course; separate 0.7-mile karting track',
      leagueOrConference: 'Road-course racing, testing, driver schools, track events and karting',
    },
    editorialStory: 'MSR Houston is a 163-acre Angleton motorsports campus built around a 2.38-mile, 17-turn FIA-approved road course that can run clockwise or counter-clockwise. A separate 0.7-mile karting track, 180,000 square feet of paddock space, private garages and a 90,000-square-foot skid pad make it a driver-development and racing destination rather than a spectator-only oval.',
    sourceReview: { reviewedAt, authoritativeSources: sources.msrHouston },
  },
  'eagles-canyon-raceway': {
    visitorFacts: {
      address: '7629 North FM-51, Decatur, TX 76234',
      homeTeams: [],
      playingSurface: '2.7-mile FIA-spec road course with 15 turns / 20 apexes, run clockwise or counter-clockwise',
      leagueOrConference: 'Private-club track days, driver development, racing and off-road motorsports',
    },
    editorialStory: 'Eagles Canyon Raceway is a private motorsports campus near Decatur centered on a 2.7-mile FIA-spec road course with 15 turns, 20 apexes and clockwise/counter-clockwise operation. The property also includes skid-pad training, karting and a substantial off-road campus, making membership, scheduled track access and event registration central to planning a visit.',
    sourceReview: { reviewedAt, authoritativeSources: sources.eaglesCanyon },
  },
  'xtreme-raceway-park': {
    visitorFacts: {
      address: '1800 S Interstate 45 Service Rd., Ferris, TX 75125',
      homeTeams: [],
      leagueOrConference: 'Drag racing, bracket racing, test-and-tune and specialty race events',
      accessibility: 'Track layout and spectator operations vary by event. Visitors should use the current track and event information rather than relying on an older race-weekend layout.',
    },
    editorialStory: 'Xtreme Raceway Park in Ferris was developed by drag racers after the closure of Texas Raceway, with freeway-frontage access and fan-focused features such as covered starting-line viewing areas and a shaded pavilion. Its I-45 setting and active drag-racing calendar make current track directions and event rules more useful than generic Dallas-area motorsports copy.',
    sourceReview: { reviewedAt, authoritativeSources: sources.xtreme },
  },
  'houston-motorsports-park': {
    visitorFacts: {
      address: '11620 N Lake Houston Pkwy, Houston, TX 77044',
      homeTeams: [],
      leagueOrConference: 'Oval racing, drag racing, test-and-tune and grassroots motorsports',
    },
    editorialStory: 'Houston Motorsports Park remains an active northeast-Houston motorsports venue in 2026, with a calendar spanning oval race nights, drag-strip street nights and test-and-tune events. Because classes, gates, schedules and prices change by event, the useful evergreen story is the combined oval-and-drag identity and the need to follow the live calendar rather than a frozen race-night template.',
    sourceReview: { reviewedAt, authoritativeSources: sources.houstonMotorsports },
  },
  'national-shooting-complex': {
    visitorFacts: {
      address: '5931 Roft Road, San Antonio, TX 78253',
      homeTeams: [],
      leagueOrConference: 'National Skeet Shooting Association and National Sporting Clays Association championship competition',
      accessibility: 'The 696-acre property hosts both championship and other scheduled events. Competitors and spectators should use the current event program, field assignment and map before travel.',
    },
    editorialStory: 'The National Shooting Complex spans 696 acres of San Antonio countryside and serves as headquarters for both the National Skeet Shooting Association and National Sporting Clays Association. It hosts the World Skeet Championships, National Sporting Clays Championship and other major events, making current field assignments and event schedules more useful than generic outdoor-recreation copy.',
    sourceReview: { reviewedAt, authoritativeSources: sources.nationalShooting },
  },
  'waco-surf': {
    visitorFacts: {
      address: '5347 Old Mexia Road, Waco, TX 76705',
      homeTeams: [],
      leagueOrConference: 'Surf lagoon sessions, wakeboarding/cable park, water park and destination water sports',
      accessibility: 'Waco Surf is a destination park with activity-specific bookings, lodging and park rules. Check the current activity status and booking page because individual attractions can have seasonal hours or temporary downtime.',
    },
    editorialStory: 'Waco Surf is a destination water-sports resort built around a surf lagoon with beginner, intermediate, advanced and private surf sessions, plus a cable park, seasonal water-park activities and on-property lodging. Current activity status matters because individual attractions can be seasonal or temporarily unavailable, so the live park schedule should control rather than an evergreen hours claim.',
    sourceReview: { reviewedAt, authoritativeSources: sources.wacoSurf },
  },
  'jamail-texas-swimming-center': {
    visitorFacts: {
      address: '1900 Red River St., Austin, TX 78712',
      capacity: '2,100 fixed grandstand seats plus 500 portable seats for major competitions',
      opened: '1979',
      homeTeams: ['Texas Longhorns swimming and diving'],
      playingSurface: '50-meter competition pool with movable bulkheads plus a dedicated diving pool and tower',
      leagueOrConference: 'NCAA/SEC swimming and diving plus scholastic, USA Swimming and major aquatic competition',
      accessibility: 'The 2001 renovation added an ADA-certified entrance and handicap seating area. Meet-specific spectator, deck and parking instructions should control for major competitions.',
    },
    editorialStory: 'The Lee and Joe Jamail Texas Swimming Center opened to competitors in 1979 after being modeled on the pool used for the 1972 Munich Olympics. Its 50-meter competition pool, movable bulkheads, deep diving well and championship diving tower support Texas swimming and diving as well as major scholastic, collegiate and national aquatic meets; the fixed grandstand seats 2,100 with room for 500 additional spectators at major competitions.',
    sourceReview: { reviewedAt, authoritativeSources: sources.jamail },
  },
};

export const SPORTS_VENUE_CONTENT_REMEDIATION_WAVE9: Record<string, SportsVenueEnrichment> = {
  'amarillo-national-center': {
    city: 'Amarillo', capacity: '5,000 permanent seats plus up to 5,000 floor seats',
    primaryEvents: ['Rodeo and ranch-horse competition', 'Equestrian and livestock events', 'Mounted shooting, Arenacross and specialty arena events'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE9['amarillo-national-center'].editorialStory,
    parking: 'The arena is part of the Tri-State Fairgrounds at 3301 SE 10th Avenue. Parking and gate assignments vary with fairs, horse shows and arena events, so the current event listing should control.',
    arrival: 'Large Western-sports events can generate early livestock and trailer traffic around the fairgrounds. Confirm the session time and event entrance before reaching the grounds.',
    stayAndEat: 'Amarillo’s interstate hotel base supports multi-day competitors and spectators coming from across the Panhandle and neighboring states.',
    nearby: 'The Tri-State Fairgrounds and Amarillo attractions are the defensible trip context; other Panhandle stops should be itinerary-driven.',
    planningLinks: [...sources.amarillo],
    imageBrief: 'Amarillo National Center during a rodeo or ranch-horse event with indoor dirt arena and Panhandle Western-sports atmosphere, no added text or logos.', verifiedAt: reviewedAt,
  },
  'extraco-events-center': {
    city: 'Waco', opened: '1953 original Coliseum and grounds',
    primaryEvents: ['Heart O’ Texas Fair & Rodeo', 'Equestrian and livestock competitions', 'Motorsports, trade shows and community events'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE9['extraco-events-center'].editorialStory,
    parking: 'The campus contains three primary facilities and can host simultaneous events. Confirm whether the event is in the Coliseum, Show Pavilion or BASE before choosing the lot and entrance.',
    arrival: 'Fair and rodeo dates can combine livestock, arena and entertainment traffic across the same grounds. Arrive with enough time to find the correct building before a ticketed session.',
    stayAndEat: 'Waco has a substantial hotel and restaurant base for multi-day competitors and Fair & Rodeo visitors; those city options are separate from the event-center campus itself.',
    nearby: 'Central Waco and Baylor sports venues can support a larger itinerary when they fit the event schedule.',
    planningLinks: [...sources.extraco],
    imageBrief: 'Extraco Events Center in Waco during a rodeo or equestrian event with active fairgrounds and dirt-arena atmosphere, no added text or logos.', verifiedAt: reviewedAt,
  },
  'expo-center-taylor-county': {
    city: 'Abilene', capacity: 'Taylor Telecom Arena has more than 5,600 permanent seats',
    primaryEvents: ['West Texas Fair & Rodeo', 'Western Heritage Classic', 'Equine, livestock and rodeo competitions'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE9['expo-center-taylor-county'].editorialStory,
    parking: 'The 117-acre complex advertises roughly 5,000 parking spaces, but building and entrance use varies across simultaneous events. Confirm the specific arena and map before travel.',
    arrival: 'Use the official Highway 36 address and current event map. Equine and livestock events can create trailer traffic distinct from ordinary spectator arrival.',
    stayAndEat: 'Abilene is the correct visitor base for multi-day fair, rodeo and Western Heritage events rather than a generic West Texas regional description.',
    nearby: 'The fairgrounds campus and Abilene attractions can support a multi-day itinerary, but event building assignments should remain the primary planning context.',
    planningLinks: [...sources.taylorExpo],
    imageBrief: 'Expo Center of Taylor County in Abilene during a West Texas rodeo or equine event, showing the fairgrounds campus without added text or logos.', verifiedAt: reviewedAt,
  },
  'msr-houston': {
    city: 'Angleton',
    primaryEvents: ['Road-course racing and testing', 'Driver schools and track events', 'Karting and corporate driving events'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE9['msr-houston'].editorialStory,
    parking: 'MSR Houston is a working motorsports facility with paddock and participant areas whose use depends on the event. Follow the specific organizer or track instructions rather than assuming a spectator parking pattern.',
    arrival: 'The track is at 1 Performance Drive in Angleton. Track rentals, club days, schools and race weekends have different check-in procedures, so confirm the event before entering the campus.',
    stayAndEat: 'Angleton and Brazoria County are the immediate visitor geography; central Houston is not track-adjacent despite the venue name.',
    nearby: 'The road course, karting track and skid-pad facilities are the strongest same-property connections.',
    planningLinks: [...sources.msrHouston],
    imageBrief: 'MSR Houston in Angleton showing its technical road course, paddock and Gulf Coast motorsports setting, no added text or logos.', verifiedAt: reviewedAt,
  },
  'eagles-canyon-raceway': {
    city: 'Decatur',
    primaryEvents: ['Member track days', 'Road racing and driver development', 'Karting and off-road motorsports'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE9['eagles-canyon-raceway'].editorialStory,
    parking: 'Eagles Canyon is a private motorsports club and campus. Access depends on membership, a registered event, guest arrangement or scheduled program rather than ordinary walk-up spectator admission.',
    arrival: 'The facility is at 7629 North FM-51 near Decatur. Confirm the registered program and campus destination—road course, skid pad, karting or off-road—before arrival.',
    stayAndEat: 'Decatur and Wise County are the immediate visitor geography. North Texas metro destinations are separate rather than track-adjacent.',
    nearby: 'The road course, Hilltop viewing areas, training grounds, karting and off-road campus form the immediate motorsports cluster.',
    planningLinks: [...sources.eaglesCanyon],
    imageBrief: 'Eagles Canyon Raceway near Decatur showing the elevation-changing road course and North Texas landscape, no added text or logos.', verifiedAt: reviewedAt,
  },
  'xtreme-raceway-park': {
    city: 'Ferris',
    primaryEvents: ['Drag racing', 'Bracket and specialty races', 'Test-and-tune and enthusiast events'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE9['xtreme-raceway-park'].editorialStory,
    parking: 'Spectator and participant layouts vary by event. Use the current event listing and track instructions rather than assuming one universal race-day lot plan.',
    arrival: 'The track is on the northbound I-45 service road at 1800 S Interstate 45 Service Road. The official track page directs northbound traffic around exit 262 and traffic from Ennis around exit 263A.',
    stayAndEat: 'Ferris and the southern Dallas-area I-45 corridor are the practical visitor frame for multi-day events.',
    nearby: 'Texas Motorplex in Ennis is part of the broader regional drag-racing landscape, but it is a separate destination rather than a same-site attraction.',
    planningLinks: [...sources.xtreme],
    imageBrief: 'Xtreme Raceway Park in Ferris during an evening drag-racing event with starting-line action and Texas sky, no added text or logos.', verifiedAt: reviewedAt,
  },
  'houston-motorsports-park': {
    city: 'Houston',
    primaryEvents: ['Short-track oval racing', 'Drag-strip street nights', 'Test-and-tune and grassroots motorsports'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE9['houston-motorsports-park'].editorialStory,
    parking: 'Race-night parking, pit access and gate timing vary between oval and drag-strip events. Use the current event post rather than carrying one schedule or admission price across the season.',
    arrival: 'Houston Motorsports Park is at 11620 N Lake Houston Parkway in northeast Houston. Current event posts are the source of truth for pit gates, grandstand gates and start times.',
    stayAndEat: 'Northeast Houston is the immediate visitor geography; central Houston destinations are a separate drive rather than venue-adjacent.',
    nearby: 'Same-property oval and drag-strip programming are the strongest connections; other Houston attractions should be added only when the itinerary supports them.',
    planningLinks: [...sources.houstonMotorsports],
    imageBrief: 'Houston Motorsports Park during a local oval or drag-racing night with grassroots motorsports atmosphere, no added text or logos.', verifiedAt: reviewedAt,
  },
  'national-shooting-complex': {
    city: 'San Antonio',
    primaryEvents: ['World Skeet Championships', 'National Sporting Clays Championship', 'Skeet, sporting-clays and other scheduled competitions'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE9['national-shooting-complex'].editorialStory,
    parking: 'The complex spans 696 acres and event use can involve different fields and competition areas. Follow the current championship program, map and assignment rather than a generic parking description.',
    arrival: 'The facility is at 5931 Roft Road. Major championships are multi-day competition events, so competitors and spectators should confirm registration, field assignment and schedule before travel.',
    stayAndEat: 'West/northwest San Antonio is the relevant lodging geography for early competition starts; downtown is a separate visitor district.',
    nearby: 'The complex’s skeet and sporting-clays fields are the primary same-property destinations. Broader San Antonio attractions are separate itinerary choices.',
    planningLinks: [...sources.nationalShooting],
    imageBrief: 'National Shooting Complex in San Antonio showing expansive championship clay-target fields and Texas countryside, no added text or logos.', verifiedAt: reviewedAt,
  },
  'waco-surf': {
    city: 'Waco',
    primaryEvents: ['Surf-lagoon sessions and instruction', 'Cable-park wakeboarding', 'Seasonal water-park and destination-resort activities'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE9['waco-surf'].editorialStory,
    parking: 'Waco Surf is a destination park with day-use and lodging visitors. Use the current booking confirmation and park map for arrival rather than treating every activity as available on the same schedule.',
    arrival: 'The park is at 5347 Old Mexia Road. Surf sessions are reservation-driven, and cable/water-park offerings can be seasonal, so check the live activity status before leaving.',
    stayAndEat: 'On-property cabins, lodging and food make Waco Surf unusually self-contained for a sports destination, while central Waco is a separate trip segment.',
    nearby: 'Surf lagoon, cable park, water-park activities and lodging form the immediate resort cluster; Baylor and central-Waco attractions can support a broader stay.',
    planningLinks: [...sources.wacoSurf],
    imageBrief: 'Waco Surf surf lagoon with active wave session, beach and Central Texas resort atmosphere, no added text or logos.', verifiedAt: reviewedAt,
  },
  'jamail-texas-swimming-center': {
    city: 'Austin', capacity: '2,100 fixed seats plus 500 portable seats for major competitions', opened: '1979',
    primaryEvents: ['Texas Longhorns swimming and diving', 'Collegiate and scholastic championships', 'USA Swimming and major aquatic competition'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE9['jamail-texas-swimming-center'].editorialStory,
    parking: 'The swimming center is embedded in the UT athletics/campus district. Meet organizers and Texas Athletics should control garage, team and spectator parking rather than an evergreen campus-lot assumption.',
    arrival: 'The center is at 1900 Red River Street. Major swim and diving meets use spectator seating and event-specific deck controls, so current meet guidance should be checked before arrival.',
    stayAndEat: 'The University of Texas and central Austin provide the useful visitor geography for multi-day meets; downtown is close but still separate from the facility itself.',
    nearby: 'Moody Center, DKR and UFCU Disch-Falk Field are direct UT sports-district relationships.',
    planningLinks: [...sources.jamail],
    imageBrief: 'Lee and Joe Jamail Texas Swimming Center during a major swim meet, showing the competition pool and spectator grandstands without added text or logos.', verifiedAt: reviewedAt,
  },
};

export function getSportsVenueContentRemediationWave9(slug: string) {
  return SPORTS_VENUE_CONTENT_REMEDIATION_WAVE9[slug];
}

export function getSportsVenueQualityProfileWave9(slug: string) {
  return SPORTS_VENUE_QUALITY_PROFILES_WAVE9[slug];
}
