import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/advertising-terms')({
  beforeLoad: () => {
    throw redirect({ to: '/partner-with-us/terms', replace: true, statusCode: 301 });
  },
});