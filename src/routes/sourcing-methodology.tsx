import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/sourcing-methodology";
const reviewedAt = "2026-09-01";
const description = "How Texas Defined selects official, primary, institutional, archival, and secondary sources; records verification dates; and separates source facts from editorial assessments.";

const SOURCE_LEVELS = [
  {
    title: "1. Controlling and official sources",
    body: "For rules, records, current operations and transactions, the preferred source is the organization that controls the fact: a government agency, park or land manager, event organizer, venue, appraisal district, utility, operator, institution or other responsible authority.",
  },
  {
    title: "2. Original and primary records",
    body: "For durable historical, scientific, cultural and data claims, we favor original datasets, statutes and rules, archival records, official reports, university or museum collections, preservation records, direct institutional publications and other primary evidence when it is available and appropriate.",
  },
  {
    title: "3. Accountable institutional context",
    body: "Government agencies, universities, museums, historical associations, conservation organizations and other accountable institutions can provide authoritative context even when they do not control current visitor operations. We distinguish supporting context from the source that controls current access, fees, deadlines or rules.",
  },
  {
    title: "4. Reputable secondary sources",
    body: "Secondary reporting and reference works can help establish context, identify leads or explain disputed subjects. When a material claim can be checked against a better primary source, we prefer the primary source rather than citing a secondary summary as if it were the underlying authority.",
  },
  {
    title: "5. Texas Defined synthesis and assessment",
    body: "Some planning fields are editorial judgments built from sourced facts, such as recommended visit length, physical effort, family fit, road-trip structure or comparative usefulness. We label or frame these as Texas Defined assessments rather than presenting them as statements issued by an outside authority.",
  },
] as const;

export const Route = createFileRoute(canonicalPath)({
  head: () => {
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: "Sourcing Methodology",
        description,
      }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": `${pageUrl}#page`,
            url: pageUrl,
            name: "Texas Defined Sourcing Methodology",
            description,
            dateModified: reviewedAt,
            inLanguage: texasDefinedBrand.identity.locale,
            isPartOf: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#website` },
            about: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#organization` },
            breadcrumb: { "@id": `${pageUrl}#breadcrumbs` },
          },
          {
            "@type": "BreadcrumbList",
            "@id": `${pageUrl}#breadcrumbs`,
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Front page", item: absoluteUrl(texasDefinedBrand, "/") },
              { "@type": "ListItem", position: 2, name: "Sourcing Methodology", item: pageUrl },
            ],
          },
        ],
      })],
    };
  },
  component: SourcingMethodologyPage,
});

function SourcingMethodologyPage() {
  return (
    <>
      <section className="border-b border-border bg-surface">
        <Container className="py-16 sm:py-20">
          <p className="eyebrow text-primary">Research &amp; provenance</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-none sm:text-6xl">Sourcing Methodology</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">{description}</p>
          <p className="mt-4 text-sm text-muted-foreground">Methodology last reviewed September 1, 2026.</p>
        </Container>
      </section>

      <Container className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl space-y-10 text-base leading-8 text-muted-foreground">
          <section className="border-t border-border pt-6">
            <h2 className="font-display text-3xl text-foreground">Source hierarchy</h2>
            <p className="mt-4">The best source depends on the claim. A historical-register entry may establish designation history while a park operator controls today's gate hours. A state dataset may control a county value while a Texas Defined comparison explains what the number means. We keep those roles distinct.</p>
          </section>

          {SOURCE_LEVELS.map((level) => (
            <section key={level.title} className="border-t border-border pt-6">
              <h2 className="font-display text-3xl text-foreground">{level.title}</h2>
              <p className="mt-4">{level.body}</p>
            </section>
          ))}

          <section className="border-t border-border pt-6">
            <h2 className="font-display text-3xl text-foreground">Verification and date context</h2>
            <p className="mt-4">Where the content model supports it, maintained reference records can carry a source-checked, verified, reviewed, updated or data-as-of date. That date should describe what was actually checked. It should not be refreshed merely to make a page look new, and it should not imply that an external source cannot change afterward.</p>
          </section>

          <section className="border-t border-border pt-6">
            <h2 className="font-display text-3xl text-foreground">Links, citations and broken sources</h2>
            <p className="mt-4">A source link is evidence and a route back to the controlling information, not decoration. We prefer canonical source URLs, repair broken links when practical, and avoid replacing a dead primary source with a weaker page simply to preserve a citation count. When an archived or successor source is necessary, the surrounding language should still describe what that source can actually support.</p>
          </section>

          <section className="border-t border-border pt-6">
            <h2 className="font-display text-3xl text-foreground">Statistics and calculations</h2>
            <p className="mt-4">Statistics should identify their source and relevant time period when those details affect interpretation. Calculators and comparisons should explain their important assumptions and distinguish modeled estimates from official bills, assessments, eligibility determinations or provider quotes.</p>
          </section>

          <section className="border-t border-border pt-6">
            <h2 className="font-display text-3xl text-foreground">Research resources</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li><Link to="/citation-guide" className="border-b border-primary text-primary">Citation Guide</Link> — canonical citation and source-precedence guidance for maintained reference families.</li>
              <li><a href="/editorial-policy" className="border-b border-primary text-primary">Editorial Policy</a> — publication-wide editorial standards.</li>
              <li><a href="/corrections-policy" className="border-b border-primary text-primary">Corrections Policy</a> — factual-error and source-update process.</li>
              <li><Link to="/about" className="border-b border-primary text-primary">About Texas Defined</Link> — publication identity and accountability.</li>
            </ul>
          </section>
        </div>
      </Container>
    </>
  );
}
