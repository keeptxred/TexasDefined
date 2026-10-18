import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { DestinationAuthoritySections } from "../DestinationAuthoritySections";
import { verifiedLocalParkCredit } from "@/data/verified-local-state-park-photo-credits";
import type { Destination } from "@/data/types";

function destination(slug: string, author: string, license: string): Destination {
  return {
    slug, name: slug, hero: { src: "/images/state-parks/" + slug + ".jpg", alt: slug, width: 1600, height: 1067, credit: author + " · " + license + " · Wikimedia Commons" },
    visitorFaqs: [{ question: "Can I visit?", answer: "Check official restrictions before traveling.", sourceUrl: "https://tpwd.texas.gov/state-parks/" + slug + "/alert" }],
  } as Destination;
}

describe("verified original state park photo provenance", () => {
  for(const [slug,author,license,commons] of [
    ["kickapoo-cavern-state-park", "Mark Gustafson", "CC BY-SA 4.0", "File:Kickapoo_Cavern_State_Park,_landscape.jpg"],
    ["lake-casa-blanca-international-state-park", "Billy Hathorn", "CC BY-SA 3.0", "File:Entrance_to_Lake_Casa_Blanca,_Laredo,_TX_IMG_2013.JPG"],
  ]){
    it("SSR links to actual author source, share-alike license and transformation disclosure for " + slug, () => {
      const d=destination(slug,author,license);
      const html=renderToStaticMarkup(<DestinationAuthoritySections destination={d} />);
      expect(html).toContain("commons.wikimedia.org/wiki/" + commons);
      expect(html).toContain("creativecommons.org/licenses/by-sa/");
      expect(html).toContain("Locally resized for display");
      expect(html).toContain(author);
      expect(html).toContain("Check official details");
    });
  }
  it("preserves the live Kickapoo Explore/caverns hero source link", () => {
    const d=destination("kickapoo-cavern-state-park","Mark Gustafson","CC BY-SA 4.0");
    d.hero.src="/images/explore/caverns/kickapoo-cavern-state-park.jpg";
    const html=renderToStaticMarkup(<DestinationAuthoritySections destination={d} />);
    expect(html).toContain("File:Kickapoo_Cavern_State_Park,_landscape.jpg");
    expect(verifiedLocalParkCredit(d.hero)?.licenseUrl).toBe("https://creativecommons.org/licenses/by-sa/4.0/");
  });
  it("refuses to assert an original file if a different photo credit replaces it",()=>{
    const wrong=destination("kickapoo-cavern-state-park","Unknown Photographer","CC BY-SA 4.0");
    expect(verifiedLocalParkCredit(wrong.hero)).toBeNull();
    const html=renderToStaticMarkup(<DestinationAuthoritySections destination={wrong} />);
    expect(html).not.toContain("Kickapoo_Cavern_State_Park,_landscape.jpg");
  });
  it("does not invent source-file match for other state-park heroes",()=>{
    const other=destination("purtis-creek-state-park","badkarmatx007","CC BY 3.0");
    expect(verifiedLocalParkCredit(other.hero)).toBeNull();
  });
});
