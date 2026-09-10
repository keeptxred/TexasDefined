import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/destination/devil-s-sinkhole-state-natural-area')({
  beforeLoad: () => {
    throw redirect({
      href: '/destination/devils-sinkhole-state-natural-area',
      statusCode: 301,
    });
  },
});
