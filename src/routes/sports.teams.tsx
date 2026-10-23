import { getProTeamGuide } from '@/data/pro-teams.functions';
import { createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/sports/teams')({
  loader: async () => (await getProTeamGuide({ data: { slug: '' } })).index! satisfies { metadata: { title: string; description: string; canonicalPath: string } },
  head: ({ loaderData }) => loaderData?.seo ?? {},
});
