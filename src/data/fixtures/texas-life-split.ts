import type { Article } from "../types";
import { texasLifeSplitArticles as sourceArticles } from "./texas-life-split-source";

const CURRENT_FORT_NAME_SENTENCE =
  "Joint Base San Antonio, Fort Cavazos, Fort Bliss and other installations support active-duty personnel, civilian employees, contractors, health care, construction, logistics and surrounding service businesses. In military-heavy communities, federal spending and personnel movement can materially shape housing demand and local employment.";

const PROTECTED_FOOTBALL_LINK = { href: "/article/texas-high-school-football-newcomers" };

if (!sourceArticles.some((article) => article.internalLinks?.some((link) => link.href === PROTECTED_FOOTBALL_LINK.href))) {
  throw new Error("Texas Life source contract is missing the high-school-football authority link.");
}

const correctedFortNameSentence = CURRENT_FORT_NAME_SENTENCE.replace("Fort Cavazos", "Fort Hood");

const correctCurrentFortHoodReference = (article: Article): Article => {
  if (article.slug !== "texas-jobs-economy-industries") return article;

  return {
    ...article,
    body: article.body.map((block) =>
      block.type === "paragraph" && block.text === CURRENT_FORT_NAME_SENTENCE
        ? { ...block, text: correctedFortNameSentence }
        : block,
    ),
  };
};

export const texasLifeSplitArticles: Article[] = sourceArticles.map(correctCurrentFortHoodReference);
