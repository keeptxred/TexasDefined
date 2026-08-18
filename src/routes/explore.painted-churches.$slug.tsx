import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const paintedChurchTitles: Record<string, string> = {
  "high-hill-nativity-of-mary": "St. Mary’s at High Hill",
  "ammannsville-st-john-the-baptist": "St. John the Baptist at Ammannsville",
  "praha-st-marys-assumption": "St. Mary’s at Praha",
  "dubina-saints-cyril-methodius": "Saints Cyril and Methodius at Dubina",
  "moravia-ascension-of-our-lord": "Ascension of Our Lord at Moravia",
  "st-john-texas-st-john-the-baptist": "St. John the Baptist at St. John",
  "wallis-guardian-angel": "Guardian Angel at Wallis",
  "wesley-brethren-church": "Wesley Brethren Church",
  "amarillo-first-baptist-church": "Historic First Baptist at Amarillo",
  "umbarger-st-marys-catholic-church": "St. Mary’s at Umbarger",
  "paris-first-united-methodist-church": "First United Methodist at Paris",
  "lindsay-st-peters-catholic-church": "St. Peter’s at Lindsay",
  "fredericksburg-st-marys-catholic-church": "St. Mary’s at Fredericksburg",
  "sweet-home-queen-of-peace": "Queen of Peace at Sweet Home",
  "st-marys-immaculate-conception-lavaca": "Immaculate Conception at St. Mary’s",
  "shiner-saints-cyril-methodius": "Saints Cyril and Methodius at Shiner",
  "serbin-st-paul-lutheran-church": "St. Paul at Serbin",
  "panna-maria-immaculate-conception": "Immaculate Conception at Panna Maria",
};

export const Route = createFileRoute("/explore/painted-churches/$slug")({
  head: ({ params }) => {
    const shortName = paintedChurchTitles[params.slug];
    if (!shortName) {
      return { meta: [{ title: "Painted church unavailable" }, { name: "robots", content: "noindex, nofollow" }] };
    }

    const canonicalPath = `/explore/painted-churches/${params.slug}`;
    const url = `${siteUrl}${canonicalPath}`;
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: `${shortName} | Texas Painted Church Guide`,
        description: `Visitor guide to ${shortName}, with historic designation context, trip-planning guidance, primary sources and verified image rights where available.`,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "Church", "@id": `${url}#church`, name: shortName, url },
            {
              "@type": "BreadcrumbList",
              "@id": `${url}#breadcrumbs`,
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
                { "@type": "ListItem", position: 2, name: "Explore", item: `${siteUrl}/explore` },
                { "@type": "ListItem", position: 3, name: "Painted Churches", item: `${siteUrl}/explore/painted-churches` },
                { "@type": "ListItem", position: 4, name: shortName, item: url },
              ],
            },
          ],
        }),
      }],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Painted Churches of Texas</p>
      <h1 className="mt-3 font-display text-4xl">That church guide isn’t available.</h1>
      <p className="mt-4 text-muted-foreground"><a href="/explore/painted-churches" className="border-b border-primary text-primary">Return to the painted churches guide.</a></p>
    </div>
  ),
});
