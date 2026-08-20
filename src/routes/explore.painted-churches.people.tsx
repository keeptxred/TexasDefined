import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { paintedChurchContributors } from "@/data/painted-church-contributors";
import { buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/painted-churches/people";
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}${canonicalPath}`;
const description = "Authoritative profiles of the architects, builders, artists, decorative firms, restorers, conservators and researchers connected to the Texas Painted Churches.";

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: "Texas Painted Church Artists, Architects, Builders & Conservators", description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "CollectionPage", "@id": `${pageUrl}#page`, url: pageUrl, name: "Texas Painted Church contributors", description, mainEntity: { "@id": `${pageUrl}#contributors` } },
        { "@type": "ItemList", "@id": `${pageUrl}#contributors`, numberOfItems: paintedChurchContributors.length, itemListElement: paintedChurchContributors.map((contributor, index) => ({ "@type": "ListItem", position: index + 1, item: { "@type": contributor.kind === "organization" ? "Organization" : "Person", name: contributor.name, url: `${pageUrl}/${contributor.slug}`, description: contributor.answer } })) },
      ],
    })],
  }),
  component: PeopleHub,
});

function PeopleHub() {
  return <main><section className="border-b border-border bg-surface"><Container className="py-16 sm:py-24"><nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap gap-2"><li><Link to="/">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches">Painted Churches</Link></li><li aria-hidden>·</li><li aria-current="page">People & studios</li></ol></nav><p className="eyebrow mt-8 text-primary">People and firms behind the churches</p><h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">Architects, builders, artists, studios, restorers and researchers.</h1><p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">Texas Defined separates design, construction, original decoration, later campaigns, conservation and research. Firms such as Oidtmann Studios and Schnoor Company are modeled as organizations rather than incorrectly presented as people, while source conflicts such as the Wahrenberger initial at Shiner remain visible.</p></Container></section><Container className="py-14 sm:py-18"><section className="grid gap-px border border-border bg-border md:grid-cols-2">{paintedChurchContributors.map((person) => <article key={person.slug} className="bg-background p-7"><p className="eyebrow text-primary">{person.kind} · {person.roles.join(" · ")}</p><h2 className="mt-3 font-display text-3xl"><Link to="/explore/painted-churches/people/$slug" params={{ slug: person.slug }} className="hover:text-primary">{person.name}</Link></h2><p className="mt-4 text-sm leading-7 text-muted-foreground">{person.answer}</p>{person.attributionNote ? <p className="mt-4 border-l-2 border-primary pl-4 text-xs leading-6 text-muted-foreground">Attribution note: {person.attributionNote}</p> : null}<p className="mt-4 text-xs leading-6 text-muted-foreground">Connected churches: {person.churchSlugs.length} · Sources: {person.sources.length}</p><Link to="/explore/painted-churches/people/$slug" params={{ slug: person.slug }} className="eyebrow mt-5 inline-block border-b border-primary text-primary">Open authoritative profile</Link></article>)}</section></Container></main>;
}
