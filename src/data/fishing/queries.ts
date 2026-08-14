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
import { isFishingRecordVerified } from "./validation";

type PublicQuery<T extends { brandId: unknown; status?: unknown }> = Omit<T, "brandId" | "status">;
const published = { status: "published" as const };

export const fishingLakesQuery = (params: PublicQuery<FishingLakeQuery> = {}) => queryOptions({
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

export const fishSpeciesQuery = (params: PublicQuery<FishSpeciesQuery> = {}) => queryOptions({
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

export const fishingTechniquesQuery = (params: PublicQuery<FishingTechniqueQuery> = {}) => queryOptions({
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

export const fishingGuidesQuery = (params: PublicQuery<FishingGuideQuery> = {}) => queryOptions({
  queryKey: ["fishing", "guides", fishingScope.brandId, params],
  staleTime: 15 * 60 * 1000,
  queryFn: () => fishingPlatform.guides.list({ ...fishingScope, ...published, ...params, verifiedListing: true }),
});

export const fishingGuideQuery = (slug: string) => queryOptions({
  queryKey: ["fishing", "guide", fishingScope.brandId, slug],
  staleTime: 15 * 60 * 1000,
  queryFn: async () => {
    const row = await fishingPlatform.guides.getBySlug(fishingScope, slug);
    return row?.status === "published" && row.verifiedListing ? row : null;
  },
});

export const fishingGuideLakesQuery = (params: { guideId?: string; lakeId?: string } = {}) => queryOptions({
  queryKey: ["fishing", "guide-lakes", fishingScope.brandId, params],
  staleTime: 30 * 60 * 1000,
  queryFn: () => fishingPlatform.guideLakes.list({ ...fishingScope, ...params }),
});

export const fishingGuideSpeciesQuery = (params: { guideId?: string; speciesId?: string } = {}) => queryOptions({
  queryKey: ["fishing", "guide-species", fishingScope.brandId, params],
  staleTime: 30 * 60 * 1000,
  queryFn: () => fishingPlatform.guideSpecies.list({ ...fishingScope, ...params }),
});

export const fishingReportsQuery = (params: PublicQuery<FishingReportQuery> = {}) => queryOptions({
  queryKey: ["fishing", "reports", fishingScope.brandId, params],
  staleTime: 10 * 60 * 1000,
  queryFn: () => fishingPlatform.reports.list({ ...fishingScope, ...published, ...params }),
});

export const fishingReportQuery = (slug: string) => queryOptions({
  queryKey: ["fishing", "report", fishingScope.brandId, slug],
  staleTime: 10 * 60 * 1000,
  queryFn: async () => {
    const row = await fishingPlatform.reports.getBySlug(fishingScope, slug);
    return row?.status === "published" ? row : null;
  },
});

export const fishingAccessPointsQuery = (params: PublicQuery<FishingLocalQuery> = {}) => queryOptions({
  queryKey: ["fishing", "access", fishingScope.brandId, params],
  staleTime: 30 * 60 * 1000,
  queryFn: async () => (await fishingPlatform.accessPoints.list({ ...fishingScope, ...published, ...params })).filter(isFishingRecordVerified),
});

export const fishingTackleShopsQuery = (params: PublicQuery<FishingLocalQuery> = {}) => queryOptions({
  queryKey: ["fishing", "tackle-shops", fishingScope.brandId, params],
  staleTime: 30 * 60 * 1000,
  queryFn: async () => (await fishingPlatform.tackleShops.list({ ...fishingScope, ...published, ...params })).filter(isFishingRecordVerified),
});

export const fishingBusinessesQuery = (params: PublicQuery<FishingLocalQuery> = {}) => queryOptions({
  queryKey: ["fishing", "businesses", fishingScope.brandId, params],
  staleTime: 30 * 60 * 1000,
  queryFn: async () => (await fishingPlatform.businesses.list({ ...fishingScope, ...published, ...params })).filter(isFishingRecordVerified),
});

export const fishingPlacementsQuery = (params: PublicQuery<FishingPlacementQuery> = {}) => queryOptions({
  queryKey: ["fishing", "placements", fishingScope.brandId, params],
  staleTime: 5 * 60 * 1000,
  queryFn: () => fishingPlatform.placements.list({ ...fishingScope, ...published, ...params }),
});
