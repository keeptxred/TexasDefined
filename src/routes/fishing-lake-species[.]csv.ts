import { createFileRoute } from "@tanstack/react-router";

const quote = (value: unknown) => `"${String(value ?? "").replace(/"/g, '""')}"`;
const absolute = (path: string) => `https://texasdefined.com${path}`;

export const Route = createFileRoute("/fishing-lake-species.csv")({
  server: {
    handlers: {
      GET: async () => {
        const [{ fishingPlatform, fishingScope }, { fishingFoundationAnchor }] = await Promise.all([
          import("@/data/fishing"),
          import("@/data/fishing/slugs"),
        ]);

        const [lakes, species, lakeSpecies] = await Promise.all([
          fishingPlatform.lakes.list({ ...fishingScope, status: "published", limit: 5000 }),
          fishingPlatform.species.list({ ...fishingScope, status: "published", limit: 5000 }),
          fishingPlatform.lakeSpecies.list(fishingScope),
        ]);

        const lakeById = new Map(lakes.map((lake) => [lake.id, lake]));
        const speciesById = new Map(species.map((fish) => [fish.id, fish]));
        const header = [
          "lake_name",
          "lake_slug",
          "lake_guide_url",
          "region",
          "counties",
          "water_type",
          "water_class",
          "surface_acres",
          "max_depth_feet",
          "river_basin",
          "primary_waterway",
          "species_common_name",
          "species_scientific_name",
          "species_slug",
          "species_guide_url",
          "prominence",
          "quality",
          "seasonal_patterns",
          "notes",
          "lake_verified_at",
          "relation_verified_at",
          "source_names",
          "source_urls",
        ];

        const rows = lakeSpecies.flatMap((relation) => {
          const lake = lakeById.get(relation.lakeId);
          const fish = speciesById.get(relation.speciesId);
          if (!lake || !fish) return [];

          const sources = [...lake.sources, ...fish.sources, ...relation.sources];
          const uniqueSources = [...new Map(sources.map((source) => [source.url, source])).values()];
          const seasonalPatterns = relation.seasonalPatterns
            .map((pattern) => `${pattern.season}: ${pattern.summary}`)
            .join(" | ");

          return [[
            lake.name,
            lake.slug,
            absolute(fishingFoundationAnchor("lake", lake.slug)),
            lake.region,
            lake.counties.join(" | "),
            lake.waterType,
            lake.waterClass,
            lake.surfaceAcres ?? "",
            lake.maxDepthFeet ?? "",
            lake.riverBasin ?? "",
            lake.primaryWaterway ?? "",
            fish.commonName,
            fish.scientificName ?? "",
            fish.slug,
            absolute(fishingFoundationAnchor("species", fish.slug)),
            relation.prominence,
            relation.quality,
            seasonalPatterns,
            relation.notes ?? "",
            lake.verifiedAt ?? "",
            relation.verifiedAt ?? "",
            uniqueSources.map((source) => source.name).join(" | "),
            uniqueSources.map((source) => source.url).join(" | "),
          ]];
        }).sort((left, right) => String(left[0]).localeCompare(String(right[0])) || String(left[11]).localeCompare(String(right[11])));

        const csv = [header, ...rows].map((row) => row.map(quote).join(",")).join("\n");
        return new Response(csv, {
          headers: {
            "Content-Type": "text/csv; charset=utf-8",
            "Content-Disposition": "attachment; filename=texas-fishing-lake-species-matrix.csv",
            "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
            "X-Robots-Tag": "noindex, follow",
          },
        });
      },
    },
  },
});
