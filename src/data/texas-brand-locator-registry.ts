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
  whataburger: {
    label: "Whataburger",
    provider: "official-directory",
    queryPattern: /\bwhataburger\b/i,
    officialLocatorUrl: "https://locations.whataburger.com/",
    fallbackLabel: "Open Whataburger's official location finder",
    storeNamePattern: null,
  },
  academy: {
    label: "Academy Sports + Outdoors",
    provider: "verified-registry",
    queryPattern: /\bacademy(?:\s+sports(?:\s*\+\s*outdoors|\s+and\s+outdoors)?)?\b/i,
    officialLocatorUrl: "https://www.academy.com/storelocator/texas",
    fallbackLabel: "Open Academy Sports + Outdoors' official Texas store directory",
    storeNamePattern: null,
  },
  shipley: {
    label: "Shipley Do-Nuts",
    provider: "official-directory",
    queryPattern: /\bshipley(?:\s+do[- ]?nuts?|\s+donuts?)?\b/i,
    officialLocatorUrl: "https://shipleydonuts.com/locations",
    fallbackLabel: "Open Shipley Do-Nuts' official location finder",
    storeNamePattern: null,
  },
  "kolache-factory": {
    label: "Kolache Factory",
    provider: "official-directory",
    queryPattern: /\bkolache\s+factory\b/i,
    officialLocatorUrl: "https://locations.kolachefactory.com/tx",
    fallbackLabel: "Open Kolache Factory's official Texas locations",
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

export type TexasBrandLocatorOfficialDirectoryBrand = {
  [Brand in TexasBrandLocatorBrand]: (typeof TEXAS_BRAND_LOCATOR_REGISTRY)[Brand]["provider"] extends "official-directory"
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
export const TEXAS_BRAND_LOCATOR_OFFICIAL_DIRECTORY_BRANDS = TEXAS_BRAND_LOCATOR_BRANDS.filter(
  (brand): brand is TexasBrandLocatorOfficialDirectoryBrand => TEXAS_BRAND_LOCATOR_REGISTRY[brand].provider === "official-directory",
);

export function isTexasBrandLocatorBrand(value: string): value is TexasBrandLocatorBrand {
  return Object.prototype.hasOwnProperty.call(TEXAS_BRAND_LOCATOR_REGISTRY, value);
}

export function isTexasBrandLocatorVerifiedRegistryBrand(
  brand: TexasBrandLocatorBrand,
): brand is TexasBrandLocatorVerifiedRegistryBrand {
  return TEXAS_BRAND_LOCATOR_REGISTRY[brand].provider === "verified-registry";
}

export function isTexasBrandLocatorOfficialDirectoryBrand(
  brand: TexasBrandLocatorBrand,
): brand is TexasBrandLocatorOfficialDirectoryBrand {
  return TEXAS_BRAND_LOCATOR_REGISTRY[brand].provider === "official-directory";
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
