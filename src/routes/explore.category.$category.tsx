import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { CategoryPage } from "@/components/editorial/CategoryPage";
import { Container } from "@/components/layout/Container";
import { categoriesQuery } from "@/data/queries";
import type { CategorySlug } from "@/data/types";
import { buildMeta, canonicalLink } from "@/lib/seo";

export const Route = createFileRoute("/explore/category/$category")({
  loader: async ({ context, params }) => {
    const categories = await context.queryClient.ensureQueryData(categoriesQuery());
    const category = categories.find((item) => item.slug === params.category);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }],
      };
    }
    return {
      meta: buildMeta(texasDefinedBrand, {
        title: loaderData.category.name,
        description: loaderData.category.description,
      }),
      links: [canonicalLink(texasDefinedBrand, `/explore/${params.category}`)],
    };
  },
  notFoundComponent: CategoryNotFound,
  component: ExploreCategoryPage,
});

function CategoryNotFound() {
  return (
    <Container className="py-24">
      <h1 className="font-display text-3xl">We don't cover that yet</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Try another section from the Explore menu.
      </p>
    </Container>
  );
}

function ExploreCategoryPage() {
  const { category } = Route.useParams();
  const { data: categories } = useSuspenseQuery(categoriesQuery());
  const match = categories.find((item) => item.slug === category);
  if (!match) return <CategoryNotFound />;

  return (
    <CategoryPage
      category={match.slug as CategorySlug}
      eyebrow={match.eyebrow}
      title={match.name}
      intro={match.description}
      image={match.image}
    />
  );

}
