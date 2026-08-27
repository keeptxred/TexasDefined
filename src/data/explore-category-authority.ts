import { createServerFn } from "@tanstack/react-start";
import type { CategorySlug } from "@/data/types";
import { getExploreCategoryAuthorityHtmlServer } from "./explore-category-authority.server";

const loadExploreCategoryAuthorityHtml = createServerFn({ method: "GET" })
  .inputValidator((data: { category: CategorySlug }) => data)
  .handler(async ({ data }) => getExploreCategoryAuthorityHtmlServer(data.category));

export function getExploreCategoryAuthorityHtml(category: CategorySlug) {
  return loadExploreCategoryAuthorityHtml({ data: { category } });
}
