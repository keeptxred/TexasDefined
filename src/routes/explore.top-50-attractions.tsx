import { createFileRoute, Link } from "@tanstack/react-router";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { TEXAS_TOP50_RANKING, TOP50_COLLECTION_PATH } from "@/data/texas-top50-ranking";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = TOP50_COLLECTION_PATH;
const description = "Texas Defined's ranked 50 classic Texas attractions, from the Alamo and Big Bend to major parks, museums, historic sites and statewide events, with individual visitor-planning guides.";
const updatedAt = "2026-10-17";

/** One ranked list, not category allocations or made-up attendance rankings. */
export const Route = createFileRoute("/explore/top-50-attractions")({
  head: () => {
    const url = absoluteUrl(texasDefinedBrand, canonicalPath);
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: "Top 50 Texas Tourist Attractions | Texas Defined",
        description,
        type: "article",
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "CollectionPage",
            "@id": `${url}#page`,
            url,
            name: "Top 50 Texas Tourist Attractions",
            description,
            dateModified: updatedAt,
            author: {
              "@type": "Organization",
              name: "Texas Defined Editorial Desk",
              url: absoluteUrl(texasDefinedBrand, "/authors/a-hollis"),
            },
            mainEntity: { "@id": `${url}#rankings` },
          },
          {
            "@type": "ItemList",
            "@id": `${url}#rankings`,
            name: "Top 50 Texas Tourist Attractions",
            itemListOrder: "https://schema.org/ItemListOrderAscending",
            numberOfItems: TEXAS_TOP50_RANKING.length,
            itemListElement: TEXAS_TOP50_RANKING.map((item) => ({
              "@type": "ListItem",
              position: item.rank,
              name: item.name,
              url: absoluteUrl(texasDefinedBrand, item.href),
            })),
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Texas Defined", item: absoluteUrl(texasDefinedBrand, "/") },
              { "@type": "ListItem", position: 2, name: "Explore", item: absoluteUrl(texasDefinedBrand, "/explore") },
              { "@type": "ListItem", position: 3, name: "Top 50 Texas Tourist Attractions", item: url },
            ],
          },
        ],
      })],
    };
  },
  component: Top50TexasAttractionsPage,
});

function Top50TexasAttractionsPage() {
  return (
    <>
      <Container className="pb-12 pt-12 sm:pt-16">
        <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <Link to="/">Texas Defined</Link><span aria-hidden="true" className="mx-2">/</span>
          <Link to="/explore">Explore</Link><span aria-hidden="true" className="mx-2">/</span>
          <span aria-current="page">Top 50 attractions</span>
        </nav>
        <header className="max-w-5xl py-12 sm:py-16">
          <p className="eyebrow text-primary">The statewide landmark list</p>
          <h1 className="mt-4 font-display text-5xl leading-[1.02] sm:text-7xl">Top 50 Texas tourist attractions</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground">
            Fifty standout Texas experiences in one statewide ranking: no category quotas,
            no fixed number of parks, and no regional allocations. Open each individual guide
            for what to see, how to plan, nearby experiences and links to primary visitor sources.
          </p>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground">
            This is an editorial judgment based on historical and cultural significance, Texas identity,
            statewide visitor appeal, national recognition and breadth of experience — not a
            claim to measured attendance, a guaranteed popularity order or access to proprietary
            visitor statistics. Visit schedules and admission policies may change; confirm details
            with the attraction's own operator before travel.
          </p>
          <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3 text-sm">
            <Link to="/explore/top-attractions" className="border-b border-primary text-primary">Explore the established Top 25 collection</Link>
            <Link to="/explore/attractions-comparison" className="border-b border-primary text-primary">Compare the broader Texas destinations catalog</Link>
          </div>
        </header>
        <section aria-labelledby="ranking-heading">
          <div className="flex items-end justify-between gap-5 border-b-2 border-foreground pb-5">
            <h2 id="ranking-heading" className="font-display text-3xl sm:text-4xl">The full ranking</h2>
            <p className="eyebrow text-muted-foreground">1–50</p>
          </div>
          <ol className="divide-y divide-border">
            {TEXAS_TOP50_RANKING.map((item) => (
              <li key={item.rank} className="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 gap-y-2 py-6 sm:grid-cols-[5rem_minmax(0,1fr)] sm:py-8">
                <p aria-label={`Rank ${item.rank}`} className="font-display text-3xl tabular-nums text-primary sm:text-4xl">
                  {String(item.rank).padStart(2, "0")}
                </p>
                <div>
                  <h3 className="font-display text-2xl leading-tight sm:text-3xl">
                    <a href={item.href} className="underline decoration-transparent underline-offset-4 transition-colors hover:text-primary hover:decoration-primary focus-visible:decoration-primary">
                      {item.name}
                    </a>
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.location}</p>
                  <a href={item.href} className="mt-4 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary">
                    Read the individual visitor guide →
                  </a>
                </div>
              </li>
            ))}
          </ol>
        </section>
        <section className="mt-10 max-w-4xl border-t-2 border-foreground py-10" aria-labelledby="ranking-methodology-heading">
          <h2 id="ranking-methodology-heading" className="font-display text-3xl">How this list was selected</h2>
          <p className="mt-5 text-base leading-8 text-muted-foreground">
            The list considers each attraction's enduring significance, distinctively Texan qualities,
            broad public recognition and appeal to visitors. A historic battlefield, a working zoo
            and a recurring fair can all qualify without being forced into categories. An item's rank
            is not a claim that it has more visitors than the next item. Each linked page uses its
            own official sources for practical visit details.
          </p>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            Curated by <Link to="/authors/$author" params={{author:"a-hollis"}} className="border-b border-primary text-primary">Texas Defined Editorial Desk</Link>.
            Last substantive collection review: October 17, 2026.
            Major annual events have separate event guides; stadiums have venue guides.
          </p>
        </section>
      </Container>
    </>
  );
}
