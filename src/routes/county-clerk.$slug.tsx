import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/county-clerk/$slug')({
  beforeLoad: ({ params }) => {
    const countySlug = params.slug.replace(/-county-clerk$/, '');
    throw redirect({ href: `/county/${countySlug}`, statusCode: 301 });
  },
});
