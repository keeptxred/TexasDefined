import { runInternalLinkGoldenCorpus } from '@/platform/internal-link-test-corpus';

export function InternalLinkGoldenCorpus() {
  const report = runInternalLinkGoldenCorpus();
  return <section className="mt-10">
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="font-display text-3xl">Golden link-quality corpus</h2>
        <p className="mt-2 text-sm text-muted-foreground">Deterministic Texas examples verify disambiguation, topic priority, ambiguity rejection, self-link prevention, and exposure balancing.</p>
      </div>
      <span className="rounded-full bg-muted px-3 py-1 text-sm font-medium">{report.passedCount}/{report.total} passing</span>
    </div>
    <div className="mt-6 space-y-3">
      {report.cases.map((testCase) => <article key={testCase.id} className="rounded-md border border-border p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div><strong>{testCase.id}</strong><p className="mt-1 text-sm text-muted-foreground">{testCase.description}</p></div>
          <span className="rounded-full bg-muted px-2 py-1 text-xs">{testCase.passed ? 'Passing' : 'Failing'}</span>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Expected: {testCase.expectedEntityIds.join(', ') || 'no link'} · Actual: {testCase.actualEntityIds.join(', ') || 'no link'}</p>
      </article>)}
    </div>
  </section>;
}
