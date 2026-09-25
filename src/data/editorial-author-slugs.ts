const publicAuthorSlugs: Readonly<Record<string, string>> = {
  "a-dell": "travel-outdoors-desk",
};

const authorIdsByPublicSlug = new Map(
  Object.entries(publicAuthorSlugs).map(([authorId, publicSlug]) => [publicSlug, authorId]),
);

export function publicAuthorSlug(authorId: string) {
  return publicAuthorSlugs[authorId] ?? authorId;
}

export function authorIdFromPublicSlug(publicSlug: string) {
  return authorIdsByPublicSlug.get(publicSlug) ?? publicSlug;
}
