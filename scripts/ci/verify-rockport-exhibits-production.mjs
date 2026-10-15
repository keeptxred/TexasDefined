import { decodeEntities } from "./html-entities.mjs";

const origin = process.env.PRODUCTION_ORIGIN ?? "https://texasdefined.com";
const path = "/destination/texas-maritime-museum-rockport";
const verification = [
  "Tides of Freedom",
  "Built for Victory",
  "February 2–December 31, 2026",
  "September 30–December 31, 2026",
  "https://texasmaritimemuseum.org/event/tides-of-freedom/",
  "https://texasmaritimemuseum.org/event/built-for-victory/",
  "Larry D. Moore",
  "CC BY 4.0",
];

function attr(tag, name) {
  const match = tag.match(new RegExp("\\b" + name + "\\s*=\\s*([\"'])([\\s\\S]*?)\\1", "i"));
  return match ? decodeEntities(match[2]) : "";
}

let lastError = "not attempted";
let passed = false;
for (let attempt = 1; attempt <= 2; attempt++) {
  const url = new URL(path, origin);
  url.searchParams.set("rockport_live_verify", [
    process.env.GITHUB_SHA ?? "manual",
    process.env.GITHUB_RUN_ID ?? "manual",
    attempt,
  ].join("-"));
  try {
    const r = await fetch(url, {
      signal: AbortSignal.timeout(30000),
      redirect: "follow",
      headers: {
        "user-agent": "TexasDefined-Rockport-Authority-Live/1.0",
        "cache-control": "no-store",
        accept: "text/html",
      },
    });
    if (r.status !== 200 || r.headers.get("cf-mitigated")?.toLowerCase() === "challenge")
      throw new Error("HTTP " + r.status + " (Cloudflare challenge)");
    if (!r.headers.get("content-type")?.toLowerCase().includes("text/html"))
      throw new Error("Not an HTML response");
    const html = await r.text();
    const visible = decodeEntities(html);
    const title = decodeEntities(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "");
    const canonical = (html.match(/<link\b[^>]*>/gi) ?? []).find(t => attr(t,"rel").split(/\s+/).includes("canonical"));
    const robots = (html.match(/<meta\b[^>]*>/gi) ?? []).find(t => attr(t,"name").toLowerCase()==="robots");
    const missing = verification.filter(x=>!visible.includes(x));
    if (!title.includes("Texas Maritime Museum")) missing.push("correct page title");
    if (!canonical || attr(canonical,"href") !== new URL(path,origin).href) missing.push("self-canonical URL");
    if ((html.match(/<h1\b/gi) ?? []).length !== 1) missing.push("unique H1");
    if (robots && /\bnoindex\b/i.test(attr(robots,"content"))) missing.push("unexpected noindex");
    if (visible.includes("Spanish Revolution")) missing.push("incorrect historical label: Spanish Revolution");
    if (missing.length) throw new Error("Missing/inaccurate " + missing.join(" | "));
    console.log("Rockport museum exact-production authority PASS: two operator-confirmed 2026 exhibits, four date/URL citations, original licensed image credit, canonical and indexability");
    passed = true;
    break;
  } catch(e) {
    lastError = e instanceof Error ? e.message : String(e);
    console.error("Rockport museum production attempt " + attempt + ": " + lastError);
  }
}
if (!passed) throw new Error("Rockport museum production authority FAIL: " + lastError);
