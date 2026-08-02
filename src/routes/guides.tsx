import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { useBrand } from "@/brand/context";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { GuideCard } from "@/components/editorial/GuideCard";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { guidesQuery } from "@/data/queries";
import { buildMeta, canonicalLink } from "@/lib/seo";

const description =
  "Calculators, checklists and reference tables for living in Texas — property taxes, cost of living, road-trip planning and moving logistics.";

export const Route = createFileRoute("/guides")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { title: "Guides & Tools", description }),
    links: [canonicalLink(texasDefinedBrand, "/guides")],
  }),
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(guidesQuery());
  },
  component: GuidesPage,
});

function GuidesPage() {
  const brand = useBrand();
  const { data: guides } = useSuspenseQuery(guidesQuery());

  const topics = [...new Set(guides.map((guide) => guide.topic))];

  return (
    <>
      <Container className="pb-6 pt-16 sm:pt-24">
        <p className="eyebrow text-primary">Guides &amp; Tools</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-6xl">
          Practical Texas, worked out
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {description} {brand.copy.comingSoonBody}
        </p>
      </Container>

      {topics.map((topic, index) => (
        <Section key={topic} tone={index % 2 === 1 ? "surface" : "default"}>
          <Container>
            <SectionHeader eyebrow={topic} title={`${topic} tools`} />
            <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {guides
                .filter((guide) => guide.topic === topic)
                .map((guide) => (
                  <li key={guide.id}>
                    <GuideCard guide={guide} />
                  </li>
                ))}
            </ul>
          </Container>
        </Section>
      ))}
    </>
  );
}
