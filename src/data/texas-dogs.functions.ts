import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

const loadDogsPageServerFn = createServerFn({ method: "GET" })
  .inputValidator((data: { slug?: string }) => data)
  .handler(async ({ data }) => {
    const { loadDogBreedPageServer, loadDogHubDataServer } = await import("./texas-dogs.server");
    return data.slug ? loadDogBreedPageServer(data.slug) : loadDogHubDataServer();
  });

export async function loadDogsPage(slug?: string) {
  const data = await loadDogsPageServerFn({ data: { slug } });
  if (slug && !data) throw notFound();
  return data;
}
