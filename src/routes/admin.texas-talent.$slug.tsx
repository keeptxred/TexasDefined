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
      { title: `${match.context.profile.name} | Texas Talent Preview` },
      { name: "description", content: match.context.profile.dek },
      { name: "robots", content: "noindex, nofollow, noarchive" },
    ],
  }),
});
