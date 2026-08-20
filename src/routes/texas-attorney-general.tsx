import { createFileRoute } from "@tanstack/react-router";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { PRIORITY_SEARCH_PAGES } from "@/data/priority-search-pages";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-attorney-general";
const data = PRIORITY_SEARCH_PAGES["texas-attorney-general"];

export const Route = createFileRoute("/texas-attorney-general")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Texas Attorney General: Office, Services & Official Links",
      description: data.intro,
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
  component: () => <PrioritySearchPage data={data} />,
});
