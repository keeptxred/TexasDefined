import { createFileRoute, redirect } from '@tanstack/react-router';
import { texasDefinedAgencyRedirect } from '@/lib/brand-route-ownership';

export const Route = createFileRoute('/agency/$slug')({
  beforeLoad: ({ params }) => {
    throw redirect({ href: texasDefinedAgencyRedirect(params.slug), statusCode: 301 });
  },
});
