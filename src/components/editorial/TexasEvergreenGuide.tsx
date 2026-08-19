import { Link } from "@tanstack/react-router";

import bbqBrisket from "@/assets/bbq-brisket.jpg";
import bigBend from "@/assets/big-bend.jpg";
import kolacheKlobasnek from "@/assets/kolache-klobasnek-hero-photo.jpg";
import { Container } from "@/components/layout/Container";
import type { TexasEvergreenGuide as TexasEvergreenGuideData } from "@/data/texas-evergreen-guides";

const siteUrl = "https://texasdefined.com";

const guideImages: Partial<Record<string, { src: string; alt: string; caption: string }>> = {
  "texas-food-trail": {
    src: bbqBrisket,
    alt: "Sliced Texas barbecue brisket showing dark bark and a smoke ring",
    caption: "Barbecue is one chapter of the Texas food story, not the whole story.",
  },
  "texas-natural-wonders-bucket-list": {
    src: bigBend,
    alt: "Big Bend landscape with desert terrain and distant mountains",
    caption: "Big Bend is one anchor in a natural-wonders list that stretches from desert mountains to cypress swamps and barrier islands.",
  },
  "german-czech-texas-towns": {
    src: kolacheKlobasnek,
    alt: "Texas Czech-style kolache and klobasnek pastries",
    caption: "Food is one of the most visible surviving links to Czech and German settlement, but the heritage also lives in churches, halls, festivals and town landscapes.",
  },
};

export function TexasEvergreenGuide({ guide }: { guide: TexasEvergreenGuideData }) {
  const canonicalUrl = `${siteUrl}/${guide.slug}`;
  const image = guideImages[guide.slug];
  const imageUrl = image ? `${siteUrl}${image.src.startsWith('/') ? image.src : `/${image.src}`}` : undefined;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${canonicalUrl}#article`,
        headline: guide.title,
        description: guide.dek,
        url: canonicalUrl,
        mainEntityOfPage: { "@id": `${canonicalUrl}#page` },
        publisher: { "@type": "Organization", name: "TexasDefined", url: siteUrl },
        articleSection: "Things That Define Texas",
        image: imageUrl,
        about: guide.sections.map((section) => ({ "@type": "Thing", name: section.heading.replace(/^\d+\.\s*/, "") })),
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#page`,
        url: canonicalUrl,
        name: guide.title,
        description: guide.dek,
        primaryImageOfPage: imageUrl ? { "@type": "ImageObject", contentUrl: imageUrl } : undefined,
        isPartOf: { "@type": "WebSite", "@id": `${siteUrl}/#website`, name: "TexasDefined", url: siteUrl },
        breadcrumb: { "@id": `${canonicalUrl}#breadcrumb` },
        mainEntity: { "@id": `${canonicalUrl}#article` },
      },
      {
        "@type": "ItemList",
        "@id": `${canonicalUrl}#sections`,
        name: `${guide.title} sections`,
        numberOfItems: guide.sections.length,
        itemListElement: guide.sections.map((section, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: section.heading,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Front page", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Things That Define Texas", item: `${siteUrl}/things-unique-to-texas` },
          { "@type": "ListItem", position: 3, name: guide.title, item: canonicalUrl },
        ],
      },
    ],
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <Container className="pb-16 pt-10 sm:pb-24 sm:pt-14">
      <article className="mx-auto max-w-5xl">
        <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Front page</Link>
          <span aria-hidden="true" className="mx-2">/</span>
          <Link to="/things-unique-to-texas" className="hover:text-foreground">Things That Define Texas</Link>
          <span aria-hidden="true" className="mx-2">/</span>
          <span aria-current="page" className="text-foreground">{guide.title}</span>
        </nav>

        <header className="border-b border-border py-10 sm:py-14">
          <p className="eyebrow text-primary">{guide.eyebrow}</p>
          <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">{guide.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">{guide.dek}</p>
        </header>

        {image ? <figure className="border-b border-border py-8">
          <img src={image.src} alt={image.alt} className="aspect-[16/9] w-full object-cover" loading="eager" fetchPriority="high" />
          <figcaption className="mt-3 max-w-3xl text-xs leading-5 text-muted-foreground">{image.caption}</figcaption>
        </figure> : null}

        <section className="border-b border-border py-8" aria-labelledby="quick-answer">
          <p className="eyebrow text-primary">Quick answer</p>
          <h2 id="quick-answer" className="mt-2 font-display text-3xl">The short version</h2>
          <p className="mt-4 max-w-4xl text-base leading-8">{guide.quickAnswer}</p>
        </section>

        <div>
          {guide.sections.map((section, index) => <section key={section.heading} className="grid gap-6 border-b border-border py-10 lg:grid-cols-[12rem_minmax(0,1fr)]">
            <div>
              <p className="eyebrow text-primary">{String(index + 1).padStart(2, "0")}</p>
              <h2 className="mt-2 font-display text-3xl leading-tight">{section.heading}</h2>
            </div>
            <div className="max-w-3xl space-y-5">
              {section.body.map((paragraph) => <p key={paragraph} className="text-base leading-8 text-muted-foreground">{paragraph}</p>)}
              {section.bullets?.length ? <ul className="grid gap-3 border-l border-primary/40 pl-5 text-sm leading-7">
                {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
              </ul> : null}
              {section.links?.length ? <div className="flex flex-wrap gap-x-6 gap-y-3 pt-1 text-sm font-semibold">
                {section.links.map((link) => <Link key={link.href} to={link.href} className="border-b border-primary text-primary">{link.label}</Link>)}
              </div> : null}
            </div>
          </section>)}
        </div>

        <section className="py-12" aria-labelledby="related-reading">
          <p className="eyebrow text-primary">Keep exploring</p>
          <h2 id="related-reading" className="mt-2 font-display text-4xl">Related TexasDefined guides</h2>
          <div className="mt-6 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
            {guide.related.map((item) => <Link key={item.href} to={item.href} className="group bg-background p-6">
              <strong className="font-display text-2xl leading-tight group-hover:text-primary">{item.label}</strong>
              <span className="mt-3 block text-sm leading-6 text-muted-foreground">{item.description}</span>
              <span className="mt-5 block text-sm font-semibold text-primary">Read next →</span>
            </Link>)}
          </div>
        </section>
      </article>
    </Container>
  </>;
}
