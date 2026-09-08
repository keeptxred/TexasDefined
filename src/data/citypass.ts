export const CITYPASS_AFFILIATE_URL = "https://www.anrdoezrs.net/click-101876465-11436795";
export const CITYPASS_GUIDE_PATH = "/guides/citypass-texas";

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

export function cityPassMarketForDestinationSlug(slug: string): CityPassMarket | null {
  return DESTINATION_MARKETS[slug] ?? null;
}

export function cityPassMarketForCitySlug(slug: string): CityPassMarket | null {
  return CITY_MARKETS[slug] ?? null;
}

export function cityPassMarketForSportsVenueSlug(slug: string): CityPassMarket | null {
  return SPORTS_VENUE_MARKETS[slug] ?? null;
}
