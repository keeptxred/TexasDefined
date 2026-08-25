import { createFileRoute, notFound } from "@tanstack/react-router";

import { getTexasTalentProfile } from "@/data/texas-talent-profiles";

export const Route = createFileRoute("/admin/texas-talent/$slug")({
  beforeLoad: ({ params }) => {
    const profile = getTexasTalentProfile(params.slug);
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
