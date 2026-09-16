import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/advertising-billing')({
  beforeLoad: () => {
    throw redirect({ to: '/partner-with-us/billing', replace: true, statusCode: 301 });
  },
});