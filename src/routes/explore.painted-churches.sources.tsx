import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { paintedChurchSourceRegistry } from "@/data/painted-church-source-registry";
import { buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/painted-churches/sources";
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const description = "Source registry for Texas Defined's Painted Churches research: primary records, archives, current churches, scholarship, public history and discovery sources with the uses and church relationships recorded.";

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: "Texas Painted Churches Source Registry", description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      "@context": "https://schema.org",
      "@type": "Dataset",
      "@id": `${siteUrl}${canonicalPath}#dataset`,
      name: "Texas Painted Churches source provenance registry",
      description,
      url: `${siteUrl}${canonicalPath}`,
      variableMeasured: ["Source URL", "Source tier", "Research use", "Connected church", "Global reference status"],
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
      <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">Texas Defined records sources as research objects, not just links at the bottom of articles. The registry tracks what each source is used for and which churches it supports, while the individual evidence ledgers show the claims those sources control.</p>
      <p className="mt-6 font-display text-4xl">{paintedChurchSourceRegistry.length} normalized source records</p>
    </Container></section>
    <Container className="py-14 sm:py-18">
      {tiers.map((tier) => {
        const sources = paintedChurchSourceRegistry.filter((source) => source.tier === tier);
        if (!sources.length) return null;
        return <section key={tier} className="mb-14 border-t border-border pt-8"><p className="eyebrow text-primary">{tier.replaceAll("-", " ")}</p><h2 className="mt-3 font-display text-4xl">{sources.length} source{sources.length === 1 ? "" : "s"}</h2><div className="mt-8 grid gap-px border border-border bg-border md:grid-cols-2">{sources.map((source) => <article key={source.id} className="bg-background p-6"><h3 className="font-display text-2xl"><a href={source.url} target="_blank" rel="noreferrer" className="hover:text-primary">{source.label}</a></h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{source.uses.join(" · ")}</p><p className="mt-4 text-xs leading-6 text-muted-foreground">Connected churches: {source.churchSlugs.length || "global reference"}{source.globalReference ? " · bibliography reference" : ""}</p></article>)}</div></section>;
      })}
    </Container>
  </main>;
}
