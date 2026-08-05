import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/explore/major-springs')({
  beforeLoad: () => {
    throw redirect({ href: '/explore/lakes-rivers', statusCode: 301 });
  },
});
