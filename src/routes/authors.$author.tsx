import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { articlesQuery, authorsQuery } from "@/data/queries";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute("/authors/$author")({
  loader: async ({ context, params }) => {
    const [authors, articles] = await Promise.all([
      context.queryClient.ensureQueryData(authorsQuery()),
      context.queryClient.ensureQueryData(articlesQuery({ limit: 500 })),
    ]);
    const author = authors.find((item) => item.id === params.author);
    if (!author) throw notFound();
    return { author, articles: articles.filter((article) => article.authorId === author.id) };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Editorial desk unavailable" }, { name: "robots", content: "noindex, nofollow" }] };
    const canonicalPath = `/authors/${params.author}`;
    const url = absoluteUrl(texasDefinedBrand, canonicalPath);
    const description = `${loaderData.author.bio} Read stories published under the ${loaderData.author.name} byline.`;
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title: `${loaderData.author.name} | Texas Defined`, description }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "ProfilePage",
            "@id": `${url}#profile`,
            url,
            name: `${loaderData.author.name} | Texas Defined`,
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
            numberOfItems: loaderData.articles.length,
            itemListElement: loaderData.articles.map((article, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: { "@type": "Article", name: article.title, url: `${siteUrl}/article/${article.slug}` },
            })),
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
        <p className="mt-6 max-w-2xl text-sm leading-7 text-muted-foreground">This is an institutional Texas Defined byline, not a fictional individual. It identifies the editorial desk responsible for the published work. Editorial and sourcing principles are described on the <Link to="/about" className="border-b border-primary text-primary">About Texas Defined</Link> page.</p>
      </Container>
    </section>

    <Section>
      <Container>
        <SectionHeader eyebrow="Editorial archive" title={`Stories from ${author.name}`} description={`${articles.length.toLocaleString("en-US")} published ${articles.length === 1 ? "story" : "stories"} currently carry this desk byline.`} />
        {articles.length > 0 ? <ul className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">{articles.map((article) => <li key={article.id}><ArticleCard article={article} /></li>)}</ul> : <p className="mt-8 max-w-xl text-sm leading-7 text-muted-foreground">No published stories are currently attached to this editorial desk.</p>}
      </Container>
    </Section>
  </>;
}
