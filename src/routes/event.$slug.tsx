import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { getMajorEventAuthority } from "@/data/major-event-authority";
import { formatDateRange } from "@/domain/utils/format";
import { buildMeta, canonicalLink } from "@/lib/seo";

const siteUrl = "https://texasdefined.com";
const sectionClass = "border-b border-border py-10";
const mutedClass = "mt-3 text-sm leading-7 text-muted-foreground";
const linkClass = "font-semibold text-primary underline underline-offset-4";

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
  const summary = `${event.name} is a major annual Texas event in ${event.city}. This guide tracks verified dates, official sources and practical trip-planning details.`;
  const faq = [
    { question: `When is ${event.name}?`, answer: `${event.name} is currently scheduled for ${dateLabel}.${event.dateNote ? ` ${event.dateNote}` : ""} Source check: ${formatCheckedDate(event.sourceCheckedAt)}.` },
    { question: `Where is ${event.name}?`, answer: `${event.name} is held in ${event.city}, Texas${event.venue ? ` at or around ${event.venue}` : ""}. Check organizer directions before traveling.` },
    { question: `What should I check before going?`, answer: "Recheck the official schedule, admission, parking, transportation, weather-sensitive rules and prohibited items shortly before your visit." },
  ];
  const eventJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Event", "@id": `${canonicalUrl}#event`, name: event.name, description: summary, startDate: event.startDate, endDate: event.endDate, eventStatus: "https://schema.org/EventScheduled", eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode", url: canonicalUrl, sameAs: [event.officialUrl], location: { "@type": "Place", name: event.venue || event.city, address: { "@type": "PostalAddress", addressLocality: event.city, addressRegion: "TX", addressCountry: "US" } } },
      { "@type": "FAQPage", mainEntity: faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Front page", item: `${siteUrl}/` }, { "@type": "ListItem", position: 2, name: "Texas Events", item: `${siteUrl}/events` }, { "@type": "ListItem", position: 3, name: event.name, item: canonicalUrl }] },
    ],
  };

  const facts = [["Dates", dateLabel], ["City", `${event.city}, Texas`], ["County", event.countyName], ["Venue", event.venue], ["Checked", formatCheckedDate(event.sourceCheckedAt)]];

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }} />
    <Container className="pb-20 pt-12">
      <article className="mx-auto max-w-5xl">
        <nav className="mb-8 text-sm text-muted-foreground" aria-label="Breadcrumb"><Link to="/">Front page</Link> / <Link to="/events">Texas Events</Link> / {event.name}</nav>
        <header className={sectionClass}>
          <p className="eyebrow text-primary">Major Texas event</p>
          <h1 className="mt-3 font-display text-5xl leading-tight sm:text-6xl">{event.name}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{summary}</p>
          <dl className="mt-8 grid gap-4 sm:grid-cols-3">{facts.map(([label, value]) => value ? <div key={label}><dt className="text-xs uppercase text-muted-foreground">{label}</dt><dd className="mt-1 font-medium">{value}</dd></div> : null)}</dl>
          {event.dateNote ? <p className={mutedClass}><strong className="text-foreground">Schedule note:</strong> {event.dateNote}</p> : null}
          <p className="mt-6 flex flex-wrap gap-5 text-sm"><a className={linkClass} href={event.officialUrl} target="_blank" rel="noreferrer noopener">Official event information ↗</a>{event.countySlug ? <a className={linkClass} href={`/browse/counties#county-${event.countySlug}`}>Explore {event.countyName} →</a> : null}<Link className={linkClass} to="/events">All Texas events →</Link></p>
        </header>

        <section className={sectionClass}><p className="eyebrow text-primary">Why it matters</p><h2 className="mt-2 font-display text-3xl">Why plan around {event.name}?</h2><p className={mutedClass}>{event.whyItMatters}</p></section>

        <section className={sectionClass}><p className="eyebrow text-primary">Plan the visit</p><h2 className="mt-2 font-display text-3xl">A practical trip plan</h2><div className="mt-7 grid gap-7 md:grid-cols-3">{event.planningSections.map((item) => <div key={item.title}><h3 className="font-display text-2xl">{item.title}</h3><p className={mutedClass}>{item.body}</p></div>)}</div></section>

        <section className={sectionClass}><p className="eyebrow text-primary">Keep exploring</p><h2 className="mt-2 font-display text-3xl">Connect the event to Texas</h2><div className="mt-7 grid gap-5 md:grid-cols-2">{event.relatedLinks.map((item) => <a key={item.href} href={item.href} className="border-t border-border pt-4"><strong className="font-display text-xl">{item.label}</strong><span className={mutedClass + " block"}>{item.description}</span></a>)}</div></section>

        <section className={sectionClass}><p className="eyebrow text-primary">Quick answers</p><h2 className="mt-2 font-display text-3xl">Before you go</h2><div className="mt-7">{faq.map((item) => <div key={item.question} className="border-t border-border py-5"><h3 className="font-display text-xl">{item.question}</h3><p className={mutedClass}>{item.answer}</p></div>)}</div></section>

        <section className="py-10"><p className="eyebrow text-primary">Sources</p><h2 className="mt-2 font-display text-3xl">Official planning sources</h2><p className={mutedClass}>Event details can change. Texas Defined checks current organizer and host sources while keeping this guide URL stable year to year.</p><ul className="mt-5 space-y-2 text-sm">{event.sources.map((source) => <li key={source.url}><a className={linkClass} href={source.url} target="_blank" rel="noreferrer noopener">{source.label} ↗</a></li>)}</ul></section>
      </article>
    </Container>
  </>;
}

function formatCheckedDate(value: string) {
  return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(new Date(`${value}T00:00:00Z`));
}
