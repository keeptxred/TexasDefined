import { createFileRoute } from "@tanstack/react-router";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/explore/tierra-blanca-creek";
const baseUrl = `https://${texasDefinedBrand.identity.domain}`;
const url = `${baseUrl}${canonicalPath}`;
const lastSubstantiveRevision = "2026-11-15";

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Tierra Blanca Creek: Canyon Country, History & Visiting Near Amarillo",
      description: "Follow Tierra Blanca Creek from the High Plains toward Palo Duro Canyon. Learn the watershed, archaeology and verified public access near Canyon and Amarillo, Texas.",
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Article",
            "@id": `${url}#article`,
            mainEntityOfPage: url,
            headline: "Tierra Blanca Creek: the waterway behind the Canyon landscape",
            description: "A source-checked geographic and cultural history of Tierra Blanca Creek in the Texas Panhandle, with lawful visitor alternatives and an Amarillo/Canyon road-trip plan.",
            datePublished: lastSubstantiveRevision,
            dateModified: lastSubstantiveRevision,
            author: { "@type": "Organization", name: "TexasDefined", url: baseUrl },
            publisher: { "@type": "Organization", name: "TexasDefined", url: baseUrl },
            about: [
              { "@type": "Place", name: "Tierra Blanca Creek", containedInPlace: { "@type": "AdministrativeArea", name: "Texas Panhandle" } },
              { "@type": "Place", name: "Palo Duro Canyon", containedInPlace: { "@type": "AdministrativeArea", name: "Randall and Armstrong counties, Texas" } },
            ],
            isPartOf: { "@id": `${baseUrl}/#website` },
          },
          {
            "@type": "BreadcrumbList",
            "@id": `${url}#breadcrumbs`,
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
              { "@type": "ListItem", position: 2, name: "Explore Texas", item: `${baseUrl}/explore` },
              { "@type": "ListItem", position: 3, name: "Tierra Blanca Creek", item: url },
            ],
          },
        ],
      }),
    }],
  }),
});
