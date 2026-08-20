import { createFileRoute } from "@tanstack/react-router";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { PRIORITY_SEARCH_PAGES } from "@/data/priority-search-pages";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-secretary-of-state";
const data = PRIORITY_SEARCH_PAGES["texas-secretary-of-state"];

export const Route = createFileRoute("/texas-secretary-of-state")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: "Texas Secretary of State: Elections, Business & Records", description: data.intro }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
  component: () => <PrioritySearchPage data={data} />,
});
