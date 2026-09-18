import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const collector = read('src/lib/texas-defined-outcome-analytics.server.ts');
const client = read('src/platform/analytics.ts');
const root = read('src/routes/__root.tsx');
const serverEntry = read('src/server-entry.ts');
const wrangler = read('wrangler.jsonc');
const productionVerifier = read('scripts/ci/verify-stay-affiliate-production.mjs');
const workflow = read('.github/workflows/validate-stay-affiliate-options.yml');
const errors = [];

function requireText(source, needle, label) {
  if (!source.includes(needle)) errors.push(`${label}: missing ${needle}`);
}

for (const [needle, label] of [
  ['const ANALYTICS_API_PATH = "/api/analytics"', 'same-origin analytics API path'],
  ['const MAX_REQUEST_BYTES = 65_536', 'request-size limit'],
  ['const MAX_BATCH_EVENTS = 50', 'batch-size limit'],
  ['const OUTCOME_EVENTS = new Set([', 'event allowlist'],
  ['"partner_referral_clicked"', 'commercial referral event'],
  ['function sameOriginRequest(request: Request)', 'same-origin request guard'],
  ['request.headers.get("sec-fetch-site") !== "same-origin"', 'fetch-site fallback guard'],
  ['sanitizeQuery(Reflect.get(value, "query"))', 'query sanitization'],
  ['"[email]"', 'email redaction'],
  ['"[phone]"', 'phone redaction'],
  ['"[address]"', 'address redaction'],
  ['sanitizePath(Reflect.get(value, "path"))', 'path query stripping'],
  ['TEXAS_DEFINED_OUTCOME_ANALYTICS', 'Analytics Engine binding reader'],
  ['dataset.writeDataPoint({', 'Analytics Engine data-point write'],
  ['indexes: [analyticsIndex(event.event, resourceId, entityKind)]', 'bounded analytics index'],
  ['Browser session IDs are intentionally never persisted in Analytics Engine.', 'session-minimization contract'],
  ['return jsonResponse({ accepted: events.length }, 202)', 'accepted-event response'],
]) requireText(collector, needle, label);

if (collector.includes('Reflect.get(value, "sessionId")') || collector.includes('event.sessionId')) {
  errors.push('Outcome collector must not persist or read the browser session identifier.');
}

for (const [needle, label] of [
  ["const ANALYTICS_ENDPOINT = (import.meta.env.VITE_ANALYTICS_ENDPOINT as string | undefined)?.trim() || '/api/analytics'", 'same-origin client endpoint default'],
  ['navigator.sendBeacon(ANALYTICS_ENDPOINT', 'beacon delivery'],
  ['fetch(ANALYTICS_ENDPOINT', 'queued-event delivery'],
  ["trackTexasDefinedOutcome('partner_referral_clicked'", 'partner referral tracking'],
  ["entityKind: anchor.dataset.commercialPlacement || 'unspecified'", 'commercial placement attribution'],
]) requireText(client, needle, label);

for (const [needle, label] of [
  ['analyticsPromise ??= import("@/platform/analytics")', 'analytics remains code-split'],
  ['a[data-commercial-partner]', 'early commercial-link interception'],
  ['anchor?.dataset.commercialPartner', 'early commercial partner attribution'],
  ['anchor.dataset.commercialPlacement || "unspecified"', 'early commercial placement attribution'],
  ['analytics.trackTexasDefinedOutcome("partner_referral_clicked"', 'early first-party referral capture'],
  ['document.addEventListener("click", earlyCommercialClick, true)', 'capture-phase early referral listener'],
  ['document.removeEventListener("click", earlyCommercialClick, true)', 'early listener teardown'],
  ['}, 1500);', 'delayed background analytics fallback'],
]) requireText(root, needle, label);

for (const [needle, label] of [
  ['import { texasDefinedOutcomeAnalyticsResponse } from "./lib/texas-defined-outcome-analytics.server";', 'Worker collector import'],
  ['const outcomeAnalyticsResponse = await texasDefinedOutcomeAnalyticsResponse(request, env);', 'Worker collector invocation'],
  ['if (outcomeAnalyticsResponse) return outcomeAnalyticsResponse;', 'Worker collector response routing'],
]) requireText(serverEntry, needle, label);

for (const [needle, label] of [
  ['"binding": "TEXAS_DEFINED_OUTCOME_ANALYTICS"', 'outcome analytics binding'],
  ['"dataset": "texas_defined_outcomes"', 'outcome analytics dataset'],
]) requireText(wrangler, needle, label);

for (const [needle, label] of [
  ["'/api/analytics'", 'live analytics endpoint probe'],
  ['partner_referral_clicked', 'live partner-referral probe event'],
  ['production-verifier', 'live probe placement marker'],
  ['ci-probe', 'live probe exclusion marker'],
  ['accepted', 'live collector acceptance assertion'],
]) requireText(productionVerifier, needle, label);

for (const [needle, label] of [
  ["src/lib/texas-defined-outcome-analytics.server.ts", 'collector path trigger'],
  ["src/platform/analytics.ts", 'client analytics path trigger'],
  ["wrangler.jsonc", 'Worker binding path trigger'],
  ["scripts/data/validate-outcome-analytics.mjs", 'validator path trigger'],
  ['node scripts/data/validate-outcome-analytics.mjs', 'outcome analytics validator invocation'],
]) requireText(workflow, needle, label);

if (errors.length) {
  console.error('First-party outcome analytics validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('First-party outcome analytics validation passed: the browser has a same-origin default collector, partner placements are attributed, commercial clicks during the delayed analytics bootstrap are captured through the same code-split outcome module, the Worker accepts only bounded same-origin allowlisted events, likely direct identifiers in free-text queries are redacted, browser session IDs are not persisted, Cloudflare Analytics Engine has a dedicated dataset binding, and production verification exercises a real collector write.');
