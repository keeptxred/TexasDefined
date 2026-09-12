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

export type SportsVenueQualityProfileWave6 = {
  visitorFacts: SportsVenueVisitorFacts;
  editorialStory: string;
  sourceReview: SportsVenueSourceReview;
};

const sources = {
  reliant: [
    { label: 'Reliant Stadium official venue page', url: 'https://www.nrgpark.com/reliant-stadium/' },
    { label: 'Reliant Park visitor planning', url: 'https://www.nrgpark.com/plan-your-visit/' },
    { label: 'Houston Texans stadium A-Z guide', url: 'https://www.houstontexans.com/stadium/a-z-guide' },
  ],
  rice: [
    { label: 'Rice Stadium facility page', url: 'https://riceowls.com/facilities/rice-stadium/3' },
    { label: 'Rice Athletics maps and directions', url: 'https://riceowls.com/sports/2018/7/17/facilities-driving-parking-directions-html' },
    { label: 'Rice Athletics parking', url: 'https://riceowls.com/sports/2022/7/7/rice-athletics-parking' },
  ],
  constellation: [
    { label: 'Constellation Field official ballpark page', url: 'https://www.milb.com/sugar-land/ballpark/constellation-field' },
    { label: 'Constellation Field directions and parking', url: 'https://www.milb.com/sugar-land/ballpark/directions' },
    { label: 'Constellation Field A-Z guide', url: 'https://www.milb.com/sugar-land/ballpark/guide' },
  ],
  pgaFrisco: [
    { label: 'PGA Frisco golf', url: 'https://www.pgafrisco.com/golf/' },
    { label: 'PGA Frisco FAQs', url: 'https://www.pgafrisco.com/faqs/' },
    { label: 'PGA Frisco official site', url: 'https://www.pgafrisco.com/' },
  ],
  willRogers: [
    { label: 'Will Rogers Memorial Center', url: 'https://www.fortworthtexas.gov/departments/public-events/will-rogers-memorial-center' },
    { label: 'Fort Worth Public Events', url: 'https://www.fortworthtexas.gov/departments/public-events' },
  ],
  united: [
    { label: 'United Supermarkets Arena facility page', url: 'https://texastech.com/facilities/united-supermarkets-arena/4' },
    { label: 'United Supermarkets Arena guest services', url: 'https://www.depts.ttu.edu/unitedsupermarketsarena/guestServices/facility/' },
    { label: 'United Supermarkets Arena official site', url: 'https://www.depts.ttu.edu/unitedsupermarketsarena/' },
  ],
  sunBowl: [
    { label: 'Sun Bowl facility page', url: 'https://utepminers.com/facilities/sun-bowl/2' },
    { label: 'UTEP football gameday guide', url: 'https://utepminers.com/sports/2024/8/19/football-gameday-guide' },
  ],
  donHaskins: [
    { label: 'Don Haskins Center facility page', url: 'https://utepminers.com/facilities/don-haskins-center/1' },
    { label: 'UTEP Athletics', url: 'https://utepminers.com/' },
  ],
  southwestUniversityPark: [
    { label: 'Southwest University Park ballpark guidelines', url: 'https://www.milb.com/el-paso/ballpark/ballpark-guidelines' },
    { label: 'Southwest University Park accessibility guide', url: 'https://www.milb.com/el-paso/ballpark/ada-accessibility' },
    { label: 'Southwest University Park clear-bag policy', url: 'https://www.milb.com/el-paso/ballpark/clear-bag-policy' },
  ],
  hodgetown: [
    { label: 'HODGETOWN official ballpark page', url: 'https://www.milb.com/amarillo/ballpark/hodgetown' },
    { label: 'HODGETOWN A-Z guide', url: 'https://www.milb.com/amarillo/ballpark/a-z-guide' },
    { label: 'Amarillo Sod Poodles official site', url: 'https://www.milb.com/amarillo' },
  ],
} as const;

