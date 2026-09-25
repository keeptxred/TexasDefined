import { useEffect, useMemo, useState, type ReactNode } from "react";

import { Container } from "@/components/layout/Container";
import { RELOCATION_PLACES, type RelocationPlace } from "@/data/relocation-authority";
import { TEXAS_VS_STATES, texasVsStateSlug } from "@/data/texas-vs-states-index";

type Profile = {
  origin: string;
  destination: string;
  moveDate: string;
  householdSize: number;
  housing: "rent" | "buy" | "unsure";
  housingBudget: number;
  schools: boolean;
  vehicles: number;
  workLocation: string;
  industry: string;
  companyMove: "none" | "employee" | "employer";
  region: string;
  setting: string;
  commute: string;
  climate: string;
  savedPlaces: string[];
  savedAddresses: string[];
  notes: string;
};

const STORAGE_KEY = "texasdefined:my-texas-move:v1";
const DEFAULT_PROFILE: Profile = {
  origin: "",
  destination: "",
  moveDate: "",
  householdSize: 2,
  housing: "unsure",
  housingBudget: 2500,
  schools: false,
  vehicles: 2,
  workLocation: "",
  industry: "",
  companyMove: "none",
  region: "any",
  setting: "any",
  commute: "any",
  climate: "any",
  savedPlaces: [],
  savedAddresses: [],
  notes: "",
};

const WORKFLOW = [
  ["Choose where to live", "/compare-texas-cities", "Compare city, county and regional context before narrowing to a neighborhood or address."],
  ["Research an exact address", "#address-research-desk", "Resolve local geography, then verify schools, utilities, taxes, insurance and flood context with the source of record."],
  ["Build the household budget", "/moving-to-texas/tools", "Carry one-time move costs into recurring housing, insurance, utility and transportation planning."],
  ["Check the school district", "/find-my-school-district", "Verify the serving district and campus from the exact address instead of a mailing city."],
  ["Map property-tax responsibility", "/find-my-property-tax", "Find the appraisal district, tax office and local taxing-unit research path for a home."],
  ["Find utilities", "/find-my-utilities", "Verify electric, water and sewer service territories instead of guessing from a ZIP code."],
] as const;

const TIMELINE = [
  ["Before you commit", [
    ["Choose a Texas region and job market", "/compare-texas-cities"],
    ["Build a realistic household budget", "/texas-cost-of-living-calculator"],
    ["Model the one-time move", "/texas-moving-cost-calculator"],
    ["Research schools if they affect the move", "/find-my-school-district"],
    ["Test representative addresses", "#address-research-desk"],
  ]],
  ["30–60 days before", [
    ["Confirm the lease or purchase address", "/property"],
    ["Verify utilities for the exact service address", "/find-my-utilities"],
    ["Build paperwork packets", "/moving-to-texas/tools"],
    ["Review vehicle registration", "/texas-vehicle-registration"],
    ["Review the driver-license process", "/texas-drivers-license"],
  ]],
  ["First 30 days", [
    ["Complete vehicle registration steps that apply", "/texas-vehicle-registration"],
    ["Save county and emergency-service contacts", "/find-my-emergency-services"],
    ["Verify voter-registration options and deadlines", "/find-my-voter-registration"],
    ["Replace estimates with actual Texas bills", "/texas-budget-planner"],
  ]],
  ["First 90 days", [
    ["Finish driver-license tasks that apply", "/texas-drivers-license"],
    ["Recheck homestead filing paths if you bought", "/find-my-homestead-exemption"],
    ["Re-run cost of living with actual spending", "/texas-cost-of-living-calculator"],
    ["Keep the saved research notebook current", "#my-texas-move"],
  ]],
] as const;

const EMPLOYEE_STEPS = [
  ["Decode the relocation package", "Separate cash allowance, direct-paid services, temporary housing, home-sale or home-buy help, travel, storage and repayment terms before comparing offers."],
  ["Model the household after the move", "Put salary and benefits next to housing, property tax, insurance, utilities, transportation, childcare and the repeated commute in the actual Texas market."],
  ["Protect the family decision", "Run school, spouse or partner employment, healthcare, airport access and daily-life research alongside the job decision."],
  ["Verify tax treatment", "Coordinate with employer payroll or a tax professional. Federal tax treatment can differ from the way a relocation package is described in an offer letter."],
] as const;

