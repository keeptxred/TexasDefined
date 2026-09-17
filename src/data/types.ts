/**
 * Domain content types. Brand-agnostic: every record carries a `brandId`
 * so a shared backend can serve both TexasDefined and KeepTXRed.
 */

import type { BrandId } from "@/brand/types";

export type Slug = string;

export interface ImageRef { src: string; alt: string; width: number; height: number; credit?: string; }
export interface GeoPoint { lat: number; lng: number; }

/**
 * Stable public travel-discovery region identifiers used by existing Explore
 * routes and legacy content records. Do not repurpose these as the canonical
 * broad geographic backbone; see `canonical-geography.ts`.
 */
export type TexasRegion = "hill-country" | "gulf-coast" | "big-bend" | "panhandle" | "piney-woods" | "prairies-lakes" | "south-texas";
export interface Region { id: TexasRegion; name: string; blurb: string; }

/** Canonical internal broad-region identifiers for all new geography modeling. */
export type CanonicalPrimaryRegionId =
  | "north-texas"
  | "central-texas"
  | "east-texas"
  | "south-texas"
  | "west-texas"
  | "gulf-coast"
  | "panhandle";

export type TexasSubregionId =
  | "dallas-fort-worth-metroplex"
  | "north-texas-prairies"
  | "cross-timbers"
  | "texoma"
  | "austin-area"
  | "texas-hill-country"
  | "central-texas-prairies"
  | "brazos-valley"
  | "piney-woods"
  | "upper-east-texas"
  | "deep-east-texas"
  | "san-antonio-area"
  | "rio-grande-valley"
  | "south-texas-brush-country"
  | "big-bend"
  | "trans-pecos"
  | "permian-basin"
  | "houston-area"
  | "upper-gulf-coast"
  | "golden-triangle"
  | "coastal-bend"
  | "texas-panhandle"
  | "south-plains";

export type TexasMetroId =
  | "dallas-fort-worth"
  | "austin"
  | "san-antonio"
  | "houston"
  | "el-paso"
  | "amarillo"
  | "lubbock"
  | "rio-grande-valley";

export type RelocationRegionLabel =
  | "Dallas–Fort Worth & North Texas"
  | "Austin & Central Texas"
  | "San Antonio & Hill Country"
  | "Houston & Gulf Coast"
  | "South Texas & Rio Grande Valley"
  | "East Texas"
  | "West Texas & Panhandle";

/**
 * Relationship-based geography assignment for cities, counties and local
 * entities. A record gets exactly one broad primary region; boundary and
 * editorial nuance belongs in adjacency/gateway/presentation relationships.
 */
export interface TexasGeographyAssignment {
  primaryRegionId: CanonicalPrimaryRegionId;
  subregionIds: readonly TexasSubregionId[];
  gatewaySubregionIds?: readonly TexasSubregionId[];
  metroId?: TexasMetroId;
  countySlugs?: readonly Slug[];
  adjacentRegionIds?: readonly CanonicalPrimaryRegionId[];
  aliases?: readonly string[];
  travelRegionIds?: readonly TexasRegion[];
  relocationPresentationLabels?: readonly RelocationRegionLabel[];
}

export type CategorySlug = "lakes-rivers" | "major-springs" | "state-parks" | "national-parks" | "caverns" | "beaches-coast" | "historic-sites" | "road-trips" | "small-towns" | "food-bbq" | "outdoors" | "rv-parks" | "sports" | "events" | "texas-history" | "moving-to-texas" | "home-garden" | "real-estate" | "guides";
export interface Category { slug: CategorySlug; name: string; eyebrow: string; description: string; image?: ImageRef; }
export interface Author { id: string; name: string; role: string; bio: string; }
export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "list"; items: string[] }
  | { type: "image"; image: ImageRef; caption?: string }
  | { type: "shop"; collectionSlug: Slug };
export interface ArticleInternalLink { href: string; label: string; description?: string; }
export interface Article { id: string; brandId: BrandId; slug: Slug; title: string; dek: string; category: CategorySlug; region?: TexasRegion; geography?: TexasGeographyAssignment; hero: ImageRef; authorId: string; publishedAt: string; readingMinutes: number; tags: string[]; featured?: boolean; body: ArticleBlock[]; internalLinks?: ArticleInternalLink[]; relatedCollections: Slug[]; relatedDestinations: Slug[]; sourceName?: string; sourceUrl?: string; }

