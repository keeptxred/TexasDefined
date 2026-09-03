import { VIATOR_EXPERIENCE_CATEGORIES, VIATOR_TEXAS_MARKETS } from "@/data/viator-experiences";
import { buildViatorAffiliateUrl, buildViatorSearchUrl, isViatorAffiliateConfigured } from "@/lib/viator-affiliate";
import { Container } from "@/components/layout/Container";

export function TexasExperienceMarkets() {
  const affiliateConfigured = isViatorAffiliateConfigured();
  const primary = VIATOR_TEXAS_MARKETS.filter((market) => market.priority === "primary");
  const additional = VIATOR_TEXAS_MARKETS.filter((market) => market.priority !== "primary");

  return <section id="tours-experiences" className="scroll-mt-24 border-y border-border bg-surface py-14 sm:py-16" aria-labelledby="texas-experiences-title">
    <Container>
      <p className="eyebrow text-primary">Tours · tickets · bookable experiences</p>
      <h2 id="texas-experiences-title" className="mt-3 max-w-5xl font-display text-4xl leading-tight sm:text-5xl">Book the Texas experience after you decide where to go</h2>
      <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground">TexasDefined keeps destination guidance editorial and source-driven, then adds a booking layer for tours and activities when a guide, ticket, cruise, tasting, ranch outing or other organized experience can improve the trip. The statewide directory currently maps {VIATOR_TEXAS_MARKETS.length} Texas experience markets across {VIATOR_EXPERIENCE_CATEGORIES.length} booking lanes.</p>
      <div className="mt-7 flex flex-wrap gap-3">
        <a href={buildViatorSearchUrl("Texas tours and activities", "texasdefined-statewide-explore")} target="_blank" rel="sponsored noopener noreferrer" className="inline-flex items-center bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">Browse current Texas experiences on Viator ↗</a>
        <a href="/explore/trip-planner" className="inline-flex items-center border border-border bg-background px-5 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary">Build a Texas trip →</a>
      </div>
      <p className="mt-4 max-w-3xl text-xs leading-5 text-muted-foreground">{affiliateConfigured ? "Affiliate disclosure: TexasDefined may earn a commission from qualifying Viator bookings, at no additional cost to you. Availability, prices and product details are controlled by Viator and its suppliers." : "TexasDefined is completing Viator enrollment. Booking discovery is live now; affiliate attribution can be activated centrally once the approved Viator parameters are available."}</p>

      <div className="mt-10 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {VIATOR_EXPERIENCE_CATEGORIES.map((category) => <article key={category.id} className="bg-background p-5"><h3 className="font-display text-2xl">{category.label}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{category.description}</p></article>)}
      </div>

      <div className="mt-14">
        <p className="eyebrow text-primary">Highest-priority markets</p>
        <h3 className="mt-2 font-display text-3xl">Start where Texas travel intent is deepest</h3>
        <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {primary.map((market) => <MarketCard key={market.slug} market={market} />)}
        </div>
      </div>

      <div className="mt-14">
        <p className="eyebrow text-primary">Statewide coverage</p>
        <h3 className="mt-2 font-display text-3xl">Secondary and emerging Texas experience markets</h3>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">These places matter even when supplier inventory is thinner. The market map gives TexasDefined a durable place to route booking intent as Viator adds or removes individual products.</p>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {additional.map((market) => <MarketCard key={market.slug} market={market} compact />)}
        </div>
      </div>

      <div className="mt-10 border-t border-border pt-6 text-sm leading-6 text-muted-foreground">
        <p><strong className="text-foreground">Editorial rule:</strong> Viator is a booking and inventory layer, not the authority source for whether a Texas public site is open, what it costs, or who manages it. Operational facts stay tied to first-party and authoritative sources.</p>
      </div>
    </Container>
  </section>;
}

function MarketCard({ market, compact = false }: { market: (typeof VIATOR_TEXAS_MARKETS)[number]; compact?: boolean }) {
  const viatorUrl = market.viatorDestinationUrl
    ? buildViatorAffiliateUrl(market.viatorDestinationUrl, `texasdefined-${market.slug}`)
    : buildViatorSearchUrl(market.searchQuery, `texasdefined-${market.slug}`);
  const localSearch = `/explore/search?q=${encodeURIComponent(market.name.replace(/\s*&.*$/, ""))}`;

  return <article className="border border-border bg-background p-6">
    <p className="eyebrow text-primary">{market.regionLabel}</p>
    <h4 className="mt-2 font-display text-3xl leading-tight">{market.name}</h4>
    {!compact && <p className="mt-4 text-sm leading-6 text-muted-foreground">{market.summary}</p>}
    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{market.categories.length} experience lanes · {market.anchorAttractions.length} anchor ideas</p>
    {!compact && <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">{market.anchorAttractions.slice(0, 5).map((anchor) => <li key={anchor}>{anchor}</li>)}</ul>}
    <div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold">
      <a href={localSearch} className="border-b border-primary text-primary">TexasDefined places →</a>
      <a href={viatorUrl} target="_blank" rel="sponsored noopener noreferrer" className="border-b border-foreground/30 hover:border-primary hover:text-primary">Current Viator options ↗</a>
    </div>
  </article>;
}
