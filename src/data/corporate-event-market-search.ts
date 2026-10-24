import type { CorporateEventProvider } from './corporate-events';

/** Normalize Texas locations without confusing the state itself with a city. */
export function normalizeCorporateEventMarketQuery(input: string): string {
  const query = input.trim().toLowerCase().replace(/[–—\/-]/g, ' ').replace(/\s+/g, ' ');
  if (query === 'texas' || query === 'tx') return 'texas';
  const withoutState = query.replace(/,?\s+(?:tx|texas)$/, '').trim();
  return withoutState.replace(/,/g, '').replace(/\s+/g, ' ');
}

/** Match a city, multi-city metro name, DFW alias, or Houston-area ZIP. */
export function corporateEventMarketMatches(
  provider: Pick<CorporateEventProvider, 'city' | 'metro'>,
  input: string,
): boolean {
  const requested = normalizeCorporateEventMarketQuery(input);
  if (!requested) return false;
  if (requested === 'texas') return true;
  if (/^77(?:0|2)\d{2}$/.test(requested)) return provider.city.toLowerCase() === 'houston';
  const city = normalizeCorporateEventMarketQuery(provider.city);
  const metro = provider.metro ? normalizeCorporateEventMarketQuery(provider.metro) : '';
  if (requested === city || requested === metro) return true;
  if (requested === 'dfw') return metro === 'dallas fort worth' || city === 'dallas' || city === 'fort worth';
  if (requested === 'dallas fort worth' && (city === 'dallas' || city === 'fort worth')) return true;
  // Whole-word multiword match avoids accidental substring hits.
  return (' ' + metro + ' ').includes(' ' + requested + ' ');
}
