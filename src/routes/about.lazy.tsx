import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { DepartmentHero } from "@/components/editorial/DepartmentHero";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";
import { Container } from "@/components/layout/Container";
import { ABOUT_DESCRIPTION } from "./about";

const PRINCIPLES = [
  { title: "Start with a real question", body: "Where is the drive worth taking? What should you know before you go? What does it really cost to live here? Our best stories begin with questions readers actually need answered." },
  { title: "Keep Texas life at the center", body: "We cover the everyday experience of Texas — its landscapes, food, homes, history, communities and traditions — without forcing every subject into the same frame." },
  { title: "Name the people and places", body: "Specific details make a story useful. We tell you the town, the route, the season, the local business or the original source behind the information whenever we can." },
  { title: "Be useful without being dull", body: "A practical guide can still be a good read. We aim for clear answers, warm writing and enough detail to help readers make a plan with confidence." },
];

const ACCOUNTABILITY = [
  { title: "Visible bylines", body: "Editorial stories identify the responsible Texas Defined editorial desk or a verified individual contributor. Bylines link to a profile describing that desk or contributor and its published archive; institutional desk names are not presented as fictional people." },
  { title: "Sources and official records", body: "For facts that can change — including park access, government records, taxes, deadlines, fees and public data — Texas Defined favors the responsible agency, official record or original source and points readers there when practical." },
  { title: "Corrections and updates", body: "When we identify a material factual error, we correct the published information rather than preserving a known mistake. Time-sensitive details should still be confirmed with the responsible agency or provider before a decision." },
  { title: "Clear separation of guidance", body: "Our calculators, planning tools and explainers are informational. They are not official determinations, professional advice, quotes or guarantees, and we say so where those distinctions matter." },
];

const DATA_NOTES = [
  { title: "The Texas Defined Letter", body: "When newsletter signup is available and you subscribe, the signup form sends your email address together with the Texas Defined brand identifier to the configured newsletter service so your subscription can be recorded." },
  { title: "Browser storage and site analytics", body: "Texas Defined uses browser storage for features such as saved shop picks and a randomly generated analytics session identifier. Site analytics can record page paths, searches, resource interactions and visits to official external resources. If an analytics endpoint is configured, queued events may be sent to that service; otherwise they remain in the browser queue." },
  { title: "Shop checkout and fulfillment", body: "When you choose checkout, the site sends the selected product, variant and quantity information to the configured commerce service. Payment is completed through the checkout provider, and purchased items are prepared by the print-production partner. Shipping charges and taxes are shown or calculated during checkout." },
  { title: "Guides, calculators and official decisions", body: "Texas Defined articles, guides, data briefs and calculators are provided for general information and planning. Rates, eligibility, deadlines, closures, prices and other time-sensitive details can change. When a decision depends on an official rule or record, use the linked agency, provider or responsible local office as the final source." },
];

export const Route = createLazyFileRoute("/about")({ component: AboutPage });

function AboutPage() {
  return <>
    <DepartmentHero current="About" eyebrow="About the magazine" title="Texas is bigger than a list of places." description={ABOUT_DESCRIPTION} tone="surface" />

    <Section>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div><p className="eyebrow text-primary">Our point of view</p><h2 className="mt-3 font-display text-4xl leading-tight">A magazine for people who want to know Texas better.</h2></div>
          <div className="max-w-2xl space-y-5 text-base leading-8 text-muted-foreground"><p>We are interested in the details that make a place memorable: the road into town, the season worth waiting for, the story behind a landmark, the food people drive across a county to eat, and the practical information that turns curiosity into a plan.</p><p>Texas Defined is built to be read like a magazine and used like a guidebook. The goal is not to cover everything. It is to make what we do cover worth your time.</p></div>
        </div>
      </Container>
    </Section>

    <Section tone="surface">
      <Container>
        <SectionHeader eyebrow="Editorial principles" title="What readers can expect" />
        <ol className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {PRINCIPLES.map((principle, index) => <li key={principle.title} className="border-t border-border pt-5"><p className="eyebrow text-muted-foreground">0{index + 1}</p><h2 className="mt-3 font-display text-2xl">{principle.title}</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{principle.body}</p></li>)}
        </ol>
      </Container>
    </Section>

    <Section>
      <Container>
        <SectionHeader eyebrow="Editorial accountability" title="How we identify, source and correct our work" description="Trust signals should be visible to readers, not hidden in markup." />
        <div className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {ACCOUNTABILITY.map((item) => <section key={item.title} className="border-t border-border pt-5"><h2 className="font-display text-2xl leading-tight">{item.title}</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{item.body}</p></section>)}
        </div>
        <div className="mt-10 max-w-3xl space-y-3 border-t border-border pt-6 text-sm leading-7 text-muted-foreground">
          <p>Byline profiles are reached from article bylines and contain the editorial desk’s or contributor’s published archive. Start with any story in <Link to="/explore" className="border-b border-primary text-primary">Explore Texas</Link> or <Link to="/texas-living" className="border-b border-primary text-primary">Texas Life</Link> to follow a byline to its canonical profile.</p>
          <p>To report a factual error or request a correction, use the <Link to="/partner-with-us" className="border-b border-primary text-primary">Texas Defined contact form</Link>, select the closest available inquiry type, and include the page URL and the fact that needs review.</p>
        </div>
        <address id="contact" className="mt-6 max-w-3xl scroll-mt-28 not-italic text-sm leading-7 text-muted-foreground"><strong className="text-foreground">Contact Texas Defined.</strong> For corrections, source updates or general questions, use an official profile: {texasDefinedBrand.identity.social.map((profile, index) => <span key={profile.href}>{index ? " · " : ""}<a href={profile.href} target="_blank" rel="noreferrer" className="border-b border-primary text-primary">{profile.label}</a></span>)}. A street address is published only when there is a verified public business location to list.</address>
      </Container>
    </Section>

    <Section>
      <Container>
        <div id="privacy-terms" className="scroll-mt-28 border-t-2 border-foreground pt-8">
          <SectionHeader eyebrow="Privacy & site terms" title="What the site handles — and what to verify elsewhere" description="A plain-English summary of the data and services used by Texas Defined. We keep this section focused on how the site actually works rather than legal boilerplate." />
          <div className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {DATA_NOTES.map((note) => <section key={note.title} className="border-t border-border pt-5"><h2 className="font-display text-2xl leading-tight">{note.title}</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{note.body}</p></section>)}
          </div>
          <div className="mt-10 max-w-3xl border-t border-border pt-6 text-sm leading-7 text-muted-foreground">
            <p>By using the site, you are responsible for confirming information that affects purchases, travel, taxes, property, eligibility or other decisions with the appropriate official or service provider. Texas Defined may update this disclosure as site features and service providers change.</p>
          </div>
        </div>
      </Container>
    </Section>
  </>;
}
