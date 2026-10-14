import { decodeEntities } from "./html-entities.mjs";

// Targeted post-deploy regression checks for the six real live SEO audit URLs.
// These complement (rather than replace) the weekly full sitemap crawl.
// Every request is cache-busted and runs only after the exact Worker deploy gate.
const origin = process.env.PRODUCTION_ORIGIN || "https://texasdefined.com";
const sha = process.env.GITHUB_SHA || "local";
const runId = process.env.GITHUB_RUN_ID || "manual";
const cases = [
  ["/dallas-black-history", ["Dallas Black History", "Civil Rights"]],
  ["/destination/babe-didrikson-zaharias-museum-beaumont", ["Babe Didrikson Zaharias Museum"]],
  ["/destination/booker-t-washington-high-school-dallas", ["Booker T. Washington", "Dallas History"]],
  ["/destination/crow-museum-asian-art-dallas", ["Crow Museum of Asian Art", "Dallas"]],
  ["/destination/tenth-street-historic-district-oak-cliff", ["Tenth Street", "Dallas History"]],
  ["/texas-high-school-football-teams/ben-bolt-palito-blanco", ["Ben Bolt", "Fighting Badgers", "Football"]],
];

function normalize(value) {
  return decodeEntities(value).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
function attribute(tag, name) {
  const found = tag.match(new RegExp("\\b" + name + "\\s*=\\s*([\"'])([\\s\\S]*?)\\1", "i"));
  return found ? decodeEntities(found[2]) : "";
}
function metadata(html) {
  const title = normalize(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "");
  const links = html.match(/<link\b[^>]*>/gi) || [];
  const metas = html.match(/<meta\b[^>]*>/gi) || [];
  const canonicalTag = links.find(tag => attribute(tag, "rel").toLowerCase().split(/\s+/).includes("canonical"));
  const robotsTag = metas.find(tag => attribute(tag, "name").toLowerCase() === "robots");
  return {
    title,
    canonical: canonicalTag ? attribute(canonicalTag, "href") : "",
    robots: robotsTag ? attribute(robotsTag, "content") : "",
    h1Count: (html.match(/<h1\b/gi) || []).length,
  };
}
function inspect(path, required, html) {
  const info = metadata(html);
  const issues = [];
  if (!info.title) issues.push("missing HTML title");
  else if (info.title.length > 90) issues.push("visible HTML title is " + info.title.length + " > 90 characters");
  if (!info.title.toLowerCase().includes("texas defined")) issues.push("title missing site identity");
  for (const phrase of required) {
    if (!info.title.toLowerCase().includes(phrase.toLowerCase())) issues.push("title missing subject phrase: " + phrase);
  }
  const expectedCanonical = new URL(path, origin).toString();
  if (info.canonical !== expectedCanonical) issues.push("non-self-canonical: " + info.canonical);
  if (info.h1Count !== 1) issues.push("H1 count " + info.h1Count);
  if (/\bnoindex\b/i.test(info.robots)) issues.push("unexpected noindex: " + info.robots);
  return { info, issues };
}

let failures = 0;
for (const [path, required] of cases) {
  let passed = false;
  let lastProblem = "not checked";
  for (let attempt = 1; attempt <= 3; attempt++) {
    const url = new URL(path, origin);
    url.searchParams.set("seo_recovery_verify", [sha, runId, attempt].join("-"));
    try {
      const response = await fetch(url, {
        redirect: "follow",
        signal: AbortSignal.timeout(30000),
        headers: {
          "user-agent": "TexasDefined-SEO-Recovery-Production/1.0",
          "cache-control": "no-cache, no-store",
          pragma: "no-cache",
          accept: "text/html",
        },
      });
      const text = await response.text();
      if (response.status !== 200 || response.headers.get("cf-mitigated")?.toLowerCase() === "challenge" ||
          !response.headers.get("content-type")?.toLowerCase().includes("text/html")) {
        throw new Error("HTTP " + response.status + ", content type " + response.headers.get("content-type"));
      }
      const { info, issues } = inspect(path, required, text);
      if (issues.length) throw new Error(issues.join(" | ") + " [title=" + info.title + "]");
      console.log("SEO LIVE PASS " + path + " :: " + info.title + " [" + info.title.length + " visible characters]");
      passed = true;
      break;
    } catch (error) {
      lastProblem = error instanceof Error ? error.message : String(error);
      console.error("SEO LIVE retry " + attempt + "/3 " + path + " :: " + lastProblem);
      if (attempt < 3) await new Promise(resolve => setTimeout(resolve, 2000 * attempt));
    }
  }
  if (!passed) {
    failures++;
    console.error("SEO LIVE FAIL " + path + " :: " + lastProblem);
  }
}
if (failures) throw new Error("SEO recovery live verification failed for " + failures + " of " + cases.length + " URLs.");
console.log("SEO recovery live verification PASSED: " + cases.length + " full HTML title/canonical/H1/indexability checks.");
