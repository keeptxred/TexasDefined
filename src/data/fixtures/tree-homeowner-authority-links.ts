import { articleInternalLinks } from "../article-internal-links";

const treeHomeownerGuideLink = {
  href: "/article/texas-trees-around-home-guide",
  label: "Texas trees around a house",
  description: "Manage storm risk, oak wilt, roots, drought stress, utility conflicts, pruning and arborist decisions around a Texas home.",
};

for (const slug of [
  "texas-homeowner-field-manual",
  "texas-trees-guide",
  "best-native-plants-texas-yard",
  "texas-hurricane-preparation-guide",
]) {
  const existing = articleInternalLinks[slug] ?? [];
  articleInternalLinks[slug] = existing.some((link) => link.href === treeHomeownerGuideLink.href)
    ? existing
    : [...existing, treeHomeownerGuideLink];
}
