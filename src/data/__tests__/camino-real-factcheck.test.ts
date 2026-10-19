import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import CaminoMissionTrailRoute from "../../components/editorial/CaminoMissionTrailRoute";
import { texasNpsHistoricTrailGuides } from "../fixtures/texas-nps-historic-trail-guides";
import { articleBodyWordCount, isArticleIndexReady } from "../fixtures/texas-gateway-index-readiness";

const SLUG = "el-camino-real-de-tierra-adentro-national-historic-trail";
const article = texasNpsHistoricTrailGuides.find((item) => item.slug === SLUG);
if (!article) throw new Error(`Expected Camino Real article fixture: ${SLUG}`);

const bodyText = article.body.flatMap((block) => {
  if (block.type === "list") return block.items;
  return "text" in block ? [block.text] : [];
}).join(" ");

describe("Camino Real — primary-source and indexable SSR contract", () => {
  it("keeps a source-backed, indexable, unique article and a correctly licensed hero", () => {
    expect(article.title).toContain("El Camino Real de Tierra Adentro");
    expect(articleBodyWordCount(article)).toBeGreaterThanOrEqual(600);
    expect(isArticleIndexReady(article)).toBe(true);
    expect(article.hero.width).toBeGreaterThanOrEqual(1200);
    expect(article.hero.alt).toContain("Ysleta Mission");
    expect(article.hero.credit).toContain("CC BY 3.0");
    expect(article.sourceUrl).toMatch(/^https:\/\/www\.nps\.gov\/elca\//);
    expect(bodyText.toLowerCase()).not.toContain("separate visitor guide");
  });

  it("distinguishes the federal endpoint from historic Mexico City–Santa Fe travel", () => {
    expect(bodyText).toContain("Ohkay Owingeh Pueblo");
    expect(bodyText).toContain("29 miles north of Santa Fe");
    expect(bodyText).toContain("Mexico City");
    expect(bodyText).toContain("designated in 2000");
    expect(bodyText).not.toContain("404 miles from El Paso, Texas, to Santa Fe, New Mexico");
    expect(article.sources?.some((source) => source.url === "https://www.nps.gov/elca/faqs.htm")).toBe(true);
  });

  it("distinguishes the two Socorro sites and keeps all three mission stops historically accurate", () => {
    expect(bodyText).toContain("328 S. Nevarez Road, Socorro, TX 79927");
    expect(bodyText).not.toContain("328 S. Nevarez Road, El Paso, TX");
    expect(bodyText).toContain("131 S. Zaragoza Road, El Paso, TX");
    expect(bodyText).toContain("1556 San Elizario Road, San Elizario, TX");
    expect(bodyText).toContain("1843");
    expect(bodyText).toContain("1877–1882");
    expect(bodyText).toContain("closed to the public");
    expect(article.sources?.some((source) => source.url === "https://thc.texas.gov/historic-sites/old-socorro-mission")).toBe(true);
  });

  it("server-renders the three stops, current city and working directions in ordinary HTML", () => {
    const html = renderToStaticMarkup(CaminoMissionTrailRoute());
    expect(html).toContain("Ysleta Mission");
    expect(html).toContain("Socorro Mission");
    expect(html).toContain("San Elizario Presidio Chapel");
    expect(html).toContain("328 S. Nevarez Road, Socorro, TX 79927");
    expect(html).toContain("waypoints=328+S+Nevarez+Rd+Socorro+TX+79927");
    expect(html).toContain("Open three-stop driving directions");
    expect(html).toContain("www.openstreetmap.org/export/embed.html");
    expect(html).toContain("Area map only");
  });

  it("links nearby El Paso stories without unrelated Fort Davis or Chamizal recommendations", () => {
    const hrefs = new Set((article.internalLinks ?? []).map((item) => item.href));
    expect(hrefs).toContain("/county/el-paso");
    expect(hrefs).toContain("/metro-area/el-paso-metro");
    expect(hrefs).toContain("/destination/old-socorro-mission");
    expect(hrefs).toContain("/article/texas-borderlands-historic-sites-guide");
    expect(article.relatedDestinations).toEqual(["ysleta-del-sur-pueblo-cultural-center-museum-el-paso"]);
  });

  it("retains clear citations and public-domain photo captions", () => {
    const photos = article.body.filter((block) => block.type === "image");
    expect(photos).toHaveLength(2);
    expect(photos.every((block) => block.type === "image" && block.image.credit.includes("public domain"))).toBe(true);
    expect(article.sources?.some((source) => source.url.includes("commons.wikimedia.org/wiki/File:YsletaMission.JPG"))).toBe(true);
    expect(article.sources?.some((source) => source.url.includes("ysletadelsurpueblo.org/tourism-hospitality/cultural-center/museum"))).toBe(true);
  });
});
