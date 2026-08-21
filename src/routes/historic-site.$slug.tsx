import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/historic-site/$slug')({
  beforeLoad: ({ params }) => {
    throw redirect({ href: `/destination/${params.slug}`, statusCode: 301 });
  },
});
