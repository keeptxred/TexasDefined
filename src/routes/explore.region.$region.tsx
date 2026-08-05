import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/explore/region/$region')({
  beforeLoad: ({ params }) => {
    throw redirect({ href: `/explore?region=${encodeURIComponent(params.region)}`, statusCode: 301 });
  },
});
