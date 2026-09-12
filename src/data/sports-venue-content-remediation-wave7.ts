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

export type SportsVenueQualityProfileWave7 = {
  visitorFacts: SportsVenueVisitorFacts;
  editorialStory: string;
  sourceReview: SportsVenueSourceReview;
};

const sources = {
  cowtown: [
    { label: 'Cowtown Coliseum venue information', url: 'https://www.cowtowncoliseum.com/venue-info/' },
    { label: 'Cowtown Coliseum FAQ', url: 'https://www.cowtowncoliseum.com/venue-info/faq/' },
    { label: 'Cowtown Coliseum parking and transit', url: 'https://www.cowtowncoliseum.com/venue-info/parking/' },
  ],
  ufcuStadium: [
    { label: 'Texas State UFCU Stadium facility page', url: 'https://txst.com/facilities/bobcat-stadium/1' },
    { label: 'Texas State 2026 football game-day update', url: 'https://txst.com/news/2026/9/7/football-a-letter-from-director-of-athletics-don-coryell.aspx' },
    { label: 'Texas State football visiting-team guide', url: 'https://txst.com/sports/2025/8/9/football-visiting-team-guide.aspx' },
  ],
  freeman: [
    { label: 'Freeman Coliseum about', url: 'https://freemancoliseum.com/about-us/' },
    { label: 'Freeman Coliseum bag policy', url: 'https://freemancoliseum.com/freeman-coliseum-bag-policy/' },
    { label: 'Freeman Coliseum accessibility guide', url: 'https://www.freemancoliseum.com/pdf/ADA_Freeman_Coliseum.pdf' },
  ],
  motorplex: [
    { label: 'Texas Motorplex history', url: 'https://www.texasmotorplex.com/history' },
    { label: 'Texas Motorplex plan a visit', url: 'https://www.texasmotorplex.com/plan-a-visit' },
    { label: 'Texas Motorplex rules and policies', url: 'https://www.texasmotorplex.com/rules-policies' },
  ],
  colonial: [
    { label: 'Colonial Country Club history', url: 'https://www.colonialfw.com/championship-golf/founded-on-passion' },
    { label: 'Charles Schwab Challenge at Colonial', url: 'https://www.colonialfw.com/charles-schwab-challenge' },
    { label: 'Colonial Country Club official site', url: 'https://www.colonialfw.com/' },
  ],
  tpcSanAntonio: [
    { label: 'TPC San Antonio official site', url: 'https://tpc.com/sanantonio/' },
    { label: 'TPC San Antonio about', url: 'https://tpc.com/sanantonio/about/' },
    { label: 'TPC San Antonio Oaks Course', url: 'https://tpc.com/sanantonio/oaks-course/' },
  ],
  eagleStadium: [
    { label: 'Allen ISD Eagle Stadium', url: 'https://www.allenisd.org/page/eagle-stadium' },
    { label: 'Allen ISD 2026 Eagle Stadium guidelines', url: 'https://www.allenisd.org/article/3092730' },
    { label: 'Allen ISD athletics facilities', url: 'https://www.allenisd.org/page/athletics-facilities' },
  ],
  legacyStadium: [
    { label: 'Katy ISD Legacy Stadium', url: 'https://www.katyisd.org/athletics/facilities/legacy-stadium' },
    { label: 'Katy ISD clear-bag regulation', url: 'https://www.katyisd.org/athletics/facilities/clear-bag-regulation' },
    { label: 'Katy ISD stadium guidelines', url: 'https://www.katyisd.org/cms/lib/TX50010808/Centricity/domain/3801/documents/Stadium_Guidelines.pdf' },
  ],
  dischFalk: [
    { label: 'Texas Athletics UFCU Disch-Falk Field', url: 'https://texaslonghorns.com/facilities/ufcu-disch-falk-field/11' },
    { label: 'Texas baseball 2026 fan guide', url: 'https://texaslonghorns.com/sports/2026/2/11/baseball-fan-guide' },
    { label: 'Texas baseball 2026 parking information', url: 'https://texaslonghorns.com/sports/2026/1/27/parking-information' },
  ],
  olsen: [
    { label: 'Texas A&M Blue Bell Park facility page', url: 'https://12thman.com/facilities/blue-bell-park' },
    { label: 'Texas A&M 2026 baseball preseason information', url: 'https://app.12thman.com/2026AggieBaseballPreseasonInfo' },
    { label: 'Texas A&M 2026 baseball ticket and parking information', url: 'https://app.12thman.com/2026BaseballTicketInformation' },
  ],
} as const;

