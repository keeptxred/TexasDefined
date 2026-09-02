import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/corrections-policy";
const reviewedAt = "2026-09-01";
const description = "Texas Defined's corrections policy explains how to report factual errors, source changes, outdated information, and material corrections or updates.";

export const Route = createFileRoute(canonicalPath)({
  head: () => {
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    return {
      meta: buildMeta(texasDefinedBrand, {
        canonicalPath,
        title: "Corrections Policy",
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
            name: "Texas Defined Corrections Policy",
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
              { "@type": "ListItem", position: 2, name: "Corrections Policy", item: pageUrl },
            ],
          },
        ],
      })],
    };
  },
  component: CorrectionsPolicyPage,
});

function CorrectionsPolicyPage() {
  return (
    <>
      <section className="border-b border-border bg-surface">
        <Container className="py-16 sm:py-20">
          <p className="eyebrow text-primary">Accuracy &amp; accountability</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-none sm:text-6xl">Corrections Policy</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">{description}</p>
          <p className="mt-4 text-sm text-muted-foreground">Policy last reviewed September 1, 2026.</p>
        </Container>
      </section>

      <Container className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl space-y-10 text-base leading-8 text-muted-foreground">
          <section className="border-t border-border pt-6">
            <h2 className="font-display text-3xl text-foreground">What we correct</h2>
            <p className="mt-4">We correct factual statements that are materially wrong, misleading because important context is missing, attributed to the wrong source, or presented as current after the controlling information has changed. Examples include an incorrect place, date, fee, legal requirement, public-record value, event detail, quoted source, route, operating rule or factual description.</p>
          </section>

          <section className="border-t border-border pt-6">
            <h2 className="font-display text-3xl text-foreground">Corrections, updates and routine maintenance</h2>
            <p className="mt-4">A correction fixes an error in what Texas Defined previously published. An update adds or refreshes information because the underlying facts changed after publication. Routine maintenance can include formatting, link repair, accessibility improvements, spelling, style, clearer wording or refreshed navigation that does not materially change the factual meaning.</p>
            <p className="mt-3">When a correction materially changes what a reader would understand or do, we aim to make the correction or updated review context visible on the page when the page type supports it. Minor copy edits do not require a correction note.</p>
          </section>

          <section className="border-t border-border pt-6">
            <h2 className="font-display text-3xl text-foreground">Time-sensitive information</h2>
            <p className="mt-4">Hours, closures, fees, ticket inventory, weather, regulations, deadlines, rates, eligibility rules, tax data and other operational details can change after a page is reviewed. A changed external fact is not automatically an editorial error if the page accurately reflected the cited source at the stated time. We still update consequential stale information when it comes to our attention and the page is intended to remain current.</p>
          </section>

          <section className="border-t border-border pt-6">
            <h2 className="font-display text-3xl text-foreground">How to report an error</h2>
            <p className="mt-4">Use the <Link to="/partner-with-us" className="border-b border-primary text-primary">Texas Defined contact form</Link> and identify the message as a correction or source update. Include the page URL, the specific statement you believe is wrong, the corrected information, and a primary or official source when one is available. That detail makes the issue easier to verify and reduces the chance of replacing one error with another.</p>
          </section>

          <section className="border-t border-border pt-6">
            <h2 className="font-display text-3xl text-foreground">What happens after a report</h2>
            <p className="mt-4">A correction request is evaluated against the best available evidence, with preference for the controlling or original source. We may also correct an issue independently when a source changes or a quality check identifies a problem. Submitting a request does not guarantee a change when the published statement is supported by the source and context shown on the page.</p>
          </section>

          <section className="border-t border-border pt-6">
            <h2 className="font-display text-3xl text-foreground">Related standards</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li><a href="/editorial-policy" className="border-b border-primary text-primary">Editorial Policy</a></li>
              <li><a href="/sourcing-methodology" className="border-b border-primary text-primary">Sourcing Methodology</a></li>
              <li><Link to="/citation-guide" className="border-b border-primary text-primary">Citation Guide</Link></li>
              <li><Link to="/about" className="border-b border-primary text-primary">About Texas Defined</Link></li>
            </ul>
          </section>
        </div>
      </Container>
    </>
  );
}
