import { createFileRoute } from '@tanstack/react-router';
import { getProTeamsIndex } from '@/data/pro-teams.functions';
export const Route = createFileRoute('/sports/teams')({
  loader: () => getProTeamsIndex(),
  head: ({ loaderData }) => loaderData?.seo ?? {},
});
