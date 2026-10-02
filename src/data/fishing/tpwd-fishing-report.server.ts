import type { TpwdFishingReportSnapshot } from "./tpwd-fishing-report.types";

const REPORT_TIMEOUT_MS = 8_000;
const CURRENT_WINDOW_DAYS = 14;
const STALE_WINDOW_DAYS = 90;
const TPWD_REPORT_BASE = "https://tpwd.texas.gov/fishboat/fish/action/reptform2.php";

function decodeHtml(value: string) {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
}

function htmlToText(html: string) {
  return decodeHtml(
    html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>|<\/div>|<\/li>|<\/tr>|<\/h\d>/gi, "\n")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/[ \t]+/g, " ")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function lakeCodeFromSource(sourceUrl: string) {
  try {
    const url = new URL(sourceUrl);
    const explicit = url.searchParams.get("lake");
    if (explicit) return explicit;
    const match = url.pathname.match(/\/recreational\/lakes\/([^/]+)\/?$/i);
    return match?.[1] ?? null;
  } catch {
    return null;
  }
}

function reportUrlForSource(sourceUrl: string) {
  const code = lakeCodeFromSource(sourceUrl);
  if (!code) return null;
  const url = new URL(TPWD_REPORT_BASE);
  url.searchParams.set("Submit", "Go");
  url.searchParams.set("archive", "wholeyear");
  url.searchParams.set("lake", code.toUpperCase());
  url.searchParams.set("yearcat", "current");
  return url.toString();
}

function isoDate(month: string, day: string, year: string) {
  const parsed = new Date(`${month} ${day}, ${year} 12:00:00 UTC`);
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString().slice(0, 10);
}

function classifyFreshness(publishedAt: string, now = new Date()) {
  const published = Date.parse(`${publishedAt}T12:00:00Z`);
  if (!Number.isFinite(published)) return "historical" as const;
  const ageDays = Math.max(0, (now.getTime() - published) / 86_400_000);
  if (ageDays <= CURRENT_WINDOW_DAYS) return "current" as const;
  if (ageDays <= STALE_WINDOW_DAYS) return "stale" as const;
  return "historical" as const;
}

export function parseTpwdFishingReport(sourceUrl: string, html: string): TpwdFishingReportSnapshot | null {
  const reportUrl = reportUrlForSource(sourceUrl);
  if (!reportUrl) return null;

  const text = htmlToText(html);
  const notice = text
    .split("\n")
    .map((line) => line.trim())
    .find((line) =>
      line.length >= 20 &&
      line.length <= 700 &&
      /\b(?:fishing reports?|reporting)\b/i.test(line) &&
      !/^Fishing Report$/i.test(line) &&
      !/^Weekly Fishing Reports$/i.test(line) &&
      /[.!?]$/.test(line),
    ) ?? null;
  const datePattern = /\b(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+(\d{1,2}),\s+(20\d{2})\b/g;
  const matches = [...text.matchAll(datePattern)];
  if (!matches.length) return null;

  const first = matches[0];
  const publishedAt = isoDate(first[1], first[2], first[3]);
  if (!publishedAt || first.index === undefined) return null;
  const nextIndex = matches[1]?.index ?? text.length;
  let summary = text.slice(first.index + first[0].length, nextIndex).trim();
  summary = summary
    .replace(/^[-–—:\s]+/, "")
    .replace(/\s+/g, " ")
    .replace(/(?:Past fishing reports remain available during this transition\.?)/gi, "")
    .trim();
  if (!summary) return null;
  if (summary.length > 1_600) summary = `${summary.slice(0, 1_597).trimEnd()}...`;

  return {
    publishedAt,
    summary,
    sourceUrl: reportUrl,
    sourceNotice: notice,
    freshness: classifyFreshness(publishedAt),
  };
}

export async function loadLatestTpwdFishingReport(sourceUrl: string): Promise<TpwdFishingReportSnapshot | null> {
  const reportUrl = reportUrlForSource(sourceUrl);
  if (!reportUrl) return null;

  try {
    const response = await fetch(reportUrl, {
      cache: "no-store",
      redirect: "follow",
      headers: {
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "user-agent": "Mozilla/5.0 (compatible; TexasDefined/1.0; +https://texasdefined.com)",
      },
      signal: AbortSignal.timeout(REPORT_TIMEOUT_MS),
    });
    if (!response.ok) return null;
    return parseTpwdFishingReport(sourceUrl, await response.text());
  } catch {
    return null;
  }
}
