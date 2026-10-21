import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { getProTeamsIndex } from '@/data/pro-teams.functions';
import { buildMeta, canonicalLink } from '@/lib/seo';
export const Route = createFileRoute('/sports/teams')({
  loader: () => getProTeamsIndex(),
  head: ({ loaderData }) => {
    const metadata: { title: string; description: string; canonicalPath: string } | undefined = loaderData?.metadata;
    return metadata ? { meta: buildMeta(texasDefinedBrand, metadata), links: [canonicalLink(texasDefinedBrand, metadata.canonicalPath)] } : {};
  },
});