export interface DestinationAreaItem {
  name: string;
  description: string;
  proximity?: string;
  href?: string;
}
export type DestinationAreaItemList = [DestinationAreaItem, ...DestinationAreaItem[]];
export interface DestinationAreaGuide {
  intro: string;
  nearbyAttractions: DestinationAreaItemList;
  foodAndDrink: DestinationAreaItemList;
  lodging: DestinationAreaItemList;
  neighborhoods: DestinationAreaItemList;
  familyStops: DestinationAreaItemList;
  sideTrips: DestinationAreaItemList;
}

export type DestinationEffort = "Low" | "Low to moderate" | "Moderate" | "Moderate to high" | "High";
export type DestinationExposure = "Mostly indoors" | "Mixed indoor/outdoor" | "Mostly outdoors" | "Fully outdoors";
export type DestinationPlanningLevel = "Low" | "Moderate" | "High";
export interface DestinationAuthoritySource { label: string; url: string; scope: string; }
export interface DestinationItinerary { label: string; duration: string; steps: [string, ...string[]]; }
export interface DestinationEditorialAssessment {
  recommendedVisit: string;
  physicalEffort: DestinationEffort;
  weatherExposure: DestinationExposure;
  planningLevel: DestinationPlanningLevel;
  familyFit: string;
  firstTimeValue: string;
}
export interface DestinationAuthorityGuide {
  whyItMatters: string;
  assessment: DestinationEditorialAssessment;
  itineraries: [DestinationItinerary, DestinationItinerary, DestinationItinerary];
  sources: DestinationAuthoritySource[];
}

export interface Destination { id: string; brandId: BrandId; slug: Slug; name: string; summary: string; category: CategorySlug; region: TexasRegion; geography?: TexasGeographyAssignment; nearestTown: string; coordinates: GeoPoint; hero: ImageRef; bestSeason: string; entryNote: string; highlights: string[]; body: string[]; managingAuthority?: string; officialUrl?: string; sourceCheckedAt?: string; reservationUrl?: string; county?: string; address?: string; directions?: string; accessibilityNotes?: string; areaGuide?: DestinationAreaGuide; authorityGuide?: DestinationAuthorityGuide; featured?: boolean; }

export interface ProductVariant { id: number; title: string; price: number; image?: string | null; images?: string[]; color?: string; is_enabled?: boolean; }
export interface Product {
  id: string;
  brandId: BrandId;
  slug: Slug;
  name: string;
  maker: string;
  priceCents: number;
  currency: "USD";
  image: ImageRef;
  blurb: string;
  collectionSlugs: Slug[];
  madeInTexas: boolean;
  productUrl?: string;
  colors?: string[];
  variants?: ProductVariant[];
  category?: string | null;
  tags?: string[];
  isFeatured?: boolean;
  displayOrder?: number;
  isNew?: boolean;
  isOnSale?: boolean;
}

export interface Collection { id: string; brandId: BrandId; slug: Slug; name: string; tagline: string; description: string; image: ImageRef; }
export type GuideKind = "article" | "calculator" | "dataset" | "checklist";
export interface Guide { id: string; brandId: BrandId; slug: Slug; title: string; summary: string; kind: GuideKind; topic: string; calculatorId?: string; status: "available" | "coming-soon"; }
export interface TexasEvent { id: string; brandId: BrandId; slug: Slug; name: string; blurb: string; city: string; region: TexasRegion; geography?: TexasGeographyAssignment; startDate: string; endDate?: string; category: "music" | "food" | "rodeo" | "seasonal" | "sport" | "culture"; venue?: string; officialUrl?: string; sourceName?: string; sourceCheckedAt?: string; }
export type SearchDocumentKind = "article" | "destination" | "guide" | "calculator" | "product" | "collection" | "city" | "metro-area" | "county" | "event" | "sports-venue" | "sports-collection" | "fishing-lake" | "fish-species" | "fishing-guide" | "fishing-report" | "fishing-business";
export interface SearchDocument { id: string; brandId: BrandId; kind: SearchDocumentKind; title: string; summary: string; keywords: string[]; href: string; }
