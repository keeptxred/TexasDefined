import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { ArticleBody, Byline } from "@/components/editorial/ArticleBody";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { articleQuery, articlesQuery, authorsQuery } from "@/data/queries";
import { formatDate, formatReadingTime } from "@/domain/utils/format";
import { buildMeta, canonicalLink } from "@/lib/seo";

export const Route = createFileRoute("/article/$slug")({
  loader: async ({ context, params }) => {
    const article = await context.queryClient.ensureQueryData(articleQuery(params.slug));
    if (!article) throw notFound();
    await Promise.all([
      context.queryClient.ensureQueryData(authorsQuery()),
      context.queryClient.ensureQueryData(articlesQuery({ category: article.category, limit: 4 })),
    ]);
    return { article };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const { article } = loaderData;
    return {
      meta: [
        ...buildMeta(texasDefinedBrand, {
          title: article.title,
          description: article.dek,
          type: "article",
        }),
        { property: "article:published_time", content: article.publishedAt },
      ],
      links: [canonicalLink(texasDefinedBrand, `/article/${params.slug}`)],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.dek,
            datePublished: article.publishedAt,
            articleSection: article.category,
            publisher: { "@type": "Organization", name: texasDefinedBrand.identity.name },
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <Container className="py-24">
      <h1 className="font-display text-3xl">That story isn't here</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        It may have moved.{" "}
        <Link to="/explore" className="text-primary underline">
          Browse Explore
        </Link>
        .
      </p>
    </Container>
  ),
  component: ArticlePage,
});

function ArticlePage() {
  const { slug } = Route.useParams();
  const { data: article } = useSuspenseQuery(articleQuery(slug));
  const { data: authors } = useSuspenseQuery(authorsQuery());
  const { data: related } = useSuspenseQuery(
    articlesQuery(article ? { category: article.category, limit: 4 } : { limit: 4 }),
  );


  if (!article) return null;
  const author = authors.find((item) => item.id === article.authorId) ?? null;

  return (
    <article>
      <section className="relative isolate overflow-hidden bg-ink text-ink-foreground">
        <img
          src={article.hero.src}
          alt={article.hero.alt}
          width={article.hero.width}
          height={article.hero.height}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 size-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/25" />
        <Container className="relative flex min-h-[60vh] flex-col justify-end pb-14 pt-32">
          <p className="eyebrow text-ink-foreground/80">{article.category.replace(/-/g, " ")}</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.08] sm:text-6xl">
            {article.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-foreground/85">
            {article.dek}
          </p>
        </Container>
      </section>

      <Container className="max-w-3xl py-12">
        <Byline
          author={author}
          meta={`${formatDate(article.publishedAt)} · ${formatReadingTime(article.readingMinutes)}`}
        />
        <div className="mt-10">
          <ArticleBody blocks={article.body} />
        </div>
        {article.hero.credit && (
          <p className="mt-10 text-xs text-muted-foreground">Photograph: {article.hero.credit}</p>
        )}
        <ul className="mt-10 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-sm bg-secondary px-3 py-1 text-xs uppercase tracking-widest text-secondary-foreground"
            >
              {tag}
            </li>
          ))}
        </ul>
      </Container>

      <Section tone="surface">
        <Container>
          <SectionHeader eyebrow="Keep reading" title="More in this section" />
          <ul className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {related
              .filter((item) => item.id !== article.id)
              .slice(0, 3)
              .map((item) => (
                <li key={item.id}>
                  <ArticleCard article={item} size="compact" />
                </li>
              ))}
          </ul>
        </Container>
      </Section>
    </article>
  );
}
