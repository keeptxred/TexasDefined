import { createFileRoute } from "@tanstack/react-router";

const RECENT_URL = "https://waterdatafortexas.org/reservoirs/recent-conditions.json";
const CONROE_URL = "https://www.waterdatafortexas.org/reservoirs/individual/conroe";
const BROWSER_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36";

function requestHeaders(accept: string) {
  return {
    accept,
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    pragma: "no-cache",
    referer: "https://waterdatafortexas.org/reservoirs/statewide",
    "user-agent": BROWSER_USER_AGENT,
  };
}

async function probe(url: string, accept: string) {
  const started = Date.now();
  try {
    const response = await fetch(url, {
      cache: "no-store",
      redirect: "follow",
      headers: requestHeaders(accept),
      signal: AbortSignal.timeout(10_000),
    });
    const text = await response.text();
    return {
      ok: response.ok,
      status: response.status,
      contentType: response.headers.get("content-type"),
      contentLength: text.length,
      elapsedMs: Date.now() - started,
      prefix: text.slice(0, 120),
    };
  } catch (error) {
    return {
      ok: false,
      status: null,
      contentType: null,
      contentLength: 0,
      elapsedMs: Date.now() - started,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

export const Route = createFileRoute("/api/public/live-lake-diagnostic")({
  server: {
    handlers: {
      GET: async () => {
        const [
          { loadLiveLakeLevelResilient },
          { getLiveLakeLevel },
          { getLakeConroePageData },
          { getShowcaseLakesPageData },
          recent,
          csv,
          html,
        ] = await Promise.all([
          import("@/data/fishing/live-lake-level-fetch.server"),
          import("@/data/fishing/live-lake-level.functions"),
          import("@/data/fishing/lake-conroe-page-data.functions"),
          import("@/data/fishing/showcase-lakes-page-data.functions"),
          probe(RECENT_URL, "application/json,text/plain;q=0.9,*/*;q=0.1"),
          probe(`${CONROE_URL}-30day.csv`, "text/csv,text/plain;q=0.9,*/*;q=0.1"),
          probe(CONROE_URL, "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"),
        ]);

        const [snapshot, serverFnSnapshot, conroePageData, showcasePageData] = await Promise.all([
          loadLiveLakeLevelResilient(CONROE_URL),
          getLiveLakeLevel({ data: { sourceUrl: CONROE_URL } }).catch(() => null),
          getLakeConroePageData().catch(() => null),
          getShowcaseLakesPageData().catch(() => null),
        ]);

        const showcaseSnapshots = showcasePageData
          ? Object.fromEntries(
              Object.entries(showcasePageData).map(([slug, lake]) => [slug, lake.liveLakeLevel ?? null]),
            )
          : null;

        return Response.json(
          {
            ok: Boolean(snapshot),
            checkedAt: new Date().toISOString(),
            runtime: "TexasDefined production worker",
            probes: { recent, csv, html },
            conroeSnapshot: snapshot,
            conroeServerFnSnapshot: serverFnSnapshot,
            conroePageDataSnapshot: conroePageData?.liveLakeLevel ?? null,
            showcasePageDataSnapshots: showcaseSnapshots,
          },
          { headers: { "cache-control": "no-store" } },
        );
      },
    },
  },
});
