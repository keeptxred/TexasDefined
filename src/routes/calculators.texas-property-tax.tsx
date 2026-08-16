import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/calculators/texas-property-tax')({
  beforeLoad: ({ location }) => {
    throw redirect({ href: `/property-tax-calculators${location.searchStr || ''}`, statusCode: 301 });
  },
});
