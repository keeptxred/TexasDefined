#!/usr/bin/env node
// Scheduled evidence-only source refresh for both Texas flag authority pages.
// Historical copy and "Updated" dates cannot be changed based only on HTTP 200.
// Material primary-source drift generates an isolated source-review PR; it never
// silently rewrites facts, fabricates author review or bypasses editorial QA.
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const STATE_PATH = "ops/editorial/texas-flag-source-state.json";
export const REPORT_PATH = ".artifacts/texas-flag-source-review.json";
export const PROPOSAL_PATH = "ops/editorial/texas-flag-scheduled-refresh-proposal.md";
export const SOURCES = [
  {
    id: "handbook", title: "Handbook of Texas: Flags of Texas",
    url: "https://www.tshaonline.org/handbook/entries/flags-of-texas",
    required: ["December 10, 1836", "January 25, 1839"],
    affected: ["/texas-flag", "/article/history-of-the-texas-flag"],
    subject: "1836 Burnet standard, 1836 naval ensign, 1839 Lone Star flag, disputed historical attribution",
  },
  {
    id: "archive", title: "Texas State Library: original 1839 flag drawing",
    url: "https://www.tsl.texas.gov/historicflags/1974066001LoneStar.html",
    required: ["January 25, 1839"],
    affected: ["/texas-flag", "/article/history-of-the-texas-flag"],
    subject: "original artwork, signed approval and provenance of the flag-and-seal drawing",
  },
  {
    id: "flag-code", title: "Texas Government Code Chapter 3100",
    url: "https://tcss.legis.texas.gov/resources/GV/htm/GV.3100.htm",
    required: ["3100.002"],
    affected: ["/texas-flag", "/article/texas-flag-etiquette-display-guide"],
    subject: "flag geometry, statutory colors, pledge and display",
  },
  {
    id: "flag-day", title: "Texas Government Code section 662.048",
    url: "https://tcss.legis.texas.gov/resources/GV/htm/GV.662.htm",
    required: ["662.048"],
    affected: ["/texas-flag", "/article/history-of-the-texas-flag"],
    subject: "March 2 Texas Flag Day law",
  },
];

function visibleText(html) {
  return html
    .replace(/<(script|style|noscript|svg)\b[^>]*>[\s\S]*?<\/\1>/gi, " ")
    .replace(/<!--[^]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/\s+/g, " ").trim();
}

export function sourceEvidence(html, required) {
  const body = visibleText(html);
  if (body.length < 400) throw new Error("Official document text was unexpectedly short");
  const parts = [];
  for (const term of required) {
    const at = body.toLowerCase().indexOf(term.toLowerCase());
    if (at < 0) throw new Error("Required historical/legal anchor missing: " + term);
    // Hash only small, relevant source contexts to avoid navbar/ad churn.
    const context = body.slice(Math.max(0, at - 135), Math.min(body.length, at + term.length + 250))
      .replace(/\b(?:updated|accessed|printed|copyright)\s+\d{4}[-/]\d\d[-/]\d\d\b/gi, "date");
    parts.push(context);
  }
  const digest = createHash("sha256").update(parts.join("|")).digest("hex");
  return { hash: digest, anchors: required, sourceChars: body.length };
}

export async function refreshTexasFlagSources({
  fetchImpl = fetch,
  statePath = STATE_PATH,
  reportPath = REPORT_PATH,
  proposalPath = PROPOSAL_PATH,
  now = new Date(),
  sourceList = SOURCES,
} = {}) {
  let old = { schemaVersion: 1, sources: [] };
  try {
    old = JSON.parse(await readFile(statePath, "utf8"));
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }
  if (old.schemaVersion !== 1 || !Array.isArray(old.sources)) throw new Error("Invalid source baseline schema");
  const previous = new Map(old.sources.map(x => [x.id, x]));
  const changes = [];
  const checks = [];
  for (const source of sourceList) {
    const response = await fetchImpl(source.url, {
      headers: { accept: "text/html", "user-agent": "TexasDefined-Source-Monitor/1.0 (+https://texasdefined.com/editorial-policy)" },
      redirect: "follow",
      signal: AbortSignal.timeout(25000),
    });
    if (!response.ok) throw new Error(source.id + ": source HTTP " + response.status);
    const evidence = sourceEvidence(await response.text(), source.required);
    const last = previous.get(source.id)?.hash ?? null;
    const drift = last !== evidence.hash;
    checks.push({ id: source.id, url: source.url, hash: evidence.hash,
      historicalSourceChanged: drift, baselineHash: last, observedSourceChars: evidence.sourceChars,
      requiredAnchorsVerified: evidence.anchors });
    if (drift) changes.push({ id: source.id, title: source.title, url: source.url,
      affected: source.affected, subject: source.subject, type: last ? "changed" : "initial-baseline" });
  }
  const report = {
    observedAt: now.toISOString(), reportType: "primary-source-drift-evidence",
    docs: ["/texas-flag", "/article/history-of-the-texas-flag", "/article/texas-flag-etiquette-display-guide"],
    note: "Source context hashes and anchors are not editorial approval of new historical facts. Propose source-backed changes through an independent reviewed PR.",
    checks, changes,
  };
  await mkdir(dirname(reportPath), { recursive: true });
  await writeFile(reportPath, JSON.stringify(report, null, 2) + "\n");
  if (changes.length) {
    const state = { schemaVersion: 1, sources: checks.map(x => ({ id: x.id, url: x.url, hash: x.hash })) };
    await mkdir(dirname(statePath), { recursive: true });
    await writeFile(statePath, JSON.stringify(state, null, 2) + "\n");
    const lines = [
      "# Automated Texas flag source refresh proposal",
      "",
      "This source review was generated by the recurring GitHub schedule on " + report.observedAt + ".",
      "Its only assertion is that the primary sources' monitored historical/legal passages were readable and their hashes changed or had no previous baseline.",
      "",
      "## Official source changes",
    ];
    for (const change of changes) {
      lines.push("", "### " + change.title, "", "- Source: " + change.url,
        "- Change type: " + change.type, "- Sections to reassess: " + change.affected.join(", "),
        "- Topic: " + change.subject);
    }
    lines.push("", "## Research and rewrite gate",
      "", "1. Inspect the full official documents and the corresponding current article sections.",
      "2. Identify actual material differences; a site-layout update or hash change is not a factual correction.",
      "3. If a new fact, law, or source attribution is independently verified, rewrite the affected paragraphs in a separate protected content PR. Add inline official citations and appropriate contextual cross-links.",
      "4. Run the flag source validator, exact live canonical/sitemap/robots verification, and mobile/desktop performance checks after the protected deployment.",
      "5. Update public `Updated` and sitemap `lastmod` dates only when the public article was substantively changed; never rewrite a date just to look fresh.",
      "", "No researched public page text was changed by this automated source-watch job.",
      "");
    await mkdir(dirname(proposalPath), { recursive: true });
    await writeFile(proposalPath, lines.join("\n"));
  }
  console.log("TEXAS_FLAG_SOURCE_REFRESH " + JSON.stringify({
    checked: checks.length, changes: changes.map(x => x.id), evidencePath: reportPath,
    editorialRevisionRequired: changes.some(x => x.type === "changed"),
  }));
  return report;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url))
  await refreshTexasFlagSources();
