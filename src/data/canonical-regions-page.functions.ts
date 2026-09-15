import { createServerFn } from "@tanstack/react-start";

const loadCanonicalRegionsIndex = createServerFn({ method: "GET" }).handler(async () => {
  const { loadCanonicalRegionsIndexServer } = await import("./canonical-regions-page.server");
  return loadCanonicalRegionsIndexServer();
});

const loadCanonicalRegionPage = createServerFn({ method: "GET" })
  .inputValidator((data: { region: string }) => ({ region: String(data.region ?? "").trim() }))
  .handler(async ({ data }) => {
    const { loadCanonicalRegionPageServer } = await import("./canonical-regions-page.server");
    return loadCanonicalRegionPageServer(data.region);
  });

export function getCanonicalRegionsIndexData() {
  return loadCanonicalRegionsIndex();
}

export function getCanonicalRegionPageData(region: string) {
  return loadCanonicalRegionPage({ data: { region } });
}
