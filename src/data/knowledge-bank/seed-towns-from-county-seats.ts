import { TEXAS_COUNTY_FACTS_BATCH1 } from './seed-counties-batch1';
import { TEXAS_COUNTY_FACTS_BATCH2 } from './seed-counties-batch2';
import { TEXAS_COUNTY_FACTS_BATCH3 } from './seed-counties-batch3';
import { TEXAS_COUNTY_FACTS_BATCH4 } from './seed-counties-batch4';
import { TEXAS_COUNTY_FACTS_BATCH5 } from './seed-counties-batch5';
import { TEXAS_COUNTY_FACTS_BATCH6 } from './seed-counties-batch6';
import { TEXAS_COUNTY_FACTS_BATCH7 } from './seed-counties-batch7';
import { TEXAS_COUNTY_FACTS_BATCH8 } from './seed-counties-batch8';
import { TEXAS_COUNTY_FACTS_BATCH9 } from './seed-counties-batch9';
import type { TexasKnowledgeRecord } from './types';

const COUNTY_SEAT_PATTERN = /^The county seat of (.+ County) is (.+)\.$/;

const slugify = (value: string) => value
  .toLowerCase()
  .normalize('NFKD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

const COUNTY_SEAT_FACTS: readonly TexasKnowledgeRecord[] = [
  ...TEXAS_COUNTY_FACTS_BATCH1,
  ...TEXAS_COUNTY_FACTS_BATCH2,
  ...TEXAS_COUNTY_FACTS_BATCH3,
  ...TEXAS_COUNTY_FACTS_BATCH4,
  ...TEXAS_COUNTY_FACTS_BATCH5,
  ...TEXAS_COUNTY_FACTS_BATCH6,
  ...TEXAS_COUNTY_FACTS_BATCH7,
  ...TEXAS_COUNTY_FACTS_BATCH8,
  ...TEXAS_COUNTY_FACTS_BATCH9,
];

function reciprocalTownFact(record: TexasKnowledgeRecord): TexasKnowledgeRecord {
  const match = record.statement.match(COUNTY_SEAT_PATTERN);
  if (!match || !record.countySlug) {
    throw new Error(`County-seat record ${record.id} cannot produce a reciprocal town fact.`);
  }

  const [, countyName, seatName] = match;
  const townSlug = slugify(seatName);
  if (!townSlug) throw new Error(`County-seat record ${record.id} produced an empty town slug.`);

  return {
    id: `town-${townSlug}-county-seat-${record.countySlug}`,
    kind: 'town-fact',
    domain: 'towns',
    subject: seatName,
    statement: `${seatName} is the county seat of ${countyName}.`,
    explanation: `This is the reciprocal place-oriented form of the verified county-seat fact for ${countyName}.`,
    countySlug: record.countySlug,
    townSlug,
    tags: ['county-seat', 'texas-towns', 'texas-cities', record.countySlug, townSlug],
    sources: record.sources,
    verification: record.verification,
    verifiedAt: record.verifiedAt,
    temporalScope: record.temporalScope ?? 'evergreen',
    evergreen: record.evergreen,
    socialReady: record.socialReady,
    relatedEntityIds: [`county:${record.countySlug}`],
    socialFormats: ['town-of-the-day', 'fact-of-the-day', 'texas-trivia'],
    usage: { timesUsed: 0 },
  };
}

/**
 * Reciprocal town/place facts derived from the canonical TSLAC-backed county
 * seat corpus. They intentionally do not expose `articlePath`: TexasDefined's
 * static city entities are still pending source verification, so social posts
 * must not link to a city route until that entity is independently index-ready.
 */
export const TEXAS_TOWN_COUNTY_SEAT_FACTS: readonly TexasKnowledgeRecord[] = COUNTY_SEAT_FACTS.map(reciprocalTownFact);
