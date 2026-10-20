import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const DallasBlackHistoryPage = lazy(() => import("@/components/editorial/DallasBlackHistoryPage"));
const canonicalPath = "/dallas-black-history";
const canonical = "https://texasdefined.com/dallas-black-history";
const title = "Dallas Black History: 8 Historic Sites & Civil Rights Landmarks";
const description = "Explore eight Dallas Black history landmarks with verified histories, visitor guidance, research sources and cross-links to other Texas heritage places.";
const landmarks = [
  {
    "name": "African American Museum Dallas",
    "slug": "african-american-museum-dallas-fair-park"
  },
  {
    "name": "Booker T. Washington Arts High School",
    "slug": "booker-t-washington-high-school-dallas"
  },
  {
    "name": "Deep Ellum Historic District",
    "slug": "deep-ellum"
  },
  {
    "name": "Freedman's Cemetery Memorial",
    "slug": "freedmans-cemetery-memorial-dallas"
  },
  {
    "name": "Juanita J. Craft Civil Rights House",
    "slug": "juanita-craft-civil-rights-house-dallas"
  },
  {
    "name": "St. Paul United Methodist Church",
    "slug": "st-paul-united-methodist-church-dallas"
  },
  {
    "name": "Queen City Heights Historic District",
    "slug": "queen-city-heights-historic-district-dallas"
  },
  {
    "name": "Tenth Street Freedmen's Town",
    "slug": "tenth-street-historic-district-oak-cliff"
  }
];
export const Route = createFileRoute("/dallas-black-history")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { title: title, description, canonicalPath }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "CollectionPage", "@id": canonical, url: canonical, name: title, description,
          dateModified: "2026-10-13",
          author: { "@type": "Organization", name: "Texas Defined Editorial Desk" },
          citation: ["https://thc.texas.gov/blog/discover-these-8-african-american-history-sites-dallas","https://www.thc.texas.gov/public/upload/African-Americans-in-Texas-2021.pdf"] },
        { "@type": "ItemList", "@id": `${canonical}#places`, name: "Dallas African American heritage landmarks",
          numberOfItems: landmarks.length,
          itemListElement: landmarks.map((item, i) => ({
            "@type": "ListItem", position: i + 1, name: item.name,
            url: `https://texasdefined.com/destination/${item.slug}`
          })) }
      ]
    }) }]
  }),
  component: () => <Suspense fallback={null}><DallasBlackHistoryPage /></Suspense>,
});
