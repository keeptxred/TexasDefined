import { describe, expect, it } from "vitest";
import { destinationLocationAnswer } from "../destination-location-answer";

describe("destination location answers shared by every Explore destination", () => {
  it("never claims a small town is near itself", () => {
    expect(destinationLocationAnswer({
      name: "Fredericksburg", nearestTown: "Fredericksburg",
      countyLabel: "Gillespie County", regionName: "Hill Country",
    })).toBe("Fredericksburg is a community in Gillespie County, Texas, in the Hill Country region.");
  });
  it("does not confuse an actual nearby park with being inside the town", () => {
    expect(destinationLocationAnswer({
      name: "Enchanted Rock State Natural Area", nearestTown: "Fredericksburg",
      countyLabel: "Gillespie County", address: "16710 Ranch Road 965, Fredericksburg, TX 78624",
    })).toContain("is at 16710 Ranch Road 965, Fredericksburg, TX 78624");
    expect(destinationLocationAnswer({
      name: "Old Tunnel State Park", nearestTown: "Fredericksburg",
      countyLabel: "Gillespie County", address: "10619 Old San Antonio Road",
    })).toContain("is at 10619 Old San Antonio Road");
  });
  it("keeps the state and county for destinations without a precise street address", () => {
    const text = destinationLocationAnswer({
      name: "Palo Duro Canyon State Park", nearestTown: "Canyon",
      countyLabel: "Randall County",
    });
    expect(text).toBe("Palo Duro Canyon State Park is near Canyon, Texas, in Randall County.");
  });
  it("handles varying destination capitalization and missing county labels", () => {
    expect(destinationLocationAnswer({ name: "New Braunfels", nearestTown: "new braunfels", regionName: "Hill Country" }))
      .toBe("New Braunfels is a community in Texas, in the Hill Country region.");
  });
});
