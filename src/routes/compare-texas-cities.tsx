import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';
import { LazyRelocationUtilityPage } from '@/components/relocation/LazyRelocationUtilityPage';
const canonicalPath='/compare-texas-cities';
const description='Compare Texas city, county and regional context side by side before narrowing a move to a neighborhood or address.';
export const Route=createFileRoute('/compare-texas-cities')({head:()=>({meta:buildMeta(texasDefinedBrand,{canonicalPath,title:'Compare Texas Cities for a Move',description}),links:[canonicalLink(texasDefinedBrand,canonicalPath)]}),component:()=> <LazyRelocationUtilityPage kind="compare"/>});
