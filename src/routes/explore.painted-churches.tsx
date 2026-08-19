import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { PaintedChurchSourceLibrary } from "@/components/editorial/PaintedChurchSourceLibrary";
import { Container } from "@/components/layout/Container";
import { paintedChurchSources, schulenburgCoreRoute } from "@/data/painted-churches";
import { expandedPaintedChurches } from "@/data/painted-churches-expanded";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/painted-churches";
const description = `The comprehensive Texas Painted Churches guide: ${expandedPaintedChurches.length} verified church profiles, routes, statewide map, comparison database, archival then-and-now research, National Register context and current visitor guidance.`;
const collectionUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
const formalChurches = expandedPaintedChurches.filter((church) => church.nationalRegister?.multipleProperty);
const schulenburgChurches = expandedPaintedChurches.filter((church) => church.schulenburgCluster);

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: `Painted Churches of Texas | Map, Routes & ${expandedPaintedChurches.length}-Church Guide`,
      description,
      modifiedTime: "2026-08-18T22:54:00-05:00",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": `${collectionUrl}#collection`,
          url: collectionUrl,
          name: "Painted Churches of Texas",
          description,
          dateModified: "2026-08-18",
          isPartOf: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#website` },
          publisher: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#organization` },
          mainEntity: { "@id": `${collectionUrl}#churches` },
          breadcrumb: { "@id": `${collectionUrl}#breadcrumbs` },
          subjectOf: [
            { "@type": "WebPage", url: absoluteUrl(texasDefinedBrand, "/explore/painted-churches/methodology"), name: "Painted Churches research methodology" },
            { "@type": "WebPage", url: absoluteUrl(texasDefinedBrand, "/explore/painted-churches/how-many"), name: "How many Painted Churches are in Texas?" },
            { "@type": "WebPage", url: absoluteUrl(texasDefinedBrand, "/explore/painted-churches/census"), name: "Texas Painted Churches master census" },
            { "@type": "WebPage", url: absoluteUrl(texasDefinedBrand, "/explore/painted-churches/compare"), name: "Compare Texas Painted Churches" },
            { "@type": "WebPage", url: absoluteUrl(texasDefinedBrand, "/explore/painted-churches/map"), name: "Texas Painted Churches interactive map" },
            { "@type": "WebPage", url: absoluteUrl(texasDefinedBrand, "/explore/painted-churches/then-and-now"), name: "Texas Painted Churches then and now" },
            { "@type": "WebPage", url: absoluteUrl(texasDefinedBrand, "/explore/painted-churches/knowledge-graph"), name: "Texas Painted Churches knowledge graph" },
          ],
        },
        {
          "@type": "ItemList",
          "@id": `${collectionUrl}#churches`,
          numberOfItems: expandedPaintedChurches.length,
          itemListElement: expandedPaintedChurches.map((church, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Church",
              "@id": `${absoluteUrl(texasDefinedBrand, `/explore/painted-churches/${church.slug}`)}#church`,
              name: church.name,
              url: absoluteUrl(texasDefinedBrand, `/explore/painted-churches/${church.slug}`),
              description: church.summary,
              address: {
                "@type": "PostalAddress",
                addressLocality: church.city,
                addressRegion: "TX",
                addressCountry: "US",
                ...(church.address ? { streetAddress: church.address } : {}),
              },
              ...(church.image ? { image: church.image.src } : {}),
            },
          })),
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${collectionUrl}#breadcrumbs`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl(texasDefinedBrand, "/") },
            { "@type": "ListItem", position: 2, name: "Explore", item: absoluteUrl(texasDefinedBrand, "/explore") },
            { "@type": "ListItem", position: 3, name: "Painted Churches", item: collectionUrl },
          ],
        },
      ],
    })],
  }),
  component: PaintedChurchesPage,
});

