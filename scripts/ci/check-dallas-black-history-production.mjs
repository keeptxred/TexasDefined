#!/usr/bin/env node
/**
 * Bounded nine-route production smoke for the Dallas Black History collection.
 * Scheduled by the existing site-quality watchdog, not run against old production in PRs.
 * No browser automation, credentials, paid services, or broad sitemap crawl.
 */
const origin = "https://texasdefined.com";
const hub = "/dallas-black-history";
const destinations = [
  "african-american-museum-dallas-fair-park",
  "booker-t-washington-high-school-dallas",
  "deep-ellum",
  "freedmans-cemetery-memorial-dallas",
  "juanita-craft-civil-rights-house-dallas",
  "st-paul-united-methodist-church-dallas",
  "queen-city-heights-historic-district-dallas",
  "tenth-street-historic-district-oak-cliff"
];
const failures = [];

async function download(path) {
  let last;
  for (let attempt = 0; attempt < 2; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(origin + path, {
        redirect: "follow",
        signal: controller.signal,
        headers: { "user-agent": "TexasDefined-Dallas-Heritage-Smoke/1.0" }
      });
      const body = await response.text();
      if (response.status >= 500 && attempt === 0) continue;
      return { response, body };
    } catch (error) {
      last = error;
    } finally {
      clearTimeout(timeout);
    }
  }
  throw last || new Error("No response");
}

function tags(html, tag) {
  return [...html.matchAll(new RegExp("<" + tag + "\\b[^>]*>", "gi"))].map((match) => match[0]);
}
function attribute(tag, key) {
  const match = tag.match(new RegExp("\\b" + key + "\\s*=\\s*([\"'])(.*?)\\1", "i"));
  return match ? match[2] : "";
}
function containsHref(html, path) {
  return tags(html, "a").some((tag) => attribute(tag, "href").replace(origin, "").replace(/\/$/, "") === path);
}
async function inspect(path, isHub) {
  let result;
  try { result = await download(path); }
  catch (error) { failures.push(path + ": fetch error " + String(error)); return; }
  const { response, body } = result;
  if (response.status !== 200) failures.push(path + ": HTTP " + response.status);
  const canonicalLink = tags(body, "link").find((tag) => attribute(tag, "rel").split(/\s+/).includes("canonical"));
  const expected = origin + path;
  if (!canonicalLink || attribute(canonicalLink, "href").replace(/\/$/, "") !== expected)
    failures.push(path + ": missing or wrong canonical URL");
  const robots = tags(body, "meta").filter((tag) => ["robots", "googlebot"].includes(attribute(tag, "name").toLowerCase()));
  if (robots.some((tag) => /noindex/i.test(attribute(tag, "content"))) ||
      /noindex/i.test(response.headers.get("x-robots-tag") || ""))
    failures.push(path + ": unexpected noindex");
  if (isHub) {
    for (const slug of destinations) {
      if (!containsHref(body, "/destination/" + slug))
        failures.push(path + ": missing outbound link to " + slug);
    }
  } else {
    if (!containsHref(body, hub)) failures.push(path + ": missing backlink to hub");
    if (!/FAQ|Frequently asked questions/i.test(body))
      failures.push(path + ": no visible FAQ indicator in server-rendered content");
    if (!/Sources|Primary source|References/i.test(body))
      failures.push(path + ": no visible source indicator in server-rendered content");
  }
  console.log("Dallas smoke " + path + ": HTTP " + response.status);
}

await Promise.all([inspect(hub, true), ...destinations.map((slug) => inspect("/destination/" + slug, false))]);
try {
  const { response, body } = await download("/explore/historic-sites");
  if (response.status !== 200 || !containsHref(body, hub))
    failures.push("/explore/historic-sites: missing directly rendered Dallas Black History hub link or non-200 status");
} catch (error) {
  failures.push("/explore/historic-sites: " + String(error));
}
for (const [path, names] of [
  ["/sitemap.xml", [hub]],
  ["/sitemap-explore.xml", destinations.map((slug) => "/destination/" + slug)]
]) {
  try {
    const { response, body } = await download(path);
    if (!response.ok) failures.push(path + ": HTTP " + response.status);
    for (const name of names) {
      if (!body.includes(origin + name)) failures.push(path + ": missing " + name);
    }
  } catch (error) { failures.push(path + ": sitemap fetch error " + String(error)); }
}
if (failures.length) {
  console.error("Dallas production smoke FAILED:\n" + failures.map((failure) => " - " + failure).join("\n"));
  process.exitCode = 1;
} else {
  console.log("Dallas production smoke PASSED: nine routes, canonicals, indexing, hub links, visible research markers and sitemap registration.");
}
