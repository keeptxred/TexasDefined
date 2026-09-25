import fs from "node:fs";

const DATASET = "texas_defined_outcomes";
const DEFAULT_DAYS = 30;
const MAX_DAYS = 90;
const MAX_ROWS = 10_000;

function required(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is required.`);
  return value;
}

function reportDays() {
  const raw = process.env.REPORT_WINDOW_DAYS?.trim();
  if (!raw) return DEFAULT_DAYS;
  const value = Number(raw);
  if (!Number.isInteger(value) || value < 1 || value > MAX_DAYS) {
    throw new Error(`REPORT_WINDOW_DAYS must be an integer from 1-${MAX_DAYS}.`);
  }
  return value;
}

function count(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function parseResource(resourceId) {
  const parts = String(resourceId || "").split(":");
  if (parts[0] !== "unusual-business" || parts.length < 3) return null;
  return { target: parts[1], placement: parts.slice(2).join(":") };
}

function percent(clicks, impressions) {
  if (!impressions) return 0;
  return Math.round((clicks / impressions) * 10_000) / 100;
}

async function query(accountId, apiToken, days) {
  const sql = `SELECT
    blob1 AS eventName,
    blob2 AS resourceId,
    blob6 AS destination,
    blob7 AS entityKind,
    blob11 AS sourcePath,
    SUM(_sample_interval) AS eventCount
  FROM ${DATASET}
  WHERE timestamp > NOW() - INTERVAL '${days}' DAY
    AND blob1 IN ('resource_opened', 'internal_link_shown', 'internal_link_clicked')
    AND blob7 = 'unusual-business-experiment'
    AND startsWith(blob2, 'unusual-business:')
  GROUP BY eventName, resourceId, destination, entityKind, sourcePath
  ORDER BY eventCount DESC
  LIMIT ${MAX_ROWS}
  FORMAT JSON`;

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/analytics_engine/sql`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${apiToken}` },
      body: sql,
    },
  );
  const body = await response.text();
  if (!response.ok) {
    throw new Error(`Cloudflare Analytics Engine query failed with HTTP ${response.status}: ${body.slice(0, 500)}`);
  }
  let payload;
  try { payload = JSON.parse(body); }
  catch { throw new Error("Cloudflare Analytics Engine returned invalid JSON."); }
  if (!payload || !Array.isArray(payload.data)) throw new Error("Cloudflare Analytics Engine returned an unexpected response shape.");
  if (payload.data.length >= MAX_ROWS) throw new Error(`Analytics query reached the ${MAX_ROWS}-row safety cap.`);
  return payload.data;
}

function aggregate(rows) {
  const targets = new Map();
  const placements = new Map();

  for (const row of rows) {
    const parsed = parseResource(row.resourceId);
    if (!parsed) continue;
    const eventCount = count(row.eventCount);
    const isView = row.eventName === "resource_opened" && parsed.placement === "page-view";
    const isClick = row.eventName === "internal_link_clicked";
    const isShown = row.eventName === "internal_link_shown";
    if (!isView && !isClick && !isShown) continue;

    const target = targets.get(parsed.target) ?? { target: parsed.target, views: 0, impressions: 0, clicks: 0 };
    if (isView) target.views += eventCount;
    if (isClick) target.clicks += eventCount;
    if (isShown) target.impressions += eventCount;
    targets.set(parsed.target, target);

    if (isView) continue;

    const sourcePath = String(row.sourcePath || "");
    const destination = String(row.destination || "");
    const placementKey = [parsed.target, parsed.placement, sourcePath, destination].join("\u0000");
    const placement = placements.get(placementKey) ?? {
      target: parsed.target,
      placement: parsed.placement,
      sourcePath,
      destination,
      impressions: 0,
      clicks: 0,
    };
    if (isClick) placement.clicks += eventCount;
    if (isShown) placement.impressions += eventCount;
    placements.set(placementKey, placement);
  }

  const targetRows = [...targets.values()]
    .map((row) => ({ ...row, ctrPercent: percent(row.clicks, row.impressions) }))
    .sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions || a.target.localeCompare(b.target));

  const placementRows = [...placements.values()]
    .map((row) => ({ ...row, ctrPercent: percent(row.clicks, row.impressions) }))
    .sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions || a.target.localeCompare(b.target));

  const totals = targetRows.reduce(
    (sum, row) => ({ views: sum.views + row.views, impressions: sum.impressions + row.impressions, clicks: sum.clicks + row.clicks }),
    { views: 0, impressions: 0, clicks: 0 },
  );

  return {
    totals: { ...totals, ctrPercent: percent(totals.clicks, totals.impressions) },
    targets: targetRows,
    placements: placementRows,
  };
}

function markdown(report, days) {
  const lines = [
    `## Unusual Texas business experiment — last ${days} days`,
    "",
    `**Page views:** ${report.totals.views} · **Link impressions:** ${report.totals.impressions} · **Clicks:** ${report.totals.clicks} · **CTR:** ${report.totals.ctrPercent}%`,
    "",
    "### By target",
    "",
    "| Target | Page views | Link impressions | Clicks | CTR |",
    "|---|---:|---:|---:|---:|",
  ];
  for (const row of report.targets) {
    lines.push(`| ${row.target} | ${row.views} | ${row.impressions} | ${row.clicks} | ${row.ctrPercent}% |`);
  }
  if (!report.targets.length) lines.push("| No tracked events yet | 0 | 0 | 0 | 0% |");

  lines.push("", "### By placement", "", "| Target | Placement | Source | Destination | Impressions | Clicks | CTR |", "|---|---|---|---|---:|---:|---:|");
  for (const row of report.placements.slice(0, 100)) {
    lines.push(`| ${row.target} | ${row.placement} | ${row.sourcePath || "—"} | ${row.destination || "—"} | ${row.impressions} | ${row.clicks} | ${row.ctrPercent}% |`);
  }
  if (!report.placements.length) lines.push("| No tracked events yet | — | — | — | 0 | 0 | 0% |");
  return `${lines.join("\n")}\n`;
}

const days = reportDays();
const rows = await query(required("CLOUDFLARE_ACCOUNT_ID"), required("CLOUDFLARE_API_TOKEN"), days);
const report = aggregate(rows);
const output = {
  generatedAt: new Date().toISOString(),
  windowDays: days,
  privacy: "Aggregate experiment page views plus internal-link impressions and clicks only; no session identifiers, visitor identifiers or query text.",
  ...report,
};

console.log("UNUSUAL_BUSINESS_EXPERIMENT_REPORT");
console.log(JSON.stringify(output, null, 2));

const summaryPath = process.env.GITHUB_STEP_SUMMARY;
if (summaryPath) fs.appendFileSync(summaryPath, markdown(report, days), "utf8");
