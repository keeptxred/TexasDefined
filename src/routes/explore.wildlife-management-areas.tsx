import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/explore/wildlife-management-areas')({
  beforeLoad: () => {
    throw redirect({ href: '/explore/outdoors', statusCode: 301 });
  },
});
