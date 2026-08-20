import { articleInternalLinks } from "./article-internal-links";
import type { ArticleInternalLink } from "./types";

const addLinks = (slug: string, additions: ArticleInternalLink[]) => {
  const existing = articleInternalLinks[slug] ?? [];
  articleInternalLinks[slug] = [
    ...existing,
    ...additions.filter((addition) => !existing.some((link) => link.href === addition.href)),
  ];
};

const usMexicanWarLink: ArticleInternalLink = {
  href: "/article/texas-us-mexican-war-rio-grande-guide",
  label: "Texas and the U.S.–Mexican War",
  description: "Follow the disputed Rio Grande boundary into Fort Texas, Palo Alto, Resaca de la Palma and the opening campaign of 1846.",
};

const buffaloSoldiersLink: ArticleInternalLink = {
  href: "/article/buffalo-soldiers-texas-frontier-guide",
  label: "Buffalo Soldiers in Texas",
  description: "Follow the Black Regulars through Fort Davis, Fort Concho, Fort McKavett and Fort Lancaster after the Civil War.",
};

const campMabryLink: ArticleInternalLink = {
  href: "/article/texas-national-guard-camp-mabry-history",
  label: "Camp Mabry and the Texas National Guard",
  description: "Trace the Texas Volunteer Guard, National Guard reforms, the 36th Division and the Austin installation that preserves the institutional story.",
};

addLinks("texas-military-history-timeline", [usMexicanWarLink, buffaloSoldiersLink, campMabryLink]);
addLinks("republic-of-texas-government-trail", [usMexicanWarLink]);
addLinks("texas-borderlands-historic-sites-guide", [usMexicanWarLink]);
addLinks("texas-frontier-forts-road-trip", [buffaloSoldiersLink]);
addLinks("texas-civil-war-sites-guide", [buffaloSoldiersLink]);
addLinks("texas-world-war-ii-historic-sites-guide", [campMabryLink]);
