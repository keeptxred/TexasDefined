import { createFileRoute, notFound } from "@tanstack/react-router";

import { getTexasTalentProfileWithResolvedLinks } from "@/data/texas-talent.functions";

export const Route = createFileRoute("/admin/texas-talent/$slug")({
  beforeLoad: async ({ params }) => {
    const profile = await getTexasTalentProfileWithResolvedLinks({ data: { slug: params.slug } });
    if (!profile) throw notFound();
    return { profile };
  },
  head: ({ match }) => ({
    meta: [
      { title: `Preview — ${match.context.profile.launchMetadata.title}` },
      { name: "description", content: match.context.profile.launchMetadata.description },
      { name: "robots", content: "noindex, nofollow, noarchive" },
    ],
  }),
});
