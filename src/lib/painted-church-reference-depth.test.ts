import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const routeSource = (name: string) => readFileSync(new URL(`../routes/${name}`, import.meta.url), "utf8");

const glossary = routeSource("explore.painted-churches.glossary.$slug.tsx");
const heritage = routeSource("explore.painted-churches.heritage.$slug.tsx");
const people = routeSource("explore.painted-churches.people.$slug.tsx");
const preservation = routeSource("explore.painted-churches.preservation.$slug.tsx");

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

  it("distinguishes documented people roles and later intervention", () => {
    expect(people).toContain("How Texas Defined handles attribution");
    expect(people).toContain("Those roles are not interchangeable");
    expect(people).toContain("rather than filling gaps from style alone");
  });

  it("distinguishes original fabric, repainting, reconstruction and conservation", () => {
    expect(preservation).toContain("How to read preservation evidence");
    expect(preservation).toContain("Original painted fabric, later repainting, reconstruction from surviving evidence and a modern conservation campaign");
    expect(preservation).toContain("the documented record controls the historical claim");
  });
});
