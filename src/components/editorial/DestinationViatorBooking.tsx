import { hasVerifiedViatorMarketUrl, verifiedViatorMarketUrl } from "@/data/viator-destination-links";
import { runtimeMarketsForPlace, type ViatorExperienceRuntimeMarket } from "@/data/viator-experience-runtime";
import type { Destination } from "@/data/types";
import { buildViatorAffiliateUrl, isViatorAffiliateConfigured } from "@/lib/viator-affiliate";

function uniqueMarkets(markets: ViatorExperienceRuntimeMarket[]) {
  return [...new Map(markets.map((market) => [market.slug, market])).values()];
}

function matchDestinationMarket(destination: Destination) {
  const matches = uniqueMarkets([
    ...runtimeMarketsForPlace(destination.name),
    ...runtimeMarketsForPlace(destination.nearestTown),
    ...(destination.county ? runtimeMarketsForPlace(destination.county) : []),
  ]);
  return matches.find((market) => hasVerifiedViatorMarketUrl(market.slug)) ?? matches[0];
}

export function DestinationViatorBooking({ destination }: { destination: Destination }) {
  const market = matchDestinationMarket(destination);
  if (!market) return null;

  const hasDedicatedInventory = hasVerifiedViatorMarketUrl(market.slug);
  const affiliateConfigured = isViatorAffiliateConfigured();
  const href = buildViatorAffiliateUrl(
    verifiedViatorMarketUrl(market.slug),
    `texasdefined-destination-${destination.slug}`,
  );

  return <section className="mt-10 border border-border bg-surface p-6 sm:p-7" aria-labelledby={`viator-${destination.slug}`}>
    <p className="eyebrow text-primary">Tours & bookable experiences</p>
    <h3 id={`viator-${destination.slug}`} className="mt-2 font-display text-3xl leading-tight">Add an experience around {destination.name}</h3>
    <p className="mt-3 text-sm leading-6 text-muted-foreground">TexasDefined handles the destination planning. Viator can be useful for guided tours, tickets and organized activities around {market.name}. Availability changes, so the booking link checks the current Viator inventory rather than promising a specific product.</p>
    <div className="mt-5 flex flex-wrap items-center gap-4">
      <a href={href} target="_blank" rel="sponsored noopener noreferrer" className="inline-flex items-center bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">{hasDedicatedInventory ? `See current ${market.name} experiences ↗` : "Browse current Texas experiences ↗"}</a>
      <a href="/explore#tours-experiences" className="text-sm font-semibold text-primary underline decoration-primary/40 underline-offset-4">Explore Texas experience markets →</a>
    </div>
    <p className="mt-4 text-xs leading-5 text-muted-foreground">{affiliateConfigured ? "Affiliate disclosure: TexasDefined may earn a commission from qualifying Viator bookings, at no additional cost to you." : "TexasDefined is completing Viator enrollment. Affiliate attribution can be activated centrally once the approved Viator tracking parameters are available."}</p>
  </section>;
}
