import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/explore/county/$county')({
  beforeLoad: ({ params }) => {
    throw redirect({ href: `/browse/counties#county-${params.county}`, statusCode: 301 });
  },
});
