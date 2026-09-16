import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';

const canonicalPath = '/partner-with-us/agreement';
const description = 'Texas Defined advertiser agreement review and electronic acceptance for approved advertisers.';

type AgreementSearch = {
  tier?: 'local' | 'growth' | 'premier' | 'custom';
  billing?: 'monthly' | 'annual';
};

export const Route = createFileRoute('/partner-with-us/agreement')({
  validateSearch: (search: Record<string, unknown>): AgreementSearch => ({
    tier: search.tier === 'local' || search.tier === 'growth' || search.tier === 'premier' || search.tier === 'custom' ? search.tier : undefined,
    billing: search.billing === 'annual' ? 'annual' : search.billing === 'monthly' ? 'monthly' : undefined,
  }),
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: 'Advertiser Agreement',
      description,
      robots: 'noindex, follow',
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
