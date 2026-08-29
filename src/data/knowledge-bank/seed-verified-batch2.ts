import type { TexasKnowledgeRecord } from './types';

const checkedAt = '2026-08-20';
const tpwd = (url: string) => ({
  sourceId: 'tpwd-wildlife',
  url,
  authority: 'Texas Parks and Wildlife Department',
  checkedAt,
});

const articlePath = '/article/texas-wildlife-guide';

export const TEXAS_KNOWLEDGE_VERIFIED_BATCH2: TexasKnowledgeRecord[] = [
  {
    id: 'wildlife-bobcat-statewide', kind: 'verified-fact', domain: 'wildlife', subject: 'Bobcats',
    statement: 'Bobcats are distributed throughout Texas and use a wide range of habitats.',
    tags: ['bobcat','wildlife','statewide'], sources: [tpwd('https://tpwd.texas.gov/huntwild/wild/species/bobcat/')],
    verification: 'verified', verifiedAt: checkedAt, temporalScope: 'evergreen', evergreen: true, socialReady: true,
    articlePath, imageQuery: 'bobcat Texas habitat', socialFormats: ['fact-of-the-day','wildlife-of-the-day','texas-trivia'], usage: { timesUsed: 0 },
  },
  {
    id: 'wildlife-bobcat-mostly-night', kind: 'verified-fact', domain: 'wildlife', subject: 'Bobcats',
    statement: 'Bobcats are reclusive and largely active at night, although they may begin hunting before sundown.',
    tags: ['bobcat','nocturnal','wildlife'], sources: [tpwd('https://tpwd.texas.gov/huntwild/wild/species/bobcat/')],
    verification: 'verified', verifiedAt: checkedAt, temporalScope: 'evergreen', evergreen: true, socialReady: true,
    articlePath, imageQuery: 'bobcat Texas', socialFormats: ['fact-of-the-day','wildlife-of-the-day','true-or-false'], usage: { timesUsed: 0 },
  },
  {
    id: 'wildlife-black-bear-threatened', kind: 'verified-fact', domain: 'wildlife', subject: 'Black bears',
    statement: 'Black bears are listed as a state-threatened species in Texas and are protected from hunting or killing.',
    tags: ['black-bear','protected-species','west-texas'], sources: [tpwd('https://tpwd.texas.gov/regulations/outdoor-annual/hunting/nongame-and-other-species/')],
    verification: 'verified', verifiedAt: checkedAt, temporalScope: 'current-rule', reviewBy: '2027-08-01', evergreen: false, socialReady: true,
    articlePath, imageQuery: 'black bear West Texas', socialFormats: ['fact-of-the-day','wildlife-of-the-day','true-or-false','texas-trivia'], usage: { timesUsed: 0 },
  },
  {
    id: 'wildlife-black-bear-west-texas', kind: 'verified-fact', domain: 'wildlife', subject: 'Black bears',
    statement: 'Texas black bears are found primarily in scattered West Texas mountain habitats, including the Chisos and Guadalupe Mountains.',
    tags: ['black-bear','west-texas','mountains'], sources: [tpwd('https://tpwd.texas.gov/huntwild/wild/species/index.phtml?o=blackbear')],
    verification: 'verified', verifiedAt: checkedAt, temporalScope: 'evergreen', evergreen: true, socialReady: true,
    articlePath, imageQuery: 'black bear Chisos Mountains Texas', socialFormats: ['fact-of-the-day','wildlife-of-the-day','texas-trivia'], usage: { timesUsed: 0 },
  },
  {
    id: 'wildlife-mountain-lion-range', kind: 'verified-fact', domain: 'wildlife', subject: 'Mountain lions',
    statement: 'In Texas, mountain lions occur throughout the Trans-Pecos and also in South Texas brushlands and portions of the Hill Country.',
    tags: ['mountain-lion','trans-pecos','south-texas','hill-country'], sources: [tpwd('https://tpwd.texas.gov/huntwild/wild/species/index.phtml?o=mlion')],
    verification: 'verified', verifiedAt: checkedAt, temporalScope: 'evergreen', evergreen: true, socialReady: true,
    articlePath, imageQuery: 'mountain lion Texas Trans-Pecos', socialFormats: ['fact-of-the-day','wildlife-of-the-day','texas-trivia'], usage: { timesUsed: 0 },
  },
  {
    id: 'wildlife-striped-skunk-statewide', kind: 'verified-fact', domain: 'wildlife', subject: 'Striped skunks',
    statement: 'Striped skunks are distributed statewide in Texas and are largely nocturnal.',
    tags: ['skunk','nocturnal','statewide'], sources: [tpwd('https://tpwd.texas.gov/huntwild/wild/species/skunk/')],
    verification: 'verified', verifiedAt: checkedAt, temporalScope: 'evergreen', evergreen: true, socialReady: true,
    articlePath, imageQuery: 'striped skunk Texas', socialFormats: ['fact-of-the-day','wildlife-of-the-day','true-or-false'], usage: { timesUsed: 0 },
  },
  {
    id: 'wildlife-opossum-range', kind: 'verified-fact', domain: 'wildlife', subject: 'Virginia opossums',
    statement: 'Virginia opossums occur across most of Texas, with exceptions including the arid Trans-Pecos and Llano Estacado of the Panhandle.',
    tags: ['opossum','wildlife','range'], sources: [tpwd('https://tpwd.texas.gov/huntwild/wild/species/oposum/')],
    verification: 'verified', verifiedAt: checkedAt, temporalScope: 'evergreen', evergreen: true, socialReady: true,
    articlePath, imageQuery: 'Virginia opossum Texas', socialFormats: ['fact-of-the-day','wildlife-of-the-day','texas-trivia'], usage: { timesUsed: 0 },
  },
  {
    id: 'wildlife-javelina-peccary-family', kind: 'verified-fact', domain: 'wildlife', subject: 'Javelinas',
    statement: 'Javelinas are collared peccaries and are not members of the true pig family.',
    tags: ['javelina','peccary','wildlife'], sources: [tpwd('https://tpwd.texas.gov/publications/nonpwdpubs/introducing_mammals/javelinas/')],
    verification: 'verified', verifiedAt: checkedAt, temporalScope: 'evergreen', evergreen: true, socialReady: true,
    articlePath, imageQuery: 'javelina collared peccary Texas', socialFormats: ['fact-of-the-day','wildlife-of-the-day','true-or-false','texas-trivia'], usage: { timesUsed: 0 },
  },
  {
    id: 'wildlife-armadillo-texas-range', kind: 'verified-fact', domain: 'wildlife', subject: 'Nine-banded armadillos',
    statement: 'Nine-banded armadillos are found across Texas except the western Trans-Pecos, according to TPWD.',
    tags: ['armadillo','range','wildlife'], sources: [tpwd('https://tpwd.texas.gov/huntwild/wild/species/dillo/')],
    verification: 'verified', verifiedAt: checkedAt, temporalScope: 'evergreen', evergreen: true, socialReady: true,
    articlePath, imageQuery: 'nine-banded armadillo Texas', socialFormats: ['fact-of-the-day','wildlife-of-the-day','texas-trivia'], usage: { timesUsed: 0 },
  },
  {
    id: 'wildlife-alligator-east-south-texas', kind: 'verified-fact', domain: 'wildlife', subject: 'American alligators',
    statement: 'American alligators have long occupied rivers, creeks and backwater sloughs in East and South Texas.',
    tags: ['alligator','east-texas','south-texas','wetlands'], sources: [tpwd('https://tpwd.texas.gov/huntwild/wild/species/alligator/safety/index.phtml')],
    verification: 'verified', verifiedAt: checkedAt, temporalScope: 'evergreen', evergreen: true, socialReady: true,
    articlePath, imageQuery: 'American alligator East Texas', socialFormats: ['fact-of-the-day','wildlife-of-the-day','texas-trivia'], usage: { timesUsed: 0 },
  },
  {
    id: 'wildlife-alligator-feeding-illegal', kind: 'verified-fact', domain: 'wildlife', subject: 'American alligators',
    statement: 'Texas law prohibits intentionally feeding a free-ranging alligator except when engaged in hunting.',
    tags: ['alligator','law','feeding-wildlife'], sources: [tpwd('https://tpwd.texas.gov/regulations/outdoor-annual/regs/animals/alligator/')],
    verification: 'verified', verifiedAt: checkedAt, temporalScope: 'current-rule', reviewBy: '2027-08-01', evergreen: false, socialReady: true,
    articlePath, imageQuery: 'American alligator Texas water', socialFormats: ['fact-of-the-day','true-or-false','texas-trivia'], usage: { timesUsed: 0 },
  },
  {
    id: 'wildlife-bat-protection', kind: 'verified-fact', domain: 'wildlife', subject: 'Bats',
    statement: 'Texas regulations generally prohibit hunting, killing, possessing, purchasing or selling bats, with limited building-related exceptions.',
    tags: ['bats','protected-wildlife','law'], sources: [tpwd('https://tpwd.texas.gov/regulations/outdoor-annual/hunting/nongame-and-other-species/')],
    verification: 'verified', verifiedAt: checkedAt, temporalScope: 'current-rule', reviewBy: '2027-08-01', evergreen: false, socialReady: true,
    articlePath, imageQuery: 'Texas bats evening', socialFormats: ['fact-of-the-day','true-or-false','texas-trivia'], usage: { timesUsed: 0 },
  },
  {
    id: 'wildlife-bat-exclusion-season', kind: 'verified-fact', domain: 'wildlife', subject: 'Bats in buildings',
    statement: 'TPWD discourages excluding bats from buildings from May 1 through August 15 because young bats may be unable to fly and can become trapped.',
    tags: ['bats','homes','wildlife-conflict'], sources: [tpwd('https://tpwd.texas.gov/regulations/outdoor-annual/hunting/nongame-and-other-species/')],
    verification: 'verified', verifiedAt: checkedAt, temporalScope: 'seasonal', reviewBy: '2027-04-01', season: 'summer', evergreen: false, socialReady: true,
    articlePath, imageQuery: 'Texas bat colony', socialFormats: ['fact-of-the-day','true-or-false'], usage: { timesUsed: 0 },
  },
];
