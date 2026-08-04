import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/tax-calculator')({
  beforeLoad: ({ location }) => {
    throw redirect({
      href: `/decide/property-taxes${location.searchStr || ''}`,
      statusCode: 301,
    });
  },
});
