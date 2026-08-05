import { createFileRoute } from "@tanstack/react-router";

import { useBrand } from "@/brand/context";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { NewsletterSignup } from "@/components/editorial/NewsletterSignup";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { buildMeta, canonicalLink } from "@/lib/seo";

const description =
  "TexasDefined is a lifestyle publication about what makes Texas Texas — the places, food, history, homes and makers worth knowing.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath: "/about",
      title: "About TexasDefined", description }),
    links: [canonicalLink(texasDefinedBrand, "/about")],
  }),
  component: AboutPage,
});

const PRINCIPLES = [
  {
    title: "We go there",
    body: "Every destination we publish is one someone on the masthead has stood in. Coordinates, seasons and entry notes come from the trip, not the brochure.",
  },
  {
    title: "Not a political publication",
    body: "Elections, legislation and government belong elsewhere. TexasDefined is about living here — the lakes, the brisket, the porch in September.",
  },
  {
    title: "Makers named",
    body: "Anything in the shop has a person behind it. We name the maker, the town and why the thing lasts.",
  },
  {
    title: "Useful over clever",
    body: "Guides and calculators exist to answer real questions: what the taxes run, what the drive costs, what survives August.",
  },
];

function AboutPage() {
  const brand = useBrand();

  return (
    <>
      <Container className="pb-6 pt-16 sm:pt-24">
        <p className="eyebrow text-primary">About</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-6xl">
          What defines Texas?
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {description} It's the question behind every story we run — and the only editorial test a
          piece has to pass.
        </p>
      </Container>

      <Section>
        <Container>
          <SectionHeader eyebrow="How we work" title="Four rules" />
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
