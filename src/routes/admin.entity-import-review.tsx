import { Link, createFileRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

const EntityImportReview = lazy(() =>
  import('@/components/admin/EntityImportReview').then((module) => ({ default: module.EntityImportReview })),
);

export const Route = createFileRoute('/admin/entity-import-review')({
  head: () => ({ meta: [{ title: 'Entity import review | TexasDefined' }, { name: 'robots', content: 'noindex,nofollow' }] }),
  component: EntityImportReviewPage,
});

function EntityImportReviewPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <header>
        <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Admin · Phase 3</p>
        <h1 className="mt-2 font-display text-4xl">Entity import review</h1>
        <p className="mt-3 max-w-3xl text-muted-foreground">Preview staged authoritative entity changes before any governed production promotion.</p>
        <nav className="mt-5 flex flex-wrap gap-4 text-sm" aria-label="Entity maintenance tools">
          <Link to="/admin/entity-maintenance" className="underline underline-offset-4">Entity maintenance</Link>
          <Link to="/admin/platform-health" className="underline underline-offset-4">Platform health</Link>
        </nav>
      </header>
      <Suspense fallback={<div className="mt-10 min-h-64" aria-hidden="true" />}>
        <EntityImportReview />
      </Suspense>
    </main>
  );
}
