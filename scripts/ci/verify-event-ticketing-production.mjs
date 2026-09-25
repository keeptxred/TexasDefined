const origin = String(process.env.PRODUCTION_ORIGIN || "https://texasdefined.com").replace(/\/$/, "");
const sha = process.env.GITHUB_SHA || "local";
const runId = process.env.GITHUB_RUN_ID || Date.now().toString();
const marker = `ticket-smoke-${sha.slice(0, 12)}-${runId}-${Date.now()}`;
const url = `${origin}/events?featured=${encodeURIComponent(marker)}&location=&start=&end=&category=&venue=`;

const TICKETMASTER_IMPACT_HOST = "ticketmaster.evyy.net";
const TICKETMASTER_IMPACT_PATH = /^\/c\/7758914\/\d+\/4272\/?$/;
const TICKETMASTER_DESTINATION_HOSTS = new Set([
  "ticketmaster.com",
  "www.ticketmaster.com",
  "ticketweb.com",
  "www.ticketweb.com",
]);

function decodeHtml(value) {
  return value
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&amp;/gi, "&");
}

function anchorLabel(match) {
  return decodeHtml(match[2].replace(/<!--[\s\S]*?-->/g, " ").replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function anchorHref(match) {
  const hrefMatch = match[1].match(/\bhref=["']([^"']+)["']/i);
  return hrefMatch ? decodeHtml(hrefMatch[1]) : null;
}

function anchorRel(match) {
  const relMatch = match[1].match(/\brel=["']([^"']+)["']/i);
  return new Set((relMatch?.[1] || "").toLowerCase().split(/\s+/).filter(Boolean));
}

const response = await fetch(url, {
  redirect: "follow",
  cache: "no-store",
  signal: AbortSignal.timeout(30_000),
  headers: { "user-agent": "TexasDefined-Event-Ticketing-Production-Smoke/2.0" },
});
const html = await response.text();

if (!response.ok) throw new Error(`production events request returned HTTP ${response.status}`);

const anchorMatches = [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)];

const officialTicketAnchor = anchorMatches.find((match) => anchorLabel(match).includes("Official Tickets"));
if (!officialTicketAnchor) {
  throw new Error("production events hub does not render any live source-qualified Official Tickets CTA");
}

const officialHref = anchorHref(officialTicketAnchor);
if (!officialHref) throw new Error("live Official Tickets CTA is missing an href");
if (!/^https?:\/\//i.test(officialHref)) throw new Error(`live Official Tickets CTA is not an external URL: ${officialHref}`);
if (anchorRel(officialTicketAnchor).has("sponsored")) {
  throw new Error("official non-affiliate ticket source must not be marked sponsored");
}

const affiliateTicketAnchor = anchorMatches.find((match) => {
  if (!anchorLabel(match).includes("Find Tickets")) return false;
  const href = anchorHref(match);
  if (!href) return false;
  try {
    return new URL(href).hostname.toLowerCase() === TICKETMASTER_IMPACT_HOST;
  } catch {
    return false;
  }
});
if (!affiliateTicketAnchor) {
  throw new Error("production events hub does not render a live Ticketmaster Impact Find Tickets CTA");
}

const affiliateHref = anchorHref(affiliateTicketAnchor);
if (!affiliateHref) throw new Error("live Ticketmaster affiliate CTA is missing an href");

let affiliateUrl;
try {
  affiliateUrl = new URL(affiliateHref);
} catch {
  throw new Error(`live Ticketmaster affiliate CTA has an invalid URL: ${affiliateHref}`);
}
if (affiliateUrl.protocol !== "https:") {
  throw new Error("live Ticketmaster affiliate CTA must use HTTPS");
}
if (affiliateUrl.hostname.toLowerCase() !== TICKETMASTER_IMPACT_HOST) {
  throw new Error(`unexpected Ticketmaster affiliate host: ${affiliateUrl.hostname}`);
}
if (!TICKETMASTER_IMPACT_PATH.test(affiliateUrl.pathname)) {
  throw new Error(`unexpected Ticketmaster Impact attribution path: ${affiliateUrl.pathname}`);
}

const destinationValue = affiliateUrl.searchParams.get("u");
if (!destinationValue) {
  throw new Error("live Ticketmaster Impact CTA is missing its embedded destination");
}

let destination;
try {
  destination = new URL(destinationValue);
} catch {
  throw new Error("live Ticketmaster Impact CTA has an invalid embedded destination");
}
if (destination.protocol !== "https:" || !TICKETMASTER_DESTINATION_HOSTS.has(destination.hostname.toLowerCase())) {
  throw new Error(`unexpected Ticketmaster affiliate destination: ${destination.origin}`);
}

const affiliateRel = anchorRel(affiliateTicketAnchor);
for (const token of ["sponsored", "nofollow", "noopener", "noreferrer"]) {
  if (!affiliateRel.has(token)) {
    throw new Error(`live Ticketmaster affiliate CTA is missing rel="${token}"`);
  }
}

const attributes = affiliateTicketAnchor[1];
if (!/\bdata-affiliate-partner=["']ticketmaster["']/i.test(attributes)) {
  throw new Error("live Ticketmaster affiliate CTA is missing first-party affiliate partner attribution");
}
if (!/\bdata-commercial-partner=["']ticketmaster["']/i.test(attributes)) {
  throw new Error("live Ticketmaster affiliate CTA is missing commercial partner attribution");
}
if (!html.includes("Affiliate link · ticket checkout is handled by the ticket provider.")) {
  throw new Error("production events hub is missing the Ticketmaster affiliate disclosure");
}
if (!html.includes("Confirm event-day details with the official source before traveling.")) {
  throw new Error("production events hub is missing the official-source verification disclaimer");
}

console.log(
  `PASS: cache-busted production events hub renders a provider-neutral Official Tickets CTA at ${officialHref} and a Ticketmaster Impact affiliate CTA for publisher 7758914 / merchant 4272 with a validated ${destination.hostname} destination.`,
);
