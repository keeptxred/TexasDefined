import { Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import type { TexasEvergreenGuide } from "@/data/texas-evergreen-guides";

const siteUrl = "https://texasdefined.com";
type SourceNote = { label: string; href: string; note: string };

const citySources: Record<string, readonly SourceNote[]> = {
  "texas-music-cities": [
    { label: "Handbook of Texas Music", href: "https://www.tshaonline.org/handbook/projects/texas-music", note: "Statewide scholarly collection documenting Texas genres, musicians, venues, recording and regional scenes." },
    { label: "Center for Texas Music History", href: "https://www.txst.edu/ctmh/", note: "Texas State University research center focused on the music history of Texas and the Southwest." },
  ],
  "austin-music-history": [
    { label: "Handbook of Texas — Country Music", href: "https://www.tshaonline.org/handbook/entries/country-music", note: "Documents Austin's 1970s progressive-country movement, its mixed audiences and key venues." },
    { label: "Handbook of Texas — Austin City Limits", href: "https://www.tshaonline.org/handbook/entries/austin-city-limits", note: "Documents the program's 1974–76 origins and connection to Austin's progressive-country scene." },
    { label: "Handbook of Texas — Antone's", href: "https://www.tshaonline.org/handbook/entries/antones", note: "Documents Clifford Antone's blues club and its role in Austin's live-music identity." },
  ],
  "houston-music-history": [
    { label: "Handbook of Houston — Music", href: "https://www.tshaonline.org/handbook/projects/houston/place/houston/category/music", note: "TSHA's city-specific collection covering Houston musicians, genres, venues and music businesses." },
    { label: "Handbook of Texas — Duke-Peacock Records", href: "https://www.tshaonline.org/handbook/entries/duke-peacock-records", note: "Documents Don Robey's Houston labels and their national role in blues, R&B, gospel and soul." },
    { label: "Handbook of Texas — Rap and Hip-Hop", href: "https://www.tshaonline.org/handbook/entries/rap-and-hip-hop", note: "Documents Houston rap, DJ Screw, chopped-and-screwed music and later independent networks." },
  ],
  "san-antonio-music-history": [
    { label: "Handbook of Texas — Texas-Mexican Conjunto", href: "https://www.tshaonline.org/handbook/entries/texas-mexican-conjunto", note: "Documents the borderland development of conjunto and its accordion-and-bajo-sexto foundation." },
    { label: "Handbook of Texas — West Side Sound", href: "https://www.tshaonline.org/handbook/entries/west-side-sound", note: "Documents San Antonio's intercultural R&B, rock-and-roll, conjunto and country hybrid beginning in the late 1950s." },
  ],
  "lubbock-music-history": [
    { label: "Handbook of Texas — Buddy Holly", href: "https://www.tshaonline.org/handbook/entries/holley-charles-hardin-buddy-holly", note: "Documents Holly's Lubbock upbringing, local radio work and early musical development." },
    { label: "Handbook of Texas — The Crickets", href: "https://www.tshaonline.org/handbook/entries/crickets", note: "Documents the Lubbock formation and early history of the Crickets." },
    { label: "Handbook of Texas — Recording Industry", href: "https://www.tshaonline.org/handbook/entries/recording-industry", note: "Places Lubbock and West Texas musicians inside the regional recording network that helped launch early rock and roll." },
  ],
  "dallas-fort-worth-music-history": [
    { label: "Handbook of Texas — Deep Ellum", href: "https://www.tshaonline.org/handbook/entries/deep-ellum", note: "Documents the Dallas district's Black commercial, blues and jazz history." },
    { label: "Handbook of Texas — Blues", href: "https://www.tshaonline.org/handbook/entries/blues", note: "Documents Deep Ellum, Central Track and the Dallas musicians central to early Texas blues." },
    { label: "Handbook of Texas — Jazz", href: "https://www.tshaonline.org/handbook/entries/jazz", note: "Documents Fort Worth's Ornette Coleman network and its importance to modern jazz." },
    { label: "Handbook of Texas — Recording Industry", href: "https://www.tshaonline.org/handbook/entries/recording-industry", note: "Documents early Dallas recording studios and North Texas country, R&B and rockabilly recording activity." },
  ],
};

export function TexasMusicCityGuide({ guide }: { guide: TexasEvergreenGuide }) {
  const canonicalUrl = `${siteUrl}/${guide.slug}`;
  const sources = citySources[guide.slug] ?? [];
  const isHub = guide.slug === "texas-music-cities";
  const breadcrumbs = [
    { "@type": "ListItem", position: 1, name: "Front page", item: `${siteUrl}/` },
    { "@type": "ListItem", position: 2, name: "Texas Music", item: `${siteUrl}/texas-music` },
    ...(isHub ? [] : [{ "@type": "ListItem", position: 3, name: "Texas Music Cities", item: `${siteUrl}/texas-music-cities` }]),
    { "@type": "ListItem", position: isHub ? 3 : 4, name: guide.title, item: canonicalUrl },
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Article", "@id": `${canonicalUrl}#article`, headline: guide.title, description: guide.dek, url: canonicalUrl, mainEntityOfPage: { "@id": `${canonicalUrl}#page` }, publisher: { "@type": "Organization", name: "TexasDefined", url: siteUrl }, articleSection: "Texas Music", citation: sources.map((source) => source.href), isPartOf: { "@type": "CollectionPage", "@id": `${siteUrl}/texas-music#collection`, name: "Texas Music", url: `${siteUrl}/texas-music` }, about: guide.sections.map((section) => ({ "@type": "Thing", name: section.heading })) },
      { "@type": "WebPage", "@id": `${canonicalUrl}#page`, url: canonicalUrl, name: guide.title, description: guide.dek, isPartOf: { "@type": "WebSite", "@id": `${siteUrl}/#website`, name: "TexasDefined", url: siteUrl }, breadcrumb: { "@id": `${canonicalUrl}#breadcrumb` }, mainEntity: { "@id": `${canonicalUrl}#article` } },
      { "@type": "BreadcrumbList", "@id": `${canonicalUrl}#breadcrumb`, itemListElement: breadcrumbs },
    ],
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <Container className="pb-16 pt-10 sm:pb-24 sm:pt-14">
      <article className="mx-auto max-w-5xl">
        <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Front page</Link><span aria-hidden="true" className="mx-2">/</span>
          <Link to="/texas-music" className="hover:text-foreground">Texas Music</Link>
          {!isHub ? <><span aria-hidden="true" className="mx-2">/</span><Link to="/texas-music-cities" className="hover:text-foreground">Music Cities</Link></> : null}
          <span aria-hidden="true" className="mx-2">/</span><span aria-current="page" className="text-foreground">{isHub ? "Music Cities" : guide.title}</span>
        </nav>
        <header className="border-b border-border py-10 sm:py-14">
          <p className="eyebrow text-primary">{guide.eyebrow}</p><h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">{guide.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">{guide.dek}</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold"><Link to="/texas-music" className="border-b border-primary pb-1 text-primary">Explore the full Texas Music collection →</Link>{!isHub ? <Link to="/texas-music-cities" className="border-b border-primary pb-1 text-primary">Compare Texas music cities →</Link> : null}</div>
        </header>
        <section className="border-b border-border py-8" aria-labelledby="quick-answer"><p className="eyebrow text-primary">Quick answer</p><h2 id="quick-answer" className="mt-2 font-display text-3xl">The short version</h2><p className="mt-4 max-w-4xl text-base leading-8">{guide.quickAnswer}</p></section>
        <div>{guide.sections.map((section, index) => <section key={section.heading} className="grid gap-6 border-b border-border py-10 lg:grid-cols-[12rem_minmax(0,1fr)]"><div><p className="eyebrow text-primary">{String(index + 1).padStart(2, "0")}</p><h2 className="mt-2 font-display text-3xl leading-tight">{section.heading}</h2></div><div className="max-w-3xl space-y-5">{section.body.map((paragraph) => <p key={paragraph} className="text-base leading-8 text-muted-foreground">{paragraph}</p>)}{section.bullets?.length ? <ul className="grid gap-3 border-l border-primary/40 pl-5 text-sm leading-7">{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}{section.links?.length ? <div className="flex flex-wrap gap-x-6 gap-y-3 pt-1 text-sm font-semibold">{section.links.map((link) => <Link key={link.href} to={link.href} className="border-b border-primary text-primary">{link.label}</Link>)}</div> : null}</div></section>)}</div>
        <section className="border-b border-border py-10" aria-labelledby="city-source-notes"><p className="eyebrow text-primary">Source notes</p><h2 id="city-source-notes" className="mt-2 font-display text-3xl">Historical authority behind this guide</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Historical framing is anchored to scholarly and institutional Texas music sources. The pages focus on durable history rather than changing concert calendars, ticketing or nightlife listings.</p><ul className="mt-6 divide-y divide-border border-y border-border">{sources.map((source) => <li key={source.href} className="py-4"><a href={source.href} target="_blank" rel="noreferrer noopener" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4">{source.label} ↗</a><p className="mt-1 text-sm leading-6 text-muted-foreground">{source.note}</p></li>)}</ul></section>
        <section className="py-12" aria-labelledby="related-reading"><p className="eyebrow text-primary">Keep exploring</p><h2 id="related-reading" className="mt-2 font-display text-4xl">Related TexasDefined guides</h2><div className="mt-6 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">{guide.related.map((item) => <Link key={item.href} to={item.href} className="group bg-background p-6"><strong className="font-display text-2xl leading-tight group-hover:text-primary">{item.label}</strong><span className="mt-3 block text-sm leading-6 text-muted-foreground">{item.description}</span><span className="mt-5 block text-sm font-semibold text-primary">Read next →</span></Link>)}</div></section>
      </article>
    </Container>
  </>;
}
