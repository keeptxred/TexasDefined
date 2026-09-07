export type ReaderQualityClassification = 'engaged_reader' | 'likely_human' | 'uncertain' | 'automation_suspected';
export type ReaderQualityReferrerClass = 'direct' | 'internal' | 'search' | 'social' | 'ai' | 'other' | 'unknown';

export type ReaderQualitySignals = {
  pointer?: boolean;
  touch?: boolean;
  keyboard?: boolean;
  internalClick?: boolean;
  scroll50?: boolean;
  scroll90?: boolean;
  visible10s?: boolean;
  visible30s?: boolean;
  focusReturn?: boolean;
};

export type ReaderQualitySnapshot = {
  visibleMs: number;
  interactionCount: number;
  maxScrollPercent: number;
  signals: ReaderQualitySignals;
};

export type ReaderQualityResult = {
  score: number;
  classification: ReaderQualityClassification;
};

export const READER_QUALITY_INTERNAL_BROWSER_KEY = 'texasdefined:reader-quality-internal';

export const READER_QUALITY_THRESHOLDS = Object.freeze({
  suspiciousVisibleMs: 2_000,
  likelyHumanScore: 60,
  engagedReaderScore: 80,
});

export function scoreReaderQuality(snapshot: ReaderQualitySnapshot): ReaderQualityResult {
  const visibleMs = clamp(snapshot.visibleMs, 0, 86_400_000);
  const interactionCount = clamp(snapshot.interactionCount, 0, 500);
  const maxScrollPercent = clamp(snapshot.maxScrollPercent, 0, 100);
  let score = 0;

  if (visibleMs >= 10_000) score += 20;
  if (visibleMs >= 30_000) score += 15;
  if (visibleMs >= 120_000) score += 10;
  if (interactionCount >= 1) score += 20;
  if (interactionCount >= 3) score += 10;
  if (maxScrollPercent >= 50) score += 15;
  if (maxScrollPercent >= 90) score += 10;
  if (snapshot.signals.internalClick) score += 10;
  score = Math.min(100, score);

  if (visibleMs < READER_QUALITY_THRESHOLDS.suspiciousVisibleMs && interactionCount === 0 && maxScrollPercent < 10) {
    return { score, classification: 'automation_suspected' };
  }
  if (score >= READER_QUALITY_THRESHOLDS.engagedReaderScore) return { score, classification: 'engaged_reader' };
  if (score >= READER_QUALITY_THRESHOLDS.likelyHumanScore) return { score, classification: 'likely_human' };
  return { score, classification: 'uncertain' };
}

export function classifyReaderReferrer(referrer: string, origin: string): ReaderQualityReferrerClass {
  if (!referrer) return 'direct';
  try {
    const referrerUrl = new URL(referrer);
    const originUrl = new URL(origin);
    if (referrerUrl.origin === originUrl.origin) return 'internal';
    const host = referrerUrl.hostname.toLowerCase().replace(/^www\./, '');
    if (/(^|\.)(google|bing|duckduckgo|yahoo)\./.test(host)) return 'search';
    if (/(^|\.)(chatgpt\.com|perplexity\.ai|claude\.ai|copilot\.microsoft\.com)$/.test(host)) return 'ai';
    if (/(^|\.)(facebook\.com|instagram\.com|x\.com|twitter\.com|tiktok\.com|reddit\.com)$/.test(host)) return 'social';
    return 'other';
  } catch {
    return 'unknown';
  }
}

function clamp(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) return min;
  return Math.max(min, Math.min(max, Math.round(value)));
}
