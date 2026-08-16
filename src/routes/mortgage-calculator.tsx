import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/mortgage-calculator')({
  beforeLoad: ({ location }) => {
    throw redirect({ href: `/texas-mortgage-calculator${location.searchStr || ''}`, statusCode: 301 });
  },
});
