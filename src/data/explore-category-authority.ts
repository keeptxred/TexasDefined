import { createIsomorphicFn } from "@tanstack/react-start";

import { getExploreCategoryAuthorityHtmlServer } from "@/data/explore-category-authority.server";
import type { CategorySlug } from "@/data/types";

export const getExploreCategoryAuthorityHtml = createIsomorphicFn()
  .server((category: CategorySlug) => getExploreCategoryAuthorityHtmlServer(category))
  .client(async (category: CategorySlug) => {
    const response = await fetch(`/api/public/explore-category-authority?category=${encodeURIComponent(category)}`, {
      headers: { accept: "text/html" },
    });
    if (response.status === 404) return null;
    if (!response.ok) throw new Error(`Explore authority request failed (${response.status})`);
    return response.text();
  });
