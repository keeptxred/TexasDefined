import { createServerFn } from "@tanstack/react-start";
import type { CategorySlug } from "@/data/types";

const loadExploreCategoryAuthorityHtml = createServerFn({ method: "GET" })
  .inputValidator((data: { category: CategorySlug }) => data)
  .handler(async ({ data }) => {
    const { getExploreCategoryAuthorityHtmlServer } = await import("./explore-category-authority.server");
    return getExploreCategoryAuthorityHtmlServer(data.category);
  });

export function getExploreCategoryAuthorityHtml(category: CategorySlug) {
  return loadExploreCategoryAuthorityHtml({ data: { category } });
}
