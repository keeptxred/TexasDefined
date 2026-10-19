import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const source = readFileSync(new URL("./texas-rivers-explained.ts", import.meta.url), "utf8");

describe("Texas rivers depth visuals", () => {
  it("keeps a credited reservoir photograph in the reservoir section", () => {
    expect(source).toContain('h("How Dams Create Texas Reservoirs")');
    expect(source).toContain("USACE_Ray_Roberts_Lake_and_Dam.jpg?width=1600");
    expect(source).toContain("U.S. Army Corps of Engineers · Public domain · Wikimedia Commons");
  });

  it("keeps a credited spring photograph in the springs section", () => {
    expect(source).toContain('h("How Springs Feed Texas Rivers")');
    expect(source).toContain("Aerial%20image%20of%20Barton%20springs%20pool%20in%20Austin%2C%20TX.jpg?width=1600");
    expect(source).toContain("Microbesandmuck27 · CC BY-SA 4.0 · Wikimedia Commons");
  });
});