export const SPORTS_VENUE_QUALITY_PROFILES_WAVE7: Record<string, SportsVenueQualityProfileWave7> = {
  'cowtown-coliseum': {
    visitorFacts: {
      address: '121 E Exchange Ave., Fort Worth, TX 76164',
      opened: '1908',
      homeTeams: [],
      leagueOrConference: 'Year-round rodeo and Western sports in the Fort Worth Stockyards',
      bagAndEntry: 'The current venue FAQ prohibits bags larger than 14 by 14 by 6 inches and hard-sided bags, with event-participant exceptions. Recheck the current event page because individual productions can add restrictions.',
    },
    editorialStory: 'Cowtown Coliseum was completed in 1908 in the Fort Worth Stockyards and later became the site of what the venue identifies as the world’s first indoor rodeo in 1918. Its year-round rodeo schedule and historic Stockyards setting make the arena itself part of the Western-sports destination rather than a generic Fort Worth event hall.',
    sourceReview: { reviewedAt, authoritativeSources: sources.cowtown },
  },
  'ufcu-stadium': {
    visitorFacts: {
      address: '1100 Aquarena Springs, San Marcos, TX 78666',
      capacity: '28,388',
      opened: '1981',
      homeTeams: ['Texas State Bobcats football'],
      playingSurface: 'FieldTurf',
      leagueOrConference: 'NCAA Division I FBS — Sun Belt Conference',
      accessibility: 'Texas State publishes current game-day, parking and shuttle information. Accessible routes and parking should be checked against the current event plan because campus operations can change by game.',
      bagAndEntry: 'Current Texas State football guidance uses a clear-bag policy, security screening and no re-entry. The visiting-team guide states gates normally open 90 minutes before kickoff, but the event guide should control.',
    },
    editorialStory: 'UFCU Stadium has been Texas State football’s San Marcos home since 1981. The current athletics facility page lists 28,388 seats and FieldTurf; the 2012 renovation removed the track and reinforced the stadium’s football focus, while campus shuttles and current entry rules make Texas State’s game-day plan more useful than generic San Marcos travel copy.',
    sourceReview: { reviewedAt, authoritativeSources: sources.ufcuStadium },
  },
  'freeman-coliseum': {
    visitorFacts: {
      address: '3201 E. Houston St., San Antonio, TX 78219',
      capacity: '7,630 fixed seats; event configurations can add riser and floor seating',
      opened: '1949',
      homeTeams: [],
      leagueOrConference: 'Rodeo, sports, concerts, trade shows and touring entertainment',
      accessibility: 'Freeman Coliseum publishes accessible-parking and mobility-drop-off information, including a Gate B drop-off. Accessible seating availability and event configuration should be confirmed for the specific event.',
      bagAndEntry: 'The venue’s current policy for most concerts permits clear totes up to 12 by 6 by 12 inches and small clutches up to 5.5 by 8.5 inches, with medical and childcare exceptions. Individual events can differ.',
    },
    editorialStory: 'Freeman Coliseum opened in 1949 as San Antonio’s Art Deco multipurpose arena and has remained part of the city’s rodeo, sports and entertainment landscape for more than 75 years. The fixed bowl has 7,630 seats with event setups extending total capacity, and its adjacency to Frost Bank Center makes the East Houston Street event campus—not River Walk filler—the useful visitor frame.',
    sourceReview: { reviewedAt, authoritativeSources: sources.freeman },
  },
  'texas-motorplex': {
    visitorFacts: {
      address: '7500 W Hwy 287, Ennis, TX 75119',
      opened: '1986',
      homeTeams: [],
      playingSurface: 'All-concrete quarter-mile drag strip',
      leagueOrConference: 'NHRA drag racing and major motorsports events',
    },
    editorialStory: 'Texas Motorplex opened in 1986 in Ennis as the world’s first single-pour, post-tension concrete drag strip. Its all-concrete quarter-mile surface and record-setting NHRA history make the track itself the destination, while current event maps, camping rules and entrance plans matter more than generic Dallas-area itinerary language.',
    sourceReview: { reviewedAt, authoritativeSources: sources.motorplex },
  },
  'colonial-country-club': {
    visitorFacts: {
      address: '3735 Country Club Circle, Fort Worth, TX 76109',
      opened: '1936',
      homeTeams: [],
      playingSurface: 'Championship golf course originally designed by John Bredemus and Perry Maxwell',
      leagueOrConference: 'PGA TOUR — Charles Schwab Challenge',
      accessibility: 'Colonial is a private club. Public visitor access is primarily tied to the annual PGA TOUR event and other specifically authorized events, so tournament spectator guidance should control.',
    },
    editorialStory: 'Colonial Country Club opened in 1936 from Marvin Leonard’s championship-golf vision and went on to host the 1941 U.S. Open, 1991 U.S. Women’s Open and 1975 PLAYERS Championship. Since 1946 it has hosted Fort Worth’s annual PGA TOUR stop, now the Charles Schwab Challenge, making tournament-week access—not ordinary private-club play—the public visitor story.',
    sourceReview: { reviewedAt, authoritativeSources: sources.colonial },
  },
  'tpc-san-antonio': {
    visitorFacts: {
      address: '23808 Resort Parkway, San Antonio, TX 78261',
      opened: 'January 2010',
      homeTeams: [],
      playingSurface: 'Two 18-hole championship courses: Oaks and Canyons',
      leagueOrConference: 'PGA TOUR — Valero Texas Open at the Oaks Course',
      accessibility: 'Ordinary course access is limited to members and guests and to registered guests of the JW Marriott San Antonio Hill Country Resort & Spa. Tournament spectator access follows the event’s current ticketing and mobility plan.',
    },
    editorialStory: 'TPC San Antonio opened in 2010 with two 18-hole championship courses: Greg Norman’s Oaks Course, with Sergio Garcia consulting, and Pete Dye’s Canyons Course. The Oaks hosts the Valero Texas Open, while ordinary play is limited to members and eligible JW Marriott resort guests, making resort access and tournament-week planning the essential visitor distinction.',
    sourceReview: { reviewedAt, authoritativeSources: sources.tpcSanAntonio },
  },
  'eagle-stadium-allen': {
    visitorFacts: {
      address: '155 Rivercrest Boulevard, Allen, TX 75002',
      homeTeams: ['Allen Eagles football'],
      leagueOrConference: 'Texas high-school football and UIL playoff events',
      accessibility: 'Allen ISD publishes current stadium and athletics-facility guidance. Event-day parking, accessible entry and seating information should be checked against the district’s current event instructions.',
      bagAndEntry: 'Allen ISD’s 2026 guidelines use metal detectors and a clear-bag policy: clear totes up to 12 by 12 by 6 inches, one-gallon clear storage bags, or small clutches up to 4.5 by 6.5 inches. Visitor-side entry and payment procedures are event-controlled.',
    },
    editorialStory: 'Eagle Stadium is Allen ISD’s Rivercrest Boulevard football centerpiece and one of North Texas’s best-known high-school game-day venues. Its travel value comes from Allen Eagles football and UIL playoff crowds, while current metal-detector and clear-bag rules make district event guidance more practical than a static capacity boast or generic Metroplex filler.',
    sourceReview: { reviewedAt, authoritativeSources: sources.eagleStadium },
  },
  'legacy-stadium-katy': {
    visitorFacts: {
      address: '1830 Katyland Drive, Katy, TX 77493',
      opened: '2017',
      homeTeams: ['Katy ISD football programs'],
      leagueOrConference: 'Texas high-school football, UIL playoff events and district graduations',
      accessibility: 'Katy ISD controls stadium access and event operations. Accessible parking, seating and event-specific entrance instructions should be confirmed through the current district event information.',
      bagAndEntry: 'Katy ISD applies its clear-bag regulation at Legacy Stadium, including clear plastic, vinyl or PVC bags, one-gallon clear resealable bags and small clutches around 4.5 by 6.5 inches, with medical exceptions. Current district rules should control.',
    },
    editorialStory: 'Legacy Stadium is Katy ISD’s 2017 district stadium and serves multiple Katy-area schools rather than one permanent home team. Its visitor story is district-scale Friday-night football, playoff and graduation traffic, with current clear-bag and event-specific parking and tailgate rules more useful than generic Houston-suburb copy.',
    sourceReview: { reviewedAt, authoritativeSources: sources.legacyStadium },
  },
  'ufcu-disch-falk-field': {
    visitorFacts: {
      address: '1300 E. MLK Blvd., Austin, TX 78702',
      capacity: '7,211',
      opened: 'February 17, 1975',
      homeTeams: ['Texas Longhorns baseball'],
      leagueOrConference: 'NCAA Division I — SEC',
      accessibility: 'Texas Athletics’ 2026 fan guide identifies accessible parking in East Campus Garage on a first-come, first-served basis and publishes current stadium-access information.',
      bagAndEntry: 'The current Texas baseball fan guide uses clear bags up to 12 by 6 by 12 inches, mobile tickets and cashless/contactless operations. Ticketed entry gates and event rules should be checked before travel.',
    },
    editorialStory: 'UFCU Disch-Falk Field opened in 1975 and remains Texas baseball’s campus home, with a current capacity of 7,211 after the major 2009 renovation. Its east-of-campus location beside I-35 makes current Lot 118 and East Campus Garage guidance more useful than generic downtown Austin parking advice.',
    sourceReview: { reviewedAt, authoritativeSources: sources.dischFalk },
  },
  'olsen-field-blue-bell-park': {
    visitorFacts: {
      opened: 'Original Olsen Field opened in 1978; Blue Bell Park redevelopment reopened in February 2012',
      homeTeams: ['Texas A&M Aggies baseball'],
      leagueOrConference: 'NCAA Division I — SEC',
      accessibility: 'Blue Bell Park includes accessible seating and guest-service provisions. Current parking and mobility guidance should be checked against Texas A&M’s season and event information.',
      bagAndEntry: 'Texas A&M athletics uses a clear-bag policy. Current 2026 baseball information states gates normally open 90 minutes before first pitch and uses digital parking and ticketing; individual event instructions should control.',
    },
    editorialStory: 'Olsen Field has hosted Texas A&M baseball since 1978, and the $24 million Blue Bell Park redevelopment reopened in 2012 with suites, club spaces, accessible seating, lawn seating and a closer-to-the-field bowl. Current digital parking and clear-bag instructions should control each visit rather than older season-specific lot or pricing assumptions.',
    sourceReview: { reviewedAt, authoritativeSources: sources.olsen },
  },
};

