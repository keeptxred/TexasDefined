import { createFileRoute } from "@tanstack/react-router";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { PRIORITY_SEARCH_PAGES } from "@/data/priority-search-pages";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-dmv";
const data = PRIORITY_SEARCH_PAGES["texas-dmv"];

export const Route = createFileRoute("/texas-dmv")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: "Texas DMV: Registration, Titles & TxDMV Services", description: data.intro }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
  component: () => <PrioritySearchPage data={data} />,
});
