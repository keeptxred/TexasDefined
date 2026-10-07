import { TEXAS_COUNTY_FACTS_BATCH1 } from './knowledge-bank/seed-counties-batch1';
import { TEXAS_COUNTY_FACTS_BATCH2 } from './knowledge-bank/seed-counties-batch2';
import { TEXAS_COUNTY_FACTS_BATCH3 } from './knowledge-bank/seed-counties-batch3';
import { TEXAS_COUNTY_FACTS_BATCH4 } from './knowledge-bank/seed-counties-batch4';
import { TEXAS_COUNTY_FACTS_BATCH5 } from './knowledge-bank/seed-counties-batch5';
import { TEXAS_COUNTY_FACTS_BATCH6 } from './knowledge-bank/seed-counties-batch6';
import { TEXAS_COUNTY_FACTS_BATCH7 } from './knowledge-bank/seed-counties-batch7';
import { TEXAS_COUNTY_FACTS_BATCH8 } from './knowledge-bank/seed-counties-batch8';
import { TEXAS_COUNTY_FACTS_BATCH9 } from './knowledge-bank/seed-counties-batch9';

const COUNTY_SEAT_FACTS = [
  ...TEXAS_COUNTY_FACTS_BATCH1,
  ...TEXAS_COUNTY_FACTS_BATCH2,
  ...TEXAS_COUNTY_FACTS_BATCH3,
  ...TEXAS_COUNTY_FACTS_BATCH4,
  ...TEXAS_COUNTY_FACTS_BATCH5,
  ...TEXAS_COUNTY_FACTS_BATCH6,
  ...TEXAS_COUNTY_FACTS_BATCH7,
  ...TEXAS_COUNTY_FACTS_BATCH8,
  ...TEXAS_COUNTY_FACTS_BATCH9,
].filter((record) =>
  record.kind === 'county-fact'
  && record.verification === 'verified'
  && record.countySlug
  && record.tags.includes('county-seat'),
);

const COUNTY_SEAT_BY_SLUG = new Map(
  COUNTY_SEAT_FACTS.map((record) => {
    const match = record.statement.match(/\bis\s+(.+?)\.$/i);
    const name = match?.[1]?.trim();
    if (!record.countySlug || !name) throw new Error(`Invalid verified county-seat fact: ${record.id}`);
    return [record.countySlug, {
      name,
      sourceUrl: record.sources[0]?.url ?? 'https://www.tsl.texas.gov/ref/abouttx/countyseats.html',
      verifiedAt: record.verifiedAt,
    }] as const;
  }),
);

if (COUNTY_SEAT_BY_SLUG.size !== 254) {
  throw new Error(`Expected 254 verified county-seat facts; found ${COUNTY_SEAT_BY_SLUG.size}`);
}

export function verifiedCountySeatBySlug(countySlug: string) {
  return COUNTY_SEAT_BY_SLUG.get(countySlug);
}

export function verifiedCountySeatCount() {
  return COUNTY_SEAT_BY_SLUG.size;
}
