import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/article/texas-lake-reservoirs-explained')({
  beforeLoad: ({ location }) => {
    throw redirect({
      href: `/article/texas-lakes-reservoirs-explained${location.searchStr || ''}`,
      statusCode: 301,
    });
  },
});
