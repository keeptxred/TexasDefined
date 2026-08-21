import { evidenceForMadeInTexasEntry } from '@/data/made-in-texas-evidence';
import { MADE_IN_TEXAS_RELATIONSHIP_LABELS, madeInTexasForCounty } from '@/data/made-in-texas';

export function CountyMadeBuiltBorn({ countySlug }: { countySlug: string }) {
  const entries = madeInTexasForCounty(countySlug);
  if (!entries.length) return null;

  return (
    <section className="border-b border-border py-12" aria-labelledby="made-built-born-heading">
      <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Made, built & born here</p>
          <h2 id="made-built-born-heading" className="mt-2 font-display text-3xl">Texas products and companies tied to this county</h2>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            Texas Defined separates products actually made or processed locally from companies that were founded, headquartered or operate major facilities here.
          </p>
        </div>
        <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
          {entries.map((entry) => {
            const evidence = evidenceForMadeInTexasEntry(entry.name);
            const relationshipLabel = entry.relationship === 'made-or-processed' && !evidence
              ? 'Texas production claim · source review queued'
              : MADE_IN_TEXAS_RELATIONSHIP_LABELS[entry.relationship];
            return (
              <article key={`${entry.name}-${entry.city}`} className="bg-background p-5">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-primary">{relationshipLabel}</p>
                <h3 className="mt-2 font-display text-2xl leading-tight">{entry.name}</h3>
                <p className="mt-1 text-sm font-medium">{entry.city}</p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{entry.note}</p>
                {evidence ? <a href={evidence.sourceUrl} target="_blank" rel="noreferrer" className="mt-4 inline-block text-xs font-semibold underline decoration-primary/50 underline-offset-4 hover:text-primary">Verified source: {evidence.sourceLabel} ↗</a> : null}
                {entry.href ? <a href={entry.href} className="mt-4 block text-sm font-semibold underline decoration-primary/50 underline-offset-4 hover:text-primary">Go deeper →</a> : null}
              </article>
            );
          })}
        </div>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs leading-5 text-muted-foreground">
        <p>Manufacturing footprints change. A Texas headquarters or founding city is not presented as proof that every current product is made in Texas.</p>
        <a href="/made-in-texas" className="font-semibold text-foreground underline decoration-primary/40 underline-offset-4 hover:text-primary">Browse the statewide Made in Texas guide →</a>
      </div>
    </section>
  );
}
