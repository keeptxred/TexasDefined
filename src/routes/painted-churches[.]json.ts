import { createFileRoute } from "@tanstack/react-router";

import { paintedChurchRegisterRecordBySlug } from "@/data/painted-church-register-evidence";
import { expandedPaintedChurches } from "@/data/painted-churches-expanded";

const BASE_URL = "https://texasdefined.com";

export const Route = createFileRoute("/painted-churches.json")({
  server: {
    handlers: {
      GET: async () => {
        const churches = expandedPaintedChurches.map((church) => {
          const register = paintedChurchRegisterRecordBySlug(church.slug);
          return {
            slug: church.slug,
            name: church.name,
            shortName: church.shortName,
            canonicalUrl: `${BASE_URL}/explore/painted-churches/${church.slug}`,
            city: church.city,
            county: church.county,
            address: church.address ?? null,
            denomination: church.denomination,
            classification: church.classification,
            interiorIntegrity: church.interiorIntegrity,
            culturalHeritage: church.culturalHeritage,
            techniques: church.techniques.map((slug) => ({ slug, url: `${BASE_URL}/explore/painted-churches/techniques/${slug}` })),
            summary: church.summary,
            significance: church.significance,
            visitNote: church.visitNote,
            schulenburgCluster: Boolean(church.schulenburgCluster),
            recordedTexasHistoricLandmark: Boolean(church.recordedTexasHistoricLandmark),
            nationalRegister: church.nationalRegister ?? null,
            nationalRegisterEvidence: register ? {
              nris: register.nris,
              listed: register.listed,
              multipleListing: register.multipleListing,
              areasOfSignificance: register.areasOfSignificance,
              architecturalStyle: register.architecturalStyle ?? null,
              architects: register.architects ?? [],
              significantYears: register.significantYears ?? [],
              npsUrl: register.npsUrl,
              thcUrl: register.thcUrl,
            } : null,
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
          };
        });

        return Response.json({
          schemaVersion: 2,
          title: "Texas Defined Painted Churches reference dataset",
          canonicalCollection: `${BASE_URL}/explore/painted-churches`,
          methodology: `${BASE_URL}/explore/painted-churches/methodology`,
          census: `${BASE_URL}/explore/painted-churches/census`,
          techniques: `${BASE_URL}/explore/painted-churches/techniques`,
          countExplainer: `${BASE_URL}/explore/painted-churches/how-many`,
          asOf: "2026-08-18",
          numberOfItems: churches.length,
          scopeNote: "This dataset distinguishes the formal National Register decorative-interior group, broader historic Painted Churches tradition and modern documented decorative campaigns. Integrity, heritage and technique fields are evidence labels; missing fields are not inferred.",
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
