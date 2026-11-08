import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const path = "/warriors-refuge-west-columbia";
const pageUrl = absoluteUrl(texasDefinedBrand, path);
const description = "How to contact The Warrior's Refuge in West Columbia, Texas, for veteran housing, counseling, employment support and limited emergency financial assistance.";
const sourceChecked = "2026-11-08";

const services = [
  {
    title: "Transitional housing",
    detail: "The organization describes supportive housing under VA Grant and Per Diem (GPD) and Transition in Place (TIP), including meals, transportation and help moving toward permanent housing. An intake conversation determines eligibility and whether space or an appropriate placement is available.",
    source: "https://thewarriorsrefuge.us/how-we-help/",
  },
  {
    title: "Counseling and recovery",
    detail: "Its published services include individual and group counseling, peer support, mental-health counseling and substance-use recovery support. Ask intake which services are currently offered, how appointments work and whether referrals are available.",
    source: "https://thewarriorsrefuge.us/how-we-help/",
  },
  {
    title: "Employment and education",
    detail: "The organization lists job training, employment placement, résumé assistance and help with education enrollment. These are paths toward longer-term stability rather than a promise of an immediate job.",
    source: "https://thewarriorsrefuge.us/how-we-help/",
  },
  {
    title: "Benefits and case management",
    detail: "Published services include VA benefits assistance, housing navigation and individualized planning. The organization is not the VA and cannot guarantee an official benefits determination.",
    source: "https://thewarriorsrefuge.us/how-we-help/",
  },
] as const;

const sources = [
  ["The Warrior's Refuge — programs and housing eligibility", "https://thewarriorsrefuge.us/how-we-help/"],
  ["The Warrior's Refuge — contact, locations and office hours", "https://thewarriorsrefuge.us/contacts/"],
  ["The Warrior's Refuge — financial assistance grant and limitations", "https://thewarriorsrefuge.us/twr-financial-assistance/"],
  ["The Warrior's Refuge — donations, partnerships and volunteering", "https://thewarriorsrefuge.us/getinvolved/"],
  ["U.S. Department of Veterans Affairs — homeless veterans call center", "https://department.va.gov/homeless/nationalcallcenter/"],
  ["Veterans Crisis Line — 988, press 1", "https://www.veteranscrisisline.net/"],
] as const;

export const Route = createFileRoute("/warriors-refuge-west-columbia")({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath: path,
      title: "The Warrior's Refuge in West Columbia, TX | Veteran Housing & Support",
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, path)],
    scripts: [jsonLd({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${pageUrl}#webpage`,
          url: pageUrl,
          name: "The Warrior's Refuge — Veteran Services in West Columbia",
          description,
          dateModified: sourceChecked,
          isPartOf: { "@id": `${absoluteUrl(texasDefinedBrand, "/")}#website` },
          about: { "@id": `${pageUrl}#provider` },
          breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        },
        {
          "@type": "NGO",
          "@id": `${pageUrl}#provider`,
          name: "The Warrior's Refuge",
          url: "https://thewarriorsrefuge.us/",
          telephone: "+1-979-345-3800",
          email: "info@thewarriorsrefuge.us",
          address: {
            "@type": "PostalAddress",
            streetAddress: "212 N. 14th St",
            addressLocality: "West Columbia",
            addressRegion: "TX",
            postalCode: "77486",
            addressCountry: "US",
          },
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${pageUrl}#breadcrumb`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl(texasDefinedBrand, "/") },
            { "@type": "ListItem", position: 2, name: "Texas Resources", item: absoluteUrl(texasDefinedBrand, "/texas-resources") },
            { "@type": "ListItem", position: 3, name: "The Warrior's Refuge", item: pageUrl },
          ],
        },
      ],
    })],
  }),
  component: WarriorsRefugePage,
});

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-4">{children}</a>;
}

