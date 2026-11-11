import { describe, expect, it } from "vitest";
import { guadalupeCountySeguinCiboloGuadalupeRiverArticle } from "./guadalupe-county-seguin-cibolo-guadalupe-river";

describe("Nov 9 Flyover TLU football results and campus remembrance", () => {
  const article = guadalupeCountySeguinCiboloGuadalupeRiverArticle;
  it("keeps one existing county authority canonical instead of a thin score page", () => {
    expect(article.slug).toBe("guadalupe-county-seguin-cibolo-guadalupe-river-texas");
    const body = article.body.map(block => "text" in block ? block.text : "").join(" ");
    expect(body).toContain("Texas Lutheran");
    expect(body).toContain("November 7, 2026");
    expect(body).toContain("28–20");
    expect(body).toContain("8–1");
    expect(body).toContain("third consecutive");
    expect(body).toContain("4–0");
    expect(body).toContain("5–0");
    expect(body).toContain("not next season's standings");
  });
  it("respects deceased students and ties factual outcome to verified first-party sources", () => {
    const body = article.body.map(block => "text" in block ? block.text : "").join(" ");
    expect(body).toContain("A’Jean Augustine");
    expect(body).toContain("Deyreck Dean");
    expect(body).toContain("does not speculate about the accident");
    expect(body).not.toContain("https://");
    const originalSources = new Set(article.sources?.map(x => x.url));
    expect(originalSources).toContain("https://tlubulldogs.com/news/2026/11/7/football-tlu-holds-on-for-28-20-win-over-centenary-la.aspx");
    expect(originalSources).toContain("https://tlubulldogs.com/sports/football/stats");
    expect(originalSources).toContain("https://www.ksat.com/sports/2026/11/08/texas-lutheran-football-honors-fallen-teammates-clinches-conference-championship/");
    expect(article.internalLinks?.some(link => link.href === "/sports")).toBe(true);
  });
});
