import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { TexasPlaceDirectory } from '@/components/directories/TexasPlaceDirectory';
import { buildMeta, canonicalLink } from '@/lib/seo';
const description='Browse all 254 Texas counties and continue to official county, appraisal district, election, and local-government resources.';
export const Route=createFileRoute('/browse/counties')({head:()=>({meta:buildMeta(texasDefinedBrand,{title:'Texas County Directory',description}),links:[canonicalLink(texasDefinedBrand,'/browse/counties')]}),component:()=> <TexasPlaceDirectory mode="counties" />});
