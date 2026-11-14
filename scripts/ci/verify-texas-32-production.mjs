#!/usr/bin/env node
/**
 * Weekly and on-demand uncached production acceptance for the 32 commissioned
 * TexasDefined authority guides. Read-only. This does not claim editorial
 * originality, live Google indexing, or source facts beyond checked markers.
 */
import { mkdirSync, writeFileSync } from "node:fs";

const origin = "https://texasdefined.com";
const slugs = [
  "texas-state-fair", "texas-two-step", "texas-fishing-license", "texas-drivers-license",
  "track-texas-drivers-license", "texas-by-texas-txt", "texas-dmv",
  "texas-vehicle-registration", "texas-vehicle-registration-renewal",
  "texas-vehicle-registration-fees-taxes", "replace-texas-registration-receipt",
  "texas-toll-tags", "texas-flag", "texas-vs-every-state", "texas-history",
  "texas-old-west", "texas-sacred-places", "texas-science-technology-industry",
  "texas-college-towns", "texas-unique-lodging", "texas-music", "texas-music-timeline",
  "texas-blues", "texas-conjunto-tejano", "texas-western-swing",
  "texas-country-outlaw", "texas-rock-rockabilly", "texas-jazz",
  "texas-gospel-rnb-pop", "texas-hip-hop", "texas-music-venues",
  "gruene-hall-history",
];
if (slugs.length !== 32 || new Set(slugs).size !== 32) throw Error("Expected 32 unique authority routes");

const requiredText = new Map([
  ["texas-state-fair", ["concluded October 18"]],
  ["texas-two-step", ["1,832,600", "32.4", "Department of Licensing"]],
  ["texas-fishing-license", ["$30", "$58", "August 3, 2026"]],
  ["texas-college-towns", ["Baylor University campus tours"]],
  ["texas-unique-lodging", ["Indian Lodge", "San Solomon Motor Courts", "Caddo Lake"]],
  ["texas-vs-every-state", ["Census ACS comparisons", "BEA regional prices"]],
]);
const runId = process.env.GITHUB_RUN_ID ?? "local";
const records = [];
const issues = [];
const nonce = Date.now().toString(36);

function tagAttr(tag, name) {
  return tag.match(new RegExp("\\b" + name + "\\s*=\\s*[\"']([^\"']+)[\"']", "i"))?.[1] ?? null;
}
function canonicalOf(html) {
  const links = html.match(/<link\b[^>]*>/gi) ?? [];
  const can = links.filter(t => /\bcanonical\b/i.test(tagAttr(t, "rel") ?? ""));
  return can.map(t => tagAttr(t, "href")).filter(Boolean);
}
function textOnly(html) {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi," ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi," ")
    .replace(/<[^>]+>/g," ").replace(/&(?:nbsp|amp|lt|gt|quot);/g," ").replace(/\s+/g," ");
}
async function request(path, attempt) {
  const url = new URL(path, origin);
  url.searchParams.set("_authority_probe", nonce + "-" + attempt + "-" + encodeURIComponent(path));
  const res = await fetch(url, {
    cache: "no-store",
    redirect: "manual",
    headers: {
      "Cache-Control": "no-cache, no-store",
      "Pragma": "no-cache",
      "Accept": "text/html",
      "User-Agent": "TexasDefined-32-Authority-Production-Audit/1.0",
    },
    signal: AbortSignal.timeout(25000),
  });
  return { res, html: await res.text() };
}
async function check(slug) {
  const path = "/" + slug, errors = [];
  let result;
  for(let attempt=1;attempt<=2;attempt++) {
    try {
      result = await request(path, attempt);
      if(result.res.status >= 500 && attempt < 2) continue;
      break;
    } catch(e) {
      if(attempt===2) errors.push("Network error: " + String(e));
    }
  }
  if (!result) {
    records.push({path, ok:false, errors});
    issues.push(...errors.map(e => path + ": " + e));
    return;
  }
  const {res,html}=result;
  if(res.status!==200) errors.push("HTTP " + res.status);
  if(res.status===200) {
    const can=canonicalOf(html), expected=origin+path;
    if(can.length!==1 || can[0]!==expected) errors.push("Expected exactly one clean canonical "+expected+"; got "+JSON.stringify(can));
    if(!/<title\b[^>]*>[^<]{12,}<\/title>/i.test(html)) errors.push("Missing descriptive HTML title");
    if(!/<h1\b[^>]*>[\s\S]{8,}?<\/h1>/i.test(html)) errors.push("Missing server-rendered H1");
    if(!/<main(?:\s|>)/i.test(html)) errors.push("Missing primary content landmark");
    if(/\bnoindex\b/i.test(res.headers.get("x-robots-tag")??"")) errors.push("X-Robots-Tag contains noindex");
    for(const tag of html.match(/<meta\b[^>]*>/gi)??[]) {
      if(["robots", "googlebot", "googlebot-news"].includes(tagAttr(tag,"name")?.toLowerCase()??"") && /\bnoindex\b/i.test(tagAttr(tag,"content")??"")) errors.push("Crawler-specific meta robots contains noindex");
    }
    const mainHtml = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? "";
    const visible = textOnly(mainHtml);
    if(visible.length < 1000) errors.push("Thin or missing first-party main content (under 1000 readable characters)");
    for(const marker of requiredText.get(slug)??[]) {
      if(!visible.includes(marker)) errors.push("Missing release-specific visible content: " + marker);
    }
    if(/(?:lorem ipsum|delve into|in today's fast-paced world|comprehensive tapestry)/i.test(visible)) errors.push("Visible placeholder or boilerplate copy");
  }
  records.push({path, status:res.status, canonical:canonicalOf(html), cacheAge:res.headers.get("age"), title:html.match(/<title\b[^>]*>([^<]+)<\/title>/i)?.[1]??null, ok:errors.length===0, errors});
  issues.push(...errors.map(e=>path+": "+e));
}

for(let start=0; start<slugs.length; start+=4) {
  await Promise.all(slugs.slice(start,start+4).map(check));
}
records.sort((a,b)=>slugs.indexOf(a.path.slice(1))-slugs.indexOf(b.path.slice(1)));
mkdirSync(".artifacts",{recursive:true});
writeFileSync(".artifacts/texas-32-production-acceptance.json",JSON.stringify({
  checkedAt:new Date().toISOString(), runId, origin, expected:slugs.length,
  passed:records.filter(x=>x.ok).length, failed:records.filter(x=>!x.ok).length,
  records
},null,2)+"\n");
for(const row of records) console.log((row.ok?"PASS":"FAIL")+" "+row.path+" "+(row.status??"network")+(row.errors.length?" — "+row.errors.join(" | "):""));
console.log("Texas 32 production acceptance: "+records.filter(x=>x.ok).length+"/"+slugs.length);
if(issues.length) process.exitCode=1;
