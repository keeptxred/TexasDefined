import type { ImageRef } from "@/data/types";

const articleDiscoverHeroOverrides: Readonly<Record<string, ImageRef>> = {
  "ima-hogg-texas-legacy": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/BayouBendHome.JPG?width=1600",
    alt: "Bayou Bend, Ima Hogg's Houston home and the center of her decorative-arts legacy",
    width: 1600,
    height: 1200,
    credit: "Postoak · Public domain · Wikimedia Commons",
  },
  "camping-in-texas-with-your-dog": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Camping_with_dog_alone_under_the_sky_in_the_tent_(3)_23.jpg?width=1600",
    alt: "Dog beside a tent at a campsite, illustrating practical camping-with-dogs planning",
    width: 1600,
    height: 1200,
    credit: "nikhil more · CC BY-SA 4.0 · Wikimedia Commons",
  },
  "horses-on-the-beach-corpus-christi": {
    src: "https://tile.loc.gov/image-services/iiif/service%3Apnp%3Ahighsm%3A29200%3A29278/full/pct%3A50/0/default.jpg",
    alt: "Riders from Horses on the Beach traveling along the Padre Island shoreline near Corpus Christi",
    width: 2048,
    height: 1366,
    credit: "Carol M. Highsmith · Library of Congress · No known restrictions on publication",
  },
  "texas-high-school-football-scores-schedules": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Football_Stadium_Dumas_Texas.jpg?width=1600",
    alt: "High school football stadium in Dumas, Texas, illustrating Friday-night football across the state",
    width: 1600,
    height: 1262,
    credit: "Christian M. Mericle · CC BY 3.0 · Wikimedia Commons",
  },
  "best-lighthouses-to-visit-in-texas": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Port_Isabel,_Texas_Lighthouse.jpg?width=1600",
    alt: "Port Isabel Lighthouse in South Texas, one of the state's publicly accessible historic lighthouse sites",
    width: 1600,
    height: 1200,
    credit: "Billy D. Wagner · CC BY-SA 4.0 · Wikimedia Commons",
  },
  "texas-medal-of-honor-heroes": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Audie_Murphy_American_Cotton_Museum_July_2015_40_(shadow_box_with_Audie_Murphy's_medals_and_decorations).jpg?width=1600",
    alt: "Audie Murphy's military medals and decorations displayed in Greenville, Texas",
    width: 1600,
    height: 1067,
    credit: "Billy Hathorn · Wikimedia Commons",
  },
  "texas-recent-wars-military-history": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Dyess_B-1s_deploy_to_Andersen,_take_over_Continuous_Bomber_Presence_operations_170206-F-LP948-045.jpg?width=1600",
    alt: "B-1B Lancer aircraft from Dyess Air Force Base during a modern bomber deployment",
    width: 1600,
    height: 841,
    credit: "U.S. Air Force · Public domain · Wikimedia Commons",
  },
  "texas-cold-war-military-history": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Yb-52-b-36-carswell.jpg?width=1600",
    alt: "YB-52 prototype and B-36 bomber at Carswell Air Force Base in Fort Worth during the Cold War",
    width: 1600,
    height: 891,
    credit: "U.S. Air Force Historical Research Agency · Public domain · Wikimedia Commons",
  },
  "texas-red-river-war-guide": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Palo_Duro_and_Caprock_Canyons,_TX.png?width=1400",
    alt: "Palo Duro and Caprock Canyons in the Texas Panhandle, landscape central to the Red River War",
    width: 1400,
    height: 939,
    credit: "NASA / ISS Crew Earth Observations · Public domain · Wikimedia Commons",
  },
  "republic-of-texas-navy-history": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Edwin_Ware_Moore_photo_IMG_0572.JPG?width=1400",
    alt: "Portrait of Edwin Ward Moore, commodore of the second Texas Navy",
    width: 1400,
    height: 1765,
    credit: "Billy Hathorn · CC BY-SA · Wikimedia Commons",
  },
  "republic-of-texas-government-trail": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Texas_Constitution_1836.png?width=1400",
    alt: "First page of the 1836 Constitution of the Republic of Texas",
    width: 1400,
    height: 1990,
    credit: "H. S. Kimble · 1836 · Public domain · Wikimedia Commons",
  },
  "brazoria-plantations-slavery-emancipation-history": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Varner-Hogg_Plantation_-_West_Columbia,_Texas_15.jpg?width=1600",
    alt: "Varner-Hogg Plantation historic site in West Columbia, a preserved Brazoria County plantation landscape",
    width: 1600,
    height: 1200,
    credit: "Robert Gray · CC BY 2.0 · Wikimedia Commons",
  },
  "texas-frontier-forts-road-trip": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Fort_Davis_National_Historic_Site_P9102744.jpg?width=1600",
    alt: "Fort Davis National Historic Site in West Texas, one of the frontier posts on the Texas forts road-trip route",
    width: 1600,
    height: 1197,
    credit: "National Park Service · Public domain · Wikimedia Commons",
  },
};

export function articleDiscoverHero(articleSlug: string, currentHero: ImageRef): ImageRef {
  return articleDiscoverHeroOverrides[articleSlug] ?? currentHero;
}

export const ARTICLE_DISCOVER_HERO_OVERRIDE_SLUGS = Object.freeze(Object.keys(articleDiscoverHeroOverrides));
