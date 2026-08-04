import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

import { useBrand } from "@/brand/context";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { GuideCard } from "@/components/editorial/GuideCard";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { guidesQuery } from "@/data/queries";
import { buildMeta, canonicalLink } from "@/lib/seo";

const description =
  "Calculators, checklists and reference tables for living in Texas — property taxes, cost of living, road-trip planning and moving logistics.";

const migratedGuides = [
  { to: "/learn/property-taxes", label: "Texas Property Taxes", body: "Appraisals, exemptions, protests, rates, special districts and the annual tax cycle." },
  { to: "/decide/property-taxes", label: "Property-Tax Calculator", body: "Estimate annual and monthly taxes from value, exemptions and a local combined rate." },
  { to: "/learn/property-tax-payments", label: "Payments & Collections", body: "Deadlines, escrow, installments, delinquency, liens, waivers and payment agreements." },
  { to: "/do/homestead-exemption", label: "Homestead Exemption", body: "Eligibility, filing steps, documentation and the records homeowners should verify." },
  { to: "/do/property-tax-protest", label: "Property-Tax Protest", body: "Deadlines, evidence, informal review and appraisal review board preparation." },
  { to: "/learn/appraisal-districts", label: "Appraisal Districts", body: "Understand local appraisal offices, notices, records and official county contacts." },
  { to: "/browse/counties", label: "Texas County Directory", body: "Browse all 254 counties and continue to official county resources." },
  { to: "/browse/cities", label: "Texas City Directory", body: "Find major and regional Texas cities by county and region." },
] as const;

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

      <Section tone="surface">
        <Container>
          <SectionHeader eyebrow="Texas home and property" title="Property-tax guides and directories" />
          <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {migratedGuides.map((guide) => (
              <li key={guide.to}>
                <Link to={guide.to} className="block h-full rounded-md border border-border bg-background p-5 transition-colors hover:border-primary/50">
                  <h2 className="font-display text-xl">{guide.label}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{guide.body}</p>
                  <span className="mt-5 inline-block text-sm font-medium text-primary">Open guide →</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {topics.map((topic, index) => (
        <Section key={topic} tone={index % 2 === 0 ? "default" : "surface"}>
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