const EMPLOYER_STEPS = [
  ["Texas market selection", "Compare labor market, industry concentration, housing, commute corridors, airports, infrastructure and employee quality-of-life factors before choosing a metro or submarket."],
  ["Employee destination packet", "Give every transferee one consistent path for city, county, schools, address, taxes, utilities, transportation and first-90-day tasks."],
  ["Policy and cost design", "Separate company-paid services, allowances, temporary housing, travel, home support, storage, tax support and repayment terms so employees can understand the package."],
  ["Workforce transition", "Plan recruiting, retention, spouse or partner employment, school timing, attendance expectations, commute burden and phased moves as part of site selection."],
] as const;

const CORPORATE_SOURCES = [
  ["Texas Economic Development", "https://gov.texas.gov/business", "State business, workforce, infrastructure, incentive and relocation resources."],
  ["Move a business to Texas", "https://gov.texas.gov/business/page/moving-business-to-texas", "Official registration, tax, permit and employer-requirement starting point."],
  ["Texas labor-market information", "https://www.twc.texas.gov/services/find-lmi", "Texas Workforce Commission labor-market and wage research."],
  ["Texas employer guide", "https://efte.twc.texas.gov/", "Texas Workforce Commission employer guidebook and employment-law links."],
  ["IRS 2026 fringe-benefit guide", "https://www.irs.gov/publications/p15b", "Current federal employer guidance, including moving-expense reimbursement treatment."],
] as const;

function placeScore(place: RelocationPlace, profile: Profile) {
  const pairs = [
    [profile.region, place.region],
    [profile.setting, place.setting],
    [profile.commute, place.commuteStyle],
    [profile.climate, place.climate],
  ];
  const selected = pairs.filter(([wanted]) => wanted !== "any");
  return {
    matched: selected.filter(([wanted, actual]) => wanted === actual).length,
    considered: selected.length,
  };
}

function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value || 0);
}

