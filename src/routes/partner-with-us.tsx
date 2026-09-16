import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';

const canonicalPath = '/partner-with-us';
const description = 'Texas Defined advertising packages, placements, billing and agreements. Advertising does not buy editorial coverage, rankings, reviews, recommendations or factual conclusions. One approved sports sponsored placement may run on a sports surface at a time.';

type PartnerSearch = {
  partnershipType?: 'sports-travel' | 'brand-retail';
  sourcePath?: string;
  tier?: 'local' | 'growth' | 'premier' | 'custom';
  billing?: 'monthly' | 'annual';
  focus?: 'pricing' | 'examples' | 'agreement' | 'billing' | 'contact';
};

function sanitizePartnerSource(value: unknown) {
  if (typeof value !== 'string') return canonicalPath;
  if (value === '/sports-venues' || value === '/things-unique-to-texas/texas-brands') return value;
  if (/^\/sports-venue\/[a-z0-9-]+$/.test(value)) return value;
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
    tier: search.tier === 'local' || search.tier === 'growth' || search.tier === 'premier' || search.tier === 'custom'
      ? search.tier
      : undefined,
    billing: search.billing === 'annual' ? 'annual' : search.billing === 'monthly' ? 'monthly' : undefined,
    focus: search.focus === 'pricing' || search.focus === 'examples' || search.focus === 'agreement' || search.focus === 'billing' || search.focus === 'contact'
      ? search.focus
      : undefined,
  }),
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Advertise & Partner With Texas Defined', description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});