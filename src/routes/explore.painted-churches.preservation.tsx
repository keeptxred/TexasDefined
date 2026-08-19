import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { paintedChurchPreservationTopics } from "@/data/painted-church-preservation";
import { expandedPaintedChurches } from "@/data/painted-churches-expanded";
import { buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/painted-churches/preservation";
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}${canonicalPath}`;
const description = "Understand preservation, restoration, repainting, whitewashing, reconstruction and authenticity across the Texas Painted Churches.";

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: "Texas Painted Church Preservation & Restoration", description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({ "@context": "https://schema.org", "@graph": [
      { "@type": "CollectionPage", "@id": `${pageUrl}#page`, url: pageUrl, name: "Texas Painted Church preservation and restoration", description, mainEntity: { "@id": `${pageUrl}#topics` } },
      { "@type": "DefinedTermSet", "@id": `${pageUrl}#topics`, name: "Painted Church preservation concepts", hasDefinedTerm: paintedChurchPreservationTopics.map((topic) => ({ "@type": "DefinedTerm", name: topic.name, description: topic.answer, url: `${pageUrl}/${topic.slug}` })) },
    ] })],
  }),
  component: PreservationHub,
});

function label(value: string) { return value.replace(/-/g, " "); }

function PreservationHub() {
  const integrityGroups = [...new Set(expandedPaintedChurches.map((church) => church.interiorIntegrity))];
  return <main><section className="border-b border-border bg-surface"><Container className="py-16 sm:py-24"><nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap gap-2"><li><Link to="/">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches">Painted Churches</Link></li><li aria-hidden>·</li><li aria-current="page">Preservation</li></ol></nav><p className="eyebrow mt-8 text-primary">Authenticity and conservation</p><h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">Original, restored, reconstructed—or newly painted?</h1><p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">The churches do not all preserve the same kind of historic surface. Texas Defined separates untouched or largely original programs from restoration, evidence-based reconstruction, extensive repainting and modern campaigns so readers can understand what they are actually seeing.</p></Container></section><Container className="py-14 sm:py-18"><section className="border-t-2 border-foreground pt-8"><p className="eyebrow text-primary">Current integrity classifications</p><div className="mt-7 grid gap-px border border-border bg-border md:grid-cols-3">{integrityGroups.map((integrity) => { const count = expandedPaintedChurches.filter((church) => church.interiorIntegrity === integrity).length; return <div key={integrity} className="bg-background p-6"><p className="font-display text-3xl">{count}</p><p className="mt-2 text-sm capitalize text-muted-foreground">{label(integrity)}</p></div>; })}</div></section><section className="mt-14 grid gap-px border border-border bg-border md:grid-cols-2">{paintedChurchPreservationTopics.map((topic) => <article key={topic.slug} className="bg-background p-7"><p className="eyebrow text-primary">{topic.churchSlugs.length} connected church{topic.churchSlugs.length === 1 ? "" : "es"}</p><h2 className="mt-3 font-display text-3xl"><Link to="/explore/painted-churches/preservation/$slug" params={{ slug: topic.slug }} className="hover:text-primary">{topic.name}</Link></h2><p className="mt-4 text-sm leading-7 text-muted-foreground">{topic.answer}</p><Link to="/explore/painted-churches/preservation/$slug" params={{ slug: topic.slug }} className="eyebrow mt-5 inline-block border-b border-primary text-primary">Read preservation guide</Link></article>)}</section><section className="mt-14 border-l-2 border-primary bg-surface p-6 sm:p-8"><p className="eyebrow text-primary">Why this distinction matters</p><h2 className="mt-3 font-display text-3xl">Color alone does not tell you what is historic.</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">Dubina's restored blue interior, Moravia's comparatively unaltered Donecker program, Wesley's unfinished Laciak work, and Bandera's documented 2003–2008 campaign are all important—but for different reasons. Texas Defined preserves those differences rather than ranking authenticity by visual impact.</p></section></Container></main>;
}
