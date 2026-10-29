#!/usr/bin/env node
// Focused observer for TexasDefined's existing Mardi Gras guide sources.
// This does NOT silently move occurrence dates, lift noindex, or infer permission.
import { appendFile, writeFile } from "node:fs/promises";

export const OFFICIAL_SOURCES = [
  {
    id: "oak-cliff-parade",
    eventSlug: "oak-cliff-mardi-gras-parade",
    identity: /Oak Cliff Mardi Gras Parade|Go Oak Cliff Mardi Gras/i,
    label: "Oak Cliff partner-confirmed parade",
    url: "https://www.dashforthebeads.org/the-race/",
    mode: "confirmed",
    required: [/February 7,\s*2027/i, /1(?::00)?\s*p\.?m\.?.{0,70}(?:Oak Cliff )?Mardi Gras Parade/i],
  },
  {
    id: "port-arthur-gate-hours",
    eventSlug: "mardi-gras-port-arthur",
    identity: /Mardi Gras Port Arthur/i,
    label: "Ben J. Rogers Regional Visitors Center — Port Arthur 2027 gate hours",
    url: "https://explorejeffersoncountytx.com/e/mardi-gras-port-arthur-2027-6aa92e29f4f53a064b18d211/",
    mode: "confirmed",
    // These are published *festival gate windows*, never independent parade start times.
    required: [
      /Mardi Gras Port Arthur 2027/i,
      /Friday\s+February\s+5th\s*[-–]\s*6\s*p\.?m\.?\s+to\s+11:30\s*p\.?m\.?/i,
      /Saturday\s+February\s+6th\s*[-–]\s*Noon\s*[-–]\s*11:30\s*p\.?m\.?/i,
      /Sunday\s+February\s+7th\s*[-–]\s*Noon\s*[-–]\s*7(?::00)?\s*p\.?m\.?/i,
    ],
  },
  {
    id: "orange-sabine",
    eventSlug: "mardi-gras-on-the-sabine-orange",
    identity: /Mardi Gras on the Sabine/i,
    label: "City of Orange — Mardi Gras on the Sabine",
    url: "https://orangetexas.gov/407/Mardi-Gras-on-the-Sabine",
    mode: "unannounced",
    pending: /information for the 2027 Mardi Gras on the Sabine will be updated at a later date/i,
    // The old pending notice may remain on the same page after a new 2027 date is posted.
    // Flag explicit month/date/2027 or numeric date formats instead of treating it as unchanged.
    announcement: /(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?)\.?\s+\d{1,2}(?:st|nd|rd|th)?(?:\s*[-–]\s*\d{1,2}(?:st|nd|rd|th)?)?,?\s*2027|\b(?:0?[1-3]\/\d{1,2}\/2027|2027-0[1-3]-\d{2})\b/i,
  },
  {
    id: "beaumont-festival",
    eventSlug: "mardi-gras-southeast-texas-beaumont",
    identity: /Mardi Gras(?: of)? Southeast Texas/i,
    label: "Mardi Gras of Southeast Texas — public festival (not Circle of Hope)",
    url: "https://mardigrastx.com/",
    mode: "unannounced",
    pending: /Feb\.?\s*13(?:th)?,?\s*14(?:th)?\s*&\s*15(?:th)?/i,
    announcement: /(?:Feb(?:ruary)?|Jan(?:uary)?|Mar(?:ch)?)\.?\s+\d{1,2}(?:st|nd|rd|th)?(?:\s*[-–]\s*\d{1,2}(?:st|nd|rd|th)?)?,?\s*2027/i,
  },
  {
    id: "mainland-texas-city",
    eventSlug: null, // The statewide pending list has no individual Texas City guide.
    identity: /Mainland Mardi Gras Parade/i,
    label: "City of Texas City — Mainland Mardi Gras Parade",
    url: "https://texascitytx.gov/906/Parades",
    mode: "unannounced",
    pending: /2026 Mainland Mardi Gras Parade Information/i,
    announcement: /2027 Mainland Mardi Gras Parade Information|Mainland Mardi Gras Parade(?:\s+Information)?\s*[-–:]?\s*2027/i,
  },
  {
    id: "bandera-specific",
    eventSlug: "cowboy-mardi-gras-bandera",
    identity: /Cowboy Mardi Gras/i,
    label: "Bandera tourism — detailed festival (January 28–31)",
    url: "https://www.banderacowboycapital.com/events/2026/cowboy-mardi-gras",
    mode: "confirmed",
    required: [/Jan(?:uary)?\.?\s*28\s*[-–]\s*Jan(?:uary)?\.?\s*31,?\s*2027/i, /parade on main street.{0,90}(?:Saturday|1\/30)/i],
  },
  {
    id: "bandera-general",
    eventSlug: "cowboy-mardi-gras-bandera",
    identity: /Cowboy Mardi Gras/i,
    label: "Bandera tourism — general save-the-date (January 28–30)",
    url: "https://www.banderacowboycapital.com/p/events/save-the-dates",
    mode: "confirmed",
    required: [/1\/28\s*[-–]\s*30\/2027\s*[-–]\s*Cowboy Mardi Gras/i],
  },
];