export const SPORTS_VENUE_QUALITY_PROFILES_WAVE6: Record<string, SportsVenueQualityProfileWave6> = {
  'reliant-stadium': {
    visitorFacts: {
      address: '8825 Kirby Drive, Houston, TX 77054',
      capacity: '72,000 to 80,000 depending on configuration',
      opened: '2002',
      homeTeams: ['Houston Texans'],
      playingSurface: 'Artificial turf over concrete',
      leagueOrConference: 'NFL; RODEOHOUSTON and major stadium events',
      accessibility: 'Reliant Park and the Texans publish current accessible parking, seating, entrance and guest-service guidance. Event-specific maps should control because stadium and campus operations change by event.',
      bagAndEntry: 'NFL and other major events can use different screening and bag rules. Use the current Texans or Reliant Park event guide rather than treating one event policy as a permanent stadium rule.',
    },
    editorialStory: 'Reliant Stadium opened in 2002 as Houston’s retractable-roof NFL stadium and returned to the Reliant name in 2026. The official venue page lists a 72,000-to-80,000 seating range depending on configuration, a 1.9-million-square-foot building and artificial turf over concrete; its scale and role inside the Reliant Park campus are more useful than generic Houston-weekend filler.',
    sourceReview: { reviewedAt, authoritativeSources: sources.reliant },
  },
  'rice-stadium': {
    visitorFacts: {
      capacity: '47,000',
      opened: '1950',
      homeTeams: ['Rice Owls football'],
      leagueOrConference: 'NCAA Division I FBS — American Conference',
      accessibility: 'Rice Athletics publishes current stadium, parking and campus-access information. Accessible routes and event parking should be checked against the current game or campus plan.',
    },
    editorialStory: 'Rice Stadium opened in 1950 after a rapid nine-month construction effort and remains a 47,000-seat Houston landmark. Its history includes President John F. Kennedy’s 1962 moon speech and Super Bowl VIII in 1974, while Rice’s current Gateway Project marks another major chapter in the stadium’s evolution.',
    sourceReview: { reviewedAt, authoritativeSources: sources.rice },
  },
  'constellation-field': {
    visitorFacts: {
      address: '1 Stadium Drive, Sugar Land, TX 77498',
      opened: 'April 26, 2012',
      homeTeams: ['Sugar Land Space Cowboys'],
      leagueOrConference: 'Triple-A Pacific Coast League — Houston Astros affiliate',
      accessibility: 'Constellation Field states that the ballpark is fully accessible, with accessible parking in Lots A and B and wheelchair/companion seating throughout the facility.',
      bagAndEntry: 'The current A-Z guide limits standard bags to 16 by 16 by 8 inches and subjects all bags to search, with medical and childcare exceptions. Event-specific rules can change and should be rechecked before travel.',
    },
    editorialStory: 'Constellation Field opened in 2012 as Sugar Land’s professional baseball home and became the home of the Houston Astros’ Triple-A affiliate in 2021. The ballpark combines more than 2,000 parking spaces with a Fort Bend County setting that is distinct from Houston’s downtown stadium district, so Sugar Land—not generic Houston sightseeing—is the right visitor frame.',
    sourceReview: { reviewedAt, authoritativeSources: sources.constellation },
  },
  'pga-frisco-fields-ranch': {
    visitorFacts: {
      address: '3255 PGA Parkway, Frisco, TX 75033',
      homeTeams: [],
      playingSurface: 'Two championship golf courses: Fields Ranch East and Fields Ranch West',
      leagueOrConference: 'PGA of America championship campus; Fields Ranch East hosts the 2027 PGA Championship',
      accessibility: 'Fields Ranch East is normally walking-only with a caddie required for each player; carts are available only with an approved medical exemption. West-course cart rules can vary with conditions.',
    },
    editorialStory: 'PGA Frisco is a 660-acre public-private golf campus built around Fields Ranch East and West, the PGA of America headquarters, PGA District and Omni resort. Fields Ranch East was designed by Gil Hanse and Fields Ranch West by Beau Welling; championship golf, public play and the surrounding golf campus—not a generic Frisco sports itinerary—define the destination.',
    sourceReview: { reviewedAt, authoritativeSources: sources.pgaFrisco },
  },
  'will-rogers-memorial-center': {
    visitorFacts: {
      address: '3401 W Lancaster Ave., Fort Worth, TX 76107',
      capacity: 'Will Rogers Coliseum: 5,652 permanent seats',
      opened: '1936',
      homeTeams: [],
      leagueOrConference: 'Equestrian, livestock and Western-sports event campus; Fort Worth Stock Show & Rodeo partner venue',
      accessibility: 'The City of Fort Worth lists disabled amenities and access and provides accommodation-request resources. Individual shows control their own operating schedules and may publish additional access instructions.',
    },
    editorialStory: 'Will Rogers Memorial Center was built in 1936 and has grown into a 120-acre City of Fort Worth sports, livestock and exhibition campus. Its historic 5,652-seat coliseum, multiple performance arenas, extensive livestock capacity and Cultural District location make building-level event information essential; it should not be written as if every event enters one generic arena door.',
    sourceReview: { reviewedAt, authoritativeSources: sources.willRogers },
  },
  'united-supermarkets-arena': {
    visitorFacts: {
      address: '1701 Indiana Ave., Lubbock, TX 79409',
      capacity: '15,000',
      opened: 'November 19, 1999',
      homeTeams: ['Texas Tech Red Raiders men’s basketball', 'Texas Tech Lady Raiders basketball', 'Texas Tech Red Raiders volleyball'],
      leagueOrConference: 'NCAA Division I — Big 12 Conference',
      accessibility: 'Texas Tech operates the arena as a campus multipurpose facility and publishes current guest-service and event information. Event-specific accessibility, parking and entry instructions should control each visit.',
    },
    editorialStory: 'United Supermarkets Arena opened in 1999 as the 15,000-seat United Spirit Arena and took its current name in 2014. It is the Texas Tech home for men’s basketball, women’s basketball and volleyball while also functioning as a major Lubbock concert and commencement venue, making its campus identity more useful than generic West Texas event copy.',
    sourceReview: { reviewedAt, authoritativeSources: sources.united },
  },
  'sun-bowl-stadium': {
    visitorFacts: {
      capacity: '45,971',
      opened: 'September 21, 1963',
      homeTeams: ['UTEP Miners football'],
      playingSurface: 'Classic HD CoolPlay',
      leagueOrConference: 'NCAA Division I FBS; annual Sun Bowl game',
    },
    editorialStory: 'Sun Bowl Stadium opened in 1963 with 30,000 seats and later expanded to a current official capacity of 45,971. Built into the Franklin Mountains beside the UTEP campus, it remains home to Miner football and the annual Sun Bowl, giving the stadium a topographic and bowl-game identity that generic El Paso travel language cannot replace.',
    sourceReview: { reviewedAt, authoritativeSources: sources.sunBowl },
  },
  'don-haskins-center': {
    visitorFacts: {
      capacity: '12,000',
      opened: 'First game February 3, 1977',
      homeTeams: ['UTEP Miners men’s basketball', 'UTEP Miners women’s basketball'],
      leagueOrConference: 'NCAA Division I basketball',
    },
    editorialStory: 'The Don Haskins Center opened as UTEP’s Special Events Center in 1977 and has a 12,000-seat basketball capacity. Its name links the arena to Hall of Fame coach Don Haskins and the legacy of Texas Western’s 1966 national championship, making that basketball history more relevant than generic El Paso arena-weekend copy.',
    sourceReview: { reviewedAt, authoritativeSources: sources.donHaskins },
  },
  'southwest-university-park': {
    visitorFacts: {
      address: '1 Ballpark Plaza, El Paso, TX 79901',
      capacity: 'About 7,200 fixed seats; approximately 9,500 to 10,000 total-event room',
      opened: 'April 28, 2014',
      homeTeams: ['El Paso Chihuahuas'],
      leagueOrConference: 'Triple-A Pacific Coast League — San Diego Padres affiliate',
      accessibility: 'The Chihuahuas publish accessible entrances on Durango and Santa Fe streets, wheelchair/companion seating across levels, accessible parking options and wheelchair-assistance procedures.',
      bagAndEntry: 'Southwest University Park uses a clear-bag/no-bag policy, limits non-clear clutches and prohibits re-entry after exit. Current event guidance should be checked because non-baseball events can add restrictions.',
    },
    editorialStory: 'Southwest University Park opened in 2014 on a compact downtown El Paso site and deliberately draws from Union Depot, rail and local baseball history in its architecture. The Triple-A Chihuahuas’ home pairs mountain and skyline views with a walkable downtown setting, a stronger venue story than generic West Texas sports-destination language.',
    sourceReview: { reviewedAt, authoritativeSources: sources.southwestUniversityPark },
  },
  'hodgetown': {
    visitorFacts: {
      address: '715 S Buchanan St., Amarillo, TX 79101',
      opened: 'April 8, 2019',
      homeTeams: ['Amarillo Sod Poodles'],
      leagueOrConference: 'Double-A Texas League',
      accessibility: 'HODGETOWN’s A-Z guide publishes current guest-service and entrance information; event-specific accessibility and parking instructions should control rather than older opening-season parking articles.',
      bagAndEntry: 'HODGETOWN currently uses a clear-bag policy and identifies primary entrances at the Home Plate Rotunda and left-field corner. Season-ticket entry can open earlier than general gates, so the event guide should control timing.',
    },
    editorialStory: 'HODGETOWN opened in downtown Amarillo in 2019 after affiliated professional baseball had been absent from the city for 37 years. The approximately 9.6-acre, $45.5 million ballpark was named in recognition of Jerry Hodge and conceived as a Panhandle community gathering place, giving it a specific civic story beyond generic minor-league baseball copy.',
    sourceReview: { reviewedAt, authoritativeSources: sources.hodgetown },
  },
};

