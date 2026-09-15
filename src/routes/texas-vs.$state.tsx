import { createFileRoute, notFound, redirect } from '@tanstack/react-router';
import { texasVsStateName } from '@/data/texas-vs-states-index';

export const Route = createFileRoute('/texas-vs/$state')({
  beforeLoad: ({ params }) => {
    if (!texasVsStateName(params.state)) throw notFound();
    throw redirect({ href: `/texas-vs-every-state#${params.state}`, statusCode: 301 });
  },
});
