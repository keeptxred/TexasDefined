const ANALYTICS_API_PATH = "/api/analytics";
const SITE_ORIGIN = "https://texasdefined.com";
const MAX_REQUEST_BYTES = 65_536;
const MAX_BATCH_EVENTS = 50;

const OUTCOME_EVENTS = new Set([
  "resource_found",
  "resource_opened",
  "calculator_started",
  "calculator_completed",
  "journey_started",
  "journey_step_completed",
  "journey_completed",
  "official_resource_visited",
  "next_step_selected",
  "partner_referral_clicked",
  "search_submitted",
  "assistant_submitted",
  "resource_saved",
  "internal_link_shown",
  "internal_link_clicked",
  "ai_referral_visit",
]);

type AnalyticsDataset = {
  writeDataPoint: (input: { blobs?: string[]; doubles?: number[]; indexes?: string[] }) => void;
};

type OutcomeEvent = {
  event: string;
  resourceId?: string;
  journeyId?: string;
  stepId?: string;
  query?: string;
  destination?: string;
  entityKind?: string;
  score?: number;
  sourcePlatform?: string;
  referrerHost?: string;
  detection?: string;
  occurredAt?: string;
  path?: string;
  sessionId?: string;
};

function analyticsDataset(env: unknown): AnalyticsDataset | null {
  if (typeof env !== "object" || env === null) return null;
  const value = Reflect.get(env, "TEXAS_DEFINED_OUTCOME_ANALYTICS");
  if (typeof value !== "object" || value === null) return null;
  return typeof Reflect.get(value, "writeDataPoint") === "function" ? value as AnalyticsDataset : null;
}

function jsonResponse(body: unknown, status = 200, allow?: string) {
  const headers = new Headers({
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8",
    "X-Content-Type-Options": "nosniff",
  });
  if (allow) headers.set("Allow", allow);
  return Response.json(body, { status, headers });
}

function sameOriginRequest(request: Request) {
  const requestUrl = new URL(request.url);
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      const originUrl = new URL(origin);
      return originUrl.protocol === requestUrl.protocol && originUrl.host === requestUrl.host;
    } catch {
      return false;
    }
  }

  if (request.headers.get("sec-fetch-site") !== "same-origin") return false;
  const referrer = request.headers.get("referer");
  if (!referrer) return false;
  try {
    const referrerUrl = new URL(referrer);
    return referrerUrl.protocol === requestUrl.protocol && referrerUrl.host === requestUrl.host;
  } catch {
    return false;
  }
}

function cleanString(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function sanitizeQuery(value: unknown) {
  return cleanString(value, 800)
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[email]")
    .replace(/\b(?:\+?1[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)\d{3}[-.\s]?\d{4}\b/g, "[phone]")
    .replace(/\b\d{1,6}\s+[A-Za-z0-9.'-]+(?:\s+[A-Za-z0-9.'-]+){0,4}\s+(?:st|street|rd|road|ave|avenue|blvd|boulevard|ln|lane|dr|drive|ct|court|way)\b/gi, "[address]")
    .slice(0, 600);
}

function sanitizePath(value: unknown) {
  const raw = cleanString(value, 1_500);
  if (!raw) return "";
  try {
    const parsed = new URL(raw, SITE_ORIGIN);
    if (parsed.origin !== SITE_ORIGIN) return "";
    return parsed.pathname.slice(0, 600) || "/";
  } catch {
    return "";
  }
}

function sanitizeDestination(value: unknown) {
  const raw = cleanString(value, 2_500);
  if (!raw) return "";
  try {
    const parsed = new URL(raw, SITE_ORIGIN);
    if (parsed.origin === SITE_ORIGIN) return `${parsed.pathname}${parsed.search}`.slice(0, 1_800);
    if (parsed.protocol !== "https:") return "";
    parsed.username = "";
    parsed.password = "";
    parsed.hash = "";
    return parsed.toString().slice(0, 1_800);
  } catch {
    return "";
  }
}

function sanitizeOccurredAt(value: unknown) {
  const raw = cleanString(value, 64);
  if (!raw) return "";
  const timestamp = Date.parse(raw);
  return Number.isFinite(timestamp) ? new Date(timestamp).toISOString() : "";
}

function numericScore(value: unknown) {
  const score = Number(value);
  if (!Number.isFinite(score)) return 0;
  return Math.max(-1_000_000, Math.min(1_000_000, score));
}

function analyticsIndex(event: string, resourceId: string, entityKind: string) {
  const suffix = resourceId || entityKind || "site";
  return `${event}:${suffix}`
    .toLowerCase()
    .replace(/[^a-z0-9:._-]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 90);
}

function normalizeEvent(value: unknown): OutcomeEvent | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return null;
  const event = cleanString(Reflect.get(value, "event"), 80);
  if (!OUTCOME_EVENTS.has(event)) return null;
  return {
    event,
    resourceId: cleanString(Reflect.get(value, "resourceId"), 240),
    journeyId: cleanString(Reflect.get(value, "journeyId"), 240),
    stepId: cleanString(Reflect.get(value, "stepId"), 240),
    query: sanitizeQuery(Reflect.get(value, "query")),
    destination: sanitizeDestination(Reflect.get(value, "destination")),
    entityKind: cleanString(Reflect.get(value, "entityKind"), 160),
    score: numericScore(Reflect.get(value, "score")),
    sourcePlatform: cleanString(Reflect.get(value, "sourcePlatform"), 120),
    referrerHost: cleanString(Reflect.get(value, "referrerHost"), 240),
    detection: cleanString(Reflect.get(value, "detection"), 120),
    occurredAt: sanitizeOccurredAt(Reflect.get(value, "occurredAt")),
    path: sanitizePath(Reflect.get(value, "path")),
  };
}

