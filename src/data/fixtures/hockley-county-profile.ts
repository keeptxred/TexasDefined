import type { Article } from "../types";
import { hockleyCountyLevellandYellowHouseCanyonOilCottonSouthPlainsTexasArticle as baseArticle } from "./hockley-county-levelland-yellow-house-canyon-oil-cotton-south-plains-texas";

export const hockleyCountyProfileArticle: Article = {
  ...baseArticle,
  hero: {
    ...baseArticle.hero,
    credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons",
  },
};
