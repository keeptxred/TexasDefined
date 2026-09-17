import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';
import { LazyRelocationServiceFinder } from '@/components/relocation/LazyRelocationServiceFinder';
const canonicalPath='/find-my-property-tax';
const description='Find county context for Texas appraisal-district and property-tax office research, then verify the parcel with official local sources.';
export const Route=createFileRoute('/find-my-property-tax')({head:()=>({meta:buildMeta(texasDefinedBrand,{canonicalPath,title:'Find Your Texas Property Tax and Appraisal Offices',description}),links:[canonicalLink(texasDefinedBrand,canonicalPath)]}),component:()=> <LazyRelocationServiceFinder kind="property-tax"/>});