function writeEvent(dataset: AnalyticsDataset, event: OutcomeEvent) {
  const resourceId = event.resourceId || "";
  const entityKind = event.entityKind || "";
  dataset.writeDataPoint({
    blobs: [
      event.event,
      resourceId,
      event.journeyId || "",
      event.stepId || "",
      event.query || "",
      event.destination || "",
      entityKind,
      event.sourcePlatform || "",
      event.referrerHost || "",
      event.detection || "",
      event.path || "",
      event.occurredAt || "",
    ],
    doubles: [1, event.score || 0],
    indexes: [analyticsIndex(event.event, resourceId, entityKind)],
  });
}

export async function texasDefinedOutcomeAnalyticsResponse(request: Request, env: unknown): Promise<Response | null> {
  const url = new URL(request.url);
  if (url.pathname !== ANALYTICS_API_PATH) return null;

  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed." }, 405, "POST");
  if (!sameOriginRequest(request)) return jsonResponse({ error: "Same-origin analytics requests only." }, 403);
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return jsonResponse({ error: "Expected application/json." }, 415);
  }

  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_REQUEST_BYTES) {
    return jsonResponse({ error: "Analytics payload is too large." }, 413);
  }

  let text = "";
  try {
    text = await request.text();
  } catch {
    return jsonResponse({ error: "Unable to read analytics payload." }, 400);
  }
  if (new TextEncoder().encode(text).byteLength > MAX_REQUEST_BYTES) {
    return jsonResponse({ error: "Analytics payload is too large." }, 413);
  }

  let payload: unknown;
  try {
    payload = JSON.parse(text);
  } catch {
    return jsonResponse({ error: "Invalid JSON." }, 400);
  }

  const rawEvents = typeof payload === "object" && payload !== null && Array.isArray(Reflect.get(payload, "events"))
    ? Reflect.get(payload, "events") as unknown[]
    : [payload];
  if (rawEvents.length === 0 || rawEvents.length > MAX_BATCH_EVENTS) {
    return jsonResponse({ error: `Analytics batches must contain 1-${MAX_BATCH_EVENTS} events.` }, 400);
  }

  const events = rawEvents.map(normalizeEvent);
  const invalidIndex = events.findIndex((event) => event === null);
  if (invalidIndex >= 0) return jsonResponse({ error: `Invalid analytics event at index ${invalidIndex}.` }, 400);

  const dataset = analyticsDataset(env);
  if (!dataset) return jsonResponse({ error: "Analytics storage is unavailable." }, 503);

  try {
    for (const event of events as OutcomeEvent[]) writeEvent(dataset, event);
  } catch {
    return jsonResponse({ error: "Analytics storage write failed." }, 503);
  }

  // Browser session IDs are intentionally never persisted in Analytics Engine.
  return jsonResponse({ accepted: events.length }, 202);
}
