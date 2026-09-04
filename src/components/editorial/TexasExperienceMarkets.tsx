import { Container } from "@/components/layout/Container";
import { hasVerifiedViatorMarketUrl, verifiedViatorMarketUrl, viatorTexasUrl } from "@/data/viator-destination-links";
import { VIATOR_RUNTIME_CATEGORIES, VIATOR_RUNTIME_MARKETS } from "@/data/viator-experience-runtime";
import { buildViatorAffiliateUrl } from "@/lib/viator-affiliate";

export function TexasExperienceMarkets() {
  const primary = VIATOR_RUNTIME_MARKETS.filter((market) => market.priority === "primary");
  const additional = VIATOR_RUNTIME_MARKETS.filter((market) => market.priority !== "primary");

  return <section id="tours-experiences" className="scroll-mt-24 border-y border-border bg-surface py-14 sm:py-16" aria-labelledby="texas-experiences-title">
    <Container>
      <p className="eyebrow text-primary">Tours · tickets · bookable experiences</p>
      <h2 id="texas-experiences-title" className="mt-3 max-w-5xl font-display text-4xl leading-tight sm:text-5xl">Book the Texas experience after you decide where to go</h2>
      <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground">TexasDefined keeps destination guidance editorial and source-driven, then adds a booking layer for tours and activities when an organized experience can improve the trip. The statewide directory maps {VIATOR_RUNTIME_MARKETS.length} Texas experience markets across {VIATOR_RUNTIME_CATEGORIES.length} booking lanes.</p>
      <div className="mt-7 flex flex-wrap gap-3">
        <a href={buildViatorAffiliateUrl(viatorTexasUrl(), "texasdefined-statewide-explore")} target="_blank" rel="sponsored noopener noreferrer" className="inline-flex items-center bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">Browse current Texas experiences on Viator ↗</a>
        <a href="/explore/trip-planner" className="inline-flex items-center border border-border bg-background px-5 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary">Build a Texas trip →</a>
      </div>
      <p className="mt-4 max-w-3xl text-xs leading-5 text-muted-foreground">Affiliate disclosure: TexasDefined may earn a commission from qualifying Viator bookings, at no additional cost to you. Availability, prices and product details are controlled by Viator and its suppliers.</p>

      <div className="mt-10 flex flex-wrap gap-2" aria-label="Viator experience lanes">
        {VIATOR_RUNTIME_CATEGORIES.map((category) => <span key={category} className="border border-border bg-background px-3 py-2 text-sm font-semibold">{category}</span>)}
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
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">These places matter even when supplier inventory is thinner. The market map gives TexasDefined a durable place to route booking intent as inventory changes.</p>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {additional.map((market) => <MarketCard key={market.slug} market={market} />)}
        </div>
      </div>

      <div className="mt-10 border-t border-border pt-6 text-sm leading-6 text-muted-foreground">
        <p><strong className="text-foreground">Editorial rule:</strong> Viator is a booking and inventory layer, not the authority source for whether a Texas public site is open, what it costs, or who manages it. Operational facts stay tied to first-party and authoritative sources.</p>
      </div>
    </Container>
  </section>;
}

function MarketCard({ market }: { market: (typeof VIATOR_RUNTIME_MARKETS)[number] }) {
  const verifiedMarketInventory = hasVerifiedViatorMarketUrl(market.slug);
  const viatorUrl = buildViatorAffiliateUrl(verifiedViatorMarketUrl(market.slug), `texasdefined-${market.slug}`);
  const localSearch = `/explore/search?q=${encodeURIComponent(market.name.replace(/\s*&.*$/, ""))}`;

  return <article className="border border-border bg-background p-6">
    <p className="eyebrow text-primary">{market.regionLabel}</p>
    <h4 className="mt-2 font-display text-3xl leading-tight">{market.name}</h4>
    <div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold">
      <a href={localSearch} className="border-b border-primary text-primary">TexasDefined places →</a>
      <a href={viatorUrl} target="_blank" rel="sponsored noopener noreferrer" className="border-b border-foreground/30 hover:border-primary hover:text-primary">{verifiedMarketInventory ? "Current Viator options ↗" : "Browse Viator Texas inventory ↗"}</a>
    </div>
  </article>;
}
