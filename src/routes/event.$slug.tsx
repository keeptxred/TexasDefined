import { createFileRoute, notFound } from "@tanstack/react-router";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { getMajorEventAuthority } from "@/data/major-event-authority";
import { getMajorEventParkingMap } from "@/data/parking-maps.functions";
import { buildMeta, canonicalLink } from "@/lib/seo";

export const Route = createFileRoute("/event/$slug")({
  loader: async ({ params }) => {
    const [page, parkingMap] = await Promise.all([
      getMajorEventAuthority(params.slug),
      getMajorEventParkingMap(params.slug),
    ]);
    if (!page) throw notFound();
    return { page, parkingMap };
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
        robots: page.imageCompliant ? undefined : "noindex, follow, max-image-preview:large",
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    };
  },
});