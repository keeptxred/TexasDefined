import type { TexasKnowledgeRecord } from './types';

const checkedAt = '2026-08-29';
const tpwd = (url: string) => ({
  sourceId: 'tpwd-wildlife',
  url,
  authority: 'Texas Parks and Wildlife Department',
  checkedAt,
});

export const TEXAS_KNOWLEDGE_VERIFIED_BATCH5: TexasKnowledgeRecord[] = [
  {
    id: 'birds-ruby-throat-texas-coast-migration',
    kind: 'verified-fact', domain: 'birds', subject: 'Ruby-throated hummingbirds',
    statement: 'Ruby-throated hummingbirds migrate through Texas in large numbers in fall and can concentrate along the coast before crossing the Gulf of Mexico.',
    tags: ['ruby-throated-hummingbird', 'migration', 'gulf-coast', 'fall'],
    sources: [tpwd('https://tpwd.texas.gov/huntwild/wild/species/rubythhummingbird/')],
    verification: 'verified', verifiedAt: checkedAt, temporalScope: 'evergreen', evergreen: true, socialReady: true,
    season: 'fall', plannedArticlePath: '/texas-birds-guide', imageQuery: 'ruby-throated hummingbird Texas',
    socialFormats: ['fact-of-the-day', 'wildlife-of-the-day', 'texas-trivia'], usage: { timesUsed: 0 },
  },
  {
    id: 'birds-black-chinned-west-texas',
    kind: 'verified-fact', domain: 'birds', subject: 'Black-chinned hummingbirds',
    statement: 'Black-chinned hummingbirds are relatively common spring and summer residents in the western half of Texas.',
    tags: ['black-chinned-hummingbird', 'west-texas', 'spring', 'summer'],
    sources: [tpwd('https://tpwd.texas.gov/huntwild/wild/species/blackhum/')],
    verification: 'verified', verifiedAt: checkedAt, temporalScope: 'evergreen', evergreen: true, socialReady: true,
    season: 'summer', plannedArticlePath: '/texas-birds-guide', imageQuery: 'black-chinned hummingbird Texas',
    socialFormats: ['fact-of-the-day', 'wildlife-of-the-day', 'texas-trivia'], usage: { timesUsed: 0 },
  },
  {
    id: 'birds-scissor-tail-texas-breeding',
    kind: 'verified-fact', domain: 'birds', subject: 'Scissor-tailed flycatchers',
    statement: 'Scissor-tailed flycatchers breed in Texas and neighboring parts of the southern Great Plains, then winter south of the United States.',
    tags: ['scissor-tailed-flycatcher', 'breeding', 'migration', 'open-country'],
    sources: [tpwd('https://tpwd.texas.gov/huntwild/wild/species/scissorfly/')],
    verification: 'verified', verifiedAt: checkedAt, temporalScope: 'evergreen', evergreen: true, socialReady: true,
    season: 'summer', plannedArticlePath: '/texas-birds-guide', imageQuery: 'scissor-tailed flycatcher Texas',
    socialFormats: ['fact-of-the-day', 'wildlife-of-the-day', 'texas-trivia'], usage: { timesUsed: 0 },
  },
  {
    id: 'birds-painted-bunting-summer-texas',
    kind: 'verified-fact', domain: 'birds', subject: 'Painted buntings',
    statement: 'Painted buntings are common summer residents in much of Texas, although their preference for dense cover can make them easy to overlook.',
    tags: ['painted-bunting', 'summer', 'brush', 'birding'],
    sources: [tpwd('https://tpwd.texas.gov/huntwild/wild/species/paintedbunting/')],
    verification: 'verified', verifiedAt: checkedAt, temporalScope: 'evergreen', evergreen: true, socialReady: true,
    season: 'summer', plannedArticlePath: '/texas-birds-guide', imageQuery: 'painted bunting Texas',
    socialFormats: ['fact-of-the-day', 'wildlife-of-the-day', 'texas-trivia', 'true-or-false'], usage: { timesUsed: 0 },
  },
  {
    id: 'birds-bald-eagle-texas-year-round-roles',
    kind: 'verified-fact', domain: 'birds', subject: 'Bald eagles',
    statement: 'Bald eagles occur in Texas as breeding birds, winter residents, and spring or fall migrants depending on location and season.',
    tags: ['bald-eagle', 'raptors', 'migration', 'winter', 'breeding'],
    sources: [tpwd('https://tpwd.texas.gov/huntwild/wild/species/baldeagle/')],
    verification: 'verified', verifiedAt: checkedAt, temporalScope: 'evergreen', evergreen: true, socialReady: true,
    plannedArticlePath: '/texas-birds-guide', imageQuery: 'bald eagle Texas lake',
    socialFormats: ['fact-of-the-day', 'wildlife-of-the-day', 'texas-trivia'], usage: { timesUsed: 0 },
  },
  {
    id: 'birds-trans-gulf-migration-route',
    kind: 'verified-fact', domain: 'birds', subject: 'Trans-Gulf bird migration',
    statement: 'TPWD uses “trans-Gulf migrants” for bird species that cross the Gulf of Mexico between the Yucatán Peninsula and the U.S. Gulf Coast, including Texas.',
    tags: ['bird-migration', 'gulf-of-mexico', 'texas-coast', 'trans-gulf'],
    sources: [tpwd('https://tpwd.texas.gov/huntwild/wild/birding/migration/transgulf_migrants/')],
    verification: 'verified', verifiedAt: checkedAt, temporalScope: 'evergreen', evergreen: true, socialReady: true,
    plannedArticlePath: '/texas-birds-guide', imageQuery: 'migratory birds Texas Gulf Coast',
    socialFormats: ['fact-of-the-day', 'texas-trivia', 'true-or-false'], usage: { timesUsed: 0 },
  },
];
