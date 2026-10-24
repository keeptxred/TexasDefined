import { corporateEventAreaMatches, corporateEventMarketMatches } from './corporate-event-market-search.ts';
import type { CorporateEventProvider } from './corporate-events';

/** Public share links contain only already-published geography selectors.
 * Free-form organizer-entered addresses, names, emails and notes are not
 * silently copied to a shareable URL. Never use this as a personal-data
 * anonymizer; the request form and its PII remain outside the share URL.
 */
export function safeCorporateSharePlace(
  input: string,
  kind: 'market' | 'area',
  providers: readonly Pick<CorporateEventProvider, 'city' | 'metro' | 'area'>[],
): string | null {
  const cleaned = input.trim().replace(/\s+/g, ' ');
  if (!cleaned || cleaned.length > (kind === 'market' ? 90 : 60)) return null;
  if (/[\u0000-\u001f\u007f]|@|(?:https?:\/\/|www\.)/i.test(input)) return null;
  if (/\b(?:\+?1[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}\b/.test(cleaned)) return null;
  if (/^\d{1,6}\s+.+\b(?:street|st|avenue|ave|road|rd|drive|dr|boulevard|blvd|lane|ln|court|ct|circle|cir|way|place|pl)\b/i.test(cleaned)) return null;
  return providers.some(provider =>
    kind === 'market' ? corporateEventMarketMatches(provider, cleaned)
      : corporateEventAreaMatches(provider, cleaned)) ? cleaned : null;
}
