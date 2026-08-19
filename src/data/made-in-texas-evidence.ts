export interface MadeInTexasEvidence {
  entryName: string;
  claim: string;
  sourceLabel: string;
  sourceUrl: string;
  checkedAt: string;
}

/** Manufacturer and first-party evidence for the highest-confidence production claims. */
export const MADE_IN_TEXAS_EVIDENCE: MadeInTexasEvidence[] = [
  {
    entryName: 'Blue Bell Creameries',
    claim: 'Blue Bell operates an ice-cream production facility in Brenham, Texas.',
    sourceLabel: 'Blue Bell Creameries',
    sourceUrl: 'https://www.bluebell.com/visit-blue-bell/',
    checkedAt: '2026-08-19',
  },
  {
    entryName: 'Toyota Motor Manufacturing Texas',
    claim: 'Toyota assembles the Tundra and Sequoia at Toyota Motor Manufacturing Texas in San Antonio.',
    sourceLabel: 'Toyota USA Newsroom',
    sourceUrl: 'https://pressroom.toyota.com/facility/toyota-motor-manufacturing-texas/',
    checkedAt: '2026-08-19',
  },
  {
    entryName: 'Peterbilt',
    claim: 'Peterbilt operates its truck manufacturing plant in Denton, Texas.',
    sourceLabel: 'Peterbilt',
    sourceUrl: 'https://www.peterbilt.com/news-and-events/blog/here-for-you-leon-handt-enduring-craftsmanship',
    checkedAt: '2026-08-19',
  },
  {
    entryName: 'Resistol',
    claim: 'Resistol says straw hat bodies are blocked, lacquered, shaped and finished at its Garland, Texas factory.',
    sourceLabel: 'Resistol',
    sourceUrl: 'https://resistol.com/products/20x-latigo-cowboy-hat',
    checkedAt: '2026-08-19',
  },
];

export function evidenceForMadeInTexasEntry(entryName: string) {
  return MADE_IN_TEXAS_EVIDENCE.find((item) => item.entryName === entryName);
}
