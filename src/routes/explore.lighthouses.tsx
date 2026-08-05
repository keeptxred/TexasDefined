import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/explore/lighthouses')({
  beforeLoad: ({ location }) => {
    throw redirect({ href: `/explore/beaches-coast${location.searchStr || ''}`, statusCode: 301 });
  },
});
