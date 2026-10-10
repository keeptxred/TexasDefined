import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import hillCountryHero from "@/assets/hero-hill-country.jpg";

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
    name: "Texas Defined Basic",
    price: "Free",
    frequency: "forever",
    note: "A simple, searchable introduction to your business or organization.",
    features: ["Name, category, and Texas community", "Brief business description", "Phone number and address or service area", "Basic business hours", "Searchable Texas Defined profile", "No prominent website or social-media buttons"],
    status: "Preview — submissions opening soon",
    featured: false,
  },
  {
    name: "Texas Defined Plus",
    price: "$19.99",
    frequency: "/ month",
    note: "Your expanded business presence, with more ways for customers to connect.",
    features: ["Everything in Basic", "Prominent official website link", "Social-media profile links", "Longer description and services", "Photo gallery and FAQs", "Events or special offers", "Basic listing performance statistics"],
    status: "Coming soon — not accepting payments",
    featured: true,
  },
  {
    name: "Texas Defined Featured",
    price: "Coming soon",
    frequency: "",
    note: "Additional opportunities to tell your story and reach Texas visitors.",
    features: ["Everything in Plus", "Expanded photo and content options", "Optional, clearly labeled sponsored placements", "Optional sponsored business stories", "Additional promotional opportunities", "Expanded performance insights"],
    status: "Coming soon",
    featured: false,
  },
];

function NetworkJoinPreview() {
  return (
    <main>
      <section className="relative isolate overflow-hidden border-b border-border bg-[#f3eee6]">
        <div aria-hidden="true" className="absolute inset-0 bg-cover bg-center opacity-45" style={{ backgroundImage: `url(${hillCountryHero})` }} />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#fbf9f3]/95 via-[#fbf9f3]/85 to-[#fbf9f3]/35" />
        <Container className="relative py-14 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,.92fr)]">
            <div className="min-w-0">
              <p className="eyebrow text-[#b65338]">One Texas. Everything Connected.</p>
              <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.8rem,5vw,5.5rem)] leading-[1.04] tracking-tight text-foreground">Put your business on the Texas map.</h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-foreground/85">Every Texas business and organization has a story. Make yours discoverable through the growing Texas Defined Network.</p>
              <a href="#membership" className="mt-8 inline-block rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground hover:opacity-90">Compare listing options</a>
              <p className="mt-4 text-sm text-foreground/70">Preview only · Submissions and payments are not open.</p>
            </div>
            <div className="min-w-0">
              <div className="relative mx-auto w-full max-w-[510px] overflow-hidden rounded-[2rem] border border-[#d8c9b8] bg-[#fff8ea]/90 p-5 shadow-xl backdrop-blur-sm sm:p-8">
                <div className="mb-4 flex items-center justify-between gap-2 text-xs font-semibold uppercase tracking-widest text-[#a55b3d]"><span>Discover all across Texas</span><span aria-hidden="true">★</span></div>
                <div className="relative mx-auto aspect-[1.12] w-full overflow-hidden">
                  <svg viewBox="0 0 280 260" className="absolute inset-0 h-full w-full" role="img" aria-label="Illustrated map of Texas with location markers" preserveAspectRatio="xMidYMid meet">
                    <path d="M7 119 L14 121 L21 127 L27 131 L35 145 L42 156 L50 166 L55 168 L66 171 L75 181 L80 183 L89 181 L99 179 L107 180 L120 181 L125 180 L132 192 L142 206 L153 215 L158 226 L168 239 L175 243 L186 249 L192 252 L197 250 L195 239 L193 224 L197 209 L211 200 L223 189 L237 180 L246 173 L265 165 L265 157 L268 150 L266 142 L269 133 L263 125 L260 115 L259 106 L259 78 L251 76 L244 78 L239 72 L232 71 L226 69 L220 71 L212 72 L204 72 L198 74 L191 70 L183 68 L176 64 L168 64 L160 62 L150 59 L140 55 L140 11 L80 11 L80 113 L10 113 Z" fill="#efdac4" fillOpacity=".90" stroke="#b9785e" strokeWidth="2.2" strokeLinejoin="round"/>
                    <g fill="#b9563d" stroke="#fff6ec" strokeWidth="1.2"><circle cx="120" cy="137" r="4"/><circle cx="153" cy="94" r="4"/><circle cx="222" cy="117" r="4"/><circle cx="187" cy="171" r="4"/><circle cx="155" cy="199" r="4"/><circle cx="105" cy="170" r="4"/></g>
                    <circle cx="177" cy="126" r="13" fill="#245d70" stroke="#fff8ed" strokeWidth="3" />
                    <text x="177" y="132" fontSize="15" textAnchor="middle" fill="white">★</text>
                  </svg>
                </div>
                <div className="relative -mt-3 mx-auto w-fit max-w-full rounded-full border border-[#e1d6c9] bg-white px-5 py-2 text-center text-sm font-semibold text-[#245d70] shadow-sm">Your business here</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

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
            <p className="mt-4 leading-7 text-muted-foreground">Start with a basic searchable listing at no cost. A $19.99/month enhanced profile and future promotional tools are planned but not yet available.</p>
          </div>
          <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
            {tiers.map((tier) => (
              <article key={tier.name} className={`flex flex-col rounded-3xl border bg-background p-7 shadow-sm ${tier.featured ? "border-primary ring-1 ring-primary/30" : "border-border"}`}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-display text-2xl">{tier.name}</h3>
                  {tier.featured && <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Most popular</span>}
                </div>
                <p className="mt-6 text-3xl font-semibold">{tier.price}<span className="ml-2 text-sm font-normal text-muted-foreground">{tier.frequency}</span></p>
                <p className="mt-4 min-h-14 leading-7 text-muted-foreground">{tier.note}</p>
                <ul className="mt-6 flex-1 space-y-4 border-t border-border pt-6">
                  {tier.features.map((item) => <li key={item} className="flex gap-3 text-sm leading-6"><span className="font-bold text-primary" aria-hidden="true">✓</span><span>{item}</span></li>)}
                </ul>
                {tier.name !== "Texas Defined Featured" && <a href={tier.name === "Texas Defined Basic" ? "/network/example/basic" : "/network/example/plus"} className="mt-8 block rounded-full border border-primary px-4 py-3 text-center text-sm font-semibold text-primary hover:bg-primary/10">See {tier.name === "Texas Defined Basic" ? "Basic" : "Plus"} example listing</a>}<div className="mt-3 rounded-full bg-surface px-4 py-3 text-center text-sm font-medium text-muted-foreground">{tier.status}</div>
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
