import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';

const canonicalPath = '/partner-with-us';
const description = 'Compare Texas Defined advertising and sponsorship packages, review billing options, see sample placements and start a clearly disclosed partnership while preserving editorial independence.';

type PartnerSearch = {
  partnershipType?: 'sports-travel' | 'brand-retail';
  sourcePath?: string;
  tier?: 'local' | 'growth' | 'premier';
  billing?: 'monthly' | 'annual';
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
    tier: search.tier === 'local' || search.tier === 'growth' || search.tier === 'premier' ? search.tier : undefined,
    billing: search.billing === 'monthly' || search.billing === 'annual' ? search.billing : undefined,
  }),
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Advertise & Partner With Texas Defined', description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