export function normalizeHtml(html) {
  return String(html).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&").replace(/&ndash;|&#8211;/gi, "–")
    .replace(/&mdash;|&#8212;/gi, "—")
    .replace(/&quot;/gi, '"').replace(/&#39;|&apos;/gi, "'")
    .replace(/\s+/g, " ").trim();
}

export function evaluateSource(source, html) {
  const text = normalizeHtml(html);
  if (text.length < 200) return { ok: false, reason: "too-short-or-challenge", excerpt: text.slice(0, 300) };
  // An official URL can redirect or return another organizer event without being an HTTP error.
  if (source.identity && !source.identity.test(text)) return { ok: false, reason: "wrong-event-or-source-identity", excerpt: text.slice(0, 300) };
  if (source.mode === "confirmed") {
    const failures = source.required.filter((r) => !r.test(text));
    return {
      ok: failures.length === 0,
      reason: failures.length ? "confirmed-date-or-schedule-discrepancy" : "confirmed-source-still-matches",
      observedValues: source.required.map((pattern) => text.match(pattern)?.[0]?.slice(0, 180)).filter(Boolean),
      excerpt: text.slice(0, 600),
    };
  }
  if (source.announcement?.test(text)) return {
    ok: false,
    reason: "possible-new-2027-announcement-requires-editorial-verification",
    observedValues: [text.match(source.announcement)?.[0] ?? ""].filter(Boolean),
    excerpt: text.match(source.announcement)?.[0] ?? "",
  };
  const pending = source.pending.test(text);
  return {
    ok: pending,
    reason: pending ? "2027-not-announced-on-official-source" : "pending-status-changed-or-source-redesigned",
    observedValues: [text.match(source.pending)?.[0] ?? ""].filter(Boolean),
    excerpt: text.slice(0, 600),
  };
}

// A compact, append-only-per-run Actions artifact is a durable source evidence trail
// without changing published events, creating a second cron, or storing scraped HTML.
export function buildSourceLedger(sources, checks, checkedAt) {
  return {
    checkedAt,
    schemaVersion: 1,
    policy: "source-observation-only-no-automatic-date-or-rights-promotion",
    observations: checks.map((check) => {
      const source = sources.find((candidate) => candidate.id === check.id);
      return {
        id: check.id,
        eventLabel: source?.label ?? check.id,
        eventSlug: source?.eventSlug ?? null,
        sourceUrl: check.url,
        mode: source?.mode ?? "unknown",
        state: check.ok ? "expected-source-state" : "review-required",
        reason: check.reason,
        observedValues: (check.observedValues ?? []).slice(0, 5).map((value) => String(value).slice(0, 180)),
        checkedAt,
        lastSuccessfulCheckInThisRun: check.ok ? checkedAt : null,
      };
    }),
  };
}

async function fetchOfficial(source) {
  const response = await fetch(source.url, {
    signal: AbortSignal.timeout(18000),
    headers: { "User-Agent": "TexasDefined-MardiGras-Editorial-SourceCheck/1.0" },
    redirect: "follow",
  });
  if (!response.ok) throw new Error("HTTP " + response.status);
  const type = response.headers.get("content-type") || "";
  if (!type.includes("html")) throw new Error("Unexpected content-type " + type);
  return (await response.text()).slice(0, 1000000);
}

async function findOrCreateReviewIssue(source, observation) {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPOSITORY;
  if (!token || repo !== "keeptxred/TexasDefined") {
    console.log("Review issue not created (outside authorized repository runner): " + source.id);
    return;
  }
  const headers = { Authorization: "Bearer " + token, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" };
  const title = "[Mardi Gras source review] " + source.label;
  // Stable title avoids duplicate tickets from every daily source check.
  const q = encodeURIComponent("repo:" + repo + " is:issue is:open in:title \"" + title + "\"");
  const search = await fetch("https://api.github.com/search/issues?q=" + q + "&per_page=30", { headers, signal: AbortSignal.timeout(15000) });
  if (!search.ok) throw new Error("GitHub review lookup HTTP " + search.status);
  const existing = (await search.json()).items?.find((item) => item.title === title);
  if (existing) {
    console.log("Existing review issue retained: " + existing.html_url);
    return;
  }
  const body = [
    "Automated **official-source discrepancy** detected. This is a review request, NOT confirmation of a new schedule.",
    "",
    "- Source: " + source.url,
    "- Check time (UTC): " + new Date().toISOString(),
    "- Finding: " + observation.reason,
    "- Extract: " + observation.excerpt.slice(0, 600),
    "",
    "Review the exact official event, calendar occurrence, source date and any contradictory sources before updating guide, hub, Event schema, or calendars. Leave existing images/noindex protections intact. Do not reuse last year's date or delete a valid guide on source failure.",
  ].join("\n");
  const created = await fetch("https://api.github.com/repos/" + repo + "/issues", {
    method: "POST", headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({ title, body }), signal: AbortSignal.timeout(15000),
  });
  if (!created.ok) throw new Error("GitHub source review issue HTTP " + created.status);
  console.log("Created review issue: " + (await created.json()).html_url);
}

async function main() {
  const checks = [];
  // Bounded sequential requests to avoid flooding six outside operators.
  for (const source of OFFICIAL_SOURCES) {
    try {
      const html = await fetchOfficial(source);
      const observation = evaluateSource(source, html);
      checks.push({ id: source.id, url: source.url, ...observation });
      if (!observation.ok) await findOrCreateReviewIssue(source, observation);
    } catch (error) {
      const observation = { ok: false, reason: "source-check-unavailable: " + String(error?.message ?? error), excerpt: "" };
      checks.push({ id: source.id, url: source.url, ...observation });
      // Never imply a URL failure is a cancellation or allow it to erase good event dates.
      await findOrCreateReviewIssue(source, observation);
    }
  }
  const checked = new Date().toISOString();
  const summary = [
    "### Mardi Gras source review — " + checked,
    "",
    "| Official source | Check | Evidence |",
    "|---|---|---|",
    ...checks.map((c) => "| " + c.id + " | " + (c.ok ? "expected source state" : "review required") + " | " + c.reason.replace(/\|/g, "/") + " |"),
    "",
    "Read-only check. Confirmed dates, guide text, JSON-LD, licensed photo registry and noindex are **never** modified from an unverified source response.",
  ].join("\n");
  console.log(summary);
  if (process.env.GITHUB_STEP_SUMMARY) await appendFile(process.env.GITHUB_STEP_SUMMARY, summary + "\n");
  if (process.env.MARDI_GRAS_SOURCE_LEDGER_PATH) {
    const ledger = buildSourceLedger(OFFICIAL_SOURCES, checks, checked);
    await writeFile(process.env.MARDI_GRAS_SOURCE_LEDGER_PATH, JSON.stringify(ledger, null, 2) + "\n");
    console.log("Recorded bounded structured Mardi Gras official-source observation ledger.");
  }
  if (checks.some((c) => !c.ok)) console.log("::warning title=Mardi Gras sources require review::An official source has changed or is unreachable; see source review issue and step summary.");
}

if (process.argv[1]?.endsWith("/check-mardi-gras-official-sources.mjs")) {
  main().catch((error) => { console.error(error); process.exitCode = 1; });
}
