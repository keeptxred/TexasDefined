import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';
import { LazyRelocationServiceFinder } from '@/components/relocation/LazyRelocationServiceFinder';
const canonicalPath='/find-my-emergency-services';
const description='Find local Texas context and official emergency and community-service resources. Call 911 for an immediate emergency.';
export const Route=createFileRoute('/find-my-emergency-services')({head:()=>({meta:buildMeta(texasDefinedBrand,{canonicalPath,title:'Find Texas Emergency and Community Services',description}),links:[canonicalLink(texasDefinedBrand,canonicalPath)]}),component:()=> <LazyRelocationServiceFinder kind="emergency"/>});
