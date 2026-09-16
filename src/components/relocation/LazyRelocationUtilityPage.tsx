import { lazy, Suspense } from 'react';
const Compare=lazy(()=>import('./CompareTexasCitiesPage'));
const Zip=lazy(()=>import('./TexasZipExplorerPage'));
export function LazyRelocationUtilityPage({kind}:{kind:'compare'|'zip'}){const Page=kind==='compare'?Compare:Zip;return <Suspense fallback={<main className="min-h-screen"/>}><Page/></Suspense>}
