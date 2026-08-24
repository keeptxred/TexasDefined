import { createFileRoute } from "@tanstack/react-router";

import kolacheKlobasnek from "@/assets/kolache-klobasnek-hero-photo.jpg";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { TexasEvergreenGuide } from "@/components/editorial/TexasEvergreenGuide";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/german-czech-texas-towns";

export const Route = createFileRoute(canonicalPath)({
  loader: async () => {
    const { getTexasEvergreenGuideBatch2 } = await import("@/data/texas-evergreen-guides-batch2");
    return getTexasEvergreenGuideBatch2("german-czech-texas-towns");
  },
  head: ({ loaderData: guide }) => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "German & Czech Texas Towns: Food, Churches and Heritage",
      description: guide.dek,
      image: kolacheKlobasnek,
      imageAlt: "Texas Czech-style kolache and klobasnek pastries",
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
