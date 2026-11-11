import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { GottfriedFluryAuthority } from "@/components/editorial/GottfriedFluryAuthority";
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
    const isFlury = person.slug === "gottfried-flury";
    const description = isFlury
      ? "Gottfried (Godfrey) Flury painted St. Mary’s Church in Praha in 1895. Read about his life in Texas, the church’s artwork and the sources behind his story."
      : `${person.name}: documented role in the Texas Painted Churches, connected churches, techniques, sources and historical significance.`;
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title: isFlury ? "Gottfried (Godfrey) Flury | Praha Painted Church Artist" : `${person.name} | Texas Painted Churches`, description }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "WebPage", "@id": `${pageUrl}#webpage`, url: pageUrl, name: isFlury ? "Gottfried (Godfrey) Flury | Praha Painted Church Artist" : `${person.name} | Texas Painted Churches`, description, mainEntity: { "@id": `${pageUrl}#person` }, ...(isFlury ? { author: { "@type": "Organization", name: "Texas Defined History & Heritage Desk", url: `${siteUrl}/about` }, dateModified: "2026-11-11", citation: ["https://www.tshaonline.org/handbook/entries/flury-godfrey", "https://austinpbs.org/paintedchurches/praha", "https://atlas.thc.texas.gov/Details?atlasnumber=2083003138", "https://npgallery.nps.gov/AssetDetail/NRIS/83003138", "https://w3.biosci.utexas.edu/prc/Sabal/Praha-hist.html", "https://austinpbs.org/paintedchurches/highhill", "https://austinpbs.org/paintedchurches/filmupdates"] } : {}) },
          { "@type": "Person", "@id": `${pageUrl}#person`, name: person.name, alternateName: isFlury ? "Godfrey Flury" : undefined, birthDate: isFlury ? "1864-07-06" : undefined, deathDate: isFlury ? "1936-10-28" : undefined, birthPlace: isFlury ? { "@type": "Place", name: "Oensingen, Switzerland" } : undefined, hasOccupation: isFlury ? ["Decorative painter", "Commercial artist"] : undefined, url: pageUrl, description: person.answer, mainEntityOfPage: { "@id": `${pageUrl}#webpage` }, sameAs: isFlury ? ["https://www.tshaonline.org/handbook/entries/flury-godfrey"] : undefined, subjectOf: person.churchSlugs.map((slug) => `${siteUrl}/explore/painted-churches/${slug}`), knowsAbout: person.techniqueSlugs?.map((slug) => `${siteUrl}/explore/painted-churches/techniques/${slug}`) },
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
          {person.slug === "gottfried-flury" && (
            <p className="mt-5 max-w-4xl text-sm leading-7 text-muted-foreground">
              Research by <Link to="/about" className="underline underline-offset-2">Texas Defined History &amp; Heritage Desk</Link>
              {" · "}Published sources and archive catalogs cross-checked November 10, 2026; botanical and inter-church research sources cross-checked November 11, 2026
            </p>
          )}
        </Container>
      </section>
      <Container className="py-14 sm:py-18">
        {person.slug !== "gottfried-flury" && <section className="border-t-2 border-foreground pt-8"><p className="eyebrow text-primary">Why this person matters</p><ul className="mt-5 list-disc space-y-3 pl-5 text-base leading-8 text-muted-foreground">{person.significance.map((item) => <li key={item}>{item}</li>)}</ul></section>}
        {person.slug === "gottfried-flury" && <GottfriedFluryAuthority />}
        <section className="mt-14 border-t border-border pt-8"><p className="eyebrow text-primary">Connected churches</p><div className="mt-7 grid gap-px border border-border bg-border md:grid-cols-2">{churches.map((church) => <article key={church.slug} className="bg-background p-6"><p className="eyebrow text-muted-foreground">{church.city} · {church.county} County</p><h2 className="mt-2 font-display text-2xl"><Link to="/explore/painted-churches/$slug" params={{ slug: church.slug }} className="hover:text-primary">{church.shortName}</Link></h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{church.summary}</p></article>)}</div></section>
        {person.techniqueSlugs?.length ? <section className="mt-14 border-t border-border pt-8"><p className="eyebrow text-primary">Related techniques</p><div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm">{person.techniqueSlugs.map((slug) => <Link key={slug} to="/explore/painted-churches/techniques/$slug" params={{ slug }} className="border-b border-primary text-primary">{paintedChurchTechniqueBySlug.get(slug as any)?.name ?? slug}</Link>)}</div></section> : null}
        {person.slug !== "gottfried-flury" && <section className="mt-14 border-t border-border pt-8"><p className="eyebrow text-primary">Source trail</p><a href={person.sourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-block font-display text-2xl text-primary hover:underline">{person.sourceLabel}</a></section>}
      </Container>
    </main>
  );
}
