import { articleInternalLinks } from "../article-internal-links";

const wildfireGuideLink = {
  href: "/article/texas-wildfire-home-protection-guide",
  label: "Texas wildfire home protection guide",
  description: "Reduce ember vulnerability, manage home ignition zones, improve emergency access and build a practical evacuation plan for Texas wildfire risk.",
};

for (const slug of [
  "texas-homeowner-field-manual",
  "texas-trees-around-home-guide",
  "best-native-plants-texas-yard",
  "buying-land-in-texas-guide",
]) {
  const existing = articleInternalLinks[slug] ?? [];
  articleInternalLinks[slug] = existing.some((link) => link.href === wildfireGuideLink.href)
    ? existing
    : [...existing, wildfireGuideLink];
}
