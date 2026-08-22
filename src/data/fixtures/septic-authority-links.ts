import { articleInternalLinks } from "../article-internal-links";

const septicGuideLink = {
  href: "/article/texas-septic-systems-homeowner-guide",
  label: "Texas septic systems homeowner guide",
  description: "Understand conventional and aerobic OSSFs, permits, maintenance, drainfields, alarms, flooding and rural-home due diligence.",
};

for (const slug of [
  "texas-homeowner-field-manual",
  "texas-rural-wells-water-guide",
  "buying-land-in-texas-guide",
]) {
  const existing = articleInternalLinks[slug] ?? [];
  articleInternalLinks[slug] = existing.some((link) => link.href === septicGuideLink.href)
    ? existing
    : [...existing, septicGuideLink];
}
