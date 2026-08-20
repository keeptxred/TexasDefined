import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { paintedChurchArchivalImagesBySlug } from "@/data/painted-church-archival-images";
import { expansionPaintedChurchArchivalImagesBySlug } from "@/data/painted-church-archival-images-expansion";
import { extraPaintedChurchGalleryBySlug } from "@/data/painted-church-gallery-extra";
import { supplementalPaintedChurchGalleryBySlug } from "@/data/painted-church-gallery-supplemental";
import { paintedChurchGalleryBySlug } from "@/data/painted-church-gallery";
import { expandedPaintedChurches } from "@/data/painted-churches-expanded";
import { buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/painted-churches/then-and-now";
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}${canonicalPath}`;
const description = "Historic Texas Painted Church records paired with current rights-cleared photography, with archival provenance, image-rights status and a transparent church-by-church coverage backlog.";

const rows = expandedPaintedChurches.map((church) => {
  const archival = [...new Map([
    ...paintedChurchArchivalImagesBySlug(church.slug),
    ...expansionPaintedChurchArchivalImagesBySlug(church.slug),
  ].map((item) => [item.url, item])).values()];
  const current = [...new Map([
    ...paintedChurchGalleryBySlug(church.slug),
    ...extraPaintedChurchGalleryBySlug(church.slug),
    ...supplementalPaintedChurchGalleryBySlug(church.slug),
  ].map((item) => [item.sourceUrl, item])).values()];
  return { church, archival, current, paired: archival.length > 0 && current.length > 0 };
});

const paired = rows.filter((row) => row.paired);
const archivalOnly = rows.filter((row) => row.archival.length > 0 && row.current.length === 0);
const currentOnly = rows.filter((row) => row.archival.length === 0 && row.current.length > 0);
const neither = rows.filter((row) => row.archival.length === 0 && row.current.length === 0);

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: "Texas Painted Churches Then & Now | Archival Photo Guide", description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "CollectionPage", "@id": `${pageUrl}#page`, url: pageUrl, name: "Texas Painted Churches Then & Now", description, mainEntity: { "@id": `${pageUrl}#pairs` }, about: { "@type": "Thing", name: "Texas Painted Churches visual history" } },
        { "@type": "ItemList", "@id": `${pageUrl}#pairs`, numberOfItems: paired.length, itemListElement: paired.map((row, index) => ({ "@type": "ListItem", position: index + 1, item: { "@type": "Church", name: row.church.name, url: `${siteUrl}/explore/painted-churches/${row.church.slug}` } })) },
      ],
    })],
  }),
  component: ThenAndNowIndex,
});

