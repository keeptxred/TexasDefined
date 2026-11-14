import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const read = (path) => readFileSync(new URL(`../../${path}`, import.meta.url), "utf8");
const fixture = read("src/data/fixtures/texas-nps-historic-trail-guides.ts");
const beginning = '  {\n      "id": "nps-trail-authority-el-camino-real-de-tierra-adentro-national-historic-trail"';
const start = fixture.indexOf(beginning);
assert.notEqual(start, -1, "Camino Real fixture must exist");
const end = fixture.indexOf("\n  }\n];", start);
assert.notEqual(end, -1, "Camino Real fixture must have an end");
const article = JSON.parse(fixture.slice(start, end + 5));
const body = article.body.flatMap((block) =>
  block.type === "list" ? block.items : typeof block.text === "string" ? [block.text] : []
).join(" ");
const map = read("src/components/editorial/CaminoMissionTrailRoute.tsx");
const articleBody = read("src/components/editorial/ArticleBody.tsx");
const route = read("src/routes/article.$slug.tsx");

test("Camino Real article stays sufficiently substantive and indexable", () => {
  assert.equal(article.slug, "el-camino-real-de-tierra-adentro-national-historic-trail");
  assert.equal(article.brandId, "texasdefined");
  assert.ok(body.trim().split(/\s+/).length >= 600);
  assert.ok(article.dek.length >= 80);
  assert.ok(article.hero.width >= 1200);
  assert.match(article.hero.alt, /Ysleta Mission/);
  assert.match(article.hero.credit, /CC BY 3\.0/);
  assert.match(article.sourceUrl, /^https:\/\/www\.nps\.gov\/elca\//);
  assert.doesNotMatch(body, /separate visitor guide/i);
});

test("404-mile federal endpoint is not confused with historic Santa Fe destination", () => {
  assert.match(body, /Ohkay Owingeh Pueblo/);
  assert.match(body, /29 miles north of Santa Fe/);
  assert.match(body, /Mexico City/);
  assert.match(body, /designated in 2000/);
  assert.doesNotMatch(body, /404 miles from El Paso, Texas, to Santa Fe, New Mexico/);
  assert.ok(article.sources.some((source) => source.url === "https://www.nps.gov/elca/faqs.htm"));
});

test("Socorro Mission location, chronology and closed original site are distinguished", () => {
  assert.match(body, /328 S\. Nevarez Road, Socorro, TX 79927/);
  assert.doesNotMatch(body, /328 S\. Nevarez Road, El Paso/);
  assert.match(body, /131 S\. Zaragoza Road, El Paso, TX 79907/);
  assert.match(body, /1556 San Elizario Road, San Elizario, TX 79849/);
  assert.match(body, /1843/);
  assert.match(body, /1877–1882/);
  assert.match(body, /closed to the public/);
  assert.ok(article.sources.some((source) => source.url === "https://thc.texas.gov/historic-sites/old-socorro-mission"));
});

test("mission map addresses, links and server-rendered insertion stay valid", () => {
  for (const place of ["Ysleta Mission", "Socorro Mission", "San Elizario Presidio Chapel"]) {
    assert.ok(map.includes(place), place);
  }
  assert.ok(map.includes("328 S. Nevarez Road, Socorro, TX 79927"));
  assert.ok(map.includes("waypoints=328+S+Nevarez+Rd+Socorro+TX+79927"));
  assert.ok(map.includes("Open three-stop driving directions"));
  assert.ok(map.includes("www.openstreetmap.org/export/embed.html"));
  assert.ok(map.includes("Area map only"));
  assert.ok(articleBody.includes('import CaminoMissionTrailRoute from "@/components/editorial/CaminoMissionTrailRoute"'));
  assert.ok(articleBody.includes("<CaminoMissionTrailRoute />"));
  assert.ok(!articleBody.includes('const CaminoMissionTrailRoute = lazy('));
});

test("canonical, Article, WebPage, Image and breadcrumb SEO wiring remains in article route", () => {
  assert.ok(route.includes('canonicalLink(texasDefinedBrand, canonicalPath)'));
  assert.ok(route.includes('type: "article"'));
  assert.ok(route.includes('"@type": "Article"'));
  assert.ok(route.includes('"@type": "WebPage"'));
  assert.ok(route.includes('"@type": "ImageObject"'));
  assert.ok(route.includes('"@type": "BreadcrumbList"'));
  assert.ok(route.includes('"application/ld+json"'));
  assert.ok(route.includes('shouldNoindexTexasGatewayArticle(article)'));
  assert.equal(article.hero.width >= 1200, true);
});

test("local related pages and licensed photographic sources stay on-topic", () => {
  const links = new Set(article.internalLinks.map((link) => link.href));
  for (const path of [
    "/county/el-paso",
    "/metro-area/el-paso-metro",
    "/destination/old-socorro-mission",
    "/article/texas-borderlands-historic-sites-guide",
  ]) assert.ok(links.has(path), path);
  assert.deepEqual(article.relatedDestinations, ["ysleta-del-sur-pueblo-cultural-center-museum-el-paso"]);
  assert.equal(article.body.filter((block) => block.type === "image").length, 2);
  assert.ok(article.body.filter((block) => block.type === "image").every((block) => block.image.credit?.includes("public domain")));
  assert.ok(article.sources.some((source) => source.url.includes("commons.wikimedia.org/wiki/File:YsletaMission.JPG")));
  assert.ok(article.sources.some((source) => source.url.includes("ysletadelsurpueblo.org/tourism-hospitality/cultural-center/museum")));
});
