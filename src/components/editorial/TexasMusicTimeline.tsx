import { Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import {
  TEXAS_MUSIC_TIMELINE_DESCRIPTION,
  TEXAS_MUSIC_TIMELINE_ERAS,
  TEXAS_MUSIC_TIMELINE_SOURCES,
} from "@/data/texas-music-timeline";

const siteUrl = "https://texasdefined.com";
const canonicalUrl = `${siteUrl}/texas-music-timeline`;

export function TexasMusicTimeline() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${canonicalUrl}#article`,
        headline: "Texas Music Timeline: The Roots and Evolution of Texas Music",
        description: TEXAS_MUSIC_TIMELINE_DESCRIPTION,
        url: canonicalUrl,
        articleSection: "Texas Music",
        publisher: { "@type": "Organization", name: "TexasDefined", url: siteUrl },
        isPartOf: {
          "@type": "CollectionPage",
          "@id": `${siteUrl}/texas-music#collection`,
          name: "Texas Music",
          url: `${siteUrl}/texas-music`,
        },
        citation: TEXAS_MUSIC_TIMELINE_SOURCES.map((source) => source.url),
        mainEntityOfPage: { "@id": `${canonicalUrl}#page` },
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#page`,
        url: canonicalUrl,
        name: "Texas Music Timeline",
        description: TEXAS_MUSIC_TIMELINE_DESCRIPTION,
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
      {
        "@type": "ItemList",
        "@id": `${canonicalUrl}#timeline`,
        name: "Texas Music Timeline",
        numberOfItems: TEXAS_MUSIC_TIMELINE_ERAS.length,
        itemListElement: TEXAS_MUSIC_TIMELINE_ERAS.map((era, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `${era.period}: ${era.title}`,
          description: era.summary,
        })),
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
            <p className="eyebrow text-primary">Texas Music · History & roots</p>
            <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">
              Texas Music Timeline
            </h1>
            <p className="mt-5 max-w-4xl font-display text-2xl leading-tight sm:text-3xl">
              How migration, community, technology and cultural exchange built the sounds of Texas.
            </p>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
              {TEXAS_MUSIC_TIMELINE_DESCRIPTION}
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
              <Link to="/texas-music" className="border-b border-primary pb-1 text-primary">Explore Texas Music →</Link>
              <Link to="/texas-music-cities" className="border-b border-primary pb-1 text-primary">Explore Texas music cities →</Link>
              <Link to="/texas-music-venues" className="border-b border-primary pb-1 text-primary">Explore landmark venues →</Link>
            </div>
          </header>

          <section className="border-b border-border py-8" aria-labelledby="timeline-quick-answer">
            <p className="eyebrow text-primary">Quick answer</p>
            <h2 id="timeline-quick-answer" className="mt-2 font-display text-3xl">Texas music is a history of crossings</h2>
            <p className="mt-4 max-w-4xl text-base leading-8 text-muted-foreground">
              The state's musical history is not a straight line from one genre to the next. Indigenous traditions, Spanish and Mexican music, African American sacred and secular music, European immigrant dance traditions and Anglo-American folk forms overlapped for generations. Recording, radio, highways, clubs, studios and independent labels then helped those local traditions travel. The timeline below follows those intersections rather than pretending there is one single “Texas sound.”
            </p>
          </section>

          <div aria-label="Texas music chronology">
            {TEXAS_MUSIC_TIMELINE_ERAS.map((era, index) => (
              <section key={era.period} className="grid gap-6 border-b border-border py-10 lg:grid-cols-[12rem_minmax(0,1fr)]">
                <div>
                  <p className="eyebrow text-primary">{String(index + 1).padStart(2, "0")}</p>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">{era.period}</p>
                </div>
                <div className="max-w-3xl">
                  <h2 className="font-display text-3xl leading-tight sm:text-4xl">{era.title}</h2>
                  <p className="mt-4 text-base leading-8">{era.summary}</p>
                  <div className="mt-5 space-y-4 text-base leading-8 text-muted-foreground">
                    {era.details.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
                    {era.links.map((link) => (
                      <Link key={link.href} to={link.href} className="border-b border-primary text-primary">
                        {link.label} →
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </div>

          <section className="border-b border-border py-10" aria-labelledby="timeline-sources">
            <p className="eyebrow text-primary">Sources & verification</p>
            <h2 id="timeline-sources" className="mt-2 font-display text-3xl">How this chronology is grounded</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
              This page is a synthesis, not a claim that Texas music developed in neat, isolated eras. The chronology is anchored to statewide historical overviews and scholarship that emphasize migration, cultural diversity and genre cross-pollination. Individual genre, city and venue guides provide narrower source trails for the people and scenes linked above.
            </p>
            <ul className="mt-6 divide-y divide-border border-y border-border">
              {TEXAS_MUSIC_TIMELINE_SOURCES.map((source) => (
                <li key={source.url} className="py-4">
                  <a href={source.url} target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4">
                    {source.label} ↗
                  </a>
                  <p className="mt-1 text-xs uppercase tracking-[0.1em] text-muted-foreground">{source.publisher}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{source.note}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="py-12" aria-labelledby="timeline-next">
            <p className="eyebrow text-primary">Keep exploring</p>
            <h2 id="timeline-next" className="mt-2 font-display text-4xl">Follow the timeline into the deeper guides</h2>
            <div className="mt-6 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
              {[
                ["Texas Blues", "/texas-blues", "From early country blues to Houston electric blues and Austin blues-rock."],
                ["Conjunto & Tejano", "/texas-conjunto-tejano", "The borderlands story of accordion, bajo sexto and South Texas musical identity."],
                ["Western Swing", "/texas-western-swing", "How Texas dance music blended country, blues, jazz and pop."],
                ["Country & Outlaw", "/texas-country-outlaw", "Dance halls, songwriters and Austin's progressive-country movement."],
                ["Rock & Rockabilly", "/texas-rock-rockabilly", "Lubbock, Port Arthur and the Texas roots of rock-and-roll."],
                ["Texas Hip-Hop", "/texas-hip-hop", "Houston, Port Arthur, independent networks and the sound of the Gulf Coast."],
              ].map(([label, href, description]) => (
                <Link key={href} to={href} className="group bg-background p-6">
                  <strong className="font-display text-2xl leading-tight group-hover:text-primary">{label}</strong>
                  <span className="mt-3 block text-sm leading-6 text-muted-foreground">{description}</span>
                  <span className="mt-5 block text-sm font-semibold text-primary">Read next →</span>
                </Link>
              ))}
            </div>
          </section>
        </article>
      </Container>
    </>
  );
}
