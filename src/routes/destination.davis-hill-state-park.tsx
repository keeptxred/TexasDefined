import { createFileRoute } from "@tanstack/react-router";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/destination/davis-hill-state-park";
export const Route = createFileRoute("/destination/davis-hill-state-park")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      title: "Davis Hill State Natural Area: Liberty County, Access, History & Geology",
      description: "A primary-source guide to Davis Hill State Natural Area in Liberty County: closed to general visitation, salt-dome geology, Trinity River ecology, history and future plans.",
      canonicalPath,
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
