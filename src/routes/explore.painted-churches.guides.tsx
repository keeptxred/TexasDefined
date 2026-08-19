import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { paintedChurchSearchCoverage, paintedChurchSearchGuides } from "@/data/painted-church-search-guides";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/painted-churches/guides";
const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
const description = "Texas Painted Churches search guide covering 50 high-interest church, town, route, visitor and history questions with a dedicated canonical answer for each search intent.";

const groupLabels = {
  "specific-churches": "Specific churches",
  "towns-locations": "Towns and locations",
  "tours-trip-planning": "Tours and trip planning",
  "history-architecture-culture": "History, architecture and culture",
} as const;

const groupOrder = ["specific-churches", "towns-locations", "tours-trip-planning", "history-architecture-culture"] as const;

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Texas Painted Churches Search Guide | 50 Popular Questions",
      description,
      modifiedTime: "2026-08-18T23:30:00-05:00",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": `${pageUrl}#collection`,
          url: pageUrl,
          name: "Texas Painted Churches Search Guide",
          description,
          dateModified: "2026-08-18",
          mainEntity: { "@id": `${pageUrl}#queries` },
        },
        {
          "@type": "ItemList",
          "@id": `${pageUrl}#queries`,
          numberOfItems: paintedChurchSearchCoverage.length,
          itemListElement: paintedChurchSearchCoverage.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.query,
            url: absoluteUrl(texasDefinedBrand, item.canonicalPath),
          })),
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl(texasDefinedBrand, "/") },
            { "@type": "ListItem", position: 2, name: "Painted Churches", item: absoluteUrl(texasDefinedBrand, "/explore/painted-churches") },
            { "@type": "ListItem", position: 3, name: "Search Guide", item: pageUrl },
          ],
        },
      ],
    })],
  }),
  component: PaintedChurchSearchGuideHub,
});

function PaintedChurchSearchGuideHub() {
  const dedicated = paintedChurchSearchCoverage.filter((item) => item.coverage === "search-guide").length;
  const existing = paintedChurchSearchCoverage.length - dedicated;

  return <main>
    <section className="border-b border-border bg-ink text-ink-foreground">
      <Container className="py-16 sm:py-24">
        <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-ink-foreground/60">
          <ol className="flex flex-wrap items-center gap-2"><li><Link to="/">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches">Painted Churches</Link></li><li aria-hidden>·</li><li aria-current="page" className="text-white">Search guide</li></ol>
        </nav>
        <p className="eyebrow mt-10 text-ink-foreground/65">Search-intent atlas · {paintedChurchSearchCoverage.length} queries</p>
        <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">Every major Painted Churches question has somewhere useful to land.</h1>
        <p className="mt-6 max-w-4xl text-lg leading-8 text-ink-foreground/80">This index connects the most common Texas Painted Churches searches to the strongest answer on Texas Defined. Existing church, map, people, heritage and technique pages remain canonical where they already answer the query well; {dedicated} additional guides fill the search-intent gaps without creating duplicate pages.</p>
      </Container>
    </section>

    <Container className="py-14 sm:py-18">
      <section className="grid gap-px border border-border bg-border sm:grid-cols-3">
        <div className="bg-background p-6"><p className="eyebrow text-muted-foreground">Searches covered</p><p className="mt-3 font-display text-5xl">{paintedChurchSearchCoverage.length}</p><p className="mt-3 text-sm leading-6 text-muted-foreground">Churches, places, trip planning and history.</p></div>
        <div className="bg-background p-6"><p className="eyebrow text-muted-foreground">Dedicated new guides</p><p className="mt-3 font-display text-5xl">{dedicated}</p><p className="mt-3 text-sm leading-6 text-muted-foreground">Built only where an existing canonical page was not strong enough.</p></div>
        <div className="bg-background p-6"><p className="eyebrow text-muted-foreground">Existing strong answers</p><p className="mt-3 font-display text-5xl">{existing}</p><p className="mt-3 text-sm leading-6 text-muted-foreground">Church profiles, map, planner, people, heritage, techniques and timeline.</p></div>
      </section>

      {groupOrder.map((group) => {
        const items = paintedChurchSearchCoverage.filter((item) => item.group === group);
        return <section key={group} className="mt-16 border-t-2 border-foreground pt-8">
          <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow text-primary">Query group</p><h2 className="mt-3 font-display text-4xl sm:text-5xl">{groupLabels[group]}</h2></div><p className="text-sm text-muted-foreground">{items.length} search intents</p></div>
          <div className="mt-8 grid gap-px border border-border bg-border md:grid-cols-2">
            {items.map((item) => <a key={item.query} href={item.canonicalPath} className="group bg-background p-6 hover:bg-surface">
              <p className="eyebrow text-muted-foreground">{item.coverage === "search-guide" ? "Dedicated guide" : item.coverage === "church-profile" ? "Church profile" : "Existing authority page"}</p>
              <h3 className="mt-2 font-display text-2xl leading-tight group-hover:text-primary">{item.query}</h3>
              <p className="mt-4 text-sm font-medium text-primary">Open the canonical answer →</p>
            </a>)}
          </div>
        </section>;
      })}

      <section className="mt-16 border-t border-border pt-8">
        <p className="eyebrow text-primary">Keep exploring</p>
        <h2 className="mt-3 font-display text-4xl">Use the collection, not just the keywords.</h2>
        <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm">
          <Link to="/explore/painted-churches" className="border-b border-primary text-primary">Main Painted Churches guide</Link>
          <Link to="/explore/painted-churches/map" className="border-b border-primary text-primary">Statewide map</Link>
          <Link to="/explore/painted-churches-plan" className="border-b border-primary text-primary">Self-guided planner</Link>
          <Link to="/explore/painted-churches/methodology" className="border-b border-primary text-primary">Research methodology</Link>
        </div>
        <p className="mt-5 max-w-4xl text-sm leading-7 text-muted-foreground">The coverage registry contains {paintedChurchSearchGuides.length} dedicated search guides. When a popular query is ambiguous or points at an unverified church identity, the guide says so explicitly and directs readers to verified records instead of manufacturing certainty.</p>
      </section>
    </Container>
  </main>;
}
