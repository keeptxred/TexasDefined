import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/explore/wildlife-management-areas')({
  beforeLoad: ({ location }) => {
    throw redirect({ href: `/explore/outdoors${location.searchStr || ''}`, statusCode: 301 });
  },
});
