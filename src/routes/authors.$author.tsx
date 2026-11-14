import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { fetchPublishedTexasDefinedEvergreenArticles } from "@/data/articles-remote";
import { articlesQuery, authorsQuery } from "@/data/queries";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

/** Static evergreen music-history essays share the institutional desk byline.
 * They do not enter the remote published-article feed and must be linked here
 * rather than displaying a misleading empty author archive.
 */
const musicHistoryEditorialArticles = [
  { href: "/broken-spoke-austin-history", name: "Broken Spoke: Austin dance-hall history" },
  { href: "/continental-club-austin-history", name: "Continental Club: South Congress history" },
  { href: "/antones-austin-history", name: "Antone's: Austin blues history" },
  { href: "/billy-bobs-texas-history", name: "Billy Bob's Texas: Stockyards history" },
  { href: "/texas-music-cities", name: "Texas Music Cities: six-scene comparison" },
  { href: "/austin-music-history", name: "Austin music history" },
  { href: "/houston-music-history", name: "Houston music history" },
  { href: "/san-antonio-music-history", name: "San Antonio music history" },
  { href: "/corpus-christi-music-history", name: "Corpus Christi music history" },
  { href: "/lubbock-music-history", name: "Lubbock music history" },
] as const;

export const Route = createFileRoute("/authors/$author")({
  loader: async ({ context, params }) => {
    const [authors, articles, remoteEvergreen] = await Promise.all([
      context.queryClient.ensureQueryData(authorsQuery()),
      context.queryClient.ensureQueryData(articlesQuery({ limit: 500 })),
      fetchPublishedTexasDefinedEvergreenArticles({ limit: 200 }).catch(() => []),
    ]);
    const author = authors.find((item) => item.id === params.author);
    if (!author) throw notFound();
    // Include live evergreen bylines in the archive; preserve canonical local stories
    // and do not duplicate slugs that exist in both publication systems.
    const localStories = articles.filter((article) => article.authorId === author.id);
    const seen = new Set(articles.map((article) => article.slug));
    const completeArchive = [
      ...localStories,
      ...remoteEvergreen.filter((article) => article.authorId === author.id && !seen.has(article.slug)),
    ];
    return { author, articles: completeArchive };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Editorial desk unavailable" }, { name: "robots", content: "noindex, nofollow" }] };
    const canonicalPath = `/authors/${params.author}`;
    const url = absoluteUrl(texasDefinedBrand, canonicalPath);
    const description = `${loaderData.author.bio} Read stories published under the ${loaderData.author.name} byline.`;
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title: loaderData.author.name, description }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "ProfilePage",
            "@id": `${url}#profile`,
            url,
            name: loaderData.author.name,
            description,
            inLanguage: texasDefinedBrand.identity.locale,
            isPartOf: { "@id": `${siteUrl}/#website` },
            mainEntity: { "@id": `${url}#desk` },
            breadcrumb: { "@id": `${url}#breadcrumbs` },
          },
          {
            "@type": "Organization",
            "@id": `${url}#desk`,
            name: loaderData.author.name,
            description: loaderData.author.bio,
            url,
            parentOrganization: { "@id": `${siteUrl}/#organization` },
          },
          {
            "@type": "ItemList",
            "@id": `${url}#articles`,
            name: `Stories from ${loaderData.author.name}`,
            numberOfItems: loaderData.articles.length + (params.author === "a-hollis" ? musicHistoryEditorialArticles.length : 0),
            itemListElement: [
              ...loaderData.articles.map((article, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: { "@type": "Article", name: article.title, url: `${siteUrl}/article/${article.slug}` },
              })),
              ...(params.author === "a-hollis" ? musicHistoryEditorialArticles.map((article, index) => ({
                "@type": "ListItem", position: loaderData.articles.length + index + 1,
                item: { "@type": "Article", name: article.name, url: `${siteUrl}${article.href}` },
              })) : []),
            ],
          },
          {
            "@type": "BreadcrumbList",
            "@id": `${url}#breadcrumbs`,
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Front page", item: `${siteUrl}/` },
              { "@type": "ListItem", position: 2, name: "About", item: `${siteUrl}/about` },
              { "@type": "ListItem", position: 3, name: loaderData.author.name, item: url },
            ],
          },
        ],
      })],
    };
  },
  notFoundComponent: () => <Container className="py-24"><p className="eyebrow text-primary">Editorial desks</p><h1 className="mt-3 font-display text-4xl">That editorial desk is unavailable</h1><Link to="/about" className="eyebrow mt-6 inline-block border-b border-primary pb-1 text-primary">About Texas Defined →</Link></Container>,
  component: AuthorPage,
});

function AuthorPage() {
  const { author, articles } = Route.useLoaderData();
  return <>
    <section className="border-b border-border bg-surface">
      <Container className="py-16 sm:py-24">
        <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap items-center gap-2"><li><Link to="/" className="hover:text-foreground">Front page</Link></li><li aria-hidden>·</li><li><Link to="/about" className="hover:text-foreground">About</Link></li><li aria-hidden>·</li><li aria-current="page" className="text-foreground">{author.name}</li></ol></nav>
        <p className="eyebrow mt-9 text-primary">Texas Defined editorial desk</p>
        <h1 className="mt-4 font-display text-5xl leading-[0.98] sm:text-7xl">{author.name}</h1>
        <p className="eyebrow mt-5 text-muted-foreground">{author.role}</p>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{author.bio}</p>
        <p className="mt-6 max-w-2xl text-sm leading-7 text-muted-foreground">This is an institutional Texas Defined byline, not a fictional individual. It identifies the editorial desk responsible for the published work. Read the <Link to="/editorial-policy" className="border-b border-primary text-primary">Editorial Policy</Link> for centralized sourcing, review, AI-assisted-workflow, independence, and correction standards. These are not repeated on every article.</p>
      </Container>
    </section>

    {author.id === "a-hollis" ? <Section>
      <Container>
        <SectionHeader eyebrow="Texas music history" title="Music history and venue research" description="Ten historical features are published under this desk byline. Each article contains its own source trail and independent interpretation; the editorial policy is maintained here rather than repeated on each article." />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {musicHistoryEditorialArticles.map((item) => <li key={item.href} className="border-t border-border py-4"><Link to={item.href} className="text-base font-semibold text-primary underline underline-offset-4">{item.name}</Link></li>)}
        </ul>
      </Container>
    </Section> : null}
    <Section>
      <Container>
        <SectionHeader eyebrow="Editorial archive" title={author.id === "a-hollis" ? "More articles from this editorial desk" : `Stories from ${author.name}`} description={author.id === "a-hollis" ? `${articles.length.toLocaleString("en-US")} additional published ${articles.length === 1 ? "article" : "articles"} in the main story archive. The ten research guides are listed above.` : `${articles.length.toLocaleString("en-US")} published ${articles.length === 1 ? "story" : "stories"} currently carry this desk byline.`} />
        {articles.length > 0 ? <ul className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">{articles.map((article) => <li key={article.id}><ArticleCard article={article} /></li>)}</ul> : <p className="mt-8 max-w-xl text-sm leading-7 text-muted-foreground">{author.id === "a-hollis" ? "No additional articles are currently attached to this desk in the main publishing archive; the music history guides above remain available." : "No published stories are currently attached to this editorial desk."}</p>}
      </Container>
    </Section>
  </>;
}
