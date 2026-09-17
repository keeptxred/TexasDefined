export interface DogBreedProfile {
  slug: string;
  name: string;
  shortName: string;
  deck: string;
  personality: string;
  texasFit: string;
  designHooks: string[];
}

export interface DogBreedSummary {
  slug: string;
  name: string;
  shortName: string;
  deck: string;
}

export interface DogDesignCollection {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  examples: string[];
}

/**
 * Tiny public index only. Keep rich breed copy and collections in the server-only
 * registry so the unsplit main client bundle does not absorb Texas Dogs content.
 */
export const dogBreedSlugs = [
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

export const dogBreeds = dogBreedSlugs.map((slug) => ({ slug }));
export type DogBreedSlug = (typeof dogBreedSlugs)[number];
