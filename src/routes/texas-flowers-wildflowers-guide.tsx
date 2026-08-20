import { createFileRoute } from "@tanstack/react-router";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { TexasEvergreenGuide } from "@/components/editorial/TexasEvergreenGuide";
import { getTexasEvergreenGuideBatch8 } from "@/data/texas-evergreen-guides-batch8";
import { buildMeta, canonicalLink } from "@/lib/seo";
const guide=getTexasEvergreenGuideBatch8("texas-flowers-wildflowers-guide"); const canonicalPath="/texas-flowers-wildflowers-guide";
export const Route=createFileRoute(canonicalPath)({head:()=>({meta:buildMeta(texasDefinedBrand,{canonicalPath,title:"Texas Flowers & Wildflowers: What Blooms, When & Where",description:guide.dek,type:"article"}),links:[canonicalLink(texasDefinedBrand,canonicalPath)]}),component:()=> <TexasEvergreenGuide guide={guide}/>});
