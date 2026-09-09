import { CITYPASS_AFFILIATE_URLS, CITYPASS_GUIDE_PATH, type CityPassMarket } from "@/data/citypass";

const COPY: Record<CityPassMarket, { heading: string; body: string }> = {
  Dallas: {
    heading: "Planning several Dallas attractions?",
    body: "Dallas CityPASS® can bundle admission to four attractions from the current Dallas lineup. If several participating stops are already on your itinerary, compare the pass with the individual tickets you would otherwise buy and check reservation rules before purchase.",
  },
  Houston: {
    heading: "Seeing several Houston attractions?",
    body: "Houston CityPASS® can bundle admission to five attractions from the current Houston lineup. If several participating stops are already on your itinerary, compare the pass with buying each admission separately before you book.",
  },
  "San Antonio": {
    heading: "Building a San Antonio attraction weekend?",
    body: "San Antonio CityPASS® can bundle admission to four attractions from the current San Antonio lineup. It can be useful when your trip already includes several participating stops, but compare the pass with individual admission prices before you buy.",
  },
};

export function CityPassCalloutContent({ market, placement = "inline" }: { market: CityPassMarket; placement?: "inline" | "rail" }) {
  const isRail = placement === "rail";
  const copy = COPY[market];

  return (
    <aside className={`${isRail ? "border border-border bg-surface p-5" : "mt-12 border-y border-border bg-surface/55 py-8 sm:px-7 sm:py-10"}`} aria-label={`${market} CityPASS trip-planning option`}>
      <p className="eyebrow text-primary">Multi-attraction trip planning</p>
      <h2 className={`${isRail ? "mt-2 text-2xl" : "mt-3 text-3xl"} font-display leading-tight`}>{copy.heading}</h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy.body}</p>
      <div className={`${isRail ? "mt-5 grid gap-3" : "mt-6 flex flex-wrap gap-x-6 gap-y-3"} text-sm font-semibold`}>
        <a href={CITYPASS_GUIDE_PATH} className="border-b border-primary pb-1 text-primary">Read our Texas CityPASS® guide →</a>
        <a href={CITYPASS_AFFILIATE_URLS[market]} target="_blank" rel="sponsored nofollow noopener noreferrer" className="border-b border-primary pb-1 text-primary">Check current CityPASS® options ↗</a>
      </div>
      <p className="mt-5 text-xs leading-6 text-muted-foreground">Affiliate disclosure: TexasDefined may earn a commission from qualifying CityPASS® purchases, at no additional cost to you. Attraction lineups, reservation rules, prices and savings can change.</p>
    </aside>
  );
}
