import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/explore/lighthouses')({
  beforeLoad: () => {
    throw redirect({ href: '/explore/beaches-coast', statusCode: 301 });
  },
});
