import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/explore/historic-sites')({
  beforeLoad: () => {
    throw redirect({ href: '/explore/historic-sites', statusCode: 301 });
  },
});
