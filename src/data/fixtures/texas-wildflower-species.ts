import type { Article } from "../types";
import { WILDFLOWER_AUTHORITY_DEPTH } from "./texas-wildflower-species-depth";
import {
  TEXAS_WILDFLOWER_PROFILES,
  texasWildflowersGuideArticle,
  texasWildflowerSpeciesArticles as baseWildflowerSpeciesArticles,
} from "./texas-wildflower-species-base";

const SECONDARY_SOURCE = "https://tpwd.texas.gov/huntwild/wild/wildlife_diversity/wildscapes/";

export { TEXAS_WILDFLOWER_PROFILES, texasWildflowersGuideArticle };

export const texasWildflowerSpeciesArticles: Article[] = baseWildflowerSpeciesArticles.map((article) => {
  const authorityDepth = WILDFLOWER_AUTHORITY_DEPTH[article.slug];
  if (!authorityDepth) return article;

  return {
    ...article,
    readingMinutes: Math.max(article.readingMinutes, 8),
    body: [
      ...article.body,
      { type: "heading", text: "Regional context and identification confidence" },
      { type: "paragraph", text: authorityDepth },
      { type: "heading", text: "Sources and further reading" },
      {
        type: "list",
        items: [
          "Lady Bird Johnson Wildflower Center Plant Database: https://www.wildflower.org/plants/",
          `Texas Parks & Wildlife native-plant and Wildscapes guidance: ${SECONDARY_SOURCE}`,
        ],
      },
    ],
  };
});

export const texasWildflowerArticles: Article[] = [texasWildflowersGuideArticle, ...texasWildflowerSpeciesArticles];
export const TEXAS_WILDFLOWER_ARTICLE_SLUGS = new Set(texasWildflowerArticles.map((article) => article.slug));
