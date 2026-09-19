export const TEXAS_HOCKEY_SEASON = '2026–27';
export const TEXAS_HOCKEY_REVIEWED_AT = '2026-09-19';

export type TexasHockeyLevel = 'professional' | 'junior' | 'college';
export type TexasHockeyStatus = 'active' | 'historical';

export type TexasHockeyLeague = {
  slug: string;
  abbreviation: string;
  name: string;
  level: TexasHockeyLevel;
  governingBody: string;
  sourceUrl: string;
  sourceLabel: string;
  description: string;
  texasTeamSlugs: readonly string[];
};

export type TexasHockeyTeam = {
  slug: string;
  name: string;
  level: TexasHockeyLevel;
  leagueSlug: string;
  status: TexasHockeyStatus;
  seasonLabel: string;
  division?: string;
  city: string;
  citySlug: string;
  countySlug: string;
  homeVenueName?: string;
  venuePath?: string;
  secondaryVenueName?: string;
  secondaryVenuePath?: string;
  hockeyVenueSlug?: string;
  officialUrl?: string;
  sourceUrl: string;
  sourceLabel: string;
  affiliation?: string;
  overview: string;
  travelNote: string;
  currentNote?: string;
  seasonNote?: string;
};

export type TexasHockeyVenue = {
  slug: string;
  name: string;
  city: string;
  citySlug: string;
  countySlug: string;
  address: string;
  teamSlugs: readonly string[];
  sourceUrl: string;
  sourceLabel: string;
  officialUrl?: string;
  overview: string;
  planning: string;
};

export const TEXAS_HOCKEY_LEAGUES: readonly TexasHockeyLeague[] = [
  {
    slug: 'nhl',
    abbreviation: 'NHL',
    name: 'National Hockey League',
    level: 'professional',
    governingBody: 'National Hockey League',
    sourceUrl: 'https://www.nhl.com/stars/',
    sourceLabel: 'NHL — Dallas Stars',
    description: 'The NHL is the top major-professional level represented in Texas. The Dallas Stars are the state’s NHL club.',
    texasTeamSlugs: ['dallas-stars'],
  },
  {
    slug: 'ahl',
    abbreviation: 'AHL',
    name: 'American Hockey League',
    level: 'professional',
    governingBody: 'American Hockey League',
    sourceUrl: 'https://theahl.com/stats/roster/372/93',
    sourceLabel: 'AHL — Texas Stars',
    description: 'The AHL is the primary development league for the NHL. The Texas Stars are the Dallas Stars’ AHL affiliate and play in Cedar Park.',
    texasTeamSlugs: ['texas-stars'],
  },
  {
    slug: 'echl',
    abbreviation: 'ECHL',
    name: 'ECHL',
    level: 'professional',
    governingBody: 'ECHL',
    sourceUrl: 'https://echl.com/teams/allen-americans',
    sourceLabel: 'ECHL — Allen Americans',
    description: 'The ECHL is a professional league in the North American development system. The Allen Americans represent Texas in the league.',
    texasTeamSlugs: ['allen-americans'],
  },
  {
    slug: 'nahl',
    abbreviation: 'NAHL',
    name: 'North American Hockey League',
    level: 'junior',
    governingBody: 'USA Hockey',
    sourceUrl: 'https://nahl.com/teams/',
    sourceLabel: 'NAHL team directory and 2026–27 alignment',
    description: 'The NAHL is USA Hockey-sanctioned Tier II junior hockey. Its 2026–27 South Division includes six Texas clubs.',
    texasTeamSlugs: ['amarillo-wranglers', 'corpus-christi-icerays', 'el-paso-rhinos', 'houston-bulls', 'lone-star-brahmas', 'odessa-jackalopes'],
  },
  {
    slug: 'na3hl',
    abbreviation: 'NA3HL',
    name: 'North American 3 Hockey League',
    level: 'junior',
    governingBody: 'USA Hockey',
    sourceUrl: 'https://na3hl.com/teams/',
    sourceLabel: 'NA3HL team directory and 2026–27 divisional alignment',
    description: 'The NA3HL is USA Hockey-sanctioned Tier III junior hockey. Four Texas clubs appear in the current 2026–27 alignment.',
    texasTeamSlugs: ['texas-brahmas', 'west-texas-wranglers', 'austin-ice-bats', 'texas-roadrunners'],
  },
  {
    slug: 'tchc',
    abbreviation: 'TCHC',
    name: 'Texas Collegiate Hockey Conference',
    level: 'college',
    governingBody: 'American Collegiate Hockey Association',
    sourceUrl: 'https://texaschc.sportngin.com/',
    sourceLabel: 'Texas Collegiate Hockey Conference',
    description: 'The TCHC organizes Texas club-college hockey within ACHA Men’s Division 2. The current conference directory lists eight member programs.',
    texasTeamSlugs: ['baylor-bears-hockey', 'east-texas-baptist-tigers-hockey', 'smu-mustangs-hockey', 'texas-am-aggies-hockey', 'tcu-horned-frogs-hockey', 'texas-state-bobcats-hockey', 'texas-longhorns-hockey', 'north-texas-mean-green-hockey'],
  },
] as const;

