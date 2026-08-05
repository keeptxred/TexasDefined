import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/explore/cavern/$slug')({
  beforeLoad: ({ params }) => {
    throw redirect({ href: `/destination/${params.slug}`, statusCode: 301 });
  },
});
