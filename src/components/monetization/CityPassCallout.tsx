const CITYPASS_AFFILIATE_URL = "https://www.anrdoezrs.net/click-101876465-11436795";
const CITYPASS_GUIDE_PATH = "/guides/citypass-texas";

export type CityPassMarket = "Dallas" | "Houston" | "San Antonio";

const DESTINATION_MARKETS: Readonly<Record<string, CityPassMarket>> = {
  "perot-museum-of-nature-and-science": "Dallas",
  "reunion-tower-dallas": "Dallas",
  "dallas-zoo": "Dallas",
  "george-w-bush-presidential-museum-dallas": "Dallas",
  "dallas-holocaust-human-rights-museum": "Dallas",
  "space-center-houston": "Houston",
  "houston-zoo": "Houston",
  "downtown-aquarium-houston": "Houston",
  "houston-museum-of-natural-science": "Houston",
  "kemah-boardwalk": "Houston",
  "childrens-museum-houston": "Houston",
  "museum-of-fine-arts-houston": "Houston",
  "go-rio-san-antonio-river-cruises": "San Antonio",
  "san-antonio-zoo": "San Antonio",
  "tower-of-the-americas": "San Antonio",
  "the-alamo": "San Antonio",
  "san-antonio-botanical-garden": "San Antonio",
  "witte-museum": "San Antonio",
  "the-doseum": "San Antonio",
  "san-antonio-museum-of-art": "San Antonio",
};

const CITY_MARKETS: Readonly<Record<string, CityPassMarket>> = {
  dallas: "Dallas",
  houston: "Houston",
  "san-antonio": "San Antonio",
};

const SPORTS_VENUE_MARKETS: Readonly<Record<string, CityPassMarket>> = {
  "att-stadium": "Dallas",
};

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

export function cityPassMarketForDestinationSlug(slug: string): CityPassMarket | null {
  return DESTINATION_MARKETS[slug] ?? null;
}

export function cityPassMarketForCitySlug(slug: string): CityPassMarket | null {
  return CITY_MARKETS[slug] ?? null;
}

export function cityPassMarketForSportsVenueSlug(slug: string): CityPassMarket | null {
  return SPORTS_VENUE_MARKETS[slug] ?? null;
}

export function CityPassCallout({ market, placement = "inline" }: { market: CityPassMarket; placement?: "inline" | "rail" }) {
  const isRail = placement === "rail";
  const copy = COPY[market];

  return (
    <aside className={`${isRail ? "border border-border bg-surface p-5" : "mt-12 border-y border-border bg-surface/55 py-8 sm:px-7 sm:py-9"}`} aria-label={`${market} CityPASS trip-planning option`}>
      <p className="eyebrow text-primary">Multi-attraction trip planning</p>
      <h2 className={`${isRail ? "mt-2 text-2xl" : "mt-3 text-3xl"} font-display leading-tight`}>{copy.heading}</h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy.body}</p>
      <div className={`${isRail ? "mt-5 grid gap-3" : "mt-6 flex flex-wrap gap-x-6 gap-y-3"} text-sm font-semibold`}>
        <a href={CITYPASS_GUIDE_PATH} className="border-b border-primary pb-1 text-primary">Read our Texas CityPASS® guide →</a>
        <a href={CITYPASS_AFFILIATE_URL} target="_blank" rel="sponsored nofollow noopener noreferrer" className="border-b border-primary pb-1 text-primary">Check current CityPASS® options ↗</a>
      </div>
      <p className="mt-5 text-xs leading-6 text-muted-foreground">Affiliate disclosure: TexasDefined may earn a commission from qualifying CityPASS® purchases, at no additional cost to you. Attraction lineups, reservation rules, prices and savings can change.</p>
    </aside>
  );
}
