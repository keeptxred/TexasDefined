import { useState } from "react";

/**
 * Editorial orientation, not live routing. Do not insert assumed travel times:
 * exact addresses, departure windows and current transit timetables vary.
 */
const jobs = [
  ["downtown", "Downtown Houston"],
  ["medical", "Texas Medical Center"],
  ["energy", "Energy Corridor / west Houston"],
  ["north", "The Woodlands / north Houston"],
  ["nasa", "NASA / Bay Area"],
  ["ship", "Port / Ship Channel"],
  ["greenway", "Greenway Plaza / Galleria"],
] as const;
type Job = (typeof jobs)[number][0];

type Area = {
  name: string;
  roads: string;
  appropriate: readonly Job[];
  tradeoff: string;
  transit: string;
};
const areas: readonly Area[] = [
  { name: "Katy / west Harris County", roads: "I-10 / Grand Parkway", appropriate: ["energy", "downtown"], tradeoff: "A Katy mailing address may be far from I-10. Downtown trips pass the I-10 and 610 bottlenecks.", transit: "Check METRO's Grand Parkway or Addicks Park & Ride by exact address." },
  { name: "Cypress / northwest Harris County", roads: "US 290 / SH 99", appropriate: ["downtown", "energy"], tradeoff: "US 290 access varies considerably by neighborhood. Energy Corridor trips may require cross-corridor driving.", transit: "METRO lists northwest-area Park & Ride options; confirm the stop and destination." },
  { name: "Spring / Klein", roads: "I-45 / Hardy Toll Road / SH 99", appropriate: ["north", "downtown"], tradeoff: "Check whether the address is east or west of I-45 and the office's final surface-street leg.", transit: "METRO has north-corridor Park & Ride routes; check schedule and first-mile access." },
  { name: "The Woodlands", roads: "I-45 / Hardy Toll Road", appropriate: ["north", "downtown", "medical", "greenway", "energy"], tradeoff: "A local job can shorten the trip; a daily cross-metro drive needs a backup plan.", transit: "The Woodlands Express publishes Downtown, Medical Center, Greenway and Energy Corridor routes; confirm the applicable departure lot." },
  { name: "Kingwood", roads: "US 59 / I-69", appropriate: ["north", "downtown"], tradeoff: "Eastex Freeway congestion and access from the neighborhood to I-69 can dominate the trip.", transit: "Verify any nearby METRO Park & Ride option against the exact home and work schedule." },
  { name: "Sugar Land", roads: "US 59 / I-69", appropriate: ["downtown", "medical", "greenway"], tradeoff: "The Southwest Freeway and West Loop can be major constraints; west Houston is a separate cross-corridor trip.", transit: "Fort Bend Transit serves the Medical Center, Greenway Plaza and Downtown from designated weekday lots." },
  { name: "Missouri City", roads: "Fort Bend Parkway / US 90A / Beltway 8", appropriate: ["medical", "greenway"], tradeoff: "Route choice varies sharply by subdivision; investigate toll costs and final Medical Center access.", transit: "Check the nearest Fort Bend Transit or METRO facility; a city name does not guarantee a one-seat trip." },
  { name: "Richmond / Rosenberg", roads: "US 59 / I-69 / FM 1093", appropriate: ["downtown", "greenway"], tradeoff: "A long approach to the freeway can outweigh a less expensive listing.", transit: "Fort Bend Transit has specified Rosenberg and Richmond-area weekday departure lots; route destinations vary." },
  { name: "Pearland", roads: "SH 288 / Beltway 8", appropriate: ["medical", "downtown", "nasa"], tradeoff: "SH 288 and toll-lane choices matter; trips east toward NASA differ from Medical Center travel.", transit: "Check whether a Park & Ride journey is usable from the specific address; many trips are car-dependent." },
  { name: "Friendswood", roads: "FM 528 / I-45 / SH 35", appropriate: ["nasa", "medical"], tradeoff: "Surface-street access can outweigh straight-line distance; downtown is a different commute.", transit: "Check current service rather than assuming a direct express route." },
  { name: "League City / Clear Lake", roads: "I-45 / NASA Parkway / Bay Area Boulevard", appropriate: ["nasa", "downtown"], tradeoff: "A NASA-area job can favor a local address; the Gulf Freeway can be unreliable for downtown travel.", transit: "METRO Bay Area Park & Ride options depend on exact stop, hours and destination." },
  { name: "Pasadena / Deer Park", roads: "SH 225 / Beltway 8 / SH 146", appropriate: ["ship", "nasa"], tradeoff: "Industrial shift timing and access restrictions differ from a nine-to-five office commute.", transit: "Confirm shift-compatible service; do not assume a Park & Ride covers industrial entrances." },
  { name: "Baytown", roads: "I-10 / SH 146 / SH 330", appropriate: ["ship"], tradeoff: "Bridge crossings, industrial sites and shift schedules can alter otherwise short-looking drives.", transit: "Plan on verifying the specific job-site trip and alternatives during closures." },
];

