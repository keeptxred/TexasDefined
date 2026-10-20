import { hasVerifiedViatorMarketUrl, verifiedViatorMarketUrl } from "@/data/viator-destination-links";
import { VIATOR_RUNTIME_SIGNAL_REVIEWED_AT, viatorRuntimeMarketForSlug } from "@/data/viator-experience-runtime";
import { viatorMarketsForPlace, type ViatorMatchMarket } from "@/data/viator-market-match";
import type { Destination } from "@/data/types";
import { wacoViatorAttractionForSlug } from "@/data/waco-viator-attraction-links";
import { WacoViatorExperienceCards } from "@/components/monetization/WacoViatorExperienceCards";
import { trackAffiliateClick } from "@/lib/affiliate-click";
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

function WmaHuntingLinks() {
  return (
    <nav aria-label="Hunting guides for this Wildlife Management Area" className="mt-8 border-t border-border pt-6">
      <p className="eyebrow text-primary">Plan a public hunt</p>
      <div className="mt-4 flex flex-wrap gap-x-7 gap-y-3">
        <a href="/hunting/public-hunting" className="eyebrow border-b border-primary pb-1 text-primary">Texas public hunting →</a>
        <a href="/hunting/annual-public-hunting-permit" className="eyebrow border-b border-primary pb-1 text-primary">Annual Public Hunting Permit →</a>
        <a href="/hunting/drawn-hunts" className="eyebrow border-b border-primary pb-1 text-primary">Texas drawn hunts →</a>
      </div>
    </nav>
  );
}

export function DestinationViatorBooking({ destination }: { destination: Destination }) {
  const market = matchDestinationMarket(destination);
  const huntingLinks = destination.id.startsWith("texas-wma-") ? <WmaHuntingLinks /> : null;
  // Citywide commercial tours should never appear to sell entry to a closed
  // archaeological or state historic site. They also do not belong on a free
  // NPS memorial when no site-specific bookable product exists.
  if (["chamizal-national-memorial", "old-socorro-mission", "first-capitol-of-texas"].includes(destination.slug)) return null;
  if (!market) return huntingLinks;

  const hasDedicatedInventory = hasVerifiedViatorMarketUrl(market.slug);
  if (!hasDedicatedInventory) return huntingLinks;

  const runtimeMarket = viatorRuntimeMarketForSlug(market.slug);
  const href = buildViatorAffiliateUrl(verifiedViatorMarketUrl(market.slug), `texasdefined-destination-${destination.slug}`);
  const commercialPlacement = `viator-destination-${destination.slug}`;
  const wacoAttraction = wacoViatorAttractionForSlug(destination.slug);
  const attractionPlacement = `viator-attraction-${destination.slug}`;
  const attractionLabel = `Read Viator's ${wacoAttraction?.name ?? destination.name} attraction overview`;
  const ctaLabel = `See current experiences near ${destination.name}`;

  return <>
    <section className="mt-10 border border-border bg-surface p-6 sm:p-7" aria-labelledby={`viator-${destination.slug}`}>
      <p className="eyebrow text-primary">Tours & bookable experiences</p>
      <h3 id={`viator-${destination.slug}`} className="mt-2 font-display text-3xl leading-tight">Tours and experiences near {destination.name}</h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">TexasDefined handles the destination planning. Viator can be useful for guided tours, tickets and organized activities near {destination.nearestTown}. Availability changes, so the booking link checks current inventory rather than promising a specific product.</p>
      {runtimeMarket?.signalLanes?.length ? <p className="mt-3 text-sm leading-6 text-muted-foreground"><strong className="font-semibold text-foreground">Recent {runtimeMarket.name} inventory signals:</strong> {runtimeMarket.signalLanes.join(" · ")}. Reviewed <time dateTime={VIATOR_RUNTIME_SIGNAL_REVIEWED_AT}>September 8, 2026</time>; exact products and availability can change.</p> : null}
      <div className="mt-5 flex flex-wrap items-center gap-4">
        <a
          href={href}
          target="_blank"
          rel="sponsored nofollow noopener noreferrer"
          data-affiliate-partner="viator"
          data-affiliate-placement={commercialPlacement}
          data-commercial-partner="viator"
          data-commercial-placement={commercialPlacement}
          onClick={() => trackAffiliateClick({ partner: "viator", label: ctaLabel, placement: commercialPlacement, module: "experiences" })}
          className="inline-flex items-center bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >{ctaLabel} ↗</a>
        {wacoAttraction ? (
          <a href={buildViatorAffiliateUrl(wacoAttraction.viatorUrl, attractionPlacement)}
            target="_blank" rel="sponsored nofollow noopener noreferrer"
            data-affiliate-partner="viator" data-affiliate-placement={attractionPlacement}
            data-commercial-partner="viator" data-commercial-placement={attractionPlacement}
            onClick={() => trackAffiliateClick({ partner: "viator", label: attractionLabel, placement: attractionPlacement, module: "experiences" })}
            className="text-sm font-semibold text-primary underline decoration-primary/40 underline-offset-4">
            {attractionLabel} ↗
          </a>
        ) : null}
        <a href="/explore#tours-experiences" className="text-sm font-semibold text-primary underline decoration-primary/40 underline-offset-4">Explore Texas experience markets →</a>
      </div>
      {wacoAttraction ? <p className="mt-3 text-sm leading-6 text-muted-foreground">The linked Viator attraction overview is not an admission ticket or a confirmed guided tour. Check the operator’s official site for entry rules and actual tickets; browse Viator for independently bookable Waco experiences.</p> : null}
      <p className="mt-4 text-xs leading-5 text-muted-foreground">Affiliate disclosure: TexasDefined may earn a commission from qualifying Viator bookings, at no additional cost to you.</p>
    </section>
    {["dr-pepper-museum-waco", "waco-suspension-bridge", "magnolia-market-at-the-silos"].includes(destination.slug) ? (
      <div className="mt-6">
        <WacoViatorExperienceCards kind="ghost" title="Book a Waco ghost or historic downtown walking experience" showDetails={false} />
        <p className="mt-3 text-sm"><a className="font-semibold text-primary underline underline-offset-4" href="/waco-ghost-tours">Compare guided and self-guided ghost tours in our Waco planning guide →</a></p>
      </div>
    ) : null}
    {wacoAttraction ? (
      <nav aria-label="Related Waco experience guides" className="mt-6 flex flex-wrap gap-5 text-sm">
        <a href="/waco-ghost-tours" className="font-semibold text-primary underline underline-offset-4">Waco ghost-tour comparison →</a>
        <a href="/dallas-to-waco-magnolia-tours" className="font-semibold text-primary underline underline-offset-4">Dallas-to-Waco guided day trip →</a>
      </nav>
    ) : null}
    {huntingLinks}
  </>;
}
