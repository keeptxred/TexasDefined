/**
 * Texas horse-racing authority inventory.
 * Scope: TXRC-licensed horse racetrack operations, including inactive licenses.
 * Reviewed 2026-10-16 against TXRC licensing page, 2025–2029 strategic plan,
 * 2022–2027 plan and current venue/association calendars.
 * No off-track betting or betting-account affiliate promotion.
 */
export type HorseRacingInstitution = {
  slug: string;
  name: string;
  city: string;
  county: string;
  countySlug: string;
  category: 'live' | 'inactive';
  canonicalPath: string;
  introduction: string;
  context: string[];
  visitorNotes: string[];
  racing: string;
  sourceDate: string;
  sources: { label: string; url: string }[];
  address?: string;
  schedule?: string;
};

export const HORSE_RACING_REVIEW_DATE = '2026-10-16';
export const TXRC_RACETRACKS = 'https://www.txrc.texas.gov/home/racetracks';
export const TXRC_LICENSES = 'https://www.txrc.texas.gov/licensing';
export const TXRC_STRATEGIC_PLAN = 'https://www.txrc.texas.gov/s/2024-09-13-TXRC-Strategic-Plan-2025-2029-FINAL.pdf';
export const TXRC_HISTORIC_INVENTORY = 'https://www.txrc.texas.gov/s/2022-06-01_Texas-Racing-Commission-Strategic-Plan2023-2027.pdf';

