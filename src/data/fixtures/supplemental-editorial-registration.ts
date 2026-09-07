import { articleInternalLinks } from "../article-internal-links";
import { blueHoleJasperCountyStoryArticle } from "./blue-hole-jasper-county-story";
import { seasonalIntentStubs } from "./lazy-seasonal-intents";

// Keep small, opportunistic editorial additions discoverable without expanding
// the already-large lazy evergreen registry. The article repository falls back
// to the combined editorial list when a dedicated lazy loader does not claim it.
if (!seasonalIntentStubs.some((article) => article.slug === blueHoleJasperCountyStoryArticle.slug)) {
  seasonalIntentStubs.push(blueHoleJasperCountyStoryArticle);
}

const blueHoleLink = {
  href: `/article/${blueHoleJasperCountyStoryArticle.slug}`,
  label: "Jasper County's Blue Hole quarry lake",
  description: "Read the history of the private blue-green quarry lake, its railroad past, geology, access limits and lost-train legend.",
};

for (const slug of [
  "jasper-county-jasper-kirbyville-sam-rayburn-piney-woods-texas",
  "texas-lakes-reservoirs-explained",
  "texas-rivers-explained",
]) {
  const existing = articleInternalLinks[slug] ?? [];
  articleInternalLinks[slug] = existing.some((link) => link.href === blueHoleLink.href)
    ? existing
    : [...existing, blueHoleLink];
}
