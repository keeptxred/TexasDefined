import { lazy, Suspense } from 'react';
const Compare=lazy(()=>import('./CompareTexasCitiesPage'));
const Zip=lazy(()=>import('./TexasZipExplorerPage'));
export function LazyRelocationUtilityPage({kind}:{kind:'compare'|'zip'}){const Page=kind==='compare'?Compare:Zip;return <Suspense fallback={<main className="mx-auto w-full max-w-6xl px-5 py-12" role="status"><p className="text-sm text-muted-foreground">Loading relocation tools…</p></main>}><Page/></Suspense>}
