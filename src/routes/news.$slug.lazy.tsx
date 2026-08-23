import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { ArticleBody } from "@/components/editorial/ArticleBody";
import { Container } from "@/components/layout/Container";
import { fetchPublishedTexasDefinedArticle } from "@/data/articles-remote";
import { formatDate, formatReadingTime } from "@/domain/utils/format";

export const Route = createLazyFileRoute("/news/$slug")({ component: LiveStory });

function LiveStory() {
  const { slug } = Route.useParams();
  const initial = Route.useRouteContext().liveArticle;
  const { data: article = initial } = useQuery({ queryKey: ["texasdefined-live-news", slug], queryFn: () => fetchPublishedTexasDefinedArticle(slug), initialData: initial, staleTime: 5 * 60 * 1000 });
  if (!article) return null;
  return <article>
    <Container className="pt-10"><nav className="text-xs uppercase tracking-[0.14em] text-muted-foreground"><Link to="/news" className="hover:text-primary">Texas right now</Link> · {article.category.replace(/-/g, " ")}</nav></Container>
    <section className="relative isolate mt-5 overflow-hidden bg-ink text-ink-foreground"><img src={article.hero.src} alt={article.hero.alt} width={article.hero.width} height={article.hero.height} fetchPriority="high" className="absolute inset-0 size-full object-cover opacity-55" /><div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/25" /><Container className="relative flex min-h-[58vh] flex-col justify-end pb-14 pt-32"><p className="eyebrow text-ink-foreground/80">{article.category.replace(/-/g, " ")}</p><h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">{article.title}</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-ink-foreground/86">{article.dek}</p></Container></section>
    <Container className="max-w-3xl py-12 sm:py-16"><p className="text-sm text-muted-foreground">Texas Defined · {formatDate(article.publishedAt)} · {formatReadingTime(article.readingMinutes)}</p><div className="mt-10"><ArticleBody blocks={article.body} entities={[]} /></div>{article.relatedDestinations.length > 0 && <aside className="mt-12 border-y py-7"><p className="eyebrow">Keep exploring Texas</p><ul>{article.relatedDestinations.map((slug) => <li key={slug}><Link to="/destination/$slug" params={{ slug }} className="text-primary underline">{slug.replace(/-/g, " ")}</Link></li>)}</ul></aside>}{article.hero.credit && <p className="mt-8 text-xs text-muted-foreground">Image: {article.hero.credit}</p>}{article.sourceUrl && <p className="mt-3 text-xs text-muted-foreground">Source: <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline">{article.sourceName || article.sourceUrl}</a></p>}{article.tags.length > 0 && <p className="mt-10 border-t border-border pt-5 text-sm text-muted-foreground">Filed under: {article.tags.join(" · ")}</p>}</Container>
  </article>;
}
