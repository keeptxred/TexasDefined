import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { CANONICAL_PRIMARY_REGIONS, TEXAS_METROS, TEXAS_SUBREGIONS } from "@/data/canonical-geography";
import { CANONICAL_REGION_PRESENTATIONS } from "@/data/canonical-region-presentation";
import { TEXAS_PLACE_GEOGRAPHY } from "@/data/geography-knowledge-graph";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/regions";
const description = "Explore TexasDefined's seven canonical Texas regions: North Texas, Central Texas, East Texas, South Texas, West Texas, Gulf Coast and the Panhandle, with their subregions, metros, cities, travel identities and relocation context.";

export const Route = createFileRoute("/regions")({
  head: () => {
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    const siteUrl = absoluteUrl(texasDefinedBrand, "/");
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: "The 7 Texas Regions | TexasDefined Geography",
        description,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [
        jsonLd({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CollectionPage",
              "@id": `${pageUrl}#page`,
              url: pageUrl,
              name: "The 7 Texas Regions",
              description,
              isPartOf: { "@id": `${siteUrl}#website` },
              publisher: { "@id": `${siteUrl}#organization` },
              mainEntity: { "@id": `${pageUrl}#regions` },
              breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
            },
            {
              "@type": "ItemList",
              "@id": `${pageUrl}#regions`,
              name: "TexasDefined canonical Texas regions",
              numberOfItems: CANONICAL_PRIMARY_REGIONS.length,
              itemListElement: CANONICAL_PRIMARY_REGIONS.map((region, index) => ({
                "@type": "ListItem",
                position: index + 1,
                url: absoluteUrl(texasDefinedBrand, `/regions/${region.id}`),
                item: {
                  "@type": "Place",
                  name: region.name,
                  containedInPlace: { "@type": "State", name: "Texas" },
                },
              })),
            },
            {
              "@type": "BreadcrumbList",
              "@id": `${pageUrl}#breadcrumb`,
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Front page", item: siteUrl },
                { "@type": "ListItem", position: 2, name: "Texas regions", item: pageUrl },
              ],
            },
          ],
        }),
      ],
    };
  },
  component: TexasRegionsPage,
});

function TexasRegionsPage() {
  return <>
    <Container className="pt-10 sm:pt-14">
      <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-2"><li><Link to="/" className="hover:text-foreground">Front page</Link></li><li aria-hidden>·</li><li aria-current="page" className="text-foreground">Texas regions</li></ol>
      </nav>
    </Container>

    <Container className="pb-14 pt-10 sm:pb-20 sm:pt-14">
      <p className="eyebrow text-primary">TexasDefined geography</p>
      <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">The 7 Texas regions, connected as one state.</h1>
      <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground">Texas does not have one universally accepted regional map. TexasDefined uses seven practical canonical regions to connect travel, relocation, cities, counties, events and comparisons without forcing every purpose into the same old tourism labels.</p>
      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
        <Link to="/article/$slug" params={{ slug: "texas-regions-explained" }} className="border-b border-primary pb-1 font-semibold text-primary">How the map works →</Link>
        <Link to="/explore" className="border-b border-primary pb-1 font-semibold text-primary">Plan a Texas trip →</Link>
        <Link to="/moving-to-texas" className="border-b border-primary pb-1 font-semibold text-primary">Moving to Texas →</Link>
      </div>
    </Container>

    <section className="border-y border-border bg-muted/25 py-14 sm:py-20">
      <Container>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {CANONICAL_REGION_PRESENTATIONS.map((presentation) => {
            const region = CANONICAL_PRIMARY_REGIONS.find((candidate) => candidate.id === presentation.id)!;
            const subregions = TEXAS_SUBREGIONS.filter((item) => item.primaryRegionId === region.id);
            const metros = TEXAS_METROS.filter((item) => item.primaryRegionId === region.id);
            const places = TEXAS_PLACE_GEOGRAPHY.filter((item) => item.primaryRegionId === region.id);
            return <Link key={region.id} to="/regions/$region" params={{ region: region.id }} className="group flex min-h-[22rem] flex-col border border-border bg-background p-7 transition hover:-translate-y-0.5 hover:border-primary/45 hover:shadow-sm">
              <p className="eyebrow text-primary">Canonical region</p>
              <h2 className="mt-3 font-display text-4xl leading-tight">{region.name}</h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground">{presentation.summary}</p>
              <dl className="mt-auto grid grid-cols-3 gap-3 border-t border-border pt-6 text-center">
                <div><dt className="text-[0.68rem] uppercase tracking-[0.12em] text-muted-foreground">Subregions</dt><dd className="mt-1 font-display text-2xl">{subregions.length}</dd></div>
                <div><dt className="text-[0.68rem] uppercase tracking-[0.12em] text-muted-foreground">Metros</dt><dd className="mt-1 font-display text-2xl">{metros.length}</dd></div>
                <div><dt className="text-[0.68rem] uppercase tracking-[0.12em] text-muted-foreground">Mapped places</dt><dd className="mt-1 font-display text-2xl">{places.length}</dd></div>
              </dl>
              <span className="eyebrow mt-6 text-primary">Open {region.name} →</span>
            </Link>;
          })}
        </div>
      </Container>
    </section>

    <Container className="py-16 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="eyebrow text-primary">One graph, different lenses</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">Canonical geography underneath. Travel and relocation on top.</h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">The seven regions are the statewide backbone. Hill Country, Piney Woods, Big Bend, Coastal Bend, Rio Grande Valley, Texoma and other familiar names remain important subregions or travel identities. Existing Explore URLs stay live and are cross-walked to this graph rather than becoming a competing map.</p>
        </div>
        <div className="border-l-2 border-primary/30 pl-7">
          <p className="font-semibold">Boundary rule</p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">Regional boundaries are editorial and approximate. Cities near a transition can have a primary canonical region plus gateway or adjacency relationships. Austin is Central Texas with a Hill Country gateway; San Antonio is South Texas with a Hill Country gateway and Central Texas adjacency.</p>
          <Link to="/browse/cities" className="eyebrow mt-6 inline-block border-b border-primary pb-1 text-primary">Browse Texas cities →</Link>
        </div>
      </div>
    </Container>
  </>;
}
