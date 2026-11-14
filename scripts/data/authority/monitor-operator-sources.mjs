import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import offers from "../../../src/data/authority/experience-offers.json" with { type: "json" };
import operators from "../../../src/data/authority/independent-operators.json" with { type: "json" };

const MAX_SOURCES = 24;
const MAX_BYTES = 850_000;
const TIMEOUT_MS = 12_000;

/** Dates refer to actual operator fact checks, never to the monitor's HTTP request. */
export function sourceIndex(offerRows, independentRows) {
  const indexed = new Map();
  for (const row of [...offerRows, ...independentRows]) {
    if (!row.sourceUrl?.startsWith("https://") || !/^\d{4}-\d{2}-\d{2}$/.test(row.checkedAt))
      throw new Error("Operator source lacks a direct HTTPS URL or checked date: " + (row.id ?? row.slug));
    const current = indexed.get(row.sourceUrl);
    if (!current || row.checkedAt < current.checkedAt)
      indexed.set(row.sourceUrl, { url: row.sourceUrl, checkedAt: row.checkedAt });
  }
  if (indexed.size > MAX_SOURCES) throw new Error("Operator-source monitor exceeds bounded scope: " + indexed.size);
  return [...indexed.values()].sort((a, b) => a.url.localeCompare(b.url));
}

/** Read the three already-approved attraction records directly; no duplicate fact dates. */
export function reviewedAttractionMonitorRows(sourceText) {
  const marker = "export const reviewedAttractionDestinations: Destination[] = ";
  const start = sourceText.indexOf(marker);
  if (start < 0) throw new Error("Reviewed attraction catalog export missing");
  const raw = sourceText.slice(start + marker.length).trim().replace(/;\s*$/, "");
  const records = JSON.parse(raw);
  const expected = [
    "san-antonio-japanese-tea-garden",
    "fort-worth-water-gardens",
    "houston-botanic-garden",
  ];
  if (!Array.isArray(records) || records.length !== expected.length ||
    expected.some((slug) => !records.some((item) => item.slug === slug))) {
    throw new Error("Reviewed attraction source-monitor inventory changed; review scope");
  }
  // Hours/tickets often live on the official visit page while the booking,
  // accessibility and age rules are on a separate official FAQ. Monitor both,
  // plus directly cited visitor-fact sources; never expand to unrelated hosts.
  return records.flatMap((item) => {
    const urls = new Set([
      item.officialUrl,
      ...(item.authorityGuide?.sources ?? []).map((row) => row.url),
      ...(item.visitorFaqs ?? []).map((row) => row.sourceUrl),
      ...(item.visitorFacts ?? []).map((row) => row.sourceUrl),
    ]);
    return [...urls].map((sourceUrl) => ({
      id: item.slug, sourceUrl, checkedAt: item.sourceCheckedAt,
    }));
  });
}

export function normalizedSourceFingerprint(html) {
  const text = html.replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<(script|style|noscript|svg)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/\s+/g, " ").trim();
  if (text.length < 180) throw new Error("Operator page has insufficient visible content");
  return createHash("sha256").update(text).digest("hex");
}

/** An unresolved content change remains open across subsequent unchanged checks. */
export function reconcile(previous, source, fingerprint, asOf) {
  if (!previous?.fingerprint) return {
    value: { fingerprint, firstObservedAt: asOf, lastObservedAt: asOf, pendingReviewSince: null },
    event: "BASELINE",
  };
  const changed = previous.fingerprint !== fingerprint;
  let pendingReviewSince = changed ? asOf : (previous.pendingReviewSince ?? null);
  if (!changed && pendingReviewSince && source.checkedAt > pendingReviewSince)
    pendingReviewSince = null;
  const value = {
    fingerprint,
    firstObservedAt: previous.firstObservedAt ?? asOf,
    lastObservedAt: asOf,
    pendingReviewSince,
  };
  return { value, event: changed ? "SOURCE_CHANGED" : pendingReviewSince ? "SOURCE_REVIEW" : "UNCHANGED" };
}

async function fetchFingerprint(url) {
  const response = await fetch(url, {
    headers: { Accept: "text/html,application/xhtml+xml" },
    redirect: "follow",
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!response.ok) throw new Error("HTTP " + response.status);
  if (!/text\/html|application\/xhtml\+xml/i.test(response.headers.get("content-type") ?? ""))
    throw new Error("Unexpected response content type");
  const declaredSize = Number(response.headers.get("content-length") ?? 0);
  if (declaredSize > MAX_BYTES) throw new Error("Operator page exceeds byte cap");
  const html = await response.text();
  if (Buffer.byteLength(html, "utf8") > MAX_BYTES) throw new Error("Operator page exceeds byte cap");
  return normalizedSourceFingerprint(html);
}

async function main() {
  const args = Object.fromEntries(process.argv.slice(2)
    .filter((a) => a.startsWith("--") && a.includes("="))
    .map((a) => { const idx = a.indexOf("="); return [a.slice(2, idx), a.slice(idx + 1)]; }));
  if (!args.output) throw new Error("--output=PATH is required");
  const previous = await readFile(args.baseline ?? "", "utf8").then(JSON.parse).catch((e) => {
    if (e.code === "ENOENT") return { sources: {} };
    throw e;
  });
  if (previous.version && previous.version !== 1)
    throw new Error("Unsupported operator source monitor baseline version");
  const asOf = new Date().toISOString().slice(0, 10);
  const reviewed = await readFile(new URL("../../../src/data/reviewed-attraction-authorities.ts", import.meta.url), "utf8");
  const sources = sourceIndex(offers, [...operators, ...reviewedAttractionMonitorRows(reviewed)]);
  const state = { version: 1, asOf, sources: {} };
  let alerts = 0;
  for (let i = 0; i < sources.length; i += 3) {
    const chunk = sources.slice(i, i + 3);
    const outcomes = await Promise.all(chunk.map(async (source) => {
      const last = previous.sources?.[source.url] ?? null;
      try {
        const digest = await fetchFingerprint(source.url);
        return { source, ...reconcile(last, source, digest, asOf) };
      } catch (error) {
        return { source, value: last, event: "SOURCE_UNAVAILABLE",
          reason: String(error instanceof Error ? error.message : error).slice(0, 140) };
      }
    }));
    for (const item of outcomes) {
      if (item.value) state.sources[item.source.url] = item.value;
      if (["SOURCE_CHANGED", "SOURCE_REVIEW", "SOURCE_UNAVAILABLE"].includes(item.event)) alerts += 1;
      console.log(item.event + " " + item.source.url +
        (item.reason ? " (" + item.reason + ")" : "") +
        (item.value?.pendingReviewSince ? " pending since " + item.value.pendingReviewSince : ""));
    }
  }
  await writeFile(args.output, JSON.stringify(state, null, 2) + "\n");
  console.log("Operator source monitor: " + sources.length + " distinct source URLs, " + alerts +
    " review flags. HTTP fingerprints are change signals, never proof of factual accuracy.");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href)
  main().catch((err) => { console.error(err); process.exitCode = 1; });
