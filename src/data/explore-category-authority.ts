import type { CategorySlug } from "@/data/types";

const authorityAssetPath: Partial<Record<CategorySlug, string>> = {
  outdoors: "/content/explore-category-authority/outdoors.html",
  caverns: "/content/explore-category-authority/caverns.html",
};

export async function getExploreCategoryAuthorityHtml(category: CategorySlug): Promise<string | null> {
  const assetPath = authorityAssetPath[category];
  if (!assetPath) return null;

  if (import.meta.env.SSR) {
    const { getExploreCategoryAuthorityHtmlServer } = await import("@/data/explore-category-authority.server");
    return getExploreCategoryAuthorityHtmlServer(category);
  }

  const response = await fetch(assetPath, { headers: { accept: "text/html" } });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Explore authority asset request failed (${response.status})`);
  return response.text();
}
