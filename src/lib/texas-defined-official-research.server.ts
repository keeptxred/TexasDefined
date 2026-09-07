import { TEXAS_DATA_SOURCES, type TexasDataDomain, type TexasDataSource } from "../data/texas-data-sources";

export type OfficialResearchSource = {
  authority: string;
  title: string;
  url: string;
  retrievedAt: string;
  snippet: string;
};

type ResearchSeed = Pick<TexasDataSource, "authority" | "title" | "url" | "domain" | "format" | "canonical" | "notes">;

const FETCH_TIMEOUT_MS = 3_500;
const MAX_RAW_CHARS = 120_000;
const MAX_SNIPPET_CHARS = 5_500;
const MAX_RESEARCH_SOURCES = 2;

const DOMAIN_KEYWORDS: Partial<Record<TexasDataDomain, string[]>> = {
  places: ["city", "town", "place", "population", "located"],
  counties: ["county", "counties", "county seat"],
  water: ["water", "lake", "river", "reservoir", "aquifer", "drought"],
  "school-districts": ["school", "schools", "district", "isd", "education", "student"],
  agencies: ["agency", "department", "state office", "government"],
  parks: ["park", "parks", "camp", "camping", "trail", "trails", "hike", "hiking"],
  forests: ["forest", "forests", "grassland", "grasslands"],
  wildlife: ["wildlife", "species", "animal", "animals", "hunt", "hunting", "fish", "fishing"],
  utilities: ["electric", "electricity", "utility", "utilities", "water system", "provider"],
  "appraisal-districts": ["property tax", "appraisal", "cad", "homestead", "exemption"],
  "tax-offices": ["tax office", "registration", "vehicle title", "dmv"],
  tourism: ["visit", "trip", "travel", "stay", "hotel", "vacation", "weekend", "attraction"],
  events: ["event", "events", "festival", "festivals", "rodeo", "concert", "fair", "ticket"],
  elections: ["vote", "voting", "election", "elections", "ballot", "registration deadline"],
  representatives: ["representative", "senator", "legislator", "district", "bill", "legislation"],
};

const EXTRA_SEEDS: Array<ResearchSeed & { keywords: string[] }> = [
  {
    authority: "Texas Department of Transportation",
    title: "TxDOT road and transportation information",
    url: "https://www.txdot.gov/",
    domain: "agencies",
    format: "html",
    canonical: true,
    notes: "Use TxDOT for Texas highway, road, construction, travel and transportation information.",
    keywords: ["road", "roads", "highway", "highways", "frontage", "fm", "rm", "txdot", "traffic", "construction"],
  },
  {
    authority: "National Weather Service",
    title: "National Weather Service Texas weather information",
    url: "https://www.weather.gov/",
    domain: "agencies",
    format: "html",
    canonical: true,
    notes: "Use NWS for forecasts, watches, warnings and weather-sensitive current conditions.",
    keywords: ["weather", "forecast", "storm", "hurricane", "tornado", "freeze", "heat", "flood", "warning", "watch"],
  },
  {
    authority: "Texas Legislature Online",
    title: "Texas Legislature Online",
    url: "https://capitol.texas.gov/",
    domain: "agencies",
    format: "html",
    canonical: true,
    notes: "Use Texas Legislature Online and official statutes for current bills, legislative actions and enacted law references.",
    keywords: ["law", "laws", "bill", "bills", "legislature", "legislation", "statute", "statutes"],
  },
];

const STOP_WORDS = new Set([
  "about", "after", "again", "also", "and", "any", "are", "best", "can", "could", "defined", "does",
  "for", "from", "good", "have", "help", "how", "into", "near", "of", "please", "should", "show", "tell",
  "texas", "that", "the", "their", "there", "this", "to", "want", "what", "when", "where", "which", "who",
  "why", "with", "would", "you", "your",
]);

function queryTokens(question: string) {
  return question
    .toLowerCase()
    .replace(/h-e-b/g, "heb")
    .replace(/buc[-’']?ee['’]?s/g, "buc ee")
    .replace(/[^a-z0-9]+/g, " ")
    .split(/\s+/)
    .filter((token) => token.length >= 2 && !STOP_WORDS.has(token))
    .slice(0, 30);
}

function phraseMatches(question: string, phrases: string[]) {
  const lower = question.toLowerCase();
  return phrases.reduce((score, phrase) => score + (lower.includes(phrase) ? Math.max(1, phrase.split(/\s+/).length) : 0), 0);
}

function seedScore(question: string, seed: ResearchSeed, extraKeywords: string[] = []) {
  const domainKeywords = DOMAIN_KEYWORDS[seed.domain] ?? [];
  return phraseMatches(question, [...domainKeywords, ...extraKeywords])
    + phraseMatches(question, seed.title.toLowerCase().split(/[,;:]/).map((value) => value.trim()).filter(Boolean));
}

function selectSeeds(question: string) {
  const candidates: Array<{ seed: ResearchSeed; score: number }> = [];
  for (const source of TEXAS_DATA_SOURCES) {
    if (!source.canonical || source.format === "shared-platform") continue;
    const score = seedScore(question, source);
    if (score > 0) candidates.push({ seed: source, score });
  }
  for (const source of EXTRA_SEEDS) {
    const score = seedScore(question, source, source.keywords);
    if (score > 0) candidates.push({ seed: source, score });
  }

  const unique = new Map<string, { seed: ResearchSeed; score: number }>();
  for (const candidate of candidates.sort((a, b) => b.score - a.score)) {
    const key = candidate.seed.url;
    if (!unique.has(key)) unique.set(key, candidate);
  }
  return [...unique.values()].slice(0, MAX_RESEARCH_SOURCES).map((candidate) => candidate.seed);
}

