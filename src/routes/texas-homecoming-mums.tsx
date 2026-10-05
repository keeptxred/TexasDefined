import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-homecoming-mums";

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Texas Homecoming Mums: History, Meaning, Colors & Traditions",
      description: "Texas homecoming mums explained: history, colors, senior traditions, garters, costs, DIY construction, preservation, etiquette and modern school customs.",
      type: "article",
      image: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Goldthwaite_High_School_Homecoming_Mum.jpg?width=1400",
      imageAlt: "Goldthwaite High School homecoming mum with ribbons, charms and school colors",
      imageType: "image/jpeg",
      modifiedTime: "2026-10-05",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
