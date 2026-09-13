import { lazy, Suspense } from 'react';
import type { RelocationFinderKind } from './RelocationServiceFinder';

const RelocationServiceFinder = lazy(async () => {
  const module = await import('./RelocationServiceFinder');
  return { default: module.RelocationServiceFinder };
});

export function LazyRelocationServiceFinder({ kind }: { kind: RelocationFinderKind }) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-16 text-sm text-muted-foreground sm:px-6 lg:px-8">
          Loading Texas relocation finder…
        </div>
      }
    >
      <RelocationServiceFinder kind={kind} />
    </Suspense>
  );
}
