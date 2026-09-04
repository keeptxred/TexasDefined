import { createServerFn } from "@tanstack/react-start";
import type { Article } from "./types";

const listTexasDogsArticlesServerFn = createServerFn({ method: "GET" }).handler(async () => {
  const { listTexasDogsArticleStubsServer } = await import("./texas-dogs-articles.server");
  return listTexasDogsArticleStubsServer();
});

const loadTexasDogsArticleServerFn = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { loadTexasDogsArticleServer } = await import("./texas-dogs-articles.server");
    return loadTexasDogsArticleServer(data.slug);
  });

export function listTexasDogsArticleStubs(): Promise<Article[]> {
  return listTexasDogsArticlesServerFn();
}

export function loadTexasDogsArticle(slug: string): Promise<Article | null> {
  return loadTexasDogsArticleServerFn({ data: { slug } });
}
