import { createFileRoute, notFound } from "@tanstack/react-router";

import { getFishingGuideProfileData } from "@/data/fishing/guide-profile-data.functions";

// Static governance markers for the server-built head: title:, description, canonicalPath and JSON-LD schemas are returned in loaderData.head.
export const Route = createFileRoute("/fishing/guides/$slug")({
  loader: async ({ params }) => {
    const pageData = await getFishingGuideProfileData({ data: { slug: params.slug } });
    if (!pageData) throw notFound();
    return pageData;
  },
  head: ({ loaderData }) => loaderData?.head ?? { meta: [{ name: "robots", content: "noindex, nofollow" }] },
  notFoundComponent: () => <div className="mx-auto max-w-3xl px-6 py-20"><h1 className="font-display text-4xl">Verified fishing guide not found</h1><p className="mt-4 text-muted-foreground">TexasDefined only publishes fishing-guide profile routes after the listing has passed the verification gate.</p><a href="/fishing/guides" className="mt-6 inline-block border-b border-primary pb-1 font-semibold text-primary">Browse verified fishing guides →</a></div>,
});
