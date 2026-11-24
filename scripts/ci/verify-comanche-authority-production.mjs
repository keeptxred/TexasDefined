#!/usr/bin/env node
/**
 * Comanche three-canonical public release acceptance.
 * Invoke after a successful deploy, or on the weekly drift-monitor schedule.
 * No remote source row is allowed to replace November 2026 reviewed copy.
 */
import { setTimeout as delay } from "node:timers/promises";

const host = process.env.COMANCHE_PUBLIC_ORIGIN?.replace(/\/$/, "") || "https://texasdefined.com";
const targets = [
  {
    path: "/explore/small-towns",
    evidence: ["Comanche", "JW Hardin Wine Co. tasting room; Brennan Vineyards history", "Old Cora Courthouse", "Fleming Oak"],
  },
  {
    path: "/destination/comanche",
    evidence: ["Clint and Jami Tunnell", "Fleming Oak", "Old Cora", "Brennan Vineyards", "Comanche Square Walking Tour", "National Register of Historic Places", "Brennan Vineyards", "December 30, 2025", "JW Hardin Wine Co.", "roof replacement", "Preservation Trust Fund"],
  },
  {
    path: "/county/comanche",
    evidence: ["Clint and Jami Tunnell", "Fleming Oak", "Old Cora", "Comanche County Historical Museum", "Guide updated", "Comanche Downtown Historic District", "Brennan Vineyards", "December 30, 2025", "JW Hardin Wine Co.", "roof replacement", "Preservation Trust Fund"],
  },
  {
    path: "/destination/comanche-county-historical-museum",
    evidence: ["Jack Wright Saloon", "blacksmith", "free general admission", "Comanche Square Walking Tour", "comanche-county-historical-museum-editorial.svg", "The museum confirms free general admission", "No. Its official homepage states general admission is free", "Brennan Vineyards", "December 30, 2025", "JW Hardin Wine Co.", "roof replacement", "Preservation Trust Fund"],
  },
];

const normalize = (html) => html
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/&nbsp;|&#160;/gi, " ")
  .replace(/&amp;/gi, "&")
  .replace(/&#(?:39|x27);|&apos;/gi, "'")
  .replace(/&quot;/gi, '"')
  .replace(/\s+/g, " ");

function verify({ path, evidence }, html) {
  const text = normalize(html);
  const missing = evidence.filter((phrase) => !(text.includes(phrase) || html.includes(phrase)));
  const tags = [...html.matchAll(/<meta\b[^>]*>/gi)].map((match) => match[0]);
  const robots = tags.filter((tag) => /name=["']robots["']/i.test(tag));
  if (robots.some((tag) => /noindex/i.test(tag))) missing.push("indexable robots directive (found noindex)");
  if (!html.includes(`https://texasdefined.com${path}`)) missing.push("canonical absolute URL");
  if (text.length < 4000) missing.push("substantial server-rendered page content");
  if (path !== "/explore/small-towns" && !html.includes("texas-preservation-trust-fund-benefits-historic-tavern-dance-hall-log-courthouse-more")) missing.push("primary-source Old Cora preservation grant link");
  if (path === "/explore/small-towns" && text.includes("Brennan Vineyards and JW Hardin Wine Co.")) missing.push("stale Comanche wine recommendations in small-towns directory");
  const obsoleteBrennanAdvice = [
    "Brennan Vineyards at 802 South Austin Street makes Texas wine",
    "Brennan Vineyards at 802 South Austin Street in Comanche produces Texas wine",
    "Brennan Vineyards and JW Hardin Wine Co. both maintain official local presences",
    "preconfirmed Brennan Vineyards or JW Hardin tasting",
    "Texas-made wine at the historic McCrary homestead, 802 S. Austin St; confirm tasting reservations",
  ];
  if (obsoleteBrennanAdvice.some((advice) => text.includes(advice))) missing.push("obsolete Brennan Comanche tasting-room recommendation");
  if (path === "/destination/comanche-county-historical-museum" &&
    (text.includes("This visitor guide does not claim a published admission price") ||
    text.includes("Yes. The museum\'s official homepage explicitly states general admission is free"))) {
    missing.push("outdated, contradictory museum admission guidance");
  }
  return missing;
}

let failures = [];
for (let attempt = 1; attempt <= 5; attempt++) {
  failures = [];
  for (const target of targets) {
    const url = new URL(host + target.path);
    // A unique query avoids false passes from a cached previous release.
    url.searchParams.set("comanche-acceptance", `${process.env.GITHUB_SHA?.slice(0, 12) || "local"}-${attempt}`);
    try {
      const response = await fetch(url, {
        headers: { "cache-control": "no-cache", "user-agent": "TexasDefined-Comanche-release-acceptance/1.0" },
        signal: AbortSignal.timeout(20000),
        redirect: "follow",
      });
      if (response.status !== 200) {
        failures.push(`${target.path}: HTTP ${response.status}`);
        continue;
      }
      const html = await response.text();
      const missing = verify(target, html);
      if (missing.length) failures.push(`${target.path}: ${missing.join("; ")}`);
      else console.log(`PASS ${target.path}: all source-verified content, canonical and indexability checks`);
    } catch (error) {
      failures.push(`${target.path}: ${error instanceof Error ? error.message : error}`);
    }
  }
  if (!failures.length) break;
  console.error(`Attempt ${attempt}/5: ${failures.join(" | ")}`);
  if (attempt < 5) await delay(15000);
}
if (failures.length) {
  console.error("COMANCHE PRODUCTION ACCEPTANCE FAILED:", failures.join("\n - "));
  process.exitCode = 1;
} else {
  console.log("COMANCHE PRODUCTION ACCEPTANCE: 4 of 4 verified.");
}
