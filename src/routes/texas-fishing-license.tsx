import { createFileRoute } from "@tanstack/react-router";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { PRIORITY_SEARCH_PAGES } from "@/data/priority-search-pages";
import { buildMeta, canonicalLink } from "@/lib/seo";
const path = "/texas-fishing-license"; const data = PRIORITY_SEARCH_PAGES["texas-fishing-license"];
export const Route = createFileRoute(path)({ head: () => ({ meta: buildMeta(texasDefinedBrand,{canonicalPath:path,title:"Texas Fishing License: Requirements, Fees & Official Links",description:data.intro}), links:[canonicalLink(texasDefinedBrand,path)] }), component: () => <PrioritySearchPage data={data} /> });
