import { createFileRoute, notFound } from "@tanstack/react-router";

import { getFishingTechniqueProfileData } from "@/data/fishing/technique-data.functions";

// Static governance marker for the server-built head: canonicalPath, title: and description are returned in loaderData.head.
export const Route = createFileRoute("/fishing/techniques/$slug")({
  loader: async ({ params }) => {
    const pageData = await getFishingTechniqueProfileData({ data: { slug: params.slug } });
    if (!pageData) throw notFound();
    return pageData;
  },
  head: ({ loaderData }) => loaderData?.head ?? { meta: [{ name: "robots", content: "noindex, nofollow" }] },
  notFoundComponent: () => <div className="mx-auto max-w-3xl px-6 py-20"><h1 className="font-display text-4xl">Verified fishing technique not found</h1><p className="mt-4 text-muted-foreground">TexasDefined only publishes technique profiles after the method has a verified application on at least one complete fishing-lake guide.</p><a href="/fishing/techniques" className="mt-6 inline-block border-b border-primary pb-1 font-semibold text-primary">Browse fishing techniques →</a></div>,
});
