import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { VIATOR_EXPERIENCE_CATEGORIES, VIATOR_TEXAS_MARKETS } from "@/data/viator-experiences";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";
import { buildViatorAffiliateUrl, buildViatorSearchUrl, isViatorAffiliateConfigured } from "@/lib/viator-affiliate";

const canonicalPath = "/explore/tours-experiences";
const description = "Plan bookable Texas tours and experiences by city and region, including sightseeing, history, barbecue, wine, Western culture, water activities, outdoor adventure, museums, family attractions and day trips.";

export const Route = createFileRoute("/explore/tours-experiences")({
  head: () => {
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: "Texas Tours & Experiences | Texas Defined",
        description,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "CollectionPage",
            "@id": `${pageUrl}#page`,
            url: pageUrl,
            name: "Texas Tours & Experiences",
            description,
            about: VIATOR_EXPERIENCE_CATEGORIES.map((category) => ({ "@type": "Thing", name: category.label })),
            mainEntity: { "@id": `${pageUrl}#markets` },
          },
          {
            "@type": "ItemList",
            "@id": `${pageUrl}#markets`,
            name: "Texas tour and experience markets",
            numberOfItems: VIATOR_TEXAS_MARKETS.length,
            itemListElement: VIATOR_TEXAS_MARKETS.map((market, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: market.name,
              url: absoluteUrl(texasDefinedBrand, `/explore/tours-experiences/${market.slug}`),
            })),
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Front page", item: absoluteUrl(texasDefinedBrand, "/") },
              { "@type": "ListItem", position: 2, name: "Explore Texas", item: absoluteUrl(texasDefinedBrand, "/explore") },
              { "@type": "ListItem", position: 3, name: "Tours & Experiences", item: pageUrl },
            ],
          },
        ],
      })],
    };
  },
  component: TexasToursExperiencesPage,
});

function TexasToursExperiencesPage() {
  const affiliateConfigured = isViatorAffiliateConfigured();
  const primary = VIATOR_TEXAS_MARKETS.filter((market) => market.priority === "primary");
  const additional = VIATOR_TEXAS_MARKETS.filter((market) => market.priority !== "primary");

  return <>
    <Container className="pb-10 pt-12 sm:pt-16">
      <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
        <Link to="/">Front page</Link><span aria-hidden="true" className="mx-2">/</span><Link to="/explore">Explore</Link><span aria-hidden="true" className="mx-2">/</span><span aria-current="page">Tours & experiences</span>
      </nav>
      <header className="py-10 sm:py-14">
        <p className="eyebrow text-primary">Book the Texas experience</p>
        <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">Texas tours, activities and bookable experiences</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">Use TexasDefined to decide where to go and what belongs in the trip, then compare current tours and activities for the places where a guided experience, ticket or excursion adds value. This directory covers {VIATOR_TEXAS_MARKETS.length} Texas travel markets without turning our destination guides into a wall of affiliate links.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/explore/trip-planner" className="inline-flex items-center bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">Build a Texas trip →</Link>
          <a href={buildViatorSearchUrl("Texas tours and activities", "texasdefined-statewide-hub")} target="_blank" rel="sponsored noopener noreferrer" className="inline-flex items-center border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary">Browse current Texas experiences on Viator ↗</a>
        </div>
        <p className="mt-5 max-w-3xl text-xs leading-5 text-muted-foreground">{affiliateConfigured ? "Affiliate disclosure: TexasDefined may earn a commission when you book through qualifying Viator links, at no additional cost to you." : "Viator enrollment is being completed. The booking links are centralized so TexasDefined can activate affiliate attribution across this directory without changing the editorial destination pages."}</p>
      </header>
    </Container>

    <section className="border-y border-border bg-surface py-14 sm:py-16">
      <Container>
        <p className="eyebrow text-primary">What fits Viator</p>
        <h2 className="mt-3 max-w-4xl font-display text-4xl leading-tight">Twelve experience lanes we can monetize without weakening the travel guide</h2>
        <div className="mt-8 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {VIATOR_EXPERIENCE_CATEGORIES.map((category) => <article key={category.id} className="bg-background p-5"><h3 className="font-display text-2xl">{category.label}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{category.description}</p></article>)}
        </div>
      </Container>
    </section>

    <section className="py-14 sm:py-16">
      <Container>
        <p className="eyebrow text-primary">Highest-priority markets</p>
        <h2 className="mt-3 font-display text-4xl">Start where Texas travel intent is deepest</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {primary.map((market) => <MarketCard key={market.slug} market={market} />)}
        </div>
      </Container>
    </section>

    <section className="border-t border-border bg-surface py-14 sm:py-16">
      <Container>
        <p className="eyebrow text-primary">Statewide coverage</p>
        <h2 className="mt-3 font-display text-4xl">Secondary and emerging Texas experience markets</h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">These markets matter because a statewide Texas authority cannot stop at the four biggest cities. Some will support direct product promotion today; others are durable destination pages that can absorb new Viator inventory as suppliers appear.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {additional.map((market) => <MarketCard key={market.slug} market={market} compact />)}
        </div>
      </Container>
    </section>
  </>;
}

function MarketCard({ market, compact = false }: { market: (typeof VIATOR_TEXAS_MARKETS)[number]; compact?: boolean }) {
  const viatorUrl = market.viatorDestinationUrl
    ? buildViatorAffiliateUrl(market.viatorDestinationUrl, `texasdefined-${market.slug}`)
    : buildViatorSearchUrl(market.searchQuery, `texasdefined-${market.slug}`);
  return <article className="border border-border bg-background p-6">
    <p className="eyebrow text-primary">{market.regionLabel}</p>
    <h3 className="mt-2 font-display text-3xl leading-tight">{market.name}</h3>
    {!compact && <p className="mt-4 text-sm leading-6 text-muted-foreground">{market.summary}</p>}
    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{market.categories.length} experience lanes · {market.anchorAttractions.length} anchor ideas</p>
    <div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold">
      <Link to="/explore/tours-experiences/$market" params={{ market: market.slug }} className="border-b border-primary text-primary">Open TexasDefined guide →</Link>
      <a href={viatorUrl} target="_blank" rel="sponsored noopener noreferrer" className="border-b border-foreground/30 hover:border-primary hover:text-primary">Current Viator options ↗</a>
    </div>
  </article>;
}
