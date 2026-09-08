export type TexasBrandLocatorBrand =
  | "heb"
  | "central-market"
  | "joe-vs"
  | "mi-tienda"
  | "bucees";

export type TexasBrandLocatorLocation = {
  id: string;
  brand: TexasBrandLocatorBrand;
  brandLabel: string;
  name: string;
  address: string;
  city?: string;
  postalCode?: string;
  distanceMiles?: number;
  latitude?: number;
  longitude?: number;
  directionsUrl: string;
  sourceLabel: string;
  sourceUrl: string;
};

export type TexasBrandLocatorResponse = {
  query: string;
  matchedAddress: string | null;
  results: TexasBrandLocatorLocation[];
  notices: string[];
  fallbackLinks: { brand: TexasBrandLocatorBrand; label: string; url: string }[];
};
