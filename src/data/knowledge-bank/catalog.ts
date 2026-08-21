import { TEXAS_CULTURAL_OBSERVATIONS } from './cultural-observations';
import { TEXAS_KNOWLEDGE_EXPANDED_SEED } from './seed-expanded';
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
  ...TEXAS_CULTURAL_OBSERVATIONS,
];

export function texasKnowledgeByDomain(domain: TexasKnowledgeDomain): TexasKnowledgeRecord[] {
  return TEXAS_KNOWLEDGE_CATALOG.filter((record) => record.domain === domain);
}

export function texasSocialCandidateRecords(): TexasKnowledgeRecord[] {
  return TEXAS_KNOWLEDGE_CATALOG.filter(
    (record) =>
      record.socialReady === true &&
      record.verification !== 'needs-review' &&
      Boolean(record.socialFormats?.length),
  );
}

export function texasKnowledgeRecordById(id: string): TexasKnowledgeRecord | undefined {
  return TEXAS_KNOWLEDGE_CATALOG.find((record) => record.id === id);
}
