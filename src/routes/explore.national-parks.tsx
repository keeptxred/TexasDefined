import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/explore/national-parks')({
  beforeLoad: () => {
    throw redirect({ href: '/explore/state-parks', statusCode: 301 });
  },
});
