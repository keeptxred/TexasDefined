import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';

const canonicalPath = '/partner-with-us/billing';
const description = 'Texas Defined advertiser billing, cards, eligible ACH payments, Stripe invoices, prepayment and approved Net 15 or Net 30 terms.';

export const Route = createFileRoute('/partner-with-us/billing')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: 'Advertising Billing & Payment',
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
