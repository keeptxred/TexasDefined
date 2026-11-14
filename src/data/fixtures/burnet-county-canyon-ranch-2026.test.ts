import { describe, expect, it } from "vitest";
import { burnetCountyBurnetMarbleFallsHighlandLakesGraniteArticle } from "./burnet-county-burnet-marble-falls-highland-lakes-granite";

describe("Nov 9 Flyover Canyon Ranch Austin original travel coverage", () => {
  const article = burnetCountyBurnetMarbleFallsHighlandLakesGraniteArticle;
  it("keeps one source-backed Burnet County authority canonical", () => {
    expect(article.slug).toBe("burnet-county-burnet-marble-falls-highland-lakes-granite-texas");
    const all = article.body.map(block => "text" in block ? block.text : "").join(" ");
    expect(all).toContain("Canyon Ranch Austin");
    expect(all).toContain("private wellness resort");
    expect(all).toContain("Burnet County");
    expect(all).toContain("October 2026");
    expect(all).toContain("November 11, 2026");
    expect(all).toContain("public-access Highland Lakes options");
    expect(all).toContain("not an independently verified comparison");
  });
  it("flags guest-only and day-pass uncertainty without claiming public drop-in admission", () => {
    const all = article.body.map(block => "text" in block ? block.text : "").join(" ");
    expect(all).toContain("confirm current admission");
    expect(all).toContain("did not yet sell spa day passes");
    expect(all).toContain("the route and arrival instructions supplied by the resort");
    expect(all).not.toContain("Free admission to Canyon Ranch");
  });
  it("links the original operator, Texas state public record and independent access report", () => {
    const urls = new Set(article.sources?.map(s => s.url));
    expect(urls).toContain("https://www.canyonranch.com/austin");
    expect(urls).toContain("https://www.tdlr.texas.gov/TABS/Projects/TABS2024018713");
    expect(urls).toContain("https://www.golaketravis.com/news.php?id=3244");
  });
});
