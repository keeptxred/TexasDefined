import { createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/sports/teams')({
  loader: async () => (await (await import('@/data/pro-teams.functions')).getProTeamGuide({ data: { slug: '' } })).index! satisfies { metadata: { title: string; description: string; canonicalPath: string } },
  head: ({ loaderData }) => loaderData?.seo ?? {},
});
