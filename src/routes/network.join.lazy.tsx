import "../network.css";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ADVERTISING_PLANS, WEBSITE_HOSTING_TIERS } from "@/data/network-commercial-model";
import { Container } from "@/components/layout/Container";
import hillCountryHero from "@/assets/hero-hill-country.jpg";

export const Route = createLazyFileRoute("/network/join")({ component: NetworkJoinPreview });

const benefits = [
  ["One place to belong", "Your business lives within TexasDefined, with an address Texans can share and remember."],
  ["Found in relevant places", "Approved business information can appear in our directory, search, and matching Explore and community pages."],
  ["You stay in control", "Manage your information through one owner portal. No website-design experience needed."],
];


function NetworkJoinPreview() {
  const [selectedProduct,setSelectedProduct]=useState<"advertising"|"hosting">("advertising");
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
              <p className="mt-5 max-w-[650px] text-lg leading-8 text-[#24354a]">Reach Texans with a relevant business listing, build a professional website hosted by TexasDefined, or choose both. You stay in control.</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#membership" className="inline-flex rounded-full bg-[#b53e20] px-7 py-3 text-sm font-semibold text-white hover:bg-[#982e17] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#982e17]">Explore options</a>
                <a href="/network/directory" className="inline-flex rounded-full border border-[#0a2242] px-6 py-3 text-sm font-semibold text-[#0a2242] hover:bg-white/80">Browse the network</a>
              </div>
              <p className="mt-4 text-sm text-[#31485b]">Advertising and website hosting are separate choices. Start with a free listing.</p>
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
            <p className="eyebrow text-primary">Choose what your business needs</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl">Two services. One TexasDefined network.</h2>
            <p className="mt-4 leading-7 text-muted-foreground">Advertise where your business is relevant, or build a website hosted by TexasDefined. Choose either service on its own—or both. You don't need to buy advertising to have a website.</p>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-2 rounded-2xl border border-border bg-background p-2" role="group" aria-label="Choose a service">
            <button type="button" aria-pressed={selectedProduct==="advertising"}
              onClick={()=>setSelectedProduct("advertising")}
              className={`rounded-xl px-3 py-4 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${selectedProduct==="advertising"?"bg-primary text-primary-foreground":"text-foreground hover:bg-surface"}`}>
              Advertise my business
            </button>
            <button type="button" aria-pressed={selectedProduct==="hosting"}
              onClick={()=>setSelectedProduct("hosting")}
              className={`rounded-xl px-3 py-4 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${selectedProduct==="hosting"?"bg-primary text-primary-foreground":"text-foreground hover:bg-surface"}`}>
              Build my website
            </button>
          </div>
          {selectedProduct==="advertising" ?
            <div id="advertising-plans" className="mt-10" aria-live="polite">
              <div className="mx-auto max-w-3xl text-center">
                <h3 className="font-display text-3xl">Business advertising</h3>
                <p className="mt-3 text-muted-foreground">Appear only where your business genuinely fits—like fishing guides on a Lake Conroe page. Paid priority determines the order and size of qualifying listings, not independent editorial recommendations.</p>
              </div>
              <div className="mt-8 grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4">
                {ADVERTISING_PLANS.map(tier=><article key={tier.id} className="flex flex-col rounded-2xl border border-border bg-background p-6">
                  <h4 className="font-display text-2xl">{tier.title}</h4>
                  <p className="mt-4 text-xl font-semibold">{tier.id==="basic"?"Free":"Price to be finalized"}</p>
                  <p className="mt-4 flex-1 text-sm leading-7 text-muted-foreground">{tier.illustration}.</p>
                  <p className="mt-5 border-t border-border pt-4 text-sm">{tier.placementPriority===0?"Standard position":tier.placementPriority===1?"Above free listings":tier.placementPriority===2?"Above expanded listings":"Highest eligible advertising tier"}</p>
                  {tier.sponsored&&<p className="mt-2 text-xs text-muted-foreground">Paid position labeled sponsored</p>}
                  {tier.id==="basic" ?
                   <a href="/network/example/basic" className="mt-6 rounded-full border border-primary px-4 py-3 text-center text-sm font-semibold text-primary">See a free listing</a>:
                   tier.id==="plus" ?
                   <a href="/network/example/plus" className="mt-6 rounded-full border border-primary px-4 py-3 text-center text-sm font-semibold text-primary">See a listing example</a>:
                   <a href="mailto:admin@texasdefined.com?subject=TexasDefined%20Advertising%20Inquiry" className="mt-6 rounded-full border border-primary px-4 py-3 text-center text-sm font-semibold text-primary">Ask about advertising</a>}
                </article>)}
              </div>
              <p className="mx-auto mt-7 max-w-4xl text-center text-sm leading-6 text-muted-foreground">Only independently approved businesses that actually serve the page's topic or area qualify. Paid listings are disclosed as sponsored. No ranking, traffic, lead volume or editorial recommendation is guaranteed. Paid advertising pricing is under review; the existing Plus Stripe configuration is not changed.</p>
            </div>
          : <div id="hosting-plans" className="mt-10" aria-live="polite">
              <div className="mx-auto max-w-3xl text-center">
                <h3 className="font-display text-3xl">Your own business website</h3>
                <p className="mt-3 text-muted-foreground">Your website lives on TexasDefined, with individual pages for your business and a private self-service editor. No separate website host or custom design project required.</p>
              </div>
              <div className="mx-auto mt-8 grid max-w-6xl items-stretch gap-5 md:grid-cols-3">
                {WEBSITE_HOSTING_TIERS.map((tier,i)=><article key={tier.id} className={`flex flex-col rounded-2xl border bg-background p-7 ${i===1?"border-primary":"border-border"}`}>
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">{i===0?"Simple start":i===1?"Room to grow":"Fuller site"}</p>
                  <h4 className="mt-3 font-display text-2xl">{tier.title}</h4>
                  <p className="mt-4 text-3xl font-semibold">{tier.maxPages} {tier.maxPages===1?"page":"pages"}</p>
                  <p className="mt-2 text-sm font-semibold text-muted-foreground">Pricing being finalized</p>
                  <p className="mt-4 flex-1 text-sm leading-7 text-muted-foreground">{tier.description}</p>
                  <ul className="mt-6 space-y-3 border-t border-border pt-5 text-sm leading-6">
                    <li>✓ Up to {tier.maxGalleryImages} photos (working limit)</li>
                    <li>✓ Services, contact and social links</li>
                    <li>✓ Self-service text and photo updates</li>
                    <li>✓ Business news and reports</li>
                    <li>✓ Mobile-friendly TexasDefined template</li>
                  </ul>
                  <a href={`/network/website-demo?tier=${tier.id}`} className="mt-7 block rounded-full bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground">View sample website</a>
                  <a href={`mailto:admin@texasdefined.com?subject=TexasDefined%20${encodeURIComponent(tier.title)}%20Interest`}
                     className="mt-3 block rounded-full border border-primary px-4 py-3 text-center text-sm font-semibold text-primary">Ask about this website</a>
                </article>)}
              </div>
              <p className="mx-auto mt-7 max-w-4xl text-center text-sm leading-6 text-muted-foreground">One shared hosting system serves all three website tiers. Page and initial photo capacities are working engineering limits, not finalized commercial promises. Hosting does not include paid advertising placement. You can use a free listing, buy advertising separately, or link an existing website.</p>
            </div>}
        </Container>
      </section>

      <section id="optional-extras" className="bg-background">
        <Container className="py-14 sm:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-primary">Only if you want them</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">A couple of optional conveniences.</h2>
            <p className="mt-3 leading-7 text-muted-foreground">Your hosted TexasDefined website works on its own. A custom domain or business email is a separate choice, never an automatic add-on.</p>
          </div>
          <div className="mx-auto mt-9 grid max-w-5xl gap-5 md:grid-cols-2">
            <article className="rounded-2xl border border-border bg-surface p-6 sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="font-display text-2xl">Your own domain name</h3>
                <p className="text-sm font-semibold text-muted-foreground">Price to be confirmed</p>
              </div>
              <p className="mt-3 leading-7 text-muted-foreground">A domain like yourbusiness.com forwards visitors to your TexasDefined page. No separate website or hosting package to manage.</p>
              <p className="mt-4 text-xs leading-6 text-muted-foreground">Proposed price for eligible standard domains. Domain availability, renewal cost and final supplier terms must be confirmed before ordering. Premium domains priced separately.</p>
            </article>
            <article className="rounded-2xl border border-border bg-surface p-6 sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="font-display text-2xl">Professional business email</h3>
                <p className="text-sm font-semibold text-muted-foreground">Price to be confirmed</p>
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
              ["02", "See your listing or website", "We use one reliable template system to assemble the pages and listing details you selected."],
              ["03", "Manage your business", "Keep website content current in your owner portal. Advertising appears only in relevant discovery experiences."],
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
