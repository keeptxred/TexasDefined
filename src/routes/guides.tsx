import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { GuideCard } from "@/components/editorial/GuideCard";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { guidesQuery } from "@/data/queries";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const description =
  "Straightforward guides, calculators and checklists for buying a home, understanding property taxes, moving and managing everyday life in Texas.";

const migratedGuides = [
  { to: "/learn/property-taxes", label: "Texas Property Taxes", body: "A plain-English look at appraisals, exemptions, protests, rates and the yearly tax cycle." },
  { to: "/decide/property-taxes", label: "Estimate Your Property Taxes", body: "Get a quick estimate using your home value, exemptions and local tax rate." },
  { to: "/learn/property-tax-payments", label: "Paying Your Property Taxes", body: "What to know about deadlines, escrow, payment plans, late bills and tax liens." },
  { to: "/do/homestead-exemption", label: "File a Homestead Exemption", body: "See who qualifies, what you need and how to file with your appraisal district." },
  { to: "/do/property-tax-protest", label: "Protest Your Appraisal", body: "A step-by-step guide to deadlines, evidence, informal reviews and ARB hearings." },
  { to: "/learn/appraisal-districts", label: "Find Your Appraisal District", body: "Learn what your local appraisal district does and find the right county office." },
  { to: "/browse/counties", label: "Texas Counties", body: "Browse all 254 counties and find useful local and official resources." },
  { to: "/browse/cities", label: "Texas Cities", body: "Explore major cities and regional communities by county and part of the state." },
] as const;

const guideAnchor = (index: number) => `guide-${index + 1}`;
const guidesUrl = absoluteUrl(texasDefinedBrand, "/guides");

export const Route = createFileRoute("/guides")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath: "/guides",
      title: "Helpful Texas Guides",
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, "/guides")],
    scripts: [
      jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "CollectionPage",
            "@id": `${guidesUrl}#page`,
            url: guidesUrl,
            name: "Helpful Texas Guides",
            description,
            isPartOf: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#website` },
            mainEntity: { "@id": `${guidesUrl}#guide-list` },
          },
          {
            "@type": "BreadcrumbList",
            "@id": `${guidesUrl}#breadcrumb`,
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: absoluteUrl(texasDefinedBrand, "/"),
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Guides",
                item: guidesUrl,
              },
            ],
          },
          {
            "@type": "ItemList",
            "@id": `${guidesUrl}#guide-list`,
            name: "TexasDefined practical guides",
            numberOfItems: migratedGuides.length,
            itemListElement: migratedGuides.map((guide, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `${guidesUrl}#${guideAnchor(index)}`,
              item: {
                "@type": "WebPage",
                "@id": absoluteUrl(texasDefinedBrand, guide.to),
                url: absoluteUrl(texasDefinedBrand, guide.to),
                name: guide.label,
                description: guide.body,
              },
            })),
          },
        ],
      }),
    ],
  }),
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(guidesQuery());
  },
  component: GuidesPage,
});

function GuidesPage() {
  const { data: guides } = useSuspenseQuery(guidesQuery());
  const topics = [...new Set(guides.map((guide) => guide.topic))];

  return (
    <>
      <Container className="pb-6 pt-16 sm:pt-24">
        <p className="eyebrow text-primary">Helpful Texas Guides</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-6xl">
          Texas life, made a little easier
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      </Container>

      <Section tone="surface">
        <Container>
          <SectionHeader
            eyebrow="Home and property"
            title="Start with the questions Texas homeowners ask most"
          />
          <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {migratedGuides.map((guide, index) => (
              <li key={guide.to} id={guideAnchor(index)}>
                <Link
                  to={guide.to}
                  className="block h-full rounded-md border border-border bg-background p-5 transition-colors hover:border-primary/50"
                >
                  <h2 className="font-display text-xl">{guide.label}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{guide.body}</p>
                  <span className="mt-5 inline-block text-sm font-medium text-primary">Read the guide →</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {topics.map((topic, index) => (
        <Section key={topic} tone={index % 2 === 0 ? "default" : "surface"}>
          <Container>
            <SectionHeader eyebrow={topic} title={`More help with ${topic.toLowerCase()}`} />
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