export const TEXAS_HOCKEY_TEAMS: readonly TexasHockeyTeam[] = [
  {
    slug: 'dallas-stars', name: 'Dallas Stars', level: 'professional', leagueSlug: 'nhl', status: 'active', seasonLabel: TEXAS_HOCKEY_SEASON,
    division: 'Central Division', city: 'Dallas', citySlug: 'dallas', countySlug: 'dallas',
    homeVenueName: 'American Airlines Center', venuePath: '/sports-venue/american-airlines-center',
    officialUrl: 'https://www.nhl.com/stars/', sourceUrl: 'https://www.nhl.com/stars/news/topic/press-releases/dallas-stars-announce-2026-27-regular-season-schedule-071626', sourceLabel: 'Dallas Stars 2026–27 schedule / NHL',
    affiliation: 'NHL organization; AHL affiliate: Texas Stars',
    overview: 'Texas’s NHL franchise plays in Dallas and anchors the top of the state’s professional hockey ladder.',
    travelNote: 'Use the American Airlines Center guide for Victory Park arrival, parking, nearby attractions and stay planning.',
    seasonNote: 'Dallas also plays Vegas in the 2027 NHL Stadium Series at AT&T Stadium in Arlington on February 20, 2027; that special event is separate from the club’s regular American Airlines Center home schedule.',
  },
  {
    slug: 'texas-stars', name: 'Texas Stars', level: 'professional', leagueSlug: 'ahl', status: 'active', seasonLabel: TEXAS_HOCKEY_SEASON,
    division: 'Central Division', city: 'Cedar Park', citySlug: 'cedar-park', countySlug: 'williamson',
    homeVenueName: 'H-E-B Center at Cedar Park', venuePath: '/sports-venue/heb-center-at-cedar-park',
    officialUrl: 'https://www.texasstars.com/', sourceUrl: 'https://www.texasstars.com/news/detail/texas-stars-announce-2026-27-regular-season-schedule', sourceLabel: 'Texas Stars 2026–27 schedule',
    affiliation: 'Primary AHL affiliate of the Dallas Stars',
    overview: 'The Texas Stars give Central Texas an AHL club and a direct development connection to the Dallas Stars.',
    travelNote: 'The H-E-B Center guide covers Cedar Park game-day access, parking, visitor context and nearby stays.',
  },
  {
    slug: 'allen-americans', name: 'Allen Americans', level: 'professional', leagueSlug: 'echl', status: 'active', seasonLabel: TEXAS_HOCKEY_SEASON,
    division: 'Mountain Division', city: 'Allen', citySlug: 'allen', countySlug: 'collin',
    homeVenueName: 'Credit Union of Texas Event Center', venuePath: '/sports-venue/credit-union-of-texas-event-center',
    secondaryVenueName: 'Comerica Center', secondaryVenuePath: '/sports-venue/comerica-center',
    officialUrl: 'https://allenamericans.com/', sourceUrl: 'https://allenamericans.com/news/2026/05/americans-announce-2026-2027-schedule', sourceLabel: 'Allen Americans 2026–27 schedule',
    affiliation: 'NHL affiliate: Ottawa Senators; AHL affiliate: Belleville Senators',
    overview: 'The Allen Americans are Texas’s ECHL club, based in Collin County in the Dallas–Fort Worth area.',
    travelNote: 'Credit Union of Texas Event Center remains the primary Allen venue in current ticket and game listings, while the 2026–27 schedule also includes a home date at Comerica Center in Frisco. Check the specific game listing before travel.',
    seasonNote: 'The October 29, 2026 home opener is scheduled at Comerica Center in Frisco; later current-season game listings continue to identify Credit Union of Texas Event Center in Allen.',
  },

  {
    slug: 'amarillo-wranglers', name: 'Amarillo Wranglers', level: 'junior', leagueSlug: 'nahl', status: 'active', seasonLabel: TEXAS_HOCKEY_SEASON,
    division: 'South Division', city: 'Amarillo', citySlug: 'amarillo', countySlug: 'potter',
    homeVenueName: 'Amarillo Civic Center Complex', hockeyVenueSlug: 'amarillo-civic-center',
    officialUrl: 'https://www.amarillowranglers.com/', sourceUrl: 'https://nahl.com/teams/', sourceLabel: 'NAHL 2026–27 alignment',
    overview: 'Amarillo’s NAHL club competes in the South Division and extends the Texas junior-hockey footprint into the Panhandle.',
    travelNote: 'The team and venue pages connect game planning with downtown Amarillo and Potter County visitor context.',
  },
  {
    slug: 'corpus-christi-icerays', name: 'Corpus Christi IceRays', level: 'junior', leagueSlug: 'nahl', status: 'active', seasonLabel: TEXAS_HOCKEY_SEASON,
    division: 'South Division', city: 'Corpus Christi', citySlug: 'corpus-christi', countySlug: 'nueces',
    homeVenueName: 'American Bank Center', hockeyVenueSlug: 'american-bank-center',
    officialUrl: 'https://www.goicerays.com/', sourceUrl: 'https://nahl.com/teams/', sourceLabel: 'NAHL 2026–27 alignment',
    overview: 'The IceRays are Corpus Christi’s NAHL team and one of the Gulf Coast anchors of the league’s South Division.',
    travelNote: 'The hockey venue guide connects American Bank Center with downtown and waterfront trip planning.',
  },
  {
    slug: 'el-paso-rhinos', name: 'El Paso Rhinos', level: 'junior', leagueSlug: 'nahl', status: 'active', seasonLabel: TEXAS_HOCKEY_SEASON,
    division: 'South Division', city: 'El Paso', citySlug: 'el-paso', countySlug: 'el-paso',
    homeVenueName: 'El Paso County Coliseum', hockeyVenueSlug: 'el-paso-county-coliseum',
    officialUrl: 'https://www.elpasorhinos.com/', sourceUrl: 'https://nahl.com/teams/', sourceLabel: 'NAHL 2026–27 alignment',
    overview: 'The El Paso Rhinos compete in NAHL Tier II junior hockey from far West Texas.',
    travelNote: 'The venue page covers the Coliseum location and links the game with El Paso visitor planning.',
  },
  {
    slug: 'houston-bulls', name: 'Houston Bulls', level: 'junior', leagueSlug: 'nahl', status: 'active', seasonLabel: TEXAS_HOCKEY_SEASON,
    division: 'South Division', city: 'Richmond', citySlug: 'richmond', countySlug: 'fort-bend',
    homeVenueName: 'Deep South Ice & Sports Center', hockeyVenueSlug: 'deep-south-ice-sports-center',
    sourceUrl: 'https://nahl.com/teams/', sourceLabel: 'NAHL 2026–27 alignment',
    overview: 'The Houston Bulls begin play in the Richmond/Houston market in 2026–27, adding NAHL hockey to Fort Bend County.',
    travelNote: 'The venue page centers the trip on Richmond and Fort Bend County rather than treating the club as a downtown-Houston team.',
  },
  {
    slug: 'lone-star-brahmas', name: 'Lone Star Brahmas', level: 'junior', leagueSlug: 'nahl', status: 'active', seasonLabel: TEXAS_HOCKEY_SEASON,
    division: 'South Division', city: 'North Richland Hills', citySlug: 'north-richland-hills', countySlug: 'tarrant',
    homeVenueName: 'NYTEX Sports Centre', hockeyVenueSlug: 'nytex-sports-centre',
    officialUrl: 'https://www.lonestarbrahmas.com/', sourceUrl: 'https://nahl.com/teams/', sourceLabel: 'NAHL 2026–27 alignment',
    overview: 'The Lone Star Brahmas are a long-running North Richland Hills junior program competing in the NAHL South Division.',
    travelNote: 'NYTEX is the center of the Brahmas hockey ecosystem and provides the local anchor for a Tarrant County hockey trip.',
  },
  {
    slug: 'odessa-jackalopes', name: 'Odessa Jackalopes', level: 'junior', leagueSlug: 'nahl', status: 'active', seasonLabel: TEXAS_HOCKEY_SEASON,
    division: 'South Division', city: 'Odessa', citySlug: 'odessa', countySlug: 'ector',
    homeVenueName: 'Ector County Coliseum', hockeyVenueSlug: 'ector-county-coliseum',
    officialUrl: 'https://www.jackalopes.org/', sourceUrl: 'https://nahl.com/teams/', sourceLabel: 'NAHL 2026–27 alignment',
    overview: 'The Jackalopes represent the Permian Basin in the NAHL South Division.',
    travelNote: 'Use the Ector County Coliseum guide to connect the hockey game with Odessa lodging and visitor planning.',
  },

  {
    slug: 'texas-brahmas', name: 'Texas Brahmas', level: 'junior', leagueSlug: 'na3hl', status: 'active', seasonLabel: TEXAS_HOCKEY_SEASON,
    division: 'South Division', city: 'North Richland Hills', citySlug: 'north-richland-hills', countySlug: 'tarrant',
    homeVenueName: 'NYTEX Sports Centre', hockeyVenueSlug: 'nytex-sports-centre',
    officialUrl: 'https://texasjrbrahmas.com/', sourceUrl: 'https://na3hl.com/teams/', sourceLabel: 'NA3HL 2026–27 alignment',
    overview: 'The Texas Brahmas compete in NA3HL Tier III junior hockey from the same North Richland Hills hockey complex used by the Lone Star Brahmas.',
    travelNote: 'The shared NYTEX venue page makes it easy to distinguish the two Brahmas programs while planning a visit.',
  },
  {
    slug: 'west-texas-wranglers', name: 'West Texas Wranglers', level: 'junior', leagueSlug: 'na3hl', status: 'active', seasonLabel: TEXAS_HOCKEY_SEASON,
    division: 'South Division', city: 'Amarillo', citySlug: 'amarillo', countySlug: 'potter',
    homeVenueName: 'Amarillo Ice Ranch', hockeyVenueSlug: 'amarillo-ice-ranch',
    sourceUrl: 'https://na3hl.com/teams/', sourceLabel: 'NA3HL 2026–27 alignment',
    overview: 'The West Texas Wranglers are Amarillo’s current NA3HL club in the 2026–27 South Division.',
    travelNote: 'The team page separates the NA3HL Wranglers from Amarillo’s NAHL club and connects visitors to the Ice Ranch.',
  },
  {
    slug: 'austin-ice-bats', name: 'Austin Ice Bats', level: 'junior', leagueSlug: 'na3hl', status: 'active', seasonLabel: TEXAS_HOCKEY_SEASON,
    division: 'Southeast Division', city: 'Cedar Park', citySlug: 'cedar-park', countySlug: 'williamson',
    homeVenueName: 'Chaparral Ice at The Crossover', hockeyVenueSlug: 'chaparral-ice-at-the-crossover',
    officialUrl: 'https://austinicebatsna3.com/', sourceUrl: 'https://na3hl.com/teams/', sourceLabel: 'NA3HL 2026–27 alignment',
    overview: 'The Austin Ice Bats compete in the NA3HL Southeast Division from Cedar Park.',
    travelNote: 'The venue page distinguishes the Ice Bats’ home rink from the nearby H-E-B Center used by the AHL Texas Stars.',
  },
  {
    slug: 'texas-roadrunners', name: 'Texas RoadRunners', level: 'junior', leagueSlug: 'na3hl', status: 'active', seasonLabel: TEXAS_HOCKEY_SEASON,
    division: 'Southeast Division', city: 'College Station', citySlug: 'college-station', countySlug: 'brazos',
    homeVenueName: 'Spirit Ice Arena', hockeyVenueSlug: 'spirit-ice-arena',
    officialUrl: 'https://roadrunnershockey.com/', sourceUrl: 'https://na3hl.com/teams/', sourceLabel: 'NA3HL 2026–27 alignment',
    overview: 'The Texas RoadRunners bring NA3HL junior hockey to College Station and the Brazos Valley.',
    travelNote: 'The Spirit Ice Arena page connects the club with College Station visitor and lodging context.',
  },

  {
    slug: 'baylor-bears-hockey', name: 'Baylor Bears Hockey', level: 'college', leagueSlug: 'tchc', status: 'active', seasonLabel: TEXAS_HOCKEY_SEASON,
    city: 'Waco', citySlug: 'waco', countySlug: 'mclennan',
    sourceUrl: 'https://texaschc.sportngin.com/', sourceLabel: 'Texas Collegiate Hockey Conference',
    overview: 'Baylor’s club hockey program is one of the current TCHC member teams competing in ACHA Men’s Division 2.',
    travelNote: 'Use the team page with the Waco and McLennan County guides; home-ice details should be checked against the current team schedule before travel.',
  },
  {
    slug: 'east-texas-baptist-tigers-hockey', name: 'East Texas Baptist Tigers Hockey', level: 'college', leagueSlug: 'tchc', status: 'active', seasonLabel: TEXAS_HOCKEY_SEASON,
    city: 'Marshall', citySlug: 'marshall', countySlug: 'harrison',
    sourceUrl: 'https://texaschc.sportngin.com/', sourceLabel: 'Texas Collegiate Hockey Conference',
    overview: 'East Texas Baptist is a current TCHC member program in ACHA Men’s Division 2.',
    travelNote: 'The page connects the program to Marshall and Harrison County while deferring changing home-ice details to the current team/conference schedule.',
  },
  {
    slug: 'smu-mustangs-hockey', name: 'SMU Mustangs Hockey', level: 'college', leagueSlug: 'tchc', status: 'active', seasonLabel: TEXAS_HOCKEY_SEASON,
    city: 'Dallas', citySlug: 'dallas', countySlug: 'dallas',
    sourceUrl: 'https://texaschc.sportngin.com/', sourceLabel: 'Texas Collegiate Hockey Conference',
    overview: 'SMU’s club hockey program competes in the TCHC at the ACHA Men’s Division 2 level.',
    travelNote: 'Because club-hockey venues can change by schedule, use the current TCHC/team schedule for the rink and TexasDefined for Dallas trip context.',
  },
  {
    slug: 'texas-am-aggies-hockey', name: 'Texas A&M Aggies Hockey', level: 'college', leagueSlug: 'tchc', status: 'active', seasonLabel: TEXAS_HOCKEY_SEASON,
    city: 'College Station', citySlug: 'college-station', countySlug: 'brazos',
    homeVenueName: 'Spirit Ice Arena', hockeyVenueSlug: 'spirit-ice-arena',
    sourceUrl: 'https://texaschc.sportngin.com/', sourceLabel: 'Texas Collegiate Hockey Conference',
    overview: 'Texas A&M’s club hockey program is a TCHC member competing in ACHA Men’s Division 2.',
    travelNote: 'Spirit Ice Arena is part of the College Station hockey picture; confirm the current team schedule before traveling to a specific game.',
  },
  {
    slug: 'tcu-horned-frogs-hockey', name: 'TCU Horned Frogs Hockey', level: 'college', leagueSlug: 'tchc', status: 'active', seasonLabel: TEXAS_HOCKEY_SEASON,
    city: 'Fort Worth', citySlug: 'fort-worth', countySlug: 'tarrant',
    sourceUrl: 'https://texaschc.sportngin.com/', sourceLabel: 'Texas Collegiate Hockey Conference',
    overview: 'TCU’s club hockey program is one of the current TCHC teams at the ACHA Men’s Division 2 level.',
    travelNote: 'Use the Fort Worth and Tarrant County guides for trip context and the current hockey schedule for the exact rink.',
  },
  {
    slug: 'texas-state-bobcats-hockey', name: 'Texas State Bobcats Hockey', level: 'college', leagueSlug: 'tchc', status: 'active', seasonLabel: TEXAS_HOCKEY_SEASON,
    city: 'San Marcos', citySlug: 'san-marcos', countySlug: 'hays',
    sourceUrl: 'https://texaschc.sportngin.com/', sourceLabel: 'Texas Collegiate Hockey Conference',
    overview: 'Texas State’s club hockey program competes in the TCHC at the ACHA Men’s Division 2 level.',
    travelNote: 'Use the San Marcos and Hays County guides for the broader trip and verify the current schedule for game-specific rink details.',
  },
  {
    slug: 'texas-longhorns-hockey', name: 'Texas Longhorns Hockey', level: 'college', leagueSlug: 'tchc', status: 'active', seasonLabel: TEXAS_HOCKEY_SEASON,
    city: 'Austin', citySlug: 'austin', countySlug: 'travis',
    sourceUrl: 'https://texaschc.sportngin.com/', sourceLabel: 'Texas Collegiate Hockey Conference',
    overview: 'The University of Texas club hockey program is a current TCHC member competing in ACHA Men’s Division 2.',
    travelNote: 'Use the Austin and Travis County guides for visitor context and the current team schedule for the exact rink.',
  },
  {
    slug: 'north-texas-mean-green-hockey', name: 'North Texas Mean Green Hockey', level: 'college', leagueSlug: 'tchc', status: 'active', seasonLabel: TEXAS_HOCKEY_SEASON,
    city: 'Denton', citySlug: 'denton', countySlug: 'denton',
    sourceUrl: 'https://texaschc.sportngin.com/', sourceLabel: 'Texas Collegiate Hockey Conference',
    overview: 'The University of North Texas club hockey program is a current TCHC member in ACHA Men’s Division 2.',
    travelNote: 'Use the Denton city/county guides for the trip and the current TCHC/team schedule for rink-specific information.',
  },

  {
    slug: 'mid-cities-jr-stars', name: 'Mid-Cities Jr. Stars', level: 'junior', leagueSlug: 'na3hl', status: 'historical', seasonLabel: 'historical',
    city: 'Euless', citySlug: 'euless', countySlug: 'tarrant',
    sourceUrl: 'https://na3hl.com/teams/', sourceLabel: 'NA3HL current team directory',
    overview: 'Mid-Cities Jr. Stars is retained as a historical Texas junior-hockey reference because the name appears in older Texas hockey lists.',
    travelNote: 'This record is not presented as a current 2026–27 NA3HL club.',
    currentNote: 'Not listed in the NA3HL 2026–27 divisional alignment. TexasDefined keeps this page for historical/disambiguation value rather than current-team discovery.',
  },
] as const;