type Budget = { miles: number; tolls: number; parking: number };
const initialBudget: Budget = { miles: 0, tolls: 0, parking: 0 };
const fmt = (amount: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);

function BudgetFields({ label, value, onChange }: { label: string; value: Budget; onChange: (next: Budget) => void }) {
  const fields: { key: keyof Budget; label: string; suffix: string }[] = [
    { key: "miles", label: "Round-trip miles", suffix: "miles" },
    { key: "tolls", label: "Tolls per office day", suffix: "USD" },
    { key: "parking", label: "Parking per office day", suffix: "USD" },
  ];
  return <fieldset className="rounded-xl border border-border p-4">
    <legend className="font-semibold">{label}</legend>
    <div className="grid gap-3 sm:grid-cols-2">
      {fields.map((field) => <label key={field.key} className="block text-sm">
        <span className="block text-muted-foreground">{field.label}</span>
        <span className="mt-1 flex items-center gap-2">
          <input className="w-full rounded-xl border border-border bg-background px-3 py-2 text-foreground" type="number" min="0" max="1000" step={field.key === "miles" ? "1" : "0.5"} value={value[field.key]} onChange={(event) => onChange({ ...value, [field.key]: Math.max(0, Number(event.target.value) || 0) })} />
          <span className="text-xs text-muted-foreground">{field.suffix}</span>
        </span>
      </label>)}
    </div>
  </fieldset>;
}

