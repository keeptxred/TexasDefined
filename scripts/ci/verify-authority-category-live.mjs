#!/usr/bin/env node
/**
 * Bounded postdeploy acceptance of established, different authority page types.
 * These are NOT new generated URLs or a sitewide audit. The original article's
 * separate canonical/UTM check lives in verify-el-paso-fredericksburg-release.
 */
const canonicalOrigin = "https://texasdefined.com";
const directWorkerOrigin = "https://texasdefined-site.freddy-coppola.workers.dev";
const sample = [
  ["/destination/wimberley", ["Wimberley"]],
  ["/destination/boerne", ["Boerne"]],
  ["/destination/uss-lexington-museum-corpus-christi", ["Lexington"]],
  ["/destination/enchanted-rock-state-natural-area", ["Enchanted Rock"]],
  ["/fishing/lakes/lake-conroe", ["Lake Conroe"]],
  ["/best-places-to-go-camping-in-texas", ["camping"]],
  ["/article/fredericksburg-johnson-city-historic-road-trip", ["Fredericksburg", "Johnson City"]],
];
export const plannedAuthorityChecks = sample.map(([path]) => path);
const token = (process.env.GITHUB_SHA ?? "local").slice(0,12) + "-" + (process.env.GITHUB_RUN_ID ?? "manual");
const headers = {
  "user-agent": "TexasDefined-Authority-Category-Release/1.0",
  "cache-control": "no-cache",
  accept: "text/html",
};
function canonicalUrl(path) { return new URL(path, canonicalOrigin).href; }
export function readCanonical(html) {
  const tag = [...html.matchAll(/<link\b[^>]*>/gi)].map((x) => x[0])
    .find((item) => /\brel=["']canonical["']/i.test(item));
  return tag?.match(/\bhref=["']([^"']+)["']/i)?.[1]?.replaceAll("&amp;", "&") ?? null;
}
export function hasNoindex(html, xRobots) {
  const tags = [...html.matchAll(/<meta\b[^>]*>/gi)].map((x) => x[0])
    .filter((tag) => /\bname=["'](?:robots|googlebot)["']/i.test(tag));
  return /\bnoindex\b/i.test(xRobots || "") || tags.some((tag) => /\bnoindex\b/i.test(tag));
}
export function extractVisibleText(html) {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi," ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style\s*>/gi," ")
    .replace(/<[^>]*>/g," ").replace(/&nbsp;|&#160;/gi," ")
    .replace(/&amp;|&#38;/gi,"&").replace(/\s+/g," ").trim();
}
async function fetchPage(url) {
  for (let attempt=1; attempt<=2; attempt++){
    try { return await fetch(url,{headers,redirect:"error",cache:"no-store",signal:AbortSignal.timeout(30000)}); }
    catch(err){
      if(attempt===2 || !["AbortError","TimeoutError"].includes(err?.name)) throw err;
      await new Promise((resolve)=>setTimeout(resolve, 1000));
    }
  }
}
async function check(path, markers, origin, expectedNoindex=false) {
  const url = new URL(path, origin);
  url.searchParams.set("td_authority_verify", token);
  const response = await fetchPage(url);
  if(response.status!==200 || response.headers.get("cf-mitigated")?.toLowerCase()==="challenge"
      || !/^text\/html\b/i.test(response.headers.get("content-type")||""))
    throw new Error("Authority live HTTP/HTML failure: "+url.href+" ("+response.status+")");
  const html=await response.text();
  const canonical=readCanonical(html);
  if(canonical !== canonicalUrl(path.split("?")[0]))
    throw new Error("Authority live canonical mismatch: "+url.href+" -> "+canonical);
  if(hasNoindex(html,response.headers.get("x-robots-tag"))!==expectedNoindex)
    throw new Error("Unexpected indexability for "+url.href+" (expected noindex="+expectedNoindex+")");
  if(!/<h1\b/i.test(html))throw new Error("Missing server-rendered h1: "+url.href);
  const text=extractVisibleText(html);
  for(const phrase of markers)if(!text.toLowerCase().includes(phrase.toLowerCase()))
    throw new Error("Missing distinct authority page text "+phrase+" at "+url.href);
  if(text.length<700)throw new Error("Suspected empty/thin SSR HTML: "+url.href);
  console.log(JSON.stringify({kind:"category-authority-live",origin,path,status:response.status,
    canonical,indexable:!expectedNoindex,htmlBytes:html.length,markers,ok:true}));
}
if(process.argv[1] && new URL(import.meta.url).pathname===process.argv[1]){
  for(const [path,markers] of sample){
    for(const origin of [canonicalOrigin,directWorkerOrigin])
      await check(path,markers,origin);
  }
  await check("/explore/trip-planner?destination=wimberley",["Texas Trip Planner"],canonicalOrigin,true);
}
