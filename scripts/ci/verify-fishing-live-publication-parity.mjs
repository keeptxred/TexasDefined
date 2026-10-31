// Bounded production fishing publication parity probe. No sitemap mutations.
import fs from "node:fs";
const origin = (process.env.PRODUCTION_ORIGIN || "https://texasdefined.com").replace(/\/$/, "");
const paths = [
  "/fishing/lakes/lake-conroe/fish",
  "/fishing/lakes/lake-conroe/camping",
  "/fishing/lakes/lake-stamford/fish",
  "/fishing/lakes/lake-stamford/camping",
  "/fishing/lakes/lake-stamford/nearby",
  "/fishing/lakes/lake-stamford/regulations",
];
const errors = [];
const evidence = { sourceSha: process.env.GITHUB_SHA || null, runId: process.env.GITHUB_RUN_ID || null, origin, checks: [] };
const fetchText = async (url) => {
  const response = await fetch(url, { headers: { "user-agent": "TexasDefinedProductionAcceptance/1.0" }, signal: AbortSignal.timeout(20000) });
  if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
  return response.text();
};
try {
  const index = await fetchText(`${origin}/sitemap-index.xml`);
  const childUrls = [...index.matchAll(/<loc>\s*(https:\/\/[^<]+)\s*<\/loc>/g)].map((m) => m[1].trim().replace(/&amp;/g, "&"));
  if (childUrls.length !== 4 || childUrls.some((u) => !u.startsWith(`${origin}/sitemap`))) throw new Error("Unexpected sitemap index feed count/origin");
  const feeds = await Promise.all(childUrls.map(fetchText));
  const listed = new Set(feeds.flatMap((xml) => [...xml.matchAll(/<loc>\s*(https:\/\/[^<]+)\s*<\/loc>/g)].map((m) => m[1].trim().replace(/&amp;/g, "&"))));
  for (const path of paths) {
    const url = `${origin}${path}`;
    const html = await fetchText(`${url}?release_probe=${encodeURIComponent(process.env.GITHUB_RUN_ID || "manual")}`);
    const robots = [...html.matchAll(/<meta\b[^>]*>/gi)].map((m) => m[0]).filter((tag) => /name\s*=\s*["']robots["']/i.test(tag));
    const noindex = robots.some((tag) => /noindex/i.test(tag));
    const canonical = [...html.matchAll(/<link\b[^>]*>/gi)].map((m) => m[0]).find((tag) => /rel\s*=\s*["']canonical["']/i.test(tag)) || "";
    const canonicalMatches = canonical.includes(`href="${url}"`) || canonical.includes(`href='${url}'`);
    const inSitemap = listed.has(url);
    evidence.checks.push({ path, http: 200, noindex, inSitemap, canonicalMatches });
    if (!canonicalMatches) errors.push(`${path}: canonical mismatch`);
    if (noindex && inSitemap) errors.push(`${path}: noindex page listed in sitemap`);
    if (!noindex && !inSitemap) errors.push(`${path}: indexable page omitted from sitemap`);
  }
} catch (error) { errors.push(String(error)); }
evidence.errors = errors;
fs.mkdirSync(".artifacts", { recursive: true });
fs.writeFileSync(".artifacts/fishing-live-publication-parity.json", JSON.stringify(evidence, null, 2) + "\n");
console.log(JSON.stringify(evidence));
if (errors.length) process.exitCode = 1;
