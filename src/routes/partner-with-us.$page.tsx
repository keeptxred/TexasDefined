import { createFileRoute, notFound } from '@tanstack/react-router';

const PAGE_META = {
  billing: {
    title: 'Advertiser Billing & Payment Methods | Texas Defined',
    description: 'Texas Defined advertiser billing, card, ACH, Stripe invoice and approved payment-term information.',
  },
  terms: {
    title: 'Advertising & Sponsorship Terms | Texas Defined',
    description: 'Commercial advertising and sponsorship terms for Texas Defined partners, including approvals, disclosures, cancellations and make-goods.',
  },
  showcase: {
    title: 'Sample Advertising Placements | Texas Defined',
    description: 'Preview representative Texas Defined sponsored placements, featured partner units and sponsored content treatments.',
  },
} as const;

type PartnerInfoPage = keyof typeof PAGE_META;

export const Route = createFileRoute('/partner-with-us/$page')({
  beforeLoad: ({ params }) => {
    if (!(params.page in PAGE_META)) throw notFound();
  },
  head: ({ params }) => {
    const page = PAGE_META[params.page as PartnerInfoPage] ?? PAGE_META.showcase;
    return {
      meta: [
        { title: page.title },
        { name: 'description', content: page.description },
        { name: 'robots', content: 'noindex,follow' },
      ],
    };
  },
});
