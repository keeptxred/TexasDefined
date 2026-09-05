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

function EventGuideLink({ event, className, children }: { event: { slug: string; href: string }; className?: string; children: React.ReactNode }) {
  if (event.href === `/event/${event.slug}`) {
    return <Link to="/event/$slug" params={{ slug: event.slug }} className={className}>{children}</Link>;
  }
  return <a href={event.href} className={className}>{children}</a>;
}

function EventCollectionPage() {
  const { page } = Route.useLoaderData();
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
        <section>
          <p className="eyebrow text-primary">How to plan it</p>
          <h2 className="mt-3 font-display text-3xl">{page.planningTitle}</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">{page.planningIntro}</p>
          <ol className="mt-6 space-y-4">{page.planningPoints.map((point, index) => <li key={point} className="border-t border-border pt-4 text-sm leading-7 text-muted-foreground"><strong className="mr-2 text-primary">0{index + 1}</strong>{point}</li>)}</ol>
        </section>
        <section>
          <p className="eyebrow text-primary">Source policy</p>
          <h2 className="mt-3 font-display text-3xl">{page.sourcePolicyTitle}</h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">{page.sourcePolicyParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        </section>
      </div>

      <section className="pt-12">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6"><div><p className="eyebrow text-primary">{page.itemsEyebrow}</p><h2 className="mt-2 font-display text-4xl">{page.itemsTitle}</h2></div><a href="/events" className="text-sm font-semibold text-primary">Full Texas calendar →</a></div>
        {page.items.length ? <ul className="grid gap-px border-x border-b border-border bg-border sm:grid-cols-2 lg:grid-cols-3">{page.items.map((event) => <li key={event.slug} className="bg-background p-6"><p className="eyebrow text-muted-foreground">{event.city}{event.countyName ? ` · ${event.countyName}` : ""}</p><h3 className="mt-3 font-display text-2xl leading-tight">{isTournamentCollection ? event.name : <EventGuideLink event={event} className="hover:text-primary">{event.name}</EventGuideLink>}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{event.detail}</p>{isTournamentCollection ? <a href={event.href} className="mt-5 inline-block text-sm font-semibold text-primary">{isTournamentHub ? "Browse category →" : "Tournament directory →"}</a> : <EventGuideLink event={event} className="mt-5 inline-block text-sm font-semibold text-primary">Open guide →</EventGuideLink>}</li>)}</ul> : <p className="border-x border-b border-border p-8 text-sm leading-7 text-muted-foreground">{page.emptyMessage}</p>}
      </section>

      <section className="pt-12">
        <p className="eyebrow text-primary">Keep exploring</p><h2 className="mt-2 font-display text-3xl">Related Texas event guides</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{page.relatedCollections.map((item) => <a key={item.path} href={item.path} className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">{item.title}</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">{item.description}</span></a>)}<a href="/events" className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">Texas Events</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">Browse the statewide calendar and all verified event guides.</span></a></div>
      </section>
    </Container>
  </main>;
}
