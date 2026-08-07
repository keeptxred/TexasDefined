import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const description = "Texas Defined is a lifestyle magazine about the places, food, history, homes, traditions and people that make this state feel like nowhere else.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath: "/about", title: "About Texas Defined", description }),
    links: [canonicalLink(texasDefinedBrand, "/about")],
    scripts: [jsonLd({ "@context": "https://schema.org", "@graph": [
      { "@type": "AboutPage", "@id": `${absoluteUrl(texasDefinedBrand, "/about")}#page`, url: absoluteUrl(texasDefinedBrand, "/about"), name: "About Texas Defined", description, isPartOf: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#website` }, about: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#organization` } },
      { "@type": "BreadcrumbList", "@id": `${absoluteUrl(texasDefinedBrand, "/about")}#breadcrumb`, itemListElement: [{ "@type": "ListItem", position: 1, name: "Front page", item: absoluteUrl(texasDefinedBrand, "/") }, { "@type": "ListItem", position: 2, name: "About Texas Defined", item: absoluteUrl(texasDefinedBrand, "/about") }] },
    ] })],
  }),
  component: AboutPage,
});

const PRINCIPLES = [
  { title: "Start with a real question", body: "Where is the drive worth taking? What should you know before you go? What does it really cost to live here? Our best stories begin with questions readers actually need answered." },
  { title: "Keep Texas life at the center", body: "We cover the everyday experience of Texas — its landscapes, food, homes, history, communities and traditions — without forcing every subject into the same frame." },
  { title: "Name the people and places", body: "Specific details make a story useful. We tell you the town, the route, the season, the local business or the original source behind the information whenever we can." },
  { title: "Be useful without being dull", body: "A practical guide can still be a good read. We aim for clear answers, warm writing and enough detail to help readers make a plan with confidence." },
];

function AboutPage() {
  return <>
    <section className="border-b border-border bg-surface">
      <Container className="py-20 sm:py-28">
        <p className="eyebrow text-primary">About the magazine</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">Texas is bigger than a list of places.</h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">{description}</p>
      </Container>
    </section>

    <Section>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div><p className="eyebrow text-primary">Our point of view</p><h2 className="mt-3 font-display text-4xl leading-tight">A magazine for people who want to know Texas better.</h2></div>
          <div className="max-w-2xl space-y-5 text-base leading-8 text-muted-foreground"><p>We are interested in the details that make a place memorable: the road into town, the season worth waiting for, the story behind a landmark, the food people drive across a county to eat, and the practical information that turns curiosity into a plan.</p><p>Texas Defined is built to be read like a magazine and used like a guidebook. The goal is not to cover everything. It is to make what we do cover worth your time.</p></div>
        </div>
      </Container>
    </Section>

    <Section tone="surface">
      <Container>
        <SectionHeader eyebrow="Editorial principles" title="What readers can expect" />
        <ol className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {PRINCIPLES.map((principle, index) => <li key={principle.title} className="border-t border-border pt-5"><p className="eyebrow text-muted-foreground">0{index + 1}</p><h2 className="mt-3 font-display text-2xl">{principle.title}</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{principle.body}</p></li>)}
        </ol>
      </Container>
    </Section>
  </>;
}
