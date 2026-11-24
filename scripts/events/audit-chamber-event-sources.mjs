#!/usr/bin/env node
/**
 * County chamber/event discovery — research inventory only.
 * Official organizer pages, not a chamber aggregator, control event facts.
 * No emails, images, descriptions, event schema, publication or backlinks are created here.
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";

export const DEFAULT_REGISTRY = "ops/editorial/chamber-event-sources.json";
export const DEFAULT_REPORT = ".artifacts/chamber-event-source-audit.json";
const BOT = "TexasDefined-Events-Research/1.0 (+https://texasdefined.com/about)";
const FESTIVAL_WORDS = /\b(festival|fair|christmas|holiday|parade|rodeo|celebration|jamboree|gusher days|farmers market|community market|homecoming|lights|tree lighting|syrup|blueberry|yamboree)\b/i;

export function loadCountyNames(source) {
  const after = source.split("const COUNTY_NAMES = ")[1];
  const literal = after?.split(".split('|');")[0];
  const tick = String.fromCharCode(96);
  if (!literal || !literal.startsWith(tick) || !literal.endsWith(tick))
    throw new Error("Canonical Texas county list could not be read");
  const names = literal.slice(1, -1).split("|");
  if (names.length !== 254 || new Set(names).size !== 254)
    throw new Error("Canonical county list is not exactly 254 unique counties");
  return names.map(name => ({
    name: name + " County",
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    url: "https://texasdefined.com/county/" +
      name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
  }));
}

function checkedPublicUrl(value) {
  const url = new URL(value);
  const host = url.hostname.toLowerCase();
  if (url.protocol !== "https:" || url.username || url.password ||
      !host.includes(".") || host === "localhost" ||
      /^(\d{1,3}\.){3}\d{1,3}$/.test(host) ||
      host.endsWith(".local") || url.port)
    throw new Error("Not an approved public HTTPS source URL: " + value);
  return url;
}

export function validateRegistry(registry, counties) {
  const known = new Set(counties.map(county => county.slug));
  if (registry.version !== 1 || !Array.isArray(registry.sources))
    throw new Error("Invalid chamber discovery registry version or sources");
  if (registry.rules?.sender !== "admin@texasdefined.com" ||
      registry.rules?.mailProvider !== "Microsoft 365 Outlook only" ||
      registry.rules?.noGmail !== true)
    throw new Error("O365-only outreach governance was removed");
  const scope = registry.rules?.outreachScope;
  const allowed = ["chambers-of-commerce", "chamber-associations", "official-tourism-bureaus", "municipalities-and-public-authorities", "historical-cultural-organizations", "actual-event-organizers-and-authorized-venues"];
  const excluded = ["independent-newspapers", "news-outlets", "journalists", "publishers", "editorial-intermediaries"];
  const sameCategories = (actual, expected) => Array.isArray(actual) &&
    actual.length === expected.length && expected.every(value => actual.includes(value));
  if (!scope || !sameCategories(scope.allowed, allowed) || !sameCategories(scope.excluded, excluded) ||
      scope.separateExplicitOwnerAuthorizationRequired !== true ||
      scope.firstPartyOrganizationRoleVerificationRequired !== true ||
      scope.unknownEligibility !== "do-not-contact" ||
      scope.declinesOptOutsAndFailedAddressSuppression !== "always-honor" ||
      scope.newsReports !== "research-leads-only; confirm with actual event organizer" ||
      scope.automatedSending !== false)
    throw new Error("Owner-approved outreach scope is missing or weakened");
  const ids = new Set();
  for (const source of registry.sources) {
    if (!source.id || ids.has(source.id)) throw new Error("Duplicate or missing source id");
    ids.add(source.id);
    if (!source.organization || !Array.isArray(source.countySlugs) ||
        !source.countySlugs.length || source.countySlugs.some(s => !known.has(s)))
      throw new Error("Unmatched county reference: " + source.id);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(source.reviewedAt) ||
        !Number.isFinite(Date.parse(source.reviewedAt)))
      throw new Error("Missing verified source-review date: " + source.id);
    if (source.sourceRole !== "discovery" ||
        !["html","rss","ics"].includes(source.calendarType) ||
        (source.sourceKind !== undefined && !["public-calendar","contact-only","empty-calendar","event-specific","annual-events-list","unclassified"].includes(source.sourceKind)))
      throw new Error("Unsupported source classification: " + source.id);
    for (const field of ["homeUrl", "calendarUrl", "contactPageUrl"])
      checkedPublicUrl(source[field]);
    if (source.sourceTrust !== undefined && source.sourceTrust !== "quarantined")
      throw new Error("Unsupported source-trust status: " + source.id);
    if (source.sourceTrust === "quarantined" &&
        (typeof source.riskReview !== "string" || source.riskReview.length < 30))
      throw new Error("Quarantined source requires a substantive public safety review: " + source.id);
    if ("contactEmail" in source || "recipient" in source || "mediaKit" in source)
      throw new Error("Do not commit contact records or private media kits");
  }
  return true;
}

export function allowedByRobots(robots, requestPath, userAgent = "TexasDefined-Events-Research") {
  // Distinguish product-specific robots rules from unrelated crawler bans.
  // Longest matching path rule wins; Allow wins a tie. Fail-closed on
  // robots fetch failures is enforced separately by the caller.
  const groups = [];
  let agents = [], rules = [], hadRules = false;
  const flush = () => {
    if (agents.length) groups.push({ agents, rules });
    agents = []; rules = []; hadRules = false;
  };
  for (const raw of robots.split(/\r?\n/)) {
    const pair = /^([a-z-]+)\s*:\s*(.*)$/i.exec(raw.replace(/#.*$/, "").trim());
    if (!pair) continue;
    const directive = pair[1].toLowerCase(), value = pair[2].trim();
    if (directive === "user-agent") {
      if (hadRules) flush();
      if (value) agents.push(value.toLowerCase());
    } else if (agents.length && (directive === "allow" || directive === "disallow")) {
      hadRules = true;
      if (value) rules.push({ directive, pattern: value });
    }
  }
  flush();
  const token = userAgent.toLowerCase().split("/")[0];
  const matching = groups.flatMap(group =>
    group.agents.filter(agent => agent === "*" || token.startsWith(agent))
      .map(agent => ({ group, rank: agent === "*" ? 0 : agent.length })));
  if (!matching.length) return true;
  const rank = Math.max(...matching.map(match => match.rank));
  const path = requestPath || "/";
  let winner = null;
  for (const match of matching.filter(match => match.rank === rank)) {
    for (const rule of match.group.rules) {
      const anchored = rule.pattern.endsWith("$");
      const pattern = anchored ? rule.pattern.slice(0, -1) : rule.pattern;
      const metachars = "\\^$.*+?()[]{}|";
      const expression = pattern.split("*")
        .map(part => [...part].map(ch => metachars.includes(ch) ? "\\" + ch : ch).join(""))
        .join(".*");
      const re = new RegExp("^" + expression + (anchored ? "$" : ""));
      if (!re.test(path)) continue;
      const weight = pattern.replace(/\*/g, "").length;
      if (!winner || weight > winner.weight ||
          (weight === winner.weight && rule.directive === "allow"))
        winner = { directive: rule.directive, weight };
    }
  }
  return winner?.directive !== "disallow";
}

