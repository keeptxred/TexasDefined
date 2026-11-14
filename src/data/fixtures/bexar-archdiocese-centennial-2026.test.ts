import { describe, expect, it } from "vitest";
import { bexarCountySanAntonioMissionsRiverArticle } from "./bexar-county-san-antonio-missions-river";

describe("Nov 9 Flyover metropolitan archdiocese centennial historical corrections", () => {
  const article = bexarCountySanAntonioMissionsRiverArticle;
  const body = article.body.map(block => "text" in block ? block.text : "").join(" ");

  it("places the new material inside the established Bexar County historical authority canonical", () => {
    expect(article.slug).toBe("bexar-county-san-antonio-missions-river-texas");
    expect(body).toContain("1874");
    expect(body).toContain("August 3, 1926");
    expect(body).toContain("100th anniversary in 2026");
    expect(body).toContain("not the founding of the missions");
  });

  it("does not reuse the outdated Wolff Stadium promotion as the actual venue", () => {
    expect(body).toContain("Greehey Arena");
    expect(body).toContain("November 7, 2026");
    expect(body).toContain("Early organizer announcements named Wolff Stadium");
    expect(body).toContain("completed historical gathering");
  });

  it("cites the primary organizational chronology and independent post-event eyewitness report", () => {
    const urls = new Set(article.sources?.map(s => s.url));
    expect(urls).toContain("https://archsa.org/history/");
    expect(urls).toContain("https://archsa.org/anniversary/");
    expect(urls).toContain("https://archsa.org/1926-2026-a-century-of-courage-a-kairos-of-hope/");
    expect(urls).toContain("https://www.ksat.com/news/local/2026/11/08/archdiocese-of-san-antonio-marks-100-years-as-metropolitan-archdiocese-with-celebratory-mass/");
  });
});
