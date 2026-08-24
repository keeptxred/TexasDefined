import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { TexasEvergreenGuide } from "@/components/editorial/TexasEvergreenGuide";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/dr-pepper-texas-history";
const heroImage = "https://commons.wikimedia.org/wiki/Special:Redirect/file/Cupola_Dr_Pepper_Museum_Waco_Texas_2024.jpg?width=1600";

export const Route = createFileRoute(canonicalPath)({
  loader: async () => {
    const { getTexasEvergreenGuideBatch4 } = await import("@/data/texas-evergreen-guides-batch4");
    return getTexasEvergreenGuideBatch4("dr-pepper-texas-history");
  },
  head: ({ loaderData: guide }) => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Dr Pepper in Texas: How a Waco Soda Became a State Icon",
      description: guide.dek,
      type: "article",
      image: heroImage,
      imageAlt: "Cupola and upper exterior of the Dr Pepper Museum in Waco, Texas",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
  component: GuidePage,
});

function GuidePage() {
  const guide = Route.useLoaderData();
  return <TexasEvergreenGuide guide={guide} />;
}
