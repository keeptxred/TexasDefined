import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const slug = "free-christmas-events-in-texas";
const authorityResolver = read("src/data/fixtures/lazy-authority-legacy.ts");
const seasonalResolver = read("src/data/fixtures/lazy-seasonal-intents.ts");
const articleQueries = read("src/data/queries.ts");
const authorityBody = read("src/data/fixtures/free-christmas-events-in-texas.ts");

const failures = [];
const requireCondition = (condition, message) => {
  if (!condition) failures.push(message);
};

requireCondition(
  authorityResolver.includes('const SEASONAL_AUTHORITY_SLUGS = new Set([') && authorityResolver.includes(`"${slug}"`),
  "Christmas authority slug is not registered in the query-boundary authority resolver",
);
requireCondition(
  authorityResolver.includes("body: freeChristmasEventsInTexasBody") && authorityResolver.includes("readingMinutes: 8"),
  "Christmas authority resolver is not replacing the legacy body with the expanded authority body",
);
requireCondition(
  authorityResolver.includes("if (SEASONAL_AUTHORITY_SLUGS.has(slug))"),
  "Christmas seasonal authority articles are falling through legacy food/travel/life enrichment",
);
requireCondition(
  seasonalResolver.includes("if (legacyAuthoritySlugs.has(slug)) return loadLegacyAuthorityArticle(brandId, slug);"),
  "Seasonal intent detail lookup does not defer authority upgrades before loading the legacy fixture",
);
requireCondition(
  !seasonalResolver.includes('import { freeChristmasEventsInTexasBody } from "./free-christmas-events-in-texas"'),
  "Christmas authority body is still being patched through a second seasonal runtime override",
);

const queryBlockStart = articleQueries.indexOf("export const articleQuery");
const queryBlockEnd = articleQueries.indexOf("const PUBLIC_CAVERN_QUERY_REVISION", queryBlockStart);
const queryBlock = queryBlockStart >= 0 ? articleQueries.slice(queryBlockStart, queryBlockEnd > queryBlockStart ? queryBlockEnd : undefined) : "";
const authorityLookup = queryBlock.indexOf("loadLegacyAuthorityDetail(slug)");
const platformLookup = queryBlock.indexOf("const platform = await loadPlatform();");
requireCondition(queryBlockStart >= 0, "articleQuery could not be located");
requireCondition(authorityLookup >= 0, "articleQuery does not resolve authority upgrades");
requireCondition(platformLookup >= 0, "articleQuery platform lookup could not be located");
requireCondition(
  authorityLookup >= 0 && platformLookup >= 0 && authorityLookup < platformLookup,
  "articleQuery must resolve authority upgrades before platform/remote legacy records can win",
);

const headingCount = (authorityBody.match(/type:\s*"heading"/g) || []).length;
const paragraphCount = (authorityBody.match(/type:\s*"paragraph"/g) || []).length;
const wordCount = (authorityBody.match(/\b[A-Za-z0-9][A-Za-z0-9'’.-]*\b/g) || []).length;
requireCondition(headingCount >= 8, `Christmas authority body is too shallow (${headingCount} headings)`);
requireCondition(paragraphCount >= 12, `Christmas authority body is too shallow (${paragraphCount} paragraphs)`);
requireCondition(wordCount >= 900, `Christmas authority body is too short (${wordCount} source words)`);
requireCondition(authorityBody.includes("Fredericksburg"), "Christmas authority body is missing Fredericksburg coverage");
requireCondition(authorityBody.includes("Georgetown"), "Christmas authority body is missing Georgetown coverage");
requireCondition(authorityBody.includes("Grapevine"), "Christmas authority body is missing Grapevine coverage");
requireCondition(authorityBody.includes("Verify this year's schedule before you leave"), "Christmas authority body is missing current-season verification guidance");

if (failures.length) {
  for (const failure of failures) console.error(`CHRISTMAS AUTHORITY RESOLUTION FAIL: ${failure}`);
  process.exit(1);
}

console.log(`Christmas authority resolution guardrail passed: query-boundary override precedes legacy platform records; authority body has ${headingCount} headings, ${paragraphCount} paragraphs and ${wordCount} source words.`);
