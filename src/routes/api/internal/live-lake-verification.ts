import { createFileRoute } from "@tanstack/react-router";

const REPOSITORY = "keeptxred/TexasDefined";
const WORKFLOW_NAME = "Verify live lake levels in production";
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

function bearerToken(request: Request): string | null {
  const value = request.headers.get("authorization") ?? "";
  return value.match(/^Bearer\s+(.+)$/i)?.[1]?.trim() || null;
}

async function authorizeWorkflowRequest(request: Request): Promise<boolean> {
  const token = bearerToken(request);
  const runId = request.headers.get("x-github-run-id")?.trim();
  if (!token || !runId || !/^\d+$/.test(runId)) return false;

  try {
    const response = await fetch(`https://api.github.com/repos/${REPOSITORY}/actions/runs/${runId}`, {
      cache: "no-store",
      headers: {
        accept: "application/vnd.github+json",
        authorization: `Bearer ${token}`,
        "user-agent": "TexasDefined-Live-Lake-Verification/1.0",
        "x-github-api-version": "2022-11-28",
      },
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) return false;
    const payload = (await response.json()) as {
      name?: string;
      event?: string;
      repository?: { full_name?: string };
    };
    return (
      payload.repository?.full_name === REPOSITORY &&
      payload.name === WORKFLOW_NAME &&
      (payload.event === "workflow_run" || payload.event === "workflow_dispatch")
    );
  } catch {
    return false;
  }
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

export const Route = createFileRoute("/api/internal/live-lake-verification")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!(await authorizeWorkflowRequest(request))) {
          return Response.json({ ok: false, error: "Unauthorized" }, { status: 401, headers: { "cache-control": "no-store" } });
        }

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
