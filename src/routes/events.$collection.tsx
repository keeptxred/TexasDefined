import { Link, createFileRoute, notFound } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { getEventCollectionPage } from "@/data/event-collection-page";

export const Route = createFileRoute("/events/$collection")({
  loader: async ({ params }) => {
    const page = await getEventCollectionPage(params.collection);
    if (!page) throw notFound();
    return { page };
  },
  head: ({ loaderData }) => loaderData?.page.head ?? {},
  component: EventCollectionPage,
});

function EventGuideLink({ event, className, children, trackId }: { event: { slug: string; href: string }; className?: string; children: React.ReactNode; trackId?: string }) {
  const tracking = trackId ? { "data-entity-id": trackId } : {};
  if (event.href === `/event/${event.slug}`) {
    return <Link to="/event/$slug" params={{ slug: event.slug }} className={className} {...tracking}>{children}</Link>;
  }
  return <a href={event.href} className={className} {...tracking}>{children}</a>;
}

function WeekendCollectionPage({ page }: { page: any }) {
  const digest = page.weekendDigest;
  const best = digest.sections.find((section: any) => section.id === "best");
  const featuredSlugs = new Set((best?.items ?? []).map((event: any) => event.slug));
  const usedSlugs = new Set(featuredSlugs);
  const secondarySections = digest.sections
    .filter((section: any) => section.id !== "best")
    .map((section: any) => {
      const items = section.items.filter((event: any) => !usedSlugs.has(event.slug));
      const minimumAfterDedupe = section.id === "worth-the-drive" ? 3 : 2;
      if (items.length < minimumAfterDedupe) return null;
      items.forEach((event: any) => usedSlugs.add(event.slug));
      return { ...section, items };
    })
    .filter(Boolean);

  const tripBuilderItems = (best?.items ?? []).filter((event: any) => event.tripLinks?.length).slice(0, 3);

  return <main>
    <section className="border-b border-border bg-surface py-10 sm:py-14"><Container>
      <nav aria-label="Breadcrumb" className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground"><a href="/">Front page</a> / <a href="/events">Texas Events</a> / <span aria-current="page">Texas This Weekend</span></nav>
      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)] lg:items-end">
        <div>
          <p className="eyebrow text-primary">Texas This Weekend · {digest.dateContext}</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.96] sm:text-7xl">The best things to do in Texas this weekend</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">A short, source-checked guide to the Texas events actually worth considering this weekend — plus metro editions, road-trip ideas and nearby planning paths.</p>
        </div>
        <div className="border-l-4 border-primary pl-5 text-sm leading-7 text-muted-foreground">
          <p><strong className="text-foreground">{page.itemCount.toLocaleString("en-US")} verified guides</strong> overlap this weekend.</p>
          <p className="mt-2">The page rolls forward automatically as the calendar changes. Stale events fall out of the weekend window instead of lingering on the page.</p>
        </div>
      </div>
    </Container></section>

    <Container className="py-10 sm:py-14">
      {best ? <section aria-labelledby="top-weekend-picks">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5">
          <div><p className="eyebrow text-primary">Editor’s shortlist</p><h2 id="top-weekend-picks" className="mt-2 font-display text-4xl">Top 5 this weekend</h2></div>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">Five verified picks selected for freshness, geographic variety and a useful mix of Texas experiences.</p>
        </div>
        <ol className="grid gap-px border-x border-b border-border bg-border md:grid-cols-2 xl:grid-cols-5">
          {best.items.map((event: any, index: number) => <li key={event.slug} className="flex min-h-64 flex-col bg-background">
            {event.image ? <div className="aspect-[4/3] overflow-hidden bg-muted"><img src={event.image.url} alt={event.image.alt} width={800} height={600} loading={index < 2 ? "eager" : "lazy"} decoding="async" className="size-full object-cover" /></div> : null}
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-start justify-between gap-3"><p className="font-display text-4xl text-primary/35">0{index + 1}</p><span className="text-right text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">{String(event.category).replaceAll("-", " ")}</span></div>
              <p className="eyebrow mt-4 text-muted-foreground">{event.city}{event.countyName ? ` · ${event.countyName}` : ""}</p>
              <EventGuideLink event={event} trackId={`weekend:best:${event.slug}`} className="mt-3 block font-display text-2xl leading-tight hover:text-primary">{event.name}</EventGuideLink>
              <p className="mt-3 text-xs font-medium leading-5 text-muted-foreground">{event.detail}</p>
              {event.whyGo ? <p className="mt-4 line-clamp-4 text-sm leading-6 text-muted-foreground">{event.whyGo}</p> : null}
              <p className="mt-auto pt-6 text-sm font-semibold text-primary">Open guide →</p>
            </div>
          </li>)}
        </ol>
      </section> : null}

      {secondarySections.length ? <section className="pt-14" aria-labelledby="browse-weekend-by-area">
        <div className="border-b border-border pb-5"><p className="eyebrow text-primary">Find your version of the weekend</p><h2 id="browse-weekend-by-area" className="mt-2 font-display text-4xl">By metro, region and interest</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Events already featured in the Top 5 are removed here, and an event is used only once across the sections below. Each block adds new options instead of repeating the same names down the page.</p></div>
        <div className="grid gap-8 pt-8 lg:grid-cols-2">
          {secondarySections.map((section: any) => <section key={section.id} className="border border-border p-6">
            <div className="flex items-start justify-between gap-4"><div><p className="eyebrow text-muted-foreground">{section.id.replaceAll("-", " ")}</p><h3 className="mt-2 font-display text-2xl">{section.title}</h3></div>{section.href ? <a href={section.href} className="shrink-0 text-sm font-semibold text-primary">Full edition →</a> : null}</div>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{section.description}</p>
            <ol className="mt-5 divide-y divide-border border-y border-border">
              {section.items.map((event: any, index: number) => <li key={event.slug} className="py-4"><p className="eyebrow text-muted-foreground">0{index + 1} · {event.city}{event.countyName ? ` · ${event.countyName}` : ""}</p><EventGuideLink event={event} trackId={`weekend:${section.id}:${event.slug}`} className="mt-1 block font-display text-xl hover:text-primary">{event.name}</EventGuideLink><p className="mt-2 text-xs leading-5 text-muted-foreground">{event.detail}</p></li>)}
            </ol>
          </section>)}
        </div>
      </section> : null}

      {tripBuilderItems.length ? <section className="pt-14" aria-labelledby="make-a-weekend-of-it">
        <div className="border-b border-border pb-5"><p className="eyebrow text-primary">TexasDefined trip builder</p><h2 id="make-a-weekend-of-it" className="mt-2 font-display text-4xl">Make a weekend of it</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">These are real TexasDefined planning paths attached to the event authority record — city, county, destination, history, food or nearby-event coverage that can turn one event into a practical day trip or overnight.</p></div>
        <div className="grid gap-px border-x border-b border-border bg-border lg:grid-cols-3">
          {tripBuilderItems.map((event: any) => <article key={event.slug} className="bg-background p-6">
            <p className="eyebrow text-muted-foreground">Start in {event.city}</p>
            <h3 className="mt-3 font-display text-2xl">{event.name}</h3>
            {event.whyGo ? <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{event.whyGo}</p> : null}
            <ul className="mt-5 divide-y divide-border border-y border-border">{event.tripLinks.map((link: any) => <li key={link.href}><a href={link.href} data-entity-id={`weekend:trip-builder:${event.slug}:${link.href}`} className="group block py-4"><strong className="font-display text-lg group-hover:text-primary">{link.label}</strong><span className="mt-1 block text-xs leading-5 text-muted-foreground">{link.description}</span></a></li>)}</ul>
            <EventGuideLink event={event} trackId={`weekend:trip-builder:event:${event.slug}`} className="mt-5 inline-block text-sm font-semibold text-primary">Open the event guide →</EventGuideLink>
          </article>)}
        </div>
      </section> : null}

      <section className="pt-14">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5"><div><p className="eyebrow text-primary">More ways to browse</p><h2 className="mt-2 font-display text-3xl">Texas weekend editions</h2></div><a href="/events" className="text-sm font-semibold text-primary">Full Texas calendar →</a></div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/events/houston-this-weekend", "Houston"],
            ["/events/dallas-this-weekend", "Dallas-Fort Worth"],
            ["/events/austin-this-weekend", "Austin"],
            ["/events/san-antonio-this-weekend", "San Antonio"],
          ].map(([href, label]) => <a key={href} href={href} className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">{label}</strong><span className="mt-2 block text-sm text-muted-foreground">Weekend edition →</span></a>)}
        </div>
      </section>

      <details className="mt-14 border-y border-border py-5">
        <summary className="cursor-pointer font-display text-xl">How TexasDefined chooses weekend events</summary>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">A useful shortlist, not a feed dump. Metro, regional and interest sections only appear when enough events qualify, and price-based sections never infer free admission from missing ticket data.</p>
        <div className="mt-5 grid gap-8 text-sm leading-7 text-muted-foreground lg:grid-cols-2">
          <div><h2 className="font-display text-2xl text-foreground">{page.planningTitle}</h2><ol className="mt-4 space-y-3">{page.planningPoints.map((point: string, index: number) => <li key={point}><strong className="mr-2 text-primary">0{index + 1}</strong>{point}</li>)}</ol></div>
          <div><h2 className="font-display text-2xl text-foreground">{page.sourcePolicyTitle}</h2><div className="mt-4 space-y-3">{page.sourcePolicyParagraphs.map((paragraph: string) => <p key={paragraph}>{paragraph}</p>)}</div></div>
        </div>
      </details>
    </Container>
  </main>;
}

