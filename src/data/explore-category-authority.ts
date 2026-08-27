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

const loadExploreCategoryAuthorityHtml = createServerFn({ method: "GET" })
  .inputValidator((data: { category: CategorySlug }) => data)
  .handler(async ({ data }) => {
    const { renderExploreCategoryAuthorityHtml } = await import("./explore-category-authority-html.server");
    return renderExploreCategoryAuthorityHtml(data.category);
  });

export function getExploreCategoryAuthorityHtml(category: CategorySlug) {
  return loadExploreCategoryAuthorityHtml({ data: { category } });
}
