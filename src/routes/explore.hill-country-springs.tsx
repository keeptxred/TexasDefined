import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/explore/hill-country-springs')({
  beforeLoad: () => {
    throw redirect({ href: '/explore/lakes-rivers', statusCode: 301 });
  },
});
