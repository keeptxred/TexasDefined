import { Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { TEXAS_MUSIC_HISTORIC_VENUE_STATUS } from "@/data/texas-music-historic-venue-guides";
import type { TexasEvergreenGuide } from "@/data/texas-evergreen-guides";

const siteUrl = "https://texasdefined.com";

type SourceNote = { label: string; href: string; note: string };

const historicVenueSources: Record<string, readonly SourceNote[]> = {
  "texas-music-historic-venues": [
    {
      label: "Handbook of Texas Music — Venues",
      href: "https://www.tshaonline.org/handbook/projects/texas-music/category/music/category/venues",
      note: "Texas State Historical Association collection documenting dance halls, clubs, ballrooms and other venues important to the state's music history.",
    },
  ],
  "armadillo-world-headquarters-history": [
    {
      label: "Handbook of Texas — Armadillo World Headquarters",
      href: "https://www.tshaonline.org/handbook/entries/armadillo-world-headquarters",
      note: "Documents the Austin venue's 1970 opening, cross-genre programming, progressive-country role, poster culture and final 1980 closure.",
    },
  ],
  "gilleys-pasadena-history": [
    {
      label: "Handbook of Texas — Gilley's",
      href: "https://www.tshaonline.org/handbook/entries/gilleys",
      note: "Documents the original Pasadena club, Mickey Gilley and Sherwood Cryer, Live from Gilley's, Urban Cowboy, closure, fire and demolition history.",
    },
  ],
  "eldorado-ballroom-houston-history": [
    {
      label: "Handbook of Texas — Eldorado Ballroom",
      href: "https://www.tshaonline.org/handbook/entries/eldorado-ballroom",
      note: "Documents the 1939 Third Ward ballroom, its Black ownership, musical and community role, decline, preservation and restoration history.",
    },
  ],
  "longhorn-ballroom-dallas-history": [
    {
      label: "Handbook of Texas — Longhorn Ballroom",
      href: "https://www.tshaonline.org/handbook/entries/longhorn-ballroom",
      note: "Documents the Dallas ballroom's Bob Wills origins, Dewey Groom era, cross-genre programming, 1978 Sex Pistols show and later history.",
    },
  ],
  "victory-grill-austin-history": [
    {
      label: "Handbook of Texas — Victory Grill",
      href: "https://www.tshaonline.org/handbook/entries/victory-grill",
      note: "Documents Johnny Holmes's 1945 opening, the East Austin Chitlin' Circuit era, decline, 1988 fire, restoration and preservation significance.",
    },
  ],
};

export function TexasMusicHistoricVenueGuide({ guide }: { guide: TexasEvergreenGuide }) {
  const canonicalUrl = `${siteUrl}/${guide.slug}`;
  const sources = historicVenueSources[guide.slug] ?? [];
  const status = TEXAS_MUSIC_HISTORIC_VENUE_STATUS[guide.slug];
  const isHub = guide.slug === "texas-music-historic-venues";
  const breadcrumbItems = [
    { "@type": "ListItem", position: 1, name: "Front page", item: `${siteUrl}/` },
    { "@type": "ListItem", position: 2, name: "Texas Music", item: `${siteUrl}/texas-music` },
    { "@type": "ListItem", position: 3, name: "Texas Music Venues", item: `${siteUrl}/texas-music-venues` },
    ...(isHub
      ? []
      : [{ "@type": "ListItem", position: 4, name: "Historic & Lost Rooms", item: `${siteUrl}/texas-music-historic-venues` }]),
    { "@type": "ListItem", position: isHub ? 4 : 5, name: guide.title, item: canonicalUrl },
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${canonicalUrl}#article`,
        headline: guide.title,
        description: guide.dek,
        url: canonicalUrl,
        mainEntityOfPage: { "@id": `${canonicalUrl}#page` },
        publisher: { "@type": "Organization", name: "TexasDefined", url: siteUrl },
        articleSection: "Texas Music",
        citation: sources.map((source) => source.href),
        isPartOf: {
          "@type": "CollectionPage",
          "@id": `${siteUrl}/texas-music-venues#collection`,
          name: "Texas Music Venues",
          url: `${siteUrl}/texas-music-venues`,
        },
        about: guide.sections.map((section) => ({ "@type": "Thing", name: section.heading })),
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#page`,
        url: canonicalUrl,
        name: guide.title,
        description: guide.dek,
        isPartOf: { "@type": "WebSite", "@id": `${siteUrl}/#website`, name: "TexasDefined", url: siteUrl },
        breadcrumb: { "@id": `${canonicalUrl}#breadcrumb` },
        mainEntity: { "@id": `${canonicalUrl}#article` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: breadcrumbItems,
      },
    ],
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <Container className="pb-16 pt-10 sm:pb-24 sm:pt-14">
      <article className="mx-auto max-w-5xl">
        <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Front page</Link>
          <span aria-hidden="true" className="mx-2">/</span>
          <Link to="/texas-music" className="hover:text-foreground">Texas Music</Link>
          <span aria-hidden="true" className="mx-2">/</span>
          <Link to="/texas-music-venues" className="hover:text-foreground">Music Venues</Link>
          {!isHub ? <>
            <span aria-hidden="true" className="mx-2">/</span>
            <Link to="/texas-music-historic-venues" className="hover:text-foreground">Historic & Lost Rooms</Link>
          </> : null}
          <span aria-hidden="true" className="mx-2">/</span>
          <span aria-current="page" className="text-foreground">{isHub ? "Historic & Lost Rooms" : guide.title}</span>
        </nav>

        <header className="border-b border-border py-10 sm:py-14">
          <p className="eyebrow text-primary">{guide.eyebrow}</p>
          <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">{guide.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">{guide.dek}</p>
          {status ? <div className="mt-6 max-w-3xl border-l-2 border-primary pl-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Physical status: {status.label}</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{status.summary}</p>
          </div> : null}
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
            <Link to="/texas-music" className="border-b border-primary pb-1 text-primary">Texas Music collection →</Link>
            <Link to="/texas-music-venues" className="border-b border-primary pb-1 text-primary">Landmark music venues →</Link>
            {!isHub ? <Link to="/texas-music-historic-venues" className="border-b border-primary pb-1 text-primary">Historic & lost rooms →</Link> : null}
          </div>
        </header>

        <section className="border-b border-border py-8" aria-labelledby="historic-venue-quick-answer">
          <p className="eyebrow text-primary">Quick answer</p>
          <h2 id="historic-venue-quick-answer" className="mt-2 font-display text-3xl">The short version</h2>
          <p className="mt-4 max-w-4xl text-base leading-8">{guide.quickAnswer}</p>
        </section>

        <div>
          {guide.sections.map((section, index) => <section key={section.heading} className="grid gap-6 border-b border-border py-10 lg:grid-cols-[12rem_minmax(0,1fr)]">
            <div>
              <p className="eyebrow text-primary">{String(index + 1).padStart(2, "0")}</p>
              <h2 className="mt-2 font-display text-3xl leading-tight">{section.heading}</h2>
            </div>
            <div className="max-w-3xl space-y-5">
              {section.body.map((paragraph) => <p key={paragraph} className="text-base leading-8 text-muted-foreground">{paragraph}</p>)}
              {section.bullets?.length ? <ul className="grid gap-3 border-l border-primary/40 pl-5 text-sm leading-7">
                {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
              </ul> : null}
              {section.links?.length ? <div className="flex flex-wrap gap-x-6 gap-y-3 pt-1 text-sm font-semibold">
                {section.links.map((link) => <Link key={link.href} to={link.href} className="border-b border-primary text-primary">{link.label}</Link>)}
              </div> : null}
            </div>
          </section>)}
        </div>

        <section className="border-b border-border py-10" aria-labelledby="historic-venue-source-notes">
          <p className="eyebrow text-primary">Source notes</p>
          <h2 id="historic-venue-source-notes" className="mt-2 font-display text-3xl">Historical authority and status evidence</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">These guides distinguish a venue's historical importance from its present-day operating status. Current schedules, access, ownership and event programming can change and should be verified with the current operator or preservation organization before a visit.</p>
          <ul className="mt-6 divide-y divide-border border-y border-border">
            {sources.map((source) => <li key={source.href} className="py-4">
              <a href={source.href} target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4">{source.label} ↗</a>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{source.note}</p>
            </li>)}
          </ul>
        </section>

        <section className="py-12" aria-labelledby="historic-venue-related-reading">
          <p className="eyebrow text-primary">Keep exploring</p>
          <h2 id="historic-venue-related-reading" className="mt-2 font-display text-4xl">Related TexasDefined guides</h2>
          <div className="mt-6 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
            {guide.related.map((item) => <Link key={item.href} to={item.href} className="group bg-background p-6">
              <strong className="font-display text-2xl leading-tight group-hover:text-primary">{item.label}</strong>
              <span className="mt-3 block text-sm leading-6 text-muted-foreground">{item.description}</span>
              <span className="mt-5 block text-sm font-semibold text-primary">Read next →</span>
            </Link>)}
          </div>
        </section>
      </article>
    </Container>
  </>;
}
