import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';

const canonicalPath = '/partner-with-us/agreement';
const description = 'Texas Defined advertiser agreement review and electronic acceptance for approved advertisers.';

type AgreementSearch = {
  token?: string;
};

export const Route = createFileRoute('/partner-with-us/agreement')({
  validateSearch: (search: Record<string, unknown>): AgreementSearch => ({
    token: typeof search.token === 'string' && /^[a-f0-9]{64}$/i.test(search.token) ? search.token : undefined,
  }),
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: 'Advertiser Agreement',
      description,
      robots: 'noindex, nofollow, noarchive',
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
