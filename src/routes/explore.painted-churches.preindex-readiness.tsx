import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { paintedChurchOpenImageLeads } from "@/data/painted-church-image-acquisition";
import {
  paintedChurchAuthorityStretchQueue,
  paintedChurchIndexLaunchReady,
  paintedChurchLaunchBlockers,
  paintedChurchReadiness,
} from "@/data/painted-church-preindex-readiness";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/painted-churches/preindex-readiness";
const description = "Texas Defined's church-by-church pre-index authority audit for the Painted Churches of Texas: profiles, source quality, visitor evidence, maps, image rights, preservation chronology, feature inventories and remaining launch blockers.";
const checkedAt = "2026-08-21";

export const Route = createFileRoute(canonicalPath)({
  head: () => {
    const url = absoluteUrl(texasDefinedBrand, canonicalPath);
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title: "Painted Churches Pre-Index Authority Audit", description, modifiedTime: `${checkedAt}T14:00:00-05:00` }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@type": "Dataset",
        "@id": `${url}#audit`,
        name: "Texas Painted Churches pre-index authority audit",
        description,
        url,
        dateModified: checkedAt,
        creator: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#organization` },
        variableMeasured: ["canonical profile", "research dossier", "three-source provenance floor", "authority-source quality", "visitor status", "map precision", "multi-object inventory", "rights-cleared imagery", "preservation chronology", "archival evidence", "contributors", "techniques", "symbols", "integrity", "fieldwork"],
      })],
    };
  },
  component: PreIndexReadiness,
});

function PreIndexReadiness() {
  return <main>
    <section className="border-b border-border bg-surface"><Container className="py-16 sm:py-24">
      <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap gap-2"><li><Link to="/">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches">Painted Churches</Link></li><li aria-hidden>·</li><li aria-current="page">Pre-index audit</li></ol></nav>
      <p className="eyebrow mt-8 text-primary">Publication control</p>
      <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">We do not confuse “published in the repo” with “ready for the index.”</h1>
      <p className="mt-6 max-w-5xl text-lg leading-8 text-muted-foreground">Every verified church is audited against a strict launch floor and a higher authority ceiling. Search-engine submission remains separately gated; this dashboard makes the gaps visible before that switch can be enabled.</p>
      <p className="mt-4 text-sm text-muted-foreground">Authority audit refreshed August 21, 2026.</p>
      <div className={`mt-8 inline-flex border px-5 py-3 text-sm font-semibold ${paintedChurchIndexLaunchReady ? "border-foreground" : "border-primary"}`}>{paintedChurchIndexLaunchReady ? "Required launch floor currently satisfied" : `${paintedChurchLaunchBlockers.length} churches still have required launch blockers`}</div>
    </Container></section>

    <Container className="py-14 sm:py-18">
      <section className="border-t-2 border-foreground pt-8">
        <p className="eyebrow text-primary">Launch floor</p>
        <h2 className="mt-3 font-display text-4xl">A church does not clear pre-index review with one source and one decorative fact.</h2>
        <p className="mt-5 max-w-4xl text-base leading-8 text-foreground/90">Required dimensions are a canonical narrative profile, a church-specific research dossier, at least three distinct normalized source URLs, at least two non-discovery authority sources, explicit visitor research, a sourced map point, at least two object-level interior features, rights-cleared current photography, and a sourced preservation/alteration/stewardship chronology. These are minimums, not the authority ceiling.</p>
      </section>

      {paintedChurchLaunchBlockers.length ? <section className="mt-10 border-l-2 border-primary bg-surface p-6 sm:p-8"><p className="eyebrow text-primary">Current release blockers</p><h2 className="mt-3 font-display text-3xl">{paintedChurchLaunchBlockers.length} church{paintedChurchLaunchBlockers.length === 1 ? "" : "es"} still fail at least one required dimension.</h2><div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm">{paintedChurchLaunchBlockers.map((record) => <a key={record.slug} href={`#${record.slug}`} className="border-b border-primary text-primary">{record.name}</a>)}</div></section> : null}

      <section className="mt-10 border border-border p-6 sm:p-8"><p className="eyebrow text-muted-foreground">Authority ceiling</p><p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">{paintedChurchAuthorityStretchQueue.length} of {paintedChurchReadiness.length} verified churches still have at least one non-launch research opportunity such as exact-property coordinates, archival imagery, named contributors, technique or symbol resolution, integrity resolution, or original Texas Defined fieldwork. These remain visible even after the launch floor passes.</p></section>

      <div className="mt-14 space-y-12">{paintedChurchReadiness.map((record) => { const imageLeads = paintedChurchOpenImageLeads(record.slug); return <section id={record.slug} key={record.slug} className="scroll-mt-24 border-t border-border pt-7"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow text-primary">{record.city}</p><h2 className="mt-2 font-display text-3xl"><Link to="/explore/painted-churches/$slug" params={{ slug: record.slug }} className="hover:text-primary">{record.name}</Link></h2></div><div className="text-right"><p className="font-display text-3xl">{record.score}%</p><p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">authority dimensions complete</p></div></div><div className="mt-6 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">{record.dimensions.map((dimension) => <div key={dimension.id} className="bg-background p-5"><div className="flex items-start justify-between gap-3"><p className="font-semibold">{dimension.label}</p><span className={`text-xs font-semibold uppercase tracking-[0.12em] ${dimension.complete ? "text-foreground" : "text-primary"}`}>{dimension.complete ? "done" : dimension.requiredForIndexLaunch ? "blocker" : "open"}</span></div><p className="mt-2 text-xs leading-6 text-muted-foreground">{dimension.detail}</p></div>)}</div>{imageLeads.length ? <div className="mt-5 border-l-2 border-primary bg-surface p-5"><p className="eyebrow text-primary">Open image-rights leads</p><ul className="mt-3 space-y-3 text-xs leading-6 text-muted-foreground">{imageLeads.map((lead) => <li key={lead.sourceUrl}><a href={lead.sourceUrl} target="_blank" rel="noreferrer" className="font-semibold text-primary hover:underline">{lead.label}</a> · {lead.status.replaceAll("-", " ")}<span className="block">{lead.nextAction}</span></li>)}</ul></div> : null}</section>; })}</div>

      <section className="mt-14 border-l-2 border-primary bg-surface p-6 sm:p-8"><p className="eyebrow text-primary">Indexing control</p><h2 className="mt-3 font-display text-3xl">Passing this audit does not automatically submit the collection.</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">Production deployment and search-engine publication are separate controls. IndexNow submission remains disabled unless the explicit production publication flag is enabled after review. Original fieldwork and expert review are intentionally never auto-completed from secondary sources.</p><div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm"><Link to="/explore/painted-churches/methodology" className="border-b border-primary text-primary">Research methodology</Link><Link to="/explore/painted-churches/features" className="border-b border-primary text-primary">Object-level inventory</Link><Link to="/explore/painted-churches/sources" className="border-b border-primary text-primary">Source registry</Link><Link to="/explore/painted-churches/bibliography" className="border-b border-primary text-primary">Bibliography</Link><Link to="/explore/painted-churches/fieldwork-protocol" className="border-b border-primary text-primary">Fieldwork protocol</Link></div></section>
    </Container>
  </main>;
}
