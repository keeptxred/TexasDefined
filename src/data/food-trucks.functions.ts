import { createServerFn } from "@tanstack/react-start";

export const getFoodTruckOverviewPageData = createServerFn({ method: "GET" }).handler(async () => {
  const { loadFoodTruckOverviewPageDataServer } = await import("./food-truck-page-data.server");
  return loadFoodTruckOverviewPageDataServer();
});

export const getFoodTruckMarketPageData = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => ({ slug: String(data.slug ?? "").trim().toLowerCase() }))
  .handler(async ({ data }) => {
    const { loadFoodTruckMarketPageDataServer } = await import("./food-truck-page-data.server");
    return loadFoodTruckMarketPageDataServer(data.slug);
  });
