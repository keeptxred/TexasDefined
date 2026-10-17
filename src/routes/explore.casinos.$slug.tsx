import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

export const Route = createFileRoute("/explore/casinos/$slug")({
  loader: async ({ params }) => {
    const { casinoGuideBySlug } = await import("@/data/texas-casino-guides");
    const guide = casinoGuideBySlug.get(params.slug);
    if (!guide) throw notFound();
    return { ...guide, relatedGuides: guide.relatedSlugs.flatMap((slug) => {
      const match = casinoGuideBySlug.get(slug);
      return match ? [match] : [];
    }) };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ name: "robots", content: "noindex, nofollow" }] };
    const guide = loaderData;
    const canonicalPath = `/explore/casinos/${params.slug}`;
    const url = absoluteUrl(texasDefinedBrand, canonicalPath);
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath, title: guide.title + " | Texas Defined", description: guide.dek,
        modifiedTime: "2026-10-15T12:00:00-05:00",
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "WebPage", "@id": url + "#page", url, name: guide.title, description: guide.dek,
            dateModified: "2026-10-15", isPartOf: { "@id": absoluteUrl(texasDefinedBrand, "/explore/casinos") + "#page" } },
          { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl(texasDefinedBrand, "/") },
            { "@type": "ListItem", position: 2, name: "Explore", item: absoluteUrl(texasDefinedBrand, "/explore") },
            { "@type": "ListItem", position: 3, name: "Casinos & Gaming Getaways", item: absoluteUrl(texasDefinedBrand, "/explore/casinos") },
            { "@type": "ListItem", position: 4, name: guide.shortTitle, item: url },
          ] },
        ],
      })],
    };
  },
  component: CasinoGuidePage,
  notFoundComponent: () => <Container className="py-20">
    <h1 className="font-display text-4xl">That guide isn't available.</h1>
    <p className="mt-4"><Link to="/explore/casinos" className="text-primary underline">Browse casino and gaming getaways.</Link></p>
  </Container>,
});

function CasinoGuidePage() {
  const guide = Route.useLoaderData();
  const related = guide.relatedGuides;
  return <main>
    <section className="border-b border-border bg-ink text-ink-foreground">
      <Container className="py-12 sm:py-16">
        <nav aria-label="Breadcrumb" className="text-xs text-ink-foreground">
          <Link to="/explore" className="hover:underline">Explore</Link><span aria-hidden> / </span>
          <Link to="/explore/casinos" className="hover:underline">Gaming getaways</Link>
        </nav>
        <p className="eyebrow mt-10 text-ink-foreground">{guide.group} · {guide.location}</p>
        <h1 className="mt-4 max-w-4xl font-display text-4xl  sm:text-5xl">{guide.title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-foreground">{guide.dek}</p>
        <p className="mt-6 text-sm uppercase text-ink-foreground">{guide.status} · Sources reviewed Oct. 15, 2026</p>
      </Container>
    </section>
    <Container className="grid gap-12 py-12 sm:py-16 lg:grid-cols-2">
      <article className="">
        <section aria-labelledby="at-a-glance">
          <h2 id="at-a-glance" className="font-display text-3xl">At a glance</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {guide.facts.map((fact) => <li key={fact} className="border-t border-primary bg-surface px-4 py-3 text-sm leading-6">{fact}</li>)}
          </ul>
        </section>
        {guide.sections.map((section) => <section key={section.heading} className="mt-12 border-t border-border pt-8">
          <h2 className="font-display text-3xl">{section.heading}</h2>
          {section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-4 text-base leading-8 text-muted-foreground">{paragraph}</p>)}
        </section>)}
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="font-display text-2xl">Research and official sources</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">Source links lead to the operator or public legal authority. Check their current policies and availability before travel.</p>
          <ul className="mt-5 space-y-3 text-sm">
            {guide.sources.map((source) => <li key={source.url}>
              <a href={source.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline">{source.label} ↗</a>
            </li>)}
          </ul>
        </section>
      </article>
      <aside className="">
        <div className="border border-border bg-surface p-6">
          <p className="eyebrow text-primary">Keep exploring</p>
          <ul className="mt-5 space-y-3">
            {related.map((item) => <li key={item.slug}>
              <Link to="/explore/casinos/$slug" params={{ slug: item.slug }} className="font-display text-xl hover:text-primary">{item.shortTitle} →</Link>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.location}</p>
            </li>)}
          </ul>
          <Link to="/explore/casinos" className="mt-7 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary">All gaming getaway guides</Link>
        </div>
        <div className="mt-7 border-t border-border pt-6">
          <h3 className="font-display text-2xl">Around Texas</h3>
          <ul className="mt-4 space-y-3 text-sm font-semibold text-primary">
            <li><Link to="/road-trips" className="underline">Texas road-trip ideas</Link></li>
            <li><Link to="/explore/trip-planner" className="underline">Plan the journey</Link></li>
            <li><Link to="/browse/cities" className="underline">Find Texas cities</Link></li>
          </ul>
        </div>
      </aside>
    </Container>
    {guide.slug !== "texas-gaming-laws" && guide.slug !== "naskila-resort-leggett" && (
      <Container className="pb-10">
        <section aria-label="Plan your hotel stay" className="border-t border-border pt-8">
          <h2 className="font-display text-3xl">Planning to stay overnight?</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
            Compare rooms for the actual city and dates of your trip. Not every tribal gaming stop has a hotel on site; for Louisiana and Oklahoma resorts, remember that the stay is outside Texas.
          </p>
          <div data-stay-nearby-slot className="mt-5" />
        </section>
      </Container>
    )}
    <Container className="pb-10"><p className="border-t border-border pt-6 text-xs leading-6 text-muted-foreground">Independent travel information, not legal advice or a gambling offer. Casino games can result in financial loss. TexasDefined may earn a commission on qualifying hotel bookings, at no additional cost to you; it provides no betting services or gambling transactions.</p></Container>
  </main>;
}
