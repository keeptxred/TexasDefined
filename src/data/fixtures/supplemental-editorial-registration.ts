import { articleInternalLinks } from "../article-internal-links";
import { blueHoleJasperCountyStoryArticle } from "./blue-hole-jasper-county-story";
import { registerSupplementalIntentArticle } from "./lazy-seasonal-intents";
import { texasDogsEvergreenArticles } from "./texas-dogs-evergreen";
import { texasDogsEvergreenWave2Articles } from "./texas-dogs-evergreen-wave2";
import { texasDogsPracticalArticles } from "./texas-dogs-practical";

// Keep small, opportunistic editorial additions discoverable without expanding
// the already-large lazy evergreen registry. Registration updates both the
// combined editorial list and direct slug lookup so a listed article cannot
// silently resolve to a production 404.
registerSupplementalIntentArticle(blueHoleJasperCountyStoryArticle);
for (const article of [...texasDogsEvergreenArticles, ...texasDogsEvergreenWave2Articles, ...texasDogsPracticalArticles]) {
  registerSupplementalIntentArticle(article);
}

const blueHoleLink = {
  href: `/article/${blueHoleJasperCountyStoryArticle.slug}`,
  label: "Jasper County's Blue Hole quarry lake",
  description: "Read the history of the private blue-green quarry lake, its railroad past, geology, access limits and lost-train legend.",
};

// Jasper County's canonical county loader now owns its reciprocal Blue Hole
// discovery link so SSR does not depend on this opportunistic registration
// module being imported before the county page renders.
for (const slug of [
  "texas-lakes-reservoirs-explained",
  "texas-rivers-explained",
]) {
  const existing = articleInternalLinks[slug] ?? [];
  articleInternalLinks[slug] = existing.some((link) => link.href === blueHoleLink.href)
    ? existing
    : [...existing, blueHoleLink];
}
