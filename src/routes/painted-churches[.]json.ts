import { createFileRoute } from "@tanstack/react-router";

import { canonicalPaintedChurchProfileBySlug } from "@/data/painted-church-profile-index";
import { paintedChurchHeritage } from "@/data/painted-church-heritage";
import { paintedChurchPeople } from "@/data/painted-church-people";
import { paintedChurchPreservationTopics } from "@/data/painted-church-preservation";
import { paintedChurchRegisterRecordBySlug } from "@/data/painted-church-register-evidence";
import { paintedChurchSymbols } from "@/data/painted-church-symbols";
import { expandedPaintedChurches } from "@/data/painted-churches-expanded";

const BASE_URL = "https://texasdefined.com";

export const Route = createFileRoute("/painted-churches.json")({
  server: {
    handlers: {
      GET: async () => {
        const churches = expandedPaintedChurches.map((church) => {
          const register = paintedChurchRegisterRecordBySlug(church.slug);
          const profile = canonicalPaintedChurchProfileBySlug(church.slug);
          const people = paintedChurchPeople.filter((item) => item.churchSlugs.includes(church.slug));
          const symbols = paintedChurchSymbols.filter((item) => item.churchSlugs.includes(church.slug));
          const heritage = paintedChurchHeritage.filter((item) => item.churchSlugs.includes(church.slug));
          const preservation = paintedChurchPreservationTopics.filter((item) => item.churchSlugs.includes(church.slug));
          return {
            slug: church.slug,
            name: church.name,
            shortName: church.shortName,
            canonicalUrl: `${BASE_URL}/explore/painted-churches/${church.slug}`,
            city: church.city,
            county: church.county,
            address: church.address ?? null,
            denomination: church.denomination,
            foundedYear: profile?.foundedYear ?? null,
            builtYear: profile?.builtYear ?? null,
            paintedYear: profile?.paintedYear ?? null,
            architecture: profile?.architecture ?? register?.architecturalStyle ?? null,
            architect: profile?.architect ?? null,
            builder: profile?.builder ?? null,
            artists: profile?.artists ?? [],
            classification: church.classification,
            interiorIntegrity: church.interiorIntegrity,
            culturalHeritage: church.culturalHeritage,
            techniques: church.techniques.map((slug) => ({ slug, url: `${BASE_URL}/explore/painted-churches/techniques/${slug}` })),
            symbols: symbols.map((item) => ({ slug: item.slug, name: item.name, url: `${BASE_URL}/explore/painted-churches/symbols/${item.slug}` })),
            people: people.map((item) => ({ slug: item.slug, name: item.name, roles: item.roles, url: `${BASE_URL}/explore/painted-churches/people/${item.slug}` })),
            heritageContexts: heritage.map((item) => ({ slug: item.slug, name: item.name, url: `${BASE_URL}/explore/painted-churches/heritage/${item.slug}` })),
            preservationTopics: preservation.map((item) => ({ slug: item.slug, name: item.name, url: `${BASE_URL}/explore/painted-churches/preservation/${item.slug}` })),
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
          schemaVersion: 3,
          title: "Texas Defined Painted Churches reference dataset",
          canonicalCollection: `${BASE_URL}/explore/painted-churches`,
          methodology: `${BASE_URL}/explore/painted-churches/methodology`,
          census: `${BASE_URL}/explore/painted-churches/census`,
          techniques: `${BASE_URL}/explore/painted-churches/techniques`,
          symbols: `${BASE_URL}/explore/painted-churches/symbols`,
          people: `${BASE_URL}/explore/painted-churches/people`,
          heritage: `${BASE_URL}/explore/painted-churches/heritage`,
          preservation: `${BASE_URL}/explore/painted-churches/preservation`,
          knowledgeGraph: `${BASE_URL}/explore/painted-churches/knowledge-graph`,
          glossary: `${BASE_URL}/explore/painted-churches/glossary`,
          timeline: `${BASE_URL}/explore/painted-churches/timeline`,
          countExplainer: `${BASE_URL}/explore/painted-churches/how-many`,
          asOf: "2026-08-18",
          numberOfItems: churches.length,
          scopeNote: "This dataset distinguishes formal National Register membership, broader historic Painted Church status and modern documented decorative campaigns. Missing fields and relationships are not inferred.",
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
