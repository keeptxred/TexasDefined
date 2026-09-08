const CITYPASS_AFFILIATE_URL = "https://www.anrdoezrs.net/click-101876465-11436795";
const CITYPASS_GUIDE_PATH = "/guides/citypass-texas";

export type CityPassMarket = "Houston" | "San Antonio";

const DESTINATION_MARKETS: Readonly<Record<string, CityPassMarket>> = {
  "space-center-houston": "Houston",
  "houston-zoo": "Houston",
  "downtown-aquarium-houston": "Houston",
  "houston-museum-of-natural-science": "Houston",
  "childrens-museum-houston": "Houston",
  "museum-of-fine-arts-houston": "Houston",
  "the-alamo": "San Antonio",
  "san-antonio-river-walk": "San Antonio",
  "san-antonio-zoo": "San Antonio",
  "san-antonio-museum-of-art": "San Antonio",
};

const CITY_MARKETS: Readonly<Record<string, CityPassMarket>> = {
  houston: "Houston",
  "san-antonio": "San Antonio",
};

export function cityPassMarketForDestinationSlug(slug: string): CityPassMarket | null {
  return DESTINATION_MARKETS[slug] ?? null;
}

export function cityPassMarketForCitySlug(slug: string): CityPassMarket | null {
  return CITY_MARKETS[slug] ?? null;
}

export function CityPassCallout({ market, placement = "inline" }: { market: CityPassMarket; placement?: "inline" | "rail" }) {
  const isRail = placement === "rail";
  const heading = market === "Houston" ? "Seeing several Houston attractions?" : "Building a San Antonio attraction weekend?";
  const body = market === "Houston"
    ? "Houston CityPASS® can bundle admission to a choice of major Houston attractions into one purchase. If several participating stops are already on your itinerary, compare the pass with buying each admission separately before you book."
    : "San Antonio CityPASS® can bundle admission to a choice of major San Antonio attractions into one purchase. It can be useful when your trip already includes several participating stops, but compare the pass with individual admission prices before you buy.";

  return (
    <aside className={`${isRail ? "border border-border bg-surface p-5" : "mt-12 border-y border-border bg-surface/55 py-8 sm:px-7 sm:py-9"}`} aria-label={`${market} CityPASS trip-planning option`}>
      <p className="eyebrow text-primary">Multi-attraction trip planning</p>
      <h2 className={`${isRail ? "mt-2 text-2xl" : "mt-3 text-3xl"} font-display leading-tight`}>{heading}</h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{body}</p>
      <div className={`${isRail ? "mt-5 grid gap-3" : "mt-6 flex flex-wrap gap-x-6 gap-y-3"} text-sm font-semibold`}>
        <a href={CITYPASS_GUIDE_PATH} className="border-b border-primary pb-1 text-primary">Read our Texas CityPASS® guide →</a>
        <a href={CITYPASS_AFFILIATE_URL} target="_blank" rel="sponsored nofollow noopener noreferrer" className="border-b border-primary pb-1 text-primary">Check current CityPASS® options ↗</a>
      </div>
      <p className="mt-5 text-xs leading-6 text-muted-foreground">Affiliate disclosure: TexasDefined may earn a commission from qualifying CityPASS® purchases, at no additional cost to you. Attraction lineups, reservation rules, prices and savings can change.</p>
    </aside>
  );
}