const coreDirectionsUrl = "https://www.google.com/maps/dir/?api=1&origin=Schulenburg%2C%20TX&destination=St.%20Mary%27s%20Church%20of%20the%20Assumption%2C%20Praha%2C%20TX&waypoints=Saints%20Cyril%20and%20Methodius%20Catholic%20Church%2C%20Dubina%2C%20TX%7CSt.%20John%20the%20Baptist%20Catholic%20Church%2C%20Ammannsville%2C%20TX%7CNativity%20of%20Mary%2C%20Blessed%20Virgin%20Catholic%20Church%2C%20High%20Hill%2C%20TX";

const answers = [
  { q: "What are the Painted Churches of Texas?", a: "Historic Texas churches whose interiors use elaborate murals, stenciling, faux marble, wood graining, gilding and other decorative painting associated with immigrant congregations and later preservation traditions." },
  { q: "Where are the best-known Painted Churches?", a: "The classic touring cluster is centered around Schulenburg in Fayette and Lavaca counties, especially Dubina, Ammannsville, High Hill, Praha, Moravia and St. John." },
  { q: "How many Painted Churches are there?", a: `There is no single universal count. Texas Defined currently documents ${expandedPaintedChurches.length} verified churches, including ${formalChurches.length} entries flagged in the narrower National Register decorative-interior group and ${schulenburgChurches.length} churches in the Schulenburg-area touring cluster.` },
  { q: "Can visitors go inside?", a: "Many can be visited, but these are active churches. Services, funerals, weddings, holy days and parish events take priority, so current access should be verified before travel." },
] as const;

