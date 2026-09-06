import { createServerFn } from "@tanstack/react-start";

export const getTexasFoodHistoryHeadData = createServerFn({ method: "GET" }).handler(async () => {
  const { loadTexasFoodHistoryHeadDataServer } = await import("./food-history-page-data.server");
  return loadTexasFoodHistoryHeadDataServer();
});
