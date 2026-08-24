import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { expandedPaintedChurches } from "@/data/painted-churches-expanded";

export const Route = createLazyFileRoute("/explore/painted-churches/guides/$slug")({
  component: PaintedChurchSearchGuidePage,
});

function PaintedChurchSearchGuidePage() {
  const { guide } = Route.useLoaderData();
  const churches = expandedPaintedChurches.filter((church) => guide.relatedChurchSlugs.includes(church.slug));
  const groupLabel = guide.group === "church-query" ? "Church search" : guide.group === "place" ? "Place guide" : guide.group === "planning" ? "Trip planning" : "History & architecture";

  return <main>
    <section className="border-b border-border bg-ink text-ink-foreground">
      <Container className="py-14 sm:py-20">
        <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-ink-foreground/60"><ol className="flex flex-wrap items-center gap-2"><li><Link to="/">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches">Painted Churches</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches/guides">Search Guide</Link></li></ol></nav>
        <p className="eyebrow mt-9 text-ink-foreground/65">{groupLabel} · Popular search answered</p>
        <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">{guide.title}</h1>
        <p className="mt-6 max-w-4xl text-lg leading-8 text-ink-foreground/80">{guide.description}</p>
      </Container>
    </section>

    <Container className="grid gap-14 py-14 sm:py-18 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,.65fr)]">
      <div>
        <section className="border-t-2 border-foreground pt-8">
          <p className="eyebrow text-primary">Quick answer</p>
          <h2 className="mt-3 font-display text-4xl">{guide.searchIntent}</h2>
          <p className="mt-6 max-w-3xl text-base leading-8 text-foreground/90">{guide.quickAnswer}</p>
        </section>

        {guide.sections.map((section) => <section key={section.heading} className="mt-14 border-t border-border pt-8">
          <h2 className="font-display text-4xl">{section.heading}</h2>
          <div className="mt-5 space-y-4">{section.paragraphs.map((paragraph) => <p key={paragraph} className="max-w-3xl text-base leading-8 text-muted-foreground">{paragraph}</p>)}</div>
        </section>)}

        {churches.length ? <section className="mt-14 border-t border-border pt-8">
          <p className="eyebrow text-primary">Verified church profiles</p>
          <h2 className="mt-3 font-display text-4xl">Go deeper church by church</h2>
          <div className="mt-8 grid gap-px border border-border bg-border md:grid-cols-2">
            {churches.map((church) => <article key={church.slug} className="bg-background p-6">
              <p className="eyebrow text-muted-foreground">{church.city} · {church.county} County</p>
              <h3 className="mt-2 font-display text-2xl leading-tight"><Link to="/explore/painted-churches/$slug" params={{ slug: church.slug }} className="hover:text-primary">{church.shortName}</Link></h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{church.summary}</p>
              <Link to="/explore/painted-churches/$slug" params={{ slug: church.slug }} className="mt-4 inline-block border-b border-primary text-sm text-primary">Open verified profile</Link>
            </article>)}
          </div>
        </section> : null}

        <section className="mt-14 border-t border-border pt-8">
          <p className="eyebrow text-primary">Common questions</p>
          <h2 className="mt-3 font-display text-4xl">Before you go</h2>
          <div className="mt-8 divide-y divide-border border-y border-border">{guide.faqs.map((item) => <section key={item.question} className="py-6"><h3 className="font-display text-2xl">{item.question}</h3><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{item.answer}</p></section>)}</div>
        </section>
      </div>

      <aside className="space-y-10 lg:border-l lg:border-border lg:pl-8">
        <section><p className="eyebrow text-muted-foreground">Search intent</p><p className="mt-3 font-display text-2xl">{guide.searchIntent}</p><p className="mt-3 text-sm leading-6 text-muted-foreground">This page exists to answer this query directly while routing deeper questions to the strongest canonical church or research page.</p></section>
        <section className="border-t border-border pt-7"><p className="eyebrow text-muted-foreground">Related Texas Defined guides</p><div className="mt-4 flex flex-col items-start gap-4">{guide.relatedPaths.map((item) => <a key={item.path} href={item.path} className="border-b border-primary text-sm text-primary">{item.label}</a>)}</div></section>
        {guide.sources?.length ? <section className="border-t border-border pt-7"><p className="eyebrow text-muted-foreground">Primary / controlling sources</p><div className="mt-4 flex flex-col items-start gap-4">{guide.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="border-b border-primary text-sm text-primary">{source.label}</a>)}</div><p className="mt-4 text-xs leading-5 text-muted-foreground">Current hours, worship schedules, group-tour terms and access rules should be confirmed with the organization that controls them.</p></section> : null}
        <section className="border-t border-border pt-7"><p className="eyebrow text-muted-foreground">All 50 searches</p><Link to="/explore/painted-churches/guides" className="mt-3 inline-block border-b border-primary text-sm text-primary">Browse the full search-intent atlas</Link></section>
      </aside>
    </Container>
  </main>;
}
