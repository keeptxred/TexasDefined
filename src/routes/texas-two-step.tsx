import { createFileRoute } from "@tanstack/react-router";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";
import { PRIORITY_SEARCH_PAGES } from "@/data/priority-search-pages";
import { buildMeta, canonicalLink } from "@/lib/seo";
const path = "/texas-two-step"; const data = PRIORITY_SEARCH_PAGES["texas-two-step"];
export const Route = createFileRoute(path)({ head: () => ({ meta: buildMeta(texasDefinedBrand,{canonicalPath:path,title:"Texas Two Step: How the Texas Lottery Game Works",description:data.intro}), links:[canonicalLink(texasDefinedBrand,path)] }), component: () => <PrioritySearchPage data={data} /> });
