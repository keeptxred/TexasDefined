import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/appraisal-district/$slug')({
  beforeLoad: ({ params }) => {
    const countySlug = params.slug.replace(/-appraisal-district$/, '');
    throw redirect({ href: `/property-tax/county/${countySlug}`, statusCode: 301 });
  },
});
