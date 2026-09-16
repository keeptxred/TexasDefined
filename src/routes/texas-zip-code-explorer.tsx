import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';
import { LazyRelocationUtilityPage } from '@/components/relocation/LazyRelocationUtilityPage';
const canonicalPath='/texas-zip-code-explorer';
const description='Use a Texas ZIP code as a starting point, then verify county, school, utilities, broadband, flood and community-service details with official sources.';
export const Route=createFileRoute('/texas-zip-code-explorer')({head:()=>({meta:buildMeta(texasDefinedBrand,{canonicalPath,title:'Texas ZIP Code Explorer and Address Research Tool',description}),links:[canonicalLink(texasDefinedBrand,canonicalPath)]}),component:()=> <LazyRelocationUtilityPage kind="zip"/>});
