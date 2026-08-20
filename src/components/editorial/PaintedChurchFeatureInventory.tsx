import { Link } from "@tanstack/react-router";

import { paintedChurchFeaturesBySlug } from "@/data/painted-church-features";

export function PaintedChurchFeatureInventory({ slug }: { slug: string }) {
  const features = paintedChurchFeaturesBySlug(slug);
  if (!features.length) return null;

  return (
    <section aria-labelledby="interior-feature-inventory" className="mt-14 border-t border-border pt-8">
      <p className="eyebrow text-primary">Artwork & interior feature inventory</p>
      <h2 id="interior-feature-inventory" className="mt-3 font-display text-4xl">Documented objects and decorative features inside this church</h2>
      <p className="mt-5 max-w-4xl text-sm leading-7 text-muted-foreground">These entries identify specific features rather than treating the interior as one undifferentiated painting campaign. Integrity labels distinguish historic, restored, reconstructed, modern and unresolved work.</p>
      <div className="mt-8 grid gap-px border border-border bg-border md:grid-cols-2">
        {features.map((feature) => (
          <article key={feature.id} className="bg-background p-6">
            <p className="eyebrow text-muted-foreground">{feature.type.replaceAll("-", " ")} · {feature.integrity.replaceAll("-", " ")}</p>
            <h3 className="mt-2 font-display text-2xl">{feature.name}</h3>
            <p className="mt-2 text-xs uppercase tracking-[0.12em] text-muted-foreground">{feature.location}{feature.dateOrPeriod ? ` · ${feature.dateOrPeriod}` : ""}</p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{feature.description}</p>
            <a href={feature.sourceUrl} target="_blank" rel="noreferrer" className="mt-4 inline-block border-b border-primary text-sm text-primary">{feature.sourceLabel}</a>
          </article>
        ))}
      </div>
      <Link to="/explore/painted-churches/features" className="mt-6 inline-block border-b border-primary text-sm text-primary">Open the statewide artwork and feature inventory</Link>
    </section>
  );
}