function GenericCollectionPage({ page }: { page: any }) {
  const isTournamentCollection = page.kind === "tournament";
  const isTournamentHub = page.path === "/events/tournaments";
  return <main>
    <section className="border-b border-border bg-surface py-12 sm:py-16"><Container>
      <nav aria-label="Breadcrumb" className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground"><a href="/">Front page</a> / <a href="/events">Texas Events</a> / <span aria-current="page">{page.title}</span></nav>
      <p className="eyebrow mt-8 text-primary">{page.eyebrow}</p>
      <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">{page.title}</h1>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{page.lead}</p>
      <p className="mt-6 text-sm text-muted-foreground">{page.itemCountLabel}</p>
      {!page.shouldIndex && <p className="mt-3 max-w-3xl text-xs leading-6 text-muted-foreground">{page.indexabilityNote}</p>}
    </Container></section>

    <Container className="py-12 sm:py-16">
      <div className="grid gap-10 border-b border-border pb-12 lg:grid-cols-2">
        <section><p className="eyebrow text-primary">How to plan it</p><h2 className="mt-3 font-display text-3xl">{page.planningTitle}</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">{page.planningIntro}</p><ol className="mt-6 space-y-4">{page.planningPoints.map((point: string, index: number) => <li key={point} className="border-t border-border pt-4 text-sm leading-7 text-muted-foreground"><strong className="mr-2 text-primary">0{index + 1}</strong>{point}</li>)}</ol></section>
        <section><p className="eyebrow text-primary">Source policy</p><h2 className="mt-3 font-display text-3xl">{page.sourcePolicyTitle}</h2><div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">{page.sourcePolicyParagraphs.map((paragraph: string) => <p key={paragraph}>{paragraph}</p>)}</div></section>
      </div>

      <section className="pt-12">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6"><div><p className="eyebrow text-primary">{page.itemsEyebrow}</p><h2 className="mt-2 font-display text-4xl">{page.itemsTitle}</h2></div><a href="/events" className="text-sm font-semibold text-primary">Full Texas calendar →</a></div>
        {page.items.length ? <ul className="grid gap-px border-x border-b border-border bg-border sm:grid-cols-2 lg:grid-cols-3">{page.items.map((event: any) => <li key={event.slug} className="bg-background p-6"><p className="eyebrow text-muted-foreground">{event.city}{event.countyName ? ` · ${event.countyName}` : ""}</p><h3 className="mt-3 font-display text-2xl leading-tight">{isTournamentCollection ? event.name : <EventGuideLink event={event} className="hover:text-primary">{event.name}</EventGuideLink>}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{event.detail}</p>{isTournamentCollection ? <a href={event.href} className="mt-5 inline-block text-sm font-semibold text-primary">{isTournamentHub ? "Browse category →" : "Tournament directory →"}</a> : <EventGuideLink event={event} className="mt-5 inline-block text-sm font-semibold text-primary">Open guide →</EventGuideLink>}</li>)}</ul> : <p className="border-x border-b border-border p-8 text-sm leading-7 text-muted-foreground">{page.emptyMessage}</p>}
      </section>

      <section className="pt-12"><p className="eyebrow text-primary">Keep exploring</p><h2 className="mt-2 font-display text-3xl">Related Texas event guides</h2><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{page.relatedCollections.map((item: any) => <a key={item.path} href={item.path} className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">{item.title}</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">{item.description}</span></a>)}<a href="/events" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Texas Events</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Browse the statewide calendar and all verified event guides.</span></a></div></section>
    </Container>
  </main>;
}

function EventCollectionPage() {
  const { page } = Route.useLoaderData();
  if (page.weekendDigest) return <WeekendCollectionPage page={page} />;
  return <GenericCollectionPage page={page} />;
}