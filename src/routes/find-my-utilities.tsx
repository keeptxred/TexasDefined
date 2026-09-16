import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';
import { LazyRelocationServiceFinder } from '@/components/relocation/LazyRelocationServiceFinder';
const canonicalPath='/find-my-utilities';
const description='Research Texas utility service areas and verify an exact address with official Public Utility Commission tools.';
export const Route=createFileRoute('/find-my-utilities')({head:()=>({meta:buildMeta(texasDefinedBrand,{canonicalPath,title:'Find Utilities for a Texas Address',description}),links:[canonicalLink(texasDefinedBrand,canonicalPath)]}),component:()=> <LazyRelocationServiceFinder kind="utilities"/>});
