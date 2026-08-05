import { createFileRoute } from "@tanstack/react-router";

import { useBrand } from "@/brand/context";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { NewsletterSignup } from "@/components/editorial/NewsletterSignup";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { buildMeta, canonicalLink } from "@/lib/seo";

const description =
  "Texas Defined is a lifestyle magazine about the places, food, history, homes, traditions and people that make this state feel like nowhere else.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath: "/about",
      title: "About Texas Defined",
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, "/about")],
  }),
  component: AboutPage,
});

const PRINCIPLES = [
  {
    title: "Start with a real question",
    body: "Where is the drive worth taking? What should you know before you go? What does it really cost to live here? Our best stories begin with the questions Texans and newcomers actually ask.",
  },
  {
    title: "Keep Texas life at the center",
    body: "We cover the everyday experience of Texas — its landscapes, food, homes, history, communities and traditions — without turning every subject into politics.",
  },
  {
    title: "Name the people and places",
    body: "Specific details make a story useful. We tell you the town, the route, the season, the local business or the public source behind the information whenever we can.",
  },
  {
    title: "Be useful without being dull",
    body: "A practical guide can still be a good read. We aim for clear answers, warm writing and enough detail to help you make a plan with confidence.",
  },
];

function AboutPage() {
  const brand = useBrand();

  return (
    <>
      <Container className="pb-6 pt-16 sm:pt-24">
        <p className="eyebrow text-primary">About Texas Defined</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-6xl">
          What defines Texas?
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {description} That question guides every story, guide and recommendation we publish.
        </p>
      </Container>

      <Section>
        <Container>
          <SectionHeader eyebrow="Our approach" title="What readers can expect" />
          <ul className="mt-10 grid gap-8 sm:grid-cols-2">
            {PRINCIPLES.map((principle) => (
              <li key={principle.title} className="border-t border-border pt-5">
                <h2 className="font-display text-2xl">{principle.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {principle.body}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="surface">
        <Container className="max-w-2xl">
          <SectionHeader
            eyebrow="Stay in touch"
            title={brand.copy.newsletterHeading}
            description={brand.copy.newsletterBody}
            align="center"
          />
          <div className="mt-8">
            <NewsletterSignup />
          </div>
        </Container>
      </Section>
    </>
  );
}
