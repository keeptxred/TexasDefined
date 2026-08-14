import { createServerFn } from "@tanstack/react-start";

export const getFishingPlannerData = createServerFn({ method: "GET" }).handler(async () => {
  const { loadFishingPlannerDataServer } = await import("./planner-data.server");
  return loadFishingPlannerDataServer();
});
