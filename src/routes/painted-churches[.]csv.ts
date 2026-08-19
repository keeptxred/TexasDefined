import { createFileRoute } from "@tanstack/react-router";

import { canonicalPaintedChurchProfileBySlug } from "@/data/painted-church-profile-index";
import { paintedChurchHeritage } from "@/data/painted-church-heritage";
import { paintedChurchPeople } from "@/data/painted-church-people";
import { paintedChurchPreservationTopics } from "@/data/painted-church-preservation";
import { paintedChurchRegisterRecordBySlug } from "@/data/painted-church-register-evidence";
import { paintedChurchSymbols } from "@/data/painted-church-symbols";
import { expandedPaintedChurches } from "@/data/painted-churches-expanded";

const quote = (value: unknown) => `"${String(value ?? "").replace(/"/g, '""')}"`;

export const Route = createFileRoute("/painted-churches.csv")({
  server: {
    handlers: {
      GET: async () => {
        const header = [
          "name", "city", "county", "denomination", "address", "founded_year", "built_year", "painted_year", "architecture", "architect", "builder", "artists",
          "classification", "interior_integrity", "cultural_heritage", "documented_techniques", "documented_symbols", "connected_people", "heritage_contexts", "preservation_topics",
          "schulenburg_cluster", "recorded_texas_historic_landmark", "national_register_reference", "national_register_listed", "national_register_decorative_interior_group",
          "nps_record_url", "thc_record_url", "canonical_url", "primary_source_url", "secondary_source_url", "source_checked_at",
        ];
        const rows = expandedPaintedChurches.map((church) => {
          const register = paintedChurchRegisterRecordBySlug(church.slug);
          const profile = canonicalPaintedChurchProfileBySlug(church.slug);
          const symbols = paintedChurchSymbols.filter((item) => item.churchSlugs.includes(church.slug));
          const people = paintedChurchPeople.filter((item) => item.churchSlugs.includes(church.slug));
          const heritage = paintedChurchHeritage.filter((item) => item.churchSlugs.includes(church.slug));
          const preservation = paintedChurchPreservationTopics.filter((item) => item.churchSlugs.includes(church.slug));
          return [
            church.name,
            church.city,
            church.county,
            church.denomination,
            church.address ?? "",
            profile?.foundedYear ?? "",
            profile?.builtYear ?? "",
            profile?.paintedYear ?? "",
            profile?.architecture ?? register?.architecturalStyle ?? "",
            profile?.architect ?? "",
            profile?.builder ?? "",
            profile?.artists?.join(" | ") ?? "",
            church.classification,
            church.interiorIntegrity,
            church.culturalHeritage.join(" | "),
            church.techniques.join(" | "),
            symbols.map((item) => item.name).join(" | "),
            people.map((item) => `${item.name} (${item.roles.join("/")})`).join(" | "),
            heritage.map((item) => item.name).join(" | "),
            preservation.map((item) => item.name).join(" | "),
            church.schulenburgCluster ? "yes" : "no",
            church.recordedTexasHistoricLandmark ? "yes" : "no",
            church.nationalRegister?.referenceNumber ?? "",
            church.nationalRegister?.listed ?? "",
            church.nationalRegister?.multipleProperty ? "yes" : "no",
            register?.npsUrl ?? "",
            register?.thcUrl ?? "",
            `https://texasdefined.com/explore/painted-churches/${church.slug}`,
            church.sourceUrl,
            church.secondarySourceUrl ?? "",
            church.sourceCheckedAt,
          ];
        });
        const csv = [header, ...rows].map((row) => row.map(quote).join(",")).join("\n");
        return new Response(csv, {
          headers: {
            "Content-Type": "text/csv; charset=utf-8",
            "Content-Disposition": "attachment; filename=texas-painted-churches.csv",
            "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
            "X-Robots-Tag": "noindex, follow",
          },
        });
      },
    },
  },
});
