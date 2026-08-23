import { createServerFn } from "@tanstack/react-start";
import { loadCountySeriesArticleServer } from "@/data/county-series.server";

export const loadCountySeriesArticleServerFn = createServerFn({ method: "GET" })
  .inputValidator((data: { countySlug: string }) => data)
  .handler(async ({ data }) => loadCountySeriesArticleServer(data.countySlug));
