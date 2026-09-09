import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

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

export async function loadDogBreedPage(slug: string) {
  const data = await loadDogBreedPageServerFn({ data: { slug } });
  if (!data) throw notFound();
  return data;
}

export function loadDogsPage(slug?: string) {
  return slug ? loadDogBreedPage(slug) : loadDogHubData();
}
