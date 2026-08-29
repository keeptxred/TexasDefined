import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { TEXAS_MUSIC_TIMELINE } from "@/data/texas-music-timeline";

const siteUrl = "https://texasdefined.com";
const canonicalUrl = `${siteUrl}/texas-music-timeline`;

export const Route = createLazyFileRoute("/texas-music-timeline")({ component: TexasMusicTimelinePage });

function TexasMusicTimelinePage() {
  const sources = Array.from(
    new Map(TEXAS_MUSIC_TIMELINE.map((entry) => [entry.sourceUrl, { href: entry.sourceUrl, label: entry.sourceLabel }])).values(),
  );
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${canonicalUrl}#article`,
        headline: "Texas Music Timeline: Milestones, Venues, Genres & Scenes",
        description:
          "A sourced chronology connecting Texas dance halls, blues, western swing, Tejano, landmark venues and regional hip-hop.",
        url: canonicalUrl,
        mainEntityOfPage: { "@id": `${canonicalUrl}#page` },
        publisher: { "@type": "Organization", name: "TexasDefined", url: siteUrl },
        articleSection: "Texas Music",
        citation: sources.map((source) => source.href),
        isPartOf: { "@type": "CollectionPage", "@id": `${siteUrl}/texas-music#collection`, name: "Texas Music", url: `${siteUrl}/texas-music` },
      },
      {
        "@type": "ItemList",
        "@id": `${canonicalUrl}#timeline`,
        name: "Texas music history timeline",
        numberOfItems: TEXAS_MUSIC_TIMELINE.length,
        itemListElement: TEXAS_MUSIC_TIMELINE.map((entry, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `${entry.year}: ${entry.title}`,
          url: `${siteUrl}${entry.href}`,
        })),
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#page`,
        url: canonicalUrl,
        name: "Texas Music Timeline",
        isPartOf: { "@type": "WebSite", "@id": `${siteUrl}/#website`, name: "TexasDefined", url: siteUrl },
        breadcrumb: { "@id": `${canonicalUrl}#breadcrumb` },
        mainEntity: { "@id": `${canonicalUrl}#article` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Front page", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Texas Music", item: `${siteUrl}/texas-music` },
          { "@type": "ListItem", position: 3, name: "Texas Music Timeline", item: canonicalUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Container className="pb-16 pt-10 sm:pb-24 sm:pt-14">
        <article className="mx-auto max-w-5xl">
          <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Front page</Link>
            <span aria-hidden="true" className="mx-2">/</span>
            <Link to="/texas-music" className="hover:text-foreground">Texas Music</Link>
            <span aria-hidden="true" className="mx-2">/</span>
            <span aria-current="page" className="text-foreground">Timeline</span>
          </nav>

          <header className="border-b border-border py-10 sm:py-14">
            <p className="eyebrow text-primary">Texas Music · chronology</p>
            <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">Texas Music Timeline</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
              Follow durable turning points in Texas music history—from community dance halls and early recorded blues to western swing, Black performance circuits, Tejano, landmark clubs and regional hip-hop systems.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
              <Link to="/texas-music" className="border-b border-primary pb-1 text-primary">Texas Music authority hub →</Link>
              <Link to="/texas-music-cities" className="border-b border-primary pb-1 text-primary">Compare Texas music cities →</Link>
            </div>
          </header>

          <section className="border-b border-border py-8" aria-labelledby="timeline-method">
            <p className="eyebrow text-primary">How to read it</p>
            <h2 id="timeline-method" className="mt-2 font-display text-3xl">A timeline of systems, not just celebrity dates</h2>
            <p className="mt-4 max-w-4xl text-base leading-8">
              These milestones emphasize places and systems that changed what Texas musicians could do: dance floors, recording networks, Black entertainment districts, clubs, labels and regional distribution. The list is intentionally selective rather than pretending every important artist or recording can fit into one chronology.
            </p>
          </section>

          <ol className="border-b border-border">
            {TEXAS_MUSIC_TIMELINE.map((entry, index) => (
              <li key={`${entry.year}-${entry.title}`} className="grid gap-5 border-b border-border py-9 last:border-b-0 md:grid-cols-[8rem_minmax(0,1fr)] md:gap-10">
                <div>
                  <p className="font-display text-3xl font-semibold text-primary">{entry.year}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{entry.place}</p>
                </div>
                <div className="max-w-3xl">
                  <p className="eyebrow text-muted-foreground">{String(index + 1).padStart(2, "0")}</p>
                  <h2 className="mt-2 font-display text-3xl leading-tight">{entry.title}</h2>
                  <p className="mt-4 text-base leading-8 text-muted-foreground">{entry.summary}</p>
                  <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
                    <a href={entry.href} className="border-b border-primary text-primary">Related TexasDefined guide →</a>
                    <a href={entry.sourceUrl} target="_blank" rel="noreferrer noopener" className="border-b border-primary/40 text-primary">{entry.sourceLabel} ↗</a>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <section className="border-b border-border py-10" aria-labelledby="timeline-sources">
            <p className="eyebrow text-primary">Source notes</p>
            <h2 id="timeline-sources" className="mt-2 font-display text-3xl">Authority behind the chronology</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
              Each milestone links to the historical or institutional source used for its core claim. Dates describe durable historical events, not changing concert calendars or visitor operations.
            </p>
            <ul className="mt-6 grid gap-px border border-border bg-border md:grid-cols-2">
              {sources.map((source) => (
                <li key={source.href} className="bg-background p-5">
                  <a href={source.href} target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4">{source.label} ↗</a>
                </li>
              ))}
            </ul>
          </section>

          <section className="py-12" aria-labelledby="timeline-related">
            <p className="eyebrow text-primary">Keep exploring</p>
            <h2 id="timeline-related" className="mt-2 font-display text-4xl">Follow the timeline into deeper guides</h2>
            <div className="mt-6 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
              <Link to="/texas-music-venues" className="group bg-background p-6"><strong className="font-display text-2xl group-hover:text-primary">Music Venues</strong><span className="mt-3 block text-sm leading-6 text-muted-foreground">The halls, honky-tonks and clubs that gave Texas scenes physical form.</span></Link>
              <Link to="/texas-music-cities" className="group bg-background p-6"><strong className="font-display text-2xl group-hover:text-primary">Music Cities</strong><span className="mt-3 block text-sm leading-6 text-muted-foreground">Compare the local systems that turned regional talent into durable scenes.</span></Link>
              <Link to="/texas-history" className="group bg-background p-6"><strong className="font-display text-2xl group-hover:text-primary">Texas History</strong><span className="mt-3 block text-sm leading-6 text-muted-foreground">Place musical change inside migration, industry and community history.</span></Link>
            </div>
          </section>
        </article>
      </Container>
    </>
  );
}
