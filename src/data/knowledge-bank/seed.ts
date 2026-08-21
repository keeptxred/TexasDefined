import type { TexasKnowledgeRecord } from './types';

const checkedAt = '2026-08-20';

const officialSource = (sourceId: string, authority: string, url: string) => ({ sourceId, authority, url, checkedAt });

export const TEXAS_KNOWLEDGE_SEED: TexasKnowledgeRecord[] = [
  {
    id: 'culture-distance-in-hours', kind: 'cultural-observation', domain: 'culture', subject: 'Texas distance',
    statement: 'Texans often describe long drives in hours instead of miles.',
    explanation: 'This is an editorial cultural observation, not a measurable statewide rule.',
    tags: ['driving','road-trips','texas-culture'], sources: [], verification: 'editorial-observation', evergreen: true, socialReady: true,
    socialFormats: ['you-know-youre-a-texan-if','only-texans-understand','finish-the-sentence'], usage: { timesUsed: 0 },
  },
  {
    id: 'culture-shade-parking', kind: 'cultural-observation', domain: 'culture', subject: 'Texas heat',
    statement: 'In a Texas summer, a shaded parking spot can feel more valuable than a closer parking spot.',
    tags: ['summer','heat','driving'], sources: [], verification: 'editorial-observation', season: 'summer', evergreen: true, socialReady: true,
    socialFormats: ['you-know-youre-a-texan-if','only-texans-understand','tag-a-texan'], usage: { timesUsed: 0 },
  },
  {
    id: 'culture-heater-ac-same-day', kind: 'cultural-observation', domain: 'weather', subject: 'Texas weather swings',
    statement: 'Some Texas weather days can make both the heater and air conditioner feel useful before bedtime.',
    tags: ['weather','temperature-swings'], sources: [], verification: 'editorial-observation', evergreen: true, socialReady: true,
    socialFormats: ['you-know-youre-a-texan-if','only-texans-understand'], usage: { timesUsed: 0 },
  },
  {
    id: 'wildlife-armadillo-nine-banded', kind: 'verified-fact', domain: 'wildlife', subject: 'Nine-banded armadillo',
    statement: 'The nine-banded armadillo is a familiar Texas mammal and occurs across much of the state.',
    tags: ['armadillo','mammals','wildlife'],
    sources: [officialSource('tpwd-wildlife','Texas Parks and Wildlife Department','https://tpwd.texas.gov/huntwild/wild/species/')],
    verification: 'verified', verifiedAt: checkedAt, evergreen: true, socialReady: true, imageQuery: 'nine-banded armadillo Texas',
    socialFormats: ['fact-of-the-day','wildlife-of-the-day','texas-trivia'], usage: { timesUsed: 0 },
  },
  {
    id: 'wildlife-coyote-distance', kind: 'verified-fact', domain: 'wildlife', subject: 'Coyotes',
    statement: 'People should avoid feeding coyotes and should keep a safe distance from them.',
    tags: ['coyotes','encounter-safety','wildlife'],
    sources: [officialSource('tpwd-wildlife','Texas Parks and Wildlife Department','https://tpwd.texas.gov/huntwild/wild/species/')],
    verification: 'verified', verifiedAt: checkedAt, evergreen: true, socialReady: true, imageQuery: 'coyote Texas wildlife',
    socialFormats: ['fact-of-the-day','wildlife-of-the-day'], usage: { timesUsed: 0 },
  },
  {
    id: 'snakes-venomous-awareness', kind: 'verified-fact', domain: 'snakes', subject: 'Texas snakes',
    statement: 'Texas is home to both venomous and nonvenomous snake species, so identification and distance are safer than handling an unknown snake.',
    tags: ['snakes','safety','identification'],
    sources: [officialSource('tpwd-wildlife','Texas Parks and Wildlife Department','https://tpwd.texas.gov/huntwild/wild/species/')],
    verification: 'verified', verifiedAt: checkedAt, evergreen: true, socialReady: true, imageQuery: 'Texas snake habitat',
    socialFormats: ['fact-of-the-day','texas-trivia'], usage: { timesUsed: 0 },
  },
  {
    id: 'flowers-bluebonnet-state-flower', kind: 'verified-fact', domain: 'flowers', subject: 'Bluebonnets',
    statement: 'Bluebonnets are the state flower of Texas.',
    tags: ['bluebonnets','wildflowers','state-symbols'],
    sources: [officialSource('tslac','Texas State Library and Archives Commission','https://www.tsl.texas.gov/ref/abouttx/symbols.html')],
    verification: 'verified', verifiedAt: checkedAt, season: 'spring', evergreen: true, socialReady: true, imageQuery: 'Texas bluebonnet field spring',
    socialFormats: ['fact-of-the-day','wildflower-of-the-day','texas-trivia'], usage: { timesUsed: 0 },
  },
  {
    id: 'birds-ebird-observations', kind: 'verified-fact', domain: 'birds', subject: 'Texas bird observations',
    statement: 'Recent bird observations can be used to add seasonal context to Texas bird guides when sourced from eBird.',
    tags: ['birds','birding','seasonality','data'],
    sources: [officialSource('ebird','Cornell Lab of Ornithology eBird','https://ebird.org/home')],
    verification: 'verified', verifiedAt: checkedAt, evergreen: true, socialReady: false,
  },
  {
    id: 'hurricane-local-alerts', kind: 'verified-fact', domain: 'hurricanes', subject: 'Hurricane preparedness',
    statement: 'Texas hurricane preparation should include following official National Weather Service and local emergency-management alerts for the area at risk.',
    tags: ['hurricane','preparedness','weather','gulf-coast'],
    sources: [officialSource('nws-hurricanes','National Weather Service','https://www.weather.gov/safety/hurricane')],
    verification: 'verified', verifiedAt: checkedAt, season: 'storm-season', evergreen: true, socialReady: true,
    socialFormats: ['fact-of-the-day'], usage: { timesUsed: 0 },
  },
  {
    id: 'pools-freeze-protect-equipment', kind: 'verified-fact', domain: 'pools', subject: 'Pool freeze preparation',
    statement: 'Pool freeze preparation should focus on protecting exposed plumbing and equipment according to the equipment manufacturer and local conditions.',
    tags: ['pool','freeze','winter','home-maintenance'],
    sources: [], verification: 'needs-review', season: 'winter', evergreen: true, socialReady: false,
  },
  {
    id: 'pests-fire-ants', kind: 'verified-fact', domain: 'pests', subject: 'Fire ants',
    statement: 'Imported fire ants are established in much of Texas and are an important household, yard, agricultural and public-health pest.',
    tags: ['fire-ants','pests','yard'],
    sources: [officialSource('texas-am-fire-ants','Texas A&M AgriLife Extension','https://fireant.tamu.edu/')],
    verification: 'verified', verifiedAt: checkedAt, evergreen: true, socialReady: true, imageQuery: 'Texas fire ant mound',
    socialFormats: ['fact-of-the-day','texas-trivia'], usage: { timesUsed: 0 },
  },
];

export function knowledgeByDomain(domain: TexasKnowledgeRecord['domain']) {
  return TEXAS_KNOWLEDGE_SEED.filter((record) => record.domain === domain);
}

export function socialReadyKnowledge() {
  return TEXAS_KNOWLEDGE_SEED.filter((record) => record.socialReady);
}
