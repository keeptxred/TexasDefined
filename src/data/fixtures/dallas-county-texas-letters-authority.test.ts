import { describe, expect, it } from "vitest";
import { dallasCountyDallasTrinityOldRedArticle } from "./dallas-county-dallas-trinity-old-red";

describe("Nov 9 original Texas Institute of Letters history in Dallas authority", () => {
  const a = dallasCountyDallasTrinityOldRedArticle;
  const body = a.body.map(block => "text" in block ? block.text : "").join(" ");
  it("adds original 1936 institutional context to existing county authority rather than a thin new article", () => {
    expect(a.slug).toBe("dallas-county-dallas-trinity-old-red-texas");
    expect(body).toContain("November 9, 1936");
    expect(body).toContain("Hall of State");
    expect(body).toContain("Texas Centennial Exposition");
    expect(body).toContain("Patrick D. Moreland");
    expect(body).toContain("Stanley E. Babb");
    expect(body).toContain("William H. Vann");
    expect(body).toContain("J. Frank Dobie");
  });
  it("distinguishes historical meeting from contemporary venue operations and nonexistent recurring event", () => {
    expect(body).toContain("does not mean the Texas Institute of Letters has its permanent headquarters");
    expect(body).toContain("repeats the original November 9 gathering as an annual public event");
  });
  it("cites true 1936 primary council records, TSHA corroboration and the Hall steward", () => {
    const src = new Set(a.sources?.map(s => s.url));
    expect(src).toContain("https://texasinstituteofletters.org/til-council-1936-1939/");
    expect(src).toContain("https://www.tshaonline.org/handbook/entries/texas-institute-of-letters");
    expect(src).toContain("https://www.dallashistory.org/hall-of-state/");
  });
});