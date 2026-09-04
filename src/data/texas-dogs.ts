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

export interface DogHubData {
  breeds: DogBreedSummary[];
  collections: DogDesignCollection[];
}

export interface DogBreedPageData {
  breed: DogBreedProfile;
  related: DogBreedSummary[];
  collections: DogDesignCollection[];
}

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

export function loadDogHubData(): Promise<DogHubData> {
  return loadDogHubDataServerFn();
}

export function loadDogBreedPage(slug: string): Promise<DogBreedPageData | null> {
  return loadDogBreedPageServerFn({ data: { slug } });
}
