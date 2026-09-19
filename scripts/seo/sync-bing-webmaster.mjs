import process from "node:process";

const collectorVersion = "2026-09-18.4";
const bingApiKey = process.env.BING_WEBMASTER_API_KEY?.trim();
const supabaseUrl = process.env.SUPABASE_URL?.trim().replace(/\/$/, "");
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
const targetHosts = (process.env.BING_WEBMASTER_SITE_HOSTS || "texasdefined.com,keeptxred.com")
  .split(",")
  .map((host) => host.trim().toLowerCase().replace(/^www\./, ""))
  .filter(Boolean);
const bingBaseUrl = "https://ssl.bing.com/webmaster/api.svc/json";

if (!bingApiKey) throw new Error("BING_WEBMASTER_API_KEY is required.");
if (!supabaseUrl) throw new Error("SUPABASE_URL is required.");
if (!supabaseServiceRoleKey) throw new Error("SUPABASE_SERVICE_ROLE_KEY is required.");
if (targetHosts.length === 0) throw new Error("At least one Bing Webmaster target host is required.");

function asArray(value) {
  if (value == null) return [];
  return Array.isArray(value) ? value : [value];
}

function normalizeBingDate(value) {
  if (typeof value !== "string") return value;
  const match = value.match(/^\/Date\((\d+)(?:[+-]\d{4})?\)\/$/);
  if (!match) return value;
  const timestamp = Number(match[1]);
  return Number.isFinite(timestamp) ? new Date(timestamp).toISOString() : value;
}

function cleanBingValue(value) {
  if (Array.isArray(value)) return value.map(cleanBingValue);
  if (!value || typeof value !== "object") return normalizeBingDate(value);

  const cleaned = {};
  for (const [key, child] of Object.entries(value)) {
    if (key === "__type") continue;
    cleaned[key] = cleanBingValue(child);
  }
  return cleaned;
}

async function bingGet(method, params = {}) {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value != null) search.set(key, String(value));
  }
  search.set("apikey", bingApiKey);

  const response = await fetch(`${bingBaseUrl}/${method}?${search.toString()}`, {
    headers: {
      accept: "application/json",
      "user-agent": "TexasDefinedBingWebmasterCollector/1.1",
    },
    redirect: "follow",
  });

  if (!response.ok) {
    const body = (await response.text()).slice(0, 500);
    throw new Error(`Bing ${method} returned HTTP ${response.status}${body ? `: ${body}` : ""}`);
  }

  const payload = await response.json();
  return cleanBingValue(payload?.d);
}

async function bingPost(method, body) {
  const search = new URLSearchParams({ apikey: bingApiKey });
  const response = await fetch(`${bingBaseUrl}/${method}?${search.toString()}`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json; charset=utf-8",
      "user-agent": "TexasDefinedBingWebmasterCollector/1.2",
    },
    redirect: "follow",
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const responseBody = (await response.text()).slice(0, 500);
    throw new Error(`Bing ${method} returned HTTP ${response.status}${responseBody ? `: ${responseBody}` : ""}`);
  }

  const payload = await response.json();
  return cleanBingValue(payload?.d);
}

function normalizedHostname(url) {
  try {
    return new URL(url).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return "";
  }
}

async function insertSnapshot(snapshot) {
  const response = await fetch(`${supabaseUrl}/rest/v1/texasdefined_bing_webmaster_snapshots`, {
    method: "POST",
    headers: {
      apikey: supabaseServiceRoleKey,
      authorization: `Bearer ${supabaseServiceRoleKey}`,
      "content-type": "application/json",
      prefer: "return=minimal",
    },
    body: JSON.stringify(snapshot),
  });

  if (!response.ok) {
    const body = (await response.text()).slice(0, 1000);
    throw new Error(`Supabase snapshot insert returned HTTP ${response.status}${body ? `: ${body}` : ""}`);
  }
}

