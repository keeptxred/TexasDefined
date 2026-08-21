import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { paintedChurchPreservationTopics } from "@/data/painted-church-preservation";
import {
  canonicalPaintedChurchPreservationChronologyGaps,
  canonicalPaintedChurchPreservationEvents,
} from "@/data/painted-church-preservation-index";
import { expandedPaintedChurches } from "@/data/painted-churches-expanded";
import { buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/painted-churches/preservation";
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}${canonicalPath}`;
const description = "Understand preservation, restoration, repainting, whitewashing, reconstruction, disasters and authenticity across the Texas Painted Churches, with church-specific intervention chronologies and source gaps.";

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: "Texas Painted Church Preservation & Restoration", description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({ "@context": "https://schema.org", "@graph": [
      { "@type": "CollectionPage", "@id": `${pageUrl}#page`, url: pageUrl, name: "Texas Painted Church preservation and restoration", description, mainEntity: { "@id": `${pageUrl}#topics` } },
      { "@type": "DefinedTermSet", "@id": `${pageUrl}#topics`, name: "Painted Church preservation concepts", hasDefinedTerm: paintedChurchPreservationTopics.map((topic) => ({ "@type": "DefinedTerm", name: topic.name, description: topic.answer, url: `${pageUrl}/${topic.slug}` })) },
      { "@type": "Dataset", "@id": `${pageUrl}#chronology`, name: "Texas Painted Churches preservation chronology", description: "Church-specific disasters, coverings, rediscoveries, restoration, reconstruction, conservation, repainting and stewardship events with source provenance.", variableMeasured: ["Church", "Year", "Intervention type", "Source", "Qualification"] },
    ] })],
  }),
  component: PreservationHub,
});

function label(value: string) { return value.replace(/-/g, " "); }

