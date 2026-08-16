import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/tools')({
  beforeLoad: ({ location }) => {
    throw redirect({ href: `/decide/financial-tools${location.searchStr || ''}`, statusCode: 301 });
  },
});
