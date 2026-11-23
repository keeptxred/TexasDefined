import assert from "node:assert/strict";
import fs from "node:fs";
import { isTexasThanksgivingWeek } from "../../src/lib/thanksgiving-season.ts";

const read = (path) => fs.readFileSync(path, "utf8");
const homepage = read("src/routes/index.lazy.tsx");
const homepageMeta = read("src/routes/index.tsx");
const loader = read("src/data/fixtures/lazy-evergreen.ts");
const articleSource = read("src/data/fixtures/texas-thanksgiving-articles.ts");
const stubSource = read("src/data/fixtures/texas-thanksgiving-stubs.ts");
const parseData = (source, name) => {
  const match = source.match(new RegExp("export const "+name+": Article\\[\\] = ([\\s\\S]*);\\s*$"));
  assert.ok(match, name+" must export literal article content");
  return JSON.parse(match[1]);
};
const articles = parseData(articleSource, "texasThanksgivingArticles");
const stubs = parseData(stubSource, "texasThanksgivingArticleStubs");
const expected = [
  "texas-thanksgiving-turkey-frying-safety",
  "texas-thanksgiving-recipes",
  "texas-thanksgiving-traditions",
  "texas-thanksgiving-parades-2026",
];
assert.deepEqual(articles.map(article => article.slug), expected);
assert.deepEqual(stubs.map(article => article.slug), expected);
assert.match(homepage, /thanksgivingWeek \? "Happy Thanksgiving" : "The places, stories & life of Texas"/);
assert.match(homepage, /thanksgivingFeatures\.map/);
assert.match(homepageMeta, /const seasonalTitle = thanksgivingWeek \? "Happy Thanksgiving" : pageTitle/);
assert.doesNotMatch(homepageMeta, /const seasonalTitle = thanksgivingWeek \? "Happy Thanksgiving \\| Texas Defined" : pageTitle/);
assert.match(loader, /\.\.\.texasThanksgivingArticleStubs/);
assert.match(loader, /await import\("\.\/texas-thanksgiving-articles"\)/);
for (const article of articles) {
  const bodyWords = article.body.flatMap(block => block.text ?? block.items ?? []).join(" ").trim().split(/\s+/).length;
  assert.ok(bodyWords >= 600, article.slug+" violates full article indexability threshold ("+bodyWords+")");
  assert.ok(article.dek.length >= 80, "meta description too thin: "+article.slug);
  assert.equal(article.publishedAt, "2026-11-23");
  assert.ok(article.hero.alt && article.hero.credit.includes("CC"), "Image license missing");
  assert.ok(article.internalLinks.some(link => link.href.startsWith("https://")), "Official citations missing");
  assert.ok(article.internalLinks.filter(link => link.href.startsWith("/article/texas-thanksgiving")).length >= 3, "Missing companion links");
  assert.ok(homepage.includes(article.slug), "Homepage card missing: "+article.slug);
}
assert.ok(articles[0].body.some(block => block.text?.includes("National Fire Protection Association")));
assert.ok(articles[0].body.some(block => block.text?.includes("165°F")));
assert.ok(articles[1].body.some(block => block.text?.includes("pecan pie")));
assert.ok(articles[3].body.some(block => block.text?.includes("November 26")));
assert.ok(articles[3].body.some(block => block.text?.includes("November 27")));
assert.ok(articles[3].body.some(block => block.text?.includes("El Paso")));
assert.ok(articles[3].body.some(block => block.text?.includes("10 a.m.")));
assert.ok(articles[3].internalLinks.some(link => link.href.startsWith("https://sunbowl.org/")));
assert.ok(articles[3].body.some(block => block.text?.includes("November 22")));
assert.equal(isTexasThanksgivingWeek(new Date("2026-11-22T20:00:00Z")), false);
assert.equal(isTexasThanksgivingWeek(new Date("2026-11-23T14:00:00Z")), true);
assert.equal(isTexasThanksgivingWeek(new Date("2026-11-26T16:00:00Z")), true);
assert.equal(isTexasThanksgivingWeek(new Date("2026-11-29T22:00:00Z")), true);
assert.equal(isTexasThanksgivingWeek(new Date("2026-11-30T16:00:00Z")), false);
assert.equal(isTexasThanksgivingWeek(new Date("2027-11-25T16:00:00Z")), false);
console.log("Four 600+ word Texas Thanksgiving authority articles, linked homepage and Central Time campaign window verified.");
