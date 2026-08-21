import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/dps-office/$slug')({
  beforeLoad: () => {
    throw redirect({ href: '/texas-drivers-license', statusCode: 301 });
  },
});
