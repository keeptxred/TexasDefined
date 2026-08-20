import type { TexasKnowledgeRecord } from './types';

export type KnowledgeBankValidation = {
  valid: boolean;
  errors: string[];
  warnings: string[];
  counts: {
    records: number;
    verified: number;
    observations: number;
    socialReady: number;
    sourceBacked: number;
  };
};

export function validateKnowledgeBank(records: TexasKnowledgeRecord[]): KnowledgeBankValidation {
  const errors: string[] = [];
  const warnings: string[] = [];
  const ids = new Set<string>();

  for (const record of records) {
    if (!record.id.trim()) errors.push('Knowledge records require an ID.');
    if (ids.has(record.id)) errors.push(`Duplicate knowledge record ID: ${record.id}`);
    ids.add(record.id);

    if (!record.statement.trim()) errors.push(`${record.id} requires a statement.`);
    if (record.verification === 'verified' && !record.sources.length) {
      errors.push(`${record.id} is marked verified but has no source.`);
    }
    if (record.verification === 'verified' && !record.verifiedAt) {
      errors.push(`${record.id} is marked verified but has no verifiedAt date.`);
    }
    if (record.verification === 'editorial-observation' && record.sources.length) {
      warnings.push(`${record.id} is an editorial observation but also has factual sources; confirm classification.`);
    }
    if (record.socialReady && !(record.socialFormats?.length)) {
      errors.push(`${record.id} is social-ready but has no approved social formats.`);
    }
    if (record.verification === 'needs-review' && record.socialReady) {
      errors.push(`${record.id} needs review and must not be social-ready.`);
    }
    for (const source of record.sources) {
      if (!source.url.startsWith('https://')) errors.push(`${record.id} source ${source.sourceId} must use HTTPS.`);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(source.checkedAt)) warnings.push(`${record.id} source ${source.sourceId} has a non-ISO checkedAt date.`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    counts: {
      records: records.length,
      verified: records.filter((record) => record.verification === 'verified').length,
      observations: records.filter((record) => record.verification === 'editorial-observation').length,
      socialReady: records.filter((record) => record.socialReady).length,
      sourceBacked: records.filter((record) => record.sources.length > 0).length,
    },
  };
}
