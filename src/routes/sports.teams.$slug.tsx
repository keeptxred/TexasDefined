import { getProTeamGuide } from '@/data/pro-teams.functions';
import { createFileRoute, notFound } from '@tanstack/react-router';
export const Route = createFileRoute('/sports/teams/$slug')({
  loader: async ({ params }) => { const { guide } = await getProTeamGuide({ data: { slug: params.slug } }); if (!guide) throw notFound(); return guide; },
  head: ({ loaderData }) => loaderData?.seo ?? {},
});
