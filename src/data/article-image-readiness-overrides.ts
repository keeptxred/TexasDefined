import type { Article, ImageRef } from "./types";

/**
 * Production image-readiness overrides for published editorial records whose
 * original hero is below Google's 1200px large-image threshold, is a known
 * placeholder, or no longer reliably fetches. These are rights-safe,
 * representative images with attribution retained in the record so rendered
 * heroes, social previews and ImageObject metadata stay in sync.
 *
 * Keep this as a delivery-level correction: source fixtures remain historical,
 * while every published surface receives the same governed hero override.
 */
const ARTICLE_IMAGE_READINESS_OVERRIDES: Readonly<Record<string, ImageRef>> = {
  "ima-hogg-texas-legacy": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/BayouBendHome.JPG?width=1600",
    alt: "Bayou Bend, Ima Hogg's Houston home and a major part of her public museum legacy",
    width: 1600,
    height: 1200,
    credit: "Postoak · Public domain · Wikimedia Commons",
  },
  "camping-in-texas-with-your-dog": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Camping_with_dog_alone_under_the_sky_in_the_tent_%283%29_12.jpg?width=1600",
    alt: "A dog resting beside a tent at a campsite, illustrating overnight camping with a pet",
    width: 1600,
    height: 1200,
    credit: "nikhil more · CC BY-SA 4.0 · Wikimedia Commons",
  },
  "texas-high-school-football-scores-schedules": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/McKinney_ISD_Stadium_-_july_2026.jpg?width=1600",
    alt: "McKinney ISD Stadium in McKinney, Texas, photographed during the 2026 high-school football season",
    width: 1600,
    height: 900,
    credit: "Ranch9613 · CC0 1.0 · Wikimedia Commons",
  },
  "best-lighthouses-to-visit-in-texas": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Port_Isabel%2C_Texas_Lighthouse.jpg?width=1600",
    alt: "Port Isabel Lighthouse in Port Isabel, Texas",
    width: 1600,
    height: 1200,
    credit: "Billy D. Wagner · CC BY-SA 4.0 · Wikimedia Commons",
  },
  "texas-medal-of-honor-heroes": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/U.S._Army_Maj._Audie_L._Murphy_%2819783145325%29.jpg?width=1600",
    alt: "U.S. Army image commemorating Texas-born Medal of Honor recipient Audie Murphy at Arlington National Cemetery",
    width: 1600,
    height: 1068,
    credit: "Rachel Larue / U.S. Army · Public domain · Wikimedia Commons",
  },
  "texas-red-river-war-guide": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Quanah_Parker%2C_a_Kwahadi_Comanche_chief%2C_full-length%2C_standing_in_front_of_tent_-_NARA_-_530911_restored.jpg?width=1600",
    alt: "Quanah Parker, a Kwahadi Comanche leader, standing in front of a tipi",
    width: 1600,
    height: 2942,
    credit: "U.S. National Archives · Public domain · Wikimedia Commons",
  },
  "republic-of-texas-government-trail": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Texas-declaration-of-independence.jpg?width=1600",
    alt: "Texas Declaration of Independence, adopted as the Republic of Texas government took shape in 1836",
    width: 1600,
    height: 1935,
    credit: "Republic of Texas historical document · Public domain · Wikimedia Commons",
  },
  "brazoria-plantations-slavery-emancipation-history": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Varner-Hogg_Plantation_-_West_Columbia%2C_Texas_16.jpg?width=1600",
    alt: "Varner-Hogg Plantation State Historic Site in West Columbia, Texas",
    width: 1600,
    height: 652,
    credit: "Robert Gray · CC BY 2.0 · Wikimedia Commons",
  },
  "texas-frontier-forts-road-trip": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Fort_Davis_National_Historic_Site_P9102744.jpg?width=1600",
    alt: "Fort Davis National Historic Site, one of Texas's best-preserved frontier military posts",
    width: 1600,
    height: 1197,
    credit: "National Park Service · Public domain · Wikimedia Commons",
  },
  "collin-county-mckinney-prairie-growth-texas": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Collin_County_Courthouse_%281927%29%2C_McKinney%2C_Texas_%2828181193439%29.jpg?width=1600",
    alt: "Historic 1927 Collin County Courthouse in McKinney, Texas",
    width: 1600,
    height: 1067,
    credit: "TexasExplorer98 / Nicolas Henderson · CC BY 2.0 · Wikimedia Commons",
  },
  "crockett-county-ozona-pecos-edwards-plateau-ranching-texas": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Crockett_County_Courthouse_November_2020.jpg?width=1600",
    alt: "Crockett County Courthouse in Ozona, Texas",
    width: 1600,
    height: 1099,
    credit: "Wikimedia Commons · licensed reusable media",
  },
  "dickens-county-dickens-spur-ranch-caprock-rolling-plains-texas": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Texas_Caprock%2C_around_Dickens_-_Flickr_-_brykmantra.jpg?width=1600",
    alt: "Caprock landscape around Dickens, Texas, representing Dickens County's escarpment country",
    width: 1600,
    height: 1063,
    credit: "brykmantra · Wikimedia Commons",
  },
};

export function applyArticleImageReadinessOverride(article: Article): Article {
  const hero = ARTICLE_IMAGE_READINESS_OVERRIDES[article.slug];
  return hero ? { ...article, hero } : article;
}

export const ARTICLE_IMAGE_READINESS_OVERRIDE_SLUGS = Object.freeze(
  Object.keys(ARTICLE_IMAGE_READINESS_OVERRIDES),
);
