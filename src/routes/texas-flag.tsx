import { createFileRoute } from "@tanstack/react-router";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { PRIORITY_SEARCH_PAGES } from "@/data/priority-search-pages";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-flag";
const data = PRIORITY_SEARCH_PAGES["texas-flag"];

export const Route = createFileRoute("/texas-flag")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: "Texas Flag: History, Meaning, Rules & Lone Star Guide", description: data.intro }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
  component: () => <PrioritySearchPage data={data} />,
});
