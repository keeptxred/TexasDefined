import { Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import type { TexasEvergreenGuide } from "@/data/texas-evergreen-guides";
import { HISTORIC_TEXAS_MUSIC_VENUES } from "@/data/texas-music-historic-venues";

const siteUrl = "https://texasdefined.com";

type SourceNote = { label: string; href: string; note: string };

const venueSources: Record<string, readonly SourceNote[]> = {
  "texas-music-venues": [
    {
      label: "Handbook of Texas Music — Venues",
      href: "https://www.tshaonline.org/handbook/projects/texas-music/category/music/category/venues",
      note: "Provides the statewide Texas music venue collection, including dance halls, clubs, ballrooms and other rooms that shaped regional scenes.",
    },
    {
      label: "Handbook of Texas — German Music",
      href: "https://www.tshaonline.org/handbook/entries/german-music",
      note: "Documents the role of German-Texan dance halls in preserving social music and dance traditions across Central Texas.",
    },
  ],
  "gruene-hall-history": [
    {
      label: "Handbook of Texas — Gruene Hall",
      href: "https://www.tshaonline.org/handbook/entries/gruene-hall",
      note: "Documents Henry D. Gruene's 1878 hall, its community uses, preservation history and later importance as a Texas music landmark.",
    },
    {
      label: "Gruene Hall — Official site",
      href: "https://gruenehall.com/",
      note: "Confirms the 1878 building, surviving 6,000-square-foot layout and current operation; use the official calendar for changing visitor details.",
    },
  ],
  "broken-spoke-austin-history": [
    {
      label: "Handbook of Texas — Broken Spoke",
      href: "https://www.tshaonline.org/handbook/entries/broken-spoke",
      note: "Documents the 1964 opening, expansion into a dance hall and connections to traditional country, Western swing and Austin's outlaw era.",
    },
    {
      label: "Broken Spoke — Texas historical marker",
      href: "https://www.brokenspokeaustintx.net/team-4",
      note: "The venue's official marker page documents the 2023 Texas historical marker dedication and preserves its current address and operating identity.",
    },
    {
      label: "Broken Spoke — Official dance lessons",
      href: "https://www.brokenspokeaustintx.net/dance-lessons",
      note: "Confirms that Texas two-step instruction remains part of the venue's current programming; schedules should be checked directly before visiting.",
    },
  ],
  "continental-club-austin-history": [
    {
      label: "Continental Club — Official history",
      href: "https://continentalclub.com/about/",
      note: "Documents the 1955 supper-club opening, later burlesque and bar phases, live-music eras and 1987 restoration toward the original mid-century appearance.",
    },
    {
      label: "City of Austin — Historic Landmark Ordinance 20080821-059",
      href: "https://services.austintexas.gov/edims/document.cfm?id=120731",
      note: "Official city ordinance designating the Continental Club property at 1315 South Congress Avenue as a historic landmark in 2008.",
    },
  ],
  "antones-austin-history": [
    {
      label: "Handbook of Texas — Antone's",
      href: "https://www.tshaonline.org/handbook/entries/antones",
      note: "Documents Clifford Antone's July 15, 1975 opening, the club's blues mission, major performers and role in Austin's live-music identity.",
    },
    {
      label: "Antone's — Official history",
      href: "https://antonesnightclub.com/history/",
      note: "Provides the venue's detailed timeline, including its Sixth Street opening, major moves and relationships with touring blues masters and younger Austin musicians.",
    },
    {
      label: "Antone's — Official location",
      href: "https://antonesnightclub.com/about/location-directions-parking/",
      note: "Confirms the current downtown location at 305 East Fifth Street; current access, parking and event details should be checked here before a visit.",
    },
  ],
  "billy-bobs-texas-history": [
    {
      label: "Billy Bob's Texas — Official history",
      href: "https://www.billybobstexas.com/about-us/history",
      note: "Documents the building's 1910 livestock-barn origin, 1936 enclosure, later uses and Billy Bob's April 1, 1981 opening as a 100,000-square-foot entertainment venue.",
    },
    {
      label: "Fort Worth Stockyards — Billy Bob's Texas",
      href: "https://www.fortworthstockyards.org/business/billy-bobs-texas",
      note: "Places the venue within the Stockyards district and documents its music, dance-floor and indoor bull-riding identity for visitors.",
    },
  ],
};

export function TexasMusicVenueGuide({ guide }: { guide: TexasEvergreenGuide }) {
  const canonicalUrl = `${siteUrl}/${guide.slug}`;
  const sources = venueSources[guide.slug] ?? [];
  const isHub = guide.slug === "texas-music-venues";
  const historicVenues = isHub ? HISTORIC_TEXAS_MUSIC_VENUES : [];
  const breadcrumbItems = [
    { "@type": "ListItem", position: 1, name: "Front page", item: `${siteUrl}/` },
    { "@type": "ListItem", position: 2, name: "Texas Music", item: `${siteUrl}/texas-music` },
    ...(isHub ? [] : [{ "@type": "ListItem", position: 3, name: "Texas Music Venues", item: `${siteUrl}/texas-music-venues` }]),
    { "@type": "ListItem", position: isHub ? 3 : 4, name: guide.title, item: canonicalUrl },
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
        citation: [
          ...sources.map((source) => source.href),
          ...historicVenues.flatMap((venue) => venue.sources.map((source) => source.href)),
        ],
        isPartOf: { "@type": "CollectionPage", "@id": `${siteUrl}/texas-music#collection`, name: "Texas Music", url: `${siteUrl}/texas-music` },
        about: [
          ...guide.sections.map((section) => ({ "@type": "Thing", name: section.heading })),
          ...historicVenues.map((venue) => ({ "@type": "Place", name: venue.name, address: venue.place })),
        ],
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
          {!isHub ? <>
            <span aria-hidden="true" className="mx-2">/</span>
            <Link to="/texas-music-venues" className="hover:text-foreground">Music Venues</Link>
          </> : null}
          <span aria-hidden="true" className="mx-2">/</span>
          <span aria-current="page" className="text-foreground">{isHub ? "Music Venues" : guide.title}</span>
        </nav>

        <header className="border-b border-border py-10 sm:py-14">
          <p className="eyebrow text-primary">{guide.eyebrow}</p>
          <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">{guide.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">{guide.dek}</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
            <Link to="/texas-music" className="border-b border-primary pb-1 text-primary">Explore the full Texas Music collection →</Link>
            {!isHub ? <Link to="/texas-music-venues" className="border-b border-primary pb-1 text-primary">Browse landmark Texas music venues →</Link> : null}
          </div>
        </header>

        <section className="border-b border-border py-8" aria-labelledby="quick-answer">
          <p className="eyebrow text-primary">Quick answer</p>
          <h2 id="quick-answer" className="mt-2 font-display text-3xl">The short version</h2>
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

        {historicVenues.length ? <section className="border-b border-border py-12" aria-labelledby="historic-rooms">
          <p className="eyebrow text-primary">Historic and lost rooms</p>
          <h2 id="historic-rooms" className="mt-2 max-w-3xl font-display text-4xl">The second layer of Texas venue history</h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">The best-known surviving halls are only part of the story. These rooms explain how Black touring circuits, progressive country, Gulf Coast honky-tonks and cross-genre Dallas stages built scenes that later became part of the Texas music canon.</p>
          <div className="mt-8 grid gap-px overflow-hidden border border-border bg-border lg:grid-cols-2">
            {historicVenues.map((venue) => <section key={venue.slug} className="bg-background p-6 sm:p-8">
              <p className="eyebrow text-primary">{venue.place} · {venue.era}</p>
              <h3 className="mt-2 font-display text-3xl leading-tight">{venue.name}</h3>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{venue.status}</p>
              <p className="mt-5 text-base font-medium leading-7">{venue.significance}</p>
              <div className="mt-5 space-y-4">
                {venue.story.map((paragraph) => <p key={paragraph} className="text-sm leading-7 text-muted-foreground">{paragraph}</p>)}
              </div>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold">
                {venue.related.map((item) => <Link key={item.href} to={item.href} className="border-b border-primary text-primary">{item.label}</Link>)}
              </div>
              <div className="mt-6 border-t border-border pt-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Authority sources</p>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs">
                  {venue.sources.map((source) => <a key={source.href} href={source.href} target="_blank" rel="noreferrer noopener" className="text-primary underline decoration-primary/40 underline-offset-4">{source.label} ↗</a>)}
                </div>
              </div>
            </section>)}
          </div>
        </section> : null}

        <section className="border-b border-border py-10" aria-labelledby="venue-source-notes">
          <p className="eyebrow text-primary">Source notes</p>
          <h2 id="venue-source-notes" className="mt-2 font-display text-3xl">Historical authority and current venue sources</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Historical claims are anchored to institutional records and venue histories. Current schedules, hours, ticket rules, access policies and event details can change; the official venue should control those time-sensitive facts.</p>
          <ul className="mt-6 divide-y divide-border border-y border-border">
            {sources.map((source) => <li key={source.href} className="py-4">
              <a href={source.href} target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4">{source.label} ↗</a>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{source.note}</p>
            </li>)}
          </ul>
        </section>

        <section className="py-12" aria-labelledby="related-reading">
          <p className="eyebrow text-primary">Keep exploring</p>
          <h2 id="related-reading" className="mt-2 font-display text-4xl">Related TexasDefined guides</h2>
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