export const SPORTS_VENUE_CONTENT_REMEDIATION_WAVE6: Record<string, SportsVenueEnrichment> = {
  'reliant-stadium': {
    city: 'Houston',
    capacity: '72,000–80,000 depending on configuration',
    opened: '2002',
    primaryEvents: ['Houston Texans home games', 'RODEOHOUSTON', 'International soccer, concerts and major stadium events'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE6['reliant-stadium'].editorialStory,
    parking: 'Reliant Park uses event-specific lots and entrance gates across a large campus. Stadium events currently route through Gate 9 at Kirby and Westridge; Texans football and rodeo dates publish their own lot and traffic plans, which should control the visit.',
    arrival: 'The stadium is at 8825 Kirby Drive within Reliant Park. Major events can use different parking passes, security rules and campus traffic patterns, so choose the current event route before entering the Kirby/Main Street area.',
    stayAndEat: 'The stadium’s immediate context is Reliant Park and the nearby Texas Medical Center corridor. Downtown and other Houston districts are separate trip choices rather than stadium-adjacent defaults.',
    nearby: 'Reliant Center and Reliant Arena share the same event campus. The Texas Medical Center is nearby; downtown stadiums and Museum District attractions are separate destinations.',
    planningLinks: [...sources.reliant],
    imageBrief: 'Reliant Stadium in Houston showing the retractable-roof stadium and surrounding Reliant Park event campus without added text or logos.',
    verifiedAt: reviewedAt,
  },
  'rice-stadium': {
    city: 'Houston',
    capacity: '47,000',
    opened: '1950',
    primaryEvents: ['Rice Owls football', 'University ceremonies', 'Major campus and special events'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE6['rice-stadium'].editorialStory,
    parking: 'Rice Athletics publishes stadium parking and campus directions rather than one permanent event lot. Use the current football or event plan, particularly as the Gateway Project changes the stadium environment.',
    arrival: 'Rice Stadium is an on-campus venue near the Texas Medical Center. Allow time for campus circulation and walking from the assigned lot; current construction or event instructions should override an older game-day routine.',
    stayAndEat: 'The useful visitor geography is Rice University, the Texas Medical Center and nearby central-Houston neighborhoods. Downtown sports districts should not be described as if they are part of the stadium campus.',
    nearby: 'Reckling Park, Tudor Fieldhouse and other Rice facilities are direct campus relationships. Hermann Park and the Museum District are nearby city destinations but separate from the stadium itself.',
    planningLinks: [...sources.rice],
    imageBrief: 'Historic Rice Stadium in Houston showing its broad concrete bowl and Rice University campus context without added text or logos.',
    verifiedAt: reviewedAt,
  },
  'constellation-field': {
    city: 'Sugar Land',
    opened: '2012',
    primaryEvents: ['Sugar Land Space Cowboys Triple-A baseball', 'High-school and college baseball', 'Holiday lights, festivals and community events'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE6['constellation-field'].editorialStory,
    parking: 'Constellation Field has more than 2,000 spaces across Lots A and B. Prices are cheaper when purchased before Space Cowboys game day and can change, so use the current parking page rather than an evergreen dollar amount; tailgating is not permitted under the club’s agreement with Sugar Land.',
    arrival: 'The ballpark is at 1 Stadium Drive with approaches from US 59, Highway 6, US 90 and Highway 99. Select Lot A or B and the appropriate highway approach before reaching the ballpark area.',
    stayAndEat: 'Sugar Land and Fort Bend County are the correct visitor frame. Houston can be part of a broader regional trip, but this is not a downtown-Houston ballpark.',
    nearby: 'The immediate Sugar Land/Imperial area is more defensible than generic Houston attractions. Other Fort Bend destinations should appear only when there is a clear itinerary relationship.',
    planningLinks: [...sources.constellation],
    imageBrief: 'Constellation Field in Sugar Land during a baseball evening with the seating bowl and Fort Bend County setting visible, no added text or logos.',
    verifiedAt: reviewedAt,
  },
  'pga-frisco-fields-ranch': {
    city: 'Frisco',
    primaryEvents: ['Fields Ranch East and West public golf', 'PGA of America championships', 'Short-course, putting and instruction experiences'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE6['pga-frisco-fields-ranch'].editorialStory,
    parking: 'PGA Frisco combines daily golf, resort, PGA District and championship-event uses. Parking and access differ by activity, so public tee-time instructions and championship spectator plans should not be collapsed into one generic parking rule.',
    arrival: 'For Fields Ranch East, plan for the walking-only format and required caddie unless a medical cart exemption has been approved. Course maintenance closures and same-day practice access should be checked before travel.',
    stayAndEat: 'The Omni resort and PGA District are genuinely integrated into the 660-acre campus, so on-site lodging and dining are relevant. Other Frisco sports venues are separate destinations rather than part of Fields Ranch.',
    nearby: 'Fields Ranch East and West, The Swing, The Dance Floor, PGA District and the Coaching Center are the natural same-campus connections.',
    planningLinks: [...sources.pgaFrisco],
    imageBrief: 'Fields Ranch at PGA Frisco with a championship golf course, native North Texas landscape and PGA campus context visible, no added text or logos.',
    verifiedAt: reviewedAt,
  },
  'will-rogers-memorial-center': {
    city: 'Fort Worth',
    capacity: 'Will Rogers Coliseum: 5,652 permanent seats',
    opened: '1936',
    primaryEvents: ['Equestrian championships', 'Livestock shows', 'Rodeo and Western-sports competitions'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE6['will-rogers-memorial-center'].editorialStory,
    parking: 'Will Rogers Memorial Center is a 120-acre multi-building campus. Parking and loading depend on the specific coliseum, arena, barn or exhibit hall in use, so the event grounds map should control rather than a single venue-wide arrival script.',
    arrival: 'Confirm the exact building before entering the Cultural District campus. Large equestrian and livestock shows can occupy multiple facilities simultaneously and individual shows set their own daily start and finish times.',
    stayAndEat: 'The Cultural District setting is genuinely useful: museums, restaurants, hotels and Dickies Arena are nearby. That immediate geography is stronger than generic Fort Worth weekend copy.',
    nearby: 'Dickies Arena is directly adjacent, and Cultural District museums are close. Downtown Fort Worth and the Stockyards are separate city destinations.',
    planningLinks: [...sources.willRogers],
    imageBrief: 'Will Rogers Memorial Center in Fort Worth showing the historic coliseum and broader equestrian/livestock campus in the Cultural District, no added text or logos.',
    verifiedAt: reviewedAt,
  },
  'united-supermarkets-arena': {
    city: 'Lubbock',
    capacity: '15,000',
    opened: '1999',
    primaryEvents: ['Texas Tech men’s basketball', 'Texas Tech women’s basketball', 'Texas Tech volleyball, concerts and commencement'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE6['united-supermarkets-arena'].editorialStory,
    parking: 'Arena parking is part of the Texas Tech campus system and differs by athletics, commencement and touring event. Use the current event page or Texas Tech parking instructions instead of assuming ordinary campus lots are available.',
    arrival: 'The arena is at 1701 Indiana Avenue on the Texas Tech campus. High-demand games and concerts can concentrate traffic on campus approaches, so event-specific entry and parking guidance should control.',
    stayAndEat: 'The immediate context is Texas Tech and central Lubbock. Other city attractions can support a longer stay but should not be presented as arena-adjacent without a real connection.',
    nearby: 'Galaxy Stadium and other Texas Tech athletics facilities are direct campus relationships. Downtown Lubbock is a separate stop.',
    planningLinks: [...sources.united],
    imageBrief: 'United Supermarkets Arena on the Texas Tech campus in Lubbock with the 15,000-seat arena and campus context visible, no added text or logos.',
    verifiedAt: reviewedAt,
  },
  'sun-bowl-stadium': {
    city: 'El Paso',
    capacity: '45,971',
    opened: '1963',
    primaryEvents: ['UTEP Miners football', 'Annual Sun Bowl game', 'Major stadium events'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE6['sun-bowl-stadium'].editorialStory,
    parking: 'Sun Bowl parking is distributed across the UTEP campus and surrounding mountain terrain. Follow the current football or bowl-game map because assigned lots, road controls and event operations vary.',
    arrival: 'The mountain setting creates meaningful elevation and walking considerations. Leave time for campus traffic, the walk from parking and security rather than treating the venue like a flat suburban drive-up stadium.',
    stayAndEat: 'UTEP and west-central El Paso are the correct immediate frame. Downtown lodging and restaurants can support a game trip, but they are separate from the stadium campus.',
    nearby: 'Don Haskins Center and the UTEP campus are immediate relationships; downtown El Paso and Franklin Mountains destinations require their own trip block.',
    planningLinks: [...sources.sunBowl],
    imageBrief: 'Sun Bowl Stadium in El Paso showing the football bowl embedded in Franklin Mountain terrain beside the UTEP campus, no added text or logos.',
    verifiedAt: reviewedAt,
  },
  'don-haskins-center': {
    city: 'El Paso',
    capacity: '12,000',
    opened: '1977',
    primaryEvents: ['UTEP men’s basketball', 'UTEP women’s basketball', 'Concerts and major indoor events'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE6['don-haskins-center'].editorialStory,
    parking: 'The arena is embedded in the UTEP campus parking system, so current basketball, concert or university-event guidance should control. Do not preserve ordinary weekday campus parking assumptions as event rules.',
    arrival: 'For rivalry games and major events, allow time for university traffic, walking and security. Event-specific door and entry rules should be checked rather than published as a permanent universal time.',
    stayAndEat: 'The arena’s useful geography is UTEP and west-central El Paso. Downtown hotels and restaurants can be practical for a longer stay but are separate itinerary choices.',
    nearby: 'Sun Bowl Stadium and the UTEP campus are direct relationships. Broader El Paso attractions should be linked only when they fit the actual trip.',
    planningLinks: [...sources.donHaskins],
    imageBrief: 'Don Haskins Center on the UTEP campus in El Paso during a basketball event, with campus and mountain context visible, no added text or logos.',
    verifiedAt: reviewedAt,
  },
  'southwest-university-park': {
    city: 'El Paso',
    capacity: 'About 7,200 fixed seats; room for roughly 9,500–10,000',
    opened: '2014',
    primaryEvents: ['El Paso Chihuahuas Triple-A baseball', 'Soccer and special sporting events', 'Downtown community and entertainment events'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE6['southwest-university-park'].editorialStory,
    parking: 'The Chihuahuas publish downtown garage and lot options rather than one large stadium lot. ADA parking is available at several downtown facilities, with prices and availability controlled by the individual parking operator.',
    arrival: 'The ballpark is at 1 Ballpark Plaza inside the downtown street grid. Choose the garage, transit or drop-off point before entering central El Paso; current ballpark rules prohibit re-entry after exit.',
    stayAndEat: 'Downtown El Paso hotels and restaurants are genuinely connected to the ballpark’s compact urban setting, making a car-light stay plausible without claiming every downtown attraction is next door.',
    nearby: 'Union Depot, convention-district and central-downtown destinations are geographically defensible connections. UTEP’s sports venues are a separate west-side cluster.',
    planningLinks: [...sources.southwestUniversityPark],
    imageBrief: 'Southwest University Park in downtown El Paso with the ballpark, city skyline and Franklin Mountains visible, no added text or logos.',
    verifiedAt: reviewedAt,
  },
  'hodgetown': {
    city: 'Amarillo',
    opened: '2019',
    primaryEvents: ['Amarillo Sod Poodles Double-A baseball', 'High-school and college baseball', 'Concerts and downtown community events'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE6['hodgetown'].editorialStory,
    parking: 'HODGETOWN is a downtown ballpark with team-controlled, city-owned and private parking options. Because older opening-season parking prices are stale, use the current event or downtown parking guidance rather than publishing an evergreen dollar figure.',
    arrival: 'The ballpark is at 715 S Buchanan Street across from Amarillo City Hall. The A-Z guide identifies Home Plate Rotunda and left-field entrances and uses a clear-bag policy; current event timing should control gate opening.',
    stayAndEat: 'Downtown Amarillo is the correct immediate visitor context. The stadium’s city-center location supports nearby dining and lodging without turning the page into a generic Panhandle road-trip guide.',
    nearby: 'Downtown Amarillo, City Hall and convention-area destinations are the strongest local connections. Route 66 and other Panhandle attractions are separate trip choices.',
    planningLinks: [...sources.hodgetown],
    imageBrief: 'HODGETOWN in downtown Amarillo during a baseball evening with the ballpark and city-center setting visible, no added text or logos.',
    verifiedAt: reviewedAt,
  },
};

export function getSportsVenueContentRemediationWave6(slug: string) {
  return SPORTS_VENUE_CONTENT_REMEDIATION_WAVE6[slug];
}

export function getSportsVenueQualityProfileWave6(slug: string) {
  return SPORTS_VENUE_QUALITY_PROFILES_WAVE6[slug];
}
