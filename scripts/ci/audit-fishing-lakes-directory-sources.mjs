import fs from "node:fs";
import path from "node:path";

const advisoryFile = "src/data/fishing/lake-directory-advisories.json";
const advisories = JSON.parse(fs.readFileSync(advisoryFile, "utf8"));
const checkedAt = new Date().toISOString();
const checks = [];
const errors = [];

function plainText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&(?:nbsp|amp|quot|#39|rsquo);/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function checkAdvisory(slug, record) {
  if (!/^https:\/\/tpwd\.texas\.gov\//.test(record.sourceUrl)) {
    errors.push(slug + ": advisory must link to first-party TPWD source");
    return;
  }
  try {
    const response = await fetch(record.sourceUrl, {
      headers: { "User-Agent": "TexasDefinedFishingSourceAudit/1.0 (+https://texasdefined.com/fishing/lakes)" },
      redirect: "follow",
      signal: AbortSignal.timeout(20000),
    });
    if (!response.ok) throw new Error("HTTP " + response.status);
    const text = plainText((await response.text()).slice(0, 800000));
    const isAbilene = slug === "lake-abilene";
    const matched = isAbilene
      ? /Lake Abilene Closures/i.test(text)
        && /boat ramps are closed/i.test(text)
        && /swimming and fishing are not allowed/i.test(text)
      : text.length > 400;
    checks.push({ slug, url: record.sourceUrl, response: response.status, matched });
    if (!matched) errors.push(slug + ": official source no longer supports the published restriction verbatim; review before changing public advice");
  } catch (error) {
    checks.push({ slug, url: record.sourceUrl, error: String(error?.message ?? error) });
    errors.push(slug + ": official source unavailable; do not silently remove or restamp prior restriction");
  }
}

if (Object.keys(advisories).length === 0) errors.push("Restriction registry unexpectedly empty");
await Promise.all(Object.entries(advisories).map(([slug, record]) => checkAdvisory(slug, record)));

const report = {
  checkedAt,
  scope: "Verified official-source access restrictions shown on /fishing/lakes. No open-now claims.",
  editorialRule: "A missing/changed alert is review-needed, never proof of reopening; unchanged results do not rewrite verifiedAt or sitemap lastmod.",
  advisories: Object.keys(advisories).length,
  checks, errors,
};
fs.mkdirSync(".artifacts", { recursive: true });
fs.writeFileSync(path.join(".artifacts", "fishing-lakes-directory-source-check.json"), JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify({ checkedAt, advisories: report.advisories, errors }, null, 2));
if (errors.length) process.exitCode = 1;
