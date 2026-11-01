/**
 * Bounded server-rendered production audit for EVERY published fishing URL.
 * Discovers additional verified dynamic profiles in the live sitemap.
 * Never changes page content, search indexing, or Cloudflare. No screenshots.
 * Writes transparent per-URL results and separate NOT-CERTIFIED states.
 */
import fs from "node:fs";
import { getFishingAuthorityInventory } from "./fishing-authority-inventory.mjs";

const inventory = getFishingAuthorityInventory();
const base = (process.env.FISHING_AUDIT_ORIGIN || inventory.origin).replace(/\/$/, "");
const out = process.env.FISHING_AUDIT_OUTPUT || "fishing-live-authority-report.json";
const size = Math.max(1, Number(process.env.FISHING_AUDIT_BATCH_SIZE || "120"));
const full = process.env.FISHING_AUDIT_FULL === "1";
const concurrency = Math.min(3, Math.max(1, Number(process.env.FISHING_AUDIT_CONCURRENCY || "2")));
const timeoutMs = 12000;
const getAttr = (tag, name) => {
  const match = tag.match(new RegExp("(?:^|\\s)" + name + "\\s*=\\s*([\"'])(.*?)\\1", "i"));
  return match ? match[2] : "";
};
const tags = (html, name) => [...html.matchAll(new RegExp("<" + name + "\\b[^>]*>", "gi"))].map((m) => m[0]);
const decode = (s) => s.replace(/&amp;/gi,"&").replace(/&#38;/gi,"&").replace(/&quot;/gi,'"').replace(/&lt;/gi,"<").replace(/&gt;/gi,">");
const tidy = (s) => decode(s.replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim());
const meta = (html, name) => tags(html,"meta").find((tag) => getAttr(tag,"name").toLowerCase() === name)?.match(/./)
  ? getAttr(tags(html,"meta").find((tag) => getAttr(tag,"name").toLowerCase() === name),"content") : "";
function canonical(html) {
  const link = tags(html,"link").find((tag) => getAttr(tag,"rel").toLowerCase().split(/\s+/).includes("canonical"));
  return link ? decode(getAttr(link,"href")) : "";
}
function extractHrefLinks(html) {
  return tags(html,"a").map((tag) => decode(getAttr(tag,"href"))).filter(Boolean);
}
function originPath(link) {
  if (link.startsWith("/")) return link.split(/[?#]/)[0];
  if (link.startsWith(base+"/")) return link.slice(base.length).split(/[?#]/)[0];
  return "";
}
async function fetchText(path) {
  const response = await fetch(base + path, {
    headers: { "user-agent": "TexasDefinedAuthorityQA/1.0 (+https://texasdefined.com/about)", accept: "text/html,application/xml;q=0.7" },
    redirect: "follow", signal: AbortSignal.timeout(timeoutMs),
  });
  const html = await response.text();
  return { status: response.status, finalUrl: response.url, text: html };
}
async function dynamicSitemap() {
  try {
    const { status, text } = await fetchText("/sitemap.xml");
    if (status !== 200) return { pages: [], error: "Sitemap HTTP "+status };
    const pages = [...text.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/g)]
      .map((m) => decode(m[1].trim())).filter((href) => href.startsWith(base+"/fishing/"))
      .map((href) => new URL(href).pathname);
    const dynamic = pages.filter((p) => /^\/fishing\/(?:access|services|guide|report)\/[a-z0-9-]+$/.test(p));
    return { pages: [...new Set(dynamic)], error: null };
  } catch (e) { return { pages: [], error: String(e) }; }
}
function auditHtml(row, fetched) {
  const html = fetched.text;
  const title = tidy(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "");
  const h1 = tidy(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? "");
  const description = meta(html, "description");
  const robots = meta(html,"robots");
  const canon = canonical(html);
  const hrefs = extractHrefLinks(html);
  const internal = [...new Set(hrefs.map(originPath).filter(Boolean))];
  const contextual = internal.filter((p) => p.startsWith("/fishing/") || p.startsWith("/county/") || p.startsWith("/destination/"));
  const external = hrefs.filter((href) => href.startsWith("https://") && !href.startsWith(base));
  const official = external.filter((href) => /tpwd\.texas\.gov|\.usace\.army\.mil|recreation\.gov|nps\.gov|lcraparks\.com|waterdatafortexas\.org|\.texas\.gov|\.gov\//i.test(href));
  const expectedIndex = row.acceptance !== "conditional_on_verified_published_records" && !["hub-or-service-form"].includes(row.family);
  const noindex = /\bnoindex\b/i.test(robots);
  const critical = [];
  const warnings = [];
  if (fetched.status !== 200) critical.push("HTTP_"+fetched.status);
  if (!title) critical.push("missing_title");
  if (!h1) critical.push("missing_H1_in_server_HTML");
  if (!description) critical.push("missing_meta_description");
  if (canon !== base + row.path) critical.push("self_canonical_mismatch");
  if (expectedIndex && noindex && row.family !== "lake-section") critical.push("unexpected_noindex");
  if (row.family.startsWith("lake-") && !/tpwd\.texas\.gov/.test(html)) critical.push("missing_TPWD_citation");
  if (row.family.startsWith("lake-") && !html.includes("Connected Texas fishing and travel guides")) critical.push("missing_semantic_lake_crosslinks");
  if (row.family.startsWith("lake-") && contextual.length < 5) critical.push("too_few_contextual_internal_links");
  if (row.family === "lake-overview" && tags(html,"img").length === 0) warnings.push("no_HTML_image_verify_governed_photo_or_map");
  if (row.family === "lake-section" && row.section === "regulations" && official.length < 1) critical.push("no_direct_official_regulation_source_link");
  if (row.family === "lake-section" && ["camping","nearby"].includes(row.section) && external.length < 1) critical.push("missing_campground_or_attraction_source");
  if (!html.includes("application/ld+json")) warnings.push("missing_schema_JSONLD");
  if (title.length > 72) warnings.push("title_over_72_chars");
  if (description.length < 65 || description.length > 170) warnings.push("description_length_review");
  const stripped = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi," ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi," ")
    .replace(/<(?:nav|footer|header)\b[^>]*>[\s\S]*?<\/(?:nav|footer|header)>/gi," ");
  const approxWords = tidy(stripped).split(/\s+/).filter(Boolean).length;
  if (approxWords < (row.family === "lake-overview" ? 550 : 260)) warnings.push("short_rendered_body_editorial_review");
  if (row.acceptance === "conditional_on_verified_published_records" && noindex)
    warnings.push("deliberately_not_authority_without_verified_records");
  return {
    url: base+row.path, family: row.family, lake: row.lake, section: row.section,
    status: fetched.status, title, h1, descriptionLength: description.length,
    canonical: canon, robots, noindex, structuredData: html.includes("application/ld+json"),
    internalUnique: internal.length, relevantCrosslinks: contextual.length, officialSourceLinks: official.length,
    imageCount: tags(html,"img").length, approxRenderedWords: approxWords,
    critical, warnings,
    acceptance: critical.length ? "FAIL" : noindex ? "NOINDEX_NOT_AUTHORITY" : "TECHNICAL_SCREEN_PASS_EDITORIAL_AND_MOBILE_PENDING",
  };
}
const sitemap = await dynamicSitemap();
const seen = new Set(inventory.rows.map((r) => r.path));
const dynamic = sitemap.pages.filter((p) => !seen.has(p)).map((path) => ({
  path, family: "published-dynamic-profile", lake: null, section: null,
  acceptance: "pending_live_and_editorial_QA",
}));
const fullList = [...inventory.rows, ...dynamic];
const totalBatches = Math.ceil(fullList.length/size);
const batch = full ? 0 : Math.max(0, Math.min(totalBatches-1, Number(process.env.FISHING_AUDIT_BATCH_INDEX ?? (Math.floor(Date.now()/86400000)%totalBatches))));
const selected = full ? fullList : fullList.slice(batch*size,(batch+1)*size);
let current = 0;
const results = [];
async function worker() {
  while (current < selected.length) {
    const row = selected[current++];
    try {
      const fetched = await fetchText(row.path);
      results.push(auditHtml(row,fetched));
    } catch (e) {
      results.push({ url: base+row.path, family: row.family, lake: row.lake, section: row.section,
        acceptance: "FAIL", critical: ["request_or_timeout_failure"], warnings: [String(e)] });
    }
  }
}
await Promise.all(Array.from({length:concurrency},()=>worker()));
results.sort((a,b)=>a.url.localeCompare(b.url));
const failed = results.filter((r)=>r.critical.length);
const noindex = results.filter((r)=>r.acceptance === "NOINDEX_NOT_AUTHORITY");
const report = {
  generatedAt: new Date().toISOString(), commit: process.env.GITHUB_SHA || null,
  registeredTotal: inventory.rows.length, dynamicFromSitemap: dynamic.length,
  sitemapDiscoveryError: sitemap.error, urlCount: fullList.length,
  batch, totalBatches, scanned: results.length, failures: failed.length,
  noindexNotAuthority: noindex.length,
  fullAuthorityAccepted: 0,
  explanation: "Passing HTML screen is not proof of accurate original facts, source freshness, real photography, mobile UX or Google acceptance.",
  results,
};
fs.writeFileSync(out,JSON.stringify(report,null,2)+"\n");
const summary = [
  "## TexasDefined fishing URL-by-URL production screen",
  "",
  "Scanned "+results.length+" of "+fullList.length+" public fishing URLs; failed="+failed.length+"; noindex/not authority="+noindex.length+".",
  "Registered="+inventory.rows.length+"; dynamic profiles discovered from current sitemap="+dynamic.length+".",
  "No URL labeled fully authority-accepted without independent factual, image and mobile verification.",
  sitemap.error ? "Sitemap discovery issue: "+sitemap.error : "",
  "",
  "### Failed examples (up to 40)",
  ...failed.slice(0,40).map((r)=>"- "+r.url+": "+r.critical.join(", ")),
  "",
  "### Acceptance reporting",
  "Technical pass only; factual source review, page-specific internal link destinations, media licensing, mobile QA and current operator conditions remain separately actionable.",
].join("\n")+"\n";
fs.writeFileSync(out.replace(/\.json$/,".md"),summary);
if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY,summary);
console.log(JSON.stringify({urlCount:fullList.length,scanned:results.length,failed:failed.length,noindex:noindex.length,dynamic:sitemap.pages.length,output:out},null,2));
if (failed.length) process.exitCode=1;
