import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import { spawn } from "node:child_process";
import { once } from "node:events";

const mainSignals = [
  "December 10, 1836", "January 25, 1839", "Burnet flag", "Lone Star flag",
  "The signed 1839 flag drawing: a primary-source research guide",
  "When Texas Flag Day happens and why the date matters",
  "/article/history-of-the-texas-flag", "/article/texas-flag-etiquette-display-guide",
  "/article/six-flags-over-texas-meaning", "/texas-symbols", "/texas-history",
  "burnet-flag-title", "lone-star-flag-title", "texas-flag-timeline", "texas-flag-proportions",
  "https://www.tsl.texas.gov/treasures/flagsandmaps/flags/lone-star-design.html",
  "https://tcss.legis.texas.gov/resources/GV/htm/GV.662.htm",
  "Updated November 19, 2026",
  '"dateModified":"2026-11-19"',
  '"@type":"WebPage"',
];
const historySignals = ["December 10, 1836", "January 25, 1839", "/texas-flag",
  "What the signed 1839 original actually shows", "Texas Flag Day is March 2",
  "1974/066-001", "Paul B. Joiner", "copyrightNotice", "acquireLicensePage", "creator",
  "https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg"];
const sitemap = date => `<urlset><url><loc>https://texasdefined.com/texas-flag</loc><lastmod>${date}</lastmod></url><url><loc>https://texasdefined.com/article/history-of-the-texas-flag</loc><lastmod>${date}</lastmod></url></urlset>`;
const page = (origin, path, signals) => `<!doctype html><html><head><link rel="canonical" href="${origin}${path}"></head><body>${signals.join(" ")}</body></html>`;

async function withServer({ date = "2026-11-19", cachedHtml = false } = {}, fn) {
  let origin;
  const server = http.createServer((req, res) => {
    const path = new URL(req.url, origin).pathname;
    const isXml = path === "/sitemap.xml";
    if (isXml || cachedHtml) {
      res.setHeader("CF-Cache-Status", "HIT");
      res.setHeader("Age", "308");
    }
    res.statusCode = 200;
    if (isXml) res.end(sitemap(date));
    else if (path === "/texas-flag") res.end(page(origin, path, mainSignals));
    else if (path === "/article/history-of-the-texas-flag") res.end(page(origin, path, historySignals));
    else if (path === "/article/texas-flag-etiquette-display-guide") res.end(page(origin, path, ["/texas-flag"]));
    else res.end("No such page");
  });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  origin = "http://127.0.0.1:" + server.address().port;
  try { await fn(origin); }
  finally { await new Promise((resolve, reject) => server.close(err => err ? reject(err) : resolve())); }
}
async function run(origin) {
  const child = spawn(process.execPath, ["scripts/ci/verify-texas-flag-live.mjs"], {
    env: { ...process.env, TEXAS_FLAG_ORIGIN: origin, PRODUCTION_RELEASE_PROBE: "cdn-policy-unit-test" },
  });
  let output = "";
  for (const stream of [child.stdout, child.stderr]) stream.on("data", chunk => output += String(chunk));
  const [code] = await once(child, "exit");
  return { code, output };
}
test("cached sitemap is accepted when the exact current lastmods are correct", async () => {
  await withServer({}, async origin => {
    const result = await run(origin);
    assert.equal(result.code, 0, result.output);
    assert.match(result.output, /Primary sitemap/);
  });
});
test("cached sitemap still fails on substantive old lastmod", async () => {
  await withServer({ date: "2026-08-20" }, async origin => {
    const result = await run(origin);
    assert.equal(result.code, 1, result.output);
    assert.match(result.output, /sitemap is missing its November 19/);
  });
});
test("HTML with a cache HIT and nonzero Age fails even when all content markers are present", async () => {
  await withServer({ cachedHtml: true }, async origin => {
    const result = await run(origin);
    assert.equal(result.code, 1, result.output);
    assert.match(result.output, /stale CDN response/);
  });
});
