import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { paintedChurchAuthorityExpansionDate } from "@/data/painted-church-authority-catalog";
import { expandedPaintedChurches } from "@/data/painted-churches-expanded";
import { absoluteUrl, buildEditorialCollectionHead, jsonLd } from "@/lib/seo";
const canonicalPath = "/explore/painted-churches/compare";
const description = "Compare all verified Texas Painted Churches by construction and painting dates, artists, architects, classification, interior integrity, cultural heritage, symbols, techniques and historic designation.";

export const Route = createFileRoute(canonicalPath)({
  head: () => {
    const base = buildEditorialCollectionHead(texasDefinedBrand, {
      canonicalPath,
      title: "Compare Texas Painted Churches",
      description,
      collectionName: "Texas Painted Churches comparison",
      breadcrumbParentName: "Painted Churches",
      breadcrumbParentPath: "/explore/painted-churches",
      items: expandedPaintedChurches.map((church) => ({ name: church.name, url: `/explore/painted-churches/${church.slug}`, description: church.summary, image: church.image?.src, type: "TouristAttraction" as const })),
    });
    return {
      ...base,
      scripts: [
        ...(base.scripts ?? []),
        jsonLd({
          "@context": "https://schema.org",
          "@type": "Dataset",
          "@id": `${absoluteUrl(texasDefinedBrand, canonicalPath)}#dataset`,
          name: "Texas Painted Churches verified comparison dataset",
          description,
          url: absoluteUrl(texasDefinedBrand, canonicalPath),
          dateModified: paintedChurchAuthorityExpansionDate,
          creator: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#organization` },
          isBasedOn: absoluteUrl(texasDefinedBrand, "/explore/painted-churches"),
          variableMeasured: [
            "Church name", "City", "County", "Denomination", "Present building year", "Painting year", "Architect", "Artists and decorators",
            "Collection classification", "Interior integrity", "Cultural heritage", "Documented decorative techniques", "Documented symbols",
            "National Register decorative-interior status", "National Register reference number", "Recorded Texas Historic Landmark status", "Schulenburg cluster membership",
          ],
          distribution: [
            { "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: absoluteUrl(texasDefinedBrand, "/painted-churches.csv") },
            { "@type": "DataDownload", encodingFormat: "application/json", contentUrl: absoluteUrl(texasDefinedBrand, "/painted-churches.json") },
          ],
        }),
      ],
    };
  },
});
