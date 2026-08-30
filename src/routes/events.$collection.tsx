import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { getEventCollectionPage } from "@/data/event-collection-page";
import { buildMeta, canonicalLink } from "@/lib/seo";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute("/events/$collection")({
  loader: async ({ params }) => {
    const page = await getEventCollectionPage(params.collection);
    if (!page) throw notFound();
    return { page };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { page } = loaderData;
    const canonicalPath = `/events/${page.slug}`;
    const pageUrl = `${siteUrl}${canonicalPath}`;
    const itemListElement = page.items.map((event, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "WebPage",
        "@id": `${siteUrl}/event/${event.slug}#page`,
        url: `${siteUrl}/event/${event.slug}`,
        name: event.name,
        description: event.detail,
      },
    }));
    const graph = [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#page`,
        url: pageUrl,
        name: page.title,
        description: page.description,
        isPartOf: { "@id": `${siteUrl}/#website` },
        mainEntity: { "@id": `${pageUrl}#events` },
        breadcrumb: { "@id": `${pageUrl}#breadcrumbs` },
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#events`,
        name: page.title,
        numberOfItems: itemListElement.length,
        itemListElement,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Front page", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Texas Events", item: `${siteUrl}/events` },
          { "@type": "ListItem", position: 3, name: page.title, item: pageUrl },
        ],
      },
    ];
    return {
      meta: buildMeta(texasDefinedBrand, {
        title: page.title,
        description: page.description,
        canonicalPath,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }],
    };
  },
  component: EventCollectionPage,
});

function EventCollectionPage() {
  const { page } = Route.useLoaderData();

  return (
    <main>
      <section className="border-b border-border bg-surface py-12 sm:py-16">
        <Container>
          <nav aria-label="Breadcrumb" className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link to="/">Front page</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link to="/events">Texas Events</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{page.title}</li>
            </ol>
          </nav>
          <p className="eyebrow mt-8 text-primary">{page.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">{page.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{page.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span className="border border-border bg-background px-3 py-2">{page.itemCount.toLocaleString("en-US")} verified event guides</span>
            {page.latestSourceCheck && <span className="border border-border bg-background px-3 py-2">Latest source check in this collection: {page.latestSourceCheck}</span>}
          </div>
        </Container>
      </section>

      <section className="border-b border-border py-12">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.6fr]">
            <div>
              <p className="eyebrow text-primary">How to plan it</p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl">{page.planningTitle}</h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{page.planningIntro}</p>
            </div>
            <ol className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
              {page.planningPoints.map((point, index) => (
                <li key={point} className="bg-background p-6">
                  <span className="eyebrow text-primary">0{index + 1}</span>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{point}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-primary">Permanent planning pages</p>
              <h2 className="mt-2 font-display text-4xl">Verified event guides in this collection</h2>
            </div>
            <Link to="/events" className="text-sm font-semibold text-primary">Browse the full Texas calendar →</Link>
          </div>

          {page.items.length ? (
            <ul className="grid gap-px border-x border-b border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {page.items.map((event) => (
                <li key={event.slug} className="bg-background p-6">
                  <p className="eyebrow text-muted-foreground">{event.city}{event.countyName ? ` · ${event.countyName}` : ""}</p>
                  <h3 className="mt-3 font-display text-2xl leading-tight">
                    <Link to="/event/$slug" params={{ slug: event.slug }} className="hover:text-primary">{event.name}</Link>
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{event.detail}</p>
                  <Link to="/event/$slug" params={{ slug: event.slug }} className="mt-5 inline-block text-sm font-semibold text-primary">Dates, sources & planning →</Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="border-x border-b border-border p-8 text-sm leading-7 text-muted-foreground">
              No permanent event guide currently meets the source standard for this collection. The page remains intentionally unpadded rather than inventing or projecting an event date.
            </div>
          )}
        </Container>
      </section>

      <section className="border-y border-border bg-surface py-12">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="eyebrow text-primary">Source policy</p>
              <h2 className="mt-3 font-display text-3xl">Verified occurrence first, evergreen planning second</h2>
              <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
                <p>Texas Defined uses permanent event-guide URLs, but it does not assume that an annual tradition repeats on the same dates every year. Organizer or host sources control the occurrence shown on each guide. When a future date is derived from an explicit recurrence rule rather than a dedicated annual schedule, the guide says so.</p>
                <p>The event page is the stable planning layer: why the event matters, how to approach the destination, related county or culture resources, and the official sources used for verification. Operational details such as gates, tickets, road closures, weather procedures and daily programs should always be rechecked with the organizer before travel.</p>
              </div>
            </div>
            <div>
              <p className="eyebrow text-primary">Keep exploring</p>
              <h2 className="mt-3 font-display text-3xl">Related Texas event guides</h2>
              <div className="mt-5 grid gap-3">
                {page.relatedCollections.map((item) => (
                  <a key={item.path} href={item.path} className="border border-border bg-background p-5 hover:border-primary">
                    <strong className="font-display text-xl">{item.title}</strong>
                    <span className="mt-2 block text-sm leading-6 text-muted-foreground">{item.description}</span>
                  </a>
                ))}
                <Link to="/events" className="border border-border bg-background p-5 hover:border-primary">
                  <strong className="font-display text-xl">Texas Events</strong>
                  <span className="mt-2 block text-sm leading-6 text-muted-foreground">Return to the statewide live calendar and filter across all event categories and regions.</span>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
