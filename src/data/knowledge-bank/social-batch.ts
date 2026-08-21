import { TEXAS_KNOWLEDGE_CATALOG } from './catalog';
import { renderTexasSocialPost } from './social';
import type { TexasKnowledgeRecord, TexasSocialFormat, TexasSocialPost } from './types';

export type TexasSocialBatchOptions = {
  limit?: number;
  excludeRecordIds?: string[];
  preferredDomains?: TexasKnowledgeRecord['domain'][];
  preferredSeason?: TexasKnowledgeRecord['season'];
};

const formatPriority: TexasSocialFormat[] = [
  'you-know-youre-a-texan-if',
  'fact-of-the-day',
  'texas-trivia',
  'only-texans-understand',
  'wildlife-of-the-day',
  'wildflower-of-the-day',
  'true-or-false',
  'finish-the-sentence',
  'tag-a-texan',
  'texas-by-the-numbers',
  'county-of-the-day',
  'town-of-the-day',
  'food-fight',
  'this-or-that',
];

function scoreRecord(record: TexasKnowledgeRecord, options: TexasSocialBatchOptions) {
  let score = 0;
  score -= (record.usage?.timesUsed ?? 0) * 100;
  if (!record.usage?.lastUsedAt) score += 50;
  if (options.preferredDomains?.includes(record.domain)) score += 25;
  if (options.preferredSeason && record.season === options.preferredSeason) score += 20;
  if (record.verification === 'verified') score += 5;
  if (record.articlePath) score += 3;
  if (record.imageQuery) score += 2;
  return score;
}

function chooseFormat(record: TexasKnowledgeRecord, alreadyUsedFormats: Set<TexasSocialFormat>) {
  const allowed = record.socialFormats ?? [];
  const unused = formatPriority.find((format) => allowed.includes(format) && !alreadyUsedFormats.has(format));
  return unused ?? formatPriority.find((format) => allowed.includes(format)) ?? allowed[0];
}

export function buildTexasSocialBatch(
  records: readonly TexasKnowledgeRecord[],
  options: TexasSocialBatchOptions = {},
): TexasSocialPost[] {
  const limit = Math.max(1, Math.min(options.limit ?? 10, 50));
  const excluded = new Set(options.excludeRecordIds ?? []);
  const usedDomains = new Set<TexasKnowledgeRecord['domain']>();
  const usedFormats = new Set<TexasSocialFormat>();

  const candidates = records
    .filter((record) => record.socialReady && record.verification !== 'needs-review' && record.socialFormats?.length && !excluded.has(record.id))
    .sort((a, b) => {
      const scoreDelta = scoreRecord(b, options) - scoreRecord(a, options);
      if (scoreDelta !== 0) return scoreDelta;
      return a.id.localeCompare(b.id);
    });

  const selected: TexasKnowledgeRecord[] = [];

  // First pass favors domain diversity so a daily queue does not become ten wildlife posts.
  for (const record of candidates) {
    if (selected.length >= limit) break;
    if (usedDomains.has(record.domain)) continue;
    selected.push(record);
    usedDomains.add(record.domain);
  }

  // Second pass fills the requested batch size using the same least-used scoring.
  for (const record of candidates) {
    if (selected.length >= limit) break;
    if (selected.some((item) => item.id === record.id)) continue;
    selected.push(record);
  }

  return selected.map((record) => {
    const format = chooseFormat(record, usedFormats);
    if (!format) throw new Error(`Social-ready record ${record.id} has no approved format.`);
    usedFormats.add(format);
    return renderTexasSocialPost(record, format);
  });
}

/** Build a candidate batch from the complete in-repository Knowledge Bank. */
export function buildDefaultTexasSocialBatch(options: TexasSocialBatchOptions = {}): TexasSocialPost[] {
  return buildTexasSocialBatch(TEXAS_KNOWLEDGE_CATALOG, options);
}

export function markTexasKnowledgeRecordUsed(record: TexasKnowledgeRecord, usedAt = new Date().toISOString()): TexasKnowledgeRecord {
  return {
    ...record,
    usage: {
      timesUsed: (record.usage?.timesUsed ?? 0) + 1,
      lastUsedAt: usedAt,
    },
  };
}
