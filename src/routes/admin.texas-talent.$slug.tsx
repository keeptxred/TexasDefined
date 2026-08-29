import { createFileRoute, notFound } from "@tanstack/react-router";

import {
  getTexasTalentProfileWithResolvedLinks,
  getTexasTalentRelatedProfiles,
} from "@/data/texas-talent.functions";

export const Route = createFileRoute("/admin/texas-talent/$slug")({
  beforeLoad: async ({ params }) => {
    const [profile, relatedProfiles] = await Promise.all([
      getTexasTalentProfileWithResolvedLinks({ data: { slug: params.slug } }),
      getTexasTalentRelatedProfiles({ data: { slug: params.slug, limit: 6 } }),
    ]);
    if (!profile) throw notFound();
    return { profile, relatedProfiles };
  },
  head: ({ match }) => ({
    meta: [
      { title: `Preview — ${match.context.profile.launchMetadata.title}` },
      { name: "description", content: match.context.profile.launchMetadata.description },
      { name: "robots", content: "noindex, nofollow, noarchive" },
    ],
  }),
});
