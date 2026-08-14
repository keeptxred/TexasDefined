import type { BrandId } from "@/brand/types";
import type { GeoPoint, TexasRegion } from "@/data/types";

export type FishingPublicationStatus = "draft" | "published" | "archived";
export type FishingWaterType = "reservoir" | "natural-lake" | "river" | "bay" | "coastal" | "pond";
export type FishingWaterClass = "freshwater" | "saltwater" | "brackish";
export type FishingSeason = "spring" | "summer" | "fall" | "winter" | "year-round";
export type FishingQuality = "poor" | "fair" | "good" | "excellent" | "unknown";
export type FishingProminence = "primary" | "secondary" | "present";
export type FishTaxonKind = "species" | "group";
export type FishingTechniqueCategory = "casting" | "trolling" | "vertical" | "bait" | "fly" | "shore" | "other";
export type FishingAccessKind = "boat-ramp" | "marina" | "shore" | "pier" | "kayak-launch";
export type FishingBusinessCategory = "tackle-shop" | "boat-rental" | "kayak-rental" | "boat-repair" | "campground" | "rv-park" | "cabin" | "hotel" | "restaurant" | "fuel" | "other";
export type FishingPlacementKind = "featured-guide" | "lake-guide" | "regional-guide" | "species-guide" | "lake-sponsor" | "featured-marina" | "featured-tackle-shop" | "featured-lodging" | "featured-campground" | "featured-restaurant" | "regional-advertiser" | "statewide-advertiser";

export interface FishingSource {
  id: string;
  name: string;
  url: string;
  checkedAt: string;
  sourceType?: "state" | "federal" | "local" | "business" | "editorial" | "contributor";
}

export interface FishingRecordBase {
  id: string;
  brandId: BrandId;
  slug: string;
  status: FishingPublicationStatus;
  verifiedAt?: string;
  sources: FishingSource[];
}

export interface FishingLake extends FishingRecordBase {
  name: string;
  aliases?: string[];
  summary: string;
  region: TexasRegion;
  waterType: FishingWaterType;
  waterClass: FishingWaterClass;
  counties: string[];
  nearestCities: string[];
  coordinates?: GeoPoint;
  surfaceAcres?: number;
  maxDepthFeet?: number;
  impoundedYear?: number;
  riverBasin?: string;
  primaryWaterway?: string;
  controllingAuthorities: string[];
  stateBorder?: string[];
  featured?: boolean;
}

export interface FishSpecies extends FishingRecordBase {
  commonName: string;
  scientificName?: string;
  taxonKind: FishTaxonKind;
  waterClass: FishingWaterClass | "both";
  summary: string;
  aliases?: string[];
  featured?: boolean;
}

export interface FishingTechnique extends FishingRecordBase {
  name: string;
  summary: string;
  category: FishingTechniqueCategory;
  applicableSpeciesIds?: string[];
  featured?: boolean;
}

export interface FishingSeasonalPattern {
  season: FishingSeason;
  summary: string;
  habitats?: string[];
  methods?: string[];
  depthGuidance?: string;
}

export interface LakeSpeciesProfile {
  id: string;
  lakeId: string;
  speciesId: string;
  prominence: FishingProminence;
  quality: FishingQuality;
  seasonalPatterns: FishingSeasonalPattern[];
  notes?: string;
  verifiedAt?: string;
  sources: FishingSource[];
}

export interface LakeTechniqueProfile {
  id: string;
  lakeId: string;
  techniqueId: string;
  speciesIds: string[];
  seasons: FishingSeason[];
  summary: string;
  verifiedAt?: string;
  sources: FishingSource[];
}

export interface FishingLocalPlaceBase extends FishingRecordBase {
  name: string;
  lakeIds: string[];
  city?: string;
  county?: string;
  address?: string;
  coordinates?: GeoPoint;
  phone?: string;
  website?: string;
  description?: string;
  featured?: boolean;
}

