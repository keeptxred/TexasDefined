import { articleInternalLinks } from "../article-internal-links";
import { blueHoleJasperCountyStoryArticle } from "./blue-hole-jasper-county-story";
import { registerSupplementalIntentArticle } from "./lazy-seasonal-intents";

// Keep small, opportunistic editorial additions discoverable without expanding
// the already-large lazy evergreen registry. Registration updates both the
// combined editorial list and direct slug lookup so a listed article cannot
// silently resolve to a production 404.
registerSupplementalIntentArticle(blueHoleJasperCountyStoryArticle);

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
