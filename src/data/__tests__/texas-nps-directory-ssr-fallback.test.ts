import { describe, expect, it } from "vitest";
import { ensureTexasNpsDirectoryHtml, getTexasNpsDirectoryFallbackHtml } from "../texas-nps-directory-ssr-fallback";
import { TEXAS_NPS_DIRECTORY } from "../texas-national-park-service-directory";

describe("NPS authority page HTML during SSR remote-asset outages", () => {
  it("lists the exact 18 real Texas NPS official destinations even without the public HTML asset", () => {
    const html = getTexasNpsDirectoryFallbackHtml();
    const codes = [...html.matchAll(/href="https:\/\/www\.nps\.gov\/([a-z]{4})\/"/g)].map(m => m[1]);
    expect(codes).toHaveLength(18);
    expect(new Set(codes).size).toBe(18);
    expect(codes).toEqual(TEXAS_NPS_DIRECTORY.map(site => site.npsCode));
    expect(html).toContain('id="complete-texas-nps-inventory"');
    expect(html).toContain("two federally designated National Parks");
  });
  it("preserves full hosted authority HTML when the official index exists", () => {
    const hosted = '<section id="complete-texas-nps-inventory">Original 18 index and park research</section>';
    expect(ensureTexasNpsDirectoryHtml(hosted)).toBe(hosted);
  });
  it("appends local authority coverage when the old hosted editorial file has no inventory", () => {
    const hosted = '<section>Individual research notes</section>';
    const html = ensureTexasNpsDirectoryHtml(hosted);
    expect(html.startsWith(hosted)).toBe(true);
    expect(html.match(/id="complete-texas-nps-inventory"/g)).toHaveLength(1);
    expect(html).toContain("/article/rio-grande-wild-and-scenic-river");
    expect(html).toContain("National Park Service — Texas");
  });
  it("clearly states the distinction between the 18 federal listings and card-quality acceptance", () => {
    const html = ensureTexasNpsDirectoryHtml(null);
    expect(html).toContain("fewer cards");
    expect(html).toContain("individual editorial acceptance");
    expect(html).toContain("Multi-state historic trail");
  });
});