export function RelocationCommandCenter() {
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let next: Profile = { ...DEFAULT_PROFILE, savedPlaces: [], savedAddresses: [] };
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<Profile>;
        next = {
          ...next,
          ...parsed,
          savedPlaces: Array.isArray(parsed.savedPlaces) ? parsed.savedPlaces : next.savedPlaces,
          savedAddresses: Array.isArray(parsed.savedAddresses) ? parsed.savedAddresses : next.savedAddresses,
        };
      }

      const params = new URLSearchParams(window.location.search);
      const requestedOrigin = params.get("originState")?.trim();
      const originState = requestedOrigin
        ? TEXAS_VS_STATES.find((state) => state.toLowerCase() === requestedOrigin.toLowerCase())
        : undefined;
      if (originState) next = { ...next, origin: next.origin || originState };

      const requestedIndustry = params.get("industry")?.trim().slice(0, 80);
      if (requestedIndustry) next = { ...next, industry: next.industry || requestedIndustry };

      const requestedCompanyMove = params.get("companyMove");
      if ((requestedCompanyMove === "employee" || requestedCompanyMove === "employer") && next.companyMove === "none") {
        next = { ...next, companyMove: requestedCompanyMove };
      }

      const requestedCity = params.get("saveCity")?.trim();
      const place = requestedCity
        ? RELOCATION_PLACES.find((candidate) => candidate.name.toLowerCase() === requestedCity.toLowerCase())
        : undefined;
      if (place) {
        next = {
          ...next,
          destination: next.destination || place.name,
          savedPlaces: next.savedPlaces.includes(place.name) ? next.savedPlaces : next.savedPlaces.concat(place.name),
        };
      }

      const requestedAddress = params.get("saveAddress")?.trim().slice(0, 240);
      if (requestedAddress) {
        next = {
          ...next,
          savedAddresses: next.savedAddresses.includes(requestedAddress)
            ? next.savedAddresses
            : next.savedAddresses.concat(requestedAddress),
        };
      }
    } catch {
      // The planner still works when local storage or URL parsing is unavailable.
    }
    setProfile(next);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // Persistence is optional.
    }
  }, [hydrated, profile]);

  const matches = useMemo(() => RELOCATION_PLACES
    .map((place) => ({ place, ...placeScore(place, profile) }))
    .sort((a, b) => b.matched - a.matched || a.place.name.localeCompare(b.place.name))
    .slice(0, 8), [profile]);

  const originState = useMemo(() => {
    const normalized = profile.origin.trim().toLowerCase();
    return TEXAS_VS_STATES.find((state) => state.toLowerCase() === normalized) ?? null;
  }, [profile.origin]);

  const togglePlace = (name: string) => setProfile((current) => ({
    ...current,
    savedPlaces: current.savedPlaces.includes(name)
      ? current.savedPlaces.filter((place) => place !== name)
      : current.savedPlaces.concat(name),
  }));

  const removeAddress = (address: string) => setProfile((current) => ({
    ...current,
    savedAddresses: current.savedAddresses.filter((candidate) => candidate !== address),
  }));

  const reset = () => {
    setProfile(DEFAULT_PROFILE);
    try { window.localStorage.removeItem(STORAGE_KEY); } catch { /* optional */ }
  };

  return <>
    <section className="border-y border-border bg-surface py-12 sm:py-16" aria-labelledby="relocation-command-center">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[18rem_1fr]">
          <div>
            <p className="eyebrow text-primary">Plan My Texas Move</p>
            <h2 id="relocation-command-center" className="mt-3 font-display text-4xl leading-tight">One profile for the whole relocation</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">Save the facts that shape the move once, then reuse them while comparing places, budgets, schools, addresses and arrival tasks. The profile stays in this browser unless you reset it.</p>
            <a href="#my-texas-move" className="mt-5 inline-block text-sm font-semibold text-primary underline underline-offset-4">Open My Texas Move →</a>
          </div>
          <div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Field label="Moving from"><input value={profile.origin} onChange={(e) => setProfile((p) => ({ ...p, origin: e.target.value }))} placeholder="State or city" className="min-h-11 w-full border border-border bg-background px-3 text-sm" /></Field>
              <Field label="Texas destination"><input value={profile.destination} onChange={(e) => setProfile((p) => ({ ...p, destination: e.target.value }))} placeholder="City, metro or undecided" className="min-h-11 w-full border border-border bg-background px-3 text-sm" /></Field>
              <Field label="Move date"><input type="date" value={profile.moveDate} onChange={(e) => setProfile((p) => ({ ...p, moveDate: e.target.value }))} className="min-h-11 w-full border border-border bg-background px-3 text-sm" /></Field>
              <Field label="Housing"><select value={profile.housing} onChange={(e) => setProfile((p) => ({ ...p, housing: e.target.value as Profile["housing"] }))} className="min-h-11 w-full border border-border bg-background px-3 text-sm"><option value="unsure">Still deciding</option><option value="rent">Rent</option><option value="buy">Buy</option></select></Field>
              <Field label="Monthly housing target"><input type="number" min="0" step="100" value={profile.housingBudget} onChange={(e) => setProfile((p) => ({ ...p, housingBudget: Math.max(0, Number(e.target.value) || 0) }))} className="min-h-11 w-full border border-border bg-background px-3 text-sm" /></Field>
              <Field label="Household size"><input type="number" min="1" max="20" value={profile.householdSize} onChange={(e) => setProfile((p) => ({ ...p, householdSize: Math.max(1, Number(e.target.value) || 1) }))} className="min-h-11 w-full border border-border bg-background px-3 text-sm" /></Field>
              <Field label="Children in school?"><select value={profile.schools ? "yes" : "no"} onChange={(e) => setProfile((p) => ({ ...p, schools: e.target.value === "yes" }))} className="min-h-11 w-full border border-border bg-background px-3 text-sm"><option value="no">No</option><option value="yes">Yes</option></select></Field>
              <Field label="Vehicles"><input type="number" min="0" max="10" value={profile.vehicles} onChange={(e) => setProfile((p) => ({ ...p, vehicles: Math.max(0, Number(e.target.value) || 0) }))} className="min-h-11 w-full border border-border bg-background px-3 text-sm" /></Field>
              <Field label="Work location / corridor"><input value={profile.workLocation} onChange={(e) => setProfile((p) => ({ ...p, workLocation: e.target.value }))} placeholder="Downtown, Energy Corridor, remote…" className="min-h-11 w-full border border-border bg-background px-3 text-sm" /></Field>
              <Field label="Industry"><input value={profile.industry} onChange={(e) => setProfile((p) => ({ ...p, industry: e.target.value }))} placeholder="Energy, healthcare, tech…" className="min-h-11 w-full border border-border bg-background px-3 text-sm" /></Field>
              <Field label="Corporate relocation?"><select value={profile.companyMove} onChange={(e) => setProfile((p) => ({ ...p, companyMove: e.target.value as Profile["companyMove"] }))} className="min-h-11 w-full border border-border bg-background px-3 text-sm"><option value="none">No / not sure</option><option value="employee">I am relocating for work</option><option value="employer">I am planning for employees</option></select></Field>
            </div>
            {originState ? <div className="mt-6 border border-border bg-background p-5">
              <p className="eyebrow text-primary">Moving from {originState}</p>
              <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl">Compare your current state with Texas</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Use the existing official-source state comparison for taxes, housing, jobs, risk, transportation and place-level differences, then keep the same household assumptions in this move plan.</p>
                </div>
                <a href={`/texas-vs/${texasVsStateSlug(originState)}`} className="text-sm font-semibold text-primary underline underline-offset-4">Texas vs {originState} →</a>
              </div>
            </div> : null}

            <div className="mt-7 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
              <Summary label="Housing target" value={money(profile.housingBudget) + "/mo"} />
              <Summary label="Household" value={String(profile.householdSize) + " people" + (profile.schools ? " · schools matter" : "")} />
              <Summary label="Transportation" value={String(profile.vehicles) + " vehicle" + (profile.vehicles === 1 ? "" : "s")} />
              <Summary label="Saved research" value={String(profile.savedPlaces.length) + " place" + (profile.savedPlaces.length === 1 ? "" : "s") + " · " + String(profile.savedAddresses.length) + " address" + (profile.savedAddresses.length === 1 ? "" : "es")} />
            </div>
          </div>
        </div>
      </Container>
    </section>

    <section className="py-12 sm:py-16" aria-labelledby="texas-match-explorer">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[18rem_1fr]">
          <div>
            <p className="eyebrow text-primary">Texas Match Explorer</p>
            <h2 id="texas-match-explorer" className="mt-3 font-display text-4xl leading-tight">Build a shortlist you can explain</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">These are transparent orientation matches, not a best-city ranking. Save promising places, then verify housing, taxes, schools, insurance and commute at the address level.</p>
          </div>
          <div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Select label="Region" value={profile.region} onChange={(value) => setProfile((p) => ({ ...p, region: value }))} options={["North Texas","Gulf Coast","Central Texas","San Antonio corridor","West Texas","Panhandle","South Texas","East Texas"]} />
              <Select label="Setting" value={profile.setting} onChange={(value) => setProfile((p) => ({ ...p, setting: value }))} options={["urban","suburban","small-city"]} />
              <Select label="Commute pattern" value={profile.commute} onChange={(value) => setProfile((p) => ({ ...p, commute: value }))} options={["core","corridor","regional"]} />
              <Select label="Climate" value={profile.climate} onChange={(value) => setProfile((p) => ({ ...p, climate: value }))} options={["humid","central","dry","coastal"]} />
            </div>
            <div className="mt-6 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 xl:grid-cols-4" aria-live="polite">
              {matches.map(({ place, matched, considered }) => {
                const saved = profile.savedPlaces.includes(place.name);
                return <article key={place.name} className="bg-background p-5">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-primary">{considered ? String(matched) + " of " + String(considered) + " selected signals" : place.region}</p>
                  <h3 className="mt-2 font-display text-2xl">{place.name}</h3>
                  <p className="mt-2 text-xs leading-6 text-muted-foreground">{place.metro} · {place.counties.join(" / ")} County{place.counties.length > 1 ? "ies" : ""}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a href={place.guideHref} className="text-sm font-semibold text-primary underline underline-offset-4">Research →</a>
                    <button type="button" onClick={() => togglePlace(place.name)} className="text-sm font-semibold underline underline-offset-4">{saved ? "Remove from My Move" : "Save to My Move"}</button>
                  </div>
                </article>;
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>

    <section id="my-texas-move" className="border-y border-border bg-surface py-12 sm:py-16" aria-labelledby="my-texas-move-heading">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[18rem_1fr]">
          <div>
            <p className="eyebrow text-primary">My Texas Move</p>
            <h2 id="my-texas-move-heading" className="mt-3 font-display text-4xl leading-tight">Keep the move in one working notebook</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">Origin, destination, household assumptions, saved places, researched addresses and notes stay together in this browser so you do not restart the research every visit.</p>
            <button type="button" onClick={reset} className="mt-5 text-sm font-semibold text-primary underline underline-offset-4">Reset My Texas Move</button>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="border border-border bg-background p-6">
              <h3 className="font-display text-2xl">Saved shortlist</h3>
              {profile.savedPlaces.length ? <ul className="mt-4 space-y-3 text-sm">{profile.savedPlaces.map((name) => <li key={name} className="flex items-center justify-between gap-4 border-b border-border pb-3"><strong>{name}</strong><button type="button" onClick={() => togglePlace(name)} className="text-xs font-semibold text-primary underline underline-offset-4">Remove</button></li>)}</ul> : <p className="mt-4 text-sm leading-7 text-muted-foreground">Save places from the Match Explorer. The shortlist is a research queue, not an automated recommendation.</p>}
              {profile.savedAddresses.length ? <div className="mt-6 border-t border-border pt-5">
                <h4 className="font-display text-xl">Saved address research</h4>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">These addresses are stored only in this browser as part of My Texas Move.</p>
                <ul className="mt-4 space-y-3 text-sm">{profile.savedAddresses.map((address) => <li key={address} className="flex items-start justify-between gap-4 border-b border-border pb-3"><span>{address}</span><button type="button" onClick={() => removeAddress(address)} className="shrink-0 text-xs font-semibold text-primary underline underline-offset-4">Remove</button></li>)}</ul>
              </div> : null}
              <div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold"><a href="/compare-texas-cities" className="text-primary underline underline-offset-4">Compare cities →</a><a href="/browse/cities" className="underline underline-offset-4">Browse city guides →</a><a href="/browse/counties" className="underline underline-offset-4">Browse counties →</a><a href="#address-research-desk" className="underline underline-offset-4">Research an address →</a></div>
            </div>
            <div className="border border-border bg-background p-6">
              <h3 className="font-display text-2xl">Move notes</h3>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">Keep questions, addresses, employer details and follow-ups here. Notes stay in this browser.</p>
              <textarea value={profile.notes} onChange={(e) => setProfile((p) => ({ ...p, notes: e.target.value }))} rows={9} placeholder="Compare cities, addresses, schools, insurance quotes and employer details…" className="mt-4 w-full border border-border bg-background p-3 text-sm leading-6" />
            </div>
          </div>
        </div>
      </Container>
    </section>

    <section className="py-12 sm:py-16" aria-labelledby="relocation-workflow">
      <Container>
        <p className="eyebrow text-primary">One relocation workflow</p>
        <h2 id="relocation-workflow" className="mt-2 font-display text-4xl">Move from statewide research to the exact address</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">The useful order is place → household budget → school and work constraints → exact address → official jurisdiction and service verification.</p>
        <div className="mt-6 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {WORKFLOW.map(([title, href, copy]) => <a key={href} href={href} className="group bg-background p-6"><h3 className="font-display text-2xl group-hover:text-primary">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p><span className="mt-5 inline-block text-sm font-semibold text-primary">Open workflow →</span></a>)}
        </div>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
          {profile.origin && <span className="text-muted-foreground">Moving from {profile.origin}</span>}
          <a href="/texas-vs-every-state" className="text-primary underline underline-offset-4">Compare Texas with every state →</a>
          <a href="/article/texas-vs-california-differences" className="underline underline-offset-4">California → Texas</a>
          <a href="/article/texas-vs-florida-differences" className="underline underline-offset-4">Florida → Texas</a>
        </div>
      </Container>
    </section>

    <section className="border-y border-border bg-surface py-12 sm:py-16" aria-labelledby="relocation-timeline">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[18rem_1fr]">
          <div><p className="eyebrow text-primary">Move timeline</p><h2 id="relocation-timeline" className="mt-3 font-display text-4xl leading-tight">Before the move through the first 90 days</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">Use this as an organizing sequence. Verify agency deadlines and eligibility on the linked source pages.</p></div>
          <div className="grid gap-4 md:grid-cols-2">{TIMELINE.map(([phase, tasks]) => <article key={phase} className="border border-border bg-background p-5"><h3 className="font-display text-2xl">{phase}</h3><ol className="mt-4 space-y-3 text-sm leading-6">{tasks.map(([label, href], index) => <li key={label} className="flex gap-3"><span className="font-semibold text-primary">{index + 1}.</span><a href={href} className="underline underline-offset-4">{label}</a></li>)}</ol></article>)}</div>
        </div>
      </Container>
    </section>

    <section id="corporate-relocation" className="py-12 sm:py-16" aria-labelledby="corporate-relocation-heading">
      <Container>
        <p className="eyebrow text-primary">Corporate Relocation to Texas</p>
        <h2 id="corporate-relocation-heading" className="mt-2 max-w-4xl font-display text-4xl sm:text-5xl">One path for transferees, HR teams and companies moving operations</h2>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">Corporate relocation is both a company decision and a household decision. TexasDefined connects workforce and market research to the city, county, school, housing, commute, tax, utility and address tools employees need after the announcement.</p>
        {profile.industry ? <p className="mt-3 max-w-4xl text-sm font-semibold text-foreground">Current industry context: {profile.industry}. Use the Texas Industries hub and local labor-market sources to test where that sector actually clusters before choosing a destination.</p> : null}
        <div className="grid gap-6 py-8 lg:grid-cols-2">
          <CorporatePanel eyebrow="For employees & families" title="Evaluate the offer and destination together" steps={EMPLOYEE_STEPS} />
          <CorporatePanel eyebrow="For employers, HR & site-selection teams" title="Build the workforce move around real Texas geography" steps={EMPLOYER_STEPS} />
        </div>
        <div className="border border-border p-6">
          <h3 className="font-display text-3xl">Corporate relocation source desk</h3>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">Use primary government sources for business registration, workforce data and tax treatment. For 2026, IRS Publication 15-B says the federal exclusion for qualified moving-expense reimbursements is generally eliminated, with limited exceptions including qualifying Armed Forces and intelligence-community moves. Employers and employees should verify their own package with payroll or a tax professional.</p>
          <div className="mt-6 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">{CORPORATE_SOURCES.map(([title, href, copy]) => <a key={href} href={href} target="_blank" rel="noreferrer noopener" className="group bg-background p-5"><h4 className="font-display text-xl group-hover:text-primary">{title}</h4><p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p><span className="mt-4 inline-block text-sm font-semibold text-primary">Official source ↗</span></a>)}</div>
        </div>
      </Container>
    </section>
  </>;
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{label}<span className="mt-2 block normal-case tracking-normal text-foreground">{children}</span></label>;
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  return <label className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{label}<select value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 min-h-11 w-full border border-border bg-background px-3 text-sm normal-case tracking-normal text-foreground"><option value="any">Any</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>;
}

function Summary({ label, value }: { label: string; value: string }) {
  return <div className="bg-background p-4"><p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{label}</p><p className="mt-2 text-sm font-semibold">{value}</p></div>;
}

function CorporatePanel({ eyebrow, title, steps }: { eyebrow: string; title: string; steps: readonly (readonly [string, string])[] }) {
  return <article className="border border-border p-6"><p className="eyebrow text-primary">{eyebrow}</p><h3 className="mt-2 font-display text-3xl">{title}</h3><div className="mt-5 space-y-5">{steps.map(([heading, copy]) => <div key={heading}><h4 className="font-semibold">{heading}</h4><p className="mt-1 text-sm leading-6 text-muted-foreground">{copy}</p></div>)}</div><div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold"><a href="/moving-to-texas/data" className="text-primary underline underline-offset-4">Relocation Data Desk →</a><a href="/texas-industries" className="underline underline-offset-4">Industry research →</a><a href="/texas-salary-comparison-by-city" className="underline underline-offset-4">Salary planning →</a></div></article>;
}
