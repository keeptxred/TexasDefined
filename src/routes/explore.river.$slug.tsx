import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/explore/river/$slug')({
  beforeLoad: ({ params }) => {
    throw redirect({ href: `/destination/${params.slug}`, statusCode: 301 });
  },
});