function PreservationHub() {
  const integrityGroups = [...new Set(expandedPaintedChurches.map((church) => church.interiorIntegrity))];
  const chronologyChurchCount = new Set(canonicalPaintedChurchPreservationEvents.map((event) => event.churchSlug)).size;
  const recentEvents = [...canonicalPaintedChurchPreservationEvents].sort((a, b) => b.year - a.year || a.id.localeCompare(b.id)).slice(0, 24);
  return <main>
    <section className="border-b border-border bg-surface"><Container className="py-16 sm:py-24">
      <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap gap-2"><li><Link to="/">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches">Painted Churches</Link></li><li aria-hidden>·</li><li aria-current="page">Preservation</li></ol></nav>
      <p className="eyebrow mt-8 text-primary">Authenticity and conservation</p><h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">Original, restored, reconstructed—or newly painted?</h1>
      <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">The churches do not all preserve the same kind of historic surface. Texas Defined separates largely original programs from restoration, evidence-based reconstruction, extensive repainting and modern campaigns—and tracks church-specific disasters, coverings, rediscoveries, treatments, condition baselines and stewardship milestones separately from ordinary construction dates.</p>
    </Container></section>
    <Container className="py-14 sm:py-18">
      <section className="border-t-2 border-foreground pt-8"><p className="eyebrow text-primary">Current integrity classifications</p><div className="mt-7 grid gap-px border border-border bg-border md:grid-cols-3">{integrityGroups.map((integrity) => { const count = expandedPaintedChurches.filter((church) => church.interiorIntegrity === integrity).length; return <div key={integrity} className="bg-background p-6"><p className="font-display text-3xl">{count}</p><p className="mt-2 text-sm capitalize text-muted-foreground">{label(integrity)}</p></div>; })}</div></section>

      <section className="mt-14 border-t border-border pt-8"><p className="eyebrow text-primary">Intervention and stewardship coverage</p><h2 className="mt-3 font-display text-4xl">{chronologyChurchCount} of {expandedPaintedChurches.length} verified churches have a sourced preservation/fabric chronology.</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">A chronology can record a physical intervention such as fire, storm damage, whitewashing, repainting, rediscovery, restoration or conservation, or a clearly labeled stewardship/condition milestone when no treatment campaign is documented. Texas Defined never relabels ordinary active use or a historic designation as a restoration.</p></section>

      <section className="mt-14 grid gap-px border border-border bg-border md:grid-cols-2">{paintedChurchPreservationTopics.map((topic) => <article key={topic.slug} className="bg-background p-7"><p className="eyebrow text-primary">{topic.churchSlugs.length} connected church{topic.churchSlugs.length === 1 ? "" : "es"}</p><h2 className="mt-3 font-display text-3xl"><Link to="/explore/painted-churches/preservation/$slug" params={{ slug: topic.slug }} className="hover:text-primary">{topic.name}</Link></h2><p className="mt-4 text-sm leading-7 text-muted-foreground">{topic.answer}</p><Link to="/explore/painted-churches/preservation/$slug" params={{ slug: topic.slug }} className="eyebrow mt-5 inline-block border-b border-primary text-primary">Read preservation guide</Link></article>)}</section>

      <section className="mt-14 border-t border-border pt-8"><p className="eyebrow text-primary">Statewide fabric chronology</p><h2 className="mt-3 font-display text-4xl">Recent and high-value documented interventions</h2><div className="mt-8 border-y border-border">{recentEvents.map((event) => { const church = expandedPaintedChurches.find((item) => item.slug === event.churchSlug); return <article key={event.id} className="grid gap-3 border-b border-border py-6 last:border-b-0 md:grid-cols-[120px_240px_minmax(0,1fr)]"><div><p className="font-display text-2xl">{event.yearLabel ?? event.year}</p><p className="eyebrow mt-1 text-muted-foreground">{label(event.type)}</p></div><div>{church ? <Link to="/explore/painted-churches/$slug" params={{ slug: church.slug }} className="font-display text-xl hover:text-primary">{church.shortName}</Link> : null}</div><div><p className="text-sm leading-7 text-muted-foreground">{event.summary}</p>{event.qualification ? <p className="mt-2 text-xs leading-6 text-muted-foreground">Qualification: {event.qualification}</p> : null}<a href={event.sourceUrl} target="_blank" rel="noreferrer" className="mt-2 inline-block border-b border-primary text-xs text-primary">{event.sourceLabel}</a></div></article>; })}</div></section>

      {canonicalPaintedChurchPreservationChronologyGaps.length ? <section className="mt-14 border-t border-border pt-8"><p className="eyebrow text-primary">Research backlog</p><h2 className="mt-3 font-display text-4xl">Churches whose preservation chronology still needs stronger evidence</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">These churches remain verified members of the collection, but they cannot clear the strict pre-index authority floor until a church-specific chronology record meets the source standard.</p><div className="mt-7 grid gap-px border border-border bg-border md:grid-cols-2">{canonicalPaintedChurchPreservationChronologyGaps.map((gap) => <article key={gap.slug} className="bg-background p-6"><h3 className="font-display text-2xl"><Link to="/explore/painted-churches/$slug" params={{ slug: gap.slug }} className="hover:text-primary">{gap.name}</Link></h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{gap.city} · {gap.reason}</p></article>)}</div></section> : null}

      <section className="mt-14 border-l-2 border-primary bg-surface p-6 sm:p-8"><p className="eyebrow text-primary">Why this distinction matters</p><h2 className="mt-3 font-display text-3xl">Color alone does not tell you what is historic.</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">Dubina's reconstructed blue interior, Moravia's comparatively unaltered Donecker program, Wesley's unfinished Laciak work, Fredericksburg's layered 1936 campaign, Umbarger's reversible conservation treatment and Bandera's documented 2003–2008 work are all important—but for different reasons. Texas Defined preserves those differences rather than ranking authenticity by visual impact.</p></section>
    </Container>
  </main>;
}
