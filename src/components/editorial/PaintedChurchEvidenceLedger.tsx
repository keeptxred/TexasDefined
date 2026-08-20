import { paintedChurchEvidenceLedgerBySlug } from "@/data/painted-church-evidence-ledger";

const statusLabel = {
  accepted: "Accepted",
  qualified: "Qualified",
  unresolved: "Unresolved",
} as const;

export function PaintedChurchEvidenceLedger({ slug }: { slug: string }) {
  const claims = paintedChurchEvidenceLedgerBySlug(slug);
  if (!claims.length) return null;

  return (
    <section aria-labelledby="evidence-ledger" className="mt-14 border-t border-border pt-8">
      <p className="eyebrow text-primary">Evidence ledger</p>
      <h2 id="evidence-ledger" className="mt-3 font-display text-4xl">What we claim, and what supports it</h2>
      <p className="mt-5 max-w-4xl text-sm leading-7 text-muted-foreground">
        Core claims are separated from interpretation. “Qualified” means the evidence supports the underlying fact but a scope, chronology, access or integrity limitation still matters. Texas Defined leaves unresolved questions visible rather than forcing a cleaner story than the record supports.
      </p>
      <div className="mt-8 space-y-5">
        {claims.map((item) => (
          <article key={item.id} className="border border-border p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="eyebrow text-muted-foreground">{item.category.replaceAll("-", " ")}</p>
                <h3 className="mt-2 font-display text-2xl">{item.label}</h3>
              </div>
              <span className="border border-border px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-foreground">
                {statusLabel[item.status]}
              </span>
            </div>
            <p className="mt-4 max-w-4xl text-sm leading-7 text-foreground/90">{item.claim}</p>
            {item.qualification ? <p className="mt-3 max-w-4xl border-l-2 border-primary pl-4 text-sm leading-7 text-muted-foreground">{item.qualification}</p> : null}
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {item.sources.map((source) => (
                <div key={`${item.id}-${source.url}-${source.use}`} className="bg-surface p-4">
                  <a href={source.url} target="_blank" rel="noreferrer" className="font-semibold text-primary hover:underline">{source.label}</a>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">Used for {source.use}.</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
