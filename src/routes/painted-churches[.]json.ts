import { createFileRoute } from "@tanstack/react-router";

import { expandedPaintedChurches } from "@/data/painted-churches-expanded";

const BASE_URL = "https://texasdefined.com";

export const Route = createFileRoute("/painted-churches.json")({
  server: {
    handlers: {
      GET: async () => {
        const churches = expandedPaintedChurches.map((church) => ({
          slug: church.slug,
          name: church.name,
          shortName: church.shortName,
          canonicalUrl: `${BASE_URL}/explore/painted-churches/${church.slug}`,
          city: church.city,
          county: church.county,
          address: church.address ?? null,
          denomination: church.denomination,
          summary: church.summary,
          significance: church.significance,
          visitNote: church.visitNote,
          schulenburgCluster: Boolean(church.schulenburgCluster),
          recordedTexasHistoricLandmark: Boolean(church.recordedTexasHistoricLandmark),
          nationalRegister: church.nationalRegister ?? null,
          primarySourceUrl: church.sourceUrl,
          secondarySourceUrl: church.secondarySourceUrl ?? null,
          sourceCheckedAt: church.sourceCheckedAt,
          image: church.image ? {
            src: church.image.src,
            alt: church.image.alt,
            credit: church.image.credit,
            license: church.image.license,
            sourceUrl: church.image.sourceUrl,
          } : null,
        }));

        return Response.json({
          schemaVersion: 1,
          title: "Texas Defined Painted Churches reference dataset",
          canonicalCollection: `${BASE_URL}/explore/painted-churches`,
          methodology: `${BASE_URL}/explore/painted-churches/methodology`,
          countExplainer: `${BASE_URL}/explore/painted-churches/how-many`,
          asOf: "2026-08-18",
          numberOfItems: churches.length,
          scopeNote: "This dataset distinguishes the broader Texas Painted Churches tradition from formal National Register decorative-interior membership and the Schulenburg touring cluster. Missing fields are not inferred.",
          churches,
        }, {
          headers: {
            "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
            "X-Robots-Tag": "noindex, follow",
          },
        });
      },
    },
  },
});
