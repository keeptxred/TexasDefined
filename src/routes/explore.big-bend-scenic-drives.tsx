import { createFileRoute } from "@tanstack/react-router";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

export const BIG_BEND_SCENIC_DRIVES_CHECKED_AT = "2026-10-12";
export const BIG_BEND_SCENIC_DRIVES_PATH = "/explore/big-bend-scenic-drives";
const description = "Compare Big Bend scenic drives: Ross Maxwell, Chisos Basin Road, FM 170 River Road, Rio Grande Village and remote dirt-road options, with NPS/TPWD sources and practical itineraries.";

export const Route = createFileRoute("/explore/big-bend-scenic-drives")({
  head: () => {
    const url = `https://${texasDefinedBrand.identity.domain}${BIG_BEND_SCENIC_DRIVES_PATH}`;
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath: BIG_BEND_SCENIC_DRIVES_PATH,
        title: "Big Bend Scenic Drives: Routes, Maps, Stops & Road Safety",
        description,
      }),
      links: [canonicalLink(texasDefinedBrand, BIG_BEND_SCENIC_DRIVES_PATH)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "WebPage", "@id": url, url, name: "Big Bend Scenic Drives", description,
            dateModified: BIG_BEND_SCENIC_DRIVES_CHECKED_AT,
            author: { "@type": "Organization", name: "Texas Defined Editorial Desk", url: "https://texasdefined.com/authors/a-hollis" },
            citation: [
              "https://www.nps.gov/bibe/planyourvisit/scenic_drives.htm",
              "https://home.nps.gov/bibe/planyourvisit/ross-maxwell-scenic-drive.htm",
              "https://tpwd.texas.gov/state-parks/big-bend-ranch/map",
              "https://www.nps.gov/bibe/planyourvisit/construction-cancelled.htm"
            ]
          },
          { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Explore", item: "https://texasdefined.com/explore" },
            { "@type": "ListItem", position: 2, name: "Big Bend", item: "https://texasdefined.com/explore/region/big-bend" },
            { "@type": "ListItem", position: 3, name: "Scenic Drives", item: url }
          ] }
        ]
      })]
    };
  }
});