function WarriorsRefugePage() {
  return <main id="main-content" className="pb-16">
    <Container className="pt-10">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <Link to="/texas-resources" className="underline underline-offset-4">Texas Resources</Link><span aria-hidden="true"> / </span><span aria-current="page">The Warrior's Refuge</span>
      </nav>

      <header className="max-w-4xl">
        <p className="eyebrow text-primary">Veteran services · Brazoria County, Texas</p>
        <h1 className="mt-3 font-display text-4xl leading-tight">The Warrior's Refuge: how veterans can get help in West Columbia</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">A practical, independently written guide to the organization's housing, counseling, work support and financial-assistance programs—with direct contacts and important eligibility distinctions.</p>
        <p className="mt-4 text-sm text-muted-foreground">Texas Defined editorial desk · Primary sources checked November 8, 2026 · Independent resource; not an official Warrior's Refuge page.</p>
      </header>

      <section aria-labelledby="get-help" className="mt-10 py-7">
        <h2 id="get-help" className="font-display text-3xl">Need help or want to request services?</h2>
        <p className="mt-3 max-w-3xl leading-7">Start with the organization's intake team before traveling. Explain whether you need housing, counseling, help with employment or financial assistance. Ask what is available today and what documents will be needed. The published office number is <a className="font-bold text-primary underline underline-offset-4" href="tel:+19793453800">(979) 345-3800</a>.</p>
        <div className="mt-5 flex flex-wrap gap-4 text-sm">
          <a href="tel:+19793453800" className="inline-flex items-center rounded-md bg-primary px-5 py-3 font-semibold text-primary-foreground">Call the intake office</a>
          <ExternalLink href="https://thewarriorsrefuge.us/contacts/">Official contact and intake information</ExternalLink>
        </div>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">The organization lists weekday office hours of 9 a.m.–5 p.m. and weekends by appointment. These are office hours, not a guarantee of walk-in housing or emergency placement. If you have nowhere safe to stay tonight, see the 24/7 VA housing line below.</p>
      </section>

      <div className="mt-12 grid gap-12 lg:grid-cols-3">
        <article className="space-y-12 leading-8 lg:col-span-2">
          <section aria-labelledby="what-is">
            <h2 id="what-is" className="font-display text-3xl">What is The Warrior's Refuge?</h2>
            <p className="mt-4">The Warrior's Refuge is a West Columbia-based nonprofit founded in 2019. It describes its mission around three connected needs: a safe place to stay while recovering from homelessness, counseling and personal support, and education or employment that can help veterans remain housed. It serves veterans through its West Columbia campus and also lists The Rally Point in Alvin.</p>
            <p className="mt-4">Its value as a local resource is the combination of housing and services. Someone seeking help may need more than a bed; transportation, income, benefits guidance and a permanent-housing plan often determine whether a temporary placement leads to stability. The organization's program descriptions address those related needs, although individual services and placement depend on intake.</p>
            <p className="mt-3 text-sm"><ExternalLink href="https://thewarriorsrefuge.us/">Read the organization's own mission and overview</ExternalLink>.</p>
          </section>

          <section aria-labelledby="programs">
            <h2 id="programs" className="font-display text-3xl">Programs and what each one does</h2>
            <div className="mt-6 space-y-7">
              {services.map((service) => <section key={service.title} className="border-t border-border pt-5">
                <h3 className="font-display text-2xl">{service.title}</h3>
                <p className="mt-2">{service.detail}</p>
                <p className="mt-2 text-sm"><ExternalLink href={service.source}>Provider's program details</ExternalLink></p>
              </section>)}
            </div>
          </section>

          <section aria-labelledby="eligibility">
            <h2 id="eligibility" className="font-display text-3xl">Who may qualify—and why the program matters</h2>
            <p className="mt-4">The organization says its transitional-housing program is available to U.S. Armed Forces veterans who do not have a dishonorable discharge. That is the provider's stated housing rule, not a universal rule for all veteran assistance. Ask intake about documentation, current vacancies, referral requirements, accessibility and whether a different program is a better fit.</p>
            <p className="mt-4">Its separate Texas Veterans Commission-funded <strong>financial-assistance program has different eligibility rules</strong>. The provider lists possible qualifying groups including veterans, certain military members, dependents and surviving spouses, and describes additional service-characterization categories for that grant. Do not apply a housing eligibility rule to the financial grant—or assume qualifying for one service automatically qualifies you for another.</p>
          </section>

          <section aria-labelledby="financial-help">
            <h2 id="financial-help" className="font-display text-3xl">Limited emergency financial assistance</h2>
            <p className="mt-4">The organization's Texas Veterans Commission General Assistance Grant page describes limited help for eligible people in <strong>Brazoria, Fort Bend, Galveston, Harris, Jefferson and Matagorda counties</strong>. Depending on the approved need, eligible expenses may include rent, mortgage, utilities and transportation.</p>
            <p className="mt-4"><strong>This is not guaranteed cash or automatic emergency funding.</strong> The provider states that eligibility screening, complete documentation, allowable expenses and available grant funds all govern assistance. Its site says participants can contact the office to arrange intake; appointment-based processing applies.</p>
            <p className="mt-3 text-sm"><ExternalLink href="https://thewarriorsrefuge.us/twr-financial-assistance/">Read full program eligibility, counties, documents and limitations</ExternalLink>.</p>
          </section>

          <section aria-labelledby="request-process">
            <h2 id="request-process" className="font-display text-3xl">A useful first-call checklist</h2>
            <ol className="mt-5 list-decimal space-y-3 pl-6">
              <li><strong>Identify the immediate need.</strong> Tell intake whether you need a place to stay, help keeping your current housing, counseling, work support or an emergency bill paid.</li>
              <li><strong>Ask about the specific program.</strong> Housing, counseling and the grant-funded financial-aid program have different processes; clarify which intake path applies.</li>
              <li><strong>Confirm service area and documents.</strong> Have discharge documents and identification available if you already possess them, but ask the provider what is actually required for your circumstances.</li>
              <li><strong>Confirm availability and arrangements.</strong> Ask whether a visit needs an appointment and whether transportation, a referral or other steps are required. Do not assume immediate admission.</li>
              <li><strong>Request alternatives when needed.</strong> If this organization cannot help immediately, the VA's national homeless-veteran line can connect callers with other nearby resources.</li>
            </ol>
            <p className="mt-4 text-sm text-muted-foreground">This checklist is Texas Defined's practical guidance, not The Warrior's Refuge's official application instructions.</p>
          </section>

          <section aria-labelledby="give-back">
            <h2 id="give-back" className="font-display text-3xl">How Texans can support the mission</h2>
            <p className="mt-4">The nonprofit invites financial gifts, essential-item donations, event sponsorships, community partnerships and volunteers. The specific items it needs can change, so check the current donation guidance before delivering supplies. Businesses and community groups can ask the organization about sponsorship or service partnerships.</p>
            <p className="mt-3"><ExternalLink href="https://thewarriorsrefuge.us/getinvolved/">Current donation, volunteering and partnership options</ExternalLink></p>
          </section>

          <section aria-labelledby="emergency-alternatives">
            <h2 id="emergency-alternatives" className="font-display text-3xl">If you need urgent support</h2>
            <p className="mt-4"><strong>Housing crisis:</strong> The Department of Veterans Affairs operates the confidential, free <a href="tel:+18774243838" className="font-semibold text-primary underline underline-offset-4">National Call Center for Homeless Veterans: 877-424-3838</a>, 24 hours a day, seven days a week. Veterans, family members and people helping veterans can call. <ExternalLink href="https://department.va.gov/homeless/nationalcallcenter/">Official VA information</ExternalLink>.</p>
            <p className="mt-4"><strong>Mental-health crisis:</strong> Call <a href="tel:988" className="font-semibold text-primary underline underline-offset-4">988 and press 1</a> for the Veterans Crisis Line, or text <a href="sms:838255" className="font-semibold text-primary underline underline-offset-4">838255</a>. <ExternalLink href="https://www.veteranscrisisline.net/">Official Veterans Crisis Line</ExternalLink>. In immediate danger, call 911.</p>
          </section>

          <section aria-labelledby="sources" className="border-t border-border">
            <h2 id="sources" className="font-display text-3xl">Sources and editorial method</h2>
            <p className="mt-3 text-sm leading-7">This independent guide prioritizes first-party program descriptions and federal assistance information. Provider hours, staff, funding, placement and admission conditions can change. We checked the following public sources on November 8, 2026; this is not a firsthand inspection of care or a guarantee of eligibility or space.</p>
            <ul className="mt-4 list-disc space-y-2 text-sm leading-7">
              {sources.map(([label, href]) => <li key={href}><ExternalLink href={href}>{label}</ExternalLink></li>)}
            </ul>
            <p className="mt-5 text-sm">See the <Link to="/editorial-policy" className="text-primary underline underline-offset-4">editorial policy</Link>, <Link to="/sourcing-methodology" className="text-primary underline underline-offset-4">sourcing methodology</Link> and <Link to="/corrections-policy" className="text-primary underline underline-offset-4">corrections process</Link> for factual updates.</p>
          </section>
        </article>

        <aside aria-labelledby="locations" className="">
          <div className="border-t-2 border-primary pt-5">
            <h2 id="locations" className="font-display text-2xl">Contact and locations</h2>
            <div className="mt-5 space-y-6 text-sm leading-7">
              <section>
                <h3 className="font-bold">West Columbia campus</h3>
                <address className="not-italic">212 N. 14th St<br />West Columbia, TX 77486</address>
                <ExternalLink href="https://thewarriorsrefuge.us/contacts/">Official location and contact page</ExternalLink>
              </section>
              <section className="border-t border-border pt-4">
                <h3 className="font-bold">The Rally Point — Alvin</h3>
                <address className="not-italic">204 W. Coombs St<br />Alvin, TX 77511</address>
                <p className="mt-1 text-muted-foreground">Confirm which programs are available at this second site before visiting.</p>
              </section>
              <section className="border-t border-border pt-4">
                <h3 className="font-bold">Contact</h3>
                <p><a href="tel:+19793453800" className="text-primary underline underline-offset-4">(979) 345-3800</a><br /><a href="mailto:info@thewarriorsrefuge.us" className="text-primary underline underline-offset-4">info@thewarriorsrefuge.us</a></p>
                <p className="mt-2">Office: Monday–Friday, 9 a.m.–5 p.m.<br />Weekends: by appointment</p>
              </section>
              <section className="border-t border-border pt-4">
                <h3 className="font-bold">Related Texas Defined resources</h3>
                <ul className="mt-2 space-y-2">
                  <li><Link to="/texas-resources" className="text-primary underline underline-offset-4">Practical Texas services</Link></li>
                  <li><Link to="/find-my-emergency-services" className="text-primary underline underline-offset-4">Emergency & community service finder</Link></li>
                  <li><Link to="/learn/disabled-veteran-property-tax-benefits" className="text-primary underline underline-offset-4">Disabled-veteran property-tax information</Link></li>
                </ul>
              </section>
            </div>
          </div>
        </aside>
      </div>
    </Container>
  </main>;
}