export const TEXAS_HORSE_RACING_INSTITUTIONS: readonly HorseRacingInstitution[] = [
  {
    slug: 'lone-star-park', name: 'Lone Star Park', city: 'Grand Prairie', county: 'Dallas County', countySlug: 'dallas', category: 'live',
    canonicalPath: '/sports-venue/lone-star-park',
    address: '1000 Lone Star Parkway, Grand Prairie, TX 75050',
    racing: 'Seasonal Thoroughbred and Quarter Horse racing; simulcasting',
    schedule: 'The 2026 Thoroughbred meet ran April 16–July 12; check the operator for current Quarter Horse dates and post times.',
    introduction: 'Grand Prairie’s major pari-mutuel racing venue serves the Dallas–Fort Worth area and includes grandstand hospitality and simulcast facilities.',
    context: ['Lone Star Park is one of the four venues named in the Texas Racing Commission’s list of tracks holding live horse racing.', 'Thoroughbred and Quarter Horse seasons have different calendars and admission patterns.'],
    visitorNotes: ['Confirm the date and first-post time on the official live racing calendar.', 'Use the track’s parking and gate instructions for your specific event.', 'Compare accommodation in Grand Prairie, Arlington and other parts of Dallas County by travel time, not just city name.'],
    sourceDate: '2026-10-16',
    sources: [{ label: 'Lone Star Park racing calendar', url: 'https://www.lonestarpark.com/live-racing/' }, { label: 'TXRC track licensing', url: TXRC_LICENSES }],
  },
  {
    slug: 'sam-houston-race-park', name: 'Sam Houston Race Park', city: 'Houston', county: 'Harris County', countySlug: 'harris', category: 'live',
    canonicalPath: '/sports-venue/sam-houston-race-park', address: '7575 N. Sam Houston Parkway W., Houston, TX 77064',
    racing: 'Seasonal Thoroughbred and Quarter Horse racing; simulcasting',
    schedule: 'The published 2026–27 calendar lists Thoroughbreds December 18, 2026–April 3, 2027, then Quarter Horses April 15–June 12, 2027.',
    introduction: 'Sam Houston Race Park is the Houston region’s licensed live horse-racing venue, with racing seasons, simulcast viewing and on-site hospitality.',
    context: ['The track distinguishes live Thoroughbred meets, Quarter Horse meets and its simulcast schedule.', 'Published dates are subject to regulatory approval and operator changes.'],
    visitorNotes: ['Check the official calendar before assuming live racing on a simulcast day.', 'Stay in northwest Houston when proximity matters; downtown is a separate travel choice.', 'Confirm gate opening, tickets and event-specific parking.'],
    sourceDate: '2026-10-16',
    sources: [{ label: 'Sam Houston Race Park calendar', url: 'https://www.shrp.com/' }, { label: 'TXRC licensing', url: TXRC_LICENSES }],
  },
  {
    slug: 'retama-park', name: 'Retama Park', city: 'Selma', county: 'Bexar County', countySlug: 'bexar', category: 'live',
    canonicalPath: '/sports-venue/retama-park', address: '1 Retama Parkway, Selma, TX 78154',
    racing: 'Seasonal Quarter Horse racing; year-round simulcast operations',
    schedule: 'The operator lists the 2026 live Quarter Horse season beginning June 25 and publishes race-specific calendars.',
    introduction: 'Retama Park brings seasonal live Quarter Horse racing to Selma northeast of San Antonio, with simulcasting at other times.',
    context: ['The track’s own website separates its live race dates and simulcast calendar.', 'Visitors should not treat simulcast-only dates as opportunities to see horses on the track.'],
    visitorNotes: ['Check the live racing calendar and event admission before traveling.', 'The operator advertises free parking for regular racing and simulcast operations.', 'Northeast San Antonio and Selma are the practical nearby lodging areas.'],
    sourceDate: '2026-10-16',
    sources: [{ label: 'Retama Park live horse racing', url: 'https://www.retamapark.com/horseracing' }, { label: 'TXRC licensing', url: TXRC_LICENSES }],
  },
  {
    slug: 'gillespie-county-fairgrounds', name: 'Gillespie County Fairgrounds Horse Racing', city: 'Fredericksburg', county: 'Gillespie County', countySlug: 'gillespie', category: 'live',
    canonicalPath: '/horse-racing/gillespie-county-fairgrounds',
    address: '530 Fair Drive, Fredericksburg, TX 78624',
    racing: 'Class 3 seasonal live Quarter Horse and Thoroughbred racing; county-fair race weekend',
    schedule: 'The 2026 racing weekends were July 4–5, July 18–19, August 15–16 and August 29–30. All have passed; 2027 dates are not yet confirmed here.',
    introduction: 'Fredericksburg’s Gillespie County Fairgrounds offers an unusual Hill Country summer race-day experience alongside the community’s longstanding county-fair traditions.',
    context: ['The fair association identifies its track as Class 3 and advertises live Thoroughbred and Quarter Horse racing on four summer weekends.', 'Unlike the three larger commercial tracks, the fairground program is concentrated into a few specific weekends.', 'The association also operates a separate Race Barn simulcast setting; a simulcast session is not a live horse race at the fairground track.'],
    visitorNotes: ['On the official 2026 calendar, gates opened at 11 a.m. with 1 p.m. first post; do not assume those times for 2027.', 'The 2026 racing page listed general admission at $10 on most weekends and $20 during the fair, with child rates; verify future prices.', 'Check the Gillespie County Fair event schedule, parking arrangements, seating, outdoor heat and possible lightning delays.', 'Fredericksburg stays can book up on fair and summer weekends. Use the Gillespie County guide to compare the broader visit.'],
    sourceDate: '2026-10-16',
    sources: [{ label: 'Gillespie live pari-mutuel racing', url: 'https://gillespiefair.com/pari-mutuel-horse-racing' }, { label: 'Gillespie County Fair', url: 'https://gillespiefair.com/gillespie-county-fair' }, { label: 'TXRC licensing', url: TXRC_LICENSES }],
  },
  {
    slug: 'manor-downs', name: 'Manor Downs', city: 'Manor', county: 'Travis County', countySlug: 'travis', category: 'inactive',
    canonicalPath: '/horse-racing/manor-downs',
    racing: 'Historic Texas horse-racing track; no current live racing is verified',
    introduction: 'Manor Downs is part of the Austin-area horse-racing story, but it must not be presented as an operating visitor racetrack.',
    context: ['The Texas Racing Commission’s strategic-plan track inventory lists Manor Downs in Travis County among inactive horse-racing facilities.', 'The site was associated with racing in the Manor area east of Austin; a listed historic or license address is not proof of access to a working racetrack.', 'The operator’s status and site use can change independently of historic references.'],
    visitorNotes: ['Do not travel to Manor Downs expecting live pari-mutuel racing or ticket sales.', 'For currently approved races, use the four active Texas venue guides.', 'Use Travis County and Austin visitor pages for unrelated local attractions.'],
    sourceDate: '2026-10-16',
    sources: [{ label: 'TXRC racetrack inventory (historical)', url: TXRC_HISTORIC_INVENTORY }, { label: 'TXRC racing dates', url: TXRC_RACETRACKS }],
  },
  {
    slug: 'laredo-downs', name: 'Laredo Downs', city: 'Laredo', county: 'Webb County', countySlug: 'webb', category: 'inactive',
    canonicalPath: '/horse-racing/laredo-downs',
    racing: 'Inactive Class 2 horse-racetrack license; no current live races verified',
    introduction: 'Laredo Downs appears in Texas Racing Commission licensing records, but a racetrack license must not be mistaken for an operating place to attend races.',
    context: ['Commission review materials identify Laredo Downs as an inactive Class 2 license in Webb County.', 'A December 2023 review referred to a proposed January–February 2027 racing window. A proposal in older records is not confirmation that races will occur.', 'Historical addresses in regulatory material may refer to administrative or planned facilities.'],
    visitorNotes: ['Do not advertise admission, tickets, or 2027 races without a newer operator and commission confirmation.', 'For a Laredo visit, consult Webb County and city guides instead of treating this as an attraction.', 'Use the Texas Racing Commission’s current race-date decisions to determine any future change.'],
    sourceDate: '2026-10-16',
    sources: [{ label: 'TXRC strategic-plan historic track inventory', url: TXRC_HISTORIC_INVENTORY }, { label: 'TXRC racing dates', url: TXRC_RACETRACKS }],
  },
  {
    slug: 'valle-de-los-tesoros', name: 'Valle de los Tesoros', city: 'McAllen', county: 'Hidalgo County', countySlug: 'hidalgo', category: 'inactive',
    canonicalPath: '/horse-racing/valle-de-los-tesoros',
    racing: 'Inactive Texas horse-racetrack license; no current live races verified',
    introduction: 'Valle de los Tesoros is a Rio Grande Valley horse-racing license entry associated with McAllen, not an established live-racing tourist stop.',
    context: ['TXRC historic licensing inventory identifies Valle de los Tesoros in McAllen.', 'Older licensing or facility references should not be used as a contemporary racing calendar.', 'It is distinct from Valley Race Park in Harlingen, a greyhound-racing property, which should not be grouped with active horse tracks.'],
    visitorNotes: ['No verified current spectator schedule, tickets or operating track admission is available.', 'For a McAllen visit, use Hidalgo County travel information and the current official event calendar.', 'If licensed live racing resumes, confirm the commission’s approved dates before changing the page’s status.'],
    sourceDate: '2026-10-16',
    sources: [{ label: 'TXRC historical track inventory', url: TXRC_HISTORIC_INVENTORY }, { label: 'TXRC racing dates', url: TXRC_RACETRACKS }],
  },
];

