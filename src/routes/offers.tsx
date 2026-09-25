import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/offers')({
  head: () => ({
    meta: [
      { title: 'Texas Event Tickets, Discounts & Affiliate Offers | TexasDefined' },
      {
        name: 'description',
        content: 'Search TexasDefined event tickets, attraction offers, promo codes and affiliate-safe deals from approved partner sources.',
      },
    ],
  }),
});
