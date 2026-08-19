import { Link } from "@tanstack/react-router";

import { paintedChurchArchivalImagesBySlug } from "@/data/painted-church-archival-images";
import { expansionPaintedChurchArchivalImagesBySlug } from "@/data/painted-church-archival-images-expansion";
import { extraPaintedChurchGalleryBySlug } from "@/data/painted-church-gallery-extra";
import { supplementalPaintedChurchGalleryBySlug } from "@/data/painted-church-gallery-supplemental";
import { paintedChurchGalleryBySlug } from "@/data/painted-church-gallery";

export function PaintedChurchThenAndNow({ slug }: { slug: string }) {
  const archival = [...new Map([
    ...paintedChurchArchivalImagesBySlug(slug),
    ...expansionPaintedChurchArchivalImagesBySlug(slug),
  ].map((item) => [item.url, item])).values()];
  const current = [...new Map([
    ...paintedChurchGalleryBySlug(slug),
    ...extraPaintedChurchGalleryBySlug(slug),
    ...supplementalPaintedChurchGalleryBySlug(slug),
  ].map((item) => [item.sourceUrl, item])).values()];
  if (!archival.length || !current.length) return null;

  const archivalPrimary = archival[0];
  const currentPrimary = current[0];

  return (
    <section aria-labelledby="then-and-now" className="mt-14 border-t border-border pt-8">
      <p className="eyebrow text-primary">Then & now</p>
      <h2 id="then-and-now" className="mt-3 font-display text-4xl">Historic evidence beside a current rights-cleared view</h2>
      <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">
        The pair below is a research comparison, not necessarily the same camera angle. The historic side always links to the controlling archival record; the current side uses a church-specific image whose reuse terms have been verified. This keeps visual change, restoration and continuity visible without republishing restricted archival material.
      </p>

      <div className="mt-8 grid gap-px border border-border bg-border md:grid-cols-2">
        <article className="bg-background p-6">
          <p className="eyebrow text-muted-foreground">Then · archival record</p>
          <h3 className="mt-2 font-display text-2xl leading-tight">{archivalPrimary.label}</h3>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">{archivalPrimary.subject}</p>
          <dl className="mt-5 space-y-3 text-xs leading-6 text-muted-foreground">
            <div><dt className="font-semibold text-foreground">Archive</dt><dd>{archivalPrimary.source}</dd></div>
            {archivalPrimary.credit ? <div><dt className="font-semibold text-foreground">Credit</dt><dd>{archivalPrimary.credit}</dd></div> : null}
            <div><dt className="font-semibold text-foreground">Reuse status</dt><dd>{archivalPrimary.rightsStatus === "no-known-restrictions" ? "No known restrictions on publication" : archivalPrimary.rightsStatus === "collection-lead" ? "Collection lead — individual file review required" : "Item-level permissions review required"}</dd></div>
          </dl>
          <a href={archivalPrimary.url} target="_blank" rel="noreferrer" className="mt-5 inline-block border-b border-primary text-sm text-primary">Open the archival record</a>
        </article>

        <figure className="bg-background p-6">
          <p className="eyebrow text-muted-foreground">Now · rights-cleared photograph</p>
          <img src={currentPrimary.src} alt={currentPrimary.alt} width={currentPrimary.width} height={currentPrimary.height} loading="lazy" decoding="async" className="mt-4 aspect-[4/3] w-full object-cover" />
          <figcaption className="mt-4 text-sm leading-7 text-muted-foreground">
            {currentPrimary.caption}
            <span className="mt-2 block text-xs leading-6">{currentPrimary.credit} · {currentPrimary.license} · <a href={currentPrimary.sourceUrl} target="_blank" rel="noreferrer" className="border-b border-primary text-primary">source & license</a></span>
          </figcaption>
        </figure>
      </div>

      {archival.length > 1 || current.length > 1 ? <p className="mt-5 text-xs leading-6 text-muted-foreground">This church has {archival.length} archival research {archival.length === 1 ? "record" : "records"} and {current.length} rights-cleared current {current.length === 1 ? "image" : "images"}. Additional records remain available in the archival and gallery sections on this page.</p> : null}

      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm">
        <Link to="/explore/painted-churches/preservation" className="border-b border-primary text-primary">Understand restoration and authenticity</Link>
        <Link to="/explore/painted-churches/methodology" className="border-b border-primary text-primary">Image-rights methodology</Link>
      </div>
    </section>
  );
}
