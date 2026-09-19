import { createFileRoute, notFound, redirect } from '@tanstack/react-router';
import { LOCAL_HOME_INSURANCE_PROFILE_BY_SLUG } from '@/data/local-home-insurance';

export const Route = createFileRoute('/texas-home-insurance-calculator/$location')({
  beforeLoad: ({ params }) => {
    if (!LOCAL_HOME_INSURANCE_PROFILE_BY_SLUG.has(params.location)) throw notFound();
    throw redirect({ href: `/texas-home-insurance-calculator#${params.location}`, statusCode: 301 });
  },
});
