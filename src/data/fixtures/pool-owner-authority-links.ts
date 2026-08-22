import { articleInternalLinks } from "../article-internal-links";

const poolOwnerGuideLink = {
  href: "/article/texas-pool-owner-guide",
  label: "Texas pool owner guide",
  description: "Manage chemistry, pumps, filters, freeze protection, storms, leaks, safety and electricity use for a Texas residential pool.",
};

for (const slug of [
  "texas-homeowner-field-manual",
  "texas-home-maintenance-calendar",
  "prepare-texas-house-freeze",
  "texas-hurricane-preparation-guide",
  "how-to-choose-electricity-plan-texas",
]) {
  const existing = articleInternalLinks[slug] ?? [];
  articleInternalLinks[slug] = existing.some((link) => link.href === poolOwnerGuideLink.href)
    ? existing
    : [...existing, poolOwnerGuideLink];
}
