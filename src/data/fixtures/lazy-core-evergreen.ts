import barbecueStylesHero from "@/assets/generated/texas-barbecue-styles-unique.jpg";
import homeMaintenanceHero from "@/assets/texas-home-maintenance-photo.jpg";
import nativePlantsHero from "@/assets/generated/texas-native-plants-yard-unique.jpg";
import countiesHero from "@/assets/why-texas-has-254-counties-photo.jpg";

import type { Article } from "../types";

const texasRegionsExplainedStub: Article = {
  id: "evergreen-texas-regions-explained",
  brandId: "texasdefined",
  slug: "texas-regions-explained",
  title: "Texas Regions Explained: Hill Country, Piney Woods, Gulf Coast, Big Bend and Beyond",
  dek: "Texas changes dramatically from one horizon to the next. Here is a practical guide to the state's major travel regions, what makes each one feel different and where to start exploring.",
  category: "guides",
  hero: {
    src: "/images/explore/national-parks/big-bend-national-park.jpg",
    alt: "Chisos Mountains rising above the Chihuahuan Desert in Big Bend National Park, Texas",
    width: 1600,
    height: 1067,
    credit: "National Park Service / Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-07",
  readingMinutes: 13,
  tags: ["texas regions", "texas geography", "hill country", "piney woods", "gulf coast", "big bend", "panhandle", "south texas", "texas travel"],
  featured: true,
  body: [],
  relatedCollections: [],
  relatedDestinations: [],
};

const whyTexasHas254CountiesStub: Article = {
  id: "evergreen-why-texas-has-254-counties",
  brandId: "texasdefined",
  slug: "why-texas-has-254-counties",
  title: "Why Texas Has 254 Counties",
  dek: "Texas has more counties than any other state. The reason is written into the state's size, settlement patterns and an old practical idea: local government had to be close enough for people to reach it.",
  category: "texas-history",
  hero: {
    src: countiesHero,
    alt: "A historic red sandstone Texas county courthouse on a small-town square",
    width: 1600,
    height: 1067,
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-07",
  readingMinutes: 10,
  tags: ["texas counties", "texas history", "county seats", "texas courthouses", "local government", "texas geography"],
  featured: true,
  body: [],
  relatedCollections: [],
  relatedDestinations: [],
};

const texasNativePlantsYardStub: Article = {
  id: "evergreen-texas-native-plants-yard",
  brandId: "texasdefined",
  slug: "best-native-plants-texas-yard",
  title: "The Best Native Plants for a Texas Yard",
  dek: "A Texas yard does not have to fight Texas weather. These native flowers, grasses, shrubs and small trees can handle heat, support wildlife and make a landscape feel like it belongs here.",
  category: "home-garden",
  hero: {
    src: nativePlantsHero,
    alt: "Texas native wildflowers and grasses arranged in a drought-tolerant home landscape",
    width: 1600,
    height: 1067,
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-06",
  readingMinutes: 12,
  tags: ["texas native plants", "texas landscaping", "native plants", "texas yard", "drought tolerant plants", "pollinator garden", "texas gardening", "home and garden"],
  featured: true,
  body: [],
  relatedCollections: [],
  relatedDestinations: [],
};

const texasBarbecueStylesStub: Article = {
  id: "evergreen-texas-barbecue-styles",
  brandId: "texasdefined",
  slug: "texas-barbecue-styles-explained",
  title: "Texas Barbecue Styles Explained: Central, East, South and West Texas",
  dek: "Texas barbecue is not one style. Learn how Central Texas brisket, East Texas chopped beef, South Texas barbacoa and West Texas live-fire cooking grew from different places, people and traditions.",
  category: "food-bbq",
  hero: {
    src: barbecueStylesHero,
    alt: "Regional Texas barbecue traditions represented by smoked brisket, sausage and live-fire cooking",
    width: 1600,
    height: 1067,
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-06",
  readingMinutes: 11,
  tags: ["texas barbecue", "central texas barbecue", "east texas barbecue", "south texas barbecue", "west texas barbecue", "brisket", "barbacoa", "texas food"],
  featured: true,
  body: [],
  relatedCollections: [],
  relatedDestinations: [],
};

const texasHomeMaintenanceCalendarStub: Article = {
  id: "evergreen-texas-home-maintenance-calendar",
  brandId: "texasdefined",
  slug: "texas-home-maintenance-calendar",
  title: "The Texas Home Maintenance Calendar: What to Do Each Season",
  dek: "Texas weather can swing from freezes to triple-digit heat, hail, drought and tropical rain. A seasonal maintenance rhythm helps homeowners catch small problems before the next stretch of extreme weather finds them.",
  category: "home-garden",
  hero: {
    src: homeMaintenanceHero,
    alt: "A homeowner checking the outdoor air conditioning unit beside a brick Texas house",
    width: 1600,
    height: 1067,
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-07",
  readingMinutes: 12,
  tags: ["texas home maintenance", "home maintenance calendar", "texas homeowners", "hvac maintenance", "roof maintenance", "freeze preparation", "summer home maintenance", "home and garden"],
  featured: true,
  body: [],
  relatedCollections: [],
  relatedDestinations: [],
};

const texasHomeownerFieldManualStub: Article = {
  id: "evergreen-texas-homeowner-field-manual",
  brandId: "texasdefined",
  slug: "texas-homeowner-field-manual",
  title: "The Texas Homeowner Field Manual: Weather, Utilities, Insurance, Wildlife and the Systems That Matter",
  dek: "A practical operating manual for owning a house in Texas: storms, freezes, foundations, roofs, electricity, insurance, water, pools, pests, wildlife, school districts, emergency records and the annual maintenance rhythm that ties them together.",
  category: "home-garden",
  hero: {
    src: homeMaintenanceHero,
    alt: "A homeowner checking the outdoor air conditioning unit beside a brick Texas house",
    width: 1600,
    height: 1067,
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-22",
  readingMinutes: 19,
  tags: ["texas homeowner guide", "texas home maintenance", "texas weather", "texas insurance", "texas electricity", "texas wildlife", "texas foundation", "texas roof", "moving to texas"],
  featured: true,
  body: [],
  relatedCollections: [],
  relatedDestinations: [],
};

export const coreEvergreenArticleStubs: Article[] = [
  texasRegionsExplainedStub,
  whyTexasHas254CountiesStub,
  texasNativePlantsYardStub,
  texasBarbecueStylesStub,
  texasHomeMaintenanceCalendarStub,
  texasHomeownerFieldManualStub,
];

export async function loadCoreEvergreenArticle(brandId: string, slug: string): Promise<Article | null> {
  if (brandId !== "texasdefined") return null;

  if (slug === texasRegionsExplainedStub.slug) {
    const { texasRegionsExplainedArticle } = await import("./texas-regions-explained");
    return { ...texasRegionsExplainedArticle, hero: texasRegionsExplainedStub.hero };
  }

  if (slug === whyTexasHas254CountiesStub.slug) {
    const { whyTexasHas254CountiesArticle } = await import("./why-texas-has-254-counties");
    return { ...whyTexasHas254CountiesArticle, hero: whyTexasHas254CountiesStub.hero };
  }

  if (slug === texasNativePlantsYardStub.slug) {
    const { texasNativePlantsYardArticle } = await import("./texas-native-plants-yard");
    return { ...texasNativePlantsYardArticle, hero: texasNativePlantsYardStub.hero };
  }

  if (slug === texasBarbecueStylesStub.slug) {
    const { texasBarbecueStylesArticle } = await import("./texas-barbecue-styles");
    return { ...texasBarbecueStylesArticle, hero: texasBarbecueStylesStub.hero };
  }

  if (slug === texasHomeMaintenanceCalendarStub.slug) {
    const { texasHomeMaintenanceCalendarArticle } = await import("./texas-home-maintenance-calendar");
    return { ...texasHomeMaintenanceCalendarArticle, hero: texasHomeMaintenanceCalendarStub.hero };
  }

  if (slug === texasHomeownerFieldManualStub.slug) {
    const { texasHomeownerFieldManualArticle } = await import("./texas-homeowner-field-manual");
    return { ...texasHomeownerFieldManualArticle, hero: texasHomeownerFieldManualStub.hero };
  }

  return null;
}
