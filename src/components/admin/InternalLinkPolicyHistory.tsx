import {
  INTERNAL_LINK_POLICY_HISTORY,
  currentInternalLinkPolicyRelease,
  validateInternalLinkPolicyHistory,
} from '@/platform/internal-link-policy-history';
import { validateInternalLinkPolicies } from '@/platform/internal-link-policies';

export function InternalLinkPolicyHistory() {
  const current = currentInternalLinkPolicyRelease();
  const historyHealth = validateInternalLinkPolicyHistory();
  const policyHealth = validateInternalLinkPolicies();
  const previous = INTERNAL_LINK_POLICY_HISTORY[1];
  const fingerprintMatches = current?.fingerprint === policyHealth.fingerprint;

  return <section className="mt-12">
    <div className="mb-8 rounded-md border border-border p-5 sm:flex sm:items-center sm:justify-between sm:gap-6">
      <div><h2 className="font-display text-2xl">Cross-site governance operations</h2><p className="mt-2 text-sm text-muted-foreground">Review durable TexasDefined and KeepTXRed publication decisions, override outcomes, ownership drift, and persistence health.</p></div>
      <a href="/admin/governance-health" className="mt-4 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground sm:mt-0">Open governance health</a>
    </div>
    <h2 className="font-display text-3xl">Internal-link policy releases</h2>
    <p className="mt-2 text-sm text-muted-foreground">Versioned, reviewed snapshots of the governed linking rules. The current release fingerprint must match the active policy set.</p>
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Metric value={current ? `v${current.version}` : 'Missing'} label="Current release" />
      <Metric value={current?.changeType ?? 'Unknown'} label="Change class" />
      <Metric value={fingerprintMatches ? 'Matched' : 'Mismatch'} label="Fingerprint" />
      <Metric value={historyHealth.valid ? 'Healthy' : 'Needs review'} label="Release history" />
    </div>
    {current && <article className="mt-6 rounded-md border border-border p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div><strong className="text-lg">Release {current.version}</strong><p className="mt-1 text-sm text-muted-foreground">Reviewed {current.reviewedAt} · {current.fingerprint}</p></div>
        <span className="rounded-full bg-muted px-3 py-1 text-xs capitalize">{current.changeType}</span>
      </div>
      <p className="mt-4 text-sm">{current.summary}</p>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">{current.changes.map((change) => <li key={change}>{change}</li>)}</ul>
      <p className="mt-4 text-xs text-muted-foreground">{previous ? `Previous release available for rollback context: v${previous.version}.` : 'This is the first governed release; no earlier snapshot exists yet.'}</p>
    </article>}
    {!fingerprintMatches && <p className="mt-4 rounded-md border border-destructive/40 p-4 text-sm">The active policy fingerprint does not match the current release history entry. Update the versioned release record before publishing.</p>}
    {historyHealth.errors.length > 0 && <div className="mt-4 rounded-md border border-destructive/40 p-4">{historyHealth.errors.map((error) => <p className="text-sm" key={error}>{error}</p>)}</div>}
  </section>;
}
function Metric({ value, label }: { value: string; label: string }) { return <article className="rounded-md border border-border p-5"><strong className="font-display text-2xl capitalize">{value}</strong><span className="mt-2 block text-sm text-muted-foreground">{label}</span></article>; }
