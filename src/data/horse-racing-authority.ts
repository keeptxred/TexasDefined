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
    slug: 'gulf-coast-racing', name: 'Gulf Coast Racing', city: 'Corpus Christi', county: 'Nueces County', countySlug: 'nueces', category: 'inactive',
    canonicalPath: '/horse-racing/gulf-coast-racing',
    racing: 'Inactive Texas horse-racetrack license; no current live racing verified',
    introduction: 'Gulf Coast Racing is part of the Corpus Christi-area racing-license history, not a currently verified live racing destination.',
    context: ['The Texas Racing Commission’s inventory lists Gulf Coast Racing in Corpus Christi among inactive horse-track licenses.', 'An administrative street address in an old agency report is not evidence of current visitor access to a track.', 'Separate this entry from the city’s active sporting and tourism attractions.'],
    visitorNotes: ['Do not buy travel or event tickets based on older track lists.', 'The Corpus Christi and Nueces County travel hubs cover current nearby things to do.', 'Recheck licensing status before reporting that Gulf Coast Racing has resumed racing.'],
    sourceDate: '2026-10-16',
    sources: [{ label: 'TXRC historical track inventory', url: TXRC_HISTORIC_INVENTORY }, { label: 'TXRC racing dates', url: TXRC_RACETRACKS }],
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

export const TEXAS_RACING_ORGANIZATIONS = [
  { name: 'Texas Racing Commission', role: 'State licensing, regulation, official live race dates and professional licensing', url: 'https://www.txrc.texas.gov/', countySlug: 'travis' },
  { name: 'Texas Thoroughbred Association', role: 'Accredited Texas-Bred Thoroughbred program, ownership, breeding, sales and industry news', url: 'https://texasthoroughbred.com/', countySlug: 'hays' },
  { name: 'Texas Quarter Horse Association', role: 'Quarter Horse racing programs, breeding incentives, accredited Texas-bred awards and sales', url: 'https://www.tqha.com/', countySlug: 'bastrop' },
  { name: "Texas Horsemen's Partnership", role: 'Owner, trainer and racing-professional support, race calendars and condition books', url: 'https://www.texashorsemen.org/', countySlug: 'bastrop' },
] as const;

export function findTexasHorseRacingInstitution(slug: string) {
  return TEXAS_HORSE_RACING_INSTITUTIONS.find((item) => item.slug === slug);
}
