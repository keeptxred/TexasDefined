export const TEXAS_BRAND_LOCATOR_REGISTRY = {
  heb: {
    label: "H-E-B",
    provider: "heb-live",
    queryPattern: /\b(?:h\s*[-.]?\s*e\s*[-.]?\s*b|heb)\b/i,
    officialLocatorUrl: "https://www.heb.com/store-locations",
    fallbackLabel: "Open H-E-B's official store locator",
    storeNamePattern: null,
  },
  "central-market": {
    label: "Central Market",
    provider: "heb-live",
    queryPattern: /\bcentral\s+market\b/i,
    officialLocatorUrl: "https://www.heb.com/store-locations",
    fallbackLabel: "Open H-E-B's official store locator for Central Market",
    storeNamePattern: /\bcentral\s+market\b/i,
  },
  "joe-vs": {
    label: "Joe V's Smart Shop",
    provider: "heb-live",
    queryPattern: /\bjoe\s+v(?:['’]s|s)?(?:\s+smart\s+shop)?\b/i,
    officialLocatorUrl: "https://www.heb.com/store-locations",
    fallbackLabel: "Open H-E-B's official store locator for Joe V's Smart Shop",
    storeNamePattern: /\bjoe\s+v(?:['’]s|s)?(?:\s+smart\s+shop)?\b/i,
  },
  "mi-tienda": {
    label: "Mi Tienda",
    provider: "heb-live",
    queryPattern: /\bmi\s+tienda\b/i,
    officialLocatorUrl: "https://www.heb.com/store-locations",
    fallbackLabel: "Open H-E-B's official store locator for Mi Tienda",
    storeNamePattern: /\bmi\s+tienda\b/i,
  },
  bucees: {
    label: "Buc-ee's",
    provider: "verified-registry",
    queryPattern: /\bbuc[-’']?ee['’]?s\b/i,
    officialLocatorUrl: "https://buc-ees.com/locations/",
    fallbackLabel: "Open Buc-ee's official locations",
    storeNamePattern: null,
  },
} as const;

export type TexasBrandLocatorBrand = keyof typeof TEXAS_BRAND_LOCATOR_REGISTRY;
export type TexasBrandLocatorProvider = (typeof TEXAS_BRAND_LOCATOR_REGISTRY)[TexasBrandLocatorBrand]["provider"];

export type TexasBrandLocatorHebFormatBrand = {
  [Brand in TexasBrandLocatorBrand]: (typeof TEXAS_BRAND_LOCATOR_REGISTRY)[Brand]["storeNamePattern"] extends RegExp
    ? Brand
    : never;
}[TexasBrandLocatorBrand];

export type TexasBrandLocatorVerifiedRegistryBrand = {
  [Brand in TexasBrandLocatorBrand]: (typeof TEXAS_BRAND_LOCATOR_REGISTRY)[Brand]["provider"] extends "verified-registry"
    ? Brand
    : never;
}[TexasBrandLocatorBrand];

export const TEXAS_BRAND_LOCATOR_BRANDS = Object.keys(TEXAS_BRAND_LOCATOR_REGISTRY) as TexasBrandLocatorBrand[];
export const DEFAULT_TEXAS_BRAND_LOCATOR_BRANDS = ["heb", "bucees"] as const satisfies readonly TexasBrandLocatorBrand[];
export const TEXAS_BRAND_LOCATOR_HEB_FORMAT_BRANDS = TEXAS_BRAND_LOCATOR_BRANDS.filter(
  (brand): brand is TexasBrandLocatorHebFormatBrand => TEXAS_BRAND_LOCATOR_REGISTRY[brand].storeNamePattern instanceof RegExp,
);
export const TEXAS_BRAND_LOCATOR_VERIFIED_REGISTRY_BRANDS = TEXAS_BRAND_LOCATOR_BRANDS.filter(
  (brand): brand is TexasBrandLocatorVerifiedRegistryBrand => TEXAS_BRAND_LOCATOR_REGISTRY[brand].provider === "verified-registry",
);

export function isTexasBrandLocatorBrand(value: string): value is TexasBrandLocatorBrand {
  return Object.prototype.hasOwnProperty.call(TEXAS_BRAND_LOCATOR_REGISTRY, value);
}

export function isTexasBrandLocatorVerifiedRegistryBrand(
  brand: TexasBrandLocatorBrand,
): brand is TexasBrandLocatorVerifiedRegistryBrand {
  return TEXAS_BRAND_LOCATOR_REGISTRY[brand].provider === "verified-registry";
}

export function texasBrandLocatorLabel(brand: TexasBrandLocatorBrand) {
  return TEXAS_BRAND_LOCATOR_REGISTRY[brand].label;
}

export function texasBrandLocatorProvider(brand: TexasBrandLocatorBrand) {
  return TEXAS_BRAND_LOCATOR_REGISTRY[brand].provider;
}

export function texasBrandLocatorQueryPattern(brand: TexasBrandLocatorBrand) {
  return TEXAS_BRAND_LOCATOR_REGISTRY[brand].queryPattern;
}

export function texasBrandLocatorStoreNamePattern(brand: TexasBrandLocatorBrand): RegExp | null {
  return TEXAS_BRAND_LOCATOR_REGISTRY[brand].storeNamePattern;
}

export function texasBrandLocatorOfficialUrl(brand: TexasBrandLocatorBrand) {
  return TEXAS_BRAND_LOCATOR_REGISTRY[brand].officialLocatorUrl;
}

export function texasBrandLocatorFallbackLabel(brand: TexasBrandLocatorBrand) {
  return TEXAS_BRAND_LOCATOR_REGISTRY[brand].fallbackLabel;
}