export function extractEventLeads(html, pageUrl) {
  const leads = [];
  const seen = new Set();
  const add = (name, url, startDate = null, kind = "calendar-link") => {
    name = String(name || "").replace(/<[^>]*>/g, " ").replace(/&amp;/g, "&")
      .replace(/\s+/g, " ").trim().slice(0, 150);
    if (name.length < 5) return;
    let normalized;
    try { normalized = checkedPublicUrl(new URL(url, pageUrl).href).href; }
    catch { return; }
    const key = name.toLowerCase() + "|" + normalized;
    if (seen.has(key) || leads.length >= 30) return;
    seen.add(key);
    leads.push({ title: name, sourceUrl: normalized,
      dateShownByDiscoverySource: typeof startDate === "string" ? startDate.slice(0, 32) : null,
      evidenceType: kind, organizerVerified: false, publishable: false });
  };
  for (const match of html.matchAll(/<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const root = JSON.parse(match[1]);
      const walk = (item, depth = 0) => {
        if (!item || typeof item !== "object" || depth > 8) return;
        if (Array.isArray(item)) { for (const node of item) walk(node, depth + 1); return; }
        const types = [item["@type"]].flat();
        if (types.some(type => /(^|:)Event$/i.test(String(type))))
          add(item.name, item.url || pageUrl, item.startDate, "calendar-jsonld");
        for (const key of ["@graph","mainEntity","itemListElement","events","event"])
          if (item[key]) walk(item[key], depth + 1);
      };
      walk(root);
    } catch { /* malformed third-party JSON-LD is not evidence */ }
  }
  for (const match of html.matchAll(/<a\b[^>]*href\s*=\s*["']([^"'#]+)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
    const name = match[2].replace(/<[^>]+>/g, " ").replace(/&[^;]+;/g, " ").trim();
    if (FESTIVAL_WORDS.test(name)) add(name, match[1]);
  }
  return leads;
}

/**
 * Bounded single-page, same-publisher calendar-link discovery. These are
 * unverified editorial research pointers, NOT accepted press feeds or events.
 * No second-page fetch, no cross-origin link following, no publication.
 */
export function extractCalendarLinks(html, pageUrl) {
  const base = checkedPublicUrl(pageUrl), candidates = [], seen = new Set();
  const relevant = /\b(events?|calendars?|festivals?|community activities|things to do|what(?:'s| is) happening|parades?)\b/i;
  for (const match of html.matchAll(/<a\b[^>]*href\s*=\s*["']([^"'#]+)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
    const label = match[2].replace(/<[^>]*>/g," ").replace(/&(?:amp;|#38;)/gi,"&")
      .replace(/&[^;]+;/g," ").replace(/\s+/g," ").trim().slice(0,96);
    let url;
    try { url = checkedPublicUrl(new URL(match[1],base).href); }
    catch { continue; }
    if (url.origin !== base.origin || url.hash || seen.has(url.href)) continue;
    if (/\.(?:pdf|jpg|jpeg|png|webp|svg|docx?|xlsx?|ics|zip)$/i.test(url.pathname) ||
        /\/(?:admin|login|signin|sign-in|privacy|terms|join-mailing-list)(?:\/|$)/i.test(url.pathname))
      continue;
    if (!relevant.test(label+" "+url.pathname.replace(/[-_]/g," "))) continue;
    seen.add(url.href);
    candidates.push({ label:label||"Community events/calendar", sourceUrl:url.href,
      publisherVerified:false, organizerVerified:false, publishable:false });
    if (candidates.length >= 8) break;
  }
  return candidates;
}

/**
 * First-party editorial contact-path candidates from ONE already-permitted HTML
 * source response. Paths are not fetched, validated inboxes, opt-ins, rights or
 * outreach addresses. Never extract/store email addresses in public reports.
 */
export function extractContactPageLinks(html, pageUrl) {
  const base = checkedPublicUrl(pageUrl), candidates = [], seen = new Set();
  const relevant = /\b(?:contact(?: us| the (?:chamber|team))?|media (?:kit|relations|contact|inquiries)|press (?:kit|room|releases|contact|inquiries)|newsroom|communications (?:office|team)|submit (?:an? )?event|submit (?:an? )?news)\b/i;
  for (const match of html.matchAll(/<a\b[^>]*href\s*=\s*[\"']([^\"'#]+)[\"'][^>]*>([\s\S]*?)<\/a>/gi)) {
    const label = match[2].replace(/<[^>]*>/g," ").replace(/&(?:amp;|#38;)/gi,"&")
      .replace(/&[^;]+;/g," ").replace(/\s+/g," ").trim().slice(0,96);
    let url;
    try { url = checkedPublicUrl(new URL(match[1],base).href); }
    catch { continue; }
    if (url.origin !== base.origin || url.hash || url.search || seen.has(url.href)) continue;
    if (/\.(?:pdf|jpe?g|png|webp|svg|docx?|xlsx?|ics|zip|exe)$/i.test(url.pathname) ||
      /\/(?:admin|login|signin|sign-in|privacy|terms|checkout|join-mailing-list|unsubscribe)(?:\/|$)/i.test(url.pathname))
      continue;
    if (!relevant.test(label+" "+url.pathname.replace(/[-_]/g," "))) continue;
    seen.add(url.href);
    candidates.push({ label:label||"Editorial contact page", sourceUrl:url.href,
      publisherVerified:false, recipientVerified:false, pressOptInVerified:false,
      mediaRightsVerified:false, publishable:false, sendable:false });
    if (candidates.length >= 4) break;
  }
  return candidates;
}

async function fetchPublicCalendar(source, fetchImpl, { discoverOnly = false } = {}) {
  const url = checkedPublicUrl(discoverOnly ? source.homeUrl : source.calendarUrl);
  const options = { headers: { "User-Agent": BOT, Accept: "text/html,application/ld+json,text/calendar,application/rss+xml" },
    redirect: "follow", signal: AbortSignal.timeout(12000) };
  try {
    const robotResponse = await fetchImpl(url.origin + "/robots.txt", options);
    if (robotResponse.status !== 404) {
      if (!robotResponse.ok) return { state: "robots-unavailable", http: robotResponse.status, leads: [] };
      const robots = (await robotResponse.text()).slice(0, 300000);
      if (!allowedByRobots(robots, url.pathname + url.search))
        return { state: "robots-disallowed", http: null, leads: [] };
    }
    const response = await fetchImpl(url.href, options);
    const final = checkedPublicUrl(response.url || url.href);
    if (final.origin !== url.origin) return { state: "cross-origin-redirect-review", http: response.status, leads: [] };
    if (!response.ok) return { state: "http-error", http: response.status, leads: [] };
    const contentType = response.headers.get("content-type") || "";
    if (!/html|calendar|rss|xml/i.test(contentType))
      return { state: "unsupported-content-type", http: response.status, leads: [] };
    if (Number(response.headers.get("content-length") || 0) > 1200000)
      return { state: "oversized-response", http: response.status, leads: [] };
    const text = (await response.text()).slice(0, 1200000);
    // This is URL-only one-hop navigation extraction; never follow candidates
    // or expose email recipient addresses in a public GitHub report.
    const contactPageCandidates = /html/i.test(contentType)
      ? extractContactPageLinks(text,final.href) : [];
    if (discoverOnly) return { state:"contact-discovery-only", http:response.status,
      leads:[], calendarCandidates:extractCalendarLinks(text,final.href),
      contactPageCandidates, sourceAvailabilityIsNotCalendarVerification:true };
    let leads = [];
    if (source.calendarType === "html") leads = extractEventLeads(text, final.href);
    // RSS / iCal imports are not auto-published; such sources must receive
    // their own verified parser and organizer-resolution test before promotion.
    return { state: "reachable-discovery-only", http: response.status, leads,
      contactPageCandidates, manualParserNeeded: source.calendarType !== "html" };
  } catch (error) {
    return { state: "fetch-failed", http: null, leads: [], error: String(error).slice(0, 200) };
  }
}

export async function auditChamberSources({
  root = process.cwd(), now = new Date(), fetchImpl = fetch, offline = false,
} = {}) {
  const counties = loadCountyNames(await readFile(resolve(root, "src/data/texas-places.ts"), "utf8"));
  const registry = JSON.parse(await readFile(resolve(root, DEFAULT_REGISTRY), "utf8"));
  validateRegistry(registry, counties);
  const map = new Map(counties.map(c => [c.slug, { ...c, sourceIds: [] }]));
  for (const source of registry.sources)
    for (const slug of source.countySlugs) map.get(slug).sourceIds.push(source.id);
  const observations = [];
  for (const source of registry.sources) {
    // Small verified inventories can all run daily; statewide growth is evenly
    // sharded across seven days to keep courtesy load bounded per publisher.
    const hash = [...source.id].reduce((n, ch) => (n * 31 + ch.charCodeAt(0)) >>> 0, 0);
    const day = now.getUTCDay();
    const holidayBoost = source.priority === "holiday" && [10,11,0].includes(now.getUTCMonth());
    const due = registry.sources.length <= 12 || hash % 7 === day ||
      (holidayBoost && hash % 2 === day % 2);
    // Quarantine beats both offline mode and refresh cadence, so a future
    // source-kind change can never crawl a publisher under site-safety review.
    const result = source.sourceTrust === "quarantined"
      ? { state: "quarantined-source", leads: [] }
      : offline ? { state: "offline-validation", leads: [] }
      : !due ? { state: "not-due", leads: [] }
      : source.sourceKind === "contact-only" ? await fetchPublicCalendar(source,fetchImpl,{discoverOnly:true})
      : await fetchPublicCalendar(source, fetchImpl);
    observations.push({ sourceId: source.id, organization: source.organization,
      countySlugs: source.countySlugs, officialUrl: source.homeUrl,
      calendarUrl: source.calendarUrl, sourceRole: source.sourceRole,
      sourceKind: source.sourceKind ?? "unclassified",
      sourceTrust: source.sourceTrust ?? "normal",
      reviewedAt: source.reviewedAt, ...result });
  }
  const rows = [...map.values()];
  const unservedCounties = rows.filter(c => !c.sourceIds.length);
  // A government contact page is valuable for outreach but is NOT a reviewed
  // public event calendar. Unclassified preexisting records remain a research
  // backlog instead of being silently counted as organizer-date evidence.
  const calendarSourceCountySlugs = new Set(registry.sources
    .filter(s => s.sourceKind === "public-calendar")
    .flatMap(s => s.countySlugs));
  const countiesNeedingCalendarEvidence = rows.filter(c => !calendarSourceCountySlugs.has(c.slug));
  const contactOnlySourceCount = registry.sources.filter(s => s.sourceKind === "contact-only").length;
  // Empty official calendar/submission desks are monitored but cannot certify an active festival calendar.
  const emptyCalendarSourceCount = registry.sources.filter(s => s.sourceKind === "empty-calendar").length;
  const unclassifiedSourceCount = registry.sources.filter(s => !s.sourceKind || s.sourceKind === "unclassified").length;
  const eventSpecificSourceCount = registry.sources.filter(s => s.sourceKind === "event-specific").length;
  const annualEventsListSourceCount = registry.sources.filter(s => s.sourceKind === "annual-events-list").length;
  const report = { generatedAt: now.toISOString(), sender: registry.rules.sender,
    eventPublication: "NO — research candidates only; current first-party event organizer confirmation and editorial rights review required",
    countiesTotal: rows.length, countiesWithRegisteredSources: rows.length - unservedCounties.length,
    countiesMissingSources: unservedCounties.length, unservedCounties,
    countiesWithExplicitCalendarSources: calendarSourceCountySlugs.size,
    countiesNeedingCalendarEvidence: countiesNeedingCalendarEvidence.length,
    countiesNeedingCalendarEvidenceDetails: countiesNeedingCalendarEvidence,
    contactOnlySourceCount, emptyCalendarSourceCount, unclassifiedSourceCount, eventSpecificSourceCount, annualEventsListSourceCount,
    sourceCount: registry.sources.length, observations,
    candidateCount: observations.reduce((sum, row) => sum + row.leads.length, 0),
    contactCalendarCandidateCount: observations.reduce((sum,row) => sum + (row.calendarCandidates?.length||0),0),
    firstPartyContactRouteCandidateCount: observations.reduce((sum,row) => sum + (row.contactPageCandidates?.length||0),0),
    sourceAvailabilityIsNotDateVerification: true,
    outreachStatus: "Outlook sender and replies are tracked privately; source and contact-page candidates do not establish outreach eligibility; independent newsrooms are excluded absent separate explicit owner authorization; this audit never sends messages" };
  if (report.countiesTotal !== 254) throw new Error("County research coverage is incomplete");
  return report;
}

async function main() {
  const args = process.argv.slice(2);
  const output = args.includes("--output") ? args[args.indexOf("--output") + 1] : DEFAULT_REPORT;
  const report = await auditChamberSources({ offline: args.includes("--offline") });
  await mkdir(dirname(resolve(output)), { recursive: true });
  await writeFile(resolve(output), JSON.stringify(report, null, 2) + "\n");
  console.log("Chamber and civic source registration: " + report.countiesWithRegisteredSources + "/254 counties have a public source/contact; " +
    report.countiesMissingSources + " still lack even a contact; " + report.countiesNeedingCalendarEvidence +
    " counties still need an explicitly reviewed public calendar source; " + report.unclassifiedSourceCount +
    " existing source classifications are unreviewed; " + report.candidateCount + " unverified event leads.");
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href)
  main().catch(error => { console.error(error); process.exitCode = 1; });
