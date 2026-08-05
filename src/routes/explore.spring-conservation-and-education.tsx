import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/explore/spring-conservation-and-education')({
  beforeLoad: () => {
    throw redirect({ href: '/explore/lakes-rivers', statusCode: 301 });
  },
});