export function HoustonCommuterPlanner() {
  const [job, setJob] = useState<Job>("downtown");
  const [days, setDays] = useState(3);
  const [fuelPrice, setFuelPrice] = useState(3);
  const [mpg, setMpg] = useState(25);
  const [a, setA] = useState<Budget>(initialBudget);
  const [b, setB] = useState<Budget>(initialBudget);
  const candidates = areas.filter((area) => area.appropriate.includes(job));
  const monthly = (value: Budget) => {
    const weeks = 52 / 12;
    return days * weeks * ((value.miles / Math.max(1, mpg)) * fuelPrice + value.tolls + value.parking);
  };
  const aCost = monthly(a);
  const bCost = monthly(b);
  return <section id="houston-commute-planner" className="my-10 space-y-6 rounded-xl border border-border bg-surface p-4" aria-labelledby="houston-commuter-tool-title">
    <div>
      <p className="text-xs font-semibold uppercase text-primary">Texas Defined original research tool</p>
      <h2 id="houston-commuter-tool-title" className="mt-2 font-display text-2xl font-semibold">Compare Houston suburbs by your actual job corridor</h2>
      <p className="mt-2 text-sm leading-7 text-muted-foreground">These are geography-based places to investigate, not rankings or measured journey times. No route listed here guarantees a fast trip. Select a work destination, then verify a specific home address at your own commute hours.</p>
    </div>
    <label className="block text-sm font-semibold" htmlFor="houston-job-center">Your primary job center</label>
    <select id="houston-job-center" value={job} onChange={(event) => setJob(event.target.value as Job)} className="w-full rounded-xl border border-border bg-background px-3 py-3 text-foreground">
      {jobs.map(([key, label]) => <option key={key} value={key}>{label}</option>)}
    </select>
    <div role="region" aria-live="polite" aria-label="Corridor-based suburb comparison" style={{ overflowX: "auto" }}>
      <table className="w-full text-sm" style={{ minWidth: 620, borderCollapse: "collapse", textAlign: "left" }}>
        <caption className="mb-3 text-left text-sm font-semibold">Initial areas to test for {jobs.find(([key]) => key === job)?.[1]}; not a measured ranking</caption>
        <thead><tr className="border-y border-border bg-surface"><th scope="col" className="p-3">Area</th><th scope="col" className="p-3">Likely road corridor</th><th scope="col" className="p-3">Key trade-off</th><th scope="col" className="p-3">Transit research</th></tr></thead>
        <tbody>{candidates.map((area) => <tr key={area.name} className="border-b border-border" style={{ verticalAlign: "top" }}>
          <th scope="row" className="p-3 font-semibold">{area.name}</th><td className="p-3">{area.roads}</td><td className="p-3">{area.tradeoff}</td><td className="p-3">{area.transit}</td>
        </tr>)}</tbody>
      </table>
    </div>
    <div className="rounded-xl border border-border p-4">
      <h3 className="font-display text-xl font-semibold">Regional orientation map</h3>
      <p className="mt-1 text-sm text-muted-foreground">Pan and zoom for the actual positions of candidate neighborhoods, job centers and connecting roads. This map is geographic context, not a live congestion display or plotted commute.</p>
      <iframe title="Interactive OpenStreetMap of the greater Houston metro area" loading="lazy" referrerPolicy="no-referrer" className="mt-4 w-full rounded-xl border border-border" style={{ height: 320 }} src="https://www.openstreetmap.org/export/embed.html?bbox=-95.99%2C29.34%2C-94.77%2C30.23&layer=mapnik" />
      <a className="mt-3 inline-block text-sm font-semibold text-primary underline underline-offset-4" href="https://www.openstreetmap.org/#map=10/29.77/-95.38" target="_blank" rel="noopener noreferrer">Open the full Houston map ↗</a>
    </div>
    <div className="space-y-3 border-t border-border pt-6">
      <h3 className="font-display text-xl font-semibold">Two-address commute cost worksheet</h3>
      <p className="text-sm text-muted-foreground">Compare two real prospective homes. Enter your own tested round-trip mileage, actual toll and parking estimates. Defaults are illustrative inputs only; $0 is not a real-world cost estimate.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm">Office days per week
          <input className="mt-1 w-full rounded-xl border border-border bg-background p-4" type="number" min="1" max="7" step="1" value={days} onChange={(event) => setDays(Math.min(7, Math.max(1, Number(event.target.value) || 1)))} />
        </label>
        <label className="text-sm">Gas price ($/gallon)
          <input className="mt-1 w-full rounded-xl border border-border bg-background p-4" type="number" min="0" max="20" step=".1" value={fuelPrice} onChange={(event) => setFuelPrice(Math.max(0, Number(event.target.value) || 0))} />
        </label>
        <label className="text-sm">Vehicle fuel economy (MPG)
          <input className="mt-1 w-full rounded-xl border border-border bg-background p-4" type="number" min="1" max="200" step="1" value={mpg} onChange={(event) => setMpg(Math.max(1, Number(event.target.value) || 1))} />
        </label>
      </div>
      <div className="grid gap-4">
        <BudgetFields label="Candidate home A" value={a} onChange={setA} />
        <BudgetFields label="Candidate home B" value={b} onChange={setB} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2" aria-live="polite">
        <div className="rounded-xl bg-surface p-4"><p className="text-sm">Home A estimated monthly fuel, tolls and parking</p><p className="mt-1 text-2xl font-semibold">{fmt(aCost)}</p></div>
        <div className="rounded-xl bg-surface p-4"><p className="text-sm">Home B estimated monthly fuel, tolls and parking</p><p className="mt-1 text-2xl font-semibold">{fmt(bCost)}</p></div>
      </div>
      <p className="text-xs leading-6 text-muted-foreground">Method: office days/week × 52 ÷ 12 × [(round-trip miles ÷ MPG × gasoline price) + daily tolls + daily parking]. Excludes vehicle depreciation, maintenance, insurance, transit fares, time value, deviations and non-work trips. Do not treat the result as a quote or guaranteed saving.</p>
    </div>
    <aside className="border-t border-border pt-5 text-sm leading-7">
      <h3 className="font-semibold">Verify current services and congestion</h3>
      <ul className="mt-2 list-disc pl-5">
        <li><a href="https://www.ridemetro.org/riding-metro/transit-services/park-and-ride-bus" target="_blank" rel="noopener noreferrer" className="text-primary underline">METRO Park & Ride routes and schedules</a></li>
        <li><a href="https://www.woodlandstransit.com/Express/Schedules" target="_blank" rel="noopener noreferrer" className="text-primary underline">The Woodlands Express: routes and schedules</a></li>
        <li><a href="https://www.fortbendcountytx.gov/government/departments/public-transportation/services/commuter-park-and-ride-services" target="_blank" rel="noopener noreferrer" className="text-primary underline">Fort Bend Transit: commuter Park & Ride</a></li>
        <li><a href="https://traffic.houstontranstar.org/hist/hist_traveltimes_menu.aspx" target="_blank" rel="noopener noreferrer" className="text-primary underline">Houston TranStar historical freeway travel times</a></li>
      </ul>
      <p className="mt-2 text-xs text-muted-foreground">Corridor suitability is Texas Defined's editorial geographic analysis, not an official transit-agency endorsement. Research links checked November 8, 2026; route timetables and road conditions can change at any time.</p>
    </aside>
  </section>;
}
