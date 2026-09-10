import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { absoluteUrl, buildMeta, canonicalLink } from "@/lib/seo";

const description = "Read the Texas Defined policy for damaged, defective, misprinted, incorrect, lost, or made-to-order merchandise.";

export const Route = createFileRoute("/return-refund-policy")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath: "/return-refund-policy",
      title: "Return & Refund Policy",
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, "/return-refund-policy")],
  }),
  component: ReturnRefundPolicyPage,
});

function ReturnRefundPolicyPage() {
  return (
    <>
      <section className="border-b border-border bg-surface">
        <Container className="py-16 sm:py-20">
          <p className="eyebrow text-primary">Shop policy</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-none sm:text-6xl">Return &amp; Refund Policy</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">
            Our products are created on demand. This policy explains when replacements, refunds, returns, exchanges, and cancellations are available.
          </p>
        </Container>
      </section>

      <Container className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl space-y-10 text-base leading-8 text-muted-foreground">
          <section className="border-t border-border pt-6">
            <h2 className="font-display text-3xl text-foreground">Made-to-Order Products</h2>
            <p className="mt-4">
              Texas Defined merchandise is produced specifically for each customer after an order is placed. Because these items are made to order, we generally cannot accept returns or exchanges for buyer&apos;s remorse, an incorrect size or color selected by the customer, a changed mind, or an accidentally ordered item.
            </p>
            <p className="mt-3">Please review product descriptions, color choices, and sizing information carefully before completing checkout.</p>
          </section>

          <section className="border-t border-border pt-6">
            <h2 className="font-display text-3xl text-foreground">Damaged, Defective, Misprinted, or Incorrect Items</h2>
            <p className="mt-4">Contact us within 30 days after delivery when an item arrives damaged, defective, misprinted, or materially different from what was ordered.</p>
            <p className="mt-3">Include:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Your order number.</li>
              <li>A description of the problem.</li>
              <li>Clear photographs of the item, packaging, shipping label, and affected area.</li>
            </ul>
            <p className="mt-3">After the issue is verified, we may provide a replacement, refund, or other appropriate resolution. We may not require the defective item to be returned.</p>
          </section>

          <section className="border-t border-border pt-6">
            <h2 className="font-display text-3xl text-foreground">Wrong Address and Unclaimed Shipments</h2>
            <p className="mt-4">
              Customers are responsible for entering a complete and accurate shipping address. Orders returned because of an incorrect or insufficient address, refusal, or failure to claim the package may require payment of additional shipping or production costs before reshipment.
            </p>
          </section>

          <section className="border-t border-border pt-6">
            <h2 className="font-display text-3xl text-foreground">Lost or Stolen Packages</h2>
            <p className="mt-4">
              When tracking shows a package is still in transit beyond the expected delivery window, contact us so we can review the shipment with the carrier or fulfillment provider. When tracking shows delivered, first check the delivery area, household members, neighbors, property management, and the carrier. We will help investigate, but replacement or refund decisions depend on the available tracking and carrier information.
            </p>
          </section>

          <section className="border-t border-border pt-6">
            <h2 className="font-display text-3xl text-foreground">Order Changes and Cancellations</h2>
            <p className="mt-4">
              Production can begin shortly after checkout. Changes and cancellations are not guaranteed once an order has entered production. Contact us immediately after ordering, and we will attempt to help before fulfillment begins.
            </p>
          </section>

          <section className="border-t border-border pt-6">
            <h2 className="font-display text-3xl text-foreground">Approved Refunds</h2>
            <p className="mt-4">
              Approved refunds are returned to the original payment method. Processing time after approval depends on Stripe, the card network, and the customer&apos;s financial institution. Original shipping charges may be nonrefundable unless the order was defective, incorrect, or otherwise eligible under this policy.
            </p>
          </section>

          <section className="border-t border-border pt-6">
            <h2 className="font-display text-3xl text-foreground">How to Request Help</h2>
            <p className="mt-4">
              Contact Texas Defined with your order number and supporting photographs. Nothing in this policy limits rights that cannot legally be waived under applicable consumer-protection law.
            </p>
            <p className="mt-3">
              For general information about Texas Defined, visit the <Link to="/about" className="border-b border-primary text-primary">About page</Link>.
            </p>
          </section>

          <p className="border-t border-border pt-6 text-sm">
            Canonical policy URL: <a href={absoluteUrl(texasDefinedBrand, "/return-refund-policy")} className="border-b border-primary text-primary">{absoluteUrl(texasDefinedBrand, "/return-refund-policy")}</a>
          </p>
        </div>
      </Container>
    </>
  );
}
