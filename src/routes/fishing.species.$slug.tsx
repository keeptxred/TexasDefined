import { createFileRoute, notFound } from "@tanstack/react-router";

import { getFishingSpeciesProfileData } from "@/data/fishing/species-guide-data.functions";

// Static governance marker for the server-built head: canonicalPath, title: and description are returned in loaderData.head.
export const Route = createFileRoute("/fishing/species/$slug")({
  loader: async ({ params }) => {
    const pageData = await getFishingSpeciesProfileData({ data: { slug: params.slug } });
    if (!pageData) throw notFound();
    return pageData;
  },
  head: ({ loaderData }) => loaderData?.head ?? { meta: [{ name: "robots", content: "noindex, nofollow" }] },
  notFoundComponent: () => <div className="mx-auto max-w-3xl px-6 py-20"><h1 className="font-display text-4xl">Complete fishing species guide not found</h1><p className="mt-4 text-muted-foreground">TexasDefined publishes a standalone species profile only after the species record and at least one complete-lake relationship are verified and sourced.</p><a href="/fishing/species" className="mt-6 inline-block border-b border-primary pb-1 font-semibold text-primary">Browse Texas fish species →</a></div>,
});
