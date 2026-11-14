import type { Article } from "../types";

/**
 * Rights-reviewed, subject-specific Commons photos shared by full article fixtures
 * and lightweight category listings. Source and license links are published through
 * heritage-photo-license-links.ts. Do not reuse these photos across article slugs.
 */
export const renterHero: Article["hero"] = {
  src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/GulftonApartmentComplexes.JPG?width=1280",
  alt: "Westward Square apartment buildings in the Gulfton neighborhood of Houston, Texas",
  width: 1280,
  height: 960,
  credit: "WhisperToMe · Wikimedia Commons · Public Domain",
};

export const houstonCommuterHero: Article["hero"] = {
  src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/2025-09-14_16_24_08_View_north_along_Texas_State_Highway_99_(Grand_Parkway)_just_north_of_its_western_interchange_with_Interstate_10_(Katy_Freeway)_in_Houston,_Harris_County,_Texas.jpg?width=1280",
  alt: "Grand Parkway near Interstate 10 west of Houston, a major Katy-area commuting corridor",
  width: 1280,
  height: 960,
  credit: "Famartin · Wikimedia Commons · CC BY-SA 4.0 (cropped for display)",
};

export const dallasCommuterHero: Article["hero"] = {
  src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/A_DART_(Dallas_Area_Rapid_Transit)_light-rail_train_leaves_the_Akard_Station_in_downtown_Dallas,_Texas.jpg?width=1280",
  alt: "DART light rail departing Akard Station in downtown Dallas, Texas",
  width: 1280,
  height: 896,
  credit: "Carol M. Highsmith / Library of Congress · Wikimedia Commons · Public Domain",
};

export const propertyTaxHero: Article["hero"] = {
  src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Webb_County,_TX,_Appraisal_District_Office_IMG_2011.JPG?width=1280",
  alt: "Webb County Appraisal District office in Laredo, Texas",
  width: 1280,
  height: 960,
  credit: "Billy Hathorn · Wikimedia Commons · CC BY-SA 3.0 (cropped for display)",
};

export const corporateRelocationHero: Article["hero"] = {
  src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/OneCongressPlazaAustinTX.JPG?width=1280",
  alt: "One Congress Plaza office tower in downtown Austin, Texas",
  width: 1280,
  height: 1707,
  credit: "WhisperToMe · Wikimedia Commons · Public Domain",
};

export const employeeRelocationHero: Article["hero"] = {
  src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Desk-office-workspace-coworking_(23699033283).jpg?width=1280",
  alt: "Employee working at a desk in a shared office workspace",
  width: 1280,
  height: 853,
  credit: "Pixel.la / Startup Stock Photos · Wikimedia Commons · CC0 1.0",
};
