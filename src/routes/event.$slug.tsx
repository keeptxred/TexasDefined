import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { getMajorEventAuthority } from "@/data/major-event-authority";
import { formatDateRange } from "@/domain/utils/format";
import { buildMeta, canonicalLink } from "@/lib/seo";

const siteUrl = "https://texasdefined.com";

export const Route = createFileRoute("/event/$slug")({
  loader: async ({ params }) => {
    const event = await getMajorEventAuthority(params.slug);
    if (!event) throw notFound();
    return { event };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { event } = loaderData;
    const canonicalPath = `/event/${event.slug}`;
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: `${event.name}: Dates, Planning & Texas Travel Guide`,
        description: `${event.name} in ${event.city}: verified dates, practical planning, official sources and ideas for building the event into a Texas trip.`,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    };
  },
  component: MajorEventGuidePage,
});

function MajorEventGuidePage() {
  const { event } = Route.useLoaderData();
  const canonicalUrl = `${siteUrl}/event/${event.slug}`;
  const dateLabel = formatDateRange(event.startDate, event.endDate, "en-US");
  const faq = [
    { question: `When is ${event.name}?`, answer: `${event.name} is currently scheduled for ${dateLabel}.${event.dateNote ? ` ${event.dateNote}` : ""} Texas Defined last checked the listed source on ${formatCheckedDate(event.sourceCheckedAt)}.` },
    { question: `Where is ${event.name}?`, answer: `${event.name} is held in ${event.city}, Texas${event.venue ? `, with ${event.venue} serving as the primary event location` : ""}. Use the organizer's current directions before traveling.` },
    { question: `What should I check before going to ${event.name}?`, answer: "Recheck the official schedule, admission requirements, parking, transportation, weather-sensitive rules and prohibited-items policy shortly before your visit." },
  ];
  const eventJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Event", "@id": `${canonicalUrl}#event`, name: event.name, description: event.summary, startDate: event.startDate, endDate: event.endDate, eventStatus: "https://schema.org/EventScheduled", eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode", url: canonicalUrl, sameAs: [event.officialUrl], location: { "@type": "Place", name: event.venue || event.city, address: { "@type": "PostalAddress", addressLocality: event.city, addressRegion: "TX", addressCountry: "US" } } },
      { "@type": "FAQPage", "@id": `${canonicalUrl}#faq`, mainEntity: faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
      { "@type": "BreadcrumbList", "@id": `${canonicalUrl}#breadcrumbs`, itemListElement: [{ "@type": "ListItem", position: 1, name: "Front page", item: `${siteUrl}/` }, { "@type": "ListItem", position: 2, name: "Texas Events", item: `${siteUrl}/events` }, { "@type": "ListItem", position: 3, name: event.name, item: canonicalUrl }] },
    ],
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }} />
    <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
      <article className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Front page</Link><span aria-hidden="true" className="mx-2">/</span><Link to="/events" className="hover:text-foreground">Texas Events</Link><span aria-hidden="true" className="mx-2">/</span><span aria-current="page" className="text-foreground">{event.name}</span>
        </nav>

        <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end">
          <div><p className="eyebrow text-primary">Major Texas event</p><h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">{event.name}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">{event.summary}</p></div>
          <dl className="border-y border-border py-4 text-sm lg:border-y-0 lg:border-l lg:py-0 lg:pl-6">
            <Fact label="Dates" value={dateLabel} /><Fact label="City" value={`${event.city}, Texas`} /><Fact label="County" value={event.countyName} /><Fact label="Venue" value={event.venue} /><Fact label="Date checked" value={formatCheckedDate(event.sourceCheckedAt)} />
          </dl>
        </header>

        {event.dateNote ? <p className="border-b border-border py-5 text-sm leading-6 text-muted-foreground"><strong className="text-foreground">Schedule note:</strong> {event.dateNote}</p> : null}
        <div className="flex flex-wrap gap-x-7 gap-y-3 border-b border-border py-5 text-sm font-semibold">
          <a className="underline decoration-primary/50 underline-offset-4 hover:text-primary" href={event.officialUrl} target="_blank" rel="noreferrer noopener">Official event information ↗</a>
          {event.countySlug ? <a className="underline decoration-primary/50 underline-offset-4 hover:text-primary" href={`/browse/counties#county-${event.countySlug}`}>Explore {event.countyName} →</a> : null}
          <Link className="underline decoration-primary/50 underline-offset-4 hover:text-primary" to="/events">All Texas events →</Link>
        </div>

        <section className="grid gap-8 border-b border-border py-12 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Why it matters</p><h2 className="mt-2 font-display text-3xl leading-tight">Why {event.name} is worth planning around</h2></div>
          <p className="max-w-3xl text-base leading-8 text-muted-foreground">{event.whyItMatters}</p>
        </section>

        <section className="border-b border-border py-12" aria-labelledby="event-planning-heading"><div className="grid gap-8 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Plan the visit</p><h2 id="event-planning-heading" className="mt-2 font-display text-3xl leading-tight">A practical way to build the trip</h2></div>
          <div className="grid gap-8 md:grid-cols-3">{event.planningSections.map((section) => <GuideCard key={section.title} title={section.title} body={section.body} />)}</div>
        </div></section>

        <section className="border-b border-border py-12" aria-labelledby="event-related-heading"><div className="grid gap-8 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Keep exploring</p><h2 id="event-related-heading" className="mt-2 font-display text-3xl leading-tight">Connect the event to the rest of Texas</h2></div>
          <div className="grid gap-6 md:grid-cols-2">{event.relatedLinks.map((link) => <a key={link.href} href={link.href} className="group border-t border-border pt-5"><strong className="font-display text-2xl leading-tight group-hover:text-primary">{link.label}</strong><span className="mt-3 block text-sm leading-6 text-muted-foreground">{link.description}</span></a>)}</div>
        </div></section>

        <section className="border-b border-border py-12" aria-labelledby="event-faq-heading"><div className="grid gap-8 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Quick answers</p><h2 id="event-faq-heading" className="mt-2 font-display text-3xl leading-tight">Before you go</h2></div>
          <div>{faq.map((item) => <div key={item.question} className="border-t border-border py-6 first:border-t-0 first:pt-0"><h3 className="font-display text-2xl leading-tight">{item.question}</h3><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{item.answer}</p></div>)}</div>
        </div></section>

        <section className="py-12" aria-labelledby="event-sources-heading"><div className="grid gap-8 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Sources</p><h2 id="event-sources-heading" className="mt-2 font-display text-3xl leading-tight">Official planning sources</h2></div>
          <div><p className="max-w-3xl text-sm leading-7 text-muted-foreground">Event details can change. Texas Defined uses the sources below for the current occurrence while keeping the guide URL stable year to year.</p><ul className="mt-6 space-y-3 text-sm">{event.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4">{source.label} ↗</a></li>)}</ul></div>
        </div></section>
      </article>
    </Container>
  </>;
}

function Fact({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return <div className="grid grid-cols-[6rem_1fr] gap-4 border-b border-border py-2 last:border-b-0 lg:grid-cols-1 lg:gap-0 lg:border-b lg:py-3"><dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{label}</dt><dd className="mt-0 font-medium text-foreground lg:mt-1">{value}</dd></div>;
}

function GuideCard({ title, body }: { title: string; body: string }) {
  return <div className="border-t border-border pt-5"><h3 className="font-display text-2xl leading-tight">{title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p></div>;
}

function formatCheckedDate(value: string) {
  return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(new Date(`${value}T00:00:00Z`));
}
