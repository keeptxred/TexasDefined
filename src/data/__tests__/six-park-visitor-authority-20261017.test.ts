import { describe, expect, it } from "vitest";
import { applySixParkVisitorAuthorityGuide } from "../six-park-visitor-authority-20261017";
import type { Destination } from "../types";

const parks = [
  "abilene-state-park",
  "balmorhea-state-park",
  "buescher-state-park",
  "caprock-canyons-state-park",
  "colorado-bend-state-park",
  "fort-parker-state-park"
] as const;
const knownFacts: Record<string, string[]> = {
  "abilene-state-park": ["pool is closed", "Lake Abilene"],
  "balmorhea-state-park": ["no lifeguard", "scuba"],
  "buescher-state-park": ["low water", "Oak Haven"],
  "caprock-canyons-state-park": ["fifty yards", "Trailway"],
  "colorado-bend-state-park": ["Gorman Falls", "October 19"],
  "fort-parker-state-park": ["fishing piers", "May 2027"]
};
function destination(slug:string,officialUrl:string):Destination{
  return {
    id:slug,brandId:"texasdefined",slug,name:slug,category:"state-parks",region:"hill-country",
    nearestTown:"Test",county:"Test",coordinates:{lat:30,lng:-99},
    hero:{src:"/images/verified-exact-site.jpg",alt:"Previously credited exact-site photograph",width:1600,height:1000,credit:"Original photographer with rights"},
    summary:"Prior park overview",entryNote:"Prior entry",bestSeason:"Fall",
    highlights:[],body:["Thin prior page"],
    officialUrl,sourceCheckedAt:"2026-10-12"
  };
}
describe("six researched TPWD visitor authorities",()=>{
  for(const slug of parks){
    it(`keeps unique place evidence, licensed hero, distinct visitor FAQs: ${slug}`,()=>{
      const original=destination(slug,`https://tpwd.texas.gov/state-parks/${slug.replace(/-state-park$/,"")}`);
      const result=applySixParkVisitorAuthorityGuide(original);
      expect(result).not.toBe(original);
      expect(result.body).toHaveLength(4);
      expect(result.body.join(" ").split(/\s+/).length).toBeGreaterThan(220);
      expect(result.visitorFaqs).toHaveLength(3);
      expect(result.visitorFaqs?.every(q=>q.sourceUrl?.startsWith("https://tpwd.texas.gov/state-parks/"))).toBe(true);
      expect(result.sourceCheckedAt).toBe("2026-10-17");
      expect(result.hero).toEqual(original.hero);
      expect(result.coordinates).toEqual(original.coordinates);
      expect(result.entryNote.length).toBeGreaterThan(80);
      for(const phrase of knownFacts[slug]) expect(result.body.join(" ").toLowerCase()).toContain(phrase.toLowerCase());
    });
  }
  it("does not trust a spoofed official source URL",()=>{
    const d=destination("abilene-state-park","https://tpwd.texas.gov.attacker.example/state-parks/abilene");
    expect(applySixParkVisitorAuthorityGuide(d)).toBe(d);
  });
  it("does not alter other park or business destinations",()=>{
    const d=destination("blanco-state-park","https://tpwd.texas.gov/state-parks/blanco");
    expect(applySixParkVisitorAuthorityGuide(d)).toBe(d);
  });
});
