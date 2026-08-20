import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { paintedChurchAuthorityCeiling, paintedChurchReleaseBlockers, paintedChurchReleaseControls, paintedChurchReleaseReady } from "@/data/painted-church-release-review";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/painted-churches/release-review";
const description = "Final Texas Defined release controls for the Painted Churches authority project: documentary readiness, current-main reconciliation, CI/build/live verification, owner approval and the explicit search-publication switch.";

export const Route = createFileRoute(canonicalPath)({
  head: () => {
    const url = absoluteUrl(texasDefinedBrand, canonicalPath);
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title: "Painted Churches Final Release Review", description, modifiedTime: "2026-08-20T19:00:00-05:00" }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@type": "Dataset",
        "@id": `${url}#release-review`,
        name: "Texas Painted Churches final release review",
        description,
        url,
        dateModified: "2026-08-20",
        variableMeasured: paintedChurchReleaseControls.map((item) => item.label),
      })],
    };
  },
  component: ReleaseReview,
});

function ReleaseReview() {
  return <main>
    <section className="border-b border-border bg-surface"><Container className="py-16 sm:py-24">
      <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap gap-2"><li><Link to="/">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches">Painted Churches</Link></li><li aria-hidden>·</li><li aria-current="page">Release review</li></ol></nav>
      <p className="eyebrow mt-8 text-primary">Final publication control</p>
      <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">Indexing requires more than excellent content.</h1>
      <p className="mt-6 max-w-5xl text-lg leading-8 text-muted-foreground">The Painted Churches project is intentionally separated into documentary readiness, codebase freshness, technical verification, owner approval and the final search-publication switch. A green content audit cannot turn indexing on by itself.</p>
      <div className={`mt-8 inline-flex border px-5 py-3 text-sm font-semibold ${paintedChurchReleaseReady ? "border-foreground" : "border-primary"}`}>{paintedChurchReleaseReady ? "All release controls satisfied" : `${paintedChurchReleaseBlockers.length} release controls remain intentionally open`}</div>
    </Container></section>

    <Container className="py-14 sm:py-18">
      <section className="border-t-2 border-foreground pt-8"><p className="eyebrow text-primary">Required release controls</p><h2 className="mt-3 font-display text-4xl">No inferred approvals. No stale-branch release. No accidental indexing.</h2><div className="mt-8 grid gap-px border border-border bg-border md:grid-cols-2">{paintedChurchReleaseControls.map((control) => <article key={control.id} className="bg-background p-6"><div className="flex items-start justify-between gap-4"><h3 className="font-display text-2xl">{control.label}</h3><span className={`text-xs font-semibold uppercase tracking-[0.12em] ${control.complete ? "text-foreground" : "text-primary"}`}>{control.complete ? "complete" : "open"}</span></div><p className="mt-4 text-sm leading-7 text-muted-foreground">{control.detail}</p><p className="mt-3 text-xs uppercase tracking-[0.1em] text-muted-foreground">{control.machineCheckable ? "Application-checkable" : "Release-time control"}</p></article>)}</div></section>

      <section className="mt-14 border-t border-border pt-8"><p className="eyebrow text-primary">Authority ceiling</p><h2 className="mt-3 font-display text-4xl">What still makes the reference stronger even after the launch floor is green.</h2><p className="mt-5 max-w-4xl text-sm leading-7 text-muted-foreground">These are not silently converted into completed claims. Most require actual fieldwork, permissions, interviews or expert participation rather than additional web scraping.</p><ul className="mt-7 list-disc space-y-3 pl-5 text-base leading-8 text-muted-foreground">{paintedChurchAuthorityCeiling.map((item) => <li key={item}>{item}</li>)}</ul></section>

      <section className="mt-14 border-y border-border py-9"><p className="eyebrow text-primary">Audit chain</p><div className="mt-4 flex flex-wrap gap-x-7 gap-y-3 text-sm"><Link to="/explore/painted-churches/preindex-readiness" className="border-b border-primary text-primary">Church-by-church readiness</Link><Link to="/explore/painted-churches/fieldwork-protocol" className="border-b border-primary text-primary">Fieldwork protocol</Link><Link to="/explore/painted-churches/methodology" className="border-b border-primary text-primary">Research methodology</Link><Link to="/explore/painted-churches/sources" className="border-b border-primary text-primary">Source registry</Link></div></section>
    </Container>
  </main>;
}
