import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/texas-college-towns";
const title = "Texas College Towns: Campus Visits, Game Weekends & Local Culture";
const description = "Plan Texas college-town trips around campuses, traditions, museums, game weekends and city districts in Austin, College Station, Waco, Lubbock, Fort Worth, Denton and El Paso.";
const collectionItems = [
  ["Texas college sports venues", "/sports-venues/college-sports"],
  ["College Station and Texas A&M sports venues", "/sports-venues/college-station"],
  ["Waco sports destinations", "/sports-venues/waco"],
  ["Austin and Central Texas sports venues", "/sports-venues/austin-central-texas"],
  ["Lubbock and Texas Tech sports venues", "/sports-venues/lubbock"],
  ["El Paso and UTEP sports venues", "/sports-venues/el-paso"],
  ["Dallas–Fort Worth sports venues", "/sports-venues/dallas-fort-worth"],
  ["Texas cities and towns", "/browse/cities"],
  ["Texas Trip Planner", "/explore/trip-planner"],
] as const;

export const Route = createFileRoute("/texas-college-towns")({
  head: () => {
    const origin = `https://${texasDefinedBrand.identity.domain}`;
    const canonicalUrl = `${origin}${canonicalPath}`;
    return {
      meta: buildMeta(texasDefinedBrand, { title: title, description, canonicalPath }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CollectionPage",
              "@id": `${canonicalUrl}#page`,
              name: title,
              description,
              url: canonicalUrl,
              isPartOf: { "@id": `${origin}/#website` },
              mainEntity: { "@id": `${canonicalUrl}#items` },
              breadcrumb: { "@id": `${canonicalUrl}#breadcrumbs` },
              dateModified: "2026-08-30",
            },
            {
              "@type": "ItemList",
              "@id": `${canonicalUrl}#items`,
              name: "Texas college-town visitor planning collection",
              numberOfItems: collectionItems.length,
              itemListElement: collectionItems.map(([name, path], index) => ({ "@type": "ListItem", position: index + 1, name, url: `${origin}${path}` })),
            },
            {
              "@type": "BreadcrumbList",
              "@id": `${canonicalUrl}#breadcrumbs`,
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: origin },
                { "@type": "ListItem", position: 2, name: "Explore Texas", item: `${origin}/explore` },
                { "@type": "ListItem", position: 3, name: "College Towns", item: canonicalUrl },
              ],
            },
          ],
        }),
      }],
    };
  },
});
