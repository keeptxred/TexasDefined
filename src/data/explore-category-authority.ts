import { createServerFn } from "@tanstack/react-start";
import type { CategorySlug } from "@/data/types";

export type ExploreAuthoritySection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type ExploreAuthoritySource = {
  name: string;
  url: string;
};

export type ExploreAuthorityGuide = {
  title: string;
  dek: string;
  sections: ExploreAuthoritySection[];
  sources: ExploreAuthoritySource[];
  relatedLinks: Array<{ label: string; href: string }>;
};

const loadExploreCategoryAuthority = createServerFn({ method: "GET" })
  .inputValidator((data: { category: CategorySlug }) => data)
  .handler(async ({ data }) => {
    const { getExploreCategoryAuthorityServer } = await import("./explore-category-authority.server");
    return getExploreCategoryAuthorityServer(data.category);
  });

export function getExploreCategoryAuthority(category: CategorySlug) {
  return loadExploreCategoryAuthority({ data: { category } });
}
