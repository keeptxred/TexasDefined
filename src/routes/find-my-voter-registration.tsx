import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';
import { LazyRelocationServiceFinder } from '@/components/relocation/LazyRelocationServiceFinder';
const canonicalPath='/find-my-voter-registration';
const description='Find Texas county context and continue to the official Texas voter-registration portal for status and requirements.';
export const Route=createFileRoute('/find-my-voter-registration')({head:()=>({meta:buildMeta(texasDefinedBrand,{canonicalPath,title:'Texas Voter Registration Finder',description}),links:[canonicalLink(texasDefinedBrand,canonicalPath)]}),component:()=> <LazyRelocationServiceFinder kind="voter"/>});
