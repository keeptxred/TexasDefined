import process from "node:process";

const collectorVersion = "2026-09-18.1";
const bingApiKey = process.env.BING_WEBMASTER_API_KEY?.trim();
const supabaseUrl = process.env.SUPABASE_URL?.trim().replace(/\/$/, "");
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
const targetHost = (process.env.BING_WEBMASTER_SITE_HOST || "texasdefined.com").trim().toLowerCase();
const bingBaseUrl = "https://ssl.bing.com/webmaster/api.svc/json";

if (!bingApiKey) throw new Error("BING_WEBMASTER_API_KEY is required.");
if (!supabaseUrl) throw new Error("SUPABASE_URL is required.");
if (!supabaseServiceRoleKey) throw new Error("SUPABASE_SERVICE_ROLE_KEY is required.");

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
      "user-agent": "TexasDefinedBingWebmasterCollector/1.0",
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
const site = userSites.find(
  (candidate) => candidate.IsVerified === true && normalizedHostname(candidate.Url) === targetHost,
);

if (!site) {
  const verifiedHosts = userSites
    .filter((candidate) => candidate.IsVerified === true)
    .map((candidate) => normalizedHostname(candidate.Url))
    .filter(Boolean);
  throw new Error(
    `No verified Bing Webmaster site matched ${targetHost}. Verified hosts visible to this API key: ${verifiedHosts.join(", ") || "none"}.`,
  );
}

const siteUrl = site.Url;
const requestForSite = (method) => bingGet(method, { siteUrl });

const rankTraffic = asArray(await requestForSite("GetRankAndTrafficStats"));
const queryStats = asArray(await requestForSite("GetQueryStats"));
const pageStats = asArray(await requestForSite("GetPageStats"));
const crawlStats = asArray(await requestForSite("GetCrawlStats"));
const crawlIssues = asArray(await requestForSite("GetCrawlIssues"));
const feeds = asArray(await requestForSite("GetFeeds"));

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

console.log(
  JSON.stringify({
    ok: true,
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
  }),
);
