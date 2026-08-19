export type PaintedChurchImageSource = {
  label: string;
  url: string;
  tier: "primary-archive" | "open-media" | "licensed-community" | "stock-fallback";
  priority: number;
  bestFor: string;
  rightsRule: string;
};

export const paintedChurchImageSources: PaintedChurchImageSource[] = [
  {
    label: "Wikimedia Commons",
    url: "https://commons.wikimedia.org/",
    tier: "open-media",
    priority: 1,
    bestFor: "Exact-subject exterior and interior photographs of named Painted Churches",
    rightsRule: "Use only an individual file whose page identifies the subject, creator and reusable license. Preserve attribution and license link.",
  },
  {
    label: "The Portal to Texas History — Photographing Texas",
    url: "https://texashistory.unt.edu/search/?q=%22Painted+Churches%22",
    tier: "primary-archive",
    priority: 2,
    bestFor: "Exact Painted Church interiors and architectural details, including Praha, Ammannsville, Dubina and other Schulenburg-area churches",
    rightsRule: "Use the collection as a discovery source, then check the individual item's Licensing & Permissions / Responsibilities of Use information before republishing. A Portal record being publicly viewable does not itself establish free reuse.",
  },
  {
    label: "The Portal to Texas History — general church search",
    url: "https://texashistory.unt.edu/search/?q=texas+churches",
    tier: "primary-archive",
    priority: 3,
    bestFor: "Historic church interiors, archival views, murals, parish photographs and local collections beyond the Painted Churches keyword set",
    rightsRule: "Check the item-level rights/reproduction statement before publishing. Do not assume every Portal item is unrestricted.",
  },
  {
    label: "Library of Congress / HABS / Carol M. Highsmith Archive",
    url: "https://www.loc.gov/photos?fa=language%3Aenglish%7Clocation%3Atexas",
    tier: "primary-archive",
    priority: 4,
    bestFor: "HABS architectural documentation and exact Texas church photographs, including High Hill imagery in the Carol M. Highsmith Archive",
    rightsRule: "Check each item record. Prefer records with a Rights Advisory of 'No known restrictions on publication' or clearly unrestricted government-produced HABS/HAER/HALS material; preserve the LOC credit line and item link.",
  },
  {
    label: "PICRYL / GetArchive",
    url: "https://www.picryl.com/",
    tier: "primary-archive",
    priority: 5,
    bestFor: "Search and download interface for public-domain archival material, often mirroring government collections",
    rightsRule: "Use only records explicitly marked public domain/unrestricted and preserve the original archive/source attribution where available.",
  },
  {
    label: "Flickr Creative Commons",
    url: "https://www.flickr.com/search/?text=texas%20painted%20churches&license=4%2C5%2C6%2C9%2C10",
    tier: "licensed-community",
    priority: 6,
    bestFor: "Exact-subject modern photographs when Commons and archives do not have a usable file",
    rightsRule: "Verify the current license on the individual photo page and satisfy attribution/share-alike requirements. Do not rely on search-filter state alone.",
  },
  {
    label: "Unsplash",
    url: "https://unsplash.com/s/photos/texas-church",
    tier: "stock-fallback",
    priority: 7,
    bestFor: "Generic Texas church imagery only when exact-subject photography is unavailable and the image is clearly labeled as illustrative",
    rightsRule: "Use under the current Unsplash license and do not imply a generic church photograph depicts the named church.",
  },
  {
    label: "Pexels",
    url: "https://www.pexels.com/search/texas%20church/",
    tier: "stock-fallback",
    priority: 8,
    bestFor: "Generic illustrative church imagery",
    rightsRule: "Use under the current Pexels license; never substitute a generic church image for a specific Painted Church without an explicit illustrative caption.",
  },
  {
    label: "Pixabay",
    url: "https://pixabay.com/images/search/texas%20church/",
    tier: "stock-fallback",
    priority: 9,
    bestFor: "Generic illustrative church imagery",
    rightsRule: "Check the item and current Pixabay Content License; do not present generic stock as an exact-subject photograph.",
  },
  {
    label: "Freely Photos",
    url: "https://freelyphotos.com/",
    tier: "stock-fallback",
    priority: 10,
    bestFor: "Church-focused generic illustrative imagery",
    rightsRule: "Confirm the specific image license/terms at time of use and label generic imagery as illustrative.",
  },
  {
    label: "Burst by Shopify",
    url: "https://www.shopify.com/stock-photos",
    tier: "stock-fallback",
    priority: 11,
    bestFor: "Generic stock fallback",
    rightsRule: "Confirm current site terms for the selected image and avoid implying exact-subject coverage.",
  },
  {
    label: "StockSnap",
    url: "https://stocksnap.io/",
    tier: "stock-fallback",
    priority: 12,
    bestFor: "Generic stock fallback",
    rightsRule: "Confirm the selected image's current license and label it as illustrative when not church-specific.",
  },
  {
    label: "Freerange Stock",
    url: "https://freerangestock.com/",
    tier: "stock-fallback",
    priority: 13,
    bestFor: "Generic stock fallback",
    rightsRule: "Confirm item-level terms before use; never let generic stock stand in for a named church without disclosure.",
  },
];

export const paintedChurchImagePolicy = {
  exactSubjectFirst: true,
  itemLevelRightsRequired: true,
  preserveAttribution: true,
  preserveLicenseLink: true,
  genericFallbackMustBeLabeledIllustrative: true,
  prohibitSponsoredOrPremiumResults: true,
  preferredOrder: paintedChurchImageSources.map((source) => source.label),
};
