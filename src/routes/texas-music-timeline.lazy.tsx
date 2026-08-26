import { Link, createLazyFileRoute } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";

export const Route = createLazyFileRoute("/texas-music-timeline")({ component: TexasMusicTimelinePage });

const siteUrl = "https://texasdefined.com";

const eras = [
  {
    era: "Before commercial recording",
    title: "Texas music begins as community practice",
    body: [
      "Texas music did not begin with a record label or a single genre. Indigenous traditions, Mexican and Tejano communities, African American sacred and secular music, Anglo-American fiddle traditions, and German and Czech immigrant dance culture all existed in the region before commercial recording made particular performers famous.",
      "The most important early infrastructure was social: churches, family gatherings, ranches, town celebrations, saloons and community dance halls. Instruments and dance forms moved with people across borders and between communities, which is why later Texas genres are better understood as mixtures than as isolated inventions."
    ],
    links: [
      { href: "/texas-conjunto-tejano", label: "Conjunto & Tejano" },
      { href: "/texas-dance-halls-honky-tonks", label: "Dance halls & honky-tonks" },
      { href: "/gruene-hall-history", label: "Gruene Hall history" }
    ]
  },
  {
    era: "1920s",
    title: "Records and radio turn local traditions into named scenes",
    body: [
      "Commercial recording and radio changed the scale of Texas music. Blind Lemon Jefferson's recordings helped make a Texas blues voice nationally influential, while record companies and broadcasters documented Mexican American musicians, string bands, gospel singers and early country performers who previously depended much more heavily on local audiences.",
      "This decade matters because technology began separating a performance from the room where it happened. A Dallas street musician, a border accordionist or a rural singer could now influence listeners far beyond the place that produced the sound."
    ],
    links: [
      { href: "/texas-blues", label: "Texas Blues" },
      { href: "/texas-conjunto-tejano", label: "Conjunto & Tejano" }
    ]
  },
  {
    era: "1930s–1940s",
    title: "Western swing and conjunto define two durable Texas dance sounds",
    body: [
      "In North and Central Texas, Milton Brown, Bob Wills and other musicians combined fiddle music with blues, jazz, popular dance-band arrangements and other influences to develop western swing. The style was built for dancers and expanded the country string-band format with amplified instruments, drums, horns and steel guitar.",
      "In South Texas and the borderlands, Narciso Martínez and other musicians helped establish the accordion-and-bajo-sexto conjunto sound. Both traditions show how Texas music grows through dance floors, migration and musical borrowing: one became a defining branch of country music, while the other became foundational to later Tejano."
    ],
    links: [
      { href: "/texas-western-swing", label: "Western Swing" },
      { href: "/texas-conjunto-tejano", label: "Conjunto & Tejano" }
    ]
  },
  {
    era: "1940s–1950s",
    title: "Electric blues, R&B, honky-tonk and rock-and-roll accelerate",
    body: [
      "Texas musicians helped move blues into an amplified urban era. T-Bone Walker's electric-guitar approach became highly influential, Houston developed important blues and R&B networks, and gospel institutions fed directly into secular popular music. At the same time, country honky-tonk culture expanded through radio, touring and dance venues.",
      "Rock-and-roll then gave Texas another national breakthrough. Buddy Holly's Lubbock career demonstrated how country, rhythm and blues and pop songwriting could combine in a small-group rock format, while Roy Orbison and other Texans helped widen the state's role in the new national music."
    ],
    links: [
      { href: "/texas-blues", label: "Texas Blues" },
      { href: "/texas-rock-rockabilly", label: "Rock & Rockabilly" },
      { href: "/texas-gospel-rnb-pop", label: "Gospel, R&B & Pop" }
    ]
  },
  {
    era: "1960s",
    title: "Texas feeds folk, soul, psychedelic rock and a changing country audience",
    body: [
      "The 1960s made the state's musical diversity harder to place inside neat genre borders. Janis Joplin carried Port Arthur and Texas blues influences into psychedelic rock, Austin developed a countercultural rock scene, and Houston, Dallas and other cities continued to support blues, soul, gospel, jazz and country networks.",
      "This period also set up the Austin transformation of the next decade. Musicians and audiences were learning to share rooms across categories that the commercial industry often kept separate, creating the conditions for country, rock, folk and blues to overlap more visibly."
    ],
    links: [
      { href: "/texas-rock-rockabilly", label: "Rock & Rockabilly" },
      { href: "/texas-jazz", label: "Texas Jazz" },
      { href: "/texas-gospel-rnb-pop", label: "Gospel, R&B & Pop" }
    ]
  },
  {
    era: "1970s",
    title: "Austin's progressive-country era and new institutions reshape the story",
    body: [
      "Willie Nelson's return to Texas became part of a larger Austin movement in which country musicians, songwriters, rock audiences and older Texas traditions mixed more freely than Nashville convention usually allowed. The Armadillo World Headquarters, clubs, dance halls and the launch of Austin City Limits helped turn that local scene into a national image of Texas music.",
      "The decade was not only an Austin country story. Blues institutions such as Antone's strengthened direct connections between touring masters and younger Texas players, while Tejano, conjunto, soul, jazz and other regional traditions continued developing their own audiences and infrastructure."
    ],
    links: [
      { href: "/texas-country-outlaw", label: "Country & Outlaw Country" },
      { href: "/antones-austin-history", label: "Antone's history" },
      { href: "/broken-spoke-austin-history", label: "Broken Spoke history" }
    ]
  },
  {
    era: "1980s–1990s",
    title: "Texas produces parallel national breakthroughs",
    body: [
      "The late twentieth century shows why Texas music cannot be reduced to country. George Strait helped carry traditional country into a new commercial era; Stevie Ray Vaughan brought Texas blues guitar back to enormous audiences; Selena became the defining star of Tejano's national breakthrough; and Houston rap developed an independent infrastructure around artists, labels, mixtapes and local production styles.",
      "The Geto Boys and later DJ Screw made Houston essential to the history of Southern hip-hop, while Dallas, Fort Worth, San Antonio and other cities sustained their own scenes. By the end of the 1990s, the Houston group Destiny's Child was beginning the path that would connect Texas music to twenty-first-century global pop through Beyoncé and her collaborators."
    ],
    links: [
      { href: "/texas-country-outlaw", label: "Texas Country" },
      { href: "/texas-conjunto-tejano", label: "Tejano" },
      { href: "/texas-hip-hop", label: "Texas Hip-Hop" },
      { href: "/texas-gospel-rnb-pop", label: "Gospel, R&B & Pop" }
    ]
  },
  {
    era: "2000s–today",
    title: "Texas music becomes globally visible without losing its regional roots",
    body: [
      "Twenty-first-century Texas artists operate inside global streaming and touring systems, but regional identity remains unusually visible. Houston rap continues to influence national production and vocabulary; Texas country and singer-songwriter circuits remain durable; Tejano and conjunto histories continue through festivals and community institutions; and artists such as Beyoncé, Leon Bridges and many others carry local musical lineages into contemporary pop, R&B and soul.",
      "The useful way to read the present is as another layer rather than an endpoint. New music keeps drawing on the same forces visible earlier in the timeline—migration, churches, dance floors, radio, recording studios, clubs, independent business networks and the constant movement of sounds between Texas communities."
    ],
    links: [
      { href: "/texas-hip-hop", label: "Texas Hip-Hop" },
      { href: "/texas-gospel-rnb-pop", label: "Gospel, R&B & Pop" },
      { href: "/texas-music-venues", label: "Landmark Music Venues" }
    ]
  }
] as const;

