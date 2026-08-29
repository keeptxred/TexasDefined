import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";

const siteUrl = "https://texasdefined.com";
const canonicalUrl = `${siteUrl}/corpus-christi-music-history`;

const sources = [
  {
    label: "Handbook of Texas — Selena Quintanilla Perez",
    href: "https://www.tshaonline.org/handbook/entries/quintanilla-perez-selena-selena",
    note: "Documents the Quintanilla family's 1982 move to Corpus Christi, Selena y Los Dinos' South Texas performance circuit and Selena's rise through Tejano music.",
  },
  {
    label: "Handbook of Texas — Recording Industry",
    href: "https://www.tshaonline.org/handbook/entries/recording-industry",
    note: "Documents Corpus Christi's Freddie Records and Hacienda Records, including the city's South Texas recording-studio infrastructure.",
  },
  {
    label: "Handbook of Texas — Johnny Herrera",
    href: "https://www.tshaonline.org/handbook/entries/herrera-juan-william-johnny",
    note: "Documents Herrera's House of Music, the Spanish-language Corpus Christi record store that became a gathering place for established and aspiring musicians.",
  },
  {
    label: "Handbook of Texas Music — Conjunto, Tejano and Border Music",
    href: "https://www.tshaonline.org/handbook/projects/texas-music/category/music/category/genres-conjunto-tejano-and-border",
    note: "Places Corpus Christi inside the larger South Texas and borderland network from which conjunto and Tejano developed.",
  },
] as const;

export const Route = createLazyFileRoute("/corpus-christi-music-history")({ component: CorpusChristiMusicHistoryPage });

function CorpusChristiMusicHistoryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${canonicalUrl}#article`,
        headline: "Corpus Christi Music History: Tejano Records, Selena & the Coastal Bend",
        description:
          "How Corpus Christi became a South Texas music center through record stores, Tejano labels and studios, regional dance circuits, and Selena y Los Dinos.",
        url: canonicalUrl,
        mainEntityOfPage: { "@id": `${canonicalUrl}#page` },
        publisher: { "@type": "Organization", name: "TexasDefined", url: siteUrl },
        articleSection: "Texas Music",
        citation: sources.map((source) => source.href),
        isPartOf: { "@type": "CollectionPage", "@id": `${siteUrl}/texas-music#collection`, name: "Texas Music", url: `${siteUrl}/texas-music` },
        about: [
          { "@type": "Place", name: "Corpus Christi, Texas" },
          { "@type": "Thing", name: "Tejano music" },
          { "@type": "Person", name: "Selena Quintanilla Perez" },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#page`,
        url: canonicalUrl,
        name: "Corpus Christi Music History",
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
          { "@type": "ListItem", position: 3, name: "Texas Music Cities", item: `${siteUrl}/texas-music-cities` },
          { "@type": "ListItem", position: 4, name: "Corpus Christi", item: canonicalUrl },
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
            <Link to="/" className="hover:text-foreground">Front page</Link><span aria-hidden="true" className="mx-2">/</span>
            <Link to="/texas-music" className="hover:text-foreground">Texas Music</Link><span aria-hidden="true" className="mx-2">/</span>
            <Link to="/texas-music-cities" className="hover:text-foreground">Music Cities</Link><span aria-hidden="true" className="mx-2">/</span>
            <span aria-current="page" className="text-foreground">Corpus Christi</span>
          </nav>

          <header className="border-b border-border py-10 sm:py-14">
            <p className="eyebrow text-primary">Coastal Bend · Tejano infrastructure and crossover</p>
            <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">Corpus Christi Music History</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
              Corpus Christi's place in Texas music is bigger than a single famous biography. Record stores, Tejano labels, studios, dance circuits and a dense South Texas audience network made the Coastal Bend a place where regional music could be recorded, distributed and carried to much larger audiences.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
              <Link to="/texas-conjunto-tejano" className="border-b border-primary pb-1 text-primary">Texas conjunto & Tejano →</Link>
              <Link to="/texas-music-timeline" className="border-b border-primary pb-1 text-primary">Texas Music timeline →</Link>
            </div>
          </header>

          <section className="border-b border-border py-8" aria-labelledby="corpus-quick-answer">
            <p className="eyebrow text-primary">Quick answer</p>
            <h2 id="corpus-quick-answer" className="mt-2 font-display text-3xl">Why Corpus Christi matters to Texas music</h2>
            <p className="mt-4 max-w-4xl text-base leading-8">
              Corpus Christi became an important South Texas music center because it supplied infrastructure as well as performers. Johnny Herrera's House of Music connected Spanish-language records, musicians and audiences beginning in the early 1960s; Freddie Records and Hacienda Records helped make the city a Tejano and conjunto recording center; and after the Quintanilla family moved to Corpus Christi in 1982, Selena y Los Dinos built their career through the same regional network of dance halls, nightclubs, labels and listeners. The city's story shows how a local ecosystem can turn borderland traditions into music heard far beyond South Texas.
            </p>
          </section>

          <section className="grid gap-6 border-b border-border py-10 lg:grid-cols-[12rem_minmax(0,1fr)]">
            <div><p className="eyebrow text-primary">01</p><h2 className="mt-2 font-display text-3xl leading-tight">A Coastal Bend city inside a larger border-music network</h2></div>
            <div className="max-w-3xl space-y-5">
              <p className="text-base leading-8 text-muted-foreground">Corpus Christi sits between San Antonio and the Rio Grande Valley in a South Texas corridor where Mexican, Mexican American and Anglo dance traditions circulated for generations. Conjunto and later Tejano did not belong to one city; musicians, records and audiences moved among towns, dance halls, radio markets and family networks across the region.</p>
              <p className="text-base leading-8 text-muted-foreground">Corpus Christi's distinctive role was increasingly infrastructural. Its size, Gulf Coast location and Spanish-language audience helped support businesses that could sell records, record bands and distribute regional music while remaining close to the communities that made the music.</p>
              <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold"><Link to="/texas-conjunto-tejano" className="border-b border-primary text-primary">Read the statewide conjunto and Tejano guide</Link><Link to="/san-antonio-music-history" className="border-b border-primary text-primary">Compare San Antonio's music history</Link></div>
            </div>
          </section>

          <section className="grid gap-6 border-b border-border py-10 lg:grid-cols-[12rem_minmax(0,1fr)]">
            <div><p className="eyebrow text-primary">02</p><h2 className="mt-2 font-display text-3xl leading-tight">House of Music made a record store part of the scene</h2></div>
            <div className="max-w-3xl space-y-5">
              <p className="text-base leading-8 text-muted-foreground">In 1961, musician and businessman Johnny Herrera opened House of Music in Corpus Christi. The Spanish-language record store became more than a retail counter: the Handbook of Texas describes it as a gathering place where internationally known performers and aspiring local musicians crossed paths.</p>
              <p className="text-base leading-8 text-muted-foreground">That kind of institution matters because scenes need places where music can be heard, discussed and exchanged between performances. Herrera's store connected listeners to recordings while giving musicians a social node in the city. Among the people associated with the store were Freddy Martinez and Abraham Quintanilla, long before Corpus Christi became nationally synonymous with Selena.</p>
            </div>
          </section>

          <section className="grid gap-6 border-b border-border py-10 lg:grid-cols-[12rem_minmax(0,1fr)]">
            <div><p className="eyebrow text-primary">03</p><h2 className="mt-2 font-display text-3xl leading-tight">Freddie and Hacienda turned Corpus into a recording center</h2></div>
            <div className="max-w-3xl space-y-5">
              <p className="text-base leading-8 text-muted-foreground">Corpus Christi also developed the production side of a music economy. Freddy Martinez Sr. founded Freddie Records in the city, releasing his own work and recordings by other major conjunto and Tejano performers. The label's story links Corpus Christi to musicians including Tony de la Rosa, Ramón Ayala, Little Joe y La Familia and Jaime de Anda y Los Chamacos.</p>
              <p className="text-base leading-8 text-muted-foreground">Hacienda Records added another layer. The Handbook of Texas recording-industry history identifies the Corpus Christi company as an important recorder of Tejano and conjunto artists and notes that it built the first twenty-four-track recording studio in South Texas in the late 1970s. Together, the labels demonstrate that Corpus Christi was not simply consuming regional music; it had the technical and business capacity to produce and circulate it.</p>
            </div>
          </section>

          <section className="grid gap-6 border-b border-border py-10 lg:grid-cols-[12rem_minmax(0,1fr)]">
            <div><p className="eyebrow text-primary">04</p><h2 className="mt-2 font-display text-3xl leading-tight">Selena's Corpus Christi story grew from that ecosystem</h2></div>
            <div className="max-w-3xl space-y-5">
              <p className="text-base leading-8 text-muted-foreground">The Quintanilla family moved to Corpus Christi in 1982. From there, Selena y Los Dinos worked the regional performance circuit, playing the rural dance halls and urban nightclubs where Tejano audiences were already established. Those years matter because the band's later national success was built through repeated contact with a South Texas audience rather than appearing fully formed after a major-label contract.</p>
              <p className="text-base leading-8 text-muted-foreground">Selena signed with EMI Latin in 1989 and eventually became the most internationally visible artist associated with modern Tejano. Corpus Christi therefore belongs in her story not simply as a hometown marker but as the operating base from which a family band learned the circuit, recorded music and built the audience that made wider crossover possible.</p>
            </div>
          </section>

          <section className="grid gap-6 border-b border-border py-10 lg:grid-cols-[12rem_minmax(0,1fr)]">
            <div><p className="eyebrow text-primary">05</p><h2 className="mt-2 font-display text-3xl leading-tight">Corpus and San Antonio played different roles in the Tejano story</h2></div>
            <div className="max-w-3xl space-y-5">
              <p className="text-base leading-8 text-muted-foreground">San Antonio is indispensable to the history of conjunto, Tejano and the West Side Sound, especially as a place where border, R&B, rock and country traditions overlapped. Corpus Christi adds a different kind of authority: record retail, independent labels, studio capacity and a Coastal Bend base close to the dance circuits of South Texas and the Rio Grande Valley.</p>
              <p className="text-base leading-8 text-muted-foreground">Reading the two cities together prevents the statewide story from collapsing into a single birthplace claim. Texas music grew through connected regional systems, and Corpus Christi's importance comes from how effectively it linked artists, businesses, recordings and audiences across that system.</p>
              <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold"><Link to="/texas-music-cities" className="border-b border-primary text-primary">Compare Texas music cities</Link><Link to="/texas-music" className="border-b border-primary text-primary">Return to the Texas Music hub</Link></div>
            </div>
          </section>

          <section className="border-b border-border py-10" aria-labelledby="corpus-sources">
            <p className="eyebrow text-primary">Source notes</p>
            <h2 id="corpus-sources" className="mt-2 font-display text-3xl">Historical authority behind this guide</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">This page focuses on durable history and relies primarily on the Texas State Historical Association's Handbook of Texas and Handbook of Texas Music. It does not hardcode changing museum, venue, ticket or visitor information.</p>
            <ul className="mt-6 divide-y divide-border border-y border-border">
              {sources.map((source) => <li key={source.href} className="py-4"><a href={source.href} target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4">{source.label} ↗</a><p className="mt-1 text-sm leading-6 text-muted-foreground">{source.note}</p></li>)}
            </ul>
          </section>

          <section className="py-12" aria-labelledby="corpus-related">
            <p className="eyebrow text-primary">Keep exploring</p>
            <h2 id="corpus-related" className="mt-2 font-display text-4xl">Related TexasDefined guides</h2>
            <div className="mt-6 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
              <Link to="/texas-conjunto-tejano" className="group bg-background p-6"><strong className="font-display text-2xl group-hover:text-primary">Conjunto & Tejano</strong><span className="mt-3 block text-sm leading-6 text-muted-foreground">Trace the borderland traditions and performers behind the statewide genre.</span></Link>
              <Link to="/texas-music-cities" className="group bg-background p-6"><strong className="font-display text-2xl group-hover:text-primary">Texas Music Cities</strong><span className="mt-3 block text-sm leading-6 text-muted-foreground">Compare the local systems that made distinct Texas scenes possible.</span></Link>
              <Link to="/texas-music-timeline" className="group bg-background p-6"><strong className="font-display text-2xl group-hover:text-primary">Music Timeline</strong><span className="mt-3 block text-sm leading-6 text-muted-foreground">Place the Corpus Christi story beside major Texas music turning points.</span></Link>
            </div>
          </section>
        </article>
      </Container>
    </>
  );
}
