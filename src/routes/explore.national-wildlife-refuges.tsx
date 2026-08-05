import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/explore/national-wildlife-refuges')({
  beforeLoad: () => {
    throw redirect({ href: '/explore/outdoors', statusCode: 301 });
  },
});
