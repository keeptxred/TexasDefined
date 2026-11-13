/**
 * The partner form uses shareable type/source query parameters to prefill the
 * inquiry. Return those same keys from TanStack's search validator; returning
 * renamed keys (partnershipType/sourcePath) appends redundant URL parameters
 * on router navigation and creates needless crawlable URL combinations.
 */
export type PartnerSearch = {
  type?: 'sports-travel' | 'brand-retail';
  source?: string;
  tier?: 'local' | 'growth' | 'premier' | 'custom';
  billing?: 'monthly' | 'annual';
  focus?: 'pricing' | 'examples' | 'agreement' | 'billing' | 'contact';
};

const canonicalPath = '/partner-with-us';

function sanitizePartnerSource(value: unknown): string {
  return typeof value === 'string' &&
    /^\/(?:sports-venues|things-unique-to-texas\/texas-brands|events\/christmas-events|sports-venue\/[a-z0-9-]+|texas-high-school-football-(?:teams|districts)\/[a-z0-9-]+|explore\/near\/[a-z0-9-]+\/day-trips)$/.test(value)
    ? value : canonicalPath;
}

export function parsePartnerSearch(search: Record<string, unknown>): PartnerSearch {
  // Accept old URLs that already contain the duplicated alias parameters,
  // without generating those aliases in new navigations.
  const incomingType = search.type ?? search.partnershipType;
  const incomingSource = search.source ?? search.sourcePath;
  return {
    type: incomingType === 'sports-travel' || incomingType === 'brand-retail' ? incomingType : undefined,
    source: typeof incomingSource === 'string' ? sanitizePartnerSource(incomingSource) : undefined,
    tier: search.tier === 'local' || search.tier === 'growth' || search.tier === 'premier' || search.tier === 'custom'
      ? search.tier : undefined,
    billing: search.billing === 'annual' || search.billing === 'monthly' ? search.billing : undefined,
    focus: search.focus === 'pricing' || search.focus === 'examples' || search.focus === 'agreement' ||
      search.focus === 'billing' || search.focus === 'contact' ? search.focus : undefined,
  };
}
