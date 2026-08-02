/**
 * Brand contracts. Nothing here is TexasDefined-specific: a second brand
 * (KeepTXRed) supplies its own object of the same shape.
 */

export type BrandId = "texasdefined" | "keeptxred";

export interface BrandNavItem {
  label: string;
  to: string;
  /** Optional param map for dynamic routes. */
  params?: Record<string, string>;
  description?: string;
  /** Optional thumbnail used by mega-menu panels. Brand supplies the asset. */
  image?: { src: string; alt: string };
  children?: BrandNavItem[];
}


export interface BrandFooterColumn {
  title: string;
  items: BrandNavItem[];
}

export interface BrandFeatureFlags {
  shop: boolean;
  events: boolean;
  guides: boolean;
  realEstate: boolean;
  newsletter: boolean;
  search: boolean;
  accounts: boolean;
}

export interface BrandIdentity {
  id: BrandId;
  name: string;
  wordmark: string;
  monogram: string;
  tagline: string;
  domain: string;
  locale: string;
  social: { label: string; href: string }[];
}

export interface BrandSeo {
  titleTemplate: string;
  defaultTitle: string;
  defaultDescription: string;
  twitterSite?: string;
  organizationType: string;
}

/** Every user-visible string used by shared components. */
export interface BrandCopy {
  newsletterEyebrow: string;
  newsletterHeading: string;
  newsletterBody: string;
  newsletterCta: string;
  newsletterPlaceholder: string;
  newsletterSuccess: string;
  readMore: string;
  viewAll: string;
  searchPlaceholder: string;
  searchEmpty: string;
  emptyState: string;
  comingSoon: string;
  comingSoonBody: string;
  shopCta: string;
  shopTheStoryHeading: string;
  relatedHeading: string;
  footerNote: string;
  skipToContent: string;
  menu: string;
  close: string;
}

export interface BrandConfig {
  identity: BrandIdentity;
  seo: BrandSeo;
  copy: BrandCopy;
  features: BrandFeatureFlags;
  nav: BrandNavItem[];
  footer: BrandFooterColumn[];
  legal: BrandNavItem[];
}
