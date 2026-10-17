import { describe, expect, it } from "vitest";
import { applyAllCuratedDestination } from "../destination-curation-all";
import { applyTwoNationalParkAuthorities } from "../two-national-parks-2026-authority";
import type { Destination } from "../types";
function park(slug: string, code: string): Destination {
  return {
    id: slug,brandId: "texasdefined",slug,name: slug,category:"national-parks",region:"big-bend",
    nearestTown:"Test",coordinates:{lat:30,lng:-103},county:"Test",
    hero:{src:"/images/valid-exact-place.jpg",alt:"Real existing location photo",width:1600,height:1050,credit:"Original image license"},
    summary:"Original text",bestSeason:"Fall",entryNote:"Original entry advice",
    highlights:[],body:["Original short paragraph"],officialUrl:`https://www.nps.gov/${code}/index.htm`
  };
}
describe("Big Bend and Guadalupe Mountains October 2026 NPS corrections",()=>{
  it("supersedes Big Bend's canceled 2026 Chisos construction closures with real road restrictions",()=>{
    const before=park("big-bend-national-park","bibe");
    const after=applyTwoNationalParkAuthorities(before);
    expect(after.entryNote).toContain("canceled");
    expect(after.body.join(" ")).toContain("Cottonwood");
    expect(after.body.join(" ")).toContain("Old Maverick");
    expect(after.body.join(" ")).toContain("reservations");
    expect(after.authorityGuide?.sources.some(s=>s.url.includes("construction-cancelled.htm"))).toBe(true);
    expect(after.hero).toEqual(before.hero);
  });
  it("does not conflate Guadalupe's locked McKittrick gate with park-wide open hours",()=>{
    const before=park("guadalupe-mountains-national-park","gumo");
    const after=applyTwoNationalParkAuthorities(before);
    expect(after.entryNote).toContain("MOUNTAIN TIME");
    expect(after.entryNote).toContain("5 p.m.");
    expect(after.body.join(" ")).toContain("3,000 feet");
    expect(after.visitorFaqs?.some(q=>q.answer.includes("Mountain Time"))).toBe(true);
    expect(after.hero).toEqual(before.hero);
  });
  for(const [slug,code] of [["big-bend-national-park","bibe"],["guadalupe-mountains-national-park","gumo"]]){
    it(`provides real source-backed detail, three distinct itineraries and FAQs for ${slug}`,()=>{
      const actual=applyAllCuratedDestination(park(slug,code));
      expect(actual.body.length).toBeGreaterThanOrEqual(5);
      expect(actual.visitorFaqs?.length).toBeGreaterThanOrEqual(3);
      expect(actual.authorityGuide?.itineraries).toHaveLength(3);
      expect(actual.authorityGuide?.sources.length).toBeGreaterThanOrEqual(4);
      expect(actual.sourceCheckedAt).toBe("2026-10-17");
    });
  }
  it("rejects a fake NPS site / mismatched unit",()=>{
    const bad=park("big-bend-national-park","gumo");
    expect(applyTwoNationalParkAuthorities(bad)).toBe(bad);
    const fake={...park("big-bend-national-park","bibe"),officialUrl:"https://www.nps.gov.attacker.example/bibe/"};
    expect(applyTwoNationalParkAuthorities(fake)).toBe(fake);
  });
});
