import type {
  Article,
  Author,
  Category,
  CategorySlug,
  Collection,
  Destination,
  Guide,
  Product,
  Region,
  SearchDocument,
  Slug,
  TexasEvent,
} from "../types";
import type { BrandId } from "@/brand/types";

/**
 * Repository interfaces. Implementations are bound once in `src/data/index.ts`.
 * A Supabase-backed implementation can replace fixtures without touching a
 * single component. Every query is brand-scoped.
 */

export interface BrandScope {
  brandId: BrandId;
}

export interface ArticleQuery extends BrandScope {
  category?: CategorySlug;
  tag?: string;
  featured?: boolean;
  limit?: number;
  excludeSlug?: Slug;
}

export interface ArticleRepository {
  list(query: ArticleQuery): Promise<Article[]>;
  getBySlug(scope: BrandScope, slug: Slug): Promise<Article | null>;
}

export interface DestinationQuery extends BrandScope {
  category?: CategorySlug;
  region?: string;
  featured?: boolean;
  limit?: number;
}

export interface DestinationRepository {
  list(query: DestinationQuery): Promise<Destination[]>;
  getBySlug(scope: BrandScope, slug: Slug): Promise<Destination | null>;
}

export interface ProductRepository {
  list(query: BrandScope & { collection?: Slug; limit?: number }): Promise<Product[]>;
  getBySlug(scope: BrandScope, slug: Slug): Promise<Product | null>;
}

export interface CollectionRepository {
  list(scope: BrandScope): Promise<Collection[]>;
  getBySlug(scope: BrandScope, slug: Slug): Promise<Collection | null>;
}

export interface GuideRepository {
  list(query: BrandScope & { topic?: string }): Promise<Guide[]>;
  getBySlug(scope: BrandScope, slug: Slug): Promise<Guide | null>;
}

export interface EventRepository {
  list(query: BrandScope & { limit?: number }): Promise<TexasEvent[]>;
}

export interface TaxonomyRepository {
  categories(scope: BrandScope): Promise<Category[]>;
  regions(scope: BrandScope): Promise<Region[]>;
  authors(scope: BrandScope): Promise<Author[]>;
  getAuthor(scope: BrandScope, id: string): Promise<Author | null>;
}

export interface SearchRepository {
  documents(scope: BrandScope): Promise<SearchDocument[]>;
}

export interface PlatformRepositories {
  articles: ArticleRepository;
  destinations: DestinationRepository;
  products: ProductRepository;
  collections: CollectionRepository;
  guides: GuideRepository;
  events: EventRepository;
  taxonomy: TaxonomyRepository;
  search: SearchRepository;
}