export const TEXAS_HOCKEY_VENUES: readonly TexasHockeyVenue[] = [
  {
    slug: 'amarillo-civic-center', name: 'Amarillo Civic Center Complex', city: 'Amarillo', citySlug: 'amarillo', countySlug: 'potter',
    address: '401 S Buchanan St, Amarillo, TX 79101', teamSlugs: ['amarillo-wranglers'],
    sourceUrl: 'https://www.amarillowranglers.com/', sourceLabel: 'Amarillo Wranglers',
    officialUrl: 'https://www.amarillociviccenter.com/',
    overview: 'The Amarillo Civic Center Complex is the event arena associated with Amarillo Wranglers home hockey and downtown Amarillo event traffic.',
    planning: 'Confirm the current Wranglers schedule and event-specific parking or entry instructions before travel.',
  },
  {
    slug: 'american-bank-center', name: 'American Bank Center', city: 'Corpus Christi', citySlug: 'corpus-christi', countySlug: 'nueces',
    address: '1901 N Shoreline Blvd, Corpus Christi, TX 78401', teamSlugs: ['corpus-christi-icerays'],
    sourceUrl: 'https://www.goicerays.com/', sourceLabel: 'Corpus Christi IceRays',
    officialUrl: 'https://www.americanbankcenter.com/',
    overview: 'American Bank Center is the downtown Corpus Christi arena used by the IceRays and sits along the bayfront visitor corridor.',
    planning: 'Use the current IceRays and arena event pages for game time, tickets, parking and entry rules.',
  },
  {
    slug: 'el-paso-county-coliseum', name: 'El Paso County Coliseum', city: 'El Paso', citySlug: 'el-paso', countySlug: 'el-paso',
    address: '4100 E Paisano Dr, El Paso, TX 79905', teamSlugs: ['el-paso-rhinos'],
    sourceUrl: 'https://www.elpasorhinos.com/', sourceLabel: 'El Paso Rhinos',
    overview: 'El Paso County Coliseum is the Rhinos’ established home-hockey setting in central El Paso.',
    planning: 'Check the Rhinos’ current event information for game times, tickets and rink-specific entry guidance.',
  },
  {
    slug: 'deep-south-ice-sports-center', name: 'Deep South Ice & Sports Center', city: 'Richmond', citySlug: 'richmond', countySlug: 'fort-bend',
    address: '8925 Harlem Rd, Richmond, TX 77407', teamSlugs: ['houston-bulls'],
    sourceUrl: 'https://nahl.com/teams/', sourceLabel: 'NAHL — Houston Bulls',
    overview: 'Deep South Ice & Sports Center is the Richmond home base for the Houston Bulls beginning with the 2026–27 NAHL season.',
    planning: 'Treat Richmond and Fort Bend County as the trip anchor and verify game-specific entry and ticket details with the Bulls/NAHL schedule.',
  },
  {
    slug: 'nytex-sports-centre', name: 'NYTEX Sports Centre', city: 'North Richland Hills', citySlug: 'north-richland-hills', countySlug: 'tarrant',
    address: '8851 Ice House Dr, North Richland Hills, TX 76180', teamSlugs: ['lone-star-brahmas', 'texas-brahmas'],
    sourceUrl: 'https://www.lonestarbrahmas.com/', sourceLabel: 'Lone Star Brahmas',
    officialUrl: 'https://www.nytexsports.com/',
    overview: 'NYTEX Sports Centre is a major North Texas hockey complex and the shared home base for the NAHL Lone Star Brahmas and NA3HL Texas Brahmas.',
    planning: 'Check which Brahmas team is playing before buying tickets; the two programs compete at different junior levels.',
  },
  {
    slug: 'ector-county-coliseum', name: 'Ector County Coliseum', city: 'Odessa', citySlug: 'odessa', countySlug: 'ector',
    address: '4201 Andrews Hwy, Odessa, TX 79762', teamSlugs: ['odessa-jackalopes'],
    sourceUrl: 'https://www.jackalopes.org/', sourceLabel: 'Odessa Jackalopes',
    officialUrl: 'https://ectorcountycoliseum.com/',
    overview: 'Ector County Coliseum is the Odessa Jackalopes’ home arena and a long-standing Permian Basin event complex.',
    planning: 'Use current Jackalopes and Coliseum sources for game times, parking, ticketing and event rules.',
  },
  {
    slug: 'chaparral-ice-at-the-crossover', name: 'Chaparral Ice at The Crossover', city: 'Cedar Park', citySlug: 'cedar-park', countySlug: 'williamson',
    address: '1717 Scottsdale Dr, Cedar Park, TX 78613', teamSlugs: ['austin-ice-bats'],
    sourceUrl: 'https://na3hl.com/teams/', sourceLabel: 'NA3HL — Austin Ice Bats',
    overview: 'Chaparral Ice at The Crossover is the Cedar Park rink associated with the current Austin Ice Bats NA3HL program.',
    planning: 'Do not confuse this rink with H-E-B Center at Cedar Park, which is the nearby AHL Texas Stars arena.',
  },
  {
    slug: 'amarillo-ice-ranch', name: 'Amarillo Ice Ranch', city: 'Amarillo', citySlug: 'amarillo', countySlug: 'potter',
    address: '301 S Grant St, Amarillo, TX 79101', teamSlugs: ['west-texas-wranglers'],
    sourceUrl: 'https://na3hl.com/teams/', sourceLabel: 'NA3HL — West Texas Wranglers',
    overview: 'Amarillo Ice Ranch is the rink associated with the West Texas Wranglers in the current NA3HL alignment.',
    planning: 'Amarillo has both NAHL and NA3HL hockey; verify the team and venue before traveling.',
  },
  {
    slug: 'spirit-ice-arena', name: 'Spirit Ice Arena', city: 'College Station', citySlug: 'college-station', countySlug: 'brazos',
    address: '400 Holleman Dr E, College Station, TX 77840', teamSlugs: ['texas-roadrunners', 'texas-am-aggies-hockey'],
    sourceUrl: 'https://na3hl.com/teams/', sourceLabel: 'NA3HL — Texas RoadRunners',
    overview: 'Spirit Ice Arena is a central part of the College Station hockey scene and is associated with the Texas RoadRunners and Texas A&M hockey.',
    planning: 'Confirm the current RoadRunners or Texas A&M schedule before travel because club and junior calendars are separate.',
  },
] as const;

