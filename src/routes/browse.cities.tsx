import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { TexasPlaceDirectory } from '@/components/directories/TexasPlaceDirectory';
import { buildMeta, canonicalLink } from '@/lib/seo';
const description='Browse major and regional Texas cities by county and region, with links into TexasDefined local guides and resources.';
export const Route=createFileRoute('/browse/cities')({head:()=>({meta:buildMeta(texasDefinedBrand,{title:'Texas City Directory',description}),links:[canonicalLink(texasDefinedBrand,'/browse/cities')]}),component:()=> <TexasPlaceDirectory mode="cities" />});
