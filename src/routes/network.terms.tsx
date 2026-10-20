import {createFileRoute} from "@tanstack/react-router";
import {texasDefinedBrand} from "@/brand/texasdefined";
import {buildMeta,canonicalLink} from "@/lib/seo";

const canonicalPath="/network/terms";
export const Route=createFileRoute(canonicalPath)({
  head:()=>({
    meta:buildMeta(texasDefinedBrand,{
      canonicalPath,
      title:"Business Network Membership Terms",
      description:"Read the TexasDefined Business Network Membership Terms for business listings, submitted content, search indexing, and Plus recurring billing.",
    }),
    links:[canonicalLink(texasDefinedBrand,canonicalPath)],
  }),
});
