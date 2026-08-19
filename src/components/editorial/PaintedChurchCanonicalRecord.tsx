import { Link } from "@tanstack/react-router";

import { expandedPaintedChurchBySlug } from "@/data/painted-churches-expanded";

const classificationLabels = {
  "formal-national-register-group": "Formal National Register decorative-interior group",
  "broader-historic-tradition": "Broader historic Painted Churches tradition",
  "modern-decorative-campaign": "Modern documented decorative campaign",
} as const;

const integrityLabels = {
  "largely-original": "Largely original decorative program",
  "restored-original-scheme": "Restored original decorative scheme",
  "reconstructed-from-evidence": "Reconstructed from surviving evidence",
  "extensively-repainted": "Extensively repainted / layered interior",
  "modern-decorative-campaign": "Modern decorative campaign",
  "uncertain": "Integrity still under research",
} as const;

export function PaintedChurchCanonicalRecord({ slug }: { slug: string }) {
  const church = expandedPaintedChurchBySlug(slug);
  if (!church) return null;

  return (
    <section aria-labelledby="canonical-record" className="mt-14 border-t border-border pt-8">
      <p className="eyebrow text-primary">Texas Defined classification</p>
      <h2 id="canonical-record" className="mt-3 font-display text-4xl">Where this church fits in the statewide record</h2>
      <dl className="mt-8 grid border-y border-border sm:grid-cols-2">
        <div className="border-b border-border py-5 sm:border-r sm:pr-6"><dt className="eyebrow text-muted-foreground">Collection classification</dt><dd className="mt-2 text-base leading-7">{classificationLabels[church.classification]}</dd></div>
        <div className="border-b border-border py-5 sm:pl-6"><dt className="eyebrow text-muted-foreground">Interior integrity</dt><dd className="mt-2 text-base leading-7">{integrityLabels[church.interiorIntegrity]}</dd></div>
        <div className="border-b border-border py-5 sm:border-r sm:pr-6"><dt className="eyebrow text-muted-foreground">Cultural heritage</dt><dd className="mt-2 text-base leading-7">{church.culturalHeritage.length ? church.culturalHeritage.join(" · ") : "Not yet assigned"}</dd></div>
        <div className="border-b border-border py-5 sm:pl-6"><dt className="eyebrow text-muted-foreground">Documented techniques</dt><dd className="mt-2 text-base leading-7">{church.techniques.length ? church.techniques.length : "Still under technique review"}</dd></div>
      </dl>
      {church.techniques.length ? <div className="mt-6 flex flex-wrap gap-3">{church.techniques.map((technique) => <Link key={technique} to="/explore/painted-churches/techniques/$slug" params={{ slug: technique }} className="border border-border px-4 py-2 text-sm hover:border-primary hover:text-primary">{technique.replaceAll("-", " ")}</Link>)}</div> : null}
      <p className="mt-6 max-w-4xl text-sm leading-7 text-muted-foreground">Classification describes the evidence category, not artistic quality. Interior-integrity labels distinguish untouched or surviving historic work from restoration, evidence-based reconstruction, later repainting and modern decorative campaigns.</p>
      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm"><Link to="/explore/painted-churches/census" className="border-b border-primary text-primary">Open the master census</Link><Link to="/explore/painted-churches/methodology" className="border-b border-primary text-primary">Read classification methodology</Link></div>
    </section>
  );
}
