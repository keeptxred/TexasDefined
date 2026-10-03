import { CITYPASS_AFFILIATE_URLS, CITYPASS_GUIDE_PATH, type CityPassMarket } from "@/data/citypass";
import { trackAffiliateClick } from "@/lib/affiliate-click";

const COPY: Record<CityPassMarket, { heading: string; body: string }> = {
  Dallas: {
    heading: "Planning several Dallas attractions?",
    body: "Dallas CityPASS® covers four attractions. Compare its price with the admissions you would buy and check reservation rules.",
  },
  Houston: {
    heading: "Seeing several Houston attractions?",
    body: "Houston CityPASS® covers five attractions. Compare its price with the admissions you would buy and any discounts you qualify for.",
  },
  "San Antonio": {
    heading: "Building a San Antonio attraction weekend?",
    body: "San Antonio CityPASS® covers four attractions. Compare its price with the admissions you would buy; reserve the Alamo separately if needed.",
  },
};

export function CityPassCalloutContent({ market, placement = "inline", showGuideLink = true }: { market: CityPassMarket; placement?: "inline" | "rail"; showGuideLink?: boolean }) {
  const isRail = placement === "rail";
  const copy = COPY[market];
  const commercialPlacement = `citypass-${market.toLowerCase().replace(/\s+/g, "-")}-${placement}`;
  const ctaLabel = `Check current ${market} CityPASS price`;

  return (
    <aside className={`${isRail ? "border border-border bg-surface p-5" : "mt-12 border-y border-border bg-surface/55 py-8 sm:px-7 sm:py-10"}`} aria-label={`${market} CityPASS trip-planning option`}>
      <p className="eyebrow text-primary">Multi-attraction trip planning</p>
      <h2 className={`${isRail ? "mt-2 text-2xl" : "mt-3 text-3xl"} font-display leading-tight`}>{copy.heading}</h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy.body}</p>
      <div className={`${isRail ? "mt-5 grid gap-3" : "mt-6 flex flex-wrap gap-x-6 gap-y-3"} text-sm font-semibold`}>
        {showGuideLink ? <a href={CITYPASS_GUIDE_PATH} className="border-b border-primary pb-1 text-primary">Read our Texas CityPASS® guide →</a> : null}
        <a
          href={CITYPASS_AFFILIATE_URLS[market]}
          target="_blank"
          rel="sponsored nofollow noopener noreferrer"
          data-affiliate-partner="citypass"
          data-affiliate-placement={commercialPlacement}
          data-commercial-partner="citypass"
          data-commercial-placement={commercialPlacement}
          onClick={() => trackAffiliateClick({ partner: "citypass", label: ctaLabel, placement: commercialPlacement, module: "citypass" })}
          className="border-b border-primary pb-1 text-primary"
        >Check current {market} CityPASS® price ↗</a>
      </div>
      <p className="mt-5 text-xs leading-6 text-muted-foreground">Affiliate disclosure: TexasDefined may earn a commission from qualifying CityPASS® purchases, at no additional cost to you. Attraction lineups, reservation rules, prices and savings can change.</p>
    </aside>
  );
}