function ThenAndNowIndex() {
  return <main>
    <section className="border-b border-border bg-surface"><Container className="py-16 sm:py-24">
      <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap gap-2"><li><Link to="/">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches">Painted Churches</Link></li><li aria-hidden>·</li><li aria-current="page">Then & now</li></ol></nav>
      <p className="eyebrow mt-8 text-primary">Archival comparison project</p>
      <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">Texas Painted Churches, then and now.</h1>
      <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">Historic records are paired only with current church-specific photographs whose reuse terms have been verified. When an archive does not grant republication rights, Texas Defined links the historic item instead of copying it. Every verified church remains visible in the coverage accounting, including those still missing both sides of the comparison.</p>
    </Container></section>

    <Container className="py-14 sm:py-18">
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4" aria-label="Then and now coverage status">
        <Stat value={paired.length} label="Archival + current pairs" />
        <Stat value={archivalOnly.length} label="Archival only" />
        <Stat value={currentOnly.length} label="Current image only" />
        <Stat value={neither.length} label="Still needs both sides" />
      </section>
      <p className="mt-5 text-xs leading-6 text-muted-foreground">Coverage accounting: {paired.length + archivalOnly.length + currentOnly.length + neither.length} of {expandedPaintedChurches.length} verified churches represented. The totals always reconcile to the canonical statewide collection.</p>

      <section className="mt-14 border-t-2 border-foreground pt-8">
        <p className="eyebrow text-primary">Paired records</p>
        <h2 className="mt-3 font-display text-4xl">Churches you can compare now</h2>
        <div className="mt-8 grid gap-px border border-border bg-border md:grid-cols-2">
          {paired.map(({ church, archival, current }) => <article key={church.slug} className="bg-background p-6">
            <p className="eyebrow text-muted-foreground">{church.city} · {church.county} County</p>
            <h3 className="mt-2 font-display text-3xl"><Link to="/explore/painted-churches/$slug" params={{ slug: church.slug }} className="hover:text-primary">{church.shortName}</Link></h3>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{archival.length} archival research {archival.length === 1 ? "record" : "records"} · {current.length} rights-cleared current {current.length === 1 ? "image" : "images"}</p>
            <p className="mt-3 text-xs leading-6 text-muted-foreground"><strong className="text-foreground">Historic lead:</strong> {archival[0].label} · {archival[0].source}</p>
            <p className="mt-2 text-xs leading-6 text-muted-foreground"><strong className="text-foreground">Current image:</strong> {current[0].credit} · {current[0].license}</p>
            <Link to="/explore/painted-churches/$slug" params={{ slug: church.slug }} className="mt-5 inline-block border-b border-primary text-sm text-primary">Open church comparison</Link>
          </article>)}
        </div>
      </section>

      {archivalOnly.length ? <section className="mt-14 border-t border-border pt-8"><p className="eyebrow text-primary">Rights-clearing queue</p><h2 className="mt-3 font-display text-4xl">Archival evidence without a reusable modern counterpart</h2><div className="mt-7 grid gap-5 md:grid-cols-2">{archivalOnly.map(({ church, archival }) => <article key={church.slug} className="border border-border p-6"><h3 className="font-display text-2xl"><Link to="/explore/painted-churches/$slug" params={{ slug: church.slug }} className="hover:text-primary">{church.shortName}</Link></h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{archival.length} exact archival/research {archival.length === 1 ? "record is" : "records are"} already linked. Texas Defined is still withholding a modern embedded image until an exact subject and item-level reusable license are both established.</p></article>)}</div></section> : null}

      {currentOnly.length ? <section className="mt-14 border-t border-border pt-8"><p className="eyebrow text-primary">Archive research queue</p><h2 className="mt-3 font-display text-4xl">Reusable current photography without an archival counterpart</h2><div className="mt-7 grid gap-5 md:grid-cols-2">{currentOnly.map(({ church, current }) => <article key={church.slug} className="border border-border p-6"><h3 className="font-display text-2xl"><Link to="/explore/painted-churches/$slug" params={{ slug: church.slug }} className="hover:text-primary">{church.shortName}</Link></h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{current.length} current rights-cleared {current.length === 1 ? "image is" : "images are"} available. The next research task is an exact historical photograph, survey image or other church-specific archival visual record with provenance.</p></article>)}</div></section> : null}

      {neither.length ? <section className="mt-14 border-t border-border pt-8"><p className="eyebrow text-primary">Open visual-research queue</p><h2 className="mt-3 font-display text-4xl">Churches still needing both archival and reusable current imagery</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">These churches remain fully verified members of the historical collection. Their absence from the paired gallery reflects image provenance or licensing gaps—not uncertainty about church identity. Texas Defined will not fill these slots with generic church photography.</p><div className="mt-7 grid gap-5 md:grid-cols-2">{neither.map(({ church }) => <article key={church.slug} className="border border-border p-6"><p className="eyebrow text-muted-foreground">{church.city} · {church.county} County</p><h3 className="mt-2 font-display text-2xl"><Link to="/explore/painted-churches/$slug" params={{ slug: church.slug }} className="hover:text-primary">{church.shortName}</Link></h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Research priority: locate an exact archival visual record and an exact modern photograph with item-level reusable rights.</p></article>)}</div></section> : null}

      <section className="mt-14 border-l-2 border-primary bg-surface p-6 sm:p-8">
        <p className="eyebrow text-primary">Methodology</p>
        <h2 className="mt-3 font-display text-3xl">A visual comparison is evidence, not decoration.</h2>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">The historic and current images do not have to share an identical camera angle. The purpose is to document the church across time while preserving source provenance, restoration context and image rights. A search thumbnail, category page or unattributed repost is never enough to publish an image.</p>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm"><Link to="/explore/painted-churches/methodology" className="border-b border-primary text-primary">Research & image-rights methodology</Link><Link to="/explore/painted-churches/preservation" className="border-b border-primary text-primary">Preservation & authenticity</Link><Link to="/explore/painted-churches/cite" className="border-b border-primary text-primary">Citation guidance</Link></div>
      </section>
    </Container>
  </main>;
}

function Stat({ value, label }: { value: number; label: string }) { return <div className="border-t border-border pt-5"><p className="font-display text-5xl">{value}</p><p className="eyebrow mt-2 text-muted-foreground">{label}</p></div>; }
