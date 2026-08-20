import { paintedChurchSourcesForChurch, type PaintedChurchSourceTier } from "@/data/painted-church-source-registry";

const tierLabel: Record<PaintedChurchSourceTier, string> = {
  "primary-official": "Primary / official",
  "archive-register": "Archive / historic register",
  "scholarly-public-history": "Scholarly / public history",
  "current-organization": "Current responsible organization",
  "secondary-discovery": "Secondary / discovery",
};

const tierRank: Record<PaintedChurchSourceTier, number> = {
  "primary-official": 0,
  "archive-register": 1,
  "current-organization": 2,
  "scholarly-public-history": 3,
  "secondary-discovery": 4,
};

export function PaintedChurchSourceBibliography({ slug }: { slug: string }) {
  const sources = [...paintedChurchSourcesForChurch(slug)].sort((a, b) => tierRank[a.tier] - tierRank[b.tier] || a.label.localeCompare(b.label));
  if (!sources.length) return null;

  return (
    <section aria-labelledby="church-source-bibliography" className="mt-14 border-t border-border pt-8">
      <p className="eyebrow text-primary">Canonical bibliography</p>
      <h2 id="church-source-bibliography" className="mt-3 font-display text-4xl">Every source tied to this church</h2>
      <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">
        This bibliography merges property records, National Register material, parish or congregation sources, scholarly research, visitor-control sources, map provenance and object-level evidence. Duplicate URLs are consolidated so readers can see why each source is used.
      </p>
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {sources.map((source) => (
          <article key={source.id} className="border border-border p-5">
            <p className="eyebrow text-muted-foreground">{tierLabel[source.tier]}</p>
            <a href={source.url} target="_blank" rel="noreferrer" className="mt-2 inline-block font-display text-xl leading-tight text-primary hover:underline">{source.label}</a>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-muted-foreground">
              {source.uses.map((use) => <li key={use}>{use}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
