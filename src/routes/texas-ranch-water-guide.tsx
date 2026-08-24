import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { TexasEvergreenGuide } from "@/components/editorial/TexasEvergreenGuide";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-ranch-water-guide";
const heroImage = "https://commons.wikimedia.org/wiki/Special:Redirect/file/Ranch_water.jpg?width=1600";

export const Route = createFileRoute(canonicalPath)({
  loader: async () => {
    const { getTexasEvergreenGuideBatch5 } = await import("@/data/texas-evergreen-guides-batch5");
    return getTexasEvergreenGuideBatch5("texas-ranch-water-guide");
  },
  head: ({ loaderData: guide }) => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Texas Ranch Water: History, Origin Stories & What It Is",
      description: guide.dek,
      type: "article",
      image: heroImage,
      imageAlt: "Ranch Water cocktail served over ice with citrus",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
  component: GuidePage,
});

function GuidePage() {
  const guide = Route.useLoaderData();
  return <TexasEvergreenGuide guide={guide} />;
}