export interface BoatRamp extends FishingLocalPlaceBase {
  kind: "boat-ramp";
  feeRequired?: boolean;
  launchNotes?: string;
  amenities?: string[];
  seasonalAccess?: string;
}

export interface Marina extends FishingLocalPlaceBase {
  kind: "marina";
  amenities?: string[];
  fuelAvailable?: boolean;
  liveBaitAvailable?: boolean;
  boatRentalAvailable?: boolean;
}

export interface FishingAccessSite extends FishingLocalPlaceBase {
  kind: "shore" | "pier" | "kayak-launch";
  amenities?: string[];
  accessNotes?: string;
}

export interface TackleShop extends FishingLocalPlaceBase {
  kind: "tackle-shop";
  liveBaitAvailable?: boolean;
  specialties?: string[];
}

export type FishingAccessPoint = BoatRamp | Marina | FishingAccessSite;

export interface FishingGuide extends FishingRecordBase {
  businessName: string;
  guideName?: string;
  bio?: string;
  lakeIds: string[];
  speciesIds: string[];
  techniqueIds?: string[];
  serviceRegions?: TexasRegion[];
  phone?: string;
  website?: string;
  bookingUrl?: string;
  startingPriceCents?: number;
  boatDescription?: string;
  maxGuests?: number;
  verifiedListing: boolean;
  claimedListing?: boolean;
  contributorApproved?: boolean;
  featured?: boolean;
}

export interface GuideLakeRelationship {
  id: string;
  guideId: string;
  lakeId: string;
  primary?: boolean;
  notes?: string;
  verifiedAt?: string;
  sources: FishingSource[];
}

export interface GuideSpeciesRelationship {
  id: string;
  guideId: string;
  speciesId: string;
  primary?: boolean;
  notes?: string;
  verifiedAt?: string;
  sources: FishingSource[];
}

export interface FishingReportSpeciesUpdate {
  speciesId: string;
  activity?: "slow" | "fair" | "good" | "excellent" | "unknown";
  summary: string;
  depthGuidance?: string;
  productiveHabitats?: string[];
  recommendedTechniqueIds?: string[];
  recommendedBaits?: string[];
}

export interface FishingReport extends FishingRecordBase {
  lakeId: string;
  title: string;
  summary: string;
  publishedAt: string;
  expiresAt?: string;
  contributorGuideId?: string;
  waterTemperatureF?: number;
  waterLevelSummary?: string;
  waterClarity?: string;
  speciesUpdates: FishingReportSpeciesUpdate[];
}

export interface FishingBusiness extends FishingLocalPlaceBase {
  kind: "business";
  category: FishingBusinessCategory;
}

export interface FishingAdvertiser extends FishingRecordBase {
  name: string;
  businessId?: string;
  guideId?: string;
  contactName?: string;
  contactEmail?: string;
  website?: string;
}

export interface FishingPlacement extends FishingRecordBase {
  advertiserId: string;
  kind: FishingPlacementKind;
  lakeIds?: string[];
  regionIds?: TexasRegion[];
  speciesIds?: string[];
  businessCategories?: FishingBusinessCategory[];
  destinationUrl: string;
  disclosure: "sponsored";
  startsAt?: string;
  endsAt?: string;
  priority?: number;
}

export interface FishingCatalog {
  lakes: FishingLake[];
  species: FishSpecies[];
  techniques: FishingTechnique[];
  lakeSpecies: LakeSpeciesProfile[];
  lakeTechniques: LakeTechniqueProfile[];
  accessPoints: FishingAccessPoint[];
  tackleShops: TackleShop[];
  guides: FishingGuide[];
  guideLakes: GuideLakeRelationship[];
  guideSpecies: GuideSpeciesRelationship[];
  reports: FishingReport[];
  businesses: FishingBusiness[];
  advertisers: FishingAdvertiser[];
  placements: FishingPlacement[];
}
