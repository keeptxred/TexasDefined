import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";

import { newsQuery } from "./news.index";

export const Route = createLazyFileRoute("/news/")({ component: TexasDefinedNews });

function TexasDefinedNews() {
  const { data } = useSuspenseQuery(newsQuery);
  return <Container className="py-12 sm:py-16">
    <p className="eyebrow text-primary">Texas right now</p>
    <h1 className="mt-3 font-display text-5xl sm:text-6xl">Texas Life & Culture News</h1>
    <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">Fresh stories routed to Texas Defined when they belong with travel, culture, history, outdoors and everyday Texas life rather than the political news cycle.</p>
    {data.length ? <ul className="mt-12 divide-y divide-border border-y border-border">{data.map((article) => <li key={article.slug} className="py-7">
      <Link to="/news/$slug" params={{ slug: article.slug }} className="group grid gap-5 sm:grid-cols-[12rem_1fr]">
        <img src={article.hero.src} alt={article.hero.alt} width={article.hero.width} height={article.hero.height} loading="lazy" decoding="async" sizes="(min-width: 640px) 12rem, 100vw" className="aspect-[16/10] w-full object-cover" />
        <div><p className="eyebrow text-muted-foreground">{article.category.replace(/-/g, " ")}</p><h2 className="mt-2 font-display text-3xl leading-tight group-hover:text-primary">{article.title}</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{article.dek}</p></div>
      </Link>
    </li>)}</ul> : <p className="mt-10 max-w-xl text-sm leading-7 text-muted-foreground">No live-routed stories are published yet. The magazine archive and destination guides remain available throughout Texas Defined.</p>}
  </Container>;
}
