import { createFileRoute } from "@tanstack/react-router";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { PRIORITY_SEARCH_PAGES } from "@/data/priority-search-pages";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-dps";
const data = PRIORITY_SEARCH_PAGES["texas-dps"];

export const Route = createFileRoute("/texas-dps")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: "Texas DPS: Driver Licenses, ID & Public Safety Services", description: data.intro }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
  component: () => <PrioritySearchPage data={data} />,
});
