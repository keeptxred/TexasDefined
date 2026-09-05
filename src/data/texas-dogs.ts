import { createServerFn } from "@tanstack/react-start";

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

// Slugs stay tiny and public so sitemap generation never needs the rich registry in a client-reachable module.
export const dogBreeds = [
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
].map((slug) => ({ slug }));

const loadDogHubDataServerFn = createServerFn({ method: "GET" }).handler(async () => {
  const { loadDogHubDataServer } = await import("./texas-dogs.server");
  return loadDogHubDataServer();
});

const loadDogBreedPageServerFn = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { loadDogBreedPageServer } = await import("./texas-dogs.server");
    return loadDogBreedPageServer(data.slug);
  });

export function loadDogHubData() {
  return loadDogHubDataServerFn();
}

export function loadDogBreedPage(slug: string) {
  return loadDogBreedPageServerFn({ data: { slug } });
}
