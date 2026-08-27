import { createFileRoute, notFound } from "@tanstack/react-router";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { getMajorEventAuthority } from "@/data/major-event-authority";
import { buildMeta, canonicalLink } from "@/lib/seo";

export const Route = createFileRoute("/event/$slug")({
  loader: async ({ params }) => {
    const page = await getMajorEventAuthority(params.slug);
    if (!page) throw notFound();
    return { page };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { page } = loaderData;
    const canonicalPath = `/event/${page.slug}`;
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: page.title,
        description: page.description,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    };
  },
});
