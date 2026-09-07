import { Suspense, lazy } from "react";

const TexasBrandLocatorInteractive = lazy(() => import("./TexasBrandLocatorInteractive"));

export function TexasBrandLocator() {
  return (
    <Suspense
      fallback={(
        <section aria-labelledby="texas-brand-locator-loading-heading" className="mb-12 border-y border-border bg-muted/20 py-8 sm:px-8">
          <div className="px-6 sm:px-0">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Texas brand locator</p>
            <h2 id="texas-brand-locator-loading-heading" className="mt-2 font-display text-4xl">Find your H-E-B or Buc-ee's</h2>
            <p className="mt-4 text-sm text-muted-foreground">Loading the Texas location finder…</p>
          </div>
        </section>
      )}
    >
      <TexasBrandLocatorInteractive />
    </Suspense>
  );
}
