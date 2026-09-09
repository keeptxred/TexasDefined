import { hasVerifiedViatorMarketUrl, verifiedViatorMarketUrl } from "@/data/viator-destination-links";
import { VIATOR_RUNTIME_SIGNAL_REVIEWED_AT, viatorRuntimeMarketForSlug } from "@/data/viator-experience-runtime";
import { viatorMarketsForPlace, type ViatorMatchMarket } from "@/data/viator-market-match";
import type { Destination } from "@/data/types";
import { buildViatorAffiliateUrl } from "@/lib/viator-affiliate";

function uniqueMarkets(markets: ViatorMatchMarket[]) {
  return [...new Map(markets.map((market) => [market.slug, market])).values()];
}

function matchDestinationMarket(destination: Destination) {
  const matches = uniqueMarkets([
    ...viatorMarketsForPlace(destination.name),
    ...viatorMarketsForPlace(destination.nearestTown),
    ...(destination.county ? viatorMarketsForPlace(destination.county) : []),
  ]);
  return matches.find((market) => hasVerifiedViatorMarketUrl(market.slug)) ?? matches[0];
}

export function resolveDestinationViatorBooking(destination: Destination) {
  const market = matchDestinationMarket(destination);
  if (!market) return null;

  const runtimeMarket = viatorRuntimeMarketForSlug(market.slug);
  const hasDedicatedInventory = hasVerifiedViatorMarketUrl(market.slug);

  return {
    href: buildViatorAffiliateUrl(
      verifiedViatorMarketUrl(market.slug),
      `texasdefined-destination-${destination.slug}`,
    ),
    hasDedicatedInventory,
    signalMarketName: runtimeMarket?.name ?? null,
    signalLanes: runtimeMarket?.signalLanes ? [...runtimeMarket.signalLanes] : [],
    reviewedAt: VIATOR_RUNTIME_SIGNAL_REVIEWED_AT,
    reviewedLabel: "September 8, 2026",
  };
}
