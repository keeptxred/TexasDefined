import { articleInternalLinks } from "../article-internal-links";
import { newestEvergreenArticles as baseNewestEvergreenArticles } from "./newest-evergreen-base";
import { texasFlagHistoryArticle } from "./texas-flag-history";

const flagHistoryLink = {
  href: "/article/history-of-the-texas-flag",
  label: "The history of the Texas flag",
  description: "Follow the Lone Star from revolution-era proposals and the Burnet flag to the Republic's 1839 design and today's state flag.",
};

for (const slug of [
  "six-flags-over-texas-meaning",
  "texas-revolution-historic-sites-road-trip",
]) {
  const existing = articleInternalLinks[slug] ?? [];
  articleInternalLinks[slug] = existing.some((link) => link.href === flagHistoryLink.href)
    ? existing
    : [...existing, flagHistoryLink];
}

export const newestEvergreenArticles = [
  ...baseNewestEvergreenArticles,
  texasFlagHistoryArticle,
];
