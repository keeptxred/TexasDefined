import "../network.css";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import hillCountryHero from "@/assets/hero-hill-country.jpg";

export const Route = createLazyFileRoute("/network/join")({ component: NetworkJoinPreview });

const benefits = [
  ["One place to belong", "Your business lives within TexasDefined, with an address Texans can share and remember."],
  ["Found in relevant places", "Approved business information can appear in our directory, search, and matching Explore and community pages."],
  ["You stay in control", "Manage your information through one owner portal. No website-design experience needed."],
];

const tiers = [
  {
    name: "Texas Defined Basic",
    price: "Free",
    frequency: "forever",
    note: "A place in the TexasDefined network, even if you don't have a website.",
    features: [
      "Business name, category, and community",
      "Short description, hours, and service area",
      "Phone number and location details",
      "Reviewed, searchable TexasDefined listing",
    ],
    status: "Free membership",
    featured: false,
  },
  {
    name: "Texas Defined Plus",
    price: "$19.99",
    frequency: "/ month",
    note: "Give visitors more detail about your business.",
    features: [
      "Everything in Basic",
      "Services and a longer business description",
      "Photos, frequently asked questions, and updates",
      "Official website and social links, if you have them",
      "Basic profile and contact-action statistics",
    ],
    status: "Expanded business profile",
    featured: false,
  },
  {
    name: "Texas Defined Featured",
    price: "$49.95",
    frequency: "/ month",
    note: "A richer presence and clearly marked visibility in the business directory.",
    features: [
      "Everything in Plus",
      "Featured placement labeled as sponsored",
      "Enhanced visitor and contact-action reporting",
      "Owner-managed information with publication review",
    ],
    status: "Planned — not yet enrolling",
    featured: false,
  },
  {
    name: "Texas Defined Business Presence",
    price: "$79.99",
    frequency: "/ month",
    note: "Your own professional business home, built inside the TexasDefined family.",
    features: [
      "Everything in Featured",
      "A polished TexasDefined-branded business page",
      "Automatic setup from one simple form",
      "Up to 12 photos and your business logo",
      "Private portal with unlimited self-service edits",
      "Services, photos, hours, contact details, and SEO basics",
      "No setup fee or separate website hosting required",
    ],
    status: "Planned — not yet enrolling",
    featured: true,
  },
];

