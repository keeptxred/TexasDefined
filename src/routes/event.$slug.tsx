import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { ArticleBody } from "@/components/editorial/ArticleBody";
import { Container } from "@/components/layout/Container";
import { getMajorEventAuthority } from "@/data/major-event-authority";
import type { ArticleBlock } from "@/data/types";
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
    return { meta: buildMeta(texasDefinedBrand, { canonicalPath, title: `${event.name}: Dates & Texas Travel Guide`, description: `${event.name} in ${event.city}: verified dates, official sources and practical trip planning.` }), links: [canonicalLink(texasDefinedBrand, canonicalPath)] };
  },
  component: MajorEventGuidePage,
});

function MajorEventGuidePage() {
  const { event } = Route.useLoaderData();
  const dateLabel = formatDateRange(event.startDate, event.endDate, "en-US");
  const body: ArticleBlock[] = [
    { type: "heading", text: `Why plan around ${event.name}?` },
    { type: "paragraph", text: event.whyItMatters },
    { type: "heading", text: "Plan the visit" },
    ...event.planningSections.flatMap((item) => [{ type: "heading", text: item.title } as ArticleBlock, { type: "paragraph", text: item.body } as ArticleBlock]),
  ];
  const url = `${siteUrl}/event/${event.slug}`;
  const schema = { "@context": "https://schema.org", "@type": "Event", name: event.name, url, startDate: event.startDate, endDate: event.endDate, eventStatus: "https://schema.org/EventScheduled", eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode", sameAs: event.officialUrl, location: { "@type": "Place", name: event.venue || event.city, address: { "@type": "PostalAddress", addressLocality: event.city, addressRegion: "TX", addressCountry: "US" } } };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <Container className="pb-20 pt-12"><article className="mx-auto max-w-4xl">
      <nav className="mb-8 text-sm text-muted-foreground"><Link to="/">Front page</Link> / <Link to="/events">Texas Events</Link> / {event.name}</nav>
      <header className="border-b border-border pb-8"><p className="eyebrow text-primary">Major Texas event</p><h1 className="mt-3 font-display text-5xl sm:text-6xl">{event.name}</h1><p className="mt-5 text-lg text-muted-foreground">{dateLabel} · {event.city}, Texas{event.countyName ? ` · ${event.countyName}` : ""}</p>{event.dateNote ? <p className="mt-4 text-sm text-muted-foreground">{event.dateNote}</p> : null}<p className="mt-5"><a className="font-semibold text-primary underline" href={event.officialUrl} target="_blank" rel="noreferrer noopener">Official event information ↗</a></p></header>
      <ArticleBody blocks={body} />
      <section className="mt-14 border-t border-border pt-8"><h2 className="font-display text-3xl">Keep exploring</h2><ul className="mt-4 space-y-3">{event.relatedLinks.map((item) => <li key={item.href}><a className="font-semibold text-primary underline" href={item.href}>{item.label}</a><span className="text-muted-foreground"> — {item.description}</span></li>)}</ul></section>
      <section className="mt-10 border-t border-border pt-8"><h2 className="font-display text-3xl">Official sources</h2><ul className="mt-4 space-y-3">{event.sources.map((source) => <li key={source.url}><a className="font-semibold text-primary underline" href={source.url} target="_blank" rel="noreferrer noopener">{source.label} ↗</a></li>)}</ul></section>
    </article></Container>
  </>;
}
