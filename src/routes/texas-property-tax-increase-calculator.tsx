import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/texas-property-tax-increase-calculator')({
  beforeLoad: ({ location }) => {
    throw redirect({
      href: `/decide/property-taxes${location.searchStr || ''}`,
      statusCode: 301,
    });
  },
});
