import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { paintedChurchBibliography } from "@/data/painted-church-bibliography";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/painted-churches/bibliography";
const description = "The research bibliography behind Texas Defined's Painted Churches authority project: National Register records, Buie Harwood scholarship and archives, Austin PBS, modern field research and current books.";

export const Route = createFileRoute(canonicalPath)({
  head: () => {
    const url = absoluteUrl(texasDefinedBrand, canonicalPath);
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title: "Texas Painted Churches Bibliography & Research History", description, modifiedTime: "2026-08-19T22:00:00-05:00" }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "CollectionPage", "@id": `${url}#page`, url, name: "Texas Painted Churches bibliography and research history", description, mainEntity: { "@id": `${url}#bibliography` }, publisher: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#organization` } },
          { "@type": "ItemList", "@id": `${url}#bibliography`, numberOfItems: paintedChurchBibliography.length, itemListElement: paintedChurchBibliography.map((entry, index) => ({ "@type": "ListItem", position: index + 1, item: { "@type": "CreativeWork", name: entry.title, creator: entry.creator, datePublished: entry.year.match(/^\d{4}$/)?.[0], url: entry.url } })) },
          { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl(texasDefinedBrand, "/") },
            { "@type": "ListItem", position: 2, name: "Painted Churches", item: absoluteUrl(texasDefinedBrand, "/explore/painted-churches") },
            { "@type": "ListItem", position: 3, name: "Bibliography", item: url },
          ] },
        ],
      })],
    };
  },
  component: BibliographyPage,
});

function BibliographyPage() {
  const typeOrder = ["primary-register", "archive", "article", "book", "documentary", "official-history", "modern-research"] as const;
  return <main>
    <section className="border-b border-border bg-surface"><Container className="py-16 sm:py-24"><nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap gap-2"><li><Link to="/">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches">Painted Churches</Link></li><li aria-hidden>·</li><li aria-current="page">Bibliography</li></ol></nav><p className="eyebrow mt-8 text-primary">Research history</p><h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">The sources that built the Texas Painted Churches story.</h1><p className="mt-6 max-w-5xl text-lg leading-8 text-muted-foreground">A leading reference should show its intellectual lineage. This bibliography separates primary register documentation, archival collections, Buie Harwood's foundational scholarship, Austin PBS interpretation, modern field research and current books—and explains how Texas Defined uses each source rather than treating every citation as interchangeable.</p></Container></section>
    <Container className="py-14 sm:py-18">
      <section className="border-t-2 border-foreground pt-8"><p className="eyebrow text-primary">Quick answer</p><h2 className="mt-3 font-display text-4xl">The field did not begin with tourism lists.</h2><p className="mt-5 max-w-4xl text-base leading-8 text-foreground/90">The modern research lineage runs through state historic-survey work, Buie Harwood's decorative-painting scholarship, the 1982 National Register thematic nomination, later books and articles, Austin PBS's documentary/oral-history project and continuing statewide field research. Texas Defined's job is to reconnect those layers church by church.</p></section>
      {typeOrder.map((type) => { const items = paintedChurchBibliography.filter((entry) => entry.type === type); if (!items.length) return null; return <section key={type} className="mt-14 border-t border-border pt-8"><p className="eyebrow text-primary">{type.replaceAll("-", " ")}</p><div className="mt-7 grid gap-px border border-border bg-border md:grid-cols-2">{items.map((entry) => <article key={entry.id} className="bg-background p-6"><p className="eyebrow text-muted-foreground">{entry.year} · {entry.creator}</p><h2 className="mt-2 font-display text-2xl"><a href={entry.url} target="_blank" rel="noreferrer" className="hover:text-primary">{entry.title}</a></h2><p className="mt-4 text-sm leading-7 text-muted-foreground">{entry.use}</p>{entry.note ? <p className="mt-3 text-xs leading-6 text-muted-foreground">{entry.note}</p> : null}</article>)}</div></section>; })}
      <section className="mt-14 border-l-2 border-primary bg-surface p-6 sm:p-8"><p className="eyebrow text-primary">Pre-index research rule</p><h2 className="mt-3 font-display text-3xl">Current books are benchmarks and discovery tools—not unquestioned authorities.</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">Before public indexing, Texas Defined should review major current books and field research for church candidates, image leads and conflicting claims, then verify those claims against primary, parish, archival or scholarly records. The bibliography is designed to preserve that chain of custody.</p></section>
    </Container>
  </main>;
}
