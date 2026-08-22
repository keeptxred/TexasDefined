import barbecueStylesHero from "@/assets/generated/texas-barbecue-styles-unique.jpg";
import homeMaintenanceHero from "@/assets/texas-home-maintenance-photo.jpg";
import nativePlantsHero from "@/assets/generated/texas-native-plants-yard-unique.jpg";
import countiesHero from "@/assets/why-texas-has-254-counties-photo.jpg";

import { texasBarbecueStylesArticle as barbecueBase } from "./texas-barbecue-styles";
import { texasHomeMaintenanceCalendarArticle as maintenanceBase } from "./texas-home-maintenance-calendar";
import { texasNativePlantsYardArticle as nativePlantsBase } from "./texas-native-plants-yard";
import { texasRegionsExplainedArticle as regionsBase } from "./texas-regions-explained";
import { whyTexasHas254CountiesArticle as countiesBase } from "./why-texas-has-254-counties";

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
