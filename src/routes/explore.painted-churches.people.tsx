import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { paintedChurchPeople } from "@/data/painted-church-people";
import { buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/painted-churches/people";
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}${canonicalPath}`;
const description = "Authoritative profiles of the architects, artists, decorators, restorers and researchers connected to the Texas Painted Churches.";

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: "Texas Painted Church Artists, Architects & Researchers", description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "CollectionPage", "@id": `${pageUrl}#page`, url: pageUrl, name: "Texas Painted Church people", description, mainEntity: { "@id": `${pageUrl}#people` } },
        { "@type": "ItemList", "@id": `${pageUrl}#people`, numberOfItems: paintedChurchPeople.length, itemListElement: paintedChurchPeople.map((person, index) => ({ "@type": "ListItem", position: index + 1, item: { "@type": "Person", name: person.name, url: `${pageUrl}/${person.slug}`, description: person.answer } })) },
      ],
    })],
  }),
  component: PeopleHub,
});

function PeopleHub() {
  return <main><section className="border-b border-border bg-surface"><Container className="py-16 sm:py-24"><nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap gap-2"><li><Link to="/">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches">Painted Churches</Link></li><li aria-hidden>·</li><li aria-current="page">People</li></ol></nav><p className="eyebrow mt-8 text-primary">People behind the churches</p><h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">Artists, architects, restorers and researchers.</h1><p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">Texas Defined treats named people as authority entities, not footnotes. Each profile separates documented architecture, original decoration, later restoration and historical research so credit is not flattened into a single “artist” label.</p></Container></section><Container className="py-14 sm:py-18"><section className="grid gap-px border border-border bg-border md:grid-cols-2">{paintedChurchPeople.map((person) => <article key={person.slug} className="bg-background p-7"><p className="eyebrow text-primary">{person.roles.join(" · ")}</p><h2 className="mt-3 font-display text-3xl"><Link to="/explore/painted-churches/people/$slug" params={{ slug: person.slug }} className="hover:text-primary">{person.name}</Link></h2><p className="mt-4 text-sm leading-7 text-muted-foreground">{person.answer}</p><p className="mt-4 text-xs leading-6 text-muted-foreground">Connected churches: {person.churchSlugs.length}</p><Link to="/explore/painted-churches/people/$slug" params={{ slug: person.slug }} className="eyebrow mt-5 inline-block border-b border-primary text-primary">Open authoritative profile</Link></article>)}</section></Container></main>;
}
