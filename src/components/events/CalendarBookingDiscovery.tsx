import { useState } from "react";
import { VIATOR_RUNTIME_MARKETS } from "@/data/viator-experience-runtime";
import { buildViatorAffiliateUrl } from "@/lib/viator-affiliate";
import { verifiedViatorMarketUrl, hasVerifiedViatorMarketUrl } from "@/data/viator-destination-links";
import { trackAffiliateClick } from "@/lib/affiliate-click";
import { ViatorLiveProducts } from "@/components/editorial/ViatorLiveProducts";

const ALLOWED_MARKETS = ["houston","dallas","san-antonio","austin","galveston","fort-worth","fredericksburg","waco","corpus-christi","south-padre-island"] as const;
const MARKET_OPTIONS = ALLOWED_MARKETS.map((slug) => ({
  slug, label: VIATOR_RUNTIME_MARKETS.find((market) => market.slug === slug)?.name ?? slug,
})).filter(({slug}) => hasVerifiedViatorMarketUrl(slug));

/** Supplemental discovery, deliberately separate from independently scheduled events. */
export function CalendarBookingDiscovery({ christmas = false, city }: { christmas?: boolean; city?: string }) {
  const initial = MARKET_OPTIONS.find(({label}) => label.toLowerCase() === city?.toLowerCase())?.slug ?? "houston";
  const [market, setMarket] = useState<string>(initial);
  const [activeMarket, setActiveMarket] = useState<string>(initial);
  const [requestVersion, setRequestVersion] = useState(0);
  const display = MARKET_OPTIONS.find((option) => option.slug === activeMarket);
  const locationName = display?.label ?? "Texas";
  const marketplaceHref = buildViatorAffiliateUrl(verifiedViatorMarketUrl(activeMarket), `texasdefined-calendar-${christmas ? "christmas" : "experiences"}-${activeMarket}`);
  const placement = `viator-calendar-${christmas ? "christmas" : "experiences"}-${activeMarket}`;
  return <section className="border-t border-border bg-surface py-10" aria-labelledby="calendar-bookable-experiences">
    <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
      <p className="eyebrow text-primary">Separate from the event schedule · bookable experiences</p>
      <h2 id="calendar-bookable-experiences" className="mt-2 font-display text-3xl">
        {christmas ? "Christmas and holiday-themed tours near your Texas event" : "Tours and experiences near your Texas event"}
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
        The calendar above lists independently verified events with source-checked dates. Viator is a supplemental marketplace:
        these are separate tours and activities, not admission to the listed festival or evidence that an event occurs on your selected date.
        Always confirm the actual departure dates and details on Viator.
      </p>
      <div className="mt-5 flex flex-wrap items-end gap-3">
        <label className="text-sm font-semibold" htmlFor="calendar-viator-market">Look near
          <select id="calendar-viator-market" className="mt-2 block border border-border bg-background px-4 py-3 text-sm" value={market} onChange={(event) => setMarket(event.target.value)}>
            {MARKET_OPTIONS.map((option) => <option key={option.slug} value={option.slug}>{option.label}</option>)}
          </select>
        </label>
        <button type="button" className="border border-primary px-4 py-3 text-sm font-semibold text-primary" onClick={() => { setActiveMarket(market); setRequestVersion((value) => value + 1); }}>
          {christmas ? "Find seasonal tours" : "Find nearby tours"}
        </button>
        <a
          href={marketplaceHref}
          target="_blank"
          rel="sponsored nofollow noopener noreferrer"
          data-affiliate-partner="viator"
          data-affiliate-placement={placement}
          data-commercial-partner="viator"
          data-commercial-placement={placement}
          onClick={() => trackAffiliateClick({ partner:"viator", label:`Browse ${locationName} tours on Viator`, placement, module:"experiences" })}
          className="text-sm font-semibold text-primary underline"
        >Browse all {locationName} experiences on Viator ↗</a>
      </div>
      {requestVersion > 0 ? <ViatorLiveProducts key={`${activeMarket}-${requestVersion}-${christmas}`} marketSlug={activeMarket} placement={placement} mode="auto" feedKind={christmas ? "christmas" : "products"} /> : null}
      <p className="mt-4 text-xs text-muted-foreground">Affiliate disclosure: TexasDefined may earn a commission on qualifying Viator bookings, at no additional cost to you. Organizer-confirmed event dates and official booking links remain the authoritative event source.</p>
    </div>
  </section>;
}
