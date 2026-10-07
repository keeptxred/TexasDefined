import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { expandedPaintedChurches } from "@/data/painted-churches-expanded";
import { paintedChurchGalleryBySlug } from "@/data/painted-church-gallery";

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
        <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-ink-foreground/60"><ol className="flex flex-wrap items-center gap-2"><li><Link to="/">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches">Painted Churches</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches/guides">Guides</Link></li></ol></nav>
        <p className="eyebrow mt-9 text-ink-foreground/65">{groupLabel}</p>
        <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">{guide.title}</h1>
        <p className="mt-6 max-w-4xl text-lg leading-8 text-ink-foreground/80">{guide.description}</p>
        {guide.verifiedAt ? <p className="mt-5 text-xs uppercase tracking-[0.14em] text-ink-foreground/55">Visitor information checked {guide.verifiedAt}</p> : null}
      </Container>
    </section>

    <Container className="grid gap-14 py-14 sm:py-18 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,.65fr)]">
      <div>
        <section className="border-t-2 border-foreground pt-8">
          <p className="eyebrow text-primary">Quick answer</p>
          <h2 className="mt-3 font-display text-4xl">{guide.searchIntent}</h2>
          <p className="mt-6 max-w-3xl text-base leading-8 text-foreground/90">{guide.quickAnswer}</p>
        </section>

        {guide.tripPlan ? <>
          <section className="mt-14 border-t border-border pt-8" aria-labelledby="trip-facts-heading">
            <p className="eyebrow text-primary">Plan the day</p>
            <h2 id="trip-facts-heading" className="mt-3 font-display text-4xl">Trip at a glance</h2>
            <dl className="mt-7 grid gap-px border border-border bg-border sm:grid-cols-2">
              {guide.tripPlan.facts.map((fact) => <div key={fact.label} className="bg-background p-5"><dt className="eyebrow text-muted-foreground">{fact.label}</dt><dd className="mt-2 font-display text-xl leading-tight">{fact.value}</dd></div>)}
            </dl>
          </section>

          <section className="mt-14 border-t border-border pt-8" aria-labelledby="route-heading">
            <p className="eyebrow text-primary">Suggested sequence</p>
            <h2 id="route-heading" className="mt-3 font-display text-4xl">A route you can actually use</h2>
            <div className="mt-8 divide-y divide-border border-y border-border">
              {guide.tripPlan.stops.map((stop, index) => <article key={stop.name} className="grid gap-3 py-6 sm:grid-cols-[3rem_minmax(0,1fr)]">
                <div className="font-display text-3xl text-primary">{String(index + 1).padStart(2, "0")}</div>
                <div>
                  <p className="eyebrow text-muted-foreground">{stop.timing}</p>
                  <h3 className="mt-1 font-display text-2xl leading-tight">
                    {stop.churchSlug ? <Link to="/explore/painted-churches/$slug" params={{ slug: stop.churchSlug }} className="hover:text-primary">{stop.name}</Link> : stop.name}
                  </h3>
                  <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">{stop.note}</p>
                </div>
              </article>)}
            </div>
            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <div className="border-l-2 border-primary pl-5"><p className="eyebrow text-primary">Access first</p><p className="mt-2 text-sm leading-7 text-muted-foreground">{guide.tripPlan.accessNote}</p></div>
              {guide.tripPlan.lunchNote ? <div className="border-l-2 border-border pl-5"><p className="eyebrow text-muted-foreground">Food & reset</p><p className="mt-2 text-sm leading-7 text-muted-foreground">{guide.tripPlan.lunchNote}</p></div> : null}
            </div>
            {guide.tripPlan.extensionNote ? <div className="mt-6 bg-surface p-6"><p className="eyebrow text-primary">If you have more time</p><p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">{guide.tripPlan.extensionNote}</p></div> : null}
          </section>
        </> : null}

        {guide.sections.map((section) => <section key={section.heading} className="mt-14 border-t border-border pt-8">
          <h2 className="font-display text-4xl">{section.heading}</h2>
          <div className="mt-5 space-y-4">{section.paragraphs.map((paragraph) => <p key={paragraph} className="max-w-3xl text-base leading-8 text-muted-foreground">{paragraph}</p>)}</div>
        </section>)}

        {churches.length ? <section className="mt-14 border-t border-border pt-8">
          <p className="eyebrow text-primary">Church profiles</p>
          <h2 className="mt-3 font-display text-4xl">See the churches before you go</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Use these profiles for verified addresses, church-specific history, visitor notes and deeper source trails. Availability still needs to be checked close to the day of your trip.</p>
          <div className="mt-8 grid gap-px border border-border bg-border md:grid-cols-2">
            {churches.map((church) => {
              const image = paintedChurchGalleryBySlug(church.slug)[0];
              return <article key={church.slug} className="bg-background">
                {image ? <figure>
                  <Link to="/explore/painted-churches/$slug" params={{ slug: church.slug }} className="block overflow-hidden bg-surface">
                    <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" className="aspect-[4/3] h-auto w-full object-cover transition-transform duration-300 hover:scale-[1.02]" />
                  </Link>
                  <figcaption className="px-6 pt-3 text-xs leading-5 text-muted-foreground">{image.credit} · {image.license}</figcaption>
                </figure> : null}
                <div className="p-6">
                  <p className="eyebrow text-muted-foreground">{church.city} · {church.county} County</p>
                  <h3 className="mt-2 font-display text-2xl leading-tight"><Link to="/explore/painted-churches/$slug" params={{ slug: church.slug }} className="hover:text-primary">{church.shortName}</Link></h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{church.summary}</p>
                  <Link to="/explore/painted-churches/$slug" params={{ slug: church.slug }} className="mt-4 inline-block border-b border-primary text-sm text-primary">Open church profile</Link>
                </div>
              </article>;
            })}
          </div>
        </section> : null}

        <section className="mt-14 border-t border-border pt-8">
          <p className="eyebrow text-primary">Common questions</p>
          <h2 className="mt-3 font-display text-4xl">Before you go</h2>
          <div className="mt-8 divide-y divide-border border-y border-border">{guide.faqs.map((item) => <details key={item.question} className="group py-6"><summary className="cursor-pointer list-none pr-8 font-display text-2xl marker:hidden">{item.question}<span aria-hidden className="float-right text-primary transition-transform group-open:rotate-45">+</span></summary><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{item.answer}</p></details>)}</div>
        </section>
      </div>

      <aside className="space-y-10 lg:border-l lg:border-border lg:pl-8">
        <section>
          <p className="eyebrow text-muted-foreground">{guide.group === "planning" ? "Plan this visit" : "At a glance"}</p>
          <p className="mt-3 font-display text-2xl">{guide.searchIntent}</p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{guide.group === "planning" ? "Start with the practical answer here, then use the map, route tools and church profiles for the level of detail you need." : "This guide gives the concise answer first, then connects you to the church profiles, maps and research pages that support it."}</p>
        </section>
        <section className="border-t border-border pt-7"><p className="eyebrow text-muted-foreground">Related Texas Defined guides</p><div className="mt-4 flex flex-col items-start gap-4">{guide.relatedPaths.map((item) => <a key={item.path} href={item.path} className="border-b border-primary text-sm text-primary">{item.label}</a>)}</div></section>
        {guide.sources?.length ? <section className="border-t border-border pt-7"><p className="eyebrow text-muted-foreground">Primary sources</p><div className="mt-4 flex flex-col items-start gap-4">{guide.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="border-b border-primary text-sm text-primary">{source.label}</a>)}</div><p className="mt-4 text-xs leading-5 text-muted-foreground">Current hours, worship schedules, group-tour terms and access rules can change. Confirm time-sensitive details with the organization that controls them before traveling.</p></section> : null}
        <section className="border-t border-border pt-7"><p className="eyebrow text-muted-foreground">More Painted Churches help</p><Link to="/explore/painted-churches/guides" className="mt-3 inline-block border-b border-primary text-sm text-primary">Browse the guide library</Link></section>
      </aside>
    </Container>
  </main>;
}
