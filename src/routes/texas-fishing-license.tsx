import { createFileRoute } from "@tanstack/react-router";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { PRIORITY_SEARCH_PAGES } from "@/data/priority-search-pages";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-fishing-license";
const data = PRIORITY_SEARCH_PAGES["texas-fishing-license"];

export const Route = createFileRoute("/texas-fishing-license")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: "Texas Fishing License: Requirements, Fees & Official Links", description: data.intro }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
  component: () => <PrioritySearchPage data={data} />,
});