const sources = [
  {
    label: "Handbook of Texas Music",
    href: "https://www.tshaonline.org/handbook/projects/texas-music",
    note: "Statewide TSHA collection covering Texas genres, musicians, institutions, venues and recording history."
  },
  {
    label: "Music — Handbook of Texas",
    href: "https://www.tshaonline.org/handbook/entries/music",
    note: "Broad historical overview of musical traditions and institutions across Texas."
  },
  {
    label: "Texas-Mexican Conjunto — Handbook of Texas",
    href: "https://www.tshaonline.org/handbook/entries/texas-mexican-conjunto",
    note: "Authority source for the development of conjunto and its accordion-and-bajo-sexto tradition."
  },
  {
    label: "Center for Texas Music History",
    href: "https://www.txst.edu/ctmh/",
    note: "Texas State University research center devoted to the preservation and study of Texas and Southwestern music history."
  }
] as const;

function TexasMusicTimelinePage() {
  const canonicalUrl = `${siteUrl}/texas-music-timeline`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#collection`,
        name: "Texas Music Timeline",
        url: canonicalUrl,
        description: "A chronological guide to the roots, genres, scenes and turning points of Texas music history.",
        isPartOf: { "@id": `${siteUrl}/texas-music#collection` },
        mainEntity: { "@id": `${canonicalUrl}#timeline` }
      },
      {
        "@type": "ItemList",
        "@id": `${canonicalUrl}#timeline`,
        numberOfItems: eras.length,
        itemListElement: eras.map((era, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `${era.era}: ${era.title}`
        }))
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Front page", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Texas Music", item: `${siteUrl}/texas-music` },
          { "@type": "ListItem", position: 3, name: "Texas Music Timeline", item: canonicalUrl }
        ]
      }
    ]
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
          <span aria-current="page" className="text-foreground">Timeline</span>
        </nav>

        <header className="border-b border-border py-10 sm:py-14">
          <p className="eyebrow text-primary">Roots, scenes and turning points</p>
          <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">Texas Music Timeline</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">Texas music is not one sound. Follow the chronology from community dance traditions and early recordings through blues, conjunto, western swing, rock, country, Tejano, jazz, hip-hop, R&B and global pop.</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
            <Link to="/texas-music" className="border-b border-primary pb-1 text-primary">Texas Music authority hub →</Link>
            <Link to="/texas-music-venues" className="border-b border-primary pb-1 text-primary">Landmark music venues →</Link>
          </div>
        </header>

        <section className="border-b border-border py-8" aria-labelledby="timeline-reading-note">
          <p className="eyebrow text-primary">How to read the timeline</p>
          <h2 id="timeline-reading-note" className="mt-2 font-display text-3xl">Movements overlap; they do not replace one another</h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-muted-foreground">Dates here mark periods when a sound, technology or institution became especially consequential. Older traditions continue after a new era begins, and the strongest Texas music stories usually come from overlap among communities rather than a clean sequence of isolated genres.</p>
        </section>

        <div>
          {eras.map((era, index) => <section key={era.era} className="grid gap-6 border-b border-border py-10 lg:grid-cols-[12rem_minmax(0,1fr)]">
            <div>
              <p className="eyebrow text-primary">{String(index + 1).padStart(2, "0")}</p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">{era.era}</p>
            </div>
            <div className="max-w-3xl">
              <h2 className="font-display text-3xl leading-tight sm:text-4xl">{era.title}</h2>
              <div className="mt-5 space-y-5">
                {era.body.map((paragraph) => <p key={paragraph} className="text-base leading-8 text-muted-foreground">{paragraph}</p>)}
              </div>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
                {era.links.map((link) => <Link key={link.href} to={link.href} className="border-b border-primary text-primary">{link.label}</Link>)}
              </div>
            </div>
          </section>)}
        </div>

        <section className="border-b border-border py-10" aria-labelledby="timeline-sources">
          <p className="eyebrow text-primary">Source notes</p>
          <h2 id="timeline-sources" className="mt-2 font-display text-3xl">Historical authority</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">The timeline synthesizes the deeper TexasDefined genre and venue guides. Those guides carry more granular artist and scene sourcing; these statewide institutional references anchor the chronology.</p>
          <ul className="mt-6 divide-y divide-border border-y border-border">
            {sources.map((source) => <li key={source.href} className="py-4">
              <a href={source.href} target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4">{source.label} ↗</a>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{source.note}</p>
            </li>)}
          </ul>
        </section>

        <section className="py-12">
          <p className="eyebrow text-primary">Go deeper</p>
          <h2 className="mt-2 font-display text-4xl">Continue through the Texas Music collection</h2>
          <div className="mt-6 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
            {[
              { href: "/texas-music", label: "Texas Music", description: "Browse all eight genre traditions and the larger authority collection." },
              { href: "/texas-music-venues", label: "Music Venues", description: "See the rooms and dance floors that turned musical movements into lived culture." },
              { href: "/texas-history", label: "Texas History", description: "Place music inside the larger history of migration, cities, industry and cultural change." }
            ].map((item) => <Link key={item.href} to={item.href} className="group bg-background p-6">
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
