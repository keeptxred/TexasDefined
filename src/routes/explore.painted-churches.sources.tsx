import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { paintedChurchSourceRegistry } from "@/data/painted-church-source-registry";
import { buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/painted-churches/sources";
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const description = "Source registry for Texas Defined's Painted Churches research: primary records, archives, current churches, scholarship and discovery sources with creator, date, verification, research use and church relationships where known.";

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: "Texas Painted Churches Source Registry", description, modifiedTime: "2026-08-20T17:45:00-05:00" }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      "@context": "https://schema.org",
      "@type": "Dataset",
      "@id": `${siteUrl}${canonicalPath}#dataset`,
      name: "Texas Painted Churches source provenance registry",
      description,
      url: `${siteUrl}${canonicalPath}`,
      dateModified: "2026-08-20",
      variableMeasured: ["Source URL", "Source tier", "Creator or institution", "Publication or record date", "Verification date", "Citation note or archive locator", "Research use", "Connected church", "Global reference status"],
    })],
  }),
  component: PaintedChurchSources,
});

function PaintedChurchSources() {
  const tiers = ["primary-official", "archive-register", "scholarly-public-history", "current-organization", "secondary-discovery"] as const;
  return <main>
    <section className="border-b border-border bg-surface"><Container className="py-16 sm:py-24">
      <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap gap-2"><li><Link to="/">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches">Painted Churches</Link></li><li aria-hidden>·</li><li aria-current="page">Sources</li></ol></nav>
      <p className="eyebrow mt-8 text-primary">Research provenance</p>
      <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">The source registry behind the Painted Churches reference work.</h1>
      <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">Texas Defined records sources as research objects, not just links at the bottom of articles. The registry tracks what each source is used for, which churches it supports, who created or maintains it, when the underlying record dates from, when we last checked it, and archival citation notes where those details are known.</p>
      <p className="mt-6 font-display text-4xl">{paintedChurchSourceRegistry.length} normalized source records</p>
    </Container></section>
    <Container className="py-14 sm:py-18">
      <section className="border-l-2 border-primary bg-surface p-6 sm:p-8"><p className="eyebrow text-primary">How to read this registry</p><p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">Blank creator, date or citation-note fields are deliberate. A URL alone does not justify inventing publication metadata. Verification dates describe Texas Defined's source check, not the age of the historic fact itself.</p></section>
      {tiers.map((tier) => {
        const sources = paintedChurchSourceRegistry.filter((source) => source.tier === tier);
        if (!sources.length) return null;
        return <section key={tier} className="mt-14 border-t border-border pt-8"><p className="eyebrow text-primary">{tier.replaceAll("-", " ")}</p><h2 className="mt-3 font-display text-4xl">{sources.length} source{sources.length === 1 ? "" : "s"}</h2><div className="mt-8 grid gap-px border border-border bg-border md:grid-cols-2">{sources.map((source) => <article key={source.id} className="bg-background p-6"><h3 className="font-display text-2xl"><a href={source.url} target="_blank" rel="noreferrer" className="hover:text-primary">{source.label}</a></h3><dl className="mt-4 grid gap-3 text-sm leading-6 text-muted-foreground">{source.creator ? <div><dt className="eyebrow text-muted-foreground">Creator / institution</dt><dd className="mt-1">{source.creator}</dd></div> : null}{source.date ? <div><dt className="eyebrow text-muted-foreground">Record / publication date</dt><dd className="mt-1">{source.date}</dd></div> : null}{source.checkedAt ? <div><dt className="eyebrow text-muted-foreground">Texas Defined checked</dt><dd className="mt-1">{source.checkedAt}</dd></div> : null}{source.citationNote ? <div><dt className="eyebrow text-muted-foreground">Citation / archive note</dt><dd className="mt-1">{source.citationNote}</dd></div> : null}<div><dt className="eyebrow text-muted-foreground">Used for</dt><dd className="mt-1">{source.uses.join(" · ")}</dd></div></dl><p className="mt-4 text-xs leading-6 text-muted-foreground">Connected churches: {source.churchSlugs.length || "global reference"}{source.globalReference ? " · bibliography reference" : ""}</p></article>)}</div></section>;
      })}
    </Container>
  </main>;
}
