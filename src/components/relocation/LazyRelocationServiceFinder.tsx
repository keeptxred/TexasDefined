import { lazy, Suspense } from 'react';
import type { RelocationFinderKind } from './RelocationServiceFinder';
const Finder=lazy(async()=>{const m=await import('./RelocationServiceFinder');return{default:m.RelocationServiceFinder}});
export function LazyRelocationServiceFinder({kind}:{kind:RelocationFinderKind}){return <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-16 text-sm text-muted-foreground">Loading Texas relocation finder…</div>}><Finder kind={kind}/></Suspense>}
