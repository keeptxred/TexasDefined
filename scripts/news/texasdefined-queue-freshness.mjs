/**
 * Automated /news publication is for recent feed reporting only. Older
 * material may still be developed as an evergreen guide through editorial
 * review, but cannot silently become a dated new story after weeks in queue.
 * Pure and zero-network: use the same policy for dry-run and real publishing.
 */
export const AUTOMATED_NEWS_MAX_AGE_HOURS = 72;
export const AUTOMATED_NEWS_MAX_FUTURE_SKEW_MINUTES = 60;

export function isCurrentTexasDefinedAutoNewsSource(pubDate, nowMs = Date.now()) {
  const sourceTime = Date.parse(String(pubDate ?? ''));
  if (!Number.isFinite(sourceTime) || !Number.isFinite(nowMs)) return false;
  return sourceTime >= nowMs - AUTOMATED_NEWS_MAX_AGE_HOURS * 60 * 60 * 1000
    && sourceTime <= nowMs + AUTOMATED_NEWS_MAX_FUTURE_SKEW_MINUTES * 60 * 1000;
}
