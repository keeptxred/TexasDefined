import { createFileRoute } from "@tanstack/react-router";

import bbqBrisket from "@/assets/bbq-brisket.jpg";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { TexasEvergreenGuide } from "@/components/editorial/TexasEvergreenGuide";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-food-trail";

export const Route = createFileRoute(canonicalPath)({
  loader: async () => {
    const { getTexasEvergreenGuide } = await import("@/data/texas-evergreen-guides");
    return getTexasEvergreenGuide("texas-food-trail");
  },
  head: ({ loaderData: guide }) => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Texas Food Trail: 10 Food Traditions Worth a Road Trip",
      description: guide.dek,
      image: bbqBrisket,
      imageAlt: "Sliced Texas barbecue brisket showing dark bark and a smoke ring",
      type: "article",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
  component: GuidePage,
});

function GuidePage() {
  const guide = Route.useLoaderData();
  return <TexasEvergreenGuide guide={guide} />;
}
