import { dogBreedSlugs } from "./texas-dogs";

export function loadTexasDogSitemapEntriesServer() {
  return dogBreedSlugs.map((slug) => ({ path: `/dogs/${slug}`, lastmod: "2026-09-07" }));
}
