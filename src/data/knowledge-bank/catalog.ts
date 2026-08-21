import { TEXAS_CULTURAL_OBSERVATIONS_BATCH2 } from './cultural-observations-batch2';
import { TEXAS_CULTURAL_OBSERVATIONS } from './cultural-observations';
import { TEXAS_KNOWLEDGE_EXPANDED_SEED } from './seed-expanded';
import { TEXAS_KNOWLEDGE_VERIFIED_BATCH2 } from './seed-verified-batch2';
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
