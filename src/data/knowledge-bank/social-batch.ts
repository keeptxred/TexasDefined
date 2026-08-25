import { TEXAS_KNOWLEDGE_CATALOG } from './catalog';
import { renderTexasSocialPost } from './social';
import type { TexasKnowledgeRecord, TexasSocialFormat, TexasSocialPost } from './types';

export type TexasSocialBatchOptions = {
  limit?: number;
  excludeRecordIds?: string[];
  preferredDomains?: TexasKnowledgeRecord['domain'][];
  preferredSeason?: TexasKnowledgeRecord['season'];
  /** Maximum records from any one domain. Defaults to a balanced share of the requested batch. */
  maxPerDomain?: number;
  /** Optional deterministic rotation seed. Defaults to asOfDate so equal-score candidates rotate daily. */
  rotationSeed?: string;
  /** YYYY-MM-DD date used for freshness gating; defaults to the current UTC date. */
  asOfDate?: string;
};

const formatPriority: TexasSocialFormat[] = [
  'you-know-youre-a-texan-if',
  'you-know-youre-from-texas-if',
  'tell-me-youre-from-texas',
  'fact-of-the-day',
  'til-texas-edition',
  'texas-trivia',
  'only-texans-understand',
  'only-in-texas',
  'wildlife-of-the-day',
  'wildflower-of-the-day',
  'true-or-false',
  'finish-the-sentence',
  'what-do-texans-call-this',
  'how-texas-are-you',
  'name-this-texas-place',
  'which-one-is-more-texas',
  'would-you-rather-texas',
  'tag-a-texan',
  'texas-by-the-numbers',
  'county-of-the-day',
  'town-of-the-day',
  'food-fight',
  'this-or-that',
];

export function isKnowledgeRecordCurrent(record: TexasKnowledgeRecord, asOfDate: string): boolean {
  if (record.validThrough && record.validThrough < asOfDate) return false;
  if (record.reviewBy && record.reviewBy < asOfDate) return false;
  return true;
}

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

function rotationRank(recordId: string, seed: string) {
  let hash = 2166136261;
  const value = `${seed}:${recordId}`;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
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
  const defaultDomainCap = Math.max(2, Math.ceil(limit / 5));
  const maxPerDomain = Math.max(1, Math.min(options.maxPerDomain ?? defaultDomainCap, limit));
  const excluded = new Set(options.excludeRecordIds ?? []);
  const usedDomains = new Set<TexasKnowledgeRecord['domain']>();
  const domainCounts = new Map<TexasKnowledgeRecord['domain'], number>();
  const usedFormats = new Set<TexasSocialFormat>();
  const asOfDate = options.asOfDate ?? new Date().toISOString().slice(0, 10);
  const rotationSeed = options.rotationSeed ?? asOfDate;

  const candidates = records
    .filter((record) =>
      record.socialReady &&
      record.verification !== 'needs-review' &&
      record.socialFormats?.length &&
      !excluded.has(record.id) &&
      isKnowledgeRecordCurrent(record, asOfDate),
    )
    .sort((a, b) => {
      const scoreDelta = scoreRecord(b, options) - scoreRecord(a, options);
      if (scoreDelta !== 0) return scoreDelta;
      const rotationDelta = rotationRank(a.id, rotationSeed) - rotationRank(b.id, rotationSeed);
      if (rotationDelta !== 0) return rotationDelta;
      return a.id.localeCompare(b.id);
    });

  const selected: TexasKnowledgeRecord[] = [];
  const selectRecord = (record: TexasKnowledgeRecord) => {
    selected.push(record);
    usedDomains.add(record.domain);
    domainCounts.set(record.domain, (domainCounts.get(record.domain) ?? 0) + 1);
  };

  for (const record of candidates) {
    if (selected.length >= limit) break;
    if (usedDomains.has(record.domain)) continue;
    selectRecord(record);
  }

  for (const record of candidates) {
    if (selected.length >= limit) break;
    if (selected.some((item) => item.id === record.id)) continue;
    if ((domainCounts.get(record.domain) ?? 0) >= maxPerDomain) continue;
    selectRecord(record);
  }

  return selected.map((record) => {
    const format = chooseFormat(record, usedFormats);
    if (!format) throw new Error(`Social-ready record ${record.id} has no approved format.`);
    usedFormats.add(format);
    return renderTexasSocialPost(record, format, asOfDate);
  });
}

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
