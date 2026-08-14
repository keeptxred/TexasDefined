import { queryOptions } from "@tanstack/react-query";

import { fishingPlatform, fishingScope } from "./index";
import type {
  FishSpeciesQuery,
  FishingGuideQuery,
  FishingLakeQuery,
  FishingLocalQuery,
  FishingPlacementQuery,
  FishingReportQuery,
  FishingTechniqueQuery,
} from "./repositories";

const published = { status: "published" as const };

export const fishingLakesQuery = (params: Omit<FishingLakeQuery, "brandId"> = {}) => queryOptions({
  queryKey: ["fishing", "lakes", fishingScope.brandId, params],
  staleTime: 30 * 60 * 1000,
  queryFn: () => fishingPlatform.lakes.list({ ...fishingScope, ...published, ...params }),
});

export const fishingLakeQuery = (slug: string) => queryOptions({
  queryKey: ["fishing", "lake", fishingScope.brandId, slug],
  staleTime: 30 * 60 * 1000,
  queryFn: async () => {
    const row = await fishingPlatform.lakes.getBySlug(fishingScope, slug);
    return row?.status === "published" ? row : null;
  },
});

export const fishSpeciesQuery = (params: Omit<FishSpeciesQuery, "brandId"> = {}) => queryOptions({
  queryKey: ["fishing", "species", fishingScope.brandId, params],
  staleTime: 30 * 60 * 1000,
  queryFn: () => fishingPlatform.species.list({ ...fishingScope, ...published, ...params }),
});

export const fishSpeciesBySlugQuery = (slug: string) => queryOptions({
  queryKey: ["fishing", "species-by-slug", fishingScope.brandId, slug],
  staleTime: 30 * 60 * 1000,
  queryFn: async () => {
    const row = await fishingPlatform.species.getBySlug(fishingScope, slug);
    return row?.status === "published" ? row : null;
  },
});

export const fishingTechniquesQuery = (params: Omit<FishingTechniqueQuery, "brandId"> = {}) => queryOptions({
  queryKey: ["fishing", "techniques", fishingScope.brandId, params],
  staleTime: 30 * 60 * 1000,
  queryFn: () => fishingPlatform.techniques.list({ ...fishingScope, ...published, ...params }),
});

export const lakeSpeciesProfilesQuery = (params: { lakeId?: string; speciesId?: string } = {}) => queryOptions({
  queryKey: ["fishing", "lake-species", fishingScope.brandId, params],
  staleTime: 30 * 60 * 1000,
  queryFn: () => fishingPlatform.lakeSpecies.list({ ...fishingScope, ...params }),
});

export const lakeTechniqueProfilesQuery = (params: { lakeId?: string; techniqueId?: string; speciesId?: string } = {}) => queryOptions({
  queryKey: ["fishing", "lake-techniques", fishingScope.brandId, params],
  staleTime: 30 * 60 * 1000,
  queryFn: () => fishingPlatform.lakeTechniques.list({ ...fishingScope, ...params }),
});

export const fishingGuidesQuery = (params: Omit<FishingGuideQuery, "brandId"> = {}) => queryOptions({
  queryKey: ["fishing", "guides", fishingScope.brandId, params],
  staleTime: 15 * 60 * 1000,
  queryFn: () => fishingPlatform.guides.list({ ...fishingScope, ...published, ...params }),
});

export const fishingReportsQuery = (params: Omit<FishingReportQuery, "brandId"> = {}) => queryOptions({
  queryKey: ["fishing", "reports", fishingScope.brandId, params],
  staleTime: 10 * 60 * 1000,
  queryFn: () => fishingPlatform.reports.list({ ...fishingScope, ...published, ...params }),
});

export const fishingAccessPointsQuery = (params: Omit<FishingLocalQuery, "brandId"> = {}) => queryOptions({
  queryKey: ["fishing", "access", fishingScope.brandId, params],
  staleTime: 30 * 60 * 1000,
  queryFn: () => fishingPlatform.accessPoints.list({ ...fishingScope, ...published, ...params }),
});

export const fishingTackleShopsQuery = (params: Omit<FishingLocalQuery, "brandId"> = {}) => queryOptions({
  queryKey: ["fishing", "tackle-shops", fishingScope.brandId, params],
  staleTime: 30 * 60 * 1000,
  queryFn: () => fishingPlatform.tackleShops.list({ ...fishingScope, ...published, ...params }),
});

export const fishingBusinessesQuery = (params: Omit<FishingLocalQuery, "brandId"> = {}) => queryOptions({
  queryKey: ["fishing", "businesses", fishingScope.brandId, params],
  staleTime: 30 * 60 * 1000,
  queryFn: () => fishingPlatform.businesses.list({ ...fishingScope, ...published, ...params }),
});

export const fishingPlacementsQuery = (params: Omit<FishingPlacementQuery, "brandId"> = {}) => queryOptions({
  queryKey: ["fishing", "placements", fishingScope.brandId, params],
  staleTime: 5 * 60 * 1000,
  queryFn: () => fishingPlatform.placements.list({ ...fishingScope, ...published, ...params }),
});
