import { createServerFn } from "@tanstack/react-start";

const loadDogHubData = createServerFn({ method: "GET" }).handler(async () => {
  const { loadDogHubDataServer } = await import("./texas-dogs.server");
  return loadDogHubDataServer();
});

const loadDogBreedPage = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { loadDogBreedPageServer } = await import("./texas-dogs.server");
    return loadDogBreedPageServer(data.slug);
  });

export function getDogHubData() {
  return loadDogHubData();
}

export function getDogBreedPage(slug: string) {
  return loadDogBreedPage({ data: { slug } });
}
