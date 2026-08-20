import { createFileRoute, Link } from "@tanstack/react-router";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { OTHER_STATES } from "@/data/texas-vs-states";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const description = "Compare Texas with every other U.S. state through 49 dedicated state-by-state guides covering taxes, housing, jobs, climate, geography, travel and everyday life.";
const path = "/texas-vs";
const url = absoluteUrl(texasDefinedBrand, path);

export const Route = createFileRoute("/texas-vs")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath: path, title: "Texas vs Every Other State: 49 State-by-State Comparisons", description }),
    links: [canonicalLink(texasDefinedBrand, path)],
    scripts: [jsonLd({ "@context": "https://schema.org", "@type": "ItemList", name: "Texas versus every other U.S. state", numberOfItems: OTHER_STATES.length, itemListElement: OTHER_STATES.map(([name, slug], index) => ({ "@type": "ListItem", position: index + 1, url: absoluteUrl(texasDefinedBrand, `/texas-vs/${slug}`), name: `Texas vs ${name}` })) })],
  }),
  component: Page,
});

function Page() {
  return <main>
    <section className="border-b border-border bg-muted/30 py-14 md:py-20"><Container><p className="eyebrow text-primary">Texas Comparisons</p><h1 className="mt-3 max-w-5xl font-display text-5xl leading-none md:text-7xl">Texas vs Every Other State</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{description}</p></Container></section>
    <section className="py-12 md:py-16"><Container><div className="max-w-4xl"><h2 className="font-display text-3xl md:text-4xl">Choose a state to compare with Texas</h2><p className="mt-4 leading-8 text-muted-foreground">Each comparison uses the same decision framework so readers can evaluate the differences that actually matter: taxes, housing, cost of living, labor market, climate, geography, transportation and culture. Official federal and state data links are included where current numbers matter.</p><div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3">{OTHER_STATES.map(([name, slug]) => <Link key={slug} to="/texas-vs/$state" params={{ state: slug }} className="border-t border-border py-4 font-display text-xl hover:text-primary sm:px-4">Texas vs {name} →</Link>)}</div></div></Container></section>
    <section className="border-t border-border bg-muted/30 py-10"><Container><div className="flex flex-wrap gap-x-7 gap-y-3 text-sm"><Link to="/moving-to-texas" className="font-semibold text-primary underline underline-offset-4">Moving to Texas</Link><Link to="/texas-cost-of-living-calculator" className="font-semibold text-primary underline underline-offset-4">Texas cost of living calculator</Link><Link to="/texas-salary-comparison-by-city" className="font-semibold text-primary underline underline-offset-4">Texas salary comparison</Link></div></Container></section>
  </main>;
}
