import { canonicalPaintedChurchArchivalImagesBySlug } from "@/data/painted-church-archival-image-index";

export function PaintedChurchArchivalImageSources({ slug }: { slug: string }) {
  const references = canonicalPaintedChurchArchivalImagesBySlug(slug);
  if (!references.length) return null;

  return (
    <section aria-labelledby="archival-image-sources" className="mt-14 border-t border-border pt-8">
      <p className="eyebrow text-primary">Archival image sources</p>
      <h2 id="archival-image-sources" className="mt-3 font-display text-4xl">Historic views and research photographs</h2>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
        These are exact church-specific records from archival, official or open-media collections. Texas Defined embeds an image only when the individual record supports reuse; otherwise we link the original item so the historical evidence is still available without overstating its license.
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {references.map((reference) => (
          <article key={reference.url} className="border border-border p-5">
            <p className="eyebrow text-muted-foreground">{reference.source}</p>
            <h3 className="mt-2 font-display text-2xl leading-tight">
              <a href={reference.url} target="_blank" rel="noreferrer" className="text-primary hover:underline">{reference.label}</a>
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{reference.subject}</p>
            {reference.credit ? <p className="mt-3 text-xs leading-6 text-muted-foreground">Credit: {reference.credit}</p> : null}
            <p className="mt-3 text-xs leading-6 text-muted-foreground">
              <strong className="text-foreground">Rights:</strong>{" "}
              {reference.rightsStatus === "no-known-restrictions"
                ? "No known restrictions on publication"
                : reference.rightsStatus === "collection-lead"
                  ? "Collection lead — check each file"
                  : "Item-level review required"}
            </p>
            <p className="mt-2 text-xs leading-6 text-muted-foreground">{reference.rightsNote}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
