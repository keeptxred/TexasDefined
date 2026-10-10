import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Container } from "@/components/layout/Container";

export const Route = createFileRoute("/network/join")({
  head: () => ({
    meta: [
      { title: "Join the Texas Defined Network | Private Preview" },
      { name: "description", content: "Preview a free Texas Defined Network listing and future partner options." },
      { name: "robots", content: "noindex, nofollow, noarchive" },
    ],
  }),
  component: NetworkJoinPreview,
});

const benefits = [
  ["Be discoverable", "Give Texans a simple place to learn who you are and how to reach you."],
  ["Keep your identity", "Use your own business name, branding, and official website link."],
  ["Connect to Texas", "Be part of a growing network of communities, organizations and local places."],
];

const tiers = [
  {
    name: "Free Listing",
    price: "Free",
    frequency: "forever",
    note: "Your own page within Texas Defined. No website required.",
    features: ["Name and business category", "Brief description", "Phone and location or service area", "Business hours", "Website link, if you have one", "Discoverable in relevant Texas Defined searches"],
    status: "Preview — not accepting submissions",
    featured: true,
  },
  {
    name: "Network Plus",
    price: "Coming soon",
    frequency: "",
    note: "A richer home for your story and services.",
    features: ["Everything in Free", "Expanded descriptions and sections", "Photo galleries", "Social and contact links", "Additional business information", "Basic listing insights"],
    status: "Coming soon",
    featured: false,
  },
  {
    name: "Network Featured",
    price: "Coming soon",
    frequency: "",
    note: "More ways to tell your story and reach new visitors.",
    features: ["Everything in Plus", "Promotional opportunities", "Clearly labeled sponsored placements", "Optional sponsored business stories", "Expanded insights", "Additional campaign options"],
    status: "Coming soon",
    featured: false,
  },
];

function NetworkJoinPreview() {
  const [showExample, setShowExample] = useState(false);
  return (
    <main>
      <section className="border-b border-border bg-surface">
        <Container className="py-16 sm:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">Texas Defined Network · Private preview</span>
            <p className="eyebrow mt-8 text-primary">One Texas. Everything Connected.</p>
            <h1 className="mt-4 font-display text-5xl leading-[1.06] text-foreground sm:text-7xl">Put your business on the Texas map.</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">Every Texas business and organization has a story. Make yours discoverable through the growing Texas Defined Network.</p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a href="#membership" className="rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground transition hover:opacity-90">Explore membership options</a>
              <button type="button" onClick={() => setShowExample(!showExample)} className="rounded-full border border-border bg-background px-7 py-3 font-semibold text-foreground transition hover:border-primary">{showExample ? "Hide sample listing" : "See an example listing"}</button>
            </div>
            <p className="mt-5 text-sm text-muted-foreground">Concept preview only. Listings, accounts and payments are not yet open.</p>
          </div>
        </Container>
      </section>

      {showExample && (
        <section aria-label="Illustrative listing" className="border-b border-border bg-background">
          <Container className="py-10">
            <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-surface p-7 shadow-sm sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">Sample listing — fictional business</p>
              <h2 className="mt-3 font-display text-4xl">Lone Star Heritage Workshop</h2>
              <p className="mt-2 text-sm text-muted-foreground">Katy, Texas · Arts &amp; Heritage</p>
              <p className="mt-5 leading-7 text-muted-foreground">A sample neighborhood workshop sharing Texas crafts, demonstrations, and community classes. This fictional listing illustrates the free directory layout.</p>
              <div className="mt-6 grid gap-4 border-t border-border pt-6 text-sm sm:grid-cols-2">
                <div><strong>Hours</strong><p className="mt-1 text-muted-foreground">Tuesday–Saturday · 10 AM–5 PM (example)</p></div>
                <div><strong>Contact</strong><p className="mt-1 text-muted-foreground">Phone and official website will appear here.</p></div>
              </div>
            </div>
          </Container>
        </section>
      )}

      <section className="bg-background">
        <Container className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-primary">Why join</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl">Your place in a connected Texas.</h2>
            <p className="mt-4 leading-7 text-muted-foreground">From museums and historical societies to neighborhood shops, local attractions, and community organizations: Texas Defined helps people find what makes each place worth discovering.</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {benefits.map(([heading, body]) => (
              <div key={heading} className="rounded-2xl border border-border bg-surface p-7">
                <div className="mb-5 h-1 w-12 rounded-full bg-primary" />
                <h3 className="font-display text-2xl">{heading}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="membership" className="border-y border-border bg-surface scroll-mt-24">
        <Container className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-primary">Network membership</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl">Start free. Grow with Texas.</h2>
            <p className="mt-4 leading-7 text-muted-foreground">Every eligible organization can have a useful basic profile. Enhanced storytelling and optional promotional tools are planned for later.</p>
          </div>
          <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
            {tiers.map((tier) => (
              <article key={tier.name} className={`flex flex-col rounded-3xl border bg-background p-7 shadow-sm ${tier.featured ? "border-primary ring-1 ring-primary/30" : "border-border"}`}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-display text-2xl">{tier.name}</h3>
                  {tier.featured && <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Start here</span>}
                </div>
                <p className="mt-6 text-3xl font-semibold">{tier.price}<span className="ml-2 text-sm font-normal text-muted-foreground">{tier.frequency}</span></p>
                <p className="mt-4 min-h-14 leading-7 text-muted-foreground">{tier.note}</p>
                <ul className="mt-6 flex-1 space-y-4 border-t border-border pt-6">
                  {tier.features.map((item) => <li key={item} className="flex gap-3 text-sm leading-6"><span className="font-bold text-primary" aria-hidden="true">✓</span><span>{item}</span></li>)}
                </ul>
                <div className="mt-8 rounded-full bg-surface px-4 py-3 text-center text-sm font-medium text-muted-foreground">{tier.status}</div>
              </article>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-6 text-muted-foreground">Paid promotions will be identified as sponsored. Paying for services will not determine inclusion in independent editorial coverage or organic search rankings.</p>
        </Container>
      </section>

      <section className="bg-background">
        <Container className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-primary">How it will work</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl">Three simple steps.</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              ["01", "Tell us about your organization", "Share your name, location, category, hours, contact details and story."],
              ["02", "We review your listing", "We verify submissions and check for duplicates before publication."],
              ["03", "Texans can discover you", "Your approved page becomes part of relevant Texas Defined discovery experiences."],
            ].map(([number, heading, body]) => (
              <div key={number} className="rounded-2xl bg-surface p-7">
                <span className="text-sm font-bold tracking-widest text-primary">{number}</span>
                <h3 className="mt-4 font-display text-2xl">{heading}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-surface">
        <Container className="py-16 text-center sm:py-20">
          <p className="eyebrow text-primary">The next chapter of Texas Defined</p>
          <h2 className="mx-auto mt-3 max-w-3xl font-display text-4xl sm:text-5xl">Every Texas story deserves to be found.</h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-muted-foreground">We're shaping a statewide discovery network for the people, places and organizations that make Texas what it is.</p>
          <span className="mt-8 inline-flex rounded-full border border-border bg-background px-7 py-3 text-sm font-semibold text-muted-foreground">Free listing submissions opening soon</span>
        </Container>
      </section>
    </main>
  );
}
