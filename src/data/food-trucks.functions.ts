import { createServerFn } from "@tanstack/react-start";

import type { FoodTruckMarketSlug } from "./food-truck-markets";

export type FoodTruckListRecord = {
  id: string;
  slug: string;
  name: string;
  marketSlug: FoodTruckMarketSlug;
  city: string;
  region: string;
  sourceUrl: string;
  sourceLabel: string;
  sourceCheckedAt: string;
  sourceType: "discovery" | "editorial";
};

export type FoodTruckOverviewMarket = {
  slug: FoodTruckMarketSlug;
  count: number;
  sampleNames: string[];
};

const loadFoodTruckOverviewServerFn = createServerFn({ method: "GET" }).handler(async () => {
  const { FOOD_TRUCK_MARKETS, FOOD_TRUCK_TOTAL, foodTrucksForMarket } = await import("./food-trucks");
  return {
    total: FOOD_TRUCK_TOTAL,
    markets: FOOD_TRUCK_MARKETS.map((market) => {
      const trucks = foodTrucksForMarket(market.slug);
      return {
        slug: market.slug,
        count: trucks.length,
        sampleNames: trucks.slice(0, 4).map((truck) => truck.name),
      };
    }),
  };
});

const loadFoodTruckMarketServerFn = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => ({ slug: String(data.slug ?? "").trim().toLowerCase() }))
  .handler(async ({ data }) => {
    const { foodTruckMarket, foodTrucksForMarket } = await import("./food-trucks");
    const market = foodTruckMarket(data.slug);
    if (!market) return null;
    return foodTrucksForMarket(market.slug) as FoodTruckListRecord[];
  });

export function getFoodTruckOverview(): Promise<{ total: number; markets: FoodTruckOverviewMarket[] }> {
  return loadFoodTruckOverviewServerFn();
}

export function getFoodTrucksForMarket(slug: FoodTruckMarketSlug): Promise<FoodTruckListRecord[] | null> {
  return loadFoodTruckMarketServerFn({ data: { slug } });
}
