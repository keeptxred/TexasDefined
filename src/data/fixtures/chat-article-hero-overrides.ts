import barbecueStylesHero from "@/assets/generated/texas-barbecue-styles-unique.jpg";
import homeMaintenanceHero from "@/assets/texas-home-maintenance-photo.jpg";
import nativePlantsHero from "@/assets/generated/texas-native-plants-yard-unique.jpg";
import countiesHero from "@/assets/why-texas-has-254-counties-photo.jpg";

import { texasBarbecueStylesArticle as barbecueBase } from "./texas-barbecue-styles";
import { texasHomeMaintenanceCalendarArticle as maintenanceBase } from "./texas-home-maintenance-calendar";
import { texasNativePlantsYardArticle as nativePlantsBase } from "./texas-native-plants-yard";
import { texasRegionsExplainedArticle as regionsBase } from "./texas-regions-explained";
import { whyTexasHas254CountiesArticle as countiesBase } from "./why-texas-has-254-counties";
import { sabineCountyHemphillToledoBendSabineRiverPineyWoodsArticle as sabinePineyWoodsBase } from "./sabine-county-hemphill-toledo-bend-sabine-river-piney-woods-texas";

export const texasBarbecueStylesArticle = {
  ...barbecueBase,
  hero: { ...barbecueBase.hero, src: barbecueStylesHero },
};

export const texasNativePlantsYardArticle = {
  ...nativePlantsBase,
  hero: { ...nativePlantsBase.hero, src: nativePlantsHero },
};

export const whyTexasHas254CountiesArticle = {
  ...countiesBase,
  hero: { ...countiesBase.hero, src: countiesHero, alt: "A historic red sandstone Texas county courthouse on a small-town square" },
};

export const texasRegionsExplainedArticle = {
  ...regionsBase,
  hero: {
    ...regionsBase.hero,
    src: "/images/explore/national-parks/big-bend-national-park.jpg",
    alt: "Chisos Mountains rising above the Chihuahuan Desert in Big Bend National Park, Texas",
    width: 1600,
    height: 1067,
    credit: "National Park Service / Wikimedia Commons",
  },
};

export const texasHomeMaintenanceCalendarArticle = {
  ...maintenanceBase,
  hero: { ...maintenanceBase.hero, src: homeMaintenanceHero, alt: "A homeowner checking the outdoor air conditioning unit beside a brick Texas house" },
};

export const sabineCountyHemphillToledoBendSabineRiverPineyWoodsArticle = {
  ...sabinePineyWoodsBase,
  hero: {
    ...sabinePineyWoodsBase.hero,
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Sabine_National_Forest,_Toledo_Bend_Reservoir,_Texas.jpg?width=1600",
    alt: "Toledo Bend Reservoir inlet in the Indian Mounds Wilderness of Sabine National Forest, Sabine County, Texas",
    width: 1800,
    height: 1200,
    credit: "William L. Farr · Wikimedia Commons · CC BY 4.0",
  },
};
