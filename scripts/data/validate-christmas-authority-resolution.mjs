import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const slug = "free-christmas-events-in-texas";
const authorityResolver = read("src/data/fixtures/lazy-authority-legacy.ts");
const seasonalResolver = read("src/data/fixtures/lazy-seasonal-intents.ts");
const canonicalSeasonalArticles = read("src/data/fixtures/seasonal-intent-articles.ts");
const articleQueries = read("src/data/queries.ts");

const failures = [];
const requireCondition = (condition, message) => {
  if (!condition) failures.push(message);
};

requireCondition(
  !authorityResolver.includes(`"${slug}"`),
  "Christmas seasonal authority slug must not be registered in the legacy authority resolver",
);
requireCondition(
  !authorityResolver.includes("freeChristmasEventsInTexasBody"),
  "Legacy authority resolver still imports or patches the duplicate Christmas body",
);
requireCondition(
  !seasonalResolver.includes("legacyAuthoritySlugs") && !seasonalResolver.includes("loadLegacyAuthorityArticle"),
  "Seasonal intent detail lookup still detours through the legacy authority resolver",
);
requireCondition(
  seasonalResolver.includes('await import("./seasonal-intent-articles")'),
  "Seasonal intent detail lookup is not loading the canonical seasonal fixture",
);

const canonicalMarker = `slug: \"${slug}\"`;
const canonicalAt = canonicalSeasonalArticles.indexOf(canonicalMarker);
requireCondition(canonicalAt >= 0, "Canonical Christmas seasonal article is missing");
const nextArticle = canonicalAt >= 0
  ? canonicalSeasonalArticles.indexOf("\n  {\n    id:", canonicalAt + canonicalMarker.length)
  : -1;
const canonicalBlock = canonicalAt >= 0
  ? canonicalSeasonalArticles.slice(canonicalAt, nextArticle > canonicalAt ? nextArticle : undefined)
  : "";
const bodyAt = canonicalBlock.indexOf("body: [");
const body = bodyAt >= 0 ? canonicalBlock.slice(bodyAt) : "";

const headingCount = (body.match(/type:\s*"heading"/g) || []).length;
const paragraphCount = (body.match(/type:\s*"paragraph"/g) || []).length;
const wordCount = [...body.matchAll(/text:\s*"([^\"]*)"/g)]
  .flatMap((match) => match[1].trim().split(/\s+/).filter(Boolean))
  .length;

requireCondition(headingCount >= 8, `Canonical Christmas authority body is too shallow (${headingCount} headings)`);
requireCondition(paragraphCount >= 12, `Canonical Christmas authority body is too shallow (${paragraphCount} paragraphs)`);
requireCondition(wordCount >= 900, `Canonical Christmas authority body is too short (${wordCount} body words)`);
requireCondition(body.includes("Fredericksburg"), "Canonical Christmas authority body is missing Fredericksburg coverage");
requireCondition(body.includes("Georgetown"), "Canonical Christmas authority body is missing Georgetown coverage");
requireCondition(body.includes("Grapevine"), "Canonical Christmas authority body is missing Grapevine coverage");
requireCondition(body.includes("Verify this year's schedule before you leave"), "Canonical Christmas authority body is missing current-season verification guidance");

const queryBlockStart = articleQueries.indexOf("export const articleQuery");
const queryBlockEnd = articleQueries.indexOf("const PUBLIC_CAVERN_QUERY_REVISION", queryBlockStart);
const queryBlock = queryBlockStart >= 0
  ? articleQueries.slice(queryBlockStart, queryBlockEnd > queryBlockStart ? queryBlockEnd : undefined)
  : "";
requireCondition(queryBlockStart >= 0, "articleQuery could not be located");
requireCondition(queryBlock.includes("loadLegacyAuthorityDetail(slug)"), "articleQuery legacy authority lookup unexpectedly disappeared");
requireCondition(queryBlock.includes("platform.articles.getBySlug(scope, slug)"), "articleQuery platform lookup could not be located");

requireCondition(
  !fs.existsSync("src/data/fixtures/free-christmas-events-in-texas.ts"),
  "Duplicate free-christmas-events-in-texas body file still exists; canonical seasonal fixture must be the only source",
);

if (failures.length) {
  for (const failure of failures) console.error(`CHRISTMAS AUTHORITY RESOLUTION FAIL: ${failure}`);
  process.exit(1);
}

console.log(`Christmas authority resolution guardrail passed: canonical seasonal fixture is the only source; body has ${headingCount} headings, ${paragraphCount} paragraphs and ${wordCount} body words.`);