function registeredRootHostname(url: string) {
  return new URL(url).hostname.toLowerCase().replace(/^www\./, "");
}

function isAllowedOfficialUrl(candidate: URL, seed: ResearchSeed) {
  if (candidate.protocol !== "https:") return false;
  const root = registeredRootHostname(seed.url);
  const host = candidate.hostname.toLowerCase().replace(/^www\./, "");
  return host === root || host.endsWith(`.${root}`);
}

function stripHtml(value: string) {
  return value
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<svg\b[\s\S]*?<\/svg>/gi, " ")
    .replace(/<noscript\b[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;|&#34;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function pageTitle(html: string, fallback: string) {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return stripHtml(match?.[1] ?? fallback).slice(0, 180) || fallback;
}

function relevantSnippet(text: string, tokens: string[]) {
  if (!text) return "";
  const chunks = text
    .split(/(?<=[.!?])\s+|\s+[|•]\s+/)
    .map((chunk) => chunk.trim())
    .filter((chunk) => chunk.length >= 35 && chunk.length <= 900);

  const scored = chunks.map((chunk, index) => {
    const lower = chunk.toLowerCase();
    let score = 0;
    for (const token of tokens) if (lower.includes(token)) score += token.length >= 6 ? 2 : 1;
    return { chunk, index, score };
  });

  const selected = scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, 10)
    .sort((a, b) => a.index - b.index)
    .map((item) => item.chunk)
    .join(" ");

  return (selected || text.slice(0, MAX_SNIPPET_CHARS)).slice(0, MAX_SNIPPET_CHARS);
}

function linkCandidates(html: string, pageUrl: string, seed: ResearchSeed, tokens: string[]) {
  const candidates: Array<{ url: string; label: string; score: number }> = [];
  const regex = /<a\b[^>]*href\s*=\s*["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(html)) && candidates.length < 250) {
    let resolved: URL;
    try {
      resolved = new URL(match[1], pageUrl);
    } catch {
      continue;
    }
    if (!isAllowedOfficialUrl(resolved, seed)) continue;
    const label = stripHtml(match[2]).slice(0, 240);
    const haystack = `${label} ${resolved.pathname.replace(/%[0-9a-f]{2}/gi, " ")}`.toLowerCase();
    let score = 0;
    for (const token of tokens) {
      if (haystack.includes(token)) score += token.length >= 6 ? 2 : 1;
    }
    if (score > 0) candidates.push({ url: resolved.toString(), label, score });
  }
  return candidates.sort((a, b) => b.score - a.score || b.label.length - a.label.length);
}

async function fetchOfficialPage(url: string, seed: ResearchSeed) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        Accept: "text/html, text/plain;q=0.9, */*;q=0.1",
        "User-Agent": "TexasDefinedResearch/1.0 (+https://texasdefined.com/citation-guide)",
      },
    });
    if (!response.ok) return null;
    const finalUrl = new URL(response.url || url);
    if (!isAllowedOfficialUrl(finalUrl, seed)) return null;
    const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";
    if (contentType && !contentType.includes("text/html") && !contentType.includes("text/plain")) return null;
    const html = (await response.text()).slice(0, MAX_RAW_CHARS);
    return { html, url: finalUrl.toString() };
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function researchSeed(seed: ResearchSeed, tokens: string[]): Promise<OfficialResearchSource | null> {
  const root = await fetchOfficialPage(seed.url, seed);
  if (!root) return null;

  const candidates = linkCandidates(root.html, root.url, seed, tokens);
  const best = candidates[0];
  let selected = root;
  if (best && best.score >= 2 && best.url !== root.url) {
    const detail = await fetchOfficialPage(best.url, seed);
    if (detail) selected = detail;
  }

  const text = stripHtml(selected.html);
  const snippet = relevantSnippet(text, tokens);
  if (!snippet) return null;

  return {
    authority: seed.authority,
    title: pageTitle(selected.html, seed.title),
    url: selected.url,
    retrievedAt: new Date().toISOString(),
    snippet,
  };
}

export async function researchOfficialQuestion(question: string): Promise<OfficialResearchSource[]> {
  const tokens = queryTokens(question);
  if (!tokens.length) return [];
  const seeds = selectSeeds(question);
  if (!seeds.length) return [];

  const results = await Promise.all(seeds.map((seed) => researchSeed(seed, tokens)));
  return results.filter((result): result is OfficialResearchSource => Boolean(result)).slice(0, MAX_RESEARCH_SOURCES);
}

export function buildOfficialResearchContext(sources: OfficialResearchSource[]) {
  if (!sources.length) return "No live official-source page could be retrieved for this question.";
  return sources.map((source, index) => [
    `[O${index + 1}] ${source.authority} — ${source.title}`,
    `URL: ${source.url}`,
    `Retrieved: ${source.retrievedAt}`,
    `Official page excerpt: ${source.snippet}`,
  ].join("\n")).join("\n\n");
}
