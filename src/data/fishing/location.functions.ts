import { createServerFn } from "@tanstack/react-start";

export type FishingLocationRequest = { query: string };

const resolveFishingLocationServerFn = createServerFn({ method: "GET" })
  .inputValidator((data: FishingLocationRequest) => ({
    query: String(data.query ?? "").trim().slice(0, 100),
  }))
  .handler(async ({ data }) => {
    if (!data.query) return null;
    const { resolveFishingLocationServer } = await import("./location.server");
    return resolveFishingLocationServer(data.query);
  });

export function resolveFishingLocation(query: string) {
  return resolveFishingLocationServerFn({ data: { query } });
}
