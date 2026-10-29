// Extract candidate facts only from exact event-specific Event JSON-LD on official
// organizer/city pages. Never infer an event date from a banner, unrelated
// article, generic festival calendar, or the prior year's occurrence.
const identity = {
  "orange-sabine": { name: /mardi gras on the sabine/i, city: /^orange$/i, organizer: /city of orange/i },
  "beaumont-festival": { name: /mardi gras(?: of)? southeast texas/i, city: /^beaumont$/i, organizer: /mardi gras(?: of)? southeast texas/i },
  "mainland-texas-city": { name: /mainland mardi gras parade/i, city: /^texas city$/i, organizer: /city of texas city/i },
};
const held = (reason) => ({ status: "hold", reason, facts: null });
const normalize = (value) => String(value ?? "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
const datePart = (value) => typeof value === "string" && /^2027-\d{2}-\d{2}(?:T\d{2}:\d{2}(?::\d{2})?(?:[+-]\d{2}:\d{2}|Z)?)?$/.test(value)
  ? value.slice(0, 10) : null;
const parseDay = (value) => {
  if (!value) return null;
  const date = new Date(value + "T12:00:00.000Z");
  return Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value ? null : date;
};
function eventNodes(html) {
  const nodes = [];
  for (const [, raw] of String(html).matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    let parsed;
    try { parsed = JSON.parse(raw); } catch { continue; }
    const walk = (entry, depth = 0) => {
      if (!entry || typeof entry !== "object" || depth > 5) return;
      if (Array.isArray(entry)) { entry.forEach(item => walk(item, depth + 1)); return; }
      if (entry["@type"] === "Event" || (Array.isArray(entry["@type"]) && entry["@type"].includes("Event"))) nodes.push(entry);
      if (entry["@graph"]) walk(entry["@graph"], depth + 1);
    };
    walk(parsed);
  }
  return nodes;
}
export function parseVerifiedMardiGras2027Candidate(source, html, checkedAt) {
  const target = identity[source?.id];
  if (!target) return held("not-a-source-authorized-for-automatic-2027-candidate");
  if (!/^2026-\d{2}-\d{2}T/.test(checkedAt || "")) return held("missing-verifiable-observation-time");
  if (!source.identity?.test(normalize(html))) return held("source-event-identity-not-present");
  const candidates = eventNodes(html).filter(event => target.name.test(normalize(event.name)));
  if (!candidates.length) return held("no-exact-event-jsonld-at-official-source");
  const valid = [];
  for (const item of candidates) {
    if (/cancel|postpon|reschedul/i.test(normalize(item.eventStatus))) return held("changed-event-lifecycle-requires-human-verification");
    const city = normalize(item.location?.address?.addressLocality);
    if (!target.city.test(city)) return held("official-event-jsonld-city-mismatch");
    const host = normalize(item.organizer?.name);
    if (!target.organizer.test(host)) return held("official-event-jsonld-organizer-mismatch");
    const startDate = datePart(item.startDate);
    const endDate = datePart(item.endDate || item.startDate);
    const start = parseDay(startDate);
    const end = parseDay(endDate);
    if (!start || !end) return held("invalid-or-not-explicit-2027-date");
    const length = (end.getTime() - start.getTime()) / 86400000;
    if (length < 0 || length > 7 || startDate > "2027-03-31") return held("event-range-invalid-or-implausible");
    valid.push({
      eventSlug: source.eventSlug ?? null,
      sourceId: source.id,
      sourceUrl: source.url,
      eventName: normalize(item.name),
      organizer: host,
      city,
      startDate,
      endDate,
      startDateTime: item.startDate.includes("T") ? item.startDate : null,
      endDateTime: (item.endDate || "").includes("T") ? item.endDate : null,
      timeType: "published-event-occurrence-not-parade-start",
      checkedAt,
      evidenceType: "official-event-jsonld",
    });
  }
  const distinct = new Set(valid.map(event => [event.startDate, event.endDate, event.startDateTime, event.endDateTime].join("|")));
  if (distinct.size !== 1) return held("conflicting-event-occurrence-jsonld");
  return { status: "candidate", reason: "exact-official-event-jsonld", facts: valid[0] };
}
