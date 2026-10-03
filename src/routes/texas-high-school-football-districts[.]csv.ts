import { createFileRoute } from "@tanstack/react-router";

const quote = (value: unknown) => `"${String(value ?? "").replace(/"/g, '""')}"`;
const absolute = (path: string) => `https://texasdefined.com${path}`;

export const Route = createFileRoute("/texas-high-school-football-districts.csv")({
  server: {
    handlers: {
      GET: async () => {
        const { getAllFootballDistricts, getFootballDistrictProfile } = await import(
          "@/data/high-school-football/football-districts.server"
        );

        const header = [
          "alignment_cycle",
          "classification",
          "division",
          "district",
          "football_type",
          "school_name",
          "uil_enrollment",
          "submitted_conference",
          "district_url",
          "school_profile_url",
          "alignment_source_url",
          "enrollment_source_url",
        ];

        const rows = getAllFootballDistricts().flatMap((district) => {
          const profile = getFootballDistrictProfile(district.slug);
          if (!profile) return [];
          return profile.programs.map((program) => [
            district.alignmentCycle,
            district.classification,
            district.division ? `Division ${district.division === 1 ? "I" : "II"}` : "",
            district.district,
            district.footballType,
            program.schoolName,
            program.uilEnrollment,
            program.submittedConference,
            absolute(district.profilePath),
            absolute(program.profilePath),
            district.sourceUrl,
            district.enrollmentSourceUrl,
          ]);
        });

        const csv = [header, ...rows].map((row) => row.map(quote).join(",")).join("\n");
        return new Response(csv, {
          headers: {
            "Content-Type": "text/csv; charset=utf-8",
            "Content-Disposition": "attachment; filename=texas-uil-football-districts-2026-28.csv",
            "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
            "X-Robots-Tag": "noindex, follow",
          },
        });
      },
    },
  },
});
