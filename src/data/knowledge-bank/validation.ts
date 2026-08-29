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
    timeBounded: number;
  };
};

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const isRootRelativePath = (value: string) => value.startsWith('/') && !value.includes('://');

export function validateKnowledgeBank(records: TexasKnowledgeRecord[]): KnowledgeBankValidation {
  const errors: string[] = [];
  const warnings: string[] = [];
  const ids = new Set<string>();

  for (const record of records) {
    if (!record.id.trim()) errors.push('Knowledge records require an ID.');
    if (ids.has(record.id)) errors.push(`Duplicate knowledge record ID: ${record.id}`);
    ids.add(record.id);

    if (!record.statement.trim()) errors.push(`${record.id} requires a statement.`);
    if (!record.subject.trim()) errors.push(`${record.id} requires a subject.`);
    if (!record.tags.length) warnings.push(`${record.id} has no tags for discovery or reuse.`);

    if (record.kind === 'county-fact') {
      if (!record.countySlug) errors.push(`${record.id} is a county-fact and requires countySlug.`);
      else if (!SLUG.test(record.countySlug)) errors.push(`${record.id} has an invalid countySlug.`);
    }
    if (record.kind === 'town-fact') {
      if (!record.townSlug) errors.push(`${record.id} is a town-fact and requires townSlug.`);
      else if (!SLUG.test(record.townSlug)) errors.push(`${record.id} has an invalid townSlug.`);
      if (!record.countySlug) warnings.push(`${record.id} is a town-fact with no countySlug context.`);
      else if (!SLUG.test(record.countySlug)) errors.push(`${record.id} has an invalid countySlug.`);
    }

    if (record.verification === 'verified' && !record.sources.length) errors.push(`${record.id} is marked verified but has no source.`);
    if (record.verification === 'verified' && !record.verifiedAt) errors.push(`${record.id} is marked verified but has no verifiedAt date.`);
    if (record.verification === 'verified' && record.verifiedAt && !ISO_DATE.test(record.verifiedAt)) errors.push(`${record.id} has a non-ISO verifiedAt date.`);
    if (record.verification === 'editorial-observation' && record.sources.length) warnings.push(`${record.id} is an editorial observation but also has factual sources; confirm classification.`);
    if (record.socialReady && !(record.socialFormats?.length)) errors.push(`${record.id} is social-ready but has no approved social formats.`);
    if (record.verification === 'needs-review' && record.socialReady) errors.push(`${record.id} needs review and must not be social-ready.`);

    if (record.reviewBy && !ISO_DATE.test(record.reviewBy)) errors.push(`${record.id} has a non-ISO reviewBy date.`);
    if (record.validThrough && !ISO_DATE.test(record.validThrough)) errors.push(`${record.id} has a non-ISO validThrough date.`);
    if ((record.temporalScope === 'current-rule' || record.temporalScope === 'current-data') && !record.reviewBy) {
      errors.push(`${record.id} is ${record.temporalScope} and requires reviewBy.`);
    }
    if (record.validThrough && record.verifiedAt && record.validThrough < record.verifiedAt) {
      errors.push(`${record.id} validThrough cannot precede verifiedAt.`);
    }
    if (record.reviewBy && record.verifiedAt && record.reviewBy < record.verifiedAt) {
      errors.push(`${record.id} reviewBy cannot precede verifiedAt.`);
    }
    if ((record.temporalScope === 'current-rule' || record.temporalScope === 'current-data') && record.evergreen) {
      warnings.push(`${record.id} is time-bounded but still marked evergreen; consumers must honor reviewBy/validThrough.`);
    }

    if (record.articlePath && !isRootRelativePath(record.articlePath)) errors.push(`${record.id} articlePath must be a root-relative internal path.`);
    if (record.plannedArticlePath && !isRootRelativePath(record.plannedArticlePath)) errors.push(`${record.id} plannedArticlePath must be a root-relative internal path.`);
    if (record.articlePath && record.plannedArticlePath) errors.push(`${record.id} cannot have both articlePath and plannedArticlePath.`);

    const socialFormats = record.socialFormats ?? [];
    if (new Set(socialFormats).size !== socialFormats.length) errors.push(`${record.id} has duplicate approved social formats.`);
    if (socialFormats.includes('which-one-is-more-texas')) {
      const choices = record.engagementChoices;
      if (!choices || choices.length !== 2 || choices.some((choice) => !choice.trim())) {
        errors.push(`${record.id} requires two non-empty engagementChoices for which-one-is-more-texas.`);
      } else if (choices[0].trim().toLowerCase() === choices[1].trim().toLowerCase()) {
        errors.push(`${record.id} engagementChoices must be distinct.`);
      }
    }

    const sourceIds = new Set<string>();
    for (const source of record.sources) {
      if (!source.sourceId.trim()) errors.push(`${record.id} has a source with no sourceId.`);
      if (sourceIds.has(source.sourceId)) errors.push(`${record.id} repeats source ${source.sourceId}.`);
      sourceIds.add(source.sourceId);
      if (!source.authority.trim()) errors.push(`${record.id} source ${source.sourceId} requires an authority.`);
      if (!source.url.startsWith('https://')) errors.push(`${record.id} source ${source.sourceId} must use HTTPS.`);
      if (!ISO_DATE.test(source.checkedAt)) warnings.push(`${record.id} source ${source.sourceId} has a non-ISO checkedAt date.`);
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
      timeBounded: records.filter((record) => record.temporalScope === 'current-rule' || record.temporalScope === 'current-data').length,
    },
  };
}
