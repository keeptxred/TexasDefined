import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { paintedChurchPersonBySlug } from "@/data/painted-church-people";
import { paintedChurchTechniqueBySlug } from "@/data/painted-church-techniques";
import { expandedPaintedChurches } from "@/data/painted-churches-expanded";
import { buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;

export const Route = createFileRoute("/explore/painted-churches/people/$slug")({
  loader: ({ params }) => {
    const person = paintedChurchPersonBySlug.get(params.slug);
    if (!person) throw notFound();
    return { person };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Painted Church person unavailable" }, { name: "robots", content: "noindex, nofollow" }] };
    const { person } = loaderData;
    const canonicalPath = `/explore/painted-churches/people/${params.slug}`;
    const pageUrl = `${siteUrl}${canonicalPath}`;
    const description = `${person.name}: documented role in the Texas Painted Churches, connected churches, techniques, sources and historical significance.`;
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title: `${person.name} | Texas Painted Churches`, description }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "Person", "@id": `${pageUrl}#person`, name: person.name, url: pageUrl, description: person.answer, sameAs: person.sourceUrl, subjectOf: person.churchSlugs.map((slug) => `${siteUrl}/explore/painted-churches/${slug}`), knowsAbout: person.techniqueSlugs?.map((slug) => `${siteUrl}/explore/painted-churches/techniques/${slug}`) },
          { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
            { "@type": "ListItem", position: 2, name: "Painted Churches", item: `${siteUrl}/explore/painted-churches` },
            { "@type": "ListItem", position: 3, name: "People", item: `${siteUrl}/explore/painted-churches/people` },
            { "@type": "ListItem", position: 4, name: person.name, item: pageUrl },
          ] },
        ],
      })],
    };
  },
  component: PersonPage,
});

function PersonPage() {
  const { person } = Route.useLoaderData();
  const churches = expandedPaintedChurches.filter((church) => person.churchSlugs.includes(church.slug));
  return (
    <main>
      <section className="border-b border-border bg-surface">
        <Container className="py-16 sm:py-24">
          <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap gap-2"><li><Link to="/">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches">Painted Churches</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches/people">People</Link></li><li aria-hidden>·</li><li aria-current="page">{person.name}</li></ol></nav>
          <p className="eyebrow mt-8 text-primary">{person.roles.join(" · ")}</p>
          <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">{person.name}</h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">{person.answer}</p>
        </Container>
      </section>
      <Container className="py-14 sm:py-18">
        <section className="border-t-2 border-foreground pt-8"><p className="eyebrow text-primary">Why this person matters</p><ul className="mt-5 list-disc space-y-3 pl-5 text-base leading-8 text-muted-foreground">{person.significance.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section className="mt-14 border-t border-border pt-8">
          <p className="eyebrow text-primary">How Texas Defined handles attribution</p>
          <div className="mt-5 max-w-4xl space-y-5 text-base leading-8 text-muted-foreground">
            <p>A name on a Painted Church page can represent very different work: architect, decorative painter, parish artist, later restorer, historian or researcher. Those roles are not interchangeable. Texas Defined keeps the role labels explicit and connects a person to a church only when the cited record supports that relationship.</p>
            <p>Attribution also needs a time layer. A surviving interior may combine original work with later repainting, conservation or reconstruction, so identifying a person does not mean that every visible surface can be assigned to that person. The linked church profile carries the narrower chronology and preservation evidence for the building itself.</p>
            <p>When the historical record is incomplete, this page stays within what the source can support rather than filling gaps from style alone. Follow the connected churches and related techniques to compare documented work, then use the source trail for research, citation or any claim that needs to distinguish original authorship from later intervention.</p>
          </div>
        </section>
        <section className="mt-14 border-t border-border pt-8"><p className="eyebrow text-primary">Connected churches</p><div className="mt-7 grid gap-px border border-border bg-border md:grid-cols-2">{churches.map((church) => <article key={church.slug} className="bg-background p-6"><p className="eyebrow text-muted-foreground">{church.city} · {church.county} County</p><h2 className="mt-2 font-display text-2xl"><Link to="/explore/painted-churches/$slug" params={{ slug: church.slug }} className="hover:text-primary">{church.shortName}</Link></h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{church.summary}</p></article>)}</div></section>
        {person.techniqueSlugs?.length ? <section className="mt-14 border-t border-border pt-8"><p className="eyebrow text-primary">Related techniques</p><div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm">{person.techniqueSlugs.map((slug) => <Link key={slug} to="/explore/painted-churches/techniques/$slug" params={{ slug }} className="border-b border-primary text-primary">{paintedChurchTechniqueBySlug.get(slug as any)?.name ?? slug}</Link>)}</div></section> : null}
        <section className="mt-14 border-t border-border pt-8"><p className="eyebrow text-primary">Source trail</p><a href={person.sourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-block font-display text-2xl text-primary hover:underline">{person.sourceLabel}</a><p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Texas Defined distinguishes original authorship, architecture, later restoration and research roles. A name is connected to a church only when a source supports the relationship.</p></section>
      </Container>
    </main>
  );
}
