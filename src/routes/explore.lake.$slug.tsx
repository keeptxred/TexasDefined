import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/explore/lake/$slug')({
  beforeLoad: ({ params }) => {
    throw redirect({ href: `/destination/${params.slug}`, statusCode: 301 });
  },
});