export type TexasRacingOrganization = {
  category: 'organization';
  slug: string;
  name: string;
  city: string;
  county: string;
  countySlug: string;
  canonicalPath: string;
  role: string;
  url: string;
  address: string;
  introduction: string;
  context: readonly string[];
  visitorNotes: readonly string[];
  sourceDate: string;
  sources: readonly { label: string; url: string }[];
};

/**
 * Regulator and primary statewide horse-racing organizations. Their offices
 * are NOT racetracks, race-day attractions or ticket-selling destinations.
 * Office locations verified from the organizations' current contact pages.
 */
export const TEXAS_RACING_ORGANIZATIONS: readonly TexasRacingOrganization[] = [
  {
    category: 'organization', slug: 'texas-racing-commission', name: 'Texas Racing Commission', city: 'Austin',
    county: 'Travis County', countySlug: 'travis', canonicalPath: '/horse-racing/texas-racing-commission',
    role: 'State regulator for pari-mutuel horse racing, racetrack and occupational licensing, approved race dates, rules and integrity',
    url: 'https://www.txrc.texas.gov/', address: '1801 Congress Avenue, Suite 7.600, Austin, TX 78701',
    introduction: 'The Texas Racing Commission (TXRC) administers and enforces the Texas Racing Act, regulates licensed Texas horse racing, and publishes official racetrack dates and occupational licensing information.',
    context: [
      'The commission is the authoritative state source for approved live-race dates, active and inactive racetrack licenses, racing rules, disciplinary and licensing information.',
      'The Austin headquarters is an administrative office, not a racetrack or a place to buy race tickets.',
      'The commission explicitly says its Austin headquarters does not process occupational racing licenses. Licensing opportunities are available at listed track offices with seasonal hours.',
    ],
    visitorNotes: [
      'For official race schedules and regulatory updates, open the commission’s track and racing dates page.',
      'For licensing, check the official registration locations and seasonal hours. Do not travel to headquarters to obtain a license.',
      'For spectator travel, choose one of the four live Texas racetrack guides rather than this office profile.',
    ],
    sourceDate: '2026-10-17',
    sources: [
      { label: 'TXRC official home and headquarters', url: 'https://www.txrc.texas.gov/' },
      { label: 'TXRC licensing and registration locations', url: 'https://www.txrc.texas.gov/licensing' },
      { label: 'TXRC race tracks and dates', url: TXRC_RACETRACKS },
    ],
  },
  {
    category: 'organization', slug: 'texas-thoroughbred-association', name: 'Texas Thoroughbred Association', city: 'Buda',
    county: 'Hays County', countySlug: 'hays', canonicalPath: '/horse-racing/texas-thoroughbred-association',
    role: 'Thoroughbred breeding and racing representation, Accredited Texas-Bred registration, racing incentives and sales',
    url: 'https://texasthoroughbred.com/', address: '192 Cimarron Park Loop, Suite A, Buda, TX 78610',
    introduction: 'The Texas Thoroughbred Association (TTA) supports Thoroughbred owners and breeders and administers the Accredited Texas-Bred program that helps eligible horses earn incentives at Texas races.',
    context: [
      'The TTA traces its establishment to 1955 and describes itself as the steward of Texas Thoroughbred racing and breeding.',
      'Its Accredited Texas-Bred program covers qualifying horses and breeding stock; requirements, forms, deadlines and fees are maintained by the association, not Texas Defined.',
      'The association also supports stakes and Thoroughbred sales and publishes industry updates. Its Buda office is not a visitor horse-racing track.',
    ],
    visitorNotes: [
      'Use the official association site for breeding accreditation, forms and current program requirements.',
      'Confirm deadlines, forms, rates and whether an in-person office appointment is needed directly with TTA.',
      'For live Thoroughbred racing, review official Lone Star Park, Sam Houston Race Park and Gillespie County calendars.',
    ],
    sourceDate: '2026-10-17',
    sources: [
      { label: 'TTA about and mission', url: 'https://texasthoroughbred.com/about-us/' },
      { label: 'TTA Accredited Texas-Bred forms and current mailing address', url: 'https://texasthoroughbred.com/texas-bred/forms/' },
    ],
  },
  {
    category: 'organization', slug: 'texas-quarter-horse-association', name: 'Texas Quarter Horse Association', city: 'Elgin',
    county: 'Bastrop County', countySlug: 'bastrop', canonicalPath: '/horse-racing/texas-quarter-horse-association',
    role: 'Quarter Horse racing, Accredited Texas-Bred awards, performance, sales, membership and youth programs',
    url: 'https://www.tqha.com/', address: '14 N. Main Street, Suite B, Elgin, TX 78621',
    introduction: 'Founded in 1978, the Texas Quarter Horse Association (TQHA) is the state’s American Quarter Horse affiliate and supports Texas Quarter Horse racing, ownership, breeding, competition and youth programs.',
    context: [
      'TQHA manages the Accredited Texas-Bred Quarter Horse awards program and serves racing owners, breeders and stallion interests.',
      'Its programming extends beyond pari-mutuel racing to performance, halter, youth participation and membership.',
      'The official contact page lists a Main Street office in Elgin; it is an administrative association office, not a racetrack.',
    ],
    visitorNotes: [
      'For race programs, eligibility, membership, sales and awards, use TQHA’s current official information.',
      'Check opening hours and contact information before planning an office visit.',
      'For Quarter Horse spectators, use the statewide live racetrack directory and operator-posted dates.',
    ],
    sourceDate: '2026-10-17',
    sources: [
      { label: 'TQHA association and mission', url: 'https://www.tqha.com/association/' },
      { label: 'TQHA membership and accredited Texas-bred programs', url: 'https://www.tqha.com/association/membership/' },
      { label: 'TQHA current contact details', url: 'https://www.tqha.com/contact/' },
    ],
  },
  {
    category: 'organization', slug: 'texas-horsemens-partnership', name: "Texas Horsemen's Partnership", city: 'Elgin',
    county: 'Bastrop County', countySlug: 'bastrop', canonicalPath: '/horse-racing/texas-horsemens-partnership',
    role: 'Owner and trainer representation, race condition books, licensing links and racehorse professional resources',
    url: 'https://www.texashorsemen.org/', address: '119 N. Main Street, Elgin, TX 78621',
    introduction: "Texas Horsemen's Partnership (THP) represents and supports racehorse owners and trainers at Texas pari-mutuel tracks with condition books, calendars, licensing references and industry services.",
    context: [
      'THP describes itself as the recognized voice of participating Texas racing owners and trainers and acts as a bridge between horsemen, racetracks and regulators.',
      'Its website brings together condition books, race calendars and horsemen account resources for licensed professionals.',
      'The Elgin office is not an active racetrack or a tourist racing attraction.',
    ],
    visitorNotes: [
      'Use the official site for current condition books, horsemen accounts, contacts, resources and racing calendars.',
      'Check the Texas Racing Commission for regulatory licensing requirements rather than relying on old race-season posts.',
      'Use the four live-racing venue guides for public spectator schedules and visitor information.',
    ],
    sourceDate: '2026-10-17',
    sources: [
      { label: 'THP mission and official office', url: 'https://www.texashorsemen.org/copy-of-thp-staff-directors' },
      { label: 'THP resources and calendar home', url: 'https://www.texashorsemen.org/' },
      { label: 'THP membership and representation', url: 'https://www.texashorsemen.org/copy-of-benevolence' },
    ],
  },
];

