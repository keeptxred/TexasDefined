import type { SportsVenuePlanningLink } from './sports-venue-enrichment';

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

export type SportsVenueQualityCompletionProfile = {
  visitorFacts: SportsVenueVisitorFacts;
  editorialStory: string;
  sourceReview: {
    reviewedAt: string;
    authoritativeSources: readonly SportsVenuePlanningLink[];
  };
};

const reviewedAt = '2026-10-08';

const SPORTS_VENUE_QUALITY_COMPLETION: Record<string, SportsVenueQualityCompletionProfile> = {
  'att-stadium': {
    visitorFacts: {
      address: 'One AT&T Way, Arlington, TX 76011',
      homeTeams: ['Dallas Cowboys'],
      leagueOrConference: 'National Football League (NFL)',
      accessibility: 'AT&T Stadium publishes accessible parking and drop-off locations, power-assisted entry doors, accessible restrooms, concessions and seating areas throughout the venue. Guest Services can assist with event-specific accommodations.',
      bagAndEntry: 'AT&T Stadium uses the NFL clear-bag policy: clear plastic, vinyl or PVC bags up to 12 × 6 × 12 inches, one-gallon clear freezer bags and small clutches up to 4.5 × 6.5 inches are permitted. Medically necessary items may be admitted after inspection.',
    },
    editorialStory: 'AT&T Stadium has been the Dallas Cowboys’ Arlington home since 2009 and also hosts college football, major concerts, tours and international sporting events.',
    sourceReview: {
      reviewedAt,
      authoritativeSources: [
        { label: 'AT&T Stadium A–Z guide', url: 'https://attstadium.com/stadium-info/a-to-z-guide/' },
        { label: 'AT&T Stadium bag policy', url: 'https://attstadium.com/stadium-info/bags/' },
        { label: 'AT&T Stadium parking', url: 'https://attstadium.com/stadium-info/parking/' },
      ],
    },
  },
  'college-park-center': {
    visitorFacts: {
      address: '601 Spaniolo Drive, Arlington, TX',
      capacity: '7,000 for court-based athletics',
      opened: '2012',
      homeTeams: ['UT Arlington Mavericks basketball and volleyball'],
      accessibility: 'UT Arlington provides designated accessible seating and accommodation support at College Park Center and directs guests who need additional accommodations to the Box Office. Event-specific seating and drop-off arrangements should be confirmed before arrival.',
      bagAndEntry: 'College Park Center uses a clear-bag policy for UTA events. Current UTA guidance allows clear plastic, vinyl or PVC bags up to 12 × 6 × 12 inches, one-gallon clear freezer bags and small clutches up to 4.5 × 6.5 inches, with inspected exceptions for medical and childcare needs.',
    },
    editorialStory: 'College Park Center opened in 2012 as UT Arlington’s 7,000-seat basketball and volleyball home and also hosts concerts, tournaments and community events in downtown Arlington.',
    sourceReview: {
      reviewedAt,
      authoritativeSources: [
        { label: 'UT Arlington College Park Center facility guide', url: 'https://utamavs.com/sports/2019/10/24/college-park-center' },
        { label: 'UT Arlington clear-bag guidance for College Park Center', url: 'https://www.uta.edu/maverick-speakers/faqs' },
        { label: 'UT Arlington College Park Center accommodations', url: 'https://www.uta.edu/academics/schools-colleges/cappa/news-events/commencement/directions-and-accommodations' },
      ],
    },
  },
  'comerica-center': {
    visitorFacts: {
      address: '2601 Avenue of the Stars, Frisco, TX 75034',
      capacity: 'Varies by event; up to 6,700 for concerts',
      opened: '2003',
      homeTeams: ['Texas Legends'],
      accessibility: 'Comerica Center maintains a dedicated accessibility contact and directs guests to its current arena information for accommodation questions. Because configurations vary by event, confirm accessible seating and services with the venue before travel.',
      bagAndEntry: 'Comerica Center entry rules can vary by event. Current event pages publish the applicable bag limits and screening rules, so visitors should use the specific event page and the arena’s A–Z guide rather than assume one policy for every event.',
    },
    editorialStory: 'Comerica Center is a multipurpose Frisco arena used for Texas Legends basketball, volleyball, hockey, skating, concerts and touring events.',
    sourceReview: {
      reviewedAt,
      authoritativeSources: [
        { label: 'Comerica Center plan your visit', url: 'https://www.comericacenter.com/plan-your-visit' },
        { label: 'Comerica Center accessibility', url: 'https://www.comericacenter.com/accessibility' },
        { label: 'Comerica Center events', url: 'https://www.comericacenter.com/events' },
      ],
    },
  },
  'daikin-park': {
    visitorFacts: {
      address: '501 Crawford Street, Houston, TX 77002',
      capacity: '41,592',
      opened: '2000',
      homeTeams: ['Houston Astros'],
      leagueOrConference: 'Major League Baseball — American League',
      accessibility: 'Daikin Park provides accessible parking in Astros-operated Lots A, B and C, accessible entrances and seating throughout the ballpark, and courtesy wheelchair service. The Astros publish a dedicated disability access guide for current details.',
      bagAndEntry: 'Bags larger than 16 × 16 × 8 inches and backpacks are prohibited at Daikin Park, with limited diaper, drawstring and medical exceptions within the size limit. All bags are searched and guests pass security screening at entry.',
    },
    editorialStory: 'The Astros’ downtown retractable-roof ballpark opened in 2000, incorporates historic Union Station and took the Daikin Park name for the 2025 season.',
    sourceReview: {
      reviewedAt,
      authoritativeSources: [
        { label: 'Houston Astros ballpark guide', url: 'https://www.mlb.com/astros/ballpark' },
        { label: 'Daikin Park accessibility guide', url: 'https://www.mlb.com/astros/ballpark/disability-access-guide' },
        { label: 'Daikin Park policies and procedures', url: 'https://www.mlb.com/astros/ballpark/information/guide' },
      ],
    },
  },
  'dickies-arena': {
    visitorFacts: {
      address: '1911 Montgomery Street, Fort Worth, TX 76107',
      capacity: '14,000',
      opened: '2019',
      homeTeams: [],
      accessibility: 'Dickies Arena provides accessible seating on all levels, accessible parking throughout its lots for properly credentialed vehicles, limited-mobility drop-off, golf-cart shuttles and complimentary wheelchair escorts.',
      bagAndEntry: 'Approved bags may not exceed 12 × 6 × 12 inches. Clear totes, small purses, small fashion backpacks, small clutches, plastic storage bags and drawstring bags are allowed within that size; oversized bags, luggage, messenger/laptop bags, duffels and coolers are prohibited.',
    },
    editorialStory: 'Dickies Arena opened in 2019 beside the Will Rogers Memorial Center as a 14,000-seat multipurpose arena and the arena home for Fort Worth Stock Show & Rodeo performances.',
    sourceReview: {
      reviewedAt,
      authoritativeSources: [
        { label: 'Dickies Arena A–Z guest guide', url: 'https://dickiesarena.com/event-policies-and-faqs/' },
        { label: 'Dickies Arena accessibility information', url: 'https://dickiesarena.com/ada-accessibility-information/' },
      ],
    },
  },
  'frost-bank-center': {
    visitorFacts: {
      address: '1 Frost Bank Center Drive, San Antonio, TX 78219',
      opened: '2002',
      homeTeams: ['San Antonio Spurs'],
      leagueOrConference: 'National Basketball Association (NBA)',
      accessibility: 'Frost Bank Center provides accessible seating on all levels, ADA-compliant main entrances and elevators, designated accessible parking in multiple lots, sensory resources and complimentary wheelchair assistance.',
      bagAndEntry: 'Bags must be 12 × 12 × 6 inches or smaller and are screened at entry. Backpacks, oversized totes, luggage, camera/laptop bags and other oversized bags are prohibited; diaper and medical bags are allowed after screening. Event-specific policies may vary.',
    },
    editorialStory: 'Frost Bank Center opened in 2002 and is home to the San Antonio Spurs while also hosting the San Antonio Stock Show & Rodeo, concerts and touring events.',
    sourceReview: {
      reviewedAt,
      authoritativeSources: [
        { label: 'Frost Bank Center bag policy', url: 'https://www.frostbankcenter.com/arena/bag-policy' },
        { label: 'Frost Bank Center accessibility guide', url: 'https://www.frostbankcenter.com/arena/accessibility-guide' },
        { label: 'Frost Bank Center arena policies', url: 'https://www.frostbankcenter.com/arena/arena-policies' },
      ],
    },
  },
  'kyle-field': {
    visitorFacts: {
      capacity: '102,733',
      opened: '1905; redeveloped stadium debuted in 2015',
      homeTeams: ['Texas A&M Aggies football'],
      leagueOrConference: 'NCAA Division I FBS — Southeastern Conference (SEC)',
      accessibility: 'Texas A&M publishes venue-specific accessible parking, shuttle service, elevators, ramps and accessible seating information for Kyle Field. Accessible parking and routing can change by game, so use the current athletics accessibility guide.',
      bagAndEntry: 'Kyle Field follows the SEC 12-1-1 clear-bag policy and searches bags at entry. Bags and backpacks that do not meet the policy are prohibited, and re-entry is not allowed under SEC rules.',
    },
    editorialStory: 'Texas A&M traces Kyle Field to 1905; a two-phase $485 million redevelopment produced the current 102,733-seat stadium configuration for the 2015 season.',
    sourceReview: {
      reviewedAt,
      authoritativeSources: [
        { label: 'Kyle Field A–Z guide', url: 'https://12thman.com/facilities/a-to-z/kyle-field' },
        { label: 'Kyle Field policies', url: 'https://12thman.com/facilities/kyle-field/policies' },
        { label: 'Texas A&M athletics accessibility', url: 'https://12thman.com/accessibility' },
      ],
    },
  },
  'mclane-stadium': {
    visitorFacts: {
      capacity: '45,140',
      opened: '2014',
      homeTeams: ['Baylor Bears football'],
      leagueOrConference: 'NCAA Division I FBS — Big 12 Conference',
      accessibility: 'McLane Stadium provides code-compliant east-side ramps and wheelchair/companion seating with enhanced sight lines on every level. Guests should confirm current event-day accessible parking and seating details before travel.',
      bagAndEntry: 'McLane Stadium uses a clear-bag policy. Clear plastic, vinyl or PVC bags up to 12 × 6 × 12 inches, one-gallon clear freezer bags and small clutches are permitted, with medically necessary exceptions after inspection. Baylor does not allow re-entry except for medical emergencies.',
    },
    editorialStory: 'McLane Stadium opened in 2014 on the Brazos River as Baylor football’s 45,140-seat home and a distinctive riverfront game-day venue.',
    sourceReview: {
      reviewedAt,
      authoritativeSources: [
        { label: 'Baylor McLane Stadium facility and policy guide', url: 'https://baylorbears.com/facilities/mclane-stadium/30' },
        { label: 'Baylor football parking', url: 'https://bearfoundation.baylorbears.com/football-parking.html' },
      ],
    },
  },
  'moody-coliseum-smu': {
    visitorFacts: {
      address: '3009 Binkley Ave., Dallas, TX',
      capacity: '5,300',
      opened: '1956',
      homeTeams: ['SMU Mustangs basketball and volleyball'],
      leagueOrConference: 'NCAA Division I — Atlantic Coast Conference (ACC)',
      accessibility: 'SMU publishes ADA seating in designated upper rows of the lower bowl and accessible parking in controlled lots for vehicles displaying valid credentials. Relocation to wheelchair/companion seating is subject to availability.',
      bagAndEntry: 'Moody Coliseum permits clear bags for SMU basketball and volleyball events; other bags are prohibited, with inspected medical and nursing-bag exceptions. Guests are subject to security screening and intercollegiate events use a no-re-entry policy.',
    },
    editorialStory: 'Moody Coliseum is SMU’s historic on-campus basketball and volleyball arena, pairing a 5,300-seat configuration with the university’s current ACC athletics era.',
    sourceReview: {
      reviewedAt,
      authoritativeSources: [
        { label: 'SMU Moody Coliseum facility page', url: 'https://smumustangs.com/facilities/moody-coliseum/5' },
        { label: 'SMU Moody Coliseum policies', url: 'https://smumustangs.com/sports/2018/11/8/stadium-policies-moody-coliseum' },
      ],
    },
  },
  'shell-energy-stadium': {
    visitorFacts: {
      address: '2200 Texas Ave., Houston, TX 77003',
      homeTeams: ['Houston Dynamo FC', 'Houston Dash'],
      leagueOrConference: 'Major League Soccer (MLS) and National Women’s Soccer League (NWSL)',
      accessibility: 'Shell Energy Stadium provides accessible seating throughout the venue, assistive listening devices, complimentary wheelchair escorts, a sensory room and sensory bags, plus RightHear wayfinding for blind or low-vision guests.',
      bagAndEntry: 'Only clear bags up to 12 × 12 × 6 inches and small clutches up to 4.5 × 6.5 inches are generally permitted. Medical and diaper bags are inspected and tagged; backpacks, large purses, coolers, luggage and other oversized bags are prohibited. Guests and bags are screened at entry.',
    },
    editorialStory: 'Shell Energy Stadium is Houston’s soccer-focused home for Dynamo FC and the Dash in EaDo, with METRORail access and downtown Houston within the same event district.',
    sourceReview: {
      reviewedAt,
      authoritativeSources: [
        { label: 'Shell Energy Stadium A–Z guide', url: 'https://www.houstondynamofc.com/shell-energy-stadium/azguide' },
        { label: 'Shell Energy Stadium bag and security policy', url: 'https://www.houstondynamofc.com/shell-energy-stadium/bag-and-security-policies' },
        { label: 'Shell Energy Stadium ADA and inclusion guide', url: 'https://www.houstondynamofc.com/shell-energy-stadium/ada-and-inclusion' },
      ],
    },
  },
  'toyota-center-houston': {
    visitorFacts: {
      address: '1510 Polk Street, Houston, TX 77002',
      homeTeams: ['Houston Rockets'],
      leagueOrConference: 'National Basketball Association (NBA)',
      accessibility: 'Toyota Center provides accessible drop-off, seating throughout the arena, ADA-compliant restrooms, assistive listening devices, wheelchair escorts and sensory resources. Guests needing specific accommodations should use the current accessibility guide.',
      bagAndEntry: 'Permitted bags are limited to 10 × 6 × 2 inches, with diaper and medical bags allowed; all bags are searched. Toyota Center has a no-re-entry policy and publishes event-specific bag entrance instructions.',
    },
    editorialStory: 'Toyota Center is the Houston Rockets’ downtown arena and a major concert and touring-sports venue within walking distance of the convention and Discovery Green district.',
    sourceReview: {
      reviewedAt,
      authoritativeSources: [
        { label: 'Toyota Center bag policy', url: 'https://www.toyotacenter.com/plan-your-visit/bag-policy' },
        { label: 'Toyota Center accessibility guide', url: 'https://www.toyotacenter.com/plan-your-visit/accessibility' },
        { label: 'Toyota Center directions and parking', url: 'https://www.toyotacenter.com/plan-your-visit/directions-parking' },
      ],
    },
  },
  'toyota-stadium-frisco': {
    visitorFacts: {
      address: '9200 World Cup Way, Frisco, TX 75033',
      capacity: '19,096 soccer / 20,500 football',
      opened: '2005',
      homeTeams: ['FC Dallas'],
      playingSurface: 'Tifway 419 hybrid Bermuda grass',
      leagueOrConference: 'Major League Soccer (MLS)',
      accessibility: 'Toyota Stadium states that it meets ADA requirements and provides accessible seating at the top of the seating bowl in Sections 122–132. Guests needing special accommodations should contact the venue before the event.',
      bagAndEntry: 'Toyota Stadium uses a clear-bag policy for ticketed events. Approved options include clear bags up to 14 × 6 × 14 inches, one-gallon clear freezer bags and small clutches or cross-body bags up to 5.5 × 8.5 inches; guests pass a security checkpoint before entry.',
    },
    editorialStory: 'Toyota Stadium opened in 2005 as FC Dallas’s soccer-specific home and is undergoing a phased modernization scheduled to continue through 2028.',
    sourceReview: {
      reviewedAt,
      authoritativeSources: [
        { label: 'Toyota Stadium policies', url: 'https://www.fcdallas.com/stadium/policies' },
        { label: 'Toyota Stadium clear-bag policy', url: 'https://www.fcdallas.com/stadium/clear-bag-policy' },
        { label: 'FC Dallas stadium information', url: 'https://www.fcdallas.com/stadium/' },
      ],
    },
  },
  'unt-coliseum': {
    visitorFacts: {
      address: '601 North Texas Blvd., Denton, TX',
      capacity: '9,797 permanent seats',
      homeTeams: ['North Texas Mean Green men’s and women’s basketball'],
      leagueOrConference: 'NCAA Division I — American Conference',
      accessibility: 'UNT Coliseum has 48 wheelchair positions, ground-level accessible east entrances, limited accessible parking and a drop-off area on Avenue D. Accessible seating is also available along the top rows of the lower seating area.',
      bagAndEntry: 'UNT limits the size and type of bags entering the Super Pit under its clear-bag policy. Event entry may also use metal detectors and other security screening, so visitors should review the current Coliseum guidance before arrival.',
    },
    editorialStory: 'UNT Coliseum, widely known as the Super Pit, is the 9,797-seat Denton home of North Texas men’s and women’s basketball and also hosts university and special events.',
    sourceReview: {
      reviewedAt,
      authoritativeSources: [
        { label: 'UNT Coliseum facility information', url: 'https://studentaffairs.unt.edu/coliseum-and-gateway-center/coliseum/index.html' },
        { label: 'UNT Coliseum clear-bag guidance', url: 'https://studentaffairs.unt.edu/coliseum-and-gateway-center/index.html' },
        { label: 'North Texas Super Pit facility page', url: 'https://meangreensports.com/facilities/the-super-pit/6' },
      ],
    },
  },
};

export function getSportsVenueQualityCompletion(slug: string) {
  return SPORTS_VENUE_QUALITY_COMPLETION[slug];
}
