import { articleInternalLinks } from "../article-internal-links";

const pestGuideLink = {
  href: "/article/texas-household-pests-guide",
  label: "Texas household pests guide",
  description: "Identify and prevent termites, fire ants, mosquitoes, roaches, scorpions, rodents, fleas, ticks and other common Texas household pests.",
};

for (const slug of [
  "texas-homeowner-field-manual",
  "texas-home-maintenance-calendar",
  "texas-wildlife-guide",
]) {
  const existing = articleInternalLinks[slug] ?? [];
  articleInternalLinks[slug] = existing.some((link) => link.href === pestGuideLink.href)
    ? existing
    : [...existing, pestGuideLink];
}
