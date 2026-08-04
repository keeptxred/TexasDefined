import { previewInternalLinkPolicyRollback } from '@/platform/internal-link-policy-diff';

export function InternalLinkRollbackPreview() {
  const rollback = previewInternalLinkPolicyRollback();
  return <section className="mt-12">
    <h2 className="font-display text-3xl">Internal-link policy rollback preview</h2>
    <p className="mt-2 text-sm text-muted-foreground">Read-only comparison of the current governed policy release with its prior immutable snapshot.</p>
    <article className="mt-6 rounded-md border border-border p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div><strong className="text-lg">{rollback.available ? `v${rollback.fromVersion} to v${rollback.toVersion}` : 'No rollback available'}</strong><p className="mt-1 text-sm text-muted-foreground">This preview never modifies the active policy registry.</p></div>
        <span className="rounded-full bg-muted px-3 py-1 text-xs">preview only</span>
      </div>
      {rollback.available ? <>
        <p className="mt-4 text-sm">The rollback would change {rollback.changeCount} governed fields.</p>
        <div className="mt-4 space-y-2">{rollback.changes.slice(0, 20).map((change, index) => <div className="rounded-md bg-muted p-3 text-xs" key={`${change.surface}-${change.field}-${index}`}><strong>{change.surface} · {change.field}</strong><p className="mt-1 break-words text-muted-foreground">{JSON.stringify(change.before)} → {JSON.stringify(change.after)}</p></div>)}</div>
      </> : <p className="mt-4 text-sm text-muted-foreground">No earlier immutable release exists yet. Rollback becomes available after the next governed policy release.</p>}
      <p className="mt-4 text-xs text-muted-foreground">Preview endpoint: <code>/api/internal-link-policy-rollback</code></p>
    </article>
  </section>;
}