export const SPORTS_VENUE_CONTENT_REMEDIATION_WAVE7: Record<string, SportsVenueEnrichment> = {
  'cowtown-coliseum': {
    city: 'Fort Worth',
    opened: '1908',
    primaryEvents: ['Year-round rodeo', 'Western-sports competitions', 'Concerts and Stockyards special events'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE7['cowtown-coliseum'].editorialStory,
    parking: 'The arena is embedded in the Fort Worth Stockyards, where visitors use district parking rather than one dedicated suburban stadium lot. Current parking maps, rates and event restrictions should control rather than an evergreen price claim.',
    arrival: 'The venue is at 121 E Exchange Avenue in the Stockyards. Walking from Stockyards parking or using the Trinity Metro Orange Line can be practical; event-specific street closures and entry instructions should be checked before arrival.',
    stayAndEat: 'The Fort Worth Stockyards are genuinely part of the venue experience, with lodging, dining and Western attractions concentrated around Exchange Avenue. Downtown Fort Worth is a separate district rather than arena-adjacent.',
    nearby: 'Stockyards Station, Exchange Avenue and other Stockyards attractions are defensible same-district connections. Dickies Arena and the Cultural District are separate Fort Worth clusters.',
    planningLinks: [...sources.cowtown],
    imageBrief: 'Historic Cowtown Coliseum on Exchange Avenue in the Fort Worth Stockyards, showing its early-20th-century arena character without added text or logos.',
    verifiedAt: reviewedAt,
  },
  'ufcu-stadium': {
    city: 'San Marcos',
    capacity: '28,388',
    opened: '1981',
    primaryEvents: ['Texas State Bobcats football', 'College football rivalry games', 'Campus and special stadium events'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE7['ufcu-stadium'].editorialStory,
    parking: 'Texas State football uses campus parking assignments and shuttle service rather than one universal public lot. Follow the current game-day map and permit instructions, especially for high-demand games.',
    arrival: 'UFCU Stadium is at 1100 Aquarena Springs on the Texas State athletics campus. Build in time for shuttle or campus walking, security and the current clear-bag/no-reentry rules.',
    stayAndEat: 'San Marcos and the Texas State campus are the relevant visitor geography. Downtown and river attractions can support a longer trip but should not be described as if they sit inside the stadium complex.',
    nearby: 'Texas State athletics facilities and campus destinations are direct relationships; central San Marcos is a separate walk/drive depending on the itinerary.',
    planningLinks: [...sources.ufcuStadium],
    imageBrief: 'UFCU Stadium at Texas State in San Marcos showing the football-focused bowl and campus setting, no added text or logos.',
    verifiedAt: reviewedAt,
  },
  'freeman-coliseum': {
    city: 'San Antonio',
    capacity: '7,630 fixed seats; larger event configurations available',
    opened: '1949',
    primaryEvents: ['Rodeo and livestock events', 'Concerts and touring entertainment', 'Sports, trade shows and community events'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE7['freeman-coliseum'].editorialStory,
    parking: 'Freeman Coliseum shares a large East Houston Street event campus with surrounding facilities. Parking demand and entrance routing vary by event, especially when adjacent venues are active, so the current event map should control.',
    arrival: 'The arena is at 3201 E. Houston Street. Confirm the event entrance and parking area before reaching the campus; accessible mobility drop-off is identified at Gate B in current venue guidance.',
    stayAndEat: 'The immediate context is the Freeman Coliseum/Frost Bank Center event campus east of downtown. River Walk and central-downtown lodging are separate visitor districts rather than walking-adjacent arena amenities.',
    nearby: 'Frost Bank Center is directly adjacent; other San Antonio attractions should appear only when they fit the broader trip.',
    planningLinks: [...sources.freeman],
    imageBrief: 'Freeman Coliseum in San Antonio showing its historic Art Deco exterior and event-campus setting, no added text or logos.',
    verifiedAt: reviewedAt,
  },
  'texas-motorplex': {
    city: 'Ennis',
    opened: '1986',
    primaryEvents: ['NHRA national drag-racing events', 'Regional drag racing', 'Motorsports festivals and track events'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE7['texas-motorplex'].editorialStory,
    parking: 'Texas Motorplex event operations can include distinct spectator, participant, camping and credentialed areas. Use the current event map and rules instead of assuming one parking or camping plan applies to every race weekend.',
    arrival: 'The track is at 7500 W Hwy 287 in Ennis. Major NHRA weekends can create concentrated traffic and event-specific gate procedures, so plan the highway approach and entrance before reaching the property.',
    stayAndEat: 'Ennis and Ellis County are the correct immediate geography. Dallas can be part of a regional trip, but the Motorplex should not be framed as a downtown or inner-Metroplex venue.',
    nearby: 'Same-property race and camping areas are the strongest connections; other Ellis County stops should be linked only when they add real itinerary value.',
    planningLinks: [...sources.motorplex],
    imageBrief: 'Texas Motorplex in Ennis showing the long concrete drag strip, grandstands and open North Texas setting, no added text or logos.',
    verifiedAt: reviewedAt,
  },
  'colonial-country-club': {
    city: 'Fort Worth',
    opened: '1936',
    primaryEvents: ['Charles Schwab Challenge', 'PGA TOUR tournament week', 'Private club golf'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE7['colonial-country-club'].editorialStory,
    parking: 'Colonial is a private club, and public parking/transportation arrangements are primarily relevant during tournament week. Use the current Charles Schwab Challenge spectator plan because lots, shuttles and access points can change year to year.',
    arrival: 'For public visitors, the annual PGA TOUR event is the principal access context. Do not treat the private club as a daily public golf attraction; follow the current tournament ticket, shuttle and entry instructions.',
    stayAndEat: 'The course sits in central Fort Worth near the TCU area, but tournament transportation plans should determine arrival. Broader Fort Worth lodging and dining choices should not be presented as club-controlled amenities.',
    nearby: 'TCU and central Fort Worth are geographically relevant; Colonial remains a private club outside specifically authorized public events.',
    planningLinks: [...sources.colonial],
    imageBrief: 'Colonial Country Club in Fort Worth during tournament conditions, emphasizing the historic tree-lined championship course without added text or logos.',
    verifiedAt: reviewedAt,
  },
  'tpc-san-antonio': {
    city: 'San Antonio',
    opened: '2010',
    primaryEvents: ['Valero Texas Open', 'Resort golf on the Oaks and Canyons courses', 'PGA and golf events'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE7['tpc-san-antonio'].editorialStory,
    parking: 'Access differs sharply between ordinary resort golf and tournament week. Resort guests and members should follow course/resort instructions; Valero Texas Open spectators should use the current tournament transportation plan.',
    arrival: 'TPC San Antonio is at 23808 Resort Parkway in the JW Marriott San Antonio Hill Country Resort complex. Confirm whether the visit is resort play, member/guest play or tournament attendance before choosing the arrival plan.',
    stayAndEat: 'The JW Marriott resort is genuinely integrated with the golf destination. Downtown San Antonio and the River Walk are separate city districts and should not be described as course-adjacent.',
    nearby: 'The Oaks Course, Canyons Course, practice facility and JW Marriott resort form the immediate destination cluster.',
    planningLinks: [...sources.tpcSanAntonio],
    imageBrief: 'TPC San Antonio championship golf with Hill Country terrain and resort-course context visible, no added text or logos.',
    verifiedAt: reviewedAt,
  },
  'eagle-stadium-allen': {
    city: 'Allen',
    primaryEvents: ['Allen Eagles football', 'UIL football playoff games', 'Allen ISD stadium events'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE7['eagle-stadium-allen'].editorialStory,
    parking: 'Allen ISD controls event parking and visitor-side access. High-attendance games and playoff dates can change circulation, so current district event instructions should take priority over a generic stadium parking description.',
    arrival: 'Eagle Stadium is at 155 Rivercrest Boulevard. Current 2026 procedures include metal-detector screening, clear-bag limits and visitor-side entry, so allow time for security rather than treating arrival like an ordinary school-campus visit.',
    stayAndEat: 'Allen is the correct city context. Nearby lodging and dining can support playoff or tournament travel, but the page should not invent a stadium-adjacent entertainment district.',
    nearby: 'Allen ISD athletics facilities are direct district relationships. Other Collin County sports destinations should be linked only when the itinerary supports them.',
    planningLinks: [...sources.eagleStadium],
    imageBrief: 'Eagle Stadium in Allen, Texas during a high-school football event, showing the large district stadium and Friday-night atmosphere without added text or logos.',
    verifiedAt: reviewedAt,
  },
  'legacy-stadium-katy': {
    city: 'Katy',
    opened: '2017',
    primaryEvents: ['Katy ISD football', 'UIL playoff games', 'Katy ISD graduations and district events'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE7['legacy-stadium-katy'].editorialStory,
    parking: 'Legacy Stadium is a district facility used by multiple schools and event types. Parking, home/visitor designation and approved tailgate areas can change with the event, so use the current Katy ISD stadium instructions.',
    arrival: 'The stadium is at 1830 Katyland Drive. Large rivalry, playoff and graduation crowds can affect circulation around the district athletics complex; current event assignments and clear-bag rules should control.',
    stayAndEat: 'Katy is the right visitor frame. Houston is part of the broader region, but Legacy Stadium should not be described as a central-Houston venue or given generic metro-wide recommendations.',
    nearby: 'Katy ISD athletics facilities are direct relationships; other Katy-area attractions should be linked only when they fit the actual trip.',
    planningLinks: [...sources.legacyStadium],
    imageBrief: 'Legacy Stadium in Katy during a Texas high-school football event, showing the district stadium and suburban Katy setting without added text or logos.',
    verifiedAt: reviewedAt,
  },
  'ufcu-disch-falk-field': {
    city: 'Austin',
    capacity: '7,211',
    opened: '1975',
    primaryEvents: ['Texas Longhorns baseball', 'SEC baseball series', 'NCAA postseason baseball'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE7['ufcu-disch-falk-field'].editorialStory,
    parking: 'Texas baseball’s current parking plan uses designated event parking such as Lot 118 and accessible parking in East Campus Garage. Availability and payment rules can change by season, so the live parking page should control rather than an evergreen price.',
    arrival: 'The ballpark is at 1300 E. MLK Boulevard just east of the main UT campus and I-35. Mobile tickets, assigned entry gates and security make pre-arrival review of the current fan guide worthwhile.',
    stayAndEat: 'The useful geography is the University of Texas and east-central Austin. Downtown can be part of the trip, but parking and entry should be planned from the ballpark’s east-campus context rather than generic Austin guidance.',
    nearby: 'DKR–Texas Memorial Stadium and other UT athletics facilities are direct campus relationships; broader Austin attractions are separate itinerary choices.',
    planningLinks: [...sources.dischFalk],
    imageBrief: 'UFCU Disch-Falk Field in Austin during Texas baseball, showing the seating bowl and University of Texas east-campus context without added text or logos.',
    verifiedAt: reviewedAt,
  },
  'olsen-field-blue-bell-park': {
    city: 'College Station',
    opened: '1978; redeveloped as Blue Bell Park in 2012',
    primaryEvents: ['Texas A&M Aggies baseball', 'SEC baseball series', 'NCAA postseason baseball'],
    history: SPORTS_VENUE_QUALITY_PROFILES_WAVE7['olsen-field-blue-bell-park'].editorialStory,
    parking: 'Texas A&M baseball uses season-specific digital parking passes and game-day parking instructions. Lots and payment procedures can change, so current 12th Man information should control rather than older parking articles or dollar amounts.',
    arrival: 'Blue Bell Park is part of the Texas A&M athletics campus. Current 2026 guidance uses digital tickets/parking and normally opens gates 90 minutes before first pitch; allow time for campus traffic, walking and security.',
    stayAndEat: 'The Texas A&M campus and College Station are the correct visitor frame. Bryan and other Brazos Valley destinations can support a longer trip but are separate from the ballpark grounds.',
    nearby: 'Reed Arena, Kyle Field and other Texas A&M athletics facilities are direct campus relationships.',
    planningLinks: [...sources.olsen],
    imageBrief: 'Olsen Field at Blue Bell Park in College Station during Texas A&M baseball, showing the redeveloped bowl and campus setting without added text or logos.',
    verifiedAt: reviewedAt,
  },
};

export function getSportsVenueContentRemediationWave7(slug: string) {
  return SPORTS_VENUE_CONTENT_REMEDIATION_WAVE7[slug];
}

export function getSportsVenueQualityProfileWave7(slug: string) {
  return SPORTS_VENUE_QUALITY_PROFILES_WAVE7[slug];
}
