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

type EventLinkItem = { slug: string; href: string; name?: string; city?: string; countyName?: string; detail?: string; region?: string };

function EventGuideLink({ event, className, children, trackId }: { event: { slug: string; href: string }; className?: string; children: React.ReactNode; trackId?: string }) {
  const tracking = trackId ? { "data-entity-id": trackId } : {};
  if (event.href === `/event/${event.slug}`) {
    return <Link to="/event/$slug" params={{ slug: event.slug }} className={className} {...tracking}>{children}</Link>;
  }
  return <a href={event.href} className={className} {...tracking}>{children}</a>;
}

function displayEventName(event: EventLinkItem) {
  const name = event.name ?? "Event guide";
  const city = event.city?.trim();
  if (!city) return name;
  return name.replace(new RegExp(`\\s+[—-]\\s+${city.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s+Texas\\s+Connection$`, "i"), "");
}

function countyHref(countyName?: string) {
  if (!countyName) return null;
  const slug = countyName.replace(/\s+County$/i, "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return slug ? `/browse/counties#county-${slug}` : null;
}

function regionHref(region?: string) {
  if (region === "gulf-coast") return "/events/gulf-coast-events";
  if (region === "hill-country") return "/events/hill-country-events";
  if (region === "piney-woods") return "/events/piney-woods-events";
  if (region === "big-bend") return "/events/big-bend-events";
  if (region === "panhandle") return "/events/panhandle-events";
  if (region === "prairies-lakes") return "/events/north-texas-events";
  return "/events";
}

// Preserve the original guarded UX invariants while presenting them in a stronger editorial hierarchy:
// A useful shortlist, not a feed dump.
// Metro, regional and interest sections only appear when enough events qualify.
// price-based sections never infer free admission.
function TexasThisWeekendPage({ page }: { page: ReturnType<typeof Route.useLoaderData>["page"] }) {
  const digest = page.weekendDigest;
  if (!digest) return null;

  const bestSection = digest.sections.find((section) => section.id === "best");
  const topFive = (bestSection?.items ?? []).slice(0, 5);
  const used = new Set(topFive.map((event) => event.slug));
  const secondarySections = digest.sections
    .filter((section) => section.id !== "best")
    .map((section) => {
      const items = section.items
        .filter((event) => {
          if (used.has(event.slug)) return false;
          if (section.id === "gulf-coast" && event.city.trim().toLowerCase() === "shiner") return false;
          return true;
        })
        .slice(0, 3);
      items.forEach((event) => used.add(event.slug));
      return { ...section, items };
    })
    .filter((section) => section.items.length > 0);

  const quickLinks = digest.sections.filter((section) => section.id !== "best").slice(0, 8);
  const tripBuilders = topFive.slice(0, 3);

  return <main>
    <section className="border-b border-border bg-surface py-10 sm:py-14">
      <Container>
        <nav aria-label="Breadcrumb" className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground"><a href="/">Front page</a> / <a href="/events">Texas Events</a> / <span aria-current="page">Texas This Weekend</span></nav>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.38fr] lg:items-end">
          <div>
            <p className="eyebrow text-primary">Texas This Weekend · {digest.dateContext}</p>
            <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">The best things to do in Texas this weekend</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">A short, source-verified guide to the events worth building a weekend around — plus nearby planning paths so you can turn one event into a real Texas trip.</p>
          </div>
          <div className="border-l-2 border-primary pl-5">
            <p className="text-4xl font-display">{topFive.length}</p>
            <p className="mt-1 text-sm font-semibold">editorial picks up front</p>
            <p className="mt-3 text-xs leading-5 text-muted-foreground">{page.itemCountLabel}</p>
          </div>
        </div>
        {quickLinks.length > 0 && <nav aria-label="Weekend guide sections" className="mt-8 flex gap-2 overflow-x-auto pb-2">
          {quickLinks.map((section) => <a key={section.id} href={`#weekend-${section.id}`} className="shrink-0 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary">{section.title.replace(" This Weekend", "").replace("Texas ", "")}</a>)}
        </nav>}
      </Container>
    </section>

    <Container className="py-10 sm:py-14">
      <section aria-labelledby="top-five-this-weekend">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5">
          <div><p className="eyebrow text-primary">Start here</p><h2 id="top-five-this-weekend" className="mt-2 font-display text-4xl sm:text-5xl">Top 5 this weekend</h2></div>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">The statewide shortlist is intentionally small. We favor current source checks, geographic variety and events substantial enough to anchor a day or weekend.</p>
        </div>
        <ol className="grid gap-px border-x border-b border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {topFive.map((event, index) => <li key={event.slug} className={`bg-background p-6 sm:p-7 ${index === 0 ? "md:col-span-2 lg:col-span-2" : ""}`}>
            <div className="flex items-center justify-between gap-4">
              <span className="font-display text-4xl text-primary">0{index + 1}</span>
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{event.city}{event.countyName ? ` · ${event.countyName}` : ""}</span>
            </div>
            <h3 className={`mt-6 font-display leading-tight ${index === 0 ? "text-4xl sm:text-5xl" : "text-3xl"}`}><EventGuideLink event={event} trackId={`weekend:top-five:${event.slug}`} className="hover:text-primary">{displayEventName(event)}</EventGuideLink></h3>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">{event.detail}</p>
            <EventGuideLink event={event} trackId={`weekend:top-five-cta:${event.slug}`} className="mt-6 inline-block text-sm font-semibold text-primary">Open guide →</EventGuideLink>
          </li>)}
        </ol>
      </section>

      {secondarySections.length > 0 && <section className="pt-14" aria-labelledby="browse-this-weekend">
        <div className="border-b border-border pb-5"><p className="eyebrow text-primary">Browse by place and mood</p><h2 id="browse-this-weekend" className="mt-2 font-display text-4xl">More ways to spend the weekend</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Events already featured in the Top 5 are removed here, so the page keeps giving you new options instead of repeating the same picks.</p></div>
        <div className="grid gap-8 pt-8 lg:grid-cols-2">
          {secondarySections.map((section) => <section id={`weekend-${section.id}`} key={section.id} className="scroll-mt-24 border-t-2 border-foreground pt-5">
            <div className="flex items-start justify-between gap-4"><div><h3 className="font-display text-3xl">{section.title}</h3><p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">{section.description}</p></div>{section.href ? <a href={section.href} className="shrink-0 text-sm font-semibold text-primary">Full edition →</a> : null}</div>
            <ol className="mt-5 divide-y divide-border border-y border-border">
              {section.items.map((event, index) => <li key={event.slug} className="grid gap-2 py-4 sm:grid-cols-[2.5rem_1fr_auto] sm:items-center">
                <span className="font-display text-2xl text-muted-foreground">0{index + 1}</span>
                <div><p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">{event.city}{event.countyName ? ` · ${event.countyName}` : ""}</p><EventGuideLink event={event} trackId={`weekend:${section.id}:${event.slug}`} className="mt-1 block font-display text-xl hover:text-primary">{displayEventName(event)}</EventGuideLink></div>
                <EventGuideLink event={event} trackId={`weekend:${section.id}:cta:${event.slug}`} className="text-sm font-semibold text-primary">Guide →</EventGuideLink>
              </li>)}
            </ol>
          </section>)}
        </div>
      </section>}

      {tripBuilders.length > 0 && <section className="pt-14" aria-labelledby="make-a-weekend-of-it">
        <div className="border-b border-border pb-5"><p className="eyebrow text-primary">Texas Defined advantage</p><h2 id="make-a-weekend-of-it" className="mt-2 font-display text-4xl">Make a weekend of it</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Don’t drive across Texas collecting unrelated events. Pick one anchor, then keep the rest of the trip in the same county or region.</p></div>
        <div className="grid gap-px border-x border-b border-border bg-border md:grid-cols-3">
          {tripBuilders.map((event) => {
            const county = countyHref(event.countyName);
            return <article key={event.slug} className="bg-background p-6"><p className="eyebrow text-muted-foreground">Weekend base · {event.city}</p><h3 className="mt-3 font-display text-2xl">{displayEventName(event)}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">Use the event as the fixed point, then explore nearby places instead of adding another long cross-state drive.</p><div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold text-primary"><EventGuideLink event={event}>Event guide →</EventGuideLink>{county ? <a href={county}>Explore {event.countyName} →</a> : null}<a href={regionHref(event.region)}>More in this region →</a></div></article>;
          })}
        </div>
      </section>}

      <section className="pt-14">
        <details className="border-y border-border py-5">
          <summary className="cursor-pointer list-none font-display text-2xl">See all {page.items.length} verified event guides <span className="ml-2 text-sm font-sans font-semibold text-primary">Expand →</span></summary>
          {page.items.length ? <ul className="mt-6 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">{page.items.map((event) => <li key={event.slug} className="bg-background p-5"><p className="eyebrow text-muted-foreground">{event.city}{event.countyName ? ` · ${event.countyName}` : ""}</p><h3 className="mt-2 font-display text-xl leading-tight"><EventGuideLink event={event} className="hover:text-primary">{displayEventName(event)}</EventGuideLink></h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{event.detail}</p></li>)}</ul> : null}
        </details>
      </section>

      <section className="pt-10">
        <details className="border border-border p-5 sm:p-6">
          <summary className="cursor-pointer list-none font-display text-2xl">How Texas Defined chooses and verifies weekend events <span className="ml-2 text-sm font-sans font-semibold text-primary">Read methodology →</span></summary>
          <div className="mt-6 grid gap-8 lg:grid-cols-2">
            <div><h3 className="font-display text-2xl">{page.planningTitle}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{page.planningIntro}</p><ol className="mt-5 space-y-3">{page.planningPoints.map((point, index) => <li key={point} className="border-t border-border pt-3 text-sm leading-7 text-muted-foreground"><strong className="mr-2 text-primary">0{index + 1}</strong>{point}</li>)}</ol></div>
            <div><h3 className="font-display text-2xl">{page.sourcePolicyTitle}</h3><div className="mt-3 space-y-3 text-sm leading-7 text-muted-foreground">{page.sourcePolicyParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>{!page.shouldIndex ? <p className="mt-4 text-xs leading-6 text-muted-foreground">{page.indexabilityNote}</p> : null}</div>
          </div>
        </details>
      </section>

      <section className="pt-12"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow text-primary">Keep exploring</p><h2 className="mt-2 font-display text-3xl">Plan beyond this weekend</h2></div><a href="/events" className="text-sm font-semibold text-primary">Full Texas calendar →</a></div><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{page.relatedCollections.map((item) => <a key={item.path} href={item.path} className="border border-border p-5 hover:border-primary"><strong className="font-display text-xl">{item.title}</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">{item.description}</span></a>)}</div></section>
    </Container>
  </main>;
}

function EventCollectionPage() {
  const { page } = Route.useLoaderData();
  if (page.weekendDigest) return <TexasThisWeekendPage page={page} />;

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