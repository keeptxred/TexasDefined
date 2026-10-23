import { createLazyFileRoute } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { WacoViatorExperienceCards } from "@/components/monetization/WacoViatorExperienceCards";


export const Route = createLazyFileRoute("/dallas-to-waco-magnolia-tours")({ component: DallasToWacoTourPage });

function DallasToWacoTourPage() {
  return (
    <main>
      <Container className="pb-16 pt-10 sm:pb-24 sm:pt-14">
        <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-wider text-muted-foreground">
          <a href="/" className="underline underline-offset-4">TexasDefined</a> / Dallas to Waco tours
        </nav>
        <header className="max-w-5xl py-10">
          <p className="eyebrow text-primary">Magnolia visitors · Dallas departure · Waco sightseeing</p>
          <h1 className="mt-3 font-display text-5xl leading-tight sm:text-6xl">Dallas to Waco and Magnolia Market guided day trips</h1>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-muted-foreground">
            Don't drive yourself, or already staying in Dallas? A day tour can combine transportation with Waco landmarks
            and Magnolia Market. The important details are where it leaves from, what admissions are excluded, and whether a “Castle” stop includes an actual interior tour.
          </p>
        </header>

        <section className="grid gap-10 border-y border-border py-8 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl">What the AdvenTOUR offers</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              The advertised eight-hour From Dallas: Waco and Magnolia Market AdvenTOUR is a driver-guided journey
              with round-trip Dallas transport and a Waco sightseeing itinerary. The supplier names Magnolia Market,
              Magnolia Table, the Dr Pepper Museum area, Hotel 1928, Cottonland Castle exteriors and the Suspension Bridge among its stops.
              Actual sequence and time at each location depend on the operator's current itinerary.
            </p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              The Viator listing currently points to DART Market Center Station Park & Ride, 2214 Wycliff Avenue, Dallas,
              for pickup. That is <strong>not a Waco-origin tour</strong>; verify your assigned pickup before booking travel or hotels.
            </p>
          </div>
          <div>
            <h2 className="font-display text-3xl">What is not automatically included</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              The supplier's itinerary identifies Dr Pepper Museum admission as not included, so don't confuse a photo stop with museum entry.
              Similarly, Cottonland Castle is a private historic home with separately ticketed Magnolia Castle Tours:
              a short exterior look does not grant access inside. A reservation at Magnolia Table is not the same as a prepaid meal.
            </p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Most importantly, Viator's current detailed terms list this AdvenTOUR as <strong>non-refundable</strong>.
              Check the full cancellation section, exclusions and departure information for the exact product before paying.
              Prices and remaining places are controlled by the booking provider.
            </p>
          </div>
        </section>

        <WacoViatorExperienceCards kind="dallas" title="Book the Dallas–Waco Magnolia AdvenTOUR" />

        <section className="mt-12">
          <h2 className="font-display text-3xl">How to plan the eight-hour excursion</h2>
          <ol className="mt-6 grid gap-6 md:grid-cols-3">
            <li className="border-t-2 border-foreground pt-4"><p className="eyebrow text-primary">Before departure</p><h3 className="mt-2 font-display text-2xl">Confirm the Dallas pickup</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Review the current booking confirmation, pickup point, time, luggage rules and refund policy. Allow for Dallas traffic and the return drive.</p></li>
            <li className="border-t-2 border-foreground pt-4"><p className="eyebrow text-primary">In Waco</p><h3 className="mt-2 font-display text-2xl">Choose your priority stops</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Shopping at Magnolia, riverfront views and a museum interior have different time demands. Ask the supplier whether there is enough time for the places that matter most.</p></li>
            <li className="border-t-2 border-foreground pt-4"><p className="eyebrow text-primary">Before booking extras</p><h3 className="mt-2 font-display text-2xl">Verify tickets separately</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Do not assume hotel, museum or castle admission is included unless your exact booking confirms it. Magnolia's official site controls its own ticketed experiences.</p></li>
          </ol>
        </section>

        <section className="mt-12 grid gap-10 border-t border-border pt-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl">Prefer to visit Waco independently?</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Visitors already in Waco generally do not need to buy an eight-hour Dallas-origin round trip. Start with the historic
              downtown museums and riverfront, then drive separately to the Castle Heights neighborhood only with a confirmed official Castle Tour reservation.
              Self-planned visits give more time at individual attractions but require managing parking and admission independently.
            </p>
            <a className="mt-4 inline-block text-primary underline underline-offset-4" href="/waco-ghost-tours">See shorter Waco ghost walking experiences →</a>
          </div>
          <div>
            <h2 className="font-display text-3xl">Waco attraction guides to read first</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7">
              <li><a className="text-primary underline underline-offset-4" href="/destination/magnolia-market-at-the-silos">Magnolia Market at the Silos visitor guide →</a></li>
              <li><a className="text-primary underline underline-offset-4" href="/destination/cottonland-castle">Cottonland Castle tour access and history →</a></li>
              <li><a className="text-primary underline underline-offset-4" href="/destination/dr-pepper-museum-waco">Dr Pepper Museum visitor guide →</a></li>
              <li><a className="text-primary underline underline-offset-4" href="/destination/waco-suspension-bridge">Waco Suspension Bridge and riverfront →</a></li>
              <li><a className="text-primary underline underline-offset-4" href="/county/mclennan">McLennan County guide →</a></li>
            </ul>
          </div>
        </section>
        <p className="mt-8 text-sm leading-7 text-muted-foreground">Plan additional self-guided stops using the <a href="/waco-attractions" className="font-semibold text-primary underline underline-offset-4">Waco attractions and visitor guide</a>, with independent museum, food, and family itinerary information.</p>
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="font-display text-3xl">Source and review</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Booking-specific facts were checked on October 20, 2026 against the
            <a href="https://www.viator.com/tours/Dallas/The-Magnolia-Adventour-Waco-Highlights/d918-5555414P1" target="_blank" rel="noopener noreferrer" className="mx-1 text-primary underline underline-offset-4">Viator product detail page</a>
            and should be rechecked before payment. See <a href="https://magnolia.com/pages/tours" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">Magnolia's official tours</a> for separate interior-access offers.
          </p>
        </section>
      </Container>
    </main>
  );
}
