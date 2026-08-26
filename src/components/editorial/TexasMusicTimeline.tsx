import { Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { TEXAS_MUSIC_TIMELINE, TEXAS_MUSIC_TIMELINE_SOURCES } from "@/data/texas-music-timeline";

const siteUrl = "https://texasdefined.com";
const canonicalUrl = `${siteUrl}/texas-music-timeline`;

export function TexasMusicTimeline() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#collection`,
        name: "Texas Music Timeline",
        url: canonicalUrl,
        description: "A chronological guide to major eras and turning points in Texas music history.",
        isPartOf: { "@type": "CollectionPage", "@id": `${siteUrl}/texas-music#collection`, name: "Texas Music", url: `${siteUrl}/texas-music` },
        citation: TEXAS_MUSIC_TIMELINE_SOURCES.map((source) => source.url),
        mainEntity: { "@id": `${canonicalUrl}#timeline` },
      },
      {
        "@type": "ItemList",
        "@id": `${canonicalUrl}#timeline`,
        numberOfItems: TEXAS_MUSIC_TIMELINE.length,
        itemListElement: TEXAS_MUSIC_TIMELINE.map((entry, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: { "@type": "CreativeWork", name: `${entry.era}: ${entry.title}`, description: entry.summary, citation: entry.sourceUrl },
        })),
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

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <Container className="pb-16 pt-10 sm:pb-24 sm:pt-14">
      <article className="mx-auto max-w-5xl">
        <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Front page</Link><span aria-hidden="true" className="mx-2">/</span>
          <Link to="/texas-music" className="hover:text-foreground">Texas Music</Link><span aria-hidden="true" className="mx-2">/</span>
          <span aria-current="page" className="text-foreground">Timeline</span>
        </nav>

        <header className="border-b border-border py-10 sm:py-14">
          <p className="eyebrow text-primary">A century-plus of collisions, migrations and local scenes</p>
          <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">Texas Music Timeline</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">Follow the major eras that connected borderland conjunto, Dallas blues, western swing, Houston R&B, West Texas rock, Austin progressive country, Tejano, hip-hop, gospel and global pop.</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold"><Link to="/texas-music" className="border-b border-primary pb-1 text-primary">Texas Music authority hub →</Link><Link to="/texas-music-cities" className="border-b border-primary pb-1 text-primary">Compare the music cities →</Link></div>
        </header>

        <section className="border-b border-border py-8" aria-labelledby="timeline-reading-note">
          <p className="eyebrow text-primary">How to read this timeline</p>
          <h2 id="timeline-reading-note" className="mt-2 font-display text-3xl">Texas music did not develop in a straight line</h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-muted-foreground">These entries mark useful turning points, not isolated inventions. Traditions overlap across decades, musicians move between cities and genres, and many foundations predate the recordings or institutions that made them visible nationally. Use each milestone as a doorway into the deeper genre, city and venue guides.</p>
        </section>

        <ol className="relative border-l border-border ml-3 sm:ml-6">
          {TEXAS_MUSIC_TIMELINE.map((entry, index) => <li key={`${entry.era}-${entry.title}`} className="relative border-b border-border py-10 pl-8 sm:pl-12">
            <span className="absolute -left-[7px] top-12 h-3 w-3 rounded-full border-2 border-background bg-primary" aria-hidden="true" />
            <p className="eyebrow text-primary">{entry.era}</p>
            <h2 className="mt-2 max-w-3xl font-display text-3xl leading-tight sm:text-4xl">{entry.title}</h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">{entry.summary}</p>
            <p className="mt-4 text-sm"><span className="font-semibold">Places:</span> {entry.places.join(" · ")}</p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">{entry.links.map((link) => <Link key={link.href} to={link.href} className="border-b border-primary text-primary">{link.label}</Link>)}</div>
            <p className="mt-5 text-xs leading-5 text-muted-foreground">Historical anchor: <a href={entry.sourceUrl} target="_blank" rel="noreferrer noopener" className="underline decoration-primary/40 underline-offset-4">{entry.sourceLabel} ↗</a></p>
            <span className="sr-only">Timeline item {index + 1} of {TEXAS_MUSIC_TIMELINE.length}</span>
          </li>)}
        </ol>

        <section className="border-b border-border py-10" aria-labelledby="timeline-sources">
          <p className="eyebrow text-primary">Source notes</p>
          <h2 id="timeline-sources" className="mt-2 font-display text-3xl">Historical authority behind the chronology</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">The chronology is intentionally broad and anchored to scholarly Texas music references. Era labels summarize overlapping developments rather than claiming that a genre began on a single date.</p>
          <ul className="mt-6 divide-y divide-border border-y border-border">{TEXAS_MUSIC_TIMELINE_SOURCES.map((source) => <li key={source.url} className="py-4"><a href={source.url} target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4">{source.label} ↗</a></li>)}</ul>
        </section>

        <section className="py-12" aria-labelledby="timeline-next">
          <p className="eyebrow text-primary">Keep exploring</p><h2 id="timeline-next" className="mt-2 font-display text-4xl">Move from chronology to place and sound</h2>
          <div className="mt-6 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
            <Link to="/texas-music-cities" className="group bg-background p-6"><strong className="font-display text-2xl group-hover:text-primary">Texas Music Cities</strong><span className="mt-3 block text-sm leading-6 text-muted-foreground">See how Austin, Houston, San Antonio, Lubbock and DFW built different musical systems.</span></Link>
            <Link to="/texas-music-venues" className="group bg-background p-6"><strong className="font-display text-2xl group-hover:text-primary">Legendary Venues</strong><span className="mt-3 block text-sm leading-6 text-muted-foreground">Step inside the rooms that gave Texas music a physical home.</span></Link>
            <Link to="/texas-history" className="group bg-background p-6"><strong className="font-display text-2xl group-hover:text-primary">Texas History</strong><span className="mt-3 block text-sm leading-6 text-muted-foreground">Put the music inside the larger history of migration, cities, industry and cultural exchange.</span></Link>
          </div>
        </section>
      </article>
    </Container>
  </>;
}
