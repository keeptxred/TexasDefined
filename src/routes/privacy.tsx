import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { absoluteUrl, buildMeta, canonicalLink } from "@/lib/seo";

const canonicalPath = "/privacy";
const description = "Read the Texas Defined privacy policy, including how the site handles analytics, forms, commerce, cookies, advertising, and privacy choices.";

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: "Privacy Policy",
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
  }),
  component: PrivacyPolicyPage,
});

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
          <p className="mt-4 text-sm text-muted-foreground">Last updated August 26, 2026.</p>
        </Container>
      </section>

      <Container className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl space-y-10 text-base leading-8 text-muted-foreground">
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
            <h2 className="font-display text-3xl text-foreground">Newsletter and Forms</h2>
            <p className="mt-4">
              When newsletter signup is available and you subscribe, the form sends the email address you provide together with the Texas Defined brand identifier to the configured newsletter service so the subscription can be recorded.
            </p>
            <p className="mt-3">
              When you submit the partnership form, Texas Defined receives the contact name, email address, company or organization, website, partnership type, message, and source page information you provide. Partnership submissions are stored privately for review and follow-up.
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
