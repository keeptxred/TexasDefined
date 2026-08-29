import type { TexasKnowledgeRecord } from './types';

const checkedAt = '2026-08-29';
const tpwd = (url: string) => ({
  sourceId: 'tpwd-wildlife',
  url,
  authority: 'Texas Parks and Wildlife Department',
  checkedAt,
});

export const TEXAS_KNOWLEDGE_VERIFIED_BATCH6: TexasKnowledgeRecord[] = [
  {
    id: 'snakes-copperhead-three-texas-ranges',
    kind: 'verified-fact', domain: 'snakes', subject: 'Copperheads',
    statement: 'Texas has three copperhead subspecies with populations documented in eastern Texas, parts of central and western Texas, and the southern Trans-Pecos.',
    tags: ['copperhead', 'venomous-snakes', 'range', 'texas'],
    sources: [tpwd('https://tpwd.texas.gov/education/resources/texas-junior-naturalists/be-nature-safe/venomous-snake-safety')],
    verification: 'verified', verifiedAt: checkedAt, temporalScope: 'evergreen', evergreen: true, socialReady: true,
    plannedArticlePath: '/texas-snakes-guide', imageQuery: 'copperhead snake Texas',
    socialFormats: ['fact-of-the-day', 'texas-trivia', 'true-or-false'], usage: { timesUsed: 0 },
  },
  {
    id: 'snakes-cottonmouth-eastern-texas-waterways',
    kind: 'verified-fact', domain: 'snakes', subject: 'Cottonmouths',
    statement: 'Texas cottonmouths are semi-aquatic pit vipers found mainly across the eastern half of the state around swamps, marshes, rivers, ponds, streams and other waterways.',
    tags: ['cottonmouth', 'water-moccasin', 'venomous-snakes', 'east-texas', 'wetlands'],
    sources: [tpwd('https://tpwd.texas.gov/education/hunter-education/online-course/preparation-and-survival/snakes')],
    verification: 'verified', verifiedAt: checkedAt, temporalScope: 'evergreen', evergreen: true, socialReady: true,
    plannedArticlePath: '/texas-snakes-guide', imageQuery: 'cottonmouth Texas wetland',
    socialFormats: ['fact-of-the-day', 'texas-trivia', 'true-or-false'], usage: { timesUsed: 0 },
  },
  {
    id: 'snakes-prairie-rattlesnake-western-third',
    kind: 'verified-fact', domain: 'snakes', subject: 'Prairie rattlesnakes',
    statement: 'Prairie rattlesnakes occur in grassy plains across the western third of Texas.',
    tags: ['prairie-rattlesnake', 'rattlesnake', 'venomous-snakes', 'west-texas'],
    sources: [tpwd('https://tpwd.texas.gov/education/resources/texas-junior-naturalists/be-nature-safe/venomous-snake-safety')],
    verification: 'verified', verifiedAt: checkedAt, temporalScope: 'evergreen', evergreen: true, socialReady: true,
    plannedArticlePath: '/texas-snakes-guide', imageQuery: 'prairie rattlesnake West Texas',
    socialFormats: ['fact-of-the-day', 'texas-trivia'], usage: { timesUsed: 0 },
  },
  {
    id: 'snakes-coral-southeastern-half-texas',
    kind: 'verified-fact', domain: 'snakes', subject: 'Texas coral snakes',
    statement: 'Texas coral snakes occur across the southeastern half of the state in habitats including woodlands, canyons and coastal plains.',
    tags: ['coral-snake', 'venomous-snakes', 'east-texas', 'coastal-plains'],
    sources: [tpwd('https://tpwd.texas.gov/education/resources/texas-junior-naturalists/be-nature-safe/venomous-snake-safety')],
    verification: 'verified', verifiedAt: checkedAt, temporalScope: 'evergreen', evergreen: true, socialReady: true,
    plannedArticlePath: '/texas-snakes-guide', imageQuery: 'Texas coral snake',
    socialFormats: ['fact-of-the-day', 'texas-trivia', 'true-or-false'], usage: { timesUsed: 0 },
  },
  {
    id: 'snakes-give-space-retreat',
    kind: 'verified-fact', domain: 'snakes', subject: 'Safe snake encounters',
    statement: 'TPWD advises giving snakes room to retreat rather than trying to handle, corner or kill them; snakes usually escape if given the opportunity.',
    tags: ['snake-safety', 'encounter-guidance', 'outdoors', 'yards'],
    sources: [tpwd('https://tpwd.texas.gov/education/hunter-education/online-course/preparation-and-survival/snakes')],
    verification: 'verified', verifiedAt: checkedAt, temporalScope: 'evergreen', evergreen: true, socialReady: true,
    plannedArticlePath: '/texas-snakes-guide',
    socialFormats: ['fact-of-the-day', 'true-or-false'], usage: { timesUsed: 0 },
  },
];
