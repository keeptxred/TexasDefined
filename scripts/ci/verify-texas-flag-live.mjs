#!/usr/bin/env node
// Live, evidence-based Texas flag authority smoke check. Fail rather than
// treating a PR merge or a GitHub Actions success as proof of a public deploy.
// Optional --sources verifies that the primary evidence is still available.
const root = (process.env.TEXAS_FLAG_ORIGIN || "https://texasdefined.com").replace(/\/$/, "");
const errors = [];
const sourceCheck = process.argv.includes("--sources");
// Every same-origin check bypasses stale CDN HTML using a unique query string;
// off-site archives and statutes are checked at their published source URLs.
const rootOrigin = new URL(root).origin;
const releaseProbe = process.env.PRODUCTION_RELEASE_PROBE || `flag-authority-${Date.now()}-${process.pid}`;

async function fetchText(url) {
  const target = new URL(url);
  const sameOrigin = target.origin === rootOrigin;
  if (sameOrigin) target.searchParams.set("release_probe", releaseProbe);
  const headers = {
    "user-agent": "TexasDefined-Authority-Source-Review/1.0 (+https://texasdefined.com/editorial-policy)",
    ...(sameOrigin ? { "cache-control": "no-cache, no-store, max-age=0", pragma: "no-cache" } : {}),
  };
  const response = await fetch(target, { redirect: "follow", signal: AbortSignal.timeout(25000), headers });
  if (!response.ok) throw new Error(`${target}: HTTP ${response.status}`);
  if (sameOrigin) {
    const status = (response.headers.get("cf-cache-status") || "").toUpperCase();
    const age = response.headers.get("age");
    if (["HIT", "STALE", "UPDATING"].includes(status) || (age !== null && Number(age) > 0))
      throw new Error(`${target}: stale CDN response (CF-Cache-Status=${status}, Age=${age})`);
  }
  return await response.text();
}
function assertContains(label, content, fragment) {
  if (!content.includes(fragment)) errors.push(`${label}: missing ${fragment}`);
}
function assertRegex(label, content, pattern) {
  if (!pattern.test(content)) errors.push(`${label}: expected ${pattern}`);
}
function assertSelfCanonical(label, html, path) {
  const tags = [...html.matchAll(/<link\b[^>]*>/gi)]
    .map((match) => match[0])
    .filter((tag) => /\brel\s*=\s*["']canonical["']/i.test(tag));
  const href = tags[0]?.match(/\bhref\s*=\s*["']([^"']+)["']/i)?.[1];
  if (tags.length !== 1 || href !== `${root}${path}`) {
    errors.push(`${label}: expected exactly one self-referential canonical at ${root}${path}; got ${href || "(none)"}`);
  }
}
function assertIndexable(label, html) {
  const robots = [...html.matchAll(/<meta\b[^>]*>/gi)].map((match) => match[0])
    .filter((tag) => /\bname\s*=\s*["'](?:robots|googlebot)["']/i.test(tag));
  if (robots.some((tag) => /noindex/i.test(tag))) errors.push(`${label}: contains noindex in robots metadata`);
}
async function check(label, url, fn) {
  try { const html = await fetchText(url); fn(html); console.log(`OK: ${label} (${url})`); }
  catch (error) { errors.push(`${label}: ${String(error?.message || error)}`); }
}

await check("Flag authority page", `${root}/texas-flag`, html => {
  for (const text of [
    "December 10, 1836", "January 25, 1839", "Burnet flag", "Lone Star flag",
    "The signed 1839 flag drawing: a primary-source research guide", "When Texas Flag Day happens and why the date matters",
  ]) assertContains("Flag page", html, text);
  for (const target of [
    "/article/history-of-the-texas-flag",
    "/article/texas-flag-etiquette-display-guide",
    "/article/six-flags-over-texas-meaning",
    "/texas-symbols", "/texas-history",
  ]) assertContains("Flag page links", html, target);
  for (const mark of ["burnet-flag-title", "lone-star-flag-title", "texas-flag-timeline", "texas-flag-proportions"])
    assertContains("Flag image and timeline accessibility", html, mark);
  assertSelfCanonical("Flag hub", html, "/texas-flag");
  assertIndexable("Flag hub", html);
  assertRegex("WebPage structured data", html, /"@type"\s*:\s*"WebPage"/);
  assertRegex("Flag editorial revision display", html, /Updated(?:\s|<!--.*?-->)*November 19, 2026/);
  assertContains("Flag structured-data editorial date", html, '"dateModified":"2026-11-19"');
  if (html.includes('"@type":"FAQPage"')) errors.push("Flag hub still emits retired FAQ rich-result schema");
  assertContains("Flag hub official archival evidence", html, "https://www.tsl.texas.gov/treasures/flagsandmaps/flags/lone-star-design.html");
  assertContains("Flag hub statutory source", html, "https://tcss.legis.texas.gov/resources/GV/htm/GV.662.htm");
});
await check("Flag history article", `${root}/article/history-of-the-texas-flag`, html => {
  assertContains("History article", html, "December 10, 1836");
  assertContains("History article", html, "January 25, 1839");
  assertSelfCanonical("History article", html, "/article/history-of-the-texas-flag");
  assertIndexable("History article", html);
  assertContains("History hub backlink", html, "/texas-flag");
  for (const phrase of ["What the signed 1839 original actually shows", "Texas Flag Day is March 2", "1974/066-001", "Paul B. Joiner"]) assertContains("History research and image rights", html, phrase);
  for (const property of ["copyrightNotice", "acquireLicensePage", "creator"]) assertContains("History ImageObject metadata", html, property);
  assertContains("History image provenance", html, "https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg");
});
await check("Flag etiquette article", `${root}/article/texas-flag-etiquette-display-guide`, html => {
  assertContains("Etiquette hub backlink", html, "/texas-flag");
});
await check("Primary sitemap", `${root}/sitemap.xml`, xml => {
  const marker = "<loc>https://texasdefined.com/texas-flag</loc>";
  const entry = xml.split(marker)[1]?.split("</url>")[0] ?? "";
  if (!entry.includes("<lastmod>2026-11-19</lastmod>")) {
    errors.push("Texas flag sitemap is missing its November 19, 2026 lastmod");
  }
  const historyEntry = xml.split("<loc>https://texasdefined.com/article/history-of-the-texas-flag</loc>")[1]?.split("</url>")[0] ?? "";
  if (!historyEntry.includes("<lastmod>2026-11-19</lastmod>")) errors.push("Flag history article sitemap is missing its November 19, 2026 lastmod");
});

if (sourceCheck) {
  await check("Handbook of Texas", "https://www.tshaonline.org/handbook/entries/flags-of-texas", html => {
    assertContains("Handbook", html, "December 10, 1836");
    assertContains("Handbook", html, "January 25, 1839");
  });
  await check("Texas State Library archival flag", "https://www.tsl.texas.gov/historicflags/1974066001LoneStar.html", html => {
    assertContains("State Library", html, "January 25, 1839");
  });
  await check("Texas Flag Day statute", "https://tcss.legis.texas.gov/resources/GV/htm/GV.662.htm", html => {
    assertContains("Texas Flag Day law", html, "662.048");
  });
  await check("Official flag code", "https://tcss.legis.texas.gov/resources/GV/htm/GV.3100.htm", html => {
    assertContains("Flag law", html, "3100.002");
  });
}

if (errors.length) {
  for (const error of errors) console.error(`ERROR: ${error}`);
  process.exitCode = 1;
} else {
  console.log("Texas flag public authority, canonical, sources and update signals verified.");
}
