import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/editorial-policy";
const reviewedAt = "2026-09-01";
const description = "Read the Texas Defined editorial policy covering bylines, sourcing, verification, updates, independence, automated tools, and the distinction between editorial guidance and official authority.";

export const Route = createFileRoute(canonicalPath)({
  head: () => {
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: "Editorial Policy",
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
            name: "Texas Defined Editorial Policy",
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
              { "@type": "ListItem", position: 2, name: "Editorial Policy", item: pageUrl },
            ],
          },
        ],
      })],
    };
  },
  component: EditorialPolicyPage,
});

const POLICY_SECTIONS = [
  {
    title: "Editorial ownership and independence",
    body: "Texas Defined is an independent Texas magazine and guide. Editorial pages are produced under the Texas Defined publication identity. Government agencies, parks, event organizers, businesses, universities and other sources we cite do not become the publisher of our work, and a link to an official source does not imply that source endorses Texas Defined.",
  },
  {
    title: "Bylines and editorial desks",
    body: "Stories identify the responsible institutional editorial desk or a verified individual contributor. Desk names describe a real coverage function inside the publication; they are not fictional people. We do not invent contributor biographies, credentials or first-person experience. A named individual should appear as an author only when the contributor is real and the profile can accurately describe that person's role and published work.",
  },
  {
    title: "Sourcing and verification",
    body: "For facts that can change or affect a reader's decision, we prefer the organization responsible for the record or activity: agencies for government rules and data, operators for current visitor information, organizers for events, and original institutional or archival sources for durable factual claims. Secondary sources can add context, but they should not replace the controlling source when one exists.",
  },
  {
    title: "Dates, updates and review context",
    body: "Publication dates describe when an item was first published. When a page carries a separate updated, source-checked, data-as-of or last-reviewed date, that date describes the scope shown on the page; it does not guarantee that every external fact remains unchanged after that date. Time-sensitive details should be confirmed with the linked responsible source before travel, filing, purchasing or other consequential decisions.",
  },
  {
    title: "Guidance is not official authority",
    body: "Texas Defined publishes explanatory journalism, planning tools, calculators and practical guides. Unless a page explicitly says otherwise, these are independent informational resources rather than official government determinations, professional advice, price quotes, guarantees or substitutes for a controlling rule, record or provider.",
  },
  {
    title: "Automated and software-assisted workflows",
    body: "Software and automated tools may assist with data processing, formatting, discovery, quality checks and drafting support. Those tools do not change Texas Defined's responsibility for what it publishes. We do not treat generated text as a source, invent citations to make a page look researched, or create fictional authors or credentials to simulate expertise.",
  },
  {
    title: "Commercial relationships",
    body: "Advertising, commerce and partnership features should be distinguishable from editorial material. A commercial relationship does not change the sourcing standard for factual editorial claims. Product availability, prices, offers and third-party terms can change and are controlled by the relevant provider at the time of a transaction.",
  },
  {
    title: "Corrections and accountability",
    body: "When we identify a material factual error, the goal is to correct the published information rather than preserve a known mistake. Our Corrections Policy explains how readers can report an error and how we distinguish factual corrections from routine maintenance, style changes and refreshed time-sensitive details.",
  },
] as const;

function EditorialPolicyPage() {
  return (
    <>
      <section className="border-b border-border bg-surface">
        <Container className="py-16 sm:py-20">
          <p className="eyebrow text-primary">Editorial standards</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-none sm:text-6xl">Editorial Policy</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">{description}</p>
          <p className="mt-4 text-sm text-muted-foreground">Policy last reviewed September 1, 2026.</p>
        </Container>
      </section>

      <Container className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl space-y-10 text-base leading-8 text-muted-foreground">
          {POLICY_SECTIONS.map((section) => (
            <section key={section.title} className="border-t border-border pt-6">
              <h2 className="font-display text-3xl text-foreground">{section.title}</h2>
              <p className="mt-4">{section.body}</p>
            </section>
          ))}

          <section className="border-t border-border pt-6">
            <h2 className="font-display text-3xl text-foreground">Related trust resources</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li><a href="/sourcing-methodology" className="border-b border-primary text-primary">Sourcing Methodology</a> — how we choose and describe sources.</li>
              <li><a href="/corrections-policy" className="border-b border-primary text-primary">Corrections Policy</a> — how to report factual errors and source changes.</li>
              <li><Link to="/citation-guide" className="border-b border-primary text-primary">Citation Guide</Link> — how maintained Texas Defined references relate to original sources and canonical URLs.</li>
              <li><Link to="/about" className="border-b border-primary text-primary">About Texas Defined</Link> — publication identity, mission and editorial accountability.</li>
              <li><Link to="/partner-with-us" className="border-b border-primary text-primary">Contact Texas Defined</Link> — submit a correction, source update or editorial question.</li>
            </ul>
          </section>
        </div>
      </Container>
    </>
  );
}
