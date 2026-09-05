import { createFileRoute, notFound } from "@tanstack/react-router";

import { getVerifiedTournamentProfileData } from "@/data/tournaments/verified-profile-data.functions";

export const Route = createFileRoute("/tournament/$slug")({
  loader: async ({ params }) => {
    const pageData = await getVerifiedTournamentProfileData({ data: { slug: params.slug } });
    if (!pageData) throw notFound();
    return pageData;
  },
  head: ({ loaderData }) => loaderData?.head ?? { meta: [{ name: "robots", content: "noindex, nofollow" }] },
  notFoundComponent: () => <div className="mx-auto max-w-3xl px-6 py-20"><p className="eyebrow text-primary">Texas tournaments</p><h1 className="mt-3 font-display text-4xl">Verified tournament guide not found</h1><p className="mt-4 text-muted-foreground">Texas Defined only opens individual tournament pages after the competition has current first-party source evidence.</p><a href="/events/tournaments" className="mt-6 inline-block border-b border-primary pb-1 font-semibold text-primary">Browse the Texas tournament directory →</a></div>,
});
