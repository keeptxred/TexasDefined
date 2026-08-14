import type { BrandId } from "@/brand/types";
import type { TexasRegion } from "@/data/types";
import type {
  FishSpecies,
  FishingAccessPoint,
  FishingAdvertiser,
  FishingBusiness,
  FishingCatalog,
  FishingGuide,
  FishingLake,
  FishingPlacement,
  FishingPublicationStatus,
  FishingReport,
  FishingTechnique,
  GuideLakeRelationship,
  GuideSpeciesRelationship,
  LakeSpeciesProfile,
  LakeTechniqueProfile,
  TackleShop,
} from "./types";

export interface FishingScope {
  brandId: BrandId;
}

export interface FishingLakeQuery extends FishingScope {
  status?: FishingPublicationStatus;
  region?: TexasRegion;
  county?: string;
  speciesId?: string;
  featured?: boolean;
  limit?: number;
}

export interface FishSpeciesQuery extends FishingScope {
  status?: FishingPublicationStatus;
  lakeId?: string;
  featured?: boolean;
  limit?: number;
}

export interface FishingTechniqueQuery extends FishingScope {
  status?: FishingPublicationStatus;
  lakeId?: string;
  speciesId?: string;
  limit?: number;
}

export interface FishingGuideQuery extends FishingScope {
  status?: FishingPublicationStatus;
  lakeId?: string;
  speciesId?: string;
  region?: TexasRegion;
  featured?: boolean;
  verifiedListing?: boolean;
  limit?: number;
}

export interface FishingReportQuery extends FishingScope {
  status?: FishingPublicationStatus;
  lakeId?: string;
  speciesId?: string;
  guideId?: string;
  limit?: number;
}

export interface FishingLocalQuery extends FishingScope {
  status?: FishingPublicationStatus;
  lakeId?: string;
  county?: string;
  city?: string;
  featured?: boolean;
  limit?: number;
}

export interface FishingPlacementQuery extends FishingScope {
  status?: FishingPublicationStatus;
  lakeId?: string;
  speciesId?: string;
  region?: TexasRegion;
  limit?: number;
}

export interface FishingRepositories {
  lakes: {
    list(query: FishingLakeQuery): Promise<FishingLake[]>;
    getBySlug(scope: FishingScope, slug: string): Promise<FishingLake | null>;
  };
  species: {
    list(query: FishSpeciesQuery): Promise<FishSpecies[]>;
    getBySlug(scope: FishingScope, slug: string): Promise<FishSpecies | null>;
  };
  techniques: {
    list(query: FishingTechniqueQuery): Promise<FishingTechnique[]>;
    getBySlug(scope: FishingScope, slug: string): Promise<FishingTechnique | null>;
  };
  lakeSpecies: {
    list(scope: FishingScope & { lakeId?: string; speciesId?: string }): Promise<LakeSpeciesProfile[]>;
  };
  lakeTechniques: {
    list(scope: FishingScope & { lakeId?: string; techniqueId?: string; speciesId?: string }): Promise<LakeTechniqueProfile[]>;
  };
  accessPoints: {
    list(query: FishingLocalQuery): Promise<FishingAccessPoint[]>;
  };
  tackleShops: {
    list(query: FishingLocalQuery): Promise<TackleShop[]>;
  };
  guides: {
    list(query: FishingGuideQuery): Promise<FishingGuide[]>;
    getBySlug(scope: FishingScope, slug: string): Promise<FishingGuide | null>;
  };
  guideLakes: {
    list(scope: FishingScope & { guideId?: string; lakeId?: string }): Promise<GuideLakeRelationship[]>;
  };
  guideSpecies: {
    list(scope: FishingScope & { guideId?: string; speciesId?: string }): Promise<GuideSpeciesRelationship[]>;
  };
  reports: {
    list(query: FishingReportQuery): Promise<FishingReport[]>;
    getBySlug(scope: FishingScope, slug: string): Promise<FishingReport | null>;
  };
  businesses: {
    list(query: FishingLocalQuery): Promise<FishingBusiness[]>;
  };
  advertisers: {
    list(scope: FishingScope & { status?: FishingPublicationStatus }): Promise<FishingAdvertiser[]>;
  };
  placements: {
    list(query: FishingPlacementQuery): Promise<FishingPlacement[]>;
  };
}

