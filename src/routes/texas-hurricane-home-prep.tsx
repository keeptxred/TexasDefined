import { createFileRoute } from "@tanstack/react-router";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { TexasEvergreenGuide } from "@/components/editorial/TexasEvergreenGuide";
import { getTexasEvergreenGuideBatch8 } from "@/data/texas-evergreen-guides-batch8";
import { buildMeta, canonicalLink } from "@/lib/seo";
const guide=getTexasEvergreenGuideBatch8("texas-hurricane-home-prep"); const canonicalPath="/texas-hurricane-home-prep";
export const Route=createFileRoute(canonicalPath)({head:()=>({meta:buildMeta(texasDefinedBrand,{canonicalPath,title:"How to Prepare Your Texas Home for a Hurricane",description:guide.dek,type:"article"}),links:[canonicalLink(texasDefinedBrand,canonicalPath)]}),component:()=> <TexasEvergreenGuide guide={guide}/>});
