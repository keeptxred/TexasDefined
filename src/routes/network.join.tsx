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
      <section className="relative isolate overflow-hidden bg-[#f7eddf]">
        <div aria-hidden="true" className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${hillCountryHero})` }} />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#fff8ed]/95 via-[#fff8ed]/70 to-[#fff8ed]/10" />
        <Container width="wide" className="relative py-12 sm:py-20 lg:py-24">
          <div className="grid min-h-[570px] items-center gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
            <div className="relative z-10 min-w-0">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#b43b1a]">One Texas. Everything Connected.</p>
              <h1 className="mt-7 max-w-[760px] font-display text-[clamp(2.8rem,5.1vw,6rem)] font-bold leading-[1.01] tracking-tight text-[#0a2242]">Put Your Business <span className="block">on the <span className="text-[#b53e20]">Texas Map</span></span></h1>
              <p className="mt-7 max-w-[650px] text-lg leading-8 text-[#24354a] sm:text-xl">Join a growing community of Texas businesses. Get discovered by local customers, build your reputation, and be part of a stronger, more connected Texas.</p>
              <form role="search" onSubmit={(event) => { event.preventDefault(); document.getElementById("membership")?.scrollIntoView({ behavior: "smooth" }); }} className="mt-8 flex max-w-[690px] items-center gap-2 rounded-full bg-white/95 p-2 shadow-lg">
                <label className="sr-only" htmlFor="network-search-preview">Search Texas Defined</label>
                <input id="network-search-preview" type="search" placeholder="Search for businesses, categories, or cities..." className="min-w-0 flex-1 rounded-full bg-transparent px-4 py-3 text-sm text-[#12304e] outline-none sm:text-base" />
                <button type="submit" className="rounded-full bg-[#b53e20] px-7 py-3 font-semibold text-white">Explore</button>
              </form>
              <p className="mt-3 text-xs text-[#31485b]">Search is a visual preview; business submissions are not open.</p>
              <div className="mt-10 grid max-w-[680px] grid-cols-2 gap-4 text-center text-sm font-medium text-[#0a2242] sm:grid-cols-4">
                {[
                  ["⌕","Discover","Local Businesses"],
                  ["♟","Support","Texas Communities"],
                  ["★","Shop Local","Keep Texas Strong"],
                  ["✦","From Small Towns","to Big Cities"],
                ].map(([icon, heading, sub]) => <div key={heading}><span aria-hidden="true" className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-[#fbdcb2] text-2xl text-[#ac4525]">{icon}</span><strong className="block">{heading}</strong><span className="text-xs">{sub}</span></div>)}
              </div>
            </div>
            <div className="relative mx-auto flex w-full max-w-[680px] items-center justify-center" aria-label="Texas map illustrating network locations">
              <svg viewBox="0 0 280 260" className="h-auto w-full drop-shadow-2xl" role="img" aria-label="Texas state map with business discovery locations">
                <defs><linearGradient id="network-texas-fill" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#e7a46a"/><stop offset=".48" stopColor="#b2aa65"/><stop offset="1" stopColor="#237b70"/></linearGradient></defs>
                <path d="M7 119 L14 121 L21 127 L27 131 L35 145 L42 156 L50 166 L55 168 L66 171 L75 181 L80 183 L89 181 L99 179 L107 180 L120 181 L125 180 L132 192 L142 206 L153 215 L158 226 L168 239 L175 243 L186 249 L192 252 L197 250 L195 239 L193 224 L197 209 L211 200 L223 189 L237 180 L246 173 L265 165 L265 157 L268 150 L266 142 L269 133 L263 125 L260 115 L259 106 L259 78 L251 76 L244 78 L239 72 L232 71 L226 69 L220 71 L212 72 L204 72 L198 74 L191 70 L183 68 L176 64 L168 64 L160 62 L150 59 L140 55 L140 11 L80 11 L80 113 L10 113 Z" fill="url(#network-texas-fill)" stroke="#fff" strokeWidth="2.5" strokeLinejoin="round"/>
                <g fill="#b53e20" stroke="white" strokeWidth="1.4"><circle cx="117" cy="145" r="5"/><circle cx="164" cy="104" r="5"/><circle cx="225" cy="139" r="5"/><circle cx="185" cy="169" r="5"/><circle cx="141" cy="194" r="5"/><circle cx="94" cy="153" r="5"/></g>
                <circle cx="175" cy="130" r="12" fill="#145571" stroke="white" strokeWidth="2.5"/><text x="175" y="135" textAnchor="middle" fontSize="14" fill="white">★</text>
              </svg>
              <div className="absolute bottom-[24%] right-[16%] rounded-full bg-white px-4 py-2 text-xs font-bold text-[#0a2242] shadow-xl">Your business here</div>
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
