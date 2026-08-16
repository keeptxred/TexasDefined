import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/calculators/texas-home-affordability')({
  beforeLoad: ({ location }) => {
    throw redirect({ href: `/texas-home-affordability-calculator${location.searchStr || ''}`, statusCode: 301 });
  },
});
