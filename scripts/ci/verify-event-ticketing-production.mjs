const origin = String(process.env.PRODUCTION_ORIGIN || "https://texasdefined.com").replace(/\/$/, "");
const sha = process.env.GITHUB_SHA || "local";
const runId = process.env.GITHUB_RUN_ID || Date.now().toString();
const expectedTicketUrl = "https://www.grapevinetexasusa.com/grapefest/purchase-tickets/";
const marker = `ticket-smoke-${sha.slice(0, 12)}-${runId}-${Date.now()}`;
const url = `${origin}/events?featured=${encodeURIComponent(marker)}&location=&start=&end=&category=&venue=`;

const response = await fetch(url, {
  redirect: "follow",
  cache: "no-store",
  signal: AbortSignal.timeout(30_000),
  headers: { "user-agent": "TexasDefined-Event-Ticketing-Production-Smoke/1.0" },
});
const html = await response.text();

if (!response.ok) throw new Error(`production events request returned HTTP ${response.status}`);
if (!html.includes("GrapeFest")) throw new Error("production events hub does not include the source-qualified GrapeFest event");
if (!html.includes("Official Tickets")) throw new Error("production events hub does not render an Official Tickets CTA");
if (!html.includes(expectedTicketUrl)) throw new Error("production events hub does not render the verified GrapeFest ticket URL");
if (html.includes(`href="${expectedTicketUrl}" rel="sponsored`)) throw new Error("official GrapeFest ticket URL must not be marked sponsored");

console.log(`PASS: cache-busted production events hub renders GrapeFest Official Tickets CTA at ${expectedTicketUrl}`);
