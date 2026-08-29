import { TEXAS_COUNTY_FACTS_BATCH1 } from './seed-counties-batch1';
import { TEXAS_COUNTY_FACTS_BATCH2 } from './seed-counties-batch2';
import { TEXAS_COUNTY_FACTS_BATCH3 } from './seed-counties-batch3';
import { TEXAS_COUNTY_FACTS_BATCH4 } from './seed-counties-batch4';
import { TEXAS_COUNTY_FACTS_BATCH5 } from './seed-counties-batch5';
import { TEXAS_COUNTY_FACTS_BATCH6 } from './seed-counties-batch6';
import { TEXAS_COUNTY_FACTS_BATCH7 } from './seed-counties-batch7';
import { TEXAS_COUNTY_FACTS_BATCH8 } from './seed-counties-batch8';
import { TEXAS_COUNTY_FACTS_BATCH9 } from './seed-counties-batch9';
import { TEXAS_TOWN_COUNTY_SEAT_FACTS } from './seed-towns-from-county-seats';
import { TEXAS_CULTURAL_OBSERVATIONS_BATCH2 } from './cultural-observations-batch2';
import { TEXAS_CULTURAL_OBSERVATIONS } from './cultural-observations';
import { TEXAS_KNOWLEDGE_EXPANDED_SEED } from './seed-expanded';
import { TEXAS_KNOWLEDGE_VERIFIED_BATCH2 } from './seed-verified-batch2';
import { TEXAS_KNOWLEDGE_VERIFIED_BATCH3 } from './seed-verified-batch3';
import { TEXAS_KNOWLEDGE_VERIFIED_BATCH4 } from './seed-verified-batch4';
import { TEXAS_KNOWLEDGE_SEED } from './seed';
import type { TexasKnowledgeDomain, TexasKnowledgeRecord } from './types';

/**
 * Canonical in-repository Knowledge Bank catalog.
 *
 * Keep candidate generation pointed at this aggregate rather than at an
 * individual seed file so verified facts and editorial observations rotate
 * through the same deduplication/usage system. This module does not publish
 * anything; it only exposes records to downstream draft/candidate tooling.
 */
export const TEXAS_KNOWLEDGE_CATALOG: readonly TexasKnowledgeRecord[] = [
  ...TEXAS_KNOWLEDGE_SEED,
  ...TEXAS_KNOWLEDGE_EXPANDED_SEED,
  ...TEXAS_KNOWLEDGE_VERIFIED_BATCH2,
  ...TEXAS_KNOWLEDGE_VERIFIED_BATCH3,
  ...TEXAS_KNOWLEDGE_VERIFIED_BATCH4,
  ...TEXAS_COUNTY_FACTS_BATCH1,
  ...TEXAS_COUNTY_FACTS_BATCH2,
  ...TEXAS_COUNTY_FACTS_BATCH3,
  ...TEXAS_COUNTY_FACTS_BATCH4,
  ...TEXAS_COUNTY_FACTS_BATCH5,
  ...TEXAS_COUNTY_FACTS_BATCH6,
  ...TEXAS_COUNTY_FACTS_BATCH7,
  ...TEXAS_COUNTY_FACTS_BATCH8,
  ...TEXAS_COUNTY_FACTS_BATCH9,
  ...TEXAS_TOWN_COUNTY_SEAT_FACTS,
  ...TEXAS_CULTURAL_OBSERVATIONS,
  ...TEXAS_CULTURAL_OBSERVATIONS_BATCH2,
];

export function texasKnowledgeByDomain(domain: TexasKnowledgeDomain): TexasKnowledgeRecord[] {
  return TEXAS_KNOWLEDGE_CATALOG.filter((record) => record.domain === domain);
}

export function texasKnowledgeByVerification(
  verification: TexasKnowledgeRecord['verification'],
): TexasKnowledgeRecord[] {
  return TEXAS_KNOWLEDGE_CATALOG.filter((record) => record.verification === verification);
}

export function texasKnowledgeByCountySlug(countySlug: string): TexasKnowledgeRecord[] {
  return TEXAS_KNOWLEDGE_CATALOG.filter((record) => record.countySlug === countySlug);
}

export function texasKnowledgeByTownSlug(townSlug: string): TexasKnowledgeRecord[] {
  return TEXAS_KNOWLEDGE_CATALOG.filter((record) => record.townSlug === townSlug);
}

export function texasCountySeatFactBySlug(countySlug: string): TexasKnowledgeRecord | undefined {
  return TEXAS_KNOWLEDGE_CATALOG.find(
    (record) => record.kind === 'county-fact' && record.countySlug === countySlug && record.tags.includes('county-seat'),
  );
}

export function texasTownCountySeatFactBySlug(townSlug: string): TexasKnowledgeRecord | undefined {
  return TEXAS_KNOWLEDGE_CATALOG.find(
    (record) => record.kind === 'town-fact' && record.townSlug === townSlug && record.tags.includes('county-seat'),
  );
}

export function texasKnowledgeNeedsReview(): TexasKnowledgeRecord[] {
  return texasKnowledgeByVerification('needs-review');
}

export function texasKnowledgeDueForReview(asOfDate = new Date().toISOString().slice(0, 10)): TexasKnowledgeRecord[] {
  return TEXAS_KNOWLEDGE_CATALOG.filter(
    (record) =>
      Boolean(record.reviewBy && record.reviewBy < asOfDate) ||
      Boolean(record.validThrough && record.validThrough < asOfDate),
  );
}

export function texasKnowledgeWithPlannedArticles(): TexasKnowledgeRecord[] {
  return TEXAS_KNOWLEDGE_CATALOG.filter((record) => Boolean(record.plannedArticlePath));
}

export function texasKnowledgeWithLiveArticles(): TexasKnowledgeRecord[] {
  return TEXAS_KNOWLEDGE_CATALOG.filter((record) => Boolean(record.articlePath));
}

export function texasSocialCandidateRecords(
  asOfDate = new Date().toISOString().slice(0, 10),
): TexasKnowledgeRecord[] {
  return TEXAS_KNOWLEDGE_CATALOG.filter(
    (record) =>
      record.socialReady === true &&
      record.verification !== 'needs-review' &&
      Boolean(record.socialFormats?.length) &&
      !(record.reviewBy && record.reviewBy < asOfDate) &&
      !(record.validThrough && record.validThrough < asOfDate),
  );
}

export function texasKnowledgeRecordById(id: string): TexasKnowledgeRecord | undefined {
  return TEXAS_KNOWLEDGE_CATALOG.find((record) => record.id === id);
}