function PaintedChurchesPage() {
  return <main>
    <section className="border-b border-border bg-ink text-ink-foreground"><Container className="grid gap-10 py-16 sm:py-24 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,.8fr)] lg:items-end">
      <div><nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-ink-foreground/60"><ol className="flex flex-wrap items-center gap-2"><li><Link to="/" className="hover:text-white">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore" className="hover:text-white">Explore</Link></li><li aria-hidden>·</li><li aria-current="page" className="text-white">Painted Churches</li></ol></nav><p className="eyebrow mt-10 text-ink-foreground/70">Texas heritage · verified statewide guide</p><h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">Painted Churches of Texas</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-ink-foreground/80">Texas’s Painted Churches are historic sanctuaries whose plain or restrained exteriors open into murals, stenciling, faux marble, painted vaults, religious imagery and immigrant craftsmanship. Start with the Schulenburg circuit, then explore the broader statewide tradition church by church.</p></div>
      <div className="border-t border-ink-foreground/25 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"><p className="eyebrow text-ink-foreground/60">Verified collection</p><p className="mt-3 font-display text-6xl">{expandedPaintedChurches.length}</p><p className="mt-3 text-sm leading-6 text-ink-foreground/70">Source-checked church profiles with designation context, visitor guidance and rights-reviewed photography.</p><p className="mt-4 text-xs leading-5 text-ink-foreground/55">Collection reviewed August 18, 2026.</p></div>
    </Container></section>

    <Container className="py-14 sm:py-18">
      <section aria-labelledby="quick-answer" className="border-t-2 border-foreground pt-8"><p className="eyebrow text-primary">Quick answer</p><h2 id="quick-answer" className="mt-3 font-display text-4xl sm:text-5xl">What should you know first?</h2><p className="mt-5 max-w-4xl text-base leading-8 text-foreground/90">The best-known Painted Churches sit around Schulenburg, where six communities form the classic Central Texas touring cluster. Texas Defined currently documents {expandedPaintedChurches.length} verified churches statewide and keeps the narrower National Register decorative-interior designation separate from the broader cultural and travel label.</p><div className="mt-8 grid gap-px border border-border bg-border md:grid-cols-2">{answers.map((item) => <article key={item.q} className="bg-background p-6"><h3 className="font-display text-2xl">{item.q}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{item.a}</p></article>)}</div><div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm"><Link to="/explore/painted-churches/how-many" className="border-b border-primary text-primary">Why Painted Church counts differ</Link><Link to="/explore/painted-churches/methodology" className="border-b border-primary text-primary">Research methodology & corrections</Link><Link to="/explore/painted-churches/census" className="border-b border-primary text-primary">Master census</Link></div></section>

      <section className="mt-16 border-t border-border pt-8"><p className="eyebrow text-primary">Use the collection</p><h2 className="mt-3 font-display text-4xl">Five ways to plan or research the churches</h2><div className="mt-8 grid gap-px border border-border bg-border md:grid-cols-2 xl:grid-cols-5"><Link to="/explore/painted-churches-plan" className="bg-background p-6 hover:bg-surface"><p className="eyebrow text-primary">One-day route</p><h3 className="mt-2 font-display text-2xl">Schulenburg planner</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">Dubina, Ammannsville, High Hill and Praha in a practical first-day sequence.</p></Link><Link to="/explore/painted-churches/map" className="bg-background p-6 hover:bg-surface"><p className="eyebrow text-primary">Geography</p><h3 className="mt-2 font-display text-2xl">Interactive statewide map</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">All verified churches plotted with source-backed coordinate precision.</p></Link><Link to="/explore/painted-churches/compare" className="bg-background p-6 hover:bg-surface"><p className="eyebrow text-primary">Research</p><h3 className="mt-2 font-display text-2xl">Compare all churches</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">Dates, artists, heritage, integrity, techniques, symbols and designation side by side.</p></Link><Link to="/explore/painted-churches/then-and-now" className="bg-background p-6 hover:bg-surface"><p className="eyebrow text-primary">Archival evidence</p><h3 className="mt-2 font-display text-2xl">Then & now</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">Historic records paired with current rights-cleared church photography.</p></Link><Link to="/explore/painted-churches/methodology" className="bg-background p-6 hover:bg-surface"><p className="eyebrow text-primary">Authority</p><h3 className="mt-2 font-display text-2xl">How we verify them</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">Inclusion rules, source hierarchy, image rights and corrections.</p></Link></div></section>

      <section aria-labelledby="schulenburg-route" className="mt-16 border-t-2 border-foreground pt-8"><div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]"><div><p className="eyebrow text-primary">Start here</p><h2 id="schulenburg-route" className="mt-3 font-display text-4xl sm:text-5xl">The four-church Schulenburg route</h2><p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">For a first trip, use Schulenburg as the base and run the core sequence through Dubina, Ammannsville, High Hill and Praha. It keeps the day focused while leaving time to actually see the interiors.</p></div><div className="border-l border-border pl-6"><p className="eyebrow text-muted-foreground">Route tools</p><Link to="/explore/painted-churches-plan" className="mt-4 inline-block border-b border-primary text-sm font-medium text-primary">Plan the Painted Churches route</Link><br/><a href={coreDirectionsUrl} target="_blank" rel="noreferrer" className="mt-4 inline-block border-b border-primary text-sm font-medium text-primary">Open the core drive in Maps</a></div></div><ol className="mt-10 grid gap-px border border-border bg-border md:grid-cols-2 xl:grid-cols-4">{schulenburgCoreRoute.map((church, index) => <li key={church.slug} className="bg-background p-6"><p className="eyebrow text-primary">Stop {index + 1} · {church.city}</p><h3 className="mt-3 font-display text-2xl leading-tight"><Link to="/explore/painted-churches/$slug" params={{ slug: church.slug }} className="hover:text-primary">{church.shortName}</Link></h3><p className="mt-4 text-sm leading-6 text-muted-foreground">{church.summary}</p></li>)}</ol></section>

      <section aria-labelledby="access" className="mt-16 grid gap-10 border-t border-border pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,.55fr)]"><div><p className="eyebrow text-primary">Before you leave</p><h2 id="access" className="mt-3 font-display text-4xl">These are active churches, not museum sets.</h2><p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">The Schulenburg Chamber currently says the local painted churches are generally available for touring Monday through Saturday from 9 a.m. to 4 p.m., with Praha closing at 3 p.m. on Saturdays. Services, funerals, weddings, holy days and parish events can change access, so verify before traveling.</p></div><div className="border-l border-border pl-6"><p className="eyebrow text-muted-foreground">Local six-church cluster</p><p className="mt-3 text-3xl font-display">{schulenburgChurches.length} churches</p><p className="mt-3 text-sm leading-6 text-muted-foreground">Ammannsville, Dubina, High Hill, Praha, Moravia and St. John.</p><a href={paintedChurchSources.schulenburgChamber} target="_blank" rel="noreferrer" className="mt-4 inline-block border-b border-primary text-sm text-primary">Check current official tour information</a></div></section>

      <section aria-labelledby="all-churches" className="mt-16 border-t-2 border-foreground pt-8"><div className="flex flex-wrap items-end justify-between gap-6"><div><p className="eyebrow text-primary">Church by church</p><h2 id="all-churches" className="mt-3 font-display text-4xl sm:text-5xl">Explore all {expandedPaintedChurches.length} verified churches</h2></div><p className="max-w-xl text-sm leading-6 text-muted-foreground">{formalChurches.length} entries are flagged in the formal National Register decorative-interior group represented in this collection. The remaining guides are separately documented Painted Church destinations.</p></div><div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{expandedPaintedChurches.map((church) => <article key={church.slug} className="border-t border-border pt-5">{church.image ? <img src={church.image.src} alt={church.image.alt} width={church.image.width} height={church.image.height} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover"/> : <div className="flex aspect-[4/3] items-end bg-surface p-6"><p className="font-display text-3xl text-foreground/70">{church.city}</p></div>}<p className="eyebrow mt-5 text-primary">{church.city} · {church.county} County</p><h3 className="mt-2 font-display text-3xl leading-tight"><Link to="/explore/painted-churches/$slug" params={{ slug: church.slug }} className="hover:text-primary">{church.shortName}</Link></h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{church.summary}</p><div className="mt-4 flex flex-wrap gap-2 text-[0.68rem] uppercase tracking-[0.12em] text-muted-foreground">{church.nationalRegister?.multipleProperty && <span className="border border-border px-2 py-1">NR decorative interior</span>}{church.schulenburgCluster && <span className="border border-border px-2 py-1">Schulenburg cluster</span>}{church.recordedTexasHistoricLandmark && <span className="border border-border px-2 py-1">RTHL</span>}</div></article>)}</div></section>

      <section aria-labelledby="what-counts" className="mt-16 border-y border-border py-10"><p className="eyebrow text-primary">A useful distinction</p><h2 id="what-counts" className="mt-3 font-display text-4xl">There is no single modern list that every source uses.</h2><div className="mt-6 max-w-4xl space-y-5 text-base leading-8 text-muted-foreground"><p>Texas heritage sources use “Painted Churches” as a travel and cultural label, while the National Register uses a narrower historic grouping. Texas Defined labels the formal group separately instead of pretending every commonly mentioned church has the same designation.</p><p>The result is a broader statewide guide with transparent labels: formal National Register entries, the six-community Schulenburg cluster, Recorded Texas Historic Landmarks where verified, and separately documented Painted Church traditions.</p></div><div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm"><Link to="/explore/painted-churches/how-many" className="border-b border-primary text-primary">Read the full count explainer</Link><a href={paintedChurchSources.nationalRegisterMultipleProperty} target="_blank" rel="noreferrer" className="border-b border-primary text-primary">Texas Historical Commission listing</a><a href={paintedChurchSources.texasTimeTravel} target="_blank" rel="noreferrer" className="border-b border-primary text-primary">Texas Time Travel</a><a href={paintedChurchSources.austinPbs} target="_blank" rel="noreferrer" className="border-b border-primary text-primary">Austin PBS Painted Churches</a></div></section>

      <PaintedChurchSourceLibrary />
    </Container>
  </main>;
}
