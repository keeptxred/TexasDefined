import { createFileRoute } from "@tanstack/react-router";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { TexasEvergreenGuide } from "@/components/editorial/TexasEvergreenGuide";
import { getTexasEvergreenGuideBatch8 } from "@/data/texas-evergreen-guides-batch8";
import { buildMeta, canonicalLink } from "@/lib/seo";
const guide=getTexasEvergreenGuideBatch8("texas-pool-guide"); const canonicalPath="/texas-pool-guide";
export const Route=createFileRoute(canonicalPath)({head:()=>({meta:buildMeta(texasDefinedBrand,{canonicalPath,title:"Texas Pool Guide: Winterizing, Opening, Freezes & Storm Prep",description:guide.dek,type:"article"}),links:[canonicalLink(texasDefinedBrand,canonicalPath)]}),component:()=> <TexasEvergreenGuide guide={guide}/>});