function NetworkJoinPreview() {
  return (
    <div>
      <section className="relative isolate overflow-hidden bg-[#f7eddf]">
        <div aria-hidden="true" className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${hillCountryHero})` }} />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#fff8ed]/95 via-[#fff8ed]/85 to-[#fff8ed]/35" />
        <Container width="wide" className="relative py-12 sm:py-16">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,.8fr)]">
            <div className="relative z-10 min-w-0">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#b43b1a]">The TexasDefined business family</p>
              <h1 className="mt-5 max-w-[760px] font-display text-[clamp(2.6rem,4.8vw,4.8rem)] font-bold leading-[1.06] tracking-tight text-[#0a2242]">Your business belongs <span className="text-[#b53e20]">in TexasDefined.</span></h1>
              <p className="mt-5 max-w-[650px] text-lg leading-8 text-[#24354a]">Give Texans a reliable place to find your business. Join our network, manage your details in one place, and become part of relevant TexasDefined discovery experiences.</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#membership" className="inline-flex rounded-full bg-[#b53e20] px-7 py-3 text-sm font-semibold text-white hover:bg-[#982e17] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#982e17]">Explore membership</a>
                <a href="/network/directory" className="inline-flex rounded-full border border-[#0a2242] px-6 py-3 text-sm font-semibold text-[#0a2242] hover:bg-white/80">Browse the network</a>
              </div>
              <p className="mt-4 text-sm text-[#31485b]">Start free. No setup fee. No separate website required.</p>
            </div>
            <div className="relative mx-auto flex w-full max-w-[390px] items-center justify-center" aria-label="Texas map illustrating network locations">
              <svg viewBox="0 0 280 260" className="h-auto w-full drop-shadow-2xl" role="img" aria-label="Texas state map with business discovery locations">
                <defs><linearGradient id="network-texas-fill" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#e7a46a"/><stop offset=".48" stopColor="#b2aa65"/><stop offset="1" stopColor="#237b70"/></linearGradient></defs>
                <path d="M7 119 L14 121 L21 127 L27 131 L35 145 L42 156 L50 166 L55 168 L66 171 L75 181 L80 183 L89 181 L99 179 L107 180 L120 181 L125 180 L132 192 L142 206 L153 215 L158 226 L168 239 L175 243 L186 249 L192 252 L197 250 L195 239 L193 224 L197 209 L211 200 L223 189 L237 180 L246 173 L265 165 L265 157 L268 150 L266 142 L269 133 L263 125 L260 115 L259 106 L259 78 L251 76 L244 78 L239 72 L232 71 L226 69 L220 71 L212 72 L204 72 L198 74 L191 70 L183 68 L176 64 L168 64 L160 62 L150 59 L140 55 L140 11 L80 11 L80 113 L10 113 Z" fill="url(#network-texas-fill)" stroke="#fff" strokeWidth="2.5" strokeLinejoin="round"/>
                <g fill="#b53e20" stroke="white" strokeWidth="1.4"><circle cx="117" cy="145" r="5"/><circle cx="164" cy="104" r="5"/><circle cx="225" cy="139" r="5"/><circle cx="185" cy="169" r="5"/><circle cx="141" cy="194" r="5"/><circle cx="94" cy="153" r="5"/></g>
                <circle cx="175" cy="130" r="12" fill="#145571" stroke="white" strokeWidth="2.5"/><text x="175" y="135" textAnchor="middle" fontSize="14" fill="white">★</text>
              </svg>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-background">
        <Container className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-primary">Why join</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl">Your place in a connected Texas.</h2>
            <p className="mt-4 leading-7 text-muted-foreground">From neighborhood shops to tour operators, restaurants and community organizations, TexasDefined helps Texans discover the people behind the places they love.</p>
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
        <Container className="py-14 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-primary">Choose your place</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl">Straightforward membership. No surprises.</h2>
            <p className="mt-4 leading-7 text-muted-foreground">All four plans are part of one TexasDefined network. Choose the presence your business needs today, with no setup fee and no pressure to buy extras.</p>
          </div>
          <div className="mt-10 grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4">
            {tiers.map((tier) => (
              <article key={tier.name} className={`flex min-w-0 flex-col rounded-3xl border bg-background p-6 shadow-sm sm:p-7 ${tier.featured ? "border-primary ring-1 ring-primary/30" : "border-border"}`}>
                <div className="flex min-h-16 flex-wrap items-start justify-between gap-2">
                  <h3 className="max-w-48 font-display text-2xl leading-tight">{tier.name}</h3>
                  {tier.featured && <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Business home</span>}
                </div>
                <p className="mt-4 text-3xl font-semibold">{tier.price}<span className="ml-2 text-sm font-normal text-muted-foreground">{tier.frequency}</span></p>
                <p className="mt-4 min-h-20 text-sm leading-6 text-muted-foreground">{tier.note}</p>
                <ul className="mt-5 flex-1 space-y-3 border-t border-border pt-5">
                  {tier.features.map((item) => <li key={item} className="flex gap-3 text-sm leading-6"><span className="font-bold text-primary" aria-hidden="true">✓</span><span>{item}</span></li>)}
                </ul>
                {(tier.name === "Texas Defined Basic" || tier.name === "Texas Defined Plus") ?
                  <>
                    <a href={tier.name === "Texas Defined Basic" ? "/network/example/basic" : "/network/example/plus"} className="mt-7 block rounded-full border border-primary px-4 py-3 text-center text-sm font-semibold text-primary hover:bg-primary/10">See a {tier.name === "Texas Defined Basic" ? "Basic" : "Plus"} example</a>
                    <a href={`/network/apply?plan=${tier.name === "Texas Defined Basic" ? "basic" : "plus"}`} className="mt-3 block rounded-full bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground hover:opacity-90">Choose {tier.name === "Texas Defined Basic" ? "Basic" : "Plus"}</a>
                  </> :
                  <a href={tier.name === "Texas Defined Featured" ? "/partner-with-us" : "mailto:admin@texasdefined.com?subject=TexasDefined%20Business%20Presence%20Interest"} className="mt-7 block rounded-full border border-primary px-4 py-3 text-center text-sm font-semibold text-primary hover:bg-primary/10">Ask about this plan</a>}
                <p className="mt-3 text-center text-xs leading-5 text-muted-foreground">{tier.status}</p>
              </article>
            ))}
          </div>
          <p className="mx-auto mt-7 max-w-4xl text-center text-sm leading-6 text-muted-foreground">Every published business presence belongs to TexasDefined. Approved information can surface in relevant searches, guides and Explore pages; placements depend on relevance, and search-engine indexing or ranking is never guaranteed. Sponsored placements are clearly labeled. Featured and Business Presence enrollment is not open yet.</p>
        </Container>
      </section>

      <section id="optional-extras" className="bg-background">
        <Container className="py-14 sm:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-primary">Only if you want them</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">A couple of optional conveniences.</h2>
            <p className="mt-3 leading-7 text-muted-foreground">Your TexasDefined address works on its own. A custom domain or business email is a separate choice, never an automatic add-on.</p>
          </div>
          <div className="mx-auto mt-9 grid max-w-5xl gap-5 md:grid-cols-2">
            <article className="rounded-2xl border border-border bg-surface p-6 sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="font-display text-2xl">Your own domain name</h3>
                <p className="text-lg font-bold">$39.99 <span className="text-sm font-normal text-muted-foreground">/ year</span></p>
              </div>
              <p className="mt-3 leading-7 text-muted-foreground">A domain like yourbusiness.com forwards visitors to your TexasDefined page. No separate website or hosting package to manage.</p>
              <p className="mt-4 text-xs leading-6 text-muted-foreground">Proposed price for eligible standard domains. Domain availability, renewal cost and final supplier terms must be confirmed before ordering. Premium domains priced separately.</p>
            </article>
            <article className="rounded-2xl border border-border bg-surface p-6 sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="font-display text-2xl">Professional business email</h3>
                <p className="text-lg font-bold">~$6.99 <span className="text-sm font-normal text-muted-foreground">/ mailbox / month</span></p>
              </div>
              <p className="mt-3 leading-7 text-muted-foreground">Email like hello@yourbusiness.com, delivered through a familiar Microsoft Outlook service. Sign in and manage your inbox with the provider.</p>
              <p className="mt-4 text-xs leading-6 text-muted-foreground">Illustrative price only, not an available subscription. We're confirming official distributor pricing, eligibility and automated setup. Requires a domain you control.</p>
            </article>
          </div>
          <p className="mx-auto mt-6 max-w-4xl text-center text-sm leading-6 text-muted-foreground">No setup fee. No add-ons are preselected, available for checkout or billed today. Domain registration, forwarding and business email will only be offered after supplier integrations and end-to-end testing are complete.</p>
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
              ["01", "Tell us about your business", "Complete a simple form with your business name, location, services and photos."],
              ["02", "See your TexasDefined presence", "A branded template is assembled from your details, then reviewed before it goes public."],
              ["03", "Keep everything up to date", "Use your owner portal to manage details as often as needed; reviewed updates appear in relevant discovery experiences."],
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
          <p className="eyebrow text-primary">One Texas. Everything Connected.</p>
          <h2 className="mx-auto mt-3 max-w-3xl font-display text-4xl sm:text-5xl">Every Texas story deserves to be found.</h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-muted-foreground">Connecting the people, places, and organizations that make Texas what it is.</p>
          <a href="/network/directory" className="mt-8 inline-flex rounded-full border border-primary bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground">Explore the Texas Defined Network</a>
        </Container>
      </section>
    </div>
  );
}
