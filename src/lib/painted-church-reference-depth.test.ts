import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const routeSource = (name: string) => readFileSync(new URL(`../routes/${name}`, import.meta.url), "utf8");

const glossary = routeSource("explore.painted-churches.glossary.$slug.tsx");
const heritage = routeSource("explore.painted-churches.heritage.$slug.tsx");
const people = routeSource("explore.painted-churches.people.$slug.tsx");
const preservation = routeSource("explore.painted-churches.preservation.$slug.tsx");
const editorial = routeSource("editorial-policy.tsx");
const flury = readFileSync(new URL("../components/editorial/GottfriedFluryAuthority.tsx", import.meta.url), "utf8");
const peopleData = readFileSync(new URL("../data/painted-church-people.ts", import.meta.url), "utf8");
const exploreSitemap = routeSource("sitemap-explore[.]xml.ts");

describe("Painted Churches reference-page depth", () => {
  it("keeps glossary interpretation tied to church-specific evidence", () => {
    expect(glossary).toContain("How to use this term inside a Painted Church");
    expect(glossary).toContain("does not by itself establish a construction date, painter, restoration campaign, denomination or cultural origin");
    expect(glossary).toContain("Architectural vocabulary works best as a system");
  });

  it("keeps heritage interpretation source-disciplined", () => {
    expect(heritage).toContain("How to read heritage without overclaiming");
    expect(heritage).toContain("We do not infer a community identity from a modern town name, surname or visual motif alone");
    expect(heritage).toContain("documented communities rather than stereotypes");
  });

  it("keeps attribution boilerplate out of every biography and only in editorial policy", () => {
    expect(people).not.toContain("How Texas Defined handles attribution");
    expect(people).not.toContain("Those roles are not interchangeable");
    expect(editorial).toContain("How Texas Defined handles attribution");
    expect(editorial).toContain("Those roles are not interchangeable");
    expect(editorial).toContain("rather than filling gaps from style alone");
  });

  it("documents Flury with independently cited biography, verified imagery, and cautious attributions", () => {
    expect(people).toContain("<GottfriedFluryAuthority />");
    expect(people).toContain("birthDate: isFlury ?");
    expect(people).toContain("deathDate: isFlury ?");
    expect(people).toContain('sameAs: isFlury ? ["https://www.tshaonline.org/handbook/entries/flury-godfrey"] : undefined');
    expect(peopleData).toContain("Gottfried (Godfrey) Flury (1864–1936)");
    for (const required of ["Documented versus uncertain work", "1972", "National Register", "Key dates in Flury’s life and legacy", "March 24, 2018", "moravia-ascension-of-our-lord", "The shared decorative vocabulary", "Gottfried (Godfrey) Flury", "paintedChurchGalleryBySlug", "photo.license", "We link to that archive rather than reproduce the photograph without permission.", "https://www.tshaonline.org/handbook/entries/flury-godfrey", "https://austinpbs.org/paintedchurches/praha"]) {
      expect(flury).toContain(required);
    }
    expect(flury).not.toContain("Artistic interpretation");
    expect(flury).not.toContain("Verified location photography");
    expect(flury).not.toContain("The chronology intentionally");
    expect(flury).not.toContain("as it appears today");
    expect(flury).not.toContain("license</a> · source and attribution</a>");
  });


  it("makes the Flury research independently useful, attributed, and linked to the official property record", () => {
    for (const fact of [
      "A church made by more than one pair of hands",
      "After 1901 · Father Louis Netardus",
      "Later 20th century · Gene A. Mikulik",
      "1972 and 1983 · Documentary record",
      "June 21, 1983",
      "https://atlas.thc.texas.gov/Details?atlasnumber=2083003138",
      "Texas Defined History &amp; Heritage Desk",
      "Published-source cross-check completed November 9, 2026",
      "to=\"/corrections-policy\"",
    ]) {
      expect(flury).toContain(fact);
    }
    expect(people).toContain("Published sources cross-checked November 9, 2026");
    expect(people).toContain('dateModified: "2026-11-09"');
    expect(people).toContain('author: { "@type": "Organization", name: "Texas Defined History & Heritage Desk"');
    expect(flury).not.toContain("How Texas Defined handles attribution");
    expect(exploreSitemap).toContain('item.slug === "gottfried-flury" ? "2026-11-09" : "2026-08-18"');
  });

  it("distinguishes original fabric, repainting, reconstruction and conservation", () => {
    expect(preservation).toContain("How to read preservation evidence");
    expect(preservation).toContain("Original painted fabric, later repainting, reconstruction from surviving evidence and a modern conservation campaign");
    expect(preservation).toContain("the documented record controls the historical claim");
  });
});
