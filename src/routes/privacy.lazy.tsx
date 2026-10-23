import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { texasDefinedBrand } from "@/brand/texasdefined";
import { absoluteUrl } from "@/lib/seo";

const canonicalPath = "/privacy";
export const Route = createLazyFileRoute("/privacy")({ component: PrivacyPolicyPage });

function PrivacyPolicyPage() {
  return (
    <>
      <section className="border-b border-border bg-surface">
        <Container className="py-16 sm:py-20">
          <p className="eyebrow text-primary">Privacy &amp; data</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-none sm:text-6xl">Privacy Policy</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">
            This policy explains the information Texas Defined handles when you use the site, submit a form, shop, use interactive tools, or encounter advertising and analytics technologies.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">Last updated October 23, 2026.</p>
        </Container>
      </section>

      <Container className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl space-y-10 text-base leading-8 text-muted-foreground">
          <section className="border-t border-border pt-6">
        <h2 className="font-display text-3xl text-foreground">Google Customer Reviews</h2>
        <p className="mt-4">On a verified paid order confirmation page, we share your email address, order reference, delivery country, and estimated delivery date with Google to display the Google Customer Reviews survey choice. Google sends a review survey only if you agree in its opt-in prompt. Declining does not affect your order or customer support.</p>
        <p className="mt-4">Google may place or read cookies, or use similar technologies, for this program and processes transaction information under the <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>. You can manage or block cookies using your browser settings; blocking Google scripts may prevent the review prompt from appearing.</p>
      </section>

          <section className="border-t border-border pt-6">
            <h2 className="font-display text-3xl text-foreground">Information Texas Defined Handles</h2>
            <p className="mt-4">
              You can read most of Texas Defined without creating an account. Depending on the feature you use, the site may handle information you choose to provide, such as an email address for a newsletter signup, contact and business information submitted through a partnership form, and product, variant, quantity, shipping, and checkout information needed to complete a purchase.
            </p>
            <p className="mt-3">
              The site can also use browser storage and analytics events to support features such as saved shop picks, session measurement, page and resource interaction measurement, search usage, and visits to official external resources. Texas Defined does not describe an analytics or advertising service as active unless it is actually configured on the site.
            </p>
          </section>

          <section className="border-t border-border pt-6">
            <h2 className="font-display text-3xl text-foreground">Company Event Planning and Venue Applications</h2>
            <p className="mt-4">
              If you submit a corporate-event planning request, Texas Defined collects the contact name, email, company, event city, group size, event category, and any optional phone number, preferred date, budget, shortlisted venues, or planning notes you choose to supply. We use this information to review your request and contact you about the event planning service.
            </p>
            <p className="mt-3">
              A planning request is not a reservation or a quote request automatically sent to a venue. The requested contact information is stored in an access-restricted internal review system; Texas Defined does not automatically forward the planner&apos;s contact information to listed venues. Additional consent would be required before venue-specific outreach on the planner&apos;s behalf.
            </p>
            <p className="mt-3">
              Business applicants may submit representative contact information, business name, website, group capacity, offered packages, and proposed offer codes and terms. Applications and proposed codes are reviewed internally; submitting an application does not make the contact information or unapproved promotion public. If approved, a limited business offer may be shown publicly with its commercial relationship identified.
            </p>
            <p className="mt-3">
              When you select an approved company-event partner offer and open its destination website, we may increment a daily aggregate count for that offer. The event-offer click-count ledger stores the offer identifier, Texas calendar date, and number of link activations; it does not retain visitors&apos; names, email addresses, IP addresses, cookies, device identifiers, or session identifiers. These counts do not prove sales, reservations, unique visitors, or commissions. Other standard site security and hosting logs are governed by the remaining provisions of this policy.
            </p>
            <p className="mt-3">
              Please avoid entering sensitive personal information about employees or guests in open-text fields. To inquire about correction or deletion of information submitted through these forms, use the privacy contact instructions below.
            </p>
          </section>

          <section className="border-t border-border pt-6">
            <h2 className="font-display text-3xl text-foreground">Cookies, Local Storage, and Similar Technologies</h2>
            <p className="mt-4">
              Cookies and browser storage can be used to remember choices, maintain site functionality, measure how pages and tools are used, prevent abuse, and support commerce or advertising. The specific technologies used can change as site features and service providers change.
            </p>
            <p className="mt-3">
              You can control cookies through your browser settings. Blocking or deleting cookies or local storage may affect some site features.
            </p>
          </section>

          <section className="border-t border-border pt-6">
            <h2 className="font-display text-3xl text-foreground">Advertising and Google AdSense</h2>
            <p className="mt-4">
              Texas Defined may display advertising supplied by Google AdSense and other advertising vendors. When advertising is enabled, third-party vendors, including Google, may use cookies to serve ads based on a visitor&apos;s prior visits to Texas Defined or other websites.
            </p>
            <p className="mt-3">
              Google&apos;s use of advertising cookies enables Google and its partners to serve ads based on visits to Texas Defined and other sites on the Internet. You can manage or opt out of personalized advertising through <a href="https://adssettings.google.com/" rel="noreferrer noopener" target="_blank" className="border-b border-primary text-primary">Google Ads Settings</a>. You can also learn about choices for some other participating advertising vendors at <a href="https://www.aboutads.info/choices/" rel="noreferrer noopener" target="_blank" className="border-b border-primary text-primary">YourAdChoices</a>.
            </p>
            <p className="mt-3">
              If Texas Defined enables third-party advertising vendors or ad networks beyond Google, those providers may use their own cookies or similar technologies subject to their own privacy information and available opt-out controls.
            </p>
          </section>

          <section className="border-t border-border pt-6">
            <h2 className="font-display text-3xl text-foreground">Consent for Advertising</h2>
            <p className="mt-4">
              Where consent is legally required, Texas Defined will use an appropriate consent mechanism before relying on advertising technologies that require consent. Google requires publishers serving personalized ads to users in the European Economic Area, the United Kingdom, and Switzerland to use a Google-certified consent management platform integrated with the IAB Transparency and Consent Framework.
            </p>
            <p className="mt-3">
              Consent choices may affect whether personalized, non-personalized, or limited advertising can be shown. Texas Defined will configure advertising and consent tools according to the services actually enabled at the time.
            </p>
          </section>

          <section className="border-t border-border pt-6">
            <h2 className="font-display text-3xl text-foreground">Analytics</h2>
            <p className="mt-4">
              Texas Defined may measure visits and interactions to understand which pages, searches, tools, resources, and features are useful. Analytics can include page paths, session identifiers, device or browser information, referring information, searches, resource interactions, and similar usage signals. These measurements are used to operate and improve the site rather than to make official determinations about a visitor.
            </p>
          </section>

          <section className="border-t border-border pt-6">
            <h2 className="font-display text-3xl text-foreground">Ask Texas AI and Demand Intelligence</h2>
            <p className="mt-4">
              When you submit a question to Ask Texas AI, Texas Defined processes the question to generate an answer, retrieve relevant Texas Defined material, and, when needed, check governed official sources. The service also creates privacy-minimized usage signals so Texas Defined can measure answer quality and identify subjects that may need stronger guides, data, or tools.
            </p>
            <p className="mt-3">
              New Ask Texas analytics telemetry does not store the submitted question text. Before an AI analytics event is written, Texas Defined reduces the question to a bounded set of predefined generalized demand terms such as broad topic or feature categories and keeps a one-way question fingerprint for distinct-pattern counting. The separate Texas Defined AI signal database likewise stores fingerprints and generalized fields such as topic or intent categories, coverage level, source counts, and answer status rather than raw visitor questions. IP addresses and user-agent strings are not written to the AI signal database, and question text is not published in demand reports, editorial queues, or public repository artifacts. Older sanitized AI telemetry collected before this minimization change may remain temporarily until the analytics provider&apos;s retention period expires.
            </p>
            <p className="mt-3">
              Ask Texas demand intelligence is used only to support site quality and editorial planning. It does not automatically publish articles, merge code, or make editorial decisions without human review. Avoid including sensitive personal information in an Ask Texas question.
            </p>
          </section>

          <section className="border-t border-border pt-6">
            <h2 className="font-display text-3xl text-foreground">Newsletter and Forms</h2>
            <p className="mt-4">
              When newsletter signup is available and you subscribe, the form sends the email address you provide together with the Texas Defined brand identifier to the configured newsletter service so the subscription can be recorded.
            </p>
            <p className="mt-3">
              When you submit the partnership form, Texas Defined receives the contact name, email address, company or organization, website, partnership type, message, and source page information you provide. Partnership submissions are stored privately for review and follow-up.
            </p>
          </section>

          <section className="border-t border-border pt-6">
            <h2 className="font-display text-3xl text-foreground">Business Network Applications, Listings, and Owner Accounts</h2>
            <p className="mt-4">
              When you apply to the TexasDefined Business Network, TexasDefined receives the business and contact information, descriptions, website and social links, submitted logos or images, plan selection, and required acceptance records you provide. Private application media and review information are used for application review, ownership verification, moderation, owner access, security, billing administration, and related service operations.
            </p>
            <p className="mt-3">
              A submitted application is not public merely because it was received. If TexasDefined approves and publishes a listing, the approved public-facing business information and media become publicly accessible. Search engines, AI and answer systems, social networks, archives, directories, browsers, and other third parties may crawl, index, cache, excerpt, rank, display, or otherwise surface that public material. TexasDefined does not control third-party indexing or caching and cannot guarantee removal from third-party systems after a listing changes or is removed.
            </p>
            <p className="mt-3">
              TexasDefined stores the version and cryptographic fingerprint of the Business Network Membership Terms accepted with an application and, for Plus checkout, a separate acceptance record tied to the verified owner account and recurring-billing disclosure. TexasDefined does not store full payment-card numbers; Stripe handles payment credentials and payment processing.
            </p>
          </section>

          <section className="border-t border-border pt-6">
            <h2 className="font-display text-3xl text-foreground">Shop, Checkout, and Fulfillment</h2>
            <p className="mt-4">
              When you choose checkout, Texas Defined sends the selected product, variant, quantity, and related order information to the configured commerce service. Payment is completed through the checkout provider, and purchased items may be prepared and shipped by a print-production or fulfillment partner. Payment, tax, shipping, fraud-prevention, and fulfillment providers process information under their own terms and privacy practices.
            </p>
          </section>

          <section className="border-t border-border pt-6">
            <h2 className="font-display text-3xl text-foreground">External Sites and Official Sources</h2>
            <p className="mt-4">
              Texas Defined links to government agencies, official records, local organizations, businesses, service providers, and other external websites. Their privacy practices are controlled by those organizations, not Texas Defined. Review the destination site&apos;s policies when privacy or data handling matters to your decision.
            </p>
          </section>

          <section className="border-t border-border pt-6">
            <h2 className="font-display text-3xl text-foreground">Your Choices</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Use browser controls to block or delete cookies and local storage.</li>
              <li>Use Google Ads Settings to manage personalized advertising choices.</li>
              <li>Decline optional consent choices when a consent message is presented.</li>
              <li>Do not submit optional forms if you do not want Texas Defined to receive the information requested by that form.</li>
              <li>Business Network applicants should submit only business facts and media they are authorized to provide; approved public listing material may be indexed or cached by third-party discovery services.</li>
              <li>Do not include sensitive personal information in Ask Texas AI questions.</li>
            </ul>
          </section>

          <section className="border-t border-border pt-6">
            <h2 className="font-display text-3xl text-foreground">Policy Changes and Questions</h2>
            <p className="mt-4">
              Texas Defined may update this policy as site features, service providers, advertising tools, or legal requirements change. The updated date above will be revised when the policy materially changes.
            </p>
            <p className="mt-3">
              For a privacy question, use the <Link to="/partner-with-us" className="border-b border-primary text-primary">Texas Defined contact form</Link> and identify the message as a privacy inquiry. For broader editorial and site practices, see <Link to="/about" className="border-b border-primary text-primary">About Texas Defined</Link>.
            </p>
          </section>

          <p className="border-t border-border pt-6 text-sm">
            Canonical privacy URL: <a href={absoluteUrl(texasDefinedBrand, canonicalPath)} className="border-b border-primary text-primary">{absoluteUrl(texasDefinedBrand, canonicalPath)}</a>
          </p>
        </div>
      </Container>
    </>
  );
}
