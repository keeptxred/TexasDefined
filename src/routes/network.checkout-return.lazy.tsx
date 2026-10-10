import { createLazyFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
export const Route = createLazyFileRoute("/network/checkout-return")({component:CheckoutReturn});
function CheckoutReturn() {
  return <main><Container className="py-20">
    <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-surface p-8 sm:p-12">
      <p className="eyebrow text-primary">Texas Defined Network</p>
      <h1 className="mt-4 font-display text-4xl">Thank you for joining us.</h1>
      <p className="mt-5 leading-8 text-muted-foreground">Your checkout has returned to Texas Defined. Your membership will become active after payment confirmation and your business listing has passed editorial review. Completing checkout does not automatically publish a listing.</p>
      <a href="/network/join" className="mt-8 inline-block rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">Return to the Network</a>
    </div>
  </Container></main>;
}
