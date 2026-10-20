#!/usr/bin/env node
/**
 * Check the *published* statewide town authority pages and reciprocal county
 * links. This is a hard release check, not a substitute for field research,
 * factual editorial certification, licensed imagery review or WCAG inspection.
 *
 * node scripts/ci/verify-statewide-town-production.mjs
 * TEXASDEFINED_PRODUCTION_ORIGIN=https://texasdefined.com ...  (optional)
 */
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";

const origin = (process.env.TEXASDEFINED_PRODUCTION_ORIGIN || "https://texasdefined.com").replace(/\/$/, "");
const pathPrefix = process.env.TOWN_AUTHORITY_REPORT_DIR || "artifacts/town-authority-production";
const linkData = readFileSync("src/data/town-authority-link-index.ts", "utf8");
const arrStart = linkData.indexOf("= [");
const arrEnd = linkData.lastIndexOf("];");
if (arrStart < 0 || arrEnd < arrStart) throw Error("Statewide authority link source format changed");
const towns = JSON.parse(linkData.slice(arrStart + 2, arrEnd + 1));
if (towns.length < 60) throw Error("Missing researched-town coverage from the production acceptance inventory");
const slug = (input) => input.toLowerCase().trim().replace(/\s+county$/i, "")
  .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const hardFailures = [];
const observations = [];
const countyGroups = new Map();
for (const town of towns) {
  if (town.slug === "gruene-historic-district") continue; // district is an attraction with separate authority template
  const countySlug = slug(town.county);
  if (!countyGroups.has(countySlug)) countyGroups.set(countySlug, []);
  countyGroups.get(countySlug).push(town);
}
const targets = [
  ...towns.filter((t) => t.slug !== "gruene-historic-district").map((t) => ({
    kind: "guide", name: t.name, slug: t.slug, path: "/destination/" + t.slug,
    countySlug: slug(t.county),
  })),
  {kind:"historic-district",name:"Gruene Historic District",slug:"gruene-historic-district",
    path:"/destination/gruene-historic-district"},
  ...[...countyGroups].map(([countySlug, entries]) => ({
    kind: "county", name: countySlug, path: "/county/" + countySlug,
    expected: entries.map((t) => t.slug),
  })),
];
const escaping = /&(?:#(?:\d+|x[0-9a-f]+)|[a-z]+);/gi;
const deentity = (str) => str.replace(escaping, (entity) => {
  const word = entity.slice(1,-1).toLowerCase();
  if (word === "amp") return "&";
  if (word === "quot") return '"';
  if (word === "apos" || word === "#39") return "'";
  if (word === "lt") return "<";
  if (word === "gt") return ">";
  const numeric = word[0]==="#" && (word[1]==="x" ? parseInt(word.slice(2),16) : parseInt(word.slice(1),10));
  return Number.isInteger(numeric) && numeric > 0 && numeric <= 0x10ffff
    ? String.fromCodePoint(numeric) : entity;
});
const hasHref = (html, path) => html.includes('href="' + path + '"') ||
  html.includes('href="' + path + '?') || html.includes('href="' + origin + path + '"');
const errors = (target, body, finalUrl) => {
  const failures = [];
  const plain = deentity(body.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")).trim();
  if (/noindex/i.test(body.match(/<meta[^>]*name=["']robots["'][^>]*>/i)?.[0] || "")) {
    failures.push("robots noindex on a publishable authority route");
  }
  if (!/^https?:\/\/[^/]+/.test(finalUrl)) failures.push("invalid final URL");
  if (target.kind === "guide") {
    if (!plain.includes(target.name)) failures.push("town name absent from HTML");
    for (const marker of ["Why this place matters", "Itineraries that fit real trips",
      "Primary sources and fact checks", "What to do near " + target.name]) {
      if (!plain.includes(marker)) failures.push("research section absent: " + marker);
    }
    if (!hasHref(body, "/county/" + target.countySlug)) {
      failures.push("town lacks county backlink: " + target.countySlug);
    }
    if (!/https:\/\/[^"' ]+(?:\.gov|\.org|\.com)\b/i.test(body)) {
      failures.push("official source links absent");
    }
    // Avoid falsely treating a partially rendered generic body as the published guide.
    if (plain.length < 2250) failures.push("insufficient server-rendered editorial text (" + plain.length + " chars)");
  }
  if (target.kind === "historic-district" && !plain.includes("Gruene")) {
    failures.push("historic district absent from public HTML");
  }
  if (target.kind === "county") {
    for (const townSlug of target.expected) {
      if (!hasHref(body, "/destination/" + townSlug)) {
        failures.push("missing reciprocal town guide link: " + townSlug);
      }
    }
  }
  return failures;
};

const cap = 4;
let index = 0;
async function run() {
  while (index < targets.length) {
    const target = targets[index++];
    const t0 = Date.now();
    const url = origin + target.path;
    try {
      const res = await fetch(url,{
        redirect:"follow",
        headers:{"user-agent":"TexasDefined-Statewide-Town-Live-Acceptance/1.0",
          "accept":"text/html","cache-control":"no-cache"},
        signal:AbortSignal.timeout(20000),
      });
      const contentType = res.headers.get("content-type")||"";
      const body = res.status===200 && contentType.includes("text/html") ? await res.text() : "";
      const issues=[];
      if (res.status!==200) issues.push("HTTP " + res.status);
      if (!contentType.includes("text/html")) issues.push("not an HTML response: "+contentType);
      if (body) issues.push(...errors(target,body,res.url));
      observations.push({kind:target.kind,path:target.path,status:res.status,
        finalUrl:res.url,bytes:body.length,durationMs:Date.now()-t0,issues});
      if (issues.length) hardFailures.push({path:target.path,issues});
    } catch (error) {
      const issues=["request failed: "+String(error?.message||error)];
      observations.push({kind:target.kind,path:target.path,durationMs:Date.now()-t0,issues});
      hardFailures.push({path:target.path,issues});
    }
  }
}
await Promise.all(Array.from({length:Math.min(cap,targets.length)},()=>run()));
observations.sort((a,b)=>a.path.localeCompare(b.path));
mkdirSync(pathPrefix,{recursive:true});
const result={
  testedAt:new Date().toISOString(),origin,requestedRoutes:targets.length,
  distinctTowns:towns.length-1,countyRoutes:countyGroups.size,
  failures:hardFailures.length,observations,
  note:"HTTP/content/internal-link contract only; editorial fact certification and image licensing require separate independent evidence.",
};
writeFileSync(pathPrefix+"/results.json",JSON.stringify(result,null,2)+"\n");
const table=hardFailures.slice(0,40).map((row)=>"- "+row.path+": "+row.issues.join("; "));
const report=[
  "# TexasDefined town authority production acceptance",
  "Checked "+targets.length+" routes ("+(towns.length-1)+" researched town guides, Gruene historic district, "+countyGroups.size+" county pages).",
  hardFailures.length ? "FAILED: "+hardFailures.length+" route(s)" : "PASS: all requested HTTP and editorial/inbound-link contracts",
  ...table,hardFailures.length>40?"... and "+(hardFailures.length-40)+" additional failures; see JSON.":"",
  "",
].filter(Boolean).join("\n");
writeFileSync(pathPrefix+"/summary.md",report);
console.log(report);
if (hardFailures.length) process.exitCode=1;
