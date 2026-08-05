import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/explore/national-wildlife-refuges')({
  beforeLoad: ({ location }) => {
    throw redirect({ href: `/explore/outdoors${location.searchStr || ''}`, statusCode: 301 });
  },
});
