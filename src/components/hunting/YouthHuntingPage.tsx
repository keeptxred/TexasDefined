import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import type { HuntingAuthorityTopic } from "@/data/hunting/authority";
import { TEXAS_COUNTIES } from "@/data/texas-places";
import { youthSeasonWindows } from "@/data/hunting/youth-hunting-status";
import {
  YOUTH_HUNTING_FAQ,
  YOUTH_HUNTING_IMAGE,
  YOUTH_HUNTING_SECTIONS,
  YOUTH_HUNTING_LAST_CHECKED,
  YOUTH_HUNTING_SEASON_YEAR,
  YOUTH_HUNTING_SEASONS,
  YOUTH_HUNTING_SOURCES,
} from "@/data/hunting/youth-hunting-data";

function Official({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">{children} ↗</a>;
}

function SeasonDateWindows({ dates }: { dates: string }) {
  return <div className="space-y-2">
    {youthSeasonWindows(dates).map(({ label, status }) => <div key={label} className="flex flex-wrap items-center gap-x-3 gap-y-1">
      <span className="font-semibold">{label}</span>
      <span className={"border px-2 py-0.5 text-xs font-medium " + (status === "Ended" ? "border-border text-muted-foreground" : status === "In progress" ? "border-primary text-primary" : "border-border text-foreground")}>{status}</span>
    </div>)}
  </div>;
}

export default function YouthHuntingPage({ topic }: { topic: HuntingAuthorityTopic }) {
  const seasonExpired = Date.now() >= Date.UTC(Number(YOUTH_HUNTING_SEASON_YEAR.slice(0, 4)) + 1, 8, 1);
  const [countySlug, setCountySlug] = useState("");
  const selectedCounty = TEXAS_COUNTIES.find((county) => county.slug === countySlug);
  return <main id="main-content">
    <section className="border-b border-border bg-muted/30 py-12 md:py-16">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-7 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <Link to="/">Front page</Link><span aria-hidden="true" className="mx-2">/</span><Link to="/hunting">Hunting</Link><span aria-hidden="true" className="mx-2">/</span><span aria-current="page">Youth hunting</span>
        </nav>
        <p className="eyebrow text-primary">Texas family hunting guide · {YOUTH_HUNTING_SEASON_YEAR}</p>
        <h1 className="mt-3 max-w-5xl font-display text-4xl leading-tight md:text-5xl">{topic.title}</h1>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-muted-foreground">Exact youth-only deer, turkey, duck and squirrel dates, age requirements, license costs, public-land routes, mentored hunts and a practical checklist for a first Texas hunt.</p>
        <figure className="mt-7 max-w-5xl">
          <img src={YOUTH_HUNTING_IMAGE.src} alt={YOUTH_HUNTING_IMAGE.alt} width={YOUTH_HUNTING_IMAGE.width} height={YOUTH_HUNTING_IMAGE.height} decoding="async" loading="eager" className="aspect-[16/9] w-full object-cover object-center" />
          <figcaption className="mt-2 text-xs leading-5 text-muted-foreground">Illustrative U.S. youth-hunting photograph (not a Texas location). <a href={YOUTH_HUNTING_IMAGE.source} rel="noopener noreferrer" target="_blank" className="underline">{YOUTH_HUNTING_IMAGE.credit}</a> · {YOUTH_HUNTING_IMAGE.license}.</figcaption>
        </figure>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <a href="#youth-season-calendar" className="inline-flex bg-primary px-5 py-3 font-semibold text-primary-foreground">See {YOUTH_HUNTING_SEASON_YEAR} season dates ↓</a>
          <Official href={YOUTH_HUNTING_SOURCES.youthOnly}>TPWD youth-only regulations</Official>
        </div>
        {seasonExpired ? <p role="status" className="mt-6 border border-border p-5 font-semibold">Prior season archive: these youth-only dates are no longer current. Use the latest TPWD regulations linked below until the next season is source-verified.</p> : null}
        <p className="mt-6 text-xs uppercase tracking-[0.14em] text-muted-foreground">Sources checked <time dateTime={YOUTH_HUNTING_LAST_CHECKED}>{new Date(`${YOUTH_HUNTING_LAST_CHECKED}T12:00:00Z`).toLocaleDateString("en-US", { timeZone: "UTC", month: "long", day: "numeric", year: "numeric" })}</time> · {seasonExpired ? "Archived season" : "Current season"} · TexasDefined is independent of TPWD</p>
      </Container>
    </section>

    <section className="border-b border-border py-8">
      <Container>
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="border-l-2 border-primary pl-5">
            <p className="eyebrow text-primary">The quick answer</p>
            <p className="mt-2 text-base leading-8">Texas youth-only seasons generally allow <strong>licensed hunters 16 or younger</strong> to hunt specified game on dates outside or alongside standard seasons. The <strong>{YOUTH_HUNTING_SEASON_YEAR} early youth deer dates run {YOUTH_HUNTING_SEASONS[0].dates}</strong>. Youth hunting licenses cost <strong>$7</strong>, but hunter education, adult supervision, property access and harvest rules must be checked separately.</p>
          </div>
          <div className="border border-border bg-surface p-5">
            <p className="font-display text-xl">Know the exceptions</p>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">The North Zone has a January youth-only deer season; the South Zone does not. Public drawn hunts and the mentored Texas Youth Hunting Program each have different age and entry rules.</p>
          </div>
        </div>
        <nav aria-label="On this page" className="mt-7 flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-5 text-sm">
          {YOUTH_HUNTING_SECTIONS.map((item) => <a key={item.id} href={"#" + item.id} className="font-semibold text-primary underline decoration-primary/30 underline-offset-4">{item.label}</a>)}
        </nav>
      </Container>
    </section>

    <section id="youth-season-calendar" className="py-12 md:py-16">
      <Container>
        <p className="eyebrow text-primary">Season calendar</p>
        <h2 className="mt-2 font-display text-3xl md:text-4xl">Texas youth-only hunting dates for {YOUTH_HUNTING_SEASON_YEAR}</h2>
        <p className="mt-4 max-w-4xl leading-8 text-muted-foreground">These are TPWD's published season windows, not a statewide permission to hunt. The species, individual county, unit, bag limit, legal take, landowner permission and public-land notices still determine whether a particular hunt is lawful. These dates expire after the {YOUTH_HUNTING_SEASON_YEAR} license year; do not reuse them for later seasons.</p>
        <div className="mt-7 border border-border bg-surface p-5">
          <h3 className="font-display text-xl">Check youth hunting rules for your county</h3>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">Select one of Texas's 254 counties to open that county's official TPWD hunting regulations. Check each species's Youth-Only entries, any split zones, legal means, limits and property access. A statewide date alone does not mean the selected county is open.</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
            <label htmlFor="youth-hunting-county" className="block flex-1 text-sm font-semibold">Texas county
              <select id="youth-hunting-county" value={countySlug} onChange={(event) => setCountySlug(event.target.value)} className="mt-2 w-full border border-border bg-background px-3 py-3 text-base">
                <option value="">Select your county</option>
                {TEXAS_COUNTIES.map((county) => <option key={county.code} value={county.slug}>{county.name}</option>)}
              </select>
            </label>
            {selectedCounty ? <a href={"https://tpwd.texas.gov/regulations/outdoor-annual/regs/counties/" + selectedCounty.slug} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Read official {selectedCounty.name} rules ↗</a> : <span className="inline-flex min-h-12 items-center justify-center border border-border px-5 py-3 text-sm text-muted-foreground">Choose a county to view TPWD rules</span>}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">County listings are maintained by TPWD; TexasDefined does not independently infer county eligibility.</p>
        </div>
        <div className="mt-7 hidden overflow-x-auto border border-border md:block">
          <table className="w-full border-collapse text-left text-sm" style={{ minWidth: 720 }}>
            <caption className="sr-only">{YOUTH_HUNTING_SEASON_YEAR} Texas youth-only hunting dates by species and zone</caption>
            <thead className="bg-muted/30 text-foreground"><tr><th scope="col" className="px-4 py-4">Species</th><th scope="col" className="px-4 py-4">Area / opportunity</th><th scope="col" className="px-4 py-4">Dates</th><th scope="col" className="px-4 py-4">Important qualification</th></tr></thead>
            <tbody>
              {YOUTH_HUNTING_SEASONS.map((entry) => <tr key={entry.species + entry.region} className="border-t border-border align-top">
                <th scope="row" className="px-4 py-4 font-semibold">{entry.species}</th><td className="px-4 py-4">{entry.region}</td>
                <td className="px-4 py-4"><SeasonDateWindows dates={entry.dates} /></td>
                <td className="px-4 py-4 leading-6 text-muted-foreground">{entry.detail} <a className="font-semibold text-primary underline" href={entry.source} rel="noopener noreferrer" target="_blank">Official rule ↗</a></td>
              </tr>)}
            </tbody>
          </table>
        </div>
        <div className="mt-6 space-y-4 md:hidden" aria-label="Youth-only season dates by species and zone">
          {YOUTH_HUNTING_SEASONS.map((entry) => <article key={entry.species + entry.region} className="border border-border bg-surface p-5">
            <h3 className="font-display text-xl">{entry.species}</h3>
            <p className="mt-1 text-sm font-semibold text-muted-foreground">{entry.region}</p>
            <div className="mt-4"><SeasonDateWindows dates={entry.dates} /></div>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{entry.detail}</p>
            <p className="mt-3 text-sm"><Official href={entry.source}>Official TPWD rule</Official></p>
          </article>)}
        </div>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground"><strong>County exceptions matter:</strong> Fall turkey youth dates differ for Brooks, Kenedy, Kleberg and Willacy counties; spring youth turkey dates are limited to counties meeting TPWD criteria. Youth-only dates are not the same as ordinary deer special-late dates, general dove season or ordinary waterfowl season. See <Official href={YOUTH_HUNTING_SOURCES.seasonDates}>TPWD season dates</Official>.</p>
      </Container>
    </section>

    <section id="youth-eligibility" className="border-y border-border bg-surface py-12 md:py-16">
      <Container>
        <p className="eyebrow text-primary">Legal groundwork</p>
        <h2 className="mt-2 font-display text-3xl md:text-4xl">Youth age, license and hunter-education rules</h2>
        <div className="mt-7 grid gap-5 md:grid-cols-2">
          <div className="border border-border p-6"><h3 className="font-display text-2xl">Youth license: $7</h3><p className="mt-3 leading-7 text-muted-foreground">TPWD's Type 169 youth hunting license is for residents or nonresidents who are <strong>under 17 at purchase</strong>. The license remains valid for the license year if the buyer turns 17, but only hunters <strong>16 or younger</strong> may take part in youth-only seasons. Youth are exempt from most Texas state hunting endorsements, not from applicable HIP certification or federal duck-stamp rules.</p><p className="mt-4 text-sm"><Official href={YOUTH_HUNTING_SOURCES.licenses}>License eligibility and price</Official></p></div>
          <div className="border border-border p-6"><h3 className="font-display text-2xl">Hunter education: from age 9</h3><p className="mt-3 leading-7 text-muted-foreground">Texas certification has a minimum age of 9. Children under 9 must hunt with a qualified accompanying person; ages 9–16 must be certified <em>or</em> accompanied under TPWD rules. The in-person certification fee is $15. Mentored hunts, public properties and drawn hunts may require more than the statewide baseline.</p><p className="mt-4 text-sm"><Official href={YOUTH_HUNTING_SOURCES.education}>Full hunter-education rule</Official></p></div>
        </div>
        <h3 className="mt-9 font-display text-2xl md:text-4xl">Which age rule applies?</h3>
        <div className="mt-5 overflow-x-auto border border-border">
          <table className="w-full text-left text-sm" style={{ minWidth: 660 }}><caption className="sr-only">Texas youth hunting eligibility and supervision matrix</caption><thead className="bg-muted/30"><tr><th scope="col" className="px-4 py-3">Situation</th><th scope="col" className="px-4 py-3">Rule to plan around</th></tr></thead><tbody>
            <tr className="border-t border-border"><th scope="row" className="px-4 py-4">Statewide, under age 9</th><td className="px-4 py-4 leading-7">Must be accompanied by a licensed, hunter-education-qualified person age 17 or older, within normal voice control.</td></tr>
            <tr className="border-t border-border"><th scope="row" className="px-4 py-4">Statewide, ages 9–16</th><td className="px-4 py-4 leading-7">Complete hunter education or be accompanied by a qualified person under statewide law.</td></tr>
            <tr className="border-t border-border"><th scope="row" className="px-4 py-4">Public hunting, under 17</th><td className="px-4 py-4 leading-7">TPWD-managed public hunts require an authorized licensed supervisor age 18 or older. Under 12: within normal voice distance. Certified ages 12–16: adult may remain elsewhere on the hunt unit where rules allow.</td></tr>
            <tr className="border-t border-border"><th scope="row" className="px-4 py-4">Youth-only special-permit drawn hunts</th><td className="px-4 py-4 leading-7">Youth applicants generally must be 8–16 at application, paired with a non-hunting supervising adult 18 or older; other drawn categories use other age thresholds.</td></tr>
            <tr className="border-t border-border"><th scope="row" className="px-4 py-4">Texas Youth Hunting Program</th><td className="px-4 py-4 leading-7">Ages 9–17; completed hunter education and accompanying parent or guardian required. This is separate from youth-only public hunting seasons.</td></tr>
            <tr className="border-t border-border"><th scope="row" className="px-4 py-4">Certain federal youth waterfowl E-Postcard hunts</th><td className="px-4 py-4 leading-7">TPWD warns that the federal youth-waterfowl limit in these categories is 15 or younger at the hunt. Verify the exact drawing, not just the statewide youth-only age rule.</td></tr>
          </tbody></table>
        </div>
        <p className="mt-5 max-w-4xl leading-7 text-muted-foreground">For the statewide accompanied exception, the supervisor is at least 17, licensed, hunter-education certified or exempt, and within normal voice control. <strong>TPWD public-hunting supervision is more restrictive.</strong> A youth waterfowl participant must also be accompanied by an adult at least 18 under the youth-only regulations. Check <Official href={YOUTH_HUNTING_SOURCES.publicRules}>public-land supervision</Official> and <Official href={YOUTH_HUNTING_SOURCES.drawn}>drawn hunt categories</Official> before applying.</p>
      </Container>
    </section>

    <section id="youth-access" className="py-12 md:py-16">
      <Container>
        <p className="eyebrow text-primary">Where to go</p><h2 className="mt-2 font-display text-3xl md:text-4xl">Four ways to arrange a first Texas hunt</h2>
        <div className="mt-7 grid gap-6 md:grid-cols-2">
          <article className="border border-border p-6"><p className="eyebrow text-primary">01 · Access with permission</p><h3 className="mt-2 font-display text-2xl">Family land or permission from a landowner</h3><p className="mt-3 leading-7 text-muted-foreground">Start with a legal property and a county with the right open season. Get explicit landowner permission and check local harvest limits, legal means, deer antler restrictions and tagging requirements. Having a relative with land does not waive licensing or safety rules.</p><div className="mt-4 text-sm"><Link to="/hunting/texas-deer-hunting" className="font-semibold text-primary underline">Texas deer hunting guide</Link></div></article>
          <article className="border border-border p-6"><p className="eyebrow text-primary">02 · Public access</p><h3 className="mt-2 font-display text-2xl">Annual Public Hunting Permit areas</h3><p className="mt-3 leading-7 text-muted-foreground">An adult Annual Public Hunting (APH) Permit costs <strong>$48</strong> and provides access to designated participating areas; youth under 17 may enter eligible hunts without a separate APH fee when properly supervised by a permit holder. Each property still has a legal-game listing, unit restrictions and hunt dates.</p><div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm"><Official href={YOUTH_HUNTING_SOURCES.public}>TPWD APH access</Official><Link to="/hunting/public-hunting" className="font-semibold text-primary underline">Public-land guide</Link></div></article>
          <article className="border border-border p-6"><p className="eyebrow text-primary">03 · Limited applications</p><h3 className="mt-2 font-display text-2xl">Youth drawn hunts</h3><p className="mt-3 leading-7 text-muted-foreground">TPWD draws applicants for limited public hunting opportunities, including youth-only and youth/adult categories. Youth-only special-permit applications generally have <strong>no application or permit fee</strong>; other categories have different conditions. Apply for the specific area and category, by its published deadline, with the required adult.</p><div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm"><Official href={YOUTH_HUNTING_SOURCES.drawn}>Youth drawn-hunt rules</Official><Link to="/hunting/drawn-hunts" className="font-semibold text-primary underline">Drawn-hunt guide</Link></div></article>
          <article className="border border-border p-6"><p className="eyebrow text-primary">04 · Learn with a mentor</p><h3 className="mt-2 font-display text-2xl">Texas Youth Hunting Program (TYHP)</h3><p className="mt-3 leading-7 text-muted-foreground">A partnership of TPWD and the Texas Wildlife Association for <strong>ages 9–17</strong>. Hunts generally include instruction, mentoring and often meals and lodging. TPWD currently lists a <strong>$200 hunt fee</strong> covering the child and accompanying adult, with financial assistance available. Some equipment may be borrowed.</p><div className="mt-4 text-sm"><Official href={YOUTH_HUNTING_SOURCES.youthProgram}>TYHP eligibility, application and fees</Official></div></article>
        </div>
        <div className="mt-9 border-l-2 border-primary bg-muted/30 p-6"><h3 className="font-display text-2xl">How to apply for a TYHP mentored hunt</h3><ol className="mt-4 list-decimal space-y-2 pl-6 leading-7 text-muted-foreground"><li>Confirm your child is 9–17 and complete hunter education first.</li><li>Buy the appropriate Texas hunting license and gather required hunt documents.</li><li>Create a youth hunter account through <Official href="https://www.tyhp.org/">TYHP</Official>.</li><li>Review the available hunt schedule and apply for hunts that fit the family's experience and travel needs. First-time applicants receive selection priority.</li><li>If selected, complete the health-history, release and other paperwork, confirm the fee or financial aid, and follow the host's equipment and arrival instructions.</li></ol></div>
      </Container>
    </section>

    <section id="youth-checklist" className="border-y border-border bg-surface py-12 md:py-16">
      <Container><p className="eyebrow text-primary">For first-time families</p><h2 className="mt-2 font-display text-3xl md:text-4xl">First youth hunt: preparation and safety checklist</h2>
        <div className="mt-7 grid gap-8 lg:grid-cols-2">
          <div><h3 className="font-display text-2xl">Before booking or traveling</h3><ul className="mt-4 list-disc space-y-3 pl-6 leading-7 text-muted-foreground"><li>Pick the species and hunt date, then verify the county, zone, legal methods and public-unit rules with TPWD.</li><li>Confirm the youth's license, hunter-education pathway, adult supervisor's license, and federal duck stamp if the waterfowl hunter is 16 or older. Obtain HIP certification where required.</li><li>Get written landowner permission or a valid public-land hunt authorization and understand the boundaries and check-in procedures.</li><li>Practice muzzle discipline, safe direction, trigger-finger control and when <em>not</em> to take a shot, with a qualified adult or instructor.</li><li>Test properly fitting eye and hearing protection, weather layers, footwear and any blaze-orange requirements for the particular hunt.</li></ul></div>
          <div><h3 className="font-display text-2xl">On the hunt</h3><ul className="mt-4 list-disc space-y-3 pl-6 leading-7 text-muted-foreground"><li>Review the plan with the young hunter: safe zones of fire, where adults stand, boundaries and a clear stop signal.</li><li>Carry water, snacks, a first-aid kit, a charged phone and offline location details; tell someone when you expect to return.</li><li>Make the first outing short enough to stay safe and enjoyable; spotting wildlife and learning habitat are successful outcomes too.</li><li>Before any shot, positively identify the animal, legal target and what lies behind it. The adult should be ready to stop the hunt for unsafe conditions.</li><li>After a harvest, follow tagging, reporting, field-handling and public-unit check-out requirements before leaving.</li></ul></div>
        </div>
        <p className="mt-7 text-sm leading-7 text-muted-foreground">Safety instruction and direct supervision matter more than buying specialized equipment. Never treat this checklist as a substitute for a hunter-education course or the hunt-specific safety briefing.</p>
      </Container>
    </section>

    <section id="youth-harvest" className="py-12 md:py-16">
      <Container><p className="eyebrow text-primary">After the hunt</p><h2 className="mt-2 font-display text-3xl md:text-4xl">Tagging, harvest reports and CWD checks</h2><div className="mt-6 max-w-4xl space-y-4 leading-8 text-muted-foreground"><p>Deer tags are assigned to the licensed hunter who harvests the deer. Follow TPWD's instructions for the youth's <strong>paper tag or digital tag</strong>; physical-license hunters still need physical tags, and digital app registration does not replace their paper-tag obligations.</p><p>Check the hunting-license harvest log, mandatory <strong>24-hour white-tailed deer reporting</strong> in specified counties, and mandatory chronic wasting disease (CWD) testing zones. CWD-zone check stations can have a separate <strong>48-hour</strong> requirement. Public hunts may also require checking in a harvested animal before departure.</p><p>For turkey and migratory birds, verify species-specific tagging, reporting, possession and HIP rules. Private land and public-land regulations are not interchangeable.</p></div><div className="mt-5 text-sm"><Official href={YOUTH_HUNTING_SOURCES.harvest}>TPWD after-harvest requirements</Official></div></Container>
    </section>

    <section id="youth-faq" className="border-y border-border bg-surface py-12 md:py-16">
      <Container><p className="eyebrow text-primary">Questions families ask</p><h2 className="mt-2 font-display text-3xl md:text-4xl">Youth hunting FAQs</h2><div className="mt-6 max-w-4xl divide-y divide-border border-y border-border">{YOUTH_HUNTING_FAQ.map((faq) => <details key={faq.question} className="group py-5"><summary className="cursor-pointer font-display text-xl">{faq.question}</summary><p className="mt-3 leading-7 text-muted-foreground">{faq.answer}</p></details>)}</div></Container>
    </section>

    <section className="py-12 md:py-16">
      <Container><div className="max-w-5xl"><p className="eyebrow text-primary">Verification and editorial policy</p><h2 className="mt-2 font-display text-3xl">Official regulations and updates</h2><p className="mt-4 leading-8 text-muted-foreground">Season dates, costs and program conditions on this page were checked against official TPWD sources on <time dateTime={YOUTH_HUNTING_LAST_CHECKED}>{new Date(`${YOUTH_HUNTING_LAST_CHECKED}T12:00:00Z`).toLocaleDateString("en-US", { timeZone: "UTC", month: "long", day: "numeric", year: "numeric" })}</time>. They describe the <strong>{YOUTH_HUNTING_SEASON_YEAR}</strong> license year only, not the next year's seasons. This independent guide is for planning; TPWD and applicable federal rules are legally controlling. If an official source has changed, use the current official rule, not an older summary.</p><div className="mt-6 grid gap-3 text-sm sm:grid-cols-2">{[
        ["Youth-only seasons and county eligibility", YOUTH_HUNTING_SOURCES.youthOnly],
        [`All ${YOUTH_HUNTING_SEASON_YEAR} hunting season dates`, YOUTH_HUNTING_SOURCES.seasonDates],
        ["Youth hunting license, Type 169", YOUTH_HUNTING_SOURCES.licenses],
        ["Age and hunter education", YOUTH_HUNTING_SOURCES.education],
        ["Annual Public Hunting Permit", YOUTH_HUNTING_SOURCES.public],
        ["Youth / adult drawn hunts", YOUTH_HUNTING_SOURCES.drawn],
        ["Texas Youth Hunting Program", YOUTH_HUNTING_SOURCES.youthProgram],
        ["Deer tagging and reporting", YOUTH_HUNTING_SOURCES.harvest],
      ].map(([label, href]) => <div key={href} className="border-b border-border pb-2"><Official href={href}>{label}</Official></div>)}</div></div>
        <p className="mt-6 text-sm leading-7 text-muted-foreground">Published and maintained by the <strong>TexasDefined editorial team</strong>. Found a changed regulation or a broken official link? <a className="font-semibold text-primary underline" href="mailto:admin@texasdefined.com?subject=Youth%20hunting%20guide%20correction">Send a correction</a>; include the county, species, source and date.</p>
        <div className="mt-12 border-t border-border pt-8"><h2 className="font-display text-2xl">Continue planning on TexasDefined</h2><div className="mt-5 flex flex-wrap gap-x-7 gap-y-3 text-sm">{[
          ["Texas hunting hub", "/hunting"], ["Hunting license", "/hunting/texas-hunting-license"], ["Hunter education", "/hunting/hunter-education"], ["Public hunting", "/hunting/public-hunting"], ["Drawn hunts", "/hunting/drawn-hunts"], ["White-tailed deer", "/hunting/texas-deer-hunting"], ["Wild turkey", "/hunting/turkey-hunting"], ["Waterfowl", "/hunting/waterfowl-hunting"], ["Browse counties", "/browse/counties"],
        ].map(([label, href]) => <Link key={href} to={href} className="font-semibold text-primary underline decoration-primary/40 underline-offset-4">{label}</Link>)}</div></div>
      </Container>
    </section>
  </main>;
}
