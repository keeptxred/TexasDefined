import { createFileRoute } from "@tanstack/react-router";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

/** Lightweight SEO head. Sources and long-form content load only on this route. */
const canonicalPath = "/destination/davis-hill-state-park";

export const Route = createFileRoute("/destination/davis-hill-state-park")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      title: "Davis Hill State Natural Area: Access, History & Geology",
      description: "Davis Hill in Liberty County is not open for general visits. Research its history, Trinity River habitats, salt dome and TPWD future development plans.",
      canonicalPath,
      modifiedTime: "2026-10-10",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
});
