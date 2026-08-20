import { Link } from "@tanstack/react-router";

import { nominationEvidenceForChurch, paintedChurchThematicNomination } from "@/data/painted-church-thematic-nomination";

export function PaintedChurchNominationEvidence({ slug }: { slug: string }) {
  const evidence = nominationEvidenceForChurch(slug);
  if (!evidence.length) return null;

  return (
    <section aria-labelledby="thematic-nomination-evidence" className="mt-14 border-t border-border pt-8">
      <p className="eyebrow text-primary">1982 National Register study</p>
      <h2 id="thematic-nomination-evidence" className="mt-3 font-display text-4xl">What the original statewide nomination says about this church</h2>
      <p className="mt-5 max-w-4xl text-sm leading-7 text-muted-foreground">These are church-specific claims extracted from the original <em>Churches in Texas with Decorative Interior Painting</em> thematic nomination. Page numbers refer to that primary National Register document rather than a later travel summary.</p>
      <div className="mt-8 grid gap-px border border-border bg-border md:grid-cols-2">
        {evidence.map((item) => (
          <article key={item.id} className="bg-background p-6">
            <p className="eyebrow text-muted-foreground">{item.category} · nomination page{item.sourcePages.length > 1 ? "s" : ""} {item.sourcePages.join(", ")}</p>
            <h3 className="mt-2 font-display text-2xl">{item.title}</h3>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.summary}</p>
            <a href={paintedChurchThematicNomination.sourceUrl} target="_blank" rel="noreferrer" className="mt-4 inline-block border-b border-primary text-sm text-primary">Open primary nomination</a>
          </article>
        ))}
      </div>
      <p className="mt-5 text-xs leading-6 text-muted-foreground">Later conservation, parish and archival research can refine the 1982 record. <Link to="/explore/painted-churches/national-register-study" className="border-b border-primary text-primary">Read Texas Defined's source-by-source analysis of the original study.</Link></p>
    </section>
  );
}
