import type { ImageRef } from "@/data/types";

type HeroOverride = readonly [src: string, width: number, height: number];
const wm = "https://commons.wikimedia.org/wiki/Special:Redirect/file/";
const overrides: Readonly<Record<string, HeroOverride>> = {
  "ima-hogg-texas-legacy": [`${wm}BayouBendHome.JPG?width=1600`, 1600, 1200],
  "camping-in-texas-with-your-dog": [`${wm}Camping_with_dog_alone_under_the_sky_in_the_tent_(3)_23.jpg?width=1600`, 1600, 1200],
  "horses-on-the-beach-corpus-christi": ["https://tile.loc.gov/image-services/iiif/service%3Apnp%3Ahighsm%3A29200%3A29278/full/pct%3A50/0/default.jpg", 2048, 1366],
  "texas-high-school-football-scores-schedules": [`${wm}Football_Stadium_Dumas_Texas.jpg?width=1600`, 1600, 1262],
  "best-lighthouses-to-visit-in-texas": [`${wm}Port_Isabel,_Texas_Lighthouse.jpg?width=1600`, 1600, 1200],
  "texas-medal-of-honor-heroes": [`${wm}Audie_Murphy_American_Cotton_Museum_July_2015_40_(shadow_box_with_Audie_Murphy's_medals_and_decorations).jpg?width=1600`, 1600, 1067],
  "texas-recent-wars-military-history": [`${wm}Dyess_B-1s_deploy_to_Andersen,_take_over_Continuous_Bomber_Presence_operations_170206-F-LP948-045.jpg?width=1600`, 1600, 841],
  "texas-cold-war-military-history": [`${wm}Yb-52-b-36-carswell.jpg?width=1600`, 1600, 891],
  "texas-red-river-war-guide": [`${wm}Palo_Duro_and_Caprock_Canyons,_TX.png?width=1400`, 1400, 939],
  "republic-of-texas-navy-history": [`${wm}Edwin_Ware_Moore_photo_IMG_0572.JPG?width=1400`, 1400, 1765],
  "republic-of-texas-government-trail": [`${wm}Texas_Constitution_1836.png?width=1400`, 1400, 1990],
  "brazoria-plantations-slavery-emancipation-history": [`${wm}Varner-Hogg_Plantation_-_West_Columbia,_Texas_15.jpg?width=1600`, 1600, 1200],
  "texas-frontier-forts-road-trip": [`${wm}Fort_Davis_National_Historic_Site_P9102744.jpg?width=1600`, 1600, 1197],
  "collin-county-mckinney-prairie-growth-texas": [`${wm}McKinney_April_2017_001_(Historic_Collin_County_Courthouse).jpg?width=1600`, 1600, 1067],
};

export function articleDiscoverHero(articleSlug: string, currentHero: ImageRef): ImageRef {
  const override = overrides[articleSlug];
  return override ? { ...currentHero, src: override[0], width: override[1], height: override[2] } : currentHero;
}
