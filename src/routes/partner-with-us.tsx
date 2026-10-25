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
  return typeof value === 'string' && /^\/(?:sports-venues|things-unique-to-texas\/texas-brands|events\/christmas-events|sports-venue\/[a-z0-9-]+|texas-high-school-football-(?:teams|districts)\/[a-z0-9-]+|explore\/near\/[a-z0-9-]+\/day-trips)$/.test(value)
    ? value : canonicalPath;
}

export const Route = createFileRoute('/partner-with-us')({
  validateSearch: (search: Record<string, unknown>): PartnerSearch => ({
    partnershipType: search.type === 'sports-travel' || search.type === 'brand-retail' ? search.type : undefined,
    sourcePath: typeof search.source === 'string' ? sanitizePartnerSource(search.source) : undefined,
    tier: /^(local|growth|premier|custom)$/.test(search.tier as string)
      ? search.tier as PartnerSearch['tier'] : undefined,
    billing: search.billing === 'annual' || search.billing === 'monthly' ? search.billing : undefined,
    focus: /^(pricing|examples|agreement|billing|contact)$/.test(search.focus as string)
      ? search.focus as PartnerSearch['focus'] : undefined,
  }),
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Advertise & Partner With Texas Defined', description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
