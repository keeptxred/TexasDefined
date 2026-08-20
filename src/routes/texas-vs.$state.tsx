import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { texasVsStateName } from "@/data/texas-vs-states";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

export const Route = createFileRoute("/texas-vs/$state")({
  loader: ({ params }) => {
    const name = texasVsStateName(params.state);
    if (!name) throw notFound();
    return { name, slug: params.state };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const canonicalPath = `/texas-vs/${loaderData.slug}`;
    const title = `Texas vs ${loaderData.name}: Cost, Taxes, Jobs, Climate & Living`;
    const description = `Compare Texas with ${loaderData.name} across taxes, housing, jobs, cost of living, climate, transportation and everyday life, with links to current official data.`;
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title, description }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "WebPage", "@id": `${pageUrl}#page`, url: pageUrl, name: title, description, dateModified: "2026-08-20", isPartOf: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#website` } },
          { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Texas Defined", item: absoluteUrl(texasDefinedBrand, "/") },
            { "@type": "ListItem", position: 2, name: "Texas vs Every State", item: absoluteUrl(texasDefinedBrand, "/texas-vs-every-state") },
            { "@type": "ListItem", position: 3, name: `Texas vs ${loaderData.name}`, item: pageUrl },
          ] },
        ],
      })],
    };
  },
  component: TexasVsStatePage,
});

function TexasVsStatePage() {
  const { name, slug } = Route.useLoaderData();
  const gatewayHref = slug === "california"
    ? "/article/texas-vs-california-differences"
    : slug === "florida"
      ? "/article/texas-vs-florida-differences"
      : null;
  const gatewayLabel = slug === "california"
    ? "Texas vs California: 30 differences you notice fast"
    : slug === "florida"
      ? "Texas vs Florida: 25 differences that matter in real life"
      : null;

  const sections = [
    { heading: "Taxes", body: `Texas has no individual state income tax, but that single fact does not determine whether a household pays less overall than it would in ${name}. Compare income taxes, sales taxes, property taxes and the taxes that apply to your actual household and location.` },
    { heading: "Housing and cost of living", body: `Statewide averages can hide large local differences. Compare the Texas city or county you would actually choose with the ${name} community you would actually choose, including home prices or rent, insurance, utilities, property taxes and transportation costs.` },
    { heading: "Jobs and pay", body: `A useful Texas-versus-${name} job comparison looks at occupation-specific wages, unemployment, major industries and openings in the metro areas that match your career. State averages are a starting point, not the whole decision.` },
    { heading: "Climate and geography", body: `Texas ranges from humid Gulf Coast and Piney Woods to Hill Country, plains, desert and mountains. Compare the part of Texas you are considering with the actual part of ${name} you would live in, including heat, cold, severe weather, water access and outdoor recreation.` },
    { heading: "Transportation and daily life", body: `Driving distances, transit, airport access and commute patterns can materially change daily costs. Texas is large, so Dallas-Fort Worth, Houston, Austin, San Antonio, El Paso and rural Texas can produce very different living experiences.` },
    { heading: "Culture and fit", body: `The final choice is not purely financial. Family ties, schools, recreation, food, sports, pace of life and access to the places you value can outweigh a modest difference in taxes or housing costs between Texas and ${name}.` },
  ] as const;

  return <main>
    <section className="border-b border-border bg-muted/30 py-14 md:py-20"><Container><p className="eyebrow text-primary">Texas compared</p><h1 className="mt-3 max-w-5xl font-display text-5xl leading-none md:text-7xl">Texas vs {name}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">A practical side-by-side framework for comparing Texas with {name}, focused on the factors that most often change a real household decision.</p>{gatewayHref && gatewayLabel ? <p className="mt-5"><Link to={gatewayHref} className="font-semibold text-primary underline decoration-primary/40 underline-offset-4">{gatewayLabel} →</Link></p> : null}</Container></section>

    <section className="py-12 md:py-16"><Container><div className="max-w-4xl divide-y divide-border">{sections.map((section, index) => <section key={section.heading} className="py-8 first:pt-0"><p className="eyebrow text-muted-foreground">{String(index + 1).padStart(2, "0")}</p><h2 className="mt-2 font-display text-3xl md:text-4xl">{section.heading}</h2><p className="mt-4 leading-8 text-muted-foreground">{section.body}</p></section>)}<section className="py-8"><h2 className="font-display text-3xl md:text-4xl">Check current numbers before deciding</h2><p className="mt-4 leading-8 text-muted-foreground">Housing costs, wages, unemployment and tax rules change. Use current public data for the numbers, then use Texas Defined's city, county and calculator tools to translate statewide averages into the place you would actually live.</p><div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm"><a href="https://www.census.gov/quickfacts/" target="_blank" rel="noreferrer" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4">U.S. Census QuickFacts ↗</a><a href="https://www.bls.gov/" target="_blank" rel="noreferrer" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4">U.S. Bureau of Labor Statistics ↗</a><Link to="/texas-cost-of-living-calculator" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4">Texas cost-of-living calculator</Link></div></section></div></Container></section>

    <section className="border-t border-border bg-muted/30 py-10"><Container><div className="flex flex-wrap gap-x-7 gap-y-3 text-sm"><Link to="/texas-vs-every-state" className="font-semibold text-primary">All 49 state comparisons</Link><Link to="/moving-to-texas" className="font-semibold text-primary">Moving to Texas</Link><Link to="/article/things-nobody-tells-you-before-moving-to-texas" className="font-semibold text-primary">31 moving-to-Texas surprises</Link><Link to="/browse/cities" className="font-semibold text-primary">Texas city guides</Link><Link to="/browse/counties" className="font-semibold text-primary">Texas county guides</Link></div></Container></section>
  </main>;
}
