const dogBreedSlugs = [
  "labrador-retriever",
  "golden-retriever",
  "dachshund",
  "french-bulldog",
  "german-shepherd",
  "australian-shepherd",
  "pembroke-welsh-corgi",
  "beagle",
  "boxer",
  "chihuahua",
  "great-dane",
  "yorkshire-terrier",
] as const;

export function loadTexasDogSitemapEntriesServer() {
  return dogBreedSlugs.map((slug) => ({ path: `/dogs/${slug}`, lastmod: "2026-09-07" }));
}
