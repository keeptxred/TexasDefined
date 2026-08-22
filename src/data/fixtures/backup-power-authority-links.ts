import { articleInternalLinks } from "../article-internal-links";

const backupPowerGuideLink = {
  href: "/article/texas-backup-power-generator-guide",
  label: "Texas backup power and generator guide",
  description: "Plan essential loads, generator placement, transfer switching, fuel, outage operation and carbon-monoxide-safe backup power for a Texas home.",
};

for (const slug of [
  "texas-homeowner-field-manual",
  "prepare-texas-house-freeze",
  "texas-hurricane-preparation-guide",
  "texas-pool-owner-guide",
  "how-to-choose-electricity-plan-texas",
]) {
  const existing = articleInternalLinks[slug] ?? [];
  articleInternalLinks[slug] = existing.some((link) => link.href === backupPowerGuideLink.href)
    ? existing
    : [...existing, backupPowerGuideLink];
}
