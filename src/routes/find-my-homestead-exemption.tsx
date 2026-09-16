import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';
import { LazyRelocationServiceFinder } from '@/components/relocation/LazyRelocationServiceFinder';
const canonicalPath='/find-my-homestead-exemption';
const description='Find county context for a Texas residence-homestead exemption and verify filing instructions with the responsible appraisal district.';
export const Route=createFileRoute('/find-my-homestead-exemption')({head:()=>({meta:buildMeta(texasDefinedBrand,{canonicalPath,title:'Find Where to File a Texas Homestead Exemption',description}),links:[canonicalLink(texasDefinedBrand,canonicalPath)]}),component:()=> <LazyRelocationServiceFinder kind="homestead"/>});