export function findTexasRacingOrganization(slug: string) {
  return TEXAS_RACING_ORGANIZATIONS.find((item) => item.slug === slug);
}

/**
 * Standalone track-comparison and official live-meet calendar surface.
 * Do not treat completed 2026 seasons or simulcast-only dates as live race days.
 * Live program data last checked 2026-10-17; changes require source re-review.
 */
export const TEXAS_HORSE_RACING_CALENDAR = {
  category: 'calendar' as const,
  slug: 'calendar',
  canonicalPath: '/horse-racing/calendar',
  name: 'Texas Horse Racing Calendar and Racetrack Comparison',
  sourceDate: '2026-10-17',
  introduction: 'Compare all four currently operating Texas live-racing tracks, with verified upcoming meet windows, 2026 season history and direct official calendars.',
  upcoming: [
    {
      venueSlug: 'sam-houston-race-park',
      title: 'Sam Houston Race Park — 2026–27 Thoroughbred meet',
      starts: '2026-12-18',
      ends: '2027-04-03',
      note: 'Officially posted season window. Individual race cards and post times require the operator calendar.',
      sourceUrl: 'https://www.shrp.com/',
    },
    {
      venueSlug: 'sam-houston-race-park',
      title: 'Sam Houston Race Park — 2027 Quarter Horse meet',
      starts: '2027-04-15',
      ends: '2027-06-12',
      note: 'Officially posted season window; subject to the operator and regulator updating individual race days.',
      sourceUrl: 'https://www.shrp.com/',
    },
  ],
  comparison: [
    { slug: 'lone-star-park', breed: 'Thoroughbred and Quarter Horse', latestSeason: '2026 Thoroughbreds April 16–July 12; autumn 2026 live Quarter Horse cards remain on the operator calendar', nextSeason: 'Verify individual current race dates on the official calendar', link: 'https://www.lonestarpark.com/live-racing/' },
    { slug: 'sam-houston-race-park', breed: 'Thoroughbred and Quarter Horse', latestSeason: '2026–27 Thoroughbreds December 18–April 3; 2027 Quarter Horses April 15–June 12', nextSeason: 'Both 2026–27 meet windows published', link: 'https://www.shrp.com/' },
    { slug: 'retama-park', breed: 'Quarter Horse, Paint and Appaloosa', latestSeason: '2026 summer live meet concluded August 22', nextSeason: '2027 schedule labeled “coming soon” by the operator', link: 'https://www.retamapark.com/horseracing/live-racing' },
    { slug: 'gillespie-county-fairgrounds', breed: 'Quarter Horse and Thoroughbred', latestSeason: 'Four summer race weekends ended August 30, 2026', nextSeason: '2027 summer weekend dates not yet verified in this guide', link: 'https://gillespiefair.com/pari-mutuel-horse-racing' },
  ],
  sources: [
    { label: 'Texas Racing Commission — race tracks and dates', url: TXRC_RACETRACKS },
    { label: 'Lone Star Park official live racing schedule', url: 'https://www.lonestarpark.com/live-racing/' },
    { label: 'Sam Houston Race Park official 2026–27 meet dates', url: 'https://www.shrp.com/' },
    { label: 'Retama Park 2027 season calendar notice', url: 'https://www.retamapark.com/horseracing/live-racing' },
    { label: 'Gillespie County Fairgrounds racing calendar', url: 'https://gillespiefair.com/pari-mutuel-horse-racing' },
  ],
};

export function findTexasHorseRacingCalendar(slug: string) {
  return slug === 'calendar' ? TEXAS_HORSE_RACING_CALENDAR : undefined;
}

export function findTexasHorseRacingInstitution(slug: string) {
  return TEXAS_HORSE_RACING_INSTITUTIONS.find((item) => item.slug === slug);
}
