import { createFileRoute, notFound, redirect } from '@tanstack/react-router';
import { LOCAL_MORTGAGE_PROFILE_BY_SLUG } from '@/data/local-mortgage';

export const Route = createFileRoute('/texas-mortgage-calculator/$location')({
  beforeLoad: ({ params }) => {
    if (!LOCAL_MORTGAGE_PROFILE_BY_SLUG.has(params.location)) throw notFound();
    throw redirect({ href: `/texas-mortgage-calculator#${params.location}`, statusCode: 301 });
  },
});
