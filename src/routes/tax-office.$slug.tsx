import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/tax-office/$slug')({
  beforeLoad: ({ params }) => {
    const countySlug = params.slug.replace(/-tax-office$/, '');
    throw redirect({ href: `/property-tax/county/${countySlug}`, statusCode: 301 });
  },
});
