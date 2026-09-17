const KEEP_TX_RED_ORIGIN = "https://keeptxred.com";
const SEARCH_ENDPOINT = `${KEEP_TX_RED_ORIGIN}/api/public/texasdefined-government-search`;
const FETCH_TIMEOUT_MS = 3_000;
const MAX_SOURCES = 8;

export type KeepTxRedGovernmentSource = {
  id: string;
  kind: "representative" | "bill" | "committee" | "candidate" | "race" | "poll" | "article" | "government-hub";
  title: string;
  summary: string;
  url: string;
  sourceUrl: string | null;
  dataAsOf: string | null;
  factuality: "government-record" | "election-record" | "poll" | "news-report" | "reference";
};

function safeKtrUrl(value: unknown) {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return null;
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    return host === "keeptxred.com" ? url.toString() : null;
  } catch {
    return null;
  }
}

function safeHttpsUrl(value: unknown) {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function cleanText(value: unknown, max: number) {
  return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, max);
}

function asSource(value: unknown): KeepTxRedGovernmentSource | null {
  if (typeof value !== "object" || value === null) return null;
  const record = value as Record<string, unknown>;
  const url = safeKtrUrl(record.url);
  const title = cleanText(record.title, 220);
  const summary = cleanText(record.summary, 600);
  const allowedKinds = new Set(["representative", "bill", "committee", "candidate", "race", "poll", "article", "government-hub"]);
  const allowedFactuality = new Set(["government-record", "election-record", "poll", "news-report", "reference"]);
  const kind = String(record.kind ?? "");
  const factuality = String(record.factuality ?? "");
  if (!url || !title || !summary || !allowedKinds.has(kind) || !allowedFactuality.has(factuality)) return null;

  return {
    id: cleanText(record.id, 180) || `${kind}:${title}`,
    kind: kind as KeepTxRedGovernmentSource["kind"],
    title,
    summary,
    url,
    sourceUrl: safeHttpsUrl(record.sourceUrl),
    dataAsOf: typeof record.dataAsOf === "string" ? record.dataAsOf.slice(0, 80) : null,
    factuality: factuality as KeepTxRedGovernmentSource["factuality"],
  };
}

export async function searchKeepTxRedGovernment(question: string): Promise<KeepTxRedGovernmentSource[]> {
  const normalized = question.trim().slice(0, 300);
  if (normalized.length < 2) return [];

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const url = new URL(SEARCH_ENDPOINT);
    url.searchParams.set("q", normalized);
    url.searchParams.set("limit", String(MAX_SOURCES));
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        "User-Agent": "TexasDefinedAI/1.0 (+https://texasdefined.com/ask-texas)",
      },
    });
    if (!response.ok) return [];
    const payload = await response.json() as { ok?: unknown; results?: unknown };
    if (payload.ok !== true || !Array.isArray(payload.results)) return [];
    return payload.results.map(asSource).filter((source): source is KeepTxRedGovernmentSource => Boolean(source)).slice(0, MAX_SOURCES);
  } catch {
    return [];
  } finally {
    clearTimeout(timer);
  }
}

export function buildKeepTxRedGovernmentContext(sources: KeepTxRedGovernmentSource[]) {
  if (!sources.length) return "No matching Keep TX Red government/public-affairs source was retrieved.";
  return sources.map((source, index) => [
    `[K${index + 1}] ${source.title}`,
    `Keep TX Red URL: ${source.url}`,
    `Record type: ${source.kind}`,
    `Evidence class: ${source.factuality}`,
    source.dataAsOf ? `Data as of: ${source.dataAsOf}` : null,
    source.sourceUrl ? `Primary/official source: ${source.sourceUrl}` : null,
    `Summary: ${source.summary}`,
  ].filter(Boolean).join("\n")).join("\n\n");
}
