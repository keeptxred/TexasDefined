import { createFileRoute } from "@tanstack/react-router";

import bigBend from "@/assets/big-bend.jpg";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { TexasEvergreenGuide } from "@/components/editorial/TexasEvergreenGuide";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-natural-wonders-bucket-list";

export const Route = createFileRoute(canonicalPath)({
  loader: async () => {
    const { getTexasEvergreenGuideBatch2 } = await import("@/data/texas-evergreen-guides-batch2");
    return getTexasEvergreenGuideBatch2("texas-natural-wonders-bucket-list");
  },
  head: ({ loaderData: guide }) => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Texas Natural Wonders Bucket List: 12 Landscapes",
      description: guide.dek,
      image: bigBend,
      imageAlt: "Big Bend landscape with desert terrain and distant mountains",
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
