import { describe, expect, it } from "vitest";
import { smallTownWave1Destinations } from "./small-town-destinations-wave1";

describe("Fredericksburg future hotel authority research", () => {
  const destination = smallTownWave1Destinations.find((item) => item.slug === "fredericksburg");
  it("keeps one established canonical, original first-party evidence and future status", () => {
    expect(destination).toBeDefined();
    expect(destination?.slug).toBe("fredericksburg");
    const body = destination?.body.join(" ") ?? "";
    expect(body).toContain("As of November 11, 2026");
    expect(body).toContain("Q3 2027");
    expect(body).toContain("not a confirmed guest-opening date");
    expect(body).toContain("restaurant's name, menu, prices and opening hours had not been announced");
    expect(body).not.toContain("now open for bookings");
    const planned = destination?.areaGuide?.nearbyAttractions?.find((item) => item.name.includes("Kimpton Fredericksburg"));
    expect(planned?.description).toContain("not yet open");
    expect(planned?.href).toBe("https://www.ihgplc.com/en/news-and-media/news-releases/2025/kimpton-expands-its-presence-in-texas-with-dc-partners-with-a-new-luxury-lifestyle-hotel");
  });
});
