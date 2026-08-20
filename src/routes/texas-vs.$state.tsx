import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { stateNameFromSlug } from "@/data/texas-vs-states";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

export const Route = createFileRoute("/texas-vs/$state")({
  loader: ({ params }) => { const name = stateNameFromSlug(params.state); if (!name) throw notFound(); return { name, slug: params.state }; },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const path = `/texas-vs/${loaderData.slug}`;
    const title = `Texas vs ${loaderData.name}: Cost, Taxes, Jobs, Climate & Living`;
    const description = `Compare Texas with ${loaderData.name} across taxes, housing, jobs, cost of living, climate, geography, transportation and everyday life, with links to current official data.`;
    const url = absoluteUrl(texasDefinedBrand, path);
    return { meta: buildMeta(texasDefinedBrand, { canonicalPath: path, title, description }), links: [canonicalLink(texasDefinedBrand, path)], scripts: [jsonLd({ "@context": "https://schema.org", "@type": "WebPage", url, name: title, description, isPartOf: { "@id": `${absoluteUrl(texasDefinedBrand, "/texas-vs")}#page` } })] };
  },
  component: Page,
});

function Page() {
  const { name } = Route.useLoaderData();
  const sections = [
    ["Taxes", `Texas has no individual state income tax, but that does not make every Texas household's total tax burden lower than ${name}. Compare income taxes, sales taxes, property taxes and the taxes that apply to your actual household rather than relying on one headline rate.`],
    ["Housing and cost of living", `Home prices, rents, insurance, utilities, property taxes and transportation can differ far more by metro area than a statewide average suggests. Compare the Texas city you would actually live in with the ${name} city you would actually choose.`],
    ["Jobs and pay", `A useful Texas-versus-${name} job comparison looks at occupation-specific wages, unemployment, industry mix and the number of openings in the metro areas that fit your career. Statewide averages can hide very different local labor markets.`],
    ["Climate and geography", `Texas spans humid Gulf Coast, Piney Woods, Hill Country, plains, desert and mountain environments. Compare the part of Texas you are considering with the actual part of ${name} you would live in, including heat, cold, severe weather, water access and outdoor recreation.`],
    ["Transportation and daily life", `Driving distances, transit availability, airport access, commute patterns and neighborhood form can change the practical cost of living. Texas is large, so a Dallas-area experience can be very different from Houston, Austin, San Antonio, El Paso or a rural county.`],
    ["Culture and fit", `The final decision is not purely financial. Family ties, schools, recreation, food, sports, politics, pace of life and access to the places you value can outweigh a modest difference in taxes or housing costs.`],
  ] as const;
  return <main>
    <section className="border-b border-border bg-muted/30 py-14 md:py-20"><Container><p className="eyebrow text-primary">Texas Comparisons</p><h1 className="mt-3 max-w-5xl font-display text-5xl leading-none md:text-7xl">Texas vs {name}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">A practical side-by-side framework for deciding between Texas and {name}, focused on the categories that most often change a household's real-world choice.</p></Container></section>
    <section className="py-12 md:py-16"><Container><div className="max-w-4xl divide-y divide-border">{sections.map(([heading, body], index) => <section key={heading} className="py-8 first:pt-0"><p className="eyebrow text-muted-foreground">{String(index + 1).padStart(2, "0")}</p><h2 className="mt-2 font-display text-3xl md:text-4xl">{heading}</h2><p className="mt-4 leading-8 text-muted-foreground">{body}</p></section>)}<section className="py-8"><h2 className="font-display text-3xl md:text-4xl">Check current numbers before deciding</h2><p className="mt-4 leading-8 text-muted-foreground">Tax rules, housing costs, wages and unemployment change. Use current official sources for the numeric comparison, then use Texas Defined's calculators and city/county guides to translate statewide data into the place you would actually live.</p><div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm"><a href="https://www.census.gov/quickfacts/" target="_blank" rel="noreferrer" className="font-semibold text-primary underline underline-offset-4">U.S. Census QuickFacts ↗</a><a href="https://www.bls.gov/" target="_blank" rel="noreferrer" className="font-semibold text-primary underline underline-offset-4">U.S. Bureau of Labor Statistics ↗</a><Link to="/texas-cost-of-living-calculator" className="font-semibold text-primary underline underline-offset-4">Texas cost of living calculator</Link></div></section></div></Container></section>
    <section className="border-t border-border bg-muted/30 py-10"><Container><div className="flex flex-wrap gap-x-7 gap-y-3 text-sm"><Link to="/texas-vs" className="font-semibold text-primary underline underline-offset-4">All 49 Texas comparisons</Link><Link to="/moving-to-texas" className="font-semibold text-primary underline underline-offset-4">Moving to Texas</Link><Link to="/browse/cities" className="font-semibold text-primary underline underline-offset-4">Compare Texas cities</Link><Link to="/browse/counties" className="font-semibold text-primary underline underline-offset-4">Texas county guides</Link></div></Container></section>
  </main>;
}
