import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/article/high-school-football-newcomers')({
  beforeLoad: () => {
    throw redirect({
      href: '/article/texas-high-school-football-newcomers',
      statusCode: 301,
    });
  },
});
