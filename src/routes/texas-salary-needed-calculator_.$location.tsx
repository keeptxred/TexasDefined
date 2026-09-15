import { createFileRoute, notFound, redirect } from '@tanstack/react-router';
import { LOCAL_SALARY_NEEDED_PROFILE_BY_SLUG } from '@/data/local-salary-needed';

export const Route = createFileRoute('/texas-salary-needed-calculator/$location')({
  beforeLoad: ({ params }) => {
    if (!LOCAL_SALARY_NEEDED_PROFILE_BY_SLUG.has(params.location)) throw notFound();
    throw redirect({ href: `/texas-salary-needed-calculator#${params.location}`, statusCode: 301 });
  },
});
