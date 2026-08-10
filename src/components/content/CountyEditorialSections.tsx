import { ArticleBody } from '@/components/editorial/ArticleBody';
import { canonicalizeCountySeriesHref } from '@/data/county-editorial';
import type { TexasEntityRecord } from '@/data/knowledge-graph/types';
import type { Article } from '@/data/types';
import { formatDate, formatReadingTime } from '@/domain/utils/format';

export function CountyEditorialSections({ article, entities }: { article: Article; entities: TexasEntityRecord[] }) {
  const internalLinks = article.internalLinks ?? [];

  return <section className="border-b border-border py-12" aria-labelledby="county-story-heading">
    <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
      <div>
        <p className="eyebrow text-primary">County story</p>
        <h2 id="county-story-heading" className="mt-2 font-display text-4xl">What defines this county</h2>
        <p className="mt-4 text-xs leading-6 text-muted-foreground">Published {formatDate(article.publishedAt)} · {formatReadingTime(article.readingMinutes)}</p>
      </div>

      <div className="min-w-0">
        <figure className="overflow-hidden bg-muted">
          <img
            src={article.hero.src}
            alt={article.hero.alt}
            width={article.hero.width}
            height={article.hero.height}
            loading="eager"
            decoding="async"
            className="aspect-[16/9] w-full object-cover"
          />
          {article.hero.credit ? <figcaption className="border-t border-border px-4 py-3 text-xs text-muted-foreground">Photography: {article.hero.credit}</figcaption> : null}
        </figure>

        <div className="mx-auto mt-10 max-w-3xl">
          <h3 className="font-display text-4xl leading-tight sm:text-5xl">{article.title}</h3>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">{article.dek}</p>
          <div className="mt-10"><ArticleBody blocks={article.body} entities={entities} /></div>

          {internalLinks.length ? <aside className="mt-12 border-y border-border py-7" aria-label="Related county reading">
            <p className="eyebrow text-primary">Continue exploring</p>
            <ul className="mt-4 divide-y divide-border">
              {internalLinks.map((item) => {
                const href = canonicalizeCountySeriesHref(item.href);
                return <li key={`${href}-${item.label}`} className="py-4 first:pt-0 last:pb-0">
                  <a href={href} className="group block">
                    <span className="font-display text-xl group-hover:text-primary">{item.label}</span>
                    {item.description ? <span className="mt-1 block text-sm leading-7 text-muted-foreground">{item.description}</span> : null}
                  </a>
                </li>;
              })}
            </ul>
          </aside> : null}
        </div>
      </div>
    </div>
  </section>;
}
