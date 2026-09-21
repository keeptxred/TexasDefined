const origin = String(process.env.PRODUCTION_ORIGIN || "https://texasdefined.com").replace(/\/$/, "");
const sha = process.env.GITHUB_SHA || "local";
const runId = process.env.GITHUB_RUN_ID || Date.now().toString();
const marker = `ticket-smoke-${sha.slice(0, 12)}-${runId}-${Date.now()}`;
const url = `${origin}/events?featured=${encodeURIComponent(marker)}&location=&start=&end=&category=&venue=`;

function decodeHtml(value) {
  return value
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&amp;/gi, "&");
}

const response = await fetch(url, {
  redirect: "follow",
  cache: "no-store",
  signal: AbortSignal.timeout(30_000),
  headers: { "user-agent": "TexasDefined-Event-Ticketing-Production-Smoke/1.0" },
});
const html = await response.text();

if (!response.ok) throw new Error(`production events request returned HTTP ${response.status}`);

const officialTicketAnchor = html.match(/<a\b([^>]*)>[\s\S]*?Official Tickets[\s\S]*?<\/a>/i);
if (!officialTicketAnchor) {
  throw new Error("production events hub does not render any live source-qualified Official Tickets CTA");
}

const attributes = officialTicketAnchor[1];
const hrefMatch = attributes.match(/\bhref=["']([^"']+)["']/i);
if (!hrefMatch) throw new Error("live Official Tickets CTA is missing an href");
const href = decodeHtml(hrefMatch[1]);
if (!/^https?:\/\//i.test(href)) throw new Error(`live Official Tickets CTA is not an external URL: ${href}`);

const relMatch = attributes.match(/\brel=["']([^"']+)["']/i);
const rel = (relMatch?.[1] || "").toLowerCase();
if (rel.split(/\s+/).includes("sponsored")) {
  throw new Error("official non-affiliate ticket source must not be marked sponsored");
}

if (!html.includes("Confirm event-day details with the official source before traveling.")) {
  throw new Error("production events hub is missing the official-source verification disclaimer");
}

console.log(`PASS: cache-busted production events hub renders a live provider-neutral Official Tickets CTA at ${href}`);
