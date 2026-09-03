import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/explore/spring-fed-swimming')({
  beforeLoad: ({ location }) => {
    throw redirect({ href: `/explore/lakes-rivers${location.searchStr || ''}`, statusCode: 301 });
  },
});
