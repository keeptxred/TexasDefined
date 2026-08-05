import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/explore/spring-conservation-and-education')({
  beforeLoad: ({ location }) => {
    throw redirect({ href: `/explore/lakes-rivers${location.searchStr || ''}`, statusCode: 301 });
  },
});
