import { musicResearchDossiers } from "@/data/texas-music-history-dossiers";

/**
 * Verified record versus editorial interpretation: displayed separately so
 * readers can check the factual basis without mistaking synthesis for source.
 */
export function TexasMusicEvidenceDossier({ slug }: { slug: string }) {
  const dossier = musicResearchDossiers[slug];
  if (!dossier) return null;
  return (
    <section className="border-b border-border py-10" aria-labelledby="music-research-dossier">
      <p className="eyebrow text-primary">Research file · records and interpretation</p>
      <h2 id="music-research-dossier" className="mt-2 font-display text-4xl">{dossier.heading}</h2>
      <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">{dossier.introduction}</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {dossier.findings.map((finding) => (
          <section key={finding.heading} className="border-t border-primary/40 pt-5">
            <h3 className="font-display text-2xl leading-tight">{finding.heading}</h3>
            <p className="mt-4 text-sm font-semibold">What the record establishes</p>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{finding.record}</p>
            <a href={finding.href} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-medium text-primary underline underline-offset-4">{finding.source} ↗</a>
            <p className="mt-5 text-sm font-semibold">Our reading</p>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{finding.reading}</p>
          </section>
        ))}
      </div>
      <p className="mt-8 border-t border-border pt-5 text-sm leading-7 text-muted-foreground"><strong>What remains uncertain:</strong> {dossier.caution}</p>
    </section>
  );
}