const userSitesRaw = asArray(await bingGet("GetUserSites"));
const userSites = userSitesRaw.map(({ Url, IsVerified }) => ({ Url, IsVerified }));
const verifiedSitesByHost = new Map(
  userSites
    .filter((candidate) => candidate.IsVerified === true)
    .map((candidate) => [normalizedHostname(candidate.Url), candidate]),
);

const missingHosts = targetHosts.filter((host) => !verifiedSitesByHost.has(host));
if (missingHosts.length > 0) {
  const verifiedHosts = [...verifiedSitesByHost.keys()].filter(Boolean).sort();
  throw new Error(
    `Verified Bing Webmaster site access is missing for: ${missingHosts.join(", ")}. Verified hosts visible to this API key: ${verifiedHosts.join(", ") || "none"}.`,
  );
}

const results = [];
for (const host of targetHosts) {
  const site = verifiedSitesByHost.get(host);
  const siteUrl = site.Url;
  const requestForSite = (method) => bingGet(method, { siteUrl });

  const [rankTraffic, queryStats, pageStats, crawlStats, crawlIssues, initialFeeds] = await Promise.all([
    requestForSite("GetRankAndTrafficStats").then(asArray),
    requestForSite("GetQueryStats").then(asArray),
    requestForSite("GetPageStats").then(asArray),
    requestForSite("GetCrawlStats").then(asArray),
    requestForSite("GetCrawlIssues").then(asArray),
    requestForSite("GetFeeds").then(asArray),
  ]);

  const canonicalFeedUrl = `https://${host}/sitemap.xml`;
  let feeds = initialFeeds;
  let canonicalFeedSubmitted = false;
  if (!feeds.some((feed) => feed?.Url === canonicalFeedUrl)) {
    await bingPost("SubmitFeed", { siteUrl, feedUrl: canonicalFeedUrl });
    canonicalFeedSubmitted = true;
    feeds = asArray(await requestForSite("GetFeeds"));
  }

  const canonicalFeed = feeds.find((feed) => feed?.Url === canonicalFeedUrl);
  let legacyFeedAliasesRemoved = 0;
  if (canonicalFeed?.Status === "Success") {
    const legacyFeedAliases = feeds.filter((feed) => {
      if (!feed?.Url || feed.Url === canonicalFeedUrl) return false;
      try {
        const url = new URL(feed.Url);
        const feedHost = url.hostname.toLowerCase().replace(/^www\./, "");
        const feedPath = url.pathname.replace(/\/+$/, "") || "/";
        return feedHost === host && feedPath === "/sitemap.xml";
      } catch {
        return false;
      }
    });

    for (const feed of legacyFeedAliases) {
      await bingPost("RemoveFeed", { siteUrl, feedUrl: feed.Url });
      legacyFeedAliasesRemoved += 1;
    }
    if (legacyFeedAliasesRemoved > 0) {
      feeds = asArray(await requestForSite("GetFeeds"));
    }
  }

  const fetchedAt = new Date().toISOString();
  await insertSnapshot({
    fetched_at: fetchedAt,
    site_url: siteUrl,
    collector_version: collectorVersion,
    user_sites: userSites,
    rank_traffic: rankTraffic,
    query_stats: queryStats,
    page_stats: pageStats,
    crawl_stats: crawlStats,
    crawl_issues: crawlIssues,
    feeds,
  });

  results.push({
    fetchedAt,
    siteUrl,
    counts: {
      userSites: userSites.length,
      rankTraffic: rankTraffic.length,
      queryStats: queryStats.length,
      pageStats: pageStats.length,
      crawlStats: crawlStats.length,
      crawlIssues: crawlIssues.length,
      feeds: feeds.length,
    },
    canonicalFeedUrl,
    canonicalFeedSubmitted,
    legacyFeedAliasesRemoved,
  });
}

console.log(JSON.stringify({ ok: true, sites: results }));
