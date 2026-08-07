import barbecueStylesHero from "@/assets/generated/texas-barbecue-styles-unique.jpg";
import homeMaintenanceHero from "@/assets/generated/texas-home-maintenance-calendar-unique.jpg";
import nativePlantsHero from "@/assets/generated/texas-native-plants-yard-unique.jpg";
import regionsHero from "@/assets/generated/texas-regions-explained-unique.jpg";
import countiesHero from "@/assets/generated/why-texas-has-254-counties-unique.jpg";

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
  hero: { ...countiesBase.hero, src: countiesHero },
};

export const texasRegionsExplainedArticle = {
  ...regionsBase,
  hero: { ...regionsBase.hero, src: regionsHero },
};

export const texasHomeMaintenanceCalendarArticle = {
  ...maintenanceBase,
  hero: { ...maintenanceBase.hero, src: homeMaintenanceHero },
};
