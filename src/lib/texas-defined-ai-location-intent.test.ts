import { describe, expect, it } from "vitest";
import { classifyTexasBrandLocationQuestion } from "./texas-defined-ai-location.server";

describe("Ask Texas brand location intent semantics", () => {
  it("keeps near/nearest questions proximity-based", () => {
    const nearest = classifyTexasBrandLocationQuestion("Where is the nearest Buc-ee's to Galveston?");
    const near = classifyTexasBrandLocationQuestion("Find H-E-B near Austin");

    expect(nearest.isLocationQuestion).toBe(true);
    expect(nearest.placeScope).toBe("nearest");
    expect(near.placeScope).toBe("nearest");
  });

  it("uses strict place scoping only for explicit in/inside/within wording", () => {
    expect(classifyTexasBrandLocationQuestion("Which H-E-B stores are in Harris County?").placeScope).toBe("within");
    expect(classifyTexasBrandLocationQuestion("Is there a Buc-ee's inside Austin?").placeScope).toBe("within");
    expect(classifyTexasBrandLocationQuestion("Show Buc-ee's within Denton County").placeScope).toBe("within");
  });
});