export const TEXAS_HOCKEY_ACTIVE_TEAMS = TEXAS_HOCKEY_TEAMS.filter((team) => team.status === 'active');
export const TEXAS_HOCKEY_HISTORICAL_TEAMS = TEXAS_HOCKEY_TEAMS.filter((team) => team.status === 'historical');

export function findTexasHockeyTeam(slug: string) {
  return TEXAS_HOCKEY_TEAMS.find((team) => team.slug === slug);
}

export function findTexasHockeyLeague(slug: string) {
  return TEXAS_HOCKEY_LEAGUES.find((league) => league.slug === slug);
}

export function findTexasHockeyVenue(slug: string) {
  return TEXAS_HOCKEY_VENUES.find((venue) => venue.slug === slug);
}

export function texasHockeyTeamPath(slug: string) {
  return '/texas-hockey/teams/' + slug;
}

export function texasHockeyLeaguePath(slug: string) {
  return '/texas-hockey/leagues/' + slug;
}

export function texasHockeyVenuePath(slug: string) {
  return '/texas-hockey/venues/' + slug;
}

export function hockeyVenuePathForTeam(team: TexasHockeyTeam) {
  if (team.venuePath) return team.venuePath;
  return team.hockeyVenueSlug ? texasHockeyVenuePath(team.hockeyVenueSlug) : undefined;
}

export function texasHockeyTeamsForLeague(leagueSlug: string) {
  return TEXAS_HOCKEY_ACTIVE_TEAMS.filter((team) => team.leagueSlug === leagueSlug);
}

export function texasHockeyTeamsForVenuePath(path: string) {
  return TEXAS_HOCKEY_ACTIVE_TEAMS.filter((team) => team.venuePath === path || team.secondaryVenuePath === path);
}

export function texasHockeyTeamsForHockeyVenue(slug: string) {
  return TEXAS_HOCKEY_ACTIVE_TEAMS.filter((team) => team.hockeyVenueSlug === slug);
}
