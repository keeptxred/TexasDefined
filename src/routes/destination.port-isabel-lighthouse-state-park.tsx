import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/destination/port-isabel-lighthouse-state-park')({
  beforeLoad: ({ location }) => {
    throw redirect({
      href: `/destination/port-isabel-lighthouse${location.searchStr || ''}`,
      statusCode: 301,
    });
  },
});
