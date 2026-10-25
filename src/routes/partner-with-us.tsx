import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';

const canonicalPath = '/partner-with-us';
const description = 'Texas Defined advertising packages, placements, billing and agreements. Paid relationships do not buy editorial coverage, favorable rankings or changes to factual conclusions. One approved sports sponsored placement may run on a sports surface at a time.';

type PartnerSearch = {
  partnershipType?: 'sports-travel' | 'brand-retail';
  sourcePath?: string;
  tier?: 'local' | 'growth' | 'premier' | 'custom';
  billing?: 'monthly' | 'annual';
  focus?: 'pricing' | 'examples' | 'agreement' | 'billing' | 'contact';
};

function sanitizePartnerSource(value: unknown) {
  if (typeof value !== 'string') return canonicalPath;
  if (value === '/sports-venues' || value === '/things-unique-to-texas/texas-brands' || value === '/events/christmas-events') return value;
  if (/^\/(?:sports-venue\/[a-z0-9-]+|texas-high-school-football-(?:teams|districts)\/[a-z0-9-]+|explore\/near\/[a-z0-9-]+\/day-trips)$/.test(value)) return value;
  return canonicalPath;
}

export const Route = createFileRoute('/partner-with-us')({
  validateSearch: (search: Record<string, unknown>): PartnerSearch => ({
    partnershipType: search.type === 'sports-travel'
      ? 'sports-travel'
      : search.type === 'brand-retail'
        ? 'brand-retail'
        : undefined,
    sourcePath: typeof search.source === 'string' ? sanitizePartnerSource(search.source) : undefined,
    tier: typeof search.tier === 'string' && /^(local|growth|premier|custom)$/.test(search.tier)
      ? search.tier as PartnerSearch['tier'] : undefined,
    billing: search.billing === 'annual' ? 'annual' : search.billing === 'monthly' ? 'monthly' : undefined,
    focus: typeof search.focus === 'string' && /^(pricing|examples|agreement|billing|contact)$/.test(search.focus)
      ? search.focus as PartnerSearch['focus'] : undefined,
  }),
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Advertise & Partner With Texas Defined', description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