const limitRows = <T>(rows: T[], limit?: number) => limit ? rows.slice(0, limit) : rows;
const scoped = <T extends { brandId: BrandId; status: FishingPublicationStatus }>(rows: T[], brandId: BrandId, status?: FishingPublicationStatus) => rows.filter((row) => row.brandId === brandId && (!status || row.status === status));

export function createFixtureFishingRepositories(catalog: FishingCatalog): FishingRepositories {
  return {
    lakes: {
      async list(query) {
        let rows = scoped(catalog.lakes, query.brandId, query.status);
        if (query.region) rows = rows.filter((row) => row.region === query.region);
        if (query.county) rows = rows.filter((row) => row.counties.some((county) => county.toLowerCase() === query.county?.toLowerCase()));
        if (query.featured !== undefined) rows = rows.filter((row) => Boolean(row.featured) === query.featured);
        if (query.speciesId) {
          const lakeIds = new Set(catalog.lakeSpecies.filter((relation) => relation.speciesId === query.speciesId).map((relation) => relation.lakeId));
          rows = rows.filter((row) => lakeIds.has(row.id));
        }
        return limitRows(rows, query.limit);
      },
      async getBySlug(scope, slug) {
        return catalog.lakes.find((row) => row.brandId === scope.brandId && row.slug === slug) ?? null;
      },
    },
    species: {
      async list(query) {
        let rows = scoped(catalog.species, query.brandId, query.status);
        if (query.featured !== undefined) rows = rows.filter((row) => Boolean(row.featured) === query.featured);
        if (query.lakeId) {
          const speciesIds = new Set(catalog.lakeSpecies.filter((relation) => relation.lakeId === query.lakeId).map((relation) => relation.speciesId));
          rows = rows.filter((row) => speciesIds.has(row.id));
        }
        return limitRows(rows, query.limit);
      },
      async getBySlug(scope, slug) {
        return catalog.species.find((row) => row.brandId === scope.brandId && row.slug === slug) ?? null;
      },
    },
    techniques: {
      async list(query) {
        let rows = scoped(catalog.techniques, query.brandId, query.status);
        if (query.lakeId) {
          const ids = new Set(catalog.lakeTechniques.filter((relation) => relation.lakeId === query.lakeId).map((relation) => relation.techniqueId));
          rows = rows.filter((row) => ids.has(row.id));
        }
        if (query.speciesId) {
          const ids = new Set(catalog.lakeTechniques.filter((relation) => relation.speciesIds.includes(query.speciesId!)).map((relation) => relation.techniqueId));
          rows = rows.filter((row) => ids.has(row.id) || row.applicableSpeciesIds?.includes(query.speciesId!));
        }
        return limitRows(rows, query.limit);
      },
      async getBySlug(scope, slug) {
        return catalog.techniques.find((row) => row.brandId === scope.brandId && row.slug === slug) ?? null;
      },
    },
    lakeSpecies: {
      async list(query) {
        const lakeIds = new Set(catalog.lakes.filter((row) => row.brandId === query.brandId).map((row) => row.id));
        return catalog.lakeSpecies.filter((row) => lakeIds.has(row.lakeId) && (!query.lakeId || row.lakeId === query.lakeId) && (!query.speciesId || row.speciesId === query.speciesId));
      },
    },
    lakeTechniques: {
      async list(query) {
        const lakeIds = new Set(catalog.lakes.filter((row) => row.brandId === query.brandId).map((row) => row.id));
        return catalog.lakeTechniques.filter((row) => lakeIds.has(row.lakeId) && (!query.lakeId || row.lakeId === query.lakeId) && (!query.techniqueId || row.techniqueId === query.techniqueId) && (!query.speciesId || row.speciesIds.includes(query.speciesId)));
      },
    },
    accessPoints: {
      async list(query) {
        let rows = scoped(catalog.accessPoints, query.brandId, query.status);
        if (query.lakeId) rows = rows.filter((row) => row.lakeIds.includes(query.lakeId!));
        if (query.county) rows = rows.filter((row) => row.county?.toLowerCase() === query.county?.toLowerCase());
        if (query.city) rows = rows.filter((row) => row.city?.toLowerCase() === query.city?.toLowerCase());
        if (query.featured !== undefined) rows = rows.filter((row) => Boolean(row.featured) === query.featured);
        return limitRows(rows, query.limit);
      },
    },
    tackleShops: {
      async list(query) {
        let rows = scoped(catalog.tackleShops, query.brandId, query.status);
        if (query.lakeId) rows = rows.filter((row) => row.lakeIds.includes(query.lakeId!));
        if (query.county) rows = rows.filter((row) => row.county?.toLowerCase() === query.county?.toLowerCase());
        if (query.city) rows = rows.filter((row) => row.city?.toLowerCase() === query.city?.toLowerCase());
        if (query.featured !== undefined) rows = rows.filter((row) => Boolean(row.featured) === query.featured);
        return limitRows(rows, query.limit);
      },
    },
    guides: {
      async list(query) {
        let rows = scoped(catalog.guides, query.brandId, query.status);
        if (query.lakeId) rows = rows.filter((row) => row.lakeIds.includes(query.lakeId!));
        if (query.speciesId) rows = rows.filter((row) => row.speciesIds.includes(query.speciesId!));
        if (query.region) rows = rows.filter((row) => row.serviceRegions?.includes(query.region!));
        if (query.featured !== undefined) rows = rows.filter((row) => Boolean(row.featured) === query.featured);
        if (query.verifiedListing !== undefined) rows = rows.filter((row) => row.verifiedListing === query.verifiedListing);
        return limitRows(rows, query.limit);
      },
      async getBySlug(scope, slug) {
        return catalog.guides.find((row) => row.brandId === scope.brandId && row.slug === slug) ?? null;
      },
    },
    guideLakes: {
      async list(query) {
        const guideIds = new Set(catalog.guides.filter((row) => row.brandId === query.brandId).map((row) => row.id));
        return catalog.guideLakes.filter((row) => guideIds.has(row.guideId) && (!query.guideId || row.guideId === query.guideId) && (!query.lakeId || row.lakeId === query.lakeId));
      },
    },
    guideSpecies: {
      async list(query) {
        const guideIds = new Set(catalog.guides.filter((row) => row.brandId === query.brandId).map((row) => row.id));
        return catalog.guideSpecies.filter((row) => guideIds.has(row.guideId) && (!query.guideId || row.guideId === query.guideId) && (!query.speciesId || row.speciesId === query.speciesId));
      },
    },
    reports: {
      async list(query) {
        let rows = scoped(catalog.reports, query.brandId, query.status);
        if (query.lakeId) rows = rows.filter((row) => row.lakeId === query.lakeId);
        if (query.guideId) rows = rows.filter((row) => row.contributorGuideId === query.guideId);
        if (query.speciesId) rows = rows.filter((row) => row.speciesUpdates.some((update) => update.speciesId === query.speciesId));
        rows = [...rows].sort((left, right) => right.publishedAt.localeCompare(left.publishedAt));
        return limitRows(rows, query.limit);
      },
      async getBySlug(scope, slug) {
        return catalog.reports.find((row) => row.brandId === scope.brandId && row.slug === slug) ?? null;
      },
    },
    businesses: {
      async list(query) {
        let rows = scoped(catalog.businesses, query.brandId, query.status);
        if (query.lakeId) rows = rows.filter((row) => row.lakeIds.includes(query.lakeId!));
        if (query.county) rows = rows.filter((row) => row.county?.toLowerCase() === query.county?.toLowerCase());
        if (query.city) rows = rows.filter((row) => row.city?.toLowerCase() === query.city?.toLowerCase());
        if (query.featured !== undefined) rows = rows.filter((row) => Boolean(row.featured) === query.featured);
        return limitRows(rows, query.limit);
      },
    },
    advertisers: {
      async list(query) {
        return scoped(catalog.advertisers, query.brandId, query.status);
      },
    },
    placements: {
      async list(query) {
        let rows = scoped(catalog.placements, query.brandId, query.status);
        if (query.lakeId) rows = rows.filter((row) => row.lakeIds?.includes(query.lakeId!));
        if (query.speciesId) rows = rows.filter((row) => row.speciesIds?.includes(query.speciesId!));
        if (query.region) rows = rows.filter((row) => row.regionIds?.includes(query.region!));
        rows = [...rows].sort((left, right) => (right.priority ?? 0) - (left.priority ?? 0));
        return limitRows(rows, query.limit);
      },
    },
  };
}
